<script>
  import SvelteMarkdown from "svelte-markdown";

  import ProfileBar from "../components/ProfileBar.svelte";
  import ProfileTabs from "../components/ProfileTabs.svelte";

  let source = `
  # h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading
  `;
</script>

<main class="md:mx-72">
  <section>
    <div class="md:container md:mx-auto my-16">
      <div class="flex">
        <ProfileBar />

        <div class="flex-initial w-3/4">
          <!-- tabs -->
          <ProfileTabs active={"articles"} />

          <!-- tabs content -->
          <a
            href="/article/create"
            class="w-full mb-8 bg-blue-700 text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-3 text-center inline-flex items-center justify-center"
          >
            Create new article
            <iconify-icon class="ml-2" icon="akar-icons:plus" />
          </a>

          <div
            class="md:container md:mx-auto bg-gray-100 p-6 rounded-lg post-card mb-8"
          >
            <div class="flex mb-4 ">
              <img
                class="w-14 h-14 rounded-full object-cover"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="Rounded avatar"
              />
              <div class="flex flex-col meta ml-4 leading-tight flex-auto">
                <div class="font-bold text-lg">Nafira Ramadhannis</div>
                <div class="font-light text-xs">175150201111007</div>
                <div class="font-light text-xs">11.20 AM 12 Oct 2022</div>
              </div>
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
            <a href="/article/test" class="prose prose-neutral">
              <SvelteMarkdown {source} />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
