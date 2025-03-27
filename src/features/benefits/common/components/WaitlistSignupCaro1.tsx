import React from 'react';
import { Dimensions, Image } from 'react-native';
import { Box } from '@hero-design/rn';
import { WaitlistSignupSection } from './WaitlistSignupSection';
import images from '../../../../common/assets/images';

const screenWidth = Dimensions.get('screen').width;
const imgHeight = (screenWidth * 157) / screenWidth;
type WaitlistSignupCaro1Props = {
  testID?: string;
};

export const WaitlistSignupCaro1 = ({ testID }: WaitlistSignupCaro1Props) => {
  return (
    <Box style={{ marginTop: -24 }} testID={testID}>
      <Image
        source={images.waitListAnimationBackground}
        resizeMode="contain"
        style={{
          height: imgHeight,
          width: screenWidth,
          alignSelf: 'center',
        }}
      />
      <Image
        source={images.waitListAthlete}
        resizeMode="cover"
        style={{ marginTop: -104, width: 129.56, height: 132, alignSelf: 'center' }}
      />
      <WaitlistSignupSection />
    </Box>
  );
};
