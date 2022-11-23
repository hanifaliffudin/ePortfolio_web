<script>
  import { navigate } from "svelte-routing";
  import SvelteMarkdown from "svelte-markdown";

  let source = ``;
  let desc, visibility;
  let userId = localStorage.getItem("userId");

  async function createArticle() {
    const response = await fetch("http://localhost:8800/api/articles/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        desc,
        isPublic: visibility == "public" ? true : false,
      }),
    });

    if (!response.ok) {
      alert(response.statusText);
    } else {
      navigate("/");
    }
    const data = await response.json();
  }
</script>

<section class="flex">
  <div class="py-8 px-4 w-1/2 lg:py-8">
    <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
      Add a new article
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
    <div class="flex justify-between items-center mt-4 space-x-2">
      <select
        bind:value={visibility}
        id="visibility"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-1/4 w-full p-2.5"
      >
        <option selected value="public">Public</option>
        <option value="private">Private</option>
      </select>
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >Post</button
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
