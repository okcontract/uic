<script lang="ts">
  export let act: boolean;
  export let label: string = undefined;
</script>

<div
  class="badge {act ? 'badge-success' : 'badge-error'} {label
    ? 'badge-md badge-outline'
    : 'badge-xs'}"
>
  {#if label}<span>{label}</span>{/if}
</div>
