<script lang="ts">
  export let change: number;

  let color = (num: number) => (num >= 0 ? "text-success" : "text-error");
  let symbol = (num: number) => (num >= 0 ? "+" : "-");
</script>

<div class="{color(change)} flex">
  {#if isNaN(change)}
    ---
  {:else}
    <span>{symbol(change)}</span>
    <slot />
  {/if}
</div>
