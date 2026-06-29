import { describe, it, expect } from "vitest";
import { sum } from "../../src/Number/sum.js";

describe("sum", () => {
  it("sums an array of positive numbers", () => {
    expect(sum([1, 2, 3, 4])).toBe(10);
  });
  it("returns 0 for an empty array", () => {
    expect(sum([])).toBe(0);
  });
  it("handles negative numbers", () => {
    expect(sum([-1, -2, 3])).toBe(0);
  });
  it("handles a single element", () => {
    expect(sum([42])).toBe(42);
  });
  it("handles floating point values", () => {
    expect(sum([0.1, 0.2])).toBeCloseTo(0.3);
  });
});
