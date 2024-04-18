<script lang="ts">
  import "../assets/uic.css";

  import type { Hst } from "@histoire/plugin-svelte";
  import { Price } from "@okcontract/uic";

  export let Hst: Hst;

  let currency = "USD";
  let amount = 115;
  let decimal = 2;
</script>

<!-- svelte-ignore reactive-component -->
<Hst.Story title="Price">
  <div class="p-4 relative w-full overflow-auto">
    <div class="mb-6 prose prose-sm md:prose-base">
      <h1>Price</h1>
      <p>This component displays price in a user friendly format.</p>
    </div>
    <div
      class="grid border border-base-400 rounded-box min-h-20 min-w-md w-full gap-4 place-content-center"
    >
      <Price {currency} {amount} {decimal} />
    </div>
  </div>
  <svelte:fragment slot="controls">
    <!-- svelte-ignore reactive-component -->
    <Hst.Number bind:value={amount} title="Amount" />
    <!-- svelte-ignore reactive-component -->
    <Hst.Select
      bind:value={currency}
      options={["USD", "GBP", "EUR", "currency"]}
      title="Currency"
    />
    <pre>{JSON.stringify({ amount, currency }, null, 2)}</pre>
  </svelte:fragment>
</Hst.Story>
