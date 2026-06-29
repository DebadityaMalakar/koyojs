import { describe, it, expect } from "vitest";
import { average } from "../../src/Number/average.js";

describe("average", () => {
  it("averages an array of numbers", () => {
    expect(average([1, 2, 3, 4, 5])).toBe(3);
  });
  it("returns the value itself for a single element", () => {
    expect(average([7])).toBe(7);
  });
  it("handles negative numbers", () => {
    expect(average([-4, 0, 4])).toBe(0);
  });
  it("handles floating point values", () => {
    expect(average([0.1, 0.2, 0.3])).toBeCloseTo(0.2);
  });
  it("throws on empty array", () => {
    expect(() => average([])).toThrow(RangeError);
  });
});
