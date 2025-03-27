import React, { useMemo, useCallback } from 'react';
import type { ViewStyle, StyleProp, ListRenderItem } from 'react-native';
import { FlatList } from 'react-native';
import { Box, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import images from '../../../../common/assets/images';
import { useGetSuperAppToken } from '../../../../common/auth/store/useSuperAppTokenStore';
import { useHeroPointsVisibility } from '../../../../common/hooks/useHeroPointsVisibility';
import { useSpendVisibility } from '../../../../common/hooks/useSpendVisibility';
import { switchPillar } from '../../../../common/stores/useMiniAppSwitcherStore';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import type { ThemeName } from '../../../../common/types/hero-design';
import { isEnabledForEh } from '../../../../common/types/react-query';
import ThemeSwitcher from '../../../../common/utils/ThemeSwitcher';
import type { RootStackNavigationProp } from '../../../../navigation/navigationTypes';
import { useGetHeroPointsBalanceQuery, useGetDiscountShopProductDetailQuery } from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { useCheckCompletelyOnboardCashback } from '../../cash-back/hooks/useCheckCompletelyOnboardCashback';
import type { PromoteWidgetProps } from '../components/PromoteWidget';
import { PromoteWidget } from '../components/PromoteWidget';
import { PromoteWidgetSkeleton } from '../components/skeletons/PromoteWidgetSkeleton';
import { useBenefitsTracking } from '../hooks/useBenefitsTracking';
import { useCashbackPermission } from '../hooks/useCashbackPermission';

type PromoteFeatureWidgetsProps = {
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

type WidgetType = PromoteWidgetProps & { themeName: ThemeName };

interface WidgetProps {
  title: string;
  subTitle: string;
  themeName: string;
  imgSrc: string;
  onPress: () => void;
}

const ZERO_HERO_POINTS_BALANCE = 0;
const PRODUCT_CODE_MV = 'MV';
const VARIANT_CODE_EGOLD_CLASS_SINGLE = 'EGOLD_CLASS_SINGLE';

export const PromoteFeatureWidgets = ({ contentContainerStyle, style }: PromoteFeatureWidgetsProps) => {
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  const Intl = useIntl();
  const { space } = useTheme();
  const { loginProvider, token } = useGetSuperAppToken('PromoteFeatureWidgets');
  const orgId = useSessionStore(state => state.currentOrgId) ?? '';

  const {
    trackClickOnCreateStashCard,
    trackClickOnGiftCardCtaHighHeroPoints,
    trackClickOnLinkCashbackCard,
    trackClickOnMovieCardCtaLowHeroPoints,
    trackClickOnMovieCardCtaNoHeroPoints,
  } = useBenefitsTracking();

  const { isLoading: isLoadingCashbackPermission, permission: cashbackPermission } = useCashbackPermission();
  const {
    isCompleted: completedCashbackOnboard,
    isError: isErrorCashback,
    isLoading: isCheckingCashbackOnboard,
  } = useCheckCompletelyOnboardCashback();
  const heroPointsPermission = useHeroPointsVisibility();
  const { data: transactionsRes, isError: isHeroPointsBalanceError } = useGetHeroPointsBalanceQuery(
    {},
    { enabled: heroPointsPermission }
  );
  const heroPointsBalance = transactionsRes?.me?.heroPoints?.balance || 0;

  const { isError: isErrorSpendVisibility, isLoading: isLoadingStashPermission, showStashTab } = useSpendVisibility();
  const isLoading = isLoadingCashbackPermission || isCheckingCashbackOnboard || isLoadingStashPermission;
  const showLinkCard = cashbackPermission && completedCashbackOnboard;

  const { data: res, isError: isErrorProductDetail } = useGetDiscountShopProductDetailQuery(
    {
      input: {
        productCode: PRODUCT_CODE_MV,
        orgId,
      },
    },
    { enabled: !!orgId && isEnabledForEh(token, loginProvider) }
  );

  const eGoldClassSingleVariant = useMemo(() => {
    const productDetail = res?.me?.swagStore?.discountShopProductDetails?.product;
    const variants = productDetail?.productVariants ?? [];
    return variants.find(variant => variant.variantCode === VARIANT_CODE_EGOLD_CLASS_SINGLE);
  }, [res]);

  const createWidgetProps = useCallback(
    ({ imgSrc, onPress, subTitle, themeName, title }: WidgetProps) => ({
      title,
      subTitle,
      themeName,
      imgSrc,
      onPress,
      style: {
        marginRight: space.smallMedium,
        marginTop: space.large,
      },
      accessibilityLabel: `${Intl.formatMessage({ id: 'benefits.widgets.createAStash' })} container`,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [space]
  );

  const createOfferWidgets = useCallback(() => {
    if (isHeroPointsBalanceError || isErrorProductDetail || !eGoldClassSingleVariant) {
      return [];
    }

    if (heroPointsBalance === ZERO_HERO_POINTS_BALANCE) {
      return [
        createWidgetProps({
          title: Intl.formatMessage({ id: 'benefits.widgets.noHeroPointsCard.title' }),
          subTitle: Intl.formatMessage({ id: 'benefits.widgets.noHeroPointsCard.subTitle' }),
          themeName: 'eBens',
          imgSrc: images.movieTicketCardTile,
          onPress: () => {
            trackClickOnMovieCardCtaNoHeroPoints();
            navigation.navigate('BenefitsStack', {
              screen: 'DiscountShopStack',
              params: { screen: 'ProductDetail', params: { productCode: PRODUCT_CODE_MV } },
            });
          },
        }),
      ];
    }

    if (
      eGoldClassSingleVariant?.discountPriceInPoints &&
      heroPointsBalance <= eGoldClassSingleVariant.discountPriceInPoints
    ) {
      return [
        createWidgetProps({
          title: Intl.formatMessage({ id: 'benefits.widgets.lowHeroPointsCard.title' }),
          subTitle: Intl.formatMessage(
            { id: 'benefits.widgets.lowHeroPointsCard.subTitle' },
            { points: heroPointsBalance }
          ),
          themeName: 'eBens',
          imgSrc: images.movieTicketCardTile,
          onPress: () => {
            trackClickOnMovieCardCtaLowHeroPoints();
            navigation.navigate('BenefitsStack', {
              screen: 'DiscountShopStack',
              params: { screen: 'ProductDetail', params: { productCode: PRODUCT_CODE_MV } },
            });
          },
        }),
      ];
    }

    return [
      createWidgetProps({
        title: Intl.formatMessage({ id: 'benefits.widgets.highHeroPointsCard.title' }),
        subTitle: Intl.formatMessage(
          { id: 'benefits.widgets.highHeroPointsCard.subTitle' },
          { points: heroPointsBalance }
        ),
        themeName: 'eBens',
        imgSrc: images.giftCardTile,
        onPress: () => {
          trackClickOnGiftCardCtaHighHeroPoints();
          navigation.navigate('BenefitsStack', {
            screen: 'GeneralSearchScreen',
            params: { defaultCategory: { code: 'giftcard', name: 'Gift cards' } },
          });
        },
      }),
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHeroPointsBalanceError, isErrorProductDetail, eGoldClassSingleVariant, heroPointsBalance, createWidgetProps]);

  const data = useMemo(() => {
    const widgets = [...createOfferWidgets()];

    if (showLinkCard) {
      widgets.push(
        createWidgetProps({
          title: Intl.formatMessage({ id: 'benefits.widgets.linkACardStartEarnCashback' }),
          subTitle: Intl.formatMessage({ id: 'benefits.widgets.linkACard' }),
          themeName: 'eBens',
          imgSrc: images.cashbackLinkCardTile,
          onPress: () => {
            trackClickOnLinkCashbackCard('benefits-home');
            navigation.navigate('BenefitsStack', {
              screen: 'CardLinkOffersStack',
              params: { screen: 'AddCardCashbackDashboard' },
            });
          },
        })
      );
    }

    if (showStashTab) {
      widgets.push(
        createWidgetProps({
          title: Intl.formatMessage({ id: 'benefits.widgets.saveForWhatYouWant' }),
          subTitle: Intl.formatMessage({ id: 'benefits.widgets.createAStash' }),
          themeName: 'wallet',
          imgSrc: images.createStashTile,
          onPress: () => {
            trackClickOnCreateStashCard('benefits-home');
            switchPillar({ to: { pillarId: 'WalletApp', tab: 'stash-tab' } });
          },
        })
      );
    }

    return widgets;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createOfferWidgets, showLinkCard, showStashTab, createWidgetProps]);

  const emptyListAfterFetch = !isLoading && data.length === 0;

  if (emptyListAfterFetch) {
    return null;
  }

  if (isLoading && !isErrorCashback && !isErrorSpendVisibility) {
    return (
      <Box testID="skeleton-loading" marginLeft="medium" marginTop="large" flexDirection="row">
        <PromoteWidgetSkeleton style={{ marginRight: space.smallMedium }} />
        <PromoteWidgetSkeleton />
      </Box>
    );
  }

  const renderItem: ListRenderItem<WidgetType> = ({ index, item }) => (
    <ThemeSwitcher key={index} name={item.themeName}>
      <PromoteWidget {...item} />
    </ThemeSwitcher>
  );

  return (
    <FlatList
      accessibilityLabel="Promote Widgets List"
      showsHorizontalScrollIndicator={false}
      horizontal
      testID="promote-feature-widgets-list"
      style={[style, { flexGrow: 0, flexShrink: 1 }]}
      contentContainerStyle={[contentContainerStyle]}
      data={data as WidgetType[]}
      renderItem={renderItem}
    />
  );
};
