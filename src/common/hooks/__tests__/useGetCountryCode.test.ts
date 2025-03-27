import { renderHook } from '../../utils/testing';
import { mockUseIsAccountAU } from '../__mocks__/useIsAccountAU';
import { mockUseIsAccountUK } from '../__mocks__/useIsAccountUK';
import { useGetCountryCode } from '../useGetCountryCode';

describe('useGetCountryCode', () => {
  it.each`
    isAUaccount | isUKaccount | expected
    ${true}     | ${false}    | ${'AU'}
    ${false}    | ${true}     | ${'GB'}
    ${false}    | ${false}    | ${'UNKNOWN'}
  `('should return correct country code', ({ expected, isAUaccount, isUKaccount }) => {
    mockUseIsAccountAU.mockReturnValue(isAUaccount);
    mockUseIsAccountUK.mockReturnValue(isUKaccount);

    const { result } = renderHook(() => useGetCountryCode());
    expect(result.current).toBe(expected);
  });
});
