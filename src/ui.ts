/**
 * textStyles is a the list of ui styles.
 */
export const textStyles = {
  primary: "text-primary",
  accent: "text-accent",
  secondary: "text-secondary",
  error: "text-error",
  success: "text-success",
  warning: "text-warning",
  info: "text-info"
};
export type TextStyle = keyof typeof textStyles;

/**
 * checkboxStyles are checkbox styles.
 */

export const checkboxStyles = {
  default: "checkbox",
  primary: "checkbox checkbox-primary",
  accent: "checkbox checkbox-accent",
  secondary: "checkbox checkbox-secondary",
  error: "checkbox checkbox-error",
  success: "checkbox checkbox-success",
  warning: "checkbox checkbox-warning",
  info: "checkbox checkbox-info"
};
export type CheckboxStyle = keyof typeof checkboxStyles;

export const checkboxSizes = {
  xs: "checkbox-xs",
  sm: "checkbox-sm",
  md: "checkbox-md",
  lg: "checkbox-lg"
};
export type CheckboxSize = keyof typeof checkboxSizes;

/**
 * buttonStyles is a the list of basic button color styles.
 */
export const buttonStyles = {
  default: "btn",
  neutral: "btn btn-neutral",
  primary: "btn btn-primary",
  accent: "btn btn-accent",
  secondary: "btn btn-secondary",
  error: "btn btn-error",
  success: "btn btn-success",
  warning: "btn btn-warning",
  info: "btn btn-info",
  ghost: "btn btn-ghost",
  link: "btn btn-link"
};
export type ButtonStyle = keyof typeof buttonStyles;

export const buttonSizes = {
  xs: "btn-xs",
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg"
};

export type ButtonSize = keyof typeof buttonSizes;
/**
 * InputStyles is a the list of basic input color styles.
 */
export const inputStyles = {
  default: "input",
  "default-ghost": "input input-ghost",
  bordered: "input input-bordered",
  "bordered-ghost": "input input-ghost"
};
export type InputStyle = keyof typeof inputStyles;

export const inputSizes = {
  xs: "input-xs",
  sm: "input-sm",
  md: "input-md",
  lg: "input-lg"
};
export type InputSize = keyof typeof inputSizes;

export const labelStyles = {
  default: "label-text",
  alt: "label-text-alt"
};
export type LabelStyle = keyof typeof labelStyles;

/**
 * FillStyle is a the list of basic fill and stroke color styles.
 */
export type FillStyle =
  | "current"
  | "primary"
  | "secondary"
  | "accent"
  | "error"
  | "success"
  | "warning"
  | "info";

/**
 * dropdownStyles is a the list of basic dropdown menu positions styles.
 */
export const dropdownStyles = {
  bottom: "dropdown-bottom",
  "bottom-end": "dropdown-bottom dropdown-end",
  top: "dropdown-top",
  "top-end": "dropdown-top dropdown-end",
  "top-left": "dropdown-left",
  "top-right": "dropdown-right",
  "bottom-left": "dropdown-left dropdown-end",
  "bottom-right": "dropdown-right dropdown-end"
};
export type DropdownStyle = keyof typeof dropdownStyles;

export const dropdownSizes = {
  sm: "w-64",
  md: "min-w-96",
  full: "w-full"
};
export type DropdownSize = keyof typeof dropdownSizes;

/**
 * tabStyles is a the list of basic dropdown menu positions styles.
 */
export const tabStyles = {
  default: "tabs",
  bordered: "tabs tabs-bordered",
  lifted: "tabs tabs-lifted",
  boxed: "tabs tabs-boxed"
};
export type TabStyle = keyof typeof tabStyles;

export const tabSizes = {
  sm: "tabs-sm",
  md: "tabs-md",
  lg: "tabs-lg"
};
export type TabSize = keyof typeof tabSizes;

export const tabMargins = {
  none: "",
  neg: "-mb-1",
  default: "mb-4"
};
export type TabMargin = keyof typeof tabMargins;

/**
 * tooltipPositions is list of tooltip positions styles
 */
export const tooltipPositions = {
  top: "tooltip-top",
  bottom: "tooltip-bottom",
  right: "tooltip-right",
  left: "tooltip-left"
};
export type TooltipPosition = keyof typeof tooltipPositions;

export const tooltipStyles = {
  default: "tooltip",
  primary: "tooltip tooltip-primary",
  accent: "tooltip tooltip-accent",
  secondary: "tooltip tooltip-secondary",
  error: "tooltip tooltip-error",
  success: "tooltip tooltip-success",
  warning: "tooltip tooltip-warning",
  info: "tooltip tooltip-info"
};
export type TooltipStyle = keyof typeof tooltipStyles;

export const rangeStyles = {
  neutral: "range",
  primary: "range range-primary",
  accent: "range range-accent",
  secondary: "range range-secondary",
  error: "range range-error",
  success: "range range-success",
  warning: "range range-warning",
  info: "range range-info"
};
export type RangeStyle = keyof typeof rangeStyles;

export const rangeSizes = {
  xs: "range-xs",
  sm: "range-sm",
  md: "range-md",
  lg: "range-lg"
};
export type RangeSize = keyof typeof rangeSizes;
