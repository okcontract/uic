import { getContext } from "svelte";

import {
  type SheetProxy,
  mapObject,
  reduceObject,
  type AnyCell,
  type Cell,
  type CellObject,
  type Cellified,
  type MapCell
} from "@okcontract/cells";

import {
  type CompiledTheme,
  type CompiledThemeValue,
  type RawThemeDefinition,
  ThemeAccent,
  ThemeBackground,
  ThemeBackgroundTransparent,
  ThemeButton,
  ThemeError,
  type ThemeExtras,
  ThemeFocus,
  type ThemeParts,
  ThemeText
} from "./types";

export const ThemeContextKey = Symbol();

export const getTheme = (th?: AnyCell<RawThemeDefinition>): Theme =>
  getContext(ThemeContextKey) || new Theme(th);

// There are three types for themes:
// 1. stored types in the widget definition (raw)
// 2. structured type for edition (compatible with schema definitions)
// 3. compiled theme with built css props used directly in components.

export class Theme {
  proxy: SheetProxy;
  compiled: MapCell<CompiledTheme, true>;
  raw: CellObject<RawThemeDefinition>;

  constructor(proxy: SheetProxy, th: CellObject<RawThemeDefinition>) {
    if (!proxy || !th) return;
    console.log("new Theme", { proxy, th });
    this.proxy = proxy;
    this.raw = th;
    this.compiled = this.compile(th);
    // this.compiled = th?.map(
    //   (_th) => (_th && this.compile(proxy, _th)) || null,
    //   "Theme.compiled",
    //   true
    // );
  }

  /**
   * isSet checks if a theme is set
   * @returns
   */
  isSet = () => !!this.compiled;

  /**
   *  compile_theme takes a RawThemeDefinition and compiles it to a compiled theme
   * @param th RawThemeDefinition
   * @returns
   */
  compile = (th: CellObject<string>) => {
    console.log("compile=>", { th });
    const res = mapObject(this.proxy, th, (k, v, cell) => {
      console.log({ k, v, cell });
      if (typeof v === "boolean") return v ? "dark" : "light";
      const [sty, ...r] = v.split(":");
      if ("act" === k)
        // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
        return { style: `color: ${r[0]}`, value: r[0] };
      let val: CompiledThemeValue;
      const prop = map_css_theme[k][sty];
      switch (sty) {
        case "color":
          val = { style: `${prop}: ${r[0]};`, value: r[0] };
          break;
        case "img": {
          const url = `${r[0]}:${r[1]}`;
          val = { style: `${prop}: url("${url}");`, value: url };
          break;
        }
        case "grad":
          val = {
            style: `${prop}: linear-gradient(${r[2]}deg,${r[0]},${r[1]});`,
            value: [r[2], r[0], r[1]]
          };
          break;
      }
      // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
      return val;
    });
    console.log("compile=>", { res, resvalue: res.value });
    return res;

    // return Object.entries(th).reduce((acc, [k, v]) => {
    //   // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
    //   if (v === undefined) return { ...acc, [k]: undefined };
    //   // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
    //   if (typeof v === "boolean") return { ...acc, [k]: v ? "dark" : "light" };
    //   const [sty, ...r] = v.split(":");
    //   if ("act" === k)
    //     // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
    //     return { ...acc, [k]: { style: `color: ${r[0]}`, value: r[0] } };

    //   let val: CompiledThemeValue;

    //   const prop = map_css_theme[k][sty];
    //   switch (sty) {
    //     case "color":
    //       val = { style: `${prop}: ${r[0]};`, value: r[0] };
    //       break;
    //     case "img": {
    //       const url = `${r[0]}:${r[1]}`;
    //       val = { style: `${prop}: url("${url}");`, value: url };
    //       break;
    //     }
    //     case "grad":
    //       val = {
    //         style: `${prop}: linear-gradient(${r[2]}deg,${r[0]},${r[1]});`,
    //         value: [r[2], r[0], r[1]]
    //       };
    //       break;
    //   }
    //   // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
    //   return { ...acc, [k]: val };
    // }, {} as CompiledTheme);
  };

  /**
   * apply applies a theme for a given component
   * @parts the part of the theme we want to apply on
   * @extras
   * @returns the applied styles as a string
   * @todo we probably want to just pass extra style (can pass value)
   */
  apply = (
    compiled: CompiledTheme,
    parts: ThemeParts[],
    extras: ThemeExtras[] = []
  ) => {
    // @todo reduceObject

    if (!compiled) return "";
    console.log({ compiled });
    const res = reduceObject(
      this.proxy,
      compiled,
      (acc, k, v, vc) => {
        console.log("reduceObject", { acc, k, v, parts, extras });
        if (
          k === "tx" &&
          parts.includes(ThemeText) &&
          !extras.includes(ThemeFocus)
        )
          return `${acc} ${v.style}`;
        if (k === "bt" && parts.includes(ThemeButton))
          return `${acc} ${v.style}`;
        if (k === "bg" && parts.includes(ThemeBackground))
          return `${acc} ${v.style}`;
        if (k === "bg" && extras.includes(ThemeBackgroundTransparent))
          return `${acc} background-color: transparent`;
        if (k === "act" && parts.includes(ThemeAccent)) {
          if (!extras.includes(ThemeFocus)) return acc;
          if (extras.includes(ThemeError)) return `${acc} color: #F43F5E`;

          return `${acc} ${v.style}`;
        }
        return acc;
      },
      ""
    );
    console.log("theme res", { res, resvalue: res.value });
    return res;
    // let s = "";
    // if (!compiled || !parts?.length) return s;
    // if (
    //   compiled?.tx &&
    //   parts.includes(ThemeText) &&
    //   !extras.includes(ThemeFocus)
    // )
    //   s = `${compiled.tx.style}`;
    // if (compiled?.bt && parts.includes(ThemeButton))
    //   s = `${s} ${compiled.bt.style}`;
    // if (compiled?.bg && parts.includes(ThemeBackground))
    //   s = `${s} ${compiled.bg.style}`;
    // if (compiled?.bg && extras.includes(ThemeBackgroundTransparent))
    //   s = `${s} background-color: transparent`;
    // if (compiled?.act && parts.includes(ThemeAccent)) {
    //   if (!extras.includes(ThemeFocus)) return s;
    //   let { style } = compiled.act;

    //   if (extras.includes(ThemeError)) style = "color: #F43F5E";

    //   s = `${s} ${style}`;
    // }
    // return s;
  };

  /**
   * dark returns the correct style based on theme dark mode and
   * browser level dark mode
   * @param th
   * @param wd represents the style of widget dark mode
   * @param nd represents the style of widget without dark mode
   * @param def represents style of default theme value without theme
   *
   * @returns
   */
  dark = <T extends string>(compiled: CompiledTheme, wd: T, nd: T, def: T) =>
    compiled ? (compiled?.dark === "dark" ? wd : nd) : def;

  getColor = (compiled: CompiledTheme, elt: ThemeParts) =>
    elt !== "dark" ? compiled?.[elt]?.value : undefined;
}

/**
 * map_css_theme maps short theme properties with their
 * allowed types and their given css properties
 */
export const map_css_theme = {
  [ThemeBackground]: {
    color: "background-color",
    img: "background-image",
    grad: "background"
  },
  [ThemeAccent]: {
    color: "color"
  },
  [ThemeButton]: {
    color: "background-color",
    grad: "background"
  },
  [ThemeText]: {
    color: "color"
  }
};

export const getColor = (thv: CompiledThemeValue) =>
  typeof thv.value === "string" && thv.value.startsWith("#")
    ? thv.value
    : Array.isArray(thv.value) && thv.value.length === 3
      ? thv.value[1]
      : null;
