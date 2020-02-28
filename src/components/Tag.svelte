<script>
  export let tag;
  export let isSelected = false;
  export let clickHandler = () => {};
  import { fade } from "svelte/transition";

  $: capitalizedTag = tag[0].toUpperCase() + tag.slice(1);
</script>

<style>
  a {
    display: inline-block;
    font-weight: 500;
    color: rgba(255, 62, 0, 0.5);
    background: rgba(255, 62, 0, 0.18);
    padding: 0.25em 1em;
    border-radius: 100em;
  }

  .isSelected {
    color: rgba(255, 62, 0, 1);
    background: rgba(255, 62, 0, 0.2);
  }
</style>

<a on:click|preventDefault={clickHandler} href="\" class:isSelected>
  {capitalizedTag}
</a>
