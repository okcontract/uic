<script lang="ts">
  import "../assets/uic.css";

  import type { Hst } from "@histoire/plugin-svelte";

  import { Range } from "@okcontract/uic";
  import { rangeSizes, rangeStyles } from "./ui";

  export let Hst: Hst;

  let label = "Amount";
  let required = false;
  let decimals = 18;
  let min = 0n;
  let max = 9007199254740991000n;
  let value = 0n;
  let infinite = false;
  let unit = "USD";

  let style = "neutral" as const;
  let size = "md" as const;
</script>

<!-- svelte-ignore reactive-component -->
<Hst.Story title="Range">
  <div class="p-4 relative w-full overflow-auto">
    <div class="mb-6 prose prose-sm md:prose-base">
      <h1>Range</h1>
      <p>This component has customizable label, min, max, decimals and unit.</p>
    </div>
    <div class="p-12 min-h-[4rem] max-w-4xl border border-base-400 rounded-box">
      <Range
        {label}
        {required}
        {min}
        {max}
        {value}
        {unit}
        decimals={BigInt(decimals)}
        {infinite}
        {style}
        {size}
      ></Range>
    </div>
  </div>

  <svelte:fragment slot="controls">
    <!-- svelte-ignore reactive-component -->
    <Hst.Text bind:value={label} title="Label" />
    <!-- svelte-ignore reactive-component -->
    <Hst.Select
      bind:value={style}
      options={Object.keys(rangeStyles)}
      title="Style"
    />
    <!-- svelte-ignore reactive-component -->
    <Hst.Select
      bind:value={size}
      options={Object.keys(rangeSizes)}
      title="Size"
    />
    <!-- svelte-ignore reactive-component -->
    <Hst.Number bind:value={decimals} title="Decimals" />
    <pre>{JSON.stringify({ label, style, size, decimals }, null, 4)}</pre>
  </svelte:fragment>
</Hst.Story>
