import { describe, it, expect } from "vitest";
import { isPhoneNumber } from "../../src/String/isPhoneNumber.js";

describe("isPhoneNumber", () => {
  it("accepts E.164 format", () => {
    expect(isPhoneNumber("+14155552671")).toBe(true);
  });
  it("accepts formatted North American number", () => {
    expect(isPhoneNumber("(415) 555-2671")).toBe(true);
  });
  it("accepts digits with dots", () => {
    expect(isPhoneNumber("415.555.2671")).toBe(true);
  });
  it("rejects too few digits", () => {
    expect(isPhoneNumber("12345")).toBe(false);
  });
  it("rejects letters", () => {
    expect(isPhoneNumber("abc-def-ghij")).toBe(false);
  });
  it("rejects empty string", () => {
    expect(isPhoneNumber("")).toBe(false);
  });
});
