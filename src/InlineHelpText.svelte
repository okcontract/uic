<script lang="ts">
  import { Icon } from "@okcontract/uic";
  import { type TextStyle, textStyles } from "./ui";

  export let icon: keyof typeof icons = "info";
  export let style: TextStyle = "info";

  const icons = {
    info: "info",
    error: "error",
    warning: "warning",
    success: "success"
  };
</script>

<div class="flex gap-1 items-center text-sm font-semibold {textStyles[style]}">
  <Icon name={icons[icon]} size="sm" />
  <slot />
</div>
