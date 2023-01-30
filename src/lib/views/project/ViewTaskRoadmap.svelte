<script>
  import SvelteMarkdown from "svelte-markdown";
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
  import { Carousel, CarouselTransition } from "flowbite-svelte";
  import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";
  import "@splidejs/svelte-splide/css";

  export let idTask, idRoadmap, idProject;

  let projectData,
    tasks = [],
    task,
    date,
    indexTask,
    images = [],
    participants = [],
    participated,
    indexRoadmap,
    roadmap,
    roadmaps = [];

  let userId = localStorage.getItem("userId");

  // get data project
  async function getProject() {
    const response = await fetch(
      "http://103.187.223.15:8800/api/projects/" + idProject
    );

    if (!response.ok) {
      alert(response.statusText);
    }
    const data = await response.json();
    projectData = data;
    participants = projectData.participants;
    participants.push(projectData.userId);
    if (participants && participants.includes(userId)) {
      participated = true;
    }
    roadmaps = projectData.roadmaps;
    roadmaps.forEach((elementRoadmap, i) => {
      if (elementRoadmap._id == idRoadmap) {
        indexRoadmap = i;
        roadmap = elementRoadmap;
        tasks = roadmap.tasks;
        tasks.forEach((elementTask, i) => {
          if (elementTask._id == idTask) {
            indexTask = i;
            task = elementTask;
            date = new Date(elementTask.date).toLocaleDateString("en", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });
            images = elementTask.images;
          }
        });
      }
    });
  }

  getProject();

  //   delete task
  async function deleteTask() {
    tasks = [
      ...tasks.slice(0, indexTask),
      ...tasks.slice(indexTask + 1, tasks.length),
    ];

    roadmap.tasks = tasks;

    const response = await fetch(
      "http://103.187.223.15:8800/api/projects/" + idProject,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: projectData.userId,
          roadmaps,
        }),
      }
    );

    if (!response.ok) {
      alert(response.statusText);
    } else {
      const data = await response.json();
      window.location.href = `/project/${idProject}/roadmap/${idRoadmap}`;
    }
  }
</script>

{#if task}
  <main class="md:mx-72">
    <div class="md:container md:mx-auto my-16">
      <div class="flex justify-center">
        <div class="flex-initial w-3/4">
          <Breadcrumb navClass={"mb-4"} aria-label="Default breadcrumb example">
            {#if userId == projectData.userId || participated}
              <BreadcrumbItem href="/projects" home>Projects</BreadcrumbItem>
            {:else}
              <BreadcrumbItem href="/projects/{projectData.userId}" home
                >Projects</BreadcrumbItem
              >
            {/if}
            <BreadcrumbItem href="/project/{idProject}"
              >{projectData.title}</BreadcrumbItem
            >
            <BreadcrumbItem href="/project/{idProject}/roadmap/{idRoadmap}"
              >{roadmap.title}</BreadcrumbItem
            >
            <BreadcrumbItem>{task.title}</BreadcrumbItem>
          </Breadcrumb>

          <div class="flex justify-end mb-3 items-center">
            {#if userId == projectData.userId || participated}
              <div>
                <Button btnClass="p-0 h-3"
                  ><iconify-icon
                    icon="fluent:more-horizontal-32-filled"
                  /></Button
                >
                <Dropdown class="w-auto">
                  <DropdownItem
                    ><a
                      href={`/project/${projectData._id}/roadmap/${idRoadmap}/edit-task/${task._id}`}
                      >Edit</a
                    ></DropdownItem
                  >
                  <DropdownItem on:click={deleteTask}>Delete</DropdownItem>
                </Dropdown>
              </div>
            {/if}
          </div>
          <div class="md:container md:mx-auto ">
            <h1 class="mb-4 text-4xl font-extrabold">{task.title}</h1>
            <div class="text-sm text-gray-600 mb-4">{date}</div>
            <div class="prose prose-neutral text-sm max-w-none">
              <SvelteMarkdown source={task.desc} />
            </div>
            {#if images && images.length > 0}
              <div class="mt-4">
                <Carousel divClass={"h-full"} {images} showThumbs={false} />
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </main>
{/if}
