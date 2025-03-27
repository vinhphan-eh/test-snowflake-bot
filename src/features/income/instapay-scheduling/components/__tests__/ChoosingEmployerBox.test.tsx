import React from 'react';
import { formatCurrency } from '../../../../../common/utils/numbers';
import { fireEvent, render, renderHook, waitFor, within } from '../../../../../common/utils/testing';
import { InstapayErrorCode } from '../../../../../new-graphql/generated';
import type { InstaPayOrg } from '../../../instapay/hooks/useInstaPayAvailableBalances';
import { useInstaPayDrawdownStore } from '../../../instapay/stores/useInstaPayDrawdownStore';
import { TestInstaPayOrgKeyPayHasBalance, TestInstaPayOrgKeyPayNoBalance } from '../../../instapay/utils/test-objects';
import { ChoosingEmployerBox } from '../ChoosingEmployerBox';
import { WithdrawYourEarnedPaySectionKey } from '../../stores/useWithdrawYourEarnedPaySectionStore';
import { useInstaPaySchedulingStore } from '../../stores/useInstaPaySchedulingStore';

describe('ChoosingEmployerBox', () => {
  const mockedEHOrg = {
    ...TestInstaPayOrgKeyPayHasBalance,
    uuid: 'organisationUuid2',
    getId(): string {
      return 'organisationUuid2';
    },
    name: 'OrganisationUuid2',
    balance: 570,
  };

  const mockedPolicyViolatedOrg = {
    id: 3,
    uuid: 'organisationUuid3',
    kpBusinessId: 0,
    balance: 0,
    getId(): string {
      return 'organisationUuid3';
    },
    instapay: undefined,
    limit: { max: 100, min: 1000 },
    isReachedMinBalance: true,
    name: 'Test Violated Org',
    violation: InstapayErrorCode.InvalidPayCycle,
  };

  const mockedOrgWithNoBalance = {
    ...TestInstaPayOrgKeyPayNoBalance,
    name: 'Test Org with No Balance',
    kpBusinessId: 288,
    getId(): string {
      return '288';
    },
  };

  const mockedOrganisationsList = [
    TestInstaPayOrgKeyPayHasBalance,
    mockedEHOrg,
    mockedOrgWithNoBalance,
    mockedPolicyViolatedOrg,
  ] as InstaPayOrg[];

  it('should not render if there is no membership stored', async () => {
    const { result: drawdownStore } = renderHook(() => useInstaPayDrawdownStore());
    drawdownStore.current.resetStore();

    const { queryByTestId } = render(
      <ChoosingEmployerBox
        ewaMode={WithdrawYourEarnedPaySectionKey.NOW}
        currentMembership={null}
        onChange={jest.fn()}
        organisations={mockedOrganisationsList}
      />
    );

    await waitFor(() => {
      expect(queryByTestId('choosing-employer-select')).not.toBeTruthy();
    });
  });

  it('should call onChange callback function when switched to another employer', async () => {
    const { result: drawdownStore } = renderHook(() => useInstaPayDrawdownStore());
    drawdownStore.current.setMembership(mockedEHOrg);

    const mockedOnEmployerChanged = jest.fn();

    const { getByTestId, getByText } = render(
      <ChoosingEmployerBox
        currentMembership={mockedEHOrg}
        ewaMode={WithdrawYourEarnedPaySectionKey.NOW}
        onChange={mockedOnEmployerChanged}
        organisations={mockedOrganisationsList}
      />
    );

    await waitFor(() => {
      expect(getByText('Choose an employer to get paid from')).toBeTruthy();

      // Display the details of the organisation set to store
      expect(getByText('available balance $570.00')).toBeTruthy();
      expect(getByTestId('text-input').props.value).toBe('OrganisationUuid2');

      expect(getByTestId('choosing-employer-select')).toBeTruthy();
    });

    const selectElement = getByTestId('choosing-employer-select');
    fireEvent.press(selectElement);

    const switchingToOrganisation = TestInstaPayOrgKeyPayHasBalance;
    fireEvent.press(getByTestId(`select-option-org-${switchingToOrganisation.name}`));

    await waitFor(() => {
      expect(mockedOnEmployerChanged).toHaveBeenCalledWith(TestInstaPayOrgKeyPayHasBalance.getId());
    });
  });

  describe('EWA Now', () => {
    it('should render the select element properly and choose the membership set to store by default', async () => {
      const { result: drawdownStore } = renderHook(() => useInstaPayDrawdownStore());
      drawdownStore.current.setMembership(mockedEHOrg);

      const { getByTestId, getByText } = render(
        <ChoosingEmployerBox
          currentMembership={mockedEHOrg}
          ewaMode={WithdrawYourEarnedPaySectionKey.NOW}
          onChange={jest.fn()}
          organisations={mockedOrganisationsList}
        />
      );

      await waitFor(() => {
        expect(getByText('Choose an employer to get paid from')).toBeTruthy();

        // Display the details of the organisation set to store
        expect(getByText('available balance $570.00')).toBeTruthy();
        expect(getByTestId('text-input').props.value).toBe('OrganisationUuid2');

        expect(getByTestId('choosing-employer-select')).toBeTruthy();
      });

      const selectElement = getByTestId('choosing-employer-select');
      fireEvent.press(selectElement);

      mockedOrganisationsList.forEach(organisation => {
        // Verify each organisation is rendered as an option in the select list
        expect(getByTestId(`select-option-org-${organisation.name}`));
      });
    });

    it('should render the options of the organisation list with proper state', async () => {
      const { result: drawdownStore } = renderHook(() => useInstaPayDrawdownStore());
      drawdownStore.current.setMembership(TestInstaPayOrgKeyPayHasBalance);

      const { findByTestId, getByTestId } = render(
        <ChoosingEmployerBox
          currentMembership={TestInstaPayOrgKeyPayHasBalance}
          ewaMode={WithdrawYourEarnedPaySectionKey.NOW}
          onChange={jest.fn()}
          organisations={mockedOrganisationsList}
        />
      );

      const selectElement = await findByTestId('choosing-employer-select');
      fireEvent.press(selectElement);

      await waitFor(() => {
        mockedOrganisationsList.forEach(organisation => {
          const option = getByTestId(`select-option-org-${organisation.name}`);
          expect(within(option).getByText(organisation.name)).toBeTruthy();

          if (organisation.violation || !organisation.balance) {
            // Should render the error icon
            expect(within(option).getByTestId('error-icon')).toBeTruthy();
          } else {
            // Should render the balance
            expect(within(option).getByText(`${formatCurrency(organisation.balance)}`)).toBeTruthy();
          }
        });
      });
    });
  });

  describe('EWA Recurring', () => {
    beforeEach(() => {
      const { result: schedulingStore } = renderHook(() => useInstaPaySchedulingStore());
      schedulingStore.current.setEligibilityDetails(
        mockedOrganisationsList.map(org => ({
          orgId: org.getId(),
          isEligible: !org.violation,
        }))
      );
    });

    it('should render the select element properly and choose the membership set to store by default', async () => {
      const { result: drawdownStore } = renderHook(() => useInstaPayDrawdownStore());
      drawdownStore.current.setMembership(mockedEHOrg);

      const { getByTestId, getByText } = render(
        <ChoosingEmployerBox
          currentMembership={mockedEHOrg}
          ewaMode={WithdrawYourEarnedPaySectionKey.RECURRING}
          onChange={jest.fn()}
          organisations={mockedOrganisationsList}
        />
      );

      await waitFor(() => {
        expect(getByText('Choose an employer to get paid from')).toBeTruthy();

        // Display the details of the organisation set to store
        expect(getByText('available balance $570.00')).toBeTruthy();
        expect(getByTestId('text-input').props.value).toBe('OrganisationUuid2');

        expect(getByTestId('choosing-employer-select')).toBeTruthy();
      });

      const selectElement = getByTestId('choosing-employer-select');
      fireEvent.press(selectElement);

      mockedOrganisationsList.forEach(organisation => {
        // Verify each organisation is rendered as an option in the select list
        expect(getByTestId(`select-option-org-${organisation.name}`));
      });
    });

    it('should render the options of the organisation list with proper state', async () => {
      const { result: drawdownStore } = renderHook(() => useInstaPayDrawdownStore());
      drawdownStore.current.setMembership(TestInstaPayOrgKeyPayHasBalance);

      const { findByTestId, getByTestId } = render(
        <ChoosingEmployerBox
          currentMembership={TestInstaPayOrgKeyPayHasBalance}
          ewaMode={WithdrawYourEarnedPaySectionKey.RECURRING}
          onChange={jest.fn()}
          organisations={mockedOrganisationsList}
        />
      );

      const selectElement = await findByTestId('choosing-employer-select');
      fireEvent.press(selectElement);

      await waitFor(() => {
        mockedOrganisationsList.forEach(organisation => {
          const option = getByTestId(`select-option-org-${organisation.name}`);
          expect(within(option).getByText(organisation.name)).toBeTruthy();

          if (organisation.violation) {
            // Should render the error icon
            expect(within(option).getByTestId('error-icon')).toBeTruthy();
          } else if (organisation.balance) {
            // Should render the balance
            expect(within(option).getByText(`${formatCurrency(organisation.balance)}`)).toBeTruthy();
          }
        });
      });
    });
  });
});
