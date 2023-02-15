<script>
  export let idProject;
  import SvelteMarkdown from "svelte-markdown";
  import { navigate } from "svelte-routing";
  import { Breadcrumb, BreadcrumbItem, Progressbar } from "flowbite-svelte";
  import PeopleCardRequest from "../../components/PeopleCardRequest.svelte";
  import AvatarStack from "../../components/AvatarStack.svelte";

  let projectData,
    image,
    desc,
    title,
    type,
    startDate,
    endDate,
    roadmaps = [],
    requests = [],
    participants = [],
    participated,
    requested;

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
    desc = projectData.desc;

    image = projectData.image;
    title = projectData.title;
    type = projectData.type;
    roadmaps = projectData.roadmaps;
    requests = projectData.requests;
    if (requests && requests.includes(userId)) {
      requested = true;
    }
    participants = projectData.participants;
    // participants.push(projectData.userId);
    if (participants && participants.includes(userId)) {
      participated = true;
    }
    roadmaps.sort(function (a, b) {
      // @ts-ignore
      return new Date(a.startDate) - new Date(b.startDate);
    });
    startDate = new Date(projectData.startDate).toLocaleDateString("id");
    if (projectData.endDate) {
      endDate = new Date(projectData.endDate).toLocaleDateString("id");
    }

    getProgress();
  }

  getProject();

  function getProgress() {
    roadmaps.forEach((roadmap) => {
      let percentRoadmap,
        totalPercentTask = 0;

      roadmap.tasks.forEach((task) => {
        let percentTask,
          doneLengthTask = 0,
          todosLengthTask = 0;

        todosLengthTask = task.todos.length;

        task.todos.forEach((todo) => {
          if (todo.done) {
            doneLengthTask += 1;
          }
        });

        if (todosLengthTask > 0) {
          percentTask = Math.round((doneLengthTask / todosLengthTask) * 100);
        }

        if (percentTask) {
          totalPercentTask += percentTask;
        } else {
          totalPercentTask += 0;
        }
      });

      percentRoadmap = totalPercentTask / roadmap.tasks.length;
      if (!percentRoadmap) {
        percentRoadmap = 0;
      }
      roadmap.percent = Math.round(percentRoadmap);
    });
  }

  // delete project
  async function deleteProject() {
    const response = await fetch(
      "http://103.187.223.15:8800/api/projects/" + idProject,
      {
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
          userId: projectData.userId,
        }),
      }
    );

    if (!response.ok) {
      alert("You can only delete your project");
    } else {
      navigate("/projects");
    }

    const data = await response.json();
  }

  // request participation
  async function requestParticipation() {
    let response = await fetch(
      "http://103.187.223.15:8800/api/projects/request/" + idProject,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      }
    );

    if (!response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      const data = await response.json();
      console.log(data);
      requested = true;
    }
  }

  // cancel request participation
  async function cancelRequestParticipation() {
    let response = await fetch(
      "http://103.187.223.15:8800/api/projects/cancelrequest/" + idProject,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      }
    );

    if (!response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      const data = await response.json();
      console.log(data);
      requested = false;
    }
  }
</script>

{#if projectData}
  <main class="md:mx-72">
    <div class="md:container md:mx-auto my-16">
      <Breadcrumb navClass={"mb-4"} aria-label="Default breadcrumb example">
        {#if userId == projectData.userId || participated}
          <BreadcrumbItem href="/projects" home>Projects</BreadcrumbItem>
        {:else}
          <BreadcrumbItem href="/projects/{projectData.userId}" home
            >Projects</BreadcrumbItem
          >
        {/if}

        <BreadcrumbItem>{title}</BreadcrumbItem>
      </Breadcrumb>

      {#if requests && requests.length > 0 && userId == projectData.userId}
        <div class="mb-8">
          <div class="mb-2 text-lg font-bold">Request Participation:</div>
          {#each requests as userId}
            <PeopleCardRequest {userId} {idProject} />
          {/each}
        </div>
      {/if}

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
              {type == "academic" ? "Academic" : "Non Academic"}
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
        <div class="flex ml-4 mb-5 -space-x-4">
          {#if participants && participants.length > 0}
            <AvatarStack userId={projectData.userId} />
            {#each participants as participant}
              <AvatarStack userId={participant} />
            {/each}
          {/if}
        </div>
        <div class="flex-auto" />
        {#if userId == projectData.userId || participated}
          <div>
            <a
              href="/project/add-roadmap/{idProject}"
              type="button"
              class="focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >Add Roadmap</a
            >

            <a
              href="/project/edit/{idProject}"
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 "
              ><iconify-icon icon="material-symbols:edit" /></a
            >
            {#if !participated}
              <button
                on:click={deleteProject}
                type="button"
                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 "
                ><iconify-icon icon="material-symbols:delete-outline" /></button
              >
            {/if}
          </div>
        {:else if requested}
          <button
            on:click={cancelRequestParticipation}
            type="button"
            class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 "
            >Cancel Request</button
          >
        {:else}
          <button
            on:click={requestParticipation}
            type="button"
            class="focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >Request Participation</button
          >
        {/if}
      </div>

      <div>
        <div class="prose prose-neutral text-sm max-w-none">
          <SvelteMarkdown source={desc} />
        </div>

        {#if roadmaps && roadmaps.length > 0}
          <h2 class="font-bold text-xl mt-6">Roadmaps:</h2>
          <div class="grid grid-cols-3 gap-8 mt-2 mb-4">
            {#each roadmaps as roadmap}
              <a
                href={`/project/${projectData._id}/roadmap/${roadmap._id}`}
                class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <h5
                  class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1"
                >
                  {roadmap.title}
                </h5>
                <p class="mb-2 font-normal text-gray-700 dark:text-gray-400">
                  {new Date(roadmap.startDate).toLocaleDateString("id")} - {new Date(
                    roadmap.endDate
                  ).toLocaleDateString("id")}
                </p>
                <Progressbar
                  progress={roadmap.percent}
                  size="h-4"
                  labelInside
                />
              </a>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </main>
{/if}
