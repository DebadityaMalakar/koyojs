import { describe, it, expect } from "vitest";
import { pick } from "../../src/Object/pick.js";

describe("pick", () => {
  const obj = { a: 1, b: 2, c: 3, d: 4 };

  it("returns only the selected keys", () => {
    expect(pick(obj, ["a", "c"])).toEqual({ a: 1, c: 3 });
  });
  it("returns all keys when all are selected", () => {
    expect(pick(obj, ["a", "b", "c", "d"])).toEqual(obj);
  });
  it("returns empty object when no keys selected", () => {
    expect(pick(obj, [])).toEqual({});
  });
  it("does not mutate the original object", () => {
    pick(obj, ["a"]);
    expect(obj).toEqual({ a: 1, b: 2, c: 3, d: 4 });
  });
  it("handles nested values by reference", () => {
    const nested = { x: { y: 1 }, z: 2 };
    const result = pick(nested, ["x"]);
    expect(result.x).toBe(nested.x);
  });
});
