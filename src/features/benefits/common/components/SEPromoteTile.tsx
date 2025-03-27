import React from 'react';
import type { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';
import { Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { Box, Typography, useTheme } from '@hero-design/rn';
import LinearGradient from 'react-native-linear-gradient';
import { useIntl } from '../../../../providers/LocalisationProvider';

type SEPromoteTileProps = {
  backgroundImage: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  testID?: string;
};

const screenWidth = Dimensions.get('screen').width;
const paddingVertical = 86;

export const SEPromoteTile = ({ backgroundImage, onPress, style, testID }: SEPromoteTileProps) => {
  const Intl = useIntl();
  const { colors, radii, space } = useTheme();

  return (
    <TouchableOpacity onPress={onPress} style={[style]} testID={testID}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        accessibilityLabel="background-image"
        style={[
          {
            width: screenWidth,
            height: 261,
            justifyContent: 'flex-end',
            paddingBottom: paddingVertical + space.medium,
          },
        ]}
        imageStyle={{ borderRadius: radii.xxxlarge }}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            borderRadius: radii.xxxlarge,
            opacity: 0.6,
          }}
        />
        <Typography.Title
          style={[
            {
              color: colors.defaultGlobalSurface,
              paddingLeft: space.small,
            },
          ]}
          accessibilityLabel={Intl.formatMessage({ id: 'benefits.bill.youVotedWeDelivered' })}
          typeface="playful"
          level="h4"
        >
          {Intl.formatMessage({ id: 'benefits.bill.youVotedWeDelivered' })}
        </Typography.Title>
      </ImageBackground>
      <Box
        style={{
          width: '100%',
          backgroundColor: colors.defaultGlobalSurface,
          borderRadius: radii.xxxlarge,
          marginTop: -paddingVertical,
          justifyContent: 'center',
        }}
        paddingHorizontal="medium"
        paddingVertical="large"
      >
        <Box>
          <Typography.Body
            accessibilityLabel={Intl.formatMessage({ id: 'benefits.bill.simplyEnergy' })}
            variant="regular"
            intent="body"
          >
            {Intl.formatMessage({ id: 'benefits.bill.simplyEnergy' })}
          </Typography.Body>
          <Typography.Title
            accessibilityLabel={Intl.formatMessage({ id: 'benefits.bill.swagDiscount' })}
            typeface="playful"
            level="h4"
          >
            {Intl.formatMessage({ id: 'benefits.bill.swagDiscount' })}
          </Typography.Title>
        </Box>
        <Box
          style={{
            backgroundColor: colors.highlightedSurface,
            alignSelf: 'flex-start',
            borderRadius: radii.base,
            paddingVertical: space.small,
            paddingHorizontal: space.xsmall,
            marginTop: space.small,
          }}
        >
          <Typography.Caption
            intent="primary"
            accessibilityLabel={Intl.formatMessage({ id: 'benefits.bill.communitySourced' })}
          >
            {Intl.formatMessage({ id: 'benefits.bill.communitySourced' }).toUpperCase()}
          </Typography.Caption>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};
