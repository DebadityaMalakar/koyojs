import { describe, it, expect } from "vitest";
import { unique, removeDuplicates } from "../../src/Array/unique.js";

describe("unique", () => {
  it("removes duplicate numbers", () => {
    expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
  });
  it("removes duplicate strings", () => {
    expect(unique(["a", "b", "a", "c"])).toEqual(["a", "b", "c"]);
  });
  it("returns empty array unchanged", () => {
    expect(unique([])).toEqual([]);
  });
  it("returns array with no duplicates unchanged", () => {
    expect(unique([1, 2, 3])).toEqual([1, 2, 3]);
  });
  it("preserves insertion order", () => {
    expect(unique([3, 1, 2, 1, 3])).toEqual([3, 1, 2]);
  });
});

describe("removeDuplicates", () => {
  it("is an alias for unique", () => {
    expect(removeDuplicates([1, 1, 2])).toEqual(unique([1, 1, 2]));
  });
});
