import React, { useRef } from 'react';
import { Dimensions, Image } from 'react-native';
import { Box, Button, Carousel, useTheme } from '@hero-design/rn';
import type { CarouselData } from '@hero-design/rn/types/components/Carousel/types';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import images from '../../../../../common/assets/images';
import type { BottomSheetRef } from '../../../../../common/components/bottom-sheet/BottomSheet';
import { CustomStatusBar } from '../../../../../common/components/status-bar/CustomStatusBar';
import { useMixpanel } from '../../../../../common/hooks/useMixpanel';
import { queryClient } from '../../../../../common/libs/queryClient';
import { EventTrackingCategory } from '../../../../../common/stores/useSessionStore';
import { mockCashbackIntroductionContentV2 } from '../../../../../graphql/handlers/custom-mock/cashbackIntroductionContent';
import { useCashbackOnboardStatusQuery, useCashbackOnboardUserMutation } from '../../../../../new-graphql/generated';
import { CashbackTermsAndConditionsBottomSheet } from '../../components/CashbackTermsAndConditionsBottomSheet';
import { CASHBACK_MODULE, CLICK_LET_GO, SWIPE_LEFT, SWIPE_RIGHT } from '../constants/mixpanel';
import type {
  CardLinkOffersNavigationProp,
  CardLinkOffersRouteProp,
  IntroductionContent,
} from '../navigation/navigationType';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const imgHeight = (280 * screenHeight) / 844;

export const CashbackIntroductionScreen = () => {
  const { colors, space } = useTheme();
  const prevIndex = useRef(0);
  const navigation = useNavigation<CardLinkOffersNavigationProp<'CashbackIntroduction'>>();
  const route = useRoute<CardLinkOffersRouteProp<'CashbackIntroduction'>>();
  const introduction = route?.params?.introduction ?? mockCashbackIntroductionContentV2;
  const { onDismiss = () => {}, onSuccess = () => {}, shouldTriggerAfterCarousel } = route?.params?.tncParams ?? {};
  const onNotReady = route?.params?.onPressNotReady;
  const data: Array<IntroductionContent> = [introduction.step1, introduction.step2, introduction.step3];
  const { mutateAsync: updateOnboardCLOStatus } = useCashbackOnboardUserMutation();
  const { eventTracking } = useMixpanel();
  const tncBtsRef = useRef<BottomSheetRef>(null);
  const { bottom: bottomInset, top: topInset } = useSafeAreaInsets();

  const completeCashbackOnboarding = async () => {
    eventTracking({
      event: CLICK_LET_GO,
      categoryName: EventTrackingCategory.USER_ACTION,
      metaData: {
        module: CASHBACK_MODULE,
      },
    });
    await updateOnboardCLOStatus({});
    queryClient.invalidateQueries(useCashbackOnboardStatusQuery.getKey());

    if (shouldTriggerAfterCarousel) {
      tncBtsRef.current?.open();
    } else {
      navigation.goBack();
    }
  };

  const mapIllustration = (idx: number) => {
    switch (idx) {
      case 0:
        return images.cashbackIntroduction1;
      case 1:
        return images.cashbackIntroduction2;
      case 2:
        return images.cashbackIntroduction3;
      default:
        return undefined;
    }
  };

  const carouselData: Array<CarouselData> = data.map((e, idx) => ({
    image: {
      uri: Image.resolveAssetSource(mapIllustration(idx)).uri,
      height: imgHeight,
      width: screenWidth,
    },
    background: colors.decorativePrimarySurface,
    heading: e.heading,
    body: e.verbiage,
  }));

  const lastIndex = carouselData.length - 1;
  const bottomGapWithoutInset = bottomInset === 0 ? -topInset - space.medium : 0;

  const renderActions = (currentIndex: number) => {
    const eventTrackingName = prevIndex.current > currentIndex ? SWIPE_LEFT : SWIPE_RIGHT;
    prevIndex.current = currentIndex;

    eventTracking({
      event: eventTrackingName,
      categoryName: EventTrackingCategory.USER_ACTION,
      metaData: {
        module: CASHBACK_MODULE,
        onboardingName: `cashback_${currentIndex}Screen`,
      },
    });
    const isLast = currentIndex === lastIndex;
    if (!isLast) {
      return <></>;
    }

    return (
      <Box style={{ marginTop: bottomGapWithoutInset }} flexDirection="row" justifyContent="space-between" flex={1}>
        <Button variant="text" onPress={onNotReady ?? navigation.goBack} text="I’m not ready" />
        <Button onPress={completeCashbackOnboarding} testID="cashback-onboarding-letgo" text="Let's go!" />
      </Box>
    );
  };

  return (
    <>
      <CustomStatusBar barStyle="decorative" />
      <Carousel
        testID="cashback-onboarding-intro"
        style={{ flex: 1 }}
        items={carouselData}
        renderActions={renderActions}
      />
      <CashbackTermsAndConditionsBottomSheet btsRef={tncBtsRef} onSuccess={onSuccess} onDismiss={onDismiss} />
    </>
  );
};
