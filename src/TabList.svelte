<script lang="ts">
  import {
    tabMargins,
    tabSizes,
    tabStyles,
    type TabMargin,
    type TabSize,
    type TabStyle
  } from "./ui";
  export let size: TabSize = "md";
  export let style: TabStyle = "bordered";
  export let mar: TabMargin = "default";
</script>

<div
  role="tablist"
  class="{tabStyles[style]} {tabSizes[size]} {tabMargins[
    mar
  ]} z-10 justify-self-start w-full overflow-x-auto"
>
  <slot />
</div>
