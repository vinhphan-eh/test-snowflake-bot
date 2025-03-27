import { useInstapayExpForLeave } from '../useInstapayExpForLeave';

export const mockUseInstapayExpForLeave = useInstapayExpForLeave as jest.MockedFunction<typeof useInstapayExpForLeave>;

jest.mock('../useInstapayExpForLeave', () => ({
  useInstapayExpForLeave: jest.fn(),
}));
