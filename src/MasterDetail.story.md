# MasterDetail

```svelte
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
            >{value}</span
          >
        </MasterDetail>
```
