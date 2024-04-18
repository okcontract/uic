<script lang="ts">
  import "../assets/uic.css";

  import type { Hst } from "@histoire/plugin-svelte";
  import { ActiveStatus } from "@okcontract/uic";

  export let Hst: Hst;

  let act = true;
  let label = "Active";
</script>

<!-- svelte-ignore reactive-component -->
<Hst.Story title="ActiveStatus">
  <div class="p-4 relative w-full overflow-auto">
    <div class="mb-6 prose prose-sm md:prose-base">
      <h1>ActiveStatus</h1>
      <p>
        This component has optional and customizable label. It helps to indicate
        active or inactive status.
      </p>
    </div>
    <div
      class="grid border border-base-400 rounded-box min-h-20 min-w-md w-full gap-4 place-content-center"
    >
      <ActiveStatus {label} {act} />
    </div>
    <div class="mt-6 mb-3 prose prose-sm md:prose-base">
      <h2>Examples</h2>
      <p>With label:</p>
    </div>
    <div
      class="grid border border-base-400 rounded-box min-h-20 min-w-md w-full gap-4 place-content-center"
    >
      <div class="flex gap-2">
        <ActiveStatus label="Active" act={true} />
        <ActiveStatus label="Inactive" act={false} />
      </div>
    </div>
    <div class="my-3 prose prose-sm md:prose-base">
      <p>Without label:</p>
    </div>
    <div
      class="grid border border-base-400 rounded-box min-h-20 min-w-md w-full gap-4 place-content-center"
    >
      <div class="flex gap-2">
        <ActiveStatus act={true} />
        <ActiveStatus act={false} />
      </div>
    </div>
  </div>
  <svelte:fragment slot="controls">
    <!-- svelte-ignore reactive-component -->
    <Hst.Text bind:value={label} title="Label" />
    <!-- svelte-ignore reactive-component -->
    <Hst.Checkbox bind:value={act} title="Active" />
    <pre>{JSON.stringify({ label, act }, null, 2)}</pre>
  </svelte:fragment>
</Hst.Story>
