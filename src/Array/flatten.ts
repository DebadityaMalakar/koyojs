export function flatten<T>(arr: unknown[]): T[] {
  const result: T[] = [];
  for (const item of arr) {
    if (Array.isArray(item)) result.push(...flatten<T>(item));
    else result.push(item as T);
  }
  return result;
}
