export enum PayFrequency {
  Weekly = 'Weekly',
  Fortnightly = 'Fortnightly',
  Monthly = 'Monthly',
}

export enum UserSource {
  EH = 'EH',
  KP = 'KP',
}

export type AccountDetails = KPAccountDetails | EHAccountDetails;

export type KPAccountDetails = {
  userSource: UserSource.KP;
  email: string;
  password: string;
  kpBusinessId: string;
  kpEmployeeId: string;
  payFrequency: PayFrequency;
  isPaidInArrears?: boolean;
  country?: `${SupportedCountries}`;
};

export type EHAccountDetails = {
  userSource: UserSource.EH;
  email: string;
  password: string;
  targetOrgUuid: string;
  kpBusinessId: string;
  kpEmployeeId: string;
  payFrequency: PayFrequency;
  isPaidInArrears?: boolean;
  orgId?: number;
  memberId?: number;
  country?: `${SupportedCountries}`;
};

export enum SupportedCountries {
  AU = 'AU',
  GB = 'GB',
}

export const getTimezoneByAccount = (account: AccountDetails) => {
  if (account.country === 'GB') {
    return 'Europe/London';
  }
  return 'Australia/Sydney';
};

export const getTimezoneByCountry = (country: `${SupportedCountries}`) => {
  if (country === 'GB') {
    return 'Europe/London';
  }
  return 'Australia/Sydney';
};
