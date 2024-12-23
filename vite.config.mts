import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsconfigPaths({
      loose: true,
    }),
    react(),
  ],
  test: {
    environment: "jsdom",
    include: ["**/*.test.tsx"],
    globals: true,
  },
});