module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint/eslint-plugin", "prettier"],
  extends: ["plugin:@typescript-eslint/recommended"],
  root: true,
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "prettier/prettier": "error",
  },
  env: {
    node: true,
  },
};
