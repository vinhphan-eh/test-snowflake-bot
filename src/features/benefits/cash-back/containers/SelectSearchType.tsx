import React from 'react';
import { Keyboard } from 'react-native';
import { Box, useTheme } from '@hero-design/rn';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { PillComp } from '../components/PillComp';
import type { CashbackSearchType } from '../types';

type SelectSearchTypeProps = {
  selectedType: CashbackSearchType;
  onSelect: (type: CashbackSearchType) => void;
};

export const SelectSearchType = ({ onSelect, selectedType }: SelectSearchTypeProps) => {
  const { space } = useTheme();
  const Intl = useIntl();

  const onSelectType = (cashbackType: CashbackSearchType) => {
    Keyboard.dismiss();
    onSelect(cashbackType);
  };

  return (
    <Box marginHorizontal="medium" flexWrap="wrap" flexDirection="row">
      <PillComp
        testID="online-pill"
        accessibilityLabel="Search online offers"
        onPress={() => onSelectType('online')}
        style={{ marginRight: space.smallMedium, marginTop: space.smallMedium }}
        icon="charging-station-outlined"
        label={Intl.formatMessage({ id: 'benefits.cashback.onlinePill' })}
        isSelected={selectedType === 'online'}
      />
      <PillComp
        testID="instore-pill"
        accessibilityLabel="Search instore offers"
        onPress={() => onSelectType('instore')}
        style={{ marginRight: space.smallMedium, marginTop: space.smallMedium }}
        icon="location-on-outlined"
        label={Intl.formatMessage({ id: 'benefits.cashback.instorePill' })}
        isSelected={selectedType === 'instore'}
      />
    </Box>
  );
};
