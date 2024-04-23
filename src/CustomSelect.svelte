<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from "svelte";

  import Icon from "./Icon.svelte";
  import { type IconName } from "./icons";
  import { getTheme } from "./theme/theme";
  import { ThemeBackground, ThemeText } from "./theme/types";

  export let values: {
    key: string;
    icon?: IconName;
    label?: string;
  }[];
  export let selected: string = undefined;
  export let size: "sm" | "md" | "full" = "sm";

  const sizes = {
    sm: "w-64",
    md: "min-w-96",
    full: "w-full"
  };

  const theme = getTheme();
  const compiledTheme = theme?.compiled;

  $: selected = selected || values?.[0]?.key;

  let isOpen = false;
  const dispatch = createEventDispatcher();

  function toggleDropdown() {
    isOpen = !isOpen;
  }

  function selectOption(value: string) {
    selected = value;
    isOpen = false;
    dispatch("change", value);
  }

  // Close the dropdown when clicking outside the component
  function handleClickOutside(event: MouseEvent) {
    if (!event.target) return;
    if (!(event.target as HTMLElement).closest(".custom-select")) {
      isOpen = false;
    }
  }

  onMount(() => {
    window.addEventListener("click", handleClickOutside);
  });

  onDestroy(() => {
    window.removeEventListener("click", handleClickOutside);
  });

  const defaultIcon: IconName = "add";
</script>

<div class="dropdown custom-select">
  <button class="mb-1 btn btn-sm btn-default" on:click={toggleDropdown}>
    <slot />
  </button>
  <div
    class="dropdown-content z-[1] menu p-2 shadow rounded-box {isOpen
      ? 'dropdown-open'
      : ''} {sizes[size]} {theme.dark(
      $compiledTheme,
      'bg-white-alpha text-white',
      'bg-black-alpha text-black',
      'bg-base-100 text-base-content'
    )}"
    style={theme.apply($compiledTheme, [ThemeBackground, ThemeText])}
  >
    {#each values as value (value.key)}
      <li>
        <button
          class="flex gap-2 text-sm"
          on:click={() => selectOption(value.key)}
        >
          <Icon name={value?.icon || defaultIcon} size="sm" />
          {value.label || value.key}
        </button>
      </li>
    {/each}
  </div>
</div>
