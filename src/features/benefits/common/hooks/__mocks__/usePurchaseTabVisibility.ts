import { usePurchaseTabVisibility } from '../usePurchaseTabVisibility';

export const mockUsePurchaseTabVisibility = usePurchaseTabVisibility as jest.MockedFunction<
  typeof usePurchaseTabVisibility
>;

jest.mock('../usePurchaseTabVisibility', () => ({
  usePurchaseTabVisibility: jest.fn(),
}));
