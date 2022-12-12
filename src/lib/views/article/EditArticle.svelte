<script>
  import { navigate } from "svelte-routing";
  import SvelteMarkdown from "svelte-markdown";

  export let idArticle;
  let source = ``;
  let visibility, files, src, title, articleData, date, time;

  let userId = localStorage.getItem("userId");

  // preview profile picture
  function loadFile(e) {
    src = URL.createObjectURL(e.target.files[0]);
  }

  // update data user
  async function update() {
    let response;
    if (files) {
      var dataUpdate = new FormData();
      let dataArticle = {
        userId: userId,
        title,
        desc: source,
        isPublic: visibility == "public" ? true : false,
      };
      dataUpdate.append("coverArticle", files[0]);
      dataUpdate.append("data", JSON.stringify(dataArticle));

      response = await fetch(
        "http://103.187.223.15:8800/api/articles/" + idArticle,
        {
          method: "PUT",
          body: dataUpdate,
        }
      );
    } else {
      response = await fetch(
        "http://103.187.223.15:8800/api/articles/" + idArticle,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            title,
            desc: source,
            isPublic: visibility == "public" ? true : false,
          }),
        }
      );
    }

    if (!response.ok) {
      //   alert(response.statusText);
      console.log(response.status);
      console.log(response.statusText);
    }

    const data = await response.json();
    navigate("/articles");
  }

  // get data article
  async function getArticle() {
    const response = await fetch(
      "http://103.187.223.15:8800/api/articles/" + idArticle
    );

    if (!response.ok) {
      alert(response.statusText);
    }
    const data = await response.json();
    articleData = data;
    source = articleData.desc;
    title = articleData.title;
    src = "http://103.187.223.15:8800/" + articleData.coverArticle;
    articleData.isPublic ? (visibility = "public") : (visibility = "private");
  }

  getArticle();
</script>

{#if articleData}
  <section class="flex">
    <div class="py-8 px-4 w-1/2 lg:py-8">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Edit article
      </h2>
      <form
        action="#"
        on:submit|preventDefault={update}
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
          <div class="flex justify-end items-center mt-4 space-x-2">
            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >Update</button
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
{/if}
