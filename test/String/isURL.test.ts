import { describe, it, expect } from "vitest";
import { isURL } from "../../src/String/isURL.js";

describe("isURL", () => {
  it("accepts http URL", () => {
    expect(isURL("http://example.com")).toBe(true);
  });
  it("accepts https URL", () => {
    expect(isURL("https://example.com/path?q=1")).toBe(true);
  });
  it("rejects ftp protocol", () => {
    expect(isURL("ftp://example.com")).toBe(false);
  });
  it("rejects plain string", () => {
    expect(isURL("not a url")).toBe(false);
  });
  it("rejects empty string", () => {
    expect(isURL("")).toBe(false);
  });
  it("rejects protocol-only", () => {
    expect(isURL("https://")).toBe(false);
  });
});
