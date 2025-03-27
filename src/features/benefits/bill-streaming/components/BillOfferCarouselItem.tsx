import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, Icon, Typography, useTheme } from '@hero-design/rn';
import { scale } from '../../../../common/utils/layout';
import type { BmOffer } from '../../../../new-graphql/generated';
import { useGetPromotionQuery } from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { ProductItem } from '../../common/components/ProductItem';
import { useBillPromotionPermission } from '../hooks/useBillPromotionPermission';

const imgWidth = scale(170, 'width');
const imgHeight = (imgWidth * 100) / 170;

type BillOfferCarouselItemProps = {
  showBillTooltip: () => void;
  item: BmOffer;
  onPress: () => void;
};

export const BillOfferCarouselItem = ({ item, onPress, showBillTooltip }: BillOfferCarouselItemProps) => {
  const { space } = useTheme();
  const { formatMessage } = useIntl();
  const { havingPermission: isPromotion } = useBillPromotionPermission(item.provider.id);

  const { data: promotionContent } = useGetPromotionQuery();

  const { searchCardTitle } = promotionContent?.me?.billManagement?.promotion ?? { searchCardTitle: '' };

  const renderFooter = () => {
    return (
      <Box style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: space.small }}>
        <Typography.Caption intent="primary" style={{ marginRight: space.small }}>
          {formatMessage({ id: 'benefits.bill.communitySourced' })}
        </Typography.Caption>
        <TouchableOpacity hitSlop={20} testID="question-mark" onPress={() => showBillTooltip()} activeOpacity={0.5}>
          <Icon size="xsmall" intent="primary" accessibilityLabel="question mark" icon="circle-question-outlined" />
        </TouchableOpacity>
      </Box>
    );
  };

  return (
    <ProductItem
      numberOfLines={5}
      renderFooter={renderFooter}
      imgWidth={imgWidth}
      imgHeight={imgHeight}
      testID={`bill-offer-${item.id}`}
      imgSrc={item?.imageUrl ? { uri: item.imageUrl } : undefined}
      logoSrc={item?.logoUrl ? { uri: item?.logoUrl } : undefined}
      title={isPromotion ? searchCardTitle : item.title}
      kicker={item.provider.name}
      onPress={onPress}
      style={{ marginRight: space.small }}
    />
  );
};
