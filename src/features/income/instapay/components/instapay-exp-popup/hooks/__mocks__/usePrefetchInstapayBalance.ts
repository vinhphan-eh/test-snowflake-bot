import { usePrefetchInstapayBalance } from '../usePrefetchInstapayBalance';

export const mockUsePrefetchInstapayBalance = usePrefetchInstapayBalance as jest.MockedFunction<
  typeof usePrefetchInstapayBalance
>;

jest.mock('../usePrefetchInstapayBalance', () => ({
  usePrefetchInstapayBalance: jest.fn(),
}));
