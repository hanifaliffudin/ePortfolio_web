<script>
  import SvelteMarkdown from "svelte-markdown";

  let userId = localStorage.getItem("userId");

  let userData,
    title = "",
    desc,
    blocks = [];

  // get data user
  async function getUser() {
    const response = await fetch(
      "http://103.187.223.15:8800/api/users/" + userId,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      document.location.href = "/login";
      localStorage.clear();
    }

    const data = await response.json();
    userData = data;
    blocks = userData.blockProfile;
  }

  getUser();

  // update data user
  async function update() {
    let response;

    let newBlock = { title, desc };
    blocks.push(newBlock);

    response = await fetch("http://103.187.223.15:8800/api/users/" + userId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        blockProfile: blocks,
        // about: desc,
      }),
    });

    if (!response.ok) {
      alert(response.statusText);
      console.log(response.status);
      console.log(response.statusText);
    } else {
      const data = await response.json();
      document.location.href = "/profile";
    }
  }
</script>

<section class="flex">
  <div class="py-8 px-4 w-1/2 lg:py-8">
    <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
      Add Block
    </h2>

    <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
      <div class="sm:col-span-2">
        <label
          for="title"
          class="block mb-2 font-medium text-gray-900 dark:text-white"
          >Title</label
        >
        <input
          bind:value={title}
          type="text"
          id="title"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div class="sm:col-span-2">
        <label
          for="description"
          class="block mb-2 font-medium text-gray-900 dark:text-white"
          >Description</label
        >
        <textarea
          bind:value={desc}
          id="description"
          rows="8"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
      </div>
    </div>
    <div class="mt-1 text-sm">
      *
      <a
        class="text-blue-600"
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.markdownguide.org/basic-syntax/">Markdown</a
      > is supported
    </div>
    <div class="flex justify-end items-center mt-4 space-x-2">
      <button
        on:click={update}
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >Add</button
      >
      <button
        type="button"
        on:click={() => history.back()}
        class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
      >
        Cancel
      </button>
    </div>
  </div>
  <div class="py-8 px-4 w-1/2 lg:py-8">
    <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
      Preview
    </h2>
    <div class="bg-gray-300 rounded-md p-4 mb-8">
      <div class="flex justify-between align-middle mb-2">
        <h2 class="font-bold text-xl">{title}</h2>
      </div>
      <div
        class="bg-white p-3 rounded-md prose prose-neutral text-sm max-w-none"
      >
        <SvelteMarkdown source={desc} />
      </div>
    </div>
  </div>
</section>
