<script>
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";

  export let article;

  let userId = localStorage.getItem("userId");

  let userData, name, date, userIdArticle;
  const today = new Date();

  if (article) {
    userIdArticle = article.userId;
    if (article.createdAt != article.updatedAt) {
      date = new Date(article.createdAt);
    } else {
      date = new Date(article.createdAt);
    }
  }

  // get data user
  async function getUser() {
    const response = await fetch(
      "http://103.187.223.15:8800/api/users/" + userIdArticle
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

  // delete article
  async function deleteArticle() {
    const response = await fetch(
      "http://103.187.223.15:8800/api/articles/" + article._id,
      {
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
          userId: userId,
        }),
      }
    );

    if (!response.ok) {
      alert("You can only delete your article");
    } else {
      window.location.reload();
    }

    // const data = await response.json();
  }
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
      <div class="flex-auto" />
      {#if userId == userIdArticle}
        <Button btnClass="p-0 h-3"
          ><iconify-icon icon="fluent:more-horizontal-32-filled" /></Button
        >
        <Dropdown class="w-auto">
          <DropdownItem
            ><a href="/article/edit/{article._id}">Edit</a></DropdownItem
          >
          <DropdownItem on:click={deleteArticle}>Delete</DropdownItem>
        </Dropdown>
      {/if}
    </div>
    <a
      href="/article/{article._id}"
      class="prose prose-neutral hover:underline"
    >
      <img
        class="object-cover h-72 w-full rounded"
        src={article.coverArticle}
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
