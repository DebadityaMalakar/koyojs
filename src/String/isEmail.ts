// RFC 5321 practical limit: 64 local + 1 @ + 255 domain = 320
const MAX_LENGTH = 320;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isEmail(input: string): boolean {
  if (input.length > MAX_LENGTH) return false;
  return EMAIL.test(input);
}
