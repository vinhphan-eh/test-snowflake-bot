import React from 'react';
import { mockedNavigate } from '../../../../../__mocks__/react-navigation';
import { fireEvent, render } from '../../../../common/utils/testing';
import { useConditionalNavigateOnboardingFlow } from '../../../spend-account/hooks/useConditionalNavigateOnboardingFlow';
import { PayWithHeroPointsTile } from '../PayWithHeroPointsTile';

jest.mock('../../../spend-account/hooks/useConditionalNavigateOnboardingFlow', () => ({
  useConditionalNavigateOnboardingFlow: jest.fn(),
}));

describe('Pay with Hero Points tile', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    (useConditionalNavigateOnboardingFlow as jest.Mock).mockReturnValue(() => ({
      isLoading: false,
      screen: ['stack', { screen: 'screen' }],
    }));
  });

  it('should show spinner while loading', () => {
    (useConditionalNavigateOnboardingFlow as jest.Mock).mockReturnValue(() => ({
      isLoading: true,
      screen: ['stack', { screen: 'screen' }],
    }));

    const { getByTestId } = render(<PayWithHeroPointsTile />);
    expect(getByTestId('pay with hero points tile-loading')).toBeTruthy();
  });

  it('should navigate to onboarding flow when wallet setup is not completed yet', () => {
    const { getByText } = render(<PayWithHeroPointsTile />);
    const tile = getByText('Open Spend account to reimburse purchases with points');
    fireEvent.press(tile);

    expect(getByText('Learn more')).toBeTruthy();
    expect(mockedNavigate).toBeCalledWith('OnboardingStack', { screen: 'Dashboard' });
  });
});
