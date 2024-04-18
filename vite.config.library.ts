import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "node:path";
import sveltePreprocess from "svelte-preprocess";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    svelte({
      preprocess: sveltePreprocess({ postcss: true })
    })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "UIC",
      formats: ["es", "umd"],
      fileName: (format) => `uic.${format}.js`
    },
    rollupOptions: {
      external: ["svelte"],
      output: {
        globals: {
          svelte: "Svelte"
        }
      }
    }
  }
});
