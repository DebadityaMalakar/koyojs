export function exclude<T extends object>(obj: T, paths: string[]): Record<string, unknown> {
  const topLevel = new Set<string>();
  const nested = new Map<string, string[]>();

  for (const path of paths) {
    const dot = path.indexOf(".");
    if (dot === -1) {
      topLevel.add(path);
    } else {
      const head = path.slice(0, dot);
      const tail = path.slice(dot + 1);
      if (!nested.has(head)) nested.set(head, []);
      nested.get(head)!.push(tail);
    }
  }

  const result: Record<string, unknown> = {};
  for (const key of Object.keys(obj)) {
    if (topLevel.has(key)) continue;
    const val = (obj as Record<string, unknown>)[key];
    if (nested.has(key) && val !== null && typeof val === "object") {
      result[key] = exclude(val as object, nested.get(key)!);
    } else {
      result[key] = val;
    }
  }
  return result;
}
