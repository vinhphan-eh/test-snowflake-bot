import React from 'react';
import { useRoute } from '@react-navigation/native';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { mockUseIsAccountUK } from '../../../../../common/hooks/__mocks__/useIsAccountUK';
import { fireEvent, render } from '../../../../../common/utils/testing';
import { mockNavigateToTopTabs } from '../../../../../navigation/__mocks__/rootNavigation';
import { ErrorScreen } from '../ErrorScreen';

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

describe('Error Screen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockedUseRoute.mockReturnValue({ params: { resetCardPin: false }, key: '', name: '' });
    mockUseIsAccountUK.mockReturnValue(false);
  });

  it('should render properly', () => {
    const { getByText } = render(<ErrorScreen />);
    expect(getByText("We're sorry, something's gone wrong.")).toBeTruthy();
    expect(getByText('Please try again.')).toBeTruthy();
  });

  it('should go to AU confirmation screen', () => {
    const { getByText } = render(<ErrorScreen />);
    const button = getByText('Try again');
    fireEvent.press(button);
    expect(mockedNavigate).toBeCalledWith('Confirmation', expect.anything());
  });

  it('should go to Wallet dashboard', () => {
    mockedUseRoute.mockReturnValue({ params: { resetCardPin: true }, key: '', name: '' });
    const { getByText } = render(<ErrorScreen />);
    const button = getByText('Close');
    fireEvent.press(button);
    expect(getByText("We're sorry, something went wrong.")).toBeTruthy();
    expect(getByText('Please try again later.')).toBeTruthy();
    expect(mockNavigateToTopTabs).toBeCalledWith('card-tab');
  });

  it('should go to Uk Billing address screen', () => {
    mockUseIsAccountUK.mockReturnValue(true);

    const { getByText } = render(<ErrorScreen />);
    const button = getByText('Try again');
    fireEvent.press(button);
    expect(mockedNavigate).toBeCalledWith('UkBillingAddress');
  });
});
