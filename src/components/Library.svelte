<script>
  import Tag from "./Tag";
  export let library = {};
</script>

<style>
  article {
    margin-bottom: 2em;
  }

  h3 {
    font-size: 1.6em;
    color: rgba(255, 62, 0, 1);
  }

  .tag {
    margin-right: 0.5em;
  }

  p {
    margin: 0;
  }

  .stats {
    margin-top: 0.5em;
  }

  span {
    margin-right: 0.5em;
  }
</style>

<article>
  <header>
    <h3>{library.name}</h3>
  </header>
  <p>
    {library.description}
    {#each library.tags as tag}
      <span class="tag">
        <Tag {tag} />
      </span>
    {/each}
  </p>
  <p class="stats">
    <span>⭐️ {library.stars}</span>
    <span>👥 252</span>
    <span>🏷 2020-02-18</span>
    <span>Last 90 days:</span>
    <span>⬇️ {library.downloads}</span>
    <span>📝 91</span>
  </p>

</article>
