<script>
  import { navigate } from "svelte-routing";

  let alert,
    src,
    files,
    userData,
    name,
    nim,
    prodi,
    kota,
    tglLahir,
    gender,
    interest,
    btnCancel;

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
    nim = userData.nim;
    prodi = userData.major;
    kota = userData.city;
    if (userData.dateBirth) {
      tglLahir = new Date(userData.dateBirth).toLocaleDateString("en-CA");
    } else {
      tglLahir = null;
      alert.classList.remove("hidden");
      btnCancel.classList.add("hidden");
    }

    userData.gender ? (gender = userData.gender) : (gender = "male");
    interest = userData.interest;
    if (userData.profilePicture != "") {
      src = "http://127.0.0.1:8800/" + userData.profilePicture;
    } else {
      src = "/icon-user.png";
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
          username: name,
          email: userData.email,
          nim: nim,
          major: prodi,
          city: kota,
          dateBirth: tglLahir,
          gender: gender,
          interest: interest,
        }),
      });
    }

    if (!response.ok) {
      alert(response.statusText);
      console.log(response.status);
      console.log(response.statusText);
    }

    const data = await response.json();
    navigate("/profile");
  }

  // back
  function back() {
    history.back();
  }
</script>

<section class="bg-white dark:bg-gray-900">
  <div class="max-w-2xl px-4 py-8 mx-auto lg:py-16">
    <div
      bind:this={alert}
      class="hidden p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
      role="alert"
    >
      <span class="font-medium">Please complete all details</span>
    </div>
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
            bind:value={nim}
            type="text"
            name="nim"
            id="nim"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            bind:value={prodi}
            type="text"
            name="prodi"
            id="prodi"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your Major"
            required
          />
        </div>
        <div class="w-full">
          <label
            for="city"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Kota</label
          >
          <input
            bind:value={kota}
            type="text"
            name="city"
            id="city"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your city"
            required
          />
        </div>
        <div class="w-full">
          <label
            for="tglLahir"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Tanggal Lahir</label
          >
          <input
            bind:value={tglLahir}
            type="date"
            name="tglLahir"
            id="tglLahir"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your Major"
            required
          />
        </div>
        <div class="w-full">
          <label
            for="gender"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Jenis Kelamin</label
          >
          <select
            bind:value={gender}
            id="gender"
            required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div class="sm:col-span-2">
          <label
            for="interest"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Interest</label
          >
          <textarea
            bind:value={interest}
            id="interest"
            rows="8"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your interest here..."
          />
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
          bind:this={btnCancel}
          type="button"
          on:click={back}
          class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</section>
