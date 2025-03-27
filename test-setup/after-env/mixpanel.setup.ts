export const mockedEventTracking = jest.fn();
export const mockedScreenTracking = jest.fn();

jest.mock('../../src/common/hooks/useMixpanel', () => ({
  useMixpanel: () => ({
    eventTracking: mockedEventTracking,
    screenTracking: mockedScreenTracking,
  }),
}));
