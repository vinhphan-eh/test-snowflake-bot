import React, { useEffect } from 'react';
import { TouchableOpacity, type StyleProp, type ViewStyle, Image } from 'react-native';
import Braze, { type ImageOnlyContentCard } from '@braze/react-native-sdk';
import { useLoadBrazeContentCards } from '../../../../common/hooks/useLoadBrazeContentCards';
import { usePrefetchIncomeVisibility } from '../../../../common/hooks/usePrefetchIncomeVisibility';
import { scale } from '../../../../common/utils/layout';
import { INSTAPAY_TESTIMONIAL_CARD } from '../constants/braze';
import { useOpenInstaPayFlowFromDashboard } from '../hooks/useOpenInstaPayFlowFromDashboard';

type InstapayTestimonialCardProps = {
  style?: StyleProp<ViewStyle>;
};
// figma
const defaultRatio = 162 / 144;
export const InstapayTestimonialCard = ({ style }: InstapayTestimonialCardProps) => {
  const { cards } = useLoadBrazeContentCards();
  const brazeCard = cards?.find(item => item?.extras?.id === INSTAPAY_TESTIMONIAL_CARD) as ImageOnlyContentCard;
  const cardId = brazeCard?.id;
  const { instapayNowUnderMaintenance } = usePrefetchIncomeVisibility();
  const { openInstaPayFlow } = useOpenInstaPayFlowFromDashboard({
    underMaintenance: instapayNowUnderMaintenance,
  });

  useEffect(() => {
    if (cardId) {
      Braze.logContentCardImpression(cardId);
    }
  }, [cardId]);

  if (!brazeCard || instapayNowUnderMaintenance) {
    return null;
  }

  const { image, imageAspectRatio } = brazeCard;
  const imgWidth = scale(162, 'width');
  const imgHeight = imgWidth / (imageAspectRatio || defaultRatio);

  const onPress = () => {
    if (cardId) {
      Braze.logContentCardClicked(cardId);
    }

    openInstaPayFlow();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{ width: imgWidth, height: imgHeight }, style]}
      testID="instapay-testimonial-card"
    >
      <Image testID="braze-img" style={{ flex: 1 }} source={{ uri: image }} />
    </TouchableOpacity>
  );
};
