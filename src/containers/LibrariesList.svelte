<script>
  import { filteredLibraries, filteredLibrariesCount } from "../stores";
  import Library from "../components/Library";
</script>

<style>
  .count {
    margin: 0;
    color: #888c94;
  }
</style>

{#if $filteredLibraries === false}
  Oops! cant retrieve data!
{:else if $filteredLibraries}
  <section>
    <p class="count">
      {$filteredLibrariesCount}
      {$filteredLibrariesCount > 1 ? 'Libraries' : 'Library'}
    </p>
    <ul>
      {#each $filteredLibraries as library}
        <Library {library} />
      {/each}
    </ul>
  </section>
{:else}
  <p>...waiting</p>
{/if}
