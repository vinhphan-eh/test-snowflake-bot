import { useCallback, useState } from 'react';
import { Platform } from 'react-native';
import { eBensSystemPalette } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import {
  initPaymentSheet,
  PaymentSheetError,
  presentPaymentSheet,
  type StripeError,
} from '@stripe/stripe-react-native';
import { useGetSuperAppToken } from '../../../../../common/auth/store/useSuperAppTokenStore';
import { appVersion } from '../../../../../common/libs/appVersion';
import { queryClient } from '../../../../../common/libs/queryClient';
import { useSessionStore } from '../../../../../common/stores/useSessionStore';
import { getEnvConfig } from '../../../../../common/utils/env';
import { generateUUID, type SupportedCurrency } from '../../../../../common/utils/numbers';
import type { ShopProductDetails } from '../../../../../new-graphql/generated';
import {
  useCreateStripeClientTokenMutation,
  useGetHeroPointsBalanceQuery,
  useMakeStripePaymentMutation,
} from '../../../../../new-graphql/generated';
import type { UserPaymentSelection } from '../../../common/types/UserPaymentSelection';
import { useSwagStoreTracking } from '../../hooks/useSwagStoreTracking';
import type { VariantsWithQuantity } from '../components/VariantQuantitySelect';
import type { DiscountShopNavigationProp } from '../navigation/navigationTypes';

const { CURRENT_PERSONAL_VERSION } = appVersion;

const customStripeAppearance = {
  shapes: {
    borderRadius: 12,
    borderWidth: 0.5,
  },
  primaryButton: {
    shapes: {
      borderRadius: 20,
    },
  },
  colors: {
    primary: eBensSystemPalette.primary,
    background: '#ffffff',
    componentBackground: '#ffffff',
    componentBorder: eBensSystemPalette.archived,
    componentDivider: '#000000',
    primaryText: '#000000',
    secondaryText: '#000000',
    componentText: '#000000',
    placeholderText: '#73757b',
  },
};

const MAP_CURRENCY_SYMBOL: Partial<Record<SupportedCurrency, string>> = {
  AUD: 'AU$',
  GBP: '£',
  NZD: 'NZ$',
};

export const getStripePaymentSheetCustomLabel = (amount: number, currency: SupportedCurrency) => {
  return `Pay ${MAP_CURRENCY_SYMBOL[currency] ?? '$'}${amount}`;
};

const usePayViaCreditCard = (amountByCardAfterFee: number, currency: SupportedCurrency) => {
  const orgId = useSessionStore(state => state.currentOrgId ?? '');
  const { token: superAppToken } = useGetSuperAppToken('usePayViaCreditCard');
  const { mutateAsync: createStripeToken } = useCreateStripeClientTokenMutation();

  return useCallback(async (): Promise<string> => {
    if (amountByCardAfterFee <= 0) {
      return '';
    }

    const paymentIntentCreation = await createStripeToken({
      createStripeClientTokenInput: {
        ehToken: superAppToken,
        orgId,
        amount: amountByCardAfterFee.toString(),
        currency,
        idempotencyKey: generateUUID(),
      },
    });
    const paymentIntentToken = paymentIntentCreation?.payment?.createStripeClientToken?.clientToken ?? '';

    const { error: errorInit } = await initPaymentSheet({
      paymentIntentClientSecret: paymentIntentToken,
      appearance: customStripeAppearance,
      customFlow: false,
      style: 'alwaysLight',
      merchantDisplayName: 'SWAG',
      primaryButtonLabel: getStripePaymentSheetCustomLabel(amountByCardAfterFee, currency),
    });

    if (errorInit) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw errorInit;
    }

    const { error: errorPayment } = await presentPaymentSheet();
    if (errorPayment) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw errorPayment;
    }

    return paymentIntentToken;
  }, [amountByCardAfterFee, createStripeToken, currency, orgId, superAppToken]);
};

export const useConfirmOrder = ({
  amountByCard,
  amountByCardAfterFee,
  currency,
  heroPoints,
  product,
  totalServiceFee,
  variantsWithQuantity,
}: {
  amountByCard: number;
  amountByCardAfterFee: number;
  heroPoints: number;
  totalServiceFee: number;
  variantsWithQuantity: VariantsWithQuantity[];
  currency: SupportedCurrency;
  product?: Partial<ShopProductDetails>;
}) => {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const navigation = useNavigation<DiscountShopNavigationProp<'ProductDetail'>>();
  const orgId = useSessionStore(state => state.currentOrgId ?? '');
  const { token: superAppToken } = useGetSuperAppToken('useConfirmOrder');
  const { trackCancelCardPayment, trackOrderSuccess } = useSwagStoreTracking();

  const { mutateAsync: submitPurchase } = useMakeStripePaymentMutation();

  const payViaCreditCard = usePayViaCreditCard(amountByCardAfterFee, currency);

  const submitPayment = useCallback(async () => {
    if (!superAppToken) {
      return;
    }

    setIsPurchasing(true);
    try {
      const paymentToken = await payViaCreditCard();

      const userPaymentSelection: UserPaymentSelection = {
        heroPoints,
        creditCard: amountByCard,
        instapay: 0,
      };

      const variantsHasQuantity = variantsWithQuantity.filter(v => v.selectedQuantity > 0);

      const params = {
        ehToken: superAppToken,
        deviceData: '',
        nonce: paymentToken ?? '',
        paymentMethod: {
          heroPoints: String(userPaymentSelection.heroPoints),
          creditCard: String(userPaymentSelection.creditCard),
          instapay: String(userPaymentSelection.instapay),
        },
        items: variantsHasQuantity.map(({ selectedQuantity, variantCode }) => ({
          variantCode,
          quantity: selectedQuantity,
        })),
        orgId,
        ehPlatform: `${Platform.OS}_${CURRENT_PERSONAL_VERSION}`,
      };

      await submitPurchase({
        makeStripePaymentInput: {
          ...params,
          serviceFee: totalServiceFee.toString(),
        },
      });

      if (heroPoints > 0 && getEnvConfig().IS_E2E !== 'true') {
        // reload hero points
        queryClient.invalidateQueries(useGetHeroPointsBalanceQuery.getKey());
      }
      trackOrderSuccess({
        productName: product?.name ?? '',
        productCategory: product?.productType ?? '',
        serviceFee: product?.serviceFee ?? 0,
        variants: variantsHasQuantity.map(v => ({
          variantCode: v.variantCode,
          quantity: v.selectedQuantity,
        })),
        paymentMethod: {
          heroPoints: userPaymentSelection.heroPoints ?? 0,
          creditCard: userPaymentSelection.creditCard ?? 0,
          instapay: userPaymentSelection.instapay ?? 0,
        },
      });
      navigation.replace('PaymentSuccess');
    } catch (e: unknown) {
      const userCancelPayment =
        e &&
        typeof e === 'object' &&
        (e as unknown as StripeError<PaymentSheetError>).code === PaymentSheetError.Canceled;

      if (!userCancelPayment) {
        navigation.replace('PaymentFailed');
      } else {
        trackCancelCardPayment({
          productName: product?.name ?? '',
          productCategory: product?.productType ?? '',
          serviceFee: product?.serviceFee ?? 0,
          variants: variantsWithQuantity.map(v => ({
            variantCode: v.variantCode,
            quantity: v.selectedQuantity,
          })),
          paymentMethod: {
            heroPoints,
            creditCard: amountByCard,
            instapay: 0,
          },
        });
      }
    } finally {
      setIsPurchasing(false);
    }
  }, [
    amountByCard,
    heroPoints,
    navigation,
    orgId,
    payViaCreditCard,
    product?.name,
    product?.productType,
    product?.serviceFee,
    submitPurchase,
    superAppToken,
    totalServiceFee,
    trackCancelCardPayment,
    trackOrderSuccess,
    variantsWithQuantity,
  ]);

  return { submitPayment, isPurchasing };
};
