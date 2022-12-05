<script>
  import SvelteMarkdown from "svelte-markdown";
  import DropdownPost from "../../components/DropdownPost.svelte";

  export let idPost;

  let postData, source, date, time, userIdPost;

  let userId = localStorage.getItem("userId");

  const today = new Date().toLocaleDateString("id", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // get data post
  async function getPost() {
    const response = await fetch("http://localhost:8800/api/posts/" + idPost);

    if (!response.ok) {
      alert(response.statusText);
    }
    const data = await response.json();
    postData = data;
    source = postData.desc;
    userIdPost = postData.userId;
    date = new Date(postData.createdAt).toLocaleDateString("id", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    time = new Date(postData.createdAt).toLocaleTimeString("id", {
      hour: "numeric",
      minute: "2-digit",
    });

    getUser();
  }

  getPost();

  let userData, name, profilePicture, nim;

  // get data user
  async function getUser() {
    const response = await fetch(
      "http://localhost:8800/api/users/" + userIdPost
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
</script>

<main class="md:mx-72">
  <div class="md:container md:mx-auto my-16">
    <div class="flex justify-center">
      <div class="flex-initial w-3/4">
        <div class="md:container md:mx-auto bg-gray-100 p-6 rounded-lg post">
          <div class="flex mb-4">
            <img
              class="w-14 h-14 rounded-full object-cover"
              src={profilePicture}
              alt="Rounded avatar"
            />
            <div class="flex flex-col meta ml-4 leading-tight flex-auto">
              <div class="font-bold text-lg">{name}</div>
              <div class="font-light text-xs">{nim}</div>
              <div class="font-light text-xs">
                {time}
                {date == today ? "Today" : date}
              </div>
            </div>
            {#if userId == userIdPost}{/if}
            <DropdownPost {idPost} />
          </div>
          <div class="prose prose-neutral">
            <SvelteMarkdown {source} />
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
