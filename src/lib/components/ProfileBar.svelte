<script>
  import { navigate } from "svelte-routing";

  let userId = localStorage.getItem("userId");

  let userData, name, profilePicure;

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
    profilePicure = userData.profilePicure;
  }

  getResponse();
</script>

<div class="flex-initial w-1/4 mr-8">
  <img
    class="w-full h-auto rounded-full mb-2"
    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
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
  <p class="font-light text-sm">175150201111007</p>
  <p class="text-xl my-2">Informatic Engineering</p>
  <p>Enthusiast at Android Developer, Web Developer, and UX/UI Design</p>
</div>
