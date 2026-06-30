import { describe, it, expect } from "vitest";
import { cloneDeep } from "../../src/Object/cloneDeep.js";

describe("cloneDeep", () => {
  it("clones a primitive value", () => {
    expect(cloneDeep(42)).toBe(42);
  });
  it("passes functions through by reference", () => {
    const fn = () => 1;
    expect(cloneDeep(fn)).toBe(fn);
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
  it("clones a Date", () => {
    const date = new Date("2026-01-01");
    const clone = cloneDeep(date);
    expect(clone).toEqual(date);
    expect(clone).not.toBe(date);
  });
  it("clones a RegExp", () => {
    const re = /foo/gi;
    const clone = cloneDeep(re);
    expect(clone.source).toBe(re.source);
    expect(clone.flags).toBe(re.flags);
    expect(clone).not.toBe(re);
  });
  it("clones a Map", () => {
    const map = new Map([["a", { x: 1 }]]);
    const clone = cloneDeep(map);
    expect(clone).toEqual(map);
    expect(clone).not.toBe(map);
    expect(clone.get("a")).not.toBe(map.get("a"));
  });
  it("clones a Set", () => {
    const set = new Set([{ x: 1 }, { x: 2 }]);
    const clone = cloneDeep(set);
    expect(clone.size).toBe(set.size);
    expect(clone).not.toBe(set);
  });
  it("preserves prototype", () => {
    class Point { constructor(public x: number, public y: number) {} move() { return this.x + this.y; } }
    const p = new Point(1, 2);
    const clone = cloneDeep(p);
    expect(clone).toBeInstanceOf(Point);
    expect(clone.move()).toBe(3);
    expect(clone).not.toBe(p);
  });
  it("handles circular references", () => {
    const obj: Record<string, unknown> = { a: 1 };
    obj.self = obj;
    const clone = cloneDeep(obj) as typeof obj;
    expect(clone.self).toBe(clone);
  });
  it("preserves getters as getters", () => {
    const obj = Object.defineProperty({} as { x: number }, "x", {
      get() { return 42; },
      enumerable: true,
      configurable: true,
    });
    const clone = cloneDeep(obj);
    const desc = Object.getOwnPropertyDescriptor(clone, "x")!;
    expect(typeof desc.get).toBe("function");
    expect(clone.x).toBe(42);
  });
});
