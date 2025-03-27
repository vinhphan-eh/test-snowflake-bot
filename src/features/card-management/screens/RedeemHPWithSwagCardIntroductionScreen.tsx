import React, { useEffect } from 'react';
import { Dimensions, Image, PixelRatio, ScrollView } from 'react-native';
import { Box, Button, Carousel, Typography, useTheme } from '@hero-design/rn';
import type { CarouselData } from '@hero-design/rn/types/components/Carousel/types';
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import images from '../../../common/assets/images';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import { useHeroPointsVisibility } from '../../../common/hooks/useHeroPointsVisibility';
import { queryClient } from '../../../common/libs/queryClient';
import { XXHDPI_PIXEL_RATIO, scale } from '../../../common/utils/layout';
import {
  useGetPayWithHpCarouselSeenQuery,
  useUpdatePayWithHpCarouselSeenMutation,
} from '../../../new-graphql/generated';
import type { HeroPointsScreenRouteProp } from '../../hero-points/navigation/navigationTypes';
import type { CardManagementScreenNavigationProp, CardManagementScreenRouteProp } from '../navigation/navigationType';

const { width: screenWidth } = Dimensions.get('window');

let imgHeight = scale(360, 'height');
const isLowPixelDensityScreen = PixelRatio.get() < XXHDPI_PIXEL_RATIO;
if (isLowPixelDensityScreen) {
  const fixRedundantHeaderHeight = 40; // height of header component in Carousel in HD which always renders => cause redundant empty space
  imgHeight -= fixRedundantHeaderHeight;
  // Reduce more height to be fit in small screen devices
  imgHeight -= 22;
}

export const RedeemHPWithSwagCardIntroductionScreen = () => {
  const { colors, sizes, space } = useTheme();
  const navigation = useNavigation<CardManagementScreenNavigationProp<'RedeemHPWithSwagCardIntro'>>();
  const { params } = useRoute<CardManagementScreenRouteProp<'RedeemHPWithSwagCardIntro'>>();
  const { params: heroPointsParam } = useRoute<HeroPointsScreenRouteProp<'heroPoints/redeemHPWithSwagIntroduction'>>();
  const isSeenIntro = params?.isSeenIntro || false;
  const { mutateAsync: seenPayWithHPCarousel } = useUpdatePayWithHpCarouselSeenMutation();
  const isHeroPointsEnabled = useHeroPointsVisibility();

  useEffect(() => {
    if (!isSeenIntro) {
      seenPayWithHPCarousel(
        {},
        {
          onSuccess: () => {
            queryClient.invalidateQueries(useGetPayWithHpCarouselSeenQuery.getKey());
          },
        }
      );
    }
  }, [isSeenIntro, seenPayWithHPCarousel]);

  const carouselData: CarouselData[] = [
    {
      image: {
        uri: Image.resolveAssetSource(images.payWithHDOnSwagCardCarousel1).uri,
        height: imgHeight,
        width: screenWidth,
        resizeMode: 'contain',
      },
      background: colors.decorativePrimarySurface,
      heading: '',
      content: (
        <Box>
          <Typography.Title level="h2" typeface="playful" style={{ paddingBottom: space.smallMedium }}>
            Your Hero Dollars are now Hero Points
          </Typography.Title>
          <Typography.Body variant="regular">
            Introducing Hero Points – the new way to get rewarded and recognised. We&apos;ve transferred your Hero
            Dollar balance into Hero Points. You may see a compensating transaction (either a top up or a withdrawal) in
            your transaction history. This ensures your previous and new balances are the same value.
          </Typography.Body>
        </Box>
      ),
    },
    {
      image: {
        uri: Image.resolveAssetSource(images.payWithHDOnSwagCardCarousel4).uri,
        height: imgHeight,
        width: screenWidth,
        resizeMode: 'contain',
      },
      background: colors.decorativePrimarySurface,
      heading: '',
      content: (
        <>
          <Typography.Title level="h2" typeface="playful" style={{ marginBottom: space.smallMedium }}>
            More ways to use your Hero Points
          </Typography.Title>
          <Typography.Body variant="regular">
            You can automatically redeem your Hero Points when you shop using your Swag Visa Debit card. Once a card
            transaction is settled (typically within 48 hours), your points will be redeemed and you’ll be reimbursed
            for the transaction. You could grab a coffee with 100 points!
          </Typography.Body>
        </>
      ),
    },
    {
      image: {
        uri: Image.resolveAssetSource(images.payWithHDOnSwagCardCarousel3).uri,
        height: imgHeight,
        width: screenWidth,
        resizeMode: 'contain',
      },
      background: colors.decorativePrimarySurface,
      heading: '',
      content: (
        <>
          <Typography.Title level="h2" typeface="playful" style={{ marginBottom: space.smallMedium }}>
            Ready to redeem?
          </Typography.Title>
          <Typography.Body variant="regular">Here’s how to redeem your Hero Points:</Typography.Body>
          <Typography.Body variant="regular" style={{ marginTop: space.small }}>
            {`1. Open a Swag Spend account\n2. Activate 'Redeem Hero Points with your Swag Visa Debit card' via the Points tab or Card tab\n3. Pay with your Swag Visa Debit card`}
          </Typography.Body>
        </>
      ),
    },
  ];

  const onIntroClose = () => {
    if (heroPointsParam?.isHeroPointsDashboard) {
      heroPointsParam?.onBack();
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'RedeemHPWithSwagCardSetting',
            },
          ],
        })
      );
    }
  };

  const lastIndex = carouselData.length - 1;

  const renderActions = (currentIndex: number) => {
    const isLast = currentIndex === lastIndex;
    if (!isLast) {
      return <></>;
    }

    if (isSeenIntro || heroPointsParam?.isHeroPointsDashboard) {
      return (
        <Box
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            marginTop: isHeroPointsEnabled ? -space['5xlarge'] : 0,
            justifyContent: 'space-between',
          }}
        >
          <Box />
          <Button onPress={onIntroClose} testID="pay-with-hd-close" text="Close" style={{ width: sizes['14xlarge'] }} />
        </Box>
      );
    }

    return (
      <Box
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          marginTop: isHeroPointsEnabled ? -space['5xlarge'] : 0,
          justifyContent: 'space-between',
        }}
      >
        <Button variant="text" onPress={navigation.goBack} text="Not now" />
        <Button
          style={{ width: sizes['18xlarge'] }}
          onPress={onIntroClose}
          testID="pay-with-hd-letgo"
          text="Let's go!"
        />
      </Box>
    );
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.decorativePrimarySurface }}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <CustomStatusBar barStyle="decorative" />
      <Carousel
        testID="redeem-hero-points-with-swag-card-intro"
        accessibilityLabel="Hero Points on Swag Card Intro"
        style={{ flex: 1 }}
        items={carouselData}
        renderActions={renderActions}
      />
    </ScrollView>
  );
};
