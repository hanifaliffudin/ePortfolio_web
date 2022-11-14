<script>
  export let article = "";
  import DropdownPost from "./DropdownPost.svelte";
  import SvelteMarkdown from "svelte-markdown";
  let source;
  if (article) {
    source = article.markdown;
  } else {
    source = `lorem ipsum dolor sit amet, consectetur adipis`;
  }
</script>

<div class="md:container md:mx-auto bg-gray-100 p-6 rounded-lg post-card mb-16">
  <div class="flex mb-4 align-top">
    <img
      class="w-14 h-14 rounded-full object-cover"
      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
      alt="Rounded avatar"
    />
    <div class="flex flex-col meta ml-4 leading-tight flex-auto">
      <div class="font-bold text-lg">Nafira Ramadhannis</div>
      <div class="font-light text-xs">175150201111007</div>
      <div class="font-light text-xs">11.20 AM 12 Oct 2022</div>
    </div>
    <DropdownPost />
  </div>
  <a href="post" class="prose prose-neutral">
    <SvelteMarkdown {source} />
    <img
      class="max-w-sm h-auto rounded-md mt-6"
      src="https://lh3.googleusercontent.com/-NZ8qBt7gA5U/X1XryKNvwgI/AAAAAAAABDg/ZzUBtKnSoXIs6LUQvWAVijG6VaihzJRoACK8BGAsYHg/s512/2020-09-07.png"
      alt="image description"
    />
  </a>
</div>
