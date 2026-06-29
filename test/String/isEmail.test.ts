import { describe, it, expect } from "vitest";
import { isEmail } from "../../src/String/isEmail.js";

describe("isEmail", () => {
  it("accepts a valid email", () => {
    expect(isEmail("user@example.com")).toBe(true);
  });
  it("accepts subdomain email", () => {
    expect(isEmail("user@mail.example.co.uk")).toBe(true);
  });
  it("rejects missing @", () => {
    expect(isEmail("userexample.com")).toBe(false);
  });
  it("rejects missing TLD", () => {
    expect(isEmail("user@example")).toBe(false);
  });
  it("rejects with spaces", () => {
    expect(isEmail("user @example.com")).toBe(false);
  });
  it("rejects empty string", () => {
    expect(isEmail("")).toBe(false);
  });
});
