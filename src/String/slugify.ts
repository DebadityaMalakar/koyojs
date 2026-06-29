const NON_ALPHANUM = /[^a-z0-9\s\-]/g;
const WHITESPACE_OR_HYPHEN = /[\s\-]+/g;
const TRIM_HYPHEN = /^-+|-+$/g;
const COMBINING_DIACRITICS = /[̀-ͯ]/g;

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(COMBINING_DIACRITICS, "")
    .replace(NON_ALPHANUM, "")
    .replace(WHITESPACE_OR_HYPHEN, "-")
    .replace(TRIM_HYPHEN, "");
}
