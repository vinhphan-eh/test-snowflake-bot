import { type PermissionData, usePermissionStore } from '../../../../../../common/stores/usePermissionStore';
import { renderHook } from '../../../../../../common/utils/testing';
import { aShopProductVariant } from '../../../../../../new-graphql/mocks/generated-mocks';
import type { VariantsWithQuantity } from '../../components/VariantQuantitySelect';
import { useOrderPriceCalculator } from '../useOrderPriceCalculator';

const variantsWithQuantity: VariantsWithQuantity[] = [
  {
    ...aShopProductVariant({ discountPrice: 10, discountPriceInPoints: 200 }),
    selectedQuantity: 1,
    currency: 'AUD',
    serviceFee: 1.1,
  },
  {
    ...aShopProductVariant({ discountPrice: 20, discountPriceInPoints: 400 }),
    selectedQuantity: 0,
    currency: 'AUD',
    serviceFee: 1.1,
  },
  {
    ...aShopProductVariant({ discountPrice: 20, discountPriceInPoints: 400 }),
    selectedQuantity: 2,
    currency: 'AUD',
    serviceFee: 1.1,
  },
];

const serviceFee = 1.1;

describe(useOrderPriceCalculator, () => {
  beforeEach(() => {
    usePermissionStore.setState({ permissions: { ebenServiceFee: { view: true } } as unknown as PermissionData });
  });

  it('should return correct amount', () => {
    const { result } = renderHook(() => useOrderPriceCalculator({ serviceFee, variantsWithQuantity }));

    expect(result.current.orderAmount).toBe(50.55);
  });

  it('should return correct amount in points', () => {
    const { result } = renderHook(() => useOrderPriceCalculator({ serviceFee, variantsWithQuantity }));

    expect(result.current.orderAmountInPoints).toBe(1000);
  });

  it('should return current total service fee', () => {
    const { result } = renderHook(() => useOrderPriceCalculator({ serviceFee, variantsWithQuantity }));

    expect(result.current.totalServiceFee).toBe(0.55);
  });
});
