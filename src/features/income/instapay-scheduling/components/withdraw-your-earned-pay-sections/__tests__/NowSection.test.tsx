import React from 'react';
import { mockedEventTracking } from '../../../../../../../test-setup/after-env/mixpanel.setup';
import { mockReturnIncomeVisibility } from '../../../../../../common/hooks/__mocks__/useIncomeVisibility';
import { fireEvent, render, waitFor } from '../../../../../../common/utils/testing';
import { InstapayErrorCode } from '../../../../../../new-graphql/generated';
import { INSTAPAY_MODULE_NAME } from '../../../../instapay/constants/trackingEvents';
import { mockUseInstaPayAvailableBalances } from '../../../../instapay/hooks/__mocks__/useInstaPayAvailableBalances';
import type { InstaPayOrg } from '../../../../instapay/hooks/useInstaPayAvailableBalances';
import {
  TestInstaPayOrgKeyPayHasBalance,
  TestInstaPayOrgKeyPayNoBalance,
} from '../../../../instapay/utils/test-objects';
import { useCheckRecurringByAmountEligibility } from '../../../hooks/useCheckRecurringByAmountEligibility';
import { mockedSharedIPSchedulingEventProperties } from '../../../hooks/useInstaPaySchedulingEventTracking';
import { CLICKED_ON_TRY_RECURRING_WITHDRAWAL_CTA_ON_NOW_TAB, VIEWED_ERROR_ON_NOW_TAB } from '../../../mixpanelEvents';
import type { RecurringByAmountEligibilyDetails } from '../../../stores/useInstaPaySchedulingStore';
import { WithdrawYourEarnedPaySectionKey } from '../../../stores/useWithdrawYourEarnedPaySectionStore';
import { NowSection } from '../NowSection';

const MOCKED_TRUE_INCOME_VISIBILITY = {
  showIncomeTab: true,
  showInstapay: true,
};

const mockSetRecurringMembership = jest.fn();
const mockSetSelectedTabOfWithdrawYourEarnedPaySection = jest.fn();
jest.mock('../../../stores/useInstaPaySchedulingStore', () => {
  return {
    useInstaPaySchedulingStore: () => ({
      setMembership: mockSetRecurringMembership,
    }),
  };
});
jest.mock('../../../stores/useWithdrawYourEarnedPaySectionStore', () => {
  return {
    ...jest.requireActual('../../../stores/useWithdrawYourEarnedPaySectionStore'),
    useWithdrawYourEarnedPaySectionStore: () => ({
      setSelectedTabKey: mockSetSelectedTabOfWithdrawYourEarnedPaySection,
    }),
  };
});
const mockUseCheckRecurringByAmountEligibility = useCheckRecurringByAmountEligibility as jest.MockedFn<
  typeof useCheckRecurringByAmountEligibility
>;
jest.mock('../../../hooks/useCheckRecurringByAmountEligibility');

describe('NowSection', () => {
  beforeEach(() => {
    mockReturnIncomeVisibility(MOCKED_TRUE_INCOME_VISIBILITY);
    mockUseCheckRecurringByAmountEligibility.mockReturnValue({
      isLoaded: true,
      getOrgRecurringByAmountEligibility: (orgId?: string) =>
        ({
          orgId,
          isEligible: false,
        } as RecurringByAmountEligibilyDetails),
    });
  });

  test('should render Under maintenance error message if Withdraw Now is under maintenance', () => {
    mockReturnIncomeVisibility({ ...MOCKED_TRUE_INCOME_VISIBILITY, instapayNowUnderMaintenance: true });

    mockUseInstaPayAvailableBalances.mockReturnValue({
      sumReachedMinimumBalances: 100,
      sumAvailableBalance: 100,
      orgs: [],
    } as never);
    mockUseCheckRecurringByAmountEligibility.mockReturnValue({
      isLoaded: true,
      getOrgRecurringByAmountEligibility: (orgId?: string) =>
        ({
          orgId,
          isEligible: orgId === TestInstaPayOrgKeyPayNoBalance.getId(),
        } as RecurringByAmountEligibilyDetails),
    });

    const { getByText } = render(<NowSection permittedForRecurring />);

    expect(
      getByText('Apologies, accessing your earned pay is currently under maintenance, please try again later.')
    ).toBeDefined();
  });

  describe('Single org', () => {
    test('should render when balance is 0', async () => {
      mockUseInstaPayAvailableBalances.mockReturnValue({
        sumReachedMinimumBalances: 0,
        orgs: [TestInstaPayOrgKeyPayNoBalance],
      } as never);
      mockUseCheckRecurringByAmountEligibility.mockReturnValue({
        isLoaded: true,
        getOrgRecurringByAmountEligibility: (orgId?: string) =>
          ({
            orgId,
            isEligible: orgId === TestInstaPayOrgKeyPayNoBalance.getId(),
          } as RecurringByAmountEligibilyDetails),
      });

      const { getByText } = render(<NowSection permittedForRecurring />);

      expect(getByText('Your balance is still growing'));
      expect(getByText('Try recurring withdrawal'));

      fireEvent.press(getByText('Try recurring withdrawal'));

      await waitFor(() => {
        expect(mockedEventTracking).toHaveBeenCalledWith({
          ...mockedSharedIPSchedulingEventProperties({
            module: INSTAPAY_MODULE_NAME,
            errorCode: 'Balance is below minimum amount',
          }),
          event: VIEWED_ERROR_ON_NOW_TAB,
        });
        expect(mockedEventTracking).toHaveBeenCalledWith({
          ...mockedSharedIPSchedulingEventProperties({
            module: INSTAPAY_MODULE_NAME,
          }),
          event: CLICKED_ON_TRY_RECURRING_WITHDRAWAL_CTA_ON_NOW_TAB,
        });

        // Make sure the navigation and setting of current membership to recurring is handled properly
        expect(mockSetRecurringMembership).toHaveBeenCalledWith(TestInstaPayOrgKeyPayNoBalance);
        expect(mockSetSelectedTabOfWithdrawYourEarnedPaySection).toHaveBeenCalledWith(
          WithdrawYourEarnedPaySectionKey.RECURRING
        );
      });
    });

    test('should render when balance is greater than 0', () => {
      mockUseInstaPayAvailableBalances.mockReturnValue({
        sumReachedMinimumBalances: 100,
        sumAvailableBalance: 100,
        orgs: [
          {
            ...TestInstaPayOrgKeyPayNoBalance,
            balance: 100,
          } as InstaPayOrg,
        ],
      } as never);
      const { getByText } = render(<NowSection permittedForRecurring />);

      expect(getByText('Choose your amount')).toBeDefined();
      expect(getByText('$100')).toBeDefined();
      expect(getByText('Other')).toBeDefined();
    });

    test('should show error when an account has problem', () => {
      mockUseInstaPayAvailableBalances.mockReturnValue({
        orgs: [
          {
            ...TestInstaPayOrgKeyPayHasBalance,
            instapay: {
              balance: {
                __typename: 'InstapayError',
                code: InstapayErrorCode.TransactionBlocked,
              },
            },
            violation: InstapayErrorCode.TransactionBlocked,
          },
        ],
      } as never);
      const { getByText } = render(<NowSection permittedForRecurring />);

      expect(getByText('Withdraw now is currently unavailable.')).toBeDefined();
      expect(mockedEventTracking).toHaveBeenCalledWith({
        ...mockedSharedIPSchedulingEventProperties({
          module: INSTAPAY_MODULE_NAME,
          errorCode: InstapayErrorCode.TransactionBlocked,
        }),
        event: VIEWED_ERROR_ON_NOW_TAB,
      });
    });
  });

  describe('Multiple org', () => {
    it('should render the no available balance error if all orgs are having 0 balance but not violating any policy', async () => {
      mockUseInstaPayAvailableBalances.mockReturnValue({
        sumReachedMinimumBalances: 0,
        sumAvailableBalance: 0,
        orgs: [
          TestInstaPayOrgKeyPayNoBalance,
          {
            ...TestInstaPayOrgKeyPayNoBalance,
            id: 2,
            uuid: '002',
            getId: () => '002',
            name: 'noBalanceOrg2',
          } as InstaPayOrg,
        ],
      } as never);
      const { getByText, queryByTestId } = render(<NowSection permittedForRecurring />);

      await waitFor(() => {
        expect(
          getByText('Apologies, none of the organisations have available balances right now. Please try again later.')
        );
        expect(queryByTestId('choosing-employer-select')).not.toBeTruthy();
      });
      expect(mockedEventTracking).toHaveBeenCalledWith({
        ...mockedSharedIPSchedulingEventProperties({
          module: INSTAPAY_MODULE_NAME,
          errorCode: 'All organisations are having no available balances',
        }),
        event: VIEWED_ERROR_ON_NOW_TAB,
      });
    });

    describe('none memberships are valid', () => {
      beforeEach(() => {
        mockUseInstaPayAvailableBalances.mockReturnValue({
          sumReachedMinimumBalances: 150,
          orgs: [
            {
              id: 1,
              uuid: '12345',
              kpBusinessId: 0,
              balance: 100,
              getId(): string {
                return '12345';
              },
              instapay: {
                balance: {
                  __typename: 'InstapayError',
                  code: InstapayErrorCode.InstapayOnlyAvailableNextPayPeriod,
                },
                withdrawalLimit: {
                  __typename: 'InstapayWithdrawalLimit',
                  withdrawalMaxLimit: 1000,
                  withdrawalMinLimit: 100,
                },
              },
              limit: { max: 100, min: 1000 },
              isReachedMinBalance: true,
              name: 'Test Violated Org 1',
              violation: InstapayErrorCode.InstapayOnlyAvailableNextPayPeriod,
            },
            {
              id: 1,
              uuid: '23456',
              kpBusinessId: 0,
              balance: 50,
              getId(): string {
                return '23456';
              },
              instapay: {
                balance: {
                  __typename: 'InstapayError',
                  code: InstapayErrorCode.ApprovedTimesheetNotFound,
                },
                withdrawalLimit: {
                  __typename: 'InstapayWithdrawalLimit',
                  withdrawalMaxLimit: 1000,
                  withdrawalMinLimit: 100,
                },
              },
              limit: { max: 100, min: 1000 },
              isReachedMinBalance: true,
              name: 'Test Violated Org 2',
              violation: InstapayErrorCode.ApprovedTimesheetNotFound,
            },
          ] as InstaPayOrg[],
        } as never);
      });

      it('should render properly and select the first membership by default', async () => {
        const { getByText } = render(<NowSection permittedForRecurring />);

        await waitFor(() => {
          // Should select the first membership by default
          expect(getByText('available balance $100.00'));

          // Should render the error of this type
          expect(getByText('Withdraw now is currently unavailable.')).toBeTruthy();
          expect(getByText('This is due to your pay cycle.')).toBeTruthy();
          expect(getByText('Learn more about how your pay cycle affects your eligibility')).toBeTruthy();

          // Verify event tracking
          expect(mockedEventTracking).toHaveBeenCalledWith({
            ...mockedSharedIPSchedulingEventProperties({
              module: INSTAPAY_MODULE_NAME,
              errorCode: InstapayErrorCode.InstapayOnlyAvailableNextPayPeriod,
            }),
            event: VIEWED_ERROR_ON_NOW_TAB,
          });
        });
      });

      it('should update the details if change the selected membership to the second invalid one', async () => {
        const { findByTestId, getByText } = render(<NowSection permittedForRecurring />);

        const selectElement = await findByTestId('choosing-employer-select');
        fireEvent.press(selectElement);

        const optionToSelect = await findByTestId('select-option-org-Test Violated Org 2');
        fireEvent.press(optionToSelect);

        await waitFor(() => {
          // Should update the balance showing to the one of the second invalid one
          expect(getByText('available balance $50.00'));

          // Should render the error of this membership
          expect(getByText('Withdraw now is currently unavailable.')).toBeTruthy();
          expect(
            getByText('This is because your timesheets are currently awaiting approval. Please try again later.')
          ).toBeTruthy();
        });
      });
    });

    describe('mixed valid and non-valid memberships', () => {
      beforeEach(() => {
        mockUseInstaPayAvailableBalances.mockReturnValue({
          sumReachedMinimumBalances: 470.79,
          orgs: [
            {
              id: 1,
              uuid: '12345',
              kpBusinessId: 0,
              balance: 100,
              getId(): string {
                return '12345';
              },
              instapay: {
                balance: {
                  __typename: 'InstapayError',
                  code: InstapayErrorCode.ApprovedTimesheetNotFound,
                },
                withdrawalLimit: {
                  __typename: 'InstapayWithdrawalLimit',
                  withdrawalMaxLimit: 1000,
                  withdrawalMinLimit: 100,
                },
              },
              limit: { max: 100, min: 1000 },
              isReachedMinBalance: true,
              name: 'Test Violated Org 1',
              violation: InstapayErrorCode.ApprovedTimesheetNotFound,
            },
            {
              id: 1,
              uuid: '23456',
              kpBusinessId: 0,
              balance: 200.23,
              getId(): string {
                return '23456';
              },
              instapay: {
                balance: {
                  __typename: 'InstapayBalance',
                  balance: 200.23,
                  id: 'org-23456-balance',
                },
                withdrawalLimit: {
                  __typename: 'InstapayWithdrawalLimit',
                  withdrawalMaxLimit: 1000,
                  withdrawalMinLimit: 100,
                },
              },
              limit: { max: 100, min: 1000 },
              isReachedMinBalance: true,
              name: 'Test Valid Org 1',
              violation: false,
            },
            {
              id: 1,
              uuid: '34567',
              kpBusinessId: 0,
              balance: 170.56,
              getId(): string {
                return '34567';
              },
              instapay: {
                balance: {
                  __typename: 'InstapayBalance',
                  balance: 170.56,
                  id: 'org-34567-balance',
                },
                withdrawalLimit: {
                  __typename: 'InstapayWithdrawalLimit',
                  withdrawalMaxLimit: 1000,
                  withdrawalMinLimit: 100,
                },
              },
              limit: { max: 100, min: 1000 },
              isReachedMinBalance: true,
              name: 'Test Valid Org 2',
              violation: false,
            },
          ] as InstaPayOrg[],
        } as never);
      });

      it('should render properly and select the first valid membership by default', async () => {
        const { getByText } = render(<NowSection permittedForRecurring />);

        await waitFor(() => {
          // Should select the first valid membership by default
          expect(getByText('available balance $200.23'));

          // Should render the creation box properly
          expect(getByText('Choose your amount')).toBeTruthy();
          expect(getByText('$200.23')).toBeTruthy();
          expect(getByText('$150')).toBeTruthy();
          expect(getByText('Other')).toBeTruthy();
          expect(getByText('Withdraw $200.23 now')).toBeTruthy();
        });
      });

      it('should update the details to error state if select the invalid membership', async () => {
        const { findByTestId, getByText, queryByTestId } = render(<NowSection permittedForRecurring />);

        const selectElement = await findByTestId('choosing-employer-select');
        fireEvent.press(selectElement);

        const optionToSelect = await findByTestId('select-option-org-Test Violated Org 1');
        fireEvent.press(optionToSelect);

        await waitFor(() => {
          expect(getByText('available balance $100.00'));

          // Should render the error of this membership
          expect(getByText('Withdraw now is currently unavailable.')).toBeTruthy();
          expect(
            getByText('This is because your timesheets are currently awaiting approval. Please try again later.')
          ).toBeTruthy();

          // Just to make sure CTA is not visible and user cannot proceed with false status
          expect(queryByTestId('custom-chip-cta')).not.toBeTruthy();

          // Verify event tracking
          expect(mockedEventTracking).toHaveBeenCalledWith({
            ...mockedSharedIPSchedulingEventProperties({
              module: INSTAPAY_MODULE_NAME,
              errorCode: InstapayErrorCode.ApprovedTimesheetNotFound,
            }),
            event: VIEWED_ERROR_ON_NOW_TAB,
          });
        });
      });

      it('should correctly reflect the balance and selectable amounts if switching between valid organisations', async () => {
        const { findByTestId, getByText } = render(<NowSection permittedForRecurring />);

        const selectElement = await findByTestId('choosing-employer-select');
        fireEvent.press(selectElement);

        const optionToSelect = await findByTestId('select-option-org-Test Valid Org 2');
        fireEvent.press(optionToSelect);

        await waitFor(() => {
          expect(getByText('available balance $170.56'));

          // Should render the creation box properly
          expect(getByText('Choose your amount')).toBeTruthy();
          expect(getByText('$170.56')).toBeTruthy();
          expect(getByText('$150')).toBeTruthy();
          expect(getByText('Other')).toBeTruthy();
          expect(getByText('Withdraw $170.56 now')).toBeTruthy();
        });
      });
    });

    describe('switching to a membership with balance below minimum', () => {
      const mockedMembershipWithGrowingBalance = {
        id: 2,
        uuid: '23456',
        kpBusinessId: 0,
        balance: 20,
        getId(): string {
          return '23456';
        },
        instapay: {
          balance: {
            __typename: 'InstapayBalance',
            balance: 20,
            id: 'org-23456-balance',
          },
          withdrawalLimit: {
            __typename: 'InstapayWithdrawalLimit',
            withdrawalMaxLimit: 1000,
            withdrawalMinLimit: 100,
          },
        },
        limit: { max: 100, min: 1000 },
        isReachedMinBalance: true,
        name: 'Test Org with growing balance',
        violation: false,
      };

      beforeEach(() => {
        const orgs = [
          {
            id: 1,
            uuid: '12345',
            kpBusinessId: 0,
            balance: 100,
            getId(): string {
              return '12345';
            },
            instapay: {
              balance: {
                __typename: 'InstapayError',
                code: InstapayErrorCode.ApprovedTimesheetNotFound,
              },
              withdrawalLimit: {
                __typename: 'InstapayWithdrawalLimit',
                withdrawalMaxLimit: 1000,
                withdrawalMinLimit: 100,
              },
            },
            limit: { max: 100, min: 1000 },
            isReachedMinBalance: true,
            name: 'Test Violated Org 1',
            violation: InstapayErrorCode.ApprovedTimesheetNotFound,
          },
          mockedMembershipWithGrowingBalance,
        ] as InstaPayOrg[];

        mockUseInstaPayAvailableBalances.mockReturnValue({
          sumReachedMinimumBalances: 0,
          sumAvailableBalances: 120,
          orgs: orgs,
        } as never);
        mockUseCheckRecurringByAmountEligibility.mockReturnValue({
          isLoaded: true,
          getOrgRecurringByAmountEligibility: (orgId?: string) =>
            ({
              orgId,
              isEligible: orgId === mockedMembershipWithGrowingBalance.getId(),
            } as RecurringByAmountEligibilyDetails),
        });
      });

      it('should show Try recurring button and handle navigation properly if permitted and current org is eligible', async () => {
        const { findByTestId, getByText } = render(<NowSection permittedForRecurring />);

        const selectElement = await findByTestId('choosing-employer-select');
        fireEvent.press(selectElement);

        const optionToSelect = await findByTestId('select-option-org-Test Org with growing balance');
        fireEvent.press(optionToSelect);

        await waitFor(() => {
          expect(getByText('Try recurring withdrawal')).toBeTruthy();
        });

        fireEvent.press(getByText('Try recurring withdrawal'));

        await waitFor(() => {
          expect(mockSetRecurringMembership).toHaveBeenCalledWith(mockedMembershipWithGrowingBalance);
          expect(mockSetSelectedTabOfWithdrawYourEarnedPaySection).toHaveBeenCalledWith(
            WithdrawYourEarnedPaySectionKey.RECURRING
          );
        });
      });

      it('should not show Try recurring withdrawal button if not permitted', async () => {
        const { findByTestId, queryByText } = render(<NowSection permittedForRecurring={false} />);

        const selectElement = await findByTestId('choosing-employer-select');
        fireEvent.press(selectElement);

        const optionToSelect = await findByTestId('select-option-org-Test Org with growing balance');
        fireEvent.press(optionToSelect);

        await waitFor(() => {
          expect(queryByText('Try recurring withdrawal')).not.toBeTruthy();
        });
      });
    });
  });
});
