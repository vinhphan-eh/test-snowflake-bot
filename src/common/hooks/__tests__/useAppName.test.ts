import { renderHook } from '@testing-library/react-hooks';
import { useSessionStore } from '../../stores/useSessionStore';
import useAppName from '../useAppName';

jest.mock('../../stores/useSessionStore');

describe('useAppName', () => {
  it('should return OLD_APP_NAME when swagRebrandEnabled is false', () => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({ swagTextAndImageRebrandEnabled: false });

    const { result } = renderHook(() => useAppName());

    expect(result.current).toBe('Swag');
  });

  it('should return NEW_APP_NAME when swagRebrandEnabled is true', () => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({ swagTextAndImageRebrandEnabled: true });

    const { result } = renderHook(() => useAppName());

    expect(result.current).toBe('Employment Hero Work');
  });
});
