import { usePermissionStore } from '../../../../../common/stores/usePermissionStore';
import type { MockQueryResult } from '../../../../../common/types/react-query';
import { renderHook } from '../../../../../common/utils/testing';
import type { GetBmOfferQuery } from '../../../../../new-graphql/generated';
import { useGetBmOfferQuery } from '../../../../../new-graphql/generated';
import { mockBillOffers } from '../../../../../new-graphql/handlers/custom-mock/billManangement';
import {
  mockUseBillStreamPermission,
  mockUseBillStreamPermissionByProvider,
} from '../__mocks__/useBillStreamPermission';
import { useGetAllBillOffers } from '../useGetAllBillOffers';

const mockUseGetBmOfferQuery = useGetBmOfferQuery as unknown as jest.Mock<MockQueryResult<GetBmOfferQuery>>;
(mockUseGetBmOfferQuery as unknown as { getKey: () => string }).getKey = jest.fn();

jest.mock('../../../../../common/hooks/useIsCandidate');
jest.mock('../../../../../new-graphql/generated');

const mockGetBmOfferQueryData = {
  me: {
    billManagement: {
      offersV3: mockBillOffers,
    },
  },
};
const emptyGetBmOfferQueryData = {
  me: {
    billManagement: {
      offersV3: {
        edges: [],
      },
    },
  },
};

describe('useGetAllBillOffers', () => {
  beforeEach(() => {
    mockUseGetBmOfferQuery.mockImplementation((_variables, { enabled }) => ({
      data: enabled ? mockGetBmOfferQueryData : emptyGetBmOfferQueryData,
      isLoading: false,
      isError: false,
    }));
  });
  it.each`
    isCandidate | billPermission
    ${false}    | ${true}
  `('should return all 3 offers', ({ billPermission }) => {
    mockUseBillStreamPermission.mockReturnValue({ permission: billPermission, isFetched: true });
    mockUseBillStreamPermissionByProvider.mockReturnValue({ permission: billPermission, isFetched: true });
    const permissionStore = renderHook(() => usePermissionStore());
    permissionStore.result.current.permissions = {
      benefitsBillAhmPromoTile: {
        view: true,
      },
      benefitsBillMedibankPromoTile: {
        view: true,
      },
    } as never;
    const hook = renderHook(() => useGetAllBillOffers({}));

    expect(hook.result.current.billOffers).toHaveLength(3);
    const actualIdList = hook.result.current.billOffers.map(offer => offer.id);
    expect(actualIdList).toContain('1');
    expect(actualIdList).toContain('2');
    expect(actualIdList).toContain('3');
  });

  it.each`
    isCandidate | billPermission
    ${true}     | ${false}
  `('should return empty offer if user is not valid', ({ billPermission }) => {
    mockUseBillStreamPermissionByProvider.mockReturnValue({ permission: billPermission, isFetched: true });
    mockUseBillStreamPermission.mockReturnValue({ permission: billPermission, isFetched: true });
    const hook = renderHook(() => useGetAllBillOffers({}));

    expect(hook.result.current.billOffers).toHaveLength(0);
  });
});
