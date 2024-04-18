<script lang="ts">
  export let condition: boolean;
</script>

<div style="display: {condition ? 'block' : 'none'}">
  <slot name="if" />
</div>

<div style="display: {!condition ? 'block' : 'none'}">
  <slot name="else" />
</div>
