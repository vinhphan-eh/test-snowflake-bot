import { useGetSuperAppToken } from '../../../../common/auth/store/useSuperAppTokenStore';
import { isEnabledForEh } from '../../../../common/types/react-query';
import {
  Platform,
  useGetAllocationsQuery,
  useGetCurrentCardDetailsQuery,
  useGetEWalletAuAccountDetailsQuery,
  useGetOrgsQuery,
  type GetCurrentCardDetailsQuery,
  type PayAllocation,
  type WalletDetails,
} from '../../../../new-graphql/generated';

export type EWallet = NonNullable<WalletDetails>;

export interface PaySplitNetworkData {
  allocations: PayAllocation[];
  eWallet: EWallet;
  cardSetupDone: boolean;
}

interface PaySplitNetworkDataWrapper {
  data: PaySplitNetworkData;
  isLoading: boolean;
  isError: boolean;
}

// handle fetching of data from network
// Ideally this should be a single graphQL query FIXME once we are using apollo
export function usePaySplitNetworkData(): PaySplitNetworkDataWrapper {
  const { loginProvider, token } = useGetSuperAppToken('usePaySplitNetworkData');
  const {
    data: orgsResponse,
    isError: isMembershipError,
    isLoading: isMembershipLoading,
  } = useGetOrgsQuery(undefined, {
    enabled: isEnabledForEh(token, loginProvider),
    retryOnMount: false,
  });
  const ehOrgs = orgsResponse?.me?.orgs?.filter(org => org?.source === Platform.Eh) ?? [];

  const {
    data: allocations,
    isError: isAllocationError,
    isLoading: isAllocationLoading,
    isRefetching: isAllocationRefetching,
  } = useGetAllocationsQuery(
    { orgId: ehOrgs[0]?.uuid?.toString() ?? '0' },
    { refetchOnWindowFocus: true, enabled: isEnabledForEh(token, loginProvider) }
  );

  const {
    data: currentCard,
    isError: isCurrentCardError,
    isLoading: isCurrentCardLoading,
    isRefetching: isCurrentCardRefetching,
  } = useGetCurrentCardDetailsQuery<GetCurrentCardDetailsQuery, Error>(undefined, { refetchOnWindowFocus: true });

  const { data: eWallet, isError: isWalletError, isLoading: isWalletLoading } = useGetEWalletAuAccountDetailsQuery();

  const isLoading =
    isAllocationLoading ||
    isCurrentCardLoading ||
    isWalletLoading ||
    isAllocationRefetching ||
    isCurrentCardRefetching ||
    isMembershipLoading;
  const isError = isAllocationError || isCurrentCardError || isWalletError || isMembershipError;

  // remove null | undefined from returned data properties.
  // fudge it because we know data is good once isLoaded
  let data = {} as PaySplitNetworkData;
  if (!isLoading && !isError) {
    data = {
      allocations: allocations?.me?.org?.member?.paySplit?.allocations ?? [],
      eWallet: eWallet?.me?.wallet?.details as EWallet,
      cardSetupDone: !!currentCard?.me?.wallet?.card?.details?.id,
    };
  }

  return {
    isLoading,
    isError,
    data,
  };
}
