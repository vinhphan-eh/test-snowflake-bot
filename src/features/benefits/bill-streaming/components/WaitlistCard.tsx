import React from 'react';
import { Dimensions, Image, TouchableOpacity } from 'react-native';
import { Box, Icon, Typography, useTheme } from '@hero-design/rn';
import images from '../../../../common/assets/images';

type WaitlistCardProps = {
  onPress: () => void;
};

const { width: windowWidth } = Dimensions.get('window');

export const WaitlistCard = ({ onPress }: WaitlistCardProps) => {
  const { colors, radii, space } = useTheme();

  return (
    <TouchableOpacity onPress={onPress} style={{ overflow: 'hidden', borderRadius: radii.large }} activeOpacity={0.5}>
      <Image
        resizeMode="cover"
        accessibilityLabel="Background image"
        style={{
          position: 'absolute',
          right: -5,
          height: '100%',
          width: '62%',
        }}
        source={images.waitlistTileImg}
      />
      <Box
        borderTopRightRadius="5xlarge"
        borderBottomRightRadius="5xlarge"
        style={{ overflow: 'hidden', alignSelf: 'baseline' }}
        backgroundColor="decorativePrimarySurface"
        padding="medium"
      >
        <Typography.Title level="h4" accessibilityLabel="Save more everyday with bill management" typeface="playful">
          {'Save more everyday\nwith Bill Management'}
        </Typography.Title>
        <Typography.Body
          variant="small"
          accessibilityLabel="Join the waitlist description"
          style={{ marginTop: space.small, width: windowWidth * 0.55 }}
        >
          Join the waitlist for exclusive early access to streamline and save on your bills.
        </Typography.Body>

        <Box marginTop="medium" flexDirection="row" alignItems="center">
          <Typography.Title
            level="h5"
            accessibilityLabel="Find out more"
            intent="primary"
            style={{ marginRight: space.xsmall }}
          >
            Find out more
          </Typography.Title>
          <Icon style={{ color: colors.primary }} icon="arrow-right" />
        </Box>
      </Box>
    </TouchableOpacity>
  );
};
