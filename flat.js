import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat();

import alloyConfig from "eslint-config-alloy";

/**
 * @type {import("@types/eslint").Linter.FlatConfig}
 */
export default [
  ...compat.extends(alloyConfig)
];
