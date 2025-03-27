import React from 'react';
import { Dimensions } from 'react-native';
import { useTheme, Box, Spinner } from '@hero-design/rn';
import type images from '../../../common/assets/images';
import { ExperimentEntry } from '../../../common/components/experiment/ExperimentEntry';

const screenWidth = Dimensions.get('screen').width;

type HeroPointsAdTileProps = {
  isLoading: boolean;
  onPressTile: () => void;
  accessibilityLabel: string;
  thumbnailName: keyof typeof images;
  title: string;
  description: string;
  fillFullWidth?: boolean;
};

export const HeroPointsAdTile = ({
  accessibilityLabel,
  description,
  fillFullWidth,
  isLoading,
  onPressTile,
  thumbnailName,
  title,
}: HeroPointsAdTileProps) => {
  const { colors, space } = useTheme();

  return (
    <Box
      backgroundColor="decorativePrimarySurface"
      borderRadius="xlarge"
      accessibilityLabel={accessibilityLabel}
      style={{
        width: fillFullWidth ? screenWidth - 2 * space.medium : screenWidth - space.xxxlarge,
        flex: 1,
        justifyContent: 'center',
      }}
    >
      {isLoading ? (
        <Spinner testID={`${accessibilityLabel}-loading`} size="small" />
      ) : (
        <ExperimentEntry
          title={title}
          description={description}
          showArrow
          onPress={onPressTile}
          thumbnailName={thumbnailName}
          backgroundColor={colors.decorativePrimarySurface}
          testID={`hero-points-${title}-ad-tile`}
        />
      )}
    </Box>
  );
};
