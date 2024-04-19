/// <reference types="histoire" />

import { HstSvelte } from "@histoire/plugin-svelte";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defaultColors } from "histoire";
import sveltePreprocess from "svelte-preprocess";
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    environment: "happy-dom"
    // coverage: {
    //   exclude: ["src/index.ts"]
    // }
  },
  plugins: [
    svelte({
      preprocess: sveltePreprocess()
    })
  ],
  histoire: {
    plugins: [HstSvelte()],
    tree: {
      groups: [
        {
          id: "top",
          title: ""
        }
      ]
    },
    theme: {
      title: "OKcontract UIC",
      logo: {
        square: "./assets/ok-icon.png",
        light: "./assets/ok-icon.png",
        dark: "./assets/ok-icon.png"
      },
      logoHref: "https://okcontract.com",
      colors: {
        gray: defaultColors.gray,
        primary: defaultColors.gray
      }
    }
  }
});
