import { describe, it, expect } from "vitest";
import { toCamelCase } from "../../src/String/toCamelCase.js";

describe("toCamelCase", () => {
  it("converts space-separated words", () => {
    expect(toCamelCase("hello world")).toBe("helloWorld");
  });
  it("converts kebab-case", () => {
    expect(toCamelCase("hello-world")).toBe("helloWorld");
  });
  it("converts snake_case", () => {
    expect(toCamelCase("hello_world")).toBe("helloWorld");
  });
  it("handles multiple separators", () => {
    expect(toCamelCase("one two-three_four")).toBe("oneTwoThreeFour");
  });
  it("lowercases leading uppercase", () => {
    expect(toCamelCase("Hello World")).toBe("helloWorld");
  });
  it("returns empty string unchanged", () => {
    expect(toCamelCase("")).toBe("");
  });
});
