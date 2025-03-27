import React, { useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { Typography } from '@hero-design/rn';
import { useIntl } from '../../../../providers/LocalisationProvider';
import type { PromotionTnCBtsHandler } from '../containers/PromotionTnCBts';
import { PromotionTnCBts } from '../containers/PromotionTnCBts';
import { useBillPromotionPermission } from '../hooks/useBillPromotionPermission';

export const PromotionTnCApply = () => {
  const promotionBtsRef = useRef<PromotionTnCBtsHandler>(null);
  const { formatMessage } = useIntl();
  const { havingPermission, isFetched } = useBillPromotionPermission();

  if (!havingPermission || !isFetched) {
    return null;
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          promotionBtsRef.current?.open(() => {});
        }}
      >
        <Typography.Caption intent="primary" fontWeight="semi-bold" style={{ textDecorationLine: 'underline' }}>
          {formatMessage({ id: 'benefits.bill.tncApply' })}
        </Typography.Caption>
      </TouchableOpacity>
      <PromotionTnCBts ref={promotionBtsRef} />
    </>
  );
};
