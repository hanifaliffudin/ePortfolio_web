<script>
  export let idProject;
  import SvelteMarkdown from "svelte-markdown";
  import { navigate } from "svelte-routing";
  import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";

  let projectData,
    image,
    desc,
    title,
    type,
    startDate,
    endDate,
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
    desc = projectData.desc;

    image = projectData.image;
    title = projectData.title;
    type = projectData.type;
    roadmaps = projectData.roadmaps;
    roadmaps.sort(function (a, b) {
      // @ts-ignore
      return new Date(a.startDate) - new Date(b.startDate);
    });
    startDate = new Date(projectData.startDate).toLocaleDateString("id");
    if (projectData.endDate) {
      endDate = new Date(projectData.endDate).toLocaleDateString("id");
    }
  }

  getProject();

  // delete project
  async function deleteProject() {
    const response = await fetch(
      "http://103.187.223.15:8800/api/projects/" + idProject,
      {
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
          userId: userId,
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
</script>

{#if projectData}
  <main class="md:mx-72">
    <div class="md:container md:mx-auto my-16">
      <Breadcrumb navClass={"mb-4"} aria-label="Default breadcrumb example">
        <BreadcrumbItem href="/projects" home>Projects</BreadcrumbItem>
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
        <div class="flex-auto" />
        {#if userId == projectData.userId}
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
            <button
              on:click={deleteProject}
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

        {#if roadmaps && roadmaps.length > 0}
          <h2 class="font-bold text-xl mt-6">Roadmaps:</h2>
          <div class="grid grid-cols-3 gap-8 mt-2">
            {#each roadmaps as roadmap}
              <a
                href={`/project/${projectData._id}/roadmap/${roadmap._id}`}
                class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <h5
                  class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                >
                  {roadmap.title}
                </h5>
                <p class="font-normal text-gray-700 dark:text-gray-400">
                  {new Date(roadmap.startDate).toLocaleDateString("id")} - {new Date(
                    roadmap.endDate
                  ).toLocaleDateString("id")}
                </p>
              </a>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </main>
{/if}
