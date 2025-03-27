import type { ReactNode } from 'react';
import React, { createContext, useRef, useState } from 'react';
import { PrefetchInstapayBalance } from './hooks/usePrefetchInstapayBalance';
import type { InstapayExpPopupRef } from './InstapayExpPopup';
import { InstapayExpPopup } from './InstapayExpPopup';
import { useGetSuperAppToken } from '../../../../../common/auth/store/useSuperAppTokenStore';
import { PrefetchEmploymentHistory } from '../../../../../common/hooks/useFetchEmploymentHistory';
import { PrefetchIncomeVisibility } from '../../../../../common/hooks/usePrefetchIncomeVisibility';

type InstapayExpPopupProviderProps = {
  children: ReactNode;
};

export const InstapayExpPopupContext = createContext({} as InstapayExpPopupRef);

export const InstapayExpPopupProvider = ({ children }: InstapayExpPopupProviderProps) => {
  const popupRef = useRef<InstapayExpPopupRef>(null);
  const { loginProvider, token } = useGetSuperAppToken('InstapayExpPopupProvider');
  const [refState, setRefState] = useState<InstapayExpPopupRef>({} as InstapayExpPopupRef);

  return (
    <InstapayExpPopupContext.Provider value={refState}>
      {children}

      {token && loginProvider ? (
        // braze only can load after token is available
        // prefetch balance at app launch to reduce delay when showing popup
        <>
          <InstapayExpPopup
            ref={popupRef}
            // invalid ref until finish loading braze
            onHavingBrazeCard={() => {
              if (popupRef.current) {
                setRefState(popupRef.current);
              }
            }}
          />
          <PrefetchInstapayBalance />
          <PrefetchEmploymentHistory />
          <PrefetchIncomeVisibility />
        </>
      ) : null}
    </InstapayExpPopupContext.Provider>
  );
};
