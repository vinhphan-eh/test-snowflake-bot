import { type GetAllInstapayAvailableBalancesQuery, InstapayErrorCode } from '../../../../new-graphql/generated';
import type { InstaPayOrg } from '../hooks/useInstaPayAvailableBalances';

export const TestInstaPayOrgKeyPayHasBalance: InstaPayOrg = {
  id: 1,
  uuid: '0',
  kpBusinessId: 123,
  balance: 1000,
  getId(): string {
    return '123';
  },
  instapay: undefined,
  limit: { max: 100, min: 1000, schedulingMin: 100 },
  isReachedMinBalance: true,
  name: 'Test Org',
};

export const TestInstaPayOrgKeyPayNoBalance: InstaPayOrg = {
  __typename: 'HrOrg',
  id: 1,
  uuid: '0',
  kpBusinessId: 123,
  balance: 0,
  getId(): string {
    return '123';
  },
  instapay: undefined,
  limit: { max: 100, min: 1000, schedulingMin: 100 },
  isReachedMinBalance: true,
  name: 'Test Org',
};

export const TestGetInstaPayAvailableBalancesQueryData: GetAllInstapayAvailableBalancesQuery = {
  me: {
    orgs: [
      {
        id: 1,
        uuid: 'org-has-permission',
        kpBusinessId: 0,
        name: 'Okayla',
        member: {
          ehMemberUuid: '1',
          kpEmployeeId: 0,
          work_country: 'AU',
        },
        instapay: {
          balance: {
            __typename: 'InstapayBalance',
            balance: 100,
            id: '1',
          },
          withdrawalLimit: {
            __typename: 'InstapayWithdrawalLimit',
            withdrawalMaxLimit: 1000,
            withdrawalMinLimit: 101,
            schedulingWithdrawalMinLimit: 101,
          },
        },
      },
      {
        id: 2,
        uuid: '2',
        kpBusinessId: 0,
        name: 'Okayla2',
        instapay: {
          balance: {
            __typename: 'InstapayBalance',
            balance: 90,
            id: '1',
          },
          withdrawalLimit: {
            __typename: 'InstapayWithdrawalLimit',
            withdrawalMaxLimit: 1000,
            withdrawalMinLimit: 50,
            schedulingWithdrawalMinLimit: 50,
          },
        },
      },
      {
        id: 1,
        uuid: '3',
        kpBusinessId: 0,
        name: 'Okayla3',
        instapay: {
          balance: {
            __typename: 'InstapayBalance',
            balance: 10,
            id: '1',
          },
          withdrawalLimit: {
            __typename: 'InstapayWithdrawalLimit',
            withdrawalMaxLimit: 1000,
            withdrawalMinLimit: 50,
            schedulingWithdrawalMinLimit: 50,
          },
        },
      },
      {
        id: 1,
        uuid: 'org-has-no-permission',
        kpBusinessId: 0,
        name: 'Org has no InstaPay permission',
        instapay: {
          balance: {
            __typename: 'InstapayError',
            code: InstapayErrorCode.PermissionRequired,
          },
          withdrawalLimit: {
            __typename: 'InstapayWithdrawalLimit',
            withdrawalMaxLimit: 1000,
            withdrawalMinLimit: 50,
            schedulingWithdrawalMinLimit: 50,
          },
        },
      },
    ],
  },
};

export const TestGetInstaPayAvailableBalancesQueryDataAllAvailable: GetAllInstapayAvailableBalancesQuery = {
  me: {
    orgs: [
      {
        id: 1,
        uuid: '1',
        kpBusinessId: 0,
        name: 'Okayla',
        member: {
          ehMemberUuid: '1',
          kpEmployeeId: 0,
          work_country: 'AU',
        },
        instapay: {
          balance: {
            __typename: 'InstapayBalance',
            balance: 150,
            id: '1',
          },
          withdrawalLimit: {
            __typename: 'InstapayWithdrawalLimit',
            withdrawalMaxLimit: 1000,
            withdrawalMinLimit: 100,
            schedulingWithdrawalMinLimit: 50,
          },
        },
      },
      {
        id: 2,
        uuid: '2',
        kpBusinessId: 0,
        name: 'Okayla2',
        instapay: {
          balance: {
            __typename: 'InstapayBalance',
            balance: 90,
            id: '1',
          },
          withdrawalLimit: {
            __typename: 'InstapayWithdrawalLimit',
            withdrawalMaxLimit: 1000,
            withdrawalMinLimit: 50,
            schedulingWithdrawalMinLimit: 50,
          },
        },
      },
    ],
  },
};

export const TestGetInstaPayAvailableBalancesQueryDataViolation = (
  violation: InstapayErrorCode
): GetAllInstapayAvailableBalancesQuery => ({
  me: {
    orgs: [
      {
        id: 1,
        uuid: '1',
        kpBusinessId: 0,
        name: 'Okayla',
        member: {
          ehMemberUuid: '1',
          kpEmployeeId: 0,
          work_country: 'AU',
        },
        instapay: {
          balance: {
            __typename: 'InstapayError',
            code: violation,
          },
          withdrawalLimit: {
            __typename: 'InstapayWithdrawalLimit',
            withdrawalMaxLimit: 1000,
            withdrawalMinLimit: 101,
            schedulingWithdrawalMinLimit: 101,
          },
        },
      },
    ],
  },
});

export const TestGetInstaPayAvailableBalancesQueryDataAllViolate: GetAllInstapayAvailableBalancesQuery = {
  me: {
    orgs: [
      {
        id: 1,
        uuid: '1',
        kpBusinessId: 0,
        name: 'Okayla',
        member: {
          ehMemberUuid: '1',
          kpEmployeeId: 0,
          work_country: 'AU',
        },
        instapay: {
          balance: {
            __typename: 'InstapayError',
            code: InstapayErrorCode.ApprovedTimesheetNotFound,
          },
          withdrawalLimit: {
            __typename: 'InstapayWithdrawalLimit',
            withdrawalMaxLimit: 1000,
            withdrawalMinLimit: 101,
            schedulingWithdrawalMinLimit: 101,
          },
        },
      },
      {
        id: 2,
        uuid: '2',
        kpBusinessId: 0,
        name: 'Okayla2',
        instapay: {
          balance: {
            __typename: 'InstapayError',
            code: InstapayErrorCode.ApprovedTimesheetNotFound,
          },
          withdrawalLimit: {
            __typename: 'InstapayWithdrawalLimit',
            withdrawalMaxLimit: 1000,
            withdrawalMinLimit: 50,
            schedulingWithdrawalMinLimit: 50,
          },
        },
      },
    ],
  },
};
