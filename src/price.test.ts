import { describe, expect, it } from "vitest";

import { formatCurrency } from "./price";

describe("formatCurrency", () => {
  it("formats large numbers with billions correctly", () => {
    expect(formatCurrency(3145000000)).toBe("$3.145bn");
    expect(formatCurrency(3145000000, "EUR")).toBe("€3.145bn");
  });

  it("formats numbers in the millions correctly", () => {
    expect(formatCurrency(796858456)).toBe("$796,858,456");
  });

  it("formats very small numbers with custom subscript notation", () => {
    expect(formatCurrency(0.001)).toBe("$0.001");
    expect(formatCurrency(0.001, "GBP")).toBe("£0.001");
    expect(formatCurrency(0.001, "EUR")).toBe("€0.001");
    expect(formatCurrency(0.000000034)).toBe("$0.0₈340");
    expect(formatCurrency(0.00000000034)).toBe("$0.0₁₀340");
  });

  it('returns "$0" for zero', () => {
    expect(formatCurrency(0)).toBe("$0");
  });

  it("formats negative small numbers correctly", () => {
    expect(formatCurrency(-0.000000034)).toBe("-$0.0₈340");
  });

  it("formats numbers between 1 and 1 billion correctly", () => {
    expect(formatCurrency(123456789)).toBe("$123,456,789");
  });
});
