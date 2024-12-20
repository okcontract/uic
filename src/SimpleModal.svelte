<script lang="ts">
  import type { ValueCell } from "@okcontract/cells";
  import { Button } from "@okcontract/uic";

  export let isOpen: ValueCell<boolean>;
  export let btmAct: boolean = false;
  export let closeBtn: boolean = false;

  function close() {
    isOpen.set(false);
  }
</script>

<dialog class="modal{$isOpen ? ' modal-open' : ''}">
  <div class="modal-box">
    {#if closeBtn}
      <form method="dialog">
        <div class="absolute right-2 top-2">
          <Button
            style="ghost"
            size="sm"
            circle={true}
            iconAppend={true}
            icon="close-panel"
            action={close}
          />
        </div>
      </form>
    {/if}
    <slot />
    {#if btmAct}
      <div class="modal-action">
        <form method="dialog">
          <Button style="default" size="md" label="Close" action={close} />
        </form>
      </div>
    {/if}
  </div>
</dialog>
