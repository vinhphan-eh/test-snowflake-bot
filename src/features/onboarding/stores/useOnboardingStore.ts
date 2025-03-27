import { create } from 'zustand';
import { STATES, UK_REGIONS } from '../../../common/constants/states';
import { nameRegex } from '../../../common/validations';
import type { NoTaxIdNumberReason } from '../../../new-graphql/generated';
import { IdentityDocumentType } from '../../../new-graphql/generated';

export interface ResidentialAddress {
  unitNumber: string;
  streetNumber: string;
  streetName: string;
  streetType: string;
  postcode: string;
  townOrCity: string;
  region: string;
  country?: string;
  longForm: string;
}

export interface TaxObligation {
  country: string;
  trn?: string;
  reason?: NoTaxIdNumberReason;
}

interface PhoneNumber {
  countryCode: string;
  number: string;
}

export interface ProfileDetails {
  firstName: string;
  lastName: string;
  middleName?: string;
  phoneNumber: PhoneNumber;
  residentialAddress: ResidentialAddress;
  dateOfBirth: string;
  identityDocumentType: IdentityDocumentType;
  identityDocumentNumber: string;
  identityIssuingState?: string;
  identityCardNumber?: string;
}

export interface PersonalName {
  firstName: string;
  lastName: string;
  middleName?: string;
}

interface OnboardingState {
  privacyPolicyConsentTimestamp: null | Date;
  hasConsentedPrivacyPolicy: boolean;
  agreePrivacyPolicy: () => void;
  termsConditionsConsentTimestamp: null | Date;
  hasConsentedTermsConditions: boolean;
  agreeTermsConditions: () => void;
  identityVerificationTermsConsentTimestamp: null | Date;
  hasConsentedIdentityVerificationTerms: boolean;
  agreeIdentityVerificationTerms: () => void;
  taxObligationsConsentTimestamp: null | Date;
  agreeTaxObligations: () => void;
  personalDetails: ProfileDetails;
  setPersonalDetails: (personalDetails: Partial<ProfileDetails>) => void;
  taxObligations: TaxObligation[] | null;
  setTaxObligations: (taxObligations: TaxObligation[]) => void;
  isNameValid: () => boolean;
  isPhoneNumberValid: () => boolean;
  isResidentialAddressValid: () => boolean;
  isDoBValid: () => boolean;
  getNextProfileInputPage: (
    currentPage:
      | 'ProfileName'
      | 'ProfilePhoneNumber'
      | 'ProfileResidentialAddress'
      | 'ProfileDoB'
      | 'PersonalDetails'
      | 'TaxObligations'
  ) => 'ProfileName' | 'ProfilePhoneNumber' | 'ProfileResidentialAddress' | 'ProfileDoB' | 'PersonalDetails';
}

const useOnboardingStore = create<OnboardingState>()((set, get) => ({
  privacyPolicyConsentTimestamp: null,
  hasConsentedPrivacyPolicy: false,
  agreePrivacyPolicy: () => set({ hasConsentedPrivacyPolicy: true, privacyPolicyConsentTimestamp: new Date() }),
  termsConditionsConsentTimestamp: null,
  hasConsentedTermsConditions: false,
  agreeTermsConditions: () => set({ hasConsentedTermsConditions: true, termsConditionsConsentTimestamp: new Date() }),
  identityVerificationTermsConsentTimestamp: null,
  hasConsentedIdentityVerificationTerms: false,
  agreeIdentityVerificationTerms: () =>
    set({ hasConsentedIdentityVerificationTerms: true, identityVerificationTermsConsentTimestamp: new Date() }),
  taxObligationsConsentTimestamp: null,
  agreeTaxObligations: () => set({ taxObligationsConsentTimestamp: new Date() }),
  personalDetails: {
    firstName: '',
    lastName: '',
    middleName: '',
    phoneNumber: {
      countryCode: '',
      number: '',
    },
    residentialAddress: {
      unitNumber: '',
      streetNumber: '',
      streetName: '',
      streetType: '',
      postcode: '',
      townOrCity: '',
      region: '',
      country: '',

      longForm: '',
    },
    dateOfBirth: '',
    identityDocumentNumber: '',
    identityDocumentType: IdentityDocumentType.DrivingLicense,
    identityCardNumber: '',
  },
  setPersonalDetails: (personalDetails: Partial<ProfileDetails>) => {
    set({ personalDetails: { ...get().personalDetails, ...personalDetails } });
  },
  taxObligations: null,
  setTaxObligations: taxObligations => {
    set({ taxObligations });
  },
  isNameValid: () => {
    const { firstName, lastName, middleName } = get().personalDetails;
    return nameRegex.test(firstName) && nameRegex.test(lastName) && (!middleName?.length || nameRegex.test(middleName));
  },
  isDoBValid: () => {
    const { dateOfBirth } = get().personalDetails;
    return dateOfBirth?.length > 0;
  },
  isPhoneNumberValid: () => {
    const { phoneNumber } = get().personalDetails;
    return phoneNumber?.countryCode?.length > 0 && phoneNumber?.number?.length > 0;
  },
  isResidentialAddressValid: () => {
    const { residentialAddress } = get().personalDetails;
    const { postcode, region, streetName, streetNumber, streetType, townOrCity } = residentialAddress || {};
    const isAUStateValid = STATES.find(_state => _state.code === region) !== undefined;
    const isUkRegionValid = UK_REGIONS.find(_region => _region.code === region) !== undefined;

    return (
      !!streetNumber &&
      !!streetName &&
      !!streetType &&
      !!postcode &&
      !!townOrCity &&
      !!region &&
      (isAUStateValid || isUkRegionValid)
    );
  },
  getNextProfileInputPage: (currentPage: string) => {
    if (!get().isNameValid() && currentPage !== 'ProfileName') {
      return 'ProfileName';
    }
    if (!get().isPhoneNumberValid() && currentPage !== 'ProfilePhoneNumber') {
      return 'ProfilePhoneNumber';
    }
    if (!get().isResidentialAddressValid() && currentPage !== 'ProfileResidentialAddress') {
      return 'ProfileResidentialAddress';
    }
    if (!get().isDoBValid() && currentPage !== 'ProfileDoB') {
      return 'ProfileDoB';
    }
    return 'PersonalDetails';
  },
}));

export { useOnboardingStore };
export type { OnboardingState };
