<script lang="ts">
  import "../assets/uic.css";

  import type { Hst } from "@histoire/plugin-svelte";

  import { Toggle } from "@okcontract/uic";

  export let Hst: Hst;

  let condition = true;
</script>

<!-- svelte-ignore reactive-component -->
<Hst.Story title="Toggle">
  <div class="p-4 relative w-full overflow-auto">
    <div class="mb-6 prose prose-sm md:prose-base">
      <h1>Toggle</h1>
      <p>
        This component is used to display skeleton before the content loads.
      </p>
      <label class="my-3">
        <input type="checkbox" bind:checked={condition} />
        Click to see changes
      </label>
    </div>
    <div
      class="grid border border-base-400 rounded-box min-h-80 min-w-md w-full gap-4 place-content-center"
    >
      <Toggle {condition}>
        <div slot="if">
          <div class="skeleton h-56 w-56"></div>
        </div>
        <div slot="else">
          <div class="bg-primary rounded-box h-56 w-56"></div>
        </div>
      </Toggle>
    </div>
  </div>
  <svelte:fragment slot="controls">
    <!-- svelte-ignore reactive-component -->
    <Hst.Checkbox bind:value={condition} title="Toggle" />
    <pre>{JSON.stringify({ condition }, null, 1)}</pre>
  </svelte:fragment>
</Hst.Story>
