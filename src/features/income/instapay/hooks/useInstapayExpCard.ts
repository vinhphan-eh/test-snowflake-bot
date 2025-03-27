import { useEffect } from 'react';
import type { CaptionedContentCard } from '@braze/react-native-sdk';
import Braze from '@braze/react-native-sdk';
import type { TargetedFeature } from './useInstapayTracking';
import { useInstapayTracking } from './useInstapayTracking';
import { useOpenInstaPayFlowFromDashboard } from './useOpenInstaPayFlowFromDashboard';
import { useIncomeVisibility } from '../../../../common/hooks/useIncomeVisibility';
import { useLoadBrazeContentCards } from '../../../../common/hooks/useLoadBrazeContentCards';
import { switchPillar } from '../../../../common/stores/useMiniAppSwitcherStore';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { usePrefetchInstapayBalance } from '../components/instapay-exp-popup/hooks/usePrefetchInstapayBalance';

type UseInstapayExpCardProps = {
  onCancel: () => void;
  onActionEffect: () => void;
  feature: TargetedFeature;
  brazeCardCustomId: string;
};

export const useInstapayExpCard = ({
  brazeCardCustomId,
  feature,
  onActionEffect,
  onCancel,
}: UseInstapayExpCardProps) => {
  const { cards } = useLoadBrazeContentCards();
  const Intl = useIntl();
  const { trackUserClickInstapayExperimentTile, trackUserSeeInstapayExperimentTile } = useInstapayTracking();
  const { instapayNowUnderMaintenance } = useIncomeVisibility();
  const { hasZeroBalance } = usePrefetchInstapayBalance('useInstapayExpCard');
  const { openInstaPayFlow } = useOpenInstaPayFlowFromDashboard({
    underMaintenance: instapayNowUnderMaintenance,
  });

  const brazeCard = cards?.find(item => item.extras.id === brazeCardCustomId) as CaptionedContentCard;
  const brazeCardId = brazeCard?.id;

  const {
    cardDescription = Intl.formatMessage({ id: 'instapay.customSurveyExperimentTile.description' }),
    extras: { actionText, cancelText } = {
      actionText: Intl.formatMessage({ id: 'instapay.submit-leave-ad.actionText' }),
      cancelText: Intl.formatMessage({ id: 'instapay.submit-leave-ad.cancelText' }),
    },
    image = '',
    imageAspectRatio = 0,
    title = Intl.formatMessage({ id: 'instapay.submit-leave-ad.title' }),
  } = brazeCard ?? {};

  const onClickLearnMore = () => {
    if (brazeCardId) {
      trackUserClickInstapayExperimentTile(feature, hasZeroBalance);
      Braze.logContentCardClicked(brazeCardId);
    }
    onActionEffect();
    if (hasZeroBalance) {
      switchPillar({ to: { pillarId: 'WalletApp', tab: 'income-tab' } });
    } else {
      openInstaPayFlow();
    }
  };

  const onClickMaybeLater = () => {
    if (brazeCardId) {
      Braze.logContentCardDismissed(brazeCardId);
    }
    onCancel();
  };

  useEffect(() => {
    trackUserSeeInstapayExperimentTile(feature, hasZeroBalance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feature]);

  useEffect(() => {
    if (brazeCardId) {
      Braze.logContentCardImpression(brazeCardId);
    }
  }, [brazeCardId]);

  return {
    onClickMaybeLater,
    onClickLearnMore,
    imageAspectRatio,
    actionText,
    cancelText,
    image,
    title,
    cardDescription,
  };
};
