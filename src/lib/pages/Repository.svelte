<script>
  import AboutMe from "../components/AboutMe.svelte";
  import DropdownPost from "../components/DropdownPost.svelte";
  import ProfileBar from "../components/ProfileBar.svelte";
  import ProfileTabs from "../components/ProfileTabs.svelte";
</script>

<main class="md:mx-72">
  <section>
    <div class="md:container md:mx-auto my-16">
      <div class="flex">
        <ProfileBar />

        <div class="flex-initial w-3/4">
          <!-- tabs -->
          <ProfileTabs active={"repository"} />

          <!-- tabs content -->
          <button
            type="button"
            class="w-full mb-8 bg-gray-300 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-4 text-center inline-flex items-center justify-center"
          >
            Create new repository
            <iconify-icon class="ml-2" icon="akar-icons:plus" />
          </button>

          <div
            class="md:container md:mx-auto bg-gray-200 px-6 pb-6 pt-1 rounded-lg post-card mb-8"
          >
            <div class="flex justify-end mb-3">
              <DropdownPost />
            </div>
            <div class="flex">
              <img
                class="w-14 h-14 rounded-full object-cover"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="Rounded avatar"
              />
              <div class="flex flex-col meta ml-4 leading-tight flex-auto">
                <div class="flex justify-between items-center">
                  <div class="font-bold text-lg">
                    SKINSIS - Skin Disease Detection
                  </div>
                  <div class="font-bold text-lg">21 Files</div>
                </div>
                <div class="font-light text-sm">Java, Python, HTML</div>
                <div class="flex justify-between items-center">
                  <div class="font-light text-xs">6 Contributors</div>
                  <div class="font-light text-sm">Created : 22 May 2020</div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="md:container md:mx-auto bg-gray-200 px-6 pb-6 pt-1 rounded-lg post-card mb-8"
          >
            <div class="flex justify-end mb-3">
              <DropdownPost />
            </div>
            <div class="flex">
              <img
                class="w-14 h-14 rounded-full object-cover"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="Rounded avatar"
              />
              <div class="flex flex-col meta ml-4 leading-tight flex-auto">
                <div class="flex justify-between items-center">
                  <div class="font-bold text-lg">Pemrograman Dasar</div>
                  <div class="font-bold text-lg">25 Files</div>
                </div>
                <div class="font-light text-sm">Java</div>
                <div class="flex justify-between items-center">
                  <div class="font-light text-xs">Owner Nafira Ramadhannis</div>
                  <div class="font-light text-sm">Created : 22 May 2020</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
