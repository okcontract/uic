# Dropdown

```svelte
      <Dropdown
        {style}
        {open}
        {buttonElement}
        on:close={() => {
          $open = false;
        }}
      >
        <div slot="main" class="p-2">
          <ul>
            <li>One</li>
            <li>Two</li>
            <li>Three</li>
          </ul>
        </div>
      </Dropdown>
```
