<script>
  export let idActivity;
  import { Button, Popover } from "flowbite-svelte";
  import SvelteMarkdown from "svelte-markdown";
  import { navigate } from "svelte-routing";
  import { writable } from "svelte/store";

  const filesStore = writable(null);

  let activityData, desc, title, type, startDate, endDate, filesData;

  let userId = localStorage.getItem("userId");

  // get data activity
  async function getActivity() {
    const response = await fetch(
      "http://103.187.223.15:8800/api/activities/" + idActivity
    );

    if (!response.ok) {
      alert(response.statusText);
    }
    const data = await response.json();
    activityData = data;
    if (activityData) {
      getFiles();
    }
    desc = activityData.desc;
    title = activityData.title;
    type = activityData.type;
    startDate = new Date(activityData.startDate).toLocaleDateString("id");
    if (activityData.endDate) {
      endDate = new Date(activityData.endDate).toLocaleDateString("id");
    }
  }

  getActivity();

  // get files
  async function getFiles() {
    const response = await fetch(
      "http://103.187.223.15:8800/api/activities/files/" + idActivity
    );

    if (!response.ok) {
      alert(response.statusText);
    }
    const data = await response.json();
    filesData = data;
    if (filesData) {
      filesStore.update((data) => filesData);
    }
  }

  // delete activity
  async function deleteActivity() {
    if (filesData.length > 0) {
      filesData.forEach(async (file) => {
        const response = await fetch(
          "http://103.187.223.15:8800/api/albums/" + file._id,
          {
            method: "DELETE",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify({
              userId: userId,
            }),
          }
        );
      });
    }
    const response = await fetch(
      "http://103.187.223.15:8800/api/activities/" + idActivity,
      {
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
          userId: userId,
        }),
      }
    );

    if (!response.ok) {
      alert("You can only delete your activity");
    } else {
      navigate("/activities");
    }

    const data = await response.json();
  }

  function copyFileAddress(url) {
    // Copy the text inside the text field
    window.navigator.clipboard.writeText(url);
  }

  // delete file
  async function deleteFile(fileId) {
    const response = await fetch(
      "http://103.187.223.15:8800/api/albums/" + fileId,
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

{#if activityData}
  <main class="md:mx-72">
    <div class="md:container md:mx-auto my-16">
      <div class="flex justify-between mb-6">
        <div class="">
          <div>
            <div class="font-bold text-xl leading-tight">
              {title}
            </div>
            <div class="text-sm">
              {type == "academic" ? "Academic" : "Non Academic"}
            </div>
            {#if endDate}
              <div class="text-sm">
                {startDate} - {endDate}
              </div>
            {:else}
              <div class="text-sm">
                {startDate} - Present
              </div>
            {/if}
          </div>
        </div>
        {#if userId == activityData.userId}
          <div>
            <a
              href="/activity/add-file/{idActivity}"
              type="button"
              class="focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >Add file</a
            >
            <!-- <Button color="green"
              ><a href="/activity/add-file/{idActivity}">Add file</a></Button
            > -->
            <a
              href="/activity/edit/{idActivity}"
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 "
              ><iconify-icon icon="material-symbols:edit" /></a
            >
            <button
              on:click={deleteActivity}
              type="button"
              class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 "
              ><iconify-icon icon="material-symbols:delete-outline" /></button
            >
          </div>
        {/if}
      </div>

      <div>
        <div class="prose prose-neutral">
          <SvelteMarkdown source={desc} />
        </div>
        <div class="border border-r-0 border-l-0 border-b-0 mt-6">
          {#if $filesStore}
            {#each $filesStore as $file, i}
              <div class="flex items-center border border-t-0 p-2">
                <iconify-icon icon="ph:file" class="mr-2" />
                <div>
                  <a
                    href={"http://103.187.223.15:8800/" + $file.fileAlbum}
                    class="hover:underline"
                  >
                    {$file.filename}.{$file.fileAlbum.substring(
                      $file.fileAlbum.lastIndexOf(".") + 1
                    )}
                  </a>
                </div>
                <div class="flex-auto" />
                {#if userId == activityData.userId}
                  <button
                    on:click={() =>
                      copyFileAddress(
                        "http://103.187.223.15:8800/" + $file.fileAlbum
                      )}
                    id="bcopyvid"
                    class="flex items-center mr-2"
                    ><iconify-icon
                      icon="material-symbols:content-copy-outline"
                    /></button
                  >
                  <button
                    on:click={() => {
                      deleteFile($file._id);
                    }}
                    id="bdelvid"
                    class="flex items-center"
                    ><iconify-icon
                      icon="material-symbols:delete-outline"
                    /></button
                  >
                {/if}
                <Popover
                  class="w-auto text-sm font-light "
                  triggeredBy="#bcopyvid"
                >
                  Copy file address
                </Popover>
                <Popover
                  class="w-auto text-sm font-light "
                  triggeredBy="#bdelvid"
                >
                  Delete file
                </Popover>
              </div>
            {/each}
          {/if}
        </div>
      </div>
    </div>
  </main>
{/if}
