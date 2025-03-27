import React from 'react';
import { PillarIds, WalletTabKeys } from '../../../../../common/constants/navigation';
import { mockedSwitchPillar } from '../../../../../common/stores/__mocks__/useMiniAppSwitcherStore';
import { waitFor, render, type RenderAPI, fireEvent } from '../../../../../common/utils/testing';
import { InstaPaySchedulingErrorScreen } from '../InstaPaySchedulingErrorScreen';

describe('InstaPaySchedulingErrorScreen', () => {
  let renderAPI: RenderAPI;

  beforeEach(() => {
    renderAPI = render(<InstaPaySchedulingErrorScreen />);
  });

  it('should render error message properly', async () => {
    await waitFor(() => {
      expect(renderAPI.getByText("We're sorry, something went wrong")).toBeTruthy();
      expect(renderAPI.getByText('Please try again later')).toBeTruthy();
      expect(renderAPI.getByText('Close')).toBeTruthy();
    });
  });

  it('should navigate back to Income dashboard if pressed Close button', async () => {
    await waitFor(() => {
      fireEvent.press(renderAPI.getByText('Close'));
    });

    expect(mockedSwitchPillar).toHaveBeenCalledWith({
      to: {
        pillarId: PillarIds.WalletApp,
        tab: WalletTabKeys.INCOME,
      },
    });
  });
});
