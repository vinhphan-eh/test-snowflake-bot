import type { KeyedAddress } from '../../../../../../common/stores/useKeyedAddressStore';
import type { OfferLocation } from '../../../../../../new-graphql/generated';

export type NearbyLocation = OfferLocation & {
  distance: number;
};

export interface AllNearbyLocationsBottomSheetData {
  advertiserName: string;
  keyedAddress: KeyedAddress | undefined;
  nearbyLocations: NearbyLocation[];
}
