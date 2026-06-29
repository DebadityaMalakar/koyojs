import { describe, it, expect } from "vitest";
import { truncate } from "../../src/String/truncate.js";

describe("truncate", () => {
  it("returns string as-is when within limit", () => {
    expect(truncate("hello", 10)).toBe("hello");
  });
  it("cuts at maxLength", () => {
    expect(truncate("hello world", 5)).toBe("hello");
  });
  it("returns empty string when maxLength is 0", () => {
    expect(truncate("hello", 0)).toBe("");
  });
  it("exact length returns string unchanged", () => {
    expect(truncate("hello", 5)).toBe("hello");
  });
  it("throws on negative maxLength", () => {
    expect(() => truncate("hello", -1)).toThrow(RangeError);
  });
});
