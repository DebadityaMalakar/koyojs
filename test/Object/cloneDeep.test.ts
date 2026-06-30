import { describe, it, expect } from "vitest";
import { cloneDeep } from "../../src/Object/cloneDeep.js";

describe("cloneDeep", () => {
  it("clones a primitive value", () => {
    expect(cloneDeep(42)).toBe(42);
  });
  it("clones a flat object", () => {
    const obj = { a: 1, b: "hello" };
    const clone = cloneDeep(obj);
    expect(clone).toEqual(obj);
    expect(clone).not.toBe(obj);
  });
  it("clones a nested object with no shared references", () => {
    const obj = { a: { b: { c: 1 } } };
    const clone = cloneDeep(obj);
    clone.a.b.c = 99;
    expect(obj.a.b.c).toBe(1);
  });
  it("clones an array", () => {
    const arr = [1, [2, [3]]];
    const clone = cloneDeep(arr);
    expect(clone).toEqual(arr);
    expect(clone).not.toBe(arr);
  });
  it("clones a Date object", () => {
    const date = new Date("2026-01-01");
    const clone = cloneDeep(date);
    expect(clone).toEqual(date);
    expect(clone).not.toBe(date);
  });
});
