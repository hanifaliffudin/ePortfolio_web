<script>
  import { Popover, Modal, Button } from "flowbite-svelte";
  import VideoPlayer from "svelte-video-player";

  export let album;

  let userId = localStorage.getItem("userId");

  let defaultModal = false;

  function copyFileAddress(url) {
    // Copy the text inside the text field
    window.navigator.clipboard.writeText(url);
  }

  // delete file
  async function deleteFile() {
    const response = await fetch(
      "http://103.187.223.15:8800/api/album/" + album._id,
      {
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
          userId: userId,
        }),
      }
    );

    if (!response.ok) {
      alert("You can only delete your file");
    } else {
      window.location.reload();
    }

    // const data = await response.json();
  }
</script>

{#if album.type == "image"}
  <div class="relative group/item opacity-75 hover:opacity-100">
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <img
      on:click={() => (defaultModal = true)}
      src={"http://103.187.223.15:8800/" + album.fileAlbum}
      alt="Image"
      class="inset-0 h-36 w-full object-cover object-center rounded border cursor-pointer"
    />
    <button
      on:click={() =>
        copyFileAddress("http://103.187.223.15:8800/" + album.fileAlbum)}
      id="bcopyimg"
      class="group/edit invisible group-hover/item:visible absolute top-2 right-2 bg-white p-1 rounded-lg flex items-center"
      ><iconify-icon icon="material-symbols:content-copy-outline" /></button
    >
    <button
      on:click={deleteFile}
      id="bdelvid"
      class="group/edit invisible group-hover/item:visible absolute bottom-2 right-2 bg-white p-1 rounded-lg flex items-center"
      ><iconify-icon icon="material-symbols:delete-outline" /></button
    >
    <Popover class="w-auto text-sm font-light " triggeredBy="#bcopyimg">
      Copy image address
    </Popover>
  </div>
{:else if album.type == "video"}
  <div class="relative group/item opacity-75 hover:opacity-100">
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <video
      on:click={() =>
        window.open("http://103.187.223.15:8800/" + album.fileAlbum, "_blank")}
      class="inset-0 h-36 w-full object-cover object-center rounded border cursor-pointer"
      src={"http://103.187.223.15:8800/" + album.fileAlbum}
    >
      <track kind="captions" /></video
    >
    <button
      on:click={() =>
        copyFileAddress("http://103.187.223.15:8800/" + album.fileAlbum)}
      id="bcopyvid"
      class="group/edit invisible group-hover/item:visible absolute top-2 right-2 bg-white p-1 rounded-lg flex items-center"
      ><iconify-icon icon="material-symbols:content-copy-outline" /></button
    >
    <button
      on:click={() =>
        window.open("http://103.187.223.15:8800/" + album.fileAlbum, "_blank")}
      class="group/edit invisible group-hover/item:visible absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white rounded-full flex items-center"
      ><iconify-icon icon="material-symbols:play-circle" /></button
    >
    <button
      on:click={deleteFile}
      id="bdelvid"
      class="group/edit invisible group-hover/item:visible absolute bottom-2 right-2 bg-white p-1 rounded-lg flex items-center"
      ><iconify-icon icon="material-symbols:delete-outline" /></button
    >
    <Popover class="w-auto text-sm font-light " triggeredBy="#bcopyvid">
      Copy file address
    </Popover>
  </div>
{:else if album.type == "document"}{/if}

<Popover class="w-auto text-sm font-light " triggeredBy="#bdelvid">
  Delete file
</Popover>

<Modal bind:open={defaultModal} autoclose>
  <div class="flex justify-center">
    {#if album.type == "image"}
      <img src={"http://103.187.223.15:8800/" + album.fileAlbum} alt="" />
    {:else if album.type == "video"}
      <VideoPlayer source={"http://103.187.223.15:8800/" + album.fileAlbum} />
    {:else if album.type == "document"}
      <div />
    {/if}
  </div>
  <svelte:fragment slot="footer">
    <div class="flex justify-end w-full items-center">
      <Button
        on:click={() =>
          copyFileAddress("http://103.187.223.15:8800/" + album.fileAlbum)}
        color="alternative"
        ><iconify-icon
          icon="material-symbols:content-copy-outline"
          class="mr-2"
        /> Copy image address</Button
      >
    </div>
  </svelte:fragment>
</Modal>
