export function cloneDeep<T>(value: T, _seen = new WeakMap()): T {
  if (value === null || typeof value !== "object") return value;

  const obj = value as object;
  if (_seen.has(obj)) return _seen.get(obj) as T;

  if (value instanceof Date) {
    const d = new Date(value.getTime());
    _seen.set(obj, d);
    return d as T;
  }
  if (value instanceof RegExp) {
    const r = new RegExp(value.source, value.flags);
    _seen.set(obj, r);
    return r as T;
  }
  if (value instanceof Map) {
    const map = new Map();
    _seen.set(obj, map);
    for (const [k, v] of value) map.set(cloneDeep(k, _seen), cloneDeep(v, _seen));
    return map as T;
  }
  if (value instanceof Set) {
    const set = new Set();
    _seen.set(obj, set);
    for (const v of value) set.add(cloneDeep(v, _seen));
    return set as T;
  }
  if (Array.isArray(value)) {
    const arr: unknown[] = [];
    _seen.set(obj, arr);
    for (const item of value) arr.push(cloneDeep(item, _seen));
    return arr as T;
  }

  const clone = Object.create(Object.getPrototypeOf(obj));
  _seen.set(obj, clone);
  for (const key of Reflect.ownKeys(obj)) {
    const desc = Object.getOwnPropertyDescriptor(obj, key)!;
    if ("value" in desc) {
      Object.defineProperty(clone, key, { ...desc, value: cloneDeep(desc.value, _seen) });
    } else {
      Object.defineProperty(clone, key, desc);
    }
  }
  return clone as T;
}
