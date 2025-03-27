import type { ReactNode } from 'react';
import React, { createContext, useEffect, useRef, useState } from 'react';
import type { CountryPickerHandlers } from './CountryPickerCon';
import { CountryPickerCon } from './CountryPickerCon';

type CountryPickerProviderProps = {
  children: ReactNode;
};

export const CountryPickerContext = createContext({} as CountryPickerHandlers);

const CountryPickerProvider = ({ children }: CountryPickerProviderProps) => {
  const countryPickerRef = useRef<CountryPickerHandlers>(null);
  const [refState, setRefState] = useState<CountryPickerHandlers>({} as CountryPickerHandlers);

  useEffect(() => {
    if (countryPickerRef.current) {
      setRefState(countryPickerRef.current);
    }
  }, []);

  return (
    <CountryPickerContext.Provider value={refState}>
      {children}
      <CountryPickerCon ref={countryPickerRef} />
    </CountryPickerContext.Provider>
  );
};

export default CountryPickerProvider;
