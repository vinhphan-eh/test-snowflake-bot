export const itIos = (description: string, fn: () => void) => {
  it(description, async () => {
    if (device.getPlatform() === 'android') {
      return;
    }

    await fn();
  });
};
