import React, { useRef } from 'react';
import type { ListRenderItem } from 'react-native';
import { useTheme } from '@hero-design/rn';
import { BillDisclaimer, type BillDisclaimerHandler } from './BillDisclaimer';
import { CommunitySourcedBillInfo, type CommunitySourcedBillInfoHandler } from './CommunitySourcedBillInfo';
import type { BmOffer } from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { CategoryCodes } from '../../common/constants/benefits';
import { ProductSearchTemplate } from '../../common/containers/ProductSearchTemplate';
import { BillOfferGridItem } from '../components/BillOfferGridItem';
import { useBenefitsBillMgmtTracking } from '../hooks/useBenefitsBillMgmtTracking';
import { useGetAllBillOffers } from '../hooks/useGetAllBillOffers';
import { useShowBillDisclaimer } from '../hooks/useShowBillDisclaimer';

interface BillOfferSearchListViewProps {
  initData?: BmOffer[];
  isShowNavBar?: boolean;
  isShowSearchBar?: boolean;
  onItemPressed: (item: BmOffer) => void;
  query: string;
  categoryCode: string;
  categoryName: string;
  setSearchQuery?: (text: string) => void;
  renderTop?: () => React.ReactNode;
  testID?: string;
}

export const BillOfferSearchListView = ({
  categoryCode,
  categoryName,
  initData,
  isShowNavBar = true,
  isShowSearchBar = true,
  onItemPressed,
  query,
  renderTop,
  setSearchQuery = () => {},
  testID,
}: BillOfferSearchListViewProps) => {
  const { colors } = useTheme();
  const { formatMessage } = useIntl();
  const disclaimerRef = useRef<BillDisclaimerHandler>(null);
  const bsRef = useRef<CommunitySourcedBillInfoHandler>(null);
  const { isShowDisclaimer } = useShowBillDisclaimer();
  const { trackClickOnBillTile } = useBenefitsBillMgmtTracking();
  const { billOffers, isError, isLoading } = useGetAllBillOffers({ query, categoryCode });

  const data = (billOffers.length === 0 ? initData : billOffers) ?? [];
  const placeholder = formatMessage(
    { id: 'benefits.cashback.searchOffers' },
    {
      offerType: ` ${categoryName.toLowerCase()} `,
    }
  );
  const renderItem: ListRenderItem<BmOffer> = ({ item }) => (
    <BillOfferGridItem
      item={item}
      onPress={() => {
        if (isShowDisclaimer(item.provider.id)) {
          disclaimerRef.current?.open(() => {
            trackClickOnBillTile(item.provider.name);
            onItemPressed(item);
          }, item.provider.id);
        } else {
          trackClickOnBillTile(item.provider.name);
          onItemPressed(item);
        }
      }}
      showBillTooltip={() => bsRef.current?.open()}
    />
  );

  return (
    <>
      <ProductSearchTemplate<BmOffer>
        location="search bills"
        selectedCategory={CategoryCodes.Bill}
        testID={testID}
        defaultQuery={query}
        renderTop={renderTop}
        keyExtractor={item => item.id}
        style={{ backgroundColor: colors.defaultGlobalSurface }}
        onChangeText={setSearchQuery}
        title={formatMessage({ id: 'benefits.onlineOffers.name' })}
        placeholder={placeholder}
        products={data}
        isLoading={isLoading}
        renderItem={renderItem}
        onEndReached={() => {}}
        isFetchingNextPage={false}
        isError={isError}
        isShowNavBar={isShowNavBar}
        isShowSearchBar={isShowSearchBar}
      />
      <BillDisclaimer ref={disclaimerRef} />
      <CommunitySourcedBillInfo ref={bsRef} />
    </>
  );
};
