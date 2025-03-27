import { usePermissionStore } from '../../../../../common/stores/usePermissionStore';
import { roundNum } from '../../../common/utils/calculations';

export const useServiceFeeFeature = () => {
  const serviceFeeEnabled = usePermissionStore(state => state.permissions?.ebenServiceFee?.view || false);

  const getPriceWithFee = (price: number, serviceFee?: number) =>
    roundNum(price + (((serviceFeeEnabled ? serviceFee : 0) || 0) * price) / 100);

  const getTotalServiceFee = (price: number, quantity: number, serviceFee?: number) =>
    roundNum((price * quantity * ((serviceFeeEnabled ? serviceFee : 0) || 0)) / 100);

  return {
    getPriceWithFee,
    serviceFeeEnabled,
    getTotalServiceFee,
  };
};
