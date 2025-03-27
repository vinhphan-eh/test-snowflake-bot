process.env.TZ = 'AEST';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const rootConfig = require('./jest.config.ci');

module.exports = {
  ...rootConfig,
  maxWorkers: '50%',
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
