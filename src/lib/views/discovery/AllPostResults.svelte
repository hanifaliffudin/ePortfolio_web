<script>
  import PostCard from "../../components/PostCard.svelte";

  export let searchKeyword;
  let posts = [];
  let userIdLocal = localStorage.getItem("userId");

  if (searchKeyword) getPost();

  // get all posts
  async function getPost() {
    let response = await fetch(
      `http://103.187.223.15:8800/api/posts/search/${searchKeyword}`
    );

    if (!response.ok) {
      alert(response.status);
    }

    const data = await response.json();
    let temp = data;
    temp.forEach((element) => {
      // filter private post
      if (element.isPublic == false && element.userId != userIdLocal) {
      } else {
        posts.push(element);
        posts = posts;
      }
    });
  }
</script>

<div class="md:container md:mx-auto my-16">
  <div class="flex justify-center">
    <div class="w-1/2">
      {#if posts.length > 0}
        {#each posts as post}
          <PostCard {post} />
        {/each}
      {/if}
    </div>
  </div>
</div>
