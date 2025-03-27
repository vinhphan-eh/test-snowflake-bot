import React from 'react';
import { mockReset, mockedGoBack, mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { fireEvent, render, waitFor } from '../../../../../common/utils/testing';
import { mockServerNode } from '../../../../../mock-server/mockServerNode';
import {
  UkTransactionState,
  mockGetUkTransactionStateQuery,
  mockSendUkFundMutation,
} from '../../../../../new-graphql/generated';
import { UkPaymentConfirmationScreen } from '../UkPaymentConfirmationScreen';

describe('Uk Payment Confirmation Screen', () => {
  it('should render properly', () => {
    const { getByText } = render(<UkPaymentConfirmationScreen />);

    expect(getByText('Please confirm your payment')).toBeTruthy();
    expect(getByText('Confirm')).toBeTruthy();
  });

  it('should go back previous screen by using back chevron', () => {
    const { getByTestId } = render(<UkPaymentConfirmationScreen />);
    const button = getByTestId('topbar-back-icon');
    fireEvent.press(button);
    expect(mockedGoBack).toBeCalled();
  });

  it('should go to Success screen when API return success', async () => {
    mockServerNode.use(
      mockSendUkFundMutation((_, res, ctx) =>
        res(ctx.data({ sendUkFund: { state: UkTransactionState.Approved, externalTransactionId: 'transaction-id' } }))
      )
    );
    const { getByLabelText } = render(<UkPaymentConfirmationScreen />);
    const button = getByLabelText('Confirm');
    fireEvent.press(button);

    await waitFor(() => {
      expect(mockReset).toBeCalledWith({
        index: 0,
        routes: [{ name: 'Success' }],
      });
    });
  });

  it('should go to Error screen when the outcome is not ACCEPTED', async () => {
    mockServerNode.use(
      mockSendUkFundMutation((_, res, ctx) =>
        res(ctx.data({ sendUkFund: { state: UkTransactionState.Failed, externalTransactionId: 'transaction-id' } }))
      )
    );
    const { getByLabelText } = render(<UkPaymentConfirmationScreen />);
    const button = getByLabelText('Confirm');
    fireEvent.press(button);

    await waitFor(() => {
      expect(mockedNavigate).toBeCalledWith('Error');
    });
  });

  it('should go to Error screen when API return error', async () => {
    mockServerNode.use(mockSendUkFundMutation((_, res, ctx) => res(ctx.status(400))));
    const { getByLabelText } = render(<UkPaymentConfirmationScreen />);
    const button = getByLabelText('Confirm');
    fireEvent.press(button);

    await waitFor(() => {
      expect(mockedNavigate).toBeCalledWith('Error');
    });
  });

  it('should go to Success screen when the outcome is changed from Pending to APPROVED', async () => {
    mockServerNode.use(
      mockSendUkFundMutation((_, res, ctx) =>
        res(ctx.data({ sendUkFund: { state: UkTransactionState.Pending, externalTransactionId: 'transaction-id-1' } }))
      ),
      mockGetUkTransactionStateQuery((_, res, ctx) =>
        res(ctx.data({ me: { wallet: { ukTransactionState: { state: UkTransactionState.Approved } } } }))
      )
    );
    const { getByLabelText } = render(<UkPaymentConfirmationScreen />);
    const button = getByLabelText('Confirm');
    fireEvent.press(button);

    await waitFor(() => {
      expect(mockReset).toBeCalledWith({
        index: 0,
        routes: [{ name: 'Success' }],
      });
    });
  });

  it('should go to Error screen when the outcome is changed from Pending to Failed', async () => {
    mockServerNode.use(
      mockSendUkFundMutation((_, res, ctx) =>
        res(ctx.data({ sendUkFund: { state: UkTransactionState.Pending, externalTransactionId: 'transaction-id' } }))
      ),
      mockGetUkTransactionStateQuery((_, res, ctx) =>
        res(ctx.data({ me: { wallet: { ukTransactionState: { state: UkTransactionState.Failed } } } }))
      )
    );
    const { getByLabelText } = render(<UkPaymentConfirmationScreen />);
    const button = getByLabelText('Confirm');
    fireEvent.press(button);

    await waitFor(() => {
      expect(mockedNavigate).toBeCalledWith('Error');
    });
  });
});
