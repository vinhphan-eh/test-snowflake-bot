import { useMemo } from 'react';
import { useServiceFeeFeature } from './useServiceFeeFeature';
import { roundNum } from '../../../common/utils/calculations';
import type { VariantsWithQuantity } from '../components/VariantQuantitySelect';

export const useOrderPriceCalculator = ({
  serviceFee,
  variantsWithQuantity,
}: {
  variantsWithQuantity: VariantsWithQuantity[];
  serviceFee: number;
}) => {
  const { getPriceWithFee, getTotalServiceFee } = useServiceFeeFeature();

  return useMemo(() => {
    // TODO: migrate to Big number if needed to avoid float point issue
    const orderAmount = variantsWithQuantity.reduce(
      (acc, { discountPrice, selectedQuantity }) =>
        roundNum(acc + roundNum(getPriceWithFee(discountPrice, serviceFee) * selectedQuantity)),
      0
    );
    const orderAmountInPoints = variantsWithQuantity.reduce(
      (acc, { discountPriceInPoints, selectedQuantity }) => acc + Number(discountPriceInPoints) * selectedQuantity,
      0
    );

    const totalServiceFee = variantsWithQuantity.reduce(
      (acc, { discountPrice, selectedQuantity }) =>
        roundNum(acc + getTotalServiceFee(discountPrice, selectedQuantity, serviceFee)),
      0
    );

    return { orderAmount, orderAmountInPoints, totalServiceFee };
  }, [getPriceWithFee, getTotalServiceFee, serviceFee, variantsWithQuantity]);
};
