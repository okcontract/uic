<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import {
    ThemeText,
    getTheme,
    Icon,
    Button,
    type FillStyle
  } from "@okcontract/uic";

  const dispatch = createEventDispatcher();

  export let icon: string = "info";
  export let close: boolean = false;
  export let action: () => void = undefined;
  export let size: "sm" | "md" = "md";
  export let style: keyof typeof styles = "default";
  export let fill: FillStyle = "current";

  const theme = getTheme();
  const compiledTheme = theme?.compiled;

  const icons = {
    info: "info-o",
    error: "error-o",
    warning: "warning-o",
    success: "success-o"
  };

  const styles = {
    default: "alert",
    error: "alert alert-error",
    warning: "alert alert-warning",
    success: "alert alert-success",
    info: "alert alert-info"
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Enter") action();
  };
</script>

<!-- Alert banner to use in Card component-->
<div
  role={action ? "button" : undefined}
  on:click={action}
  on:keydown={action ? handleKeydown : undefined}
  class="{styles[style]} {size == 'sm' ? 'py-2 gap-2 rounded-none' : ''}"
  style={theme.apply($compiledTheme, [ThemeText])}
>
  <Icon name={icons[icon]} size="md" {fill} />
  <span class="flex flex-wrap break-words">
    <slot />
  </span>
  {#if close}
    <span class="-mt-1 -mb-1">
      <Button
        size="sm"
        style="ghost"
        circle={true}
        iconAppend={true}
        icon="close-panel"
        action={() => dispatch("cancel")}
      ></Button>
    </span>
  {/if}
</div>
