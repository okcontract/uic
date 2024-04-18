# Hoverable

```svelte
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
```
