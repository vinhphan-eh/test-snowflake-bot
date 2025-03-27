import isEmpty from 'lodash/fp/isEmpty';

import { type OnlineOffer, useGetFeaturedOffersQuery } from '../../../../../new-graphql/generated';
import { useCashbackPermission } from '../../../../benefits/common/hooks/useCashbackPermission';

export const useDynamicCashbackTilesVisibility = (): {
  visibleDynamicCashbackTiles: boolean;
  travelOnlineOffers: Array<OnlineOffer>;
} => {
  const { permission: showCashbackFlow } = useCashbackPermission();
  const { data: featuredOnlineOffersData } = useGetFeaturedOffersQuery({ input: { first: 100 } });
  const featuredOnlineOffers = featuredOnlineOffersData?.me?.cashback?.featuresOffers.edges ?? [];
  const travelOnlineOffers = featuredOnlineOffers
    .map(item => item.node)
    .filter(
      item =>
        item?.categoryCode === 'travel' &&
        (item?.advertiserName === 'Booking.com' || item?.advertiserName === 'Virgin Australia Airlines')
    );

  return {
    visibleDynamicCashbackTiles: showCashbackFlow && !isEmpty(travelOnlineOffers),
    travelOnlineOffers,
  };
};
