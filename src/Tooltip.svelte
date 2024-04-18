<script lang="ts">
  import {
    type TooltipStyle,
    tooltipStyles,
    type TooltipPosition,
    tooltipPositions
  } from "./ui";

  export let label: string = undefined;
  export let pos: TooltipPosition = "top";
  export let style: TooltipStyle = "default";
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="{tooltipPositions[pos]} {tooltipStyles[style]}" data-tip={label}>
  <slot />
</div>
