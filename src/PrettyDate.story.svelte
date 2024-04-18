<script lang="ts">
  import "../assets/uic.css";

  import type { Hst } from "@histoire/plugin-svelte";
  import { PrettyDate } from "@okcontract/uic";

  export let Hst: Hst;

  let date = new Date(Date.now() - 1000 * 1000).toDateString();
</script>

<!-- svelte-ignore reactive-component -->
<Hst.Story title="PrettyDate">
  <div class="p-4 relative w-full overflow-auto">
    <div class="mb-6 prose prose-sm md:prose-base">
      <h1>PrettyDate</h1>
      <p>This component displays date in a user friendly format.</p>
    </div>
    <div
      class="grid border border-base-400 rounded-box min-h-20 min-w-md w-full gap-4 place-content-center"
    >
      <PrettyDate {date} />
    </div>
  </div>
  <svelte:fragment slot="controls">
    <!-- svelte-ignore reactive-component -->
    <Hst.Text bind:value={date} title="Date" />
    <pre>{JSON.stringify({ date }, null, 1)}</pre>
  </svelte:fragment>
</Hst.Story>
