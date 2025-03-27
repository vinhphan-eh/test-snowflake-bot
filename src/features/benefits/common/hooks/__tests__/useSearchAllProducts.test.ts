import { usePermissionStore } from '../../../../../common/stores/usePermissionStore';
import { renderHook } from '../../../../../common/utils/testing';
import { mockUseSearchAllProductsQuery } from '../../../../../new-graphql/__mocks__/mockBenefits';
import { mockBillOffers } from '../../../../../new-graphql/handlers/custom-mock/billManangement';
import {
  mockInstoreOffersGroupByAdvertisers,
  mockOnlineOffer,
} from '../../../../../new-graphql/handlers/custom-mock/cashback';
import { mockSwagStoreOffer } from '../../../../../new-graphql/handlers/custom-mock/swagStore';
import {
  mockUseBillStreamPermission,
  mockUseBillStreamPermissionByProvider,
} from '../../../bill-streaming/hooks/__mocks__/useBillStreamPermission';
import { mockUseSwagStorePermission } from '../../../swag-store/hooks/__mocks__/useSwagStorePermission';
import { mockUseCashbackPermission } from '../__mocks__/useCashbackPermission';
import { useSearchAllProducts } from '../useSearchAllProducts';

jest.mock('../../../../../common/hooks/useIsCandidate');
describe('useSearchAllProducts', () => {
  beforeEach(() => {
    mockUseCashbackPermission.mockReturnValue({
      permission: true,
      isFetched: true,
      isLoading: false,
    });

    mockUseBillStreamPermissionByProvider.mockReturnValue({ permission: true, isFetched: true });

    mockUseBillStreamPermission.mockReturnValue({
      permission: true,
      isFetched: true,
    });

    mockUseSwagStorePermission.mockReturnValue({
      permission: true,
      isFetched: true,
    });

    mockUseSearchAllProductsQuery.mockReturnValue({
      data: {
        me: {
          billManagement: {
            offersV3: mockBillOffers,
          },
          cashback: {
            onlineOffers: {
              edges: [
                {
                  node: mockOnlineOffer,
                },
                {
                  node: mockOnlineOffer,
                },
              ],
            },
            instoreAdvertisers: {
              edges: mockInstoreOffersGroupByAdvertisers.me?.cashback?.allAdvertisers.edges,
            },
          },
          swagStore: {
            allOffers: {
              edges: [
                {
                  node: mockSwagStoreOffer,
                  cursor: 'cursor',
                },
                {
                  node: mockSwagStoreOffer,
                  cursor: 'cursor',
                },
                {
                  node: mockSwagStoreOffer,
                  cursor: 'cursor',
                },
              ],
            },
          },
        } as never,
      },
    });
  });

  it('should return items correctly', () => {
    const permissionStore = renderHook(() => usePermissionStore());
    permissionStore.result.current.permissions = {
      benefitsBillAhmPromoTile: {
        view: true,
      },
      benefitsBillMedibankPromoTile: {
        view: true,
      },
    } as never;
    const { result } = renderHook(() =>
      useSearchAllProducts({
        categoryCode: 'all',
        query: '',
        itemPerPage: 10,
        latitude: 0,
        longitude: 0,
        allowDataToLoad: true,
      })
    );

    expect(result.current.billOffers.length).toEqual(3);
    expect(result.current.onlineCashbackOffers.length).toEqual(2);
    expect(result.current.ssOffers.length).toEqual(3);
    expect(result.current.instoreCashbackAdvertisers.length).toEqual(2);
  });

  describe('bill offers', () => {
    it.each`
      ahm      | medibank | permission | expected
      ${true}  | ${true}  | ${true}    | ${3}
      ${false} | ${true}  | ${true}    | ${3}
      ${true}  | ${false} | ${true}    | ${3}
      ${false} | ${false} | ${true}    | ${3}
      ${false} | ${true}  | ${false}   | ${0}
    `('should bill offers returns correctly corresponding to role', ({ ahm, expected, medibank, permission }) => {
      const categoryCode = 'all';
      mockUseBillStreamPermission.mockReturnValue({
        permission,
        isFetched: true,
      });
      const permissionStore = renderHook(() => usePermissionStore());
      permissionStore.result.current.permissions = {
        benefitsBillAhmPromoTile: {
          view: ahm,
        },
        benefitsBillMedibankPromoTile: {
          view: medibank,
        },
      } as never;

      const { result } = renderHook(() =>
        useSearchAllProducts({
          categoryCode,
          query: '',
          itemPerPage: 10,
          latitude: 0,
          longitude: 0,
          allowDataToLoad: true,
        })
      );
      expect(result.current.billOffers).toHaveLength(expected);
    });
  });

  describe('cashback offers', () => {
    it.each`
      categoryCode  | permission | expected
      ${'bill'}     | ${true}    | ${true}
      ${'all'}      | ${true}    | ${true}
      ${'bill'}     | ${false}   | ${false}
      ${'dining'}   | ${true}    | ${true}
      ${'all'}      | ${false}   | ${false}
      ${'giftcard'} | ${true}    | ${false}
    `('shouldLoadCashback returns correctly', ({ categoryCode, expected, permission }) => {
      mockUseCashbackPermission.mockReturnValue({
        permission,
        isFetched: true,
        isLoading: false,
      });

      const { result } = renderHook(() =>
        useSearchAllProducts({
          categoryCode,
          query: '',
          itemPerPage: 10,
          latitude: 0,
          longitude: 0,
          allowDataToLoad: true,
        })
      );
      expect(result.current.shouldLoadCashback).toBe(expected);
    });
  });

  describe('swag store offers', () => {
    it.each`
      categoryCode  | permission | expected
      ${'bill'}     | ${true}    | ${false}
      ${'all'}      | ${true}    | ${true}
      ${'bill'}     | ${false}   | ${false}
      ${'dining'}   | ${true}    | ${false}
      ${'all'}      | ${false}   | ${false}
      ${'giftcard'} | ${true}    | ${true}
      ${'giftcard'} | ${false}   | ${false}
    `('shouldLoadSwagStore returns correctly', ({ categoryCode, expected, permission }) => {
      mockUseSwagStorePermission.mockReturnValue({
        permission,
        isFetched: true,
      });

      const { result } = renderHook(() =>
        useSearchAllProducts({
          categoryCode,
          query: '',
          itemPerPage: 10,
          latitude: 0,
          longitude: 0,
          allowDataToLoad: true,
        })
      );
      expect(result.current.shouldLoadSwagStore).toBe(expected);
    });
  });
});
