import React, { useEffect, useMemo } from 'react';
import { Dimensions, Image } from 'react-native';
import { Button, Carousel, useTheme } from '@hero-design/rn';
import type { CarouselData } from '@hero-design/rn/types/components/Carousel/types';
import { useNavigation, useRoute } from '@react-navigation/native';
import images from '../../../../common/assets/images';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import { scale } from '../../../../common/utils/layout';
import { useCheckExistingCard } from '../../../spend-account/hooks/useCheckExistingCard';
import { usePaySplitSetupStore } from '../hooks/usePaySplitSetupStore';
import { useSeenPaySplitIntro } from '../hooks/useSeenPaySplitIntro';
import type { PaySplitRouteProp, PaySplitScreenNavigationProp } from '../navigation/navigationTypes';
import { PaySplitIntroEntryPoint } from '../navigation/navigationTypes';
import useStoreName from '../../../../common/hooks/useStoreName';

const isLastIndex = (currentIndex: number, lastIndex: number) => currentIndex === lastIndex;

const { width: screenWidth } = Dimensions.get('window');
const imgOriginalHeight = 300; // image height in figma design
const imgHeight = scale(imgOriginalHeight, 'height');

export const PaySplitIntroScreen = () => {
  const { colors, space } = useTheme();
  const storeName = useStoreName();

  const carouselData = useMemo(
    () =>
      [
        {
          image: {
            uri: Image.resolveAssetSource(images.paysplitIntro1).uri,
            width: screenWidth,
            height: imgHeight,
            resizeMode: 'contain',
          },
          heading: 'Control how you split your pay',
          body: 'Pay Split allows you to customise how much of your income gets automatically deposited into your Swag Spend account each time you get paid.',
          background: colors.decorativePrimarySurface,
        },
        {
          image: {
            uri: Image.resolveAssetSource(images.paysplitIntro2).uri,
            width: screenWidth,
            height: imgHeight,
            resizeMode: 'contain',
          },

          heading: 'Set and forget',
          body: 'Simply choose the amount you would like deposited into your Swag Spend account. This will then automatically land in your account each time you’re paid.',
          background: colors.decorativePrimarySurface,
        },
        {
          image: {
            uri: Image.resolveAssetSource(images.paysplitIntro3).uri,
            width: screenWidth,
            height: imgHeight,
            resizeMode: 'contain',
          },
          heading: 'Top up your account each pay',
          body: `Spend less time on admin by automatically topping up your account funds. Use them to spend smart in our ${storeName} Store, and save more on Cashback offers.`,
          background: colors.decorativePrimarySurface,
        },
      ] as CarouselData[],
    [colors]
  );

  const carouselDataLength = carouselData.length - 1;

  const navigation = useNavigation<PaySplitScreenNavigationProp<'PaySplitIntro'>>();
  const route = useRoute<PaySplitRouteProp<'PaySplitIntro'>>() || {};
  const { entryPoint } = route.params || {};

  const confirmText = entryPoint === PaySplitIntroEntryPoint.OrgListSCreenInfoBtn ? 'Close' : "Let's go";
  const backText = entryPoint === PaySplitIntroEntryPoint.OrgListSCreenInfoBtn ? '' : "I'm not ready";
  const setSkipPaySplit = usePaySplitSetupStore(state => state.setSkipPaySplit);
  const { markSeen } = useSeenPaySplitIntro();
  const { isCardLoading: isLoading, isCardNotFound, isServerDown } = useCheckExistingCard();

  useEffect(() => {
    if (isServerDown) {
      navigation.navigate('PaySplitError');
    }
  }, [isServerDown]);

  const markSeenIntro = () => {
    setSkipPaySplit();
    markSeen();
  };

  const onBack = () => {
    markSeenIntro();
    if (isCardNotFound) {
      // if card setup not done, we must be in the flow still.
      navigation.navigate('CardSetupStack', {
        screen: 'PinSetupStack',
        params: {
          screen: 'ChoosePin',
          params: {
            header: 'Card set-up',
            title: 'Choose a secure 4 digit PIN for your card.',
            repeatedPinScreen: {
              header: 'Card set-up',
              title: 'Repeat your PIN.',
              onPinVerifiedSuccess: newPin => {
                navigation.navigate('CardSetupStack', {
                  screen: 'Confirmation',
                  params: { pin: newPin, isInOnboardingFlow: true },
                });
              },
            },
          },
        },
      });
    } else {
      navigation.goBack();
    }
  };

  const onConfirm = () => {
    markSeenIntro();
    navigation.replace('PaySplitOrgList', {
      isOnboarding: entryPoint === PaySplitIntroEntryPoint.OnboardingSuccessNextBtn,
    });
  };

  return (
    <>
      <CustomStatusBar barStyle="decorative" />
      <Carousel
        testID="paysplit-intro"
        accessibilityLabel="PaySplit Intro"
        style={{ flex: 1 }}
        items={carouselData}
        renderActions={currentIndex => {
          if (!isLastIndex(currentIndex, carouselDataLength)) {
            return <></>;
          }

          return (
            <>
              <Button
                variant="text"
                testID="back-button"
                onPress={onBack}
                text={backText}
                disabled={isLoading}
                loading={isLoading}
              />
              <Button
                style={{ width: space.xxxlarge * 3 }}
                variant="filled"
                onPress={onConfirm}
                text={confirmText}
                disabled={isLoading}
                loading={isLoading}
              />
            </>
          );
        }}
      />
    </>
  );
};
