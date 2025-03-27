import React from 'react';
import { useTheme } from '@hero-design/rn';
import type { Advertiser } from '../../../../../new-graphql/generated';
import { useIntl } from '../../../../../providers/LocalisationProvider';
import { CashbackCarouselItem } from '../../components/CashbackCarouselItem';
import { formatAdvertiserName } from '../../utils/offer';
import { useInstoreAdvertiserInfo } from '../hooks/useInstoreAdvertiserInfo';

export const InstoreCashbackAdvertiserCarouselItem = ({
  index,
  isLastIndex,
  item,
  latitude,
  longitude,
  onPress,
}: {
  isLastIndex: boolean;
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
    <CashbackCarouselItem
      title={title}
      kicker={formatAdvertiserName(item.advertiserName)}
      testID={`advertiser-${index}`}
      numberOfLines={1}
      imgSrc={{ uri: imageUrl }}
      logoSrc={{ uri: logoUrl }}
      style={{ marginRight: isLastIndex ? 0 : space.smallMedium }}
      onPress={onPress}
      subTitle={Intl.formatMessage({ id: 'benefits.cashback.storesNearYou' }, { numStores })}
    />
  );
};
