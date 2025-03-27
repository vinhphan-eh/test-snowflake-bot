import React, { useMemo } from 'react';
import { ImageBackground, TouchableOpacity } from 'react-native';
import { Image, Typography, useTheme } from '@hero-design/rn';
import images from '../../../../../../common/assets/images';
import {
  SubscriptionStatus,
  useGetBmOfferDetailQuery,
  useGetPromotionQuery,
  useGetSubscriptionsQuery,
} from '../../../../../../new-graphql/generated';
import { useIntl } from '../../../../../../providers/LocalisationProvider';
import { PromotionTnCApply } from '../../../../bill-streaming/components/PromotionTnCApply';
import { useBillPromotionPermission } from '../../../../bill-streaming/hooks/useBillPromotionPermission';

type BillSignUpProps = {
  onPress: () => void;
};

export const BillSignup = ({ onPress }: BillSignUpProps) => {
  const { radii, space } = useTheme();
  const { formatMessage } = useIntl();

  const { data: promotionContent } = useGetPromotionQuery();

  const { cardSubTitle, cardTitle, signedUpCardSubTitle, signedUpCardTitle } =
    promotionContent?.me?.billManagement?.promotion ?? {};

  const { havingPermission: isPromotion } = useBillPromotionPermission('SIMPLY_ENERGY');

  const { data } = useGetBmOfferDetailQuery({ input: { id: '1' ?? '' } });

  const { logoUrl } = data?.me?.billManagement?.offerV2 ?? {};

  const { data: getSubScriptionResponse } = useGetSubscriptionsQuery({
    input: {
      first: 20,
    },
  });

  const listData = useMemo(
    () => getSubScriptionResponse?.me?.billManagement?.subscriptions?.edges ?? [],
    [getSubScriptionResponse?.me?.billManagement?.subscriptions?.edges]
  );
  const filteredData = useMemo(
    () =>
      listData.filter(
        e =>
          e.node.isHPPromo &&
          (e.node.status === SubscriptionStatus.Submitted || e.node.status === SubscriptionStatus.Pending)
      ),
    [listData]
  );

  const promotionTitle = filteredData.length === 0 ? cardTitle : signedUpCardTitle;
  const promotionSubTitle = filteredData.length === 0 ? cardSubTitle : signedUpCardSubTitle;
  const isEnablePromotion = isPromotion || filteredData.length !== 0;

  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={onPress}>
      <ImageBackground
        source={images.exclusiveEnergyDiscount}
        resizeMode="cover"
        style={{
          flex: 1,
          paddingLeft: space.smallMedium,
          paddingVertical: space.smallMedium,
          borderRadius: radii.xlarge,
          overflow: 'hidden',
        }}
      >
        <Image style={{ width: 36, height: 16 }} resizeMode="contain" source={{ uri: logoUrl }} />
        <Typography.Body style={{ marginTop: space.xsmall, flexShrink: 1 }} typeface="neutral" variant="small-bold">
          {isEnablePromotion ? promotionTitle : formatMessage({ id: 'benefits.bill.exclusiveDiscount' })}
        </Typography.Body>
        <Typography.Caption
          intent="subdued"
          style={{ marginTop: space.small, marginRight: space.small, marginBottom: space.small }}
        >
          {isEnablePromotion ? promotionSubTitle : formatMessage({ id: 'benefits.bill.signUpToday' })}
          {filteredData.length !== 0 ? <PromotionTnCApply /> : null}
        </Typography.Caption>
      </ImageBackground>
    </TouchableOpacity>
  );
};
