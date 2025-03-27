import React from 'react';
import { mockedGoBack, mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { mockedEventTracking } from '../../../../../../test-setup/after-env/mixpanel.setup';
import { fireEvent, render } from '../../../../../common/utils/testing';
import { ChooseInstapayMethodScreen } from '../ChooseInstapayMethodScreen';

describe('ChooseInstapayMethodScreen', () => {
  it('should render correctly', () => {
    const { getByText } = render(<ChooseInstapayMethodScreen />);
    expect(getByText('I would like to\nget paid...')).toBeTruthy();
    expect(getByText('Continue')).toBeTruthy();
    expect(getByText('Skip')).toBeTruthy();
    // TODO: fix options when new Radio.Group is out
    expect(getByText('On-demand/now')).toBeTruthy();
    expect(getByText('InstaPay Now')).toBeTruthy();
    expect(getByText("🤑  I'm a Spender")).toBeTruthy();
    expect(getByText('🏠  I own a home')).toBeTruthy();
    expect(getByText('🚨  Emergency use')).toBeTruthy();
    expect(getByText('💵  Manage bills')).toBeTruthy();
    expect(getByText('Tackle any unplanned expenses or emergencies.')).toBeTruthy();
    expect(getByText('Managing your bills with ease and convenience.')).toBeTruthy();
    expect(getByText('Save up to $337 annually on credit fees and interest.')).toBeTruthy();
    expect(getByText('Pay off your mortgage up to 6 years faster.')).toBeTruthy();
  });

  it('should work correctly when pressing skip', () => {
    const { getByText } = render(<ChooseInstapayMethodScreen />);
    fireEvent.press(getByText('Skip'));

    expect(mockedEventTracking).toHaveBeenCalledWith({
      categoryName: 'user action',
      event: 'Click on Skip to exit instapay onboarding',
      metaData: {
        location: 'Choose Instapay Daily/Now',
        module: 'InstaPay',
      },
    });
    expect(mockedNavigate).toHaveBeenCalledWith('dashboard');
  });

  it('should work correctly when pressing back', () => {
    const { getByTestId } = render(<ChooseInstapayMethodScreen />);
    fireEvent.press(getByTestId('topbar-back-icon'));
    expect(mockedGoBack).toHaveBeenCalled();
  });

  it('should work correctly when choosing instapay now', () => {
    const { getByText } = render(<ChooseInstapayMethodScreen />);
    fireEvent.press(getByText('On-demand/now'));
    fireEvent.press(getByText('Continue'));

    expect(mockedEventTracking).toHaveBeenCalledWith({
      categoryName: 'user action',
      event: 'Click on Continue to choose how to get paid',
      metaData: {
        module: 'InstaPay',
        selection: 'instapay now',
      },
    });
    expect(mockedNavigate).toHaveBeenCalledWith('InstapayNowIntroCarouselScreen');
  });

  it('should track clicking on spender tile correctly', () => {
    const { getByText } = render(<ChooseInstapayMethodScreen />);
    fireEvent.press(getByText("🤑  I'm a Spender"));

    expect(mockedEventTracking).toHaveBeenCalledWith({
      categoryName: 'user action',
      event: 'Click on spender tile',
      metaData: {
        module: 'InstaPay',
      },
    });
  });

  it('should track clicking on home owner tile correctly', () => {
    const { getByText } = render(<ChooseInstapayMethodScreen />);
    fireEvent.press(getByText('🏠  I own a home'));

    expect(mockedEventTracking).toHaveBeenCalledWith({
      categoryName: 'user action',
      event: 'Click on home owner tile',
      metaData: {
        module: 'InstaPay',
      },
    });
  });
});
