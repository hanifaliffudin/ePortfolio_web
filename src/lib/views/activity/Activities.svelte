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

<main class="md:mx-64">
  <section>
    <div class="md:container md:mx-auto my-16">
      <div class="flex">
        <ProfileBar {userId} />

        <div class="flex-initial w-3/4">
          <!-- tabs -->
          <ProfileTabs active={"activities"} />

          <!-- tabs content -->
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
