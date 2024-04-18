<script lang="ts">
  import "../assets/uic.css";

  import type { Hst } from "@histoire/plugin-svelte";

  import { SheetProxy } from "@okcontract/cells";
  import { sheet } from "./histoire";

  import { SimpleModal, Button } from "@okcontract/uic";

  export let Hst: Hst;

  let closeBtn = true;
  let btmAct = true;
  let proxy = new SheetProxy(sheet);
  let isOpen = proxy.new(false);
</script>

<!-- svelte-ignore reactive-component -->
<Hst.Story title="SimpleModal">
  <div class="p-4 relative w-full overflow-auto">
    <div class="mb-6 prose prose-sm md:prose-base">
      <h1>SimpleModal</h1>
      <p>This component is used for displaying an icon.</p>
    </div>
    <div
      class="grid border border-base-400 rounded-box min-h-80 min-w-md w-full gap-4 place-content-center"
    >
      <Button label="Open the modal" action={() => isOpen.update((v) => !v)} />
      <SimpleModal {isOpen} {closeBtn} {btmAct}>
        <h3 class="font-bold text-lg">Hello!</h3>
        <p class="py-4">Press ESC key or click on ✕ button to close</p>
        <span slot="btmAct">
          <Button label="Close" action={() => isOpen.update((v) => !v)} />
        </span>
      </SimpleModal>
    </div>
  </div>
  <svelte:fragment slot="controls">
    <!-- svelte-ignore reactive-component -->
    <Hst.Checkbox bind:value={closeBtn} title="Close button" />
    <!-- svelte-ignore reactive-component -->
    <Hst.Checkbox bind:value={btmAct} title="Bottom action" />
    <pre>{JSON.stringify({ btmAct }, null, 2)}</pre>
  </svelte:fragment>
</Hst.Story>
