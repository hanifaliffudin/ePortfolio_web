<script>
  import { navigate } from "svelte-routing";

  let src, files, userData, name;

  // preview profile picture
  function loadFile(e) {
    src = URL.createObjectURL(e.target.files[0]);
  }

  // get userId from localStorage
  let userId = localStorage.getItem("userId");

  // get data user
  async function getUser() {
    const response = await fetch("http://localhost:8800/api/users/" + userId, {
      method: "GET",
    });

    if (!response.ok) {
      navigate("/login");
      localStorage.clear();
    }

    const data = await response.json();
    userData = data;
    name = userData.username;
    if (userData.profilePicture) {
      src = "http://127.0.0.1:8800/" + userData.profilePicture;
    }
  }

  getUser();

  // update data user
  async function update() {
    let response;
    if (files) {
      var dataUpdate = new FormData();
      dataUpdate.append("userId", userId);
      dataUpdate.append("email", userData.email);
      dataUpdate.append("username", name);
      dataUpdate.append("profilePicture", files[0]);

      response = await fetch("http://localhost:8800/api/users/" + userId, {
        method: "PUT",
        body: dataUpdate,
      });
    } else {
      response = await fetch("http://localhost:8800/api/users/" + userId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          email: userData.email,
          username: name,
        }),
      });
    }

    if (!response.ok) {
      alert(response.statusText);
      console.log(response.status);
      console.log(response.statusText);
    }

    const data = await response.json();
    location.reload();
  }
</script>

<section class="bg-white dark:bg-gray-900">
  <div class="max-w-2xl px-4 py-8 mx-auto lg:py-16">
    <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
      Update Profile
    </h2>
    <form
      action="#"
      on:submit|preventDefault={update}
      enctype="multipart/form-data"
    >
      <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
        <div>
          <img
            class="w-36 h-36 rounded-full profile-picture mb-4 object-cover"
            {src}
            alt="Default avatar"
          />
          <input
            bind:files
            on:change={loadFile}
            type="file"
            accept=".jpg, .jpeg, .png"
          />
        </div>
        <div class="sm:col-span-2">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Nama</label
          >
          <input
            bind:value={name}
            type="text"
            name="name"
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Type your name"
            required
          />
        </div>
        <div class="w-full">
          <label
            for="nim"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >NIM</label
          >
          <input
            type="text"
            name="nim"
            id="nim"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value="175150200111060"
            placeholder="Your NIM"
            required
          />
        </div>
        <div class="w-full">
          <label
            for="prodi"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Program Studi</label
          >
          <input
            type="text"
            name="prodi"
            id="prodi"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value="Teknik Informatika"
            placeholder="Your Major"
            required
          />
        </div>

        <div class="sm:col-span-2">
          <label
            for="headline"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Headline</label
          >
          <textarea
            id="headline"
            rows="8"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write a product headline here..."
            >Enthusiast at Android Developer, Web Developer, and UX/UI Design</textarea
          >
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Update
        </button>
        <button
          type="button"
          class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</section>
