<script>
  import SvelteMarkdown from "svelte-markdown";
  import { navigate } from "svelte-routing";
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
  import CommentCard from "../../components/CommentCard.svelte";

  export let idBadge;

  let badgeData,
    desc,
    date,
    time,
    userIdBadge,
    title,
    imgBadge,
    issuer,
    url,
    skills = [];

  let userId = localStorage.getItem("userId");

  const today = new Date().toLocaleDateString("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // get data user
  async function getUser() {
    const response = await fetch(
      "http://103.187.223.15:8800/api/users/" + userId
    );

    if (!response.ok) {
      localStorage.clear();
      document.location.href = "/login";
    }

    const data = await response.json();
  }

  getUser();

  // get data badge
  async function getBadge() {
    const response = await fetch(
      "http://103.187.223.15:8800/api/badges/" + idBadge
    );

    if (!response.ok) {
      alert(response.statusText);
    }
    const data = await response.json();
    badgeData = data;
    desc = badgeData.desc;
    title = badgeData.title;
    issuer = badgeData.issuer;
    skills = badgeData.skills;
    url = badgeData.url;
    imgBadge = badgeData.imgBadge;
    userIdBadge = badgeData.userId;
    date = new Date(badgeData.createdAt).toLocaleDateString("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    time = new Date(badgeData.createdAt).toLocaleTimeString("en", {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  getBadge();

  // delete badge
  async function deleteBadge() {
    const response = await fetch(
      "http://103.187.223.15:8800/api/badges/" + idBadge,
      {
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
          userId: userId,
        }),
      }
    );

    if (!response.ok) {
      alert("You can only delete your badge");
    } else {
      navigate("/badges");
    }

    // const data = await response.json();
  }
</script>

{#if badgeData}
  <main class="md:mx-36">
    <div class=" md:mx-auto my-16">
      <div class="flex justify-center w-full">
        <div class="w-3/4">
          <div class="flex justify-end mb-3">
            {#if userIdBadge == userId}
              <Button btnClass="p-0 h-3"
                ><iconify-icon
                  icon="fluent:more-horizontal-32-filled"
                /></Button
              >
              <Dropdown class="w-auto">
                <DropdownItem
                  ><a href="/badge/edit/{idBadge}">Edit</a></DropdownItem
                >
                <DropdownItem on:click={deleteBadge}>Delete</DropdownItem>
              </Dropdown>
            {/if}
          </div>
          <div class="flex">
            <div class="flex-initial w-2/5">
              <img
                class="w-full h-auto object-cover rounded-lg m-0"
                src={imgBadge}
                alt="Default avatar"
              />
            </div>
            <div class="ml-8 flex-initial w-3/5">
              <h1 class="mb-4 font-bold text-2xl">{title}</h1>
              <div class="mb-4">Issued by {issuer}</div>
              <div class="mb-4 prose prose-neutral text-sm max-w-none">
                <SvelteMarkdown source={desc} />
              </div>
              {#if url}
                <div class="mb-4">
                  <a href={url} class="underline">Learn more</a>
                </div>
              {/if}
              <div class="mb-4">Issued Date: {date}</div>
              {#if skills && skills.length > 0}
                <div class="font-bold mb-2">Skills</div>
                <div class="flex flex-wrap">
                  {#each skills as skill, i (skill)}
                    <div
                      class="text-gray-900 bg-white border border-gray-300 focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-3 my-1.5"
                    >
                      <a
                        class="no-underline hover:underline"
                        href="/discovery?search={skill}">{skill}</a
                      >
                    </div>
                  {/each}
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
{/if}
