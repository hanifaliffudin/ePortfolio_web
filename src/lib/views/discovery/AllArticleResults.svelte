<script>
  import ArticleCard from "../../components/ArticleCard.svelte";

  export let searchKeyword;
  let articles = [];
  let userIdLocal = localStorage.getItem("userId");

  if (searchKeyword) getArticles();

  // get all articles
  async function getArticles() {
    let response = await fetch(
      `http://103.187.223.15:8800/api/articles/search/${searchKeyword}`
    );

    if (!response.ok) {
      alert(response.status);
    }

    const data = await response.json();
    let temp = data;
    temp.forEach((element) => {
      // filter private article
      if (element.isPublic == false && element.userId != userIdLocal) {
      } else {
        articles.push(element);
        articles = articles;
      }
    });
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
