import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Box, Typography, useTheme } from '@hero-design/rn';
import CategoryBadge from './CategoryBadge';
import { MemberCount } from './MemberCount';
import { SavingInfo } from './SavingInfo';
import type { TCustomGroupDetail } from '../../hooks/useGroupsData';

type GroupItemProps = {
  testID: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  group: TCustomGroupDetail;
};

const { Caption, Title } = Typography;

export const GroupItem = ({ group, onPress, style, testID }: GroupItemProps) => {
  const { shadows, space } = useTheme();
  const { categories, memberCount, promoTitle, savingPeriod, savingRange, subtitle } = group;
  const categoryName = categories?.[0].name || '';

  return (
    <Box borderRadius="xlarge" backgroundColor="defaultGlobalSurface" style={style}>
      <TouchableOpacity
        testID={testID}
        accessibilityLabel="megadeal-group-item"
        onPress={onPress}
        activeOpacity={0.5}
        style={[shadows.default, { flexGrow: 1 }]}
      >
        <Box padding="medium" flexDirection="column" justifyContent="space-between" flexGrow={1}>
          <Box>
            <Box style={{ marginBottom: space.smallMedium }} flexDirection="row" justifyContent="flex-end">
              <CategoryBadge text={categoryName} />
            </Box>
            <Title level="h5" typeface="playful" style={{ marginBottom: space.small }}>
              {promoTitle}
            </Title>
            <Caption style={{ marginBottom: space.small }}>{subtitle}</Caption>
          </Box>
          <Box>
            <SavingInfo range={savingRange} period={savingPeriod} />
            <MemberCount memberCount={memberCount} />
          </Box>
        </Box>
      </TouchableOpacity>
    </Box>
  );
};
