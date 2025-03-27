import { useOpenInstaPayFlowFromDashboard } from '../useOpenInstaPayFlowFromDashboard';

export const mockUseOpenInstaPayFlowFromDashboard = useOpenInstaPayFlowFromDashboard as jest.MockedFunction<
  typeof useOpenInstaPayFlowFromDashboard
>;

jest.mock('../useOpenInstaPayFlowFromDashboard', () => ({
  useOpenInstaPayFlowFromDashboard: jest.fn(),
}));
