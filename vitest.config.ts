import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: ["apps/*", "pkg/*"],
    reporters: ["tree"],
    watch: false,
    passWithNoTests: true,
    coverage: {
      exclude: ["**/*.{test,spec}.ts", "**/*.config.ts"],
    },
  },
});
