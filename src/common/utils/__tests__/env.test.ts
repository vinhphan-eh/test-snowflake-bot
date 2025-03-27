import { useSessionStore } from '../../stores/useSessionStore';
import { getEnvConfig } from '../env';
import { renderHook } from '../testing';

describe('getEnvConfig', () => {
  it('should return correctly', () => {
    const store = renderHook(() => useSessionStore());
    store.result.current.getEnvConfig = () =>
      ({
        test: 'test',
      } as never);

    expect(getEnvConfig()).toEqual({ test: 'test' });
  });
});
