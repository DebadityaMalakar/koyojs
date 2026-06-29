import { describe, it, expect } from "vitest";
import { ellipsify } from "../../src/String/ellipsify.js";

describe("ellipsify", () => {
  it("returns string as-is when within limit", () => {
    expect(ellipsify("hello", 10)).toBe("hello");
  });
  it("appends ellipsis when over limit", () => {
    expect(ellipsify("hello world", 8)).toBe("hello...");
  });
  it("handles maxLength equal to string length", () => {
    expect(ellipsify("hello", 5)).toBe("hello");
  });
  it("returns only ellipsis when maxLength is 3", () => {
    expect(ellipsify("hello", 3)).toBe("...");
  });
  it("returns full ellipsis even when maxLength < 3 (minimum truncation signal)", () => {
    expect(ellipsify("hello", 2)).toBe("...");
  });
  it("throws on negative maxLength", () => {
    expect(() => ellipsify("hello", -1)).toThrow(RangeError);
  });
});
