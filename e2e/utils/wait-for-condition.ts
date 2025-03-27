export async function waitForCondition(
  conditionFn: () => Promise<boolean>,
  timeout: number,
  interval: number
): Promise<boolean> {
  const startTime = Date.now();

  async function checkCondition(): Promise<boolean> {
    if (await conditionFn()) {
      return true;
    }
    if (Date.now() - startTime < timeout) {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise<void>(resolve => setTimeout(() => resolve(), interval)); // Wait for interval

      // Recursive call to check the condition again
      return checkCondition();
    }

    // Reach timeout
    return false;
  }

  return checkCondition();
}
