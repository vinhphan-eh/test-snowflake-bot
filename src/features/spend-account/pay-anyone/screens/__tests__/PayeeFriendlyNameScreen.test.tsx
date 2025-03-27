import React from 'react';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { fireEvent, render, waitFor } from '../../../../../common/utils/testing';
import { PayeeFriendlyNameScreen } from '../PayeeFriendlyNameScreen';

const mockedSetPayeeFriendlyName = jest.fn();
jest.mock('../../stores/usePayAnyoneStore', () => {
  return {
    usePayAnyoneStore: () => ({
      setPayeeFriendlyName: mockedSetPayeeFriendlyName,
    }),
  };
});

describe('Payee friendly name', () => {
  it('should render properly', async () => {
    const { getByTestId } = render(<PayeeFriendlyNameScreen />);

    await waitFor(() => {
      expect(getByTestId('friendlyName-input')).toBeTruthy();
      expect(getByTestId('next-on-payee-friendly-name')).toBeTruthy();
    });
  });

  it('user is able to click next', async () => {
    const { getByTestId } = render(<PayeeFriendlyNameScreen />);
    const payeeFriendlyNameInput = getByTestId('friendlyName-input');

    const nickName = "Test's Account-name";

    fireEvent.changeText(payeeFriendlyNameInput, nickName);

    await waitFor(() => {
      const nextButton = getByTestId('next-on-payee-friendly-name');

      fireEvent.press(nextButton);
      expect(mockedSetPayeeFriendlyName).toBeCalledWith(nickName);

      expect(mockedNavigate).toBeCalledWith('PaymentDetails');
    });
  });
});
