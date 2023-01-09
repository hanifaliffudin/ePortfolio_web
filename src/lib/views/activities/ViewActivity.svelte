<script>
  export let idActivity;
  import SvelteMarkdown from "svelte-markdown";
  import { navigate } from "svelte-routing";
  import mermaid from "mermaid";

  let activityData,
    image,
    desc,
    mermaidDiagram,
    mermaidOutput,
    title,
    type,
    startDate,
    endDate,
    tasks = [];

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
    desc = activityData.desc;
    if (activityData.mermaidDiagram) {
      mermaidDiagram = activityData.mermaidDiagram;
      renderMermaid();
    }
    image = activityData.image;
    title = activityData.title;
    type = activityData.type;
    tasks = activityData.tasks;
    tasks.sort(function (a, b) {
      // @ts-ignore
      return new Date(a.date) - new Date(b.date);
    });
    startDate = new Date(activityData.startDate).toLocaleDateString("id");
    if (activityData.endDate) {
      endDate = new Date(activityData.endDate).toLocaleDateString("id");
    }
  }

  getActivity();

  // delete activity
  async function deleteActivity() {
    const response = await fetch(
      "http://103.187.223.15:8800/api/activities/" + idActivity,
      {
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
          userId: userId,
        }),
      }
    );

    if (!response.ok) {
      alert("You can only delete your activity");
    } else {
      navigate("/activities");
    }

    const data = await response.json();
  }
</script>

{#if activityData}
  <main class="md:mx-72">
    <div class="md:container md:mx-auto my-16">
      <div class="flex mb-6 items-center">
        <img class="h-16 w-16 object-cover rounded-full" src={image} alt="" />
        <div class="ml-4">
          <div>
            <div class="font-bold text-xl leading-tight">
              {title}
            </div>
            <div class="text-sm">
              {type == "academic" ? "Academic" : "Non Academic"}
            </div>
            {#if endDate}
              <div class="text-sm">
                {startDate} - {endDate}
              </div>
            {:else}
              <div class="text-sm">
                {startDate} - Present
              </div>
            {/if}
          </div>
        </div>
        <div class="flex-auto" />
        {#if userId == activityData.userId}
          <div>
            <a
              href="/activity/add-task/{idActivity}"
              type="button"
              class="focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >Add Task</a
            >

            <a
              href="/activity/edit/{idActivity}"
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 "
              ><iconify-icon icon="material-symbols:edit" /></a
            >
            <button
              on:click={deleteActivity}
              type="button"
              class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 "
              ><iconify-icon icon="material-symbols:delete-outline" /></button
            >
          </div>
        {/if}
      </div>

      <div>
        <div class="prose prose-neutral">
          <SvelteMarkdown source={desc} />
        </div>
        {#if mermaidDiagram}
          <div contenteditable="false" bind:innerHTML={mermaidOutput} />
        {/if}
        <div class="border border-r-0 border-l-0 border-b-0 mt-6">
          {#if tasks}
            {#each tasks as task}
              <a
                href={`/activity/${activityData._id}/task/${task._id}`}
                class="hover:underline"
              >
                <div class="flex items-center border border-t-0 p-2">
                  <div>
                    {task.title}
                  </div>
                  <div class="flex-auto" />
                  <div>{new Date(task.date).toLocaleDateString("id")}</div>
                </div>
              </a>
            {/each}
          {/if}
        </div>
      </div>
    </div>
  </main>
{/if}
