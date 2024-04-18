<script lang="ts">
  import { onMount } from "svelte";

  export let hidden: boolean = true;

  // Define a reactive variable to track if the component has been loaded
  let hasLoaded = false;

  // Watch for changes in 'hidden' and update 'hasLoaded' accordingly
  onMount(() => {
    if (!hidden) {
      hasLoaded = true;
    }
  });

  // Reactively update 'hasLoaded' when 'hidden' changes
  $: if (!hidden && !hasLoaded) {
    hasLoaded = true;
  }
</script>

<!-- Conditional rendering based on 'hasLoaded' and 'hidden' -->
{#if hasLoaded}
  <div class={hidden ? "hidden" : ""}>
    <slot />
  </div>
{/if}
