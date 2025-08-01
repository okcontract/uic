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
  export let block = true;
</script>

<div
  role="tablist"
  class="{tabStyles[style]} {tabSizes[size]} {tabMargins[mar]} z-10 {block
    ? 'w-full justify-self-start'
    : 'justify-start'} overflow-x-auto"
>
  <slot />
</div>
