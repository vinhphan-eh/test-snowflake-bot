import React from 'react';
import { Image, ScrollView } from 'react-native';
import { Box, useTheme, Carousel, Button } from '@hero-design/rn';
import type { CarouselData } from '@hero-design/rn/types/components/Carousel/types';
import { useNavigation, useRoute } from '@react-navigation/native';
import images from '../../../../common/assets/images';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import { AppDataStorageKey } from '../../../../common/libs/storage/appDataStorage';
import { useAppStorageToggle } from '../../../../common/shared-hooks/useAppStorageToggle';
import { useScaleImageHeight } from '../../../../common/shared-hooks/useScaleImageHeight';
import type { RootStackNavigationProp } from '../../../../navigation/navigationTypes';
import { navigateToTopTabs } from '../../../../navigation/rootNavigation';
import { SALARY_SACRIFICE_TITLE } from '../constants';
import type { SalarySacrificeScreenRouteProp } from '../navigation/navigationTypes';

export const PureSalarySacrificeIntroScreen = ({
  isSeen,
  onIntroClose,
  onIntroIgnore,
  selectedItemIndex = 0,
}: {
  isSeen: boolean;
  selectedItemIndex?: number;
  onIntroIgnore: () => void;
  onIntroClose: () => void;
}) => {
  const { colors, space } = useTheme();
  const { imageHeight, screenWidth } = useScaleImageHeight({
    imgOriginalHeight: 383, // from figma
    heightReductionForLowPixelDensity: 55,
  });

  const carouselData: CarouselData[] = [
    {
      image: {
        uri: Image.resolveAssetSource(images.salarySacrificeIntro1).uri,
        width: screenWidth,
        height: imageHeight,
        resizeMode: 'contain',
      },
      heading: 'What is salary sacrifice?',
      background: colors.decorativePrimarySurface,
      body: 'Salary sacrificing is one of the benefits of superannuation. It’s an agreement between you and your employer that they will contribute some of your income to your super before it is taxed.',
    },
    {
      image: {
        uri: Image.resolveAssetSource(images.salarySacrificeIntro2).uri,
        width: screenWidth,
        height: imageHeight,
        resizeMode: 'contain',
      },
      heading: 'Why should I contribute?',
      background: colors.decorativePrimarySurface,
      body: 'Contributions made through salary sacrifice are taxed at 15% which for most people is lower than their usual tax rate. You benefit because you pay less tax while boosting your retirement savings.',
    },
    {
      image: {
        uri: Image.resolveAssetSource(images.salarySacrificeIntro3).uri,
        width: screenWidth,
        height: imageHeight,
        resizeMode: 'contain',
      },
      heading: 'How does it work?',
      background: colors.decorativePrimarySurface,
      body: 'Requesting salary sacrifice is easy. Just tell us how much you want to contribute and when to start and stop. The details will be sent to your payroll admin and they’ll get you set up.',
    },
  ];

  return (
    <ScrollView style={{ backgroundColor: colors.decorativePrimarySurface }}>
      <CustomStatusBar barStyle="decorative" />
      <Carousel
        testID="salary-sacrifice-intro"
        accessibilityLabel="Salary Sacrifice Intro"
        style={{ flex: 1 }}
        items={carouselData}
        selectedItemIndex={selectedItemIndex}
        renderActions={(currentIndex: number) => {
          if (!(currentIndex === carouselData.length - 1)) {
            // eslint-disable-next-line react/jsx-no-useless-fragment
            return <></>;
          }

          if (isSeen) {
            return (
              <>
                <Box />
                <Button
                  style={{ marginHorizontal: space.xsmall, alignSelf: 'flex-start' }}
                  onPress={onIntroClose}
                  text="Close"
                />
              </>
            );
          }

          return (
            <>
              <Button variant="text" onPress={onIntroIgnore} text="I'm not ready" />
              <Button style={{ marginHorizontal: space.xsmall }} onPress={onIntroClose} text="Request now" />
            </>
          );
        }}
      />
    </ScrollView>
  );
};

export const SalarySacrificeIntroScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  const { isToggle } = useAppStorageToggle(AppDataStorageKey.SalarySacrificeIntroSeen);
  const route = useRoute<SalarySacrificeScreenRouteProp<'SalarySacrificeIntro'>>();
  const trackingAttributes = route.params?.trackingAttributes;

  const onIntroIgnore = () => {
    navigateToTopTabs('super-tab');
  };

  const onIntroClose = () => {
    navigation.navigate('SuperStack', {
      screen: 'SalarySacrificeStack',
      params: {
        screen: 'ActiveEmployer',
        params: {
          title: SALARY_SACRIFICE_TITLE,
          trackingAttributes,
        },
      },
    });
  };

  return <PureSalarySacrificeIntroScreen isSeen={isToggle} onIntroIgnore={onIntroIgnore} onIntroClose={onIntroClose} />;
};
