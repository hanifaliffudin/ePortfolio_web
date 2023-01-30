<script>
  export let userId, leader;

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
  async function getUserDiscovery() {
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

  getUserDiscovery();
</script>

{#if userData}
  <div class="md:container md:mx-auto p-2">
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
          <div class="flex items-center">
            <div class="font-bold text-lg leading-tight">
              {nameUser}
            </div>
            {#if leader}
              <div
                class="mx-3 mt-1 h-5 ring-1 ring-gray-400  text-xs font-semibold text-gray-600 items-center inline-flex rounded-full px-2"
              >
                Leader
              </div>
            {/if}
          </div>
          {#if roleUser == "mahasiswa"}
            <div class="font-light text-sm">{majorUser}</div>
            <div class="line-clamp-1">{interestUser}</div>
          {:else}
            <div class="line-clamp-1 w-96">
              {academicField ? academicField : ""}
            </div>
          {/if}
        </div>
      </a>
    </div>
  </div>
{/if}
