import { getContext } from "svelte";

import {
  type SheetProxy,
  mapObject,
  type AnyCell,
  type CellObject,
  type MapCell,
  collector,
  type Cellified
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
    this.compiled = th ? this.compile(th) : null;
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

    if (!compiled) {
      return this.proxy.new("");
    }
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
      "",
      "theme.res"
    );
    console.log("theme res", { res, resvalue: res.value });
    return res;
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
  dark = <T extends string>(
    compiled: Cellified<CompiledTheme>,
    wd: T,
    nd: T,
    def: T
  ) => {
    if (!compiled) return this.proxy.new(def);
    return reduceObject(
      this.proxy,
      compiled,
      (acc, k, v) => {
        if (k === "dark" && v === "dark") return wd;
        return nd;
      },
      def
    );
  };
  // compiled ? (compiled?.dark === "dark" ? wd : nd) : def;

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

/**
 * reduceObject applies the reducer function `fn` for each
 * element in `obj`, starting from `init` value.
 */
export const reduceObject = <T, R, NF extends boolean = false>(
  proxy: SheetProxy,
  obj: CellObject<T>,
  fn: (
    acc: R,
    key: string,
    value: T,
    cell?: AnyCell<T>,
    index?: number
  ) => R | Promise<R>,
  init: R,
  name = "reduceObject",
  nf?: NF
): MapCell<R, NF> => {
  const coll = collector<MapCell<R, NF>>(proxy);
  return proxy.mapNoPrevious(
    [obj],
    (cells) => {
      const keys = Object.keys(cells);
      const values = Object.values(cells);
      return coll(
        proxy.mapNoPrevious(
          values,
          (..._cells) =>
            _cells.reduce(
              (acc, _cell, i) => fn(acc, keys[i], _cell, values[i], i),
              init
            ),
          "_reduce"
        )
      );
    },
    name,
    nf
  );
};
