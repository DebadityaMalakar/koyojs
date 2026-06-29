# Koyo JS

**Koyo** (肝要, Japanese: *essential*) — a zero-dependency utility library for TypeScript and JavaScript. `v0.1.1`

Ships as ESM, CJS, and a native Bun build. Fully typed. Works the same in Node, Bun, browsers, and edge runtimes.

## Why

JavaScript has no proper standard library. The language ships with primitives and leaves everything else to the ecosystem — which sounds fine until you realize that the same operation can behave differently depending on where your code runs. A regex that works in Node may not behave the same in a browser. A built-in that exists in one runtime is missing in another. The environment shouldn't be your problem.

The npm ecosystem filled this gap, but fragility came with it. In 2016, the deletion of `left-pad` — a utility so small it fit in a tweet, maintained by a single unpaid developer — broke thousands of builds overnight and took much of the internet with it. The library wasn't bad code; it was a dependency that the ecosystem had quietly made load-bearing, written by someone who owed it nothing and received nothing in return.

Koyo exists because these essentials shouldn't live at the mercy of a single maintainer's patience or a registry's availability. It provides a stable, self-contained set of utilities that work the same whether your code runs in a browser, Node, Bun, or a serverless edge function — no dependencies, no surprises, no single point of failure.

---

## Install

```bash
# npm / pnpm / yarn
npm install koyojs

# bun
bun add koyojs
```

---

## Usage

```ts
import { slugify, clamp, isEmail } from "koyojs";

slugify("Hello World!");   // "hello-world"
clamp(150, 0, 100);        // 100
isEmail("x@example.com"); // true
```

You can also import from a specific module:

```ts
import { toCamelCase } from "koyojs/String";
import { randomInt }   from "koyojs/Number";
```

---

## API

### String

| Function | Signature | Description |
|---|---|---|
| `capitalize` | `(input: string) => string` | Capitalize the first letter. |
| `toCamelCase` | `(input: string) => string` | `"hello world"` → `"helloWorld"` |
| `toSnakeCase` | `(input: string) => string` | `"helloWorld"` → `"hello_world"` |
| `toTitleCase` | `(input: string) => string` | `"hello world"` → `"Hello World"` |
| `truncate` | `(input: string, maxLength: number) => string` | Cut string to `maxLength`. |
| `ellipsify` | `(input: string, maxLength: number) => string` | Truncate to `maxLength` total (including the `"..."`). e.g. `ellipsify("Hello World", 5)` → `"He..."` |
| `slugify` | `(input: string) => string` | `"Hello World!"` → `"hello-world"` |
| `isEmail` | `(input: string) => boolean` | Validate an email address. |
| `isURL` | `(input: string) => boolean` | Validate an HTTP/HTTPS URL. |
| `isPhoneNumber` | `(input: string) => boolean` | Validate a phone number (E.164 + common formats). |

### Number

| Function | Signature | Description |
|---|---|---|
| `clamp` | `(value, min, max: number) => number` | Restrict a value to `[min, max]`. |
| `randomInt` | `(min, max: number) => number` | Random integer in `[min, max]` (inclusive). |
| `sum` | `(values: number[]) => number` | Sum an array of numbers. |
| `average` | `(values: number[]) => number` | Average an array of numbers. |
| `isEven` | `(value: number) => boolean` | `true` if the integer is even. |
| `isOdd` | `(value: number) => boolean` | `true` if the integer is odd. |

---

## Development

```bash
bun install       # install dependencies
bun run build     # compile to dist/
bun run test      # run all tests
bun run check     # type-check without emitting
bun run dev       # watch mode
```

---

## Philosophy

One file, one function. Every module lives under `src/<Category>/<functionName>.ts` and does exactly one thing. No file exceeds 60 lines unless strictly necessary.

---

## Source

The repository is mirrored on two platforms — clone from whichever you prefer:

```bash
# GitHub
git clone https://github.com/DebadityaMalakar/koyojs.git

# Codeberg
git clone https://codeberg.org/debaditya/koyojs.git
```

---

## License

MIT
