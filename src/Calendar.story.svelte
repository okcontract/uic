<script lang="ts">
  import "../assets/uic.css";

  import type { Hst } from "@histoire/plugin-svelte";
  import { Calendar } from "@okcontract/uic";

  export let Hst: Hst;

  let time = Date;
  let disabled = false;
  let dayOnly = false;
</script>

<!-- svelte-ignore reactive-component -->
<Hst.Story title="Calendar">
  <div class="p-4 relative w-full overflow-auto">
    <div class="mb-6 prose prose-sm md:prose-base">
      <h1>Calendar</h1>
      <p>This component has option to display time chooser</p>
      <label class="my-6">
        <input type="checkbox" bind:checked={dayOnly} />
        Toggle time
      </label>
    </div>
    <div
      class="grid border border-base-400 rounded-box min-h-40 min-w-md w-full gap-4 place-content-center"
    >
      <Calendar {disabled} {dayOnly} {time} />
    </div>
  </div>
  <!-- svelte-ignore reactive-component -->
  <svelte:fragment slot="controls">
    <!-- svelte-ignore reactive-component -->
    <Hst.Checkbox bind:value={dayOnly} title="Display time" />
    <!-- svelte-ignore reactive-component -->
    <Hst.Checkbox bind:value={disabled} title="Disabled" />
    <pre>{JSON.stringify({ dayOnly, disabled }, null, 2)}</pre>
  </svelte:fragment>
</Hst.Story>
