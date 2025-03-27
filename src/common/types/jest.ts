type MockableFunction = (...args: unknown[]) => unknown;
export const mockJestFn = <T extends MockableFunction>(fn: T) => fn as jest.MockedFn<T>;
