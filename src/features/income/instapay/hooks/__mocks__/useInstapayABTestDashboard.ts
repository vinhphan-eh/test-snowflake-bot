import { mockJestFn } from '../../../../../common/types/jest';
import { useInstapayABTestDashboard } from '../useInstapayABTestDashboard';

export const mockUseInstapayABTestDashboard = mockJestFn(useInstapayABTestDashboard);

jest.mock('../useInstapayABTestDashboard', () => ({
  useInstapayABTestDashboard: jest.fn(),
}));
