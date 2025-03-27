import type { useInstaPayAvailableBalances } from '../useInstaPayAvailableBalances';

export const mockUseInstaPayAvailableBalances = jest.fn() as jest.MockedFunction<typeof useInstaPayAvailableBalances>;

jest.mock('../useInstaPayAvailableBalances', () => ({
  useInstaPayAvailableBalances: mockUseInstaPayAvailableBalances,
}));
