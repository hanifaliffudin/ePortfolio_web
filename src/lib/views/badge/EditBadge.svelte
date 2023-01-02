<script>
  import { navigate } from "svelte-routing";
  import SvelteMarkdown from "svelte-markdown";

  const today = new Date().toLocaleDateString("en-CA");

  export let idBadge;

  let title,
    issuer,
    visibility,
    desc,
    src,
    files,
    imgBadge,
    url,
    badgeData,
    earnedDate,
    maxImage;
  let userId = localStorage.getItem("userId");

  // preview image
  function loadFile(e) {
    if (e.target.files[0].size <= 2 * 1024 * 1024) {
      src = URL.createObjectURL(e.target.files[0]);
      maxImage = false;
    } else {
      alert("Maximum image size is 2MB");
      maxImage = true;
    }
  }

  // update data badge
  async function updateBadge() {
    if (!maxImage) {
      let response;
      response = await fetch(
        "http://103.187.223.15:8800/api/badges/" + idBadge,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            title,
            imgBadge,
            issuer,
            desc,
            url,
            earnedDate,
            // isPublic: visibility == "public" ? true : false,
          }),
        }
      );

      if (!response.ok) {
        window.alert(response.statusText);
        console.log(response.status);
        console.log(response.statusText);
      }

      const data = await response.json();
      navigate("/badge/" + idBadge);
    } else {
      alert("Maximum image size is 2MB");
    }
  }

  // get data badge
  async function getBadge() {
    const response = await fetch(
      "http://103.187.223.15:8800/api/badges/" + idBadge
    );

    if (!response.ok) {
      alert(response.statusText);
    }
    const data = await response.json();
    badgeData = data;
    desc = badgeData.desc;
    title = badgeData.title;
    issuer = badgeData.issuer;
    url = badgeData.url;
    if (badgeData.earnedDate) {
      earnedDate = new Date(badgeData.earnedDate).toLocaleDateString("en-CA");
    }
    imgBadge = badgeData.imgBadge;
    // badgeData.isPublic ? (visibility = "public") : (visibility = "private");
  }

  getBadge();
</script>

<section class="flex">
  <div class="py-8 px-4 w-1/2 lg:py-8">
    <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
      Edit badge
    </h2>
    <form
      action="#"
      on:submit|preventDefault={updateBadge}
      enctype="multipart/form-data"
    >
      <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div class="sm:col-span-2">
          <label
            for="cover-image"
            class="block mb-2 font-medium text-gray-900 dark:text-white"
            >Badge Image/Icon*</label
          >
          <input
            bind:value={imgBadge}
            required
            type="text"
            id="title"
            placeholder="Ex: https://www.url.com/path/filename.png"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <div class="text-sm mt-2">
            * You can insert image address from <a
              class="text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
              href="/albums">Albums</a
            >
          </div>
        </div>
        <div class="sm:col-span-2">
          <label
            for="title"
            class="block mb-2 font-medium text-gray-900 dark:text-white"
            >Title*</label
          >
          <input
            bind:value={title}
            required
            type="text"
            id="title"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div class="sm:col-span-2">
          <label
            for="issuer"
            class="block mb-2 font-medium text-gray-900 dark:text-white"
            >Issuing Organization*</label
          >
          <input
            bind:value={issuer}
            required
            type="text"
            id="issuer"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div class="sm:col-span-2">
          <label
            for="url"
            class="block mb-2 font-medium text-gray-900 dark:text-white"
            >URL</label
          >
          <input
            bind:value={url}
            type="text"
            id="url"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div class="w-full">
          <label
            for="startDate"
            class="block mb-2 font-medium text-gray-900 dark:text-white"
            >Earned Date*</label
          >
          <input
            bind:value={earnedDate}
            type="date"
            name="startDate"
            id="startDate"
            max={today}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your Major"
            required
          />
        </div>
        <div class="sm:col-span-2">
          <label
            for="description"
            class="block mb-2 font-medium text-gray-900 dark:text-white"
          >
            Description*</label
          >
          <textarea
            bind:value={desc}
            required
            id="description"
            rows="8"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
        </div>
      </div>
      <div class="mt-1 text-sm">
        *
        <a
          class="text-blue-600"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.markdownguide.org/basic-syntax/">Markdown</a
        > is supported
      </div>
      <div class="flex justify-between items-center mt-4 space-x-2">
        <!-- <select
          bind:value={visibility}
          id="visibility"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-1/4 w-full p-2.5"
        >
          <option selected value="public">Public</option>
          <option value="private">Private</option>
        </select> -->
        <div />
        <div class="flex justify-end items-center space-x-2">
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >Update</button
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
    </form>
  </div>
  <div class="py-8 px-4 w-1/2 lg:py-8">
    <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
      Preview
    </h2>
    <div
      class="prose prose-neutral p-4 border-2 border-gray-100 rounded h-auto overflow-auto"
    >
      <div class="flex">
        <div class="flex-initial w-1/2">
          <img
            class="w-full h-72 profile-picture object-cover rounded-lg m-0"
            src={imgBadge}
            alt="Default avatar"
          />
        </div>
        <div class="ml-4 flex-initial w-1/2">
          <h1 class="mb-4">{title}</h1>
          <div class="mb-4">Issued by {issuer}</div>
          <div class="mb-4">
            <SvelteMarkdown source={desc} />
          </div>
          {#if url}
            <div><a href={url}>Learn more</a></div>
          {/if}
          <div class="">Issued Date: {earnedDate}</div>
        </div>
      </div>
    </div>
  </div>
</section>
