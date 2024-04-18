<script lang="ts">
  import { Tooltip } from "@okcontract/uic";

  import { prettyDate } from "./prettyDate";

  export let date: string | number;
</script>

{#if date}
  <Tooltip label={date}>{prettyDate(date).toString()}</Tooltip>
{:else}<span class="text-error">Unknown Date</span>{/if}
