const WORD = /\S+/g;

export function toTitleCase(input: string): string {
  return input.replace(WORD, (word) =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
}
