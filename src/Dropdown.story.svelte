<script lang="ts">
  import "../assets/uic.css";

  import type { Hst } from "@histoire/plugin-svelte";

  import { SheetProxy } from "@okcontract/cells";
  import { Dropdown } from "@okcontract/uic";

  import { sheet } from "./histoire";
  import { dropdownSizes, dropdownStyles } from "./ui";

  const proxy = new SheetProxy(sheet);

  export let Hst: Hst;

  const open = proxy.new(false, "open");
  let buttonElement: HTMLElement;

  let style = "top" as const;
  let size = "sm" as const;
</script>

<!-- svelte-ignore reactive-component -->
<Hst.Story title="Dropdown">
  <div class="p-4 relative w-full overflow-auto">
    <div class="mb-6 prose prose-sm md:prose-base">
      <h1>Dropdown</h1>
      <p>This component displays a dropdown.</p>
    </div>
    <div
      class="grid border border-base-400 rounded-box min-h-80 min-w-md w-full gap-4 place-content-center"
    >
      <Dropdown
        {style}
        {size}
        {open}
        {buttonElement}
        on:close={() => {
          $open = false;
        }}
      >
        <div slot="action">
          <button
            class="btn m-1"
            bind:this={buttonElement}
            on:click={() => {
              open.update((v) => !v);
            }}
            >Click to open
          </button>
        </div>
        <ul slot="main">
          <li><span>One</span></li>
          <li><span>Two</span></li>
          <li><span>Three</span></li>
        </ul>
      </Dropdown>
    </div>
  </div>
  <svelte:fragment slot="controls">
    <!-- svelte-ignore reactive-component -->
    <Hst.Select
      bind:value={style}
      options={Object.keys(dropdownStyles)}
      title="Style"
    />
    <!-- svelte-ignore reactive-component -->
    <Hst.Select
      bind:value={size}
      options={Object.keys(dropdownSizes)}
      title="Size"
    />
    <pre>{JSON.stringify({ size, style }, null, 2)}</pre>
  </svelte:fragment>
</Hst.Story>
