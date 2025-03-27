import React, { useMemo, useRef, useState } from 'react';
import { Image, ScrollView } from 'react-native';
import { Box, Button, List, Spinner, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import images from '../../../../../common/assets/images';
import type { BottomSheetRef } from '../../../../../common/components/bottom-sheet/BottomSheet';
import { CustomBottomSheetView } from '../../../../../common/components/bottom-sheet/CustomBottomSheetView';
import { GeneralError } from '../../../../../common/components/error';
import { Page } from '../../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../../common/components/status-bar/CustomStatusBar';
import { useMixpanel } from '../../../../../common/hooks/useMixpanel';
import {
  WalletOnboardingConsumerType,
  useWalletOnboardingConsumer,
} from '../../../../../common/hooks/useWalletOnboardingConsumer';
import { queryClient } from '../../../../../common/libs/queryClient';
import { useInAppBrowser } from '../../../../../common/shared-hooks/useInAppBrowser';
import { useToast } from '../../../../../common/shared-hooks/useToast';
import { EventTrackingCategory } from '../../../../../common/stores/useSessionStore';
import { formatStringToDate } from '../../../../../common/utils/date';
import { useCashbackDeleteCardMutation } from '../../../../../graphql/generated';
import type { RootStackNavigationProp } from '../../../../../navigation/navigationTypes';
import {
  useCashbackLinkedCardsQuery,
  useGetWalletStatusQuery,
  type CashbackCard,
  type CashbackLinkedCardsQuery,
} from '../../../../../new-graphql/generated';
import { useRegionLocalisation } from '../../../../../providers/LocalisationProvider';
import { useConditionalNavigateOnboardingFlow } from '../../../../spend-account/hooks/useConditionalNavigateOnboardingFlow';
import { mapCardIconSource } from '../../../common/utils/card';
import { HeroWalletStatusCard } from '../components/HeroWalletStatusCard';
import { EMPLOYMENT_HERO_PROVIDER, MAXIMUM_OTHER_CARDS_TO_ADD } from '../constants/autoEnrol';
import { CASHBACK_MODULE, CLICK_ADD_CARD, CLICK_REMOVE_CARD_ICON } from '../constants/mixpanel';
import { useCheckAutoEnrollment } from '../hooks/useCheckAutoEnrollment';

const ISODateFormat = 'YYYY-MM-DDTHH:mm:ss';

export const AddCardCashbackDashboardScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  const insets = useSafeAreaInsets();
  const { colors, space } = useTheme();
  const { data: userData, isError: isErrorUserData, isLoading: isLoadingUserData } = useGetWalletStatusQuery();
  const { isLoading: isLoadingOnboarding, nextScreenNavigateParams } = useConditionalNavigateOnboardingFlow()();
  const {
    data: linkedCardsData,
    isError: isErrorCashbackLinkedCards,
    isLoading: isLoadingCashbackLinkedCards,
  } = useCashbackLinkedCardsQuery();
  const cardList = linkedCardsData?.me?.cashback?.linkedCards?.cards;
  const { isLoading: isLoadingDeleteCard, mutateAsync } = useCashbackDeleteCardMutation();
  const { isPreparingData: isPreparingDataAutoEnrol, triggerAutoEnrol } = useCheckAutoEnrollment({
    shouldDeregisterOldCard: false,
    runInBackground: false,
  });
  const { setConsumer } = useWalletOnboardingConsumer();

  const otherCardList = useMemo(() => cardList?.filter(e => e.provider !== EMPLOYMENT_HERO_PROVIDER) ?? [], [cardList]);
  const heroWalletCard = useMemo(() => cardList?.find(e => e.provider === EMPLOYMENT_HERO_PROVIDER), [cardList]);

  const otherCardCount = otherCardList.length;
  const bsRef = useRef<BottomSheetRef>(null);
  const toDeleteCard = useRef(0);
  const Toast = useToast();
  const [isLoadingManualHeroWalletEnrolment, setIsLoadingManualHeroWalletEnrolment] = useState(false);
  const isLoading =
    isLoadingOnboarding || isLoadingCashbackLinkedCards || isLoadingUserData || isLoadingManualHeroWalletEnrolment;
  const isError = isErrorUserData || isErrorCashbackLinkedCards;
  const { eventTracking } = useMixpanel();
  const { formatMessage } = useRegionLocalisation();
  const { openUrl } = useInAppBrowser();

  const goToHeroWalletOnboarding = () => {
    setConsumer(WalletOnboardingConsumerType.Cashback);
    if (nextScreenNavigateParams) {
      navigation.navigate(...nextScreenNavigateParams);
    } else {
      navigation.navigate('OnboardingStack', { screen: 'Dashboard' });
    }
  };

  const goToHelpCenter = () => {
    const helpCentreUrl = formatMessage({ id: 'benefits.faq.url' });
    openUrl(helpCentreUrl);
  };

  const onEnrolCard = () => {
    eventTracking({
      event: CLICK_ADD_CARD,
      categoryName: EventTrackingCategory.USER_ACTION,
      metaData: {
        module: CASHBACK_MODULE,
      },
    });
    navigation.navigate('BenefitsStack', {
      screen: 'CardLinkOffersStack',
      params: { screen: 'EnrolCardDetails', params: { haveHeroWallet: heroWalletCard !== undefined } },
    });
  };

  const openRemoveSheet = (id: number) => {
    eventTracking({
      event: CLICK_REMOVE_CARD_ICON,
      categoryName: EventTrackingCategory.USER_ACTION,
      metaData: {
        module: CASHBACK_MODULE,
      },
    });
    bsRef.current?.open();
    toDeleteCard.current = id;
  };
  const dismissRemoveSheet = () => {
    bsRef.current?.close();
  };

  const onRemoveCard = async () => {
    dismissRemoveSheet();
    try {
      await mutateAsync({ deleteCard: { cardId: toDeleteCard.current } });
      queryClient.setQueryData(
        useCashbackLinkedCardsQuery.getKey(),
        (old: CashbackLinkedCardsQuery | undefined): CashbackLinkedCardsQuery => {
          // CashbackLinkedCardsQuery object is nested, so we use deep clone it to
          // make sure new object is created and react-query can detect the change
          const newData: CashbackLinkedCardsQuery = JSON.parse(JSON.stringify(old));
          if (newData.me?.cashback?.linkedCards?.cards) {
            newData.me.cashback.linkedCards.cards =
              newData.me?.cashback?.linkedCards?.cards?.filter(
                (cashbackCard: CashbackCard) => cashbackCard.id !== toDeleteCard.current
              ) || [];
          }
          return newData;
        }
      );
      toDeleteCard.current = 0;
    } catch (_) {
      Toast.show({
        content: "Sorry, your card wasn't removed. Please try again later.",
      });
    }
  };

  const onManualHeroWalletEnrolment = async () => {
    if (!isPreparingDataAutoEnrol) {
      setIsLoadingManualHeroWalletEnrolment(true);
      try {
        await triggerAutoEnrol();
        queryClient.invalidateQueries(useCashbackLinkedCardsQuery.getKey());
      } catch (_) {
        Toast.show({
          content: 'Swag Visa Debit card enrollment failed, please contact customer support.',
        });
      } finally {
        setIsLoadingManualHeroWalletEnrolment(false);
      }
    }
  };

  const renderHeroWallet = () => {
    if (!heroWalletCard) {
      return null;
    }
    const { expiry, lastFour } = heroWalletCard;
    const formattedExpDate = expiry ? formatStringToDate(expiry, ISODateFormat, 'MM/YY') : '';
    return (
      <List.Item
        variant="card"
        title={`Swag (${lastFour}) ${formattedExpDate}`}
        prefix={
          <Image
            resizeMode="contain"
            style={{
              height: 24,
              width: 48,
            }}
            accessibilityLabel="Credit card issuer"
            source={images.visa}
          />
        }
        disabled
      />
    );
  };

  const renderCashbackLinkedCards = () => {
    if (otherCardList.length === 0 || isError) {
      return null;
    }
    const oneCard = otherCardList.length === 1;
    return (
      <Box marginBottom="medium">
        {otherCardList.map(({ expiry, id, issuer, lastFour, provider }) => {
          const formattedExpDate = expiry ? formatStringToDate(expiry, ISODateFormat, 'MM/YY') : '';

          const cardIssuer = issuer.toLowerCase();
          const cardIcon = mapCardIconSource(cardIssuer);
          const cardTitle = `${provider} (${lastFour}) ${formattedExpDate}`;
          return (
            <Box marginBottom="medium" key={id}>
              <List.Item
                testID={`${lastFour}-${provider}`}
                variant="card"
                title={cardTitle}
                prefix={
                  <Image
                    resizeMode="contain"
                    accessibilityLabel="Credit card issuer"
                    source={cardIcon}
                    style={{
                      height: 24,
                      width: 48,
                    }}
                  />
                }
                suffix={oneCard ? undefined : 'circle-remove-outlined'}
                onPress={() => openRemoveSheet(id)}
                disabled={oneCard}
              />
            </Box>
          );
        })}
      </Box>
    );
  };

  const renderRemoveSheetContent = () => (
    <Typography.Body variant="regular" style={{ marginBottom: space.medium, marginHorizontal: space.large }}>
      Are you sure you want to remove this card from Cashback? Removing this card means you’ll no longer receive
      cashback on any purchases that you make with this card.
    </Typography.Body>
  );

  if (isLoading) {
    return <Spinner testID="spinner" />;
  }

  if (isError) {
    return <GeneralError themeName="eBens" />;
  }

  return (
    <>
      <CustomStatusBar backgroundColor={colors.neutralGlobalSurface} />
      <Page.TopBar
        backgroundColor="neutralGlobalSurface"
        title="Manage enrolled cards"
        onBack={navigation.goBack}
        hideRight
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
        style={{
          backgroundColor: colors.neutralGlobalSurface,
          paddingHorizontal: space.medium,
          paddingTop: space.medium,
        }}
      >
        <Typography.Title level="h3" typeface="playful">
          Your enrolled cards
        </Typography.Title>
        <Box marginTop="xlarge">
          <Typography.Title level="h5" style={{ marginBottom: space.medium }}>
            Swag Visa Debit card
          </Typography.Title>
          {heroWalletCard ? (
            renderHeroWallet()
          ) : (
            <HeroWalletStatusCard
              heroWalletStatus={userData?.me?.wallet?.details.setupStatus?.status}
              navigateToHeroWalletOnboarding={goToHeroWalletOnboarding}
              navigateToHelpCenter={goToHelpCenter}
              onManualHeroWalletEnrolment={onManualHeroWalletEnrolment}
            />
          )}
        </Box>
        <Box marginTop="xlarge">
          <Typography.Title level="h5" style={{ marginBottom: space.xsmall }}>
            Other cards
          </Typography.Title>
          <Typography.Body variant="small" style={{ marginBottom: space.smallMedium }}>
            You can enrol up to 4 Visa cards and 5 Mastercards.
          </Typography.Body>
          {isLoadingDeleteCard ? (
            <Spinner size="small" />
          ) : (
            <>
              {renderCashbackLinkedCards()}
              {otherCardCount < MAXIMUM_OTHER_CARDS_TO_ADD ? (
                <Box
                  style={{
                    borderStyle: 'dashed',
                    borderWidth: 1,
                    padding: space.xsmall,
                    borderColor: colors.primary,
                    borderRadius: 10,
                    marginBottom: insets.bottom,
                  }}
                >
                  <Button.Utility
                    onPress={onEnrolCard}
                    icon="add"
                    text={
                      <Typography.Title level="h6" style={{ color: colors.primary }}>
                        Add card
                      </Typography.Title>
                    }
                    intent="primary"
                  />
                </Box>
              ) : null}
            </>
          )}
        </Box>
      </ScrollView>
      <CustomBottomSheetView
        actions={[
          {
            title: 'Cancel',
            onPress: dismissRemoveSheet,
            testID: 'cancel_btn',
          },
          {
            title: 'Yes, remove card',
            onPress: onRemoveCard,
            testID: 'agree_remove_btn',
          },
        ]}
        icon="cancel"
        iconSize="xsmall"
        theme="eBens"
        content={renderRemoveSheetContent}
        title="Remove card?"
        bsRef={bsRef}
      />
    </>
  );
};
