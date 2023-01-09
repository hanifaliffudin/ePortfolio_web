<script>
  import SvelteMarkdown from "svelte-markdown";
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
  import mermaid from "mermaid";

  export let idTask, idActivity;

  let activityData,
    tasks = [],
    task,
    date,
    mermaidDiagram,
    mermaidOutput,
    indexTask;

  let userId = localStorage.getItem("userId");

  function renderMermaid() {
    mermaid.render("theGraph", mermaidDiagram, function (svgCode) {
      mermaidOutput = svgCode;
    });
  }

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
        if (element.mermaidDiagram) {
          mermaidDiagram = element.mermaidDiagram;
          renderMermaid();
        }
        date = new Date(element.date).toLocaleDateString("en", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
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
          <div class="flex justify-end mb-3">
            {#if userId}
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
            {/if}
          </div>
          <div class="md:container md:mx-auto prose prose-neutral">
            <h1 class="text-center mb-4">{task.title}</h1>
            <div class="flex">
              <div class="text-sm text-gray-600">{date}</div>
            </div>
            <img
              class="w-full h-96 mb-4 object-cover rounded-lg"
              src={task.image}
              alt="Default avatar"
            />
            <div class="">
              <SvelteMarkdown source={task.desc} />
            </div>
            {#if mermaidDiagram}
              <div contenteditable="false" bind:innerHTML={mermaidOutput} />
            {/if}
          </div>
        </div>
      </div>
    </div>
  </main>
{/if}
