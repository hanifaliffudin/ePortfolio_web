<script>
  import { navigate } from "svelte-routing";

  export let idPost;

  let postData, source, date, time;
  let desc, visibility;

  const today = new Date().toLocaleDateString("id", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  fetch("http://localhost:8800/api/posts/" + idPost)
    .then((response) => response.json())
    .then((data) => (postData = data))
    .then(() => {
      desc = postData.desc;
      date = new Date(postData.createdAt).toLocaleDateString("id", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      time = new Date(postData.createdAt).toLocaleTimeString("id", {
        hour: "numeric",
        minute: "2-digit",
      });
    });

  async function updatePost() {
    await fetch("http://localhost:8800/api/posts/" + idPost, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: "637628e52ae47d8d8eacc2ae",
        desc,
        isPublic: visibility == "public" ? true : false,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        navigate("/activities");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
</script>

<section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
    <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
      Edit post
    </h2>
    <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
      <div class="sm:col-span-2">
        <textarea
          bind:value={desc}
          id="description"
          rows="8"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Write your thoughts here..."
        />
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
      <button
        on:click={updatePost}
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >Update</button
      >
    </div>
  </div>
</section>
