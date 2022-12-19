<script>
  export let userId;

  let userData,
    profilePicture,
    nameUser,
    roleUser,
    nimUser,
    majorUser,
    interestUser,
    academicField;

  let userIdLocal = localStorage.getItem("userId");

  // get data user
  async function getUser() {
    const response = await fetch(
      "http://103.187.223.15:8800/api/users/" + userId
    );

    if (!response.ok) {
      console.log(response.statusText);
    }

    const data = await response.json();
    userData = data;
    nameUser = userData.username;
    nimUser = userData.nim;
    majorUser = userData.major;
    roleUser = userData.role;
    interestUser = userData.interest;
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
  <div class="md:container md:mx-auto bg-gray-100 p-6">
    <div class="flex">
      <a
        href={userIdLocal == userId ? "/profile" : "/profile/" + userId}
        class="flex"
      >
        <img
          class="w-14 h-14 rounded-full object-cover"
          src={profilePicture}
          alt="Rounded avatar"
        />
        <div class="ml-4">
          <div class="font-bold text-lg hover:underline leading-tight">
            {nameUser}
          </div>
          {#if roleUser == "mahasiswa"}
            <div class="font-light text-sm">{nimUser}</div>
            <div class="font-light text-sm">{majorUser}</div>
            <div>{interestUser}</div>
          {:else}
            <div class="truncate w-96">{academicField}</div>
          {/if}
        </div>
      </a>
    </div>
  </div>
{/if}
