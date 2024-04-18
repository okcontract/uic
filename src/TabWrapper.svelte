<script lang="ts">
  import type { AnyCell, SheetProxy, ValueCell } from "@okcontract/cells";

  import { Button, TabsMain, TabList, Tab, TabPanel } from "@okcontract/uic";
  import { type TabStyle, type TabSize, type TabMargin } from "./ui";

  type T = $$Generic;

  export let value: AnyCell<T>[] | T[];
  export let selected: ValueCell<number>;
  export let showAsTabs: (i: number, self: AnyCell<T>[] | T[]) => string =
    undefined;

  export let canAdd: boolean = true;
  export let addLabel = "Add tab";
  export let addElement: () => void = undefined;

  export let canRemove: boolean = true;
  export let removeElement: (i: number) => void = undefined;

  export let size: TabSize = "md";
  export let style: TabStyle = "boxed";
  export let mar: TabMargin = "default";
</script>

{#if !(value instanceof Error)}
  {#if showAsTabs}
    <TabsMain>
      <TabList {style} {size} {mar}>
        {#each value as _, i}
          {@const title = showAsTabs(i, value)}
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
              action={addElement}
            />
          </div>
        {/if}
      </TabList>
      {#each value as item, i}
        <TabPanel index={i} {selected}>
          <slot {item} index={i} />
        </TabPanel>
      {/each}
    </TabsMain>
  {:else}
    {#each value as item, i}
      <slot {item} index={i} />
    {/each}
  {/if}
{/if}
