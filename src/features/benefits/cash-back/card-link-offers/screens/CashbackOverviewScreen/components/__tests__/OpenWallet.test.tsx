import React from 'react';
import { mockedNavigate } from '../../../../../../../../../__mocks__/react-navigation';
import { render, fireEvent } from '../../../../../../../../common/utils/testing';
import * as hook from '../../../../../../../spend-account/hooks/useConditionalNavigateOnboardingFlow';
import { OpenWallet } from '../OpenWallet';

describe('OpenWallet', () => {
  it('Should render properly', () => {
    jest.spyOn(hook, 'useConditionalNavigateOnboardingFlow').mockReturnValue(() => ({
      isLoading: false,
      screen: undefined,
      isError: false,
      isAllDone: true,
    }));

    const { getByLabelText, getByText } = render(<OpenWallet />);
    expect(getByText('Claim your cashback!')).toBeTruthy();
    expect(getByText('Open a Spend account')).toBeTruthy();
    fireEvent.press(getByLabelText('open wallet'));
    expect(mockedNavigate).toBeCalledWith('OnboardingStack', { screen: 'Dashboard' });
  });

  it('Should not render when loading', () => {
    jest.spyOn(hook, 'useConditionalNavigateOnboardingFlow').mockReturnValue(() => ({
      isLoading: true,
      screen: undefined,
      isError: false,
      isAllDone: true,
    }));

    const { queryByText } = render(<OpenWallet />);
    expect(queryByText('Claim your cashback!')).toBeNull();
    expect(queryByText('Open a Spend account')).toBeNull();
  });
});
