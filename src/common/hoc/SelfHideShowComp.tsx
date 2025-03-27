import type { ReactElement } from 'react';
import React, { useImperativeHandle, useState } from 'react';

export type SelfHideShowHandler = {
  show: () => void;
  hide: () => void;
};

type SelfHideShowCompProps = {
  children: ReactElement;
};

/**
 * this comp is a HOC for any comp need hide/show internally, without affect parent rendering
 */
export const SelfHideShowComp = React.forwardRef<SelfHideShowHandler, SelfHideShowCompProps>(({ children }, ref) => {
  const [visible, setVisible] = useState(true);

  useImperativeHandle(ref, () => ({
    show: () => setVisible(true),
    hide: () => setVisible(false),
  }));

  if (!visible) {
    return null;
  }
  return children;
});
