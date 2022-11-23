<script>
  import ProfileBar from "../components/ProfileBar.svelte";
  import ProfileTabs from "../components/ProfileTabs.svelte";
  import ProjectCard from "../components/ProjectCard.svelte";
  import { writable } from "svelte/store";
  import { onMount } from "svelte";
  import PostCard from "../components/PostCard.svelte";

  const postStore = writable(null);

  let userId = localStorage.getItem("userId");

  // get all user posts
  async function getPost() {
    let response = await fetch("http://localhost:8800/api/posts/all/" + userId);
    return response.ok ? await response.json() : null;
  }

  onMount(async () => {
    let post = await getPost();
    if (post) postStore.update((data) => post);
  });
</script>

<main class="md:mx-72">
  <section>
    <div class="md:container md:mx-auto my-16">
      <div class="flex">
        <ProfileBar />

        <div class="flex-initial w-3/4">
          <!-- tabs -->
          <ProfileTabs active={"activities"} />

          <!-- tabs content -->
          <div class="md:container md:mx-auto">
            <div
              class="md:container md:mx-auto bg-gray-300 p-4 rounded-lg mb-8"
            >
              <a
                href="/post/create"
                class="block w-full text-gray-500 bg-white hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-5 text-start"
              >
                What's going on?
              </a>

              <div class="flex mt-4 justify-between">
                <div class="flex">
                  <button type="button" class="mr-4 inline-flex items-center">
                    <iconify-icon icon="bi:image" style="font-size: 24px" />
                  </button>
                  <button type="button" class="mr-4 inline-flex items-center">
                    <iconify-icon
                      icon="bxs:video-plus"
                      style="font-size: 24px"
                    />
                  </button>
                </div>
              </div>
            </div>

            {#if $postStore}
              {#each $postStore as $post}
                <PostCard post={$post} />
              {/each}
            {/if}

            <ProjectCard />
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
