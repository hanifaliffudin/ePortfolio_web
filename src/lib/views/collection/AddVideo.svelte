<script>
  export let idCollection;
  import VideoPlayer from "svelte-video-player";

  let files, src;

  // preview profile picture
  function loadFile(e) {
    src = URL.createObjectURL(e.target.files[0]);
  }
</script>

<main class="md:mx-72">
  <div class="md:container md:mx-auto my-16">
    {#if src}
      <VideoPlayer source={src} />
    {/if}
    <div class="mt-3">
      <input bind:files on:change={loadFile} type="file" accept="video/*" />
    </div>
  </div>
</main>
