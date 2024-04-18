<script lang="ts">
  import "../assets/uic.css";

  import type { Hst } from "@histoire/plugin-svelte";

  import { sheet } from "./histoire";
  import { SheetProxy } from "@okcontract/cells";

  import { Collapsible } from "@okcontract/uic";

  export let Hst: Hst;

  const proxy = new SheetProxy(sheet);

  let style = "default" as const;
  let size = "lg" as const;

  let heading = "🛟 Click here";
  let content = "Content";
</script>

<!-- svelte-ignore reactive-component -->
<Hst.Story title="Collapsible">
  <div class="p-4 relative w-full overflow-auto">
    <div class="mb-6 prose prose-sm md:prose-base">
      <h1>Collapsible</h1>
      <p>
        This component is used for displaying collapsible expandable content.
      </p>
    </div>
    <div class="p-12 min-h-[4rem] max-w-4xl border border-base-400 rounded-box">
      <Collapsible {proxy} {style} {size}>
        <div slot="heading">{heading}</div>
        <div>{content}</div>
      </Collapsible>
    </div>
  </div>
  <svelte:fragment slot="controls">
    <!-- svelte-ignore reactive-component -->
    <Hst.Select
      bind:value={style}
      options={["default", "transparent", "base"]}
      title="Style"
    />
    <!-- svelte-ignore reactive-component -->
    <Hst.Select bind:value={size} options={["sm", "md", "lg"]} title="Size" />
    <!-- svelte-ignore reactive-component -->
    <Hst.Text bind:value={heading} title="Heading" />
    <!-- svelte-ignore reactive-component -->
    <Hst.Textarea bind:value={content} title="Content" />
    <pre>{JSON.stringify({ style, size, heading, content }, null, 4)}</pre>
  </svelte:fragment>
</Hst.Story>
