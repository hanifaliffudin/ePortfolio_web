<script>
  import { navigate } from "svelte-routing";
  import SvelteMarkdown from "svelte-markdown";

  let source = ``;
  let visibility,
    files,
    src,
    title = "";
  let userId = localStorage.getItem("userId");

  // preview profile picture
  function loadFile(e) {
    src = URL.createObjectURL(e.target.files[0]);
  }

  async function createArticle() {
    var dataUpdate = new FormData();
    let dataArticle = {
      userId: userId,
      title,
      desc: source,
      isPublic: visibility == "public" ? true : false,
    };
    dataUpdate.append("coverArticle", files[0]);
    dataUpdate.append("data", JSON.stringify(dataArticle));

    const response = await fetch("http://103.187.223.15:8800/api/articles/", {
      method: "POST",
      body: dataUpdate,
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
    <form
      action="#"
      on:submit|preventDefault={createArticle}
      enctype="multipart/form-data"
    >
      <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div class="sm:col-span-2">
          <label
            for="title"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Title</label
          >
          <input
            bind:value={title}
            type="text"
            id="title"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label
            for="cover-image"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Cover Image</label
          >

          <input
            bind:files
            on:change={loadFile}
            type="file"
            accept=".jpg, .jpeg, .png"
          />
        </div>
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
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >Publish</button
        >
      </div>
    </form>
  </div>
  <div class="py-8 px-4 w-1/2 lg:py-8">
    <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
      Preview
    </h2>
    <div
      class="prose prose-neutral p-4 border-2 border-gray-100 rounded h-auto overflow-auto"
    >
      <h1 class="text-center mb-4">{title}</h1>
      {#if src}
        <img
          class="w-full h-72 rounded-lg profile-picture mb-4 object-cover"
          {src}
          alt="Default avatar"
        />
      {/if}
      <SvelteMarkdown {source} />
    </div>
  </div>
</section>
