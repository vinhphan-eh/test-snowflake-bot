import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Box, Icon, Typography, scale, useTheme } from '@hero-design/rn';
import images from '../../../common/assets/images';

const styles = StyleSheet.create({
  root: {
    elevation: 2,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
});

type LearnMoreButtonProps = {
  onContinue: () => void;
};
const LearnMoreButton = ({ onContinue }: LearnMoreButtonProps) => {
  return (
    <TouchableOpacity accessibilityLabel="Learn more" onPress={onContinue}>
      <Box flexDirection="row" alignItems="center" marginTop="small">
        <Box marginBottom="xsmall" marginRight="xxsmall">
          <Typography.Body variant="regular-bold" intent="info">
            Learn more
          </Typography.Body>
        </Box>
        <Icon icon="arrow-right" size="large" intent="primary" />
      </Box>
    </TouchableOpacity>
  );
};

type Props = { onContinue: () => void };

export const StashEntryCard = ({ onContinue }: Props) => {
  const { space } = useTheme();

  return (
    <Box
      backgroundColor="defaultGlobalSurface"
      borderRadius="large"
      flexDirection="row"
      marginTop="medium"
      alignItems="stretch"
      style={[styles.root, { paddingRight: scale(91) }]}
    >
      <Image
        source={images.stashEntryCard}
        resizeMode="cover"
        style={{ position: 'absolute', top: 0, bottom: 0, right: 0, height: '100%' }}
      />
      <Box
        bgColor="defaultGlobalSurface"
        borderRadius="medium"
        style={{
          paddingHorizontal: space.medium,
          paddingTop: space.large,
          paddingBottom: space.medium,
          width: '100%',
        }}
      >
        <Typography.Title level="h4" typeface="playful" style={{ marginBottom: space.small }}>
          Make budgeting a breeze with Stash
        </Typography.Title>
        <LearnMoreButton onContinue={onContinue} />
      </Box>
    </Box>
  );
};
