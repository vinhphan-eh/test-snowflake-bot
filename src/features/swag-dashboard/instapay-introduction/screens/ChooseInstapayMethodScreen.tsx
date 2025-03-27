import React, { useState } from 'react';
import { Dimensions, Image, PixelRatio, StatusBar } from 'react-native';
import { Box, Radio, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import images from '../../../../common/assets/images';
import { Page } from '../../../../common/components/layout/page';
import { scale, XXXHDPI_PIXEL_RATIO } from '../../../../common/utils/layout';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { BottomButtons } from '../containers/BottomButtons';
import { IntroductionSlider } from '../containers/IntroductionSlider';
import { useInstapayOnboardTracking } from '../hooks/useInstapayOnboardTracking';
import type { InstapayIntroductionNavigationProp } from '../navigation/navigationTypes';

const OptionValues = {
  NOW: 'instapayNow',
} as const;

type OptionValue = (typeof OptionValues)[keyof typeof OptionValues];

const { width: screenWidth } = Dimensions.get('screen');
// figma values
let imgHeight = scale(370, 'height');

const isLowPixelDensityScreen = PixelRatio.get() <= XXXHDPI_PIXEL_RATIO;
if (isLowPixelDensityScreen) {
  const fixRedundantHeaderHeight = 10; // height of header component in Carousel in HD which always renders => cause redundant empty space
  imgHeight -= fixRedundantHeaderHeight;
  // Reduce more height to be fit in small screen devices
}

export const ChooseInstapayMethodScreen = () => {
  const navigation = useNavigation<InstapayIntroductionNavigationProp<'ChooseInstapayMethodScreen'>>();
  const { colors, radii, space } = useTheme();
  const { bottom: bottomInset, top: topInset } = useSafeAreaInsets();
  const Intl = useIntl();
  const { trackClickOnContinue, trackClickSkipOnboarding } = useInstapayOnboardTracking();
  const [option, setOption] = useState<OptionValue>(OptionValues.NOW);
  const overlapGap = radii.xxxlarge;

  const onContinuePress = () => {
    trackClickOnContinue('instapay now');
    navigation.navigate('InstapayNowIntroCarouselScreen');
  };

  const onSkip = () => {
    trackClickSkipOnboarding('Choose Instapay Daily/Now');
    navigation.navigate('dashboard');
  };

  return (
    <Box flex={1}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.decorativePrimary} />
      <Box>
        <Image
          resizeMode="cover"
          style={{ width: screenWidth, height: imgHeight }}
          source={images.chooseInstapayMethod}
        />

        <IntroductionSlider
          style={{
            position: 'absolute',
            bottom: overlapGap + space.xxlarge,
          }}
        />
        <Page.TopBar
          backIconIntent="text"
          hideRight
          onBack={navigation.goBack}
          style={{ position: 'absolute', backgroundColor: 'transparent', top: topInset }}
        />
      </Box>
      <Box
        paddingHorizontal="medium"
        borderTopRightRadius="xxxlarge"
        borderTopLeftRadius="xxxlarge"
        justifyContent="space-between"
        backgroundColor="defaultGlobalSurface"
        flex={1}
        style={{ overflow: 'hidden', paddingBottom: bottomInset || space.medium, marginTop: -overlapGap }}
      >
        <Box>
          <Typography.Title style={{ marginTop: space.xxlarge }} typeface="playful" level="h1">
            {Intl.formatMessage({ id: 'instapay.introduction.wouldLikeToGetPaid' })}
          </Typography.Title>
          <Radio.Group
            inactiveIntent="dark"
            style={{ marginTop: space.large }}
            options={[
              // workaround, TODO: fix this when hero design supports adding custom components to Radio.Group
              {
                text: Intl.formatMessage({ id: 'instapay.introduction.options.instapayNow.title' }),
                subText: Intl.formatMessage({ id: 'instapay.introduction.options.instapayNow.subTitle' }),
                value: OptionValues.NOW,
              },
            ]}
            value={option}
            onPress={setOption}
          />
        </Box>
        <BottomButtons
          marginTop="small"
          leftAction={Intl.formatMessage({ id: 'common.skip' })}
          rightAction={Intl.formatMessage({ id: 'common.continue' })}
          onLeftPress={onSkip}
          onRightPress={onContinuePress}
        />
      </Box>
    </Box>
  );
};
