<script>
  import { navigate } from "svelte-routing";
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";

  export let userId;
  let userIdLocal = localStorage.getItem("userId");

  let userData, name, profilePicture, nim, prodi, interest, role, academicField;

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
    prodi = userData.major;
    interest = userData.interest;
    role = userData.role;
    academicField = userData.academicField;
    if (userData.profilePicture) {
      profilePicture = "http://103.187.223.15:8800/" + userData.profilePicture;
    } else {
      profilePicture = "/icon-user.png";
    }
  }

  getUser();
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
      <p class="font-light text-sm">{nim ? nim : ""}</p>
      <p class="text-xl my-2">{prodi ? prodi : ""}</p>
      <p>{interest ? interest : ""}</p>
    {:else}
      <p>{academicField ? academicField : ""}</p>
    {/if}
  </div>
{:else}
  <div class="flex-initial w-1/4 mr-8" />
{/if}
