import { AUSTRALIAN_SUPER_FUND_USIS, CARE_SUPER_USIS } from '../constants/usiFunds';

export const isAustralianSuper = (usi: string): boolean => AUSTRALIAN_SUPER_FUND_USIS.includes(usi);

export const isCareSuper = (usi: string) => CARE_SUPER_USIS.includes(usi);

export const isLifecycleOffboardingDownloadChoiceFormFlow = (usi: string) => isAustralianSuper(usi) || isCareSuper(usi);
