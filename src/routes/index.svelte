<script>
  import {
    sortedSelectedTags,
    notSelectedTags,
    filteredLibraries
  } from "../data/stores";
  import Tag from "../components/Tag";
</script>

<style>
  .container {
    display: flex;
  }
</style>

<svelte:head>
  <title>Svelte watch</title>
</svelte:head>

<div class="container">
  <aside>
    <h2>Tags</h2>
    <ul>
      {#each $sortedSelectedTags as tag}
        <Tag {tag} />
      {/each}
    </ul>
    <ul>
      {#each $notSelectedTags as tag}
        <Tag {tag} />
      {/each}
    </ul>
  </aside>

  <section>
    <h1>Svelte Libraries</h1>
    <ul>
      {#each $filteredLibraries as library}
        <li>{library.name}</li>
      {/each}
    </ul>
  </section>
</div>
