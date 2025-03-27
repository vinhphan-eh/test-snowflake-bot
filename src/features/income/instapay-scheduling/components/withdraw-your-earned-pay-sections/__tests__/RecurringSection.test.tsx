import React from 'react';
import { mockReturnIncomeVisibility } from '../../../../../../common/hooks/__mocks__/useIncomeVisibility';
import { render, waitFor, fireEvent, renderHook } from '../../../../../../common/utils/testing';
import { CurrencyType, InstapayErrorCode, Sign } from '../../../../../../new-graphql/generated';
import { aSchedulingSubscription } from '../../../../../../new-graphql/mocks/generated-mocks';
import { mockUseInstaPayAvailableBalances } from '../../../../instapay/hooks/__mocks__/useInstaPayAvailableBalances';
import type { InstaPayOrg } from '../../../../instapay/hooks/useInstaPayAvailableBalances';
import { TestInstaPayOrgKeyPayHasBalance } from '../../../../instapay/utils/test-objects';
import { RecurringSection } from '../RecurringSection';
import { useInstaPaySchedulingStore } from '../../../stores/useInstaPaySchedulingStore';

jest.mock('../../../../../../common/hooks/useIncomeVisibility', () => ({ useIncomeVisibility: jest.fn() }));

const MOCKED_TRUE_INCOME_VISIBILITY = {
  showIncomeTab: true,
  showInstapay: true,
};

describe('RecurringSection', () => {
  const mockStoredEligibilityDetails = (organisations: InstaPayOrg[]) => {
    const { result: schedulingStore } = renderHook(() => useInstaPaySchedulingStore());
    schedulingStore.current.setEligibilityDetails(
      organisations.map(organisation => ({
        orgId: organisation.getId(),
        isEligible: !organisation.violation,
        errorCode: organisation.violation || undefined,
      }))
    );
  };

  beforeEach(() => {
    mockReturnIncomeVisibility(MOCKED_TRUE_INCOME_VISIBILITY);
  });

  it('should render loading skeleton if is loading', async () => {
    mockUseInstaPayAvailableBalances.mockReturnValue({
      sumReachedMinimumBalances: 0,
      sumAvailableBalances: 0,
      orgs: [TestInstaPayOrgKeyPayHasBalance] as InstaPayOrg[],
    } as never);

    const { getByTestId } = render(
      <RecurringSection
        isRecurringByAmountVisible
        openHowItWorks={jest.fn()}
        activeSchedulingSubscriptions={[]}
        isLoading
      />
    );

    await waitFor(() => {
      expect(getByTestId('recurring-section-loading-skeleton')).toBeTruthy();
    });
  });

  it('should render Under maintenance error message if EWA Now is under maintenance', () => {
    mockReturnIncomeVisibility({ ...MOCKED_TRUE_INCOME_VISIBILITY, instapayNowUnderMaintenance: true });

    mockUseInstaPayAvailableBalances.mockReturnValue({
      sumReachedMinimumBalances: 100,
      sumAvailableBalance: 100,
      orgs: [TestInstaPayOrgKeyPayHasBalance],
    } as never);

    const { getByText } = render(
      <RecurringSection openHowItWorks={jest.fn()} isLoading={false} isRecurringByAmountVisible />
    );

    expect(
      getByText('Apologies, accessing your earned pay is currently under maintenance, please try again later.')
    ).toBeDefined();
  });

  describe('Single org', () => {
    it('should render content properly if user has an effective scheduling subscription', async () => {
      const mockedOrgs = [TestInstaPayOrgKeyPayHasBalance] as InstaPayOrg[];

      mockUseInstaPayAvailableBalances.mockReturnValue({
        sumReachedMinimumBalances: 0,
        sumAvailableBalances: 120,
        orgs: mockedOrgs,
      } as never);

      mockStoredEligibilityDetails(mockedOrgs);

      const { getByText } = render(
        <RecurringSection
          isRecurringByAmountVisible
          openHowItWorks={jest.fn()}
          activeSchedulingSubscriptions={[
            {
              ...aSchedulingSubscription({
                amount: {
                  sign: Sign.Positive,
                  units: 123,
                  subUnits: 50,
                  type: CurrencyType.CurrencyTypeAud,
                },
              }),
              organisationId: TestInstaPayOrgKeyPayHasBalance.getId(),
            },
          ]}
          isLoading={false}
        />
      );

      await waitFor(() => {
        expect(getByText('Your recurring payments are set to:')).toBeTruthy();
        expect(getByText('Withdraw every $123.50 earned.')).toBeTruthy();
        expect(getByText('Edit')).toBeTruthy();
      });
    });

    it('should render content properly if user is not eligible for Withdraw Recurring', async () => {
      const mockedOrgs = [
        {
          id: 1,
          uuid: '0',
          kpBusinessId: 234,
          balance: 0,
          getId(): string {
            return '234';
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
          name: 'Test Violated Org',
          violation: InstapayErrorCode.ApprovedTimesheetNotFound,
        },
      ] as InstaPayOrg[];

      mockUseInstaPayAvailableBalances.mockReturnValue({
        sumReachedMinimumBalances: 0,
        sumAvailableBalances: 0,
        orgs: mockedOrgs,
      } as never);
      mockStoredEligibilityDetails(mockedOrgs);

      const { getByText } = render(
        <RecurringSection
          isRecurringByAmountVisible={false}
          openHowItWorks={jest.fn()}
          isLoading={false}
          activeSchedulingSubscriptions={[]}
        />
      );

      await waitFor(() => {
        expect(getByText('Recurring withdrawal is currently unavailable.')).toBeTruthy();
        expect(
          getByText('This is because your timesheets are currently awaiting approval. Please try again later.')
        ).toBeTruthy();
      });
    });

    it('should render content properly if user should be eligible to create a new scheduling subscription', async () => {
      const mockedOrgs = [TestInstaPayOrgKeyPayHasBalance] as InstaPayOrg[];

      mockUseInstaPayAvailableBalances.mockReturnValue({
        sumReachedMinimumBalances: 0,
        sumAvailableBalances: 0,
        orgs: mockedOrgs,
      } as never);
      mockStoredEligibilityDetails(mockedOrgs);

      const { getByText } = render(
        <RecurringSection
          isRecurringByAmountVisible
          openHowItWorks={jest.fn()}
          activeSchedulingSubscriptions={[]}
          isLoading={false}
        />
      );

      await waitFor(() => {
        expect(getByText('Set a withdrawal amount')).toBeTruthy();
        expect(getByText('How it works')).toBeTruthy();
        expect(getByText('Withdraw every $300 earned')).toBeTruthy();
      });
    });
  });

  describe('Multiple org', () => {
    describe('none memberships are valid', () => {
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
                code: InstapayErrorCode.AgeIsNotEligible,
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
            violation: InstapayErrorCode.AgeIsNotEligible,
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
        ] as InstaPayOrg[];

        mockUseInstaPayAvailableBalances.mockReturnValue({
          sumReachedMinimumBalances: 150,
          orgs: orgs,
        } as never);
        mockStoredEligibilityDetails(orgs);
      });

      it('should render properly and select the first membership by default', async () => {
        const { getByText } = render(
          <RecurringSection
            isRecurringByAmountVisible
            openHowItWorks={jest.fn()}
            isLoading={false}
            activeSchedulingSubscriptions={[]}
          />
        );

        await waitFor(() => {
          // Should select the first membership by default
          expect(getByText('available balance $100.00'));

          // Should render the general error
          expect(getByText('Recurring withdrawal is currently unavailable.')).toBeTruthy();
          expect(getByText('This could be for the following reasons:')).toBeTruthy();
          expect(getByText('You haven’t worked 3 consecutive pay periods.')).toBeTruthy();
          expect(getByText('You do not meet the minimum age requirement of 16 years and older.')).toBeTruthy();
        });
      });

      it('should update the details if change the selected membership to the second invalid one', async () => {
        const { findByTestId, getByText } = render(
          <RecurringSection
            isRecurringByAmountVisible
            openHowItWorks={jest.fn()}
            isLoading={false}
            activeSchedulingSubscriptions={[]}
          />
        );

        const selectElement = await findByTestId('choosing-employer-select');
        fireEvent.press(selectElement);

        const optionToSelect = await findByTestId('select-option-org-Test Violated Org 2');
        fireEvent.press(optionToSelect);

        await waitFor(() => {
          // Should update the balance showing to the one of the second invalid one
          expect(getByText('available balance $50.00'));

          // Should render the error of this membership
          expect(getByText('Recurring withdrawal is currently unavailable.')).toBeTruthy();
          expect(
            getByText('This is because your timesheets are currently awaiting approval. Please try again later.')
          ).toBeTruthy();
        });
      });
    });

    describe('mixed valid and non-valid memberships', () => {
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
        ] as InstaPayOrg[];

        mockUseInstaPayAvailableBalances.mockReturnValue({
          sumReachedMinimumBalances: 470.79,
          orgs: orgs,
        } as never);
        mockStoredEligibilityDetails(orgs);
      });

      it('should render properly and select the first valid membership by default', async () => {
        const { getByText } = render(
          <RecurringSection
            isRecurringByAmountVisible
            openHowItWorks={jest.fn()}
            isLoading={false}
            activeSchedulingSubscriptions={[]}
          />
        );

        await waitFor(() => {
          // Should select the first valid membership by default
          expect(getByText('available balance $200.23'));

          // Should render the creation box properly
          expect(getByText('Set a withdrawal amount')).toBeTruthy();
          expect(getByText('$500')).toBeTruthy();
          expect(getByText('$300')).toBeTruthy();
          expect(getByText('$100')).toBeTruthy();
          expect(getByText('Other')).toBeTruthy();
          expect(getByText('Withdraw every $300 earned')).toBeTruthy();
        });
      });

      it('should update the details to error state if select the invalid membership', async () => {
        const { findByTestId, getByText, queryByTestId } = render(
          <RecurringSection
            isRecurringByAmountVisible
            openHowItWorks={jest.fn()}
            isLoading={false}
            activeSchedulingSubscriptions={[]}
          />
        );

        const selectElement = await findByTestId('choosing-employer-select');
        fireEvent.press(selectElement);

        const optionToSelect = await findByTestId('select-option-org-Test Violated Org 1');
        fireEvent.press(optionToSelect);

        await waitFor(() => {
          expect(getByText('available balance $100.00'));

          // Should render the error of this membership
          expect(getByText('Recurring withdrawal is currently unavailable.')).toBeTruthy();
          expect(
            getByText('This is because your timesheets are currently awaiting approval. Please try again later.')
          ).toBeTruthy();

          // Just to make sure CTA is not visible and user cannot proceed with false status
          expect(queryByTestId('custom-chip-cta')).not.toBeTruthy();
        });
      });
    });

    describe('having active scheduling subscriptions', () => {
      beforeEach(() => {
        const orgs = [
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
            id: 2,
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
        ] as InstaPayOrg[];

        mockUseInstaPayAvailableBalances.mockReturnValue({
          sumReachedMinimumBalances: 370.79,
          orgs: orgs,
        } as never);
        mockStoredEligibilityDetails(orgs);
      });

      const mockedActiveSchedulingSubscriptionOfSecondOrg = {
        ...aSchedulingSubscription({
          amount: {
            sign: Sign.Positive,
            units: 123,
            subUnits: 50,
            type: CurrencyType.CurrencyTypeAud,
          },
        }),
        organisationId: '34567',
      };

      it('should render properly and select the first valid membership by default', async () => {
        const { getByText } = render(
          <RecurringSection
            isRecurringByAmountVisible
            openHowItWorks={jest.fn()}
            isLoading={false}
            activeSchedulingSubscriptions={[mockedActiveSchedulingSubscriptionOfSecondOrg]}
          />
        );

        await waitFor(() => {
          // Should select the first valid membership by default
          expect(getByText('available balance $200.23'));

          // Should render the creation box properly
          expect(getByText('Set a withdrawal amount')).toBeTruthy();
          expect(getByText('$500')).toBeTruthy();
          expect(getByText('$300')).toBeTruthy();
          expect(getByText('$100')).toBeTruthy();
          expect(getByText('Other')).toBeTruthy();
          expect(getByText('Withdraw every $300 earned')).toBeTruthy();
        });
      });

      it('should update the content to subscription details version if switching to the membership with active subscription', async () => {
        const { findByTestId, getByText } = render(
          <RecurringSection
            isRecurringByAmountVisible
            openHowItWorks={jest.fn()}
            isLoading={false}
            activeSchedulingSubscriptions={[mockedActiveSchedulingSubscriptionOfSecondOrg]}
          />
        );

        const selectElement = await findByTestId('choosing-employer-select');
        fireEvent.press(selectElement);

        const optionToSelect = await findByTestId('select-option-org-Test Valid Org 2');
        fireEvent.press(optionToSelect);

        await waitFor(() => {
          expect(getByText('available balance $170.56'));

          // Should render the details of the active subscription
          expect(getByText('Your recurring payments are set to:')).toBeTruthy();
          expect(getByText('Withdraw every $123.50 earned.')).toBeTruthy();
          expect(getByText('Edit')).toBeTruthy();
          expect(getByText(`Whenever it's ready, at 9pm.`)).toBeTruthy();
        });
      });
    });
  });
});
