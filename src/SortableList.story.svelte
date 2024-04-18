<script lang="ts">
  import "../assets/uic.css";

  import { SheetProxy } from "@okcontract/cells";
  import { sheet } from "./histoire";
  const proxy = new SheetProxy(sheet);

  import type { Hst } from "@histoire/plugin-svelte";

  import { SortableList } from "@okcontract/uic";

  export let Hst: Hst;
  let sortable = true;
  const list = proxy.new([
    { id: "whale", v: proxy.new("whale 🐳") },
    { id: "frog", v: proxy.new("frog 🐸") },
    { id: "penguin", v: proxy.new("penguin 🐧") }
  ]);
</script>

<!-- svelte-ignore reactive-component -->
<Hst.Story title="SortableList">
  <div class="p-4 relative w-full overflow-auto">
    <div class="mb-6 prose prose-sm md:prose-base">
      <h1>SortableList</h1>
      <p>This component is used for selecting an option from a list.</p>
    </div>
    <div
      class="grid border border-base-400 rounded-box min-h-80 min-w-md w-full gap-4 place-content-center"
    >
      <SortableList
        {sortable}
        {list}
        on:sort={(ev) => {
          list.set(ev.detail);
        }}
        let:item
      >
        {#await item.v.get() then v}
          {v}
        {/await}
      </SortableList>
    </div>
  </div>
  <svelte:fragment slot="controls">
    <!-- svelte-ignore reactive-component -->
    <Hst.Checkbox bind:value={sortable} title="Sortable" />
    <pre>{JSON.stringify({ sortable }, null, 1)}</pre>
  </svelte:fragment>
</Hst.Story>
