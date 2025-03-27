import { useIsCandidateV2 } from '../../../../../common/hooks/useIsCandidate';
import { useIsWorkzone } from '../../../../../common/hooks/useIsWorkzone';
import { usePermissionStore } from '../../../../../common/stores/usePermissionStore';
import { renderHook } from '../../../../../common/utils/testing';
import { mockUseShowInstapayIntroductionQuery } from '../../../../../new-graphql/__mocks__/mockBenefits';
import { useShowInstapayOnboarding } from '../useShowInstapayOnboarding';

const mockUseIsCandidate = useIsCandidateV2 as jest.MockedFn<typeof useIsCandidateV2>;

const mockUseIsWorkzone = useIsWorkzone as jest.MockedFn<typeof useIsWorkzone>;

jest.mock('../../../../../common/hooks/useIsWorkzone', () => ({
  useIsWorkzone: jest.fn(),
}));

jest.mock('../../../../../common/hooks/useIsCandidate', () => ({
  useIsCandidateV2: jest.fn(),
}));

describe('useShowInstapayIntroduction', () => {
  it.each`
    showInstapayIntroduction | flag     | expected
    ${true}                  | ${true}  | ${true}
    ${true}                  | ${false} | ${false}
    ${false}                 | ${true}  | ${false}
    ${false}                 | ${false} | ${false}
  `('should work correctly', ({ expected, flag, showInstapayIntroduction }) => {
    mockUseShowInstapayIntroductionQuery.mockReturnValue({
      data: {
        me: {
          org: {
            instapay: {
              showInstapayIntroductionV2: showInstapayIntroduction,
            },
          },
        },
      },
    });

    const permissionStore = renderHook(() => usePermissionStore());
    permissionStore.result.current.permissions = {
      instapayOnboardingWidget: {
        view: flag,
      },
    } as never;

    const hook = renderHook(() => useShowInstapayOnboarding());
    expect(hook.result.current.showInstapayIntroduction).toBe(expected);
  });

  it.each`
    isFetchedPermission | isFetchedShowInstapayWidget | widgetFlag | isCandidate | isWorkzone | expected
    ${true}             | ${true}                     | ${true}    | ${false}    | ${false}   | ${true}
    ${true}             | ${true}                     | ${false}   | ${false}    | ${false}   | ${true}
    ${true}             | ${true}                     | ${true}    | ${true}     | ${false}   | ${true}
    ${true}             | ${true}                     | ${true}    | ${false}    | ${true}    | ${true}
    ${true}             | ${true}                     | ${false}   | ${true}     | ${false}   | ${true}
    ${true}             | ${true}                     | ${false}   | ${false}    | ${true}    | ${true}
    ${true}             | ${false}                    | ${false}   | ${false}    | ${false}   | ${true}
    ${true}             | ${false}                    | ${true}    | ${false}    | ${false}   | ${false}
  `(
    'isFetched work correctly',
    ({ expected, isCandidate, isFetchedPermission, isFetchedShowInstapayWidget, isWorkzone, widgetFlag }) => {
      mockUseShowInstapayIntroductionQuery.mockReturnValue({
        data: {} as never,
        isFetched: isFetchedShowInstapayWidget,
      });

      mockUseIsCandidate.mockReturnValue(isCandidate);

      const permissionStore = renderHook(() => usePermissionStore());
      permissionStore.result.current.permissions = {
        instapayOnboardingWidget: {
          view: widgetFlag,
        },
      } as never;

      permissionStore.result.current.isFetchedPermission = isFetchedPermission;

      mockUseIsWorkzone.mockReturnValue(isWorkzone);

      const hook = renderHook(() => useShowInstapayOnboarding());
      expect(hook.result.current.isFetched).toBe(expected);
    }
  );
});
