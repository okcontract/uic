<script lang="ts">
  import type { AnyCell } from "@okcontract/cells";

  import type { IconName } from "./icons";
  import { getTheme } from "./theme/theme";
  import { type ThemeParts } from "./theme/types";
  import {
    buttonSizes,
    buttonStyles,
    type ButtonSize,
    type ButtonStyle
  } from "./ui";

  import Icon from "./Icon.svelte";
  import InlineHelpText from "./InlineHelpText.svelte";

  // @todo migrate to cell
  export let label: string = undefined;
  // @todo when label is a cell, this should be removed
  export let error: string = undefined;

  // @todo migrate to cell, and then merge both
  export let action: (ev: MouseEvent) => void = undefined;
  export let asyncAction: (ev: MouseEvent) => Promise<void | boolean | Error> =
    undefined;

  export let working: AnyCell<boolean> = undefined;
  // @todo migrate to cell
  export let disabled: boolean = false;

  /**
   * Style properties.
   * @info these should not be cells since they are
   * defined manually in the components that call them
   * and usually this won't come from data or computed cells.
   */
  export let style: ButtonStyle = "default";
  export let size: ButtonSize = "md";
  export let icon: IconName = "chevron-d";
  export let iconPrepend: boolean = false;
  export let iconAppend: boolean = false;
  export let outline: boolean = false;
  export let wide: boolean = false;
  export let block: boolean = false;
  export let circle: boolean = false;
  export let square: boolean = false;
  export let capitalize: boolean = true;
  export let addAsyncSpin = false;
  export let showErrors = false;
  export let joined: boolean = false;

  export let thParts: ThemeParts[] = [];
  const theme = getTheme();
  const compiledTheme = theme?.compiled;

  let promise: Promise<void | boolean | Error>;
  const click = (ev: MouseEvent) => {
    if (disabled) return;
    if (action) return action(ev);
    // @todo manage errors
    else if (asyncAction) promise = asyncAction(ev);
  };
</script>

{#await promise}
  <button
    disabled
    type="button"
    class="{theme.dark(
      $compiledTheme,
      'btn btn-default border-transparent hover:border-transparent',
      'btn btn-neutral border-transparent hover:border-transparent',
      buttonStyles[style]
    )} {buttonSizes[size]}{outline ? ' btn-outline' : ''}{wide
      ? ' btn-wide'
      : ''}{block ? ' btn-block' : ''}{circle ? ' btn-circle' : ''}{square
      ? ' btn-square'
      : ''}{joined ? ' join-item' : ''}{capitalize ? ' capitalize' : ''}"
    style={theme.apply($compiledTheme, thParts)}
    >{#if label}{label}{/if}
    {#if addAsyncSpin && $working}
      <span class="loading loading-spinner loading-xs"></span>
    {:else}
      ...
    {/if}
  </button>
{:then done}
  <button
    type="button"
    on:click={click}
    disabled={disabled || $working instanceof Error ? true : $working}
    class="{theme.dark(
      $compiledTheme,
      'btn btn-default border-transparent hover:border-transparent',
      'btn btn-neutral border-transparent hover:border-transparent',
      buttonStyles[style]
    )} {buttonSizes[size]}{outline ? ' btn-outline' : ''}{wide
      ? ' btn-wide'
      : ''}{block ? ' btn-block' : ''}{circle ? ' btn-circle' : ''}{square
      ? ' btn-square'
      : ''}{disabled ? ' btn-disabled' : ''}{joined
      ? ' join-item'
      : ''}{capitalize ? ' capitalize' : ''}"
    style={theme.apply($compiledTheme, thParts)}
  >
    {#if iconPrepend}
      <Icon name={icon} />
    {/if}
    {#if label}{label}{/if}
    {#if $working}
      <span class="loading loading-spinner loading-xs"></span>
    {/if}
    {#if iconAppend}
      <Icon name={icon} />
    {/if}
  </button>
{:catch err}
  <button
    title={err.message || error}
    type="button"
    on:click={click}
    {disabled}
    class="{theme.dark(
      $compiledTheme,
      'btn btn-default border-transparent hover:border-transparent',
      'btn btn-neutral border-transparent hover:border-transparent',
      buttonStyles[style]
    )} {buttonSizes[size]}{outline ? ' btn-outline' : ''}{wide
      ? ' btn-wide'
      : ''}{block ? ' btn-block' : ''}{circle ? ' btn-circle' : ''}{square
      ? ' btn-square'
      : ''}{disabled ? ' btn-disabled' : ''}{joined
      ? ' join-item'
      : ''}{capitalize ? ' capitalize' : ''}"
    style={theme.apply($compiledTheme, thParts)}
  >
    Retry: {#if label}{label}{/if}
  </button>
  {#if showErrors}
    <div class="mt-2">
      <InlineHelpText style="error" icon="error"
        >{err.message || error}</InlineHelpText
      >
    </div>
  {/if}
{/await}
