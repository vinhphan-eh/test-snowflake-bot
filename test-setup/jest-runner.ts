import TestRunner from 'jest-runner';
import type { Test, TestRunnerOptions, TestWatcher } from 'jest-runner';

/**
 * Force serial to be false so jest worker obeys workerIdleMemoryLimit
 * This is a workaround to memory leak (https://github.com/facebook/jest/issues/11956) until a fix is available
 */
class JestRunner extends TestRunner {
  async runTests(tests: Array<Test>, watcher: TestWatcher, options: TestRunnerOptions): Promise<void> {
    /* eslint no-underscore-dangle: 0 */
    const serial = this._globalConfig.maxWorkers === 1 ? false : options.serial;

    await super.runTests(tests, watcher, { ...options, serial });
  }
}

export default JestRunner;
