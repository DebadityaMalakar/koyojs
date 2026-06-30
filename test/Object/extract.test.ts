import { describe, it, expect } from "vitest";
import { extract } from "../../src/Object/extract.js";

describe("extract", () => {
  const obj = { a: 1, b: { c: { d: 2 }, e: 3 }, f: 4 };

  it("extracts top-level keys", () => {
    expect(extract(obj, ["a", "f"])).toEqual({ a: 1, f: 4 });
  });
  it("extracts a nested path", () => {
    expect(extract(obj, ["b.c.d"])).toEqual({ b: { c: { d: 2 } } });
  });
  it("extracts mixed top-level and nested paths", () => {
    expect(extract(obj, ["a", "b.e"])).toEqual({ a: 1, b: { e: 3 } });
  });
  it("extracts multiple paths under the same parent", () => {
    expect(extract(obj, ["b.c", "b.e"])).toEqual({ b: { c: { d: 2 }, e: 3 } });
  });
  it("returns empty object for empty paths array", () => {
    expect(extract(obj, [])).toEqual({});
  });
  it("silently skips missing paths", () => {
    expect(extract(obj, ["x.y.z"])).toEqual({});
  });
  it("does not mutate the original object", () => {
    extract(obj, ["a", "b.c.d"]);
    expect(obj).toEqual({ a: 1, b: { c: { d: 2 }, e: 3 }, f: 4 });
  });
});
