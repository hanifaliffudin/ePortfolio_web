<script>
  export let idCollection;

  let files, src;

  // preview profile picture
  function loadFile(e) {
    src = URL.createObjectURL(e.target.files[0]);
  }
</script>

<main class="md:mx-72">
  <div class="md:container md:mx-auto my-16">
    {#if src}
      <img
        class="w-auto h-auto rounded-lg profile-picture mb-4 object-cover"
        {src}
        alt="Default avatar"
      />
    {/if}
    <div>
      <label
        for="cover-image"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Upload Image</label
      >

      <input
        bind:files
        on:change={loadFile}
        type="file"
        accept=".jpg, .jpeg, .png"
      />
    </div>
  </div>
</main>
