import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { capitalize } from '../../../../../common/utils/string';
import type { OnlineOffer } from '../../../../../new-graphql/generated';
import { CashbackOfferBase } from '../../components/CashbackOfferBase';

type OnlineOfferItemProps = {
  item: OnlineOffer;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  accessibilityLabel?: string;
  testID?: string;
};

export const OnlineOfferItem = ({ accessibilityLabel, item, onPress, style, testID }: OnlineOfferItemProps) => {
  const { advertiserName, categoryCode, imageUrl, isCardLinkedOffer, title, type } = item;
  return (
    <CashbackOfferBase
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      style={style}
      imgSource={imageUrl ? { uri: imageUrl } : undefined}
      supplierName={advertiserName}
      title={capitalize(title.replace('>', 'over'))}
      offerType="online"
      category={categoryCode}
      bottomLabel={capitalize(type)}
      isCardLinkedOffer={isCardLinkedOffer}
      onPress={onPress}
    />
  );
};
