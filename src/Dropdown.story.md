# Dropdown

```svelte
      <Dropdown
        {style}
        {dropdownOpen}
        {buttonElement}
        on:close={() => {
          dropdownOpen = false;
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
