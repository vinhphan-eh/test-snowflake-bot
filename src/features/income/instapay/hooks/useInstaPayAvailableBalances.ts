import { useEffect, useRef } from 'react';
import BigNumber from 'bignumber.js';
import type { UseQueryOptions } from 'react-query';
import { useInstapayTracking } from './useInstapayTracking';
import { useEbenTokenValidForQuery } from '../../../../common/auth/store/ebenTokenStore';
import {
  type GetAllInstapayAvailableBalancesQuery,
  type InstapayError,
  InstapayErrorCode,
  useGetAllInstapayAvailableBalancesQuery,
  PayCycle,
} from '../../../../new-graphql/generated';
import { Region } from '../../../../providers/LocalisationProvider/constants';
import type { InstaPayDefaultLimit } from '../utils/get-withdrawal-limit';
import { getWithdrawalLimit } from '../utils/get-withdrawal-limit';
import { isInstapayError } from '../utils/graphql-processor';
import { useIsAccountUK } from '../../../../common/hooks/useIsAccountUK';

export type QueryOrgType = NonNullable<GetAllInstapayAvailableBalancesQuery['me']>['orgs'][number];

// extend the returned org structure with some convenience fields
export interface InstaPayOrg extends QueryOrgType {
  limit: { max: number; min: number; schedulingMin: number };
  isReachedMinBalance: boolean;
  violation?: InstapayError['code'] | false;
  balance: number;
  getId: () => string;
}

interface InstaPayAvailableBalances {
  data?: GetAllInstapayAvailableBalancesQuery;
  country: Region; // Default country
  orgs: InstaPayOrg[];
  findOrgById: (id: string) => InstaPayOrg | undefined;
  allOrgsViolatePolicy: boolean;
  sumReachedMinimumBalances?: number;
  isError: boolean;
  isLoading: boolean;
  isRefetching: boolean;
  refetch: () => Promise<unknown>;
  sumAvailableBalance: number;
  payCycle: PayCycle;
}

const orgHasInstapayPermission = (org: InstaPayOrg): boolean => {
  return org.violation !== InstapayErrorCode.PermissionRequired;
};

const queryOrgDataToInstaPayOrg = (org: QueryOrgType, defaultWithdrawalLimit: InstaPayDefaultLimit): InstaPayOrg => {
  const limit = !isInstapayError(org.instapay?.withdrawalLimit)
    ? {
        min: org.instapay?.withdrawalLimit.withdrawalMinLimit || 0,
        max: org.instapay?.withdrawalLimit.withdrawalMaxLimit || 0,
        schedulingMin: org.instapay?.withdrawalLimit?.schedulingWithdrawalMinLimit || 0,
      }
    : defaultWithdrawalLimit;
  const balance = isInstapayError(org.instapay?.balance) ? 0 : org.instapay?.balance?.balance || 0;
  const reachedMinimumBalance = balance >= (limit?.min ?? 0);

  return {
    ...org,
    limit,
    isReachedMinBalance: reachedMinimumBalance,
    violation: isInstapayError(org.instapay?.balance) && org.instapay?.balance.code,
    balance,
    getId: (): string => org.uuid || `${org.kpBusinessId}`,
  };
};

type InstaPayAvailableBalancesProps = {
  enabled: boolean;
  location: string;
  options?: UseQueryOptions<GetAllInstapayAvailableBalancesQuery>;
};

export const useInstaPayAvailableBalances = ({
  enabled,
  location,
  options,
}: InstaPayAvailableBalancesProps): InstaPayAvailableBalances => {
  const isLogged = useRef(false);
  const isEbenTokenValid = useEbenTokenValidForQuery();
  const isUkAccount = useIsAccountUK();
  const { data, isError, isFetching, isLoading, isRefetching, refetch } = useGetAllInstapayAvailableBalancesQuery(
    {},
    { enabled: isEbenTokenValid && enabled, staleTime: 1000 * 60 * 3, ...(options || {}) }
  );
  const { trackRequestGetAllInstapayAvailableBalances } = useInstapayTracking();
  useEffect(() => {
    if (isFetching && isLogged.current === false) {
      isLogged.current = true;
      trackRequestGetAllInstapayAvailableBalances(location);
    }
  }, [isFetching]);

  const fallbackCountry = isUkAccount ? Region.gb : Region.au;
  const country = (data?.me?.orgs?.[0]?.member?.work_country as Region) || fallbackCountry;
  const defaultWithdrawalLimit = getWithdrawalLimit(country);

  const allOrgs = data?.me?.orgs || [];

  const orgs: InstaPayOrg[] = allOrgs
    .map(org => queryOrgDataToInstaPayOrg(org, defaultWithdrawalLimit))
    .filter(orgHasInstapayPermission);

  const findOrgById = (id: string): InstaPayOrg | undefined => {
    return orgs.find(org => org.getId() === id);
  };

  const sumReachedMinimumBalances = orgs
    .filter(o => o.isReachedMinBalance)
    .reduce((sum, org) => new BigNumber(sum).plus(org.balance), new BigNumber(0))
    .toNumber();

  const sumAvailableBalance = orgs
    .reduce((sum, org) => new BigNumber(sum).plus(org.balance), new BigNumber(0))
    .toNumber();

  const instapayErrors =
    data?.me?.orgs
      .filter(org => isInstapayError(org?.instapay?.balance))
      .map(org => org?.instapay?.balance as InstapayError) || [];

  const payCycle = instapayErrors.find(err => err?.context?.payCycle)?.context?.payCycle || PayCycle.Unknown;

  return {
    country,
    sumReachedMinimumBalances,
    orgs,
    findOrgById,
    allOrgsViolatePolicy: orgs.reduce((acc, org) => acc + (org.violation ? 1 : 0), 0) === orgs.length,
    isError,
    isLoading,
    isRefetching,
    refetch,
    sumAvailableBalance,
    payCycle,
  };
};
