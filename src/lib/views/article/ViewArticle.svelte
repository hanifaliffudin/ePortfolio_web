<script>
  import SvelteMarkdown from "svelte-markdown";
  import { navigate } from "svelte-routing";

  export let idArticle;

  let articleData, source, date, time, userIdArticle, title, coverArticle;

  let userId = localStorage.getItem("userId");

  const today = new Date().toLocaleDateString("id", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // get data article
  async function getArticle() {
    const response = await fetch(
      "http://localhost:8800/api/articles/" + idArticle
    );

    if (!response.ok) {
      alert(response.statusText);
    }
    const data = await response.json();
    articleData = data;
    source = articleData.desc;
    title = articleData.title;
    coverArticle = "http://127.0.0.1:8800/" + articleData.coverArticle;
    userIdArticle = articleData.userId;
    date = new Date(articleData.updatedAt).toLocaleDateString("id", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    time = new Date(articleData.updatedAt).toLocaleTimeString("id", {
      hour: "numeric",
      minute: "2-digit",
    });

    getUser();
  }

  getArticle();

  let userData, name, profilePicture, nim;

  // get data user
  async function getUser() {
    const response = await fetch(
      "http://localhost:8800/api/users/" + userIdArticle
    );

    if (!response.ok) {
      console.log(response.statusText);
    }

    const data = await response.json();
    userData = data;
    name = userData.username;
    nim = userData.nim;
    if (userData.profilePicture) {
      profilePicture = "http://127.0.0.1:8800/" + userData.profilePicture;
    } else {
      profilePicture = "/icon-user.png";
    }
  }

  // delete post
  async function deleteArticle() {
    console.log(userId);
    const response = await fetch(
      "http://localhost:8800/api/articles/" + idArticle,
      {
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
          userId: userId,
        }),
      }
    );

    if (!response.ok) {
      alert("You can only delete your post");
    } else {
      navigate("/articles");
    }

    // const data = await response.json();
  }
</script>

<main class="md:mx-72">
  <div class="md:container md:mx-auto my-16">
    <div class="flex justify-center">
      <div class="flex-initial w-3/4">
        <div class="flex justify-end mb-3">
          <button
            id="multiLevelDropdownButton"
            data-dropdown-toggle="dropdown"
            class="font-medium h-3"
            type="button"
          >
            <iconify-icon icon="fluent:more-horizontal-32-filled" />
          </button>
          <!-- Dropdown menu -->
          <div
            id="dropdown"
            class="hidden z-10 w-32 bg-white rounded divide-y divide-gray-100 shadow"
          >
            <ul
              class="py-1 text-sm text-gray-700"
              aria-labelledby="multiLevelDropdownButton"
            >
              <li>
                <a
                  href="/article/edit/{idArticle}"
                  class="block py-2 px-4 hover:bg-gray-100">Edit</a
                >
              </li>
              <li>
                <button
                  on:click={deleteArticle}
                  type="button"
                  class="block w-full text-start py-2 px-4 hover:bg-gray-100"
                  >Delete</button
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="md:container md:mx-auto prose prose-neutral">
          <h1 class="text-center mb-4">{title}</h1>
          <div class="text-sm text-gray-600">Published on {date}</div>
          <img
            class="w-full h-72 profile-picture mb-4 object-cover rounded-lg"
            src={coverArticle}
            alt="Default avatar"
          />

          <!-- <div class="flex mb-4 items-center border-t border-b p-2">
            <img
              class="w-14 h-14 m-0 rounded-full object-cover"
              src={profilePicture}
              alt="Rounded avatar"
            />
            <div class="flex flex-col ml-4 ">
              <div class="font-bold text-lg">{name}</div>
              <div class="font-light text-xs">{nim}</div>
            </div>
          </div> -->
          <div class="">
            <SvelteMarkdown {source} />
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
