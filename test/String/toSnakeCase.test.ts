import { describe, it, expect } from "vitest";
import { toSnakeCase } from "../../src/String/toSnakeCase.js";

describe("toSnakeCase", () => {
  it("converts space-separated words", () => {
    expect(toSnakeCase("hello world")).toBe("hello_world");
  });
  it("converts camelCase", () => {
    expect(toSnakeCase("helloWorld")).toBe("hello_world");
  });
  it("converts kebab-case", () => {
    expect(toSnakeCase("hello-world")).toBe("hello_world");
  });
  it("collapses repeated separators", () => {
    expect(toSnakeCase("hello  world")).toBe("hello_world");
  });
  it("lowercases result", () => {
    expect(toSnakeCase("HelloWorld")).toBe("hello_world");
  });
  it("returns empty string unchanged", () => {
    expect(toSnakeCase("")).toBe("");
  });
});
