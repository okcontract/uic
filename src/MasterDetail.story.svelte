<script lang="ts">
  import "../assets/uic.css";

  import { SheetProxy } from "@okcontract/cells";
  import { sheet } from "./histoire";
  const proxy = new SheetProxy(sheet);

  import type { Hst } from "@histoire/plugin-svelte";

  import { MasterDetail } from "@okcontract/uic";

  export let Hst: Hst;

  let title = "Title";

  let data = [
    ["🍣", "Sushi"],
    ["🌮", "Taco"],
    ["🍕", "Pizza"]
  ] as [string, any][];
  let size = "md" as const;
  let addThirdPanel = false;
  let selectedKey = proxy.new("one");
</script>

<!-- svelte-ignore reactive-component -->
<Hst.Story title="MasterDetail">
  <div class="p-4 relative w-full overflow-auto">
    <div class="mb-6 prose prose-sm md:prose-base">
      <h1>MasterDetail</h1>
      <p>This component displays data in master detail format.</p>
    </div>
    <div class="rounded-lg border border-base-300 shadow">
      <div class="flex flex-row items-stretch">
        <MasterDetail {title} {data} {size} {addThirdPanel} {selectedKey}>
          <span
            slot="master"
            let:key
            class="basis-1/4 flex flex-row items-center">{key}</span
          >
          <span
            slot="detail"
            let:value
            class="relative flex basis-3/4 overflow-auto border-l border-base-300 rounded-r-md p-4"
          >
            {#if value}
              {value}
            {/if}
          </span>
        </MasterDetail>
      </div>
    </div>
  </div>
  <svelte:fragment slot="controls">
    <!-- svelte-ignore reactive-component -->
    <Hst.Text bind:value={title} title="Title" />
    <!-- svelte-ignore reactive-component -->
    <Hst.Select bind:value={size} options={["sm", "md"]} title="Size" />
    <pre>{JSON.stringify({ title, size }, null, 2)}</pre>
  </svelte:fragment>
</Hst.Story>
