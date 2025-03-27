import { useSpendVisibility } from '../useSpendVisibility';

export const mockUseSpendVisibility = useSpendVisibility as jest.MockedFn<typeof useSpendVisibility>;

jest.mock('../useSpendVisibility', () => ({
  useSpendVisibility: jest.fn(),
}));
