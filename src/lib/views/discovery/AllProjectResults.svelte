<script>
  import ProjectCard from "../../components/ProjectCard.svelte";

  export let searchKeyword;
  let projects = [];
  let userIdLocal = localStorage.getItem("userId");

  if (searchKeyword) getProjects();

  // get all projects
  async function getProjects() {
    let response = await fetch(
      `http://103.187.223.15:8800/api/projects/search/${searchKeyword}`
    );

    if (!response.ok) {
      alert(response.status);
    }

    const data = await response.json();
    let temp = data;
    temp.forEach((element) => {
      // filter private project
      if (element.isPublic == false && element.userId != userIdLocal) {
      } else {
        projects.push(element);
        projects = projects;
      }
    });
  }
</script>

<div class="md:container md:mx-auto my-16">
  <div class="flex justify-center">
    <div class="w-1/2">
      {#if projects.length > 0}
        {#each projects as project}
          <ProjectCard {project} />
        {/each}
      {/if}
    </div>
  </div>
</div>
