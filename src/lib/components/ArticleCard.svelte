<script>
  export let article;

  let userId = article.userId;

  let userData, name, date;
  const today = new Date();

  if (article) {
    if (article.createdAt != article.updatedAt) {
      date = new Date(article.createdAt);
    } else {
      date = new Date(article.createdAt);
    }
  }

  // get data user
  async function getUser() {
    const response = await fetch(
      "http://103.187.223.15:8800/api/users/" + userId
    );

    if (!response.ok) {
      // navigate("/login");
      // localStorage.clear();
      console.log(response.statusText);
    }

    const data = await response.json();
    userData = data;
    name = userData.username;
  }

  getUser();
</script>

{#if userData}
  <div class="md:container md:mx-auto bg-gray-100 p-6 rounded-lg mb-8">
    <div class="mb-4 flex">
      <div class=""><span class="font-bold">{name}</span> posted this</div>
      {#if !article.isPublic}
        <div
          class="ml-3 ring-1 ring-gray-400 my-1 text-xs font-semibold text-gray-600 items-center inline-flex rounded-full px-2"
        >
          Private
        </div>
      {/if}
    </div>
    <a
      href="/article/{article._id}"
      class="prose prose-neutral hover:underline"
    >
      <img
        class="object-cover h-72 w-full rounded"
        src="http://103.187.223.15:8800/{article.coverArticle}"
        alt=""
      />
      <div class="font-bold">
        {article.title}
      </div>
      <div class="text-sm">{name} on ePortfolio</div>

      <div class="text-sm font-bold">
        <!-- if updated -->
        <!-- {article.createdAt != article.updatedAt ? "Last updated on " : ""} -->
        <!-- time -->
        {date.toLocaleTimeString("id", {
          hour: "numeric",
          minute: "2-digit",
        })}
        <!-- date -->
        {date.toLocaleDateString("en") == today.toLocaleDateString("en")
          ? "Today"
          : date.toLocaleDateString("en", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
      </div>
    </a>
  </div>
{/if}
