import React, { useState } from 'react';
import { FlatList, type ImageSourcePropType, type ListRenderItem, TouchableOpacity } from 'react-native';
import { BottomSheet, Box, Button, Icon, Image, List, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import images from '../../../common/assets/images';
import { Page } from '../../../common/components/layout/page';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import { useIsAccountUK } from '../../../common/hooks/useIsAccountUK';
import { useInAppBrowser } from '../../../common/shared-hooks/useInAppBrowser';
import { useToast } from '../../../common/shared-hooks/useToast';
import { useSessionStore } from '../../../common/stores/useSessionStore';
import { scale } from '../../../common/utils/layout';
import {
  type DisableEarnedWageAccessFeaturesPayload,
  useDisableEarnedWageAccessFeaturesMutation,
} from '../../../new-graphql/generated';
import { useIntl, useRegionLocalisation } from '../../../providers/LocalisationProvider';
import type { LocaleMessageID, RegionMessageID } from '../../../providers/LocalisationProvider/constants';
import { isInstapayError } from '../../income/instapay/utils/graphql-processor';
import {
  FINANCIAL_WELLNESS_AT_WORK_LINK,
  FINANCIAL_WELLNESS_BULLETPROOF_BUDGET_LINK,
  FINANCIAL_WELLNESS_CUT_EVERYDAY_EXPENSES_LINK,
  FINANCIAL_WELLNESS_EMPLOYEE_BENEFITS_LINK,
  FINANCIAL_WELLNESS_MONEYSMART_LINK_AU,
  FINANCIAL_WELLNESS_NATIONAL_DEBT_HELPLINE_LINK_AU,
  FINANCIAL_WELLNESS_SMALL_BUSINESS_DEBT_HELPLINE_LINK_AU,
  FINANCIAL_WELLNESS_CITIZEN_ADVICE_LINK_UK,
  FINANCIAL_WELLNESS_MONEY_HELPER_LINK_UK,
  FINANCIAL_WELLNESS_NATIONAL_DEBT_HELPLINE_LINK_UK,
  type FinancialWellnessLink,
  NEW_FINANCIAL_WELLNESS_AT_WORK_LINK,
  NEW_FINANCIAL_WELLNESS_BULLETPROOF_BUDGET_LINK,
  NEW_FINANCIAL_WELLNESS_CUT_EVERYDAY_EXPENSES_LINK,
  NEW_FINANCIAL_WELLNESS_EMPLOYEE_BENEFITS_LINK,
} from '../constants/supportLinks';
import { useSupportTracking } from '../hooks/useSuportTracking';
import type { SupportStackNavigationProp } from '../navigation/navigationTypes';

type FinancialInsightCarouselItem = {
  titleId: LocaleMessageID;
  minutesReading: number;
  imgSrc: ImageSourcePropType;
  url: FinancialWellnessLink;
};

const getFinancialInsightCarouselItems = (isRebrand: boolean): FinancialInsightCarouselItem[] => {
  return [
    {
      titleId: 'support.financialWellness.sections.myFinancialInsights.carouselItem1Title',
      minutesReading: 9,
      imgSrc: images.financialInsightsCarousel1,
      url: isRebrand ? NEW_FINANCIAL_WELLNESS_AT_WORK_LINK : FINANCIAL_WELLNESS_AT_WORK_LINK,
    },
    {
      titleId: 'support.financialWellness.sections.myFinancialInsights.carouselItem2Title',
      minutesReading: 5,
      imgSrc: images.financialInsightsCarousel2,
      url: isRebrand ? NEW_FINANCIAL_WELLNESS_BULLETPROOF_BUDGET_LINK : FINANCIAL_WELLNESS_BULLETPROOF_BUDGET_LINK,
    },
    {
      titleId: 'support.financialWellness.sections.myFinancialInsights.carouselItem3Title',
      minutesReading: 13,
      imgSrc: images.financialInsightsCarousel3,
      url: isRebrand
        ? NEW_FINANCIAL_WELLNESS_CUT_EVERYDAY_EXPENSES_LINK
        : FINANCIAL_WELLNESS_CUT_EVERYDAY_EXPENSES_LINK,
    },
    {
      titleId: 'support.financialWellness.sections.myFinancialInsights.carouselItem4Title',
      minutesReading: 10,
      imgSrc: images.financialInsightsCarousel4,
      url: isRebrand ? NEW_FINANCIAL_WELLNESS_EMPLOYEE_BENEFITS_LINK : FINANCIAL_WELLNESS_EMPLOYEE_BENEFITS_LINK,
    },
  ];
};

type FinancialInsightItem = {
  titleId: RegionMessageID;
  subtitleId: RegionMessageID;
  imgSrc: ImageSourcePropType;
  url: FinancialWellnessLink;
};

const financialInsightAuItems: FinancialInsightItem[] = [
  {
    titleId: 'support.financialWellness.sections.myFinancialInsights.item1Title',
    subtitleId: 'support.financialWellness.sections.myFinancialInsights.item1Subtitle',
    imgSrc: images.financialInsightsAU1,
    url: FINANCIAL_WELLNESS_MONEYSMART_LINK_AU,
  },
  {
    titleId: 'support.financialWellness.sections.myFinancialInsights.item2Title',
    subtitleId: 'support.financialWellness.sections.myFinancialInsights.item2Subtitle',
    imgSrc: images.financialInsightsAU2,
    url: FINANCIAL_WELLNESS_NATIONAL_DEBT_HELPLINE_LINK_AU,
  },
  {
    titleId: 'support.financialWellness.sections.myFinancialInsights.item3Title',
    subtitleId: 'support.financialWellness.sections.myFinancialInsights.item3Subtitle',
    imgSrc: images.financialInsightsAU3,
    url: FINANCIAL_WELLNESS_SMALL_BUSINESS_DEBT_HELPLINE_LINK_AU,
  },
];

const financialInsightUkItems: FinancialInsightItem[] = [
  {
    titleId: 'support.financialWellness.sections.myFinancialInsights.item1Title',
    subtitleId: 'support.financialWellness.sections.myFinancialInsights.item1Subtitle',
    imgSrc: images.financialInsightsUK1,
    url: FINANCIAL_WELLNESS_MONEY_HELPER_LINK_UK,
  },
  {
    titleId: 'support.financialWellness.sections.myFinancialInsights.item2Title',
    subtitleId: 'support.financialWellness.sections.myFinancialInsights.item2Subtitle',
    imgSrc: images.financialInsightsUK2,
    url: FINANCIAL_WELLNESS_CITIZEN_ADVICE_LINK_UK,
  },
  {
    titleId: 'support.financialWellness.sections.myFinancialInsights.item3Title',
    subtitleId: 'support.financialWellness.sections.myFinancialInsights.item3Subtitle',
    imgSrc: images.financialInsightsUK3,
    url: FINANCIAL_WELLNESS_NATIONAL_DEBT_HELPLINE_LINK_UK,
  },
];

const carouselImgWidth = scale(171, 'width');
const carouselImgHeight = (carouselImgWidth * 100) / 171;

const imgWidth = scale(60, 'width');
const imgHeight = scale(60, 'height');

export const FinancialWellnessScreen = () => {
  const navigation = useNavigation<SupportStackNavigationProp<'FinancialWellness'>>();
  const { colors, fontSizes, radii, space } = useTheme();
  const { formatMessage } = useIntl();
  const RegionLocale = useRegionLocalisation();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { openUrl } = useInAppBrowser();
  const {
    trackPressDisableEarnedWageAccessFeatures,
    trackPressFinancialWellnessLink,
    trackPressManageYourWageAccessSettings,
  } = useSupportTracking();
  const [openDisableEwaFeaturesBottomSheet, setOpenDisableEwaFeaturesBottomSheet] = useState(false);
  const { isLoading: disablingEwaFeatures, mutateAsync: disableEwaFeatures } =
    useDisableEarnedWageAccessFeaturesMutation();
  const Toast = useToast();
  const isAccountUK = useIsAccountUK();
  const isRebrand = !!useSessionStore().swagTextAndImageRebrandEnabled;

  const onDisableEwaBtnPressed = async () => {
    try {
      const resp = await disableEwaFeatures({});
      if (
        !isInstapayError(resp) &&
        (resp.instapay?.disableEarnedWageAccessFeatures as DisableEarnedWageAccessFeaturesPayload)?.success
      ) {
        Toast.show({ content: formatMessage({ id: 'support.financialWellness.disableEwaFeatures.success' }) });
      } else {
        Toast.show({ content: formatMessage({ id: 'support.financialWellness.disableEwaFeatures.failure' }) });
      }
    } catch {
      Toast.show({ content: formatMessage({ id: 'support.financialWellness.disableEwaFeatures.failure' }) });
    } finally {
      setOpenDisableEwaFeaturesBottomSheet(false);
      trackPressDisableEarnedWageAccessFeatures();
    }
  };

  const onCloseDisableEwaFeaturesBottomSheet = () => setOpenDisableEwaFeaturesBottomSheet(false);

  const onBack = () => {
    navigation.goBack();
  };

  const onItemPress = (url: FinancialWellnessLink) => {
    openUrl(url);
    trackPressFinancialWellnessLink(url);
  };

  const onManageYourWageAccessSettingsPress = () => {
    setOpenDisableEwaFeaturesBottomSheet(true);
    trackPressManageYourWageAccessSettings();
  };
  const renderFinancialInsightCarouselItem: ListRenderItem<FinancialInsightCarouselItem> = ({ index, item }) => (
    <TouchableOpacity
      testID={`financial-insight-carousel-item-${index}`}
      onPress={() => onItemPress(item.url)}
      activeOpacity={0.5}
      style={{ width: carouselImgWidth, marginHorizontal: space.xsmall }}
    >
      <Box key={item.titleId} style={{ width: carouselImgWidth }}>
        <Box
          style={{
            borderRadius: radii.medium,
            overflow: 'hidden',
          }}
        >
          <Image
            source={item.imgSrc}
            resizeMode="cover"
            style={{
              width: carouselImgWidth,
              height: carouselImgHeight,
            }}
          />
        </Box>
        <Typography.Title
          level="h6"
          typeface="neutral"
          style={{
            marginTop: space.small,
            fontSize: fontSizes.medium,
            fontWeight: '600',
            lineHeight: 20,
          }}
        >
          {formatMessage({ id: item.titleId })}
        </Typography.Title>
        <Typography.Caption intent="subdued" style={{ marginTop: space.small, fontSize: fontSizes.small }}>
          {formatMessage(
            { id: 'support.financialWellness.sections.myFinancialInsights.readTime' },
            { minutesReading: item.minutesReading }
          )}
        </Typography.Caption>
      </Box>
    </TouchableOpacity>
  );

  const financialInsightItems = isAccountUK ? financialInsightUkItems : financialInsightAuItems;
  const renderFinancialInsightItem: ListRenderItem<FinancialInsightItem> = ({ index, item }) => (
    <TouchableOpacity
      testID={`financial-insight-item-${index}`}
      onPress={() => onItemPress(item.url)}
      activeOpacity={0.5}
    >
      <Box
        padding="medium"
        display="flex"
        flexDirection="row"
        alignItems="center"
        backgroundColor="defaultGlobalSurface"
        borderRadius="xlarge"
        marginTop="small"
      >
        <Box
          style={{
            borderRadius: radii.medium,
            overflow: 'hidden',
          }}
        >
          <Image
            source={item.imgSrc}
            resizeMode="cover"
            style={{
              width: imgWidth,
              height: imgHeight,
            }}
          />
        </Box>
        <Box flex={1} marginLeft="smallMedium">
          <Typography.Title
            level="h6"
            typeface="neutral"
            style={{
              fontSize: fontSizes.medium,
              fontWeight: '400',
              lineHeight: 20,
            }}
          >
            {RegionLocale.formatMessage({ id: item.titleId })}
          </Typography.Title>
          <Typography.Caption intent="subdued" style={{ marginTop: space.xsmall }}>
            {RegionLocale.formatMessage({ id: item.subtitleId })}
          </Typography.Caption>
        </Box>
        <Icon icon="external-link" size="small" intent="primary" />
      </Box>
    </TouchableOpacity>
  );

  return (
    <>
      <CustomStatusBar backgroundColor={colors.neutralGlobalSurface} />
      <Page.TopBar
        backgroundColor="neutralGlobalSurface"
        title={formatMessage({ id: 'support.financialWellness.title' })}
        hideRight
        onBack={onBack}
      />
      <Page
        style={{ paddingBottom: bottomInset, backgroundColor: colors.neutralGlobalSurface }}
        showsVerticalScrollIndicator={false}
      >
        <Page.Title>{formatMessage({ id: 'support.financialWellness.heading' })}</Page.Title>
        <Page.Body>
          <Typography.Title typeface="playful" level="h5" style={{ fontSize: fontSizes.xlarge }}>
            {formatMessage({ id: 'support.financialWellness.sections.myFinancialInsights.title' })}
          </Typography.Title>
          <Box style={{ marginHorizontal: -space.medium, marginTop: space.smallMedium }}>
            <FlatList
              data={getFinancialInsightCarouselItems(isRebrand)}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: space.medium - space.xsmall }}
              keyExtractor={item => item.titleId}
              renderItem={renderFinancialInsightCarouselItem}
            />
          </Box>
          <Box marginTop="medium">
            <FlatList data={financialInsightItems} renderItem={renderFinancialInsightItem} />
          </Box>
          <Typography.Title typeface="playful" level="h5" style={{ marginTop: space.large }}>
            {formatMessage({ id: 'support.financialWellness.sections.needMoreHelp.title' })}
          </Typography.Title>
          <List.Item
            testID="manage-your-wage-access-setting-cta"
            style={{ marginVertical: space.small }}
            variant="card"
            title={formatMessage({ id: 'support.financialWellness.sections.needMoreHelp.manageYourWageAccess.title' })}
            onPress={onManageYourWageAccessSettingsPress}
            suffix={<Icon icon="arrow-right" intent="primary" />}
          />
          <BottomSheet
            showCloseButton
            header={
              <Typography.Title style={{ padding: space.small }} level="h5">
                {formatMessage({
                  id: 'support.financialWellness.sections.needMoreHelp.manageYourWageAccess.bottomSheet.header',
                })}
              </Typography.Title>
            }
            footer={
              <Box flexDirection="row" justifyContent="flex-end">
                <Button
                  testID="close-disable-ewa-features-bs-button"
                  variant="text"
                  intent="primary"
                  disabled={disablingEwaFeatures}
                  text={formatMessage({
                    id: 'support.financialWellness.sections.needMoreHelp.manageYourWageAccess.bottomSheet.cancel',
                  })}
                  onPress={onCloseDisableEwaFeaturesBottomSheet}
                />
                <Button
                  testID="disable-ewa-features-button"
                  variant="text"
                  intent="danger"
                  text={formatMessage({
                    id: 'support.financialWellness.sections.needMoreHelp.manageYourWageAccess.bottomSheet.disable',
                  })}
                  loading={disablingEwaFeatures}
                  onPress={onDisableEwaBtnPressed}
                />
              </Box>
            }
            onRequestClose={onCloseDisableEwaFeaturesBottomSheet}
            open={openDisableEwaFeaturesBottomSheet}
          >
            <Typography.Body
              style={{ marginHorizontal: space.large, marginTop: space.small, marginBottom: space.medium }}
            >
              {formatMessage({
                id: 'support.financialWellness.sections.needMoreHelp.manageYourWageAccess.bottomSheet.content',
              })}
            </Typography.Body>
          </BottomSheet>
        </Page.Body>
      </Page>
    </>
  );
};
