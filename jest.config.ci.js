process.env.TZ = 'AEST';

module.exports = {
  preset: 'react-native',
  workerIdleMemoryLimit: '2GB',
  maxWorkers: 2,
  runner: './test-setup/jest-runner.ts',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.jsx$': 'babel-jest',
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.jest.json',
        isolatedModules: true,
      },
    ],
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '\\.svg': '<rootDir>/__mocks__/svgMock.ts',
    '\\.png': '<rootDir>/__mocks__/pngMock.ts',
  },
  modulePathIgnorePatterns: ['<rootDir>/example/node_modules', '<rootDir>/lib/'],
  setupFiles: [
    '<rootDir>/test-setup/jest.setup.ts',
    '<rootDir>/test-setup/react-navigation.setup.ts',
    '<rootDir>/test-setup/hero-design.setup.tsx',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/test-setup/after-env/setupMockServer.ts',
    '<rootDir>/test-setup/after-env/common.setup.ts',
    '<rootDir>/test-setup/after-env/ebenToken.setup.ts',
    '<rootDir>/test-setup/after-env/mixpanel.setup.ts',
    '<rootDir>/test-setup/after-env/superAppToken.setup.ts',
    '<rootDir>/test-setup/after-env/regionLocalisation.setup.ts',
    '<rootDir>/test-setup/after-env/stripe.setup.ts',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!@react-native|react-native|react-native-reanimated|@react-navigation/stack|@react-navigation/native|@sentry/react-native)',
  ],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}'],
  coveragePathIgnorePatterns: [
    'src/mock-server',
    'src/graphql',
    'src/new-graphql',
    'src/restful',
    'src/aws-exports.js',
    'src/index.tsx',
    'src/declarations.d.ts',
    '<rootDir>/.*.generated.ts',
    '/skeletons/',
  ],
  coverageReporters: ['json', 'lcov', 'text'],
  rootDir: './',
};
