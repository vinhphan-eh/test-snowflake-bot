import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Typography, Box } from '@hero-design/rn';
import type { KeyedAddress } from '../../../../../common/stores/useKeyedAddressStore';
import { getEnvConfig } from '../../../../../common/utils/env';
import type { OfferLocation } from '../../../../../new-graphql/generated';
import { useIntl } from '../../../../../providers/LocalisationProvider';
import { extractCityAndState } from '../../utils/offer';
import { NearestLocation } from '../screens/InstoreOfferDetailV2Screen/NearestLocation';

export interface InstoreCashbackOfferCarouselEmptyStateProps {
  setKeyedAddress: (value: KeyedAddress) => void;
  nearestLocation: OfferLocation;
}

export const InstoreCashbackOfferCarouselEmptyState = ({
  nearestLocation,
  setKeyedAddress,
}: InstoreCashbackOfferCarouselEmptyStateProps) => {
  const Intl = useIntl();

  return (
    <Box paddingHorizontal="medium" marginBottom="medium">
      <NearestLocation location={nearestLocation}>
        {({ address }) =>
          address ? (
            <Typography.Body
              variant="small"
              intent="subdued"
              testID="nearest-location"
              onPress={
                getEnvConfig().IS_E2E === 'true'
                  ? () => {
                      // detox can't detect merged text views, so we need to add this onPress handler into the top-level text view
                      setKeyedAddress(address);
                    }
                  : undefined
              }
            >
              {Intl.formatMessage({ id: 'benefits.cashback.noStoreFoundNearThisLocationTry' })}{' '}
              <TouchableWithoutFeedback
                onPress={() => {
                  setKeyedAddress(address);
                }}
                testID="nearest-location-touchable"
              >
                <Typography.Body
                  variant="small"
                  style={{
                    textDecorationLine: 'underline',
                  }}
                  intent="primary"
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
    </Box>
  );
};
