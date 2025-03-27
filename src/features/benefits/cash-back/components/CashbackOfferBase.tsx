import React from 'react';
import type { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';
import { Box } from '@hero-design/rn';
import { DataCard } from '../../../../common/components/data-card';
import { useCashbackTracking } from '../hooks/useCashbackTracking';

type CashbackOfferBaseProps = {
  style?: StyleProp<ViewStyle>;
  supplierName: string;
  title: string;
  offerType: 'online' | 'instore';
  bottomLabel: string;
  imgSource?: ImageSourcePropType;
  onPress: () => void;
  category?: string; // make it optional because in-store advertiser can belong to multiple categories
  isCardLinkedOffer: boolean | null | undefined;
  testID?: string;
  accessibilityLabel?: string;
};

export const CashbackOfferBase = ({
  accessibilityLabel = 'Cashback item',
  bottomLabel,
  category = '',
  imgSource,
  isCardLinkedOffer,
  offerType,
  onPress,
  style,
  supplierName,
  testID,
  title,
}: CashbackOfferBaseProps) => {
  const { trackClickOnCashbackOffer } = useCashbackTracking();

  const onCashbackPressed = () => {
    trackClickOnCashbackOffer({
      offerName: title,
      platform: offerType,
      offerType: isCardLinkedOffer ? 'card linked' : 'affiliate',
      category,
      merchantName: supplierName,
    });
    onPress();
  };

  return (
    <Box testID={testID} marginBottom="medium" style={style}>
      <DataCard
        accessibilityLabel={accessibilityLabel}
        data={[
          {
            label: supplierName,
            content: title,
            bottomLabel,
          },
        ]}
        thumbnailSource={imgSource}
        onPress={onCashbackPressed}
        hideIcon
      />
    </Box>
  );
};
