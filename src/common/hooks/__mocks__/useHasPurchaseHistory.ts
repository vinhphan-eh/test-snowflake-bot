import { useHasPurchaseHistory } from '../useHasPurchaseHistory';

export const mockUseHasPurchaseHistory = useHasPurchaseHistory as jest.MockedFn<typeof useHasPurchaseHistory>;

jest.mock('../useHasPurchaseHistory', () => ({
  useHasPurchaseHistory: jest.fn(),
}));
