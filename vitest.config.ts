import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config.ts";

// Reuses vite.config.ts (React plugin, Tailwind, "@" alias) and adds test settings
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      setupFiles: ["./src/test/setup.ts"],
      include: ["src/**/*.test.{ts,tsx}"],
      // src/config/env.ts throws without it
      env: {
        VITE_BACKEND_BASE_URL: "http://localhost:8069",
      },
      restoreMocks: true,
      coverage: {
        provider: "v8",
        include: ["src/**/*.{ts,tsx}"],
        exclude: ["src/**/*.test.{ts,tsx}", "src/test/**", "src/main.tsx"],
        reporter: ["text", "html", "lcov"],
      },
    },
  })
);
