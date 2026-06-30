export function toTitleCase(input: string): string {
  const len = input.length;
  if (len === 0) return input;
  let result = "";
  let wordStart = true;
  for (let i = 0; i < len; i++) {
    const ch = input.charAt(i);
    const c = input.charCodeAt(i);
    // space, tab, LF, CR, FF, VT
    if (c === 0x20 || c === 0x09 || c === 0x0a || c === 0x0d || c === 0x0c || c === 0x0b) {
      wordStart = true;
      result += ch;
    } else if (wordStart) {
      result += ch.toUpperCase();
      wordStart = false;
    } else {
      result += ch.toLowerCase();
    }
  }
  return result;
}
