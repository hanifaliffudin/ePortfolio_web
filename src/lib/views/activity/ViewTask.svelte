<script>
  import SvelteMarkdown from "svelte-markdown";
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
  import { Carousel, CarouselTransition } from "flowbite-svelte";
  import "@splidejs/svelte-splide/css";

  export let idTask, idActivity;

  let activityData,
    tasks = [],
    task,
    date,
    indexTask,
    images = [];

  let userId = localStorage.getItem("userId");

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
    tasks = activityData.tasks;
    tasks.forEach((element, i) => {
      if (element._id == idTask) {
        indexTask = i;
        task = element;
        date = new Date(element.date).toLocaleDateString("en", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
        images = element.images;
      }
    });
  }

  getActivity();

  //   delete task
  async function deleteTask() {
    tasks = [
      ...tasks.slice(0, indexTask),
      ...tasks.slice(indexTask + 1, tasks.length),
    ];

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
      window.location.href = `/activity/${activityData._id}`;
    }
  }
</script>

{#if task}
  <main class="md:mx-72">
    <div class="md:container md:mx-auto my-16">
      <div class="flex justify-center">
        <div class="flex-initial w-3/4">
          <div class="flex justify-between mb-3 items-center">
            <div>
              <button
                on:click={() =>
                  (window.location.href = "/activity/" + idActivity)}
              >
                <iconify-icon icon="material-symbols:arrow-back-rounded" />
              </button>
            </div>
            {#if userId == activityData.userId}
              <div>
                <Button btnClass="p-0 h-3"
                  ><iconify-icon
                    icon="fluent:more-horizontal-32-filled"
                  /></Button
                >
                <Dropdown class="w-auto">
                  <DropdownItem
                    ><a
                      href={`/activity/${activityData._id}/edit-task/${task._id}`}
                      >Edit</a
                    ></DropdownItem
                  >
                  <DropdownItem on:click={deleteTask}>Delete</DropdownItem>
                </Dropdown>
              </div>
            {/if}
          </div>
          <div class="md:container md:mx-auto ">
            <h1 class="mb-4 text-4xl font-extrabold">{task.title}</h1>
            <div class="text-sm text-gray-600 mb-4">{date}</div>
            <div class="prose prose-neutral text-sm max-w-none">
              <SvelteMarkdown source={task.desc} />
            </div>
            {#if images && images.length > 0}
              <div class="mt-4">
                <Carousel divClass={"h-full"} {images} showThumbs={false} />
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </main>
{/if}
