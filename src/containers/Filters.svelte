<script>
  import { allTags, selectedTags, searchInput } from "../stores";
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
    min-width: 200px;
    margin-right: 2rem;
  }
  h2 {
    font-size: 1rem;
    color: #b3b3b3;
  }

  h2 a {
    display: none;
  }

  .clear {
    display: inline-block;
    color: rgba(255, 62, 0, 0.8);
    font-weight: 500;
  }

  li {
    margin-bottom: 0.5em;
  }

  input {
    width: 100%;
    box-sizing: border-box;
    padding: 0.5em 1em;
    border: 1px solid rgb(197, 197, 197);
    border-radius: 100em;
    margin-bottom: 1em;
    font-family: inherit;
    font-weight: 500;
  }

  input:focus {
    outline: none;
  }
</style>

<aside>
  <h2>Filter</h2>
  <input placeholder="Search" bind:value={$searchInput} />
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
