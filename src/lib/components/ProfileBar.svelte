<script>
  import { navigate } from "svelte-routing";
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
  import ProjectCardHome from "./ProjectCardHome.svelte";

  export let active;

  export let userId;
  let userIdLocal = localStorage.getItem("userId");

  let userData,
    name,
    profilePicture,
    nim,
    major,
    interest,
    role,
    academicField,
    followers = [],
    following = [],
    followed,
    projects = [];
  // get data user
  async function getUser() {
    const response = await fetch(
      "http://103.187.223.15:8800/api/users/" + userId
    );

    if (!response.ok) {
      navigate("/login");
      localStorage.clear();
    }

    const data = await response.json();
    userData = data;
    name = userData.username;
    nim = userData.nim;
    major = userData.major;
    interest = userData.interest;
    role = userData.role;
    academicField = userData.academicField;
    followers = userData.followers;
    following = userData.following;
    if (followers && followers.includes(userIdLocal)) {
      followed = true;
    }
    if (userData.profilePicture) {
      profilePicture = "http://103.187.223.15:8800/" + userData.profilePicture;
    } else {
      profilePicture = "/icon-user.png";
    }
  }

  getUser();

  if (active == "aboutme") {
    getprojects();
  }

  // get all user projects
  async function getprojects() {
    let response = await fetch(
      "http://103.187.223.15:8800/api/projects/all/" + userId
    );
    if (!response.ok) {
      const data = await response.json();
      console.log(data);
    }

    const data = await response.json();
    projects = data;
  }

  // follow user
  async function follow() {
    const response = await fetch(
      "http://103.187.223.15:8800/api/users/follow/" + userId,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userIdFollowing: userIdLocal,
        }),
      }
    );

    if (!response.ok) {
      console.log(response.status);
      console.log(response.statusText);
    } else {
      const data = await response.json();
      followed = true;
    }
  }

  async function unfollow() {
    const response = await fetch(
      "http://103.187.223.15:8800/api/users/unfollow/" + userId,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userIdUnfollowing: userIdLocal,
        }),
      }
    );

    if (!response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      followed = false;
    }
  }
</script>

{#if userData}
  <div class="flex-initial w-1/4 mr-8">
    <div class="flex justify-center">
      <img
        class="w-48 h-48 rounded-full mb-2 object-cover ring-2 ring-gray-200 p-1"
        src={profilePicture}
        alt="Rounded avatar"
      />
    </div>
    {#if userIdLocal == userId}
      <div class="flex justify-end">
        <Button btnClass="p-0 h-3 mb-4"
          ><iconify-icon icon="fluent:more-horizontal-32-filled" /></Button
        >
        <Dropdown class="w-auto">
          <DropdownItem><a href="/edit-profile">Edit</a></DropdownItem>
        </Dropdown>
      </div>
    {/if}
    <p class="font-bold text-2xl">{name}</p>
    {#if role == "mahasiswa"}
      <p class="font-light text-sm truncate">{nim ? nim : ""}</p>
      <p class="text-xl my-2">{major ? major : ""}</p>
      <p>{interest ? interest : ""}</p>
    {:else}
      <p>{academicField ? academicField : ""}</p>
    {/if}
    <div class="flex gap-3 my-2">
      {#if followers}
        <div><span class="font-bold">{followers.length}</span> Followers</div>
      {:else}
        <div><span class="font-bold">0</span> Followers</div>
      {/if}
      {#if following}
        <div><span class="font-bold">{following.length}</span> Following</div>
      {:else}
        <div><span class="font-bold">0</span> Following</div>
      {/if}
    </div>

    {#if userIdLocal != userId}
      {#if !followed}
        <button
          type="button"
          on:click={follow}
          class="text-white w-full mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          >Follow</button
        >
      {:else}
        <button
          type="button"
          on:click={unfollow}
          class="focus:outline-none w-full mt-4 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          >Unfollow</button
        >
      {/if}
    {/if}

    {#if projects && projects.length > 0}
      {#each projects as project, i}
        {#if i < 3 && !project.endDate && project.isPublic}
          <ProjectCardHome {project} />
        {/if}
      {/each}
    {/if}
  </div>
{:else}
  <div class="flex-initial w-1/4 mr-8" />
{/if}
