import { useMemo } from 'react';
import orderBy from 'lodash/orderBy';
import type { KeyedAddress } from '../../../../common/stores/useKeyedAddressStore';
import { OfferType, useGetCashbackOffersGroupByAdvertiserQuery } from '../../../../new-graphql/generated';
import { distanceBetween } from '../../cash-back/utils/offer';
import { CategoryCodes } from '../constants/benefits';

export const useNearestLocation = ({
  categoryCode,
  enabled,
  keyedAddress,
  query,
}: {
  keyedAddress: KeyedAddress;
  query: string;
  categoryCode: string;
  enabled: boolean;
}) => {
  const {
    data: nearestAdvertisers,
    isError,
    isLoading,
  } = useGetCashbackOffersGroupByAdvertiserQuery(
    {
      input: {
        type: OfferType.Instore,
        latitude: keyedAddress.latitude,
        longitude: keyedAddress.longitude,
        range: -1, // no range
        query,
        // all: don't pass categoryCode to load all cashback offers
        ...(categoryCode !== CategoryCodes.All ? { categoryCode } : {}),
      },
    },
    {
      enabled,
    }
  );

  const nearestLocation = useMemo(() => {
    const nearestAdvertiser = nearestAdvertisers?.me?.cashback?.allAdvertisers?.edges?.[0]?.node;

    if (!nearestAdvertiser) {
      return null;
    }

    const locations = nearestAdvertiser.offers.flatMap(offer => {
      if ('locations' in offer) {
        return offer.locations;
      }

      return [];
    });

    const sortedLocations = orderBy(
      locations.map(location => ({
        ...location,
        distance: distanceBetween(
          {
            latitude: location.latitude,
            longitude: location.longitude,
          },
          {
            latitude: keyedAddress.latitude,
            longitude: keyedAddress.longitude,
          },
          'K'
        ),
      })),
      'distance'
    );

    return sortedLocations[0] || null;
  }, [nearestAdvertisers, keyedAddress]);

  const isNearestLocationEmptyAfterFetch = enabled && !isLoading && nearestLocation === null && !isError;

  return {
    isError,
    isLoading,
    nearestLocation,
    isNearestLocationEmptyAfterFetch,
  };
};
