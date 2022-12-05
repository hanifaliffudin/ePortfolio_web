<script>
  import { fade } from "svelte/transition";
  export let removeFn;
  export let num;
</script>

<li transition:fade>
  Hello {num}
  <button on:click={removeFn}> x </button>
</li>
