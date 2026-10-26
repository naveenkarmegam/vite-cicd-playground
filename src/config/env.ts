import { z } from "zod";

const envSchema = z.object({
  VITE_BACKEND_BASE_URL: z.url({
    error:
      "VITE_BACKEND_BASE_URL must be a full URL, e.g. http://localhost:8069. Copy .env.example to .env and set it.",
  }),
  // Set by the deploy workflow; "local" when running on your machine
  VITE_APP_ENV: z
    .enum(["local", "development", "staging", "production"])
    .default("local"),
  VITE_COMMIT_SHA: z.string().default("local"),
});

// Fail on startup with a clear message instead of making requests to "undefined/..."
const parsed = envSchema.safeParse(import.meta.env);
if (!parsed.success) {
  throw new Error(
    `Invalid environment variables:\n${z.prettifyError(parsed.error)}`
  );
}

export const Settings = {
  BASE_URL: parsed.data.VITE_BACKEND_BASE_URL,
  APP_ENV: parsed.data.VITE_APP_ENV,
  COMMIT_SHA: parsed.data.VITE_COMMIT_SHA,
  VERSION: __APP_VERSION__,
};
