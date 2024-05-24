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
  export let dropdownOpen: AnyCell<boolean>;
  export let style: DropdownStyle = "bottom";
  export let size: DropdownSize = "sm";
  export let split = false;

  const theme = getTheme();
  const compiledTheme = theme?.compiled;

  let menuElement: HTMLElement;

  const handleWindowClick = (ev: MouseEvent) => {
    const path = ev.composedPath(); // ev.path on old browsers?
    if (path.includes(buttonElement) || path.includes(menuElement)) {
      // Do not close menu when clicking on button or menu.
      return;
    }
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
  open={$dropdownOpen instanceof Error ? false : $dropdownOpen}
>
  <summary>
    <slot name="action" />
  </summary>
  <div
    bind:this={menuElement}
    class="flex dropdown-content justify-center z-[1] shadow rounded-box {dropdownSizes[
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
    {#if split}
      <slot name="additional" />
    {/if}
  </div>
</details>
