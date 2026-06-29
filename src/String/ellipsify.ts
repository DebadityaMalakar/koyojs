const ELLIPSIS = "...";

export function ellipsify(input: string, maxLength: number): string {
  if (maxLength < 0) throw new RangeError("maxLength must be >= 0");
  if (input.length <= maxLength) return input;

  // ensure the ellipsis itself fits
  const cutAt = Math.max(0, maxLength - ELLIPSIS.length);
  return input.slice(0, cutAt) + ELLIPSIS;
}
