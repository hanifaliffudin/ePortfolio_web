<script>
  import PostCard from "../components/PostCard.svelte";
  import ProfileBar from "../components/ProfileBar.svelte";
  import ProfileTabs from "../components/ProfileTabs.svelte";
  import ProjectCard from "../components/ProjectCard.svelte";
</script>

<main class="md:mx-72">
  <section>
    <div class="md:container md:mx-auto my-16">
      <div class="flex">
        <ProfileBar />

        <div class="flex-initial w-3/4">
          <!-- tabs -->
          <ProfileTabs active={"activities"} />

          <!-- tabs content -->
          <div class="md:container md:mx-auto">
            <div class="md:container md:mx-auto bg-gray-300 p-4 rounded-lg">
              <textarea
                id="message"
                rows="2"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your message..."
              />
              <div class="flex mt-4 justify-between">
                <div class="flex">
                  <button type="button" class="mr-4">
                    <iconify-icon icon="bi:image" style="font-size: 24px" />
                  </button>
                  <button type="button" class="mr-4">
                    <iconify-icon
                      icon="bxs:video-plus"
                      style="font-size: 24px"
                    />
                  </button>
                  <a
                    href="editor"
                    class="bg-white hover:bg-gray-100 font-medium rounded-full text-sm px-3 py-0 text-center inline-flex items-center mr-2"
                  >
                    <iconify-icon icon="ooui:articles-ltr" class="mr-2" />
                    Write Article
                  </a>
                  <button
                    type="button"
                    class="bg-white hover:bg-gray-100 font-medium rounded-full text-sm px-3 py-0 text-center inline-flex items-center mr-2"
                    data-modal-toggle="new-project-modal"
                  >
                    <iconify-icon icon="codicon:new-folder" class="mr-2" />
                    Add Project
                  </button>
                </div>
                <button
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                >
                  Post
                </button>
              </div>
            </div>

            <div class="flex my-6">
              <a
                href="#"
                class="bg-gray-300 hover:bg-gray-400 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
                >All Activity</a
              >
              <a
                href="#"
                class="bg-gray-300 hover:bg-gray-400 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
                >Posts</a
              >
              <a
                href="#"
                class="bg-gray-300 hover:bg-gray-400 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
                >Articles</a
              >
              <a
                href="#"
                class="bg-gray-300 hover:bg-gray-400 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
                >Projects</a
              >
              <a
                href="#"
                class="bg-gray-300 hover:bg-gray-400 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none inline-flex items-center"
                data-modal-toggle="filterModal"
                >More
                <iconify-icon
                  icon="fluent:more-horizontal-32-filled"
                  class="ml-2"
                />
              </a>
            </div>

            <PostCard />

            <ProjectCard />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- new project modal -->
  <div
    id="new-project-modal"
    tabindex="-1"
    aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
  >
    <div class="relative p-4 w-full max-w-lg h-full md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow">
        <button
          type="button"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          data-modal-toggle="new-project-modal"
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
        <div class="py-6 px-6 lg:px-8">
          <h3 class="mb-4 text-xl font-medium text-gray-900">
            Add New Project
          </h3>
          <form class="space-y-6" action="#">
            <div>
              <label
                for="title"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Title</label
              >
              <input
                type="text"
                name="title"
                id="titleProject"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label
                for="description"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Description project</label
              >
              <textarea
                id="message"
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div class="flex">
              <button type="button">
                <iconify-icon icon="bi:image" />
              </button>
            </div>

            <div class="flex items-center">
              <div class="logo-picture-container flex-none mr-2">
                <img
                  class="w-16 h-16 rounded-full logo-project"
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  alt="Rounded avatar"
                />
              </div>
              <input
                id="uploadLogoProject"
                type="file"
                accept="image/*"
                hidden
              />
              <div class="flex-1">
                <label
                  for="title"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Contributor</label
                >
                <input
                  type="text"
                  name="title"
                  id="contributor"
                  class="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
                <div class="border-dashed border-2 border-gray-500 rounded-md">
                  <button
                    type="button"
                    class="w-full flex items-center justify-center font-medium rounded py-1 text-sm text-center"
                  >
                    <iconify-icon icon="carbon:add-filled" />
                  </button>
                </div>
              </div>
            </div>

            <div class="flex">
              <span
                class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300"
              >
                <iconify-icon icon="arcticons:url-checker" />
              </span>
              <input
                type="text"
                class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
              />
            </div>

            <div class="flex">
              <span
                class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300"
              >
                <iconify-icon icon="ant-design:code-outlined" />
              </span>
              <input
                type="text"
                class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
              />
            </div>

            <div class="flex justify-end">
              <button
                type="submit"
                class="w-auto mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Save
              </button>
              <button
                type="submit"
                class="w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Add Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Filter modal -->
  <div
    id="filterModal"
    tabindex="-1"
    aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
  >
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow">
        <!-- Modal header -->
        <div class="flex justify-between items-start p-4 rounded-t border-b">
          <h3 class="text-xl font-semibold text-gray-900">Filter by</h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            data-modal-toggle="filterModal"
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
        <div class="p-6 space-y-6">
          <form>
            <div class="mb-6">
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Years</label
              >
              <div class="flex items-center">
                <div class="relative">
                  <input
                    name="start"
                    type="number"
                    min="2000"
                    max="2022"
                    step="1"
                    value="2022"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 datepicker-input"
                    placeholder="Select date start"
                  />
                </div>
                <span class="mx-4 text-gray-500">to</span>
                <div class="relative">
                  <input
                    name="end"
                    type="number"
                    min="2000"
                    max="2022"
                    step="1"
                    value="2022"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 datepicker-input"
                    placeholder="Select date end"
                  />
                </div>
              </div>
            </div>
            <div class="mb-6">
              <label
                for="filter2"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Filter 2</label
              >
              <input
                type="text"
                id="filter2"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div class="mb-6">
              <label
                for="filter3"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Filter 3</label
              >
              <input
                type="text"
                id="filter3"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>

            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</main>
