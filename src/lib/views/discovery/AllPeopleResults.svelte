<script>
  import PeopleCardDiscovery from "../../components/PeopleCardDiscovery.svelte";

  export let searchKeyword;
  let usersId = [];
  let userIdLocal = localStorage.getItem("userId");

  if (searchKeyword) getPeoples();

  // get all articles
  async function getPeoples() {
    let response = await fetch(
      `http://103.187.223.15:8800/api/users/search/${userIdLocal}/${searchKeyword}`
    );

    if (!response.ok) {
      alert(response.status);
    }

    const data = await response.json();
    usersId = data;
  }
</script>

<div class="md:container md:mx-auto my-16">
  <div class="flex justify-center">
    <div class="w-1/2">
      {#if usersId.length > 0}
        <div class="rounded-lg bg-gray-100">
          <h2 class="text-3xl font-bold px-6 pt-6">People</h2>
          {#each usersId as userId, i}
            {#if userIdLocal != userId}
              <PeopleCardDiscovery {userId} />
              {#if !(i == usersId.length - 1)}
                <hr class="h-1 bg-gray-300" />
              {:else}
                <div
                  class="py-1 w-full text-base font-medium text-center bg-gray-100 rounded-b-lg focus:ring-4 focus:outline-none focus:ring-gray-200"
                />
              {/if}
            {/if}
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>
