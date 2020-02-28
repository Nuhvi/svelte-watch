<script>
  import { selectedTags } from "../data/stores";
  export let tag;

  $: isSelected = $selectedTags.has(tag);

  const clickHandler = () => {
    isSelected ? $selectedTags.delete(tag) : $selectedTags.add(tag);
    $selectedTags = $selectedTags;
  };
</script>

<li on:click={clickHandler}>{tag},{isSelected}</li>
