<script>
  import ProfileBar from "../../components/ProfileBar.svelte";
  import { writable } from "svelte/store";
  import { onMount } from "svelte";
  import ActivityCard from "../../components/ActivityCard.svelte";

  const activitiestore = writable(null);

  export let userId;

  let userIdLocal = localStorage.getItem("userId");

  let all = [];

  // get all user activities
  async function getActivitiy() {
    let response = await fetch(
      "http://103.187.223.15:8800/api/activities/all/" + userId
    );
    return response.ok ? await response.json() : null;
  }

  onMount(async () => {
    let activitiy = await getActivitiy();
    if (activitiy) {
      activitiy.forEach((element) => {
        // filter private activitiy
        if (element.isPublic == false && element.userId != userIdLocal) {
        } else {
          all.push(element);
          all = all;
        }
        // sorting activitiy
        all.sort(function (a, b) {
          // @ts-ignore
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
      });
      activitiestore.update((data) => all);
    }
  });
</script>

<main class="md:mx-72">
  <section>
    <div class="md:container md:mx-auto my-16">
      <div class="flex">
        <ProfileBar active={"activities"} {userId} />

        <div class="flex-initial w-3/4">
          <!-- tabs -->
          <div
            class="mb-4 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700"
          >
            <ul class="flex flex-wrap -mb-px">
              <li class="mr-2">
                <a
                  href="/profile/{userId}"
                  class="border-transparent hover:text-gray-600 hover:border-gray-300 inline-block p-4 rounded-t-lg border-b-2 "
                  >About Me</a
                >
              </li>
              <li class="mr-2">
                <a
                  href="/posts/{userId}"
                  class="border-transparent hover:text-gray-600 hover:border-gray-300 inline-block p-4 rounded-t-lg border-b-2"
                  aria-current="page">Posts</a
                >
              </li>
              <li class="mr-2">
                <a
                  href="/articles/{userId}"
                  class="border-transparent hover:text-gray-600 hover:border-gray-300 inline-block p-4 rounded-t-lg border-b-2 "
                  >Articles</a
                >
              </li>
              <li class="mr-2">
                <a
                  href="/activities/{userId}"
                  class="border-blue-600 text-blue-600 inline-block p-4 rounded-t-lg border-b-2 "
                  >Activities</a
                >
              </li>
              <li class="mr-2">
                <a
                  href="/projects/{userId}"
                  class="border-transparent hover:text-gray-600 hover:border-gray-300 inline-block p-4 rounded-t-lg border-b-2 "
                  >Projects</a
                >
              </li>
              <li class="mr-2">
                <a
                  href="/badges/{userId}"
                  class="border-transparent hover:text-gray-600 hover:border-gray-300 inline-block p-4 rounded-t-lg border-b-2 "
                  >Badges</a
                >
              </li>
            </ul>
          </div>

          <!-- tabs content -->

          {#if $activitiestore}
            {#each $activitiestore as $activity}
              <ActivityCard activity={$activity} />
            {/each}
          {/if}
        </div>
      </div>
    </div>
  </section>
</main>
