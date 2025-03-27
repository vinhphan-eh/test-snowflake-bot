import React from 'react';
import { Dimensions } from 'react-native';
import { useTheme, Button, Box } from '@hero-design/rn';
import Clipboard from '@react-native-clipboard/clipboard';
import { useNavigation, useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import { BarcodeCreatorView, BarcodeFormat } from 'react-native-barcode-creator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Page } from '../../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../../common/components/status-bar/CustomStatusBar';
import { useInAppBrowser } from '../../../../../common/shared-hooks/useInAppBrowser';
import { useToast } from '../../../../../common/shared-hooks/useToast';
import type { SupportedCurrency } from '../../../../../common/utils/numbers';
import { FALLBACK_CURRENCY, createCurrencyFormatter } from '../../../../../common/utils/numbers';
import { OrderProductType } from '../../../../../new-graphql/generated';
import { useIntl } from '../../../../../providers/LocalisationProvider';
import { GiftCardStatus } from '../../../common/screens/orders/components/GiftCardStatus';
import { removeRedundantSpace } from '../../../common/utils/orders';
import { useSwagStoreTracking } from '../../hooks/useSwagStoreTracking';
import { HowToRedeemItem } from '../components/HowToRedeemItem';
import { AttributeRow } from '../components/order-item/AttributeRow';
import type { OrderHistoryScreenNavigationProp, OrderHistoryScreenRouteProp } from '../navigation/navigationType';

const PARSE_FORMAT = 'DD MMM YYYY';

const { width: screenWidth } = Dimensions.get('screen');

export const OrderDetailScreen = () => {
  const navigation = useNavigation<OrderHistoryScreenNavigationProp<'OrderDetails'>>();
  const route = useRoute<OrderHistoryScreenRouteProp<'OrderDetails'>>();
  const { openUrl } = useInAppBrowser();
  const Toast = useToast();
  const { formatMessage } = useIntl();
  const { colors, space } = useTheme();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { trackClickHowToRedeem, trackClickRedeemGiftcard, trackCopyOrderContent } = useSwagStoreTracking();
  const {
    name,
    orderDetails: { currency, productVariant, status },
    purchaseItem,
  } = route.params;

  const {
    amount,
    product: { howItWorks, productType },
  } = productVariant ?? {
    amount: 0,
    product: {
      howItWorks: '',
    },
  };

  const {
    data: { activationUrl, barCode, cardNumber, expiredAt, giftCode, issuedAt, pinNumber, promoCode, serialNumber },
    purchaseId,
  } = purchaseItem ?? {
    purchaseId: '',
    data: {},
  };

  const isGiftCard = productType === OrderProductType.Giftcard;
  const barCodeString = isGiftCard ? cardNumber : barCode;

  const formatDateIssue = issuedAt ? dayjs(issuedAt).format(PARSE_FORMAT) : '';
  const formatCurrency = createCurrencyFormatter();
  const productCurrency = (currency ?? FALLBACK_CURRENCY) as SupportedCurrency;
  const formatAmount = formatCurrency(amount, { currency: productCurrency });
  let formatExpiry = 'No expiry';

  if (expiredAt) {
    formatExpiry = dayjs(expiredAt).format(PARSE_FORMAT);
  }

  const noExtraSpaceHowItWorks = removeRedundantSpace(howItWorks ?? '');
  const noFormatPromoCode = removeRedundantSpace(promoCode ?? '');

  const onCopyContent = (label: string, content?: string) => {
    if (content) {
      trackCopyOrderContent(label, {
        productName: name,
        productCategory: productType ?? '',
      });
      Clipboard.setString(content);
      Toast.show({
        content: `${label} copied.`,
        duration: 2000,
      });
    }
  };

  const onRedeem = () => {
    if (activationUrl) {
      trackClickRedeemGiftcard({
        productName: name,
        productCategory: productType ?? '',
      });
      openUrl(activationUrl);
    }
  };

  const onHowToRedeemPress = () => {
    trackClickHowToRedeem({
      productName: name,
      productCategory: productType ?? '',
    });
  };

  return (
    <>
      <CustomStatusBar />
      <Page.TopBar onBack={navigation.goBack} title="Gift card details" hideRight />
      <Page showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: bottomInset || space.medium }}>
        <Page.Title
          style={{
            textTransform: 'capitalize',
            paddingVertical: space.large,
            color: colors.onDefaultGlobalSurface,
            opacity: 0.8,
          }}
        >
          {name}
        </Page.Title>
        <Page.Body marginBottom="small">
          {barCodeString ? (
            <Box testID={`barCode-${barCodeString}`} style={{ alignItems: 'center' }}>
              <BarcodeCreatorView
                value={barCodeString}
                background={colors.defaultGlobalSurface}
                foregroundColor={colors.onDefaultGlobalSurface}
                format={BarcodeFormat.CODE128}
                style={{ width: screenWidth, height: 120, marginBottom: space.large }}
              />
            </Box>
          ) : null}
          <AttributeRow
            style={{ marginBottom: space.medium }}
            label={formatMessage({ id: 'common.status' })}
            content={<GiftCardStatus status={status} />}
          />
          <AttributeRow style={{ marginBottom: space.medium }} label="Date of issue" content={formatDateIssue} />
          <AttributeRow style={{ marginBottom: space.medium }} label="Amount" content={formatAmount} />
          <AttributeRow style={{ marginBottom: space.medium }} label="Expiry" content={formatExpiry} />
          {cardNumber ? (
            <AttributeRow
              style={{ marginBottom: space.large }}
              label="Card number"
              content={cardNumber}
              onActionPress={() => onCopyContent('Card number', cardNumber)}
              actionIcon="file-copy-outlined"
            />
          ) : null}
          {barCode ? (
            <AttributeRow
              style={{ marginBottom: space.large }}
              label="Voucher #"
              content={barCode}
              onActionPress={() => onCopyContent('Voucher #', barCode)}
              actionIcon="file-copy-outlined"
            />
          ) : null}
          {pinNumber ? (
            <AttributeRow
              style={{ marginBottom: space.large }}
              label="Pin"
              content={pinNumber}
              onActionPress={() => onCopyContent('Pin', pinNumber)}
              actionIcon="file-copy-outlined"
            />
          ) : null}
          {noFormatPromoCode ? (
            <AttributeRow
              style={{ marginBottom: space.large }}
              label="Promo Code"
              content={noFormatPromoCode}
              onActionPress={() => onCopyContent('Promo code', noFormatPromoCode)}
              actionIcon="file-copy-outlined"
            />
          ) : null}
          {serialNumber ? (
            <AttributeRow
              style={{ marginBottom: space.large }}
              label="Serial number"
              content={serialNumber}
              onActionPress={() => onCopyContent('Serial number', serialNumber)}
              actionIcon="file-copy-outlined"
            />
          ) : null}
          <AttributeRow
            style={{ marginBottom: space.large }}
            label="Order ID"
            content={purchaseId}
            onActionPress={() => onCopyContent('Order ID', purchaseId)}
            actionIcon="file-copy-outlined"
          />
          {giftCode ? (
            <AttributeRow
              style={{ marginBottom: space.large }}
              label="Gift code"
              content={giftCode}
              onActionPress={() => onCopyContent('Gift code', giftCode)}
              actionIcon="file-copy-outlined"
            />
          ) : null}
        </Page.Body>
        {isGiftCard && (
          <Page.Footer>
            <HowToRedeemItem onPress={onHowToRedeemPress} content={noExtraSpaceHowItWorks} />
            <Button
              text="Redeem gift card"
              disabled={!activationUrl}
              onPress={onRedeem}
              style={{ marginTop: space.medium }}
            />
          </Page.Footer>
        )}
      </Page>
    </>
  );
};
