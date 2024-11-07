<script lang="ts">
  import { ThemeText, getTheme } from "@okcontract/uic";

  export let title: boolean = false;
  export let act: boolean = false;
  export let centered: boolean = false;
  export let style: keyof typeof styles = "default";
  export let pad: keyof typeof paddings = "sm";

  const theme = getTheme();
  const compiledTheme = theme?.compiled;

  const styles = {
    default: "bg-base-100 text-base-content shadow-xl",
    bordered: "bg-base-100 text-base-content border border-base-300",
    outline: "bg-base-100 text-base-content border-2 border-neutral",
    base: "bg-base-200 text-base-content",
    primary: "bg-primary text-primary-content",
    secondary: "bg-secondary text-secondary-content",
    warning: "bg-warning text-warning-content",
    success: "bg-success text-success-content",
    info: "bg-info text-info-content",
    error: "bg-error text-error-content",
    accent: "bg-accent text-accent-content",
    neutral: "bg-neutral text-neutral-content",
    glass: "glass",
    side: "lg:card-side bg-base-100 shadow-xl"
  };

  const paddings = {
    sm: "card-compact",
    md: "card-normal",
    none: ""
  };
</script>

<div
  class="card {theme.dark(
    $compiledTheme,
    'bg-white-alpha text-white',
    'bg-black-alpha text-black',
    styles[style]
  )} {paddings[pad]}"
  style={theme.apply($compiledTheme, [ThemeText])}
>
  <div
    class="{pad === 'sm' || pad === 'md' ? 'card-body' : ''} {centered
      ? 'items-center text-center'
      : ''}"
  >
    {#if title}
      <h2 class="card-title"><slot name="title" /></h2>
    {/if}
    <slot />
    {#if act}
      <div class="card-actions justify-end">
        <slot name="act" />
      </div>
    {/if}
  </div>
</div>
