import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    api: false,
    environment: "node",
    include: ["tests/**/*.test.ts"]
  },
  resolve: {
    alias: {
      "@": new URL(".", import.meta.url).pathname
    }
  }
});
