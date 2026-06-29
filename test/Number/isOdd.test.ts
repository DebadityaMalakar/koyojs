import { describe, it, expect } from "vitest";
import { isOdd } from "../../src/Number/isOdd.js";

describe("isOdd", () => {
  it("returns true for odd number", () => {
    expect(isOdd(3)).toBe(true);
  });
  it("returns false for even number", () => {
    expect(isOdd(4)).toBe(false);
  });
  it("returns false for zero", () => {
    expect(isOdd(0)).toBe(false);
  });
  it("handles negative odd", () => {
    expect(isOdd(-3)).toBe(true);
  });
  it("handles negative even", () => {
    expect(isOdd(-2)).toBe(false);
  });
  it("throws on non-integer", () => {
    expect(() => isOdd(2.5)).toThrow(TypeError);
  });
});
