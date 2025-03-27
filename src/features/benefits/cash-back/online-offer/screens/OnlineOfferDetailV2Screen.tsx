import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image } from 'react-native';
import { Accordion, Box, Button, Spinner, Typography, useTheme } from '@hero-design/rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomSheetRef } from '../../../../../common/components/bottom-sheet/BottomSheet';
import { GeneralError } from '../../../../../common/components/error';
import { Page } from '../../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../../common/components/status-bar/CustomStatusBar';
import { useInAppBrowser } from '../../../../../common/shared-hooks/useInAppBrowser';
import { useOneTimeEffect } from '../../../../../common/shared-hooks/useOneTimeEffect';
import { useCashbackLinkedCardsQuery, useGetOnlineOfferByIdQuery } from '../../../../../new-graphql/generated';
import { useIntl } from '../../../../../providers/LocalisationProvider';
import { useLaunchCashbackIntroduction } from '../../card-link-offers/hooks/useLaunchCashbackIntroduction';
import { CashbackTermsAndConditionsBottomSheet } from '../../components/CashbackTermsAndConditionsBottomSheet';
import { OfferLinkRedirect } from '../../components/OfferLinkRedirect';
import { StepInstruction } from '../../components/StepInstruction';
import { onlineAffiliateInstruction, onlineCardLinkInstruction } from '../../constants';
import { useCashbackTracking } from '../../hooks/useCashbackTracking';
import { useCheckCompletelyOnboardCashback } from '../../hooks/useCheckCompletelyOnboardCashback';
import type { CashbackNavigationProp, CashbackRouteProp } from '../../navigation/navigationTypes';

const screenWidth = Dimensions.get('screen').width;

const IMAGE_HEIGHT = 182;
const LOGO_HEIGHT = 54;

let timeOutAction: NodeJS.Timeout;

export const OnlineOfferDetailV2Screen = () => {
  const navigation = useNavigation<CashbackNavigationProp<'OnlineOfferDetail'>>();
  const insets = useSafeAreaInsets();
  const { isCompleted } = useCheckCompletelyOnboardCashback();
  const {
    data: linkedCardsData,
    isRefetching: isRefetchingCards,
    refetch: refetchCards,
  } = useCashbackLinkedCardsQuery({}, { enabled: isCompleted });
  const cardList = linkedCardsData?.me?.cashback?.linkedCards?.cards || [];
  const bsRef = useRef<BottomSheetRef>(null);
  const [accordionOptions, setAccordionOptions] = useState('');
  const {
    params: { offer: offerFromRoute, offerId },
  } = useRoute<CashbackRouteProp<'OnlineOfferDetail'>>();
  const {
    data,
    isError,
    isLoading,
    isRefetching,
    refetch: refetchDetail,
  } = useGetOnlineOfferByIdQuery({ id: offerId }, { cacheTime: 0 });
  const { borderWidths, colors, radii, space } = useTheme();
  const tncBtsRef = useRef<BottomSheetRef>(null);
  const Intl = useIntl();

  const { openUrl } = useInAppBrowser();

  const {
    trackClickDropdown,
    trackClickShopNowOnOfferPage,
    trackCloseCashbackIsActiveSheet,
    trackVisitCashbackOfferDetail,
  } = useCashbackTracking();

  useLaunchCashbackIntroduction(() => {
    navigation.navigate('BenefitsStack', {
      screen: 'CardLinkOffersStack',
      params: {
        screen: 'CashbackIntroduction',
        params: {
          onPressNotReady: () => {
            // cannot pop 2, tricky hack
            navigation.goBack();
            navigation.goBack();
          },
        },
      },
    });
  });

  const offerDetail = data?.me?.cashback?.onlineOfferById || offerFromRoute;
  const {
    advertiserName = '',
    categoryCode = '',
    description = '',
    howItWorks = '',
    imageUrl = '',
    isCardLinkedOffer,
    logoUrl = '',
    title = '',
    tnc = '',
    trackingUrl = '',
  } = offerDetail ?? {};

  useOneTimeEffect(() => {
    if (offerDetail) {
      trackVisitCashbackOfferDetail({
        offerName: title,
        offerId: offerDetail?.id,
        offerType: isCardLinkedOffer ? 'card linked' : 'affiliate',
        category: categoryCode,
        platform: 'online',
        merchantName: advertiserName,
      });

      return true;
    }

    return false;
  }, [offerDetail]);

  const isNoCards = cardList?.length === 0;

  const checkForTnC = (callback: () => void) => {
    if (!isCompleted) {
      tncBtsRef.current?.open();
    } else {
      callback();
    }
  };

  const doOpenLinkOffers = (url: string, hasNoCards: boolean) => {
    trackClickShopNowOnOfferPage({
      offerName: title,
      offerType: isCardLinkedOffer ? 'card linked' : 'affiliate',
      category: categoryCode,
      platform: 'online',
      merchantName: advertiserName,
    });
    if (isCardLinkedOffer && hasNoCards) {
      navigation.navigate('BenefitsStack', {
        screen: 'CardLinkOffersStack',
        params: {
          screen: 'AddCardCashbackDashboard',
        },
      });
    } else if (url) {
      bsRef.current?.open();
      timeOutAction = setTimeout(() => {
        openUrl(url);
        bsRef.current?.close();
      }, 3000);
    }
  };

  const cleanupTimeout = () => {
    trackCloseCashbackIsActiveSheet({
      offerName: title,
      offerType: isCardLinkedOffer ? 'card linked' : 'affiliate',
      category: categoryCode,
      platform: 'online',
      merchantName: advertiserName,
    });
    if (timeOutAction) {
      clearTimeout(timeOutAction);
    }
  };

  useEffect(() => {
    return () => {
      cleanupTimeout();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLoadDataSuccess = !isLoading && !isError && offerDetail;

  const showShopNow = offerFromRoute ? true : isLoadDataSuccess;

  const onItemPress = (key: string) => {
    trackClickDropdown(key, {
      offerName: title,
      offerType: isCardLinkedOffer ? 'card linked' : 'affiliate',
      category: categoryCode,
      platform: 'online',
      merchantName: advertiserName,
    });
    setAccordionOptions(key);
  };

  const onTnCAccepted = async () => {
    try {
      // const [detailRes, cardRes] = await Promise.all([refetchDetail(), refetchCards()]);
      // TODO: temp solution while waiting new cashback service to fully migrate
      const cardRes = await refetchCards();
      const detailRes = await refetchDetail();
      doOpenLinkOffers(
        detailRes.data?.me?.cashback?.onlineOfferById?.trackingUrl ?? '',
        cardRes.data?.me?.cashback?.linkedCards.cards.length === 0
      );
    } catch {
      navigation.navigate('FailedScreen');
    }
  };

  const renderBody = () => {
    if (isLoading && !offerFromRoute) {
      return <Spinner accessibilityLabel="spinner" />;
    }

    if (!offerDetail) {
      return null;
    }

    return (
      <Page
        contentContainerStyle={{
          paddingBottom: insets.bottom || space.medium,
          paddingHorizontal: 0,
          backgroundColor: colors.neutralGlobalSurface,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Page.Body marginBottom="medium">
          <Image
            source={{ uri: imageUrl, height: IMAGE_HEIGHT, width: screenWidth }}
            accessibilityLabel="Offer image"
          />
          <Box
            borderRadius="medium"
            flexDirection="column"
            marginRight="medium"
            paddingVertical="medium"
            paddingHorizontal="medium"
            marginLeft="medium"
            style={{
              backgroundColor: colors.defaultGlobalSurface,
              marginTop: -space.large,
              gap: space.smallMedium,
            }}
          >
            <Box
              flexDirection="row"
              style={{
                gap: space.smallMedium,
              }}
            >
              <Image
                accessibilityLabel="Thumbnail"
                source={{ uri: logoUrl, width: LOGO_HEIGHT, height: LOGO_HEIGHT }}
              />
              <Box flexDirection="column" flex={1}>
                <Typography.Title level="h5">{advertiserName}</Typography.Title>
                <Typography.Body
                  intent="subdued"
                  variant="small"
                  style={{
                    marginTop: space.xsmall,
                  }}
                >
                  Online
                </Typography.Body>
              </Box>
            </Box>
            <Box marginTop="medium">
              <Typography.Title level="h4" typeface="playful">
                {title.replace('>', 'over').toLowerCase()}
              </Typography.Title>
            </Box>
          </Box>

          <Box
            marginLeft="medium"
            marginRight="medium"
            marginTop="medium"
            paddingHorizontal="medium"
            paddingVertical="large"
            borderRadius="medium"
            backgroundColor="defaultGlobalSurface"
          >
            <Typography.Title level="h5">
              {Intl.formatMessage({ id: 'benefits.cashback.howThisOfferWork' })}
            </Typography.Title>
            <StepInstruction
              marginRight="medium"
              marginTop="large"
              data={isCardLinkedOffer ? onlineCardLinkInstruction : onlineAffiliateInstruction}
            />
          </Box>

          <Accordion
            style={{ marginTop: space.medium, marginHorizontal: space.medium }}
            items={[
              {
                header: Intl.formatMessage({ id: 'benefits.cashback.dropdown.description' }),
                content: <Typography.Body variant="small">{howItWorks}</Typography.Body>,
                key: 'Description',
                style: {
                  borderTopRightRadius: radii.large,
                  borderTopLeftRadius: radii.large,
                  borderBottomWidth: borderWidths.base,
                  borderColor: colors.disabledOnDefaultGlobalSurface,
                },
                testID: 'Description',
              },
              {
                header: Intl.formatMessage(
                  { id: 'benefits.cashback.dropdown.aboutAdvertiser' },
                  {
                    advertiser: advertiserName,
                  }
                ),
                content: <Typography.Body variant="small">{description}</Typography.Body>,
                key: `About ${advertiserName}`,
                style: {
                  borderBottomWidth: borderWidths.base,
                  borderColor: colors.disabledOnDefaultGlobalSurface,
                },
                testID: `About ${advertiserName}`,
              },
              {
                header: Intl.formatMessage({ id: 'benefits.cashback.dropdown.tnc' }),
                content: <Typography.Body variant="small">{tnc}</Typography.Body>,
                key: 'Terms and conditions',
                style: {
                  borderBottomRightRadius: radii.large,
                  borderBottomLeftRadius: radii.large,
                },
                testID: 'Terms and conditions',
              },
            ]}
            activeItemKey={accordionOptions}
            onItemPress={onItemPress}
          />

          {showShopNow && (
            <Box paddingHorizontal="medium" marginTop="medium">
              <Button
                testID="shop_now_btn"
                rightIcon="external-link"
                accessibilityLabel="Shop now"
                loading={isRefetching || isRefetchingCards}
                onPress={() => checkForTnC(() => doOpenLinkOffers(trackingUrl, isNoCards))}
                text="Shop now"
              />
            </Box>
          )}
        </Page.Body>
      </Page>
    );
  };

  if (isError) {
    return <GeneralError themeName="eBens" onCtaPress={navigation.goBack} />;
  }

  return (
    <>
      <CustomStatusBar backgroundColor={colors.defaultGlobalSurface} />
      <Page.TopBar onBack={navigation.goBack} title="Online offer" backgroundColor="defaultGlobalSurface" hideRight />
      {renderBody()}
      <OfferLinkRedirect onDismiss={cleanupTimeout} bsRef={bsRef} supplierName={advertiserName} />
      <CashbackTermsAndConditionsBottomSheet btsRef={tncBtsRef} onSuccess={onTnCAccepted} />
    </>
  );
};
