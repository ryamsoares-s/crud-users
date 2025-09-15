// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "node",
  preset: "ts-jest",
};

module.exports = createJestConfig(customJestConfig);
