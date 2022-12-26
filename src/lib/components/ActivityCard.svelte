<script>
  import { start } from "@popperjs/core";
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";

  export let activity;

  let userId = localStorage.getItem("userId");

  let userIdActivity, desc, date, title, type, startDate, endDate;

  if (activity) {
    title = activity.title;
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

  // delete achievement
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
      alert("You can only delete your achievement");
    } else {
      document.location.href = "/activities";
    }

    // const data = await response.json();
  }
</script>

<hr />
<div class="flex my-4">
  <div class="w-full">
    <div class="flex">
      <div class="ml-4 ">
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
          <div class="font-light text-sm">
            {type == "academic" ? "Academic" : "Non Academic"}
          </div>
          {#if endDate}
            <div class="font-light text-sm">
              {startDate.toLocaleDateString("id")} - {endDate.toLocaleDateString(
                "id"
              )}
            </div>
          {:else}
            <div class="font-light text-sm">
              {startDate.toLocaleDateString("id")}
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
