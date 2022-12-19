<script>
  export let idCollection;

  import { Select, Label } from "flowbite-svelte";
  let issueMonth, issueYear, expMonth, expYear;
  let months = [
    { value: "january", name: "January" },
    { value: "february", name: "February" },
    { value: "march", name: "March" },
  ];
  let years = [
    { value: "2022", name: "2022" },
    { value: "2021", name: "2021" },
    { value: "2020", name: "2020" },
  ];
</script>

<main class="md:mx-72">
  <div class="md:container md:mx-auto my-16">
    <form>
      <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
        <div class="sm:col-span-2">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Name*</label
          >
          <input
            type="name"
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ex: Microsoft Certified Network Associate Security"
            required
          />
        </div>
        <div class="sm:col-span-2">
          <label
            for="organization"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Issuing organization*</label
          >
          <input
            type="organization"
            id="organization"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ex: Microsoft"
            required
          />
        </div>
        <div class="w-full">
          <Label
            >Issue Date
            <Select
              placeholder="Month"
              class="mt-2"
              items={months}
              bind:value={issueMonth}
            />
          </Label>
        </div>
        <div class="w-full">
          <Label class="text-transparent"
            >Select an option
            <Select
              placeholder="Year"
              class="mt-2"
              items={years}
              bind:value={issueYear}
            />
          </Label>
        </div>
        <div class="w-full">
          <Label
            >Expiration Date
            <Select
              placeholder="Month"
              class="mt-2"
              items={months}
              bind:value={expMonth}
            />
          </Label>
        </div>
        <div class="w-full">
          <Label class="text-transparent"
            >Select an option
            <Select
              placeholder="Year"
              class="mt-2"
              items={years}
              bind:value={expYear}
            />
          </Label>
        </div>
        <div class="sm:col-span-2">
          <label
            for="credential-id"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Credential ID</label
          >
          <input
            type="credential-id"
            id="credential-id"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div class="sm:col-span-2">
          <label
            for="credential-url"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Credential URL</label
          >
          <input
            type="credential-url"
            id="credential-url"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <div class="flex items-center justify-end space-x-4">
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Save
        </button>
        <button
          type="button"
          on:click={() => history.back()}
          class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</main>
