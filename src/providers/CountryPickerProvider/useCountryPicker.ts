import { useContext } from 'react';
import { CountryPickerContext } from '.';

export const useCountryPicker = () => useContext(CountryPickerContext);
