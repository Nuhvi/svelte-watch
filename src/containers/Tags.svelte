<script>
  import { allTags, selectedTags } from "../data/stores";
  import Tag from "../components/Tag";

  $: sortedSelectedTags = Array.from($selectedTags);
  $: notSelectedTags = $allTags.filter(tag => !$selectedTags.has(tag));

  $: someTagsSelected = sortedSelectedTags && sortedSelectedTags.length > 0;

  const clearAllTags = () => {
    $selectedTags = new Set();
  };

  const deselectTag = tag => {
    $selectedTags.delete(tag);
    $selectedTags = $selectedTags;
  };

  const selectTag = tag => {
    $selectedTags.add(tag);
    $selectedTags = $selectedTags;
  };
</script>

<style>
  aside {
    margin-right: 2rem;
  }

  h2 a {
    display: none;
  }

  .clear {
    display: inline-block;
    color: rgba(255, 62, 0, 0.8);
    font-size: 1rem;
    font-weight: 500;
  }

  li {
    margin-bottom: 0.5em;
  }
</style>

<aside>
  <h2>
    Tags
    <a
      class:clear={someTagsSelected}
      href="\"
      on:click|preventDefault={clearAllTags}>
      clear ✖
    </a>
  </h2>
  <ul>
    {#if someTagsSelected}
      {#each sortedSelectedTags as tag (tag)}
        <li>
          <Tag {tag} clickHandler={e => deselectTag(tag)} isSelected={true} />
        </li>
      {/each}
      <br />
    {/if}
    {#each notSelectedTags as tag (tag)}
      <li>
        <Tag {tag} clickHandler={e => selectTag(tag)} />
      </li>
    {/each}
  </ul>
</aside>
