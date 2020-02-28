<script>
  import { selectedTags } from "../data/stores";
  export let tag;
  export let isSelected = false;
  export let clickHandler = () => {};
</script>

<style>
  a {
    text-transform: capitalize;
    display: inline-block;
    font-size: 0.9em;
    font-weight: 500;
    color: rgba(255, 62, 0, 0.5);
    background: rgba(255, 62, 0, 0.18);
    padding: 0.2em 0.7em;
    border-radius: 100em;
  }

  .isSelected {
    color: rgba(255, 62, 0, 1);
    background: rgba(255, 62, 0, 0.2);
  }
</style>

<a on:click|preventDefault={clickHandler} href="\" class:isSelected>{tag}</a>
