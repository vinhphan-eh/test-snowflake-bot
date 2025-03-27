import { renderHook } from '../../../../common/utils/testing';
import { useSeenSuperIntro } from '../useSeenSuperIntro';

describe('useSeenSuperIntro', () => {
  it('should persist user seen state', async () => {
    const {
      result: { current },
    } = renderHook(() => useSeenSuperIntro());

    const initialValue = await current.hasUserSeenThis();
    expect(initialValue).toBeFalsy();

    await current.markSeen();

    const nextValue = await current.hasUserSeenThis();
    expect(nextValue).toBeTruthy();
  });
});
