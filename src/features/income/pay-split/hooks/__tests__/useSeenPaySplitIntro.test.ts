import { renderHook } from '../../../../../common/utils/testing';
import { useSeenPaySplitIntro } from '../useSeenPaySplitIntro';

describe('useSeenPaySplitIntro', () => {
  it('should persist user seen state', async () => {
    const {
      result: { current },
    } = renderHook(() => useSeenPaySplitIntro());

    const initialValue = await current.hasUserSeenThis();
    expect(initialValue).toBeFalsy();

    await current.markSeen();

    const nextValue = await current.hasUserSeenThis();
    expect(nextValue).toBeTruthy();
  });
});
