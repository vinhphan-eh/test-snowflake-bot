import { waitFor } from '@testing-library/react-native';
import { mockedSwitchPillar } from '../../../../../common/stores/__mocks__/useMiniAppSwitcherStore';
import { renderHook } from '../../../../../common/utils/testing';
import { mockNavigateFromRoot } from '../../../../../navigation/__mocks__/rootNavigation';
import { useOpenInstaPayFlowFromDashboard } from '../useOpenInstaPayFlowFromDashboard';

describe('useOpenInstaPayFlowFromDashboard', () => {
  describe('click when not under maintenance', () => {
    it('should navigate to income tab', async () => {
      const { result } = renderHook(() => useOpenInstaPayFlowFromDashboard({ underMaintenance: false }));

      await result.current.openInstaPayFlow();

      await waitFor(() => {
        expect(mockedSwitchPillar).toHaveBeenCalledWith({ to: { pillarId: 'WalletApp', tab: 'income-tab' } });
      });
    });
  });

  describe('click when under maintenance', () => {
    it('should open maintenance screen', async () => {
      const { result } = renderHook(() => useOpenInstaPayFlowFromDashboard({ underMaintenance: true }));

      await result.current.openInstaPayFlow();

      await waitFor(() => {
        expect(mockNavigateFromRoot).toHaveBeenCalledWith('IncomeStack', { screen: 'InstaPayNowMaintenance' });
      });
    });
  });
});
