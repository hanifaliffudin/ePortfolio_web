<script>
  import PostCard from "../components/PostCard.svelte";
  import ProjectCard from "../components/ProjectCard.svelte";
  import { writable } from "svelte/store";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import ArticleCard from "../components/ArticleCard.svelte";

  let all = [];

  // get jwt from localstorage
  let jwt = localStorage.getItem("jwt");

  async function checkUserAuth() {
    const response = await fetch("http://localhost:8800/api/auth/user/" + jwt);

    // kalau tidak ada
    if (!response.ok) {
      // clear localStorage
      localStorage.clear();

      navigate("/login");
    }

    const content = await response.json();

    if (!content.dateBirth) {
      navigate("/edit-profile");
    } else {
      getUser();
    }
  }

  let userId = localStorage.getItem("userId");

  let userData, name, profilePicture, nim, prodi, interest;

  // get data user
  async function getUser() {
    const response = await fetch("http://localhost:8800/api/users/" + userId);

    if (!response.ok) {
      navigate("/login");
      localStorage.clear();
    }

    const data = await response.json();
    userData = data;
    name = userData.username;
    nim = userData.nim;
    prodi = userData.major;
    interest = userData.interest;
    if (userData.profilePicture) {
      profilePicture = "http://127.0.0.1:8800/" + userData.profilePicture;
    } else {
      profilePicture = "/icon-user.png";
    }
  }

  // get all posts
  async function getPost() {
    let response = await fetch("http://localhost:8800/api/posts/timeline/all");
    return response.ok ? await response.json() : null;
  }

  // get all posts
  async function getArticle() {
    let response = await fetch(
      "http://localhost:8800/api/articles/timeline/all"
    );
    return response.ok ? await response.json() : null;
  }

  onMount(async () => {
    checkUserAuth();
    let post = await getPost();
    let articles = await getArticle();
    // console.log(post);
    post.forEach((element) => {
      all.push(element);
      all = all;
    });
    articles.forEach((element) => {
      all.push(element);
      all = all;
      all.sort(function (a, b) {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });
    });
  });
</script>

<main class="md:mx-72">
  <div class="md:container md:mx-auto my-16">
    <div class="flex">
      <div class="flex-initial w-1/4 mr-8">
        <div class="flex justify-center mb-3">
          <img
            class="w-48 h-48 object-cover rounded-full mb-2"
            src={profilePicture}
            alt="Rounded avatar"
          />
        </div>

        <p class="font-bold text-xl">{name}</p>
        <p class="font-light text-sm">{nim}</p>
        <p class="text-xl my-2">{prodi}</p>
        <p>{interest}</p>
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

        {#each all as element}
          {#if element.title}
            <ArticleCard article={element} />
          {:else}
            <PostCard post={element} />
          {/if}
        {/each}
      </div>
    </div>
  </div>
</main>
