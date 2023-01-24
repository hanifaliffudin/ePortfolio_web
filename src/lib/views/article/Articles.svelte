<script>
  import ProfileBar from "../../components/ProfileBar.svelte";
  import ProfileTabs from "../../components/ProfileTabs.svelte";
  import { writable } from "svelte/store";
  import { onMount } from "svelte";
  import ArticleCard from "../../components/ArticleCard.svelte";

  const articleStore = writable(null);

  let userId = localStorage.getItem("userId");

  // get all user articles
  async function getArticle() {
    let response = await fetch(
      "http://103.187.223.15:8800/api/articles/all/" + userId
    );
    return response.ok ? await response.json() : null;
  }

  onMount(async () => {
    let article = await getArticle();
    if (article) articleStore.update((data) => article);
  });
</script>

<main class="md:mx-64">
  <section>
    <div class="md:container md:mx-auto my-16">
      <div class="flex">
        <ProfileBar {userId} />

        <div class="flex-initial w-3/4">
          <!-- tabs -->
          <ProfileTabs active={"articles"} />

          <!-- tabs content -->
          <a
            href="/article/create"
            class="w-full mb-8 bg-blue-700 text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-3 text-center inline-flex items-center justify-center"
          >
            Create new article
            <iconify-icon class="ml-2" icon="akar-icons:plus" />
          </a>

          {#if $articleStore}
            {#each $articleStore as $article}
              <ArticleCard article={$article} />
            {/each}
          {/if}
        </div>
      </div>
    </div>
  </section>
</main>
