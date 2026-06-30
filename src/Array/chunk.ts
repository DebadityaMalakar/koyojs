export function chunk<T>(arr: T[], size: number): T[][] {
  if (!Number.isInteger(size) || size <= 0)
    throw new RangeError("size must be a positive integer");
  const len = arr.length;
  if (len === 0) return [];
  const chunkCount = Math.ceil(len / size);
  const result: T[][] = new Array(chunkCount);
  for (let i = 0; i < chunkCount; i++) {
    const start = i * size;
    const end = start + size < len ? start + size : len;
    const c: T[] = new Array(end - start);
    for (let j = 0; j < end - start; j++) {
      c[j] = arr[start + j]!;
    }
    result[i] = c;
  }
  return result;
}
