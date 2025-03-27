import React from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { Box, Icon, Typography, useTheme } from '@hero-design/rn';
import type { BmOffer } from '../../../../new-graphql/generated';
import { useGetPromotionQuery } from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { ProductItem } from '../../common/components/ProductItem';
import { useBillPromotionPermission } from '../hooks/useBillPromotionPermission';

const { width: screenWidth } = Dimensions.get('screen');
const heightRatio = 100 / 171;

type BillOfferGridItemProps = {
  showBillTooltip: () => void;
  item: BmOffer;
  onPress: () => void;
};

export const BillOfferGridItem = ({ item, onPress, showBillTooltip }: BillOfferGridItemProps) => {
  const { space } = useTheme();
  const { formatMessage } = useIntl();
  const { havingPermission: isPromotion } = useBillPromotionPermission(item.provider.id);

  const { data: promotionContent } = useGetPromotionQuery();

  const { searchCardTitle } = promotionContent?.me?.billManagement?.promotion ?? { searchCardTitle: '' };

  const imgWidth = (screenWidth - space.medium * 3) / 2;
  const imgHeight = imgWidth * heightRatio;

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
      style={{ marginRight: space.small, marginBottom: space.large }}
    />
  );
};
