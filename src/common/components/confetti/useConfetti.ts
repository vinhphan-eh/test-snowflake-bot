import { useContext } from 'react';
import { ConfettiContext } from './ConfettiProvider';

export const useConfetti = () => useContext(ConfettiContext);
