import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { mockedGoBack, mockedNavigate, mockReset } from '../../../../../../__mocks__/react-navigation';
import { usePasscodeStore } from '../../../../../common/screens/passcode';
import { fireEvent, render, waitFor } from '../../../../../common/utils/testing';
import { mockServerNode } from '../../../../../mock-server/mockServerNode';
import {
  mockCreateScheduledPaymentMutation,
  mockSavePayeeAddressMutation,
  mockTransferAuWalletFundsMutation,
  ScheduledPaymentSaveOutcomeType,
  ScheduledPaymentStatus,
  TransactionOutcome,
} from '../../../../../new-graphql/generated';
import { usePayAnyoneStore } from '../../stores/usePayAnyoneStore';
import { PaymentConfirmationScreen } from '../PaymentConfirmationScreen';

describe('Payment Confirmation Screen', () => {
  it('should render properly', () => {
    const { getByText } = render(<PaymentConfirmationScreen />);
    const { result } = renderHook(() => usePayAnyoneStore());
    result.current.paymentDetails.reference = 'test';

    expect(getByText('Please confirm your payment')).toBeTruthy();
    expect(getByText('Confirm')).toBeTruthy();
    expect(
      getByText(
        `Account names aren't used for payments, so check that the BSB and account number are correct. If the money is paid to the wrong account, you may not get it back.`
      )
    ).toBeTruthy();
    expect(getByText('Please note there is a transfer out limit of $5000 within a 24-hour period.')).toBeTruthy();
  });

  it('should go back previous screen by using back chevron', () => {
    const { getByTestId } = render(<PaymentConfirmationScreen />);
    const button = getByTestId('topbar-back-icon');
    fireEvent.press(button);
    expect(mockedGoBack).toHaveBeenCalled();
  });

  describe('Now payment', () => {
    it('should go to Success screen when API return success', async () => {
      mockServerNode.use(
        mockTransferAuWalletFundsMutation((_, res, ctx) =>
          res(ctx.data({ transferAUWalletFunds: { outcome: TransactionOutcome.Accepted } }))
        )
      );
      const { getByLabelText } = render(<PaymentConfirmationScreen />);
      const button = getByLabelText('Confirm');
      fireEvent.press(button);

      await waitFor(() => {
        expect(mockReset).toHaveBeenCalledWith({
          index: 0,
          routes: [{ name: 'Success' }],
        });
      });
    });

    it('should go to Success screen and save payee address', async () => {
      mockServerNode.use(
        mockTransferAuWalletFundsMutation((_, res, ctx) =>
          res(ctx.data({ transferAUWalletFunds: { outcome: TransactionOutcome.Accepted } }))
        ),
        mockSavePayeeAddressMutation((_, res, ctx) => res(ctx.data({ savePayeeAddress: { success: true } })))
      );
      const { result: payAnyoneStore } = renderHook(() => usePayAnyoneStore());
      payAnyoneStore.current.setSavingPayeeDetails(true);

      const { getByLabelText } = render(<PaymentConfirmationScreen />);
      const button = getByLabelText('Confirm');
      fireEvent.press(button);

      await waitFor(() => {
        expect(mockReset).toHaveBeenCalledWith({
          index: 0,
          routes: [{ name: 'Success' }],
        });
      });
    });

    it('should go to Error screen when the outcome is not ACCEPTED', async () => {
      mockServerNode.use(
        mockTransferAuWalletFundsMutation((_, res, ctx) =>
          res(ctx.data({ transferAUWalletFunds: { outcome: TransactionOutcome.RefusedFraud } }))
        )
      );
      const { getByLabelText } = render(<PaymentConfirmationScreen />);
      const button = getByLabelText('Confirm');
      fireEvent.press(button);

      await waitFor(() => {
        expect(mockedNavigate).toHaveBeenCalledWith('Error');
      });
    });

    it('should go to Error screen when API return error', async () => {
      mockServerNode.use(
        mockTransferAuWalletFundsMutation((_, res, ctx) => res(ctx.errors([{ message: 'Something went wrong' }])))
      );
      const { getByLabelText } = render(<PaymentConfirmationScreen />);
      const button = getByLabelText('Confirm');
      fireEvent.press(button);

      await waitFor(() => {
        expect(mockedNavigate).toHaveBeenCalledWith('Error');
      });
    });

    it('should go to Daily limit error when API return daily limit', async () => {
      mockServerNode.use(
        mockTransferAuWalletFundsMutation((_, res, ctx) =>
          res(
            ctx.data({ transferAUWalletFunds: { outcome: TransactionOutcome.RefusedDailyTransfersOutLimitBreached } })
          )
        )
      );
      const { getByLabelText } = render(<PaymentConfirmationScreen />);
      const button = getByLabelText('Confirm');
      fireEvent.press(button);

      await waitFor(() => {
        expect(mockedNavigate).toHaveBeenCalledWith('DailyLimitError');
      });
    });

    it('should open pass code screen when amount > 100', async () => {
      mockServerNode.use(
        mockTransferAuWalletFundsMutation((_, res, ctx) =>
          res(ctx.data({ transferAUWalletFunds: { outcome: TransactionOutcome.Accepted } }))
        )
      );
      const mockSetRequirePasscode = jest.fn((_: boolean, func?: () => void) => func?.());
      const { result: payAnyoneStore } = renderHook(() => usePayAnyoneStore());
      const { result: passcodeStore } = renderHook(() => usePasscodeStore());

      payAnyoneStore.current.paymentDetails.amount = '101';
      passcodeStore.current.setRequirePasscode = mockSetRequirePasscode;

      const { getByLabelText } = render(<PaymentConfirmationScreen />);
      const button = getByLabelText('Confirm');
      fireEvent.press(button);

      await waitFor(() => {
        expect(mockSetRequirePasscode).toHaveBeenCalledWith(true, expect.anything());
        expect(mockReset).toHaveBeenCalledWith({
          index: 0,
          routes: [{ name: 'Success' }],
        });
      });
    });
  });

  describe('Later payment', () => {
    beforeEach(() => {
      const store = renderHook(() => usePayAnyoneStore());
      store.result.current.paymentType = 'LATER';
      store.result.current.paymentDetails = {
        amount: '2.3',
        description: 'Payment description',
      };
      store.result.current.paymentLater = {
        startDate: '2023-12-01',
      };
    });

    it('should render the third data card with scheduled payment date for later payment', async () => {
      const { getByText } = render(<PaymentConfirmationScreen />);

      expect(getByText('Scheduled date')).toBeTruthy();
      expect(getByText('01 Dec 2023')).toBeTruthy();
    });

    it('should go to Success screen when API return success', async () => {
      mockServerNode.use(
        mockCreateScheduledPaymentMutation((_, res, ctx) =>
          res(
            ctx.data({
              createScheduledPayment: {
                outcome: ScheduledPaymentSaveOutcomeType.Created,
                payment: {
                  id: 'PaymentID',
                  status: ScheduledPaymentStatus.Active,
                },
              },
            })
          )
        )
      );

      const { getByLabelText } = render(<PaymentConfirmationScreen />);

      const button = getByLabelText('Confirm');
      fireEvent.press(button);

      await waitFor(() => {
        expect(mockReset).toHaveBeenCalledWith({
          index: 0,
          routes: [{ name: 'ScheduledPaymentSuccess' }],
        });
      });
    });

    it('should go to Error screen when the outcome is not CREATED', async () => {
      mockServerNode.use(
        mockCreateScheduledPaymentMutation((_, res, ctx) =>
          res(
            ctx.data({
              createScheduledPayment: {
                outcome: ScheduledPaymentSaveOutcomeType.PaymentFormatInvalid,
              },
            })
          )
        )
      );

      const { getByLabelText } = render(<PaymentConfirmationScreen />);
      const button = getByLabelText('Confirm');
      fireEvent.press(button);

      await waitFor(() => {
        expect(mockedNavigate).toHaveBeenCalledWith('Error');
      });
    });

    it('should go to Error screen when API return error', async () => {
      mockServerNode.use(
        mockCreateScheduledPaymentMutation((_, res, ctx) => res(ctx.errors([{ message: 'Something went wrong' }])))
      );

      const { getByLabelText } = render(<PaymentConfirmationScreen />);
      const button = getByLabelText('Confirm');
      fireEvent.press(button);

      await waitFor(() => {
        expect(mockedNavigate).toHaveBeenCalledWith('Error');
      });
    });
  });

  describe('Recurring payment', () => {
    describe('should render the third data card with proper information for recurring payment', () => {
      it('no end type', async () => {
        const { result } = renderHook(() => usePayAnyoneStore());
        result.current.paymentType = 'RECURRING';
        result.current.paymentRecurring = {
          startDate: '2023-11-02',
          endType: 'noEnd',
          frequency: 'Monthly',
        };

        const { getByText } = render(<PaymentConfirmationScreen />);

        expect(getByText('Frequency')).toBeTruthy();
        expect(getByText('Monthly')).toBeTruthy();

        expect(getByText('Start date')).toBeTruthy();
        expect(getByText('02 Nov 2023')).toBeTruthy();
      });

      it('end by type', async () => {
        const { result } = renderHook(() => usePayAnyoneStore());
        result.current.paymentType = 'RECURRING';
        result.current.paymentRecurring = {
          startDate: '2023-11-02',
          endType: 'endBy',
          frequency: 'Weekly',
          endDate: '2023-11-10',
        };

        const { getByText } = render(<PaymentConfirmationScreen />);

        expect(getByText('Frequency')).toBeTruthy();
        expect(getByText('Weekly')).toBeTruthy();

        expect(getByText('Start date')).toBeTruthy();
        expect(getByText('02 Nov 2023')).toBeTruthy();

        expect(getByText('End date')).toBeTruthy();
        expect(getByText('10 Nov 2023')).toBeTruthy();
      });

      it('number of payments type', async () => {
        const { result } = renderHook(() => usePayAnyoneStore());
        result.current.paymentType = 'RECURRING';
        result.current.paymentRecurring = {
          startDate: '2023-11-02',
          endType: 'numberOfPayments',
          frequency: 'Quarterly',
          numberOfPayments: 5,
        };

        const { getByText } = render(<PaymentConfirmationScreen />);

        expect(getByText('Frequency')).toBeTruthy();
        expect(getByText('Quarterly')).toBeTruthy();

        expect(getByText('Start date')).toBeTruthy();
        expect(getByText('02 Nov 2023')).toBeTruthy();

        expect(getByText('Number of payments')).toBeTruthy();
        expect(getByText('5')).toBeTruthy();
      });
    });
  });
});
