import React, { useState } from 'react';
import { Dimensions, Image, PixelRatio, ScrollView } from 'react-native';
import { Box, Carousel, useTheme } from '@hero-design/rn';
import type { CarouselData } from '@hero-design/rn/types/components/Carousel/types';
import { useNavigation } from '@react-navigation/native';
import { FirstPage } from './FirstPage';
import { SecondPage } from './SecondPage';
import images from '../../../../../common/assets/images';
import { CustomStatusBar } from '../../../../../common/components/status-bar/CustomStatusBar';
import { scale, XXHDPI_PIXEL_RATIO } from '../../../../../common/utils/layout';
import { InstaPayOption } from '../../../../../new-graphql/generated';
import { useIntl } from '../../../../../providers/LocalisationProvider';
import { BottomButtons } from '../../containers/BottomButtons';
import { useInstapayOnboardTracking } from '../../hooks/useInstapayOnboardTracking';
import { useUpdateInstapayOnboarding } from '../../hooks/useUpdateInstapayOnboarding';
import type { InstapayIntroductionNavigationProp } from '../../navigation/navigationTypes';

const { width: screenWidth } = Dimensions.get('window');
const imgOriginalHeight = 328; // image height in figma design
let imgHeight = scale(imgOriginalHeight, 'height');
const isLowPixelDensityScreen = PixelRatio.get() < XXHDPI_PIXEL_RATIO;
if (isLowPixelDensityScreen) {
  const fixRedundantHeaderHeight = 40; // height of header component in Carousel in HD which always renders => cause redundant empty space
  imgHeight -= fixRedundantHeaderHeight;
  // Reduce more height to be fit in small screen devices
  imgHeight -= 22;
}

export const InstapayNowIntroCarouselScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<InstapayIntroductionNavigationProp<'InstapayNowIntroCarouselScreen'>>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const Intl = useIntl();
  const { trackClickOnBackBtn, trackClickOnNextBtn, trackClickOnRemindMeBtn, trackClickSkipOnboarding } =
    useInstapayOnboardTracking();

  const { updateInstapayOption } = useUpdateInstapayOnboarding();

  const onRemindMePress = () => {
    trackClickOnRemindMeBtn('Instapay Now Intro');
    updateInstapayOption({
      option: InstaPayOption.Instapay,
      successCallback: () => {
        navigation.navigate('dashboard');
      },
    });
  };

  const carouselData: Array<CarouselData> = [
    {
      image: {
        uri: Image.resolveAssetSource(images.instapayIntro1Experiment).uri,
        height: imgHeight,
        width: screenWidth,
        resizeMode: 'contain',
      },
      background: colors.decorativePrimarySurface,
      content: <FirstPage />,
      heading: '',
    },
    {
      background: colors.decorativePrimarySurface,
      content: <SecondPage />,
      heading: '',
    },
  ];

  const lastIndex = carouselData.length - 1;

  const renderActions = (currentIndex: number) => {
    const isLast = currentIndex === lastIndex;
    if (!isLast) {
      return (
        <BottomButtons
          style={{ flexGrow: 1 }}
          leftAction={Intl.formatMessage({ id: 'common.skip' })}
          rightAction={Intl.formatMessage({ id: 'common.next' })}
          onLeftPress={() => {
            trackClickSkipOnboarding('Instapay Now Intro');
            navigation.navigate('dashboard');
          }}
          onRightPress={() => {
            trackClickOnNextBtn('Instapay Now Intro');
            setSelectedIndex(currentIndex + 1);
          }}
        />
      );
    }

    return (
      <BottomButtons
        style={{ flexGrow: 1 }}
        leftAction={Intl.formatMessage({ id: 'common.back' })}
        rightAction={Intl.formatMessage({ id: 'common.remindMe' })}
        onLeftPress={() => {
          trackClickOnBackBtn('Instapay Now Intro');
          navigation.goBack();
        }}
        onRightPress={onRemindMePress}
      />
    );
  };

  return (
    <Box backgroundColor="decorativePrimarySurface" flex={1}>
      <CustomStatusBar barStyle="decorative" />
      <ScrollView
        style={{ backgroundColor: colors.decorativePrimary, flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
      >
        <Carousel
          selectedItemIndex={selectedIndex}
          onItemIndexChange={setSelectedIndex}
          testID="instapay-now-intro-carousel"
          accessibilityLabel="InstaPay Now Intro Carousel"
          style={{ flex: 1 }}
          items={carouselData}
          renderActions={renderActions}
        />
      </ScrollView>
    </Box>
  );
};
