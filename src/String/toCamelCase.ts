const WORD_BOUNDARY = /[\s\-_]+(.)/g;
const LEADING_BOUNDARY = /^[\s\-_]+/;

export function toCamelCase(input: string): string {
  return input
    .replace(LEADING_BOUNDARY, "")
    .toLowerCase()
    .replace(WORD_BOUNDARY, (_, char: string) => char.toUpperCase());
}
