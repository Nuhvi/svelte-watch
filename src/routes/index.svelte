<script>
  import { filteredLibraries, filteredLibrariesCount } from "../data/stores";
  import Tags from "../containers/Tags";
</script>

<style>
  .container {
    display: flex;
  }

  :global(ul) {
    list-style: none;
    padding: 0;
  }
  :global(a) {
    text-decoration: none;
  }
</style>

<svelte:head>
  <title>Svelte watch</title>
</svelte:head>

<div class="container">
  <Tags />
  <section>
    <p>
      {$filteredLibrariesCount}
      {$filteredLibrariesCount > 1 ? 'libraries' : 'library'}
    </p>
    <ul>
      {#each $filteredLibraries as library}
        <li>{library.name}</li>
      {/each}
    </ul>
  </section>
</div>
