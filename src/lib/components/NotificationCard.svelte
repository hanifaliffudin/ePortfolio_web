<script>
  import { DropdownItem } from "flowbite-svelte";
  export let idProject, idUser;

  let userData, name, profilePicture;

  // get data user
  async function getUser() {
    const response = await fetch(
      "http://103.187.223.15:8800/api/users/" + idUser
    );

    if (!response.ok) {
      window.location.href = "/login";
      localStorage.clear();
    }

    const data = await response.json();
    userData = data;
    name = userData.username;
    if (userData.profilePicture) {
      profilePicture = "http://103.187.223.15:8800/" + userData.profilePicture;
    } else {
      profilePicture = "/icon-user.png";
    }
  }

  getUser();
</script>

<a href="/project/{idProject}">
  <DropdownItem class="flex space-x-4">
    <img
      class="w-11 h-11 rounded-full object-cover"
      src={profilePicture}
      alt="Rounded avatar"
    />
    <div class=" w-full">
      <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
        New request for project participation from
        <span class="font-semibold text-gray-900 dark:text-white">{name}</span>
      </div>
      <!-- <div class="text-xs text-blue-600 dark:text-blue-500">
        a few moments ago
      </div> -->
    </div>
  </DropdownItem>
</a>
