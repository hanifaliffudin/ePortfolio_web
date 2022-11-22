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
</script>

<div class="md:container md:mx-auto bg-gray-100 p-6 rounded-lg post-card mb-8">
  <div class="flex mb-4 ">
    <img
      class="w-14 h-14 rounded-full object-cover"
      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
      alt="Rounded avatar"
    />
    <div class="flex flex-col meta ml-4 leading-tight flex-auto">
      <div class="font-bold text-lg">Nafira Ramadhannis</div>
      <div class="font-light text-xs">175150201111007</div>
      <div class="font-light text-xs">
        {post.createdAt != post.updatedAt ? "Last updated on " : ""}
        {date.toLocaleTimeString("id", {
          hour: "numeric",
          minute: "2-digit",
        })}
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
