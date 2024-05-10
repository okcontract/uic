<script lang="ts">
  import type { AnyCell, CellArray, ValueCell } from "@okcontract/cells";

  import { type TabMargin, type TabSize, type TabStyle } from "./ui";

  import Button from "./Button.svelte";
  import Tab from "./Tab.svelte";
  import TabList from "./TabList.svelte";
  import TabPanel from "./TabPanel.svelte";
  import TabsMain from "./TabsMain.svelte";

  type T = $$Generic;

  export let value: CellArray<T>;
  export let selected: ValueCell<number>;
  export let showAsTabs: (i: number, self: AnyCell<T>[]) => string = undefined;

  export let canAdd: boolean = true;
  export let addLabel = "Add tab";
  export let addElement: () => Promise<void> | void = undefined;

  export let canRemove: boolean = true;
  export let removeElement: (i: number) => void = undefined;

  export let size: TabSize = "md";
  export let style: TabStyle = "boxed";
  export let mar: TabMargin = "default";
</script>

{#if $value instanceof Error}
  Error: {$value}
{:else if showAsTabs}
  <TabsMain>
    <TabList {style} {size} {mar}>
      {#each $value as item, i (item.id)}
        {@const title = showAsTabs(i, $value)}
        <Tab index={i} {selected}
          >{title}
          <span slot="delete">
            {#if canRemove}
              <Button
                style="ghost"
                size="xs"
                square={true}
                iconAppend={true}
                icon="close"
                disabled={false}
                action={() => removeElement(i)}
              />
            {/if}
          </span>
        </Tab>
      {/each}
      {#if canAdd}
        <div class="tab" role="tab">
          <Button
            style="link"
            size="xs"
            label={addLabel}
            disabled={false}
            asyncAction={addElement}
          />
        </div>
      {/if}
    </TabList>
    {#each $value as item, i (item.id)}
      <TabPanel index={i} {selected}>
        <slot {item} index={i} />
      </TabPanel>
    {/each}
  </TabsMain>
{:else}
  {#each $value as item, i (item.id)}
    <slot {item} index={i} />
  {/each}
{/if}
