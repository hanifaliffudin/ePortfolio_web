<script>
  import { Checkbox } from "flowbite-svelte";
  export let idTodo, idTaskRoadmap, idRoadmap, idProject;
  import AssigneSelect from "../../components/AssigneSelect.svelte";

  const today = new Date().toLocaleDateString("en-CA");

  let userId = localStorage.getItem("userId");

  let desc,
    date,
    title,
    projectData,
    startDateRoadmap,
    endDateRoadmap,
    participants = [],
    tasks = [],
    indexTask,
    images = [],
    roadmap,
    indexRoadmap,
    roadmaps = [],
    todos = [],
    todo,
    indexTodo,
    done = false,
    assigne;

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
    roadmaps = projectData.roadmaps;
    roadmaps.forEach((element, i) => {
      if (element._id == idRoadmap) {
        indexRoadmap = i;
        roadmap = element;
        tasks = roadmap.tasks;
        startDateRoadmap = new Date(element.startDate).toLocaleDateString(
          "en-CA"
        );
        endDateRoadmap = new Date(element.endDate).toLocaleDateString("en-CA");
        tasks = roadmap.tasks;
        tasks.forEach((elementTask, i) => {
          if (elementTask._id == idTaskRoadmap) {
            indexTask = i;
            date = new Date(elementTask.date).toLocaleDateString("en-CA");
            desc = elementTask.desc;
            images = elementTask.images;
            todos = elementTask.todos;
            todos.forEach((elementTodo, i) => {
              if (elementTodo._id == idTodo) {
                indexTodo = i;
                todo = elementTodo;
                title = elementTodo.title;
                done = elementTodo.done;
                assigne = elementTodo.assigne;
              }
            });
          }
        });
      }
    });
  }

  getProject();

  // update todo
  async function updateTodo() {
    todos[indexTodo].title = title;
    todos[indexTodo].done = done;
    todos[indexTodo].assigne = assigne;

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
      window.location.href = `/project/${idProject}/roadmap/${idRoadmap}/task/${idTaskRoadmap}`;
    }
  }
</script>

<main class="md:mx-72">
  <div class="md:container md:mx-auto my-16">
    <form on:submit|preventDefault={updateTodo}>
      <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">
          Add To Do
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
          <Checkbox bind:checked={done}>Done</Checkbox>
        </div>
        <div class="sm:col-span-2">
          <label
            for="assigne"
            class="block mb-2 font-medium text-gray-900 dark:text-white"
            >Assigne</label
          >
          <select
            bind:value={assigne}
            id="assigne"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-1/4 w-full p-2.5"
          >
            <option selected disabled>Assigne to</option>
            {#if participants && participants.length > 0}
              <AssigneSelect userId={projectData.userId} />
              {#each participants as participant}
                <AssigneSelect userId={participant} />
              {/each}
            {/if}
          </select>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <div />
        <div>
          <button
            type="submit"
            class="text-white mr-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Update
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
