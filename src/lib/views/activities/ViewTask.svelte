<script>
  import SvelteMarkdown from "svelte-markdown";
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
  import { Splide, SplideSlide } from "@splidejs/svelte-splide";
  import "@splidejs/svelte-splide/css";

  export let idTask, idActivity;

  let options = {
    arrows: false,
    rewind: true,
    perPage: 1,
    gap: "1rem",
    heightRatio: 0.6,
    cover: true,
    breakpoints: {
      1000: {
        perPage: 1,
      },
    },
  };

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
        if (images && images.length > 1) {
          options = {
            arrows: true,
            rewind: true,
            perPage: 1,
            gap: "1rem",
            heightRatio: 0.6,
            cover: true,
            breakpoints: {
              1000: {
                perPage: 1,
              },
            },
          };
        }
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

    console.log(tasks);

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
              <button on:click={() => history.back()}>
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
            {#if images}
              <div class="mt-4">
                <Splide
                  {options}
                  on:mounted={(e) => console.log(e.detail.splide.length)}
                  on:move={(e) => console.log("move to", e.detail.index)}
                  aria-labelledby="basic-example-heading"
                  class="custom-class"
                >
                  {#each images as image}
                    <SplideSlide>
                      <img class="rounded-lg" alt={image} src={image} />
                    </SplideSlide>
                  {/each}
                </Splide>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </main>
{/if}
