import { beforeEach, describe, expect, it, vi } from "vitest";

describe("Settings", () => {
  beforeEach(() => {
    // env.ts validates on import, so each test needs a fresh copy
    vi.resetModules();
    vi.unstubAllEnvs();
  });

  it("exposes the backend URL", async () => {
    vi.stubEnv("VITE_BACKEND_BASE_URL", "https://api.example.com");

    const { Settings } = await import("./env");

    expect(Settings.BASE_URL).toBe("https://api.example.com");
  });

  it("throws a clear error when the backend URL is missing", async () => {
    vi.stubEnv("VITE_BACKEND_BASE_URL", "");

    await expect(import("./env")).rejects.toThrow(/VITE_BACKEND_BASE_URL/);
  });
});
