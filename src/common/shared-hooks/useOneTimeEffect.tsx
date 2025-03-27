import type { DependencyList } from 'react';
import { useRef, useEffect } from 'react';

/**
 *
 * @description useEffect that should trigger once, similar to useEffect with empty dep, but support deps. Effect must return true to indicate it should not trigger again.
 */
export const useOneTimeEffect = (effect: () => boolean, deps?: DependencyList | undefined) => {
  const shouldTrigger = useRef(true);

  useEffect(() => {
    if (shouldTrigger.current) {
      // If effect returns true then it should not trigger again
      shouldTrigger.current = !effect();
    }
  }, deps);
};
