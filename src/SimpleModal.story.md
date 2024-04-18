# SimpleModal

```svelte
    <SimpleModal {isOpen} {closeBtn} {btmAct}>
      <h3 class="font-bold text-lg">Hello!</h3>
      <p class="py-4">Click on ✕ button to close</p>
      <span slot="btmAct">
        <Button label="Close" action={() => isOpen.update((v) => !v)} />
      </span>
    </SimpleModal>
```
