import type { AxiosResponse } from 'axios';
import type { InstapayErrorCode } from '../../../src/new-graphql/generated';
import { swagPersonalAPIClient } from '../swag-personal-api-client';
import type { SupportedCountries } from './utils';

const GetInstaPayBalanceDocument = `
  query InstaPayBalance {
      me {
          id
          orgs {
              id
              uuid
              kpBusinessId
              instapay {
                  balance {
                      ... on InstapayBalance {
                          __typename
                          id
                          balance
                          balanceType
                      }
                      ... on InstapayError {
                          __typename
                          code
                          context {
                            ... on InstapayBalanceErrorContext {
                                payCycle
                          }
                        }
                      }
                  }
              }
          }
      }
  }
`;

type GetAllInstapayAvailableBalancesQuery = {
  data?: {
    __typename?: 'Query';
    me?: {
      __typename?: 'User';
      orgs: Array<{
        __typename?: 'HrOrg';
        id: number;
        uuid: string;
        kpBusinessId: number;
        name: string;
        instapay?: {
          __typename?: 'Instapay';
          balance:
            | { __typename: 'InstapayBalance'; balance: number; id: string }
            | { __typename: 'InstapayError'; code: InstapayErrorCode };
          withdrawalLimit:
            | { __typename: 'InstapayError'; code: InstapayErrorCode }
            | { __typename: 'InstapayWithdrawalLimit'; withdrawalMinLimit: number; withdrawalMaxLimit: number };
        } | null;
      }>;
    } | null;
  };
};

export const getInstaPayBalance = async (
  ebfToken: string,
  kpToken?: string,
  ehToken?: string,
  country: `${SupportedCountries}` = 'AU'
) => {
  const regionHeader = country === 'GB' ? 'en-GB' : 'en-AU';

  return swagPersonalAPIClient
    .post<never, AxiosResponse<GetAllInstapayAvailableBalancesQuery>>(
      '/',
      {
        query: GetInstaPayBalanceDocument,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${ebfToken}`,
          'X-KeyPay-Token': kpToken,
          'X-EH-Session-Token': ehToken,
          'X-KeyPay-Region': regionHeader,
        },
      }
    )
    .then(response => response.data.data);
};
