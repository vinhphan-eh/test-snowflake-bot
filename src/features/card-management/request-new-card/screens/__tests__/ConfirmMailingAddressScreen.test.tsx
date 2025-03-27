import React from 'react';
import { mockedGoBack, mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { fireEvent, render, renderHook, waitFor } from '../../../../../common/utils/testing';
import { mockServerNode } from '../../../../../mock-server/mockServerNode';
import { mockGetCurrentUserQuery, mockRequestNewCardMutation } from '../../../../../new-graphql/generated';
import { aUserDetails } from '../../../../../new-graphql/mocks/generated-mocks';
import { useRequestNewCardStore } from '../../stores/useRequestNewCardStore';
import { ConfirmMailingAddressScreen } from '../ConfirmMailingAddressScreen';

const initState = {
  longForm: 'first',
  country: 'AUS',
  postcode: '1111',
  region: 'SA',
  townOrCity: 'Saigon',
};

describe('Confirm Mailing Address Screen', () => {
  mockServerNode.use(
    mockGetCurrentUserQuery((_, res, context) => {
      return res(
        context.data({
          me: {
            details: aUserDetails({
              mailingAddress: initState,
            }),
          },
        })
      );
    })
  );

  it('should render correctly', async () => {
    const { findByText, getByText } = render(<ConfirmMailingAddressScreen />);
    expect(getByText('Damaged, lost or stolen card')).toBeTruthy();
    expect(getByText('Your new card will be sent to this address:')).toBeTruthy();
    expect(getByText('Mailing address')).toBeTruthy();
    expect(await findByText('first, Saigon SA 1111')).toBeTruthy();
  });

  it('should go back correctly', () => {
    const { getByTestId } = render(<ConfirmMailingAddressScreen />);

    fireEvent.press(getByTestId('topbar-back-icon'));

    expect(mockedGoBack).toHaveBeenCalled();
  });

  it('should go to pin set up flow if request success', async () => {
    const mockSetShowCardActivationAlert = jest.fn();
    mockServerNode.use(
      mockRequestNewCardMutation((_, res, context) =>
        res(context.data({ card: { requestNewCard: { success: true } } }))
      )
    );
    const { result: recoverCardStore } = renderHook(() => useRequestNewCardStore());
    recoverCardStore.current.setShowCardActivationAlert = mockSetShowCardActivationAlert;
    const { getByLabelText } = render(<ConfirmMailingAddressScreen />);
    fireEvent.press(getByLabelText('Order card'));

    await waitFor(() => {
      expect(mockSetShowCardActivationAlert).toHaveBeenCalledWith(true);
      expect(mockedNavigate).toHaveBeenCalledWith('PinSetupStack', {
        screen: 'ChoosePin',
        params: {
          header: 'Damaged, lost or stolen card',
          title: 'Choose a PIN for your new card.',
          repeatedPinScreen: {
            header: 'Damaged, lost or stolen card',
            title: 'Repeat your PIN.',
            onPinVerifiedSuccess: expect.anything(),
          },
        },
      });
    });
  });

  it('should go to error screen if request failed', async () => {
    mockServerNode.use(mockRequestNewCardMutation((_, res) => res.networkError('Error')));

    const { getByLabelText } = render(<ConfirmMailingAddressScreen />);
    fireEvent.press(getByLabelText('Order card'));

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('RequestNewCardError');
    });
  });
});
