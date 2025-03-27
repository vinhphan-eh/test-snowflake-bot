import React from 'react';
import { Image, type StyleProp, type ViewStyle } from 'react-native';
import { Dashboard } from '@ehrocks/rn-swag-ui';
import { useTheme, scale, Box, Typography } from '@hero-design/rn';
import LinearGradient from 'react-native-linear-gradient';

interface CashbackTileProps {
  testID?: string;
  permission?: boolean;
  title?: string;
  subtitle?: string;
  onPress?: () => void;
  backgroundSource: string;
  logoSource: string;
  style?: StyleProp<ViewStyle>;
}

const CashbackTile = ({
  backgroundSource,
  logoSource,
  onPress,
  permission,
  style,
  subtitle,
  testID,
  title,
}: CashbackTileProps) => {
  const theme = useTheme();

  if (!permission) {
    return null;
  }

  return (
    <Dashboard.WidgetCard
      testID={testID}
      style={[
        {
          height: scale(160),
          width: scale(252),
          marginLeft: theme.space.smallMedium,
          padding: 0,
        },
        style,
      ]}
      onPress={onPress}
    >
      <Image
        source={{ uri: backgroundSource }}
        style={{
          flex: 1,
          width: '100%',
          borderRadius: theme.radii.xlarge,
        }}
        resizeMode="cover"
      />
      <Image
        source={{ uri: logoSource }}
        style={{
          position: 'absolute',
          width: scale(34),
          height: scale(34),
          left: theme.space.medium,
          top: theme.space.medium,
          borderRadius: theme.radii.base,
        }}
      />
      <LinearGradient
        colors={[
          'rgba(0, 0, 0, 0)',
          'rgba(0, 0, 0, 0.05)',
          'rgba(0, 0, 0, 0.15)',
          'rgba(0, 0, 0, 0.25)',
          'rgba(0, 0, 0, 0.35)',
          'rgba(0, 0, 0, 0.45)',
        ]}
        style={{
          flex: 1,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          top: theme.space.medium * 4,
          borderBottomLeftRadius: theme.radii.xlarge,
          borderBottomRightRadius: theme.radii.xlarge,
        }}
      >
        <Box
          style={{
            position: 'absolute',
            left: theme.space.medium,
            right: theme.space.medium,
            bottom: theme.space.medium,
          }}
        >
          <Typography.Title typeface="playful" level="h4" intent="inverted">
            {title}
          </Typography.Title>
          <Typography.Caption intent="inverted">{subtitle}</Typography.Caption>
        </Box>
      </LinearGradient>
    </Dashboard.WidgetCard>
  );
};

export default CashbackTile;
