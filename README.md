# OKcontract UI Components (UIC)

<!-- @todo badges
[![CI](https://github.com/okcontract/uic/actions/workflows/main.yml/badge.svg)](https://github.com/okcontract/uic/actions?query=branch%3Amain++)
-->

**OKcontract UI Components** is an open-source UI component library built with
[Svelte](https://svelte.dev/), [Tailwind CSS](https://tailwindcss.com/) and
[DaisyUI](https://daisyui.com/). This library helps to streamline the
development of front-ends for various projects.

UIC is a low-level component library that depends on
[cells](https://github.com/okcontract/cells), a simplified reactive functional
programming library.

In its current state, **cells** is not yet used throughout the components but
our vision is to tighten the integration, making programming easier. In
particular, this will also enable _i18n_ support in the future.

The list of current components is maintained in the
[StoryBook](https://uic.pages.dev).

# Getting Started

## Install UIC

Install the package with `npm` or your favorite package manager:

```sh
npm i --save @okcontract/uic
```

## Tailwind + DaisyUI

OKcontract UI Components use
[Tailwind CSS](https://tailwindcss.com/docs/installation), an open-source,
utility-first CSS framework. Tailwind CSS enables easy and flexible
customization of the components' appearance.

All UIC components use [daisyUI](https://daisyui.com/docs/install) - a popular
component library on top of Tailwind CSS. UIC uses daisyUI class names like
`btn`, `card`, `tooltip`, `checkbox` etc.

**daisyUI** comes with dozens of pre-built
[themes](https://daisyui.com/docs/themes/) `light`, `dark`, `cupcake` etc, and
allows to easily create a custom theme. Also, it allows to use multiple themes
in your app.

Learn more about daisyUI classes [here](https://daisyui.com/docs/use/).

### Use UIC with your own daisyUI theme

To apply your own theme to UIC components, you need to use a **daisyUI**
theme. If your app uses daisyUI, it will apply to all components.

In your `tailwind.config.js` you need to include a path to the files
`@okcontract/uic/dist`. Here's an example:

```js
// tailwind.config.js
import daisy from "daisyui";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/@okcontract/uic/dist/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [daisy],
};
```

### Use together with another CSS library

If you use another CSS library in your app, you have to generate a custom
theme from your colors and apply it around a UIC component using a
`data-theme` tag. In that case, install `tailwindcss`, `autoprefixer` and
`daisyui` plugin for Tailwind CSS.

Once setup, simply add `data-theme='THEME_NAME'` to any element and the theme
will apply on the content inside it.

```html
<html data-theme="light">
  <div data-theme="dark">
    The component inside this div will have daisyUI dark theme.
  </div>
</html>
```

### Use OKcontract pre-built stylesheet

OKcontract UIC comes with pre-built daisyUI theme stylesheet. If you prefer to
use OKcontract pre-built theme (which is used in our
[Storybook](https://uic.pages.dev)), you can include `style.min.css` in your
`main.js|ts` or its equivalent.

```js
// main.js
import "[PATH]/node_modules/@okcontract/uic/dist/style.min.css";
```

## How to use UIC components

### Hello, Button

To use a UIC component in your app, import it into your `.svelte` file and
customize actions, labels etc.

```svelte
<script>
  import { Button } from "@okcontract/uic";
  let disabled = false;
  // const logEvent = ...
</script>

<Button label="Click me!" {disabled} action={() => logEvent("click", event)}></Button>
```

### Hello, component with cells

Cells may have a fancy name and super-powers, but they are compatible with
Svelte Store interface so you can think of them as stores.

For example, `Collapsible` component is built using two cells as props:
`disabled` and `isOpen`. This means that changing their value reactively
updates the Collapsible state from anywhere.

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

## Storybook

For more examples, refer to the [Storybook](https://uic.pages.dev).

# About

`UIC` is built at [OKcontract](https://okcontract.com) and is released under
the MIT license.

Contributors are welcome, feel free to submit PRs directly for small changes.
You can also reach out in our [Discord](https://discord.gg/Ns45RTUXka) or
contact us on [Twitter](https://x.com/okcontract) in advance for larger
contributions.

This work is supported in part by a RFG grant from
[Optimism](https://optimism.io).
