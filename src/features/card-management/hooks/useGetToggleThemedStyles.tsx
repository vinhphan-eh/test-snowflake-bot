import { defaultTrackColor, type ToggleColor } from '../../../common/components/toggle/Toggle';
import { useSessionStore } from '../../../common/stores/useSessionStore';

type ToggleThemedStyles = {
  trackColors: ToggleColor;
};

export const useGetToggleThemedStyles = (): ToggleThemedStyles => {
  const { swagRebrandEnabled } = useSessionStore.getState();

  return swagRebrandEnabled
    ? {
        trackColors: {
          true: 'primary',
          false: 'mutedArchived',
        },
      }
    : {
        trackColors: defaultTrackColor,
      };
};
