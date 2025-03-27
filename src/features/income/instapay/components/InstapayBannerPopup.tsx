import React, { useEffect } from 'react';
import { TouchableOpacity, type StyleProp, type ViewStyle } from 'react-native';
import type { ClassicContentCard } from '@braze/react-native-sdk';
import Braze from '@braze/react-native-sdk';
import { Icon, Typography, useTheme } from '@hero-design/rn';
import { RemovalEventWrapper } from '../../../../common/braze/components/RemovalEventWrapper';
import type { BrazeCustomEvents } from '../../../../common/braze/constants';
import { useLoadBrazeContentCards } from '../../../../common/hooks/useLoadBrazeContentCards';
import { usePrefetchIncomeVisibility } from '../../../../common/hooks/usePrefetchIncomeVisibility';
import ThemeSwitcher from '../../../../common/utils/ThemeSwitcher';
import type { InstapayBrazeBannerIds } from '../constants/braze';
import { useOpenInstaPayFlowFromDashboard } from '../hooks/useOpenInstaPayFlowFromDashboard';

type InstapayBannerPopupProps = {
  style?: StyleProp<ViewStyle>;
  brazeCardId: InstapayBrazeBannerIds;
  customClickEvent?: BrazeCustomEvents;
};

const Content = ({ brazeCardId, customClickEvent, style }: InstapayBannerPopupProps) => {
  const { cards, logCustomEvent } = useLoadBrazeContentCards();
  const { colors, radii, space } = useTheme();
  const { instapayNowUnderMaintenance } = usePrefetchIncomeVisibility();
  const { openInstaPayFlow } = useOpenInstaPayFlowFromDashboard({
    underMaintenance: instapayNowUnderMaintenance,
  });
  const brazeCard = cards?.find(item => item?.extras?.id === brazeCardId) as ClassicContentCard;
  const cardId = brazeCard?.id;

  const onPress = () => {
    if (cardId) {
      Braze.logContentCardClicked(cardId);
    }
    if (customClickEvent) {
      logCustomEvent(customClickEvent);
    }
    openInstaPayFlow();
  };

  useEffect(() => {
    if (cardId) {
      Braze.logContentCardImpression(cardId);
    }
  }, [cardId]);

  if (!brazeCard) {
    return null;
  }

  const { cardDescription } = brazeCard ?? {
    cardDescription: '',
  };

  return (
    <TouchableOpacity
      testID="instapay-banner-popup"
      style={[
        {
          paddingVertical: space.small,
          paddingHorizontal: space.medium,
          backgroundColor: colors.decorativePrimary,
          flexDirection: 'row',
          borderRadius: radii.xlarge,
          alignItems: 'center',
        },
        style,
      ]}
      onPress={onPress}
    >
      <Typography.Body
        accessibilityLabel={cardDescription}
        numberOfLines={2}
        style={{ flex: 1 }}
        typeface="playful"
        variant="small-bold"
      >
        {cardDescription}
      </Typography.Body>
      <Icon testID="arrow-icon" style={{ marginLeft: space.medium }} icon="arrow-right" />
    </TouchableOpacity>
  );
};

export const InstapayBannerPopup = (props: InstapayBannerPopupProps) => {
  return (
    <ThemeSwitcher name="eBens">
      <Content {...props} />
    </ThemeSwitcher>
  );
};

export const InstapayBannerAtSwagDB = (props: InstapayBannerPopupProps) => {
  return (
    <RemovalEventWrapper event={props.customClickEvent}>
      <InstapayBannerPopup {...props} />
    </RemovalEventWrapper>
  );
};
