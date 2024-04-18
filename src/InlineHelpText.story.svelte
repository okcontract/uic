<script lang="ts">
  import "../assets/uic.css";

  import type { Hst } from "@histoire/plugin-svelte";

  import { InlineHelpText } from "@okcontract/uic";
  import { textStyles } from "./ui";

  export let Hst: Hst;

  let icon = "info" as const;
  let style = "info" as const;
</script>

<!-- svelte-ignore reactive-component -->
<Hst.Story title="InlineHelpText">
  <div class="p-4 relative w-full overflow-auto">
    <div class="mb-6 prose prose-sm md:prose-base">
      <h1>InlineHelpText</h1>
      <p>This component has customizable style and icon.</p>
    </div>
    <div
      class="grid border border-base-400 rounded-box min-h-40 min-w-md w-full gap-4 place-content-center"
    >
      <InlineHelpText {style} {icon}>You should read this</InlineHelpText>
    </div>
  </div>

  <svelte:fragment slot="controls">
    <!-- svelte-ignore reactive-component -->
    <Hst.Select
      bind:value={style}
      options={Object.keys(textStyles)}
      title="Style"
    />
    <!-- svelte-ignore reactive-component -->
    <Hst.Select
      bind:value={icon}
      options={["info", "error", "warning", "success"]}
      title="Icon"
    />
    <pre>{JSON.stringify({ style, icon }, null, 2)}</pre>
  </svelte:fragment>
</Hst.Story>
