<script lang="ts">
  let hovering = false;

  function enter() {
    hovering = true;
  }

  function leave() {
    hovering = false;
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<span on:mouseenter={enter} on:mouseleave={leave}>
  <slot {hovering} />
</span>
