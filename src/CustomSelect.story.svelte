<script lang="ts">
  import "../assets/uic.css";

  import type { Hst } from "@histoire/plugin-svelte";

  import { CustomSelect, type IconName } from "@okcontract/uic";

  export let Hst: Hst;

  let selected = "option1";
  let values = [
    { key: "option1", icon: "info-o" as IconName, label: "Option 1" },
    { key: "option2", icon: "star-o" as IconName, label: "Option 2" },
    { key: "option3", icon: "cog-o" as IconName, label: "Option 3" }
  ];
  let size = "full" as const;
</script>

<!-- svelte-ignore reactive-component -->
<Hst.Story title="CustomSelect">
  <div class="p-4 w-full h-full overflow-auto">
    <div class="mb-6 prose prose-sm md:prose-base">
      <h1>CustomSelect</h1>
      <p>This component is used for selecting an option from a list.</p>
    </div>
    <div
      class="grid border border-base-400 rounded-box min-h-80 min-w-md w-full gap-4 place-content-center"
    >
      <CustomSelect
        {values}
        {size}
        on:change={(ev) => {
          selected = ev.detail;
        }}>Choose an option from a list</CustomSelect
      >
      <div class="my-3 prose prose-sm md:prose-base">
        <h4>Chosen option:</h4>
        <p>{selected}</p>
      </div>
    </div>
  </div>
  <svelte:fragment slot="controls">
    <!-- svelte-ignore reactive-component -->
    <Hst.Select bind:value={size} options={["sm", "md", "full"]} title="Size" />
    <pre>{JSON.stringify({ size }, null, 1)}</pre>
  </svelte:fragment>
</Hst.Story>
