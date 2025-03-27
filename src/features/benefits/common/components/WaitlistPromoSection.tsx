import React from 'react';
import { Box, Image, Typography, useTheme } from '@hero-design/rn';
import useBrandName from '../../../../common/hooks/useBrandName';
import { scale } from '../../../../common/utils/layout';
import { useGetBmOfferDetailQuery, useGetPromotionQuery } from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { useBillPromotionPermission } from '../../bill-streaming/hooks/useBillPromotionPermission';

export const WaitlistPromoSection = () => {
  const { colors, space } = useTheme();
  const Intl = useIntl();
  const imgHeight = scale(28, 'height');
  const brandName = useBrandName();

  const { data } = useGetBmOfferDetailQuery({ input: { id: '1' ?? '' } });

  const { logoUrl, provider } = data?.me?.billManagement?.offerV2 ?? {};

  const { data: promotionContent } = useGetPromotionQuery();

  const { homeSubTitle, homeTitle } = promotionContent?.me?.billManagement?.promotion ?? {};

  const { havingPermission: isPromotion } = useBillPromotionPermission(provider?.id);

  return (
    <Box
      style={{
        marginTop: -3,
        backgroundColor: colors.defaultGlobalSurface,
        paddingHorizontal: space.medium,
        paddingBottom: space.large,
        paddingTop: space.medium,
      }}
    >
      <Image testID="promote_logo" source={{ uri: logoUrl }} style={{ height: imgHeight }} resizeMode="contain" />
      <Typography.Title
        style={{ marginTop: space.small }}
        level="h4"
        typeface="playful"
        accessibilityLabel={Intl.formatMessage({ id: 'benefits.bill.getUpTo27' })}
      >
        {isPromotion ? homeTitle : Intl.formatMessage({ id: 'benefits.bill.getUpTo27' }, { brandName })}
      </Typography.Title>
      <Typography.Caption
        style={{ marginTop: space.small }}
        intent="subdued"
        accessibilityLabel={Intl.formatMessage({ id: 'benefits.bill.electricCriteria' })}
      >
        {isPromotion ? homeSubTitle : Intl.formatMessage({ id: 'benefits.bill.electricCriteria' })}
      </Typography.Caption>
    </Box>
  );
};
