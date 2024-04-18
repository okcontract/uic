<script lang="ts">
  import "../assets/uic.css";

  import type { Hst } from "@histoire/plugin-svelte";

  import { SheetProxy } from "@okcontract/cells";

  import { sheet } from "./histoire";

  import { Tab, TabList, TabPanel, TabsMain } from "@okcontract/uic";
  import { tabMargins, tabSizes, tabStyles } from "./ui";

  export let Hst: Hst;

  const proxy = new SheetProxy(sheet);

  let size = "md" as const;
  let style = "lifted" as const;
  let mar = "default" as const;
  let tabs = ["one", "two", "three"];
  const selected = proxy.new(0);
</script>

<!-- svelte-ignore reactive-component -->
<Hst.Story title="Tabs">
  <div class="p-4 relative w-full overflow-auto">
    <div class="mb-6 prose prose-sm md:prose-base">
      <h1>Tabs</h1>
      <p>
        Tabs include four components: TabsMain, TabList, Tab and TabPanel.
        TabList Tab have customizable style.
      </p>
    </div>
    <div
      class="grid border border-base-400 rounded-box min-h-40 min-w-md w-full gap-4 place-content-center"
    >
      <TabsMain>
        <TabList {style} {size} {mar}>
          {#each tabs as tab, i}
            <Tab {selected} index={i}>{tab}</Tab>
          {/each}
        </TabList>
        <div>
          <TabPanel {selected} index={0}
            ><p class="my-3">Content One</p></TabPanel
          >
          <TabPanel {selected} index={1}
            ><p class="my-3">Content Two</p></TabPanel
          >
          <TabPanel {selected} index={2}
            ><p class="my-3">Content Three</p></TabPanel
          >
        </div>
      </TabsMain>
    </div>
  </div>
  <svelte:fragment slot="controls">
    <!-- svelte-ignore reactive-component -->
    <Hst.Select
      bind:value={size}
      options={Object.keys(tabSizes)}
      title="Size"
    />
    <!-- svelte-ignore reactive-component -->
    <Hst.Select
      bind:value={style}
      options={Object.keys(tabStyles)}
      title="Style"
    />
    <!-- svelte-ignore reactive-component -->
    <Hst.Select
      bind:value={mar}
      options={Object.keys(tabMargins)}
      title="Margin bottom"
    />
    <pre>{JSON.stringify({ style, size, mar }, null, 3)}</pre>
  </svelte:fragment>
</Hst.Story>
