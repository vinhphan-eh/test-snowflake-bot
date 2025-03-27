import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Pressable } from 'react-native';
import { Typography, useTheme } from '@hero-design/rn';
import { CurrencyText } from '../../../common/components/currency-text/CurrencyText';
import { useRegionLocalisation } from '../../../providers/LocalisationProvider';

type TotalSavedCardProps = {
  amount: number;
  text: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
};

export const TotalSavedCard = ({ amount, onPress, style, text }: TotalSavedCardProps) => {
  const { colors, radii, space } = useTheme();
  const { formatMessage } = useRegionLocalisation();
  return (
    <Pressable
      style={({ pressed }) => [
        {
          borderRadius: radii.xlarge,
          backgroundColor: pressed ? colors.decorativePrimary : colors.decorativePrimarySurface,
          padding: space.medium,
        },
        style,
      ]}
      onPress={onPress}
    >
      <Typography.Caption style={{ marginBottom: space.small }}>
        {formatMessage({ id: 'benefits.bill.totalSaved' })}
      </Typography.Caption>
      <CurrencyText amount={amount} />
      <Typography.Caption intent="subdued" style={{ marginTop: space.small }}>
        {text}
      </Typography.Caption>
    </Pressable>
  );
};
