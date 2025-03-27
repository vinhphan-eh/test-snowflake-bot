import BigNumber from 'bignumber.js';
import { useEbenTokenValidForQuery } from '../../../../common/auth/store/ebenTokenStore';
import { getFloatAmountFromMoneyV2 } from '../../../../common/utils/currency';
import { useGetEstInstapayBalancesQuery } from '../../../../new-graphql/generated';

interface EstInstapayNowBalances {
  isError: boolean;
  isLoading: boolean;
  estBalance: number;
  hasEstBalance: boolean;
  updatedAt?: Date;
}

export const useEstInstaPayNowBalances = (enabled = true): EstInstapayNowBalances => {
  const isEbenTokenValid = useEbenTokenValidForQuery();
  const { data, isError, isLoading } = useGetEstInstapayBalancesQuery(
    {},
    { enabled: isEbenTokenValid && enabled, staleTime: 1000 * 60 * 3 }
  );

  const allOrgs = data?.me?.orgs || [];

  const estBalances = allOrgs.flatMap(org => {
    const estBalance = org.instapay?.estBalance;
    // eslint-disable-next-line no-underscore-dangle
    switch (estBalance?.__typename) {
      case 'InstapayEstBalance':
        return estBalance;
      case 'InstapayEstBalanceError':
        return [];
      default:
        return [];
    }
  });

  const sumEstBalance =
    estBalances.reduce(
      (sum, estBalance) => new BigNumber(sum).plus(getFloatAmountFromMoneyV2(estBalance.balance)),
      new BigNumber(0)
    ) || new BigNumber(0);

  let updatedAt: Date | undefined;
  estBalances.forEach(estBalance => {
    if (!estBalance.createdAt) {
      return;
    }
    const date = new Date(estBalance.createdAt);
    if (updatedAt === undefined || date > updatedAt) {
      updatedAt = date;
    }
  });

  return {
    isError,
    isLoading,
    hasEstBalance: estBalances.length > 0,
    estBalance: sumEstBalance.toNumber(),
    updatedAt,
  };
};
