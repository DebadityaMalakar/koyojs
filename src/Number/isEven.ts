export function isEven(value: number): boolean {
  if (!Number.isInteger(value)) throw new TypeError("value must be an integer");
  return value % 2 === 0;
}
