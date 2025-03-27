import React from 'react';
import { Box } from '@hero-design/rn';
import { NearByLocationItem } from './NearByLocationItem';
import type { AllNearbyLocationsBottomSheetData } from './types';
import type { BottomSheetRef } from '../../../../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetScrollView } from '../../../../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetWithHD } from '../../../../../../common/components/bottom-sheet/BottomSheetWithHD';
import { useBottomSheetDynamicSnapPoints } from '../../../../../../common/components/bottom-sheet/useBottomSheetDynamicSnapPoints';
import { useIntl } from '../../../../../../providers/LocalisationProvider';

export const AllNearbyLocationsBottomSheet = ({
  btsRef,
  data,
}: {
  data: AllNearbyLocationsBottomSheetData | null;
  btsRef: React.RefObject<BottomSheetRef>;
}) => {
  const Intl = useIntl();

  const {
    animatedContentHeight,
    animatedHandleHeight,
    animatedSnapPoints,
    contentContainerHeightStyle,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(false);

  return (
    <BottomSheetWithHD
      ref={btsRef}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      themeName="eBens"
      title={Intl.formatMessage({ id: 'benefits.cashback.allNearbyStores' })}
      handleIconName="cancel"
      handleIconSize="xsmall"
    >
      {({ space }) =>
        data ? (
          <BottomSheetScrollView
            style={{
              ...contentContainerHeightStyle,
              maxHeight: contentContainerHeightStyle.maxHeight,
            }}
            onLayout={handleContentLayout}
            testID="all-nearby-locations"
          >
            {data.nearbyLocations.map((location, index) => (
              <Box
                key={location.locationId}
                style={{
                  paddingHorizontal: space.smallMedium,
                }}
              >
                <NearByLocationItem
                  keyedAddress={data.keyedAddress}
                  advertiserName={data.advertiserName}
                  location={location}
                  index={index}
                />
              </Box>
            ))}
          </BottomSheetScrollView>
        ) : (
          <></>
        )
      }
    </BottomSheetWithHD>
  );
};
