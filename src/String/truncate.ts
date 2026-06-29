export function truncate(input: string, maxLength: number): string {
  if (maxLength < 0) throw new RangeError("maxLength must be >= 0");
  if (input.length <= maxLength) return input;
  return input.slice(0, maxLength);
}
