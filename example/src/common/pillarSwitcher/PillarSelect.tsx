import React, { useEffect } from 'react';
import { Box } from '@hero-design/rn';
import { useState } from 'react';
import RadioButton from '../component/RadioButton';
import type { StyleProp, ViewStyle } from 'react-native';
import { PillarIds } from '../../super-app-navigation/constants';
import { useMiniAppSwitcherStore } from '@ehrocks/react-native-swag-personal-app';

type PillarSelectProps = {
  style?: StyleProp<ViewStyle>;
};

const PillarSelect = ({ style }: PillarSelectProps) => {
  const [value, setValue] = useState<PillarIds>(PillarIds.WALLET_APP);

  useEffect(() => {
    useMiniAppSwitcherStore.setState({
      currentPillar: value,
    });
  }, [value]);

  return (
    <Box
      style={[
        {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          gap: 16,
        },
        style,
      ]}>
      <RadioButton
        testID="money-app-radio-button"
        title="Money"
        selected={value === PillarIds.WALLET_APP}
        value={PillarIds.WALLET_APP}
        onPress={setValue}
      />
      <RadioButton
        testID="benefits-app-radio-button"
        title="Benefits"
        selected={value === PillarIds.BENEFITS_APP}
        value={PillarIds.BENEFITS_APP}
        onPress={setValue}
      />
      <RadioButton
        testID="swag-app-radio-button"
        title="Swag"
        selected={value === PillarIds.SWAG_APP}
        value={PillarIds.SWAG_APP}
        onPress={setValue}
      />
    </Box>
  );
};

export default PillarSelect;
