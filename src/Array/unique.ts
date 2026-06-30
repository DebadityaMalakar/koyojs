export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

export const removeDuplicates = unique;
