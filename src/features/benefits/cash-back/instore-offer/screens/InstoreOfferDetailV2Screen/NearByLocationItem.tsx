import React from 'react';
import { TouchableOpacity, Platform, Linking, ActionSheetIOS } from 'react-native';
import { Box, Icon, Typography, useTheme } from '@hero-design/rn';
import type { NearbyLocation } from './types';
import { useToast } from '../../../../../../common/shared-hooks/useToast';
import type { KeyedAddress } from '../../../../../../common/stores/useKeyedAddressStore';
import { formatAdvertiserName } from '../../../utils/offer';

export const NearByLocationItem = ({
  advertiserName,
  index,
  keyedAddress,
  location,
}: {
  advertiserName: string;
  location: NearbyLocation;
  keyedAddress: KeyedAddress | undefined;
  index: number;
}) => {
  const { space } = useTheme();
  const Toast = useToast();

  const openLinkWithErrorHandling = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (e) {
      Toast.show({
        content: 'Something went wrong while opening the map.',
      });
    }
  };

  const handleOnClick = async () => {
    const latLng = `${location.latitude},${location.longitude}`;
    const appleMapsUrl = `maps:0,0?q=${location.address}@${latLng}`;
    const androidMapsUrl = `geo:0,0?q=${latLng}(${location.address})`;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latLng}`;

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Google Maps', 'Apple Maps', 'Cancel'],
          cancelButtonIndex: 2,
        },
        async buttonIndex => {
          switch (buttonIndex) {
            case 0: {
              // Universal cross-platform syntax. This will open the Google Maps app if installed, or browser if not.
              openLinkWithErrorHandling(googleMapsUrl);
              break;
            }
            case 1: {
              // Apple Maps. This will ask user to install the app if not installed.
              openLinkWithErrorHandling(appleMapsUrl);
              break;
            }
            default: {
              break;
            }
          }
        }
      );
    } else {
      try {
        // Pioritize google maps app because we can set address text for the marker. Could be failed if Google Maps is not installed
        await Linking.openURL(androidMapsUrl);
      } catch (e) {
        // In case google maps is not installed, open web browser
        openLinkWithErrorHandling(googleMapsUrl);
      }
    }
  };

  return (
    <TouchableOpacity
      onPress={handleOnClick}
      style={{
        gap: space.small,
        marginTop: space.medium,
        flexDirection: 'row',
        flex: 1,
      }}
      testID={`nearby-location-item-${index}`}
    >
      <Icon icon="location-on-outlined" size="large" />
      <Box flex={1}>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          flex={1}
          style={{
            gap: space.small,
          }}
        >
          <Typography.Body
            variant="small-bold"
            style={{
              flex: 1,
            }}
          >
            {formatAdvertiserName(advertiserName)}
          </Typography.Body>
          {keyedAddress && (
            <Typography.Body variant="small" intent="subdued">
              {location.distance}
              km away
            </Typography.Body>
          )}
        </Box>
        <Typography.Body
          variant="small"
          intent="subdued"
          style={{
            marginTop: space.xsmall,
          }}
        >
          {location.address}
        </Typography.Body>
      </Box>
    </TouchableOpacity>
  );
};
