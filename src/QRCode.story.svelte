<script lang="ts">
  import "../assets/uic.css";

  import type { Hst } from "@histoire/plugin-svelte";
  import { QRCode } from "@okcontract/uic";

  export let Hst: Hst;

  let code = "https://twitter.com/okcontract";
  let size = 200;
  let front = "black";
  let back = "white";
</script>

<!-- svelte-ignore reactive-component -->
<Hst.Story title="QRCode">
  <div class="p-4 relative w-full overflow-auto">
    <div class="mb-6 prose prose-sm md:prose-base">
      <h1>QRCode</h1>
      <p>This component generates a QR code from a code.</p>
    </div>
    <div
      class="grid border border-base-400 rounded-box min-h-40 min-w-md w-full gap-4 place-content-center"
    >
      <QRCode {code} {size} {front} {back} />
    </div>
  </div>
</Hst.Story>
