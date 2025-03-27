import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { mockedSwitchPillar } from '../../../../../common/stores/__mocks__/useMiniAppSwitcherStore';
import { render } from '../../../../../common/utils/testing';
import { InstaPayTrustedBeneficiaryErrorScreen } from '../InstaPayTrustedBeneficiaryErrorScreen';

describe('InstaPayTrustedBeneficiaryErrorScreen', () => {
  it('should back to Dashboard when press close ', async () => {
    const { getByText } = render(<InstaPayTrustedBeneficiaryErrorScreen />);

    const closeBtn = getByText('Close');
    fireEvent.press(closeBtn);

    expect(getByText('Sorry, we failed to verify your account details')).toBeTruthy();
    expect(getByText('Please use another account or try again later.')).toBeTruthy();
    expect(mockedSwitchPillar).toHaveBeenCalledWith({ to: { pillarId: 'WalletApp', tab: 'income-tab' } });
  });
});
