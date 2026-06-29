import { describe, it, expect } from "vitest";
import { capitalize } from "../../src/String/capitalize.js";

describe("capitalize", () => {
  it("capitalizes the first letter", () => {
    expect(capitalize("hello")).toBe("Hello");
  });
  it("does not alter the rest of the string", () => {
    expect(capitalize("hELLO")).toBe("HELLO");
  });
  it("handles single character", () => {
    expect(capitalize("a")).toBe("A");
  });
  it("returns empty string unchanged", () => {
    expect(capitalize("")).toBe("");
  });
  it("handles already-capitalized string", () => {
    expect(capitalize("Hello")).toBe("Hello");
  });
});
