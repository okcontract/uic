import type { ValueCell } from "@okcontract/cells";
import type { Writable } from "svelte/store";

export type TabComponent = {
  registerTab: (obj: Record<string, unknown>) => number;
  selectTab: (index: number, tab: Record<string, unknown>) => void;
  registerPanel: (panel: unknown) => void;
  selectedTab: ValueCell<unknown>;
  selectedPanel: Writable<unknown>;
};
