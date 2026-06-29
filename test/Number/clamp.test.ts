import { describe, it, expect } from "vitest";
import { clamp } from "../../src/Number/clamp.js";

describe("clamp", () => {
  it("returns value when within range", () => {
    expect(clamp(50, 0, 100)).toBe(50);
  });
  it("clamps to max when above range", () => {
    expect(clamp(150, 0, 100)).toBe(100);
  });
  it("clamps to min when below range", () => {
    expect(clamp(-10, 0, 100)).toBe(0);
  });
  it("returns value when equal to min", () => {
    expect(clamp(0, 0, 100)).toBe(0);
  });
  it("returns value when equal to max", () => {
    expect(clamp(100, 0, 100)).toBe(100);
  });
  it("works with negative ranges", () => {
    expect(clamp(-5, -10, -1)).toBe(-5);
  });
  it("throws when min > max", () => {
    expect(() => clamp(5, 10, 0)).toThrow(RangeError);
  });
});
