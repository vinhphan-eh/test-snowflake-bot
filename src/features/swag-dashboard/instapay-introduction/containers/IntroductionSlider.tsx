import React, { useRef } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Box, useTheme } from '@hero-design/rn';
import type { BottomSheetRef } from '../../../../common/components/bottom-sheet/BottomSheet';
import Slider from '../../../../common/components/slider';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { HomeOwnerInfoBts } from '../components/HomeOwnerInfoBts';
import { SpenderInfoBts } from '../components/SpenderInfoBts';
import { useInstapayOnboardTracking } from '../hooks/useInstapayOnboardTracking';

type IntroductionSliderProps = {
  style?: StyleProp<ViewStyle>;
};

export const IntroductionSlider = ({ style }: IntroductionSliderProps) => {
  const Intl = useIntl();
  const { space } = useTheme();
  const { trackClickOnHomeOwnerTile, trackClickOnSpenderTile } = useInstapayOnboardTracking();
  const spenderBtsRef = useRef<BottomSheetRef>(null);
  const homeOwnerBtsRef = useRef<BottomSheetRef>(null);

  return (
    <Box>
      <Slider
        style={style}
        cards={[
          {
            hideIcon: true,
            title: Intl.formatMessage({ id: 'instapay.introduction.emergencyUse' }),
            description: Intl.formatMessage({ id: 'instapay.introduction.emergencyUseDescription' }),
          },
          {
            hideIcon: true,
            style: { marginLeft: space.small },
            title: Intl.formatMessage({ id: 'instapay.introduction.manageBills' }),
            description: Intl.formatMessage({ id: 'instapay.introduction.manageBillsDescription' }),
          },
          {
            style: { marginLeft: space.small },
            title: Intl.formatMessage({ id: 'instapay.introduction.imSpender' }),
            description: Intl.formatMessage({ id: 'instapay.introduction.spenderDescription' }),
            onPress: () => {
              trackClickOnSpenderTile();
              spenderBtsRef.current?.open();
            },
          },
          {
            style: { marginLeft: space.small },
            title: Intl.formatMessage({ id: 'instapay.introduction.iOwnHome' }),
            description: Intl.formatMessage({ id: 'instapay.introduction.ownHomeDescription' }),
            onPress: () => {
              trackClickOnHomeOwnerTile();
              homeOwnerBtsRef.current?.open();
            },
          },
        ]}
      />
      <SpenderInfoBts btsRef={spenderBtsRef} />
      <HomeOwnerInfoBts btsRef={homeOwnerBtsRef} />
    </Box>
  );
};
