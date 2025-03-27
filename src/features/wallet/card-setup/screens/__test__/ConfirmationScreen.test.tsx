import React from 'react';
import { useRoute } from '@react-navigation/native';
import { mockReset, mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { fireEvent, render, waitFor } from '../../../../../common/utils/testing';
import { mockServerNode } from '../../../../../mock-server/mockServerNode';
import { mockCreateCardMutation } from '../../../../../new-graphql/generated';
import { ConfirmationScreen } from '../ConfirmationScreen';

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

describe('Confirmation Screen', () => {
  beforeEach(() => {
    mockedUseRoute.mockReturnValue({
      params: { pin: '1234' },
      key: '',
      name: '',
    });
  });

  it('should render properly', () => {
    const { getByText } = render(<ConfirmationScreen />);
    expect(getByText('We need to mail your card. Should we send it to this address?')).toBeTruthy();
  });

  it('should navigate mailing address edit screen', () => {
    const { getByLabelText } = render(<ConfirmationScreen />);
    const button = getByLabelText('Edit mailing address');
    fireEvent.press(button);
    expect(mockedNavigate).toHaveBeenCalled();
  });

  it('should go back previous screen by using back chevron', () => {
    const { getByTestId } = render(<ConfirmationScreen />);
    const button = getByTestId('topbar-back-icon');
    fireEvent.press(button);
    expect(mockedNavigate).toHaveBeenCalledWith('PinSetupStack', {
      screen: 'ChoosePin',
      params: {
        header: 'Card set-up',
        title: 'Choose a secure 4 digit PIN for your card.',
        repeatedPinScreen: {
          header: 'Card set-up',
          title: 'Repeat your PIN.',
          onPinVerifiedSuccess: expect.anything(),
        },
      },
    });
  });

  it('should go to success screen', async () => {
    mockServerNode.use(
      mockCreateCardMutation((_, res, context) => res(context.data({ card: { create: { success: true } } })))
    );
    const { getByLabelText } = render(<ConfirmationScreen />);
    const button = getByLabelText('Send my card');
    fireEvent.press(button);

    await waitFor(() => {
      expect(mockReset).toHaveBeenCalledWith({
        index: 0,
        routes: [
          {
            name: 'Success',
            params: { resetCardPin: false },
          },
        ],
      });
    });
  });

  describe('When confirm API error', () => {
    it('should go to error screen', async () => {
      mockServerNode.use(mockCreateCardMutation((_, res) => res.networkError('Ops! huhu')));
      const { getByLabelText } = render(<ConfirmationScreen />);
      const button = getByLabelText('Send my card');
      fireEvent.press(button);

      await waitFor(() => {
        expect(mockedNavigate).toHaveBeenCalledWith('Error', { resetCardPin: false, pin: '1234' });
      });
    });
  });
});
