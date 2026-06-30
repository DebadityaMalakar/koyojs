import { describe, it, expect } from "vitest";
import { flatten } from "../../src/Array/flatten.js";

describe("flatten", () => {
  it("returns a flat array unchanged", () => {
    expect(flatten([1, 2, 3])).toEqual([1, 2, 3]);
  });
  it("flattens one level of nesting", () => {
    expect(flatten([1, [2, 3], 4])).toEqual([1, 2, 3, 4]);
  });
  it("flattens deeply nested arrays", () => {
    expect(flatten([1, [2, [3, [4]]]])).toEqual([1, 2, 3, 4]);
  });
  it("returns empty array unchanged", () => {
    expect(flatten([])).toEqual([]);
  });
  it("handles mixed depth nesting", () => {
    expect(flatten([[1], [2, [3]], 4])).toEqual([1, 2, 3, 4]);
  });
});
