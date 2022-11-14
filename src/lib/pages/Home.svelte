<script>
  import PostCard from "../components/PostCard.svelte";
  import ProjectCard from "../components/ProjectCard.svelte";

  import { writable } from "svelte/store";
  import { onMount } from "svelte";

  const articleStore = writable(null);
  async function getArticle() {
    let response = await fetch("http://localhost:4000/");
    return response.ok ? await response.json() : null;
  }

  onMount(async () => {
    let article = await getArticle();
    if (article) articleStore.update((data) => article);
  });
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
          <textarea
            id="message"
            rows="2"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Your message..."
          />
          <div class="flex mt-4 justify-between">
            <div class="flex">
              <button type="button" class="mr-4">
                <iconify-icon icon="bi:image" style="font-size: 24px" />
              </button>
              <button type="button" class="mr-4">
                <iconify-icon icon="bxs:video-plus" style="font-size: 24px" />
              </button>
            </div>
            <button
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
            >
              Post
            </button>
          </div>
        </div>

        <!-- {#if $articleStore}
          {#each $articleStore as $article}
            <PostCard article={$article} />
          {/each}
        {/if} -->

        <PostCard />

        <ProjectCard />
      </div>
    </div>
  </div>
</main>
