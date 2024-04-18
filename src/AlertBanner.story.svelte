<script lang="ts">
  import "../assets/uic.css";

  import { logEvent } from "histoire/client";
  import type { Hst } from "@histoire/plugin-svelte";

  import { AlertBanner, Button } from "@okcontract/uic";

  export let Hst: Hst;

  let display = true;
  let close = true;
  let size = "md" as const;
  let style = "default" as const;
  let icon = "info" as const;
  let fill = "current" as const;
</script>

<!-- svelte-ignore reactive-component -->
<Hst.Story title="AlertBanner">
  <div class="p-4 relative w-full overflow-auto">
    <div class="mb-6 prose prose-sm md:prose-base">
      <h1>AlertBanner</h1>
      <p>
        This component has customizable icon, style, size and an option to
        dismiss.
      </p>
    </div>
    {#if display}
      <AlertBanner
        {icon}
        {style}
        {size}
        {close}
        {fill}
        action={() => {
          logEvent("close", event);
          if (display) display = false;
        }}
        >Heads up! New version is here. Please note that there might be some
        limitations during this stage.
      </AlertBanner>
    {:else}
      <Button action={() => (display = true)} label="Display banner" />
    {/if}
  </div>

  <svelte:fragment slot="controls">
    <!-- svelte-ignore reactive-component -->
    <Hst.Select
      bind:value={style}
      options={["default", "error", "warning", "success", "info"]}
      title="Style"
    />
    <!-- svelte-ignore reactive-component -->
    <Hst.Select
      bind:value={icon}
      options={["info", "error", "warning", "success"]}
      title="Icon"
    />
    <!-- svelte-ignore reactive-component -->
    <Hst.Select bind:value={size} options={["sm", "md"]} title="Size" />
    <!-- svelte-ignore reactive-component -->
    <Hst.Select
      bind:value={fill}
      options={[
        "current",
        "primary",
        "secondary",
        "accent",
        "error",
        "success",
        "warning",
        "info"
      ]}
      title="Icon color"
    />
    <!-- svelte-ignore reactive-component -->
    <Hst.Checkbox bind:value={close} title="Dismissible" />
    <pre>{JSON.stringify({ icon, style, size, close, fill }, null, 5)}</pre>
  </svelte:fragment>
</Hst.Story>
