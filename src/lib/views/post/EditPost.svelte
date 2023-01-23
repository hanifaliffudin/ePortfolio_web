<script>
  import { navigate } from "svelte-routing";
  import mermaid from "mermaid";

  export let idPost;

  let postData;
  let desc, visibility, mermaidInput, mermaidOutput;
  let userId = localStorage.getItem("userId");

  // get data post
  async function getPost() {
    const response = await fetch(
      "http://103.187.223.15:8800/api/posts/" + idPost
    );

    if (!response.ok) {
      alert(response.statusText);
    }
    const data = await response.json();
    postData = data;
    desc = postData.desc;
    if (postData.mermaidDiagram) {
      mermaidInput = postData.mermaidDiagram;
    }
    postData.isPublic ? (visibility = "public") : (visibility = "private");
  }

  getPost();

  // update data post
  async function updatePost() {
    const response = await fetch(
      "http://103.187.223.15:8800/api/posts/" + idPost,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          desc,
          mermaidDiagram: mermaidInput,
          isPublic: visibility == "public" ? true : false,
        }),
      }
    );

    if (!response.ok) {
      alert(response.statusText);
    } else {
      document.location.href = "/posts";
      history.back();
      const data = await response.json();
    }
  }
</script>

{#if postData}
  <section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-2xl lg:py-8">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Edit post
      </h2>
      <form on:submit|preventDefault={updatePost}>
        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div class="sm:col-span-2">
            <textarea
              required
              bind:value={desc}
              id="description"
              rows="8"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Write your thoughts here..."
            />
            <div class="mt-1 text-sm">
              *
              <a
                class="text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.markdownguide.org/basic-syntax/">Markdown</a
              > is supported
            </div>
          </div>
          <div class="sm:col-span-2">
            <label
              for="diagram"
              class="block mb-2 font-medium text-gray-900 dark:text-white"
              >Diagram</label
            >
            <textarea
              bind:value={mermaidInput}
              id="diagram"
              rows="8"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
            <div class="mt-1 text-sm">
              * Use
              <a
                class="text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
                href="https://mermaid.js.org/syntax/flowchart.html">Mermaid</a
              > to create a diagram
            </div>
          </div>
        </div>
        <div class="flex justify-between items-center mt-4 space-x-2">
          <select
            bind:value={visibility}
            id="visibility"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-1/4 w-full p-2.5"
          >
            <option value="public">Public</option>
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
  </section>
{/if}
