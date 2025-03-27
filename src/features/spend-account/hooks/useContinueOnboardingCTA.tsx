import { useNavigation } from '@react-navigation/native';
import { useIsAccountUK } from '../../../common/hooks/useIsAccountUK';
import { useMixpanel } from '../../../common/hooks/useMixpanel';
import type { RootStackNavigationProp } from '../../../navigation/navigationTypes';
import {
  IdvProfileStatus,
  UkAuthFactorChannel,
  UkAuthFactorStatus,
  UkAuthFactorType,
  WalletSetupStatus,
  type IdvProfile,
  type UkAuthFactor,
} from '../../../new-graphql/generated';
import {
  MONEY_MODULE_NAME,
  MONEY_OPEN_SSA_CLICK_SET_UP_NOW,
  VISIT_MONEY_INTRO_CAROUSEL,
} from '../../onboarding/constants/trackingEvents';
import { useWeavrBiometrics } from '../../onboarding/hooks/useWeavrBiometrics';

interface ContinueOnboardingCTAParams {
  eWalletSetupStatus: WalletSetupStatus | null | undefined;
  idvProfileData: IdvProfile | null | undefined;
  ukAuthFactors: (UkAuthFactor | null)[] | null | undefined;
}

interface ContinueOnboardingCTA {
  navigate: () => void;
}

export const useContinueOnboardingCTA = ({
  eWalletSetupStatus,
  idvProfileData,
  ukAuthFactors,
}: ContinueOnboardingCTAParams): ContinueOnboardingCTA => {
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  const ukCitizen = useIsAccountUK();
  const { eventTracking } = useMixpanel();
  const isIdvProfileUnchecked =
    idvProfileData?.status === IdvProfileStatus.Unchecked || idvProfileData?.status === IdvProfileStatus.None;
  const { checkpointDeviceEnrolled, getUKToken } = useWeavrBiometrics();

  const handleFailed = () => {
    navigation.navigate('OnboardingStack', { screen: 'Decline' });
  };

  const handleUKInProgress = async () => {
    const isPendingReview = idvProfileData?.status === IdvProfileStatus.Unchecked;
    const ukWalletUserToken = await getUKToken();
    const hasVerifiedMobile = ukAuthFactors?.some(
      factor =>
        factor?.channel === UkAuthFactorChannel.Sms &&
        factor?.type === UkAuthFactorType.Otp &&
        factor?.status === UkAuthFactorStatus.Active
    );

    if (!isPendingReview) {
      // Checkpoint 1: Passcode
      if (ukWalletUserToken) {
        if (!hasVerifiedMobile) {
          navigation.navigate('OnboardingStack', {
            screen: 'UkVerifyMobileNumber',
          });
        } else {
          // Checkpoint 2: Biometrics enrolled
          const biometricsEnrolled = await checkpointDeviceEnrolled();
          if (!biometricsEnrolled) {
            navigation.navigate('OnboardingStack', {
              screen: 'UkBiometrics',
            });
          } else {
            // Checkpoint 3: KYC
            navigation.navigate('OnboardingStack', {
              screen: 'UkVerifyIdentityDocumentInfo',
              params: { userToken: ukWalletUserToken },
            });
          }
        }
      } else {
        navigation.navigate('OnboardingStack', { screen: 'UkPasscode' });
      }
    } else {
      navigation.navigate('OnboardingStack', { screen: 'CheckingDetails', params: { statusIsInprogress: true } });
    }
  };

  const handleAUInProgress = () => {
    if (isIdvProfileUnchecked && idvProfileData?.token) {
      navigation.navigate('OnboardingStack', {
        screen: 'VerifyIdentityDocumentInfo',
        params: { onfidoToken: idvProfileData.token },
      });
      return;
    }
    navigation.navigate('OnboardingStack', { screen: 'CheckingDetails', params: { statusIsInprogress: true } });
  };

  const handleInProgress = async () => {
    if (ukCitizen) {
      await handleUKInProgress();
    } else {
      handleAUInProgress();
    }
  };

  const navigate = async () => {
    switch (eWalletSetupStatus) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      case WalletSetupStatus.Failed: {
        if (ukCitizen) {
          handleFailed();
          break;
        }
      }
      // eslint-disable-next-line no-fallthrough
      case WalletSetupStatus.InProgress:
        await handleInProgress();
        break;
      case WalletSetupStatus.Completed:
        navigation.navigate('OnboardingStack', { screen: 'Success' });
        break;
      default: {
        navigation.navigate('OnboardingStack', { screen: 'Dashboard' });
        eventTracking({
          event: VISIT_MONEY_INTRO_CAROUSEL,
          categoryName: 'user action',
          metaData: {
            module: MONEY_MODULE_NAME,
          },
        });
        if (!ukCitizen) {
          eventTracking({
            event: MONEY_OPEN_SSA_CLICK_SET_UP_NOW,
            categoryName: 'user action',
            metaData: {
              module: MONEY_MODULE_NAME,
            },
          });
        }
        break;
      }
    }
  };

  return { navigate };
};
