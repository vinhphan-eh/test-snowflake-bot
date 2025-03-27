import type { InStoreOffer, OnlineOffer } from '../../../new-graphql/generated';
import { mockInstoreOffer, mockOnlineOffer } from '../../../new-graphql/handlers/custom-mock/cashback';

export const fakeOffers: Array<OnlineOffer | InStoreOffer> = [mockInstoreOffer, mockOnlineOffer];
