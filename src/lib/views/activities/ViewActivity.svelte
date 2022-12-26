<script>
  export let idActivity;
  import { Button } from "flowbite-svelte";
  import SvelteMarkdown from "svelte-markdown";
  import { navigate } from "svelte-routing";

  let activityData, desc, title, type, startDate, endDate;

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
    console.log(activityData);
    desc = activityData.desc;
    title = activityData.title;
    type = activityData.type;
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

    // const data = await response.json();
  }
</script>

<main class="md:mx-72">
  <div class="md:container md:mx-auto my-16">
    <div class="flex justify-between mb-6">
      <div class="">
        <div>
          <div class="font-bold text-xl leading-tight">
            {title}
          </div>
          <div class="font-light text-sm">
            {type == "academic" ? "Academic" : "Non Academic"}
          </div>
          {#if endDate}
            <div class="font-light text-sm">
              {startDate} - {endDate}
            </div>
          {:else}
            <div class="font-light text-sm">
              {startDate}
            </div>
          {/if}
        </div>
      </div>
      <div>
        <Button color="green"
          ><a href="/activity/add-file/{idActivity}">Add file</a></Button
        >
      </div>
    </div>

    <div>
      <div class="prose prose-neutral">
        <SvelteMarkdown source={desc} />
      </div>
      <div class="border border-r-0 border-l-0 border-b-0 mt-6">
        <div class="flex items-center border border-t-0 p-2">
          <img class="w-8 mr-4" src="/icon-user.png" alt="" />
          <div>Pengenalan pemrograman dasar dengan Java 1</div>
          <div class="flex-auto" />
          <div>pemrograman1.docx</div>
        </div>
        <div class="flex items-center border border-t-0 p-2">
          <img class="w-8 mr-4" src="/icon-user.png" alt="" />
          <div>Pengenalan pemrograman dasar dengan Java 1</div>
          <div class="flex-auto" />
          <div>pemrograman1.docx</div>
        </div>
        <div class="flex items-center border border-t-0 p-2">
          <img class="w-8 mr-4" src="/icon-user.png" alt="" />
          <div>Pengenalan pemrograman dasar dengan Java 1</div>
          <div class="flex-auto" />
          <div>pemrograman1.docx</div>
        </div>
        <div class="flex items-center border border-t-0 p-2">
          <img class="w-8 mr-4" src="/icon-user.png" alt="" />
          <div>Pengenalan pemrograman dasar dengan Java 1</div>
          <div class="flex-auto" />
          <div>pemrograman1.docx</div>
        </div>
        <div class="flex items-center border border-t-0 p-2">
          <img class="w-8 mr-4" src="/icon-user.png" alt="" />
          <div>Pengenalan pemrograman dasar dengan Java 1</div>
          <div class="flex-auto" />
          <div>pemrograman1.docx</div>
        </div>
      </div>
    </div>
  </div>
</main>
