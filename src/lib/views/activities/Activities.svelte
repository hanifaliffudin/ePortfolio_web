<script>
  import { writable } from "svelte/store";
  import { onMount } from "svelte";
  import ProfileBar from "../../components/ProfileBar.svelte";
  import ProfileTabs from "../../components/ProfileTabs.svelte";
  import ActivityCard from "../../components/ActivityCard.svelte";

  let userId = localStorage.getItem("userId");
  const activitiesStore = writable(null);

  // get all user activities
  async function getActivities() {
    let response = await fetch(
      "http://103.187.223.15:8800/api/activities/all/" + userId
    );
    return response.ok ? await response.json() : null;
  }

  onMount(async () => {
    let activities = await getActivities();
    if (activities) activitiesStore.update((data) => activities);
  });
</script>

<main class="md:mx-72">
  <section>
    <div class="md:container md:mx-auto my-16">
      <div class="flex">
        <ProfileBar {userId} />

        <div class="flex-initial w-3/4">
          <!-- tabs -->
          <ProfileTabs active={"activities"} />

          <!-- tabs content -->

          <!-- <div class="flex items-center mb-4">
            <div class="relative w-full">
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  ><path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  /></svg
                >
              </div>
              <input
                type="text"
                id="simple-search"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Find a activity..."
                required
              />
            </div>
            <a
              href="/activity/create"
              class="p-2.5 px-6 ml-2 text-sm font-medium text-white bg-green-600 rounded-lg border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300"
            >
              New
            </a>
          </div> -->

          <a
            href="/activity/add"
            class="w-full mb-8 bg-blue-700 text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-3 text-center inline-flex items-center justify-center"
          >
            Add new activity
            <iconify-icon class="ml-2" icon="akar-icons:plus" />
          </a>

          {#if $activitiesStore}
            {#each $activitiesStore as $activity}
              <ActivityCard activity={$activity} />
            {/each}
          {/if}
        </div>
      </div>
    </div>
  </section>
</main>
