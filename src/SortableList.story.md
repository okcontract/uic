# SortableList

```svelte
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
```
