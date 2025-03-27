import React from 'react';
import { fireEvent, render, renderHook } from '../../../../../common/utils/testing';
import { mockNavigateToTopTabs } from '../../../../../navigation/__mocks__/rootNavigation';
import { useSubmitSuperContributionStore } from '../../../store/useSubmitSuperContributionStore';
import { SubmitContributionSuccessScreen } from '../SubmitContributionSuccessScreen';

describe('ContributionRequestSuccessScreen', () => {
  it('should render properly', () => {
    const mockStore = renderHook(() => useSubmitSuperContributionStore());
    mockStore.result.current.orgNames = 'HRV';

    const { getByText } = render(<SubmitContributionSuccessScreen />);
    expect(getByText('Nice! Your contribution request has been sent to HRV')).toBeTruthy();
    expect(
      getByText(
        'Your employer will now review the request and can either approve or reject it. Please allow up to 7 days for your employer to notify you of the outcome.'
      )
    ).toBeTruthy();
    expect(getByText('If you have any questions in the meantime, please contact your employer.')).toBeTruthy();
  });

  it('should go to Super dashboard', () => {
    const { getByText } = render(<SubmitContributionSuccessScreen />);
    const button = getByText('Done');
    fireEvent.press(button);
    expect(mockNavigateToTopTabs).toBeCalledWith('super-tab');
  });
});
