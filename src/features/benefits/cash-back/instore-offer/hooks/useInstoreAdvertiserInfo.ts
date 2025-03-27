import { useMemo } from 'react';
import uniqBy from 'lodash/uniqBy';
import type { Advertiser } from '../../../../../new-graphql/generated';
import { useIntl } from '../../../../../providers/LocalisationProvider';
import { MAX_DISTANCE_IN_KM } from '../../constants';
import { distanceBetween } from '../../utils/offer';

export const useInstoreAdvertiserInfo = ({
  item,
  latitude,
  longitude,
}: {
  item: Advertiser;
  latitude: number;
  longitude: number;
}) => {
  const Intl = useIntl();

  const logoUrl = item.offers[0]?.logoUrl || '';
  const imageUrl = item.offers[0]?.imageUrl || '';

  const title = useMemo(() => {
    if (item.offers.length === 1) {
      return item.offers[0]?.title;
    }

    const numOffers = item.offers.filter(o => {
      if ('locations' in o) {
        return o.locations.some(location => {
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
      }

      return false;
    }).length;

    if (numOffers === 1) {
      return item.offers[0]?.title;
    }

    return Intl.formatMessage({ id: 'benefits.cashback.variousOffersAvailable' });
  }, [item, longitude, latitude, Intl]);

  const numStores = useMemo(
    () =>
      uniqBy(
        item.offers.flatMap(o => {
          if ('locations' in o) {
            return o.locations;
          }

          return [];
        }),
        'locationId'
      ).filter(location => {
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
      }).length,
    [latitude, longitude, item]
  );

  return {
    logoUrl,
    imageUrl,
    title,
    numStores,
  };
};
