import { useContext } from 'react';
import { InstapayExpPopupContext } from '../InstapayExpPopupProvider';

export const useGetInstapayExpPopupContext = () => useContext(InstapayExpPopupContext);
