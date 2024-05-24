<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import type { AnyCell } from "@okcontract/cells";

  import { getTheme } from "./theme/theme";
  import { ThemeBackground, ThemeText } from "./theme/types";
  import {
    dropdownSizes,
    dropdownStyles,
    type DropdownSize,
    type DropdownStyle
  } from "./ui";

  const dispatch = createEventDispatcher();

  export let buttonElement: HTMLElement;
  export let open: AnyCell<boolean>;
  export let style: DropdownStyle = "bottom";
  export let size: DropdownSize = "sm";

  const theme = getTheme();
  const compiledTheme = theme?.compiled;

  const handleWindowClick = (ev: MouseEvent) => {
    const path = ev.composedPath();
    if (path.includes(buttonElement)) return;
    dispatch("close", "click");
  };
  const handleKeyDown = (ev: KeyboardEvent) => {
    if (ev.key === "Escape") {
      dispatch("close", "escape");
    }
  };
</script>

<svelte:window on:click={handleWindowClick} on:keydown={handleKeyDown} />

<details
  class="dropdown {dropdownStyles[style]}"
  open={$open instanceof Error ? false : $open}
>
  <summary class="list-none">
    <slot name="action" />
  </summary>
  <div
    class="dropdown-content z-[1] menu p-2 shadow rounded-box {dropdownSizes[
      size
    ]} {theme.dark(
      $compiledTheme,
      'bg-white-alpha text-white',
      'bg-black-alpha text-black',
      'bg-base-100 text-base-content'
    )}"
    style={theme.apply($compiledTheme, [ThemeBackground, ThemeText])}
  >
    <slot name="main" />
  </div>
</details>
