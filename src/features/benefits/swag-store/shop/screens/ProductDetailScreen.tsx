import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet } from 'react-native';
import { Box, Spinner, Typography, useTheme } from '@hero-design/rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StripeProvider } from '@stripe/stripe-react-native';
import { useGetSuperAppToken } from '../../../../../common/auth/store/useSuperAppTokenStore';
import { CurrencyText } from '../../../../../common/components/currency-text/CurrencyText';
import { GeneralError } from '../../../../../common/components/error';
import { Page } from '../../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../../common/components/status-bar/CustomStatusBar';
import { useToast } from '../../../../../common/shared-hooks/useToast';
import { useSessionStore } from '../../../../../common/stores/useSessionStore';
import { isEnabledForEh } from '../../../../../common/types/react-query';
import { createCurrencyFormatter, type SupportedCurrency } from '../../../../../common/utils/numbers';
import { FALLBACK_CURRENCY } from '../../../../../common/utils/numbers';
import {
  useGetDiscountShopProductDetailQuery,
  useGetStripePublishableKeyQuery,
  useGetHeroPointsBalanceQuery,
} from '../../../../../new-graphql/generated';
import { useIntl } from '../../../../../providers/LocalisationProvider';
import { roundNum } from '../../../common/utils/calculations';
import { MINIMUM_STRIPE_AMOUNT } from '../../constants';
import { useSwagStoreTracking } from '../../hooks/useSwagStoreTracking';
import { MultiVariantAmountSelect } from '../components/MultiVariantAmountSelect';
import { PaymentForOrder } from '../components/PaymentForOrder';
import { PayNowButton } from '../components/PayNowButton';
import { PriceBoxV2 } from '../components/PriceBox';
import { ProductDetailsAccordion } from '../components/ProductDetailsAccordion';
import { VariantQuantitySelect, type VariantsWithQuantity } from '../components/VariantQuantitySelect';
import { useConfirmOrder } from '../hooks/useConfirmOrder';
import { useOrderPriceCalculator } from '../hooks/useOrderPriceCalculator';
import { usePaymentMethod } from '../hooks/usePaymentMethod';
import { useServiceFeeFeature } from '../hooks/useServiceFeeFeature';
import type { DiscountShopNavigationProp, DiscountShopRouteProp } from '../navigation/navigationTypes';
import {
  getProductDetailFromStore,
  useDiscountShopStore,
  updateProductDetailWithFreshData,
  cleanUpProductDetail,
} from '../store/useDiscountShopStore';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const IMAGE_HEIGHT = (141 * screenHeight) / 844;
const IMAGE_WIDTH = (204 * screenWidth) / 390;

const formatCurrency = createCurrencyFormatter();

export const ProductDetailScreen = () => {
  const navigation = useNavigation<DiscountShopNavigationProp<'ProductDetail'>>();
  const {
    params: { productCode },
  } = useRoute<DiscountShopRouteProp<'ProductDetail'>>();
  const { formatMessage } = useIntl();
  const Toast = useToast();

  const { loginProvider, token } = useGetSuperAppToken('ProductDetailScreen');
  const orgId = useSessionStore(state => state.currentOrgId) ?? '';
  const productDetailFromStore = getProductDetailFromStore();
  const location = useDiscountShopStore(state => state.location ?? '');
  const [variantsWithQuantity, setVariantsWithQuantity] = useState<VariantsWithQuantity[]>([]);
  const { getPriceWithFee } = useServiceFeeFeature();
  const [payButtonAreaHeight, setPayButtonAreaHeight] = useState(0);
  const [discountPriceInPoints, setDiscountPriceInPoints] = useState(0);
  const [discountPriceWithServiceFee, setDiscountPriceWithServiceFee] = useState(0);

  const {
    data: res,
    isError: isErrorProductDetail,
    isLoading: isLoadingProductDetail,
  } = useGetDiscountShopProductDetailQuery(
    {
      input: {
        productCode,
        orgId,
      },
    },
    { enabled: !!orgId && isEnabledForEh(token, loginProvider) }
  );

  const productDetail = res?.me?.swagStore?.discountShopProductDetails?.product || productDetailFromStore;

  const {
    currency,
    discountPrice = 0,
    image,
    name,
    price = 0,
    productType = '',
    serviceFee,
    title = '',
  } = productDetail ?? {};
  const [savedAmount, setSavedAmount] = useState(0);

  const variants = productDetail?.productVariants;

  const productCurrency = (currency ?? FALLBACK_CURRENCY) as SupportedCurrency;

  useEffect(() => {
    if (productDetail) {
      setDiscountPriceInPoints(productDetail.discountPriceInPoints || 0);
    }
  }, [productDetail]);

  useEffect(() => {
    if (discountPrice) {
      const priceWithFee = getPriceWithFee(discountPrice, serviceFee);
      setDiscountPriceWithServiceFee(priceWithFee);
      setSavedAmount(roundNum(price - priceWithFee));
    }
  }, [serviceFee]);

  const {
    data: stripePublicKeyData,
    isError: isStripeKeyError,
    isLoading: isStripeKeyLoading,
  } = useGetStripePublishableKeyQuery(
    { input: { currency: currency as SupportedCurrency, orgId } },
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
      enabled:
        isEnabledForEh(token, loginProvider) &&
        // make sure currency loaded
        !!currency,
    }
  );

  const { data: pointsData, isLoading: isPointsLoading } = useGetHeroPointsBalanceQuery(
    {},
    {
      enabled: isEnabledForEh(token, loginProvider),
    }
  );

  const stripePublishableKey = stripePublicKeyData?.me?.swagStore?.stripePublishableKey?.publishableKey ?? '';

  const { orderAmount, orderAmountInPoints, totalServiceFee } = useOrderPriceCalculator({
    variantsWithQuantity,
    serviceFee: serviceFee ?? 0,
  });

  const pointsBalance = pointsData?.me?.heroPoints?.balance ?? 0;

  const {
    amountToPayViaCard,
    amountToPayViaCardAfterFee,
    cardFee,
    maxSpendablePoints,
    pointsToPay,
    ready2Purchase,
    setPointsToPay,
    validAmountToPayViaCard,
  } = usePaymentMethod({
    orderAmount,
    orderAmountInPoints,
    pointsBalance,
    cardFeeRate: productDetail?.transactionFee ?? 0,
  });

  const { isPurchasing, submitPayment } = useConfirmOrder({
    amountByCard: amountToPayViaCard,
    amountByCardAfterFee: amountToPayViaCardAfterFee,
    currency: productCurrency,
    heroPoints: pointsToPay,
    totalServiceFee,
    variantsWithQuantity,
    product: productDetail,
  });

  useEffect(() => {
    if (res?.me?.swagStore?.discountShopProductDetails?.product?.id) {
      updateProductDetailWithFreshData(res.me.swagStore.discountShopProductDetails.product);
    }
  }, [res?.me?.swagStore?.discountShopProductDetails?.product]);

  useEffect(() => {
    return () => {
      cleanUpProductDetail();
    };
  }, []);

  const renderVariantSelection = () => {
    if (!productDetail) {
      return null;
    }

    const hasMultipleActiveVariants = variants && variants?.filter(v => v.status.toLowerCase() === 'active').length > 1;
    if (productType === 'giftcard' && hasMultipleActiveVariants) {
      return (
        <MultiVariantAmountSelect
          product={productDetail}
          currency={productCurrency}
          onSelected={variant => {
            setVariantsWithQuantity([
              {
                ...variant,
                selectedQuantity: 1,
                currency: productCurrency,
                serviceFee: productDetail.serviceFee ?? 0,
              },
            ]);
            setSavedAmount(roundNum(variant.price - getPriceWithFee(variant.discountPrice, serviceFee ?? 0)));
            setDiscountPriceWithServiceFee(getPriceWithFee(variant.discountPrice, serviceFee ?? 0));
            setDiscountPriceInPoints(variant.discountPriceInPoints ?? 0);
          }}
        />
      );
    }

    return (
      <VariantQuantitySelect
        product={productDetail}
        variantsWithQuantity={variantsWithQuantity}
        onQuantityChanged={setVariantsWithQuantity}
      />
    );
  };

  // Initialize purchasable variants with default quantity
  useEffect(() => {
    if (!variants) {
      return;
    }

    const hasMultipleActiveVariants = variants.filter(v => v.status.toLowerCase() === 'active').length > 1;

    if (productType === 'giftcard' && hasMultipleActiveVariants) {
      return;
    }

    if (productType === 'ticket') {
      setVariantsWithQuantity(
        variants.map(variant => ({
          ...variant,
          selectedQuantity: 0,
          currency: productCurrency,
          serviceFee: serviceFee ?? 0,
        }))
      );
      return;
    }

    const [variant] = variants;
    setVariantsWithQuantity([
      {
        ...variant,
        selectedQuantity: variant.stockAvailable ? 1 : 0,
        currency: productCurrency,
        serviceFee: serviceFee ?? 0,
      },
    ]);
  }, [productCurrency, variants, serviceFee, productType]);

  // Show error if pay with credit card with amount < MINIMUM_STRIPE_AMOUNT
  useEffect(() => {
    if (!validAmountToPayViaCard) {
      Toast.show({
        content: formatMessage(
          { id: 'benefits.swagStore.payment.minimumAmountViaCardError' },
          { amount: formatCurrency(MINIMUM_STRIPE_AMOUNT, { currency: productCurrency }) }
        ),
        intent: 'error',
      });
    }
  }, [Toast, currency, formatMessage, productCurrency, validAmountToPayViaCard]);

  const { colors, space } = useTheme();
  const { trackConfirmOrder } = useSwagStoreTracking();

  const isLoading = isLoadingProductDetail || isStripeKeyLoading || isPointsLoading;

  const onConfirmPayment = () => {
    trackConfirmOrder({
      productName: title,
      productCategory: productType,
      source: location,
      variants: variantsWithQuantity
        .filter(v => v.selectedQuantity > 0)
        .map(v => ({
          quantity: v.selectedQuantity,
          variantCode: v.variantCode,
        })),
      paymentMethod: {
        creditCard: amountToPayViaCard,
        heroPoints: pointsToPay,
        instapay: 0,
      },
      serviceFee: serviceFee ?? 0,
    });
    submitPayment();
  };

  const renderBody = () => {
    // Show loading spinner if loading product detail and now data in cache
    if (isLoadingProductDetail && !productDetail) {
      return (
        <Box style={StyleSheet.absoluteFill}>
          <Spinner testID="screen-loading-spinner" />
        </Box>
      );
    }
    // Show error if failed to load product detail
    // Or stripe is failed to initialize
    if (isStripeKeyError || isErrorProductDetail) {
      return <GeneralError themeName="eBens" />;
    }

    return (
      <ScrollView
        testID="product-detail-screen"
        style={{ backgroundColor: colors.neutralGlobalSurface }}
        contentContainerStyle={{ paddingHorizontal: 0 }}
      >
        {/* Product image, name, price, variant + quantity */}
        <Box paddingBottom="large" backgroundColor="defaultGlobalSurface">
          {/* Image */}
          <Box borderRadius="large" alignSelf="center" borderWidth="base" borderColor="secondaryOutline">
            <Image
              resizeMode="contain"
              accessibilityLabel="Main image"
              style={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT }}
              source={{
                uri: image?.url ?? '',
              }}
            />
          </Box>
          <Box
            alignItems="center"
            borderRadius="5xlarge"
            backgroundColor="neutralGlobalSurface"
            paddingHorizontal="small"
            paddingVertical="xsmall"
            alignSelf="center"
            style={{
              marginTop: -space.small,
            }}
          >
            <Typography.Body variant="small-bold">
              {formatMessage({ id: 'benefits.swagStore.savedAmountPrefix' })}
              <CurrencyText
                currency={productCurrency}
                amount={savedAmount}
                renderDecimal={v => <Typography.Body variant="small-bold">{v}</Typography.Body>}
                renderCurrency={v => <Typography.Body variant="small-bold">{v}</Typography.Body>}
              />
            </Typography.Body>
          </Box>
          <Typography.Title
            level="h5"
            testID="title"
            style={{
              marginTop: space.medium,
              marginBottom: space.medium,
              marginHorizontal: space.medium,
              textAlign: 'center',
            }}
          >
            {name}
          </Typography.Title>
          <PriceBoxV2
            style={{ marginHorizontal: space.medium, marginBottom: space.medium }}
            priceInPoints={discountPriceInPoints}
            discountPrice={discountPriceWithServiceFee}
            currency={productCurrency}
            multiVariants={variantsWithQuantity.length > 1}
          />

          {renderVariantSelection()}
        </Box>

        {/* Payment details */}
        <PaymentForOrder
          cardFee={cardFee}
          cardFeeRate={productDetail?.transactionFee ?? 0}
          currency={productCurrency}
          amountToPayViaCard={amountToPayViaCard}
          maxSpendablePoints={maxSpendablePoints}
          pointsToPay={pointsToPay}
          setPointsToPay={setPointsToPay}
        />
        {!!productDetail && <ProductDetailsAccordion product={productDetail} />}

        {/* Workaround to make sure that the Pay button doesn't cover the content in the bottom of the screen */}
        <Box style={{ width: '100%', height: payButtonAreaHeight + space.medium }} />
      </ScrollView>
    );
  };

  return (
    <StripeProvider publishableKey={stripePublishableKey}>
      <CustomStatusBar backgroundColor={colors.defaultGlobalSurface} />
      <Page.TopBar backgroundColor="defaultGlobalSurface" onBack={navigation.goBack} hideRight />

      {renderBody()}

      {/* Hidden overlay to prevent user from interacting when submitting purchase request */}
      {isPurchasing ? <Box style={StyleSheet.absoluteFill} /> : <></>}

      {!productDetail ? (
        <></>
      ) : (
        <PayNowButton
          onButtonAreaHeightChange={setPayButtonAreaHeight}
          pointsToPay={pointsToPay}
          amountToPayViaCardAfterFee={amountToPayViaCardAfterFee}
          orderAmount={orderAmount}
          isLoading={isPurchasing || isLoading}
          disabled={!ready2Purchase}
          onPressed={onConfirmPayment}
          productCurrency={productCurrency}
        />
      )}
    </StripeProvider>
  );
};
