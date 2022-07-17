/* eslint-disable no-undef */
module.exports = {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "js"],
  roots: ["<rootDir>/src"],
  testMatch: [
    "**/__tests__/**/*.+(ts|js)",
    "**/?(*.)+(spec|test).+(ts|js)",
  ],
  transform: { "^.+\\.(ts)$": "ts-jest" },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
};
