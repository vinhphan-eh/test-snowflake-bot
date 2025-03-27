import React from 'react';
import { useTheme } from '@hero-design/rn';
import type { Advertiser } from '../../../../../new-graphql/generated';
import { useIntl } from '../../../../../providers/LocalisationProvider';
import { CashbackGridItem } from '../../components/CashbackGridItem';
import { formatAdvertiserName } from '../../utils/offer';
import { useInstoreAdvertiserInfo } from '../hooks/useInstoreAdvertiserInfo';

export const InstoreCashbackAdvertiserGridItem = ({
  index,
  item,
  latitude,
  longitude,
  onPress,
}: {
  item: Advertiser;
  longitude: number;
  latitude: number;
  onPress: () => void;
  index: number;
}) => {
  const Intl = useIntl();
  const { space } = useTheme();
  const { imageUrl, logoUrl, numStores, title } = useInstoreAdvertiserInfo({ longitude, latitude, item });

  return (
    <CashbackGridItem
      title={title}
      kicker={formatAdvertiserName(item.advertiserName)}
      numberOfLines={1}
      testID={`instore-advertiser-${index}`}
      imgSrc={{ uri: imageUrl }}
      logoSrc={{ uri: logoUrl }}
      style={{ marginBottom: space.large }}
      onPress={onPress}
      subTitle={Intl.formatMessage({ id: 'benefits.cashback.storesNearYou' }, { numStores })}
    />
  );
};
