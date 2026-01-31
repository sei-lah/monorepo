export default {
  "*.{ts,tsx}": [
    "tsc-files vite-env.d.ts vitest.setup.ts",
    "biome check --no-errors-on-unmatched",
    "vitest related --bail=1",
  ],
  "*.{json,jsonc}": ["biome check --no-errors-on-unmatched"],
};
