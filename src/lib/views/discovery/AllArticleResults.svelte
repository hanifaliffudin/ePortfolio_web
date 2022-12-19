<script>
  import ArticleCard from "../../components/ArticleCard.svelte";

  export let searchKeyword;
  let articles = [];

  if (searchKeyword) getArticle();

  // get all articles
  async function getArticle() {
    let response = await fetch(
      `http://103.187.223.15:8800/api/articles/search/${searchKeyword}`
    );

    if (!response.ok) {
      alert(response.status);
    }

    const data = await response.json();
    articles = data;
  }
</script>

<div class="md:container md:mx-auto my-16">
  <div class="flex justify-center">
    <div class="w-1/2">
      {#if articles.length > 0}
        {#each articles as article}
          <ArticleCard {article} />
        {/each}
      {/if}
    </div>
  </div>
</div>
