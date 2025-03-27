import React, { useRef } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Box, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { type BillDisclaimerHandler, BillDisclaimer } from './BillDisclaimer';
import images from '../../../../common/assets/images';
import type { RootStackNavigationProp } from '../../../../navigation/navigationTypes';
import { navigateToBenefitsTopTabs } from '../../../../navigation/rootNavigation';
import type { BmOffer } from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { SubscriptionPromoteTile } from '../components/SubscriptionPromoteTile';
import { useBenefitsBillMgmtTracking } from '../hooks/useBenefitsBillMgmtTracking';
import { useGetAllBillOffers } from '../hooks/useGetAllBillOffers';
import { useShowBillDisclaimer } from '../hooks/useShowBillDisclaimer';

type BillOfferProps = {
  style?: StyleProp<ViewStyle>;
};

export const BillOfferList = ({ style }: BillOfferProps) => {
  const { colors, space } = useTheme();
  const { isShowDisclaimer } = useShowBillDisclaimer();
  const disclaimerRef = useRef<BillDisclaimerHandler>(null);
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  const Intl = useIntl();

  const { trackClickOnBillTile } = useBenefitsBillMgmtTracking();

  const goToOfferDetail = (offer: BmOffer) => {
    navigation.navigate('BenefitsStack', {
      screen: 'BillStreamStack',
      params: {
        screen: 'BillOfferDetailScreen',
        params: {
          data: offer,
          onBackToBill: () => {
            navigateToBenefitsTopTabs('benefits-settings');
          },
        },
      },
    });
  };
  const { billOffers: bmOfferData, isError } = useGetAllBillOffers({});
  if (isError) {
    return null;
  }

  const onItemPress = (offer: BmOffer) => {
    trackClickOnBillTile(offer?.provider?.name);
    if (isShowDisclaimer(offer.provider.id)) {
      disclaimerRef.current?.open(() => goToOfferDetail(offer), offer.provider.id);
    } else {
      goToOfferDetail(offer);
    }
  };

  return (
    <Box style={style}>
      <BillDisclaimer ref={disclaimerRef} />
      <Box testID="bill-offer" alignItems="center" flexDirection="row">
        <Typography.Body style={{ marginRight: space.small }} variant="small">
          {Intl.formatMessage({ id: 'benefits.online.bills' })}
        </Typography.Body>
        <Box
          accessibilityLabel="Community sourced"
          borderRadius="medium"
          paddingVertical="xxsmall"
          paddingHorizontal="xsmall"
          style={{ backgroundColor: colors?.decorativePrimarySurface }}
        >
          <Typography.Body variant="small-bold" style={{ color: colors.primary }}>
            {Intl.formatMessage({ id: 'benefits.online.billsCommunitySourced' })}
          </Typography.Body>
        </Box>
      </Box>
      {bmOfferData?.map(offer => (
        <SubscriptionPromoteTile
          testID="bills_subscription_promote_tile"
          key={offer.id}
          onPress={() => onItemPress(offer)}
          style={{ marginTop: space.medium }}
          coverImg={images.simplyEnergyTileCover}
          logoImg={images.simplyEnergyLogo}
          title={offer.title}
          supplier={offer.provider.name}
        />
      ))}
    </Box>
  );
};
