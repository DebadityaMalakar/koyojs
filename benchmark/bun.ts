import { bench, group, run } from "mitata";
import * as koyo from "../src/index.ts";
import _ from "lodash";
import * as R from "remeda";
import * as radash from "radash";

const NUMS = Array.from({ length: 1000 }, (_, i) => i + 1);
const STR_SNAKE = "hello_world_foo_bar";
const STR_CAMEL = "helloWorldFooBar";
const STR_SPACE = "hello world foo bar";
const STR_LONG = "The quick brown fox jumps over the lazy dog, repeatedly.";
const ARR_MIXED = Array.from({ length: 500 }, (_, i) => i % 3 === 0 ? [i, i + 1] : i);
const ARR_DUPES = Array.from({ length: 500 }, (_, i) => i % 50);
const OBJ = Object.fromEntries(Array.from({ length: 20 }, (_, i) => [`key${i}`, i]));
const PICK_KEYS = ["key0", "key1", "key2", "key5", "key10"] as const;
const OMIT_KEYS = ["key0", "key1", "key2", "key5", "key10"] as const;
const GROUP_ARR = Array.from({ length: 200 }, (_, i) => ({ type: `t${i % 5}`, val: i }));

group("average (1000 numbers)", () => {
  bench("koyojs", () => koyo.average(NUMS));
  bench("lodash _.mean", () => _.mean(NUMS));
  bench("remeda R.mean", () => R.mean(NUMS));
});

group("sum (1000 numbers)", () => {
  bench("koyojs", () => koyo.sum(NUMS));
  bench("lodash _.sum", () => _.sum(NUMS));
  bench("remeda R.sum", () => R.sum(NUMS));
  bench("radash sum", () => radash.sum(NUMS, (n) => n));
});

group("clamp", () => {
  bench("koyojs", () => koyo.clamp(150, 0, 100));
  bench("lodash _.clamp", () => _.clamp(150, 0, 100));
  bench("remeda R.clamp", () => R.clamp(150, { min: 0, max: 100 }));
  bench("js baseline", () => Math.min(Math.max(150, 0), 100));
});

group("capitalize", () => {
  bench("koyojs", () => koyo.capitalize("hello world"));
  bench("lodash _.capitalize", () => _.capitalize("hello world"));
  bench("js baseline", () => { const s = "hello world"; return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase(); });
});

group("toCamelCase", () => {
  bench("koyojs", () => koyo.toCamelCase(STR_SNAKE));
  bench("lodash _.camelCase", () => _.camelCase(STR_SNAKE));
  bench("remeda R.toCamelCase", () => R.toCamelCase(STR_SNAKE));
  bench("radash camel", () => radash.camel(STR_SNAKE));
});

group("toSnakeCase", () => {
  bench("koyojs", () => koyo.toSnakeCase(STR_CAMEL));
  bench("lodash _.snakeCase", () => _.snakeCase(STR_CAMEL));
  bench("remeda R.toSnakeCase", () => R.toSnakeCase(STR_CAMEL));
  bench("radash snake", () => radash.snake(STR_CAMEL));
});

group("toTitleCase", () => {
  bench("koyojs", () => koyo.toTitleCase(STR_SPACE));
  bench("lodash _.startCase", () => _.startCase(STR_SPACE));
  bench("radash title", () => radash.title(STR_SPACE));
  bench("js baseline", () => STR_SPACE.replace(/\b\w/g, (c) => c.toUpperCase()));
});

group("truncate / ellipsify (max 20 chars)", () => {
  bench("koyojs ellipsify", () => koyo.ellipsify(STR_LONG, 20));
  bench("koyojs truncate", () => koyo.truncate(STR_LONG, 20));
  bench("lodash _.truncate", () => _.truncate(STR_LONG, { length: 20 }));
  bench("js baseline", () => STR_LONG.length > 20 ? STR_LONG.slice(0, 17) + "..." : STR_LONG);
});

group("slugify", () => {
  bench("koyojs", () => koyo.slugify("Hello World! Foo Bar"));
  bench("lodash _.kebabCase", () => _.kebabCase("Hello World! Foo Bar"));
  bench("radash snake (closest)", () => radash.snake("Hello World! Foo Bar"));
  bench("js baseline", () => "Hello World! Foo Bar".toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
});

group("randomInt (0-1000)", () => {
  bench("koyojs", () => koyo.randomInt(0, 1000));
  bench("lodash _.random", () => _.random(0, 1000));
  bench("js baseline", () => Math.floor(Math.random() * 1001));
});

group("isEmail", () => {
  bench("koyojs (valid)", () => koyo.isEmail("user@example.com"));
  bench("koyojs (invalid)", () => koyo.isEmail("not-an-email"));
  bench("regex baseline", () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test("user@example.com"));
});

group("isEven / isOdd", () => {
  bench("koyojs isEven", () => koyo.isEven(42));
  bench("koyojs isOdd", () => koyo.isOdd(43));
  bench("js baseline even", () => 42 % 2 === 0);
  bench("js baseline odd", () => 43 % 2 !== 0);
});

group("chunk (1000 items, size 10)", () => {
  bench("koyojs", () => koyo.chunk(NUMS, 10));
  bench("lodash _.chunk", () => _.chunk(NUMS, 10));
  bench("remeda R.chunk", () => R.chunk(NUMS, 10));
  bench("radash cluster", () => radash.cluster(NUMS, 10));
});

group("flatten (500 mixed-depth items)", () => {
  bench("koyojs", () => koyo.flatten(ARR_MIXED));
  bench("lodash _.flatten", () => _.flatten(ARR_MIXED));
  bench("remeda R.flat", () => R.flat(ARR_MIXED as any));
  // radash.flat requires T[][] — does not support mixed arrays
  bench("js Array#flat", () => ARR_MIXED.flat());
});

group("unique / removeDuplicates (500 items, 50 unique)", () => {
  bench("koyojs unique", () => koyo.unique(ARR_DUPES));
  bench("koyojs removeDuplicates", () => koyo.removeDuplicates(ARR_DUPES));
  bench("lodash _.uniq", () => _.uniq(ARR_DUPES));
  bench("remeda R.unique", () => R.unique(ARR_DUPES));
  bench("radash unique", () => radash.unique(ARR_DUPES));
  bench("js Set (baseline)", () => [...new Set(ARR_DUPES)]);
});

group("groupBy (200 items, 5 groups)", () => {
  bench("koyojs", () => koyo.groupBy(GROUP_ARR, (x) => x.type));
  bench("lodash _.groupBy", () => _.groupBy(GROUP_ARR, "type"));
  bench("remeda R.groupBy", () => R.groupBy(GROUP_ARR, (x) => x.type));
  bench("radash group", () => radash.group(GROUP_ARR, (x) => x.type));
});

group("pick (20-key obj, 5 keys)", () => {
  bench("koyojs", () => koyo.pick(OBJ, PICK_KEYS as unknown as string[]));
  bench("lodash _.pick", () => _.pick(OBJ, PICK_KEYS));
  bench("remeda R.pick", () => R.pick(OBJ, PICK_KEYS));
  bench("radash pick", () => radash.pick(OBJ, PICK_KEYS as unknown as string[]));
});

group("omit (20-key obj, 5 keys)", () => {
  bench("koyojs", () => koyo.omit(OBJ, OMIT_KEYS as unknown as string[]));
  bench("lodash _.omit", () => _.omit(OBJ, OMIT_KEYS));
  bench("remeda R.omit", () => R.omit(OBJ, OMIT_KEYS));
  bench("radash omit", () => radash.omit(OBJ, OMIT_KEYS as unknown as string[]));
});

group("cloneDeep (20-key obj)", () => {
  bench("koyojs", () => koyo.cloneDeep(OBJ));
  bench("lodash _.cloneDeep", () => _.cloneDeep(OBJ));
  bench("remeda R.clone", () => R.clone(OBJ));
  bench("structuredClone (baseline)", () => structuredClone(OBJ));
});

group("createArray / TypedArray push (10 items)", () => {
  bench("koyojs createArray (strict number)", () => {
    const arr = koyo.createArray({ strict: true, validate: (v: unknown) => typeof v === "number" });
    for (let i = 0; i < 10; i++) arr.push(i);
    return arr;
  });
  bench("js Array (baseline)", () => {
    const arr: number[] = [];
    for (let i = 0; i < 10; i++) arr.push(i);
    return arr;
  });
});

await run();
