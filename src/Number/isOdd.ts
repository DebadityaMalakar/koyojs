import { isEven } from "./isEven.js";

export function isOdd(value: number): boolean {
  return !isEven(value);
}
