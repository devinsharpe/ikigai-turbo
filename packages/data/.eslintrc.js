/** @type {import("eslint").Linter.Config} */
export default {
  root: true,
  extends: ["@ikigai/eslint-config/library.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true
  }
};
