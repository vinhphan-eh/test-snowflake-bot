import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { Typography, useTheme } from '@hero-design/rn';
import type { BottomSheetRef } from '../../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetScrollView } from '../../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetWithHD } from '../../../../common/components/bottom-sheet/BottomSheetWithHD';
import { useBottomSheetDynamicSnapPoints } from '../../../../common/components/bottom-sheet/useBottomSheetDynamicSnapPoints';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { useBenefitsBillMgmtTracking } from '../hooks/useBenefitsBillMgmtTracking';
import { useBillManagementOfferStore } from '../stores/useBillManagementOfferStore';

type StateBasedSelectProps = {
  stateOptions: string[];
  goBack?: () => void;
};

export type BillOfferExplanationHandler = {
  open: () => void;
};

export const StateBasedSelect = forwardRef<BillOfferExplanationHandler, StateBasedSelectProps>(
  ({ goBack, stateOptions }, ref) => {
    const { currentState, setCurrentState } = useBillManagementOfferStore();
    const { trackSelectStateToViewSEOffer } = useBenefitsBillMgmtTracking();
    const btsRef = useRef<BottomSheetRef>(null);
    const { colors, radii } = useTheme();
    const { formatMessage } = useIntl();

    useImperativeHandle(ref, () => ({
      open: () => {
        btsRef.current?.open();
      },
    }));

    useEffect(() => {
      if (currentState) {
        trackSelectStateToViewSEOffer(currentState);
      }
    }, [currentState]);

    const onStateSelect = (state: string) => {
      setCurrentState(state);
      btsRef.current?.close();
    };

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
        title={formatMessage({ id: 'benefits.bill.selectState' })}
        handleIconName="cancel"
        handleIconSize="small"
        themeName="eBens"
        onDismiss={currentState ? () => {} : goBack}
      >
        {({ space }) => (
          <BottomSheetScrollView
            style={contentContainerHeightStyle}
            onLayout={handleContentLayout}
            testID="bottom-sheet-state-based-select"
          >
            {stateOptions?.map(stateOption => (
              <TouchableOpacity
                key={stateOption}
                style={{
                  marginHorizontal: space.medium,
                  paddingVertical: space.medium,
                  paddingLeft: space.medium,
                  marginTop: space.small,
                  backgroundColor:
                    currentState === stateOption ? colors.highlightedSurface : colors.defaultGlobalSurface,
                  borderRadius: radii.medium,
                }}
                onPress={() => onStateSelect(stateOption)}
              >
                <Typography.Body>{stateOption}</Typography.Body>
              </TouchableOpacity>
            ))}
          </BottomSheetScrollView>
        )}
      </BottomSheetWithHD>
    );
  }
);
