import type { UserPermissionQuery } from '../../../new-graphql/generated';
import { useUserPermissionQuery } from '../../../new-graphql/generated';
import { useEbenTokenStore } from '../../auth/store/ebenTokenStore';
import { useSessionStore } from '../../stores/useSessionStore';
import type { MockQueryResult } from '../../types/react-query';
import { renderHook } from '../../utils/testing';
import { useWorkzonePermission } from '../useWorkzonePermission';

const mockUseUserPermissionQuery = useUserPermissionQuery as unknown as jest.Mock<MockQueryResult<UserPermissionQuery>>;
(mockUseUserPermissionQuery as unknown as { getKey: () => string }).getKey = jest.fn();

jest.mock('../../../new-graphql/generated');

describe('useWorkzonePermission', () => {
  beforeEach(() => {
    const kpStore = renderHook(() => useSessionStore());
    kpStore.result.current.kpMetadatalite = [
      {
        employeeId: null,
        businessId: 327303,
        brandId: 2065,
        partnerId: null,
      },
      {
        employeeId: null,
        businessId: 327541,
        brandId: 2065,
        partnerId: null,
      },
      {
        employeeId: 5654827,
        businessId: 327541,
        brandId: 2065,
        partnerId: null,
      },
    ];

    const ebenStore = renderHook(() => useEbenTokenStore());
    ebenStore.result.current.tokenStatus = 'success';
  });
  it.each`
    moneyAccess | benefitsAccess
    ${true}     | ${true}
    ${false}    | ${false}
  `(
    'works correctly when money access is $moneyAccess and benefits access is $benefitsAccess',
    ({ benefitsAccess, moneyAccess }) => {
      mockUseUserPermissionQuery.mockReturnValue({
        data: {
          me: {
            userPermission: {
              permissions: [
                {
                  name: 'MONEY',
                  enabled: moneyAccess,
                },
                {
                  name: 'BENEFITS',
                  enabled: benefitsAccess,
                },
              ],
            },
          },
        },
      });

      const hook = renderHook(() => useWorkzonePermission());

      expect(hook.result.current.moneyPermission).toBe(moneyAccess);
      expect(hook.result.current.benefitsPermission).toBe(benefitsAccess);
    }
  );

  it('should return false if relation is empty', () => {
    const kpStore = renderHook(() => useSessionStore());
    kpStore.result.current.kpMetadatalite = undefined;

    mockUseUserPermissionQuery.mockReturnValue({
      data: undefined as never,
    });

    const hook = renderHook(() => useWorkzonePermission());

    expect(hook.result.current.moneyPermission).toBe(false);
    expect(hook.result.current.benefitsPermission).toBe(false);
    expect(hook.result.current.isFetching).toBe(false);
  });
});
