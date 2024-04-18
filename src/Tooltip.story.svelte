<script lang="ts">
  import "../assets/uic.css";

  import type { Hst } from "@histoire/plugin-svelte";

  import { Tooltip } from "@okcontract/uic";
  import { tooltipPositions, tooltipStyles } from "./ui";

  export let Hst: Hst;

  let label = "Awesome";
  let style = "default" as const;
  let pos = "top" as const;
</script>

<!-- svelte-ignore reactive-component -->
<Hst.Story title="Tooltip">
  <div class="p-4 relative w-full overflow-auto">
    <div class="mb-6 prose prose-sm md:prose-base">
      <h1>Tooltip</h1>
      <p>This component displays a tooltip over an HTML element.</p>
    </div>
    <div
      class="grid border border-base-400 rounded-box min-h-20 min-w-md w-full gap-4 place-content-center"
    >
      <Tooltip {style} {pos} {label}><p>This text has a tooltip</p></Tooltip>
    </div>
  </div>
  <svelte:fragment slot="controls">
    <!-- svelte-ignore reactive-component -->
    <Hst.Text bind:value={label} title="Label" />
    <!-- svelte-ignore reactive-component -->
    <Hst.Select
      bind:value={style}
      options={Object.keys(tooltipStyles)}
      title="Style"
    />
    <!-- svelte-ignore reactive-component -->
    <Hst.Select
      bind:value={pos}
      options={Object.keys(tooltipPositions)}
      title="Position"
    />
    <pre>{JSON.stringify({ label }, null, 1)}</pre>
  </svelte:fragment>
</Hst.Story>
