<script>
  export let idCollection;
  import VideoPlayer from "svelte-video-player";

  let files, src, extension, filename, type, maxImage;

  // preview image
  function loadFile(e) {
    if (e.target.files[0].size <= 2 * 1024 * 1024) {
      src = URL.createObjectURL(e.target.files[0]);

      const name = e.target.files[0].name;
      const lastDot = name.lastIndexOf(".");
      const fileName = name.substring(0, lastDot);
      const ext = name.substring(lastDot + 1);

      filename = fileName;
      extension = ext;

      console.log(e.target.files[0].type);

      if (
        extension == "png" ||
        extension == "jpg" ||
        extension == "jpeg" ||
        extension == "gif" ||
        extension == "svg" ||
        extension == "webp"
      ) {
        type = "image";
      } else if (
        extension == "mov" ||
        extension == "mp4" ||
        extension == "ogg" ||
        extension == "webm"
      ) {
        type = "video";
      } else if (
        extension == "docx" ||
        extension == "doc" ||
        extension == "xls" ||
        extension == "xlsx" ||
        extension == "ppt" ||
        extension == "pptx" ||
        extension == "pdf"
      ) {
        type = "document";
      } else {
        alert("Extension not supported");
        type = null;
      }
      maxImage = false;
    } else {
      alert("Maximum image size is 2MB");
      maxImage = true;
    }
  }

  // upload file
  function uploadFile() {}
</script>

<main class="md:mx-72">
  <div class="md:container md:mx-auto my-16">
    <!-- image -->
    <div>
      {#if type == "image"}
        <img
          class="w-auto h-auto rounded-lg profile-picture mb-4 object-cover"
          {src}
          alt="Default avatar"
        />
      {/if}
    </div>

    <!-- video -->
    <div>
      {#if type == "video"}
        <VideoPlayer source={src} />
      {/if}
    </div>

    <div>
      <label
        for="file"
        class="block mb-2 font-medium text-gray-900 dark:text-white"
        >Upload File</label
      >

      <input bind:files on:change={loadFile} type="file" />
    </div>
    <div class="flex justify-end items-center space-x-2">
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >Upload</button
      >
      <button
        type="button"
        on:click={() => history.back()}
        class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
      >
        Cancel
      </button>
    </div>
  </div>
</main>
