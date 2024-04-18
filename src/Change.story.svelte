<script lang="ts">
  import "../assets/uic.css";

  import type { Hst } from "@histoire/plugin-svelte";

  import { Change, PercentSnippet } from "@okcontract/uic";

  export let Hst: Hst;

  let price_change = 1;
  let price = 90;
</script>

<!-- svelte-ignore reactive-component -->
<Hst.Story title="Change">
  <div class="p-4 relative w-full overflow-auto">
    <div class="mb-6 prose prose-sm md:prose-base">
      <h1>Change</h1>
      <p>
        This component can be used for displaying price change. For a negative
        price change, red style will apply. For a positive price change, green
        style will apply.
      </p>
    </div>
    <div
      class="grid border border-base-400 rounded-box min-h-20 min-w-md w-full gap-4 place-content-center"
    >
      <Change change={price_change}
        ><PercentSnippet
          amount={price_change / (price - price_change)}
        /></Change
      >
    </div>
  </div>

  <svelte:fragment slot="controls">
    <!-- svelte-ignore reactive-component -->
    <Hst.Number bind:value={price_change} title="Price change" />
    <!-- svelte-ignore reactive-component -->
    <Hst.Number bind:value={price} title="Price" />
    <pre>{JSON.stringify({ price_change, price }, null, 2)}</pre>
  </svelte:fragment>
</Hst.Story>
