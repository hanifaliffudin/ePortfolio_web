<script>
  import { Popover } from "flowbite-svelte";
  export let userId;

  let userData, profilePicture, nameUser;

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
    if (userData.profilePicture) {
      profilePicture = "http://103.187.223.15:8800/" + userData.profilePicture;
    } else {
      profilePicture = "/icon-user.png";
    }
  }

  getUser();
</script>

<a href={userIdLocal == userId ? "/profile" : "/profile/" + userId}>
  <img
    id="b{userId}"
    class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
    src={profilePicture}
    alt=""
  />
  <Popover class="w-auto text-sm font-light " triggeredBy="#b{userId}">
    {nameUser}
  </Popover>
</a>
