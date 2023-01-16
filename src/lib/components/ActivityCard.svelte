<script>
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
  import { writable } from "svelte/store";

  const filesStore = writable(null);
  export let activity;

  let userId = localStorage.getItem("userId");

  let userIdActivity,
    image,
    desc,
    date,
    title,
    type,
    startDate,
    endDate,
    filesData;

  if (activity) {
    getFiles();
    title = activity.title;
    image = activity.image;
    desc = activity.desc;
    type = activity.type;
    userIdActivity = activity.userId;
    startDate = new Date(activity.startDate);
    if (activity.endDate) {
      endDate = new Date(activity.endDate);
    }

    if (activity.createdAt != activity.updatedAt) {
      date = new Date(activity.createdAt);
    } else {
      date = new Date(activity.createdAt);
    }
  }

  // get files
  async function getFiles() {
    const response = await fetch(
      "http://103.187.223.15:8800/api/activities/files/" + activity._id
    );

    if (!response.ok) {
      alert(response.statusText);
    }
    const data = await response.json();
    filesData = data;
    if (filesData) {
      filesStore.update((data) => filesData);
    }
  }

  // delete activity
  async function deleteActivity() {
    const response = await fetch(
      "http://103.187.223.15:8800/api/activities/" + activity._id,
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
      document.location.href = "/activities";
    }
  }
</script>

<hr />
<div class="flex my-4 px-6">
  <div class="w-full">
    <div class="flex">
      {#if image}
        <img
          class="h-16 w-16 object-cover mr-4 rounded-full self-center"
          src={image}
          alt=""
        />
      {/if}
      <div class=" self-center">
        <div>
          <div class="flex">
            <a href="/activity/{activity._id}">
              <div
                class="font-bold text-blue-600 text-xl hover:underline leading-tight"
              >
                {title}
              </div></a
            >
            {#if !activity.isPublic}
              <div
                class="ml-3 mt-1 h-5 ring-1 ring-gray-400  text-xs font-semibold text-gray-600 items-center inline-flex rounded-full px-2"
              >
                Private
              </div>
            {/if}
          </div>
          <div class="text-sm">
            {type == "academic" ? "Academic" : "Non Academic"}
          </div>
          {#if endDate}
            <div class="text-sm">
              {startDate.toLocaleDateString("id")} - {endDate.toLocaleDateString(
                "id"
              )}
            </div>
          {:else}
            <div class="text-sm">
              {startDate.toLocaleDateString("id")} - Present
            </div>
          {/if}
        </div>
      </div>

      <div class="flex-auto" />
      {#if userId == userIdActivity}
        <Button btnClass="p-0 h-3"
          ><iconify-icon icon="fluent:more-horizontal-32-filled" /></Button
        >
        <Dropdown class="w-auto">
          <DropdownItem
            ><a href="/activity/edit/{activity._id}">Edit</a></DropdownItem
          >
          <DropdownItem on:click={deleteActivity}>Delete</DropdownItem>
        </Dropdown>
      {/if}
    </div>
  </div>
  <div />
</div>
