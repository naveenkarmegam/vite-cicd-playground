const CUSTOM_AT_RULES = [
  "apply",
  "layer",
  "responsive",
  "reference",
  "utility",
  "theme",
  "custom-variant",
  "screen",
  "source",
  "tailwind",
  "variants",
  "plugin",
];

const ONLY_ALLOW_CAMEL_CASE_SELECTORS = [
  /^(?:[a-z]+(?:[A-Z][a-z]*)*)$/,
  { message: (s) => `Expected '${s}' to be in camelCase` },
];

/** @type {import("stylelint").Config} */
export default {
  extends: ["stylelint-config-standard"],
  plugins: ["stylelint-order"],
  ignoreFiles: ["dist/**", "**/dist/**"],
  rules: {
    // Enforces Element Class Names to be camelCase
    "selector-class-pattern": ONLY_ALLOW_CAMEL_CASE_SELECTORS,
    // Enforces Element IDs to be camelCase
    "selector-id-pattern": ONLY_ALLOW_CAMEL_CASE_SELECTORS,
    // Allow Tailwind-based CSS Rules
    "at-rule-no-unknown": [true, { ignoreAtRules: CUSTOM_AT_RULES }],
    // Allow the Global CSS Selector
    "selector-pseudo-class-no-unknown": [
      true,
      { ignorePseudoClasses: ["global"] },
    ],
    // Enforces the order of the CSS properties to be in alphabetical order
    "order/properties-alphabetical-order": true,
    "no-descending-specificity": null,
    // Disables the Level-4 Media Queries; Since they're more exotic and less known
    "media-feature-range-notation": "prefix",
    // Adopts the import notation from `postcss-import`
    "import-notation": "string",
    // Allow the `@apply` at rule as its part of Tailwind
    "at-rule-no-deprecated": [true, { ignoreAtRules: CUSTOM_AT_RULES }],
    // Tailwind at-rules (e.g. `@apply border-border`) aren't standard CSS preludes
    "at-rule-prelude-no-invalid": [true, { ignoreAtRules: CUSTOM_AT_RULES }],
    // 'nodejs/one-utility-class-per-line': true,
    // We need complex `:not()` for headings with anchor
    "selector-not-notation": null,
    // Tailwind/shadcn generate oklch() as unitless numbers, e.g. oklch(0.97 0 0)
    "lightness-notation": "number",
    "hue-degree-notation": "number",
    // `@utility` (Tailwind v4) is itself a valid nesting scope for `&`, which
    // stylelint doesn't know about since it isn't standard CSS
    "nesting-selector-no-missing-scoping-root": null,
  },
};
