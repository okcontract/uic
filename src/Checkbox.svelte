<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import { ThemeText, getTheme } from "@okcontract/uic";
  import {
    checkboxStyles,
    type CheckboxStyle,
    checkboxSizes,
    type CheckboxSize
  } from "./ui";

  const dispatch = createEventDispatcher();

  export let label: string = undefined;
  export let size: CheckboxSize = "md";
  export let style: CheckboxStyle = "default";

  export let value: boolean;
  export let disabled: boolean = false;
  export let required: boolean = false;

  const theme = getTheme();
  const compiledTheme = theme?.compiled;
</script>

<div class="form-control">
  <label class="label cursor-pointer">
    <input
      type="checkbox"
      bind:checked={value}
      on:change={() => dispatch("toggle", value)}
      {required}
      {disabled}
      class="{checkboxStyles[style]} {checkboxSizes[size]}"
    />
    <span
      class="label-text {theme.dark(
        $compiledTheme,
        'text-white',
        'text-black',
        ''
      )}"
      style={theme.apply($compiledTheme, [ThemeText])}>{label}</span
    >
  </label>
</div>
