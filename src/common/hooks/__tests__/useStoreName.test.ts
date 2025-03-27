import { renderHook } from '@testing-library/react-hooks';
import { useSessionStore } from '../../stores/useSessionStore';
import useStoreName from '../useStoreName';

jest.mock('../../stores/useSessionStore');

describe('useStoreName', () => {
  it('should return OLD_STORE_NAME when swagRebrandEnabled is false', () => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({ swagTextAndImageRebrandEnabled: false });

    const { result } = renderHook(() => useStoreName());

    expect(result.current).toBe('Swag');
  });

  it('should return NEW_STORE_NAME when swagRebrandEnabled is true', () => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({ swagTextAndImageRebrandEnabled: true });

    const { result } = renderHook(() => useStoreName());

    expect(result.current).toBe('Perks');
  });
});
