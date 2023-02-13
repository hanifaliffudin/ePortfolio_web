<script>
  export let userId;

  let userIdLocal = localStorage.getItem("userId");

  let userData,
    profilePicture,
    nameUser,
    roleUser,
    nimUser,
    majorUser,
    interestUser,
    organizationUser,
    academicField;

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
    organizationUser = userData.organization;
    roleUser = userData.role;
    interestUser = userData.interest;
    academicField =
      userData.academicField != "undefined" ? userData.academicField : null;
    if (userData.profilePicture) {
      profilePicture = "http://103.187.223.15:8800/" + userData.profilePicture;
    } else {
      profilePicture = "/icon-user.png";
    }
  }

  getUserDiscovery();
</script>

{#if userData}
  <div>
    <a
      href={userIdLocal == userId ? "/profile" : "/profile/" + userId}
      class="block text-center p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 h-52"
    >
      <div class="flex justify-center">
        <img
          class="w-12 h-12 rounded-full mb-3 object-cover"
          src={profilePicture}
          alt="Rounded avatar"
        />
      </div>
      <h5 class="text-xl font-bold tracking-tight text-gray-900 line-clamp-1">
        {nameUser}
      </h5>
      {#if roleUser == "mahasiswa"}
        <p
          class="font-light text-sm text-gray-700 dark:text-gray-400 mb-2 line-clamp-1"
        >
          {nimUser}
        </p>
        <p class="line-clamp-1">{majorUser}</p>
      {:else}
        <div class="line-clamp-2 mt-3">
          {academicField ? academicField : ""}
        </div>
      {/if}
      <p class="line-clamp-1">{organizationUser ? organizationUser : ""}</p>
    </a>
  </div>
{/if}
