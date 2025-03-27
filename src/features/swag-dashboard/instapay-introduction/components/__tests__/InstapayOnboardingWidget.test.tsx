import React from 'react';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { mockedEventTracking } from '../../../../../../test-setup/after-env/mixpanel.setup';
import { fireEvent, render } from '../../../../../common/utils/testing';
import { InstapayOnboardingWidget } from '../InstapayOnboardingWidget';

describe('InstapayOnboardingWidget', () => {
  it('should render correctly', () => {
    const { getByText } = render(<InstapayOnboardingWidget />);

    expect(getByText('Onboarding progress')).toBeTruthy();
    expect(getByText('Next step: Choose how you get paid')).toBeTruthy();
    expect(getByText('Almost there! Finalise your onboarding today and choose how you get paid.')).toBeTruthy();
    expect(getByText('Finish onboarding')).toBeTruthy();
  });

  it('onPress should work correctly', () => {
    const { getByText } = render(<InstapayOnboardingWidget />);

    fireEvent.press(getByText('Finish onboarding'));
    expect(mockedEventTracking).toHaveBeenCalledWith({
      categoryName: 'user action',
      event: 'Click on finish onboarding',
      metaData: {
        module: 'InstaPay',
      },
    });
    expect(mockedNavigate).toHaveBeenCalledWith('InstapayIntroductionStack', {
      screen: 'ChoosePayMethodScreen',
    });
  });
});
