<script>
  let desc,
    src = "/icon-user.png",
    files,
    visibility;

  // preview profile picture
  function loadFile(e) {
    src = URL.createObjectURL(e.target.files[0]);
  }
</script>

<main class="md:mx-72">
  <div class="md:container md:mx-auto my-16">
    <form>
      <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
        <div>
          <label
            for="logo"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Logo</label
          >
          <img
            class="w-36 h-36 rounded-full profile-picture mb-4 object-cover ring-2 ring-gray-200 p-1"
            {src}
            alt="Default logo"
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
            >Title*</label
          >
          <input
            type="name"
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div class="sm:col-span-2">
          <label
            for="description"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Description</label
          >
          <textarea
            bind:value={desc}
            id="description"
            rows="8"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <div class="flex items-center justify-between">
        <select
          bind:value={visibility}
          id="visibility"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-1/4 w-full p-2.5"
        >
          <option selected value="public">Public</option>
          <option value="private">Private</option>
        </select>
        <div>
          <button
            type="submit"
            class="text-white mr-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
          </button>
          <button
            type="button"
            on:click={() => history.back()}
            class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  </div>
</main>
