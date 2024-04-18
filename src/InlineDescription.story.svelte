<script lang="ts">
  import "../assets/uic.css";

  import type { Hst } from "@histoire/plugin-svelte";

  import { InlineDescription } from "@okcontract/uic";

  export let Hst: Hst;

  let title = "Price:" as const;
  let size = "sm" as const;

  let description = "$ 18.00";
</script>

<!-- svelte-ignore reactive-component -->
<Hst.Story title="InlineDescription">
  <div class="p-4 relative w-full overflow-auto">
    <div class="mb-6 prose prose-sm md:prose-base">
      <h1>InlineDescription</h1>
      <p>
        This component is used for displaying content. It has customizable size,
        title and optional grid style.
      </p>
    </div>
    <div class="p-12 min-h-[4rem] max-w-4xl border border-base-400 rounded-box">
      <InlineDescription {title} {size}>{description}</InlineDescription>
    </div>
  </div>
  <svelte:fragment slot="controls">
    <!-- svelte-ignore reactive-component -->
    <Hst.Text bind:value={title} title="Title" />
    <!-- svelte-ignore reactive-component -->
    <Hst.Text bind:value={description} title="Description" />
    <!-- svelte-ignore reactive-component -->
    <Hst.Select bind:value={size} options={["sm", "md"]} title="Size" />
    <pre>{JSON.stringify({ title, description, size }, null, 3)}</pre>
  </svelte:fragment>
</Hst.Story>
