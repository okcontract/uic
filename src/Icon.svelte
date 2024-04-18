<script lang="ts">
  import { type IconName, paths24solid, paths24outline } from "./icons";
  import { type FillStyle } from "@okcontract/uic";

  export let size: keyof typeof sizes = "sm";
  export let name: IconName | string;
  export let opacity: "50" | "70" | "80" | "100" = "100";
  export let fill: FillStyle = "current";

  const sizes = {
    xs: "h-4 w-4",
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-10 w-10"
  };

  const strokes = {
    current: "stroke-current",
    primary: "stroke-primary",
    secondary: "stroke-secondary",
    accent: "stroke-accent",
    error: "stroke-error",
    success: "stroke-success",
    warning: "stroke-warning",
    info: "stroke-info"
  };
  const fills = {
    current: "fill-current",
    primary: "fill-primary",
    secondary: "fill-secondary",
    accent: "fill-accent",
    error: "fill-error",
    success: "fill-success",
    warning: "fill-warning",
    info: "fill-info"
  };
</script>

<span class="opacity-{opacity}">
  {#if name in paths24solid}
    {@const vb = paths24solid[name].size || 24}
    <svg
      class="{fills[fill]} {sizes[size]} shrink-0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 {vb} {vb}"
    >
      {#if Array.isArray(paths24solid[name])}
        {#each paths24solid[name] as path}
          {#if path.evenodd}
            <path d={path.d} fill-rule="evenodd" clip-rule="evenodd" />
          {:else}
            <path d={path.d} />
          {/if}
        {/each}
      {:else if paths24solid[name].evenodd}
        <path
          d={paths24solid[name].d}
          fill-rule="evenodd"
          clip-rule="evenodd"
        />
      {:else}
        <path d={paths24solid[name].d} />
      {/if}
    </svg>
  {:else if name in paths24outline}
    <svg
      class="{strokes[fill]} {sizes[size]} shrink-0"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      data-slot="icon"
    >
      {#if Array.isArray(paths24outline[name])}
        {#each paths24outline[name] as path}
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d={path.d}
          />
        {/each}
      {:else}
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d={paths24outline[name].d}
        />
      {/if}
    </svg>
  {:else}
    <!-- fallback for development purposes: missing names should be caught by TypeScript -->
    <span>{name}</span>
  {/if}
</span>
