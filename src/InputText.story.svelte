<script lang="ts">
  import "../assets/uic.css";

  import type { Hst } from "@histoire/plugin-svelte";

  import { InputText } from "@okcontract/uic";
  import { inputStyles, inputSizes, labelStyles } from "./ui";

  export let Hst: Hst;

  let label = "Full name";
  let name = "name";
  let placeholder = "John Doe";
  let required = false;
  let styleLabel = "default" as const;
  let style = "bordered" as const;
  let size = "md" as const;
</script>

<!-- svelte-ignore reactive-component -->
<Hst.Story title="InputText">
  <div class="p-4 relative w-full overflow-auto">
    <div class="mb-6 prose prose-sm md:prose-base">
      <h1>InputText</h1>
      <p>
        This component has customizable label, name, placeholder, required and
        style.
      </p>
    </div>
    <div
      class="grid border border-base-400 rounded-box min-h-40 min-w-md w-full gap-4 place-content-center"
    >
      <InputText
        {label}
        {name}
        type="text"
        {placeholder}
        {required}
        {style}
        {styleLabel}
        {size}
      />
    </div>
  </div>
  <svelte:fragment slot="controls">
    <!-- svelte-ignore reactive-component -->
    <Hst.Select
      bind:value={styleLabel}
      options={Object.keys(labelStyles)}
      title="Label Style"
    />
    <!-- svelte-ignore reactive-component -->
    <Hst.Select
      bind:value={style}
      options={Object.keys(inputStyles)}
      title="Style"
    />
    <!-- svelte-ignore reactive-component -->
    <Hst.Select
      bind:value={size}
      options={Object.keys(inputSizes)}
      title="Size"
    />
    <pre>{JSON.stringify({ styleLabel, style, size }, null, 3)}</pre>
  </svelte:fragment>
</Hst.Story>
