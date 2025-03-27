import React from 'react';
import { mockedNavigate, mockedGoBack } from '../../../../../../__mocks__/react-navigation';
import { fireEvent, render } from '../../../../../common/utils/testing';
import { ReportCardScreen } from '../ReportCardScreen';

describe('Recover Card Screen', () => {
  it('should render correctly', () => {
    const { getByTestId, getByText } = render(<ReportCardScreen />);

    expect(getByText('Damaged, lost or stolen card')).toBeTruthy();
    expect(getByText(`Something happened to your card? Let's fix that.`)).toBeTruthy();
    expect(
      getByText(
        `If your card is damaged, lost or stolen, you can cancel your current card and we'll send you a new one.`
      )
    ).toBeTruthy();
    expect(getByTestId('Cancel and order a card')).toBeTruthy();
  });

  it('should go back correctly', () => {
    const { getByTestId } = render(<ReportCardScreen />);

    fireEvent.press(getByTestId('topbar-back-icon'));

    expect(mockedGoBack).toBeCalledTimes(1);
  });

  it('should navigate correctly', () => {
    const { getByTestId } = render(<ReportCardScreen />);

    fireEvent.press(getByTestId('Cancel and order a card'));

    expect(mockedNavigate).toBeCalledWith('ConfirmMailingAddress');
  });
});
