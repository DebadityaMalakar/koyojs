const ALLOWED_PROTOCOLS = new Set(["http:", "https:"]);

export function isURL(input: string): boolean {
  try {
    const url = new URL(input);
    return ALLOWED_PROTOCOLS.has(url.protocol);
  } catch {
    return false;
  }
}
