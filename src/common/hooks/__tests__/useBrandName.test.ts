import { renderHook } from '@testing-library/react-hooks';
import { useSessionStore } from '../../stores/useSessionStore';
import useBrandName from '../useBrandName';

jest.mock('../../stores/useSessionStore');

describe('useBrandName', () => {
  it('should return OLD_BRAND_NAME when swagRebrandEnabled is false', () => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({ swagTextAndImageRebrandEnabled: false });

    const { result } = renderHook(() => useBrandName());

    expect(result.current).toBe('Swag');
  });

  it('should return NEW_BRAND_NAME when swagRebrandEnabled is true', () => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({ swagTextAndImageRebrandEnabled: true });

    const { result } = renderHook(() => useBrandName());

    expect(result.current).toBe('Employment Hero');
  });
});
