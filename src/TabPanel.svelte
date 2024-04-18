<script lang="ts">
  import type { ValueCell } from "@okcontract/cells";

  import Hidden from "./Hidden.svelte";

  export let selected: ValueCell<number>;
  export let index: number;

  export let style: "default" | "aside" = "default";

  const styles = {
    default: "",
    aside: "h-full py-4"
  };
</script>

<Hidden hidden={$selected !== index}>
  <div class="relative block {styles[style]}">
    <slot />
  </div>
</Hidden>
