import path from "path";

const quote = (filenames) =>
  filenames.map((f) => `"${path.relative(process.cwd(), f)}"`).join(" ");

/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  // --- Docs & data ---
  "**/*.{md,mdx,html,json,yml,yaml}": ["prettier --write"],

  // --- Styles ---
  "**/*.css": [
    (filenames) => `stylelint --fix ${quote(filenames)}`,
    "prettier --write",
  ],

  // --- TypeScript & JavaScript files ---
  "**/*.{js,mjs,jsx,ts,tsx}": [
    (filenames) => `eslint --fix ${quote(filenames)}`,
    "prettier --write",
  ],
};
