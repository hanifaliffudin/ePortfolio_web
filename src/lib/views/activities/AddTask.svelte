<script>
  export let idActivity;

  const today = new Date().toLocaleDateString("en-CA");

  let userId = localStorage.getItem("userId");

  let desc,
    date,
    title,
    image,
    activityData,
    startDateActivity,
    endDateActivity,
    tasks = [],
    mermaidInput;

  // get data activity
  async function getActivity() {
    const response = await fetch(
      "http://103.187.223.15:8800/api/activities/" + idActivity
    );

    if (!response.ok) {
      alert(response.statusText);
    }
    const data = await response.json();
    activityData = data;
    startDateActivity = new Date(activityData.startDate).toLocaleDateString(
      "en-CA"
    );
    if (activityData.endDate) {
      endDateActivity = new Date(activityData.endDate).toLocaleDateString(
        "en-CA"
      );
    }
    tasks = activityData.tasks;
  }

  getActivity();

  // add task
  async function addTask() {
    let newtask = {
      title,
      image,
      date,
      desc,
      mermaidDiagram: mermaidInput,
    };

    tasks.splice(0, 0, newtask);

    const response = await fetch(
      "http://103.187.223.15:8800/api/activities/" + idActivity,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          tasks,
        }),
      }
    );

    if (!response.ok) {
      alert(response.statusText);
    } else {
      const data = await response.json();
      window.location.href = "/activity/" + idActivity;
    }
  }
</script>

<main class="md:mx-72">
  <div class="md:container md:mx-auto my-16">
    <form on:submit|preventDefault={addTask}>
      <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">
          Add Task
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
        <div class="sm:col-span-2">
          <label
            for="image"
            class="block mb-2 font-medium text-gray-900 dark:text-white"
            >Image*</label
          >
          <input
            bind:value={image}
            required
            type="text"
            id="image"
            placeholder="Ex: https://www.url.com/path/filename.png"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <div class="text-sm mt-2">
            * You can insert image address from <a
              class="text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
              href="/albums">Albums</a
            >
          </div>
        </div>
        <div class="w-full">
          <label
            for="date"
            class="block mb-2 font-medium text-gray-900 dark:text-white"
            >Date*</label
          >
          {#if endDateActivity}
            <input
              required
              bind:value={date}
              max={endDateActivity}
              min={startDateActivity}
              type="date"
              name="date"
              id="date"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your Major"
            />
          {:else}
            <input
              required
              bind:value={date}
              max={today}
              min={startDateActivity}
              type="date"
              name="date"
              id="date"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your Major"
            />
          {/if}
        </div>

        <div class="sm:col-span-2">
          <label
            for="description"
            class="block mb-2 font-medium text-gray-900 dark:text-white"
            >Description*</label
          >
          <textarea
            required
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
        <div class="sm:col-span-2">
          <label
            for="diagram"
            class="block mb-2 font-medium text-gray-900 dark:text-white"
            >Diagram</label
          >
          <textarea
            bind:value={mermaidInput}
            id="diagram"
            rows="8"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
          <div class="mt-1 text-sm">
            * Use
            <a
              class="text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
              href="https://mermaid.js.org/syntax/flowchart.html">Mermaid</a
            > to create a diagram
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
