<script>
  import PostCard from "../components/PostCard.svelte";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import ArticleCard from "../components/ArticleCard.svelte";
  import ActivityCard from "../components/ActivityCard.svelte";
  import PeopleCardHome from "../components/PeopleCardHome.svelte";
  import ProjectCard from "../components/ProjectCard.svelte";
  import ProjectCardHome from "../components/ProjectCardHome.svelte";

  let all = [];
  let userIdLocal = localStorage.getItem("userId");

  let userData,
    name,
    profilePicture,
    nim,
    major,
    interest,
    role,
    academicField,
    organization,
    userSuggest = [],
    projectSuggest = [],
    following = [];

  // get jwt from localstorage
  let jwt = localStorage.getItem("jwt");

  async function checkUserAuth() {
    const response = await fetch(
      "http://103.187.223.15:8800/api/auth/user/" + jwt
    );

    // kalau tidak ada
    if (!response.ok) {
      // clear localStorage
      localStorage.clear();

      navigate("/login");
    }

    const content = await response.json();

    if (!content.gender) {
      navigate("/edit-profile");
    } else {
      getUser();
    }
  }

  // get data user
  async function getUser() {
    const response = await fetch(
      "http://103.187.223.15:8800/api/users/" + userIdLocal
    );

    if (!response.ok) {
      navigate("/login");
      localStorage.clear();
    }

    const data = await response.json();
    userData = data;
    name = userData.username;
    nim = userData.nim;
    major = userData.major;
    interest = userData.interest;
    role = userData.role;
    academicField = userData.academicField;
    organization = userData.organization;
    following = userData.following;
    if (userData.profilePicture) {
      profilePicture = "http://103.187.223.15:8800/" + userData.profilePicture;
    } else {
      profilePicture = "/icon-user.png";
    }

    getUsersSuggest();
    getProjectsSuggest();
  }

  // get all posts
  async function getPosts() {
    let response = await fetch(
      "http://103.187.223.15:8800/api/posts/timeline/all/" + userIdLocal
    );
    return response.ok ? await response.json() : null;
  }

  // get all articles
  async function getArticles() {
    let response = await fetch(
      "http://103.187.223.15:8800/api/articles/timeline/all/" + userIdLocal
    );
    return response.ok ? await response.json() : null;
  }

  // get users suggestion
  async function getUsersSuggest() {
    let majorsuggest = major ? major : " ";
    let organizationsuggest = organization ? organization : " ";
    const response = await fetch(
      `http://103.187.223.15:8800/api/users/suggest/${majorsuggest}/${organizationsuggest}/${userIdLocal}`
    );

    if (!response.ok) {
      const data = await response.json();
      console.log(data);
    }

    const data = await response.json();
    userSuggest = data;
    userSuggest.forEach((element, i) => {
      if (following.includes(element)) {
        userSuggest = [
          ...userSuggest.slice(0, i),
          ...userSuggest.slice(i + 1, userSuggest.length),
        ];
        return;
      }
    });
  }

  // get projects suggestion
  async function getProjectsSuggest() {
    let response = await fetch(
      "http://103.187.223.15:8800/api/projects/suggest/" + userIdLocal
    );

    if (!response.ok) {
      const data = await response.json();
      console.log(data);
    }

    const data = await response.json();
    projectSuggest = data;
  }

  onMount(async () => {
    checkUserAuth();
    let post = await getPosts();
    let articles = await getArticles();
    if (post) {
      post.forEach((element) => {
        // filter private post
        if (element.isPublic == false && element.userId != userIdLocal) {
        } else {
          all.push(element);
          all = all;
        }
      });
    }

    if (articles) {
      articles.forEach((element) => {
        // filter private article
        if (element.isPublic == false && element.userId != userIdLocal) {
        } else {
          all.push(element);
          all = all;
        }
        // sorting all posts and articles
        all.sort(function (a, b) {
          // @ts-ignore
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
      });
    }
  });
</script>

<main class="xl:mx-40">
  <div class="md:container md:mx-auto my-16">
    <div class="flex">
      {#if userData}
        <div class="flex-initial w-3/12 mr-8">
          <a href="/profile" class="hover:underline">
            <div class="flex justify-center mb-3">
              <img
                class="w-48 h-48 object-cover rounded-full mb-2 ring-2 ring-gray-200 p-1"
                src={profilePicture}
                alt="Rounded avatar"
              />
            </div>
            <p class="font-bold text-xl">{name}</p>
          </a>
          {#if role == "mahasiswa"}
            <p class="font-light text-sm truncate">{nim ? nim : ""}</p>
            <p class="text-xl my-2">{major ? major : ""}</p>
            <p>{interest ? interest : ""}</p>
          {:else}
            <p>{academicField ? academicField : ""}</p>
          {/if}
        </div>
      {:else}
        <div class="flex-initial w-3/12 mr-8" />
      {/if}

      <div class="flex-initial w-7/12 mr-8">
        <div class="md:container md:mx-auto bg-gray-300 p-4 rounded-lg mb-8">
          <a
            href="/post/create"
            class="block w-full text-gray-500 bg-white hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-5 text-start"
          >
            What's going on?
          </a>
          <!-- <div class="flex mt-4 justify-between">
            <div class="flex">
              <button type="button" class="mr-4">
                <iconify-icon icon="bi:image" style="font-size: 24px" />
              </button>
              <button type="button" class="mr-4">
                <iconify-icon icon="bxs:video-plus" style="font-size: 24px" />
              </button>
            </div>
          </div> -->
        </div>

        {#if all}
          {#each all as element}
            {#if element.startDate}
              <ActivityCard activity={element} />
            {:else if element.title && !element.startDate}
              <ArticleCard article={element} />
            {:else if element.imgBadge}
              <!-- <BadgeCard badge={element} /> -->
            {:else}
              <PostCard post={element} />
            {/if}
          {/each}
        {/if}
      </div>

      <div class="flex-initial w-3/12 ">
        {#if userSuggest && userSuggest.length > 0}
          {#each userSuggest as userId, i}
            {#if i < 3 && userSuggest}
              <PeopleCardHome {userId} />
            {/if}
          {/each}
        {/if}

        {#if projectSuggest && projectSuggest.length > 0}
          {#each projectSuggest as project}
            <ProjectCardHome {project} />
          {/each}
        {/if}
      </div>
    </div>
  </div>
</main>
