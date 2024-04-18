<script lang="ts">
  import "../assets/uic.css";

  import type { Hst } from "@histoire/plugin-svelte";

  import { Card, Button } from "@okcontract/uic";

  export let Hst: Hst;

  let style = "default" as const;
  let pad = "md" as const;
  let title = true;
  let act = true;
</script>

<!-- svelte-ignore reactive-component -->
<Hst.Story title="Card">
  <div class="p-4 relative w-full overflow-auto">
    <div class="mb-6 prose prose-sm md:prose-base">
      <h1>Card</h1>
      <p>
        This component has optional title and actions slots. It has customizable
        style and padding.
      </p>
    </div>
    <div class="p-12 min-h-[4rem] max-w-4xl border border-base-400 rounded-box">
      <Card {style} {pad} {title} {act}>
        <span slot="title">Heading</span>
        <p>Content</p>
        <span slot="act"><Button style="neutral" label="Click" /></span>
      </Card>
    </div>
  </div>

  <svelte:fragment slot="controls">
    <!-- svelte-ignore reactive-component -->
    <Hst.Select
      bind:value={style}
      options={[
        "default",
        "bordered",
        "base",
        "primary",
        "neutral",
        "glass",
        "side"
      ]}
      title="Style"
    />
    <!-- svelte-ignore reactive-component -->
    <Hst.Select
      bind:value={pad}
      options={["sm", "md", "none"]}
      title="Padding"
    />
    <!-- svelte-ignore reactive-component -->
    <Hst.Checkbox bind:value={title} title="Display title" />
    <!-- svelte-ignore reactive-component -->
    <Hst.Checkbox bind:value={act} title="Display actions" />
    <pre>{JSON.stringify({ style, pad, title, act }, null, 4)}</pre>
  </svelte:fragment>
</Hst.Story>
