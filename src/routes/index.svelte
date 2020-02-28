<script>
  import { tags, libraries } from "../data/stores";
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
      {#each Object.keys($tags) as tag}
        <li class:selected={$tags[tag].isSelected}>{tag}</li>
      {/each}
    </ul>
  </aside>

  <section>
    <h1>Svelte Libraries</h1>
    <ul>
      {#each $libraries as library}
        <li>{library.name}</li>
      {/each}
    </ul>
  </section>
</div>
