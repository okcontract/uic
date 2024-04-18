# Tab

```svelte
<TabsMain>
      <TabList {style} {size} {mar}>
        {#each tabs as tab, i}
          <Tab {selected} index={i}>{tab}</Tab>
        {/each}
      </TabList>
      <div>
        <TabPanel {selected} index={0}><p class="my-3">Content One</p></TabPanel
        >
        <TabPanel {selected} index={1}><p class="my-3">Content Two</p></TabPanel
        >
        <TabPanel {selected} index={2}
          ><p class="my-3">Content Three</p></TabPanel
        >
      </div>
    </TabsMain>
```
