import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { OutcomeTemplate } from '../../../common/components/outcome-template/OutcomeTemplate';
import { getEnvConfig } from '../../../common/utils/env';
import { navigateToTopTabs } from '../../../navigation/rootNavigation';
import { useGetWalletStatusQuery, WalletSetupStatus, WalletStatusReason } from '../../../new-graphql/generated';
import type { OnboardingScreenNavigationProp } from '../navigation/navigationTypes';

const REFERRED_TEXT =
  'This can take up to 1 business day. Feel free to come back later to check the status of your Swag Spend account application. You may be contacted via email if we require more information.';

export const WaitingScreen = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp<'CheckingDetails'>>();
  const waitingTimeout = getEnvConfig().ENV === 'staging' ? 2000 : 3000;
  const { data: userData } = useGetWalletStatusQuery({}, { cacheTime: 0, refetchInterval: waitingTimeout });

  useEffect(() => {
    switch (userData?.me?.wallet?.details?.setupStatus?.status) {
      case WalletSetupStatus.Completed:
        navigation.navigate('Success');
        break;
      case WalletSetupStatus.Failed:
        if (userData?.me?.wallet?.details?.setupStatus.message === WalletStatusReason.ManualRejected) {
          navigation.navigate('Decline');
        }
        break;
      default:
        break;
    }
  }, [userData?.me?.wallet?.details?.setupStatus?.status]);

  const onBackToDashboard = () => navigateToTopTabs('spend-tab');

  return (
    <OutcomeTemplate
      title="Checking your details"
      content={REFERRED_TEXT}
      actions={[{ buttonTitle: 'Close', onNext: onBackToDashboard }]}
      imageName="waiting"
    />
  );
};
