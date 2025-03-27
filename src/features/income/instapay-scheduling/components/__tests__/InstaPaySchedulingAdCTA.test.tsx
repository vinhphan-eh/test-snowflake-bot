import React from 'react';
import { mockedEventTracking } from '../../../../../../test-setup/after-env/mixpanel.setup';
import { PillarIds, WalletTabKeys } from '../../../../../common/constants/navigation';
import { mockedSwitchPillar } from '../../../../../common/stores/__mocks__/useMiniAppSwitcherStore';
import { fireEvent, render, waitFor } from '../../../../../common/utils/testing';
import { InstaPaySchedulingAdCTAVersion } from '../../constants';
import { mockedSharedIPSchedulingEventProperties } from '../../hooks/useInstaPaySchedulingEventTracking';
import {
  CLICKED_ON_SCHEDULING_CTA_FROM_DRAWDOWN_SUCCESS_SCREEN,
  CLICKED_ON_SCHEDULING_CTA_FROM_MENU_SCREEN_ON_ERROR,
} from '../../mixpanelEvents';
import { InstaPaySchedulingAdCTA } from '../InstaPaySchedulingAdCTA';

describe('InstaPaySchedulingAdCTAVersion', () => {
  it('should render and navigate on pressed properly for InstaPay Menu screen error version', async () => {
    const { getByTestId, getByText } = render(
      <InstaPaySchedulingAdCTA version={InstaPaySchedulingAdCTAVersion.MENU_SCREEN_ON_ERROR} />
    );

    await waitFor(() => {
      expect(getByTestId('instapay-scheduling-ad-cta'));
      expect(getByText('Set up a recurring withdrawal'));
      expect(getByText('Automatically withdraw your earned pay when it’s available'));
    });

    fireEvent.press(getByTestId('instapay-scheduling-ad-cta'));

    await waitFor(() => {
      expect(mockedSwitchPillar).toHaveBeenCalledWith({
        to: {
          pillarId: PillarIds.WalletApp,
          tab: WalletTabKeys.INCOME,
        },
      });
      expect(mockedEventTracking).toHaveBeenCalledWith({
        ...mockedSharedIPSchedulingEventProperties(),
        event: CLICKED_ON_SCHEDULING_CTA_FROM_MENU_SCREEN_ON_ERROR,
      });
    });
  });

  it('should render and navigate on pressed properly for InstaPay drawdown success screen version', async () => {
    const { getByTestId, getByText } = render(
      <InstaPaySchedulingAdCTA version={InstaPaySchedulingAdCTAVersion.SUCCESS_SCREEN} />
    );

    await waitFor(() => {
      expect(getByTestId('instapay-scheduling-ad-cta'));
      expect(getByText('Want to automate that?'));
      expect(getByText('Set up a recurring withdrawal of your earned pay'));
      expect(getByText('Set up now'));
    });

    fireEvent.press(getByText('Set up now'));

    await waitFor(() => {
      expect(mockedSwitchPillar).toHaveBeenCalledWith({
        to: {
          pillarId: PillarIds.WalletApp,
          tab: WalletTabKeys.INCOME,
        },
      });
      expect(mockedEventTracking).toHaveBeenCalledWith({
        ...mockedSharedIPSchedulingEventProperties(),
        event: CLICKED_ON_SCHEDULING_CTA_FROM_DRAWDOWN_SUCCESS_SCREEN,
      });
    });
  });
});
