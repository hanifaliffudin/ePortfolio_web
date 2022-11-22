<script>
  import PostCard from "../components/PostCard.svelte";
  import ProjectCard from "../components/ProjectCard.svelte";
  import { writable } from "svelte/store";
  import { onMount } from "svelte";

  const postStore = writable(null);
  async function getPost() {
    let response = await fetch("http://localhost:8800/api/posts/timeline/all");
    return response.ok ? await response.json() : null;
  }

  onMount(async () => {
    let post = await getPost();
    if (post) postStore.update((data) => post);
  });

  let userId = "637628e52ae47d8d8eacc2aesd";
  let desc;

  async function doPost() {
    await fetch("http://localhost:8800/api/posts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        desc,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
</script>

<main class="md:mx-72">
  <div class="md:container md:mx-auto my-16">
    <div class="flex">
      <div class="flex-initial w-1/4 mr-8">
        <div class="flex justify-center mb-3">
          <img
            class="w-3/4 h-auto rounded-full mb-2"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            alt="Rounded avatar"
          />
        </div>

        <p class="font-bold text-xl">Nafira Ramadhannis</p>
        <p class="font-light text-sm">175150201111007</p>
        <p class="text-xl my-2">Informatic Engineering</p>
        <p>Enthusiast at Android Developer, Web Developer, and UX/UI Design</p>
      </div>
      <div class="flex-initial w-3/4">
        <div class="md:container md:mx-auto bg-gray-300 p-4 rounded-lg mb-8">
          <a
            href="/post/create"
            class="block w-full text-gray-500 bg-white hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-5 text-start"
          >
            What's going on?
          </a>
          <div class="flex mt-4 justify-between">
            <div class="flex">
              <button type="button" class="mr-4">
                <iconify-icon icon="bi:image" style="font-size: 24px" />
              </button>
              <button type="button" class="mr-4">
                <iconify-icon icon="bxs:video-plus" style="font-size: 24px" />
              </button>
            </div>
          </div>
        </div>

        {#if $postStore}
          {#each $postStore as $post}
            {#if $post.isPublic}
              <PostCard post={$post} />
            {/if}
          {/each}
        {/if}

        <!-- <PostCard /> -->

        <ProjectCard />
      </div>
    </div>
  </div>
</main>
