import React, { useEffect, useState } from 'react';
import type { OfferLocation } from '../../../../../../../e2e/new-graphql/generated';
import type { KeyedAddress } from '../../../../../../common/stores/useKeyedAddressStore';
import { useGetLocationsQuery } from '../../../../../../new-graphql/generated';

export const NearestLocation = ({
  children,
  location,
}: {
  location: OfferLocation;
  children: ({ address }: { address: KeyedAddress | null }) => React.ReactNode;
}) => {
  const [keyedAddress, setKeyedAddress] = useState<KeyedAddress | null>(null);
  const { data, isLoading, isSuccess } = useGetLocationsQuery({
    input: {
      latitude: location.latitude,
      longitude: location.longitude,
    },
  });
  useEffect(() => {
    if (!isLoading && isSuccess) {
      const address = data.getLocations?.addresses?.[0];
      setKeyedAddress({
        name: address?.formattedAddress ?? 'Your current location',
        isCurrentLocation: false,
        latitude: location.latitude,
        longitude: location.longitude,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isSuccess, location.latitude, location.longitude]);

  return (
    <>
      {children({
        address: keyedAddress,
      })}
    </>
  );
};
