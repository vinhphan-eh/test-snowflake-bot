import React from 'react';
import { Image, ScrollView } from 'react-native';
import { Box, Button, Carousel, Typography, useTheme } from '@hero-design/rn';
import type { CarouselData } from '@hero-design/rn/types/components/Carousel/types';
import { useNavigation, useRoute } from '@react-navigation/native';
import images from '../../../../common/assets/images';
import BulletLine from '../../../../common/components/bullet-line';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import { useScaleImageHeight } from '../../../../common/shared-hooks/useScaleImageHeight';
import { useIntl } from '../../../../providers/LocalisationProvider';
import {
  InstaPayIntroSource,
  type InstaPayRouteProp,
  type InstaPayScreenNavigationProp,
} from '../navigation/navigationTypes';

export const InstaPayIntroV2Screen = () => {
  const navigation = useNavigation<InstaPayScreenNavigationProp<'InstaPayIntroV2'>>();
  const route = useRoute<InstaPayRouteProp<'InstaPayIntroV2'>>();
  const { source } = route.params;
  const { colors, space } = useTheme();
  const { formatMessage } = useIntl();

  const { imageHeight, screenWidth } = useScaleImageHeight({
    imgOriginalHeight: 328, // from figma
  });

  const carouselData: CarouselData[] = [
    {
      image: {
        uri: Image.resolveAssetSource(images.instapayIntro).uri,
        height: imageHeight,
        width: screenWidth,
        resizeMode: 'contain',
      },
      background: colors.decorativePrimarySurface,
      content: (
        <Box>
          <Typography.Title level="h2" typeface="playful">
            {formatMessage({ id: 'instapay.introScreen.carousel.heading' })}
          </Typography.Title>
          <Typography.Body style={{ marginTop: space.small }}>
            {formatMessage({ id: 'instapay.introScreen.carousel.body' })}
          </Typography.Body>
          <Box marginTop="smallMedium">
            <BulletLine variant="regular" content={formatMessage({ id: 'instapay.introScreen.carousel.bullet_1' })} />
            <BulletLine variant="regular" content={formatMessage({ id: 'instapay.introScreen.carousel.bullet_2' })} />
            <BulletLine variant="regular" content={formatMessage({ id: 'instapay.introScreen.carousel.bullet_3' })} />
          </Box>
        </Box>
      ),
    },
  ];

  const onIntroClose = () => {
    switch (source) {
      case InstaPayIntroSource.WITHDRAW_RECURRING:
        navigation.goBack();
        break;
      default:
        navigation.replace('InstaPayNowReceivingAccount');
        break;
    }
  };

  const itemLength = carouselData.length - 1;

  const renderActions = (currentIndex: number) => {
    const isLast = currentIndex === itemLength;
    if (!isLast) {
      return <></>;
    }

    return (
      <>
        <Box />
        <Button
          style={{ width: space.xxxlarge * 3, alignSelf: 'flex-start' }}
          onPress={onIntroClose}
          text={formatMessage({ id: 'common.close' })}
        />
      </>
    );
  };

  return (
    <ScrollView style={{ backgroundColor: colors.decorativePrimarySurface }} bounces={false}>
      <CustomStatusBar barStyle="decorative" />
      <Carousel
        testID="instapay-intro"
        accessibilityLabel="InstaPay Intro"
        style={{ flex: 1, marginHorizontal: space.small }}
        items={carouselData}
        renderActions={renderActions}
      />
    </ScrollView>
  );
};
