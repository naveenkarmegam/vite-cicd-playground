import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Unmount rendered components and reset storage so tests don't affect each other
afterEach(() => {
  cleanup();
  localStorage.clear();
  sessionStorage.clear();
});
