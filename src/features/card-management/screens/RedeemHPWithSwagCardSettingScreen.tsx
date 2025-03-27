import type { Dispatch, SetStateAction } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import { Box, Button, Typography, useTheme } from '@hero-design/rn';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { GeneralError } from '../../../common/components/error';
import { Page } from '../../../common/components/layout/page';
import { OverlayLoadingScreen } from '../../../common/components/spinner';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import { useGetMinSnapPoint } from '../../../common/hooks/useGetMinSnapPoint';
import { useSpendHPOnSwagCardVisiblity } from '../../../common/hooks/useHeroPointsVisibility';
import { useIsWalletSetupComplete } from '../../../common/hooks/useIsWalletSetupComplete';
import { useMixpanel } from '../../../common/hooks/useMixpanel';
import { queryClient } from '../../../common/libs/queryClient';
import { useInAppBrowser } from '../../../common/shared-hooks/useInAppBrowser';
import { useToast } from '../../../common/shared-hooks/useToast';
import { switchPillar } from '../../../common/stores/useMiniAppSwitcherStore';
import { EventTrackingCategory, useSessionStore } from '../../../common/stores/useSessionStore';
import { navigateToTopTabs } from '../../../navigation/rootNavigation';
import {
  useGetHeroPointsPaymentPreferencesQuery,
  useGetPayWithHpCarouselSeenQuery,
  useUpdateHeroPointsPaymentPreferencesMutation,
  type GetHeroPointsPaymentPreferencesQuery,
} from '../../../new-graphql/generated';
import { useIntl } from '../../../providers/LocalisationProvider/hooks/useIntl';
import { FeaturedOffersDrawer } from '../../benefits/cash-back/containers/FeaturedOffersDrawer';
import { SettingToggle } from '../components/SettingToggle';
import {
  MODULE,
  HERO_POINTS_FAQ_URL,
  VISIT_REDEEM_HP_WITH_SWAG_CARD_SETTING_SCREEN,
  REBRAND_HERO_POINTS_FAQ_URL,
} from '../constants';
import type { CardManagementScreenRouteProp, CardManagementScreenNavigationProp } from '../navigation/navigationType';

const RedeemHPWithSwagCardSettingScreen = () => {
  const Intl = useIntl();
  const route = useRoute<CardManagementScreenRouteProp<'RedeemHPWithSwagCardSetting'>>();
  const { viaDeepLink } = route.params ?? { viaDeepLink: false };
  const { maxScrollPercentage, minSnapPoint, onLayoutEndPosition, onLayoutScreenHeight } = useGetMinSnapPoint();
  const { shadows, space } = useTheme();
  const navigation = useNavigation<CardManagementScreenNavigationProp<'RedeemHPWithSwagCardSetting'>>();
  const {
    data: paymentPreferences,
    isError: isFetchingSettingError,
    isFetched: isSettingFetched,
  } = useGetHeroPointsPaymentPreferencesQuery();
  const { swagTextAndImageRebrandEnabled } = useSessionStore();

  const { mutateAsync: updatePaymentPreferencesSettingAsync } = useUpdateHeroPointsPaymentPreferencesMutation();
  const haveOptimiseUpdate = useRef(false);
  const { screenTracking } = useMixpanel();
  const { openUrl } = useInAppBrowser();

  const { isFetched: isWalletFetched, isWalletSetupComplete } = useIsWalletSetupComplete();
  const { data: carousel, isFetched: isSeenIntroStatusFetched } = useGetPayWithHpCarouselSeenQuery();
  const spendHPOnSwagCardPermission = useSpendHPOnSwagCardVisiblity();

  const isLoading = !isSettingFetched || !isWalletFetched || !isSeenIntroStatusFetched;

  // toggle state
  const payWithHPOnSwagCardCache = paymentPreferences?.me?.heroPoints?.paymentPreferences?.payWithHPOnSwagCard ?? false;

  const [payWithHPOnSwagCard, setPayWithHPOnSwagCard] = useState(payWithHPOnSwagCardCache ?? false);

  const payWithHPOnSwagCardLabel = `redeem hero points with Swag card ${payWithHPOnSwagCard ? 'enabled' : 'disabled'}`;

  const Toast = useToast();

  const onOpenCarousel = () => {
    navigation.navigate('CardManagementStack', { screen: 'RedeemHPWithSwagCardIntro', params: { isSeenIntro: true } });
  };

  useFocusEffect(
    React.useCallback(() => {
      // Check if doesn't have wallet, navigate to onboarding flow (mostly for deep link)
      if (isWalletFetched && !isWalletSetupComplete) {
        navigation.popToTop();
        switchPillar({ to: { pillarId: 'SwagApp' } });
      }

      // Check if don't have permission, navigate to dashboard
      if (!spendHPOnSwagCardPermission) {
        navigateToTopTabs('card-tab');
      }

      // Check if not see intro, navigate to intro screen
      const isSeen = carousel?.me?.heroPoints?.payWithHPCarouselSeen;
      if (isSeenIntroStatusFetched && !isSeen) {
        navigation.replace('CardManagementStack', {
          screen: 'RedeemHPWithSwagCardIntro',
          params: { isSeenIntro: false },
        });
      }
    }, [
      spendHPOnSwagCardPermission,
      isWalletFetched,
      isWalletSetupComplete,
      carousel,
      navigation,
      isSeenIntroStatusFetched,
    ])
  );

  useEffect(() => {
    if (isSettingFetched) {
      screenTracking({
        event: VISIT_REDEEM_HP_WITH_SWAG_CARD_SETTING_SCREEN,
        categoryName: EventTrackingCategory.USER_ACTION,
        metaData: {
          module: MODULE,
          hp_with_swag_card_enabled: payWithHPOnSwagCard,
          via_deep_link: viaDeepLink,
        },
      });
    }
  }, [viaDeepLink, isSettingFetched, payWithHPOnSwagCard, screenTracking]);

  useEffect(() => {
    const metaData = paymentPreferences?.me?.heroPoints?.paymentPreferences;
    if (metaData && !haveOptimiseUpdate.current) {
      // prevent this update when having haveOptimiseUpdate
      haveOptimiseUpdate.current = false;
      const { payWithHPOnSwagCard: payWithHPOnSwagCardData } = metaData;
      setPayWithHPOnSwagCard(payWithHPOnSwagCardData ?? false);
    }
  }, [paymentPreferences]);

  const optimiseUpdate = async (value: boolean) => {
    haveOptimiseUpdate.current = true;
    await queryClient.cancelQueries([useGetHeroPointsPaymentPreferencesQuery.getKey()]);
    queryClient.setQueryData(
      [useGetHeroPointsPaymentPreferencesQuery.getKey()],
      (old: GetHeroPointsPaymentPreferencesQuery | undefined): GetHeroPointsPaymentPreferencesQuery => ({
        ...old,
        me: {
          heroPoints: {
            paymentPreferences: {
              ...old?.me?.heroPoints?.paymentPreferences,
              payWithHPOnSwagCard: value,
            },
          },
        },
      })
    );
  };

  const updatePaymentSetting = async (
    oldVal: boolean,
    newVal: boolean,
    setStateAction: Dispatch<SetStateAction<boolean>>
  ) => {
    setStateAction(newVal);
    try {
      await updatePaymentPreferencesSettingAsync({
        payWithHPOnSwagCard: newVal,
      }).then(result => {
        optimiseUpdate(result.heroPoints?.paymentPreferences?.payWithHPOnSwagCard ?? oldVal);
      });
    } catch {
      // failed, return to original value
      Toast.show({
        content: 'Sorry, we could not process your request. Try again later.',
      });
      setStateAction(oldVal);
    }
  };

  const onToggleChanged = (isOn: boolean) => {
    updatePaymentSetting(payWithHPOnSwagCard, isOn, setPayWithHPOnSwagCard);
  };

  const visitFAQs = () => {
    openUrl(swagTextAndImageRebrandEnabled ? REBRAND_HERO_POINTS_FAQ_URL : HERO_POINTS_FAQ_URL);
  };

  if (isFetchingSettingError) {
    return <GeneralError themeName="eBens" onCtaPress={navigation.goBack} ctaText="Go back" />;
  }

  if (isLoading) {
    return <OverlayLoadingScreen />;
  }

  return (
    <Box flex={1} onLayout={onLayoutScreenHeight} backgroundColor="neutralGlobalSurface">
      <ScrollView style={{ maxHeight: `${maxScrollPercentage}%` }}>
        <CustomStatusBar />
        <Page.TopBar
          onBack={navigation.goBack}
          title={Intl.formatMessage({ id: 'heroPoints.redeem' })}
          onRightPress={onOpenCarousel}
          iconRight="circle-info"
        />
        <Page>
          <Page.Title>{Intl.formatMessage({ id: 'heroPoints.redeem.onEverydayPurchases' })}</Page.Title>
          <Page.Body>
            <Box
              padding="medium"
              marginTop="small"
              backgroundColor="defaultGlobalSurface"
              borderRadius="medium"
              style={[shadows.default]}
            >
              <SettingToggle
                variant="regular"
                onChange={onToggleChanged}
                label={Intl.formatMessage({ id: 'heroPoints.redeem.withSwagDebitCard' })}
                value={payWithHPOnSwagCard}
                accessibilityLabel={payWithHPOnSwagCardLabel}
              />
            </Box>
            <Typography.Body variant="regular" style={{ alignSelf: 'center', marginTop: space.large }}>
              {Intl.formatMessage({ id: 'heroPoints.knowMore' })}
            </Typography.Body>
            <Button variant="text" onPress={visitFAQs} text="Visit FAQs" />
          </Page.Body>
        </Page>
        <Box
          // fake last element
          style={{ height: space.small, width: space.small }}
          onLayout={onLayoutEndPosition}
        />
      </ScrollView>
      <FeaturedOffersDrawer snapPoints={[minSnapPoint, '100%']} />
    </Box>
  );
};

export { RedeemHPWithSwagCardSettingScreen };
