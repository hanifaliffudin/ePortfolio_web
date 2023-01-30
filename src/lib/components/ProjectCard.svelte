<script>
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";

  export let project;

  let userId = localStorage.getItem("userId");

  let userIdProject,
    image,
    desc,
    date,
    title,
    type,
    startDate,
    endDate,
    requests = [];

  if (project) {
    title = project.title;
    image = project.image;
    desc = project.desc;
    type = project.type;
    userIdProject = project.userId;
    requests = project.requests;
    startDate = new Date(project.startDate);
    if (project.endDate) {
      endDate = new Date(project.endDate);
    }

    if (project.createdAt != project.updatedAt) {
      date = new Date(project.createdAt);
    } else {
      date = new Date(project.createdAt);
    }
  }

  // delete project
  async function deleteProject() {
    const response = await fetch(
      "http://103.187.223.15:8800/api/projects/" + project._id,
      {
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
          userId: project.userId,
        }),
      }
    );

    if (!response.ok) {
      alert("You can only delete your project");
    } else {
      document.location.href = "/projects";
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
      <div class="self-center">
        <div>
          <div class="flex">
            <a href="/project/{project._id}">
              <div
                class="font-bold text-blue-600 text-xl hover:underline leading-tight line-clamp-1"
              >
                {title}
              </div></a
            >
            {#if !project.isPublic}
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
      <div>
        {#if project.userId == userId}
          <div>Leader</div>
          {#if requests && requests.length > 0}
            <a href="/project/{project._id}">
              <div class="text-sm text-red-500 flex items-center">
                <iconify-icon
                  class="mr-2"
                  icon="mdi:bell-notification-outline"
                />
                There is a request for participation
              </div>
            </a>
          {/if}
        {:else if project.participants.includes(userId)}
          <div>Participant</div>
        {/if}
      </div>
      <div class="flex-auto" />
      {#if userId == userIdProject || project.participants.includes(userId)}
        <Button btnClass="p-0 h-3"
          ><iconify-icon icon="fluent:more-horizontal-32-filled" /></Button
        >
        <Dropdown class="w-auto">
          <DropdownItem
            ><a href="/project/edit/{project._id}">Edit</a></DropdownItem
          >
          {#if !project.participants.includes(userId)}
            <DropdownItem on:click={deleteProject}>Delete</DropdownItem>
          {/if}
        </Dropdown>
      {/if}
    </div>
  </div>
  <div />
</div>
