import type { PermissionData } from '../../../../../../common/stores/usePermissionStore';
import { usePermissionStore } from '../../../../../../common/stores/usePermissionStore';
import { renderHook } from '../../../../../../common/utils/testing';
import { useServiceFeeFeature } from '../useServiceFeeFeature';

describe('useServiceFeeFeature', function () {
  it('should calculate without service fee when serviceFee feature off', function () {
    usePermissionStore.setState({ permissions: { ebenServiceFee: { view: false } } as PermissionData });
    const { result: res } = renderHook(() => useServiceFeeFeature());
    expect(res.current.getTotalServiceFee(100, 1, 1)).toEqual(0);
    expect(res.current.getPriceWithFee(100, 1)).toEqual(100);
  });

  it('should calculate with service fee serviceFee feature on', function () {
    usePermissionStore.setState({ permissions: { ebenServiceFee: { view: true } } as PermissionData });
    const { result: res } = renderHook(() => useServiceFeeFeature());
    expect(res.current.getTotalServiceFee(100, 1, 1)).toEqual(1);
    expect(res.current.getPriceWithFee(100, 1)).toEqual(101);
  });
});
