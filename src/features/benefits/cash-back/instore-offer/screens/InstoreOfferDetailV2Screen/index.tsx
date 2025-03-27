import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { Dimensions, Image, TouchableOpacity, FlatList } from 'react-native';

import { Accordion, Box, Icon, Spinner, Typography, useTheme } from '@hero-design/rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { MixedStyleDeclaration } from 'react-native-render-html';
import RenderHtml from 'react-native-render-html';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AllNearbyLocationsBottomSheet } from './AllNearbyLocationsBottomSheet';
import { OfferItem } from './OfferItem';
import type { AllNearbyLocationsBottomSheetData } from './types';
import type { BottomSheetRef } from '../../../../../../common/components/bottom-sheet/BottomSheet';

import { GeneralError } from '../../../../../../common/components/error';
import { Page } from '../../../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../../../common/components/status-bar/CustomStatusBar';
import { useOneTimeEffect } from '../../../../../../common/shared-hooks/useOneTimeEffect';
import {
  useGetInstoreOffersByAdvertiserIdQuery,
  type InstoreOfferV2,
  useGetInstoreOfferByIdQuery,
} from '../../../../../../new-graphql/generated';
import { useIntl } from '../../../../../../providers/LocalisationProvider';
import type { SearchLocationContainerChildrenProps } from '../../../../common/containers/SearchLocationContainer';
import { SearchLocationContainer } from '../../../../common/containers/SearchLocationContainer';
import { useLaunchCashbackIntroduction } from '../../../card-link-offers/hooks/useLaunchCashbackIntroduction';
import { CashbackTermsAndConditionsBottomSheet } from '../../../components/CashbackTermsAndConditionsBottomSheet';
import { StepInstruction } from '../../../components/StepInstruction';
import { instoreInstruction } from '../../../constants';
import { useCashbackTracking } from '../../../hooks/useCashbackTracking';
import { useCheckCompletelyOnboardCashback } from '../../../hooks/useCheckCompletelyOnboardCashback';
import type { CashbackNavigationProp, CashbackRouteProp } from '../../../navigation/navigationTypes';
import { extractCityAndState, formatAdvertiserName } from '../../../utils/offer';

const screenWidth = Dimensions.get('screen').width;

const IMAGE_HEIGHT = 182;
const LOGO_HEIGHT = 54;

export type InStoreOfferDetailV2ScreenInnerProps = SearchLocationContainerChildrenProps & {
  advertiserId: string;
};

export const InStoreOfferDetailV2ScreenInner = ({
  advertiserId,
  keyedAddress,
  openSearchLocationBottomSheet,
  setKeyedAddress,
}: InStoreOfferDetailV2ScreenInnerProps) => {
  const navigation = useNavigation<CashbackNavigationProp<'InstoreOfferDetailV2'>>();
  const insets = useSafeAreaInsets();
  const { trackClickDropdown, trackVisitCashbackMerchantDetail, trackVisitCashbackOfferDetail } = useCashbackTracking();
  const [accordionOptions, setAccordionOptions] = useState('');
  const Intl = useIntl();
  const {
    params: { offers: offersFromRoute },
  } = useRoute<CashbackRouteProp<'InstoreOfferDetailV2'>>();
  const { data, isError, isLoading } = useGetInstoreOffersByAdvertiserIdQuery({ id: advertiserId }, { cacheTime: 0 });
  const { borderWidths, colors, fontSizes, lineHeights, radii, space } = useTheme();
  const tncBtsRef = useRef<BottomSheetRef>(null);
  const allowOpenScreenTnc = useRef(true);
  const { hasCLOOnboarded, hasUserAgreeToTermsAndConditions } = useCheckCompletelyOnboardCashback();
  const [offerIndex, setOfferIndex] = useState(0);
  const [allNearbyBtsData, setallNearbyBtsData] = useState<AllNearbyLocationsBottomSheetData | null>(null);
  const allNearbyBsRef = useRef<BottomSheetRef>(null);

  const textStyle: MixedStyleDeclaration = { fontSize: fontSizes.large - 1, lineHeight: lineHeights.large - 1 };

  useLaunchCashbackIntroduction(() => {
    // first time launch introduction, prevent open TnC in screen
    allowOpenScreenTnc.current = false;
    navigation.navigate('BenefitsStack', {
      screen: 'CardLinkOffersStack',
      params: {
        screen: 'CashbackIntroduction',
        params: {
          tncParams: {
            shouldTriggerAfterCarousel: true,
            onDismiss: () => {
              // cannot pop 2, tricky hack
              navigation.goBack();
              navigation.goBack();
            },
            onSuccess: () => {
              navigation.navigate('BenefitsStack', {
                screen: 'CashbackStack',
                params: {
                  screen: 'InstoreOfferDetailV2',
                  params: {
                    advertiserId,
                  },
                },
              });
            },
          },
          onPressNotReady: () => {
            // cannot pop 2, tricky hack
            navigation.goBack();
            navigation.goBack();
          },
        },
      },
    });
  });

  useEffect(() => {
    if (hasCLOOnboarded && !hasUserAgreeToTermsAndConditions && allowOpenScreenTnc.current) {
      tncBtsRef.current?.open();
    }
  }, [hasCLOOnboarded, hasUserAgreeToTermsAndConditions]);

  const offers = useMemo(
    () => data?.me?.cashback?.instoreOffersByAdvertiserId.offers || offersFromRoute || ([] as InstoreOfferV2[]),
    [data, offersFromRoute]
  );

  const OFFER_ITEM_WIDTH =
    offers.length > 1 ? screenWidth - space.medium * 2 - space.large : screenWidth - space.medium * 2;

  const currentOffer: InstoreOfferV2 | null = useMemo(() => offers?.[offerIndex] || null, [offerIndex, offers]);

  useOneTimeEffect(() => {
    if (offers.length > 0) {
      trackVisitCashbackMerchantDetail({
        offerNames: offers.map(offer => offer.title),
        offerIds: offers.map(offer => offer.id),
        categories: offers.map(offer => offer.categoryCode),
        platform: 'instore',
        merchantName: offers[0].advertiserName,
        merchantId: advertiserId,
      });
      return true;
    }

    return false;
  }, [offers, advertiserId]);

  useEffect(() => {
    if (currentOffer) {
      trackVisitCashbackOfferDetail({
        offerName: currentOffer.title,
        offerId: currentOffer.id,
        category: currentOffer.categoryCode,
        platform: 'instore',
        merchantName: formatAdvertiserName(currentOffer.advertiserName),
        isMultipleLocation: currentOffer.locations.length > 1,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentOffer]);

  const onItemPress = (key: string) => {
    if (!currentOffer) {
      return;
    }

    const { advertiserName, categoryCode, title } = currentOffer;
    trackClickDropdown(key, {
      offerName: title,
      category: categoryCode,
      platform: 'online',
      merchantName: formatAdvertiserName(advertiserName),
    });
    setAccordionOptions(key);
  };

  const onOffersScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const itemWidth = event.nativeEvent.layoutMeasurement.width;
    const index = Math.round(offsetX / itemWidth);
    setOfferIndex(index);
  };

  const renderOfferItem = ({ item }: { item: InstoreOfferV2 }) => {
    return (
      <OfferItem
        item={item}
        width={OFFER_ITEM_WIDTH}
        keyedAddress={keyedAddress}
        onOpenAllNearbyLocationsBts={() => {
          allNearbyBsRef.current?.open();
        }}
        setKeyedAddress={setKeyedAddress}
        setAllNearbyBtsData={setallNearbyBtsData}
      />
    );
  };

  const renderBody = () => {
    if (!offersFromRoute && isLoading) {
      return <Spinner accessibilityLabel="spinner" />;
    }
    if (!offers || !currentOffer) {
      return null;
    }

    const { advertiserAbout, advertiserName, howItWorks, imageUrl, logoUrl, tnc } = currentOffer;

    return (
      <Page
        contentContainerStyle={{
          paddingBottom: insets.bottom || space.medium,
          paddingHorizontal: 0,
          backgroundColor: colors.neutralGlobalSurface,
        }}
        showsVerticalScrollIndicator={false}
        testID="instore-offer-detail-v2-screen"
      >
        <Page.Body marginBottom="medium">
          <Image
            source={{ uri: imageUrl, height: IMAGE_HEIGHT, width: screenWidth }}
            accessibilityLabel="Offer image"
          />
          <Box
            borderRadius="medium"
            flexDirection="row"
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
            <Image accessibilityLabel="Thumbnail" source={{ uri: logoUrl, width: LOGO_HEIGHT, height: LOGO_HEIGHT }} />
            <Box flexDirection="column" flex={1}>
              <Typography.Title level="h5">{formatAdvertiserName(advertiserName)}</Typography.Title>
              <TouchableOpacity
                onPress={openSearchLocationBottomSheet}
                testID="select-location-con"
                style={{
                  flexDirection: 'row',
                  alignSelf: 'baseline',
                  marginTop: 6,
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <Icon testID="near-me" icon="near-me" size="xsmall" intent="primary" />
                <Typography.Body style={{ marginLeft: space.small, flex: 1 }} intent="primary" variant="small">
                  {extractCityAndState(keyedAddress)}
                </Typography.Body>
              </TouchableOpacity>
            </Box>
          </Box>

          {offers.length > 1 && (
            <Box marginHorizontal="medium" marginTop="large">
              <Typography.Body>
                {Intl.formatMessage(
                  { id: 'benefits.cashback.exclusiveOffers' },
                  {
                    numOffers: offers.length,
                  }
                )}
              </Typography.Body>
            </Box>
          )}

          <FlatList<InstoreOfferV2>
            onMomentumScrollEnd={onOffersScrollEnd}
            style={{
              marginTop: space.medium,
            }}
            contentContainerStyle={{
              paddingLeft: space.medium,
            }}
            horizontal
            data={offers}
            keyExtractor={offer => offer.id}
            renderItem={renderOfferItem}
            showsHorizontalScrollIndicator={false}
            snapToInterval={OFFER_ITEM_WIDTH + space.medium}
            scrollEnabled={offers.length > 1}
          />

          <Box
            marginLeft="medium"
            marginRight="medium"
            marginTop="medium"
            paddingHorizontal="medium"
            paddingVertical="large"
            borderRadius="medium"
            backgroundColor="defaultGlobalSurface"
          >
            <Typography.Title level="h5">How this In-store offer works</Typography.Title>
            <StepInstruction marginRight="medium" marginTop="large" data={instoreInstruction} />
          </Box>
          <Accordion
            style={{ marginTop: space.medium, marginHorizontal: space.medium, marginBottom: space.small }}
            items={[
              {
                header: Intl.formatMessage({ id: 'benefits.cashback.dropdown.description' }),
                content: <Typography.Body variant="small">{howItWorks ?? ''}</Typography.Body>,
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
                    advertiser: formatAdvertiserName(advertiserName),
                  }
                ),
                content: (
                  <RenderHtml
                    baseStyle={textStyle}
                    contentWidth={screenWidth}
                    source={{ html: advertiserAbout ?? '' }}
                  />
                ),
                key: `About ${formatAdvertiserName(advertiserName)}`,
                style: {
                  borderBottomWidth: borderWidths.base,
                  borderColor: colors.disabledOnDefaultGlobalSurface,
                },
                testID: `About ${formatAdvertiserName(advertiserName)}`,
              },

              {
                header: Intl.formatMessage({ id: 'benefits.cashback.dropdown.tnc' }),
                content: <Typography.Body variant="small">{tnc ?? ''}</Typography.Body>,
                key: 'Terms & conditions',
                style: {
                  borderBottomRightRadius: radii.large,
                  borderBottomLeftRadius: radii.large,
                },
                testID: 'Terms & conditions',
              },
            ]}
            activeItemKey={accordionOptions}
            onItemPress={onItemPress}
          />

          <AllNearbyLocationsBottomSheet
            key={JSON.stringify(allNearbyBtsData)}
            data={allNearbyBtsData}
            btsRef={allNearbyBsRef}
          />
        </Page.Body>
      </Page>
    );
  };

  if (isError) {
    return <GeneralError themeName="eBens" variant="full-screen" onCtaPress={navigation.goBack} />;
  }

  return (
    <>
      <CustomStatusBar backgroundColor={colors.defaultGlobalSurface} />
      <Page.TopBar onBack={navigation.goBack} title="In-store offer" backgroundColor="defaultGlobalSurface" hideRight />
      {renderBody()}
      <CashbackTermsAndConditionsBottomSheet
        btsRef={tncBtsRef}
        onDismiss={() => {
          navigation.goBack();
        }}
      />
    </>
  );
};

export const InStoreOfferDetailV2Screen = () => {
  /**
   * If advertiserId is passed then use it, otherwise use offerLocationId to fetch instore offer details (old endpoint) to get advertiserId
   */
  const {
    params: { advertiserId: advertiserIdFromRoute, offerLocationId },
  } = useRoute<CashbackRouteProp<'InstoreOfferDetailV2'>>();
  const [advertiserId, setAdvertiserId] = useState(advertiserIdFromRoute);
  const { data } = useGetInstoreOfferByIdQuery(
    {
      id: offerLocationId || '',
    },
    {
      cacheTime: 0,
      enabled: !!offerLocationId,
    }
  );

  useEffect(() => {
    const fetchedAdvertiserId = data?.me?.cashback?.inStoreOfferById?.advertiserId;
    if (!advertiserIdFromRoute && fetchedAdvertiserId) {
      setAdvertiserId(fetchedAdvertiserId);
    }
  }, [data, advertiserIdFromRoute]);

  if (!advertiserId) {
    return null;
  }

  return (
    <SearchLocationContainer>
      {childProps => <InStoreOfferDetailV2ScreenInner {...childProps} advertiserId={advertiserId} />}
    </SearchLocationContainer>
  );
};
