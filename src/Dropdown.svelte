<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import { ThemeText, ThemeBackground, getTheme } from "@okcontract/uic";
  import {
    type DropdownStyle,
    dropdownStyles,
    type DropdownSize,
    dropdownSizes
  } from "./ui";

  const dispatch = createEventDispatcher();

  export let buttonElement: HTMLElement;
  export let dropdownOpen: boolean;
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

<div class="dropdown {dropdownStyles[style]}">
  <slot name="action" />
  {#if dropdownOpen}
    <div
      bind:this={menuElement}
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
      {#if split}
        <slot name="additional" />
      {/if}
    </div>
  {/if}
</div>
