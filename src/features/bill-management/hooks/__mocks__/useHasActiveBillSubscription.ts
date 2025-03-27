import { useHasActiveBillSubscription } from '../useHasActiveBillSubscription';

export const mockUseHasActiveBillSubscription = useHasActiveBillSubscription as jest.MockedFn<
  typeof useHasActiveBillSubscription
>;

jest.mock('../useHasActiveBillSubscription', () => ({
  useHasActiveBillSubscription: jest.fn(),
}));
