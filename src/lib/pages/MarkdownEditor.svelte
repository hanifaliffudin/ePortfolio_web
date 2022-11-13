<script>
  import SvelteMarkdown from "svelte-markdown";
  let source = ``;
</script>

<div class="w-full flex ">
  <div class="w-1/2 p-4">
    <textarea
      class="w-full"
      bind:value={source}
      name=""
      id=""
      cols="30"
      rows="10"
    />
    <div>
      *
      <a
        class="text-blue-600"
        target="_blank"
        href="https://www.markdownguide.org/basic-syntax/">Markdown</a
      > is supported
    </div>
  </div>
  <div class="prose prose-neutral p-4 ">
    <SvelteMarkdown {source} />
  </div>
</div>
