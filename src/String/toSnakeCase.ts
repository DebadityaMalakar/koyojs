const CAMEL_BOUNDARY = /([a-z])([A-Z])/g;
const WORD_BOUNDARY = /[\s\-]+/g;
const MULTI_UNDERSCORE = /_+/g;

export function toSnakeCase(input: string): string {
  return input
    .replace(CAMEL_BOUNDARY, "$1_$2")
    .replace(WORD_BOUNDARY, "_")
    .replace(MULTI_UNDERSCORE, "_")
    .toLowerCase();
}
