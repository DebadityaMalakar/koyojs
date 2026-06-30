export interface TypedArrayOptions<T> {
  strict: boolean;
  validate?: (value: unknown) => value is T;
}

export class TypedArray<T> {
  readonly strict: boolean;
  private _items: T[] = [];
  private _type: string | null = null;
  private readonly _validate: ((v: unknown) => v is T) | null;

  constructor(options: TypedArrayOptions<T>) {
    this.strict = options.strict;
    this._validate = options.validate ?? null;
  }

  push(...values: unknown[]): this {
    for (const value of values) {
      if (this._accepts(value)) this._items.push(value as T);
    }
    return this;
  }

  get length(): number { return this._items.length; }
  get items(): readonly T[] { return this._items; }
  toArray(): T[] { return [...this._items]; }
  [Symbol.iterator](): Iterator<T> { return this._items[Symbol.iterator](); }

  private _accepts(value: unknown): boolean {
    const type = typeof value;
    const valid = this._validate
      ? this._validate(value)
      : this._type === null || type === this._type;

    if (!this._validate && this._type === null) this._type = type;

    if (!valid) {
      const msg = `[KoyoJS] Type mismatch: expected ${this._type ?? "unknown"}, received ${type}`;
      if (this.strict) throw new TypeError(msg);
      console.warn(msg);
    }
    return valid;
  }
}

export function createArray<T>(options: TypedArrayOptions<T>): TypedArray<T> {
  return new TypedArray<T>(options);
}
