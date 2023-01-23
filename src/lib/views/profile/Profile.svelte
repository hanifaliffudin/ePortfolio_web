<script>
  import AboutMe from "../../components/AboutMe.svelte";
  import ProfileBar from "../../components/ProfileBar.svelte";
  import ProfileTabs from "../../components/ProfileTabs.svelte";
  let userId = localStorage.getItem("userId");
</script>

<main class="md:mx-64">
  <section>
    <div class="md:container md:mx-auto my-16">
      <div class="flex">
        <ProfileBar {userId} />

        <div class="flex-initial w-3/4">
          <!-- tabs -->
          <ProfileTabs active={"aboutme"} />

          <!-- tabs content -->
          <AboutMe />
        </div>
      </div>
    </div>
  </section>
</main>
