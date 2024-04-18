/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      zIndex: {
        100: "100"
      }
    }
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#9333ea",
          secondary: "#c026d3",
          accent: "#f0abfc",
          neutral: "#1f2937",
          info: "#53c0f3",
          success: "#2dd489",
          warning: "#fbbf24",
          error: "#ff675b"
        }
      },
      {
        night: {
          ...require("daisyui/src/theming/themes")["night"],
          primary: "#a855f7",
          secondary: "#c026d3",
          accent: "#f0abfc",
          neutral: "#1f2937",
          info: "#53c0f3",
          success: "#2dd489",
          warning: "#fbbf24",
          error: "#ff675b"
        }
      }
    ],
    darkTheme: "night",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    themeRoot: ":root"
  }
};
