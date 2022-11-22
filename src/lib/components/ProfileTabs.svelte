<script>
  export let active;
</script>

<div
  class="mb-4 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700"
>
  <ul class="flex flex-wrap -mb-px">
    <li class="mr-2">
      <a
        href="profile"
        class="{active == 'aboutme'
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent hover:text-gray-600 hover:border-gray-300'} inline-block p-4 rounded-t-lg border-b-2 "
        >About Me</a
      >
    </li>
    <li class="mr-2">
      <a
        href="articles"
        class="{active == 'articles'
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent hover:text-gray-600 hover:border-gray-300'} inline-block p-4 rounded-t-lg border-b-2 "
        >Articles</a
      >
    </li>
    <li class="mr-2">
      <a
        href="collections"
        class="{active == 'collections'
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent hover:text-gray-600 hover:border-gray-300'} inline-block p-4 rounded-t-lg border-b-2 bo"
        >Collections</a
      >
    </li>
    <li class="mr-2">
      <a
        href="activities"
        class="{active == 'activities'
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent hover:text-gray-600 hover:border-gray-300'} inline-block p-4 rounded-t-lg border-b-2"
        aria-current="page">Activities</a
      >
    </li>
  </ul>
</div>
