import React, { useEffect, useState } from 'react';
import { Dimensions, Image, PixelRatio, ScrollView } from 'react-native';
import { Box, Typography, useTheme, Carousel, Button } from '@hero-design/rn';
import type { CarouselData } from '@hero-design/rn/types/components/Carousel/types';
import { useNavigation } from '@react-navigation/native';
import images from '../../../common/assets/images';
import BulletLine from '../../../common/components/bullet-line';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import useAppName from '../../../common/hooks/useAppName';
import { scale, XXHDPI_PIXEL_RATIO } from '../../../common/utils/layout';
import { navigateToTopTabs } from '../../../navigation/rootNavigation';
import { useSeenSuperIntro } from '../hooks/useSeenSuperIntro';
import type { SuperScreenNavigationProp } from '../navigation/navigationTypes';

export const SuperIntroScreen = () => {
  const { colors, space } = useTheme();
  const { hasUserSeenThis: hasUserSeenSuperIntro, markSeen } = useSeenSuperIntro();
  const appName = useAppName();

  const [seenIntro, setSeenIntro] = useState(false);

  const navigation = useNavigation<SuperScreenNavigationProp<'SuperIntro'>>();

  const { width: screenWidth } = Dimensions.get('window');
  const imgOriginalHeight = 350;
  let imgHeight = scale(imgOriginalHeight, 'height');

  const isLowPixelDensityScreen = PixelRatio.get() < XXHDPI_PIXEL_RATIO;
  if (isLowPixelDensityScreen) {
    const fixRedundantHeaderHeight = 68; // height of header component in Carousel in HD which always renders => cause redundant empty space
    imgHeight -= fixRedundantHeaderHeight;
    // Reduce more height to be fit in small screen devices
    imgHeight -= 22;
  }

  useEffect(() => {
    const checkSeenIntro = async () => {
      const seenSuperIntro = await hasUserSeenSuperIntro();
      setSeenIntro(!!seenSuperIntro);
    };
    checkSeenIntro();
  }, []);

  const carouselData: CarouselData[] = [
    {
      image: {
        uri: Image.resolveAssetSource(images.superIntro1).uri,
        height: imgHeight,
        width: screenWidth,
        resizeMode: 'contain',
      },
      background: colors.decorativePrimarySurface,
      heading: '',
      content: (
        <>
          <Typography.Title level="h2" typeface="playful" style={{ marginBottom: space.medium }}>
            {`What's Super?`}
          </Typography.Title>
          <Typography.Body variant="regular" style={{ marginBottom: space.small }}>
            {`Superannuation or 'Super' is the money contributed by your employer over your working life for when you retire.`}
          </Typography.Body>
          <Typography.Body variant="regular">
            This money becomes available to you under specific conditions such as reaching retirement age or turning 65.
          </Typography.Body>
        </>
      ),
    },
    {
      image: {
        uri: Image.resolveAssetSource(images.superIntro2).uri,
        height: imgHeight,
        width: screenWidth,
        resizeMode: 'contain',
      },
      background: colors.decorativePrimarySurface,
      heading: '',
      content: (
        <>
          <Typography.Title level="h2" typeface="playful" style={{ marginBottom: space.medium }}>
            Super secures your future finances
          </Typography.Title>
          <Typography.Body variant="regular" style={{ marginBottom: space.small }}>
            Super is important as it allows you to accumulate savings for your retirement years.
          </Typography.Body>
          <Typography.Body variant="regular">
            It&apos;s one of the easiest perks of work! Your future self will be grateful.
          </Typography.Body>
        </>
      ),
    },
    {
      image: {
        uri: Image.resolveAssetSource(images.superIntro3).uri,
        height: imgHeight,
        width: screenWidth,
        resizeMode: 'contain',
      },
      background: colors.decorativePrimarySurface,
      heading: '',
      content: (
        <>
          <Typography.Title level="h2" typeface="playful">
            {`How can ${appName} help my super?`}
          </Typography.Title>
          <Box marginTop="medium">
            <BulletLine variant="regular" content="Connect your fund and manage your super, your way" />
            <BulletLine variant="regular" content="Easily share your super details with your employer" />
            <BulletLine variant="regular" content="Get direct access to helpful information and resources" />
          </Box>
        </>
      ),
    },
    {
      image: {
        uri: Image.resolveAssetSource(images.superIntro4).uri,
        height: imgHeight,
        width: screenWidth,
        resizeMode: 'contain',
      },
      background: colors.decorativePrimarySurface,
      heading: '',
      content: (
        <>
          <Typography.Title level="h2" typeface="playful" style={{ marginBottom: space.medium }}>
            {`Setting up Super in ${appName} is simple`}
          </Typography.Title>
          <Typography.Body variant="regular" style={{ marginBottom: space.small }}>
            Super is important for you, because the more you save, the more money you will have for your retirement.
          </Typography.Body>
          <Typography.Body variant="regular">
            Just confirm we’ve captured all the correct details then you’re ready to go!
          </Typography.Body>
        </>
      ),
    },
  ];

  const onIntroIgnore = () => {
    navigateToTopTabs('super-tab');
  };

  const onContinue = () => {
    navigation.navigate('ActiveMembership', { title: 'Superannuation' });
    markSeen();
  };

  const onIntroClose = () => {
    navigation.goBack();
    markSeen();
  };

  const itemLength = carouselData.length - 1;

  const renderActions = (currentIndex: number) => {
    const isLast = currentIndex === itemLength;
    if (!isLast) {
      return <></>;
    }

    if (seenIntro) {
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
        <Button style={{ marginHorizontal: space.xsmall }} onPress={onContinue} text="Let's go" />
      </>
    );
  };

  return (
    <ScrollView style={{ backgroundColor: colors.decorativePrimarySurface }}>
      <CustomStatusBar barStyle="decorative" />
      <Carousel
        testID="super-intro"
        accessibilityLabel="Super Intro"
        style={{ flex: 1 }}
        items={carouselData}
        renderActions={renderActions}
      />
    </ScrollView>
  );
};
