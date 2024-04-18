<script lang="ts">
  import "../assets/uic.css";

  import type { Hst } from "@histoire/plugin-svelte";

  import { PercentSnippet } from "@okcontract/uic";

  export let Hst: Hst;

  let amount = 0.08;
  let decimal = 2;
</script>

<!-- svelte-ignore reactive-component -->
<Hst.Story title="PercentSnippet">
  <div class="p-4 relative w-full overflow-auto">
    <div class="mb-6 prose prose-sm md:prose-base">
      <h1>PercentSnippet</h1>
      <p>This component is used for displaying an amount as a percentage.</p>
    </div>
    <div
      class="grid border border-base-400 rounded-box min-h-20 min-w-md w-full gap-4 place-content-center"
    >
      <PercentSnippet {amount} {decimal} />
    </div>
  </div>
  <svelte:fragment slot="controls">
    <!-- svelte-ignore reactive-component -->
    <Hst.Number bind:value={amount} title="Amount" />
    <pre>{JSON.stringify({ amount }, null, 1)}</pre>
  </svelte:fragment>
</Hst.Story>
