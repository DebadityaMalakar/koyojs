import { sum } from "./sum.js";

export function average(values: number[]): number {
  if (values.length === 0) throw new RangeError("Cannot average an empty array");
  return sum(values) / values.length;
}
