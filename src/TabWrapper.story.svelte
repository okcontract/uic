<script lang="ts">
  import "../assets/uic.css";

  import { SheetProxy } from "@okcontract/cells";
  import { sheet } from "./histoire";
  const proxy = new SheetProxy(sheet);

  import type { Hst } from "@histoire/plugin-svelte";
  export let Hst: Hst;

  import { TabWrapper } from "@okcontract/uic";

  const selected = proxy.new(null, "tabs.selected");
  const showAsTabs = (i: any, self: any) => `Tab ${i}`;

  let canAdd = true;
  let canRemove = true;

  const value = proxy.new([proxy.new("🍕 pizza"), proxy.new("🍣 sushi")]);
  const canAddItems = () =>
    value.update((value) => [...value, proxy.new("🍪 cookie")]);

  const removeElement = (i: any) =>
    value.update((value) => [...value.slice(0, i), ...value.slice(i + 1)]);
</script>

<!-- svelte-ignore reactive-component -->
<Hst.Story title="TabWrapper">
  <div class="p-4 relative w-full overflow-auto">
    <div class="mb-6 prose prose-sm md:prose-base">
      <h1>TabWrapper</h1>
      <p>This component has options to add and remove tabs.</p>
    </div>
    <div
      class="grid border border-base-400 rounded-box min-h-40 min-w-md w-full gap-4 place-content-center"
    >
      <TabWrapper
        {selected}
        value={$value}
        {showAsTabs}
        {canAdd}
        {canRemove}
        addElement={canAddItems}
        {removeElement}
        let:item
      >
        {item.value}
      </TabWrapper>
    </div>
  </div>
  <svelte:fragment slot="controls">
    <!-- svelte-ignore reactive-component -->
    <Hst.Checkbox bind:value={canAdd} title="Enable adding tabs" />
    <!-- svelte-ignore reactive-component -->
    <Hst.Checkbox bind:value={canRemove} title="Enable removing tabs" />
    <pre>{JSON.stringify({ canAdd, canRemove }, null, 2)}</pre>
  </svelte:fragment>
</Hst.Story>
