<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { flip } from "svelte/animate";

  const dispatch = createEventDispatcher();

  import type { AnyCell, ValueCell } from "@okcontract/cells";
  import { Icon } from "@okcontract/uic";

  interface Item {
    id: string;
    v: AnyCell<any>;
  }

  const getKey = (item: Item) => item.id;

  export let list: ValueCell<Item[]>;
  export let sortable: boolean = true;

  // DRAG AND DROP
  let isOver = undefined;

  const getDraggedParent = (node: HTMLElement) =>
    node.dataset && node.dataset.index
      ? node.dataset
      : getDraggedParent(node.parentElement);

  const start = (ev: any) => {
    ev.dataTransfer.setData("source", ev.target.dataset.index);
  };

  const over = (ev: any) => {
    ev.preventDefault();
    let dragged = getDraggedParent(ev.target);
    if (isOver !== dragged.id) isOver = JSON.parse(dragged.id);
  };

  const leave = (ev: any) => {
    let dragged = getDraggedParent(ev.target);
    if (isOver === dragged.id) isOver = false;
  };

  const drop = (ev: any) => {
    isOver = false;
    ev.preventDefault();
    let dragged = getDraggedParent(ev.target);
    let from = ev.dataTransfer.getData("source");
    let to = dragged.index;
    reorder({ from, to });
  };

  const reorder = ({ from, to }) => {
    if ($list instanceof Error) throw $list;
    let newList = [...$list];
    newList[from] = [newList[to], (newList[to] = newList[from])][0];
    dispatch("sort", newList);
  };

  const rnd = () => (Math.random() + 1).toString(36).substring(7);
</script>

<ul class="menu">
  {#if !($list instanceof Error) && $list && $list.length}
    {#if !sortable}
      {#each $list as item, index (getKey(item) + rnd())}
        <li>
          <div class="grow">
            <slot {item} {index} />
          </div>
        </li>
      {/each}
    {:else}
      {#each $list as item, index (getKey(item))}
        <li
          data-index={index}
          data-id={JSON.stringify(getKey(item))}
          draggable="true"
          on:dragstart={start}
          on:dragover={over}
          on:dragleave={leave}
          on:drop={drop}
          animate:flip={{ duration: 300 }}
          class:over={getKey(item) === isOver}
        >
          <div
            class="grow border border-dashed hover:border-info hover:bg-transparent {getKey(
              item
            ) === isOver
              ? 'border-info'
              : 'border-transparent'}"
          >
            <Icon name="drag-v" opacity="80" />
            <slot {item} {index}>
              {getKey(item)}
            </slot>
          </div>
        </li>
      {/each}
    {/if}
  {/if}
</ul>
