<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  import { type ValueCell } from "@okcontract/cells";

  import type { IconName } from "./icons";
  import Button from "./Button.svelte";

  export let title: string = undefined;

  // @todo to cell
  export let actions: [IconName, () => void][] = [];
  export let data: [string, any][];
  export let size: "sm" | "md" = "md";
  export let addThirdPanel = false;
  export let height: string = undefined;
  export let selectedKey: ValueCell<any>;

  // select default value
  $: {
    if (!$selectedKey && data?.length) selectedKey.set(data[0][0]);
  }
  $: selectedValue = data.find(([k, _]) => k === $selectedKey)?.[1];

  const handleClick = (key: string) => {
    selectedKey.set(key);
    dispatch("select", key);
  };
</script>

<div class="flex flex-col shrink basis-1/4 {height} overflow-auto rounded-l-lg">
  <div
    class="flex items-center justify-between {size === 'sm'
      ? 'p-2'
      : 'py-2 px-4'}"
  >
    {#if title}
      <h6>{title}</h6>
    {/if}
    <slot name="title" />
    {#each actions as [icon, action]}
      <Button
        style="ghost"
        size="sm"
        square={true}
        iconAppend={true}
        {icon}
        {action}
      />
    {/each}
  </div>
  {#if data}
    <div>
      <ul class="flex flex-col join">
        {#each data as [k, v], i (k)}
          <button
            class="{size === 'sm'
              ? 'py-0 px-2 text-xs'
              : 'py-2 px-4 text-sm'} border-b border-base-300 cursor-pointer {$selectedKey ===
            k
              ? 'bg-primary text-primary-content'
              : ''}"
            on:click={() => handleClick(k)}
          >
            <slot
              name="master"
              key={k}
              value={v}
              selected={k === $selectedKey}
              index={i}
            />
          </button>
        {/each}
      </ul>
    </div>
  {/if}
</div>

{#if $selectedKey}
  <slot name="detail" key={$selectedKey} value={selectedValue} />

  {#if addThirdPanel}
    <slot name="third" key={$selectedKey} value={selectedValue} />
  {/if}
{/if}
