<script>
  import AboutMe from "../components/AboutMe.svelte";
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
          <ProfileTabs active={"aboutme"} />

          <!-- tabs content -->
          <AboutMe />
        </div>
      </div>
    </div>
  </section>

  <!-- Main modal -->
  <div
    id="addBlockModal"
    tabindex="-1"
    aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
  >
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow">
        <!-- Modal header -->
        <div class="flex justify-between items-start p-4 rounded-t border-b">
          <h3 class="text-xl font-semibold text-gray-900">
            Add block to Profile
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            data-modal-toggle="addBlockModal"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6 bg-gray-300 rounded-b-lg">
          <button
            type="button"
            class="w-full bg-white hover:bg-white focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between"
          >
            Add Skills
            <iconify-icon class="ml-2" icon="akar-icons:plus" />
          </button>
          <button
            type="button"
            class="w-full mb-3 bg-white hover:bg-white focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between"
          >
            Add Interest
            <iconify-icon class="ml-2" icon="akar-icons:plus" />
          </button>
          <button
            type="button"
            class="w-full mb-3 bg-white hover:bg-white focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between"
          >
            Add Social Media
            <iconify-icon class="ml-2" icon="akar-icons:plus" />
          </button>
          <button
            type="button"
            class="w-full mb-3 bg-white hover:bg-white focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between"
          >
            Add x
            <iconify-icon class="ml-2" icon="akar-icons:plus" />
          </button>
          <div class="border-dashed border-2 border-gray-500 rounded-lg">
            <button
              type="button"
              class="w-full bg-gray-300 hover:bg-white focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-4 text-center inline-flex items-center justify-center"
            >
              Add custom block
              <iconify-icon class="ml-2" icon="akar-icons:plus" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
