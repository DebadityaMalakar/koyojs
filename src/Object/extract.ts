export function extract<T extends object>(obj: T, paths: string[]): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const path of paths) {
    const parts = path.split(".");
    let src: unknown = obj;
    let found = true;
    for (let i = 0; i < parts.length - 1; i++) {
      if (src == null || typeof src !== "object") { found = false; break; }
      src = (src as Record<string, unknown>)[parts[i]];
    }
    const last = parts[parts.length - 1];
    if (!found || src == null || typeof src !== "object" || !(last in (src as object))) continue;
    const value = (src as Record<string, unknown>)[last];
    let dst = result;
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!(part in dst)) dst[part] = {};
      dst = dst[part] as Record<string, unknown>;
    }
    dst[last] = value;
  }
  return result;
}
