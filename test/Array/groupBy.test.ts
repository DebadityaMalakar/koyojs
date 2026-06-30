import { describe, it, expect } from "vitest";
import { groupBy } from "../../src/Array/groupBy.js";

describe("groupBy", () => {
  const people = [
    { name: "Alice", role: "admin" },
    { name: "Bob", role: "user" },
    { name: "Carol", role: "admin" },
    { name: "Dave", role: "user" },
  ];

  it("groups objects by a string key", () => {
    const result = groupBy(people, (p) => p.role);
    expect(result["admin"]).toHaveLength(2);
    expect(result["user"]).toHaveLength(2);
  });
  it("preserves the grouped items", () => {
    const result = groupBy(people, (p) => p.role);
    expect(result["admin"]![0]!.name).toBe("Alice");
  });
  it("returns empty object for empty array", () => {
    expect(groupBy([], (x) => String(x))).toEqual({});
  });
  it("groups numbers by derived key", () => {
    const result = groupBy([1, 2, 3, 4, 5, 6], (n) => (n % 2 === 0 ? "even" : "odd"));
    expect(result["even"]).toEqual([2, 4, 6]);
    expect(result["odd"]).toEqual([1, 3, 5]);
  });
});
