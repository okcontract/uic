<script lang="ts">
  import "../assets/uic.css";

  import type { Hst } from "@histoire/plugin-svelte";

  import { iconList } from "./icons";
  import { Icon } from "@okcontract/uic";

  export let Hst: Hst;

  let name = "info";
  let fill = "primary" as const;
  let size = "sm" as const;
</script>

<!-- svelte-ignore reactive-component -->
<Hst.Story title="Icon">
  <div class="p-4 relative w-full overflow-auto">
    <div class="mb-6 prose prose-sm md:prose-base">
      <h1>Icon</h1>
      <p>
        This component is used to display an icon. It has customizable fill
        color and size.
      </p>
    </div>
    <div
      class="grid border border-base-400 rounded-box min-h-20 min-w-md w-full gap-4 place-content-center"
    >
      <Icon {name} {size} {fill} />
    </div>
  </div>
  <svelte:fragment slot="controls">
    <!-- svelte-ignore reactive-component -->
    <Hst.Select bind:value={name} options={iconList} title="Name" />
    <!-- svelte-ignore reactive-component -->
    <Hst.Select
      bind:value={size}
      options={["xs", "sm", "md", "lg", "xl"]}
      title="Size"
    />
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
      title="Fill color"
    />
    <pre>{JSON.stringify({ name, size, fill }, null, 3)}</pre>
  </svelte:fragment>
</Hst.Story>
