<script>
  import ActivityCard from "../../components/ActivityCard.svelte";

  export let searchKeyword;
  let activities = [];
  let userIdLocal = localStorage.getItem("userId");

  if (searchKeyword) getActivities();

  // get all activities
  async function getActivities() {
    let response = await fetch(
      `http://103.187.223.15:8800/api/activities/search/${searchKeyword}`
    );

    if (!response.ok) {
      alert(response.status);
    }

    const data = await response.json();
    let temp = data;
    temp.forEach((element) => {
      // filter private activity
      if (element.isPublic == false && element.userId != userIdLocal) {
      } else {
        activities.push(element);
        activities = activities;
      }
    });
  }
</script>

<div class="md:container md:mx-auto my-16">
  <div class="flex justify-center">
    <div class="w-1/2">
      {#if activities.length > 0}
        {#each activities as activity}
          <ActivityCard {activity} />
        {/each}
      {/if}
    </div>
  </div>
</div>
