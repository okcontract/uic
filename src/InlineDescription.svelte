<script lang="ts">
  import { ThemeText, getTheme } from "@okcontract/uic";

  export let title: string;
  export let size: "sm" | "md" = "md";

  const theme = getTheme();
  const compiledTheme = theme?.compiled;
</script>

<dl
  class="flex items-center gap-1 {theme.dark(
    $compiledTheme,
    'opacity-70',
    'opacity-70',
    ''
  )} {size === 'sm' ? 'text-xs' : 'py-1'}"
  style={theme.apply($compiledTheme, [ThemeText])}
>
  <dt>{title}</dt>
  <dd class="flex grow justify-end">
    <slot />
  </dd>
</dl>
