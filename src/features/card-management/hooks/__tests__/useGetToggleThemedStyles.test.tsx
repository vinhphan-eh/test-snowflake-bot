import { defaultTrackColor } from '../../../../common/components/toggle/Toggle';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import { renderHook } from '../../../../common/utils/testing';
import { useGetToggleThemedStyles } from '../useGetToggleThemedStyles';

describe('useGetToggleThemedStyles', () => {
  describe('when rebranded feature flag is turned on', () => {
    beforeEach(() => {
      const sessionStore = renderHook(() => useSessionStore());
      sessionStore.result.current.swagRebrandEnabled = true;
    });

    it('should return the correct set of styles', () => {
      const hook = renderHook(() => useGetToggleThemedStyles());

      expect(hook.result.current.trackColors).toStrictEqual({
        true: 'primary',
        false: 'mutedArchived',
      });
    });
  });

  describe('when rebranded feature flag is turned off', () => {
    beforeEach(() => {
      const sessionStore = renderHook(() => useSessionStore());
      sessionStore.result.current.swagRebrandEnabled = false;
    });

    it('should return the correct set of styles', () => {
      const hook = renderHook(() => useGetToggleThemedStyles());

      expect(hook.result.current.trackColors).toStrictEqual(defaultTrackColor);
    });
  });
});
