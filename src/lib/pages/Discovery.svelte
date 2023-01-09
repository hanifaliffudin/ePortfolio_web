<script>
  import ActivityCard from "../components/ActivityCard.svelte";
  import ArticleCardDiscovery from "../components/ArticleCardDiscovery.svelte";
  import DiscoveryCard from "../components/DiscoveryCard.svelte";
  import PeopleCardDiscovery from "../components/PeopleCardDiscovery.svelte";
  import PostCardDiscovery from "../components/PostCardDiscovery.svelte";

  let userIdLocal = localStorage.getItem("userId");

  let posts = [],
    articles = [],
    activities = [],
    searchKeyword,
    usersId = [],
    allUsersId = [];

  const urlParams = new URLSearchParams(window.location.search);
  if (!urlParams.get("search")) {
    getAllUsers();
  }
  searchKeyword = urlParams.get("search");

  if (searchKeyword) {
    getUsers();
    getArticles();
    getPosts();
    getActivities();
  }

  // get all posts
  async function getPosts() {
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

  // get articles
  async function getArticles() {
    let response = await fetch(
      `http://103.187.223.15:8800/api/articles/search/${searchKeyword}`
    );

    if (!response.ok) {
      // alert(response.status);
      console.log(response.status);
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

  // get activities
  async function getActivities() {
    let response = await fetch(
      `http://103.187.223.15:8800/api/activities/search/${searchKeyword}`
    );

    if (!response.ok) {
      // alert(response.status);
      console.log(response.status);
    }

    const data = await response.json();
    let temp = data;
    temp.forEach((element) => {
      // filter private activity
      if (element.isPublic == false && element.userId != userIdLocal) {
      } else {
        activities.push(element);
        activities = activities;
      }
    });
  }

  // get users
  async function getUsers() {
    const response = await fetch(
      `http://103.187.223.15:8800/api/users/search/${userIdLocal}/${searchKeyword}`
    );

    if (!response.ok) {
      console.log(response.status);
    }

    const data = await response.json();
    usersId = data;
  }

  // get all users
  async function getAllUsers() {
    const response = await fetch(
      `http://103.187.223.15:8800/api/users/all/${userIdLocal}`
    );

    if (!response.ok) {
      console.log(response.status);
    }

    const data = await response.json();
    allUsersId = data;
  }
</script>

<main class="md:mx-72">
  <section>
    <div class="md:container md:mx-auto mt-8">
      <h1 class="text-4xl font-bold text-center">
        Discover Student, Article, Or Activity
      </h1>
      <form action="">
        <input
          bind:value={searchKeyword}
          type="search"
          name="search"
          class="w-full mt-8 text-center py-3 text-gray-700 bg-white border-2 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
          placeholder="Search..."
        />
      </form>
      <!-- <p class="text-center">
        Or see other students from your
        <a href="#/" class="text-blue-500">study program</a>,
        <a href="#/" class="text-blue-500">interest</a>, or
        <a href="#/" class="text-blue-500">collage year</a>.
      </p> -->
    </div>
  </section>

  <section>
    <div class="md:container md:mx-auto my-8">
      <div class="flex justify-center">
        <div class="w-3/4">
          <!-- posts -->
          {#if posts.length > 0}
            <div class="rounded-lg bg-gray-100 mb-4">
              <h2 class="text-3xl font-bold px-6 pt-6">Posts</h2>
              {#each posts as post, i}
                {#if i < 3}
                  <PostCardDiscovery {post} />
                  <hr class="h-1 bg-gray-300" />
                {/if}
              {/each}
              <button
                type="button"
                on:click={() =>
                  (window.location.href = "/all/posts/" + searchKeyword)}
                class="py-3 px-5 w-full text-base font-medium text-center bg-gray-100 rounded-b-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-200"
                >See all post results</button
              >
            </div>
          {/if}

          <!-- articles -->
          {#if articles.length > 0}
            <div class="rounded-lg bg-gray-100 mb-4">
              <h2 class="text-3xl font-bold px-6 pt-6">Articles</h2>
              {#each articles as article, i}
                {#if i < 3}
                  <ArticleCardDiscovery {article} />
                  <hr class="h-1 bg-gray-300" />
                {/if}
              {/each}
              <button
                type="button"
                on:click={() =>
                  (window.location.href = "/all/articles/" + searchKeyword)}
                class="py-3 px-5 w-full text-base font-medium text-center bg-gray-100 rounded-b-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-200"
                >See all article results</button
              >
            </div>
          {/if}

          <!-- activities -->
          {#if activities.length > 0}
            <div class="rounded-lg bg-gray-100 mb-4">
              <h2 class="text-3xl font-bold px-6 pt-6 mb-2">Activities</h2>
              {#each activities as activity, i}
                {#if i < 3}
                  <ActivityCard {activity} />
                  <hr class="h-1 bg-gray-300" />
                {/if}
              {/each}
              <button
                type="button"
                on:click={() =>
                  (window.location.href = "/all/activities/" + searchKeyword)}
                class="py-3 px-5 w-full text-base font-medium text-center bg-gray-100 rounded-b-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-200"
                >See all activity results</button
              >
            </div>
          {/if}

          <!-- users -->
          {#if usersId.length > 0}
            <div class="rounded-lg bg-gray-100">
              <h2 class="text-3xl font-bold px-6 pt-6">People</h2>
              {#each usersId as userId, i}
                {#if i < 3 && userIdLocal != userId}
                  <PeopleCardDiscovery {userId} />
                  <hr class="h-1 bg-gray-300" />
                {/if}
              {/each}

              <button
                type="button"
                on:click={() =>
                  (window.location.href = "/all/peoples/" + searchKeyword)}
                class="py-3 px-5 w-full text-base font-medium text-center bg-gray-100 rounded-b-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-200"
                >See all people results</button
              >
            </div>
          {/if}
        </div>
      </div>
      {#if !urlParams.get("search") && allUsersId.length > 0}
        <div class="grid grid-cols-3 gap-8">
          {#each allUsersId as userId, i}
            {#if userIdLocal != userId}
              <DiscoveryCard {userId} />
            {/if}
          {/each}
        </div>
      {/if}
    </div>
  </section>
</main>
