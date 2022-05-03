/* eslint-disable max-len */
/*
 * For a detailed explanation regarding each configuration property, visit: */

export default {
  clearMocks: true,
  testMatch: ['**/__tests__/**/*.test.js'],
  collectCoverage: true,
  testResultsProcessor: 'jest-sonar-reporter',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['/node_modules/', '/__tests__/'],
};
