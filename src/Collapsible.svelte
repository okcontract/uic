<script lang="ts">
  import type { SheetProxy, ValueCell } from "@okcontract/cells";

  export let proxy: SheetProxy;
  export let isOpen: ValueCell<boolean> = proxy.new(true, "isOpen");

  export let style: "default" | "transparent" | "base" = "default";
  export let size: "sm" | "md" | "lg" = "md";
  export let defaultBtn = true;

  const styles = {
    default: "bg-base-100 border border-base-200 shadow",
    transparent: "bg-transparent",
    base: "bg-base-200"
  };

  const sizes = {
    sm: "collapse-sm",
    md: "collapse-md",
    lg: "collapse-lg"
  };
</script>

<details
  class="collapse collapse-arrow {styles[style]} {sizes[size]}"
  bind:open={$isOpen}
>
  {#if defaultBtn}
    <summary class="collapse-title font-medium focus:outline-none">
      <slot name="heading" />
    </summary>
  {/if}
  <div class="collapse-content">
    <slot />
  </div>
</details>
