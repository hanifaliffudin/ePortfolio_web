<script>
  import { Progressbar } from "flowbite-svelte";
  import AvatarStack from "./AvatarStack.svelte";

  export let task, assignee;

  let percent,
    doneLength = 0,
    todosLength;

  todosLength = task.todos.length;

  task.todos.forEach((element) => {
    if (element.done) {
      doneLength += 1;
    }
  });

  if (todosLength > 0) {
    percent = (doneLength / todosLength) * 100;
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
    {#each task.todos as todo}
      {#if !assignee.includes(todo.assigne)}
        <div class="hidden">{assignee.push(todo.assigne)}</div>
      {/if}
    {/each}
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
