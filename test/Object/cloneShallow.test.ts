import { describe, it, expect } from "vitest";
import { cloneShallow } from "../../src/Object/cloneShallow.js";

describe("cloneShallow", () => {
  it("clones a primitive value", () => {
    expect(cloneShallow(42)).toBe(42);
  });
  it("clones a flat object", () => {
    const obj = { a: 1, b: "hello" };
    const clone = cloneShallow(obj);
    expect(clone).toEqual(obj);
    expect(clone).not.toBe(obj);
  });
  it("clones a nested object with no shared references", () => {
    const obj = { a: { b: { c: 1 } } };
    const clone = cloneShallow(obj);
    clone.a.b.c = 99;
    expect(obj.a.b.c).toBe(1);
  });
  it("clones an array", () => {
    const arr = [1, [2, [3]]];
    const clone = cloneShallow(arr);
    expect(clone).toEqual(arr);
    expect(clone).not.toBe(arr);
  });
  it("clones a Date", () => {
    const date = new Date("2026-01-01");
    const clone = cloneShallow(date);
    expect(clone).toEqual(date);
    expect(clone).not.toBe(date);
  });
  it("throws on non-serializable values (functions)", () => {
    expect(() => cloneShallow(() => 1)).toThrow();
  });
  it("drops prototype on class instances", () => {
    class Foo { x = 1; }
    const clone = cloneShallow(new Foo());
    expect(clone).not.toBeInstanceOf(Foo);
  });
});
