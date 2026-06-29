import { describe, it, expect } from "vitest";
import { toTitleCase } from "../../src/String/toTitleCase.js";

describe("toTitleCase", () => {
  it("capitalizes each word", () => {
    expect(toTitleCase("hello world")).toBe("Hello World");
  });
  it("lowercases non-leading letters", () => {
    expect(toTitleCase("HELLO WORLD")).toBe("Hello World");
  });
  it("handles single word", () => {
    expect(toTitleCase("hello")).toBe("Hello");
  });
  it("returns empty string unchanged", () => {
    expect(toTitleCase("")).toBe("");
  });
});
