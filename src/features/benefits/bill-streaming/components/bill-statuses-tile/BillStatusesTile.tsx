import React, { useMemo, useRef } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Box, Typography } from '@hero-design/rn'; //
import { useNavigation } from '@react-navigation/native';
import { findLast } from 'lodash';
import { BillCategory } from './BillCategory';
import { usePermissionStore } from '../../../../../common/stores/usePermissionStore';
import ThemeSwitcher from '../../../../../common/utils/ThemeSwitcher';
import type { RootStackNavigationProp } from '../../../../../navigation/navigationTypes';
import { navigateToTopTabs } from '../../../../../navigation/rootNavigation';
import { SubscriptionType, type Subscription, SubscriptionStatus, Pid } from '../../../../../new-graphql/generated';
import { useIntl } from '../../../../../providers/LocalisationProvider';
import type { BillDisclaimerHandler } from '../../containers/BillDisclaimer';
import { BillDisclaimer } from '../../containers/BillDisclaimer';
import { useShowBillDisclaimer } from '../../hooks/useShowBillDisclaimer';
import { PromotionTag } from '../PromotionTag';

interface BillStatusesTileProps {
  subscriptions: Subscription[];
  onClickRenew: (signUpLink: string, providerName: string) => void;
  style?: StyleProp<ViewStyle>;
  isShowSubTitle?: boolean;
}

export const BillStatusesTile = ({
  isShowSubTitle = false,
  onClickRenew,
  style,
  subscriptions,
}: BillStatusesTileProps) => {
  const { formatMessage } = useIntl();
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  const disclaimerRef = useRef<BillDisclaimerHandler>(null);
  const { isShowDisclaimer } = useShowBillDisclaimer();
  const billAhmPromoTilePermission = usePermissionStore(state => state.permissions?.benefitsBillAhmPromoTile?.view);
  const billMedibankPromoTilePermission = usePermissionStore(
    state => state.permissions?.benefitsBillMedibankPromoTile?.view
  );
  // Only care about active/cancelled/pending/submitted subscriptions
  const filteredSubscriptions = useMemo(
    () =>
      subscriptions.filter(s =>
        [
          SubscriptionStatus.Active,
          SubscriptionStatus.Cancelled,
          SubscriptionStatus.Pending,
          SubscriptionStatus.Submitted,
        ].includes(s.status)
      ),
    [subscriptions]
  );

  const goToOfferDetail = (offerId: string) => {
    navigation.navigate('BenefitsStack', {
      screen: 'BillStreamStack',
      params: {
        screen: 'BillOfferDetailScreen',
        params: {
          offerId,
          onBackToBill: () => {
            navigateToTopTabs('bill-management');
          },
        },
      },
    });
  };

  const onClickSignUp = (offerId: string, providerId: Pid) => {
    if (isShowDisclaimer(providerId)) {
      disclaimerRef.current?.open(() => goToOfferDetail(offerId), providerId);
      return;
    }
    goToOfferDetail(offerId);
  };
  const gasSub = useMemo(
    () => findLast(filteredSubscriptions, s => s.subscriptionType === SubscriptionType.Gas),
    [filteredSubscriptions]
  );
  const electricitySub = useMemo(
    () => findLast(filteredSubscriptions, s => s.subscriptionType === SubscriptionType.Electricity),
    [filteredSubscriptions]
  );
  const ahmHealthInsuranceSub = useMemo(
    () => findLast(filteredSubscriptions, s => s.provider.id === Pid.Ahm),
    [filteredSubscriptions]
  );
  const medibankHealthInsuranceSub = useMemo(
    () => findLast(filteredSubscriptions, s => s.provider.id === Pid.Medibank),
    [filteredSubscriptions]
  );

  return (
    <Box
      backgroundColor="defaultGlobalSurface"
      paddingVertical="small"
      borderRadius="xlarge"
      accessibilityLabel={formatMessage({ id: 'common.bills.title.bills' })}
      style={style}
    >
      <BillDisclaimer ref={disclaimerRef} />
      <Box flexDirection="row" justifyContent="space-between" paddingVertical="small" paddingHorizontal="medium">
        <Typography.Body variant="regular-bold">{formatMessage({ id: 'common.bills.title.bills' })}</Typography.Body>
        <ThemeSwitcher name="wallet">
          <PromotionTag />
        </ThemeSwitcher>
      </Box>

      <BillCategory
        testID="electricity-bill-category"
        category={formatMessage({ id: 'common.bills.title.electricity' })}
        icon="bolt-outlined"
        subscription={electricitySub}
        onClickSignUp={() => onClickSignUp('1', Pid.SimplyEnergy)}
        onClickRenew={onClickRenew}
        isShowSubTitle={isShowSubTitle}
        providerName={formatMessage({ id: 'benefits.bill.engie' })}
      />
      <BillCategory
        testID="gas-bill-category"
        category={formatMessage({ id: 'common.bills.title.gas' })}
        icon="propane-tank-outlined"
        subscription={gasSub}
        onClickSignUp={() => onClickSignUp('1', Pid.SimplyEnergy)}
        onClickRenew={onClickRenew}
        isShowSubTitle={isShowSubTitle}
        providerName={formatMessage({ id: 'benefits.bill.engie' })}
      />
      {billAhmPromoTilePermission ? (
        <BillCategory
          testID="ahm-bill-category"
          category={formatMessage({ id: 'benefits.bill.healthInsurace' })}
          icon="wellness-outlined"
          subscription={ahmHealthInsuranceSub}
          onClickSignUp={() => onClickSignUp('2', Pid.Ahm)}
          onClickRenew={onClickRenew}
          isShowSubTitle={isShowSubTitle}
          providerName={formatMessage({ id: 'benefits.bill.ahm' })}
        />
      ) : null}
      {billMedibankPromoTilePermission ? (
        <BillCategory
          testID="medibank-bill-category"
          category={formatMessage({ id: 'benefits.bill.healthInsurace' })}
          icon="wellness-outlined"
          subscription={medibankHealthInsuranceSub}
          onClickSignUp={() => onClickSignUp('3', Pid.Medibank)}
          onClickRenew={onClickRenew}
          isShowSubTitle={isShowSubTitle}
          providerName={formatMessage({ id: 'benefits.bill.medibank' })}
        />
      ) : null}
    </Box>
  );
};
