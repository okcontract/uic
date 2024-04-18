<script lang="ts">
  import "../assets/uic.css";

  import type { Hst } from "@histoire/plugin-svelte";

  import { Hoverable } from "@okcontract/uic";

  export let Hst: Hst;
</script>

<!-- svelte-ignore reactive-component -->
<Hst.Story title="Hoverable">
  <div class="p-4 relative w-full overflow-auto">
    <div class="mb-6 prose prose-sm md:prose-base">
      <h1>Hoverable</h1>
      <p>This component is used for displaying an element on mouse hover.</p>
    </div>
    <div class="p-12 min-h-[4rem] max-w-4xl border border-base-400 rounded-box">
      <Hoverable let:hovering={hover}>
        <div
          class="flex gap-2 justify-between items-center p-4 rounded-box {hover
            ? 'bg-base-200'
            : 'bg-base-100'}"
        >
          <div class="text-lg font-medium">Mouse over this text</div>
          {#if hover}
            <span>🔥🔥🔥</span>
          {/if}
        </div>
      </Hoverable>
    </div>
  </div>
</Hst.Story>
