/* eslint-disable no-undef */
module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  env: {
    browser: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "import/export": 0,
  },
  overrides: [
    {
      files: ["src/**/__tests__/**"],
      env: {
        jest: true,
      },
    },
  ],
};
