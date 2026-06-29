import { describe, it, expect } from "vitest";
import { randomInt } from "../../src/Number/randomInt.js";

describe("randomInt", () => {
  it("returns a value within [min, max]", () => {
    for (let i = 0; i < 100; i++) {
      const n = randomInt(1, 10);
      expect(n).toBeGreaterThanOrEqual(1);
      expect(n).toBeLessThanOrEqual(10);
    }
  });
  it("returns the only possible value when min === max", () => {
    expect(randomInt(5, 5)).toBe(5);
  });
  it("always returns an integer", () => {
    for (let i = 0; i < 50; i++) {
      expect(Number.isInteger(randomInt(0, 1000))).toBe(true);
    }
  });
  it("throws when min > max", () => {
    expect(() => randomInt(10, 5)).toThrow(RangeError);
  });
  it("throws on non-integer min", () => {
    expect(() => randomInt(1.5, 10)).toThrow(TypeError);
  });
  it("throws on non-integer max", () => {
    expect(() => randomInt(1, 10.5)).toThrow(TypeError);
  });
});
