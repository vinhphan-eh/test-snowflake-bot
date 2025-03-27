import React from 'react';
import type { ContentType } from './constants';
import type { BottomSheetRef } from '../../../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetScrollView } from '../../../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetWithHD } from '../../../../../common/components/bottom-sheet/BottomSheetWithHD';
import { useBottomSheetDynamicSnapPoints } from '../../../../../common/components/bottom-sheet/useBottomSheetDynamicSnapPoints';
import { useIntl } from '../../../../../providers/LocalisationProvider';
import {
  PayCircleFortnightlyContent,
  PayCircleWeeklyContent,
  PayCircleMonthlyContent,
} from '../../../../income/instapay/components/InstapayIntroExperimentComponents';

type PayCycleInfoBtsProps = {
  contentType: ContentType;
  btsRef: React.RefObject<BottomSheetRef>;
};

export const PayCycleInfoBts = ({ btsRef, contentType }: PayCycleInfoBtsProps) => {
  const Intl = useIntl();
  const getData = () => {
    switch (contentType) {
      case 'fortnightly':
        return {
          title: Intl.formatMessage({ id: 'instapay.payIntroExperiment.payCircleFortnightlyContent.title' }),
          content: <PayCircleFortnightlyContent />,
        };
      case 'weekly':
        return {
          title: Intl.formatMessage({ id: 'instapay.payIntroExperiment.payCircleWeeklyContent.title' }),
          content: <PayCircleWeeklyContent />,
        };
      default:
        return {
          title: Intl.formatMessage({ id: 'instapay.payIntroExperiment.payCircleMonthlyContent.title' }),
          content: <PayCircleMonthlyContent />,
        };
    }
  };

  const {
    animatedContentHeight,
    animatedHandleHeight,
    animatedSnapPoints,
    contentContainerHeightStyle,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(true);

  return (
    <BottomSheetWithHD
      ref={btsRef}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      title={getData().title}
      handleIconName="cancel"
      handleIconSize="xsmall"
      handleIconIntent="text"
      actions={[
        {
          testID: 'got-it-btn',
          title: Intl.formatMessage({ id: 'common.gotIt' }),
          onPress: () => {
            btsRef.current?.close();
          },
        },
      ]}
    >
      {({ space }) => (
        <BottomSheetScrollView
          alwaysBounceVertical={false}
          style={contentContainerHeightStyle}
          contentContainerStyle={{ paddingHorizontal: space.large }}
          onLayout={handleContentLayout}
          testID="bottom-sheet-scroll-view"
        >
          {getData().content}
        </BottomSheetScrollView>
      )}
    </BottomSheetWithHD>
  );
};
