import React, { useRef } from 'react';
import type { ListRenderItem, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { BillOfferCarouselItem } from './BillOfferCarouselItem';
import { BillOfferCarouselItemSkeleton } from './skeletons/BillOfferCarouselItemSkeleton';
import type { RootStackNavigationProp } from '../../../../navigation/navigationTypes';
import { navigateToBenefitsTopTabs } from '../../../../navigation/rootNavigation';
import type { BmOffer } from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { ProductCarousel } from '../../common/components/ProductCarousel';
import type { BillDisclaimerHandler } from '../containers/BillDisclaimer';
import { BillDisclaimer } from '../containers/BillDisclaimer';
import { CommunitySourcedBillInfo, type CommunitySourcedBillInfoHandler } from '../containers/CommunitySourcedBillInfo';
import { useBenefitsBillMgmtTracking } from '../hooks/useBenefitsBillMgmtTracking';
import { useBillStreamPermission } from '../hooks/useBillStreamPermission';
import { useShowBillDisclaimer } from '../hooks/useShowBillDisclaimer';

type BillOffersCarouselProps = {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  testID?: string;
  billOffers: BmOffer[];
  isLoading: boolean;
  isError: boolean;
};
export const BillOffersCarousel = ({
  billOffers,
  isError,
  isLoading,
  onPress,
  style,
  testID,
}: BillOffersCarouselProps) => {
  const { formatMessage } = useIntl();
  const { isShowDisclaimer } = useShowBillDisclaimer();
  const disclaimerRef = useRef<BillDisclaimerHandler>(null);
  const { trackClickOnBillTile } = useBenefitsBillMgmtTracking();
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  const { permission: billPermission } = useBillStreamPermission();
  const bsRef = useRef<CommunitySourcedBillInfoHandler>(null);
  const { space } = useTheme();
  const isEmptyAfterFetch = !isLoading && billOffers?.length === 0 && !isError;

  if (isError || !billPermission || isEmptyAfterFetch) {
    return null;
  }

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

  const onItemPress = (offer: BmOffer) => {
    trackClickOnBillTile(offer?.provider?.name);
    if (isShowDisclaimer(offer.provider.id)) {
      disclaimerRef.current?.open(() => goToOfferDetail(offer), offer.provider.id);
    } else {
      goToOfferDetail(offer);
    }
  };

  const renderItem: ListRenderItem<BmOffer> = ({ item }) => {
    return (
      <BillOfferCarouselItem
        item={item}
        onPress={() => onItemPress(item)}
        showBillTooltip={() => bsRef.current?.open()}
      />
    );
  };

  return (
    <>
      <BillDisclaimer ref={disclaimerRef} />
      <CommunitySourcedBillInfo ref={bsRef} />
      <ProductCarousel<BmOffer>
        style={style}
        keyExtractor={item => item.id}
        title={formatMessage({ id: 'benefits.onlineOffers.name' })}
        testID={testID}
        isLoading={isLoading}
        onPress={onPress}
        products={billOffers}
        renderItem={renderItem}
        renderItemSkeleton={() => <BillOfferCarouselItemSkeleton style={{ marginRight: space.smallMedium }} />}
      />
    </>
  );
};
