<script lang="ts">
  import "../assets/uic.css";

  import { logEvent } from "histoire/client";
  import type { Hst } from "@histoire/plugin-svelte";

  import { Button } from "@okcontract/uic";
  import { buttonSizes, buttonStyles } from "./ui";

  export let Hst: Hst;

  let style = "primary" as const;
  let size = "md" as const;
  let icon = "info" as const;
  let iconAppend = false;
  let iconPrepend = false;
  let outline = false;
  let wide = false;
  let block = false;
  let circle = false;
  let square = false;
  let capitalize = false;
  let disabled = false;
</script>

<!-- svelte-ignore reactive-component -->
<Hst.Story title="Button">
  <div class="p-4 relative w-full overflow-auto">
    <div class="mb-6 prose prose-sm md:prose-base">
      <h1>Button</h1>
      <p>
        This component has customizable style, size. You can apply outline style
        to inverse the style. Use block or wide styles to extend button's
        default width. Use prepend and append icons. Use circle or square styles
        for icon buttons that have no labels.
      </p>
      <label class="my-6">
        <input type="checkbox" bind:checked={disabled} />
        View disabled appearance
      </label>
    </div>
    <div
      class="grid border border-base-400 rounded-box min-h-40 min-w-md w-full gap-4 place-content-center"
    >
      <Button
        {style}
        {size}
        {icon}
        {iconAppend}
        {iconPrepend}
        {outline}
        {block}
        {wide}
        {circle}
        {square}
        {capitalize}
        {disabled}
        label="Click me"
        action={() => logEvent("click", event)}
      ></Button>
    </div>
  </div>
  <svelte:fragment slot="controls">
    <!-- svelte-ignore reactive-component -->
    <Hst.Select
      bind:value={size}
      options={Object.keys(buttonSizes)}
      title="Size"
    />
    <!-- svelte-ignore reactive-component -->
    <Hst.Select
      bind:value={style}
      options={Object.keys(buttonStyles)}
      title="Style"
    />
    <!-- svelte-ignore reactive-component -->
    <Hst.Checkbox bind:value={outline} title="Outline" />
    <!-- svelte-ignore reactive-component -->
    <Hst.Checkbox bind:value={wide} title="Wide" />
    <!-- svelte-ignore reactive-component -->
    <Hst.Checkbox bind:value={block} title="Block" />
    <!-- svelte-ignore reactive-component -->
    <Hst.Checkbox bind:value={circle} title="Circle" />
    <!-- svelte-ignore reactive-component -->
    <Hst.Checkbox bind:value={square} title="Square" />
    <!-- svelte-ignore reactive-component -->
    <Hst.Checkbox bind:value={iconAppend} title="iconAppend" />
    <!-- svelte-ignore reactive-component -->
    <Hst.Checkbox bind:value={iconPrepend} title="iconPrepend" />
    <!-- svelte-ignore reactive-component -->
    <Hst.Checkbox bind:value={disabled} title="Disabled" />
    <pre>{JSON.stringify({ size, style, disabled }, null, 3)}</pre>
  </svelte:fragment>
</Hst.Story>
