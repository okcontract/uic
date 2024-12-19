<script lang="ts">
  export let act: boolean;
  export let label: string = undefined;
  export let title = undefined;
</script>

<div
  class="badge {act ? 'badge-success' : 'badge-error'} {label
    ? 'badge-md'
    : 'badge-xs'}"
>
  {#if label}<span {title}>{label}</span>{/if}
</div>
