<script>
  import { libraries, filteredLibrariesCount } from "../stores";
  import Library from "../components/Library";
</script>

<style>
  .count {
    margin: 0;
    color: #888c94;
  }
</style>

{#if $libraries === false}
  Oops! cant retrieve data!
{:else if $libraries}
  <section>
    <p class="count">
      {$filteredLibrariesCount}
      {$filteredLibrariesCount > 1 ? 'Libraries' : 'Library'}
    </p>
    <ul>
      {#each $libraries as library}
        <Library {library} />
      {/each}
    </ul>
  </section>
{:else}
  <p>...waiting</p>
{/if}
