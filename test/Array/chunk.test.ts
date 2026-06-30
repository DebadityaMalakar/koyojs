import { describe, it, expect } from "vitest";
import { chunk } from "../../src/Array/chunk.js";

describe("chunk", () => {
  it("splits into equal-sized chunks", () => {
    expect(chunk([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]]);
  });
  it("last chunk contains remainder", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });
  it("chunk size larger than array returns single chunk", () => {
    expect(chunk([1, 2, 3], 10)).toEqual([[1, 2, 3]]);
  });
  it("returns empty array for empty input", () => {
    expect(chunk([], 3)).toEqual([]);
  });
  it("chunk size of 1 wraps each element", () => {
    expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
  });
  it("throws on size of 0", () => {
    expect(() => chunk([1, 2], 0)).toThrow(RangeError);
  });
  it("throws on negative size", () => {
    expect(() => chunk([1, 2], -1)).toThrow(RangeError);
  });
  it("throws on non-integer size", () => {
    expect(() => chunk([1, 2], 1.5)).toThrow(RangeError);
  });
});
