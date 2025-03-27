import { useInstapayExpBrazeCard } from '../useInstapayExpBrazeCard';

export const mockUseInstapayExpBrazeCard = useInstapayExpBrazeCard as jest.MockedFn<typeof useInstapayExpBrazeCard>;

jest.mock('../useInstapayExpBrazeCard', () => ({
  useInstapayExpBrazeCard: jest.fn(),
}));
