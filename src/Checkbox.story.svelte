<script lang="ts">
  import "../assets/uic.css";

  import type { Hst } from "@histoire/plugin-svelte";

  import { Checkbox } from "@okcontract/uic";
  import { checkboxSizes, checkboxStyles } from "./ui";

  export let Hst: Hst;

  let style = "default" as const;
  let size = "md" as const;
  let disabled = false;
  let required = false;
  let label = "Select this option";
  let value = true;
</script>

<!-- svelte-ignore reactive-component -->
<Hst.Story title="Checkbox">
  <div class="p-4 relative w-full overflow-auto">
    <div class="mb-6 prose prose-sm md:prose-base">
      <h1>Checkbox</h1>
      <p>This component has customizable label, style and size.</p>
      <label class="my-6">
        <input type="checkbox" bind:checked={disabled} />
        View disabled appearance
      </label>
    </div>
    <div
      class="grid border border-base-400 rounded-box min-h-20 min-w-md w-full gap-4 place-content-center"
    >
      <div class="w-64">
        <Checkbox {label} {value} {disabled} {required} {style} {size} />
      </div>
    </div>
  </div>

  <svelte:fragment slot="controls">
    <!-- svelte-ignore reactive-component -->
    <Hst.Text bind:value={label} title="Label" />
    <!-- svelte-ignore reactive-component -->
    <Hst.Select
      bind:value={style}
      options={Object.keys(checkboxStyles)}
      title="Style"
    />
    <!-- svelte-ignore reactive-component -->
    <Hst.Select
      bind:value={size}
      options={Object.keys(checkboxSizes)}
      title="Size"
    />
    <!-- svelte-ignore reactive-component -->
    <Hst.Checkbox bind:value={disabled} title="Disabled" />
    <pre>{JSON.stringify({ label, style, size, disabled }, null, 4)}</pre>
  </svelte:fragment>
</Hst.Story>
