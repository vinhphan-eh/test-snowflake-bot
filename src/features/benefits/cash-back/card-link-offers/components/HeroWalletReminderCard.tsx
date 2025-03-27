import React from 'react';
import { ImageBackground, Dimensions, Pressable } from 'react-native';
import { Box, Typography, useTheme } from '@hero-design/rn';
import images from '../../../../../common/assets/images';

type HeroWalletReminderCardType = {
  cashbackBalance?: number;
  onPress: () => void;
  header?: string;
  label?: string;
};

const screenWidth = Dimensions.get('screen').width;

const getText = (balance: number) => {
  if (balance >= 3 && balance < 10) {
    return 'Grab a coffee.';
  }

  if (balance >= 10 && balance < 50) {
    return 'Catch a movie.';
  }

  if (balance >= 50 && balance < 100) {
    return 'Go out for dinner.';
  }

  if (balance >= 100) {
    return 'Okay, Elon...';
  }

  return 'Claim your cash!';
};

export const HeroWalletReminderCard = ({ cashbackBalance = 0, header, label, onPress }: HeroWalletReminderCardType) => {
  const { space } = useTheme();
  const text = getText(cashbackBalance);

  return (
    <Pressable
      onPress={onPress}
      style={{
        shadowColor: 'shadowDefault',
        shadowOpacity: 0.08,
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowRadius: 4,
        elevation: 1,
      }}
    >
      <ImageBackground
        resizeMode="cover"
        source={images.swagCardReminder}
        style={{ height: 116, width: screenWidth - space.xlarge }}
      >
        <Box flex={1} flexDirection="column" justifyContent="space-around" paddingLeft="medium">
          <Typography.Title style={{ maxWidth: '80%' }} level="h4" typeface="playful">
            {header || text}
          </Typography.Title>
          <Typography.Body variant="small">{label || 'Open a Spend account'}</Typography.Body>
        </Box>
      </ImageBackground>
    </Pressable>
  );
};
