import { useRef, useEffect } from 'react';

export const useEffectAfterMount = (effect: React.EffectCallback, deps?: React.DependencyList | undefined) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      effect();
    } else {
      isMounted.current = true;
    }
  }, deps);
};
