import React from 'react';
import { Button, Typography, useTheme } from '@hero-design/rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGetSuperAppToken } from '../../../common/auth/store/useSuperAppTokenStore';
import { CurrencyText } from '../../../common/components/currency-text/CurrencyText';
import type { DataCardItem } from '../../../common/components/data-card';
import { DataCard } from '../../../common/components/data-card';
import { GeneralError } from '../../../common/components/error';
import { Page } from '../../../common/components/layout/page';
import { OverlayLoadingScreen } from '../../../common/components/spinner';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import { useSessionStore } from '../../../common/stores/useSessionStore';
import { isEnabledForEh } from '../../../common/types/react-query';
import { formatUTCToLocalDateTimeString } from '../../../common/utils/date';
import { humanize } from '../../../common/utils/string';
import {
  HeroPointsClientType,
  HeroPointsReasonType,
  useGetHeroPointsTransactionDetailQuery,
} from '../../../new-graphql/generated';
import type { HeroPointsScreenNavigationProp, HeroPointsScreenRouteProp } from '../navigation/navigationTypes';

const TRANSACTION_TYPE_TO_TITLE: { [key in string]: string } = {
  topup: 'You received',
  withdrawal: 'You spent',
  withdrawal_reversion: 'You received',
  topup_reversion: 'You have been deducted',
  deduction: 'You have been deducted',
  deduction_reversion: 'You received',
};

export const TransactionDetailsScreen = () => {
  const {
    params: { transactionData },
  } = useRoute<HeroPointsScreenRouteProp<'heroPoints/transactionDetail'>>();
  const navigation = useNavigation<HeroPointsScreenNavigationProp<'heroPoints/transactionDetail'>>();

  const { colors } = useTheme();
  const { loginProvider, token } = useGetSuperAppToken('TransactionDetailsScreen');
  const { clientType, id, points, reasonType, transactionTimeUtc, transactionType } = transactionData;
  const orgId = useSessionStore(state => state.currentOrgId ?? '');

  const {
    data: heroPointsTransactionResponse,
    isError,
    isLoading,
  } = useGetHeroPointsTransactionDetailQuery(
    {
      orgId,
      id,
    },
    {
      enabled: isEnabledForEh(token, loginProvider) && !!orgId,
    }
  );

  const heroPointsTransactionData = heroPointsTransactionResponse?.me?.heroPoints?.transactionDetails;

  const detailDataCard: DataCardItem[] = [];
  let shouldSetReason = true;

  const renderContent = () => (
    <CurrencyText
      currency="POINTS"
      amount={Math.abs(points ?? 0)}
      renderCurrency={amount => <Typography.Body variant="regular-bold">{amount}</Typography.Body>}
      renderDecimal={amount => <Typography.Caption>{amount}</Typography.Caption>}
    />
  );

  if (transactionData) {
    detailDataCard.push(
      {
        label: TRANSACTION_TYPE_TO_TITLE[transactionType.toLowerCase()],
        content: renderContent(),
      },
      {
        label: 'When',
        content: formatUTCToLocalDateTimeString(transactionTimeUtc),
      }
    );
  }

  if (clientType.toLowerCase() === HeroPointsClientType.Nomination.toLowerCase()) {
    if (heroPointsTransactionData?.reason) {
      detailDataCard.push({
        label: 'For',
        content: heroPointsTransactionData.reason,
      });
    }

    if (heroPointsTransactionData?.recognisedBy) {
      detailDataCard.push({
        label: 'Recognised by',
        content: heroPointsTransactionData.recognisedBy,
      });
    }

    if (heroPointsTransactionData?.organisationName) {
      detailDataCard.push({
        label: 'At',
        content: heroPointsTransactionData.organisationName,
      });
    }

    shouldSetReason = false;
  }

  if (clientType.toLowerCase() === HeroPointsClientType.EmployeeMilestone.toLowerCase()) {
    if (heroPointsTransactionData?.organisationName) {
      detailDataCard.push({
        label: 'From',
        content: heroPointsTransactionData.organisationName,
      });
    }

    if (heroPointsTransactionData?.reason) {
      detailDataCard.push({
        label: 'For',
        content: humanize(heroPointsTransactionData.reason),
        capitalizeContent: true,
      });
    }

    shouldSetReason = false;
  }

  if (clientType.toLowerCase() === HeroPointsClientType.Marketplace.toLowerCase()) {
    if (heroPointsTransactionData?.merchantName) {
      detailDataCard.push({
        label: 'At this merchant',
        content: heroPointsTransactionData.merchantName,
      });
    }

    shouldSetReason = false;
  }

  if (clientType.toLowerCase() === HeroPointsClientType.EbfShaype.toLowerCase()) {
    if (heroPointsTransactionData?.reason) {
      detailDataCard.push({
        label: 'Description',
        content:
          reasonType?.toLowerCase() === HeroPointsReasonType.TransactionFee.toLowerCase()
            ? 'Transaction Fee'
            : heroPointsTransactionData.reason,
      });
    }

    if (
      heroPointsTransactionData?.merchantName &&
      reasonType?.toLowerCase() !== HeroPointsReasonType.TransactionFee.toLowerCase()
    ) {
      detailDataCard.push({
        label: 'For your purchase at',
        content: heroPointsTransactionData.merchantName,
      });
    }

    shouldSetReason = false;
  }

  if (shouldSetReason && heroPointsTransactionData?.reason) {
    detailDataCard.push({
      label: 'For',
      content: heroPointsTransactionData.reason,
    });
  }

  const { bottom: bottomInset } = useSafeAreaInsets();

  const onBack = () => navigation.goBack();

  if (isError) {
    return <GeneralError themeName="eBens" onCtaPress={navigation.goBack} ctaText="Go back" />;
  }

  return (
    <>
      <CustomStatusBar barStyle="default" backgroundColor={colors.defaultSurface} />
      <Page.TopBar
        onBack={onBack}
        hideRight
        title="Transaction Details"
        style={{ backgroundColor: colors.defaultSurface }}
      />
      <Page
        keyboardShouldPersistTaps="handled"
        style={{ paddingBottom: bottomInset, backgroundColor: colors.defaultSurface }}
      >
        <Page.Body marginTop="large">
          <DataCard data={detailDataCard} hideIcon disabled />
        </Page.Body>
        <Page.Footer>
          <Button accessibilityLabel="Done" onPress={onBack} text="Done" intent="primary" />
        </Page.Footer>
      </Page>
      {isLoading && <OverlayLoadingScreen />}
    </>
  );
};
