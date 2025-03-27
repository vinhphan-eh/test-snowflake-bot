// eslint-disable-next-line import/no-cycle
import { getRandomIntDigit } from '../utils/utils';

const PREFIX = process.env.TEST_PREFIX || '';

export const benefitsTestAccount = {
  terminatedWithActiveBill: {
    email: 'benefits.e2e.terminated+1@gmail.com',
    password: 'Khoa@10AM',
    device_id: '',
    appPassCode: '222222',
    cardPassCode: '8104',
  },
  terminatedNoOnboardCashbackNoAnyPurchase: {
    email: 'benefits.e2e.terminated+2@gmail.com',
    password: 'Khoa@10AM',
    device_id: '',
    appPassCode: '222222',
    cardPassCode: '8104',
  },
  terminatedWithPurchaseHistory: {
    email: 'vilip.wong+qqw@employmenthero.com',
    password: '123Qweasd',
    device_id: '',
    appPassCode: '222222',
    cardPassCode: '8104',
  },
  invalidCountryWithPurchaseHistory: {
    email: 'khoa.tran132@gmail.com',
    password: 'Khoa@10AM',
    device_id: '',
    appPassCode: '222222',
    cardPassCode: '8104',
  },
  invalidCountry: {
    email: 'khoa.tran15@gmail.com',
    password: 'Khoa@10AM',
    device_id: '',
    appPassCode: '222222',
    cardPassCode: '8104',
  },
  workzoneAccount: {
    email: 'hoa.nguyen+e2e_employee@employmenthero.com',
    password: 'employmenthero123',
    device_id: '',
    appPassCode: '222222',
    cardPassCode: '8104',
  },
  candidateAccount: {
    email: 'khoa.tran111@gmail.com',
    password: 'Automation@EH',
    device_id: '',
    appPassCode: '222222',
    cardPassCode: '8104',
  },
  withHeroPoints: {
    email: 'benefits.e2e.1@gmail.com',
    password: 'Khoa@10AM',
    device_id: '',
    appPassCode: '222222',
    cardPassCode: '8104',
  },
  ukAccount: {
    email: 'tien.bui@test134.com',
    password: 'tienbui@123',
    device_id: '',
    appPassCode: '222222',
    cardPassCode: '8104',
  },
  benefitsIaV2: {
    email: 'benefits.e2e.1@gmail.com',
    password: 'Khoa@10AM',
    device_id: '',
    appPassCode: '222222',
    cardPassCode: '8104',
  },
  benefitsIaV2NoHp: {
    email: 'benefits.e2e.4@gmail.com',
    password: 'Khoa@10AM',
    device_id: '',
    appPassCode: '222222',
    cardPassCode: '8104',
  },
  benefitsIaV2NewAcc: {
    email: 'benefits.e2e.2@gmail.com',
    password: 'Khoa@10AM',
    device_id: '',
    appPassCode: '222222',
    cardPassCode: '8104',
  },
  benefitsIaV2UK: {
    email: 'benefits.e2e.uk.1@gmail.com',
    password: 'Khoa@10AM',
    device_id: '',
    appPassCode: '222222',
    cardPassCode: '8104',
  },
  benefitsIaV2NZ: {
    email: 'benefits.e2e.nz.1@gmail.com',
    password: 'Khoa@10AM',
    device_id: '',
    appPassCode: '222222',
    cardPassCode: '8104',
  },
  UkWithHP: {
    email: 'james.boh+uk@employmenthero.com',
    password: 'Jamesboh123',
    device_id: '',
    appPassCode: '222222',
    cardPassCode: '8104',
  },
  benefitsIaV2ActiveBill: {
    email: 'benefits.e2e.4@gmail.com',
    password: 'Khoa@10AM',
    device_id: '',
    appPassCode: '222222',
    cardPassCode: '8104',
  },
  benefitsIaV2NoActiveBill: {
    email: 'benefits.e2e.1@gmail.com',
    password: 'Khoa@10AM',
    device_id: '',
    appPassCode: '222222',
    cardPassCode: '8104',
  },
  benefitsIaV2WithCard: {
    email: 'benefits.e2e.7@gmail.com',
    password: 'Khoa@10AM',
    device_id: '',
    appPassCode: '222222',
    cardPassCode: '8104',
  },
  benefitsIaV2NoSSACard: {
    email: 'benefits.e2e.8@gmail.com',
    password: 'Khoa@10AM',
    device_id: '',
    appPassCode: '222222',
    cardPassCode: '8104',
  },
};

export const moneySourceAccount = {
  email: 'eh.eben.test.notification@gmail.com',
  password: 'Automation@EH',
  device_id: 'test1',
  appPassCode: '222222',
  cardPassCode: '3537',
};

export const payAnyoneIOSAccount = {
  email: 'eh.eben.payanyone.ios@gmail.com',
  password: 'Automation@EH',
  device_id: 'test1',
  appPassCode: '222222',
  cardPassCode: '3537',
  bsb: '636220',
  account_number: '74387240',
};

export const payAnyoneAndroidAccount = {
  email: 'eh.eben.payanyone.android2@gmail.com',
  password: 'Automation@EH',
  device_id: 'test1',
  appPassCode: '222222',
  cardPassCode: '3537',
  bsb: '636220',
  account_number: '46591833',
};
// TODO: Change to another account that is solely used for testing
export const withActivatedCardAccount = {
  email: 'eh.eben.test+100@gmail.com',
  password: 'Automation@EH',
  device_id: '',
  appPassCode: '222222',
  cardPassCode: '8104',
};

export const cashbackTestAccount = {
  email: 'benefitsiav1@gmail.com',
  password: 'Khoa@10AM',
  device_id: '',
  appPassCode: '222222',
  cardPassCode: '8104',
};

export const billManagementTestAccount = {
  email: 'vilip.wong+test1@employmenthero.com',
  password: '123Qweasd!',
  device_id: '',
  appPassCode: '222222',
  cardPassCode: '8104',
};

export const testAccounts = {
  owner: {
    username: `e2e+owner@e2e.${PREFIX}.ehrocks.com`,
    password: 'Khoa@10AM',
  },
  manager: {
    username: `e2e@e2e.${PREFIX}.ehrocks.com`,
    password: 'Khoa@10AM',
  },
  employee: {
    username: `e2e+employee@e2e.${PREFIX}.ehrocks.com`,
    password: 'Khoa@10AM',
  },
};

export const personalInfo = {
  userInfo: {
    firstName: 'Test',
    lastName: 'Test',
    middleName: 'passall',
  },
  dateOfBirth: '1996-01-25',
  passport: 'P7956881',
  address: {
    addressLine1: '395 Bourke St',
    postcode: '3000',
    suburb: 'Test',
    state: 'VIC',
    streetName: 'Bourke',
    streetNumber: '395',
    streetType: 'St',
    townOrCity: 'Melbourne',
    country: 'AUS',
    full: '395 Bourke St, Melbourne VIC 3000, Australia',
  },
  pinPasscode: '3637',
  phone: () => {
    return getRandomIntDigit(11).toString();
  },
};

export const eWalletSetupDetails = {
  dateOfBirth: personalInfo.dateOfBirth,
  firstName: personalInfo.userInfo.firstName,
  hasConsentedIdentityVerificationTerms: true,
  hasConsentedPrivacyPolicy: true,
  hasConsentedTermsConditions: true,
  identityCardNumber: '',
  identityDocumentIssuingState: undefined,
  identityDocumentNumber: personalInfo.passport,
  identityDocumentType: 'PASSPORT',
  lastName: personalInfo.userInfo.lastName,
  mailingAddress: {
    addressLine1: personalInfo.address.addressLine1,
    addressLine2: '',
    country: personalInfo.address.country,
    postcode: personalInfo.address.postcode,
    region: personalInfo.address.state,
    townOrCity: 'Melbourne',
  },
  middleName: personalInfo.userInfo.middleName,
  phoneNumber: {
    countryCode: '+61',
    number: personalInfo.phone(),
  },
  residentialAddress: {
    country: 'AUS',
    postcode: personalInfo.address.postcode,
    region: personalInfo.address.state,
    streetName: personalInfo.address.streetName,
    streetNumber: personalInfo.address.streetType,
    streetType: personalInfo.address.streetType,
    townOrCity: personalInfo.address.townOrCity,
    unitNumber: '',
  },
};

export const withStashAccount = {
  email: 'e2e.stash@gmail.com',
  password: '1234asdf!?',
};

export const heroPointsAccounts = {
  au: {
    email: 'hd.e2e.test.only@gmail.com',
    password: 'Automation@EH',
  },
  uk: {
    email: 'hp.e2e.test.only+uk@gmail.com',
    password: 'Automation@EH',
  },
};
