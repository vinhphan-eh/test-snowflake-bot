import { mockUseIsAccountAU } from '../../../../../common/hooks/__mocks__/useIsAccountAU';
import { useIsWorkzone } from '../../../../../common/hooks/useIsWorkzone';
import { useWorkzonePermission } from '../../../../../common/hooks/useWorkzonePermission';
import { usePermissionStore } from '../../../../../common/stores/usePermissionStore';
import { renderHook } from '../../../../../common/utils/testing';
import { useGetUserWaitListQuery } from '../../../../../new-graphql/generated';
import { useGroupWaitlistStatus } from '../useGroupWaitlistStatus';

const mockUseIsWorkzone = useIsWorkzone as jest.MockedFn<typeof useIsWorkzone>;
const mockUseWorkzonePermission = useWorkzonePermission as jest.MockedFn<typeof useWorkzonePermission>;

jest.mock('../../../../../new-graphql/generated', () => ({ useGetUserWaitListQuery: jest.fn() }));
jest.mock('../../../../../common/hooks/useIsWorkzone');
jest.mock('../../../../../common/hooks/useWorkzonePermission');

describe('useGroupWaitlistStatus', () => {
  it.each`
    index | toggleMegaDealsMvpCtaPermission | toggleMegaDealsGroupsPermission | userId    | isAccountAU | isWorkzone | benefitsPermission | moneyPermission | isShowMegadealCTA | isJoinedWaitlist
    ${0}  | ${false}                        | ${true}                         | ${'1234'} | ${true}     | ${false}   | ${false}           | ${false}        | ${false}          | ${true}
    ${1}  | ${false}                        | ${true}                         | ${''}     | ${true}     | ${false}   | ${false}           | ${false}        | ${false}          | ${false}
    ${2}  | ${true}                         | ${false}                        | ${''}     | ${true}     | ${false}   | ${false}           | ${false}        | ${false}          | ${false}
    ${3}  | ${true}                         | ${true}                         | ${''}     | ${true}     | ${false}   | ${false}           | ${false}        | ${true}           | ${false}
    ${4}  | ${true}                         | ${true}                         | ${'1234'} | ${true}     | ${false}   | ${false}           | ${false}        | ${true}           | ${true}
    ${5}  | ${true}                         | ${false}                        | ${'1234'} | ${true}     | ${false}   | ${false}           | ${false}        | ${false}          | ${true}
    ${6}  | ${false}                        | ${false}                        | ${''}     | ${true}     | ${false}   | ${false}           | ${false}        | ${false}          | ${false}
    ${7}  | ${true}                         | ${true}                         | ${''}     | ${true}     | ${true}    | ${false}           | ${false}        | ${false}          | ${false}
    ${8}  | ${true}                         | ${true}                         | ${''}     | ${true}     | ${false}   | ${true}            | ${true}         | ${true}           | ${false}
    ${9}  | ${true}                         | ${true}                         | ${''}     | ${true}     | ${false}   | ${true}            | ${false}        | ${true}           | ${false}
    ${10} | ${false}                        | ${true}                         | ${'1234'} | ${false}    | ${false}   | ${false}           | ${false}        | ${false}          | ${true}
    ${11} | ${false}                        | ${true}                         | ${''}     | ${false}    | ${false}   | ${false}           | ${false}        | ${false}          | ${false}
    ${12} | ${true}                         | ${false}                        | ${''}     | ${false}    | ${false}   | ${false}           | ${false}        | ${false}          | ${false}
    ${13} | ${true}                         | ${true}                         | ${''}     | ${false}    | ${false}   | ${true}            | ${true}         | ${false}          | ${false}
    ${14} | ${true}                         | ${true}                         | ${''}     | ${false}    | ${false}   | ${true}            | ${false}        | ${false}          | ${false}
  `(
    `should work correctly for index $index`,
    ({
      benefitsPermission,
      isAccountAU,
      isJoinedWaitlist,
      isShowMegadealCTA,
      isWorkzone,
      moneyPermission,
      toggleMegaDealsGroupsPermission,
      toggleMegaDealsMvpCtaPermission,
      userId,
    }) => {
      const permissionStore = renderHook(() => usePermissionStore());
      permissionStore.result.current.permissions = {
        toggleMegaDealsMvpCta: {
          view: toggleMegaDealsMvpCtaPermission,
        },
        toggleMegaDealsCommunitiesCtas: { view: toggleMegaDealsGroupsPermission },
      } as never;

      (useGetUserWaitListQuery as unknown as jest.Mock).mockReturnValue({
        isFetching: false,
        isError: false,
        data: {
          me: {
            group: { waitList: { userId } },
          },
        },
      });

      mockUseIsAccountAU.mockReturnValue(isAccountAU);
      mockUseIsWorkzone.mockReturnValue(isWorkzone);
      mockUseWorkzonePermission.mockReturnValue({
        benefitsPermission,
        isFetching: false,
        moneyPermission,
        isFetched: true,
      });

      const { result } = renderHook(() => useGroupWaitlistStatus());
      expect(result.current.isShowMegadealCTA).toBe(isShowMegadealCTA);
      expect(result.current.isJoinedWaitlist).toBe(isJoinedWaitlist);
    }
  );
});
