<script lang="ts">
  import type { ValueCell } from "@okcontract/cells";

  export let selected: ValueCell<number>;
  export let index: number;

  export let warning: boolean = false;
</script>

<button
  role="tab"
  class="tab leading-tight gap-1 {$selected === index
    ? 'tab-active'
    : ''}{warning === true ? 'indicator' : ''}"
  class:selected={$selected === index}
  on:click={() => {
    selected.set(index);
  }}
>
  {#if warning}
    <span class="indicator-item badge badge-secondary"></span>
  {/if}
  <span><slot /></span>
  <slot name="delete" />
</button>
