import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { capitalize } from '../../../../../common/utils/string';
import type { Advertiser } from '../../../../../new-graphql/generated';
import { useIntl } from '../../../../../providers/LocalisationProvider';
import { CashbackOfferBase } from '../../components/CashbackOfferBase';
import { formatAdvertiserName } from '../../utils/offer';
import { useInstoreAdvertiserInfo } from '../hooks/useInstoreAdvertiserInfo';

type InstoreAdvertiserItemProps = {
  item: Advertiser;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessibilityLabel?: string;
  onPress: () => void;
  latitude: number;
  longitude: number;
};

export const InstoreAdvertiserItem = ({
  accessibilityLabel,
  item,
  latitude,
  longitude,
  onPress,
  style,
  testID,
}: InstoreAdvertiserItemProps) => {
  const Intl = useIntl();
  const { advertiserName = '' } = item;

  const { logoUrl, numStores, title } = useInstoreAdvertiserInfo({ latitude, longitude, item });

  return (
    <CashbackOfferBase
      accessibilityLabel={accessibilityLabel}
      style={style}
      testID={testID}
      imgSource={logoUrl ? { uri: logoUrl } : undefined}
      supplierName={formatAdvertiserName(advertiserName)}
      title={capitalize(title)}
      offerType="instore"
      isCardLinkedOffer={false}
      onPress={onPress}
      bottomLabel={Intl.formatMessage({ id: 'benefits.cashback.storesNearYou' }, { numStores })}
    />
  );
};
