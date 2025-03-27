import { useEstInstaPayNowBalances } from '../useEstInstaPayNowBalances';

export const mockUseEstInstaPayNowBalances = useEstInstaPayNowBalances as jest.MockedFunction<
  typeof useEstInstaPayNowBalances
>;

jest.mock('../useEstInstaPayNowBalances', () => ({
  useEstInstaPayNowBalances: jest.fn(),
}));
