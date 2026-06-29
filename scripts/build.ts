import * as esbuild from "esbuild";

const entryPoints = [
  "src/index.ts",
  "src/String/index.ts",
  "src/Number/index.ts",
];

const shared: esbuild.BuildOptions = {
  entryPoints,
  bundle: true,
  platform: "neutral",
  target: ["es2020"],
  sourcemap: true,
  external: [],
};

await Promise.all([
  esbuild.build({
    ...shared,
    format: "esm",
    outdir: "dist",
    outExtension: { ".js": ".mjs" },
  }),
  esbuild.build({
    ...shared,
    format: "cjs",
    outdir: "dist",
    outExtension: { ".js": ".cjs" },
  }),
]);

await Bun.build({
  entrypoints: ["src/index.ts"],
  outdir: "dist",
  target: "bun",
  naming: "index.bun.js",
  sourcemap: "external",
  minify: false,
});

console.log("Build complete.");
