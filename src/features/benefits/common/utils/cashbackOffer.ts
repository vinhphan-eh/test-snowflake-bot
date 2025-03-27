import type { InStoreOffer, OnlineOffer } from '../../../../new-graphql/generated';
import { OfferType } from '../../../../new-graphql/generated';

export const isOnlineOffer = (offer: OnlineOffer | InStoreOffer): offer is OnlineOffer =>
  (offer as OnlineOffer)?.type === OfferType.Online;
