<script>
  import { writable } from "svelte/store";
  import { onMount } from "svelte";
  import ProfileBar from "../../components/ProfileBar.svelte";
  import ProfileTabs from "../../components/ProfileTabs.svelte";
  import ProjectCard from "../../components/ProjectCard.svelte";

  let userId = localStorage.getItem("userId");
  const projectsStore = writable(null);

  // get all user projects
  async function getprojects() {
    let response = await fetch(
      "http://103.187.223.15:8800/api/projects/all/" + userId
    );
    return response.ok ? await response.json() : null;
  }

  onMount(async () => {
    let projects = await getprojects();
    if (projects) {
      projectsStore.update((data) => projects);
    }
  });
</script>

<main class="md:mx-64">
  <section>
    <div class="md:container md:mx-auto my-16">
      <div class="flex">
        <ProfileBar active={"projects"} {userId} />

        <div class="flex-initial w-3/4">
          <!-- tabs -->
          <ProfileTabs active={"projects"} />

          <!-- tabs content -->

          <a
            href="/project/create"
            class="w-full mb-8 bg-blue-700 text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-3 text-center inline-flex items-center justify-center"
          >
            Add new Project
            <iconify-icon class="ml-2" icon="akar-icons:plus" />
          </a>

          {#if $projectsStore}
            {#each $projectsStore as $project}
              <ProjectCard {userId} project={$project} />
            {/each}
          {/if}
        </div>
      </div>
    </div>
  </section>
</main>
