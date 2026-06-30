import { describe, it, expect } from "vitest";
import { exclude } from "../../src/Object/exclude.js";

describe("exclude", () => {
  const obj = { a: 1, b: { c: { d: 2 }, e: 3 }, f: 4 };

  it("excludes top-level keys", () => {
    expect(exclude(obj, ["a", "f"])).toEqual({ b: { c: { d: 2 }, e: 3 } });
  });
  it("excludes a nested path, leaving siblings intact", () => {
    expect(exclude(obj, ["b.c.d"])).toEqual({ a: 1, b: { c: {}, e: 3 }, f: 4 });
  });
  it("excludes a nested key, leaving its parent intact", () => {
    expect(exclude(obj, ["b.e"])).toEqual({ a: 1, b: { c: { d: 2 } }, f: 4 });
  });
  it("excludes mixed top-level and nested paths", () => {
    expect(exclude(obj, ["a", "b.c"])).toEqual({ b: { e: 3 }, f: 4 });
  });
  it("returns full object when paths array is empty", () => {
    expect(exclude(obj, [])).toEqual(obj);
  });
  it("silently skips missing paths", () => {
    expect(exclude(obj, ["x.y.z"])).toEqual(obj);
  });
  it("does not mutate the original object", () => {
    exclude(obj, ["a", "b.c.d"]);
    expect(obj).toEqual({ a: 1, b: { c: { d: 2 }, e: 3 }, f: 4 });
  });
});
