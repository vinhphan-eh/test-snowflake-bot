import type { ReactNode } from 'react';
import React, { createContext, useMemo, useState } from 'react';
import { Confetti } from './Confetti';

export const ConfettiContext = createContext(
  {} as {
    setShowConfetti: React.Dispatch<React.SetStateAction<boolean>>;
  }
);

export const ConfettiProvider = ({ children }: { children: ReactNode }) => {
  const [show, setShow] = useState(false);

  const contextValue = useMemo(
    () => ({
      setShowConfetti: setShow,
    }),
    [setShow]
  );

  return (
    <ConfettiContext.Provider value={contextValue}>
      {children}
      {show && (
        <Confetti
          onFinish={() => {
            setShow(false);
          }}
          run
        />
      )}
    </ConfettiContext.Provider>
  );
};
