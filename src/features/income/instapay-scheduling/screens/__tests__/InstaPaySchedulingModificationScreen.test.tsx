import React from 'react';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { mockedEventTracking } from '../../../../../../test-setup/after-env/mixpanel.setup';
import { useInAppBrowser } from '../../../../../common/shared-hooks/useInAppBrowser';
import { act, fireEvent, render, renderHook, waitFor, type RenderAPI } from '../../../../../common/utils/testing';
import { mockServerNode } from '../../../../../mock-server/mockServerNode';
import {
  FeeType,
  InstapayBankAccountSource,
  mockUpdateSchedulingSubscriptionMutation,
  mockGetBankAccountsForOrgQuery,
  Sign,
  CurrencyType,
} from '../../../../../new-graphql/generated';
import { TestInstaPayOrgKeyPayHasBalance } from '../../../instapay/utils/test-objects';
import { INSTAPAY_WITHDRAW_BY_AMOUNT_TNC_URL } from '../../constants';
import { type SchedulingSubscriptionWithOrgDetails } from '../../hooks/useCheckInstapaySchedulingPermission';
import { mockedSharedIPSchedulingEventProperties } from '../../hooks/useInstaPaySchedulingEventTracking';
import { CLICKED_ON_UPDATE_FROM_RECURRING_WITHDRAWAL_MODIFICATION } from '../../mixpanelEvents';
import { mockedNonSSABankAccount, mockedSSABankAccount } from '../../mocks/bankAccountEntriesMocks';
import { useInstaPaySchedulingStore } from '../../stores/useInstaPaySchedulingStore';
import { InstaPaySchedulingModificationScreen } from '../InstaPaySchedulingModificationScreen';

const mockUseInAppBrowser = useInAppBrowser as jest.MockedFn<typeof useInAppBrowser>;
jest.mock('../../../../../common/shared-hooks/useInAppBrowser');
const mockedOpenUrl = jest.fn();

jest.mock('@braze/react-native-sdk', () => ({
  setCustomUserAttribute: jest.fn(),
}));

describe('InstaPaySchedulingModificationScreen', () => {
  beforeEach(() => {
    mockUseInAppBrowser.mockReturnValue({
      openUrl: mockedOpenUrl,
    });

    const { result: schedulingStore } = renderHook(() => useInstaPaySchedulingStore());
    act(() => {
      schedulingStore.current.setAmount(400);
      schedulingStore.current.setBankAccount({
        accountNumber: '1234567890',
        bsb: '246579',
        accountName: 'Account Name',
        bankAccountSource: InstapayBankAccountSource.Eh,
        feeV2: {
          type: FeeType.Percentage,
          percentage: 1.5,
        },
        externalId: '0',
        isSSA: false,
      });
      schedulingStore.current.setMembership(TestInstaPayOrgKeyPayHasBalance);
      schedulingStore.current.setCurrentSubscription({
        id: '123',
        amount: {
          units: 123,
          subUnits: 0,
          sign: Sign.Positive,
          type: CurrencyType.CurrencyTypeAud,
        },
        bankAccountExternalId: '123',
      } as SchedulingSubscriptionWithOrgDetails);
    });
  });

  it('should open the T&C page if pressed on the text link', async () => {
    const { getByText } = render(<InstaPaySchedulingModificationScreen />);

    await waitFor(() => {
      fireEvent.press(getByText('Perks and Earned Wage Access Terms and Conditions'));
    });

    expect(mockedOpenUrl).toHaveBeenCalledWith(INSTAPAY_WITHDRAW_BY_AMOUNT_TNC_URL);
  });

  it('should render page properly', async () => {
    const { getByText } = render(<InstaPaySchedulingModificationScreen />);

    await waitFor(() => {
      expect(getByText(`You've selected to withdraw every $123.00 you earn.`)).toBeTruthy();
      expect(
        getByText(
          'By confirming, you agree to our Perks and Earned Wage Access Terms and Conditions for scheduled withdrawals. These transactions will show as a deduction on your payslip from Test Org.'
        )
      ).toBeTruthy();
      expect(getByText('Update')).toBeTruthy();
    });
  });

  it('should show How it works bottom sheet if pressed on How it works caption', async () => {
    const { getByTestId, getByText } = render(<InstaPaySchedulingModificationScreen />);

    fireEvent.press(getByText('How it works'));

    await waitFor(() => {
      // Expect the content of Page 1 to be rendered by default
      expect(getByText('Getting started')).toBeTruthy();
      expect(getByText('1. Choose a recurring amount or day (if applicable)')).toBeTruthy();
      expect(getByText('Next')).toBeTruthy();
      expect(getByTestId('recurring-how-it-works-bts')).toBeVisible();
    });
  });

  describe('invalid cases', () => {
    let screen: RenderAPI;
    describe('invalid amount input', () => {
      beforeEach(async () => {
        mockServerNode.use(
          mockGetBankAccountsForOrgQuery((_, res, ctx) => {
            return res(
              ctx.data({
                me: {
                  org: {
                    instapay: {
                      bankAccounts: [mockedSSABankAccount, mockedNonSSABankAccount],
                    },
                  },
                },
              })
            );
          })
        );

        screen = render(<InstaPaySchedulingModificationScreen />);

        const allBankAccountOptions = await screen.findAllByLabelText('radio-card-item');
        expect(allBankAccountOptions).toHaveLength(2);
      });

      it('should show error and disable Update button if exceeded maximum amount', async () => {
        const inputBox = screen.getByTestId('input-scheduling-amount');
        fireEvent.changeText(inputBox, '1001');

        await waitFor(() => {
          expect(screen.getByDisplayValue('1001')).toBeTruthy();
        });

        fireEvent(inputBox, 'blur');

        fireEvent.press(screen.getByText('Update'));

        await waitFor(() => {
          expect(screen.getByText('You have exceeded the maximum. Please adjust amount.'));
          expect(mockedNavigate).not.toHaveBeenCalled();
        });
      });

      it('should show error and disable Update button if under minimum amount', async () => {
        const inputBox = screen.getByTestId('input-scheduling-amount');
        fireEvent.changeText(inputBox, '0');

        await waitFor(() => {
          expect(screen.getByDisplayValue('0')).toBeTruthy();
        });

        fireEvent(inputBox, 'blur');

        fireEvent.press(screen.getByText('Update'));

        await waitFor(() => {
          expect(screen.getByText('You have not reached the minimum. Please adjust amount.'));
          expect(mockedNavigate).not.toHaveBeenCalled();
        });
      });

      it('should show error and disable Update button if inputted invalid characters', async () => {
        const inputBox = screen.getByTestId('input-scheduling-amount');
        fireEvent.changeText(inputBox, 'abc');

        await waitFor(() => {
          expect(screen.getByDisplayValue('abc')).toBeTruthy();
        });

        fireEvent(inputBox, 'blur');

        fireEvent.press(screen.getByText('Update'));

        await waitFor(() => {
          expect(screen.getByText('Field cannot contain words.'));
          expect(mockedNavigate).not.toHaveBeenCalled();
        });
      });
    });

    it('should disable Update button if failed to load list of bank accounts ', async () => {
      mockServerNode.use(
        mockGetBankAccountsForOrgQuery((_, res, ctx) => {
          return res(ctx.status(400), ctx.errors([{ message: 'Errors fetching bank accounts' }]));
        })
      );

      const { getByText } = render(<InstaPaySchedulingModificationScreen />);

      fireEvent.press(getByText('Update'));

      await waitFor(() => {
        expect(mockedNavigate).not.toHaveBeenCalled();
      });
    });

    it('should disable Update button if fetched bank accounts list is empty ', async () => {
      mockServerNode.use(
        mockGetBankAccountsForOrgQuery((_, res, ctx) => {
          return res(
            ctx.data({
              me: {
                org: {
                  instapay: {
                    bankAccounts: [],
                  },
                },
              },
            })
          );
        })
      );

      const { getByText } = render(<InstaPaySchedulingModificationScreen />);

      fireEvent.press(getByText('Update'));

      await waitFor(() => {
        expect(mockedNavigate).not.toHaveBeenCalled();
      });
    });
  });

  describe('click on update button', () => {
    beforeEach(() => {
      mockServerNode.use(
        mockUpdateSchedulingSubscriptionMutation((_, res, ctx) => {
          return res(
            ctx.data({
              instapay: {
                updateSchedulingSubscription: {
                  success: true,
                },
              },
            })
          );
        }),
        mockGetBankAccountsForOrgQuery((_, res, ctx) => {
          return res(
            ctx.data({
              me: {
                org: {
                  instapay: {
                    bankAccounts: [mockedSSABankAccount, mockedNonSSABankAccount],
                  },
                },
              },
            })
          );
        })
      );
    });

    it('api success and navigate to success screen', async () => {
      const { findAllByLabelText, getByTestId, getByText } = render(<InstaPaySchedulingModificationScreen />);

      const allBankAccountOptions = await findAllByLabelText('radio-card-item');
      expect(allBankAccountOptions).toHaveLength(2);

      const inputBox = getByTestId('input-scheduling-amount');
      fireEvent.changeText(inputBox, '500');
      fireEvent(inputBox, 'blur');

      fireEvent.press(getByText('Update'));

      await waitFor(() => {
        expect(mockedNavigate).toHaveBeenCalledWith('InstaPaySchedulingSuccess', {
          formattedAmount: '$500.00',
          action: 'byAmountModification',
        });
        expect(mockedEventTracking).toHaveBeenCalledWith({
          ...mockedSharedIPSchedulingEventProperties({
            amount: 500,
          }),
          event: CLICKED_ON_UPDATE_FROM_RECURRING_WITHDRAWAL_MODIFICATION,
        });
      });
    });

    it('api error and navigate to error screen', async () => {
      mockServerNode.use(
        mockUpdateSchedulingSubscriptionMutation((_, res, ctx) => {
          return res(
            ctx.data({
              instapay: {
                updateSchedulingSubscription: {
                  success: false,
                },
              },
            })
          );
        })
      );
      const { findAllByLabelText, getByText } = render(<InstaPaySchedulingModificationScreen />);

      const allBankAccountOptions = await findAllByLabelText('radio-card-item');
      expect(allBankAccountOptions).toHaveLength(2);

      fireEvent.press(getByText('Update'));

      await waitFor(() => {
        expect(mockedNavigate).toHaveBeenCalledWith('InstaPaySchedulingError');
      });
    });
  });
});
