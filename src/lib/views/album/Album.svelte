<script>
  import ProfileBar from "../../components/ProfileBar.svelte";
  import ProfileTabs from "../../components/ProfileTabs.svelte";
  import { writable } from "svelte/store";
  import { onMount } from "svelte";
  import AlbumCard from "../../components/AlbumCard.svelte";

  const albumStore = writable(null);

  let userId = localStorage.getItem("userId");

  let sizeUsed = 0;

  // get all files album user
  async function getAlbum() {
    let response = await fetch(
      "http://103.187.223.15:8800/api/album/all/" + userId
    );
    return response.ok ? await response.json() : null;
  }

  onMount(async () => {
    let album = await getAlbum();
    if (album) {
      albumStore.update((data) => album);
      album.forEach((file) => {
        sizeUsed += file.filesize;
      });
    }
  });
</script>

<main class="md:mx-64">
  <section>
    <div class="md:container md:mx-auto my-16">
      <div class="flex">
        <ProfileBar active={"album"} {userId} />

        <div class="flex-initial w-3/4">
          <!-- tabs -->
          <ProfileTabs active={"album"} />

          <!-- tabs content -->
          {#if sizeUsed / 1000000000 < 2}
            <a
              href="add-file"
              class="w-full mb-4 bg-blue-700 text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-3 text-center inline-flex items-center justify-center"
            >
              Add new file
              <iconify-icon class="ml-2" icon="akar-icons:plus" />
            </a>
          {/if}

          {#if $albumStore}
            <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700 mb-2">
              <div
                class=" {sizeUsed / 1000000000 < 1.9
                  ? 'bg-blue-600'
                  : 'bg-red-600'} text-xs font-medium text-blue-400 text-center p-0.5 leading-none rounded-full"
                style="width: {(sizeUsed / 1000000000 / 2) * 100}%"
              >
                <!-- {(sizeUsed / 1000000000 / 2).toFixed(4) * 100}% -->
              </div>
            </div>

            <div class="text-xs">
              {(sizeUsed / 1000000000).toFixed(2)} GB dari 2 GB telah digunakan
            </div>

            <div class="grid grid-cols-3 gap-2 mt-4">
              {#each $albumStore as $album, i}
                <AlbumCard album={$album} />
              {/each}
            </div>
          {/if}
        </div>
      </div>
    </div>
  </section>
</main>
