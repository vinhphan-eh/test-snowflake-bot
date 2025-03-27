import type { ReactElement } from 'react';
import type { BrazeCustomEvents } from '../constants';
import { useBrazeStore } from '../stores/useBrazeStore';

type RemovalEventWrapperProps = {
  children: ReactElement;
  event?: BrazeCustomEvents;
};

export const RemovalEventWrapper = ({ children, event }: RemovalEventWrapperProps) => {
  const pendingEvents = useBrazeStore(state => state.pendingEvents);

  if (event && pendingEvents.includes(event)) {
    return null;
  }
  return children;
};
