import { useEffect } from 'react';
import { useLoadDeviceLocation } from './useLoadDeviceLocation';
import { useGetLocationsQuery } from '../../new-graphql/generated';

export const useLoadLocationByPostcode = (postCode: string, region: string) => {
  const { data, isError, isLoading } = useGetLocationsQuery({ input: { postCode, country: region } });
  const { setKeyedAddress } = useLoadDeviceLocation({});
  const address = data?.getLocations?.addresses?.[0];
  useEffect(() => {
    if (!isLoading && !isError) {
      if (address) {
        setKeyedAddress({
          name: address.formattedAddress,
          // longitude and latitude are not null in the response
          // of the getLocations by postCode
          longitude: address.longitude as number,
          latitude: address.latitude as number,
          isCurrentLocation: false,
          isPostcodeLocation: true,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError, postCode, region]);
};
