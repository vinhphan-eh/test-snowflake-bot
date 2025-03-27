import { renderHook } from '../../utils/testing';
import { useOneTimeEffect } from '../useOneTimeEffect';

describe('useOneTimeEffect', () => {
  it('should only run the effect until it returns true', () => {
    let count = 0;
    let mockReturnValue = false;

    const effect = () => {
      count += 1;
      return mockReturnValue;
    };
    const { rerender } = renderHook(props => useOneTimeEffect(effect, props.deps), {
      initialProps: {
        deps: ['a'],
      },
    });
    expect(count).toBe(1);

    mockReturnValue = true;
    rerender({
      deps: ['b'],
    });
    expect(count).toBe(2);

    rerender({
      deps: ['c'],
    });
    expect(count).toBe(2);
  });
});
