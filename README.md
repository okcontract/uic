# OKcontract UI Components (UIC)

<!-- @todo badges
[![CI](https://github.com/okcontract/uic/actions/workflows/main.yml/badge.svg)](https://github.com/okcontract/uic/actions?query=branch%3Amain++)
-->

**OKcontract UI Components** is an open-source UI component library built with
[Svelte](https://svelte.dev/), [Tailwind CSS](https://tailwindcss.com/) and
[DaisyUI](https://daisyui.com/). This library aids in streamlining the
development of front-ends for various projects.

UIC is a low-level component library that depends on
[cells](https://github.com/okcontract/cells), a simplified reactive functional
programming library.

In its current state, `cells` is not yet used throughout the components but
our vision is to tighten the integration, making programming easier. In
particular, this will also enable _i18n_ support in the future.

StoryBook available here:

## Tour

Install with:

```sh
npm i --save @okcontract/uic
```

### Hello, Button

```svelte
<script>
  import { Button } from "@okcontract/uic";
  let disabled = false;
  // const logEvent = ...
</script>

<Button label="Click me!" {disabled} action={() => logEvent("click", event)}></Button>
```

### Hello, component with cells

`Collapsible` is built using 2 cells as props: `disabled` and `isOpen`. Cells
may have a fancy name and super-powers, but they are compatible with Svelte
Store interface so you can think of them as stores. This means that changing
their value reactively updates the Collapsible state from anywhere.

```svelte
<script>
  import { Collapsible } from "@okcontract/uic";
  // @see cells documentation about creating proxies
  import { proxy } from "./lib";
  const disabled = proxy.new(false, "disabled");

  // programmatically update disabled (including outside of this component)
  // $disabled = true;
</script>

<Collapsible {proxy} {style} {size} {disabled}>
  <div slot="heading">{heading}</div>
  <div>{content}</div>
</Collapsible>
```

For more examples, refer to the [Storybook]().

## Built with Tailwind and DaisyUI

OKcontract UI Components use Tailwind CSS, an open-source, utility-first CSS
framework. Tailwind CSS enables easy and flexible customization of the
components' appearance.

# About

`UIC` is built at [OKcontract](https://okcontract.com) and is released under
the MIT license.

Contributors are welcome, feel free to submit PRs directly for small changes.
You can also reach out in our [Discord](https://discord.gg/Ns45RTUXka) or
contact us on [Twitter](https://x.com/okcontract) in advance for larger
contributions.

This work is supported in part by a RFG grant from
[Optimism](https://optimism.io).
