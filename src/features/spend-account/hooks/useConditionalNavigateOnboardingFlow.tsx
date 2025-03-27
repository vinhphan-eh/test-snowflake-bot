import { useNavigation } from '@react-navigation/native';
import { useCheckExistingCard } from './useCheckExistingCard';
import { useCheckExistingCardMeta } from './useCheckExistingCardMeta';
import { useGetSuperAppToken } from '../../../common/auth/store/useSuperAppTokenStore';
import { useIsAccountUK } from '../../../common/hooks/useIsAccountUK';
import { useIsCandidateV2 } from '../../../common/hooks/useIsCandidate';
import { useIsWorkzone } from '../../../common/hooks/useIsWorkzone';
import { isEnabledForEh } from '../../../common/types/react-query';
import type { NavigateFromRootParams, RootStackParamList } from '../../../navigation/navigationTypes';
import {
  Platform,
  WalletSetupStatus,
  useGetEWalletAuAccountDetailsQuery,
  useGetEWalletUkAccountDetailsQuery,
  useGetEWalletUkCurrentPaymentCardDetailsQuery,
  useGetOrgsQuery,
  useGetPayAccountQuery,
  useGetWalletStatusQuery,
} from '../../../new-graphql/generated';
import { usePaySplitSetupStore } from '../../income/pay-split/hooks/usePaySplitSetupStore';
import { useGetWeavrAccessToken } from '../../onboarding/hooks/useGetWeavrAccessToken';
import { useDigitalCardSetup } from '../../wallet/card-setup/stores/useCardSetup';

interface UseNavigateOnboardingFlow {
  isError: boolean;
  isLoading: boolean;
  isAllDone: boolean;
  nextScreenNavigateParams?: NavigateFromRootParams<keyof RootStackParamList>;
}

interface UseShareNavigateParams {
  isError: boolean;
  isLoading: boolean;
  isAllDone: boolean;
  eWalletSetupStatus?: WalletSetupStatus | null;
  isEWalletSetupDone: boolean;
  isPaySplitSetupDone: boolean;
  isCardSetupDone: boolean;
  isDigitalProvisioningSetupDone: boolean;
}

const useShareNavigate = ({
  eWalletSetupStatus,
  isAllDone,
  isCardSetupDone,
  isDigitalProvisioningSetupDone,
  isError,
  isEWalletSetupDone,
  isLoading,
  isPaySplitSetupDone,
}: UseShareNavigateParams): UseNavigateOnboardingFlow => {
  const navigation = useNavigation();

  if (isAllDone) {
    return {
      isError,
      isLoading,
      isAllDone,
    };
  }

  // if user has not completed the flow, navigate to onboarding flow
  if (typeof eWalletSetupStatus === 'undefined' || eWalletSetupStatus === null) {
    return {
      isError,
      isLoading,
      isAllDone: false,
      nextScreenNavigateParams: ['OnboardingStack', { screen: 'Dashboard' }],
    };
  }

  if (eWalletSetupStatus === WalletSetupStatus.InProgress) {
    return {
      isError,
      isLoading,
      isAllDone: false,
      nextScreenNavigateParams: [
        'OnboardingStack',
        {
          screen: 'CheckingDetails',
          params: { statusIsInprogress: true },
        },
      ],
    };
  }

  if (isEWalletSetupDone) {
    if (isCardSetupDone) {
      if (isDigitalProvisioningSetupDone) {
        return {
          isError,
          isLoading,
          isAllDone: true,
        };
      }

      return {
        isError,
        isLoading,
        isAllDone: false,
        nextScreenNavigateParams: [
          'DigitalWalletStack',
          {
            screen: 'DigitalWalletSetup',
            params: { isOnboarding: true },
          },
        ],
      };
    }
    if (isPaySplitSetupDone) {
      return {
        isError,
        isLoading,
        isAllDone: false,
        nextScreenNavigateParams: [
          'CardSetupStack',
          {
            screen: 'PinSetupStack',
            params: {
              screen: 'ChoosePin',
              params: {
                header: 'Card set-up',
                title: 'Choose a secure 4 digit PIN for your card.',
                repeatedPinScreen: {
                  header: 'Card set-up',
                  title: 'Repeat your PIN.',
                  onPinVerifiedSuccess: newPin => {
                    navigation.navigate(
                      'CardSetupStack' as never,
                      { screen: 'Confirmation', params: { pin: newPin } } as never
                    );
                  },
                },
              },
            },
          },
        ],
      };
    }
    return {
      isError,
      isLoading,
      isAllDone: false,
      nextScreenNavigateParams: ['PaySplitStack', { screen: 'PaySplitIntro', params: {} }],
    };
  }

  return { isError, isLoading, isAllDone: false };
};

/**
 * Share hook of navigation logic for EH user while onboarding
 *
 * Flow: Wallet setup => Pay Split => Card setup => Google/Apple Pay setup (if exists)
 */
export const useNavigateEHOnboardingFlow = (): UseNavigateOnboardingFlow => {
  const { loginProvider, token } = useGetSuperAppToken('useNavigateEHOnboardingFlow');
  const skippedPaySplit = usePaySplitSetupStore(state => state.skipPaySplit) === 'true';
  const skippedDigitalProvisioning = useDigitalCardSetup(state => state.skipProvisioning) === 'true';
  const {
    data: currentUserData,
    isError: isCurrentUserError,
    isLoading: isCurrentUserLoading,
  } = useGetWalletStatusQuery({}, { retryOnMount: false });
  const {
    data: eWalletData,
    isError: isEWalletError,
    isLoading: isEWalletLoading,
  } = useGetEWalletAuAccountDetailsQuery();
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
    data: payAllocationRes,
    isError: isPayAllocationError,
    isLoading: isPayAllocationLoading,
  } = useGetPayAccountQuery(
    {
      orgId: ehOrgs[0]?.uuid?.toString() ?? '0',
      memberId: ehOrgs[0]?.ehMemberId.toString() ?? '0',
    },
    { enabled: ehOrgs.length > 0 && isEnabledForEh(token, loginProvider) }
  );
  const { isCardLoading, isCardNotFound, isServerDown } = useCheckExistingCard();
  const { isCardMetaError, isCurrentCardMetaLoading, isDigitalProvisioningStepDone } = useCheckExistingCardMeta();

  const eWalletSetupStatus = currentUserData?.me?.wallet?.details.setupStatus?.status;
  const isError =
    isCurrentUserError ||
    isEWalletError ||
    isMembershipError ||
    isPayAllocationError ||
    isCardMetaError ||
    isServerDown;

  const isLoading =
    isCurrentUserLoading ||
    isEWalletLoading ||
    isMembershipLoading ||
    isPayAllocationLoading ||
    isCardLoading ||
    isCurrentCardMetaLoading;

  const isEWalletSetupDone = eWalletSetupStatus === WalletSetupStatus.Completed;
  const isCardSetupDone = !isCardNotFound;
  const isDigitalProvisioningSetupDone = isDigitalProvisioningStepDone || skippedDigitalProvisioning;

  // if we found skipped state or existing account number, it means user has already completed the flow
  const isPaySplitSetupDone =
    payAllocationRes?.me?.org?.member?.paySplit?.bankAccounts?.details.some(
      account => account.accountNumber === eWalletData?.me?.wallet?.details.accountNumber
    ) || skippedPaySplit;

  const isAllDone = isEWalletSetupDone && isPaySplitSetupDone && isCardSetupDone && isDigitalProvisioningSetupDone;

  return useShareNavigate({
    eWalletSetupStatus,
    isAllDone,
    isCardSetupDone,
    isPaySplitSetupDone,
    isEWalletSetupDone,
    isLoading,
    isError,
    isDigitalProvisioningSetupDone,
  });
};

/**
 * Share hook of navigation logic for KeyPey/Candidate user while onboarding
 *
 * Flow: Wallet setup => Card setup => Google/Apple Pay setup (if exists)
 */
export const useNavigateNonEHOnboardingFlow = (): UseNavigateOnboardingFlow => {
  const skippedDigitalProvisioning = useDigitalCardSetup(state => state.skipProvisioning) === 'true';
  const {
    data: currentUserData,
    isError: isCurrentUserError,
    isLoading: isCurrentUserLoading,
  } = useGetWalletStatusQuery({}, { retryOnMount: false });
  const { isCardLoading, isCardNotFound, isServerDown } = useCheckExistingCard();
  const { isCardMetaError, isCurrentCardMetaLoading, isDigitalProvisioningStepDone } = useCheckExistingCardMeta();

  const eWalletSetupStatus = currentUserData?.me?.wallet?.details.setupStatus?.status;
  const isError = isCurrentUserError || isCardMetaError || isServerDown;

  const isLoading = isCurrentUserLoading || isCardLoading || isCurrentCardMetaLoading;

  const isEWalletSetupDone = eWalletSetupStatus === WalletSetupStatus.Completed;
  const isCardSetupDone = !isCardNotFound;
  const isDigitalProvisioningSetupDone = isDigitalProvisioningStepDone || skippedDigitalProvisioning;

  const isAllDone = isEWalletSetupDone && isCardSetupDone && isDigitalProvisioningSetupDone;

  return useShareNavigate({
    eWalletSetupStatus,
    isAllDone,
    isCardSetupDone,
    // Keypay users don't have access to Pay Split, so we assume Pay Split is done
    isPaySplitSetupDone: true,
    isEWalletSetupDone,
    isLoading,
    isError,
    isDigitalProvisioningSetupDone,
  });
};

/**
 * UK users
 * Share hook of navigation logic for EH user while onboarding
 *
 * Flow: Wallet setup => Card setup
 */
export const useNavigateOnboardingFlowForUk = (): UseNavigateOnboardingFlow => {
  const { loginProvider, token } = useGetSuperAppToken('useNavigateOnboardingFlowForUk');
  const { accessToken } = useGetWeavrAccessToken();
  const {
    data: currentUserData,
    isError: isCurrentUserError,
    isLoading: isCurrentUserLoading,
  } = useGetWalletStatusQuery({}, { retryOnMount: false });
  const { isError: isEWalletError, isLoading: isEWalletLoading } = useGetEWalletUkAccountDetailsQuery();
  const {
    data: hrOrgsResponse,
    isError: isMembershipError,
    isLoading: isMembershipLoading,
  } = useGetOrgsQuery(undefined, {
    enabled: isEnabledForEh(token, loginProvider),
    retryOnMount: false,
  });
  const ehOrgs = hrOrgsResponse?.me?.orgs?.filter(org => org?.source === Platform.Eh) ?? [];
  const { isError: isPayAllocationError, isLoading: isPayAllocationLoading } = useGetPayAccountQuery(
    {
      orgId: ehOrgs?.[0]?.id?.toString() ?? '0',
      memberId: ehOrgs?.[0]?.ehMemberId?.toString() ?? '0',
    },
    { enabled: ehOrgs.length > 0 && isEnabledForEh(token, loginProvider) }
  );

  const {
    data: cardDetails,
    isError: isServerDown,
    isLoading: isCardLoading,
  } = useGetEWalletUkCurrentPaymentCardDetailsQuery({ accessToken }, { enabled: !!accessToken });
  const isCardNotFound = !cardDetails?.me?.wallet?.UKCurrentPaymentCardV2?.id;

  const eWalletSetupStatus = currentUserData?.me?.wallet?.details.setupStatus?.status;
  const isError = isCurrentUserError || isEWalletError || isMembershipError || isPayAllocationError || isServerDown;

  const isLoading =
    isCurrentUserLoading || isEWalletLoading || isMembershipLoading || isPayAllocationLoading || isCardLoading;

  const isEWalletSetupDone = eWalletSetupStatus === WalletSetupStatus.Completed;
  const isCardSetupDone = !isCardNotFound;

  const isAllDone = isEWalletSetupDone && isCardSetupDone;

  // Hard coded values - Flows not supported for UK users as of now
  const isPaySplitSetupDone = true;
  const isDigitalProvisioningSetupDone = true;

  return useShareNavigate({
    eWalletSetupStatus,
    isAllDone,
    isCardSetupDone,
    isPaySplitSetupDone,
    isEWalletSetupDone,
    isLoading,
    isError,
    isDigitalProvisioningSetupDone,
  });
};

/**
 * Conditionally generate hook for onboarding navigation logic based on user type
 */
export const useConditionalNavigateOnboardingFlow: () => () => UseNavigateOnboardingFlow = () => {
  const isWorkzoneUser = useIsWorkzone();
  const isCandidate = useIsCandidateV2();
  const isUK = useIsAccountUK();

  if (isUK) {
    return useNavigateOnboardingFlowForUk;
  }

  if (isWorkzoneUser || isCandidate) {
    return useNavigateNonEHOnboardingFlow;
  }
  return useNavigateEHOnboardingFlow;
};
