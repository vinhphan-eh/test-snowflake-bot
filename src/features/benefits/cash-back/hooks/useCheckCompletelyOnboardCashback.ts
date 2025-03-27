import {
  useGetCashbackTermsAndConditionsAcceptanceQuery,
  useCashbackOnboardStatusQuery,
} from '../../../../new-graphql/generated';

type HookResult = {
  isLoading: boolean;
  isError: boolean;
  isCompleted: boolean;
  isFetched: boolean;
  hasUserAgreeToTermsAndConditions?: boolean;
  hasCLOOnboarded?: boolean;
};

export const useCheckCompletelyOnboardCashback = (): HookResult => {
  const {
    data: onboardStatus,
    isError: isErrorStatus,
    isFetched: isFetchedOnboardStatus,
    isLoading: isLoadingOnboardStatus,
  } = useCashbackOnboardStatusQuery({}, { retryOnMount: false, staleTime: Infinity });
  const {
    data: cashbackTermsAndConditions,
    isError: isErrorTnC,
    isFetched: isFetchedTnc,
    isLoading: isLoadingTnC,
  } = useGetCashbackTermsAndConditionsAcceptanceQuery({}, { retryOnMount: false, staleTime: Infinity });

  const hasUserAgreeToTermsAndConditions =
    cashbackTermsAndConditions?.me?.cashback?.termsAndConditionsAcceptance?.isAccepted ?? false;

  const hasCLOOnboarded = onboardStatus?.me?.cashback?.onboardStatus.hasCLOOnboarded ?? false;
  return {
    isLoading: isLoadingOnboardStatus || isLoadingTnC,
    isError: isErrorStatus || isErrorTnC,
    isCompleted: hasUserAgreeToTermsAndConditions && hasCLOOnboarded,
    isFetched: isFetchedOnboardStatus && isFetchedTnc,
    hasUserAgreeToTermsAndConditions,
    hasCLOOnboarded,
  };
};
