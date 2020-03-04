<script>
  import Filters from "../containers/Filters";
  import LibrariesList from "../containers/LibrariesList";
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
  <Filters />
  <LibrariesList />
</div>
