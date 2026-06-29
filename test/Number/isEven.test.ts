import { describe, it, expect } from "vitest";
import { isEven } from "../../src/Number/isEven.js";

describe("isEven", () => {
  it("returns true for even number", () => {
    expect(isEven(4)).toBe(true);
  });
  it("returns false for odd number", () => {
    expect(isEven(3)).toBe(false);
  });
  it("returns true for zero", () => {
    expect(isEven(0)).toBe(true);
  });
  it("handles negative even", () => {
    expect(isEven(-2)).toBe(true);
  });
  it("handles negative odd", () => {
    expect(isEven(-3)).toBe(false);
  });
  it("throws on non-integer", () => {
    expect(() => isEven(1.5)).toThrow(TypeError);
  });
});
