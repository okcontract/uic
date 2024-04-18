<script lang="ts">
  import {
    type TabStyle,
    tabStyles,
    type TabSize,
    tabSizes,
    tabMargins,
    type TabMargin
  } from "./ui";
  export let size: TabSize = "md";
  export let style: TabStyle = "bordered";
  export let mar: TabMargin = "default";
</script>

<div
  role="tablist"
  class="{tabStyles[style]} {tabSizes[size]} {tabMargins[
    mar
  ]} z-10 justify-self-start"
>
  <slot />
</div>
