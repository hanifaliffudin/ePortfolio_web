<script>
  import { Progressbar } from "flowbite-svelte";
  import AvatarStack from "./AvatarStack.svelte";

  export let idProject,
    projectData,
    roadmaps,
    task,
    assignee = [];

  let percent,
    doneLength = 0,
    todosLength;

  todosLength = task.todos.length;

  task.todos.forEach((element) => {
    if (element.done) {
      doneLength += 1;
    }
    element.assignee.forEach((assigne) => {
      if (!assignee.includes(assigne)) {
        assignee.push(assigne);
      }
    });
  });

  if (todosLength > 0) {
    percent = Math.round((doneLength / todosLength) * 100);
  }

  var t2 = new Date().getTime();
  var t1 = new Date(task.date).getTime();

  if (
    Math.floor((t2 - t1) / (24 * 3600 * 1000)) >= 0 &&
    task.status == "prepare"
  ) {
    updateTask();
  } else {
    let taskDate = new Date(task.date).toLocaleDateString("id");
    let now = new Date().toLocaleDateString("id");
    if (taskDate == now && task.status == "prepare") {
      updateTask();
    }
  }

  // update task
  async function updateTask() {
    task.status = "todo";

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
      window.location.reload();
    }
  }
</script>

<div class="flex items-center border border-t-0 p-2">
  <iconify-icon icon="material-symbols:task-outline-rounded" class="mr-2" />
  <div class="line-clamp-1 w-1/3">
    {task.title}
  </div>
  {#if todosLength > 0}
    <div class="mx-4 w-28">
      <Progressbar progress={percent} size="h-4" labelInside />
    </div>
  {/if}

  <div class="flex-auto" />

  {#if task.status}
    {#if task.status == "prepare"}
      <div
        class="mr-8 ring-1 ring-gray-400  text-xs font-semibold text-gray-600 items-center inline-flex rounded-full px-2"
      >
        Prepare
      </div>
    {:else if task.status == "todo"}
      <div
        class="mr-8 ring-1 ring-gray-400  text-xs font-semibold text-gray-600 items-center inline-flex rounded-full px-2"
      >
        To Do
      </div>
    {:else if task.status == "inprogress"}
      <div
        class="mr-8 ring-1 ring-blue-400  text-xs font-semibold text-blue-600 items-center inline-flex rounded-full px-2"
      >
        In Progress
      </div>
    {:else if task.status == "complete"}
      <div
        class="mr-8 ring-1 ring-green-400  text-xs font-semibold text-green-600 items-center inline-flex rounded-full px-2"
      >
        Complete
      </div>
    {/if}
  {/if}
  <div class="flex mr-4 -space-x-4">
    {#each assignee as assigne}
      <AvatarStack userId={assigne} />
    {/each}
  </div>
  <div>
    {new Date(task.date).toLocaleDateString("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}
  </div>
</div>
