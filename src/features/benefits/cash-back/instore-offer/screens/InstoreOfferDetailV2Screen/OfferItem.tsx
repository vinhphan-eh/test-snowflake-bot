import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Box, Button, Typography, useTheme } from '@hero-design/rn';
import orderBy from 'lodash/orderBy';
import { NearByLocationItem } from './NearByLocationItem';
import { NearestLocation } from './NearestLocation';
import type { AllNearbyLocationsBottomSheetData, NearbyLocation } from './types';
import type { KeyedAddress } from '../../../../../../common/stores/useKeyedAddressStore';
import { capitalize } from '../../../../../../common/utils/string';
import type { InstoreOfferV2 } from '../../../../../../new-graphql/generated';
import { useIntl } from '../../../../../../providers/LocalisationProvider';
import { MAX_DISTANCE_IN_KM } from '../../../constants';
import { distanceBetween, extractCityAndState } from '../../../utils/offer';

export const OfferItem = ({
  item,
  keyedAddress,
  onOpenAllNearbyLocationsBts,
  setAllNearbyBtsData,
  setKeyedAddress,
  width,
}: {
  item: InstoreOfferV2;
  keyedAddress: KeyedAddress;
  width: number;
  setKeyedAddress: (value: KeyedAddress) => void;
  setAllNearbyBtsData: (value: AllNearbyLocationsBottomSheetData) => void;
  onOpenAllNearbyLocationsBts: () => void;
}) => {
  const { colors, space } = useTheme();
  const Intl = useIntl();
  const { advertiserName, locations, title } = item;

  const sortedLocations: NearbyLocation[] = orderBy(
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

  const nearbyLocations = sortedLocations.filter(location => {
    return location.distance <= MAX_DISTANCE_IN_KM;
  });

  return (
    <Box
      borderRadius="medium"
      marginRight="medium"
      padding="medium"
      style={{
        backgroundColor: colors.defaultGlobalSurface,
        width,
      }}
      testID="offer-item"
    >
      <Box
        flexDirection="row"
        justifyContent="space-between"
        marginTop="medium"
        marginBottom="small"
        alignItems="center"
      >
        <Typography.Title level="h4" typeface="playful">
          {capitalize(title)}
        </Typography.Title>
      </Box>

      {/* List locations */}
      {nearbyLocations.length > 0 && (
        <Box flexDirection="column" flex={1}>
          {nearbyLocations.slice(0, 3).map((location, index) => {
            return (
              <NearByLocationItem
                key={location.locationId}
                keyedAddress={keyedAddress}
                advertiserName={advertiserName}
                location={location}
                index={index}
              />
            );
          })}
        </Box>
      )}

      {nearbyLocations.length === 0 && sortedLocations[0] && (
        <NearestLocation location={sortedLocations[0]}>
          {({ address }) =>
            address ? (
              <Typography.Body
                variant="small"
                intent="primary"
                style={{
                  marginTop: space.medium,
                }}
                testID="nearest-location"
              >
                {Intl.formatMessage({ id: 'benefits.cashback.noStoreFoundNearThisLocationTry' })}{' '}
                <TouchableWithoutFeedback
                  onPress={() => {
                    setKeyedAddress(address);
                  }}
                >
                  <Typography.Body
                    intent="primary"
                    style={{
                      textDecorationLine: 'underline',
                    }}
                  >
                    {extractCityAndState(address)}
                  </Typography.Body>
                </TouchableWithoutFeedback>
              </Typography.Body>
            ) : (
              ''
            )
          }
        </NearestLocation>
      )}

      {nearbyLocations.length > 3 && (
        <Button
          testID="view-all-nearby-stores"
          variant="text"
          text={Intl.formatMessage({ id: 'benefits.cashback.viewAllNearbyStores' })}
          onPress={() => {
            setAllNearbyBtsData({
              advertiserName,
              nearbyLocations,
              keyedAddress,
            });

            // Delay the opening of the bottom sheet to avoid the bottom sheet from being closed immediately
            setTimeout(() => {
              onOpenAllNearbyLocationsBts();
            });
          }}
        />
      )}
    </Box>
  );
};
