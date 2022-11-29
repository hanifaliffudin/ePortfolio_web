<script>
  import { navigate } from "svelte-routing";

  let userId = localStorage.getItem("userId");

  let userData, name, profilePicture, nim, prodi, interest;

  // get data user
  async function getResponse() {
    const response = await fetch("http://localhost:8800/api/users/" + userId);

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
    if (userData.profilePicture) {
      profilePicture = "http://127.0.0.1:8800/" + userData.profilePicture;
    } else {
      profilePicture = "/icon-user.png";
    }
  }

  getResponse();
</script>

<div class="flex-initial w-1/4 mr-8">
  <img
    class="w-full h-auto rounded-full mb-2"
    src={profilePicture}
    alt="Rounded avatar"
  />
  <div class="flex justify-end">
    <button
      id="multiLevelDropdownButton"
      data-dropdown-toggle="dropdown"
      class="font-medium h-3 justify-self-end"
      type="button"
    >
      <iconify-icon icon="fluent:more-horizontal-32-filled" />
    </button>
    <!-- Dropdown menu -->
    <div
      id="dropdown"
      class="hidden z-10 w-32 bg-white rounded divide-y divide-gray-100 shadow"
    >
      <ul
        class="py-1 text-sm text-gray-700"
        aria-labelledby="multiLevelDropdownButton"
      >
        <li>
          <a href="/edit-profile" class="block py-2 px-4 hover:bg-gray-100"
            >Edit</a
          >
        </li>
      </ul>
    </div>
  </div>
  <p class="font-bold text-2xl">{name}</p>
  <p class="font-light text-sm">{nim}</p>
  <p class="text-xl my-2">{prodi}</p>
  <p>{interest}</p>
</div>
