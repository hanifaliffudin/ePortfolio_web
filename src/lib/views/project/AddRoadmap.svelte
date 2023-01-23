<script>
  export let idProject;

  const today = new Date().toLocaleDateString("en-CA");

  let userId = localStorage.getItem("userId");

  let desc,
    title,
    projectData,
    startDateProject,
    endDateProject,
    startDateRoadmap,
    endDateRoadmap,
    roadmaps = [];

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
    startDateProject = new Date(projectData.startDate).toLocaleDateString(
      "en-CA"
    );
    if (projectData.endDate) {
      endDateProject = new Date(projectData.endDate).toLocaleDateString(
        "en-CA"
      );
    }
    roadmaps = projectData.roadmaps;
  }

  getProject();

  // add roadmap
  async function addRoadmap() {
    let newroadmap = {
      title,
      startDate: startDateRoadmap,
      endDate: endDateRoadmap,
      desc,
    };

    roadmaps.splice(0, 0, newroadmap);

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
      //   alert(response.statusText);
      const data = await response.json();
      console.log(data);
    } else {
      const data = await response.json();
      window.location.href = "/project/" + idProject;
    }
  }

  function checkDiff() {
    if (!startDateRoadmap) {
      alert("Please select start date first");
      endDateRoadmap = null;
    } else {
      var t2 = new Date(endDateRoadmap).getTime();
      var t1 = new Date(startDateRoadmap).getTime();

      if (Math.floor((t2 - t1) / (24 * 3600 * 1000)) < 0) {
        alert("End date should be greater than start date");
        endDateRoadmap = null;
      }
    }
  }
</script>

<main class="md:mx-72">
  <div class="md:container md:mx-auto my-16">
    <form on:submit|preventDefault={addRoadmap}>
      <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">
          Add Roadmap
        </h2>
        <div class="sm:col-span-2">
          <label
            for="title"
            class="block mb-2 font-medium text-gray-900 dark:text-white"
            >Title*</label
          >
          <input
            bind:value={title}
            type="title"
            id="title"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div class="w-full">
          <label
            for="startDate"
            class="block mb-2 font-medium text-gray-900 dark:text-white"
            >Start Date*</label
          >
          {#if endDateProject}
            <input
              required
              min={startDateProject}
              max={endDateProject}
              bind:value={startDateRoadmap}
              type="date"
              name="startDate"
              id="startDate"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your Major"
            />
          {:else}
            <input
              required
              min={startDateProject}
              bind:value={startDateRoadmap}
              type="date"
              name="startDate"
              id="startDate"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your Major"
            />
          {/if}
        </div>
        <div class="w-full">
          <label
            for="endDate"
            class="block mb-2 font-medium text-gray-900 dark:text-white"
            >End Date*</label
          >
          {#if endDateProject}
            <input
              required
              on:change={checkDiff}
              bind:value={endDateRoadmap}
              max={endDateProject}
              min={startDateProject}
              type="date"
              name="endDateRoadmap"
              id="endDate"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your Major"
            />
          {:else}
            <input
              required
              on:change={checkDiff}
              bind:value={endDateRoadmap}
              min={startDateProject}
              type="date"
              name="endDateRoadmap"
              id="endDate"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your Major"
            />
          {/if}
        </div>

        <div class="sm:col-span-2">
          <label
            for="description"
            class="block mb-2 font-medium text-gray-900 dark:text-white"
            >Description</label
          >
          <textarea
            bind:value={desc}
            id="description"
            rows="8"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <div class="mt-1 text-sm">
            *
            <a
              class="text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.markdownguide.org/basic-syntax/">Markdown</a
            > is supported
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <div />
        <div>
          <button
            type="submit"
            class="text-white mr-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add
          </button>
          <button
            type="button"
            on:click={() => history.back()}
            class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  </div>
</main>
