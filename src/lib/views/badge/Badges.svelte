<script>
  import ProfileBar from "../../components/ProfileBar.svelte";
  import ProfileTabs from "../../components/ProfileTabs.svelte";
  import BadgeCard from "../../components/BadgeCard.svelte";
  import { writable } from "svelte/store";
  import { onMount } from "svelte";

  const badgeStore = writable(null);

  let userId = localStorage.getItem("userId");

  // get all user badges
  async function getBadges() {
    let response = await fetch(
      "http://103.187.223.15:8800/api/badges/all/" + userId
    );
    return response.ok ? await response.json() : null;
  }

  onMount(async () => {
    let badge = await getBadges();
    if (badge) badgeStore.update((data) => badge);
  });
</script>

<main class="md:mx-72">
  <section>
    <div class="md:container md:mx-auto my-16">
      <div class="flex">
        <ProfileBar {userId} />

        <div class="flex-initial w-3/4">
          <!-- tabs -->
          <ProfileTabs active={"badges"} />

          <!-- tabs content -->
          <a
            href="/badge/add"
            class="w-full mb-8 bg-blue-700 text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-3 text-center inline-flex items-center justify-center"
          >
            Add new badge
            <iconify-icon class="ml-2" icon="akar-icons:plus" />
          </a>

          <div class="grid grid-cols-3 gap-2">
            {#if $badgeStore}
              {#each $badgeStore as $badge}
                <BadgeCard badge={$badge} />
              {/each}
            {/if}
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
