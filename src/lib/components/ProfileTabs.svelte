<script>
  export let active;
</script>

<div
  class="mb-4 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700"
>
  <ul class="flex flex-wrap -mb-px">
    <li class="mr-2">
      <a
        href="/profile"
        class="{active == 'aboutme'
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent hover:text-gray-600 hover:border-gray-300'} inline-block p-4 rounded-t-lg border-b-2 "
        >About Me</a
      >
    </li>
    <li class="mr-2">
      <a
        href="/posts"
        class="{active == 'posts'
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent hover:text-gray-600 hover:border-gray-300'} inline-block p-4 rounded-t-lg border-b-2"
        aria-current="page">Posts</a
      >
    </li>
    <li class="mr-2">
      <a
        href="/articles"
        class="{active == 'articles'
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent hover:text-gray-600 hover:border-gray-300'} inline-block p-4 rounded-t-lg border-b-2 "
        >Articles</a
      >
    </li>
    <li class="mr-2">
      <a
        href="/activities"
        class="{active == 'activities'
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent hover:text-gray-600 hover:border-gray-300'} inline-block p-4 rounded-t-lg border-b-2"
        >Activities</a
      >
    </li>
    <li class="mr-2">
      <a
        href="/badges"
        class="{active == 'badges'
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent hover:text-gray-600 hover:border-gray-300'} inline-block p-4 rounded-t-lg border-b-2"
        >Badges</a
      >
    </li>
    <li class="mr-2">
      <a
        href="/album"
        class="{active == 'album'
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent hover:text-gray-600 hover:border-gray-300'} inline-block p-4 rounded-t-lg border-b-2"
        >Album</a
      >
    </li>
  </ul>
</div>
