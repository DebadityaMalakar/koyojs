import * as esbuild from "esbuild";

const shared: esbuild.BuildOptions = {
  entryPoints: ["src/index.ts"],
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
    outfile: "dist/index.mjs",
  }),
  esbuild.build({
    ...shared,
    format: "cjs",
    outfile: "dist/index.cjs",
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
