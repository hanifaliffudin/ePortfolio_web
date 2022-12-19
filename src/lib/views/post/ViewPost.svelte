<script>
  import SvelteMarkdown from "svelte-markdown";
  import DropdownPost from "../../components/DropdownPost.svelte";

  export let idPost;

  let postData, source, date, time, userIdPost, role;

  let userId = localStorage.getItem("userId");

  const today = new Date().toLocaleDateString("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // get data post
  async function getPost() {
    const response = await fetch(
      "http://103.187.223.15:8800/api/posts/" + idPost
    );

    if (!response.ok) {
      alert(response.statusText);
    }
    const data = await response.json();
    postData = data;
    source = postData.desc;
    userIdPost = postData.userId;
    date = new Date(postData.createdAt).toLocaleDateString("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    time = new Date(postData.createdAt).toLocaleTimeString("en", {
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
      "http://103.187.223.15:8800/api/users/" + userIdPost
    );

    if (!response.ok) {
      console.log(response.statusText);
    }

    const data = await response.json();
    userData = data;
    name = userData.username;
    nim = userData.nim;
    role = userData.role;
    if (userData.profilePicture) {
      profilePicture = "http://103.187.223.15:8800/" + userData.profilePicture;
    } else {
      profilePicture = "/icon-user.png";
    }
  }
</script>

{#if userData}
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
                {#if role == "mahasiswa"}
                  <div class="font-light text-xs">{nim}</div>
                {/if}
                <div class="font-light text-xs">
                  {time}
                  {date == today ? "Today" : date}
                </div>
              </div>
              {#if userId == userIdPost}
                <DropdownPost {idPost} />
              {/if}
            </div>
            <div class="prose prose-neutral">
              <SvelteMarkdown {source} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
{/if}
