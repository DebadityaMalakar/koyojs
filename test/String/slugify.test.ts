import { describe, it, expect } from "vitest";
import { slugify } from "../../src/String/slugify.js";

describe("slugify", () => {
  it("converts to lowercase with hyphens", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });
  it("strips special characters", () => {
    expect(slugify("Hello World!")).toBe("hello-world");
  });
  it("collapses multiple spaces", () => {
    expect(slugify("hello  world")).toBe("hello-world");
  });
  it("strips accents", () => {
    expect(slugify("café au lait")).toBe("cafe-au-lait");
  });
  it("strips leading and trailing hyphens", () => {
    expect(slugify("!hello world!")).toBe("hello-world");
  });
  it("returns empty string for all-special input", () => {
    expect(slugify("!!!")).toBe("");
  });
});
