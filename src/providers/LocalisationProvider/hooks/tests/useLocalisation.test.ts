import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react-native';
import { useLocalisation } from '../useLocalisation';

describe('useLocalisation', () => {
  it('should update the locale when setLocale function called', async () => {
    const {
      result: {
        current: { currentLanguage, setLocale },
      },
    } = renderHook(() => useLocalisation());

    expect(currentLanguage).toBe('en-AU');
    setLocale('GB');
  });

  it('should fallback to en-AU if country of user is outside the supported list', async () => {
    const {
      result: {
        current: { currentLanguage, setLocale },
      },
    } = renderHook(() => useLocalisation());

    setLocale('VN');

    await waitFor(() => {
      expect(currentLanguage).toBe('en-AU');
    });
  });
});
