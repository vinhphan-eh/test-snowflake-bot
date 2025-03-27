/** @type {import('@jest/types').Config.InitialOptions} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { currentTimestamp } = require('./jest.util');

module.exports = {
  rootDir: '..',
  testMatch: ['<rootDir>/e2e/**/*.e2e.ts'],
  testTimeout: 420000, // 420 seconds - ~7 minutes
  maxWorkers: 1,
  globalSetup: 'detox/runners/jest/globalSetup',
  globalTeardown: 'detox/runners/jest/globalTeardown',
  testEnvironment: '<rootDir>/e2e/environment',
  verbose: true,
  reporters: [
    'detox/runners/jest/reporter',
    [
      'jest-html-reporters',
      {
        publicPath: 'detox_artifacts/e2e_tests/eben',
        filename: `report_${currentTimestamp()}.html`,
        expand: true,
      },
    ],
    [
      'jest-junit',
      {
        outputDirectory: 'detox_artifacts/report/eben/junit',
        outputName: `results_${currentTimestamp()}.xml`,
        addFileAttribute: 'true',
      },
    ],
    [
      'jest-ctrf-json-reporter',
      {
        outputFile: 'results.json',
        outputDir: 'detox_artifacts/report/eben/json',
      },
    ],
  ],
  setupFilesAfterEnv: ['<rootDir>/e2e/init.ts'],
  transform: {
    '^.+\\.m?js$': 'babel-jest',
    '\\.tsx?$': [
      'ts-jest',
      {
        // Note: We shouldn't need to include `isolatedModules` here because it's a deprecated config option in TS 5,
        // but setting it to `true` fixes the `ESM syntax is not allowed in a CommonJS module when
        // 'verbatimModuleSyntax' is enabled` error that we're seeing when running our Jest tests.
        isolatedModules: true,
        useESM: true,
      },
    ],
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@ehrocks/ebf-lib-integrate|graphql-request|rword|rword-english-recommended)/)',
  ],
};
