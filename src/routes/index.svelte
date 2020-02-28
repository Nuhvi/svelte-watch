<script>
  import { filteredLibraries, filteredLibrariesCount } from "../data/stores";
  import Filters from "../containers/Filters";
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

  .count {
    margin: 0;
    color: #888c94;
  }
</style>

<svelte:head>
  <title>Svelte watch</title>
</svelte:head>

<div class="container">
  <Filters />
  <section>
    <p class="count">
      {$filteredLibrariesCount}
      {$filteredLibrariesCount > 1 ? 'Libraries' : 'Library'}
    </p>
    <ul>
      {#each $filteredLibraries as library}
        <li>{library.name}</li>
      {/each}
    </ul>
  </section>
</div>
