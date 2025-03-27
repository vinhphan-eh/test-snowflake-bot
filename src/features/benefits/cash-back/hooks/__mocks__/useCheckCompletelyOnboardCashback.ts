import { useCheckCompletelyOnboardCashback } from '../useCheckCompletelyOnboardCashback';

export const mockUseCheckCompletelyOnboardCashback = useCheckCompletelyOnboardCashback as jest.MockedFn<
  typeof useCheckCompletelyOnboardCashback
>;

jest.mock('../useCheckCompletelyOnboardCashback', () => ({
  useCheckCompletelyOnboardCashback: jest.fn(),
}));
