import React from 'react';
import { Box, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { SectionHeader } from './SectionHeader';
import { useGetSuperAppToken } from '../../../../common/auth/store/useSuperAppTokenStore';
import { DataCard } from '../../../../common/components/data-card';
import { usePermissionStore } from '../../../../common/stores/usePermissionStore';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import { isEnabledForEh } from '../../../../common/types/react-query';
import type { SupportedCurrency } from '../../../../common/utils/numbers';
import { FALLBACK_CURRENCY, createCurrencyFormatter } from '../../../../common/utils/numbers';
import { usePickForYouQuery } from '../../../../graphql/generated';
import type { RootStackNavigationProp } from '../../../../navigation/navigationTypes';
import type { Product } from '../../../../new-graphql/generated';
import { OfferSkeleton } from '../../cash-back/components/skeletons/OfferSkeleton';
import { useServiceFeeFeature } from '../shop/hooks/useServiceFeeFeature';
import { prepareDataBeforeNavigate } from '../shop/store/useDiscountShopStore';

export const FeatureOffers = () => {
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  const featuredOffersPermission = usePermissionStore(state => state.permissions?.superAppBenefitsFeaturedOffers?.view);
  const { space } = useTheme();
  const { loginProvider, token } = useGetSuperAppToken('FeatureOffers');
  const orgId = useSessionStore(state => state.currentOrgId ?? '');
  const { getPriceWithFee } = useServiceFeeFeature();
  const {
    data: featuredOffer,
    isError,
    isLoading: isLoadingPickForYou,
  } = usePickForYouQuery(
    { ehToken: token ?? '', orgId },
    { enabled: isEnabledForEh(token, loginProvider) && featuredOffersPermission && !!orgId }
  );
  const featuredOffersLength = featuredOffer?.pickForYou?.items?.length ?? 0;
  const randomIndex = Math.floor(Math.random() * featuredOffersLength);
  const featuredProduct = featuredOffer?.pickForYou?.items[randomIndex];
  const formatCurrency = createCurrencyFormatter();
  const isEmptyAfterFetch = !isLoadingPickForYou && !featuredProduct && !isError;

  if (isError || !featuredOffersPermission || isEmptyAfterFetch) {
    return null;
  }

  const { currency, discountPrice, image, name, price, serviceFee } = featuredProduct ?? {
    discountPrice: 0,
    image: {
      url: '',
    },
    name: '',
    price: 0,
    productCode: '',
    serviceFee: 0,
  };

  const productCurrency = (currency ?? FALLBACK_CURRENCY) as SupportedCurrency;
  const priceDisplay = (
    <Box flexDirection="row" marginTop="small">
      {price ? (
        <Typography.Caption
          intent="subdued"
          accessibilityLabel="Original Price"
          style={{
            textDecorationLine: 'line-through',
            marginRight: space.small,
          }}
        >
          {formatCurrency(getPriceWithFee(price, serviceFee), { currency: productCurrency })}
        </Typography.Caption>
      ) : null}
      <Typography.Caption accessibilityLabel="Sale Price" intent="subdued">
        {formatCurrency(getPriceWithFee(discountPrice, serviceFee), { currency: productCurrency })}
      </Typography.Caption>
    </Box>
  );

  const navigateToProductDetail = (item?: Product) => {
    if (item) {
      prepareDataBeforeNavigate(item, 'featured section');

      navigation.navigate('BenefitsStack', {
        screen: 'DiscountShopStack',
        params: {
          screen: 'ProductDetail',
          params: {
            productCode: item.productCode,
          },
        },
      });
    }
  };

  const renderBody = () => {
    if (isLoadingPickForYou) {
      return <OfferSkeleton />;
    }

    return (
      <DataCard
        accessibilityLabel="Feature item"
        data={[
          {
            label: 'Featured',
            content: name,
            bottomLabel: priceDisplay,
          },
        ]}
        thumbnailSource={image.url ? { uri: image.url } : undefined}
        onPress={() => navigateToProductDetail(featuredProduct)}
        hideIcon
        imageContain
      />
    );
  };

  return (
    <Box marginBottom="xlarge">
      <SectionHeader style={{ marginBottom: space.medium }} title="Featured offers" />
      {renderBody()}
    </Box>
  );
};
