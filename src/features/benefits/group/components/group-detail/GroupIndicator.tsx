import React from 'react';
import type { ImageSourcePropType, StyleProp, TextStyle } from 'react-native';
import { Box, Avatar, Typography, useTheme } from '@hero-design/rn';
import { generateUUID } from '../../../../../common/utils/numbers';
import { MINIMUM_MEMBER_COUNT_INDICATOR } from '../../constants';
import { getMemberCount } from '../../utils/getMemberCount';

type GroupIndicatorProps = {
  memberCount: number;
  memberAvatars: ImageSourcePropType[];
};

const { Body, Caption } = Typography;

export const GroupIndicator = ({ memberAvatars, memberCount }: GroupIndicatorProps) => {
  const { fontSizes } = useTheme();

  const getCaptionStyles = () => {
    let styles = {
      fontWeight: '600',
      marginLeft: 4,
      fontSize: fontSizes.small,
      letterSpacing: 0,
    };
    if (memberCount.toString().length > 2) {
      styles = { ...styles, marginLeft: 2, fontSize: fontSizes.xsmall, letterSpacing: -1 };
    }
    return styles as StyleProp<TextStyle>;
  };

  if (memberCount <= MINIMUM_MEMBER_COUNT_INDICATOR || memberAvatars.length <= 0) {
    return null;
  }

  return (
    <Box
      padding="xsmall"
      borderRadius="rounded"
      bgColor="defaultGlobalSurface"
      marginBottom="xxlarge"
      marginRight="medium"
      style={{
        padding: 2,
        position: 'absolute',
        right: 0,
        bottom: 0,
      }}
    >
      <Avatar.Stack
        variant="vertical"
        total={memberCount}
        renderSurplus={() => {
          return (
            <Box
              flex={1}
              justifyContent="flex-start"
              alignItems="center"
              bgColor="defaultGlobalSurface"
              borderRadius="rounded"
            >
              <Box flexDirection="row" alignItems="flex-end">
                <Caption style={getCaptionStyles()}>{getMemberCount(memberCount)}</Caption>
                <Body>{'\u207A'}</Body>
              </Box>
            </Box>
          );
        }}
      >
        {memberAvatars.map(image => (
          <Avatar key={generateUUID()} source={image} />
        ))}
      </Avatar.Stack>
    </Box>
  );
};
