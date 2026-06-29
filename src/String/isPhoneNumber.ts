// Accepts E.164, North American, and common formatted variants.
// Strips formatting chars then validates digit count (7–15 per ITU-T E.164).
const STRIP = /[\s\.\-\(\)]/g;
const DIGITS_ONLY = /^\+?[0-9]{7,15}$/;

export function isPhoneNumber(input: string): boolean {
  return DIGITS_ONLY.test(input.replace(STRIP, ""));
}
