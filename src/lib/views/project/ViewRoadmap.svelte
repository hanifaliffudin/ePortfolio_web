<script>
  export let idRoadmap, idProject;
  import SvelteMarkdown from "svelte-markdown";
  import { navigate } from "svelte-routing";
  import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";

  let projectData,
    image,
    desc,
    title,
    startDate,
    endDate,
    roadmap,
    indexRoadmap,
    roadmaps = [],
    tasks = [];

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

    roadmaps = projectData.roadmaps;
    roadmaps.forEach((element, i) => {
      if (element._id == idRoadmap) {
        indexRoadmap = i;
        roadmap = element;
        title = element.title;
        startDate = new Date(element.startDate).toLocaleDateString("en", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
        endDate = new Date(element.endDate).toLocaleDateString("en", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
        tasks = element.tasks;
        tasks.sort(function (a, b) {
          // @ts-ignore
          return new Date(b.date) - new Date(a.date);
        });
        desc = element.desc;
      }
    });
  }

  getProject();

  // delete roadmap
  async function deleteRoadmap() {
    roadmaps = [
      ...roadmaps.slice(0, indexRoadmap),
      ...roadmaps.slice(indexRoadmap + 1, roadmaps.length),
    ];

    const response = await fetch(
      "http://103.187.223.15:8800/api/projects/" + idProject,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          roadmaps,
        }),
      }
    );

    if (!response.ok) {
      const data = await response.json();
      alert(data);
    } else {
      navigate(`/project/${idProject}`);
    }
  }
</script>

{#if projectData}
  <main class="md:mx-72">
    <div class="md:container md:mx-auto my-16">
      <Breadcrumb navClass={"mb-4"} aria-label="Default breadcrumb example">
        <BreadcrumbItem href="/projects" home>Projects</BreadcrumbItem>
        <BreadcrumbItem href="/project/{idProject}"
          >{projectData.title}</BreadcrumbItem
        >
        <BreadcrumbItem>{title}</BreadcrumbItem>
      </Breadcrumb>

      <div class="flex mb-6 items-center">
        {#if image}
          <img
            class="h-16 w-16 object-cover rounded-full mr-4"
            src={image}
            alt=""
          />
        {/if}
        <div class="">
          <div>
            <div class="font-bold text-xl leading-tight">
              {title}
            </div>
            <div class="text-sm">
              <!-- {type == "academic" ? "Academic" : "Non Academic"} -->
            </div>
            {#if endDate}
              <div class="text-sm">
                {startDate} - {endDate}
              </div>
            {:else}
              <div class="text-sm">
                {startDate} - Present
              </div>
            {/if}
          </div>
        </div>
        <div class="flex-auto" />
        {#if userId == projectData.userId}
          <div>
            <a
              href="/project/{idProject}/roadmap/{idRoadmap}/add-task"
              type="button"
              class="focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >Add Task</a
            >

            <a
              href="/project/{idProject}/roadmap/{idRoadmap}/edit"
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 "
              ><iconify-icon icon="material-symbols:edit" /></a
            >
            <button
              on:click={deleteRoadmap}
              type="button"
              class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 "
              ><iconify-icon icon="material-symbols:delete-outline" /></button
            >
          </div>
        {/if}
      </div>

      <div>
        <div class="prose prose-neutral text-sm max-w-none">
          <SvelteMarkdown source={desc} />
        </div>

        <div class="border border-r-0 border-l-0 border-b-0 mt-6">
          {#if tasks}
            {#each tasks as task}
              <a
                href={`/project/${projectData._id}/roadmap/${idRoadmap}/task/${task._id}`}
                class="hover:underline"
              >
                <div class="flex items-center border border-t-0 p-2">
                  <iconify-icon
                    icon="material-symbols:task-outline-rounded"
                    class="mr-2"
                  />
                  <div>
                    {task.title}
                  </div>
                  <div class="flex-auto" />
                  <div>
                    {new Date(task.date).toLocaleDateString("en", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </a>
            {/each}
          {/if}
        </div>
      </div>
    </div>
  </main>
{/if}
