import { describe, it, expect } from "vitest";
import { omit } from "../../src/Object/omit.js";

describe("omit", () => {
  const obj = { a: 1, b: 2, c: 3, d: 4 };

  it("excludes the specified keys", () => {
    expect(omit(obj, ["b", "d"])).toEqual({ a: 1, c: 3 });
  });
  it("returns full object when no keys omitted", () => {
    expect(omit(obj, [])).toEqual(obj);
  });
  it("returns empty object when all keys omitted", () => {
    expect(omit(obj, ["a", "b", "c", "d"])).toEqual({});
  });
  it("does not mutate the original object", () => {
    omit(obj, ["a"]);
    expect(obj).toEqual({ a: 1, b: 2, c: 3, d: 4 });
  });
});
