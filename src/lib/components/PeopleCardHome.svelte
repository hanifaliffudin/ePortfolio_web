<script>
  export let userId;

  let userData,
    profilePicture,
    nameUser,
    roleUser,
    nimUser,
    majorUser,
    interestUser,
    organization,
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
    organization = userData.organization;
    if (userData.profilePicture) {
      profilePicture = "http://103.187.223.15:8800/" + userData.profilePicture;
    } else {
      profilePicture = "/icon-user.png";
    }
  }

  getUserDiscovery();
</script>

{#if userData}
  <div class="mb-2">
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
          <div class="font-bold text-lg leading-tight line-clamp-1">
            {nameUser}
          </div>
          {#if roleUser == "mahasiswa"}
            <div class="text-sm line-clamp-1">{majorUser}</div>
          {:else}
            <div class="text-sm line-clamp-1">
              {academicField ? academicField + "asdasdsaasd" : ""}
            </div>
          {/if}
          <div class="text-sm line-clamp-1">
            {organization ? organization : ""}
          </div>
          <button>
            <button
              type="button"
              class="text-white w-full mt-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 mr-2 mb-2"
              >Follow</button
            >
          </button>
        </div>
      </a>
    </div>
  </div>
{/if}
