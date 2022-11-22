<script>
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
          <ProfileTabs active={"collections"} />

          <!-- tabs content -->

          <div class="flex items-center mb-4">
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
                placeholder="Find a collection..."
                required
              />
            </div>
            <button
              type="submit"
              class="p-2.5 px-6 ml-2 text-sm font-medium text-white bg-green-600 rounded-lg border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300"
            >
              New
            </button>
          </div>

          <hr />
          <div class="flex my-4">
            <div class="w-full">
              <div class="flex mb-3">
                <div class="text-blue-500 font-bold text-xl">
                  <a href="">WebCalculator</a>
                </div>
                <div
                  class="ml-3 border-2 text-sm items-center inline-flex rounded-full px-3 border-gray-300"
                >
                  Public
                </div>
                <div class="flex-auto" />
                <button
                  id="multiLevelDropdownButton"
                  data-dropdown-toggle="dropdown"
                  class="font-medium h-3 justify-self-end"
                  type="button"
                >
                  <iconify-icon icon="fluent:more-horizontal-32-filled" />
                </button>
                <!-- Dropdown menu -->
                <div
                  id="dropdown"
                  class="hidden z-10 w-32 bg-white rounded divide-y divide-gray-100 shadow"
                >
                  <ul
                    class="py-1 text-sm text-gray-700"
                    aria-labelledby="multiLevelDropdownButton"
                  >
                    <li>
                      <a
                        href="/post/edit/"
                        class="block py-2 px-4 hover:bg-gray-100">Edit</a
                      >
                    </li>
                    <li>
                      <button
                        type="button"
                        class="block w-full text-start py-2 px-4 hover:bg-gray-100"
                        >Delete</button
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <div class="md:w-2/3 mb-3">
                Membuat kalkulator sederhana mengikuti silabus Dasar Pemrograman
                Web Dicoding
              </div>
              <div class="flex ">
                <div class="text-sm mr-8">JavaScript</div>
                <div class="text-sm">Updated on Aug 8, 2020</div>
              </div>
            </div>
            <div />
          </div>

          <hr />
          <div class="flex my-4">
            <div class="w-full">
              <div class="flex mb-3">
                <div class="text-blue-500 font-bold text-xl">
                  <a href="">MarkdownBlog</a>
                </div>
                <div
                  class="ml-3 border-2 text-sm items-center inline-flex rounded-full px-3 border-gray-300"
                >
                  Private
                </div>
                <div class="flex-auto" />
                <button
                  id="multiLevelDropdownButton"
                  data-dropdown-toggle="dropdown"
                  class="font-medium h-3 justify-self-end"
                  type="button"
                >
                  <iconify-icon icon="fluent:more-horizontal-32-filled" />
                </button>
                <!-- Dropdown menu -->
                <div
                  id="dropdown"
                  class="hidden z-10 w-32 bg-white rounded divide-y divide-gray-100 shadow"
                >
                  <ul
                    class="py-1 text-sm text-gray-700"
                    aria-labelledby="multiLevelDropdownButton"
                  >
                    <li>
                      <a
                        href="/post/edit/"
                        class="block py-2 px-4 hover:bg-gray-100">Edit</a
                      >
                    </li>
                    <li>
                      <button
                        type="button"
                        class="block w-full text-start py-2 px-4 hover:bg-gray-100"
                        >Delete</button
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <div class="md:w-2/3 mb-3">
                Simple blog using Next and Markdown
              </div>
              <div class="flex ">
                <div class="text-sm mr-8">JavaScript</div>
                <div class="text-sm">Updated on Aug 8, 2020</div>
              </div>
            </div>
            <div />
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
