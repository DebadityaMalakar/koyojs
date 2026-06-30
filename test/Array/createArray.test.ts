import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createArray } from "../../src/Array/createArray.js";

describe("createArray — strict: true (HomogenousArray)", () => {
  it("accepts elements matching the inferred type", () => {
    const arr = createArray<number>({ strict: true });
    arr.push(1, 2, 3);
    expect(arr.toArray()).toEqual([1, 2, 3]);
  });
  it("throws TypeError on type mismatch", () => {
    const arr = createArray<number>({ strict: true });
    arr.push(1);
    expect(() => arr.push("hello")).toThrow(TypeError);
  });
  it("does not add the mismatched element", () => {
    const arr = createArray<number>({ strict: true });
    arr.push(1);
    expect(() => arr.push("hello")).toThrow();
    expect(arr.length).toBe(1);
  });
  it("infers type from the first element", () => {
    const arr = createArray<string>({ strict: true });
    arr.push("hello");
    expect(() => arr.push(42)).toThrow(TypeError);
  });
  it("uses a custom validate function", () => {
    const arr = createArray<number>({
      strict: true,
      validate: (v): v is number => typeof v === "number" && (v as number) > 0,
    });
    arr.push(1, 2);
    expect(() => arr.push(-1)).toThrow(TypeError);
    expect(arr.length).toBe(2);
  });
});

describe("createArray — strict: false (warns)", () => {
  beforeEach(() => vi.spyOn(console, "warn").mockImplementation(() => {}));
  afterEach(() => vi.restoreAllMocks());

  it("warns on type mismatch instead of throwing", () => {
    const arr = createArray<number>({ strict: false });
    arr.push(1);
    arr.push("hello");
    expect(console.warn).toHaveBeenCalledOnce();
  });
  it("does not add the mismatched element", () => {
    const arr = createArray<number>({ strict: false });
    arr.push(1);
    arr.push("hello");
    expect(arr.length).toBe(1);
  });
});

describe("TypedArray interface", () => {
  it("length reflects element count", () => {
    const arr = createArray<number>({ strict: true });
    arr.push(1, 2, 3);
    expect(arr.length).toBe(3);
  });
  it("is iterable via spread", () => {
    const arr = createArray<number>({ strict: true });
    arr.push(1, 2, 3);
    expect([...arr]).toEqual([1, 2, 3]);
  });
  it("toArray returns an independent copy", () => {
    const arr = createArray<number>({ strict: true });
    arr.push(1, 2);
    const copy = arr.toArray();
    copy.push(99);
    expect(arr.length).toBe(2);
  });
  it("items is readonly", () => {
    const arr = createArray<number>({ strict: true });
    arr.push(1);
    expect(arr.items).toEqual([1]);
  });
});
