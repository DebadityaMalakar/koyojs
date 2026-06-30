export function cloneShallow<T>(value: T): T {
  return structuredClone(value);
}
