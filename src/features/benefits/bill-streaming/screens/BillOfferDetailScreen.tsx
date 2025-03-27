import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, Image, ScrollView } from 'react-native';
import { Accordion, Box, FAB, Spinner, Typography, useTheme } from '@hero-design/rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import type { MixedStyleDeclaration } from 'react-native-render-html';
import RenderHtml from 'react-native-render-html';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomSheetRef } from '../../../../common/components/bottom-sheet/BottomSheet';
import { GeneralError } from '../../../../common/components/error';
import { Page } from '../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import { useInAppBrowser } from '../../../../common/shared-hooks/useInAppBrowser';
import { useOneTimeEffect } from '../../../../common/shared-hooks/useOneTimeEffect';
import { scale } from '../../../../common/utils/layout';
import {
  useGetAhmAccessTokenQuery,
  useGetBmOfferDetailQuery,
  useGetCurrentUserQuery,
  useGetPromotionQuery,
} from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { BillOfferTiles } from '../components/BillOfferTiles';
import { DynamicText } from '../components/DynamicText';
import { PromotionTag } from '../components/PromotionTag';
import { PromotionTnCApply } from '../components/PromotionTnCApply';
import type { BillOfferExplanationHandler } from '../components/StateBasedSelect';
import { StateBasedSelect } from '../components/StateBasedSelect';
import { BillOfferExplanation } from '../containers/BillOfferExplanation';
import { SignupRedirectBts } from '../containers/SignupRedirectBts';
import { useBenefitsBillMgmtTracking } from '../hooks/useBenefitsBillMgmtTracking';
import { useBillPromotionPermission } from '../hooks/useBillPromotionPermission';
import type { BillStreamNavigationProp, BillStreamRouteProp } from '../navigation/navigationTypes';
import { useBillManagementOfferStore } from '../stores/useBillManagementOfferStore';

const LOGO_SIZE = 72;
const COVER_HEIGHT = scale(228, 'width');
const { width: screenWidth } = Dimensions.get('screen');

const FABHeight = 100;
const providerIdsRequireSignupToken = ['2']; // AHM requires signup token

export const BillOfferDetailScreen = () => {
  const signUpBtsRef = useRef<BottomSheetRef>(null);
  const btsRef = useRef<BottomSheetRef>(null);
  const billOfferExplainationBtsRef = useRef<BillOfferExplanationHandler>(null);
  const navigation = useNavigation<BillStreamNavigationProp<'BillOfferDetailScreen'>>();
  const [accordionOptions, setAccordionOptions] = useState('');
  const route = useRoute<BillStreamRouteProp<'BillOfferDetailScreen'>>();
  const { data: ebenUserData, isError: isUserError, isLoading: isLoadingUser } = useGetCurrentUserQuery();
  const { borderWidths, colors, fontSizes, radii, space } = useTheme();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const textStyle: MixedStyleDeclaration = { fontSize: fontSizes.large, fontWeight: '400' };
  const overlaySpace = radii.large;
  const { openUrl } = useInAppBrowser();
  const { data: cacheData, offerId: offerIdFromRoute, onBackToBill } = route.params;
  const { trackClickGoBackToBill, trackClickGotIt, trackClickOnSignUp, trackVisitBillOfferDetail } =
    useBenefitsBillMgmtTracking();
  const offerId = cacheData?.id || offerIdFromRoute;
  const { formatMessage } = useIntl();
  const { currentState, hasHydrate } = useBillManagementOfferStore();
  const {
    data: res,
    isError,
    isLoading,
  } = useGetBmOfferDetailQuery({ input: { id: offerId ?? '' } }, { enabled: !!offerId });

  const offerResponse = res?.me?.billManagement?.offerV2;
  const offerData = offerResponse || cacheData;
  const {
    about,
    description,
    howItWorks,
    imageUrl,
    logoUrl,
    provider,
    reminder,
    signUpLink = '',
    stateBasedOffers,
    termsAndConditions,
    title,
  } = offerData ?? {};

  const ebenEmail = ebenUserData?.me?.details?.email ?? '';
  const showSignUp = ebenEmail && !isLoadingUser && !isUserError && signUpLink;

  const { data: promotionContent } = useGetPromotionQuery();

  const { offerSubTitle, offerTitle } = promotionContent?.me?.billManagement?.promotion ?? {};

  // TODO: only AHM need to request access token, not all offers.
  const { data: tokenQuery } = useGetAhmAccessTokenQuery();

  const { havingPermission: isPromotion, isFetched } = useBillPromotionPermission(provider ? provider.id : '');

  useOneTimeEffect(() => {
    if (offerData) {
      trackVisitBillOfferDetail(offerData?.provider?.name ?? '');
      return true;
    }

    return false;
  }, [offerData]);

  useEffect(() => {
    if (!currentState && hasHydrate && offerData && offerData.stateBasedOffers?.length) {
      btsRef.current?.open();
    }
  }, [currentState, hasHydrate, offerData]);

  useEffect(() => {
    if (description) {
      setAccordionOptions('Description');
    }
  }, [description]);

  const onSignup = () => {
    trackClickOnSignUp(signUpLink, provider?.name ?? '');
    signUpBtsRef.current?.open();
  };
  const navigateToSignUpLink = () => {
    const headers: Record<string, string> = {};
    const requireToken = offerData?.id && providerIdsRequireSignupToken.includes(offerData?.id);
    if (requireToken) {
      const token = tokenQuery?.me?.billManagement?.ahmAccessToken as string | undefined;
      if (token) {
        headers['X-EH-Token'] = token;
      } else {
        return;
      }
    }
    if (signUpLink) {
      navigation.navigate('BillSignUpWebView', { url: signUpLink, onBackToBill, headers });
      trackClickGotIt(provider?.name ?? '');
      navigation.navigate('BillSignUpWebView', {
        url: signUpLink,
        onBackToBill: () => {
          trackClickGoBackToBill(provider?.name ?? '');
          onBackToBill();
        },
        headers,
      });
    }
  };

  const renderersProps = {
    a: {
      onPress(_event: unknown, url: string) {
        openUrl(url);
      },
    },
  };

  const renderDropdownItem = (item: string): JSX.Element => {
    return (
      <RenderHtml
        tagsStyles={{
          a: {
            color: colors.primary,
            textDecorationColor: colors.primary,
          },
        }}
        renderersProps={renderersProps}
        baseStyle={textStyle}
        contentWidth={screenWidth}
        source={{ html: item }}
      />
    );
  };

  const getTitleByOfferId = (id: string) => {
    const mapOfferType = {
      '1': formatMessage({ id: 'benefits.bill.electricityAndGas' }),
      '2': formatMessage({ id: 'benefits.bill.healthInsurace' }),
      '3': formatMessage({ id: 'benefits.bill.healthInsurace' }),
    };
    return mapOfferType[id as keyof typeof mapOfferType];
  };

  const options = useMemo(() => {
    if (!stateBasedOffers) {
      return [];
    }

    return stateBasedOffers.map(offer => offer.state);
  }, [stateBasedOffers]);

  const currentStateOffer = useMemo(() => {
    if (!stateBasedOffers) {
      return null;
    }
    return stateBasedOffers.find(offer => offer.state === currentState);
  }, [currentState, stateBasedOffers]);

  const renderBody = () => {
    if ((isLoading && !offerData) || !isFetched) {
      return (
        <Box style={{ width: '100%', height: '80%' }}>
          <Spinner />
        </Box>
      );
    }
    if (isError) {
      return <GeneralError themeName="eBens" />;
    }

    return (
      <>
        <ScrollView
          style={{ flex: 1, backgroundColor: colors.neutralGlobalSurface }}
          contentContainerStyle={{ paddingBottom: bottomInset + FABHeight }}
          testID="bill_offer_detail_scrollview"
        >
          <Image
            resizeMode="cover"
            style={{ height: COVER_HEIGHT + overlaySpace, width: '100%' }}
            source={{ uri: imageUrl }}
            testID="bill_offer_cover_image"
          />
          <Box
            backgroundColor="defaultGlobalSurface"
            paddingHorizontal="medium"
            paddingVertical="large"
            style={{ marginTop: -overlaySpace, borderRadius: overlaySpace }}
          >
            <Box flexDirection="row" alignItems="center">
              <Typography.Body variant="small">{provider?.name}</Typography.Body>
              {currentStateOffer?.tiles && (
                <Box flexDirection="row" alignItems="center">
                  <Typography.Body variant="small"> • </Typography.Body>
                  <TouchableOpacity testID="state-based-btn" onPress={() => btsRef.current?.open()}>
                    <Typography.Body intent="primary" variant="small" style={{ textDecorationLine: 'underline' }}>
                      {currentState}
                    </Typography.Body>
                  </TouchableOpacity>
                </Box>
              )}
            </Box>
            <Box flexDirection="row">
              <Typography.Title numberOfLines={2} typeface="playful" level="h4" style={{ marginRight: space.small }}>
                {isPromotion ? offerTitle : title}
              </Typography.Title>
              {isPromotion ? <PromotionTag withoutText /> : null}
            </Box>

            {isPromotion ? (
              <Box flexDirection="row" alignItems="center" marginTop="small">
                <Typography.Caption intent="subdued">
                  {offerSubTitle}
                  {` `}
                </Typography.Caption>
                <PromotionTnCApply />
              </Box>
            ) : null}
            <Image
              style={{
                width: LOGO_SIZE,
                height: LOGO_SIZE,
                backgroundColor: colors.defaultGlobalSurface,
                position: 'absolute',
                right: space.medium,
                top: space.medium - LOGO_SIZE,
                borderRadius: radii.medium,
                borderWidth: borderWidths.base,
                borderColor: colors.disabledOnDefaultGlobalSurface,
              }}
              testID="bill_offer_logo"
              resizeMode="contain"
              source={{ uri: logoUrl }}
            />
          </Box>
          {currentStateOffer?.tiles && (
            <Box
              style={{ borderBottomRightRadius: overlaySpace, borderBottomLeftRadius: overlaySpace }}
              paddingVertical="large"
              backgroundColor="decorativePrimarySurface"
            >
              <BillOfferTiles offerTiles={currentStateOffer?.tiles ?? []} />
              {currentStateOffer.offerExplanationCta && (
                <TouchableOpacity
                  onPress={() => {
                    billOfferExplainationBtsRef.current?.open();
                  }}
                >
                  <DynamicText
                    style={{ marginTop: space.medium, paddingHorizontal: space.medium }}
                    content={currentStateOffer.offerExplanationCta ?? ''}
                  />
                </TouchableOpacity>
              )}
            </Box>
          )}
          <Box margin="medium">
            <Accordion
              items={[
                {
                  header: 'Description',
                  content: renderDropdownItem(description ?? ''),
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
                  header: 'How it works',
                  content: renderDropdownItem(howItWorks ?? ''),
                  key: 'How it works',
                  style: {
                    borderBottomWidth: borderWidths.base,
                    borderColor: colors.disabledOnDefaultGlobalSurface,
                  },
                  testID: 'How it works',
                },
                {
                  header: `About ${provider?.name}`,
                  content: renderDropdownItem(about ?? ''),

                  key: 'Other information',
                  style: {
                    borderBottomWidth: borderWidths.base,
                    borderColor: colors.disabledOnDefaultGlobalSurface,
                  },
                  testID: 'Other information',
                },
                {
                  header: 'Terms & conditions',
                  content: renderDropdownItem(termsAndConditions ?? ''),

                  key: 'Terms & conditions',
                  style: {
                    borderBottomRightRadius: radii.large,
                    borderBottomLeftRadius: radii.large,
                  },
                  testID: 'Terms and conditions',
                },
              ]}
              activeItemKey={accordionOptions}
              onItemPress={setAccordionOptions}
            />
          </Box>
        </ScrollView>
        <BillOfferExplanation ref={billOfferExplainationBtsRef} content={currentStateOffer?.offerExplaination} />
        <StateBasedSelect goBack={navigation.goBack} ref={btsRef} stateOptions={options} />
        {showSignUp && (
          <FAB
            title="View Offer"
            testID="bill-offer-view-offer"
            icon="external-link"
            onPress={onSignup}
            style={{
              position: 'absolute',
              bottom: space.large + bottomInset,
              right: space.medium,
            }}
          />
        )}
      </>
    );
  };

  return (
    <Box flex={1}>
      <CustomStatusBar backgroundColor={colors.neutralGlobalSurface} />
      <Page.TopBar
        onBack={navigation.goBack}
        hideRight
        backgroundColor="neutralGlobalSurface"
        title={getTitleByOfferId(offerId ?? '')}
      />
      {renderBody()}
      <SignupRedirectBts
        copyText={reminder?.reminderTextCopy ? reminder?.reminderTextCopy : ebenEmail}
        description={reminder?.reminderDescription ?? ''}
        bsRef={signUpBtsRef}
        onNext={navigateToSignUpLink}
      />
    </Box>
  );
};
