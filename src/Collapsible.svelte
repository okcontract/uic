<script lang="ts">
  import type { AnyCell, SheetProxy, ValueCell } from "@okcontract/cells";
  import { ThemeText, getTheme } from "@okcontract/uic";

  export let proxy: SheetProxy;

  export let disabled: AnyCell<boolean> = proxy.new(false, "disabled");
  export let isOpen: ValueCell<boolean> = proxy.new(false, "isOpen");

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

  const theme = getTheme();
  const compiledTheme = theme?.compiled;
</script>

<details class="collapse collapse-arrow {styles[style]} {sizes[size]}">
  {#if defaultBtn}
    <summary
      class="collapse-title font-medium focus:outline-none {theme.dark(
        $compiledTheme,
        'text-white',
        'text-black',
        ''
      )}"
      style={theme.apply($compiledTheme, [ThemeText])}
      on:click={() => {
        isOpen.update(async (prev) => {
          const dis = await disabled.get();
          if (!dis) return !prev;
          return prev;
        });
      }}
      ><slot name="heading" />
    </summary>
  {/if}
  {#if $isOpen}
    <div class="collapse-content">
      <slot />
    </div>
  {/if}
</details>
