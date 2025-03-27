import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { capitalize } from '../../../../../common/utils/string';
import type { InStoreOffer } from '../../../../../new-graphql/generated';
import { useIntl } from '../../../../../providers/LocalisationProvider';
import { CashbackOfferBase } from '../../components/CashbackOfferBase';
import { formatAdvertiserName } from '../../utils/offer';

type InstoreOfferItemProps = {
  item: InStoreOffer;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessibilityLabel?: string;
  onPress: () => void;
  bottomLabel?: string;
};

export const InstoreOfferItem = ({
  accessibilityLabel,
  bottomLabel,
  item,
  onPress,
  style,
  testID,
}: InstoreOfferItemProps) => {
  const { advertiserName = '', categoryCode, logoUrl, title } = item;
  const Intl = useIntl();
  return (
    <CashbackOfferBase
      accessibilityLabel={accessibilityLabel}
      style={style}
      testID={testID}
      imgSource={logoUrl ? { uri: logoUrl } : undefined}
      supplierName={formatAdvertiserName(advertiserName)}
      title={capitalize(title)}
      offerType="instore"
      category={categoryCode}
      isCardLinkedOffer={false}
      onPress={onPress}
      bottomLabel={bottomLabel || Intl.formatMessage({ id: 'benefits.cashback.offerLabel.instore' })}
    />
  );
};
