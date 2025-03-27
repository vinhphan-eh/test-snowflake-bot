import type { KeyedAddress } from '../../../../common/stores/useKeyedAddressStore';
import type { Advertiser, InStoreOffer } from '../../../../new-graphql/generated';
import { MAX_DISTANCE_IN_KM } from '../constants';

export const formatAdvertiserName = (name: string) => name.replace(/\(?(Instore|In-store|InStore)\)?/g, '').trim();

/** Using Haversine formula
 *  where: 'M' is statute miles (default)
 *  'K' is kilometers
 *  'N' is nautical miles
 */
type Unit = 'M' | 'K' | 'N';
export type Coordinate = {
  latitude: number;
  longitude: number;
};
export function distanceBetween(point1: Coordinate, point2: Coordinate, unit: Unit = 'M') {
  if (point1.latitude === point2.latitude && point1.longitude === point2.longitude) {
    return 0;
  }
  const radlat1 = (Math.PI * point1.latitude) / 180;
  const radlat2 = (Math.PI * point2.latitude) / 180;
  const theta = point1.longitude - point2.longitude;
  const radtheta = (Math.PI * theta) / 180;
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit === 'K') {
    dist *= 1.609344;
  }
  if (unit === 'N') {
    dist *= 0.8684;
  }
  return Number(dist.toFixed(2));
}

export const getVisibilityRange = (zoomLevel: number) => {
  // [min, max] in km
  switch (zoomLevel) {
    case 10:
      return { min: 14, max: 20 };
    case 11:
      return { min: 10, max: 20 };
    case 12:
      return { min: 3, max: 20 };
    case 13:
      return { min: 2, max: 20 };
    case 14:
      return { min: 1, max: 20 };
    case 15:
    case 16:
    case 17:
    case 18:
    case 19:
    case 20:
    case 21:
      return { min: 0, max: 20 };
    default:
      return { min: 20, max: 20 };
  }
};

export const getNearByLocationsFromAdvertisers = (
  advertisers: Advertiser[],
  latitude: number,
  longitude: number
): InStoreOffer[] => {
  // Flat map the offers from the advertisers
  const locations: InStoreOffer[] = [];

  advertisers.forEach(advertiser => {
    advertiser.offers.forEach(offer => {
      if ('locations' in offer) {
        offer.locations.forEach(location => {
          locations.push({
            __typename: 'InStoreOffer',
            ...location,
            ...offer,
            locations: undefined,
            id: `${offer.id}_${location.locationId}`,
            advertiserId: advertiser.id,
          } as InStoreOffer);
        });
      }
    });
  });

  return locations.filter(location => {
    // Filter out offers that are not within the visibility range of 20km
    const distance = distanceBetween(
      {
        latitude,
        longitude,
      },
      {
        latitude: location.latitude,
        longitude: location.longitude,
      },
      'K'
    );

    return distance <= MAX_DISTANCE_IN_KM;
  });
};

export const extractCityAndState = (address: KeyedAddress) => {
  // Postcode location's name has this format North Bondi NSW 2026, Australia.
  //  This extract function will return Australia only, which is short, we should return the whole name.
  if (address.isPostcodeLocation) {
    return address.name;
  }

  return address.name.split(', ')[1] ?? address.name;
};
