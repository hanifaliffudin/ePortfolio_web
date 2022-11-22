<script>
  import SvelteMarkdown from "svelte-markdown";
  import DropdownPost from "../../components/DropdownPost.svelte";

  export let idPost;

  let postData, source, date, time, userIdPost;

  let userId = "637628e52ae47d8d8eacc2ae";

  const today = new Date().toLocaleDateString("id", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  fetch("http://localhost:8800/api/posts/" + idPost)
    .then((response) => response.json())
    .then((data) => (postData = data))
    .then(() => {
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
    });
</script>

<main class="md:mx-72">
  <div class="md:container md:mx-auto my-16">
    <div class="flex justify-center">
      <div class="flex-initial w-3/4">
        <div class="md:container md:mx-auto bg-gray-100 p-6 rounded-lg post">
          <div class="flex mb-4">
            <img
              class="w-14 h-14 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="Rounded avatar"
            />
            <div class="flex flex-col meta ml-4 leading-tight flex-auto">
              <div class="font-bold text-lg">Nafira Ramadhannis</div>
              <div class="font-light text-xs">175150201111007</div>
              <div class="font-light text-xs">
                {date == today ? "Today" : date}
                {time}
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
