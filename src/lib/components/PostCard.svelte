<script>
  import SvelteMarkdown from "svelte-markdown";

  export let post;

  const today = new Date();
  let source, date;

  if (post) {
    source = post.desc;
    if (post.createdAt != post.updatedAt) {
      date = new Date(post.updatedAt);
    } else {
      date = new Date(post.createdAt);
    }
  } else {
    source = `lorem ipsum dolor sit amet, consectetur adipis`;
  }

  let userId = post.userId;

  let userData, name, profilePicture, nim;

  // get data user
  async function getUser() {
    const response = await fetch("http://localhost:8800/api/users/" + userId);

    if (!response.ok) {
      // navigate("/login");
      // localStorage.clear();
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

  getUser();
</script>

<div class="md:container md:mx-auto bg-gray-100 p-6 rounded-lg post-card mb-8">
  <div class="flex mb-4 ">
    <img
      class="w-14 h-14 rounded-full object-cover"
      src={profilePicture}
      alt="Rounded avatar"
    />
    <div class="flex flex-col ml-4 leading-tight flex-auto">
      <div class="font-bold text-lg">{name}</div>
      <div class="font-light text-xs">{nim}</div>
      <div class="font-light text-xs">
        <!-- if updated -->
        {post.createdAt != post.updatedAt ? "Last updated on " : ""}
        <!-- time -->
        {date.toLocaleTimeString("id", {
          hour: "numeric",
          minute: "2-digit",
        })}
        <!-- date -->
        {date.toLocaleDateString("id") == today.toLocaleDateString("id")
          ? "Today"
          : date.toLocaleDateString("id", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
      </div>
    </div>
  </div>
  <a href="post/{post._id}" class="prose prose-neutral">
    <SvelteMarkdown {source} />
  </a>
</div>
