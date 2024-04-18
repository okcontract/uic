<script lang="ts">
  import "../assets/uic.css";

  import type { Hst } from "@histoire/plugin-svelte";

  import { Loading } from "@okcontract/uic";

  export let Hst: Hst;
</script>

<!-- svelte-ignore reactive-component -->
<Hst.Story title="Loading">
  <div class="p-4 relative w-full overflow-auto">
    <div class="mb-6 prose prose-sm md:prose-base">
      <h1>Loading</h1>
      <p>This component displays a loading spinner.</p>
    </div>
    <div
      class="grid border border-base-400 rounded-box min-h-40 min-w-md w-full gap-4 place-content-center"
    >
      <Loading />
    </div>
  </div>
</Hst.Story>
