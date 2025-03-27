import React, { useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon, Typography, useTheme } from '@hero-design/rn';
import { useGetPromotionQuery } from '../../../../new-graphql/generated';
import type { PromotionBtsHandler } from '../containers/PromotionBts';
import { PromotionBts } from '../containers/PromotionBts';
import { useBillPromotionPermission } from '../hooks/useBillPromotionPermission';

type PromotionTagProps = {
  withoutText?: boolean;
};

export const PromotionTag = ({ withoutText = false }: PromotionTagProps) => {
  const { colors, radii, space } = useTheme();
  const promotionBtsRef = useRef<PromotionBtsHandler>(null);

  const { data: promotionContent } = useGetPromotionQuery();

  const { tagContent } = promotionContent?.me?.billManagement?.promotion ?? {};
  const { havingPermission, isFetched } = useBillPromotionPermission('SIMPLY_ENERGY');

  if (!havingPermission || !isFetched) {
    return null;
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          promotionBtsRef.current?.open(() => {});
        }}
        style={{
          padding: space.xsmall,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: radii.base,
          flexDirection: 'row',
          backgroundColor: withoutText ? undefined : colors.decorativePrimarySurface,
        }}
        activeOpacity={0.5}
      >
        {withoutText ? null : (
          <Typography.Caption
            testID="tag-content"
            intent="primary"
            fontWeight="semi-bold"
            style={{ marginRight: space.small }}
          >
            {tagContent}
          </Typography.Caption>
        )}

        <Icon testID="left-icon" icon="circle-question-outlined" size="xsmall" intent="primary" />
      </TouchableOpacity>
      <PromotionBts ref={promotionBtsRef} />
    </>
  );
};
