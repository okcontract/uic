import type { AnyCell } from "@okcontract/cells";

export const ThemeText = "tx";
export const ThemeButton = "bt";
export const ThemeBackground = "bg";
export const ThemeAccent = "act";
export const ThemeDark = "dark";

/**
 * ThemeProperty
 */
export type ThemeProperty = {
  key: AnyCell<ThemeElement>;
  allowed: AnyCell<ThemeElementType[]>;
  sty: AnyCell<SThemeElementType>;
} & ThemeImage &
  ThemeGradient &
  ThemeSolidColor;

type SThemeElementType = "color" | "img" | "grad";
export type ThemeElementType = "Color" | "Image" | "Gradient";
type ThemeImage = {
  img?: AnyCell<`ipfs://${string}`>;
};
type ThemeGradient = {
  col1?: AnyCell<string>;
  col2?: AnyCell<string>;
  deg?: AnyCell<number>;
};
type ThemeSolidColor = {
  col?: AnyCell<string>;
};
type ThemeDarkProperty = {
  key?: AnyCell<string>;
  enabled?: AnyCell<boolean>;
};
type ThemeAccentProperty = ThemeSolidColor;
type ThemeTextProperty = ThemeSolidColor;
type ThemeButtonProperty = ThemeProperty;
type ThemeBackgroundProperty = ThemeProperty;

/**
 * Built ThemeDefinition defines a theme.
 */
export type ThemeDefinition = {
  // dark mode (for all text)
  // computed automatically if not present
  dark: AnyCell<ThemeDarkProperty>;
  // optional accent color for components, etc.
  // otherwise: depends on dark
  [ThemeAccent]?: AnyCell<ThemeAccentProperty>;
  // background (color, gradient, image)
  [ThemeBackground]: AnyCell<ThemeButtonProperty>;
  // optional button theme (color, gradient, image)
  [ThemeButton]?: AnyCell<ThemeBackgroundProperty>;
  // optional text effect color
  [ThemeText]?: AnyCell<ThemeTextProperty>;
  // TODO: add optional font
  font?: AnyCell<string>;
};

/**
 * Raw stored ThemeDefinition.
 */
export type RawThemeDefinition = {
  [ThemeAccent]?: string;
  [ThemeBackground]: string;
  [ThemeButton]?: string;
  [ThemeText]?: string;
  dark: boolean;
};

type ThemeElement = "Dark mode" | "Background" | "Accent" | "Button" | "Text";

/**
 * CompiledTheme defines the whole compiled theme with its css
 * properties for each elements
 */
export type CompiledTheme = {
  [ThemeAccent]: CompiledThemeValue;
  [ThemeBackground]: CompiledThemeValue;
  [ThemeButton]: CompiledThemeValue;
  [ThemeText]: CompiledThemeValue;
} & { dark: ColorScheme };

type ColorScheme = "light" | "dark";
export type CompiledThemeValue = {
  style: string;
  value: unknown;
};

export type ThemeParts =
  | typeof ThemeText
  | typeof ThemeButton
  | typeof ThemeBackground
  | typeof ThemeAccent
  | typeof ThemeDark;

export const ThemeBackgroundTransparent = "bgt";
export const ThemeFocus = "focus";
export const ThemeError = "error";

export type ThemeExtras =
  | typeof ThemeBackgroundTransparent
  | typeof ThemeFocus
  | typeof ThemeError;
