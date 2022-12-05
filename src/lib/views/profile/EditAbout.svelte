<script>
  import { navigate } from "svelte-routing";
  import SvelteMarkdown from "svelte-markdown";

  let source = ``;
  let userId = localStorage.getItem("userId");

  let userData;

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
    source = userData.about;
  }

  getUser();

  // update data user
  async function update() {
    let response;

    response = await fetch("http://localhost:8800/api/users/" + userId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        about: source,
      }),
    });

    if (!response.ok) {
      alert(response.statusText);
      console.log(response.status);
      console.log(response.statusText);
    }

    const data = await response.json();
    navigate("/profile");
  }
</script>

<section class="flex">
  <div class="py-8 px-4 w-1/2 lg:py-8">
    <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
      Edit About Me
    </h2>

    <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
      <div class="sm:col-span-2">
        <textarea
          bind:value={source}
          id="description"
          rows="18"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Write your thoughts here..."
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
        >Update</button
      >
    </div>
  </div>
  <div class="py-8 px-4 w-1/2 lg:py-8">
    <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
      Preview
    </h2>
    <div
      class="prose prose-neutral p-4 border-2 border-gray-100 rounded h-96 overflow-auto"
    >
      <SvelteMarkdown {source} />
    </div>
  </div>
</section>
