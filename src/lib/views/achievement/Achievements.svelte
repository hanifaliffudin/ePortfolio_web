<script>
  import ProfileBar from "../../components/ProfileBar.svelte";
  import ProfileTabs from "../../components/ProfileTabs.svelte";
  import { writable } from "svelte/store";
  import { onMount } from "svelte";
  import AchievementCard from "../../components/AchievementCard.svelte";

  const achievementStore = writable(null);

  let userId = localStorage.getItem("userId");

  // get all user achievements
  async function getAchievements() {
    let response = await fetch(
      "http://103.187.223.15:8800/api/achievements/all/" + userId
    );
    return response.ok ? await response.json() : null;
  }

  onMount(async () => {
    let achievement = await getAchievements();
    if (achievement) achievementStore.update((data) => achievement);
  });
</script>

<main class="md:mx-72">
  <section>
    <div class="md:container md:mx-auto my-16">
      <div class="flex">
        <ProfileBar {userId} />

        <div class="flex-initial w-3/4">
          <!-- tabs -->
          <ProfileTabs active={"achievements"} />

          <!-- tabs content -->
          <a
            href="/achievement/add"
            class="w-full mb-8 bg-blue-700 text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-3 text-center inline-flex items-center justify-center"
          >
            Add new achievement
            <iconify-icon class="ml-2" icon="akar-icons:plus" />
          </a>

          {#if $achievementStore}
            {#each $achievementStore as $achievement}
              <AchievementCard achievement={$achievement} />
            {/each}
          {/if}
        </div>
      </div>
    </div>
  </section>
</main>
