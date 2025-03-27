import type { ResponseResolver, GraphQLRequest, GraphQLContext } from 'msw';
import { graphql } from 'msw';
import type { UseMutationOptions, UseQueryOptions, UseInfiniteQueryOptions } from 'react-query';
import { useMutation, useQuery, useInfiniteQuery } from 'react-query';
import { useFetchData } from '../common/shared-hooks/useFetchData';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AccountTransferInput = {
  accountName: Scalars['String'];
  accountNumber: Scalars['String'];
  amount: Scalars['Float'];
  bsb: Scalars['String'];
  category?: InputMaybe<Scalars['String']>;
  description: Scalars['String'];
  idempotencyKey?: InputMaybe<Scalars['String']>;
  reference?: InputMaybe<Scalars['String']>;
  senderName?: InputMaybe<Scalars['String']>;
};

export type Address = {
  __typename?: 'Address';
  addressLine1: Scalars['String'];
  addressLine2?: Maybe<Scalars['String']>;
  addressLine3?: Maybe<Scalars['String']>;
  country: Scalars['String'];
  postcode: Scalars['String'];
  region: Scalars['String'];
  townOrCity: Scalars['String'];
};

export type AddressInput = {
  addressLine1: Scalars['String'];
  addressLine2?: InputMaybe<Scalars['String']>;
  addressLine3?: InputMaybe<Scalars['String']>;
  country: Scalars['String'];
  postcode: Scalars['String'];
  region: Scalars['String'];
  townOrCity: Scalars['String'];
};

export type AddressInputV2 = {
  country: Scalars['String'];
  postcode: Scalars['String'];
  region: Scalars['String'];
  streetName: Scalars['String'];
  streetNumber: Scalars['String'];
  streetType: Scalars['String'];
  townOrCity: Scalars['String'];
  unitNumber?: InputMaybe<Scalars['String']>;
};

export type AddressInputV3 = {
  addressLine1: Scalars['String'];
  country: Scalars['String'];
  postcode: Scalars['String'];
  region: Scalars['String'];
  streetName: Scalars['String'];
  streetNumber: Scalars['String'];
  streetType: Scalars['String'];
  townOrCity: Scalars['String'];
  unitNumber?: InputMaybe<Scalars['String']>;
};

export type AutoEnrolInput = {
  message?: InputMaybe<Scalars['String']>;
  status: Scalars['Boolean'];
};

export enum AutoEnrolStatus {
  Failed = 'FAILED',
  Success = 'SUCCESS',
  Unknown = 'UNKNOWN',
}

export type BankAccount = {
  __typename?: 'BankAccount';
  accountName: Scalars['String'];
  accountNumber: Scalars['String'];
  bsb: Scalars['String'];
  external_id: Scalars['String'];
  id: Scalars['Int'];
};

export type BankLinkedInput = {
  message?: InputMaybe<Scalars['String']>;
  status: Scalars['Boolean'];
};

export enum BankLinkedStatus {
  Failed = 'FAILED',
  Success = 'SUCCESS',
  Unknown = 'UNKNOWN',
}

export type BenefitsMinSupportVersion = {
  __typename?: 'BenefitsMinSupportVersion';
  minSupportAppVersion: Scalars['String'];
};

export type Card = {
  __typename?: 'Card';
  accountId: Scalars['String'];
  cardToken?: Maybe<Scalars['String']>;
  customerId?: Maybe<Scalars['String']>;
  expiryDate?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  issuedDateTimeUtc?: Maybe<Scalars['String']>;
  lastFourDigits?: Maybe<Scalars['String']>;
  nameOnCard: Scalars['String'];
  status: CardStatus;
};

export type CardMeta = {
  __typename?: 'CardMeta';
  contactless?: Maybe<Scalars['Boolean']>;
  designReference?: Maybe<Scalars['String']>;
  digitalWalletDetails?: Maybe<DigitalWalletDetails>;
  frozen?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  lastFourDigits?: Maybe<Scalars['String']>;
  magStrip?: Maybe<Scalars['Boolean']>;
  mobileWalletPaymentEnabled?: Maybe<Scalars['Boolean']>;
  nameOnCard?: Maybe<Scalars['String']>;
  pinEnabled?: Maybe<Scalars['String']>;
  status?: Maybe<CardStatus>;
};

export type CardMetaInput = {
  contactless?: InputMaybe<Scalars['Boolean']>;
  frozen?: InputMaybe<Scalars['Boolean']>;
  magStrip?: InputMaybe<Scalars['Boolean']>;
  mobileWalletPaymentEnabled?: InputMaybe<Scalars['Boolean']>;
};

export type CardRequestInput = {
  idempotencyKey: Scalars['String'];
  pin: Scalars['String'];
};

export enum CardStatus {
  Active = 'ACTIVE',
  AwaitingActivation = 'AWAITING_ACTIVATION',
  Blocked = 'BLOCKED',
  Expired = 'EXPIRED',
  Inactive = 'INACTIVE',
}

export enum CashBackType {
  Instore = 'instore',
  Online = 'online',
}

export type CashbackBank = {
  __typename?: 'CashbackBank';
  id: Scalars['Int'];
  name: Scalars['String'];
  region: Scalars['String'];
};

export type CashbackBankDetail = {
  __typename?: 'CashbackBankDetail';
  accountNumber?: Maybe<Scalars['String']>;
  bsb?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
};

export type CashbackBankDetailInput = {
  accountNumber: Scalars['String'];
  bsb: Scalars['String'];
};

export type CashbackCard = {
  __typename?: 'CashbackCard';
  cardMasked: Scalars['String'];
  description: Scalars['String'];
  expiry: Scalars['String'];
  id: Scalars['Int'];
  isExpired: Scalars['Boolean'];
  issuer: Scalars['String'];
  lastFour?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
};

export type CashbackCategory = {
  __typename?: 'CashbackCategory';
  id: Scalars['String'];
  image: Scalars['String'];
  name: Scalars['String'];
};

export type CashbackDeleteCardInput = {
  cardId: Scalars['Int'];
};

export type CashbackEnrolCardInput = {
  bankCode: Scalars['Int'];
  cardData: Scalars['String'];
  isDefault: Scalars['Boolean'];
};

export type CashbackIntroductionContent = {
  __typename?: 'CashbackIntroductionContent';
  step1: IntroductionContent;
  step2: IntroductionContent;
  step3: IntroductionContent;
};

export type CashbackOnboardStatus = {
  __typename?: 'CashbackOnboardStatus';
  hasCLOOnboarded?: Maybe<Scalars['Boolean']>;
};

export type CashbackTermsAndCondition = {
  __typename?: 'CashbackTermsAndCondition';
  boldText?: Maybe<Scalars['String']>;
  boldTextVariant?: Maybe<Scalars['String']>;
  showListItemSymbol?: Maybe<Scalars['Boolean']>;
  text: Scalars['String'];
  textVariant: Scalars['String'];
  type: Scalars['String'];
  url?: Maybe<Scalars['String']>;
};

export type CashbackTransaction = {
  __typename?: 'CashbackTransaction';
  advertiserName: Scalars['String'];
  amount: Scalars['Float'];
  created: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['Int'];
  imageUrl: Scalars['String'];
  meta?: Maybe<CashbackTransactionMeta>;
  offerId: Scalars['Int'];
  purchaseAmount?: Maybe<Scalars['Float']>;
  recordType: TransactionRecordType;
  state: TransactionState;
};

export type CashbackTransactionMeta = {
  __typename?: 'CashbackTransactionMeta';
  accountNumber: Scalars['String'];
};

export type CashbackTransactions = {
  __typename?: 'CashbackTransactions';
  pending: Scalars['Float'];
  total: Scalars['Float'];
  transactions: Array<CashbackTransaction>;
};

export type CashbackTransactionsV2 = {
  __typename?: 'CashbackTransactionsV2';
  confirmed: Scalars['Float'];
  pending: Scalars['Float'];
  total: Scalars['Float'];
  transactions: Array<CashbackTransaction>;
};

export type CashbackUserInfo = {
  __typename?: 'CashbackUserInfo';
  autoEnrolMessage?: Maybe<Scalars['String']>;
  autoEnrolStatus?: Maybe<AutoEnrolStatus>;
  bankLinkedMessage?: Maybe<Scalars['String']>;
  bankLinkedStatus?: Maybe<BankLinkedStatus>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type CashbackUserToken = {
  __typename?: 'CashbackUserToken';
  key: Scalars['String'];
  token: Scalars['String'];
};

export type CloseStashPayload = {
  __typename?: 'CloseStashPayload';
  result?: Maybe<Scalars['Boolean']>;
};

export type Counterpart = {
  __typename?: 'Counterpart';
  accountNumber?: Maybe<Scalars['String']>;
  bsb?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type CreateStashInput = {
  imageUrl?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  targetAmount?: InputMaybe<Scalars['Float']>;
};

export type CreateStripeClientTokenInput = {
  amount?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
};

export type CurrencyAmount = {
  __typename?: 'CurrencyAmount';
  amount?: Maybe<Scalars['Float']>;
  currency?: Maybe<Scalars['String']>;
};

export type CurrentUser = {
  __typename?: 'CurrentUser';
  dateOfBirth?: Maybe<Scalars['String']>;
  eWalletSetupStatus?: Maybe<EWalletSetupStatus>;
  eWalletStatusReason?: Maybe<EWalletStatusReason>;
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  mailingAddress?: Maybe<Address>;
  middleName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<PhoneNumber>;
  preferredName?: Maybe<Scalars['String']>;
  residentialAddress?: Maybe<ResidentialAddress>;
};

export type DepositStashInput = {
  amount: Scalars['Float'];
};

export type DigitalWallet = {
  __typename?: 'DigitalWallet';
  reference: Scalars['String'];
  type: WalletType;
};

export type DigitalWalletDetails = {
  __typename?: 'DigitalWalletDetails';
  primaryAccountIdentifier?: Maybe<Scalars['String']>;
  wallets?: Maybe<Array<Maybe<DigitalWallet>>>;
};

export type DiscountHistory = {
  __typename?: 'DiscountHistory';
  billableAmount: Scalars['Float'];
  createdAt: Scalars['String'];
  freightCost: Scalars['Float'];
  id: Scalars['String'];
  memberId: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  orderDetails: Array<OrderDetail>;
  status: OrderStatus;
  transactionFee: Scalars['Float'];
};

export type DiscountOrderHistoryResponse = {
  __typename?: 'DiscountOrderHistoryResponse';
  itemPerPage: Scalars['Int'];
  items: Array<DiscountHistory>;
  pageIndex: Scalars['Int'];
  totalItems: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type Drawdown = {
  __typename?: 'Drawdown';
  data?: Maybe<DrawdownTransaction>;
  message?: Maybe<Scalars['String']>;
  messageCode?: Maybe<DrawdownWageMessageCode>;
  status?: Maybe<Scalars['String']>;
};

export type DrawdownTransaction = {
  __typename?: 'DrawdownTransaction';
  accountEmail?: Maybe<Scalars['String']>;
  accountName?: Maybe<Scalars['String']>;
  accountNumber?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['String']>;
  bsb?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  expectedPayDate?: Maybe<Scalars['String']>;
  transactionId?: Maybe<Scalars['String']>;
};

export enum DrawdownWageMessageCode {
  Accepted = 'ACCEPTED',
  Complete = 'COMPLETE',
  DeductionFailed = 'DEDUCTION_FAILED',
  Draft = 'DRAFT',
  Error = 'ERROR',
  InsufficientInstapayBalance = 'INSUFFICIENT_INSTAPAY_BALANCE',
  InternalError = 'INTERNAL_ERROR',
  PaymentProcessed = 'PAYMENT_PROCESSED',
  Pending = 'PENDING',
  RefusedAccountBlocked = 'REFUSED_ACCOUNT_BLOCKED',
  RefusedCustomerPreference = 'REFUSED_CUSTOMER_PREFERENCE',
  RefusedDailyTransfersOutLimitBreached = 'REFUSED_DAILY_TRANSFERS_OUT_LIMIT_BREACHED',
  RefusedFraud = 'REFUSED_FRAUD',
  RefusedInsufficientFunds = 'REFUSED_INSUFFICIENT_FUNDS',
  RefusedInvalidPayId = 'REFUSED_INVALID_PAY_ID',
  RefusedLimitBreach = 'REFUSED_LIMIT_BREACH',
  RefusedMaxBalanceExceeded = 'REFUSED_MAX_BALANCE_EXCEEDED',
  RefusedRecipientAccountBlocked = 'REFUSED_RECIPIENT_ACCOUNT_BLOCKED',
  RefusedTotalInboundDirectDebitDailyLimitBreached = 'REFUSED_TOTAL_INBOUND_DIRECT_DEBIT_DAILY_LIMIT_BREACHED',
  RefusedTotalNetVisaDailyLimitBreached = 'REFUSED_TOTAL_NET_VISA_DAILY_LIMIT_BREACHED',
  RefusedTotalNonSchemeDailyLimitBreached = 'REFUSED_TOTAL_NON_SCHEME_DAILY_LIMIT_BREACHED',
  RefusedTotalOutboundBpayDailyLimitBreached = 'REFUSED_TOTAL_OUTBOUND_BPAY_DAILY_LIMIT_BREACHED',
  Revert = 'REVERT',
  Unknown = 'UNKNOWN',
}

export type DrawdownWagePayload = {
  __typename?: 'DrawdownWagePayload';
  drawdown?: Maybe<Drawdown>;
};

export type EWalletDetails = {
  __typename?: 'EWalletDetails';
  accountName: Scalars['String'];
  accountNumber: Scalars['String'];
  availableBalance: Scalars['Float'];
  bsb: Scalars['String'];
  totalBalance: Scalars['Float'];
};

export type EWalletSetupDetailsInput = {
  dateOfBirth: Scalars['String'];
  firstName: Scalars['String'];
  gender?: InputMaybe<Scalars['String']>;
  hasConsentedIdentityVerificationTerms: Scalars['Boolean'];
  hasConsentedPrivacyPolicy?: InputMaybe<Scalars['Boolean']>;
  hasConsentedTermsConditions: Scalars['Boolean'];
  identityCardNumber?: InputMaybe<Scalars['String']>;
  identityDocumentIssuingState?: InputMaybe<Scalars['String']>;
  identityDocumentNumber: Scalars['String'];
  identityDocumentType: IdentityDocumentType;
  identityVerificationTermsConsentTimestamp?: InputMaybe<Scalars['String']>;
  lastName: Scalars['String'];
  mailingAddress: AddressInput;
  middleName?: InputMaybe<Scalars['String']>;
  phoneNumber: PhoneNumberInput;
  privacyPolicyConsentTimestamp?: InputMaybe<Scalars['String']>;
  residentialAddress: AddressInput;
  taxObligations?: InputMaybe<Array<InputMaybe<TaxObligationInput>>>;
  termsConditionsConsentTimestamp?: InputMaybe<Scalars['String']>;
};

export type EWalletSetupDetailsInputV2 = {
  dateOfBirth: Scalars['String'];
  firstName: Scalars['String'];
  gender?: InputMaybe<Scalars['String']>;
  hasConsentedIdentityVerificationTerms: Scalars['Boolean'];
  hasConsentedPrivacyPolicy: Scalars['Boolean'];
  hasConsentedTermsConditions: Scalars['Boolean'];
  identityCardNumber?: InputMaybe<Scalars['String']>;
  identityDocumentIssuingState?: InputMaybe<Scalars['String']>;
  identityDocumentNumber: Scalars['String'];
  identityDocumentType: IdentityDocumentType;
  identityVerificationTermsConsentTimestamp?: InputMaybe<Scalars['String']>;
  lastName: Scalars['String'];
  mailingAddress: AddressInput;
  middleName?: InputMaybe<Scalars['String']>;
  phoneNumber: PhoneNumberInput;
  privacyPolicyConsentTimestamp?: InputMaybe<Scalars['String']>;
  residentialAddress: AddressInputV2;
  taxObligations?: InputMaybe<Array<InputMaybe<TaxObligationInput>>>;
  termsConditionsConsentTimestamp?: InputMaybe<Scalars['String']>;
};

export enum EWalletSetupStatus {
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  InProgress = 'IN_PROGRESS',
  None = 'NONE',
}

export enum EWalletStatusReason {
  Archived = 'ARCHIVED',
  ManualRejected = 'MANUAL_REJECTED',
  None = 'NONE',
}

export type EhCardBinRange = {
  __typename?: 'EhCardBinRange';
  from: Scalars['String'];
  to: Scalars['String'];
};

export type EhMembership = {
  __typename?: 'EhMembership';
  isIndependentContractor: Scalars['Boolean'];
  memberId: Scalars['String'];
  orgId: Scalars['String'];
  orgName: Scalars['String'];
  orgUUID: Scalars['String'];
  xeroConnected: Scalars['Boolean'];
};

export type EhMembershipInput = {
  memberId: Scalars['String'];
  orgId: Scalars['String'];
};

export type EhProfile = {
  __typename?: 'EhProfile';
  avatarUrl?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  stateCode?: Maybe<Scalars['String']>;
  userId: Scalars['String'];
  userUuid: Scalars['String'];
};

export type EhProfilePatchRequest = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  countryCode?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  stateCode?: InputMaybe<Scalars['String']>;
};

export enum EventLogKind {
  Instapay = 'INSTAPAY',
  Paysplit = 'PAYSPLIT',
}

export type EventLogPayloadTuple = {
  key: Scalars['String'];
  value: Scalars['String'];
};

export type EventLogRequest = {
  kind: EventLogKind;
  payload: Array<EventLogPayloadTuple>;
};

export type FinancialTransaction = {
  __typename?: 'FinancialTransaction';
  cardId?: Maybe<Scalars['String']>;
  currencyAmount: CurrencyAmount;
  dateTimeUTC: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  merchant?: Maybe<TransactionMerchant>;
  pending?: Maybe<Scalars['Boolean']>;
  reference?: Maybe<Scalars['String']>;
  transferPeerDetails?: Maybe<TransferPeerDetails>;
  type?: Maybe<Scalars['String']>;
};

export type HeroDollarBalance = {
  __typename?: 'HeroDollarBalance';
  balance: Scalars['Float'];
};

export enum HeroDollarClientType {
  EbfShaype = 'ebf_shaype',
  EmployeeMilestone = 'employee_milestone',
  EmploymentHero = 'employment_hero',
  HeroDollarPurchase = 'hero_dollar_purchase',
  Marketplace = 'marketplace',
  Nomination = 'nomination',
  OrganisationIssuance = 'organisation_issuance',
  Sap = 'sap',
}

export enum HeroDollarReasonType {
  AssistedImplementation = 'assisted_implementation',
  Commission = 'commission',
  Default = 'default',
  InstapayDev = 'instapay_dev',
  Marketing = 'marketing',
  OrganisationIssuance = 'organisation_issuance',
  Other = 'other',
  Refund = 'refund',
  StaffRewards = 'staff_rewards',
  TransactionFee = 'transaction_fee',
}

export type HeroDollarRedemptionFee = {
  __typename?: 'HeroDollarRedemptionFee';
  fee: Scalars['Float'];
};

export type HeroDollarRedemptionFeeResponse = {
  __typename?: 'HeroDollarRedemptionFeeResponse';
  data: HeroDollarRedemptionFee;
};

export type HeroDollarTransactionDetail = {
  __typename?: 'HeroDollarTransactionDetail';
  amount: Scalars['Float'];
  clientType: HeroDollarClientType;
  id: Scalars['String'];
  merchant_name?: Maybe<Scalars['String']>;
  organization_name?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  reasonType?: Maybe<HeroDollarReasonType>;
  recognised_by?: Maybe<Scalars['String']>;
  refId?: Maybe<Scalars['String']>;
  transactionTimeUtc: Scalars['String'];
  transactionType: HeroDollarTransactionType;
};

export type HeroDollarTransactionItem = {
  __typename?: 'HeroDollarTransactionItem';
  amount: Scalars['Float'];
  clientType: HeroDollarClientType;
  id: Scalars['String'];
  reason?: Maybe<Scalars['String']>;
  reasonType?: Maybe<HeroDollarReasonType>;
  refId?: Maybe<Scalars['String']>;
  transactionTimeUtc: Scalars['String'];
  transactionType: HeroDollarTransactionType;
};

export enum HeroDollarTransactionType {
  Deduction = 'deduction',
  DeductionReversion = 'deduction_reversion',
  Topup = 'topup',
  TopupReversion = 'topup_reversion',
  Withdrawal = 'withdrawal',
  WithdrawalReversion = 'withdrawal_reversion',
}

export type HeroDollarTransactions = {
  __typename?: 'HeroDollarTransactions';
  itemPerPage: Scalars['Int'];
  items: Array<Maybe<HeroDollarTransactionItem>>;
  pageIndex: Scalars['Int'];
  totalItems: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type IdvInitiatedResponse = {
  __typename?: 'IDVInitiatedResponse';
  applicantId: Scalars['String'];
  idvToken: Scalars['String'];
  user: User;
};

export type IdvProfile = {
  __typename?: 'IDVProfile';
  applicantId?: Maybe<Scalars['String']>;
  status?: Maybe<IdvProfileStatus>;
  token?: Maybe<Scalars['String']>;
};

export enum IdvProfileStatus {
  Archived = 'ARCHIVED',
  Fail = 'FAIL',
  FailManual = 'FAIL_MANUAL',
  Inactive = 'INACTIVE',
  None = 'NONE',
  Pass = 'PASS',
  PassManual = 'PASS_MANUAL',
  Refer = 'REFER',
  Unchecked = 'UNCHECKED',
  Wait = 'WAIT',
}

export enum IdentityDocumentType {
  DrivingLicense = 'DRIVING_LICENSE',
  Passport = 'PASSPORT',
}

export type InStoreOffer = {
  __typename?: 'InStoreOffer';
  advertiserAboutUs?: Maybe<Scalars['String']>;
  advertiserId: Scalars['String'];
  advertiserName: Scalars['String'];
  cashback?: Maybe<Scalars['String']>;
  category: Scalars['String'];
  categoryId: Scalars['String'];
  coverShotUrl: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  howItWorks?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  locations: Array<InStoreOfferLocation>;
  logo: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  ratingScore?: Maybe<Scalars['Float']>;
  searchTag?: Maybe<Scalars['String']>;
  termsAndConditions?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  website?: Maybe<Scalars['String']>;
};

export type InStoreOfferLocation = {
  __typename?: 'InStoreOfferLocation';
  address: Scalars['String'];
  bearing: Scalars['Float'];
  distance: Scalars['Float'];
  id: Scalars['String'];
  latitude: Scalars['String'];
  longitude: Scalars['String'];
};

export type InStoreOffersResponse = {
  __typename?: 'InStoreOffersResponse';
  itemPerPage: Scalars['Int'];
  items: Array<InStoreOffer>;
  pageIndex: Scalars['Int'];
  totalItems: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type InstapayBankAccount = {
  __typename?: 'InstapayBankAccount';
  accountName: Scalars['String'];
  accountNumber: Scalars['String'];
  bsb: Scalars['String'];
  external_id: Scalars['String'];
  fee: Scalars['Float'];
};

export type InstapayFee = {
  __typename?: 'InstapayFee';
  fee?: Maybe<Scalars['Int']>;
};

export type InstapayHistory = {
  __typename?: 'InstapayHistory';
  abaRef: Scalars['String'];
  adminFee: Scalars['Float'];
  amount: Scalars['Float'];
  createdAt: Scalars['String'];
  feeType: Scalars['String'];
  id: Scalars['String'];
  membership: EhMembership;
  status: Scalars['String'];
};

export type InstapayInfo = {
  __typename?: 'InstapayInfo';
  available: Scalars['Int'];
  deduction: InstapayInfoField;
  leaveDays: Scalars['Int'];
  membership: EhMembership;
  payPeriodCompletedDays: Scalars['Int'];
  payPeriodDays: Scalars['Int'];
  payRate: InstapayInfoField;
};

export type InstapayInfoField = {
  __typename?: 'InstapayInfoField';
  displayName: Scalars['String'];
  unit: Scalars['String'];
  value: Scalars['Int'];
};

export type InstapayUsageVerification = {
  __typename?: 'InstapayUsageVerification';
  memberNotUsedInstapay: Scalars['Boolean'];
};

export type IntroductionContent = {
  __typename?: 'IntroductionContent';
  heading: Scalars['String'];
  verbiage: Scalars['String'];
};

export enum LoginType {
  Eh = 'eh',
  Kp = 'kp',
}

export type MakePaymentItem = {
  quantity: Scalars['Int'];
  variantCode: Scalars['String'];
};

export type MakePaymentPaymentMethod = {
  creditCard?: InputMaybe<Scalars['String']>;
  heroDollars?: InputMaybe<Scalars['String']>;
  heroPoints?: InputMaybe<Scalars['String']>;
  instapay?: InputMaybe<Scalars['String']>;
};

export type MakePaymentResponse = {
  __typename?: 'MakePaymentResponse';
  billableAmount: Scalars['Float'];
  createdAt: Scalars['String'];
  freightCost: Scalars['Float'];
  id: Scalars['String'];
  ipAddress: Scalars['String'];
  memberId: Scalars['String'];
  name: Scalars['String'];
  status: Scalars['String'];
  transactionFee: Scalars['Float'];
  type: Scalars['String'];
};

export type MinSupportVersion = {
  __typename?: 'MinSupportVersion';
  benefits: BenefitsMinSupportVersion;
};

export type Mutation = {
  __typename?: 'Mutation';
  accountTransfer?: Maybe<TransactionResponse>;
  activateCard?: Maybe<Scalars['Boolean']>;
  cancelStripePayment?: Maybe<Scalars['Boolean']>;
  card?: Maybe<Scalars['Boolean']>;
  cashbackAcceptTermsAndConditions: TermsAndConditionsAcceptance;
  cashbackDeleteCard?: Maybe<Scalars['Boolean']>;
  cashbackEnrolCard: CashbackCard;
  cashbackOnboardUser?: Maybe<Scalars['Boolean']>;
  cashbackRegisterUser?: Maybe<Scalars['Boolean']>;
  cashbackUpdateAutoEnrol?: Maybe<Scalars['Boolean']>;
  cashbackUpdateBankDetails?: Maybe<Scalars['Boolean']>;
  cashbackUpdateBankLinked?: Maybe<Scalars['Boolean']>;
  clearPersistentNotification?: Maybe<Scalars['Boolean']>;
  closeStash?: Maybe<CloseStashPayload>;
  createStash?: Maybe<Scalars['Boolean']>;
  createStripeClientToken?: Maybe<PaymentClientToken>;
  depositStash?: Maybe<Scalars['Boolean']>;
  drawdownWage?: Maybe<Scalars['Boolean']>;
  drawdownWageV2?: Maybe<DrawdownWagePayload>;
  eventLog?: Maybe<Scalars['String']>;
  finishSpendAccountCarousel?: Maybe<Scalars['Boolean']>;
  initiateEWalletSetup?: Maybe<User>;
  initiateEWalletSetupV2?: Maybe<User>;
  initiateEWalletSetupV3?: Maybe<Scalars['Boolean']>;
  mailingAddress?: Maybe<Scalars['Boolean']>;
  makePayment?: Maybe<MakePaymentResponse>;
  makePaymentV2?: Maybe<MakePaymentResponse>;
  makeStripePayment?: Maybe<MakePaymentResponse>;
  patchProfile?: Maybe<EhProfile>;
  payAccount?: Maybe<Scalars['Boolean']>;
  requestNewCard?: Maybe<Scalars['Boolean']>;
  saveWalletSetup?: Maybe<IdvInitiatedResponse>;
  seenPayWithHDCarousel?: Maybe<Scalars['Boolean']>;
  sendOtpToCurrentUser?: Maybe<PhoneNumber>;
  setStashMeta?: Maybe<Scalars['Boolean']>;
  startWalletCreation?: Maybe<StartWalletCreationResponse>;
  updateCardMeta?: Maybe<Scalars['Boolean']>;
  updateCardPIN?: Maybe<Scalars['Boolean']>;
  updatePaymentPreferenceSettings: PaymentPreferencesSettings;
  updateUserProfile?: Maybe<Scalars['Boolean']>;
  withdrawStash?: Maybe<Scalars['Boolean']>;
};

export type MutationAccountTransferArgs = {
  transferDetails?: InputMaybe<AccountTransferInput>;
};

export type MutationCancelStripePaymentArgs = {
  clientToken: Scalars['String'];
  ehToken: Scalars['String'];
  orgId: Scalars['String'];
};

export type MutationCardArgs = {
  cardRequest: CardRequestInput;
};

export type MutationCashbackDeleteCardArgs = {
  deleteCard: CashbackDeleteCardInput;
};

export type MutationCashbackEnrolCardArgs = {
  enrolCard: CashbackEnrolCardInput;
};

export type MutationCashbackUpdateAutoEnrolArgs = {
  input: AutoEnrolInput;
};

export type MutationCashbackUpdateBankDetailsArgs = {
  bankDetails: CashbackBankDetailInput;
};

export type MutationCashbackUpdateBankLinkedArgs = {
  input: BankLinkedInput;
};

export type MutationClearPersistentNotificationArgs = {
  type: WalletNotificationType;
};

export type MutationCloseStashArgs = {
  stashId: Scalars['String'];
};

export type MutationCreateStashArgs = {
  stashInput: CreateStashInput;
};

export type MutationCreateStripeClientTokenArgs = {
  createStripeClientTokenInput?: InputMaybe<CreateStripeClientTokenInput>;
  ehToken: Scalars['String'];
  orgId: Scalars['String'];
};

export type MutationDepositStashArgs = {
  depositInput: DepositStashInput;
  stashId: Scalars['String'];
};

export type MutationDrawdownWageArgs = {
  amount: Scalars['Float'];
  bankAccountId: Scalars['String'];
  ehToken: Scalars['String'];
  orgId: Scalars['String'];
};

export type MutationDrawdownWageV2Args = {
  amount: Scalars['Float'];
  bankAccountId: Scalars['String'];
  ehToken: Scalars['String'];
  orgId: Scalars['String'];
};

export type MutationEventLogArgs = {
  event?: InputMaybe<EventLogRequest>;
};

export type MutationInitiateEWalletSetupArgs = {
  setupDetails?: InputMaybe<EWalletSetupDetailsInput>;
};

export type MutationInitiateEWalletSetupV2Args = {
  setupDetails?: InputMaybe<EWalletSetupDetailsInputV2>;
};

export type MutationMailingAddressArgs = {
  address?: InputMaybe<AddressInput>;
};

export type MutationMakePaymentArgs = {
  deviceData: Scalars['String'];
  ehToken: Scalars['String'];
  items: Array<MakePaymentItem>;
  nonce: Scalars['String'];
  orgId: Scalars['String'];
  paymentMethod: MakePaymentPaymentMethod;
};

export type MutationMakePaymentV2Args = {
  deviceData: Scalars['String'];
  ehPlatform?: InputMaybe<Scalars['String']>;
  ehToken: Scalars['String'];
  items: Array<MakePaymentItem>;
  nonce: Scalars['String'];
  orgId: Scalars['String'];
  paymentMethod: MakePaymentPaymentMethod;
  serviceFee: Scalars['String'];
};

export type MutationMakeStripePaymentArgs = {
  deviceData: Scalars['String'];
  ehPlatform?: InputMaybe<Scalars['String']>;
  ehToken: Scalars['String'];
  items: Array<MakePaymentItem>;
  nonce: Scalars['String'];
  orgId: Scalars['String'];
  paymentMethod: MakePaymentPaymentMethod;
  serviceFee: Scalars['String'];
};

export type MutationPatchProfileArgs = {
  ehToken: Scalars['String'];
  orgId?: InputMaybe<Scalars['String']>;
  patch?: InputMaybe<EhProfilePatchRequest>;
};

export type MutationPayAccountArgs = {
  bankDetails: PayAllocationInput;
  ehToken: Scalars['String'];
  membership: EhMembershipInput;
};

export type MutationRequestNewCardArgs = {
  address?: InputMaybe<AddressInput>;
};

export type MutationSaveWalletSetupArgs = {
  setupDetails?: InputMaybe<EWalletSetupDetailsInputV2>;
};

export type MutationSetStashMetaArgs = {
  meta: StashMetaInput;
};

export type MutationStartWalletCreationArgs = {
  startWalletCreationInput?: InputMaybe<StartWalletCreationInput>;
};

export type MutationUpdateCardMetaArgs = {
  cardMeta: CardMetaInput;
};

export type MutationUpdateCardPinArgs = {
  cardPIN: Scalars['String'];
};

export type MutationUpdatePaymentPreferenceSettingsArgs = {
  settings?: InputMaybe<PaymentPreferencesSettingsInput>;
};

export type MutationUpdateUserProfileArgs = {
  userProfile: UpdateUserProfileInput;
};

export type MutationWithdrawStashArgs = {
  stashId: Scalars['String'];
  withdrawInput: WithdrawStashInput;
};

export enum NoTaxIdNumberReason {
  DisclosureNotRequired = 'DISCLOSURE_NOT_REQUIRED',
  NotApplicable = 'NOT_APPLICABLE',
  NotIssued = 'NOT_ISSUED',
}

export enum NotificationStatus {
  Active = 'ACTIVE',
  Cleared = 'CLEARED',
}

export type OemProvisioningData = {
  __typename?: 'OemProvisioningData';
  cardHolderName: Scalars['String'];
  cardToken: Scalars['String'];
  expiryDate: Scalars['String'];
  otp: Scalars['String'];
};

export type OnlineOffer = {
  __typename?: 'OnlineOffer';
  cashback: Scalars['String'];
  category: Scalars['String'];
  categoryId: Scalars['Int'];
  description: Scalars['String'];
  howItWorks: Scalars['String'];
  id: Scalars['String'];
  imageUrl: Scalars['String'];
  isCardLinkedOffer?: Maybe<Scalars['Boolean']>;
  isFavourite: Scalars['Boolean'];
  logo: Scalars['String'];
  searchTag?: Maybe<Scalars['String']>;
  supplierAboutUs: Scalars['String'];
  supplierName: Scalars['String'];
  termsAndConditions: Scalars['String'];
  title: Scalars['String'];
  trackingUrl: Scalars['String'];
  type: CashBackType;
};

export type OnlineOffersResponse = {
  __typename?: 'OnlineOffersResponse';
  itemPerPage: Scalars['Int'];
  items: Array<OnlineOffer>;
  pageIndex: Scalars['Int'];
  totalItems: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type OrderDetail = {
  __typename?: 'OrderDetail';
  billableAmount: Scalars['Float'];
  currency: Scalars['String'];
  discount: Scalars['Float'];
  discountPriceInPoints?: Maybe<Scalars['Int']>;
  freightCost: Scalars['Float'];
  id: Scalars['String'];
  price: Scalars['Float'];
  priceInPoints?: Maybe<Scalars['Int']>;
  productVariant?: Maybe<OrderProductVariant>;
  purchaseItems: Array<OrderPurchaseItem>;
  quantity: Scalars['Int'];
  status: OrderStatus;
  transactionFee: Scalars['Float'];
};

export type OrderProduct = {
  __typename?: 'OrderProduct';
  code: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  howItWorks?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  logoUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  productType: OrderProductType;
  title: Scalars['String'];
};

export enum OrderProductType {
  Dropship = 'dropship',
  Giftcard = 'giftcard',
  Grocery = 'grocery',
  Ticket = 'ticket',
}

export type OrderProductVariant = {
  __typename?: 'OrderProductVariant';
  amount: Scalars['Float'];
  discountPrice: Scalars['Float'];
  imageUrl?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
  product: OrderProduct;
  variantCode: Scalars['String'];
};

export type OrderPurchaseItem = {
  __typename?: 'OrderPurchaseItem';
  data: OrderPurchaseItemData;
  fulfil?: Maybe<OrderPurchaseItemFulfil>;
  id: Scalars['String'];
  productVariantId: Scalars['String'];
  purchaseId: Scalars['String'];
};

export type OrderPurchaseItemData = {
  __typename?: 'OrderPurchaseItemData';
  activationUrl: Scalars['String'];
  /**   to remove after v1.75.2 */
  barCode?: Maybe<Scalars['String']>;
  cardNumber: Scalars['String'];
  expiredAt?: Maybe<Scalars['String']>;
  /**   Format: 2019/07/03 */
  giftCode?: Maybe<Scalars['String']>;
  issuedAt: Scalars['String'];
  orderDetailId?: Maybe<Scalars['String']>;
  pinNumber: Scalars['String'];
  promoCode?: Maybe<Scalars['String']>;
  serialNumber: Scalars['String'];
  uberGiftCode?: Maybe<Scalars['String']>;
};

export type OrderPurchaseItemFulfil = {
  __typename?: 'OrderPurchaseItemFulfil';
  balance: Scalars['Float'];
  id: Scalars['String'];
  isUsed?: Maybe<Scalars['Boolean']>;
};

export enum OrderStatus {
  CancelAccepted = 'cancel_accepted',
  CancellationPending = 'cancellation_pending',
  Cancelled = 'cancelled',
  Dispatched = 'dispatched',
  Fulfilled = 'fulfilled',
  PaymentFailed = 'payment_failed',
  PaymentPending = 'payment_pending',
  Processing = 'processing',
  ProcessingFailed = 'processing_failed',
  RefundRejected = 'refund_rejected',
  RefundRequested = 'refund_requested',
  Refunded = 'refunded',
}

export type PayAccount = {
  accountName?: InputMaybe<Scalars['String']>;
  accountNumber?: InputMaybe<Scalars['String']>;
  accountType?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['String']>;
  bankBranchId?: InputMaybe<Scalars['Int']>;
  bankName?: InputMaybe<Scalars['String']>;
  branchCode?: InputMaybe<Scalars['String']>;
  branchName?: InputMaybe<Scalars['String']>;
  bsb?: InputMaybe<Scalars['String']>;
  lockLevel?: InputMaybe<Scalars['String']>;
  rollNumber?: InputMaybe<Scalars['String']>;
};

export type PayAccountAllocation = {
  __typename?: 'PayAccountAllocation';
  bankAccounts: Array<PayAccountDetails>;
  bankSplitType: PaySplitType;
};

export type PayAccountDetails = {
  __typename?: 'PayAccountDetails';
  accountName: Scalars['String'];
  accountNumber: Scalars['String'];
  amount: Scalars['String'];
  bsb: Scalars['String'];
};

export type PayAllocation = {
  __typename?: 'PayAllocation';
  allocation: PayAccountAllocation;
  membership: EhMembership;
};

export type PayAllocationInput = {
  bankAccounts: Array<PayAccount>;
  bankSplitType: PaySplitType;
};

export enum PaySplitType {
  FixedAmount = 'FIXED_AMOUNT',
  Percentage = 'PERCENTAGE',
}

export type PayWithHdCarouselSeen = {
  __typename?: 'PayWithHDCarouselSeen';
  seen: Scalars['Boolean'];
};

export type PaymentClientToken = {
  __typename?: 'PaymentClientToken';
  clientToken: Scalars['String'];
};

export type PaymentPreferencesSettings = {
  __typename?: 'PaymentPreferencesSettings';
  payWithHDOnSwagCard?: Maybe<Scalars['Boolean']>;
};

export type PaymentPreferencesSettingsInput = {
  payWithHDOnSwagCard?: InputMaybe<Scalars['Boolean']>;
};

export type PersistentNotification = {
  __typename?: 'PersistentNotification';
  id: Scalars['String'];
  notificationStatus: NotificationStatus;
  type: WalletNotificationType;
};

export type PersonalName = {
  __typename?: 'PersonalName';
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  middleName?: Maybe<Scalars['String']>;
};

export type PersonalNameInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  middleName?: InputMaybe<Scalars['String']>;
};

export type PhoneNumber = {
  __typename?: 'PhoneNumber';
  countryCode: Scalars['String'];
  number: Scalars['String'];
};

export type PhoneNumberInput = {
  countryCode: Scalars['String'];
  number: Scalars['String'];
};

export type PickForYouResponse = {
  __typename?: 'PickForYouResponse';
  items: Array<Product>;
};

export type Product = {
  __typename?: 'Product';
  country?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  discountPrice: Scalars['Float'];
  discountPriceInPoints?: Maybe<Scalars['Int']>;
  giftpayBalance: Scalars['Float'];
  id: Scalars['String'];
  image: ShopImage;
  name: Scalars['String'];
  price: Scalars['Float'];
  priceInPoints?: Maybe<Scalars['Int']>;
  productCode: Scalars['String'];
  productType: Scalars['String'];
  serviceFee: Scalars['Float'];
  storefrontImage?: Maybe<ShopImage>;
  termsAndConditions?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  type: Scalars['String'];
};

export type ProductsQueryResult = {
  __typename?: 'ProductsQueryResult';
  itemPerPage: Scalars['Int'];
  items: Array<Product>;
  pageIndex: Scalars['Int'];
  sort: Scalars['String'];
  sortDir: Scalars['String'];
  totalItems: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type PublishableKeys = {
  __typename?: 'PublishableKeys';
  publishableKey: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  allocations: Array<PayAllocation>;
  bankAccount?: Maybe<Array<Maybe<BankAccount>>>;
  buyAgainGiftCards: Array<Product>;
  cashbackBanks: Array<CashbackBank>;
  cashbackCategories: Array<CashbackCategory>;
  cashbackEmploymentHeroProviderId: Scalars['String'];
  cashbackFeaturedOnlineOffers: Array<OnlineOffer>;
  cashbackInStoreOfferDetail: InStoreOffer;
  cashbackInStoreOffers: InStoreOffersResponse;
  cashbackIntroductionContent: CashbackIntroductionContent;
  cashbackLinkedCards: Array<CashbackCard>;
  cashbackOnboardStatus: CashbackOnboardStatus;
  cashbackTermsAndConditions: Array<CashbackTermsAndCondition>;
  cashbackTermsAndConditionsAcceptance: TermsAndConditionsAcceptance;
  cashbackTransactions: CashbackTransactions;
  cashbackTransactionsV2: CashbackTransactionsV2;
  cashbackUserBank: CashbackBankDetail;
  cashbackUserInfo?: Maybe<CashbackUserInfo>;
  cashbackUserToken: CashbackUserToken;
  currentUser?: Maybe<CurrentUser>;
  discountOrderDetail: OrderDetail;
  discountOrderHistory: DiscountOrderHistoryResponse;
  discountShopProductDetail: ShopProductDetail;
  discountShopProducts: ProductsQueryResult;
  eWallet?: Maybe<EWalletDetails>;
  ehCardBinRange?: Maybe<EhCardBinRange>;
  getCardDetails?: Maybe<Card>;
  getCurrentCardDetails?: Maybe<Card>;
  getCurrentCardMeta?: Maybe<CardMeta>;
  getEHUserInitializationDetails?: Maybe<UserInitializationDetails>;
  getGooglePlaceApiKey: SecretKey;
  getIDVProfile: IdvProfile;
  getKPUserInitializationDetails?: Maybe<UserInitializationDetails>;
  getOemProvisioningData?: Maybe<OemProvisioningData>;
  getOemProvisioningDataWithoutOTP?: Maybe<OemProvisioningData>;
  getPayAccount?: Maybe<PayAccountAllocation>;
  getPersistentNotifications?: Maybe<Array<Maybe<PersistentNotification>>>;
  getSpendAccountCarouselFinished?: Maybe<SpendAccountCarouselFinished>;
  getStashMeta?: Maybe<StashMeta>;
  getStashTransactions?: Maybe<Array<Maybe<StashTransaction>>>;
  getStashes?: Maybe<Array<Maybe<Stash>>>;
  getTransactions?: Maybe<Array<Maybe<Transaction>>>;
  getTransactionsV2?: Maybe<Array<Maybe<FinancialTransaction>>>;
  getUKToken?: Maybe<StartWalletCreationResponse>;
  heroDollarBalance: HeroDollarBalance;
  heroDollarRedemptionFee: HeroDollarRedemptionFeeResponse;
  heroDollarTransactionDetail?: Maybe<HeroDollarTransactionDetail>;
  heroDollarTransactions: HeroDollarTransactions;
  instapayBankAccounts?: Maybe<Array<Maybe<InstapayBankAccount>>>;
  instapayFee?: Maybe<InstapayFee>;
  instapayHistory: Array<InstapayHistory>;
  instapayHistoryV2: Array<InstapayHistory>;
  instapayInfo: Array<InstapayInfo>;
  instapayUsageVerification?: Maybe<InstapayUsageVerification>;
  memberships: Array<EhMembership>;
  minSupportVersion?: Maybe<MinSupportVersion>;
  onlineOfferDetail: OnlineOffer;
  onlineOffers: OnlineOffersResponse;
  payWithHDCarouselSeenStatus: PayWithHdCarouselSeen;
  paymentClientToken: PaymentClientToken;
  paymentPreferenceSettings: PaymentPreferencesSettings;
  paymentVerifyCreditCard: VerifyCreditCard;
  pickForYou: PickForYouResponse;
  popularGiftCards: Array<Product>;
  profile?: Maybe<EhProfile>;
  profileChangeRequest?: Maybe<Array<Maybe<UserDetailChangeRequest>>>;
  stripePublishableKey: PublishableKeys;
  userPermission: Array<UserPermission>;
};

export type QueryAllocationsArgs = {
  ehToken: Scalars['String'];
};

export type QueryBankAccountArgs = {
  ehToken: Scalars['String'];
  membership: EhMembershipInput;
};

export type QueryBuyAgainGiftCardsArgs = {
  ehToken: Scalars['String'];
  orgId: Scalars['String'];
};

export type QueryCashbackInStoreOfferDetailArgs = {
  offerId: Scalars['String'];
};

export type QueryCashbackInStoreOffersArgs = {
  distance?: InputMaybe<Scalars['Float']>;
  itemPerPage?: InputMaybe<Scalars['Int']>;
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  searchTerm?: InputMaybe<Scalars['String']>;
};

export type QueryDiscountOrderDetailArgs = {
  ehToken: Scalars['String'];
  orderId: Scalars['String'];
  orgId: Scalars['String'];
};

export type QueryDiscountOrderHistoryArgs = {
  ehToken: Scalars['String'];
  itemPerPage?: InputMaybe<Scalars['Int']>;
  orgId: Scalars['String'];
  pageIndex?: InputMaybe<Scalars['Int']>;
};

export type QueryDiscountShopProductDetailArgs = {
  ehToken: Scalars['String'];
  orgId: Scalars['String'];
  productCode: Scalars['String'];
};

export type QueryDiscountShopProductsArgs = {
  ehToken: Scalars['String'];
  itemPerPage?: InputMaybe<Scalars['Int']>;
  orgId: Scalars['String'];
  pageIndex?: InputMaybe<Scalars['Int']>;
};

export type QueryGetCardDetailsArgs = {
  id: Scalars['String'];
};

export type QueryGetEhUserInitializationDetailsArgs = {
  ehToken: Scalars['String'];
  orgId?: InputMaybe<Scalars['String']>;
};

export type QueryGetGooglePlaceApiKeyArgs = {
  platform: Scalars['String'];
};

export type QueryGetKpUserInitializationDetailsArgs = {
  kpToken: Scalars['String'];
};

export type QueryGetOemProvisioningDataArgs = {
  otp: Scalars['String'];
};

export type QueryGetPayAccountArgs = {
  ehToken: Scalars['String'];
  memberId: Scalars['String'];
  orgId: Scalars['String'];
};

export type QueryGetStashTransactionsArgs = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  stashId: Scalars['String'];
};

export type QueryGetTransactionsArgs = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};

export type QueryGetTransactionsV2Args = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};

export type QueryHeroDollarBalanceArgs = {
  ehToken: Scalars['String'];
};

export type QueryHeroDollarTransactionDetailArgs = {
  clientType?: InputMaybe<HeroDollarClientType>;
  ehToken: Scalars['String'];
  transactionId: Scalars['String'];
};

export type QueryHeroDollarTransactionsArgs = {
  ehToken: Scalars['String'];
  itemPerPage?: InputMaybe<Scalars['Int']>;
  pageIndex?: InputMaybe<Scalars['Int']>;
};

export type QueryInstapayBankAccountsArgs = {
  ehToken: Scalars['String'];
  membership: EhMembershipInput;
};

export type QueryInstapayFeeArgs = {
  bsb?: InputMaybe<Scalars['String']>;
};

export type QueryInstapayHistoryArgs = {
  ehToken: Scalars['String'];
};

export type QueryInstapayHistoryV2Args = {
  ehToken: Scalars['String'];
};

export type QueryInstapayInfoArgs = {
  ehToken: Scalars['String'];
};

export type QueryInstapayUsageVerificationArgs = {
  ehToken: Scalars['String'];
};

export type QueryMembershipsArgs = {
  ehToken: Scalars['String'];
};

export type QueryOnlineOfferDetailArgs = {
  offerId: Scalars['String'];
};

export type QueryOnlineOffersArgs = {
  categoryId?: InputMaybe<Scalars['String']>;
  itemPerPage?: InputMaybe<Scalars['Int']>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  searchTerm?: InputMaybe<Scalars['String']>;
};

export type QueryPaymentClientTokenArgs = {
  ehToken: Scalars['String'];
  orgId: Scalars['String'];
};

export type QueryPaymentVerifyCreditCardArgs = {
  ehToken: Scalars['String'];
  nonce: Scalars['String'];
  orgId: Scalars['String'];
};

export type QueryPickForYouArgs = {
  ehToken: Scalars['String'];
  orgId: Scalars['String'];
};

export type QueryPopularGiftCardsArgs = {
  ehToken: Scalars['String'];
  orgId: Scalars['String'];
};

export type QueryProfileArgs = {
  ehToken: Scalars['String'];
  orgId?: InputMaybe<Scalars['String']>;
};

export type QueryStripePublishableKeyArgs = {
  currency: Scalars['String'];
  ehToken: Scalars['String'];
};

export type QueryUserPermissionArgs = {
  permissionRequest?: InputMaybe<UserPermissionRequestInput>;
};

export type ResidentialAddress = {
  __typename?: 'ResidentialAddress';
  addressLine1?: Maybe<Scalars['String']>;
  addressLine2?: Maybe<Scalars['String']>;
  addressLine3?: Maybe<Scalars['String']>;
  country: Scalars['String'];
  postcode: Scalars['String'];
  region: Scalars['String'];
  streetName?: Maybe<Scalars['String']>;
  streetNumber?: Maybe<Scalars['String']>;
  streetType?: Maybe<Scalars['String']>;
  townOrCity: Scalars['String'];
  unitNumber?: Maybe<Scalars['String']>;
};

export type SecretKey = {
  __typename?: 'SecretKey';
  name: Scalars['String'];
  value: Scalars['String'];
};

export type ShopImage = {
  __typename?: 'ShopImage';
  large: ShopImageDetails;
  product: ShopImageDetails;
  small: ShopImageDetails;
  url?: Maybe<Scalars['String']>;
};

export type ShopImageDetails = {
  __typename?: 'ShopImageDetails';
  url?: Maybe<Scalars['String']>;
};

export type ShopProductDetail = {
  __typename?: 'ShopProductDetail';
  country?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  disabled: Scalars['Boolean'];
  discountPrice: Scalars['Float'];
  discountPriceInPoints?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  giftpayBalance: Scalars['Float'];
  heroDollarsFee: Scalars['Float'];
  howItWorks?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  image: ShopImage;
  instapayFee: Scalars['Float'];
  logo?: Maybe<ShopImage>;
  name: Scalars['String'];
  participant?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
  priceInPoints?: Maybe<Scalars['Int']>;
  productCategoryId: Scalars['String'];
  productCode: Scalars['String'];
  productType: Scalars['String'];
  productVariants: Array<ShopProductVariants>;
  serviceFee: Scalars['Float'];
  storefrontImage?: Maybe<ShopImage>;
  supplier: ShopProductSupplier;
  supplierId: Scalars['String'];
  termsAndConditions?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  transactionFee: Scalars['Float'];
  type: Scalars['String'];
  usage?: Maybe<Scalars['String']>;
};

export type ShopProductSupplier = {
  __typename?: 'ShopProductSupplier';
  description?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

export type ShopProductVariants = {
  __typename?: 'ShopProductVariants';
  amount: Scalars['Float'];
  cardId?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  discountPrice: Scalars['Float'];
  discountPriceInPoints?: Maybe<Scalars['Int']>;
  freightPrice: Scalars['Float'];
  id: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  label: Scalars['String'];
  numberInStock: Scalars['Int'];
  position: Scalars['Int'];
  price: Scalars['Float'];
  priceInPoints?: Maybe<Scalars['Int']>;
  status: Scalars['String'];
  stockAvailable: Scalars['Boolean'];
  variantCode: Scalars['String'];
};

export type SpendAccountCarouselFinished = {
  __typename?: 'SpendAccountCarouselFinished';
  value?: Maybe<Scalars['String']>;
};

export type StartWalletCreationInput = {
  dateOfBirth: Scalars['String'];
  firstName: Scalars['String'];
  hasConsentedPrivacyPolicy?: InputMaybe<Scalars['Boolean']>;
  hasConsentedTermsConditions: Scalars['Boolean'];
  lastName: Scalars['String'];
  phoneNumber: PhoneNumberInput;
  privacyPolicyConsentTimestamp?: InputMaybe<Scalars['String']>;
  residentialAddress: AddressInputV3;
  termsConditionsConsentTimestamp?: InputMaybe<Scalars['String']>;
};

export type StartWalletCreationResponse = {
  __typename?: 'StartWalletCreationResponse';
  userToken: Scalars['String'];
};

export type Stash = {
  __typename?: 'Stash';
  balance?: Maybe<Scalars['Float']>;
  closedAtUtc?: Maybe<Scalars['String']>;
  createdAtUtc?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<StashStatus>;
  targetAmount?: Maybe<Scalars['Float']>;
};

export type StashMeta = {
  __typename?: 'StashMeta';
  isMarketingCardFinished?: Maybe<Scalars['Boolean']>;
  isStashEntryButtonInSpendAccountHidden?: Maybe<Scalars['Boolean']>;
};

export type StashMetaInput = {
  isMarketingCardFinished?: InputMaybe<Scalars['Boolean']>;
  isStashEntryButtonInSpendAccountHidden?: InputMaybe<Scalars['Boolean']>;
};

export enum StashStatus {
  Closed = 'CLOSED',
  Open = 'OPEN',
}

export type StashTransaction = {
  __typename?: 'StashTransaction';
  amount?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['String']>;
  transactionTimeUtc?: Maybe<Scalars['String']>;
};

export type TaxObligationInput = {
  country?: InputMaybe<Scalars['String']>;
  noTaxIdNumberReason?: InputMaybe<NoTaxIdNumberReason>;
  taxIdNumber?: InputMaybe<Scalars['String']>;
};

export type TermsAndConditionsAcceptance = {
  __typename?: 'TermsAndConditionsAcceptance';
  isAccepted: Scalars['Boolean'];
};

export type Transaction = {
  __typename?: 'Transaction';
  accountId?: Maybe<Scalars['String']>;
  clearingTimeUtc?: Maybe<Scalars['String']>;
  counterpart?: Maybe<Counterpart>;
  currencyAmount?: Maybe<CurrencyAmount>;
  description?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
  transactionId?: Maybe<Scalars['String']>;
};

export type TransactionMerchant = {
  __typename?: 'TransactionMerchant';
  name?: Maybe<Scalars['String']>;
  singleLineAddress?: Maybe<Scalars['String']>;
};

export enum TransactionOutcome {
  Accepted = 'ACCEPTED',
  InternalError = 'INTERNAL_ERROR',
  RefusedAccountBlocked = 'REFUSED_ACCOUNT_BLOCKED',
  RefusedCustomerPreference = 'REFUSED_CUSTOMER_PREFERENCE',
  RefusedDailyTransfersOutLimitBreached = 'REFUSED_DAILY_TRANSFERS_OUT_LIMIT_BREACHED',
  RefusedFraud = 'REFUSED_FRAUD',
  RefusedInsufficientFunds = 'REFUSED_INSUFFICIENT_FUNDS',
  RefusedInvalidPayId = 'REFUSED_INVALID_PAY_ID',
  RefusedLimitBreach = 'REFUSED_LIMIT_BREACH',
  RefusedMaxBalanceExceeded = 'REFUSED_MAX_BALANCE_EXCEEDED',
  RefusedRecipientAccountBlocked = 'REFUSED_RECIPIENT_ACCOUNT_BLOCKED',
  RefusedTotalInboundDirectDebitDailyLimitBreached = 'REFUSED_TOTAL_INBOUND_DIRECT_DEBIT_DAILY_LIMIT_BREACHED',
  RefusedTotalNetVisaDailyLimitBreached = 'REFUSED_TOTAL_NET_VISA_DAILY_LIMIT_BREACHED',
  RefusedTotalNonSchemeDailyLimitBreached = 'REFUSED_TOTAL_NON_SCHEME_DAILY_LIMIT_BREACHED',
  RefusedTotalOutboundBpayDailyLimitBreached = 'REFUSED_TOTAL_OUTBOUND_BPAY_DAILY_LIMIT_BREACHED',
  Unknown = 'UNKNOWN',
}

export enum TransactionRecordType {
  In = 'In',
  Out = 'Out',
}

export type TransactionResponse = {
  __typename?: 'TransactionResponse';
  outcome?: Maybe<TransactionOutcome>;
  transactionId?: Maybe<Scalars['String']>;
};

export enum TransactionState {
  Clear = 'Clear',
  Pending = 'Pending',
  Reversed = 'Reversed',
  Settled = 'Settled',
}

export type TransferPeerDetails = {
  __typename?: 'TransferPeerDetails';
  accountHayId?: Maybe<Scalars['String']>;
  accountNumber?: Maybe<Scalars['String']>;
  bsb?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type UpdateUserProfileInput = {
  dateOfBirth?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<PersonalNameInput>;
  phoneNumber?: InputMaybe<PhoneNumberInput>;
  residentialAddress?: InputMaybe<AddressInputV2>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['String']>;
  dateOfBirth: Scalars['String'];
  deletedAt?: Maybe<Scalars['String']>;
  eWalletSetupStatus?: Maybe<EWalletSetupStatus>;
  eWalletStatusReason?: Maybe<EWalletStatusReason>;
  ehTimezone?: Maybe<Scalars['String']>;
  ehUUID?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender?: Maybe<Scalars['String']>;
  haasID?: Maybe<Scalars['String']>;
  hasConsentedIdentityVerificationTerms: Scalars['Boolean'];
  hasConsentedTermsConditions: Scalars['Boolean'];
  id: Scalars['String'];
  identityVerificationTermsConsentTimestamp?: Maybe<Scalars['String']>;
  kpId?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  loginType?: Maybe<LoginType>;
  mailingAddress: Address;
  phoneNumber: PhoneNumber;
  preferredName?: Maybe<Scalars['String']>;
  residentialAddress: ResidentialAddress;
  termsConditionsConsentTimestamp?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type UserDetailChangeRequest = {
  __typename?: 'UserDetailChangeRequest';
  createdAt: Scalars['String'];
  dateOfBirth?: Maybe<Scalars['String']>;
  name?: Maybe<PersonalName>;
  type: UserDetailChangeRequestType;
};

export enum UserDetailChangeRequestType {
  DateOfBirth = 'DATE_OF_BIRTH',
  Name = 'NAME',
}

export type UserInitializationDetails = {
  __typename?: 'UserInitializationDetails';
  address?: Maybe<Address>;
  dateOfBirth?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  middleName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<PhoneNumber>;
};

export type UserPermission = {
  __typename?: 'UserPermission';
  enabled: Scalars['Boolean'];
  name: Scalars['String'];
};

export type UserPermissionRequestInput = {
  kpBrandIds?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  kpBusinessIds?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  kpEmployeeIds?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  kpPartnerIds?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export type VerifyCreditCard = {
  __typename?: 'VerifyCreditCard';
  message: Scalars['String'];
};

export enum WalletNotificationType {
  ApplePayReminder_24Hrs = 'APPLE_PAY_REMINDER_24_HRS',
  GooglePay_24HrsPartialProvisioning = 'GOOGLE_PAY_24_HRS_PARTIAL_PROVISIONING',
}

export enum WalletType {
  AppleWallet = 'APPLE_WALLET',
  GooglePay = 'GOOGLE_PAY',
  SamsungPay = 'SAMSUNG_PAY',
}

export type WithdrawStashInput = {
  amount: Scalars['Float'];
};

export type MailingAddressMutationVariables = Exact<{
  address?: InputMaybe<AddressInput>;
}>;

export type MailingAddressMutation = { __typename?: 'Mutation'; mailingAddress?: boolean | null };

export type PatchProfileMutationVariables = Exact<{
  patch?: InputMaybe<EhProfilePatchRequest>;
  ehToken: Scalars['String'];
  orgId?: InputMaybe<Scalars['String']>;
}>;

export type PatchProfileMutation = {
  __typename?: 'Mutation';
  patchProfile?: {
    __typename?: 'EhProfile';
    userId: string;
    userUuid: string;
    avatarUrl?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    phoneNumber?: string | null;
    countryCode?: string | null;
    stateCode?: string | null;
  } | null;
};

export type EventLogMutationVariables = Exact<{
  event?: InputMaybe<EventLogRequest>;
}>;

export type EventLogMutation = { __typename?: 'Mutation'; eventLog?: string | null };

export type UpdateUserProfileMutationVariables = Exact<{
  userProfile: UpdateUserProfileInput;
}>;

export type UpdateUserProfileMutation = { __typename?: 'Mutation'; updateUserProfile?: boolean | null };

export type FinishSpendAccountCarouselMutationVariables = Exact<{ [key: string]: never }>;

export type FinishSpendAccountCarouselMutation = {
  __typename?: 'Mutation';
  finishSpendAccountCarousel?: boolean | null;
};

export type DrawdownWageMutationVariables = Exact<{
  ehToken: Scalars['String'];
  orgId: Scalars['String'];
  bankAccountId: Scalars['String'];
  amount: Scalars['Float'];
}>;

export type DrawdownWageMutation = { __typename?: 'Mutation'; drawdownWage?: boolean | null };

export type DrawdownWageV2MutationVariables = Exact<{
  ehToken: Scalars['String'];
  orgId: Scalars['String'];
  bankAccountId: Scalars['String'];
  amount: Scalars['Float'];
}>;

export type DrawdownWageV2Mutation = {
  __typename?: 'Mutation';
  drawdownWageV2?: {
    __typename?: 'DrawdownWagePayload';
    drawdown?: {
      __typename?: 'Drawdown';
      status?: string | null;
      message?: string | null;
      messageCode?: DrawdownWageMessageCode | null;
      data?: {
        __typename?: 'DrawdownTransaction';
        transactionId?: string | null;
        amount?: string | null;
        bsb?: string | null;
        accountNumber?: string | null;
        accountName?: string | null;
        accountEmail?: string | null;
        createdAt?: string | null;
        expectedPayDate?: string | null;
      } | null;
    } | null;
  } | null;
};

export type PayAccountMutationVariables = Exact<{
  ehToken: Scalars['String'];
  membership: EhMembershipInput;
  bankDetails: PayAllocationInput;
}>;

export type PayAccountMutation = { __typename?: 'Mutation'; payAccount?: boolean | null };

export type AccountTransferMutationVariables = Exact<{
  transferDetails?: InputMaybe<AccountTransferInput>;
}>;

export type AccountTransferMutation = {
  __typename?: 'Mutation';
  accountTransfer?: {
    __typename?: 'TransactionResponse';
    transactionId?: string | null;
    outcome?: TransactionOutcome | null;
  } | null;
};

export type MakePaymentMutationVariables = Exact<{
  ehToken: Scalars['String'];
  orgId: Scalars['String'];
  nonce: Scalars['String'];
  items: Array<MakePaymentItem> | MakePaymentItem;
  paymentMethod: MakePaymentPaymentMethod;
  deviceData: Scalars['String'];
}>;

export type MakePaymentMutation = {
  __typename?: 'Mutation';
  makePayment?: {
    __typename?: 'MakePaymentResponse';
    billableAmount: number;
    createdAt: string;
    freightCost: number;
    id: string;
    ipAddress: string;
    memberId: string;
    name: string;
    status: string;
    transactionFee: number;
    type: string;
  } | null;
};

export type MakePaymentV2MutationVariables = Exact<{
  ehToken: Scalars['String'];
  orgId: Scalars['String'];
  nonce: Scalars['String'];
  items: Array<MakePaymentItem> | MakePaymentItem;
  paymentMethod: MakePaymentPaymentMethod;
  deviceData: Scalars['String'];
  serviceFee: Scalars['String'];
  ehPlatform?: InputMaybe<Scalars['String']>;
}>;

export type MakePaymentV2Mutation = {
  __typename?: 'Mutation';
  makePaymentV2?: {
    __typename?: 'MakePaymentResponse';
    billableAmount: number;
    createdAt: string;
    freightCost: number;
    id: string;
    ipAddress: string;
    memberId: string;
    name: string;
    status: string;
    transactionFee: number;
    type: string;
  } | null;
};

export type CreateStripeClientTokenMutationVariables = Exact<{
  ehToken: Scalars['String'];
  orgId: Scalars['String'];
  createStripeClientTokenInput?: InputMaybe<CreateStripeClientTokenInput>;
}>;

export type CreateStripeClientTokenMutation = {
  __typename?: 'Mutation';
  createStripeClientToken?: { __typename?: 'PaymentClientToken'; clientToken: string } | null;
};

export type MakeStripePaymentMutationVariables = Exact<{
  ehToken: Scalars['String'];
  orgId: Scalars['String'];
  nonce: Scalars['String'];
  items: Array<MakePaymentItem> | MakePaymentItem;
  paymentMethod: MakePaymentPaymentMethod;
  deviceData: Scalars['String'];
  serviceFee: Scalars['String'];
  ehPlatform?: InputMaybe<Scalars['String']>;
}>;

export type MakeStripePaymentMutation = {
  __typename?: 'Mutation';
  makeStripePayment?: {
    __typename?: 'MakePaymentResponse';
    billableAmount: number;
    createdAt: string;
    freightCost: number;
    id: string;
    ipAddress: string;
    memberId: string;
    name: string;
    status: string;
    transactionFee: number;
    type: string;
  } | null;
};

export type CancelStripePaymentMutationVariables = Exact<{
  ehToken: Scalars['String'];
  orgId: Scalars['String'];
  clientToken: Scalars['String'];
}>;

export type CancelStripePaymentMutation = { __typename?: 'Mutation'; cancelStripePayment?: boolean | null };

export type ActivateCardMutationVariables = Exact<{ [key: string]: never }>;

export type ActivateCardMutation = { __typename?: 'Mutation'; activateCard?: boolean | null };

export type CardMutationVariables = Exact<{
  cardRequest: CardRequestInput;
}>;

export type CardMutation = { __typename?: 'Mutation'; card?: boolean | null };

export type InitiateEWalletSetupMutationVariables = Exact<{
  setupDetails?: InputMaybe<EWalletSetupDetailsInput>;
}>;

export type InitiateEWalletSetupMutation = {
  __typename?: 'Mutation';
  initiateEWalletSetup?: {
    __typename?: 'User';
    id: string;
    haasID?: string | null;
    ehUUID?: string | null;
    kpId?: string | null;
    loginType?: LoginType | null;
    email: string;
    createdAt?: string | null;
    updatedAt?: string | null;
    deletedAt?: string | null;
    ehTimezone?: string | null;
    eWalletSetupStatus?: EWalletSetupStatus | null;
    eWalletStatusReason?: EWalletStatusReason | null;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    preferredName?: string | null;
    gender?: string | null;
    hasConsentedTermsConditions: boolean;
    termsConditionsConsentTimestamp?: string | null;
    hasConsentedIdentityVerificationTerms: boolean;
    identityVerificationTermsConsentTimestamp?: string | null;
    residentialAddress: {
      __typename?: 'ResidentialAddress';
      region: string;
      country: string;
      addressLine1?: string | null;
      unitNumber?: string | null;
      streetNumber?: string | null;
      streetName?: string | null;
      streetType?: string | null;
      postcode: string;
      townOrCity: string;
      addressLine2?: string | null;
      addressLine3?: string | null;
    };
    mailingAddress: {
      __typename?: 'Address';
      region: string;
      country: string;
      addressLine1: string;
      addressLine2?: string | null;
      addressLine3?: string | null;
      postcode: string;
      townOrCity: string;
    };
    phoneNumber: { __typename?: 'PhoneNumber'; countryCode: string; number: string };
  } | null;
};

export type InitiateEWalletSetupV2MutationVariables = Exact<{
  setupDetails?: InputMaybe<EWalletSetupDetailsInputV2>;
}>;

export type InitiateEWalletSetupV2Mutation = {
  __typename?: 'Mutation';
  initiateEWalletSetupV2?: {
    __typename?: 'User';
    id: string;
    haasID?: string | null;
    ehUUID?: string | null;
    kpId?: string | null;
    loginType?: LoginType | null;
    email: string;
    createdAt?: string | null;
    updatedAt?: string | null;
    deletedAt?: string | null;
    ehTimezone?: string | null;
    eWalletSetupStatus?: EWalletSetupStatus | null;
    eWalletStatusReason?: EWalletStatusReason | null;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    preferredName?: string | null;
    gender?: string | null;
    hasConsentedTermsConditions: boolean;
    termsConditionsConsentTimestamp?: string | null;
    hasConsentedIdentityVerificationTerms: boolean;
    identityVerificationTermsConsentTimestamp?: string | null;
    residentialAddress: {
      __typename?: 'ResidentialAddress';
      region: string;
      country: string;
      addressLine1?: string | null;
      unitNumber?: string | null;
      streetNumber?: string | null;
      streetName?: string | null;
      streetType?: string | null;
      postcode: string;
      townOrCity: string;
      addressLine2?: string | null;
      addressLine3?: string | null;
    };
    mailingAddress: {
      __typename?: 'Address';
      region: string;
      country: string;
      addressLine1: string;
      addressLine2?: string | null;
      addressLine3?: string | null;
      postcode: string;
      townOrCity: string;
    };
    phoneNumber: { __typename?: 'PhoneNumber'; countryCode: string; number: string };
  } | null;
};

export type RequestNewCardMutationVariables = Exact<{
  address?: InputMaybe<AddressInput>;
}>;

export type RequestNewCardMutation = { __typename?: 'Mutation'; requestNewCard?: boolean | null };

export type SendOtpToCurrentUserMutationVariables = Exact<{ [key: string]: never }>;

export type SendOtpToCurrentUserMutation = {
  __typename?: 'Mutation';
  sendOtpToCurrentUser?: { __typename?: 'PhoneNumber'; countryCode: string; number: string } | null;
};

export type UpdateCardMetaMutationVariables = Exact<{
  cardMeta: CardMetaInput;
}>;

export type UpdateCardMetaMutation = { __typename?: 'Mutation'; updateCardMeta?: boolean | null };

export type UpdateCardPinMutationVariables = Exact<{
  cardPIN: Scalars['String'];
}>;

export type UpdateCardPinMutation = { __typename?: 'Mutation'; updateCardPIN?: boolean | null };

export type ClearPersistentNotificationMutationVariables = Exact<{
  type: WalletNotificationType;
}>;

export type ClearPersistentNotificationMutation = {
  __typename?: 'Mutation';
  clearPersistentNotification?: boolean | null;
};

export type SaveWalletSetupMutationVariables = Exact<{
  setupDetails?: InputMaybe<EWalletSetupDetailsInputV2>;
}>;

export type SaveWalletSetupMutation = {
  __typename?: 'Mutation';
  saveWalletSetup?: {
    __typename?: 'IDVInitiatedResponse';
    idvToken: string;
    applicantId: string;
    user: {
      __typename?: 'User';
      id: string;
      haasID?: string | null;
      ehUUID?: string | null;
      kpId?: string | null;
      loginType?: LoginType | null;
      email: string;
      createdAt?: string | null;
      updatedAt?: string | null;
      deletedAt?: string | null;
      ehTimezone?: string | null;
      eWalletSetupStatus?: EWalletSetupStatus | null;
      eWalletStatusReason?: EWalletStatusReason | null;
      firstName: string;
      lastName: string;
      dateOfBirth: string;
      preferredName?: string | null;
      gender?: string | null;
      hasConsentedTermsConditions: boolean;
      termsConditionsConsentTimestamp?: string | null;
      hasConsentedIdentityVerificationTerms: boolean;
      identityVerificationTermsConsentTimestamp?: string | null;
      residentialAddress: {
        __typename?: 'ResidentialAddress';
        region: string;
        country: string;
        addressLine1?: string | null;
        unitNumber?: string | null;
        streetNumber?: string | null;
        streetName?: string | null;
        streetType?: string | null;
        postcode: string;
        townOrCity: string;
        addressLine2?: string | null;
        addressLine3?: string | null;
      };
      mailingAddress: {
        __typename?: 'Address';
        region: string;
        country: string;
        addressLine1: string;
        addressLine2?: string | null;
        addressLine3?: string | null;
        postcode: string;
        townOrCity: string;
      };
      phoneNumber: { __typename?: 'PhoneNumber'; countryCode: string; number: string };
    };
  } | null;
};

export type InitiateEWalletSetupV3MutationVariables = Exact<{ [key: string]: never }>;

export type InitiateEWalletSetupV3Mutation = { __typename?: 'Mutation'; initiateEWalletSetupV3?: boolean | null };

export type SetStashMetaMutationVariables = Exact<{
  meta: StashMetaInput;
}>;

export type SetStashMetaMutation = { __typename?: 'Mutation'; setStashMeta?: boolean | null };

export type DepositStashMutationVariables = Exact<{
  stashId: Scalars['String'];
  depositInput: DepositStashInput;
}>;

export type DepositStashMutation = { __typename?: 'Mutation'; depositStash?: boolean | null };

export type CreateStashMutationVariables = Exact<{
  stashInput: CreateStashInput;
}>;

export type CreateStashMutation = { __typename?: 'Mutation'; createStash?: boolean | null };

export type WithdrawStashMutationVariables = Exact<{
  stashId: Scalars['String'];
  withdrawInput: WithdrawStashInput;
}>;

export type WithdrawStashMutation = { __typename?: 'Mutation'; withdrawStash?: boolean | null };

export type CloseStashMutationVariables = Exact<{
  stashId: Scalars['String'];
}>;

export type CloseStashMutation = {
  __typename?: 'Mutation';
  closeStash?: { __typename?: 'CloseStashPayload'; result?: boolean | null } | null;
};

export type StartWalletCreationMutationVariables = Exact<{
  startWalletCreationInput?: InputMaybe<StartWalletCreationInput>;
}>;

export type StartWalletCreationMutation = {
  __typename?: 'Mutation';
  startWalletCreation?: { __typename?: 'StartWalletCreationResponse'; userToken: string } | null;
};

export type CashbackRegisterUserMutationVariables = Exact<{ [key: string]: never }>;

export type CashbackRegisterUserMutation = { __typename?: 'Mutation'; cashbackRegisterUser?: boolean | null };

export type CashbackOnboardUserMutationVariables = Exact<{ [key: string]: never }>;

export type CashbackOnboardUserMutation = { __typename?: 'Mutation'; cashbackOnboardUser?: boolean | null };

export type CashbackEnrolCardMutationVariables = Exact<{
  enrolCard: CashbackEnrolCardInput;
}>;

export type CashbackEnrolCardMutation = {
  __typename?: 'Mutation';
  cashbackEnrolCard: {
    __typename?: 'CashbackCard';
    id: number;
    description: string;
    cardMasked: string;
    issuer: string;
    expiry: string;
    provider: string;
    isExpired: boolean;
    lastFour?: string | null;
  };
};

export type CashbackDeleteCardMutationVariables = Exact<{
  deleteCard: CashbackDeleteCardInput;
}>;

export type CashbackDeleteCardMutation = { __typename?: 'Mutation'; cashbackDeleteCard?: boolean | null };

export type CashbackUpdateBankDetailsMutationVariables = Exact<{
  bankDetails: CashbackBankDetailInput;
}>;

export type CashbackUpdateBankDetailsMutation = { __typename?: 'Mutation'; cashbackUpdateBankDetails?: boolean | null };

export type CashbackAcceptTermsAndConditionsMutationVariables = Exact<{ [key: string]: never }>;

export type CashbackAcceptTermsAndConditionsMutation = {
  __typename?: 'Mutation';
  cashbackAcceptTermsAndConditions: { __typename?: 'TermsAndConditionsAcceptance'; isAccepted: boolean };
};

export type UpdatePaymentPreferenceSettingsMutationVariables = Exact<{
  settings?: InputMaybe<PaymentPreferencesSettingsInput>;
}>;

export type UpdatePaymentPreferenceSettingsMutation = {
  __typename?: 'Mutation';
  updatePaymentPreferenceSettings: { __typename?: 'PaymentPreferencesSettings'; payWithHDOnSwagCard?: boolean | null };
};

export type SeenPayWithHdCarouselMutationVariables = Exact<{ [key: string]: never }>;

export type SeenPayWithHdCarouselMutation = { __typename?: 'Mutation'; seenPayWithHDCarousel?: boolean | null };

export type CashbackUpdateAutoEnrolMutationVariables = Exact<{
  input: AutoEnrolInput;
}>;

export type CashbackUpdateAutoEnrolMutation = { __typename?: 'Mutation'; cashbackUpdateAutoEnrol?: boolean | null };

export type GetGooglePlaceApiKeyQueryVariables = Exact<{
  platform: Scalars['String'];
}>;

export type GetGooglePlaceApiKeyQuery = {
  __typename?: 'Query';
  getGooglePlaceApiKey: { __typename?: 'SecretKey'; name: string; value: string };
};

export type MinSupportVersionQueryVariables = Exact<{ [key: string]: never }>;

export type MinSupportVersionQuery = {
  __typename?: 'Query';
  minSupportVersion?: {
    __typename?: 'MinSupportVersion';
    benefits: { __typename?: 'BenefitsMinSupportVersion'; minSupportAppVersion: string };
  } | null;
};

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentUserQuery = {
  __typename?: 'Query';
  currentUser?: {
    __typename?: 'CurrentUser';
    id: string;
    email: string;
    eWalletSetupStatus?: EWalletSetupStatus | null;
    eWalletStatusReason?: EWalletStatusReason | null;
    firstName?: string | null;
    lastName?: string | null;
    middleName?: string | null;
    dateOfBirth?: string | null;
    preferredName?: string | null;
    gender?: string | null;
    residentialAddress?: {
      __typename?: 'ResidentialAddress';
      region: string;
      country: string;
      addressLine1?: string | null;
      unitNumber?: string | null;
      streetNumber?: string | null;
      streetName?: string | null;
      streetType?: string | null;
      postcode: string;
      townOrCity: string;
      addressLine2?: string | null;
      addressLine3?: string | null;
    } | null;
    mailingAddress?: {
      __typename?: 'Address';
      region: string;
      country: string;
      addressLine1: string;
      addressLine2?: string | null;
      addressLine3?: string | null;
      postcode: string;
      townOrCity: string;
    } | null;
    phoneNumber?: { __typename?: 'PhoneNumber'; countryCode: string; number: string } | null;
  } | null;
};

export type ProfileQueryVariables = Exact<{
  ehToken: Scalars['String'];
  orgId?: InputMaybe<Scalars['String']>;
}>;

export type ProfileQuery = {
  __typename?: 'Query';
  profile?: {
    __typename?: 'EhProfile';
    userId: string;
    userUuid: string;
    avatarUrl?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    phoneNumber?: string | null;
    countryCode?: string | null;
    stateCode?: string | null;
  } | null;
};

export type UserPermissionQueryVariables = Exact<{
  permissionRequest?: InputMaybe<UserPermissionRequestInput>;
}>;

export type UserPermissionQuery = {
  __typename?: 'Query';
  userPermission: Array<{ __typename?: 'UserPermission'; name: string; enabled: boolean }>;
};

export type ProfileChangeRequestQueryVariables = Exact<{ [key: string]: never }>;

export type ProfileChangeRequestQuery = {
  __typename?: 'Query';
  profileChangeRequest?: Array<{
    __typename?: 'UserDetailChangeRequest';
    type: UserDetailChangeRequestType;
    dateOfBirth?: string | null;
    createdAt: string;
    name?: { __typename?: 'PersonalName'; firstName: string; lastName: string; middleName?: string | null } | null;
  } | null> | null;
};

export type GetSpendAccountCarouselFinishedQueryVariables = Exact<{ [key: string]: never }>;

export type GetSpendAccountCarouselFinishedQuery = {
  __typename?: 'Query';
  getSpendAccountCarouselFinished?: { __typename?: 'SpendAccountCarouselFinished'; value?: string | null } | null;
};

export type GetEhUserInitializationDetailsQueryVariables = Exact<{
  orgId?: InputMaybe<Scalars['String']>;
  ehToken: Scalars['String'];
}>;

export type GetEhUserInitializationDetailsQuery = {
  __typename?: 'Query';
  getEHUserInitializationDetails?: {
    __typename?: 'UserInitializationDetails';
    firstName: string;
    lastName: string;
    middleName?: string | null;
    dateOfBirth?: string | null;
    address?: {
      __typename?: 'Address';
      region: string;
      country: string;
      addressLine1: string;
      addressLine2?: string | null;
      addressLine3?: string | null;
      postcode: string;
      townOrCity: string;
    } | null;
    phoneNumber?: { __typename?: 'PhoneNumber'; countryCode: string; number: string } | null;
  } | null;
};

export type GetKpUserInitializationDetailsQueryVariables = Exact<{
  kpToken: Scalars['String'];
}>;

export type GetKpUserInitializationDetailsQuery = {
  __typename?: 'Query';
  getKPUserInitializationDetails?: {
    __typename?: 'UserInitializationDetails';
    firstName: string;
    lastName: string;
    middleName?: string | null;
    dateOfBirth?: string | null;
    address?: {
      __typename?: 'Address';
      region: string;
      country: string;
      addressLine1: string;
      addressLine2?: string | null;
      addressLine3?: string | null;
      postcode: string;
      townOrCity: string;
    } | null;
    phoneNumber?: { __typename?: 'PhoneNumber'; countryCode: string; number: string } | null;
  } | null;
};

export type AllocationsQueryVariables = Exact<{
  ehToken: Scalars['String'];
}>;

export type AllocationsQuery = {
  __typename?: 'Query';
  allocations: Array<{
    __typename?: 'PayAllocation';
    membership: {
      __typename?: 'EhMembership';
      orgId: string;
      memberId: string;
      orgUUID: string;
      orgName: string;
      xeroConnected: boolean;
      isIndependentContractor: boolean;
    };
    allocation: {
      __typename?: 'PayAccountAllocation';
      bankSplitType: PaySplitType;
      bankAccounts: Array<{
        __typename?: 'PayAccountDetails';
        accountName: string;
        accountNumber: string;
        bsb: string;
        amount: string;
      }>;
    };
  }>;
};

export type BankAccountQueryVariables = Exact<{
  ehToken: Scalars['String'];
  membership: EhMembershipInput;
}>;

export type BankAccountQuery = {
  __typename?: 'Query';
  bankAccount?: Array<{
    __typename?: 'BankAccount';
    id: number;
    accountName: string;
    accountNumber: string;
    bsb: string;
    external_id: string;
  } | null> | null;
};

export type GetPayAccountQueryVariables = Exact<{
  ehToken: Scalars['String'];
  orgId: Scalars['String'];
  memberId: Scalars['String'];
}>;

export type GetPayAccountQuery = {
  __typename?: 'Query';
  getPayAccount?: {
    __typename?: 'PayAccountAllocation';
    bankSplitType: PaySplitType;
    bankAccounts: Array<{
      __typename?: 'PayAccountDetails';
      accountName: string;
      accountNumber: string;
      bsb: string;
      amount: string;
    }>;
  } | null;
};

export type InstapayBankAccountsQueryVariables = Exact<{
  ehToken: Scalars['String'];
  membership: EhMembershipInput;
}>;

export type InstapayBankAccountsQuery = {
  __typename?: 'Query';
  instapayBankAccounts?: Array<{
    __typename?: 'InstapayBankAccount';
    accountName: string;
    accountNumber: string;
    bsb: string;
    fee: number;
    external_id: string;
  } | null> | null;
};

export type InstapayFeeQueryVariables = Exact<{
  bsb?: InputMaybe<Scalars['String']>;
}>;

export type InstapayFeeQuery = {
  __typename?: 'Query';
  instapayFee?: { __typename?: 'InstapayFee'; fee?: number | null } | null;
};

export type InstapayHistoryQueryVariables = Exact<{
  ehToken: Scalars['String'];
}>;

export type InstapayHistoryQuery = {
  __typename?: 'Query';
  instapayHistory: Array<{
    __typename?: 'InstapayHistory';
    id: string;
    amount: number;
    adminFee: number;
    feeType: string;
    status: string;
    abaRef: string;
    createdAt: string;
    membership: {
      __typename?: 'EhMembership';
      orgId: string;
      memberId: string;
      orgUUID: string;
      orgName: string;
      xeroConnected: boolean;
      isIndependentContractor: boolean;
    };
  }>;
};

export type InstapayHistoryV2QueryVariables = Exact<{
  ehToken: Scalars['String'];
}>;

export type InstapayHistoryV2Query = {
  __typename?: 'Query';
  instapayHistoryV2: Array<{
    __typename?: 'InstapayHistory';
    id: string;
    amount: number;
    adminFee: number;
    feeType: string;
    status: string;
    abaRef: string;
    createdAt: string;
    membership: {
      __typename?: 'EhMembership';
      orgId: string;
      memberId: string;
      orgUUID: string;
      orgName: string;
      xeroConnected: boolean;
      isIndependentContractor: boolean;
    };
  }>;
};

export type InstapayInfoQueryVariables = Exact<{
  ehToken: Scalars['String'];
}>;

export type InstapayInfoQuery = {
  __typename?: 'Query';
  instapayInfo: Array<{
    __typename?: 'InstapayInfo';
    payPeriodCompletedDays: number;
    payPeriodDays: number;
    leaveDays: number;
    available: number;
    membership: {
      __typename?: 'EhMembership';
      orgId: string;
      memberId: string;
      orgUUID: string;
      orgName: string;
      xeroConnected: boolean;
      isIndependentContractor: boolean;
    };
    payRate: { __typename?: 'InstapayInfoField'; displayName: string; value: number; unit: string };
    deduction: { __typename?: 'InstapayInfoField'; displayName: string; value: number; unit: string };
  }>;
};

export type InstapayUsageVerificationQueryVariables = Exact<{
  ehToken: Scalars['String'];
}>;

export type InstapayUsageVerificationQuery = {
  __typename?: 'Query';
  instapayUsageVerification?: { __typename?: 'InstapayUsageVerification'; memberNotUsedInstapay: boolean } | null;
};

export type MembershipsQueryVariables = Exact<{
  ehToken: Scalars['String'];
}>;

export type MembershipsQuery = {
  __typename?: 'Query';
  memberships: Array<{
    __typename?: 'EhMembership';
    orgId: string;
    memberId: string;
    orgUUID: string;
    orgName: string;
    xeroConnected: boolean;
    isIndependentContractor: boolean;
  }>;
};

export type DiscountShopProductDetailQueryVariables = Exact<{
  ehToken: Scalars['String'];
  orgId: Scalars['String'];
  productCode: Scalars['String'];
}>;

export type DiscountShopProductDetailQuery = {
  __typename?: 'Query';
  discountShopProductDetail: {
    __typename?: 'ShopProductDetail';
    type: string;
    id: string;
    name: string;
    title: string;
    price: number;
    discountPrice: number;
    productCode: string;
    giftpayBalance: number;
    productType: string;
    description: string;
    termsAndConditions?: string | null;
    email?: string | null;
    howItWorks?: string | null;
    usage?: string | null;
    participant?: string | null;
    disabled: boolean;
    supplierId: string;
    productCategoryId: string;
    transactionFee: number;
    instapayFee: number;
    heroDollarsFee: number;
    serviceFee: number;
    country?: string | null;
    currency?: string | null;
    priceInPoints?: number | null;
    discountPriceInPoints?: number | null;
    image: {
      __typename?: 'ShopImage';
      url?: string | null;
      small: { __typename?: 'ShopImageDetails'; url?: string | null };
      product: { __typename?: 'ShopImageDetails'; url?: string | null };
      large: { __typename?: 'ShopImageDetails'; url?: string | null };
    };
    storefrontImage?: {
      __typename?: 'ShopImage';
      url?: string | null;
      small: { __typename?: 'ShopImageDetails'; url?: string | null };
      product: { __typename?: 'ShopImageDetails'; url?: string | null };
      large: { __typename?: 'ShopImageDetails'; url?: string | null };
    } | null;
    logo?: {
      __typename?: 'ShopImage';
      url?: string | null;
      small: { __typename?: 'ShopImageDetails'; url?: string | null };
      product: { __typename?: 'ShopImageDetails'; url?: string | null };
      large: { __typename?: 'ShopImageDetails'; url?: string | null };
    } | null;
    supplier: {
      __typename?: 'ShopProductSupplier';
      id: string;
      name: string;
      description?: string | null;
      email?: string | null;
      phoneNumber?: string | null;
      website?: string | null;
    };
    productVariants: Array<{
      __typename?: 'ShopProductVariants';
      id: string;
      variantCode: string;
      price: number;
      amount: number;
      stockAvailable: boolean;
      numberInStock: number;
      imageUrl?: string | null;
      discountPrice: number;
      freightPrice: number;
      status: string;
      label: string;
      cardId?: string | null;
      position: number;
      priceInPoints?: number | null;
      discountPriceInPoints?: number | null;
      description?: string | null;
    }>;
  };
};

export type DiscountShopProductsQueryVariables = Exact<{
  ehToken: Scalars['String'];
  orgId: Scalars['String'];
  pageIndex?: InputMaybe<Scalars['Int']>;
  itemPerPage?: InputMaybe<Scalars['Int']>;
}>;

export type DiscountShopProductsQuery = {
  __typename?: 'Query';
  discountShopProducts: {
    __typename?: 'ProductsQueryResult';
    sort: string;
    itemPerPage: number;
    pageIndex: number;
    totalPages: number;
    totalItems: number;
    sortDir: string;
    items: Array<{
      __typename?: 'Product';
      type: string;
      id: string;
      name: string;
      title: string;
      price: number;
      discountPrice: number;
      serviceFee: number;
      productCode: string;
      giftpayBalance: number;
      productType: string;
      description: string;
      termsAndConditions?: string | null;
      country?: string | null;
      currency?: string | null;
      priceInPoints?: number | null;
      discountPriceInPoints?: number | null;
      image: {
        __typename?: 'ShopImage';
        url?: string | null;
        small: { __typename?: 'ShopImageDetails'; url?: string | null };
        product: { __typename?: 'ShopImageDetails'; url?: string | null };
        large: { __typename?: 'ShopImageDetails'; url?: string | null };
      };
      storefrontImage?: {
        __typename?: 'ShopImage';
        url?: string | null;
        small: { __typename?: 'ShopImageDetails'; url?: string | null };
        product: { __typename?: 'ShopImageDetails'; url?: string | null };
        large: { __typename?: 'ShopImageDetails'; url?: string | null };
      } | null;
    }>;
  };
};

export type DiscountOrderHistoryQueryVariables = Exact<{
  ehToken: Scalars['String'];
  orgId: Scalars['String'];
  pageIndex?: InputMaybe<Scalars['Int']>;
  itemPerPage?: InputMaybe<Scalars['Int']>;
}>;

export type DiscountOrderHistoryQuery = {
  __typename?: 'Query';
  discountOrderHistory: {
    __typename?: 'DiscountOrderHistoryResponse';
    itemPerPage: number;
    pageIndex: number;
    totalItems: number;
    totalPages: number;
    items: Array<{
      __typename?: 'DiscountHistory';
      id: string;
      name?: string | null;
      memberId: string;
      status: OrderStatus;
      createdAt: string;
      billableAmount: number;
      transactionFee: number;
      freightCost: number;
      orderDetails: Array<{
        __typename?: 'OrderDetail';
        id: string;
        discount: number;
        quantity: number;
        price: number;
        billableAmount: number;
        transactionFee: number;
        status: OrderStatus;
        freightCost: number;
        currency: string;
        priceInPoints?: number | null;
        discountPriceInPoints?: number | null;
        purchaseItems: Array<{
          __typename?: 'OrderPurchaseItem';
          id: string;
          purchaseId: string;
          productVariantId: string;
          data: {
            __typename?: 'OrderPurchaseItemData';
            issuedAt: string;
            pinNumber: string;
            cardNumber: string;
            serialNumber: string;
            activationUrl: string;
            orderDetailId?: string | null;
            expiredAt?: string | null;
            giftCode?: string | null;
            uberGiftCode?: string | null;
            barCode?: string | null;
            promoCode?: string | null;
          };
          fulfil?: {
            __typename?: 'OrderPurchaseItemFulfil';
            id: string;
            isUsed?: boolean | null;
            balance: number;
          } | null;
        }>;
        productVariant?: {
          __typename?: 'OrderProductVariant';
          variantCode: string;
          price: number;
          imageUrl?: string | null;
          discountPrice: number;
          amount: number;
          product: {
            __typename?: 'OrderProduct';
            id: string;
            code: string;
            name: string;
            title: string;
            imageUrl?: string | null;
            logoUrl?: string | null;
            email?: string | null;
            description?: string | null;
            howItWorks?: string | null;
            productType: OrderProductType;
          };
        } | null;
      }>;
    }>;
  };
};

export type DiscountOrderDetailQueryVariables = Exact<{
  ehToken: Scalars['String'];
  orgId: Scalars['String'];
  orderId: Scalars['String'];
}>;

export type DiscountOrderDetailQuery = {
  __typename?: 'Query';
  discountOrderDetail: {
    __typename?: 'OrderDetail';
    id: string;
    discount: number;
    quantity: number;
    price: number;
    billableAmount: number;
    transactionFee: number;
    status: OrderStatus;
    freightCost: number;
    currency: string;
    priceInPoints?: number | null;
    discountPriceInPoints?: number | null;
    purchaseItems: Array<{
      __typename?: 'OrderPurchaseItem';
      id: string;
      purchaseId: string;
      productVariantId: string;
      data: {
        __typename?: 'OrderPurchaseItemData';
        issuedAt: string;
        pinNumber: string;
        cardNumber: string;
        serialNumber: string;
        activationUrl: string;
        orderDetailId?: string | null;
        expiredAt?: string | null;
        giftCode?: string | null;
        uberGiftCode?: string | null;
        barCode?: string | null;
        promoCode?: string | null;
      };
      fulfil?: { __typename?: 'OrderPurchaseItemFulfil'; id: string; isUsed?: boolean | null; balance: number } | null;
    }>;
    productVariant?: {
      __typename?: 'OrderProductVariant';
      variantCode: string;
      price: number;
      imageUrl?: string | null;
      discountPrice: number;
      amount: number;
      product: {
        __typename?: 'OrderProduct';
        id: string;
        code: string;
        name: string;
        title: string;
        imageUrl?: string | null;
        logoUrl?: string | null;
        email?: string | null;
        description?: string | null;
        howItWorks?: string | null;
        productType: OrderProductType;
      };
    } | null;
  };
};

export type PaymentClientTokenQueryVariables = Exact<{
  ehToken: Scalars['String'];
  orgId: Scalars['String'];
}>;

export type PaymentClientTokenQuery = {
  __typename?: 'Query';
  paymentClientToken: { __typename?: 'PaymentClientToken'; clientToken: string };
};

export type PaymentVerifyCreditCardQueryVariables = Exact<{
  ehToken: Scalars['String'];
  orgId: Scalars['String'];
  nonce: Scalars['String'];
}>;

export type PaymentVerifyCreditCardQuery = {
  __typename?: 'Query';
  paymentVerifyCreditCard: { __typename?: 'VerifyCreditCard'; message: string };
};

export type PickForYouQueryVariables = Exact<{
  ehToken: Scalars['String'];
  orgId: Scalars['String'];
}>;

export type PickForYouQuery = {
  __typename?: 'Query';
  pickForYou: {
    __typename?: 'PickForYouResponse';
    items: Array<{
      __typename?: 'Product';
      type: string;
      id: string;
      name: string;
      title: string;
      price: number;
      discountPrice: number;
      serviceFee: number;
      productCode: string;
      giftpayBalance: number;
      productType: string;
      description: string;
      termsAndConditions?: string | null;
      country?: string | null;
      currency?: string | null;
      priceInPoints?: number | null;
      discountPriceInPoints?: number | null;
      image: {
        __typename?: 'ShopImage';
        url?: string | null;
        small: { __typename?: 'ShopImageDetails'; url?: string | null };
        product: { __typename?: 'ShopImageDetails'; url?: string | null };
        large: { __typename?: 'ShopImageDetails'; url?: string | null };
      };
      storefrontImage?: {
        __typename?: 'ShopImage';
        url?: string | null;
        small: { __typename?: 'ShopImageDetails'; url?: string | null };
        product: { __typename?: 'ShopImageDetails'; url?: string | null };
        large: { __typename?: 'ShopImageDetails'; url?: string | null };
      } | null;
    }>;
  };
};

export type PopularGiftCardsQueryVariables = Exact<{
  ehToken: Scalars['String'];
  orgId: Scalars['String'];
}>;

export type PopularGiftCardsQuery = {
  __typename?: 'Query';
  popularGiftCards: Array<{
    __typename?: 'Product';
    type: string;
    id: string;
    name: string;
    title: string;
    price: number;
    discountPrice: number;
    serviceFee: number;
    productCode: string;
    giftpayBalance: number;
    productType: string;
    description: string;
    termsAndConditions?: string | null;
    country?: string | null;
    currency?: string | null;
    priceInPoints?: number | null;
    discountPriceInPoints?: number | null;
    image: {
      __typename?: 'ShopImage';
      url?: string | null;
      small: { __typename?: 'ShopImageDetails'; url?: string | null };
      product: { __typename?: 'ShopImageDetails'; url?: string | null };
      large: { __typename?: 'ShopImageDetails'; url?: string | null };
    };
    storefrontImage?: {
      __typename?: 'ShopImage';
      url?: string | null;
      small: { __typename?: 'ShopImageDetails'; url?: string | null };
      product: { __typename?: 'ShopImageDetails'; url?: string | null };
      large: { __typename?: 'ShopImageDetails'; url?: string | null };
    } | null;
  }>;
};

export type BuyAgainGiftCardsQueryVariables = Exact<{
  ehToken: Scalars['String'];
  orgId: Scalars['String'];
}>;

export type BuyAgainGiftCardsQuery = {
  __typename?: 'Query';
  buyAgainGiftCards: Array<{
    __typename?: 'Product';
    type: string;
    id: string;
    name: string;
    title: string;
    price: number;
    discountPrice: number;
    serviceFee: number;
    productCode: string;
    giftpayBalance: number;
    productType: string;
    description: string;
    termsAndConditions?: string | null;
    country?: string | null;
    currency?: string | null;
    priceInPoints?: number | null;
    discountPriceInPoints?: number | null;
    image: {
      __typename?: 'ShopImage';
      url?: string | null;
      small: { __typename?: 'ShopImageDetails'; url?: string | null };
      product: { __typename?: 'ShopImageDetails'; url?: string | null };
      large: { __typename?: 'ShopImageDetails'; url?: string | null };
    };
    storefrontImage?: {
      __typename?: 'ShopImage';
      url?: string | null;
      small: { __typename?: 'ShopImageDetails'; url?: string | null };
      product: { __typename?: 'ShopImageDetails'; url?: string | null };
      large: { __typename?: 'ShopImageDetails'; url?: string | null };
    } | null;
  }>;
};

export type StripePublishableKeyQueryVariables = Exact<{
  ehToken: Scalars['String'];
  currency: Scalars['String'];
}>;

export type StripePublishableKeyQuery = {
  __typename?: 'Query';
  stripePublishableKey: { __typename?: 'PublishableKeys'; publishableKey: string };
};

export type OnlineOffersQueryVariables = Exact<{
  pageIndex?: InputMaybe<Scalars['Int']>;
  itemPerPage?: InputMaybe<Scalars['Int']>;
  categoryId?: InputMaybe<Scalars['String']>;
  searchTerm?: InputMaybe<Scalars['String']>;
}>;

export type OnlineOffersQuery = {
  __typename?: 'Query';
  onlineOffers: {
    __typename?: 'OnlineOffersResponse';
    itemPerPage: number;
    pageIndex: number;
    totalItems: number;
    totalPages: number;
    items: Array<{
      __typename?: 'OnlineOffer';
      id: string;
      type: CashBackType;
      title: string;
      category: string;
      categoryId: number;
      imageUrl: string;
      description: string;
      termsAndConditions: string;
      howItWorks: string;
      logo: string;
      trackingUrl: string;
      supplierName: string;
      supplierAboutUs: string;
      isFavourite: boolean;
      cashback: string;
      searchTag?: string | null;
      isCardLinkedOffer?: boolean | null;
    }>;
  };
};

export type OnlineOfferDetailQueryVariables = Exact<{
  offerId: Scalars['String'];
}>;

export type OnlineOfferDetailQuery = {
  __typename?: 'Query';
  onlineOfferDetail: {
    __typename?: 'OnlineOffer';
    id: string;
    type: CashBackType;
    title: string;
    category: string;
    categoryId: number;
    imageUrl: string;
    description: string;
    termsAndConditions: string;
    howItWorks: string;
    logo: string;
    trackingUrl: string;
    supplierName: string;
    supplierAboutUs: string;
    isFavourite: boolean;
    cashback: string;
    searchTag?: string | null;
    isCardLinkedOffer?: boolean | null;
  };
};

export type CashbackFeaturedOnlineOffersQueryVariables = Exact<{ [key: string]: never }>;

export type CashbackFeaturedOnlineOffersQuery = {
  __typename?: 'Query';
  cashbackFeaturedOnlineOffers: Array<{
    __typename?: 'OnlineOffer';
    id: string;
    type: CashBackType;
    title: string;
    category: string;
    categoryId: number;
    imageUrl: string;
    description: string;
    termsAndConditions: string;
    howItWorks: string;
    logo: string;
    trackingUrl: string;
    supplierName: string;
    supplierAboutUs: string;
    isFavourite: boolean;
    cashback: string;
    searchTag?: string | null;
    isCardLinkedOffer?: boolean | null;
  }>;
};

export type CashbackCategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type CashbackCategoriesQuery = {
  __typename?: 'Query';
  cashbackCategories: Array<{ __typename?: 'CashbackCategory'; id: string; name: string; image: string }>;
};

export type CashbackIntroductionContentQueryVariables = Exact<{ [key: string]: never }>;

export type CashbackIntroductionContentQuery = {
  __typename?: 'Query';
  cashbackIntroductionContent: {
    __typename?: 'CashbackIntroductionContent';
    step1: { __typename?: 'IntroductionContent'; heading: string; verbiage: string };
    step2: { __typename?: 'IntroductionContent'; heading: string; verbiage: string };
    step3: { __typename?: 'IntroductionContent'; heading: string; verbiage: string };
  };
};

export type CashbackTermsAndConditionsQueryVariables = Exact<{ [key: string]: never }>;

export type CashbackTermsAndConditionsQuery = {
  __typename?: 'Query';
  cashbackTermsAndConditions: Array<{
    __typename?: 'CashbackTermsAndCondition';
    text: string;
    textVariant: string;
    type: string;
    boldText?: string | null;
    boldTextVariant?: string | null;
    showListItemSymbol?: boolean | null;
    url?: string | null;
  }>;
};

export type CashbackTermsAndConditionsAcceptanceQueryVariables = Exact<{ [key: string]: never }>;

export type CashbackTermsAndConditionsAcceptanceQuery = {
  __typename?: 'Query';
  cashbackTermsAndConditionsAcceptance: { __typename?: 'TermsAndConditionsAcceptance'; isAccepted: boolean };
};

export type CashbackBanksQueryVariables = Exact<{ [key: string]: never }>;

export type CashbackBanksQuery = {
  __typename?: 'Query';
  cashbackBanks: Array<{ __typename?: 'CashbackBank'; id: number; name: string; region: string }>;
};

export type CashbackLinkedCardsQueryVariables = Exact<{ [key: string]: never }>;

export type CashbackLinkedCardsQuery = {
  __typename?: 'Query';
  cashbackLinkedCards: Array<{
    __typename?: 'CashbackCard';
    id: number;
    description: string;
    cardMasked: string;
    issuer: string;
    expiry: string;
    provider: string;
    isExpired: boolean;
    lastFour?: string | null;
  }>;
};

export type CashbackUserTokenQueryVariables = Exact<{ [key: string]: never }>;

export type CashbackUserTokenQuery = {
  __typename?: 'Query';
  cashbackUserToken: { __typename?: 'CashbackUserToken'; key: string; token: string };
};

export type CashbackTransactionsQueryVariables = Exact<{ [key: string]: never }>;

export type CashbackTransactionsQuery = {
  __typename?: 'Query';
  cashbackTransactions: {
    __typename?: 'CashbackTransactions';
    total: number;
    pending: number;
    transactions: Array<{
      __typename?: 'CashbackTransaction';
      id: number;
      offerId: number;
      imageUrl: string;
      amount: number;
      created: string;
      advertiserName: string;
      description: string;
      state: TransactionState;
      recordType: TransactionRecordType;
      purchaseAmount?: number | null;
      meta?: { __typename?: 'CashbackTransactionMeta'; accountNumber: string } | null;
    }>;
  };
};

export type CashbackTransactionsV2QueryVariables = Exact<{ [key: string]: never }>;

export type CashbackTransactionsV2Query = {
  __typename?: 'Query';
  cashbackTransactionsV2: {
    __typename?: 'CashbackTransactionsV2';
    total: number;
    pending: number;
    confirmed: number;
    transactions: Array<{
      __typename?: 'CashbackTransaction';
      id: number;
      offerId: number;
      imageUrl: string;
      amount: number;
      created: string;
      advertiserName: string;
      description: string;
      state: TransactionState;
      recordType: TransactionRecordType;
      purchaseAmount?: number | null;
      meta?: { __typename?: 'CashbackTransactionMeta'; accountNumber: string } | null;
    }>;
  };
};

export type CashbackOnboardStatusQueryVariables = Exact<{ [key: string]: never }>;

export type CashbackOnboardStatusQuery = {
  __typename?: 'Query';
  cashbackOnboardStatus: { __typename?: 'CashbackOnboardStatus'; hasCLOOnboarded?: boolean | null };
};

export type CashbackEmploymentHeroProviderIdQueryVariables = Exact<{ [key: string]: never }>;

export type CashbackEmploymentHeroProviderIdQuery = { __typename?: 'Query'; cashbackEmploymentHeroProviderId: string };

export type CashbackUserBankQueryVariables = Exact<{ [key: string]: never }>;

export type CashbackUserBankQuery = {
  __typename?: 'Query';
  cashbackUserBank: {
    __typename?: 'CashbackBankDetail';
    id?: number | null;
    bsb?: string | null;
    accountNumber?: string | null;
  };
};

export type CashbackInStoreOffersQueryVariables = Exact<{
  pageIndex?: InputMaybe<Scalars['Int']>;
  itemPerPage?: InputMaybe<Scalars['Int']>;
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  distance?: InputMaybe<Scalars['Float']>;
  searchTerm?: InputMaybe<Scalars['String']>;
}>;

export type CashbackInStoreOffersQuery = {
  __typename?: 'Query';
  cashbackInStoreOffers: {
    __typename?: 'InStoreOffersResponse';
    itemPerPage: number;
    pageIndex: number;
    totalItems: number;
    totalPages: number;
    items: Array<{
      __typename?: 'InStoreOffer';
      id: string;
      title: string;
      categoryId: string;
      category: string;
      advertiserId: string;
      advertiserName: string;
      advertiserAboutUs?: string | null;
      termsAndConditions?: string | null;
      description?: string | null;
      howItWorks?: string | null;
      website?: string | null;
      phoneNumber?: string | null;
      logo: string;
      coverShotUrl: string;
      ratingScore?: number | null;
      cashback?: string | null;
      searchTag?: string | null;
      locations: Array<{
        __typename?: 'InStoreOfferLocation';
        address: string;
        latitude: string;
        longitude: string;
        id: string;
        distance: number;
        bearing: number;
      }>;
    }>;
  };
};

export type CashbackInStoreOfferDetailQueryVariables = Exact<{
  offerId: Scalars['String'];
}>;

export type CashbackInStoreOfferDetailQuery = {
  __typename?: 'Query';
  cashbackInStoreOfferDetail: {
    __typename?: 'InStoreOffer';
    id: string;
    title: string;
    categoryId: string;
    category: string;
    advertiserId: string;
    advertiserName: string;
    advertiserAboutUs?: string | null;
    termsAndConditions?: string | null;
    description?: string | null;
    howItWorks?: string | null;
    website?: string | null;
    phoneNumber?: string | null;
    logo: string;
    coverShotUrl: string;
    ratingScore?: number | null;
    cashback?: string | null;
    searchTag?: string | null;
    locations: Array<{
      __typename?: 'InStoreOfferLocation';
      address: string;
      latitude: string;
      longitude: string;
      id: string;
      distance: number;
      bearing: number;
    }>;
  };
};

export type EWalletQueryVariables = Exact<{ [key: string]: never }>;

export type EWalletQuery = {
  __typename?: 'Query';
  eWallet?: {
    __typename?: 'EWalletDetails';
    accountName: string;
    accountNumber: string;
    bsb: string;
    totalBalance: number;
    availableBalance: number;
  } | null;
};

export type GetCardDetailsQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type GetCardDetailsQuery = {
  __typename?: 'Query';
  getCardDetails?: {
    __typename?: 'Card';
    id: string;
    accountId: string;
    status: CardStatus;
    cardToken?: string | null;
    customerId?: string | null;
    expiryDate?: string | null;
    issuedDateTimeUtc?: string | null;
    lastFourDigits?: string | null;
    nameOnCard: string;
  } | null;
};

export type GetCurrentCardDetailsQueryVariables = Exact<{ [key: string]: never }>;

export type GetCurrentCardDetailsQuery = {
  __typename?: 'Query';
  getCurrentCardDetails?: {
    __typename?: 'Card';
    id: string;
    accountId: string;
    status: CardStatus;
    cardToken?: string | null;
    customerId?: string | null;
    expiryDate?: string | null;
    issuedDateTimeUtc?: string | null;
    lastFourDigits?: string | null;
    nameOnCard: string;
  } | null;
};

export type GetCurrentCardMetaQueryVariables = Exact<{ [key: string]: never }>;

export type GetCurrentCardMetaQuery = {
  __typename?: 'Query';
  getCurrentCardMeta?: {
    __typename?: 'CardMeta';
    contactless?: boolean | null;
    designReference?: string | null;
    frozen?: boolean | null;
    id: string;
    lastFourDigits?: string | null;
    magStrip?: boolean | null;
    mobileWalletPaymentEnabled?: boolean | null;
    nameOnCard?: string | null;
    pinEnabled?: string | null;
    status?: CardStatus | null;
    digitalWalletDetails?: {
      __typename?: 'DigitalWalletDetails';
      primaryAccountIdentifier?: string | null;
      wallets?: Array<{ __typename?: 'DigitalWallet'; reference: string; type: WalletType } | null> | null;
    } | null;
  } | null;
};

export type GetOemProvisioningDataQueryVariables = Exact<{
  otp: Scalars['String'];
}>;

export type GetOemProvisioningDataQuery = {
  __typename?: 'Query';
  getOemProvisioningData?: {
    __typename?: 'OemProvisioningData';
    cardHolderName: string;
    cardToken: string;
    expiryDate: string;
    otp: string;
  } | null;
};

export type GetOemProvisioningDataWithoutOtpQueryVariables = Exact<{ [key: string]: never }>;

export type GetOemProvisioningDataWithoutOtpQuery = {
  __typename?: 'Query';
  getOemProvisioningDataWithoutOTP?: {
    __typename?: 'OemProvisioningData';
    cardHolderName: string;
    cardToken: string;
    expiryDate: string;
    otp: string;
  } | null;
};

export type GetTransactionsQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset: Scalars['Int'];
}>;

export type GetTransactionsQuery = {
  __typename?: 'Query';
  getTransactions?: Array<{
    __typename?: 'Transaction';
    accountId?: string | null;
    clearingTimeUtc?: string | null;
    description?: string | null;
    transactionId?: string | null;
    reference?: string | null;
    currencyAmount?: { __typename?: 'CurrencyAmount'; amount?: number | null; currency?: string | null } | null;
    counterpart?: {
      __typename?: 'Counterpart';
      name?: string | null;
      accountNumber?: string | null;
      bsb?: string | null;
    } | null;
  } | null> | null;
};

export type GetTransactionsV2QueryVariables = Exact<{
  limit: Scalars['Int'];
  offset: Scalars['Int'];
}>;

export type GetTransactionsV2Query = {
  __typename?: 'Query';
  getTransactionsV2?: Array<{
    __typename?: 'FinancialTransaction';
    id: string;
    dateTimeUTC: string;
    cardId?: string | null;
    pending?: boolean | null;
    type?: string | null;
    reference?: string | null;
    description?: string | null;
    currencyAmount: { __typename?: 'CurrencyAmount'; amount?: number | null; currency?: string | null };
    merchant?: { __typename?: 'TransactionMerchant'; name?: string | null; singleLineAddress?: string | null } | null;
    transferPeerDetails?: {
      __typename?: 'TransferPeerDetails';
      bsb?: string | null;
      accountNumber?: string | null;
      name?: string | null;
      accountHayId?: string | null;
    } | null;
  } | null> | null;
};

export type GetPersistentNotificationsQueryVariables = Exact<{ [key: string]: never }>;

export type GetPersistentNotificationsQuery = {
  __typename?: 'Query';
  getPersistentNotifications?: Array<{
    __typename?: 'PersistentNotification';
    id: string;
    notificationStatus: NotificationStatus;
    type: WalletNotificationType;
  } | null> | null;
};

export type EhCardBinRangeQueryVariables = Exact<{ [key: string]: never }>;

export type EhCardBinRangeQuery = {
  __typename?: 'Query';
  ehCardBinRange?: { __typename?: 'EhCardBinRange'; from: string; to: string } | null;
};

export type GetIdvProfileQueryVariables = Exact<{ [key: string]: never }>;

export type GetIdvProfileQuery = {
  __typename?: 'Query';
  getIDVProfile: {
    __typename?: 'IDVProfile';
    status?: IdvProfileStatus | null;
    token?: string | null;
    applicantId?: string | null;
  };
};

export type GetStashesQueryVariables = Exact<{ [key: string]: never }>;

export type GetStashesQuery = {
  __typename?: 'Query';
  getStashes?: Array<{
    __typename?: 'Stash';
    id?: string | null;
    name?: string | null;
    targetAmount?: number | null;
    balance?: number | null;
    imageUrl?: string | null;
    closedAtUtc?: string | null;
    createdAtUtc?: string | null;
    status?: StashStatus | null;
  } | null> | null;
};

export type GetStashMetaQueryVariables = Exact<{ [key: string]: never }>;

export type GetStashMetaQuery = {
  __typename?: 'Query';
  getStashMeta?: {
    __typename?: 'StashMeta';
    isMarketingCardFinished?: boolean | null;
    isStashEntryButtonInSpendAccountHidden?: boolean | null;
  } | null;
};

export type GetStashTransactionsQueryVariables = Exact<{
  stashId: Scalars['String'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
}>;

export type GetStashTransactionsQuery = {
  __typename?: 'Query';
  getStashTransactions?: Array<{
    __typename?: 'StashTransaction';
    id?: string | null;
    amount?: number | null;
    transactionTimeUtc?: string | null;
  } | null> | null;
};

export type GetUkTokenQueryVariables = Exact<{ [key: string]: never }>;

export type GetUkTokenQuery = {
  __typename?: 'Query';
  getUKToken?: { __typename?: 'StartWalletCreationResponse'; userToken: string } | null;
};

export type HeroDollarBalanceQueryVariables = Exact<{
  ehToken: Scalars['String'];
}>;

export type HeroDollarBalanceQuery = {
  __typename?: 'Query';
  heroDollarBalance: { __typename?: 'HeroDollarBalance'; balance: number };
};

export type HeroDollarTransactionsQueryVariables = Exact<{
  ehToken: Scalars['String'];
  pageIndex?: InputMaybe<Scalars['Int']>;
  itemPerPage?: InputMaybe<Scalars['Int']>;
}>;

export type HeroDollarTransactionsQuery = {
  __typename?: 'Query';
  heroDollarTransactions: {
    __typename?: 'HeroDollarTransactions';
    itemPerPage: number;
    pageIndex: number;
    totalItems: number;
    totalPages: number;
    items: Array<{
      __typename?: 'HeroDollarTransactionItem';
      id: string;
      refId?: string | null;
      amount: number;
      transactionType: HeroDollarTransactionType;
      transactionTimeUtc: string;
      clientType: HeroDollarClientType;
      reason?: string | null;
      reasonType?: HeroDollarReasonType | null;
    } | null>;
  };
};

export type HeroDollarTransactionDetailQueryVariables = Exact<{
  ehToken: Scalars['String'];
  transactionId: Scalars['String'];
  clientType?: InputMaybe<HeroDollarClientType>;
}>;

export type HeroDollarTransactionDetailQuery = {
  __typename?: 'Query';
  heroDollarTransactionDetail?: {
    __typename?: 'HeroDollarTransactionDetail';
    id: string;
    refId?: string | null;
    amount: number;
    transactionType: HeroDollarTransactionType;
    transactionTimeUtc: string;
    clientType: HeroDollarClientType;
    reason?: string | null;
    reasonType?: HeroDollarReasonType | null;
    recognised_by?: string | null;
    organization_name?: string | null;
    merchant_name?: string | null;
  } | null;
};

export type HeroDollarRedemptionFeeQueryVariables = Exact<{ [key: string]: never }>;

export type HeroDollarRedemptionFeeQuery = {
  __typename?: 'Query';
  heroDollarRedemptionFee: {
    __typename?: 'HeroDollarRedemptionFeeResponse';
    data: { __typename?: 'HeroDollarRedemptionFee'; fee: number };
  };
};

export type PaymentPreferenceSettingsQueryVariables = Exact<{ [key: string]: never }>;

export type PaymentPreferenceSettingsQuery = {
  __typename?: 'Query';
  paymentPreferenceSettings: { __typename?: 'PaymentPreferencesSettings'; payWithHDOnSwagCard?: boolean | null };
};

export type PayWithHdCarouselSeenStatusQueryVariables = Exact<{ [key: string]: never }>;

export type PayWithHdCarouselSeenStatusQuery = {
  __typename?: 'Query';
  payWithHDCarouselSeenStatus: { __typename?: 'PayWithHDCarouselSeen'; seen: boolean };
};

export type CashbackUserInfoQueryVariables = Exact<{ [key: string]: never }>;

export type CashbackUserInfoQuery = {
  __typename?: 'Query';
  cashbackUserInfo?: {
    __typename: 'CashbackUserInfo';
    autoEnrolMessage?: string | null;
    autoEnrolStatus?: AutoEnrolStatus | null;
    bankLinkedMessage?: string | null;
    bankLinkedStatus?: BankLinkedStatus | null;
    createdAt?: string | null;
    updatedAt?: string | null;
  } | null;
};

export const MailingAddressDocument = `
    mutation MailingAddress($address: AddressInput) {
  mailingAddress(address: $address)
}
    `;
export const useMailingAddressMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<MailingAddressMutation, TError, MailingAddressMutationVariables, TContext>
) =>
  useMutation<MailingAddressMutation, TError, MailingAddressMutationVariables, TContext>(
    ['MailingAddress'],
    useFetchData<MailingAddressMutation, MailingAddressMutationVariables>(MailingAddressDocument),
    options
  );
export const PatchProfileDocument = `
    mutation PatchProfile($patch: EhProfilePatchRequest, $ehToken: String!, $orgId: String) {
  patchProfile(patch: $patch, ehToken: $ehToken, orgId: $orgId) {
    userId
    userUuid
    avatarUrl
    firstName
    lastName
    email
    phoneNumber
    countryCode
    stateCode
  }
}
    `;
export const usePatchProfileMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<PatchProfileMutation, TError, PatchProfileMutationVariables, TContext>
) =>
  useMutation<PatchProfileMutation, TError, PatchProfileMutationVariables, TContext>(
    ['PatchProfile'],
    useFetchData<PatchProfileMutation, PatchProfileMutationVariables>(PatchProfileDocument),
    options
  );
export const EventLogDocument = `
    mutation EventLog($event: EventLogRequest) {
  eventLog(event: $event)
}
    `;
export const useEventLogMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<EventLogMutation, TError, EventLogMutationVariables, TContext>
) =>
  useMutation<EventLogMutation, TError, EventLogMutationVariables, TContext>(
    ['EventLog'],
    useFetchData<EventLogMutation, EventLogMutationVariables>(EventLogDocument),
    options
  );
export const UpdateUserProfileDocument = `
    mutation UpdateUserProfile($userProfile: UpdateUserProfileInput!) {
  updateUserProfile(userProfile: $userProfile)
}
    `;
export const useUpdateUserProfileMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<UpdateUserProfileMutation, TError, UpdateUserProfileMutationVariables, TContext>
) =>
  useMutation<UpdateUserProfileMutation, TError, UpdateUserProfileMutationVariables, TContext>(
    ['UpdateUserProfile'],
    useFetchData<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>(UpdateUserProfileDocument),
    options
  );
export const FinishSpendAccountCarouselDocument = `
    mutation FinishSpendAccountCarousel {
  finishSpendAccountCarousel
}
    `;
export const useFinishSpendAccountCarouselMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    FinishSpendAccountCarouselMutation,
    TError,
    FinishSpendAccountCarouselMutationVariables,
    TContext
  >
) =>
  useMutation<FinishSpendAccountCarouselMutation, TError, FinishSpendAccountCarouselMutationVariables, TContext>(
    ['FinishSpendAccountCarousel'],
    useFetchData<FinishSpendAccountCarouselMutation, FinishSpendAccountCarouselMutationVariables>(
      FinishSpendAccountCarouselDocument
    ),
    options
  );
export const DrawdownWageDocument = `
    mutation DrawdownWage($ehToken: String!, $orgId: String!, $bankAccountId: String!, $amount: Float!) {
  drawdownWage(
    ehToken: $ehToken
    orgId: $orgId
    bankAccountId: $bankAccountId
    amount: $amount
  )
}
    `;
export const useDrawdownWageMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<DrawdownWageMutation, TError, DrawdownWageMutationVariables, TContext>
) =>
  useMutation<DrawdownWageMutation, TError, DrawdownWageMutationVariables, TContext>(
    ['DrawdownWage'],
    useFetchData<DrawdownWageMutation, DrawdownWageMutationVariables>(DrawdownWageDocument),
    options
  );
export const DrawdownWageV2Document = `
    mutation DrawdownWageV2($ehToken: String!, $orgId: String!, $bankAccountId: String!, $amount: Float!) {
  drawdownWageV2(
    ehToken: $ehToken
    orgId: $orgId
    bankAccountId: $bankAccountId
    amount: $amount
  ) {
    drawdown {
      status
      message
      messageCode
      data {
        transactionId
        amount
        bsb
        accountNumber
        accountName
        accountEmail
        createdAt
        expectedPayDate
      }
    }
  }
}
    `;
export const useDrawdownWageV2Mutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<DrawdownWageV2Mutation, TError, DrawdownWageV2MutationVariables, TContext>
) =>
  useMutation<DrawdownWageV2Mutation, TError, DrawdownWageV2MutationVariables, TContext>(
    ['DrawdownWageV2'],
    useFetchData<DrawdownWageV2Mutation, DrawdownWageV2MutationVariables>(DrawdownWageV2Document),
    options
  );
export const PayAccountDocument = `
    mutation PayAccount($ehToken: String!, $membership: EhMembershipInput!, $bankDetails: PayAllocationInput!) {
  payAccount(
    ehToken: $ehToken
    membership: $membership
    bankDetails: $bankDetails
  )
}
    `;
export const usePayAccountMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<PayAccountMutation, TError, PayAccountMutationVariables, TContext>
) =>
  useMutation<PayAccountMutation, TError, PayAccountMutationVariables, TContext>(
    ['PayAccount'],
    useFetchData<PayAccountMutation, PayAccountMutationVariables>(PayAccountDocument),
    options
  );
export const AccountTransferDocument = `
    mutation AccountTransfer($transferDetails: AccountTransferInput) {
  accountTransfer(transferDetails: $transferDetails) {
    transactionId
    outcome
  }
}
    `;
export const useAccountTransferMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<AccountTransferMutation, TError, AccountTransferMutationVariables, TContext>
) =>
  useMutation<AccountTransferMutation, TError, AccountTransferMutationVariables, TContext>(
    ['AccountTransfer'],
    useFetchData<AccountTransferMutation, AccountTransferMutationVariables>(AccountTransferDocument),
    options
  );
export const MakePaymentDocument = `
    mutation MakePayment($ehToken: String!, $orgId: String!, $nonce: String!, $items: [MakePaymentItem!]!, $paymentMethod: MakePaymentPaymentMethod!, $deviceData: String!) {
  makePayment(
    ehToken: $ehToken
    orgId: $orgId
    nonce: $nonce
    items: $items
    paymentMethod: $paymentMethod
    deviceData: $deviceData
  ) {
    billableAmount
    createdAt
    freightCost
    id
    ipAddress
    memberId
    name
    status
    transactionFee
    type
  }
}
    `;
export const useMakePaymentMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<MakePaymentMutation, TError, MakePaymentMutationVariables, TContext>
) =>
  useMutation<MakePaymentMutation, TError, MakePaymentMutationVariables, TContext>(
    ['MakePayment'],
    useFetchData<MakePaymentMutation, MakePaymentMutationVariables>(MakePaymentDocument),
    options
  );
export const MakePaymentV2Document = `
    mutation MakePaymentV2($ehToken: String!, $orgId: String!, $nonce: String!, $items: [MakePaymentItem!]!, $paymentMethod: MakePaymentPaymentMethod!, $deviceData: String!, $serviceFee: String!, $ehPlatform: String) {
  makePaymentV2(
    ehToken: $ehToken
    orgId: $orgId
    nonce: $nonce
    items: $items
    paymentMethod: $paymentMethod
    deviceData: $deviceData
    serviceFee: $serviceFee
    ehPlatform: $ehPlatform
  ) {
    billableAmount
    createdAt
    freightCost
    id
    ipAddress
    memberId
    name
    status
    transactionFee
    type
  }
}
    `;
export const useMakePaymentV2Mutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<MakePaymentV2Mutation, TError, MakePaymentV2MutationVariables, TContext>
) =>
  useMutation<MakePaymentV2Mutation, TError, MakePaymentV2MutationVariables, TContext>(
    ['MakePaymentV2'],
    useFetchData<MakePaymentV2Mutation, MakePaymentV2MutationVariables>(MakePaymentV2Document),
    options
  );
export const CreateStripeClientTokenDocument = `
    mutation CreateStripeClientToken($ehToken: String!, $orgId: String!, $createStripeClientTokenInput: CreateStripeClientTokenInput) {
  createStripeClientToken(
    ehToken: $ehToken
    orgId: $orgId
    createStripeClientTokenInput: $createStripeClientTokenInput
  ) {
    clientToken
  }
}
    `;
export const useCreateStripeClientTokenMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CreateStripeClientTokenMutation,
    TError,
    CreateStripeClientTokenMutationVariables,
    TContext
  >
) =>
  useMutation<CreateStripeClientTokenMutation, TError, CreateStripeClientTokenMutationVariables, TContext>(
    ['CreateStripeClientToken'],
    useFetchData<CreateStripeClientTokenMutation, CreateStripeClientTokenMutationVariables>(
      CreateStripeClientTokenDocument
    ),
    options
  );
export const MakeStripePaymentDocument = `
    mutation MakeStripePayment($ehToken: String!, $orgId: String!, $nonce: String!, $items: [MakePaymentItem!]!, $paymentMethod: MakePaymentPaymentMethod!, $deviceData: String!, $serviceFee: String!, $ehPlatform: String) {
  makeStripePayment(
    ehToken: $ehToken
    orgId: $orgId
    nonce: $nonce
    items: $items
    paymentMethod: $paymentMethod
    deviceData: $deviceData
    serviceFee: $serviceFee
    ehPlatform: $ehPlatform
  ) {
    billableAmount
    createdAt
    freightCost
    id
    ipAddress
    memberId
    name
    status
    transactionFee
    type
  }
}
    `;
export const useMakeStripePaymentMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<MakeStripePaymentMutation, TError, MakeStripePaymentMutationVariables, TContext>
) =>
  useMutation<MakeStripePaymentMutation, TError, MakeStripePaymentMutationVariables, TContext>(
    ['MakeStripePayment'],
    useFetchData<MakeStripePaymentMutation, MakeStripePaymentMutationVariables>(MakeStripePaymentDocument),
    options
  );
export const CancelStripePaymentDocument = `
    mutation CancelStripePayment($ehToken: String!, $orgId: String!, $clientToken: String!) {
  cancelStripePayment(ehToken: $ehToken, orgId: $orgId, clientToken: $clientToken)
}
    `;
export const useCancelStripePaymentMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<CancelStripePaymentMutation, TError, CancelStripePaymentMutationVariables, TContext>
) =>
  useMutation<CancelStripePaymentMutation, TError, CancelStripePaymentMutationVariables, TContext>(
    ['CancelStripePayment'],
    useFetchData<CancelStripePaymentMutation, CancelStripePaymentMutationVariables>(CancelStripePaymentDocument),
    options
  );
export const ActivateCardDocument = `
    mutation ActivateCard {
  activateCard
}
    `;
export const useActivateCardMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<ActivateCardMutation, TError, ActivateCardMutationVariables, TContext>
) =>
  useMutation<ActivateCardMutation, TError, ActivateCardMutationVariables, TContext>(
    ['ActivateCard'],
    useFetchData<ActivateCardMutation, ActivateCardMutationVariables>(ActivateCardDocument),
    options
  );
export const CardDocument = `
    mutation Card($cardRequest: CardRequestInput!) {
  card(cardRequest: $cardRequest)
}
    `;
export const useCardMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<CardMutation, TError, CardMutationVariables, TContext>
) =>
  useMutation<CardMutation, TError, CardMutationVariables, TContext>(
    ['Card'],
    useFetchData<CardMutation, CardMutationVariables>(CardDocument),
    options
  );
export const InitiateEWalletSetupDocument = `
    mutation InitiateEWalletSetup($setupDetails: EWalletSetupDetailsInput) {
  initiateEWalletSetup(setupDetails: $setupDetails) {
    id
    haasID
    ehUUID
    kpId
    loginType
    email
    createdAt
    updatedAt
    deletedAt
    ehTimezone
    eWalletSetupStatus
    eWalletStatusReason
    residentialAddress {
      region
      country
      addressLine1
      unitNumber
      streetNumber
      streetName
      streetType
      postcode
      townOrCity
      addressLine2
      addressLine3
    }
    mailingAddress {
      region
      country
      addressLine1
      addressLine2
      addressLine3
      postcode
      townOrCity
    }
    phoneNumber {
      countryCode
      number
    }
    firstName
    lastName
    dateOfBirth
    preferredName
    gender
    hasConsentedTermsConditions
    termsConditionsConsentTimestamp
    hasConsentedIdentityVerificationTerms
    identityVerificationTermsConsentTimestamp
  }
}
    `;
export const useInitiateEWalletSetupMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<InitiateEWalletSetupMutation, TError, InitiateEWalletSetupMutationVariables, TContext>
) =>
  useMutation<InitiateEWalletSetupMutation, TError, InitiateEWalletSetupMutationVariables, TContext>(
    ['InitiateEWalletSetup'],
    useFetchData<InitiateEWalletSetupMutation, InitiateEWalletSetupMutationVariables>(InitiateEWalletSetupDocument),
    options
  );
export const InitiateEWalletSetupV2Document = `
    mutation InitiateEWalletSetupV2($setupDetails: EWalletSetupDetailsInputV2) {
  initiateEWalletSetupV2(setupDetails: $setupDetails) {
    id
    haasID
    ehUUID
    kpId
    loginType
    email
    createdAt
    updatedAt
    deletedAt
    ehTimezone
    eWalletSetupStatus
    eWalletStatusReason
    residentialAddress {
      region
      country
      addressLine1
      unitNumber
      streetNumber
      streetName
      streetType
      postcode
      townOrCity
      addressLine2
      addressLine3
    }
    mailingAddress {
      region
      country
      addressLine1
      addressLine2
      addressLine3
      postcode
      townOrCity
    }
    phoneNumber {
      countryCode
      number
    }
    firstName
    lastName
    dateOfBirth
    preferredName
    gender
    hasConsentedTermsConditions
    termsConditionsConsentTimestamp
    hasConsentedIdentityVerificationTerms
    identityVerificationTermsConsentTimestamp
  }
}
    `;
export const useInitiateEWalletSetupV2Mutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    InitiateEWalletSetupV2Mutation,
    TError,
    InitiateEWalletSetupV2MutationVariables,
    TContext
  >
) =>
  useMutation<InitiateEWalletSetupV2Mutation, TError, InitiateEWalletSetupV2MutationVariables, TContext>(
    ['InitiateEWalletSetupV2'],
    useFetchData<InitiateEWalletSetupV2Mutation, InitiateEWalletSetupV2MutationVariables>(
      InitiateEWalletSetupV2Document
    ),
    options
  );
export const RequestNewCardDocument = `
    mutation RequestNewCard($address: AddressInput) {
  requestNewCard(address: $address)
}
    `;
export const useRequestNewCardMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<RequestNewCardMutation, TError, RequestNewCardMutationVariables, TContext>
) =>
  useMutation<RequestNewCardMutation, TError, RequestNewCardMutationVariables, TContext>(
    ['RequestNewCard'],
    useFetchData<RequestNewCardMutation, RequestNewCardMutationVariables>(RequestNewCardDocument),
    options
  );
export const SendOtpToCurrentUserDocument = `
    mutation SendOtpToCurrentUser {
  sendOtpToCurrentUser {
    countryCode
    number
  }
}
    `;
export const useSendOtpToCurrentUserMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<SendOtpToCurrentUserMutation, TError, SendOtpToCurrentUserMutationVariables, TContext>
) =>
  useMutation<SendOtpToCurrentUserMutation, TError, SendOtpToCurrentUserMutationVariables, TContext>(
    ['SendOtpToCurrentUser'],
    useFetchData<SendOtpToCurrentUserMutation, SendOtpToCurrentUserMutationVariables>(SendOtpToCurrentUserDocument),
    options
  );
export const UpdateCardMetaDocument = `
    mutation UpdateCardMeta($cardMeta: CardMetaInput!) {
  updateCardMeta(cardMeta: $cardMeta)
}
    `;
export const useUpdateCardMetaMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<UpdateCardMetaMutation, TError, UpdateCardMetaMutationVariables, TContext>
) =>
  useMutation<UpdateCardMetaMutation, TError, UpdateCardMetaMutationVariables, TContext>(
    ['UpdateCardMeta'],
    useFetchData<UpdateCardMetaMutation, UpdateCardMetaMutationVariables>(UpdateCardMetaDocument),
    options
  );
export const UpdateCardPinDocument = `
    mutation UpdateCardPIN($cardPIN: String!) {
  updateCardPIN(cardPIN: $cardPIN)
}
    `;
export const useUpdateCardPinMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<UpdateCardPinMutation, TError, UpdateCardPinMutationVariables, TContext>
) =>
  useMutation<UpdateCardPinMutation, TError, UpdateCardPinMutationVariables, TContext>(
    ['UpdateCardPIN'],
    useFetchData<UpdateCardPinMutation, UpdateCardPinMutationVariables>(UpdateCardPinDocument),
    options
  );
export const ClearPersistentNotificationDocument = `
    mutation ClearPersistentNotification($type: WalletNotificationType!) {
  clearPersistentNotification(type: $type)
}
    `;
export const useClearPersistentNotificationMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    ClearPersistentNotificationMutation,
    TError,
    ClearPersistentNotificationMutationVariables,
    TContext
  >
) =>
  useMutation<ClearPersistentNotificationMutation, TError, ClearPersistentNotificationMutationVariables, TContext>(
    ['ClearPersistentNotification'],
    useFetchData<ClearPersistentNotificationMutation, ClearPersistentNotificationMutationVariables>(
      ClearPersistentNotificationDocument
    ),
    options
  );
export const SaveWalletSetupDocument = `
    mutation SaveWalletSetup($setupDetails: EWalletSetupDetailsInputV2) {
  saveWalletSetup(setupDetails: $setupDetails) {
    idvToken
    applicantId
    user {
      id
      haasID
      ehUUID
      kpId
      loginType
      email
      createdAt
      updatedAt
      deletedAt
      ehTimezone
      eWalletSetupStatus
      eWalletStatusReason
      residentialAddress {
        region
        country
        addressLine1
        unitNumber
        streetNumber
        streetName
        streetType
        postcode
        townOrCity
        addressLine2
        addressLine3
      }
      mailingAddress {
        region
        country
        addressLine1
        addressLine2
        addressLine3
        postcode
        townOrCity
      }
      phoneNumber {
        countryCode
        number
      }
      firstName
      lastName
      dateOfBirth
      preferredName
      gender
      hasConsentedTermsConditions
      termsConditionsConsentTimestamp
      hasConsentedIdentityVerificationTerms
      identityVerificationTermsConsentTimestamp
    }
  }
}
    `;
export const useSaveWalletSetupMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<SaveWalletSetupMutation, TError, SaveWalletSetupMutationVariables, TContext>
) =>
  useMutation<SaveWalletSetupMutation, TError, SaveWalletSetupMutationVariables, TContext>(
    ['SaveWalletSetup'],
    useFetchData<SaveWalletSetupMutation, SaveWalletSetupMutationVariables>(SaveWalletSetupDocument),
    options
  );
export const InitiateEWalletSetupV3Document = `
    mutation InitiateEWalletSetupV3 {
  initiateEWalletSetupV3
}
    `;
export const useInitiateEWalletSetupV3Mutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    InitiateEWalletSetupV3Mutation,
    TError,
    InitiateEWalletSetupV3MutationVariables,
    TContext
  >
) =>
  useMutation<InitiateEWalletSetupV3Mutation, TError, InitiateEWalletSetupV3MutationVariables, TContext>(
    ['InitiateEWalletSetupV3'],
    useFetchData<InitiateEWalletSetupV3Mutation, InitiateEWalletSetupV3MutationVariables>(
      InitiateEWalletSetupV3Document
    ),
    options
  );
export const SetStashMetaDocument = `
    mutation SetStashMeta($meta: StashMetaInput!) {
  setStashMeta(meta: $meta)
}
    `;
export const useSetStashMetaMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<SetStashMetaMutation, TError, SetStashMetaMutationVariables, TContext>
) =>
  useMutation<SetStashMetaMutation, TError, SetStashMetaMutationVariables, TContext>(
    ['SetStashMeta'],
    useFetchData<SetStashMetaMutation, SetStashMetaMutationVariables>(SetStashMetaDocument),
    options
  );
export const DepositStashDocument = `
    mutation DepositStash($stashId: String!, $depositInput: DepositStashInput!) {
  depositStash(stashId: $stashId, depositInput: $depositInput)
}
    `;
export const useDepositStashMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<DepositStashMutation, TError, DepositStashMutationVariables, TContext>
) =>
  useMutation<DepositStashMutation, TError, DepositStashMutationVariables, TContext>(
    ['DepositStash'],
    useFetchData<DepositStashMutation, DepositStashMutationVariables>(DepositStashDocument),
    options
  );
export const CreateStashDocument = `
    mutation CreateStash($stashInput: CreateStashInput!) {
  createStash(stashInput: $stashInput)
}
    `;
export const useCreateStashMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<CreateStashMutation, TError, CreateStashMutationVariables, TContext>
) =>
  useMutation<CreateStashMutation, TError, CreateStashMutationVariables, TContext>(
    ['CreateStash'],
    useFetchData<CreateStashMutation, CreateStashMutationVariables>(CreateStashDocument),
    options
  );
export const WithdrawStashDocument = `
    mutation WithdrawStash($stashId: String!, $withdrawInput: WithdrawStashInput!) {
  withdrawStash(stashId: $stashId, withdrawInput: $withdrawInput)
}
    `;
export const useWithdrawStashMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<WithdrawStashMutation, TError, WithdrawStashMutationVariables, TContext>
) =>
  useMutation<WithdrawStashMutation, TError, WithdrawStashMutationVariables, TContext>(
    ['WithdrawStash'],
    useFetchData<WithdrawStashMutation, WithdrawStashMutationVariables>(WithdrawStashDocument),
    options
  );
export const CloseStashDocument = `
    mutation CloseStash($stashId: String!) {
  closeStash(stashId: $stashId) {
    result
  }
}
    `;
export const useCloseStashMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<CloseStashMutation, TError, CloseStashMutationVariables, TContext>
) =>
  useMutation<CloseStashMutation, TError, CloseStashMutationVariables, TContext>(
    ['CloseStash'],
    useFetchData<CloseStashMutation, CloseStashMutationVariables>(CloseStashDocument),
    options
  );
export const StartWalletCreationDocument = `
    mutation StartWalletCreation($startWalletCreationInput: StartWalletCreationInput) {
  startWalletCreation(startWalletCreationInput: $startWalletCreationInput) {
    userToken
  }
}
    `;
export const useStartWalletCreationMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<StartWalletCreationMutation, TError, StartWalletCreationMutationVariables, TContext>
) =>
  useMutation<StartWalletCreationMutation, TError, StartWalletCreationMutationVariables, TContext>(
    ['StartWalletCreation'],
    useFetchData<StartWalletCreationMutation, StartWalletCreationMutationVariables>(StartWalletCreationDocument),
    options
  );
export const CashbackRegisterUserDocument = `
    mutation CashbackRegisterUser {
  cashbackRegisterUser
}
    `;
export const useCashbackRegisterUserMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<CashbackRegisterUserMutation, TError, CashbackRegisterUserMutationVariables, TContext>
) =>
  useMutation<CashbackRegisterUserMutation, TError, CashbackRegisterUserMutationVariables, TContext>(
    ['CashbackRegisterUser'],
    useFetchData<CashbackRegisterUserMutation, CashbackRegisterUserMutationVariables>(CashbackRegisterUserDocument),
    options
  );
export const CashbackOnboardUserDocument = `
    mutation CashbackOnboardUser {
  cashbackOnboardUser
}
    `;
export const useCashbackOnboardUserMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<CashbackOnboardUserMutation, TError, CashbackOnboardUserMutationVariables, TContext>
) =>
  useMutation<CashbackOnboardUserMutation, TError, CashbackOnboardUserMutationVariables, TContext>(
    ['CashbackOnboardUser'],
    useFetchData<CashbackOnboardUserMutation, CashbackOnboardUserMutationVariables>(CashbackOnboardUserDocument),
    options
  );
export const CashbackEnrolCardDocument = `
    mutation CashbackEnrolCard($enrolCard: CashbackEnrolCardInput!) {
  cashbackEnrolCard(enrolCard: $enrolCard) {
    id
    description
    cardMasked
    issuer
    expiry
    provider
    isExpired
    lastFour
  }
}
    `;
export const useCashbackEnrolCardMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<CashbackEnrolCardMutation, TError, CashbackEnrolCardMutationVariables, TContext>
) =>
  useMutation<CashbackEnrolCardMutation, TError, CashbackEnrolCardMutationVariables, TContext>(
    ['CashbackEnrolCard'],
    useFetchData<CashbackEnrolCardMutation, CashbackEnrolCardMutationVariables>(CashbackEnrolCardDocument),
    options
  );
export const CashbackDeleteCardDocument = `
    mutation CashbackDeleteCard($deleteCard: CashbackDeleteCardInput!) {
  cashbackDeleteCard(deleteCard: $deleteCard)
}
    `;
export const useCashbackDeleteCardMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<CashbackDeleteCardMutation, TError, CashbackDeleteCardMutationVariables, TContext>
) =>
  useMutation<CashbackDeleteCardMutation, TError, CashbackDeleteCardMutationVariables, TContext>(
    ['CashbackDeleteCard'],
    useFetchData<CashbackDeleteCardMutation, CashbackDeleteCardMutationVariables>(CashbackDeleteCardDocument),
    options
  );
export const CashbackUpdateBankDetailsDocument = `
    mutation CashbackUpdateBankDetails($bankDetails: CashbackBankDetailInput!) {
  cashbackUpdateBankDetails(bankDetails: $bankDetails)
}
    `;
export const useCashbackUpdateBankDetailsMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CashbackUpdateBankDetailsMutation,
    TError,
    CashbackUpdateBankDetailsMutationVariables,
    TContext
  >
) =>
  useMutation<CashbackUpdateBankDetailsMutation, TError, CashbackUpdateBankDetailsMutationVariables, TContext>(
    ['CashbackUpdateBankDetails'],
    useFetchData<CashbackUpdateBankDetailsMutation, CashbackUpdateBankDetailsMutationVariables>(
      CashbackUpdateBankDetailsDocument
    ),
    options
  );
export const CashbackAcceptTermsAndConditionsDocument = `
    mutation CashbackAcceptTermsAndConditions {
  cashbackAcceptTermsAndConditions {
    isAccepted
  }
}
    `;
export const useCashbackAcceptTermsAndConditionsMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CashbackAcceptTermsAndConditionsMutation,
    TError,
    CashbackAcceptTermsAndConditionsMutationVariables,
    TContext
  >
) =>
  useMutation<
    CashbackAcceptTermsAndConditionsMutation,
    TError,
    CashbackAcceptTermsAndConditionsMutationVariables,
    TContext
  >(
    ['CashbackAcceptTermsAndConditions'],
    useFetchData<CashbackAcceptTermsAndConditionsMutation, CashbackAcceptTermsAndConditionsMutationVariables>(
      CashbackAcceptTermsAndConditionsDocument
    ),
    options
  );
export const UpdatePaymentPreferenceSettingsDocument = `
    mutation UpdatePaymentPreferenceSettings($settings: PaymentPreferencesSettingsInput) {
  updatePaymentPreferenceSettings(settings: $settings) {
    payWithHDOnSwagCard
  }
}
    `;
export const useUpdatePaymentPreferenceSettingsMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    UpdatePaymentPreferenceSettingsMutation,
    TError,
    UpdatePaymentPreferenceSettingsMutationVariables,
    TContext
  >
) =>
  useMutation<
    UpdatePaymentPreferenceSettingsMutation,
    TError,
    UpdatePaymentPreferenceSettingsMutationVariables,
    TContext
  >(
    ['UpdatePaymentPreferenceSettings'],
    useFetchData<UpdatePaymentPreferenceSettingsMutation, UpdatePaymentPreferenceSettingsMutationVariables>(
      UpdatePaymentPreferenceSettingsDocument
    ),
    options
  );
export const SeenPayWithHdCarouselDocument = `
    mutation SeenPayWithHDCarousel {
  seenPayWithHDCarousel
}
    `;
export const useSeenPayWithHdCarouselMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<SeenPayWithHdCarouselMutation, TError, SeenPayWithHdCarouselMutationVariables, TContext>
) =>
  useMutation<SeenPayWithHdCarouselMutation, TError, SeenPayWithHdCarouselMutationVariables, TContext>(
    ['SeenPayWithHDCarousel'],
    useFetchData<SeenPayWithHdCarouselMutation, SeenPayWithHdCarouselMutationVariables>(SeenPayWithHdCarouselDocument),
    options
  );
export const CashbackUpdateAutoEnrolDocument = `
    mutation CashbackUpdateAutoEnrol($input: AutoEnrolInput!) {
  cashbackUpdateAutoEnrol(input: $input)
}
    `;
export const useCashbackUpdateAutoEnrolMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CashbackUpdateAutoEnrolMutation,
    TError,
    CashbackUpdateAutoEnrolMutationVariables,
    TContext
  >
) =>
  useMutation<CashbackUpdateAutoEnrolMutation, TError, CashbackUpdateAutoEnrolMutationVariables, TContext>(
    ['CashbackUpdateAutoEnrol'],
    useFetchData<CashbackUpdateAutoEnrolMutation, CashbackUpdateAutoEnrolMutationVariables>(
      CashbackUpdateAutoEnrolDocument
    ),
    options
  );
export const GetGooglePlaceApiKeyDocument = `
    query GetGooglePlaceApiKey($platform: String!) {
  getGooglePlaceApiKey(platform: $platform) {
    name
    value
  }
}
    `;
export const useGetGooglePlaceApiKeyQuery = <TData = GetGooglePlaceApiKeyQuery, TError = unknown>(
  variables: GetGooglePlaceApiKeyQueryVariables,
  options?: UseQueryOptions<GetGooglePlaceApiKeyQuery, TError, TData>
) =>
  useQuery<GetGooglePlaceApiKeyQuery, TError, TData>(
    ['GetGooglePlaceApiKey', variables],
    useFetchData<GetGooglePlaceApiKeyQuery, GetGooglePlaceApiKeyQueryVariables>(GetGooglePlaceApiKeyDocument).bind(
      null,
      variables
    ),
    options
  );

useGetGooglePlaceApiKeyQuery.getKey = (variables: GetGooglePlaceApiKeyQueryVariables) => [
  'GetGooglePlaceApiKey',
  variables,
];
export const useInfiniteGetGooglePlaceApiKeyQuery = <TData = GetGooglePlaceApiKeyQuery, TError = unknown>(
  variables: GetGooglePlaceApiKeyQueryVariables,
  options?: UseInfiniteQueryOptions<GetGooglePlaceApiKeyQuery, TError, TData>
) => {
  const query = useFetchData<GetGooglePlaceApiKeyQuery, GetGooglePlaceApiKeyQueryVariables>(
    GetGooglePlaceApiKeyDocument
  );
  return useInfiniteQuery<GetGooglePlaceApiKeyQuery, TError, TData>(
    ['GetGooglePlaceApiKey.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetGooglePlaceApiKeyQuery.getKey = (variables: GetGooglePlaceApiKeyQueryVariables) => [
  'GetGooglePlaceApiKey.infinite',
  variables,
];
export const MinSupportVersionDocument = `
    query MinSupportVersion {
  minSupportVersion {
    benefits {
      minSupportAppVersion
    }
  }
}
    `;
export const useMinSupportVersionQuery = <TData = MinSupportVersionQuery, TError = unknown>(
  variables?: MinSupportVersionQueryVariables,
  options?: UseQueryOptions<MinSupportVersionQuery, TError, TData>
) =>
  useQuery<MinSupportVersionQuery, TError, TData>(
    variables === undefined ? ['MinSupportVersion'] : ['MinSupportVersion', variables],
    useFetchData<MinSupportVersionQuery, MinSupportVersionQueryVariables>(MinSupportVersionDocument).bind(
      null,
      variables
    ),
    options
  );

useMinSupportVersionQuery.getKey = (variables?: MinSupportVersionQueryVariables) =>
  variables === undefined ? ['MinSupportVersion'] : ['MinSupportVersion', variables];
export const useInfiniteMinSupportVersionQuery = <TData = MinSupportVersionQuery, TError = unknown>(
  variables?: MinSupportVersionQueryVariables,
  options?: UseInfiniteQueryOptions<MinSupportVersionQuery, TError, TData>
) => {
  const query = useFetchData<MinSupportVersionQuery, MinSupportVersionQueryVariables>(MinSupportVersionDocument);
  return useInfiniteQuery<MinSupportVersionQuery, TError, TData>(
    variables === undefined ? ['MinSupportVersion.infinite'] : ['MinSupportVersion.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteMinSupportVersionQuery.getKey = (variables?: MinSupportVersionQueryVariables) =>
  variables === undefined ? ['MinSupportVersion.infinite'] : ['MinSupportVersion.infinite', variables];
export const CurrentUserDocument = `
    query CurrentUser {
  currentUser {
    id
    email
    eWalletSetupStatus
    eWalletStatusReason
    residentialAddress {
      region
      country
      addressLine1
      unitNumber
      streetNumber
      streetName
      streetType
      postcode
      townOrCity
      addressLine2
      addressLine3
    }
    mailingAddress {
      region
      country
      addressLine1
      addressLine2
      addressLine3
      postcode
      townOrCity
    }
    phoneNumber {
      countryCode
      number
    }
    firstName
    lastName
    middleName
    dateOfBirth
    preferredName
    gender
  }
}
    `;
export const useCurrentUserQuery = <TData = CurrentUserQuery, TError = unknown>(
  variables?: CurrentUserQueryVariables,
  options?: UseQueryOptions<CurrentUserQuery, TError, TData>
) =>
  useQuery<CurrentUserQuery, TError, TData>(
    variables === undefined ? ['CurrentUser'] : ['CurrentUser', variables],
    useFetchData<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument).bind(null, variables),
    options
  );

useCurrentUserQuery.getKey = (variables?: CurrentUserQueryVariables) =>
  variables === undefined ? ['CurrentUser'] : ['CurrentUser', variables];
export const useInfiniteCurrentUserQuery = <TData = CurrentUserQuery, TError = unknown>(
  variables?: CurrentUserQueryVariables,
  options?: UseInfiniteQueryOptions<CurrentUserQuery, TError, TData>
) => {
  const query = useFetchData<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument);
  return useInfiniteQuery<CurrentUserQuery, TError, TData>(
    variables === undefined ? ['CurrentUser.infinite'] : ['CurrentUser.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteCurrentUserQuery.getKey = (variables?: CurrentUserQueryVariables) =>
  variables === undefined ? ['CurrentUser.infinite'] : ['CurrentUser.infinite', variables];
export const ProfileDocument = `
    query Profile($ehToken: String!, $orgId: String) {
  profile(ehToken: $ehToken, orgId: $orgId) {
    userId
    userUuid
    avatarUrl
    firstName
    lastName
    email
    phoneNumber
    countryCode
    stateCode
  }
}
    `;
export const useProfileQuery = <TData = ProfileQuery, TError = unknown>(
  variables: ProfileQueryVariables,
  options?: UseQueryOptions<ProfileQuery, TError, TData>
) =>
  useQuery<ProfileQuery, TError, TData>(
    ['Profile', variables],
    useFetchData<ProfileQuery, ProfileQueryVariables>(ProfileDocument).bind(null, variables),
    options
  );

useProfileQuery.getKey = (variables: ProfileQueryVariables) => ['Profile', variables];
export const useInfiniteProfileQuery = <TData = ProfileQuery, TError = unknown>(
  variables: ProfileQueryVariables,
  options?: UseInfiniteQueryOptions<ProfileQuery, TError, TData>
) => {
  const query = useFetchData<ProfileQuery, ProfileQueryVariables>(ProfileDocument);
  return useInfiniteQuery<ProfileQuery, TError, TData>(
    ['Profile.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteProfileQuery.getKey = (variables: ProfileQueryVariables) => ['Profile.infinite', variables];
export const UserPermissionDocument = `
    query UserPermission($permissionRequest: UserPermissionRequestInput) {
  userPermission(permissionRequest: $permissionRequest) {
    name
    enabled
  }
}
    `;
export const useUserPermissionQuery = <TData = UserPermissionQuery, TError = unknown>(
  variables?: UserPermissionQueryVariables,
  options?: UseQueryOptions<UserPermissionQuery, TError, TData>
) =>
  useQuery<UserPermissionQuery, TError, TData>(
    variables === undefined ? ['UserPermission'] : ['UserPermission', variables],
    useFetchData<UserPermissionQuery, UserPermissionQueryVariables>(UserPermissionDocument).bind(null, variables),
    options
  );

useUserPermissionQuery.getKey = (variables?: UserPermissionQueryVariables) =>
  variables === undefined ? ['UserPermission'] : ['UserPermission', variables];
export const useInfiniteUserPermissionQuery = <TData = UserPermissionQuery, TError = unknown>(
  variables?: UserPermissionQueryVariables,
  options?: UseInfiniteQueryOptions<UserPermissionQuery, TError, TData>
) => {
  const query = useFetchData<UserPermissionQuery, UserPermissionQueryVariables>(UserPermissionDocument);
  return useInfiniteQuery<UserPermissionQuery, TError, TData>(
    variables === undefined ? ['UserPermission.infinite'] : ['UserPermission.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteUserPermissionQuery.getKey = (variables?: UserPermissionQueryVariables) =>
  variables === undefined ? ['UserPermission.infinite'] : ['UserPermission.infinite', variables];
export const ProfileChangeRequestDocument = `
    query ProfileChangeRequest {
  profileChangeRequest {
    type
    name {
      firstName
      lastName
      middleName
    }
    dateOfBirth
    createdAt
  }
}
    `;
export const useProfileChangeRequestQuery = <TData = ProfileChangeRequestQuery, TError = unknown>(
  variables?: ProfileChangeRequestQueryVariables,
  options?: UseQueryOptions<ProfileChangeRequestQuery, TError, TData>
) =>
  useQuery<ProfileChangeRequestQuery, TError, TData>(
    variables === undefined ? ['ProfileChangeRequest'] : ['ProfileChangeRequest', variables],
    useFetchData<ProfileChangeRequestQuery, ProfileChangeRequestQueryVariables>(ProfileChangeRequestDocument).bind(
      null,
      variables
    ),
    options
  );

useProfileChangeRequestQuery.getKey = (variables?: ProfileChangeRequestQueryVariables) =>
  variables === undefined ? ['ProfileChangeRequest'] : ['ProfileChangeRequest', variables];
export const useInfiniteProfileChangeRequestQuery = <TData = ProfileChangeRequestQuery, TError = unknown>(
  variables?: ProfileChangeRequestQueryVariables,
  options?: UseInfiniteQueryOptions<ProfileChangeRequestQuery, TError, TData>
) => {
  const query = useFetchData<ProfileChangeRequestQuery, ProfileChangeRequestQueryVariables>(
    ProfileChangeRequestDocument
  );
  return useInfiniteQuery<ProfileChangeRequestQuery, TError, TData>(
    variables === undefined ? ['ProfileChangeRequest.infinite'] : ['ProfileChangeRequest.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteProfileChangeRequestQuery.getKey = (variables?: ProfileChangeRequestQueryVariables) =>
  variables === undefined ? ['ProfileChangeRequest.infinite'] : ['ProfileChangeRequest.infinite', variables];
export const GetSpendAccountCarouselFinishedDocument = `
    query GetSpendAccountCarouselFinished {
  getSpendAccountCarouselFinished {
    value
  }
}
    `;
export const useGetSpendAccountCarouselFinishedQuery = <TData = GetSpendAccountCarouselFinishedQuery, TError = unknown>(
  variables?: GetSpendAccountCarouselFinishedQueryVariables,
  options?: UseQueryOptions<GetSpendAccountCarouselFinishedQuery, TError, TData>
) =>
  useQuery<GetSpendAccountCarouselFinishedQuery, TError, TData>(
    variables === undefined ? ['GetSpendAccountCarouselFinished'] : ['GetSpendAccountCarouselFinished', variables],
    useFetchData<GetSpendAccountCarouselFinishedQuery, GetSpendAccountCarouselFinishedQueryVariables>(
      GetSpendAccountCarouselFinishedDocument
    ).bind(null, variables),
    options
  );

useGetSpendAccountCarouselFinishedQuery.getKey = (variables?: GetSpendAccountCarouselFinishedQueryVariables) =>
  variables === undefined ? ['GetSpendAccountCarouselFinished'] : ['GetSpendAccountCarouselFinished', variables];
export const useInfiniteGetSpendAccountCarouselFinishedQuery = <
  TData = GetSpendAccountCarouselFinishedQuery,
  TError = unknown
>(
  variables?: GetSpendAccountCarouselFinishedQueryVariables,
  options?: UseInfiniteQueryOptions<GetSpendAccountCarouselFinishedQuery, TError, TData>
) => {
  const query = useFetchData<GetSpendAccountCarouselFinishedQuery, GetSpendAccountCarouselFinishedQueryVariables>(
    GetSpendAccountCarouselFinishedDocument
  );
  return useInfiniteQuery<GetSpendAccountCarouselFinishedQuery, TError, TData>(
    variables === undefined
      ? ['GetSpendAccountCarouselFinished.infinite']
      : ['GetSpendAccountCarouselFinished.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetSpendAccountCarouselFinishedQuery.getKey = (variables?: GetSpendAccountCarouselFinishedQueryVariables) =>
  variables === undefined
    ? ['GetSpendAccountCarouselFinished.infinite']
    : ['GetSpendAccountCarouselFinished.infinite', variables];
export const GetEhUserInitializationDetailsDocument = `
    query GetEHUserInitializationDetails($orgId: String, $ehToken: String!) {
  getEHUserInitializationDetails(orgId: $orgId, ehToken: $ehToken) {
    firstName
    lastName
    middleName
    address {
      region
      country
      addressLine1
      addressLine2
      addressLine3
      postcode
      townOrCity
    }
    dateOfBirth
    phoneNumber {
      countryCode
      number
    }
  }
}
    `;
export const useGetEhUserInitializationDetailsQuery = <TData = GetEhUserInitializationDetailsQuery, TError = unknown>(
  variables: GetEhUserInitializationDetailsQueryVariables,
  options?: UseQueryOptions<GetEhUserInitializationDetailsQuery, TError, TData>
) =>
  useQuery<GetEhUserInitializationDetailsQuery, TError, TData>(
    ['GetEHUserInitializationDetails', variables],
    useFetchData<GetEhUserInitializationDetailsQuery, GetEhUserInitializationDetailsQueryVariables>(
      GetEhUserInitializationDetailsDocument
    ).bind(null, variables),
    options
  );

useGetEhUserInitializationDetailsQuery.getKey = (variables: GetEhUserInitializationDetailsQueryVariables) => [
  'GetEHUserInitializationDetails',
  variables,
];
export const useInfiniteGetEhUserInitializationDetailsQuery = <
  TData = GetEhUserInitializationDetailsQuery,
  TError = unknown
>(
  variables: GetEhUserInitializationDetailsQueryVariables,
  options?: UseInfiniteQueryOptions<GetEhUserInitializationDetailsQuery, TError, TData>
) => {
  const query = useFetchData<GetEhUserInitializationDetailsQuery, GetEhUserInitializationDetailsQueryVariables>(
    GetEhUserInitializationDetailsDocument
  );
  return useInfiniteQuery<GetEhUserInitializationDetailsQuery, TError, TData>(
    ['GetEHUserInitializationDetails.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetEhUserInitializationDetailsQuery.getKey = (variables: GetEhUserInitializationDetailsQueryVariables) => [
  'GetEHUserInitializationDetails.infinite',
  variables,
];
export const GetKpUserInitializationDetailsDocument = `
    query GetKPUserInitializationDetails($kpToken: String!) {
  getKPUserInitializationDetails(kpToken: $kpToken) {
    firstName
    lastName
    middleName
    address {
      region
      country
      addressLine1
      addressLine2
      addressLine3
      postcode
      townOrCity
    }
    dateOfBirth
    phoneNumber {
      countryCode
      number
    }
  }
}
    `;
export const useGetKpUserInitializationDetailsQuery = <TData = GetKpUserInitializationDetailsQuery, TError = unknown>(
  variables: GetKpUserInitializationDetailsQueryVariables,
  options?: UseQueryOptions<GetKpUserInitializationDetailsQuery, TError, TData>
) =>
  useQuery<GetKpUserInitializationDetailsQuery, TError, TData>(
    ['GetKPUserInitializationDetails', variables],
    useFetchData<GetKpUserInitializationDetailsQuery, GetKpUserInitializationDetailsQueryVariables>(
      GetKpUserInitializationDetailsDocument
    ).bind(null, variables),
    options
  );

useGetKpUserInitializationDetailsQuery.getKey = (variables: GetKpUserInitializationDetailsQueryVariables) => [
  'GetKPUserInitializationDetails',
  variables,
];
export const useInfiniteGetKpUserInitializationDetailsQuery = <
  TData = GetKpUserInitializationDetailsQuery,
  TError = unknown
>(
  variables: GetKpUserInitializationDetailsQueryVariables,
  options?: UseInfiniteQueryOptions<GetKpUserInitializationDetailsQuery, TError, TData>
) => {
  const query = useFetchData<GetKpUserInitializationDetailsQuery, GetKpUserInitializationDetailsQueryVariables>(
    GetKpUserInitializationDetailsDocument
  );
  return useInfiniteQuery<GetKpUserInitializationDetailsQuery, TError, TData>(
    ['GetKPUserInitializationDetails.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetKpUserInitializationDetailsQuery.getKey = (variables: GetKpUserInitializationDetailsQueryVariables) => [
  'GetKPUserInitializationDetails.infinite',
  variables,
];
export const AllocationsDocument = `
    query Allocations($ehToken: String!) {
  allocations(ehToken: $ehToken) {
    membership {
      orgId
      memberId
      orgUUID
      orgName
      xeroConnected
      isIndependentContractor
    }
    allocation {
      bankSplitType
      bankAccounts {
        accountName
        accountNumber
        bsb
        amount
      }
    }
  }
}
    `;
export const useAllocationsQuery = <TData = AllocationsQuery, TError = unknown>(
  variables: AllocationsQueryVariables,
  options?: UseQueryOptions<AllocationsQuery, TError, TData>
) =>
  useQuery<AllocationsQuery, TError, TData>(
    ['Allocations', variables],
    useFetchData<AllocationsQuery, AllocationsQueryVariables>(AllocationsDocument).bind(null, variables),
    options
  );

useAllocationsQuery.getKey = (variables: AllocationsQueryVariables) => ['Allocations', variables];
export const useInfiniteAllocationsQuery = <TData = AllocationsQuery, TError = unknown>(
  variables: AllocationsQueryVariables,
  options?: UseInfiniteQueryOptions<AllocationsQuery, TError, TData>
) => {
  const query = useFetchData<AllocationsQuery, AllocationsQueryVariables>(AllocationsDocument);
  return useInfiniteQuery<AllocationsQuery, TError, TData>(
    ['Allocations.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteAllocationsQuery.getKey = (variables: AllocationsQueryVariables) => ['Allocations.infinite', variables];
export const BankAccountDocument = `
    query BankAccount($ehToken: String!, $membership: EhMembershipInput!) {
  bankAccount(ehToken: $ehToken, membership: $membership) {
    id
    accountName
    accountNumber
    bsb
    external_id
  }
}
    `;
export const useBankAccountQuery = <TData = BankAccountQuery, TError = unknown>(
  variables: BankAccountQueryVariables,
  options?: UseQueryOptions<BankAccountQuery, TError, TData>
) =>
  useQuery<BankAccountQuery, TError, TData>(
    ['BankAccount', variables],
    useFetchData<BankAccountQuery, BankAccountQueryVariables>(BankAccountDocument).bind(null, variables),
    options
  );

useBankAccountQuery.getKey = (variables: BankAccountQueryVariables) => ['BankAccount', variables];
export const useInfiniteBankAccountQuery = <TData = BankAccountQuery, TError = unknown>(
  variables: BankAccountQueryVariables,
  options?: UseInfiniteQueryOptions<BankAccountQuery, TError, TData>
) => {
  const query = useFetchData<BankAccountQuery, BankAccountQueryVariables>(BankAccountDocument);
  return useInfiniteQuery<BankAccountQuery, TError, TData>(
    ['BankAccount.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteBankAccountQuery.getKey = (variables: BankAccountQueryVariables) => ['BankAccount.infinite', variables];
export const GetPayAccountDocument = `
    query GetPayAccount($ehToken: String!, $orgId: String!, $memberId: String!) {
  getPayAccount(ehToken: $ehToken, orgId: $orgId, memberId: $memberId) {
    bankSplitType
    bankAccounts {
      accountName
      accountNumber
      bsb
      amount
    }
  }
}
    `;
export const useGetPayAccountQuery = <TData = GetPayAccountQuery, TError = unknown>(
  variables: GetPayAccountQueryVariables,
  options?: UseQueryOptions<GetPayAccountQuery, TError, TData>
) =>
  useQuery<GetPayAccountQuery, TError, TData>(
    ['GetPayAccount', variables],
    useFetchData<GetPayAccountQuery, GetPayAccountQueryVariables>(GetPayAccountDocument).bind(null, variables),
    options
  );

useGetPayAccountQuery.getKey = (variables: GetPayAccountQueryVariables) => ['GetPayAccount', variables];
export const useInfiniteGetPayAccountQuery = <TData = GetPayAccountQuery, TError = unknown>(
  variables: GetPayAccountQueryVariables,
  options?: UseInfiniteQueryOptions<GetPayAccountQuery, TError, TData>
) => {
  const query = useFetchData<GetPayAccountQuery, GetPayAccountQueryVariables>(GetPayAccountDocument);
  return useInfiniteQuery<GetPayAccountQuery, TError, TData>(
    ['GetPayAccount.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetPayAccountQuery.getKey = (variables: GetPayAccountQueryVariables) => [
  'GetPayAccount.infinite',
  variables,
];
export const InstapayBankAccountsDocument = `
    query InstapayBankAccounts($ehToken: String!, $membership: EhMembershipInput!) {
  instapayBankAccounts(ehToken: $ehToken, membership: $membership) {
    accountName
    accountNumber
    bsb
    fee
    external_id
  }
}
    `;
export const useInstapayBankAccountsQuery = <TData = InstapayBankAccountsQuery, TError = unknown>(
  variables: InstapayBankAccountsQueryVariables,
  options?: UseQueryOptions<InstapayBankAccountsQuery, TError, TData>
) =>
  useQuery<InstapayBankAccountsQuery, TError, TData>(
    ['InstapayBankAccounts', variables],
    useFetchData<InstapayBankAccountsQuery, InstapayBankAccountsQueryVariables>(InstapayBankAccountsDocument).bind(
      null,
      variables
    ),
    options
  );

useInstapayBankAccountsQuery.getKey = (variables: InstapayBankAccountsQueryVariables) => [
  'InstapayBankAccounts',
  variables,
];
export const useInfiniteInstapayBankAccountsQuery = <TData = InstapayBankAccountsQuery, TError = unknown>(
  variables: InstapayBankAccountsQueryVariables,
  options?: UseInfiniteQueryOptions<InstapayBankAccountsQuery, TError, TData>
) => {
  const query = useFetchData<InstapayBankAccountsQuery, InstapayBankAccountsQueryVariables>(
    InstapayBankAccountsDocument
  );
  return useInfiniteQuery<InstapayBankAccountsQuery, TError, TData>(
    ['InstapayBankAccounts.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteInstapayBankAccountsQuery.getKey = (variables: InstapayBankAccountsQueryVariables) => [
  'InstapayBankAccounts.infinite',
  variables,
];
export const InstapayFeeDocument = `
    query InstapayFee($bsb: String) {
  instapayFee(bsb: $bsb) {
    fee
  }
}
    `;
export const useInstapayFeeQuery = <TData = InstapayFeeQuery, TError = unknown>(
  variables?: InstapayFeeQueryVariables,
  options?: UseQueryOptions<InstapayFeeQuery, TError, TData>
) =>
  useQuery<InstapayFeeQuery, TError, TData>(
    variables === undefined ? ['InstapayFee'] : ['InstapayFee', variables],
    useFetchData<InstapayFeeQuery, InstapayFeeQueryVariables>(InstapayFeeDocument).bind(null, variables),
    options
  );

useInstapayFeeQuery.getKey = (variables?: InstapayFeeQueryVariables) =>
  variables === undefined ? ['InstapayFee'] : ['InstapayFee', variables];
export const useInfiniteInstapayFeeQuery = <TData = InstapayFeeQuery, TError = unknown>(
  variables?: InstapayFeeQueryVariables,
  options?: UseInfiniteQueryOptions<InstapayFeeQuery, TError, TData>
) => {
  const query = useFetchData<InstapayFeeQuery, InstapayFeeQueryVariables>(InstapayFeeDocument);
  return useInfiniteQuery<InstapayFeeQuery, TError, TData>(
    variables === undefined ? ['InstapayFee.infinite'] : ['InstapayFee.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteInstapayFeeQuery.getKey = (variables?: InstapayFeeQueryVariables) =>
  variables === undefined ? ['InstapayFee.infinite'] : ['InstapayFee.infinite', variables];
export const InstapayHistoryDocument = `
    query InstapayHistory($ehToken: String!) {
  instapayHistory(ehToken: $ehToken) {
    membership {
      orgId
      memberId
      orgUUID
      orgName
      xeroConnected
      isIndependentContractor
    }
    id
    amount
    adminFee
    feeType
    status
    abaRef
    createdAt
  }
}
    `;
export const useInstapayHistoryQuery = <TData = InstapayHistoryQuery, TError = unknown>(
  variables: InstapayHistoryQueryVariables,
  options?: UseQueryOptions<InstapayHistoryQuery, TError, TData>
) =>
  useQuery<InstapayHistoryQuery, TError, TData>(
    ['InstapayHistory', variables],
    useFetchData<InstapayHistoryQuery, InstapayHistoryQueryVariables>(InstapayHistoryDocument).bind(null, variables),
    options
  );

useInstapayHistoryQuery.getKey = (variables: InstapayHistoryQueryVariables) => ['InstapayHistory', variables];
export const useInfiniteInstapayHistoryQuery = <TData = InstapayHistoryQuery, TError = unknown>(
  variables: InstapayHistoryQueryVariables,
  options?: UseInfiniteQueryOptions<InstapayHistoryQuery, TError, TData>
) => {
  const query = useFetchData<InstapayHistoryQuery, InstapayHistoryQueryVariables>(InstapayHistoryDocument);
  return useInfiniteQuery<InstapayHistoryQuery, TError, TData>(
    ['InstapayHistory.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteInstapayHistoryQuery.getKey = (variables: InstapayHistoryQueryVariables) => [
  'InstapayHistory.infinite',
  variables,
];
export const InstapayHistoryV2Document = `
    query InstapayHistoryV2($ehToken: String!) {
  instapayHistoryV2(ehToken: $ehToken) {
    membership {
      orgId
      memberId
      orgUUID
      orgName
      xeroConnected
      isIndependentContractor
    }
    id
    amount
    adminFee
    feeType
    status
    abaRef
    createdAt
  }
}
    `;
export const useInstapayHistoryV2Query = <TData = InstapayHistoryV2Query, TError = unknown>(
  variables: InstapayHistoryV2QueryVariables,
  options?: UseQueryOptions<InstapayHistoryV2Query, TError, TData>
) =>
  useQuery<InstapayHistoryV2Query, TError, TData>(
    ['InstapayHistoryV2', variables],
    useFetchData<InstapayHistoryV2Query, InstapayHistoryV2QueryVariables>(InstapayHistoryV2Document).bind(
      null,
      variables
    ),
    options
  );

useInstapayHistoryV2Query.getKey = (variables: InstapayHistoryV2QueryVariables) => ['InstapayHistoryV2', variables];
export const useInfiniteInstapayHistoryV2Query = <TData = InstapayHistoryV2Query, TError = unknown>(
  variables: InstapayHistoryV2QueryVariables,
  options?: UseInfiniteQueryOptions<InstapayHistoryV2Query, TError, TData>
) => {
  const query = useFetchData<InstapayHistoryV2Query, InstapayHistoryV2QueryVariables>(InstapayHistoryV2Document);
  return useInfiniteQuery<InstapayHistoryV2Query, TError, TData>(
    ['InstapayHistoryV2.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteInstapayHistoryV2Query.getKey = (variables: InstapayHistoryV2QueryVariables) => [
  'InstapayHistoryV2.infinite',
  variables,
];
export const InstapayInfoDocument = `
    query InstapayInfo($ehToken: String!) {
  instapayInfo(ehToken: $ehToken) {
    membership {
      orgId
      memberId
      orgUUID
      orgName
      xeroConnected
      isIndependentContractor
    }
    payRate {
      displayName
      value
      unit
    }
    payPeriodCompletedDays
    payPeriodDays
    deduction {
      displayName
      value
      unit
    }
    leaveDays
    available
  }
}
    `;
export const useInstapayInfoQuery = <TData = InstapayInfoQuery, TError = unknown>(
  variables: InstapayInfoQueryVariables,
  options?: UseQueryOptions<InstapayInfoQuery, TError, TData>
) =>
  useQuery<InstapayInfoQuery, TError, TData>(
    ['InstapayInfo', variables],
    useFetchData<InstapayInfoQuery, InstapayInfoQueryVariables>(InstapayInfoDocument).bind(null, variables),
    options
  );

useInstapayInfoQuery.getKey = (variables: InstapayInfoQueryVariables) => ['InstapayInfo', variables];
export const useInfiniteInstapayInfoQuery = <TData = InstapayInfoQuery, TError = unknown>(
  variables: InstapayInfoQueryVariables,
  options?: UseInfiniteQueryOptions<InstapayInfoQuery, TError, TData>
) => {
  const query = useFetchData<InstapayInfoQuery, InstapayInfoQueryVariables>(InstapayInfoDocument);
  return useInfiniteQuery<InstapayInfoQuery, TError, TData>(
    ['InstapayInfo.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteInstapayInfoQuery.getKey = (variables: InstapayInfoQueryVariables) => ['InstapayInfo.infinite', variables];
export const InstapayUsageVerificationDocument = `
    query InstapayUsageVerification($ehToken: String!) {
  instapayUsageVerification(ehToken: $ehToken) {
    memberNotUsedInstapay
  }
}
    `;
export const useInstapayUsageVerificationQuery = <TData = InstapayUsageVerificationQuery, TError = unknown>(
  variables: InstapayUsageVerificationQueryVariables,
  options?: UseQueryOptions<InstapayUsageVerificationQuery, TError, TData>
) =>
  useQuery<InstapayUsageVerificationQuery, TError, TData>(
    ['InstapayUsageVerification', variables],
    useFetchData<InstapayUsageVerificationQuery, InstapayUsageVerificationQueryVariables>(
      InstapayUsageVerificationDocument
    ).bind(null, variables),
    options
  );

useInstapayUsageVerificationQuery.getKey = (variables: InstapayUsageVerificationQueryVariables) => [
  'InstapayUsageVerification',
  variables,
];
export const useInfiniteInstapayUsageVerificationQuery = <TData = InstapayUsageVerificationQuery, TError = unknown>(
  variables: InstapayUsageVerificationQueryVariables,
  options?: UseInfiniteQueryOptions<InstapayUsageVerificationQuery, TError, TData>
) => {
  const query = useFetchData<InstapayUsageVerificationQuery, InstapayUsageVerificationQueryVariables>(
    InstapayUsageVerificationDocument
  );
  return useInfiniteQuery<InstapayUsageVerificationQuery, TError, TData>(
    ['InstapayUsageVerification.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteInstapayUsageVerificationQuery.getKey = (variables: InstapayUsageVerificationQueryVariables) => [
  'InstapayUsageVerification.infinite',
  variables,
];
export const MembershipsDocument = `
    query Memberships($ehToken: String!) {
  memberships(ehToken: $ehToken) {
    orgId
    memberId
    orgUUID
    orgName
    xeroConnected
    isIndependentContractor
  }
}
    `;
export const useMembershipsQuery = <TData = MembershipsQuery, TError = unknown>(
  variables: MembershipsQueryVariables,
  options?: UseQueryOptions<MembershipsQuery, TError, TData>
) =>
  useQuery<MembershipsQuery, TError, TData>(
    ['Memberships', variables],
    useFetchData<MembershipsQuery, MembershipsQueryVariables>(MembershipsDocument).bind(null, variables),
    options
  );

useMembershipsQuery.getKey = (variables: MembershipsQueryVariables) => ['Memberships', variables];
export const useInfiniteMembershipsQuery = <TData = MembershipsQuery, TError = unknown>(
  variables: MembershipsQueryVariables,
  options?: UseInfiniteQueryOptions<MembershipsQuery, TError, TData>
) => {
  const query = useFetchData<MembershipsQuery, MembershipsQueryVariables>(MembershipsDocument);
  return useInfiniteQuery<MembershipsQuery, TError, TData>(
    ['Memberships.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteMembershipsQuery.getKey = (variables: MembershipsQueryVariables) => ['Memberships.infinite', variables];
export const DiscountShopProductDetailDocument = `
    query DiscountShopProductDetail($ehToken: String!, $orgId: String!, $productCode: String!) {
  discountShopProductDetail(
    ehToken: $ehToken
    orgId: $orgId
    productCode: $productCode
  ) {
    type
    id
    name
    title
    price
    discountPrice
    productCode
    image {
      url
      small {
        url
      }
      product {
        url
      }
      large {
        url
      }
    }
    storefrontImage {
      url
      small {
        url
      }
      product {
        url
      }
      large {
        url
      }
    }
    giftpayBalance
    productType
    description
    termsAndConditions
    email
    howItWorks
    logo {
      url
      small {
        url
      }
      product {
        url
      }
      large {
        url
      }
    }
    usage
    participant
    disabled
    supplierId
    productCategoryId
    transactionFee
    instapayFee
    heroDollarsFee
    serviceFee
    supplier {
      id
      name
      description
      email
      phoneNumber
      website
    }
    productVariants {
      id
      variantCode
      price
      amount
      stockAvailable
      numberInStock
      imageUrl
      discountPrice
      freightPrice
      status
      label
      cardId
      position
      priceInPoints
      discountPriceInPoints
      description
    }
    country
    currency
    priceInPoints
    discountPriceInPoints
  }
}
    `;
export const useDiscountShopProductDetailQuery = <TData = DiscountShopProductDetailQuery, TError = unknown>(
  variables: DiscountShopProductDetailQueryVariables,
  options?: UseQueryOptions<DiscountShopProductDetailQuery, TError, TData>
) =>
  useQuery<DiscountShopProductDetailQuery, TError, TData>(
    ['DiscountShopProductDetail', variables],
    useFetchData<DiscountShopProductDetailQuery, DiscountShopProductDetailQueryVariables>(
      DiscountShopProductDetailDocument
    ).bind(null, variables),
    options
  );

useDiscountShopProductDetailQuery.getKey = (variables: DiscountShopProductDetailQueryVariables) => [
  'DiscountShopProductDetail',
  variables,
];
export const useInfiniteDiscountShopProductDetailQuery = <TData = DiscountShopProductDetailQuery, TError = unknown>(
  variables: DiscountShopProductDetailQueryVariables,
  options?: UseInfiniteQueryOptions<DiscountShopProductDetailQuery, TError, TData>
) => {
  const query = useFetchData<DiscountShopProductDetailQuery, DiscountShopProductDetailQueryVariables>(
    DiscountShopProductDetailDocument
  );
  return useInfiniteQuery<DiscountShopProductDetailQuery, TError, TData>(
    ['DiscountShopProductDetail.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteDiscountShopProductDetailQuery.getKey = (variables: DiscountShopProductDetailQueryVariables) => [
  'DiscountShopProductDetail.infinite',
  variables,
];
export const DiscountShopProductsDocument = `
    query DiscountShopProducts($ehToken: String!, $orgId: String!, $pageIndex: Int, $itemPerPage: Int) {
  discountShopProducts(
    ehToken: $ehToken
    orgId: $orgId
    pageIndex: $pageIndex
    itemPerPage: $itemPerPage
  ) {
    sort
    itemPerPage
    pageIndex
    totalPages
    totalItems
    sortDir
    items {
      type
      id
      name
      title
      price
      discountPrice
      serviceFee
      productCode
      image {
        url
        small {
          url
        }
        product {
          url
        }
        large {
          url
        }
      }
      storefrontImage {
        url
        small {
          url
        }
        product {
          url
        }
        large {
          url
        }
      }
      giftpayBalance
      productType
      description
      termsAndConditions
      country
      currency
      priceInPoints
      discountPriceInPoints
    }
  }
}
    `;
export const useDiscountShopProductsQuery = <TData = DiscountShopProductsQuery, TError = unknown>(
  variables: DiscountShopProductsQueryVariables,
  options?: UseQueryOptions<DiscountShopProductsQuery, TError, TData>
) =>
  useQuery<DiscountShopProductsQuery, TError, TData>(
    ['DiscountShopProducts', variables],
    useFetchData<DiscountShopProductsQuery, DiscountShopProductsQueryVariables>(DiscountShopProductsDocument).bind(
      null,
      variables
    ),
    options
  );

useDiscountShopProductsQuery.getKey = (variables: DiscountShopProductsQueryVariables) => [
  'DiscountShopProducts',
  variables,
];
export const useInfiniteDiscountShopProductsQuery = <TData = DiscountShopProductsQuery, TError = unknown>(
  variables: DiscountShopProductsQueryVariables,
  options?: UseInfiniteQueryOptions<DiscountShopProductsQuery, TError, TData>
) => {
  const query = useFetchData<DiscountShopProductsQuery, DiscountShopProductsQueryVariables>(
    DiscountShopProductsDocument
  );
  return useInfiniteQuery<DiscountShopProductsQuery, TError, TData>(
    ['DiscountShopProducts.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteDiscountShopProductsQuery.getKey = (variables: DiscountShopProductsQueryVariables) => [
  'DiscountShopProducts.infinite',
  variables,
];
export const DiscountOrderHistoryDocument = `
    query DiscountOrderHistory($ehToken: String!, $orgId: String!, $pageIndex: Int, $itemPerPage: Int) {
  discountOrderHistory(
    ehToken: $ehToken
    orgId: $orgId
    pageIndex: $pageIndex
    itemPerPage: $itemPerPage
  ) {
    itemPerPage
    pageIndex
    totalItems
    totalPages
    items {
      id
      name
      memberId
      status
      createdAt
      billableAmount
      transactionFee
      freightCost
      orderDetails {
        id
        discount
        quantity
        price
        billableAmount
        transactionFee
        status
        freightCost
        currency
        purchaseItems {
          id
          data {
            issuedAt
            pinNumber
            cardNumber
            serialNumber
            activationUrl
            orderDetailId
            expiredAt
            giftCode
            uberGiftCode
            barCode
            promoCode
          }
          purchaseId
          productVariantId
          fulfil {
            id
            isUsed
            balance
          }
        }
        productVariant {
          variantCode
          price
          imageUrl
          discountPrice
          amount
          product {
            id
            code
            name
            title
            imageUrl
            logoUrl
            email
            description
            howItWorks
            productType
          }
        }
        priceInPoints
        discountPriceInPoints
      }
    }
  }
}
    `;
export const useDiscountOrderHistoryQuery = <TData = DiscountOrderHistoryQuery, TError = unknown>(
  variables: DiscountOrderHistoryQueryVariables,
  options?: UseQueryOptions<DiscountOrderHistoryQuery, TError, TData>
) =>
  useQuery<DiscountOrderHistoryQuery, TError, TData>(
    ['DiscountOrderHistory', variables],
    useFetchData<DiscountOrderHistoryQuery, DiscountOrderHistoryQueryVariables>(DiscountOrderHistoryDocument).bind(
      null,
      variables
    ),
    options
  );

useDiscountOrderHistoryQuery.getKey = (variables: DiscountOrderHistoryQueryVariables) => [
  'DiscountOrderHistory',
  variables,
];
export const useInfiniteDiscountOrderHistoryQuery = <TData = DiscountOrderHistoryQuery, TError = unknown>(
  variables: DiscountOrderHistoryQueryVariables,
  options?: UseInfiniteQueryOptions<DiscountOrderHistoryQuery, TError, TData>
) => {
  const query = useFetchData<DiscountOrderHistoryQuery, DiscountOrderHistoryQueryVariables>(
    DiscountOrderHistoryDocument
  );
  return useInfiniteQuery<DiscountOrderHistoryQuery, TError, TData>(
    ['DiscountOrderHistory.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteDiscountOrderHistoryQuery.getKey = (variables: DiscountOrderHistoryQueryVariables) => [
  'DiscountOrderHistory.infinite',
  variables,
];
export const DiscountOrderDetailDocument = `
    query DiscountOrderDetail($ehToken: String!, $orgId: String!, $orderId: String!) {
  discountOrderDetail(ehToken: $ehToken, orgId: $orgId, orderId: $orderId) {
    id
    discount
    quantity
    price
    billableAmount
    transactionFee
    status
    freightCost
    currency
    purchaseItems {
      id
      data {
        issuedAt
        pinNumber
        cardNumber
        serialNumber
        activationUrl
        orderDetailId
        expiredAt
        giftCode
        uberGiftCode
        barCode
        promoCode
      }
      purchaseId
      productVariantId
      fulfil {
        id
        isUsed
        balance
      }
    }
    productVariant {
      variantCode
      price
      imageUrl
      discountPrice
      amount
      product {
        id
        code
        name
        title
        imageUrl
        logoUrl
        email
        description
        howItWorks
        productType
      }
    }
    priceInPoints
    discountPriceInPoints
  }
}
    `;
export const useDiscountOrderDetailQuery = <TData = DiscountOrderDetailQuery, TError = unknown>(
  variables: DiscountOrderDetailQueryVariables,
  options?: UseQueryOptions<DiscountOrderDetailQuery, TError, TData>
) =>
  useQuery<DiscountOrderDetailQuery, TError, TData>(
    ['DiscountOrderDetail', variables],
    useFetchData<DiscountOrderDetailQuery, DiscountOrderDetailQueryVariables>(DiscountOrderDetailDocument).bind(
      null,
      variables
    ),
    options
  );

useDiscountOrderDetailQuery.getKey = (variables: DiscountOrderDetailQueryVariables) => [
  'DiscountOrderDetail',
  variables,
];
export const useInfiniteDiscountOrderDetailQuery = <TData = DiscountOrderDetailQuery, TError = unknown>(
  variables: DiscountOrderDetailQueryVariables,
  options?: UseInfiniteQueryOptions<DiscountOrderDetailQuery, TError, TData>
) => {
  const query = useFetchData<DiscountOrderDetailQuery, DiscountOrderDetailQueryVariables>(DiscountOrderDetailDocument);
  return useInfiniteQuery<DiscountOrderDetailQuery, TError, TData>(
    ['DiscountOrderDetail.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteDiscountOrderDetailQuery.getKey = (variables: DiscountOrderDetailQueryVariables) => [
  'DiscountOrderDetail.infinite',
  variables,
];
export const PaymentClientTokenDocument = `
    query PaymentClientToken($ehToken: String!, $orgId: String!) {
  paymentClientToken(ehToken: $ehToken, orgId: $orgId) {
    clientToken
  }
}
    `;
export const usePaymentClientTokenQuery = <TData = PaymentClientTokenQuery, TError = unknown>(
  variables: PaymentClientTokenQueryVariables,
  options?: UseQueryOptions<PaymentClientTokenQuery, TError, TData>
) =>
  useQuery<PaymentClientTokenQuery, TError, TData>(
    ['PaymentClientToken', variables],
    useFetchData<PaymentClientTokenQuery, PaymentClientTokenQueryVariables>(PaymentClientTokenDocument).bind(
      null,
      variables
    ),
    options
  );

usePaymentClientTokenQuery.getKey = (variables: PaymentClientTokenQueryVariables) => ['PaymentClientToken', variables];
export const useInfinitePaymentClientTokenQuery = <TData = PaymentClientTokenQuery, TError = unknown>(
  variables: PaymentClientTokenQueryVariables,
  options?: UseInfiniteQueryOptions<PaymentClientTokenQuery, TError, TData>
) => {
  const query = useFetchData<PaymentClientTokenQuery, PaymentClientTokenQueryVariables>(PaymentClientTokenDocument);
  return useInfiniteQuery<PaymentClientTokenQuery, TError, TData>(
    ['PaymentClientToken.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfinitePaymentClientTokenQuery.getKey = (variables: PaymentClientTokenQueryVariables) => [
  'PaymentClientToken.infinite',
  variables,
];
export const PaymentVerifyCreditCardDocument = `
    query PaymentVerifyCreditCard($ehToken: String!, $orgId: String!, $nonce: String!) {
  paymentVerifyCreditCard(ehToken: $ehToken, orgId: $orgId, nonce: $nonce) {
    message
  }
}
    `;
export const usePaymentVerifyCreditCardQuery = <TData = PaymentVerifyCreditCardQuery, TError = unknown>(
  variables: PaymentVerifyCreditCardQueryVariables,
  options?: UseQueryOptions<PaymentVerifyCreditCardQuery, TError, TData>
) =>
  useQuery<PaymentVerifyCreditCardQuery, TError, TData>(
    ['PaymentVerifyCreditCard', variables],
    useFetchData<PaymentVerifyCreditCardQuery, PaymentVerifyCreditCardQueryVariables>(
      PaymentVerifyCreditCardDocument
    ).bind(null, variables),
    options
  );

usePaymentVerifyCreditCardQuery.getKey = (variables: PaymentVerifyCreditCardQueryVariables) => [
  'PaymentVerifyCreditCard',
  variables,
];
export const useInfinitePaymentVerifyCreditCardQuery = <TData = PaymentVerifyCreditCardQuery, TError = unknown>(
  variables: PaymentVerifyCreditCardQueryVariables,
  options?: UseInfiniteQueryOptions<PaymentVerifyCreditCardQuery, TError, TData>
) => {
  const query = useFetchData<PaymentVerifyCreditCardQuery, PaymentVerifyCreditCardQueryVariables>(
    PaymentVerifyCreditCardDocument
  );
  return useInfiniteQuery<PaymentVerifyCreditCardQuery, TError, TData>(
    ['PaymentVerifyCreditCard.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfinitePaymentVerifyCreditCardQuery.getKey = (variables: PaymentVerifyCreditCardQueryVariables) => [
  'PaymentVerifyCreditCard.infinite',
  variables,
];
export const PickForYouDocument = `
    query PickForYou($ehToken: String!, $orgId: String!) {
  pickForYou(ehToken: $ehToken, orgId: $orgId) {
    items {
      type
      id
      name
      title
      price
      discountPrice
      serviceFee
      productCode
      image {
        url
        small {
          url
        }
        product {
          url
        }
        large {
          url
        }
      }
      storefrontImage {
        url
        small {
          url
        }
        product {
          url
        }
        large {
          url
        }
      }
      giftpayBalance
      productType
      description
      termsAndConditions
      country
      currency
      priceInPoints
      discountPriceInPoints
    }
  }
}
    `;
export const usePickForYouQuery = <TData = PickForYouQuery, TError = unknown>(
  variables: PickForYouQueryVariables,
  options?: UseQueryOptions<PickForYouQuery, TError, TData>
) =>
  useQuery<PickForYouQuery, TError, TData>(
    ['PickForYou', variables],
    useFetchData<PickForYouQuery, PickForYouQueryVariables>(PickForYouDocument).bind(null, variables),
    options
  );

usePickForYouQuery.getKey = (variables: PickForYouQueryVariables) => ['PickForYou', variables];
export const useInfinitePickForYouQuery = <TData = PickForYouQuery, TError = unknown>(
  variables: PickForYouQueryVariables,
  options?: UseInfiniteQueryOptions<PickForYouQuery, TError, TData>
) => {
  const query = useFetchData<PickForYouQuery, PickForYouQueryVariables>(PickForYouDocument);
  return useInfiniteQuery<PickForYouQuery, TError, TData>(
    ['PickForYou.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfinitePickForYouQuery.getKey = (variables: PickForYouQueryVariables) => ['PickForYou.infinite', variables];
export const PopularGiftCardsDocument = `
    query PopularGiftCards($ehToken: String!, $orgId: String!) {
  popularGiftCards(ehToken: $ehToken, orgId: $orgId) {
    type
    id
    name
    title
    price
    discountPrice
    serviceFee
    productCode
    image {
      url
      small {
        url
      }
      product {
        url
      }
      large {
        url
      }
    }
    storefrontImage {
      url
      small {
        url
      }
      product {
        url
      }
      large {
        url
      }
    }
    giftpayBalance
    productType
    description
    termsAndConditions
    country
    currency
    priceInPoints
    discountPriceInPoints
  }
}
    `;
export const usePopularGiftCardsQuery = <TData = PopularGiftCardsQuery, TError = unknown>(
  variables: PopularGiftCardsQueryVariables,
  options?: UseQueryOptions<PopularGiftCardsQuery, TError, TData>
) =>
  useQuery<PopularGiftCardsQuery, TError, TData>(
    ['PopularGiftCards', variables],
    useFetchData<PopularGiftCardsQuery, PopularGiftCardsQueryVariables>(PopularGiftCardsDocument).bind(null, variables),
    options
  );

usePopularGiftCardsQuery.getKey = (variables: PopularGiftCardsQueryVariables) => ['PopularGiftCards', variables];
export const useInfinitePopularGiftCardsQuery = <TData = PopularGiftCardsQuery, TError = unknown>(
  variables: PopularGiftCardsQueryVariables,
  options?: UseInfiniteQueryOptions<PopularGiftCardsQuery, TError, TData>
) => {
  const query = useFetchData<PopularGiftCardsQuery, PopularGiftCardsQueryVariables>(PopularGiftCardsDocument);
  return useInfiniteQuery<PopularGiftCardsQuery, TError, TData>(
    ['PopularGiftCards.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfinitePopularGiftCardsQuery.getKey = (variables: PopularGiftCardsQueryVariables) => [
  'PopularGiftCards.infinite',
  variables,
];
export const BuyAgainGiftCardsDocument = `
    query BuyAgainGiftCards($ehToken: String!, $orgId: String!) {
  buyAgainGiftCards(ehToken: $ehToken, orgId: $orgId) {
    type
    id
    name
    title
    price
    discountPrice
    serviceFee
    productCode
    image {
      url
      small {
        url
      }
      product {
        url
      }
      large {
        url
      }
    }
    storefrontImage {
      url
      small {
        url
      }
      product {
        url
      }
      large {
        url
      }
    }
    giftpayBalance
    productType
    description
    termsAndConditions
    country
    currency
    priceInPoints
    discountPriceInPoints
  }
}
    `;
export const useBuyAgainGiftCardsQuery = <TData = BuyAgainGiftCardsQuery, TError = unknown>(
  variables: BuyAgainGiftCardsQueryVariables,
  options?: UseQueryOptions<BuyAgainGiftCardsQuery, TError, TData>
) =>
  useQuery<BuyAgainGiftCardsQuery, TError, TData>(
    ['BuyAgainGiftCards', variables],
    useFetchData<BuyAgainGiftCardsQuery, BuyAgainGiftCardsQueryVariables>(BuyAgainGiftCardsDocument).bind(
      null,
      variables
    ),
    options
  );

useBuyAgainGiftCardsQuery.getKey = (variables: BuyAgainGiftCardsQueryVariables) => ['BuyAgainGiftCards', variables];
export const useInfiniteBuyAgainGiftCardsQuery = <TData = BuyAgainGiftCardsQuery, TError = unknown>(
  variables: BuyAgainGiftCardsQueryVariables,
  options?: UseInfiniteQueryOptions<BuyAgainGiftCardsQuery, TError, TData>
) => {
  const query = useFetchData<BuyAgainGiftCardsQuery, BuyAgainGiftCardsQueryVariables>(BuyAgainGiftCardsDocument);
  return useInfiniteQuery<BuyAgainGiftCardsQuery, TError, TData>(
    ['BuyAgainGiftCards.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteBuyAgainGiftCardsQuery.getKey = (variables: BuyAgainGiftCardsQueryVariables) => [
  'BuyAgainGiftCards.infinite',
  variables,
];
export const StripePublishableKeyDocument = `
    query StripePublishableKey($ehToken: String!, $currency: String!) {
  stripePublishableKey(ehToken: $ehToken, currency: $currency) {
    publishableKey
  }
}
    `;
export const useStripePublishableKeyQuery = <TData = StripePublishableKeyQuery, TError = unknown>(
  variables: StripePublishableKeyQueryVariables,
  options?: UseQueryOptions<StripePublishableKeyQuery, TError, TData>
) =>
  useQuery<StripePublishableKeyQuery, TError, TData>(
    ['StripePublishableKey', variables],
    useFetchData<StripePublishableKeyQuery, StripePublishableKeyQueryVariables>(StripePublishableKeyDocument).bind(
      null,
      variables
    ),
    options
  );

useStripePublishableKeyQuery.getKey = (variables: StripePublishableKeyQueryVariables) => [
  'StripePublishableKey',
  variables,
];
export const useInfiniteStripePublishableKeyQuery = <TData = StripePublishableKeyQuery, TError = unknown>(
  variables: StripePublishableKeyQueryVariables,
  options?: UseInfiniteQueryOptions<StripePublishableKeyQuery, TError, TData>
) => {
  const query = useFetchData<StripePublishableKeyQuery, StripePublishableKeyQueryVariables>(
    StripePublishableKeyDocument
  );
  return useInfiniteQuery<StripePublishableKeyQuery, TError, TData>(
    ['StripePublishableKey.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteStripePublishableKeyQuery.getKey = (variables: StripePublishableKeyQueryVariables) => [
  'StripePublishableKey.infinite',
  variables,
];
export const OnlineOffersDocument = `
    query OnlineOffers($pageIndex: Int, $itemPerPage: Int, $categoryId: String, $searchTerm: String) {
  onlineOffers(
    pageIndex: $pageIndex
    itemPerPage: $itemPerPage
    categoryId: $categoryId
    searchTerm: $searchTerm
  ) {
    itemPerPage
    pageIndex
    totalItems
    totalPages
    items {
      id
      type
      title
      category
      categoryId
      imageUrl
      description
      termsAndConditions
      howItWorks
      logo
      trackingUrl
      supplierName
      supplierAboutUs
      isFavourite
      cashback
      searchTag
      isCardLinkedOffer
    }
  }
}
    `;
export const useOnlineOffersQuery = <TData = OnlineOffersQuery, TError = unknown>(
  variables?: OnlineOffersQueryVariables,
  options?: UseQueryOptions<OnlineOffersQuery, TError, TData>
) =>
  useQuery<OnlineOffersQuery, TError, TData>(
    variables === undefined ? ['OnlineOffers'] : ['OnlineOffers', variables],
    useFetchData<OnlineOffersQuery, OnlineOffersQueryVariables>(OnlineOffersDocument).bind(null, variables),
    options
  );

useOnlineOffersQuery.getKey = (variables?: OnlineOffersQueryVariables) =>
  variables === undefined ? ['OnlineOffers'] : ['OnlineOffers', variables];
export const useInfiniteOnlineOffersQuery = <TData = OnlineOffersQuery, TError = unknown>(
  variables?: OnlineOffersQueryVariables,
  options?: UseInfiniteQueryOptions<OnlineOffersQuery, TError, TData>
) => {
  const query = useFetchData<OnlineOffersQuery, OnlineOffersQueryVariables>(OnlineOffersDocument);
  return useInfiniteQuery<OnlineOffersQuery, TError, TData>(
    variables === undefined ? ['OnlineOffers.infinite'] : ['OnlineOffers.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteOnlineOffersQuery.getKey = (variables?: OnlineOffersQueryVariables) =>
  variables === undefined ? ['OnlineOffers.infinite'] : ['OnlineOffers.infinite', variables];
export const OnlineOfferDetailDocument = `
    query OnlineOfferDetail($offerId: String!) {
  onlineOfferDetail(offerId: $offerId) {
    id
    type
    title
    category
    categoryId
    imageUrl
    description
    termsAndConditions
    howItWorks
    logo
    trackingUrl
    supplierName
    supplierAboutUs
    isFavourite
    cashback
    searchTag
    isCardLinkedOffer
  }
}
    `;
export const useOnlineOfferDetailQuery = <TData = OnlineOfferDetailQuery, TError = unknown>(
  variables: OnlineOfferDetailQueryVariables,
  options?: UseQueryOptions<OnlineOfferDetailQuery, TError, TData>
) =>
  useQuery<OnlineOfferDetailQuery, TError, TData>(
    ['OnlineOfferDetail', variables],
    useFetchData<OnlineOfferDetailQuery, OnlineOfferDetailQueryVariables>(OnlineOfferDetailDocument).bind(
      null,
      variables
    ),
    options
  );

useOnlineOfferDetailQuery.getKey = (variables: OnlineOfferDetailQueryVariables) => ['OnlineOfferDetail', variables];
export const useInfiniteOnlineOfferDetailQuery = <TData = OnlineOfferDetailQuery, TError = unknown>(
  variables: OnlineOfferDetailQueryVariables,
  options?: UseInfiniteQueryOptions<OnlineOfferDetailQuery, TError, TData>
) => {
  const query = useFetchData<OnlineOfferDetailQuery, OnlineOfferDetailQueryVariables>(OnlineOfferDetailDocument);
  return useInfiniteQuery<OnlineOfferDetailQuery, TError, TData>(
    ['OnlineOfferDetail.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteOnlineOfferDetailQuery.getKey = (variables: OnlineOfferDetailQueryVariables) => [
  'OnlineOfferDetail.infinite',
  variables,
];
export const CashbackFeaturedOnlineOffersDocument = `
    query CashbackFeaturedOnlineOffers {
  cashbackFeaturedOnlineOffers {
    id
    type
    title
    category
    categoryId
    imageUrl
    description
    termsAndConditions
    howItWorks
    logo
    trackingUrl
    supplierName
    supplierAboutUs
    isFavourite
    cashback
    searchTag
    isCardLinkedOffer
  }
}
    `;
export const useCashbackFeaturedOnlineOffersQuery = <TData = CashbackFeaturedOnlineOffersQuery, TError = unknown>(
  variables?: CashbackFeaturedOnlineOffersQueryVariables,
  options?: UseQueryOptions<CashbackFeaturedOnlineOffersQuery, TError, TData>
) =>
  useQuery<CashbackFeaturedOnlineOffersQuery, TError, TData>(
    variables === undefined ? ['CashbackFeaturedOnlineOffers'] : ['CashbackFeaturedOnlineOffers', variables],
    useFetchData<CashbackFeaturedOnlineOffersQuery, CashbackFeaturedOnlineOffersQueryVariables>(
      CashbackFeaturedOnlineOffersDocument
    ).bind(null, variables),
    options
  );

useCashbackFeaturedOnlineOffersQuery.getKey = (variables?: CashbackFeaturedOnlineOffersQueryVariables) =>
  variables === undefined ? ['CashbackFeaturedOnlineOffers'] : ['CashbackFeaturedOnlineOffers', variables];
export const useInfiniteCashbackFeaturedOnlineOffersQuery = <
  TData = CashbackFeaturedOnlineOffersQuery,
  TError = unknown
>(
  variables?: CashbackFeaturedOnlineOffersQueryVariables,
  options?: UseInfiniteQueryOptions<CashbackFeaturedOnlineOffersQuery, TError, TData>
) => {
  const query = useFetchData<CashbackFeaturedOnlineOffersQuery, CashbackFeaturedOnlineOffersQueryVariables>(
    CashbackFeaturedOnlineOffersDocument
  );
  return useInfiniteQuery<CashbackFeaturedOnlineOffersQuery, TError, TData>(
    variables === undefined
      ? ['CashbackFeaturedOnlineOffers.infinite']
      : ['CashbackFeaturedOnlineOffers.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteCashbackFeaturedOnlineOffersQuery.getKey = (variables?: CashbackFeaturedOnlineOffersQueryVariables) =>
  variables === undefined
    ? ['CashbackFeaturedOnlineOffers.infinite']
    : ['CashbackFeaturedOnlineOffers.infinite', variables];
export const CashbackCategoriesDocument = `
    query CashbackCategories {
  cashbackCategories {
    id
    name
    image
  }
}
    `;
export const useCashbackCategoriesQuery = <TData = CashbackCategoriesQuery, TError = unknown>(
  variables?: CashbackCategoriesQueryVariables,
  options?: UseQueryOptions<CashbackCategoriesQuery, TError, TData>
) =>
  useQuery<CashbackCategoriesQuery, TError, TData>(
    variables === undefined ? ['CashbackCategories'] : ['CashbackCategories', variables],
    useFetchData<CashbackCategoriesQuery, CashbackCategoriesQueryVariables>(CashbackCategoriesDocument).bind(
      null,
      variables
    ),
    options
  );

useCashbackCategoriesQuery.getKey = (variables?: CashbackCategoriesQueryVariables) =>
  variables === undefined ? ['CashbackCategories'] : ['CashbackCategories', variables];
export const useInfiniteCashbackCategoriesQuery = <TData = CashbackCategoriesQuery, TError = unknown>(
  variables?: CashbackCategoriesQueryVariables,
  options?: UseInfiniteQueryOptions<CashbackCategoriesQuery, TError, TData>
) => {
  const query = useFetchData<CashbackCategoriesQuery, CashbackCategoriesQueryVariables>(CashbackCategoriesDocument);
  return useInfiniteQuery<CashbackCategoriesQuery, TError, TData>(
    variables === undefined ? ['CashbackCategories.infinite'] : ['CashbackCategories.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteCashbackCategoriesQuery.getKey = (variables?: CashbackCategoriesQueryVariables) =>
  variables === undefined ? ['CashbackCategories.infinite'] : ['CashbackCategories.infinite', variables];
export const CashbackIntroductionContentDocument = `
    query CashbackIntroductionContent {
  cashbackIntroductionContent {
    step1 {
      heading
      verbiage
    }
    step2 {
      heading
      verbiage
    }
    step3 {
      heading
      verbiage
    }
  }
}
    `;
export const useCashbackIntroductionContentQuery = <TData = CashbackIntroductionContentQuery, TError = unknown>(
  variables?: CashbackIntroductionContentQueryVariables,
  options?: UseQueryOptions<CashbackIntroductionContentQuery, TError, TData>
) =>
  useQuery<CashbackIntroductionContentQuery, TError, TData>(
    variables === undefined ? ['CashbackIntroductionContent'] : ['CashbackIntroductionContent', variables],
    useFetchData<CashbackIntroductionContentQuery, CashbackIntroductionContentQueryVariables>(
      CashbackIntroductionContentDocument
    ).bind(null, variables),
    options
  );

useCashbackIntroductionContentQuery.getKey = (variables?: CashbackIntroductionContentQueryVariables) =>
  variables === undefined ? ['CashbackIntroductionContent'] : ['CashbackIntroductionContent', variables];
export const useInfiniteCashbackIntroductionContentQuery = <TData = CashbackIntroductionContentQuery, TError = unknown>(
  variables?: CashbackIntroductionContentQueryVariables,
  options?: UseInfiniteQueryOptions<CashbackIntroductionContentQuery, TError, TData>
) => {
  const query = useFetchData<CashbackIntroductionContentQuery, CashbackIntroductionContentQueryVariables>(
    CashbackIntroductionContentDocument
  );
  return useInfiniteQuery<CashbackIntroductionContentQuery, TError, TData>(
    variables === undefined
      ? ['CashbackIntroductionContent.infinite']
      : ['CashbackIntroductionContent.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteCashbackIntroductionContentQuery.getKey = (variables?: CashbackIntroductionContentQueryVariables) =>
  variables === undefined
    ? ['CashbackIntroductionContent.infinite']
    : ['CashbackIntroductionContent.infinite', variables];
export const CashbackTermsAndConditionsDocument = `
    query CashbackTermsAndConditions {
  cashbackTermsAndConditions {
    text
    textVariant
    type
    boldText
    boldTextVariant
    showListItemSymbol
    url
  }
}
    `;
export const useCashbackTermsAndConditionsQuery = <TData = CashbackTermsAndConditionsQuery, TError = unknown>(
  variables?: CashbackTermsAndConditionsQueryVariables,
  options?: UseQueryOptions<CashbackTermsAndConditionsQuery, TError, TData>
) =>
  useQuery<CashbackTermsAndConditionsQuery, TError, TData>(
    variables === undefined ? ['CashbackTermsAndConditions'] : ['CashbackTermsAndConditions', variables],
    useFetchData<CashbackTermsAndConditionsQuery, CashbackTermsAndConditionsQueryVariables>(
      CashbackTermsAndConditionsDocument
    ).bind(null, variables),
    options
  );

useCashbackTermsAndConditionsQuery.getKey = (variables?: CashbackTermsAndConditionsQueryVariables) =>
  variables === undefined ? ['CashbackTermsAndConditions'] : ['CashbackTermsAndConditions', variables];
export const useInfiniteCashbackTermsAndConditionsQuery = <TData = CashbackTermsAndConditionsQuery, TError = unknown>(
  variables?: CashbackTermsAndConditionsQueryVariables,
  options?: UseInfiniteQueryOptions<CashbackTermsAndConditionsQuery, TError, TData>
) => {
  const query = useFetchData<CashbackTermsAndConditionsQuery, CashbackTermsAndConditionsQueryVariables>(
    CashbackTermsAndConditionsDocument
  );
  return useInfiniteQuery<CashbackTermsAndConditionsQuery, TError, TData>(
    variables === undefined
      ? ['CashbackTermsAndConditions.infinite']
      : ['CashbackTermsAndConditions.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteCashbackTermsAndConditionsQuery.getKey = (variables?: CashbackTermsAndConditionsQueryVariables) =>
  variables === undefined
    ? ['CashbackTermsAndConditions.infinite']
    : ['CashbackTermsAndConditions.infinite', variables];
export const CashbackTermsAndConditionsAcceptanceDocument = `
    query CashbackTermsAndConditionsAcceptance {
  cashbackTermsAndConditionsAcceptance {
    isAccepted
  }
}
    `;
export const useCashbackTermsAndConditionsAcceptanceQuery = <
  TData = CashbackTermsAndConditionsAcceptanceQuery,
  TError = unknown
>(
  variables?: CashbackTermsAndConditionsAcceptanceQueryVariables,
  options?: UseQueryOptions<CashbackTermsAndConditionsAcceptanceQuery, TError, TData>
) =>
  useQuery<CashbackTermsAndConditionsAcceptanceQuery, TError, TData>(
    variables === undefined
      ? ['CashbackTermsAndConditionsAcceptance']
      : ['CashbackTermsAndConditionsAcceptance', variables],
    useFetchData<CashbackTermsAndConditionsAcceptanceQuery, CashbackTermsAndConditionsAcceptanceQueryVariables>(
      CashbackTermsAndConditionsAcceptanceDocument
    ).bind(null, variables),
    options
  );

useCashbackTermsAndConditionsAcceptanceQuery.getKey = (
  variables?: CashbackTermsAndConditionsAcceptanceQueryVariables
) =>
  variables === undefined
    ? ['CashbackTermsAndConditionsAcceptance']
    : ['CashbackTermsAndConditionsAcceptance', variables];
export const useInfiniteCashbackTermsAndConditionsAcceptanceQuery = <
  TData = CashbackTermsAndConditionsAcceptanceQuery,
  TError = unknown
>(
  variables?: CashbackTermsAndConditionsAcceptanceQueryVariables,
  options?: UseInfiniteQueryOptions<CashbackTermsAndConditionsAcceptanceQuery, TError, TData>
) => {
  const query = useFetchData<
    CashbackTermsAndConditionsAcceptanceQuery,
    CashbackTermsAndConditionsAcceptanceQueryVariables
  >(CashbackTermsAndConditionsAcceptanceDocument);
  return useInfiniteQuery<CashbackTermsAndConditionsAcceptanceQuery, TError, TData>(
    variables === undefined
      ? ['CashbackTermsAndConditionsAcceptance.infinite']
      : ['CashbackTermsAndConditionsAcceptance.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteCashbackTermsAndConditionsAcceptanceQuery.getKey = (
  variables?: CashbackTermsAndConditionsAcceptanceQueryVariables
) =>
  variables === undefined
    ? ['CashbackTermsAndConditionsAcceptance.infinite']
    : ['CashbackTermsAndConditionsAcceptance.infinite', variables];
export const CashbackBanksDocument = `
    query CashbackBanks {
  cashbackBanks {
    id
    name
    region
  }
}
    `;
export const useCashbackBanksQuery = <TData = CashbackBanksQuery, TError = unknown>(
  variables?: CashbackBanksQueryVariables,
  options?: UseQueryOptions<CashbackBanksQuery, TError, TData>
) =>
  useQuery<CashbackBanksQuery, TError, TData>(
    variables === undefined ? ['CashbackBanks'] : ['CashbackBanks', variables],
    useFetchData<CashbackBanksQuery, CashbackBanksQueryVariables>(CashbackBanksDocument).bind(null, variables),
    options
  );

useCashbackBanksQuery.getKey = (variables?: CashbackBanksQueryVariables) =>
  variables === undefined ? ['CashbackBanks'] : ['CashbackBanks', variables];
export const useInfiniteCashbackBanksQuery = <TData = CashbackBanksQuery, TError = unknown>(
  variables?: CashbackBanksQueryVariables,
  options?: UseInfiniteQueryOptions<CashbackBanksQuery, TError, TData>
) => {
  const query = useFetchData<CashbackBanksQuery, CashbackBanksQueryVariables>(CashbackBanksDocument);
  return useInfiniteQuery<CashbackBanksQuery, TError, TData>(
    variables === undefined ? ['CashbackBanks.infinite'] : ['CashbackBanks.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteCashbackBanksQuery.getKey = (variables?: CashbackBanksQueryVariables) =>
  variables === undefined ? ['CashbackBanks.infinite'] : ['CashbackBanks.infinite', variables];
export const CashbackLinkedCardsDocument = `
    query CashbackLinkedCards {
  cashbackLinkedCards {
    id
    description
    cardMasked
    issuer
    expiry
    provider
    isExpired
    lastFour
  }
}
    `;
export const useCashbackLinkedCardsQuery = <TData = CashbackLinkedCardsQuery, TError = unknown>(
  variables?: CashbackLinkedCardsQueryVariables,
  options?: UseQueryOptions<CashbackLinkedCardsQuery, TError, TData>
) =>
  useQuery<CashbackLinkedCardsQuery, TError, TData>(
    variables === undefined ? ['CashbackLinkedCards'] : ['CashbackLinkedCards', variables],
    useFetchData<CashbackLinkedCardsQuery, CashbackLinkedCardsQueryVariables>(CashbackLinkedCardsDocument).bind(
      null,
      variables
    ),
    options
  );

useCashbackLinkedCardsQuery.getKey = (variables?: CashbackLinkedCardsQueryVariables) =>
  variables === undefined ? ['CashbackLinkedCards'] : ['CashbackLinkedCards', variables];
export const useInfiniteCashbackLinkedCardsQuery = <TData = CashbackLinkedCardsQuery, TError = unknown>(
  variables?: CashbackLinkedCardsQueryVariables,
  options?: UseInfiniteQueryOptions<CashbackLinkedCardsQuery, TError, TData>
) => {
  const query = useFetchData<CashbackLinkedCardsQuery, CashbackLinkedCardsQueryVariables>(CashbackLinkedCardsDocument);
  return useInfiniteQuery<CashbackLinkedCardsQuery, TError, TData>(
    variables === undefined ? ['CashbackLinkedCards.infinite'] : ['CashbackLinkedCards.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteCashbackLinkedCardsQuery.getKey = (variables?: CashbackLinkedCardsQueryVariables) =>
  variables === undefined ? ['CashbackLinkedCards.infinite'] : ['CashbackLinkedCards.infinite', variables];
export const CashbackUserTokenDocument = `
    query CashbackUserToken {
  cashbackUserToken {
    key
    token
  }
}
    `;
export const useCashbackUserTokenQuery = <TData = CashbackUserTokenQuery, TError = unknown>(
  variables?: CashbackUserTokenQueryVariables,
  options?: UseQueryOptions<CashbackUserTokenQuery, TError, TData>
) =>
  useQuery<CashbackUserTokenQuery, TError, TData>(
    variables === undefined ? ['CashbackUserToken'] : ['CashbackUserToken', variables],
    useFetchData<CashbackUserTokenQuery, CashbackUserTokenQueryVariables>(CashbackUserTokenDocument).bind(
      null,
      variables
    ),
    options
  );

useCashbackUserTokenQuery.getKey = (variables?: CashbackUserTokenQueryVariables) =>
  variables === undefined ? ['CashbackUserToken'] : ['CashbackUserToken', variables];
export const useInfiniteCashbackUserTokenQuery = <TData = CashbackUserTokenQuery, TError = unknown>(
  variables?: CashbackUserTokenQueryVariables,
  options?: UseInfiniteQueryOptions<CashbackUserTokenQuery, TError, TData>
) => {
  const query = useFetchData<CashbackUserTokenQuery, CashbackUserTokenQueryVariables>(CashbackUserTokenDocument);
  return useInfiniteQuery<CashbackUserTokenQuery, TError, TData>(
    variables === undefined ? ['CashbackUserToken.infinite'] : ['CashbackUserToken.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteCashbackUserTokenQuery.getKey = (variables?: CashbackUserTokenQueryVariables) =>
  variables === undefined ? ['CashbackUserToken.infinite'] : ['CashbackUserToken.infinite', variables];
export const CashbackTransactionsDocument = `
    query CashbackTransactions {
  cashbackTransactions {
    total
    pending
    transactions {
      id
      offerId
      imageUrl
      amount
      created
      advertiserName
      description
      state
      recordType
      purchaseAmount
      meta {
        accountNumber
      }
    }
  }
}
    `;
export const useCashbackTransactionsQuery = <TData = CashbackTransactionsQuery, TError = unknown>(
  variables?: CashbackTransactionsQueryVariables,
  options?: UseQueryOptions<CashbackTransactionsQuery, TError, TData>
) =>
  useQuery<CashbackTransactionsQuery, TError, TData>(
    variables === undefined ? ['CashbackTransactions'] : ['CashbackTransactions', variables],
    useFetchData<CashbackTransactionsQuery, CashbackTransactionsQueryVariables>(CashbackTransactionsDocument).bind(
      null,
      variables
    ),
    options
  );

useCashbackTransactionsQuery.getKey = (variables?: CashbackTransactionsQueryVariables) =>
  variables === undefined ? ['CashbackTransactions'] : ['CashbackTransactions', variables];
export const useInfiniteCashbackTransactionsQuery = <TData = CashbackTransactionsQuery, TError = unknown>(
  variables?: CashbackTransactionsQueryVariables,
  options?: UseInfiniteQueryOptions<CashbackTransactionsQuery, TError, TData>
) => {
  const query = useFetchData<CashbackTransactionsQuery, CashbackTransactionsQueryVariables>(
    CashbackTransactionsDocument
  );
  return useInfiniteQuery<CashbackTransactionsQuery, TError, TData>(
    variables === undefined ? ['CashbackTransactions.infinite'] : ['CashbackTransactions.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteCashbackTransactionsQuery.getKey = (variables?: CashbackTransactionsQueryVariables) =>
  variables === undefined ? ['CashbackTransactions.infinite'] : ['CashbackTransactions.infinite', variables];
export const CashbackTransactionsV2Document = `
    query CashbackTransactionsV2 {
  cashbackTransactionsV2 {
    total
    pending
    confirmed
    transactions {
      id
      offerId
      imageUrl
      amount
      created
      advertiserName
      description
      state
      recordType
      purchaseAmount
      meta {
        accountNumber
      }
    }
  }
}
    `;
export const useCashbackTransactionsV2Query = <TData = CashbackTransactionsV2Query, TError = unknown>(
  variables?: CashbackTransactionsV2QueryVariables,
  options?: UseQueryOptions<CashbackTransactionsV2Query, TError, TData>
) =>
  useQuery<CashbackTransactionsV2Query, TError, TData>(
    variables === undefined ? ['CashbackTransactionsV2'] : ['CashbackTransactionsV2', variables],
    useFetchData<CashbackTransactionsV2Query, CashbackTransactionsV2QueryVariables>(
      CashbackTransactionsV2Document
    ).bind(null, variables),
    options
  );

useCashbackTransactionsV2Query.getKey = (variables?: CashbackTransactionsV2QueryVariables) =>
  variables === undefined ? ['CashbackTransactionsV2'] : ['CashbackTransactionsV2', variables];
export const useInfiniteCashbackTransactionsV2Query = <TData = CashbackTransactionsV2Query, TError = unknown>(
  variables?: CashbackTransactionsV2QueryVariables,
  options?: UseInfiniteQueryOptions<CashbackTransactionsV2Query, TError, TData>
) => {
  const query = useFetchData<CashbackTransactionsV2Query, CashbackTransactionsV2QueryVariables>(
    CashbackTransactionsV2Document
  );
  return useInfiniteQuery<CashbackTransactionsV2Query, TError, TData>(
    variables === undefined ? ['CashbackTransactionsV2.infinite'] : ['CashbackTransactionsV2.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteCashbackTransactionsV2Query.getKey = (variables?: CashbackTransactionsV2QueryVariables) =>
  variables === undefined ? ['CashbackTransactionsV2.infinite'] : ['CashbackTransactionsV2.infinite', variables];
export const CashbackOnboardStatusDocument = `
    query CashbackOnboardStatus {
  cashbackOnboardStatus {
    hasCLOOnboarded
  }
}
    `;
export const useCashbackOnboardStatusQuery = <TData = CashbackOnboardStatusQuery, TError = unknown>(
  variables?: CashbackOnboardStatusQueryVariables,
  options?: UseQueryOptions<CashbackOnboardStatusQuery, TError, TData>
) =>
  useQuery<CashbackOnboardStatusQuery, TError, TData>(
    variables === undefined ? ['CashbackOnboardStatus'] : ['CashbackOnboardStatus', variables],
    useFetchData<CashbackOnboardStatusQuery, CashbackOnboardStatusQueryVariables>(CashbackOnboardStatusDocument).bind(
      null,
      variables
    ),
    options
  );

useCashbackOnboardStatusQuery.getKey = (variables?: CashbackOnboardStatusQueryVariables) =>
  variables === undefined ? ['CashbackOnboardStatus'] : ['CashbackOnboardStatus', variables];
export const useInfiniteCashbackOnboardStatusQuery = <TData = CashbackOnboardStatusQuery, TError = unknown>(
  variables?: CashbackOnboardStatusQueryVariables,
  options?: UseInfiniteQueryOptions<CashbackOnboardStatusQuery, TError, TData>
) => {
  const query = useFetchData<CashbackOnboardStatusQuery, CashbackOnboardStatusQueryVariables>(
    CashbackOnboardStatusDocument
  );
  return useInfiniteQuery<CashbackOnboardStatusQuery, TError, TData>(
    variables === undefined ? ['CashbackOnboardStatus.infinite'] : ['CashbackOnboardStatus.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteCashbackOnboardStatusQuery.getKey = (variables?: CashbackOnboardStatusQueryVariables) =>
  variables === undefined ? ['CashbackOnboardStatus.infinite'] : ['CashbackOnboardStatus.infinite', variables];
export const CashbackEmploymentHeroProviderIdDocument = `
    query CashbackEmploymentHeroProviderId {
  cashbackEmploymentHeroProviderId
}
    `;
export const useCashbackEmploymentHeroProviderIdQuery = <
  TData = CashbackEmploymentHeroProviderIdQuery,
  TError = unknown
>(
  variables?: CashbackEmploymentHeroProviderIdQueryVariables,
  options?: UseQueryOptions<CashbackEmploymentHeroProviderIdQuery, TError, TData>
) =>
  useQuery<CashbackEmploymentHeroProviderIdQuery, TError, TData>(
    variables === undefined ? ['CashbackEmploymentHeroProviderId'] : ['CashbackEmploymentHeroProviderId', variables],
    useFetchData<CashbackEmploymentHeroProviderIdQuery, CashbackEmploymentHeroProviderIdQueryVariables>(
      CashbackEmploymentHeroProviderIdDocument
    ).bind(null, variables),
    options
  );

useCashbackEmploymentHeroProviderIdQuery.getKey = (variables?: CashbackEmploymentHeroProviderIdQueryVariables) =>
  variables === undefined ? ['CashbackEmploymentHeroProviderId'] : ['CashbackEmploymentHeroProviderId', variables];
export const useInfiniteCashbackEmploymentHeroProviderIdQuery = <
  TData = CashbackEmploymentHeroProviderIdQuery,
  TError = unknown
>(
  variables?: CashbackEmploymentHeroProviderIdQueryVariables,
  options?: UseInfiniteQueryOptions<CashbackEmploymentHeroProviderIdQuery, TError, TData>
) => {
  const query = useFetchData<CashbackEmploymentHeroProviderIdQuery, CashbackEmploymentHeroProviderIdQueryVariables>(
    CashbackEmploymentHeroProviderIdDocument
  );
  return useInfiniteQuery<CashbackEmploymentHeroProviderIdQuery, TError, TData>(
    variables === undefined
      ? ['CashbackEmploymentHeroProviderId.infinite']
      : ['CashbackEmploymentHeroProviderId.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteCashbackEmploymentHeroProviderIdQuery.getKey = (
  variables?: CashbackEmploymentHeroProviderIdQueryVariables
) =>
  variables === undefined
    ? ['CashbackEmploymentHeroProviderId.infinite']
    : ['CashbackEmploymentHeroProviderId.infinite', variables];
export const CashbackUserBankDocument = `
    query CashbackUserBank {
  cashbackUserBank {
    id
    bsb
    accountNumber
  }
}
    `;
export const useCashbackUserBankQuery = <TData = CashbackUserBankQuery, TError = unknown>(
  variables?: CashbackUserBankQueryVariables,
  options?: UseQueryOptions<CashbackUserBankQuery, TError, TData>
) =>
  useQuery<CashbackUserBankQuery, TError, TData>(
    variables === undefined ? ['CashbackUserBank'] : ['CashbackUserBank', variables],
    useFetchData<CashbackUserBankQuery, CashbackUserBankQueryVariables>(CashbackUserBankDocument).bind(null, variables),
    options
  );

useCashbackUserBankQuery.getKey = (variables?: CashbackUserBankQueryVariables) =>
  variables === undefined ? ['CashbackUserBank'] : ['CashbackUserBank', variables];
export const useInfiniteCashbackUserBankQuery = <TData = CashbackUserBankQuery, TError = unknown>(
  variables?: CashbackUserBankQueryVariables,
  options?: UseInfiniteQueryOptions<CashbackUserBankQuery, TError, TData>
) => {
  const query = useFetchData<CashbackUserBankQuery, CashbackUserBankQueryVariables>(CashbackUserBankDocument);
  return useInfiniteQuery<CashbackUserBankQuery, TError, TData>(
    variables === undefined ? ['CashbackUserBank.infinite'] : ['CashbackUserBank.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteCashbackUserBankQuery.getKey = (variables?: CashbackUserBankQueryVariables) =>
  variables === undefined ? ['CashbackUserBank.infinite'] : ['CashbackUserBank.infinite', variables];
export const CashbackInStoreOffersDocument = `
    query CashbackInStoreOffers($pageIndex: Int, $itemPerPage: Int, $latitude: Float, $longitude: Float, $distance: Float, $searchTerm: String) {
  cashbackInStoreOffers(
    pageIndex: $pageIndex
    itemPerPage: $itemPerPage
    latitude: $latitude
    longitude: $longitude
    distance: $distance
    searchTerm: $searchTerm
  ) {
    itemPerPage
    pageIndex
    totalItems
    totalPages
    items {
      id
      title
      categoryId
      category
      advertiserId
      advertiserName
      advertiserAboutUs
      termsAndConditions
      description
      howItWorks
      website
      phoneNumber
      logo
      coverShotUrl
      ratingScore
      cashback
      locations {
        address
        latitude
        longitude
        id
        distance
        bearing
      }
      searchTag
    }
  }
}
    `;
export const useCashbackInStoreOffersQuery = <TData = CashbackInStoreOffersQuery, TError = unknown>(
  variables?: CashbackInStoreOffersQueryVariables,
  options?: UseQueryOptions<CashbackInStoreOffersQuery, TError, TData>
) =>
  useQuery<CashbackInStoreOffersQuery, TError, TData>(
    variables === undefined ? ['CashbackInStoreOffers'] : ['CashbackInStoreOffers', variables],
    useFetchData<CashbackInStoreOffersQuery, CashbackInStoreOffersQueryVariables>(CashbackInStoreOffersDocument).bind(
      null,
      variables
    ),
    options
  );

useCashbackInStoreOffersQuery.getKey = (variables?: CashbackInStoreOffersQueryVariables) =>
  variables === undefined ? ['CashbackInStoreOffers'] : ['CashbackInStoreOffers', variables];
export const useInfiniteCashbackInStoreOffersQuery = <TData = CashbackInStoreOffersQuery, TError = unknown>(
  variables?: CashbackInStoreOffersQueryVariables,
  options?: UseInfiniteQueryOptions<CashbackInStoreOffersQuery, TError, TData>
) => {
  const query = useFetchData<CashbackInStoreOffersQuery, CashbackInStoreOffersQueryVariables>(
    CashbackInStoreOffersDocument
  );
  return useInfiniteQuery<CashbackInStoreOffersQuery, TError, TData>(
    variables === undefined ? ['CashbackInStoreOffers.infinite'] : ['CashbackInStoreOffers.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteCashbackInStoreOffersQuery.getKey = (variables?: CashbackInStoreOffersQueryVariables) =>
  variables === undefined ? ['CashbackInStoreOffers.infinite'] : ['CashbackInStoreOffers.infinite', variables];
export const CashbackInStoreOfferDetailDocument = `
    query CashbackInStoreOfferDetail($offerId: String!) {
  cashbackInStoreOfferDetail(offerId: $offerId) {
    id
    title
    categoryId
    category
    advertiserId
    advertiserName
    advertiserAboutUs
    termsAndConditions
    description
    howItWorks
    website
    phoneNumber
    logo
    coverShotUrl
    ratingScore
    cashback
    locations {
      address
      latitude
      longitude
      id
      distance
      bearing
    }
    searchTag
  }
}
    `;
export const useCashbackInStoreOfferDetailQuery = <TData = CashbackInStoreOfferDetailQuery, TError = unknown>(
  variables: CashbackInStoreOfferDetailQueryVariables,
  options?: UseQueryOptions<CashbackInStoreOfferDetailQuery, TError, TData>
) =>
  useQuery<CashbackInStoreOfferDetailQuery, TError, TData>(
    ['CashbackInStoreOfferDetail', variables],
    useFetchData<CashbackInStoreOfferDetailQuery, CashbackInStoreOfferDetailQueryVariables>(
      CashbackInStoreOfferDetailDocument
    ).bind(null, variables),
    options
  );

useCashbackInStoreOfferDetailQuery.getKey = (variables: CashbackInStoreOfferDetailQueryVariables) => [
  'CashbackInStoreOfferDetail',
  variables,
];
export const useInfiniteCashbackInStoreOfferDetailQuery = <TData = CashbackInStoreOfferDetailQuery, TError = unknown>(
  variables: CashbackInStoreOfferDetailQueryVariables,
  options?: UseInfiniteQueryOptions<CashbackInStoreOfferDetailQuery, TError, TData>
) => {
  const query = useFetchData<CashbackInStoreOfferDetailQuery, CashbackInStoreOfferDetailQueryVariables>(
    CashbackInStoreOfferDetailDocument
  );
  return useInfiniteQuery<CashbackInStoreOfferDetailQuery, TError, TData>(
    ['CashbackInStoreOfferDetail.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteCashbackInStoreOfferDetailQuery.getKey = (variables: CashbackInStoreOfferDetailQueryVariables) => [
  'CashbackInStoreOfferDetail.infinite',
  variables,
];
export const EWalletDocument = `
    query EWallet {
  eWallet {
    accountName
    accountNumber
    bsb
    totalBalance
    availableBalance
  }
}
    `;
export const useEWalletQuery = <TData = EWalletQuery, TError = unknown>(
  variables?: EWalletQueryVariables,
  options?: UseQueryOptions<EWalletQuery, TError, TData>
) =>
  useQuery<EWalletQuery, TError, TData>(
    variables === undefined ? ['EWallet'] : ['EWallet', variables],
    useFetchData<EWalletQuery, EWalletQueryVariables>(EWalletDocument).bind(null, variables),
    options
  );

useEWalletQuery.getKey = (variables?: EWalletQueryVariables) =>
  variables === undefined ? ['EWallet'] : ['EWallet', variables];
export const useInfiniteEWalletQuery = <TData = EWalletQuery, TError = unknown>(
  variables?: EWalletQueryVariables,
  options?: UseInfiniteQueryOptions<EWalletQuery, TError, TData>
) => {
  const query = useFetchData<EWalletQuery, EWalletQueryVariables>(EWalletDocument);
  return useInfiniteQuery<EWalletQuery, TError, TData>(
    variables === undefined ? ['EWallet.infinite'] : ['EWallet.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteEWalletQuery.getKey = (variables?: EWalletQueryVariables) =>
  variables === undefined ? ['EWallet.infinite'] : ['EWallet.infinite', variables];
export const GetCardDetailsDocument = `
    query GetCardDetails($id: String!) {
  getCardDetails(id: $id) {
    id
    accountId
    status
    cardToken
    customerId
    expiryDate
    issuedDateTimeUtc
    lastFourDigits
    nameOnCard
  }
}
    `;
export const useGetCardDetailsQuery = <TData = GetCardDetailsQuery, TError = unknown>(
  variables: GetCardDetailsQueryVariables,
  options?: UseQueryOptions<GetCardDetailsQuery, TError, TData>
) =>
  useQuery<GetCardDetailsQuery, TError, TData>(
    ['GetCardDetails', variables],
    useFetchData<GetCardDetailsQuery, GetCardDetailsQueryVariables>(GetCardDetailsDocument).bind(null, variables),
    options
  );

useGetCardDetailsQuery.getKey = (variables: GetCardDetailsQueryVariables) => ['GetCardDetails', variables];
export const useInfiniteGetCardDetailsQuery = <TData = GetCardDetailsQuery, TError = unknown>(
  variables: GetCardDetailsQueryVariables,
  options?: UseInfiniteQueryOptions<GetCardDetailsQuery, TError, TData>
) => {
  const query = useFetchData<GetCardDetailsQuery, GetCardDetailsQueryVariables>(GetCardDetailsDocument);
  return useInfiniteQuery<GetCardDetailsQuery, TError, TData>(
    ['GetCardDetails.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetCardDetailsQuery.getKey = (variables: GetCardDetailsQueryVariables) => [
  'GetCardDetails.infinite',
  variables,
];
export const GetCurrentCardDetailsDocument = `
    query GetCurrentCardDetails {
  getCurrentCardDetails {
    id
    accountId
    status
    cardToken
    customerId
    expiryDate
    issuedDateTimeUtc
    lastFourDigits
    nameOnCard
  }
}
    `;
export const useGetCurrentCardDetailsQuery = <TData = GetCurrentCardDetailsQuery, TError = unknown>(
  variables?: GetCurrentCardDetailsQueryVariables,
  options?: UseQueryOptions<GetCurrentCardDetailsQuery, TError, TData>
) =>
  useQuery<GetCurrentCardDetailsQuery, TError, TData>(
    variables === undefined ? ['GetCurrentCardDetails'] : ['GetCurrentCardDetails', variables],
    useFetchData<GetCurrentCardDetailsQuery, GetCurrentCardDetailsQueryVariables>(GetCurrentCardDetailsDocument).bind(
      null,
      variables
    ),
    options
  );

useGetCurrentCardDetailsQuery.getKey = (variables?: GetCurrentCardDetailsQueryVariables) =>
  variables === undefined ? ['GetCurrentCardDetails'] : ['GetCurrentCardDetails', variables];
export const useInfiniteGetCurrentCardDetailsQuery = <TData = GetCurrentCardDetailsQuery, TError = unknown>(
  variables?: GetCurrentCardDetailsQueryVariables,
  options?: UseInfiniteQueryOptions<GetCurrentCardDetailsQuery, TError, TData>
) => {
  const query = useFetchData<GetCurrentCardDetailsQuery, GetCurrentCardDetailsQueryVariables>(
    GetCurrentCardDetailsDocument
  );
  return useInfiniteQuery<GetCurrentCardDetailsQuery, TError, TData>(
    variables === undefined ? ['GetCurrentCardDetails.infinite'] : ['GetCurrentCardDetails.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetCurrentCardDetailsQuery.getKey = (variables?: GetCurrentCardDetailsQueryVariables) =>
  variables === undefined ? ['GetCurrentCardDetails.infinite'] : ['GetCurrentCardDetails.infinite', variables];
export const GetCurrentCardMetaDocument = `
    query GetCurrentCardMeta {
  getCurrentCardMeta {
    contactless
    designReference
    digitalWalletDetails {
      primaryAccountIdentifier
      wallets {
        reference
        type
      }
    }
    frozen
    id
    lastFourDigits
    magStrip
    mobileWalletPaymentEnabled
    nameOnCard
    pinEnabled
    status
  }
}
    `;
export const useGetCurrentCardMetaQuery = <TData = GetCurrentCardMetaQuery, TError = unknown>(
  variables?: GetCurrentCardMetaQueryVariables,
  options?: UseQueryOptions<GetCurrentCardMetaQuery, TError, TData>
) =>
  useQuery<GetCurrentCardMetaQuery, TError, TData>(
    variables === undefined ? ['GetCurrentCardMeta'] : ['GetCurrentCardMeta', variables],
    useFetchData<GetCurrentCardMetaQuery, GetCurrentCardMetaQueryVariables>(GetCurrentCardMetaDocument).bind(
      null,
      variables
    ),
    options
  );

useGetCurrentCardMetaQuery.getKey = (variables?: GetCurrentCardMetaQueryVariables) =>
  variables === undefined ? ['GetCurrentCardMeta'] : ['GetCurrentCardMeta', variables];
export const useInfiniteGetCurrentCardMetaQuery = <TData = GetCurrentCardMetaQuery, TError = unknown>(
  variables?: GetCurrentCardMetaQueryVariables,
  options?: UseInfiniteQueryOptions<GetCurrentCardMetaQuery, TError, TData>
) => {
  const query = useFetchData<GetCurrentCardMetaQuery, GetCurrentCardMetaQueryVariables>(GetCurrentCardMetaDocument);
  return useInfiniteQuery<GetCurrentCardMetaQuery, TError, TData>(
    variables === undefined ? ['GetCurrentCardMeta.infinite'] : ['GetCurrentCardMeta.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetCurrentCardMetaQuery.getKey = (variables?: GetCurrentCardMetaQueryVariables) =>
  variables === undefined ? ['GetCurrentCardMeta.infinite'] : ['GetCurrentCardMeta.infinite', variables];
export const GetOemProvisioningDataDocument = `
    query GetOemProvisioningData($otp: String!) {
  getOemProvisioningData(otp: $otp) {
    cardHolderName
    cardToken
    expiryDate
    otp
  }
}
    `;
export const useGetOemProvisioningDataQuery = <TData = GetOemProvisioningDataQuery, TError = unknown>(
  variables: GetOemProvisioningDataQueryVariables,
  options?: UseQueryOptions<GetOemProvisioningDataQuery, TError, TData>
) =>
  useQuery<GetOemProvisioningDataQuery, TError, TData>(
    ['GetOemProvisioningData', variables],
    useFetchData<GetOemProvisioningDataQuery, GetOemProvisioningDataQueryVariables>(
      GetOemProvisioningDataDocument
    ).bind(null, variables),
    options
  );

useGetOemProvisioningDataQuery.getKey = (variables: GetOemProvisioningDataQueryVariables) => [
  'GetOemProvisioningData',
  variables,
];
export const useInfiniteGetOemProvisioningDataQuery = <TData = GetOemProvisioningDataQuery, TError = unknown>(
  variables: GetOemProvisioningDataQueryVariables,
  options?: UseInfiniteQueryOptions<GetOemProvisioningDataQuery, TError, TData>
) => {
  const query = useFetchData<GetOemProvisioningDataQuery, GetOemProvisioningDataQueryVariables>(
    GetOemProvisioningDataDocument
  );
  return useInfiniteQuery<GetOemProvisioningDataQuery, TError, TData>(
    ['GetOemProvisioningData.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetOemProvisioningDataQuery.getKey = (variables: GetOemProvisioningDataQueryVariables) => [
  'GetOemProvisioningData.infinite',
  variables,
];
export const GetOemProvisioningDataWithoutOtpDocument = `
    query GetOemProvisioningDataWithoutOTP {
  getOemProvisioningDataWithoutOTP {
    cardHolderName
    cardToken
    expiryDate
    otp
  }
}
    `;
export const useGetOemProvisioningDataWithoutOtpQuery = <
  TData = GetOemProvisioningDataWithoutOtpQuery,
  TError = unknown
>(
  variables?: GetOemProvisioningDataWithoutOtpQueryVariables,
  options?: UseQueryOptions<GetOemProvisioningDataWithoutOtpQuery, TError, TData>
) =>
  useQuery<GetOemProvisioningDataWithoutOtpQuery, TError, TData>(
    variables === undefined ? ['GetOemProvisioningDataWithoutOTP'] : ['GetOemProvisioningDataWithoutOTP', variables],
    useFetchData<GetOemProvisioningDataWithoutOtpQuery, GetOemProvisioningDataWithoutOtpQueryVariables>(
      GetOemProvisioningDataWithoutOtpDocument
    ).bind(null, variables),
    options
  );

useGetOemProvisioningDataWithoutOtpQuery.getKey = (variables?: GetOemProvisioningDataWithoutOtpQueryVariables) =>
  variables === undefined ? ['GetOemProvisioningDataWithoutOTP'] : ['GetOemProvisioningDataWithoutOTP', variables];
export const useInfiniteGetOemProvisioningDataWithoutOtpQuery = <
  TData = GetOemProvisioningDataWithoutOtpQuery,
  TError = unknown
>(
  variables?: GetOemProvisioningDataWithoutOtpQueryVariables,
  options?: UseInfiniteQueryOptions<GetOemProvisioningDataWithoutOtpQuery, TError, TData>
) => {
  const query = useFetchData<GetOemProvisioningDataWithoutOtpQuery, GetOemProvisioningDataWithoutOtpQueryVariables>(
    GetOemProvisioningDataWithoutOtpDocument
  );
  return useInfiniteQuery<GetOemProvisioningDataWithoutOtpQuery, TError, TData>(
    variables === undefined
      ? ['GetOemProvisioningDataWithoutOTP.infinite']
      : ['GetOemProvisioningDataWithoutOTP.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetOemProvisioningDataWithoutOtpQuery.getKey = (
  variables?: GetOemProvisioningDataWithoutOtpQueryVariables
) =>
  variables === undefined
    ? ['GetOemProvisioningDataWithoutOTP.infinite']
    : ['GetOemProvisioningDataWithoutOTP.infinite', variables];
export const GetTransactionsDocument = `
    query GetTransactions($limit: Int!, $offset: Int!) {
  getTransactions(limit: $limit, offset: $offset) {
    accountId
    currencyAmount {
      amount
      currency
    }
    clearingTimeUtc
    description
    transactionId
    reference
    counterpart {
      name
      accountNumber
      bsb
    }
  }
}
    `;
export const useGetTransactionsQuery = <TData = GetTransactionsQuery, TError = unknown>(
  variables: GetTransactionsQueryVariables,
  options?: UseQueryOptions<GetTransactionsQuery, TError, TData>
) =>
  useQuery<GetTransactionsQuery, TError, TData>(
    ['GetTransactions', variables],
    useFetchData<GetTransactionsQuery, GetTransactionsQueryVariables>(GetTransactionsDocument).bind(null, variables),
    options
  );

useGetTransactionsQuery.getKey = (variables: GetTransactionsQueryVariables) => ['GetTransactions', variables];
export const useInfiniteGetTransactionsQuery = <TData = GetTransactionsQuery, TError = unknown>(
  variables: GetTransactionsQueryVariables,
  options?: UseInfiniteQueryOptions<GetTransactionsQuery, TError, TData>
) => {
  const query = useFetchData<GetTransactionsQuery, GetTransactionsQueryVariables>(GetTransactionsDocument);
  return useInfiniteQuery<GetTransactionsQuery, TError, TData>(
    ['GetTransactions.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetTransactionsQuery.getKey = (variables: GetTransactionsQueryVariables) => [
  'GetTransactions.infinite',
  variables,
];
export const GetTransactionsV2Document = `
    query GetTransactionsV2($limit: Int!, $offset: Int!) {
  getTransactionsV2(limit: $limit, offset: $offset) {
    id
    currencyAmount {
      amount
      currency
    }
    dateTimeUTC
    merchant {
      name
      singleLineAddress
    }
    cardId
    pending
    type
    reference
    description
    transferPeerDetails {
      bsb
      accountNumber
      name
      accountHayId
    }
  }
}
    `;
export const useGetTransactionsV2Query = <TData = GetTransactionsV2Query, TError = unknown>(
  variables: GetTransactionsV2QueryVariables,
  options?: UseQueryOptions<GetTransactionsV2Query, TError, TData>
) =>
  useQuery<GetTransactionsV2Query, TError, TData>(
    ['GetTransactionsV2', variables],
    useFetchData<GetTransactionsV2Query, GetTransactionsV2QueryVariables>(GetTransactionsV2Document).bind(
      null,
      variables
    ),
    options
  );

useGetTransactionsV2Query.getKey = (variables: GetTransactionsV2QueryVariables) => ['GetTransactionsV2', variables];
export const useInfiniteGetTransactionsV2Query = <TData = GetTransactionsV2Query, TError = unknown>(
  variables: GetTransactionsV2QueryVariables,
  options?: UseInfiniteQueryOptions<GetTransactionsV2Query, TError, TData>
) => {
  const query = useFetchData<GetTransactionsV2Query, GetTransactionsV2QueryVariables>(GetTransactionsV2Document);
  return useInfiniteQuery<GetTransactionsV2Query, TError, TData>(
    ['GetTransactionsV2.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetTransactionsV2Query.getKey = (variables: GetTransactionsV2QueryVariables) => [
  'GetTransactionsV2.infinite',
  variables,
];
export const GetPersistentNotificationsDocument = `
    query GetPersistentNotifications {
  getPersistentNotifications {
    id
    notificationStatus
    type
  }
}
    `;
export const useGetPersistentNotificationsQuery = <TData = GetPersistentNotificationsQuery, TError = unknown>(
  variables?: GetPersistentNotificationsQueryVariables,
  options?: UseQueryOptions<GetPersistentNotificationsQuery, TError, TData>
) =>
  useQuery<GetPersistentNotificationsQuery, TError, TData>(
    variables === undefined ? ['GetPersistentNotifications'] : ['GetPersistentNotifications', variables],
    useFetchData<GetPersistentNotificationsQuery, GetPersistentNotificationsQueryVariables>(
      GetPersistentNotificationsDocument
    ).bind(null, variables),
    options
  );

useGetPersistentNotificationsQuery.getKey = (variables?: GetPersistentNotificationsQueryVariables) =>
  variables === undefined ? ['GetPersistentNotifications'] : ['GetPersistentNotifications', variables];
export const useInfiniteGetPersistentNotificationsQuery = <TData = GetPersistentNotificationsQuery, TError = unknown>(
  variables?: GetPersistentNotificationsQueryVariables,
  options?: UseInfiniteQueryOptions<GetPersistentNotificationsQuery, TError, TData>
) => {
  const query = useFetchData<GetPersistentNotificationsQuery, GetPersistentNotificationsQueryVariables>(
    GetPersistentNotificationsDocument
  );
  return useInfiniteQuery<GetPersistentNotificationsQuery, TError, TData>(
    variables === undefined
      ? ['GetPersistentNotifications.infinite']
      : ['GetPersistentNotifications.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetPersistentNotificationsQuery.getKey = (variables?: GetPersistentNotificationsQueryVariables) =>
  variables === undefined
    ? ['GetPersistentNotifications.infinite']
    : ['GetPersistentNotifications.infinite', variables];
export const EhCardBinRangeDocument = `
    query EhCardBinRange {
  ehCardBinRange {
    from
    to
  }
}
    `;
export const useEhCardBinRangeQuery = <TData = EhCardBinRangeQuery, TError = unknown>(
  variables?: EhCardBinRangeQueryVariables,
  options?: UseQueryOptions<EhCardBinRangeQuery, TError, TData>
) =>
  useQuery<EhCardBinRangeQuery, TError, TData>(
    variables === undefined ? ['EhCardBinRange'] : ['EhCardBinRange', variables],
    useFetchData<EhCardBinRangeQuery, EhCardBinRangeQueryVariables>(EhCardBinRangeDocument).bind(null, variables),
    options
  );

useEhCardBinRangeQuery.getKey = (variables?: EhCardBinRangeQueryVariables) =>
  variables === undefined ? ['EhCardBinRange'] : ['EhCardBinRange', variables];
export const useInfiniteEhCardBinRangeQuery = <TData = EhCardBinRangeQuery, TError = unknown>(
  variables?: EhCardBinRangeQueryVariables,
  options?: UseInfiniteQueryOptions<EhCardBinRangeQuery, TError, TData>
) => {
  const query = useFetchData<EhCardBinRangeQuery, EhCardBinRangeQueryVariables>(EhCardBinRangeDocument);
  return useInfiniteQuery<EhCardBinRangeQuery, TError, TData>(
    variables === undefined ? ['EhCardBinRange.infinite'] : ['EhCardBinRange.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteEhCardBinRangeQuery.getKey = (variables?: EhCardBinRangeQueryVariables) =>
  variables === undefined ? ['EhCardBinRange.infinite'] : ['EhCardBinRange.infinite', variables];
export const GetIdvProfileDocument = `
    query GetIDVProfile {
  getIDVProfile {
    status
    token
    applicantId
  }
}
    `;
export const useGetIdvProfileQuery = <TData = GetIdvProfileQuery, TError = unknown>(
  variables?: GetIdvProfileQueryVariables,
  options?: UseQueryOptions<GetIdvProfileQuery, TError, TData>
) =>
  useQuery<GetIdvProfileQuery, TError, TData>(
    variables === undefined ? ['GetIDVProfile'] : ['GetIDVProfile', variables],
    useFetchData<GetIdvProfileQuery, GetIdvProfileQueryVariables>(GetIdvProfileDocument).bind(null, variables),
    options
  );

useGetIdvProfileQuery.getKey = (variables?: GetIdvProfileQueryVariables) =>
  variables === undefined ? ['GetIDVProfile'] : ['GetIDVProfile', variables];
export const useInfiniteGetIdvProfileQuery = <TData = GetIdvProfileQuery, TError = unknown>(
  variables?: GetIdvProfileQueryVariables,
  options?: UseInfiniteQueryOptions<GetIdvProfileQuery, TError, TData>
) => {
  const query = useFetchData<GetIdvProfileQuery, GetIdvProfileQueryVariables>(GetIdvProfileDocument);
  return useInfiniteQuery<GetIdvProfileQuery, TError, TData>(
    variables === undefined ? ['GetIDVProfile.infinite'] : ['GetIDVProfile.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetIdvProfileQuery.getKey = (variables?: GetIdvProfileQueryVariables) =>
  variables === undefined ? ['GetIDVProfile.infinite'] : ['GetIDVProfile.infinite', variables];
export const GetStashesDocument = `
    query GetStashes {
  getStashes {
    id
    name
    targetAmount
    balance
    imageUrl
    closedAtUtc
    createdAtUtc
    status
  }
}
    `;
export const useGetStashesQuery = <TData = GetStashesQuery, TError = unknown>(
  variables?: GetStashesQueryVariables,
  options?: UseQueryOptions<GetStashesQuery, TError, TData>
) =>
  useQuery<GetStashesQuery, TError, TData>(
    variables === undefined ? ['GetStashes'] : ['GetStashes', variables],
    useFetchData<GetStashesQuery, GetStashesQueryVariables>(GetStashesDocument).bind(null, variables),
    options
  );

useGetStashesQuery.getKey = (variables?: GetStashesQueryVariables) =>
  variables === undefined ? ['GetStashes'] : ['GetStashes', variables];
export const useInfiniteGetStashesQuery = <TData = GetStashesQuery, TError = unknown>(
  variables?: GetStashesQueryVariables,
  options?: UseInfiniteQueryOptions<GetStashesQuery, TError, TData>
) => {
  const query = useFetchData<GetStashesQuery, GetStashesQueryVariables>(GetStashesDocument);
  return useInfiniteQuery<GetStashesQuery, TError, TData>(
    variables === undefined ? ['GetStashes.infinite'] : ['GetStashes.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetStashesQuery.getKey = (variables?: GetStashesQueryVariables) =>
  variables === undefined ? ['GetStashes.infinite'] : ['GetStashes.infinite', variables];
export const GetStashMetaDocument = `
    query GetStashMeta {
  getStashMeta {
    isMarketingCardFinished
    isStashEntryButtonInSpendAccountHidden
  }
}
    `;
export const useGetStashMetaQuery = <TData = GetStashMetaQuery, TError = unknown>(
  variables?: GetStashMetaQueryVariables,
  options?: UseQueryOptions<GetStashMetaQuery, TError, TData>
) =>
  useQuery<GetStashMetaQuery, TError, TData>(
    variables === undefined ? ['GetStashMeta'] : ['GetStashMeta', variables],
    useFetchData<GetStashMetaQuery, GetStashMetaQueryVariables>(GetStashMetaDocument).bind(null, variables),
    options
  );

useGetStashMetaQuery.getKey = (variables?: GetStashMetaQueryVariables) =>
  variables === undefined ? ['GetStashMeta'] : ['GetStashMeta', variables];
export const useInfiniteGetStashMetaQuery = <TData = GetStashMetaQuery, TError = unknown>(
  variables?: GetStashMetaQueryVariables,
  options?: UseInfiniteQueryOptions<GetStashMetaQuery, TError, TData>
) => {
  const query = useFetchData<GetStashMetaQuery, GetStashMetaQueryVariables>(GetStashMetaDocument);
  return useInfiniteQuery<GetStashMetaQuery, TError, TData>(
    variables === undefined ? ['GetStashMeta.infinite'] : ['GetStashMeta.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetStashMetaQuery.getKey = (variables?: GetStashMetaQueryVariables) =>
  variables === undefined ? ['GetStashMeta.infinite'] : ['GetStashMeta.infinite', variables];
export const GetStashTransactionsDocument = `
    query GetStashTransactions($stashId: String!, $limit: Int!, $offset: Int!) {
  getStashTransactions(stashId: $stashId, limit: $limit, offset: $offset) {
    id
    amount
    transactionTimeUtc
  }
}
    `;
export const useGetStashTransactionsQuery = <TData = GetStashTransactionsQuery, TError = unknown>(
  variables: GetStashTransactionsQueryVariables,
  options?: UseQueryOptions<GetStashTransactionsQuery, TError, TData>
) =>
  useQuery<GetStashTransactionsQuery, TError, TData>(
    ['GetStashTransactions', variables],
    useFetchData<GetStashTransactionsQuery, GetStashTransactionsQueryVariables>(GetStashTransactionsDocument).bind(
      null,
      variables
    ),
    options
  );

useGetStashTransactionsQuery.getKey = (variables: GetStashTransactionsQueryVariables) => [
  'GetStashTransactions',
  variables,
];
export const useInfiniteGetStashTransactionsQuery = <TData = GetStashTransactionsQuery, TError = unknown>(
  variables: GetStashTransactionsQueryVariables,
  options?: UseInfiniteQueryOptions<GetStashTransactionsQuery, TError, TData>
) => {
  const query = useFetchData<GetStashTransactionsQuery, GetStashTransactionsQueryVariables>(
    GetStashTransactionsDocument
  );
  return useInfiniteQuery<GetStashTransactionsQuery, TError, TData>(
    ['GetStashTransactions.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetStashTransactionsQuery.getKey = (variables: GetStashTransactionsQueryVariables) => [
  'GetStashTransactions.infinite',
  variables,
];
export const GetUkTokenDocument = `
    query GetUKToken {
  getUKToken {
    userToken
  }
}
    `;
export const useGetUkTokenQuery = <TData = GetUkTokenQuery, TError = unknown>(
  variables?: GetUkTokenQueryVariables,
  options?: UseQueryOptions<GetUkTokenQuery, TError, TData>
) =>
  useQuery<GetUkTokenQuery, TError, TData>(
    variables === undefined ? ['GetUKToken'] : ['GetUKToken', variables],
    useFetchData<GetUkTokenQuery, GetUkTokenQueryVariables>(GetUkTokenDocument).bind(null, variables),
    options
  );

useGetUkTokenQuery.getKey = (variables?: GetUkTokenQueryVariables) =>
  variables === undefined ? ['GetUKToken'] : ['GetUKToken', variables];
export const useInfiniteGetUkTokenQuery = <TData = GetUkTokenQuery, TError = unknown>(
  variables?: GetUkTokenQueryVariables,
  options?: UseInfiniteQueryOptions<GetUkTokenQuery, TError, TData>
) => {
  const query = useFetchData<GetUkTokenQuery, GetUkTokenQueryVariables>(GetUkTokenDocument);
  return useInfiniteQuery<GetUkTokenQuery, TError, TData>(
    variables === undefined ? ['GetUKToken.infinite'] : ['GetUKToken.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetUkTokenQuery.getKey = (variables?: GetUkTokenQueryVariables) =>
  variables === undefined ? ['GetUKToken.infinite'] : ['GetUKToken.infinite', variables];
export const HeroDollarBalanceDocument = `
    query HeroDollarBalance($ehToken: String!) {
  heroDollarBalance(ehToken: $ehToken) {
    balance
  }
}
    `;
export const useHeroDollarBalanceQuery = <TData = HeroDollarBalanceQuery, TError = unknown>(
  variables: HeroDollarBalanceQueryVariables,
  options?: UseQueryOptions<HeroDollarBalanceQuery, TError, TData>
) =>
  useQuery<HeroDollarBalanceQuery, TError, TData>(
    ['HeroDollarBalance', variables],
    useFetchData<HeroDollarBalanceQuery, HeroDollarBalanceQueryVariables>(HeroDollarBalanceDocument).bind(
      null,
      variables
    ),
    options
  );

useHeroDollarBalanceQuery.getKey = (variables: HeroDollarBalanceQueryVariables) => ['HeroDollarBalance', variables];
export const useInfiniteHeroDollarBalanceQuery = <TData = HeroDollarBalanceQuery, TError = unknown>(
  variables: HeroDollarBalanceQueryVariables,
  options?: UseInfiniteQueryOptions<HeroDollarBalanceQuery, TError, TData>
) => {
  const query = useFetchData<HeroDollarBalanceQuery, HeroDollarBalanceQueryVariables>(HeroDollarBalanceDocument);
  return useInfiniteQuery<HeroDollarBalanceQuery, TError, TData>(
    ['HeroDollarBalance.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteHeroDollarBalanceQuery.getKey = (variables: HeroDollarBalanceQueryVariables) => [
  'HeroDollarBalance.infinite',
  variables,
];
export const HeroDollarTransactionsDocument = `
    query HeroDollarTransactions($ehToken: String!, $pageIndex: Int, $itemPerPage: Int) {
  heroDollarTransactions(
    ehToken: $ehToken
    pageIndex: $pageIndex
    itemPerPage: $itemPerPage
  ) {
    itemPerPage
    pageIndex
    totalItems
    totalPages
    items {
      id
      refId
      amount
      transactionType
      transactionTimeUtc
      clientType
      reason
      reasonType
    }
  }
}
    `;
export const useHeroDollarTransactionsQuery = <TData = HeroDollarTransactionsQuery, TError = unknown>(
  variables: HeroDollarTransactionsQueryVariables,
  options?: UseQueryOptions<HeroDollarTransactionsQuery, TError, TData>
) =>
  useQuery<HeroDollarTransactionsQuery, TError, TData>(
    ['HeroDollarTransactions', variables],
    useFetchData<HeroDollarTransactionsQuery, HeroDollarTransactionsQueryVariables>(
      HeroDollarTransactionsDocument
    ).bind(null, variables),
    options
  );

useHeroDollarTransactionsQuery.getKey = (variables: HeroDollarTransactionsQueryVariables) => [
  'HeroDollarTransactions',
  variables,
];
export const useInfiniteHeroDollarTransactionsQuery = <TData = HeroDollarTransactionsQuery, TError = unknown>(
  variables: HeroDollarTransactionsQueryVariables,
  options?: UseInfiniteQueryOptions<HeroDollarTransactionsQuery, TError, TData>
) => {
  const query = useFetchData<HeroDollarTransactionsQuery, HeroDollarTransactionsQueryVariables>(
    HeroDollarTransactionsDocument
  );
  return useInfiniteQuery<HeroDollarTransactionsQuery, TError, TData>(
    ['HeroDollarTransactions.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteHeroDollarTransactionsQuery.getKey = (variables: HeroDollarTransactionsQueryVariables) => [
  'HeroDollarTransactions.infinite',
  variables,
];
export const HeroDollarTransactionDetailDocument = `
    query HeroDollarTransactionDetail($ehToken: String!, $transactionId: String!, $clientType: HeroDollarClientType) {
  heroDollarTransactionDetail(
    ehToken: $ehToken
    transactionId: $transactionId
    clientType: $clientType
  ) {
    id
    refId
    amount
    transactionType
    transactionTimeUtc
    clientType
    reason
    reasonType
    recognised_by
    organization_name
    merchant_name
  }
}
    `;
export const useHeroDollarTransactionDetailQuery = <TData = HeroDollarTransactionDetailQuery, TError = unknown>(
  variables: HeroDollarTransactionDetailQueryVariables,
  options?: UseQueryOptions<HeroDollarTransactionDetailQuery, TError, TData>
) =>
  useQuery<HeroDollarTransactionDetailQuery, TError, TData>(
    ['HeroDollarTransactionDetail', variables],
    useFetchData<HeroDollarTransactionDetailQuery, HeroDollarTransactionDetailQueryVariables>(
      HeroDollarTransactionDetailDocument
    ).bind(null, variables),
    options
  );

useHeroDollarTransactionDetailQuery.getKey = (variables: HeroDollarTransactionDetailQueryVariables) => [
  'HeroDollarTransactionDetail',
  variables,
];
export const useInfiniteHeroDollarTransactionDetailQuery = <TData = HeroDollarTransactionDetailQuery, TError = unknown>(
  variables: HeroDollarTransactionDetailQueryVariables,
  options?: UseInfiniteQueryOptions<HeroDollarTransactionDetailQuery, TError, TData>
) => {
  const query = useFetchData<HeroDollarTransactionDetailQuery, HeroDollarTransactionDetailQueryVariables>(
    HeroDollarTransactionDetailDocument
  );
  return useInfiniteQuery<HeroDollarTransactionDetailQuery, TError, TData>(
    ['HeroDollarTransactionDetail.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteHeroDollarTransactionDetailQuery.getKey = (variables: HeroDollarTransactionDetailQueryVariables) => [
  'HeroDollarTransactionDetail.infinite',
  variables,
];
export const HeroDollarRedemptionFeeDocument = `
    query HeroDollarRedemptionFee {
  heroDollarRedemptionFee {
    data {
      fee
    }
  }
}
    `;
export const useHeroDollarRedemptionFeeQuery = <TData = HeroDollarRedemptionFeeQuery, TError = unknown>(
  variables?: HeroDollarRedemptionFeeQueryVariables,
  options?: UseQueryOptions<HeroDollarRedemptionFeeQuery, TError, TData>
) =>
  useQuery<HeroDollarRedemptionFeeQuery, TError, TData>(
    variables === undefined ? ['HeroDollarRedemptionFee'] : ['HeroDollarRedemptionFee', variables],
    useFetchData<HeroDollarRedemptionFeeQuery, HeroDollarRedemptionFeeQueryVariables>(
      HeroDollarRedemptionFeeDocument
    ).bind(null, variables),
    options
  );

useHeroDollarRedemptionFeeQuery.getKey = (variables?: HeroDollarRedemptionFeeQueryVariables) =>
  variables === undefined ? ['HeroDollarRedemptionFee'] : ['HeroDollarRedemptionFee', variables];
export const useInfiniteHeroDollarRedemptionFeeQuery = <TData = HeroDollarRedemptionFeeQuery, TError = unknown>(
  variables?: HeroDollarRedemptionFeeQueryVariables,
  options?: UseInfiniteQueryOptions<HeroDollarRedemptionFeeQuery, TError, TData>
) => {
  const query = useFetchData<HeroDollarRedemptionFeeQuery, HeroDollarRedemptionFeeQueryVariables>(
    HeroDollarRedemptionFeeDocument
  );
  return useInfiniteQuery<HeroDollarRedemptionFeeQuery, TError, TData>(
    variables === undefined ? ['HeroDollarRedemptionFee.infinite'] : ['HeroDollarRedemptionFee.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteHeroDollarRedemptionFeeQuery.getKey = (variables?: HeroDollarRedemptionFeeQueryVariables) =>
  variables === undefined ? ['HeroDollarRedemptionFee.infinite'] : ['HeroDollarRedemptionFee.infinite', variables];
export const PaymentPreferenceSettingsDocument = `
    query PaymentPreferenceSettings {
  paymentPreferenceSettings {
    payWithHDOnSwagCard
  }
}
    `;
export const usePaymentPreferenceSettingsQuery = <TData = PaymentPreferenceSettingsQuery, TError = unknown>(
  variables?: PaymentPreferenceSettingsQueryVariables,
  options?: UseQueryOptions<PaymentPreferenceSettingsQuery, TError, TData>
) =>
  useQuery<PaymentPreferenceSettingsQuery, TError, TData>(
    variables === undefined ? ['PaymentPreferenceSettings'] : ['PaymentPreferenceSettings', variables],
    useFetchData<PaymentPreferenceSettingsQuery, PaymentPreferenceSettingsQueryVariables>(
      PaymentPreferenceSettingsDocument
    ).bind(null, variables),
    options
  );

usePaymentPreferenceSettingsQuery.getKey = (variables?: PaymentPreferenceSettingsQueryVariables) =>
  variables === undefined ? ['PaymentPreferenceSettings'] : ['PaymentPreferenceSettings', variables];
export const useInfinitePaymentPreferenceSettingsQuery = <TData = PaymentPreferenceSettingsQuery, TError = unknown>(
  variables?: PaymentPreferenceSettingsQueryVariables,
  options?: UseInfiniteQueryOptions<PaymentPreferenceSettingsQuery, TError, TData>
) => {
  const query = useFetchData<PaymentPreferenceSettingsQuery, PaymentPreferenceSettingsQueryVariables>(
    PaymentPreferenceSettingsDocument
  );
  return useInfiniteQuery<PaymentPreferenceSettingsQuery, TError, TData>(
    variables === undefined
      ? ['PaymentPreferenceSettings.infinite']
      : ['PaymentPreferenceSettings.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfinitePaymentPreferenceSettingsQuery.getKey = (variables?: PaymentPreferenceSettingsQueryVariables) =>
  variables === undefined ? ['PaymentPreferenceSettings.infinite'] : ['PaymentPreferenceSettings.infinite', variables];
export const PayWithHdCarouselSeenStatusDocument = `
    query PayWithHDCarouselSeenStatus {
  payWithHDCarouselSeenStatus {
    seen
  }
}
    `;
export const usePayWithHdCarouselSeenStatusQuery = <TData = PayWithHdCarouselSeenStatusQuery, TError = unknown>(
  variables?: PayWithHdCarouselSeenStatusQueryVariables,
  options?: UseQueryOptions<PayWithHdCarouselSeenStatusQuery, TError, TData>
) =>
  useQuery<PayWithHdCarouselSeenStatusQuery, TError, TData>(
    variables === undefined ? ['PayWithHDCarouselSeenStatus'] : ['PayWithHDCarouselSeenStatus', variables],
    useFetchData<PayWithHdCarouselSeenStatusQuery, PayWithHdCarouselSeenStatusQueryVariables>(
      PayWithHdCarouselSeenStatusDocument
    ).bind(null, variables),
    options
  );

usePayWithHdCarouselSeenStatusQuery.getKey = (variables?: PayWithHdCarouselSeenStatusQueryVariables) =>
  variables === undefined ? ['PayWithHDCarouselSeenStatus'] : ['PayWithHDCarouselSeenStatus', variables];
export const useInfinitePayWithHdCarouselSeenStatusQuery = <TData = PayWithHdCarouselSeenStatusQuery, TError = unknown>(
  variables?: PayWithHdCarouselSeenStatusQueryVariables,
  options?: UseInfiniteQueryOptions<PayWithHdCarouselSeenStatusQuery, TError, TData>
) => {
  const query = useFetchData<PayWithHdCarouselSeenStatusQuery, PayWithHdCarouselSeenStatusQueryVariables>(
    PayWithHdCarouselSeenStatusDocument
  );
  return useInfiniteQuery<PayWithHdCarouselSeenStatusQuery, TError, TData>(
    variables === undefined
      ? ['PayWithHDCarouselSeenStatus.infinite']
      : ['PayWithHDCarouselSeenStatus.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfinitePayWithHdCarouselSeenStatusQuery.getKey = (variables?: PayWithHdCarouselSeenStatusQueryVariables) =>
  variables === undefined
    ? ['PayWithHDCarouselSeenStatus.infinite']
    : ['PayWithHDCarouselSeenStatus.infinite', variables];
export const CashbackUserInfoDocument = `
    query CashbackUserInfo {
  cashbackUserInfo {
    autoEnrolMessage
    autoEnrolStatus
    bankLinkedMessage
    bankLinkedStatus
    createdAt
    updatedAt
    __typename
  }
}
    `;
export const useCashbackUserInfoQuery = <TData = CashbackUserInfoQuery, TError = unknown>(
  variables?: CashbackUserInfoQueryVariables,
  options?: UseQueryOptions<CashbackUserInfoQuery, TError, TData>
) =>
  useQuery<CashbackUserInfoQuery, TError, TData>(
    variables === undefined ? ['CashbackUserInfo'] : ['CashbackUserInfo', variables],
    useFetchData<CashbackUserInfoQuery, CashbackUserInfoQueryVariables>(CashbackUserInfoDocument).bind(null, variables),
    options
  );

useCashbackUserInfoQuery.getKey = (variables?: CashbackUserInfoQueryVariables) =>
  variables === undefined ? ['CashbackUserInfo'] : ['CashbackUserInfo', variables];
export const useInfiniteCashbackUserInfoQuery = <TData = CashbackUserInfoQuery, TError = unknown>(
  variables?: CashbackUserInfoQueryVariables,
  options?: UseInfiniteQueryOptions<CashbackUserInfoQuery, TError, TData>
) => {
  const query = useFetchData<CashbackUserInfoQuery, CashbackUserInfoQueryVariables>(CashbackUserInfoDocument);
  return useInfiniteQuery<CashbackUserInfoQuery, TError, TData>(
    variables === undefined ? ['CashbackUserInfo.infinite'] : ['CashbackUserInfo.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteCashbackUserInfoQuery.getKey = (variables?: CashbackUserInfoQueryVariables) =>
  variables === undefined ? ['CashbackUserInfo.infinite'] : ['CashbackUserInfo.infinite', variables];
/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockMailingAddressMutation((req, res, ctx) => {
 *   const { address } = req.variables;
 *   return res(
 *     ctx.data({ mailingAddress })
 *   )
 * })
 */
export const mockMailingAddressMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<MailingAddressMutationVariables>,
    GraphQLContext<MailingAddressMutation>,
    any
  >
) => graphql.mutation<MailingAddressMutation, MailingAddressMutationVariables>('MailingAddress', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockPatchProfileMutation((req, res, ctx) => {
 *   const { patch, ehToken, orgId } = req.variables;
 *   return res(
 *     ctx.data({ patchProfile })
 *   )
 * })
 */
export const mockPatchProfileMutation = (
  resolver: ResponseResolver<GraphQLRequest<PatchProfileMutationVariables>, GraphQLContext<PatchProfileMutation>, any>
) => graphql.mutation<PatchProfileMutation, PatchProfileMutationVariables>('PatchProfile', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockEventLogMutation((req, res, ctx) => {
 *   const { event } = req.variables;
 *   return res(
 *     ctx.data({ eventLog })
 *   )
 * })
 */
export const mockEventLogMutation = (
  resolver: ResponseResolver<GraphQLRequest<EventLogMutationVariables>, GraphQLContext<EventLogMutation>, any>
) => graphql.mutation<EventLogMutation, EventLogMutationVariables>('EventLog', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateUserProfileMutation((req, res, ctx) => {
 *   const { userProfile } = req.variables;
 *   return res(
 *     ctx.data({ updateUserProfile })
 *   )
 * })
 */
export const mockUpdateUserProfileMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<UpdateUserProfileMutationVariables>,
    GraphQLContext<UpdateUserProfileMutation>,
    any
  >
) => graphql.mutation<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>('UpdateUserProfile', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockFinishSpendAccountCarouselMutation((req, res, ctx) => {
 *   return res(
 *     ctx.data({ finishSpendAccountCarousel })
 *   )
 * })
 */
export const mockFinishSpendAccountCarouselMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<FinishSpendAccountCarouselMutationVariables>,
    GraphQLContext<FinishSpendAccountCarouselMutation>,
    any
  >
) =>
  graphql.mutation<FinishSpendAccountCarouselMutation, FinishSpendAccountCarouselMutationVariables>(
    'FinishSpendAccountCarousel',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDrawdownWageMutation((req, res, ctx) => {
 *   const { ehToken, orgId, bankAccountId, amount } = req.variables;
 *   return res(
 *     ctx.data({ drawdownWage })
 *   )
 * })
 */
export const mockDrawdownWageMutation = (
  resolver: ResponseResolver<GraphQLRequest<DrawdownWageMutationVariables>, GraphQLContext<DrawdownWageMutation>, any>
) => graphql.mutation<DrawdownWageMutation, DrawdownWageMutationVariables>('DrawdownWage', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDrawdownWageV2Mutation((req, res, ctx) => {
 *   const { ehToken, orgId, bankAccountId, amount } = req.variables;
 *   return res(
 *     ctx.data({ drawdownWageV2 })
 *   )
 * })
 */
export const mockDrawdownWageV2Mutation = (
  resolver: ResponseResolver<
    GraphQLRequest<DrawdownWageV2MutationVariables>,
    GraphQLContext<DrawdownWageV2Mutation>,
    any
  >
) => graphql.mutation<DrawdownWageV2Mutation, DrawdownWageV2MutationVariables>('DrawdownWageV2', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockPayAccountMutation((req, res, ctx) => {
 *   const { ehToken, membership, bankDetails } = req.variables;
 *   return res(
 *     ctx.data({ payAccount })
 *   )
 * })
 */
export const mockPayAccountMutation = (
  resolver: ResponseResolver<GraphQLRequest<PayAccountMutationVariables>, GraphQLContext<PayAccountMutation>, any>
) => graphql.mutation<PayAccountMutation, PayAccountMutationVariables>('PayAccount', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockAccountTransferMutation((req, res, ctx) => {
 *   const { transferDetails } = req.variables;
 *   return res(
 *     ctx.data({ accountTransfer })
 *   )
 * })
 */
export const mockAccountTransferMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<AccountTransferMutationVariables>,
    GraphQLContext<AccountTransferMutation>,
    any
  >
) => graphql.mutation<AccountTransferMutation, AccountTransferMutationVariables>('AccountTransfer', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockMakePaymentMutation((req, res, ctx) => {
 *   const { ehToken, orgId, nonce, items, paymentMethod, deviceData } = req.variables;
 *   return res(
 *     ctx.data({ makePayment })
 *   )
 * })
 */
export const mockMakePaymentMutation = (
  resolver: ResponseResolver<GraphQLRequest<MakePaymentMutationVariables>, GraphQLContext<MakePaymentMutation>, any>
) => graphql.mutation<MakePaymentMutation, MakePaymentMutationVariables>('MakePayment', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockMakePaymentV2Mutation((req, res, ctx) => {
 *   const { ehToken, orgId, nonce, items, paymentMethod, deviceData, serviceFee, ehPlatform } = req.variables;
 *   return res(
 *     ctx.data({ makePaymentV2 })
 *   )
 * })
 */
export const mockMakePaymentV2Mutation = (
  resolver: ResponseResolver<GraphQLRequest<MakePaymentV2MutationVariables>, GraphQLContext<MakePaymentV2Mutation>, any>
) => graphql.mutation<MakePaymentV2Mutation, MakePaymentV2MutationVariables>('MakePaymentV2', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateStripeClientTokenMutation((req, res, ctx) => {
 *   const { ehToken, orgId, createStripeClientTokenInput } = req.variables;
 *   return res(
 *     ctx.data({ createStripeClientToken })
 *   )
 * })
 */
export const mockCreateStripeClientTokenMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<CreateStripeClientTokenMutationVariables>,
    GraphQLContext<CreateStripeClientTokenMutation>,
    any
  >
) =>
  graphql.mutation<CreateStripeClientTokenMutation, CreateStripeClientTokenMutationVariables>(
    'CreateStripeClientToken',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockMakeStripePaymentMutation((req, res, ctx) => {
 *   const { ehToken, orgId, nonce, items, paymentMethod, deviceData, serviceFee, ehPlatform } = req.variables;
 *   return res(
 *     ctx.data({ makeStripePayment })
 *   )
 * })
 */
export const mockMakeStripePaymentMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<MakeStripePaymentMutationVariables>,
    GraphQLContext<MakeStripePaymentMutation>,
    any
  >
) => graphql.mutation<MakeStripePaymentMutation, MakeStripePaymentMutationVariables>('MakeStripePayment', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCancelStripePaymentMutation((req, res, ctx) => {
 *   const { ehToken, orgId, clientToken } = req.variables;
 *   return res(
 *     ctx.data({ cancelStripePayment })
 *   )
 * })
 */
export const mockCancelStripePaymentMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<CancelStripePaymentMutationVariables>,
    GraphQLContext<CancelStripePaymentMutation>,
    any
  >
) =>
  graphql.mutation<CancelStripePaymentMutation, CancelStripePaymentMutationVariables>('CancelStripePayment', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockActivateCardMutation((req, res, ctx) => {
 *   return res(
 *     ctx.data({ activateCard })
 *   )
 * })
 */
export const mockActivateCardMutation = (
  resolver: ResponseResolver<GraphQLRequest<ActivateCardMutationVariables>, GraphQLContext<ActivateCardMutation>, any>
) => graphql.mutation<ActivateCardMutation, ActivateCardMutationVariables>('ActivateCard', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCardMutation((req, res, ctx) => {
 *   const { cardRequest } = req.variables;
 *   return res(
 *     ctx.data({ card })
 *   )
 * })
 */
export const mockCardMutation = (
  resolver: ResponseResolver<GraphQLRequest<CardMutationVariables>, GraphQLContext<CardMutation>, any>
) => graphql.mutation<CardMutation, CardMutationVariables>('Card', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockInitiateEWalletSetupMutation((req, res, ctx) => {
 *   const { setupDetails } = req.variables;
 *   return res(
 *     ctx.data({ initiateEWalletSetup })
 *   )
 * })
 */
export const mockInitiateEWalletSetupMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<InitiateEWalletSetupMutationVariables>,
    GraphQLContext<InitiateEWalletSetupMutation>,
    any
  >
) =>
  graphql.mutation<InitiateEWalletSetupMutation, InitiateEWalletSetupMutationVariables>(
    'InitiateEWalletSetup',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockInitiateEWalletSetupV2Mutation((req, res, ctx) => {
 *   const { setupDetails } = req.variables;
 *   return res(
 *     ctx.data({ initiateEWalletSetupV2 })
 *   )
 * })
 */
export const mockInitiateEWalletSetupV2Mutation = (
  resolver: ResponseResolver<
    GraphQLRequest<InitiateEWalletSetupV2MutationVariables>,
    GraphQLContext<InitiateEWalletSetupV2Mutation>,
    any
  >
) =>
  graphql.mutation<InitiateEWalletSetupV2Mutation, InitiateEWalletSetupV2MutationVariables>(
    'InitiateEWalletSetupV2',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockRequestNewCardMutation((req, res, ctx) => {
 *   const { address } = req.variables;
 *   return res(
 *     ctx.data({ requestNewCard })
 *   )
 * })
 */
export const mockRequestNewCardMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<RequestNewCardMutationVariables>,
    GraphQLContext<RequestNewCardMutation>,
    any
  >
) => graphql.mutation<RequestNewCardMutation, RequestNewCardMutationVariables>('RequestNewCard', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockSendOtpToCurrentUserMutation((req, res, ctx) => {
 *   return res(
 *     ctx.data({ sendOtpToCurrentUser })
 *   )
 * })
 */
export const mockSendOtpToCurrentUserMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<SendOtpToCurrentUserMutationVariables>,
    GraphQLContext<SendOtpToCurrentUserMutation>,
    any
  >
) =>
  graphql.mutation<SendOtpToCurrentUserMutation, SendOtpToCurrentUserMutationVariables>(
    'SendOtpToCurrentUser',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateCardMetaMutation((req, res, ctx) => {
 *   const { cardMeta } = req.variables;
 *   return res(
 *     ctx.data({ updateCardMeta })
 *   )
 * })
 */
export const mockUpdateCardMetaMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<UpdateCardMetaMutationVariables>,
    GraphQLContext<UpdateCardMetaMutation>,
    any
  >
) => graphql.mutation<UpdateCardMetaMutation, UpdateCardMetaMutationVariables>('UpdateCardMeta', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateCardPinMutation((req, res, ctx) => {
 *   const { cardPIN } = req.variables;
 *   return res(
 *     ctx.data({ updateCardPIN })
 *   )
 * })
 */
export const mockUpdateCardPinMutation = (
  resolver: ResponseResolver<GraphQLRequest<UpdateCardPinMutationVariables>, GraphQLContext<UpdateCardPinMutation>, any>
) => graphql.mutation<UpdateCardPinMutation, UpdateCardPinMutationVariables>('UpdateCardPIN', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockClearPersistentNotificationMutation((req, res, ctx) => {
 *   const { type } = req.variables;
 *   return res(
 *     ctx.data({ clearPersistentNotification })
 *   )
 * })
 */
export const mockClearPersistentNotificationMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<ClearPersistentNotificationMutationVariables>,
    GraphQLContext<ClearPersistentNotificationMutation>,
    any
  >
) =>
  graphql.mutation<ClearPersistentNotificationMutation, ClearPersistentNotificationMutationVariables>(
    'ClearPersistentNotification',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockSaveWalletSetupMutation((req, res, ctx) => {
 *   const { setupDetails } = req.variables;
 *   return res(
 *     ctx.data({ saveWalletSetup })
 *   )
 * })
 */
export const mockSaveWalletSetupMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<SaveWalletSetupMutationVariables>,
    GraphQLContext<SaveWalletSetupMutation>,
    any
  >
) => graphql.mutation<SaveWalletSetupMutation, SaveWalletSetupMutationVariables>('SaveWalletSetup', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockInitiateEWalletSetupV3Mutation((req, res, ctx) => {
 *   return res(
 *     ctx.data({ initiateEWalletSetupV3 })
 *   )
 * })
 */
export const mockInitiateEWalletSetupV3Mutation = (
  resolver: ResponseResolver<
    GraphQLRequest<InitiateEWalletSetupV3MutationVariables>,
    GraphQLContext<InitiateEWalletSetupV3Mutation>,
    any
  >
) =>
  graphql.mutation<InitiateEWalletSetupV3Mutation, InitiateEWalletSetupV3MutationVariables>(
    'InitiateEWalletSetupV3',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockSetStashMetaMutation((req, res, ctx) => {
 *   const { meta } = req.variables;
 *   return res(
 *     ctx.data({ setStashMeta })
 *   )
 * })
 */
export const mockSetStashMetaMutation = (
  resolver: ResponseResolver<GraphQLRequest<SetStashMetaMutationVariables>, GraphQLContext<SetStashMetaMutation>, any>
) => graphql.mutation<SetStashMetaMutation, SetStashMetaMutationVariables>('SetStashMeta', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDepositStashMutation((req, res, ctx) => {
 *   const { stashId, depositInput } = req.variables;
 *   return res(
 *     ctx.data({ depositStash })
 *   )
 * })
 */
export const mockDepositStashMutation = (
  resolver: ResponseResolver<GraphQLRequest<DepositStashMutationVariables>, GraphQLContext<DepositStashMutation>, any>
) => graphql.mutation<DepositStashMutation, DepositStashMutationVariables>('DepositStash', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateStashMutation((req, res, ctx) => {
 *   const { stashInput } = req.variables;
 *   return res(
 *     ctx.data({ createStash })
 *   )
 * })
 */
export const mockCreateStashMutation = (
  resolver: ResponseResolver<GraphQLRequest<CreateStashMutationVariables>, GraphQLContext<CreateStashMutation>, any>
) => graphql.mutation<CreateStashMutation, CreateStashMutationVariables>('CreateStash', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockWithdrawStashMutation((req, res, ctx) => {
 *   const { stashId, withdrawInput } = req.variables;
 *   return res(
 *     ctx.data({ withdrawStash })
 *   )
 * })
 */
export const mockWithdrawStashMutation = (
  resolver: ResponseResolver<GraphQLRequest<WithdrawStashMutationVariables>, GraphQLContext<WithdrawStashMutation>, any>
) => graphql.mutation<WithdrawStashMutation, WithdrawStashMutationVariables>('WithdrawStash', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCloseStashMutation((req, res, ctx) => {
 *   const { stashId } = req.variables;
 *   return res(
 *     ctx.data({ closeStash })
 *   )
 * })
 */
export const mockCloseStashMutation = (
  resolver: ResponseResolver<GraphQLRequest<CloseStashMutationVariables>, GraphQLContext<CloseStashMutation>, any>
) => graphql.mutation<CloseStashMutation, CloseStashMutationVariables>('CloseStash', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockStartWalletCreationMutation((req, res, ctx) => {
 *   const { startWalletCreationInput } = req.variables;
 *   return res(
 *     ctx.data({ startWalletCreation })
 *   )
 * })
 */
export const mockStartWalletCreationMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<StartWalletCreationMutationVariables>,
    GraphQLContext<StartWalletCreationMutation>,
    any
  >
) =>
  graphql.mutation<StartWalletCreationMutation, StartWalletCreationMutationVariables>('StartWalletCreation', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCashbackRegisterUserMutation((req, res, ctx) => {
 *   return res(
 *     ctx.data({ cashbackRegisterUser })
 *   )
 * })
 */
export const mockCashbackRegisterUserMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<CashbackRegisterUserMutationVariables>,
    GraphQLContext<CashbackRegisterUserMutation>,
    any
  >
) =>
  graphql.mutation<CashbackRegisterUserMutation, CashbackRegisterUserMutationVariables>(
    'CashbackRegisterUser',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCashbackOnboardUserMutation((req, res, ctx) => {
 *   return res(
 *     ctx.data({ cashbackOnboardUser })
 *   )
 * })
 */
export const mockCashbackOnboardUserMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<CashbackOnboardUserMutationVariables>,
    GraphQLContext<CashbackOnboardUserMutation>,
    any
  >
) =>
  graphql.mutation<CashbackOnboardUserMutation, CashbackOnboardUserMutationVariables>('CashbackOnboardUser', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCashbackEnrolCardMutation((req, res, ctx) => {
 *   const { enrolCard } = req.variables;
 *   return res(
 *     ctx.data({ cashbackEnrolCard })
 *   )
 * })
 */
export const mockCashbackEnrolCardMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<CashbackEnrolCardMutationVariables>,
    GraphQLContext<CashbackEnrolCardMutation>,
    any
  >
) => graphql.mutation<CashbackEnrolCardMutation, CashbackEnrolCardMutationVariables>('CashbackEnrolCard', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCashbackDeleteCardMutation((req, res, ctx) => {
 *   const { deleteCard } = req.variables;
 *   return res(
 *     ctx.data({ cashbackDeleteCard })
 *   )
 * })
 */
export const mockCashbackDeleteCardMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<CashbackDeleteCardMutationVariables>,
    GraphQLContext<CashbackDeleteCardMutation>,
    any
  >
) => graphql.mutation<CashbackDeleteCardMutation, CashbackDeleteCardMutationVariables>('CashbackDeleteCard', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCashbackUpdateBankDetailsMutation((req, res, ctx) => {
 *   const { bankDetails } = req.variables;
 *   return res(
 *     ctx.data({ cashbackUpdateBankDetails })
 *   )
 * })
 */
export const mockCashbackUpdateBankDetailsMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<CashbackUpdateBankDetailsMutationVariables>,
    GraphQLContext<CashbackUpdateBankDetailsMutation>,
    any
  >
) =>
  graphql.mutation<CashbackUpdateBankDetailsMutation, CashbackUpdateBankDetailsMutationVariables>(
    'CashbackUpdateBankDetails',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCashbackAcceptTermsAndConditionsMutation((req, res, ctx) => {
 *   return res(
 *     ctx.data({ cashbackAcceptTermsAndConditions })
 *   )
 * })
 */
export const mockCashbackAcceptTermsAndConditionsMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<CashbackAcceptTermsAndConditionsMutationVariables>,
    GraphQLContext<CashbackAcceptTermsAndConditionsMutation>,
    any
  >
) =>
  graphql.mutation<CashbackAcceptTermsAndConditionsMutation, CashbackAcceptTermsAndConditionsMutationVariables>(
    'CashbackAcceptTermsAndConditions',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdatePaymentPreferenceSettingsMutation((req, res, ctx) => {
 *   const { settings } = req.variables;
 *   return res(
 *     ctx.data({ updatePaymentPreferenceSettings })
 *   )
 * })
 */
export const mockUpdatePaymentPreferenceSettingsMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<UpdatePaymentPreferenceSettingsMutationVariables>,
    GraphQLContext<UpdatePaymentPreferenceSettingsMutation>,
    any
  >
) =>
  graphql.mutation<UpdatePaymentPreferenceSettingsMutation, UpdatePaymentPreferenceSettingsMutationVariables>(
    'UpdatePaymentPreferenceSettings',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockSeenPayWithHdCarouselMutation((req, res, ctx) => {
 *   return res(
 *     ctx.data({ seenPayWithHDCarousel })
 *   )
 * })
 */
export const mockSeenPayWithHdCarouselMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<SeenPayWithHdCarouselMutationVariables>,
    GraphQLContext<SeenPayWithHdCarouselMutation>,
    any
  >
) =>
  graphql.mutation<SeenPayWithHdCarouselMutation, SeenPayWithHdCarouselMutationVariables>(
    'SeenPayWithHDCarousel',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCashbackUpdateAutoEnrolMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ cashbackUpdateAutoEnrol })
 *   )
 * })
 */
export const mockCashbackUpdateAutoEnrolMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<CashbackUpdateAutoEnrolMutationVariables>,
    GraphQLContext<CashbackUpdateAutoEnrolMutation>,
    any
  >
) =>
  graphql.mutation<CashbackUpdateAutoEnrolMutation, CashbackUpdateAutoEnrolMutationVariables>(
    'CashbackUpdateAutoEnrol',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetGooglePlaceApiKeyQuery((req, res, ctx) => {
 *   const { platform } = req.variables;
 *   return res(
 *     ctx.data({ getGooglePlaceApiKey })
 *   )
 * })
 */
export const mockGetGooglePlaceApiKeyQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetGooglePlaceApiKeyQueryVariables>,
    GraphQLContext<GetGooglePlaceApiKeyQuery>,
    any
  >
) => graphql.query<GetGooglePlaceApiKeyQuery, GetGooglePlaceApiKeyQueryVariables>('GetGooglePlaceApiKey', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockMinSupportVersionQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ minSupportVersion })
 *   )
 * })
 */
export const mockMinSupportVersionQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<MinSupportVersionQueryVariables>,
    GraphQLContext<MinSupportVersionQuery>,
    any
  >
) => graphql.query<MinSupportVersionQuery, MinSupportVersionQueryVariables>('MinSupportVersion', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCurrentUserQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ currentUser })
 *   )
 * })
 */
export const mockCurrentUserQuery = (
  resolver: ResponseResolver<GraphQLRequest<CurrentUserQueryVariables>, GraphQLContext<CurrentUserQuery>, any>
) => graphql.query<CurrentUserQuery, CurrentUserQueryVariables>('CurrentUser', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockProfileQuery((req, res, ctx) => {
 *   const { ehToken, orgId } = req.variables;
 *   return res(
 *     ctx.data({ profile })
 *   )
 * })
 */
export const mockProfileQuery = (
  resolver: ResponseResolver<GraphQLRequest<ProfileQueryVariables>, GraphQLContext<ProfileQuery>, any>
) => graphql.query<ProfileQuery, ProfileQueryVariables>('Profile', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUserPermissionQuery((req, res, ctx) => {
 *   const { permissionRequest } = req.variables;
 *   return res(
 *     ctx.data({ userPermission })
 *   )
 * })
 */
export const mockUserPermissionQuery = (
  resolver: ResponseResolver<GraphQLRequest<UserPermissionQueryVariables>, GraphQLContext<UserPermissionQuery>, any>
) => graphql.query<UserPermissionQuery, UserPermissionQueryVariables>('UserPermission', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockProfileChangeRequestQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ profileChangeRequest })
 *   )
 * })
 */
export const mockProfileChangeRequestQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<ProfileChangeRequestQueryVariables>,
    GraphQLContext<ProfileChangeRequestQuery>,
    any
  >
) => graphql.query<ProfileChangeRequestQuery, ProfileChangeRequestQueryVariables>('ProfileChangeRequest', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetSpendAccountCarouselFinishedQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ getSpendAccountCarouselFinished })
 *   )
 * })
 */
export const mockGetSpendAccountCarouselFinishedQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetSpendAccountCarouselFinishedQueryVariables>,
    GraphQLContext<GetSpendAccountCarouselFinishedQuery>,
    any
  >
) =>
  graphql.query<GetSpendAccountCarouselFinishedQuery, GetSpendAccountCarouselFinishedQueryVariables>(
    'GetSpendAccountCarouselFinished',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetEhUserInitializationDetailsQuery((req, res, ctx) => {
 *   const { orgId, ehToken } = req.variables;
 *   return res(
 *     ctx.data({ getEHUserInitializationDetails })
 *   )
 * })
 */
export const mockGetEhUserInitializationDetailsQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetEhUserInitializationDetailsQueryVariables>,
    GraphQLContext<GetEhUserInitializationDetailsQuery>,
    any
  >
) =>
  graphql.query<GetEhUserInitializationDetailsQuery, GetEhUserInitializationDetailsQueryVariables>(
    'GetEHUserInitializationDetails',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetKpUserInitializationDetailsQuery((req, res, ctx) => {
 *   const { kpToken } = req.variables;
 *   return res(
 *     ctx.data({ getKPUserInitializationDetails })
 *   )
 * })
 */
export const mockGetKpUserInitializationDetailsQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetKpUserInitializationDetailsQueryVariables>,
    GraphQLContext<GetKpUserInitializationDetailsQuery>,
    any
  >
) =>
  graphql.query<GetKpUserInitializationDetailsQuery, GetKpUserInitializationDetailsQueryVariables>(
    'GetKPUserInitializationDetails',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockAllocationsQuery((req, res, ctx) => {
 *   const { ehToken } = req.variables;
 *   return res(
 *     ctx.data({ allocations })
 *   )
 * })
 */
export const mockAllocationsQuery = (
  resolver: ResponseResolver<GraphQLRequest<AllocationsQueryVariables>, GraphQLContext<AllocationsQuery>, any>
) => graphql.query<AllocationsQuery, AllocationsQueryVariables>('Allocations', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockBankAccountQuery((req, res, ctx) => {
 *   const { ehToken, membership } = req.variables;
 *   return res(
 *     ctx.data({ bankAccount })
 *   )
 * })
 */
export const mockBankAccountQuery = (
  resolver: ResponseResolver<GraphQLRequest<BankAccountQueryVariables>, GraphQLContext<BankAccountQuery>, any>
) => graphql.query<BankAccountQuery, BankAccountQueryVariables>('BankAccount', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetPayAccountQuery((req, res, ctx) => {
 *   const { ehToken, orgId, memberId } = req.variables;
 *   return res(
 *     ctx.data({ getPayAccount })
 *   )
 * })
 */
export const mockGetPayAccountQuery = (
  resolver: ResponseResolver<GraphQLRequest<GetPayAccountQueryVariables>, GraphQLContext<GetPayAccountQuery>, any>
) => graphql.query<GetPayAccountQuery, GetPayAccountQueryVariables>('GetPayAccount', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockInstapayBankAccountsQuery((req, res, ctx) => {
 *   const { ehToken, membership } = req.variables;
 *   return res(
 *     ctx.data({ instapayBankAccounts })
 *   )
 * })
 */
export const mockInstapayBankAccountsQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<InstapayBankAccountsQueryVariables>,
    GraphQLContext<InstapayBankAccountsQuery>,
    any
  >
) => graphql.query<InstapayBankAccountsQuery, InstapayBankAccountsQueryVariables>('InstapayBankAccounts', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockInstapayFeeQuery((req, res, ctx) => {
 *   const { bsb } = req.variables;
 *   return res(
 *     ctx.data({ instapayFee })
 *   )
 * })
 */
export const mockInstapayFeeQuery = (
  resolver: ResponseResolver<GraphQLRequest<InstapayFeeQueryVariables>, GraphQLContext<InstapayFeeQuery>, any>
) => graphql.query<InstapayFeeQuery, InstapayFeeQueryVariables>('InstapayFee', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockInstapayHistoryQuery((req, res, ctx) => {
 *   const { ehToken } = req.variables;
 *   return res(
 *     ctx.data({ instapayHistory })
 *   )
 * })
 */
export const mockInstapayHistoryQuery = (
  resolver: ResponseResolver<GraphQLRequest<InstapayHistoryQueryVariables>, GraphQLContext<InstapayHistoryQuery>, any>
) => graphql.query<InstapayHistoryQuery, InstapayHistoryQueryVariables>('InstapayHistory', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockInstapayHistoryV2Query((req, res, ctx) => {
 *   const { ehToken } = req.variables;
 *   return res(
 *     ctx.data({ instapayHistoryV2 })
 *   )
 * })
 */
export const mockInstapayHistoryV2Query = (
  resolver: ResponseResolver<
    GraphQLRequest<InstapayHistoryV2QueryVariables>,
    GraphQLContext<InstapayHistoryV2Query>,
    any
  >
) => graphql.query<InstapayHistoryV2Query, InstapayHistoryV2QueryVariables>('InstapayHistoryV2', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockInstapayInfoQuery((req, res, ctx) => {
 *   const { ehToken } = req.variables;
 *   return res(
 *     ctx.data({ instapayInfo })
 *   )
 * })
 */
export const mockInstapayInfoQuery = (
  resolver: ResponseResolver<GraphQLRequest<InstapayInfoQueryVariables>, GraphQLContext<InstapayInfoQuery>, any>
) => graphql.query<InstapayInfoQuery, InstapayInfoQueryVariables>('InstapayInfo', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockInstapayUsageVerificationQuery((req, res, ctx) => {
 *   const { ehToken } = req.variables;
 *   return res(
 *     ctx.data({ instapayUsageVerification })
 *   )
 * })
 */
export const mockInstapayUsageVerificationQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<InstapayUsageVerificationQueryVariables>,
    GraphQLContext<InstapayUsageVerificationQuery>,
    any
  >
) =>
  graphql.query<InstapayUsageVerificationQuery, InstapayUsageVerificationQueryVariables>(
    'InstapayUsageVerification',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockMembershipsQuery((req, res, ctx) => {
 *   const { ehToken } = req.variables;
 *   return res(
 *     ctx.data({ memberships })
 *   )
 * })
 */
export const mockMembershipsQuery = (
  resolver: ResponseResolver<GraphQLRequest<MembershipsQueryVariables>, GraphQLContext<MembershipsQuery>, any>
) => graphql.query<MembershipsQuery, MembershipsQueryVariables>('Memberships', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDiscountShopProductDetailQuery((req, res, ctx) => {
 *   const { ehToken, orgId, productCode } = req.variables;
 *   return res(
 *     ctx.data({ discountShopProductDetail })
 *   )
 * })
 */
export const mockDiscountShopProductDetailQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<DiscountShopProductDetailQueryVariables>,
    GraphQLContext<DiscountShopProductDetailQuery>,
    any
  >
) =>
  graphql.query<DiscountShopProductDetailQuery, DiscountShopProductDetailQueryVariables>(
    'DiscountShopProductDetail',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDiscountShopProductsQuery((req, res, ctx) => {
 *   const { ehToken, orgId, pageIndex, itemPerPage } = req.variables;
 *   return res(
 *     ctx.data({ discountShopProducts })
 *   )
 * })
 */
export const mockDiscountShopProductsQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<DiscountShopProductsQueryVariables>,
    GraphQLContext<DiscountShopProductsQuery>,
    any
  >
) => graphql.query<DiscountShopProductsQuery, DiscountShopProductsQueryVariables>('DiscountShopProducts', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDiscountOrderHistoryQuery((req, res, ctx) => {
 *   const { ehToken, orgId, pageIndex, itemPerPage } = req.variables;
 *   return res(
 *     ctx.data({ discountOrderHistory })
 *   )
 * })
 */
export const mockDiscountOrderHistoryQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<DiscountOrderHistoryQueryVariables>,
    GraphQLContext<DiscountOrderHistoryQuery>,
    any
  >
) => graphql.query<DiscountOrderHistoryQuery, DiscountOrderHistoryQueryVariables>('DiscountOrderHistory', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDiscountOrderDetailQuery((req, res, ctx) => {
 *   const { ehToken, orgId, orderId } = req.variables;
 *   return res(
 *     ctx.data({ discountOrderDetail })
 *   )
 * })
 */
export const mockDiscountOrderDetailQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<DiscountOrderDetailQueryVariables>,
    GraphQLContext<DiscountOrderDetailQuery>,
    any
  >
) => graphql.query<DiscountOrderDetailQuery, DiscountOrderDetailQueryVariables>('DiscountOrderDetail', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockPaymentClientTokenQuery((req, res, ctx) => {
 *   const { ehToken, orgId } = req.variables;
 *   return res(
 *     ctx.data({ paymentClientToken })
 *   )
 * })
 */
export const mockPaymentClientTokenQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<PaymentClientTokenQueryVariables>,
    GraphQLContext<PaymentClientTokenQuery>,
    any
  >
) => graphql.query<PaymentClientTokenQuery, PaymentClientTokenQueryVariables>('PaymentClientToken', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockPaymentVerifyCreditCardQuery((req, res, ctx) => {
 *   const { ehToken, orgId, nonce } = req.variables;
 *   return res(
 *     ctx.data({ paymentVerifyCreditCard })
 *   )
 * })
 */
export const mockPaymentVerifyCreditCardQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<PaymentVerifyCreditCardQueryVariables>,
    GraphQLContext<PaymentVerifyCreditCardQuery>,
    any
  >
) =>
  graphql.query<PaymentVerifyCreditCardQuery, PaymentVerifyCreditCardQueryVariables>(
    'PaymentVerifyCreditCard',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockPickForYouQuery((req, res, ctx) => {
 *   const { ehToken, orgId } = req.variables;
 *   return res(
 *     ctx.data({ pickForYou })
 *   )
 * })
 */
export const mockPickForYouQuery = (
  resolver: ResponseResolver<GraphQLRequest<PickForYouQueryVariables>, GraphQLContext<PickForYouQuery>, any>
) => graphql.query<PickForYouQuery, PickForYouQueryVariables>('PickForYou', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockPopularGiftCardsQuery((req, res, ctx) => {
 *   const { ehToken, orgId } = req.variables;
 *   return res(
 *     ctx.data({ popularGiftCards })
 *   )
 * })
 */
export const mockPopularGiftCardsQuery = (
  resolver: ResponseResolver<GraphQLRequest<PopularGiftCardsQueryVariables>, GraphQLContext<PopularGiftCardsQuery>, any>
) => graphql.query<PopularGiftCardsQuery, PopularGiftCardsQueryVariables>('PopularGiftCards', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockBuyAgainGiftCardsQuery((req, res, ctx) => {
 *   const { ehToken, orgId } = req.variables;
 *   return res(
 *     ctx.data({ buyAgainGiftCards })
 *   )
 * })
 */
export const mockBuyAgainGiftCardsQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<BuyAgainGiftCardsQueryVariables>,
    GraphQLContext<BuyAgainGiftCardsQuery>,
    any
  >
) => graphql.query<BuyAgainGiftCardsQuery, BuyAgainGiftCardsQueryVariables>('BuyAgainGiftCards', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockStripePublishableKeyQuery((req, res, ctx) => {
 *   const { ehToken, currency } = req.variables;
 *   return res(
 *     ctx.data({ stripePublishableKey })
 *   )
 * })
 */
export const mockStripePublishableKeyQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<StripePublishableKeyQueryVariables>,
    GraphQLContext<StripePublishableKeyQuery>,
    any
  >
) => graphql.query<StripePublishableKeyQuery, StripePublishableKeyQueryVariables>('StripePublishableKey', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockOnlineOffersQuery((req, res, ctx) => {
 *   const { pageIndex, itemPerPage, categoryId, searchTerm } = req.variables;
 *   return res(
 *     ctx.data({ onlineOffers })
 *   )
 * })
 */
export const mockOnlineOffersQuery = (
  resolver: ResponseResolver<GraphQLRequest<OnlineOffersQueryVariables>, GraphQLContext<OnlineOffersQuery>, any>
) => graphql.query<OnlineOffersQuery, OnlineOffersQueryVariables>('OnlineOffers', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockOnlineOfferDetailQuery((req, res, ctx) => {
 *   const { offerId } = req.variables;
 *   return res(
 *     ctx.data({ onlineOfferDetail })
 *   )
 * })
 */
export const mockOnlineOfferDetailQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<OnlineOfferDetailQueryVariables>,
    GraphQLContext<OnlineOfferDetailQuery>,
    any
  >
) => graphql.query<OnlineOfferDetailQuery, OnlineOfferDetailQueryVariables>('OnlineOfferDetail', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCashbackFeaturedOnlineOffersQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ cashbackFeaturedOnlineOffers })
 *   )
 * })
 */
export const mockCashbackFeaturedOnlineOffersQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<CashbackFeaturedOnlineOffersQueryVariables>,
    GraphQLContext<CashbackFeaturedOnlineOffersQuery>,
    any
  >
) =>
  graphql.query<CashbackFeaturedOnlineOffersQuery, CashbackFeaturedOnlineOffersQueryVariables>(
    'CashbackFeaturedOnlineOffers',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCashbackCategoriesQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ cashbackCategories })
 *   )
 * })
 */
export const mockCashbackCategoriesQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<CashbackCategoriesQueryVariables>,
    GraphQLContext<CashbackCategoriesQuery>,
    any
  >
) => graphql.query<CashbackCategoriesQuery, CashbackCategoriesQueryVariables>('CashbackCategories', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCashbackIntroductionContentQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ cashbackIntroductionContent })
 *   )
 * })
 */
export const mockCashbackIntroductionContentQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<CashbackIntroductionContentQueryVariables>,
    GraphQLContext<CashbackIntroductionContentQuery>,
    any
  >
) =>
  graphql.query<CashbackIntroductionContentQuery, CashbackIntroductionContentQueryVariables>(
    'CashbackIntroductionContent',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCashbackTermsAndConditionsQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ cashbackTermsAndConditions })
 *   )
 * })
 */
export const mockCashbackTermsAndConditionsQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<CashbackTermsAndConditionsQueryVariables>,
    GraphQLContext<CashbackTermsAndConditionsQuery>,
    any
  >
) =>
  graphql.query<CashbackTermsAndConditionsQuery, CashbackTermsAndConditionsQueryVariables>(
    'CashbackTermsAndConditions',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCashbackTermsAndConditionsAcceptanceQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ cashbackTermsAndConditionsAcceptance })
 *   )
 * })
 */
export const mockCashbackTermsAndConditionsAcceptanceQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<CashbackTermsAndConditionsAcceptanceQueryVariables>,
    GraphQLContext<CashbackTermsAndConditionsAcceptanceQuery>,
    any
  >
) =>
  graphql.query<CashbackTermsAndConditionsAcceptanceQuery, CashbackTermsAndConditionsAcceptanceQueryVariables>(
    'CashbackTermsAndConditionsAcceptance',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCashbackBanksQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ cashbackBanks })
 *   )
 * })
 */
export const mockCashbackBanksQuery = (
  resolver: ResponseResolver<GraphQLRequest<CashbackBanksQueryVariables>, GraphQLContext<CashbackBanksQuery>, any>
) => graphql.query<CashbackBanksQuery, CashbackBanksQueryVariables>('CashbackBanks', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCashbackLinkedCardsQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ cashbackLinkedCards })
 *   )
 * })
 */
export const mockCashbackLinkedCardsQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<CashbackLinkedCardsQueryVariables>,
    GraphQLContext<CashbackLinkedCardsQuery>,
    any
  >
) => graphql.query<CashbackLinkedCardsQuery, CashbackLinkedCardsQueryVariables>('CashbackLinkedCards', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCashbackUserTokenQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ cashbackUserToken })
 *   )
 * })
 */
export const mockCashbackUserTokenQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<CashbackUserTokenQueryVariables>,
    GraphQLContext<CashbackUserTokenQuery>,
    any
  >
) => graphql.query<CashbackUserTokenQuery, CashbackUserTokenQueryVariables>('CashbackUserToken', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCashbackTransactionsQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ cashbackTransactions })
 *   )
 * })
 */
export const mockCashbackTransactionsQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<CashbackTransactionsQueryVariables>,
    GraphQLContext<CashbackTransactionsQuery>,
    any
  >
) => graphql.query<CashbackTransactionsQuery, CashbackTransactionsQueryVariables>('CashbackTransactions', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCashbackTransactionsV2Query((req, res, ctx) => {
 *   return res(
 *     ctx.data({ cashbackTransactionsV2 })
 *   )
 * })
 */
export const mockCashbackTransactionsV2Query = (
  resolver: ResponseResolver<
    GraphQLRequest<CashbackTransactionsV2QueryVariables>,
    GraphQLContext<CashbackTransactionsV2Query>,
    any
  >
) =>
  graphql.query<CashbackTransactionsV2Query, CashbackTransactionsV2QueryVariables>('CashbackTransactionsV2', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCashbackOnboardStatusQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ cashbackOnboardStatus })
 *   )
 * })
 */
export const mockCashbackOnboardStatusQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<CashbackOnboardStatusQueryVariables>,
    GraphQLContext<CashbackOnboardStatusQuery>,
    any
  >
) => graphql.query<CashbackOnboardStatusQuery, CashbackOnboardStatusQueryVariables>('CashbackOnboardStatus', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCashbackEmploymentHeroProviderIdQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ cashbackEmploymentHeroProviderId })
 *   )
 * })
 */
export const mockCashbackEmploymentHeroProviderIdQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<CashbackEmploymentHeroProviderIdQueryVariables>,
    GraphQLContext<CashbackEmploymentHeroProviderIdQuery>,
    any
  >
) =>
  graphql.query<CashbackEmploymentHeroProviderIdQuery, CashbackEmploymentHeroProviderIdQueryVariables>(
    'CashbackEmploymentHeroProviderId',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCashbackUserBankQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ cashbackUserBank })
 *   )
 * })
 */
export const mockCashbackUserBankQuery = (
  resolver: ResponseResolver<GraphQLRequest<CashbackUserBankQueryVariables>, GraphQLContext<CashbackUserBankQuery>, any>
) => graphql.query<CashbackUserBankQuery, CashbackUserBankQueryVariables>('CashbackUserBank', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCashbackInStoreOffersQuery((req, res, ctx) => {
 *   const { pageIndex, itemPerPage, latitude, longitude, distance, searchTerm } = req.variables;
 *   return res(
 *     ctx.data({ cashbackInStoreOffers })
 *   )
 * })
 */
export const mockCashbackInStoreOffersQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<CashbackInStoreOffersQueryVariables>,
    GraphQLContext<CashbackInStoreOffersQuery>,
    any
  >
) => graphql.query<CashbackInStoreOffersQuery, CashbackInStoreOffersQueryVariables>('CashbackInStoreOffers', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCashbackInStoreOfferDetailQuery((req, res, ctx) => {
 *   const { offerId } = req.variables;
 *   return res(
 *     ctx.data({ cashbackInStoreOfferDetail })
 *   )
 * })
 */
export const mockCashbackInStoreOfferDetailQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<CashbackInStoreOfferDetailQueryVariables>,
    GraphQLContext<CashbackInStoreOfferDetailQuery>,
    any
  >
) =>
  graphql.query<CashbackInStoreOfferDetailQuery, CashbackInStoreOfferDetailQueryVariables>(
    'CashbackInStoreOfferDetail',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockEWalletQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ eWallet })
 *   )
 * })
 */
export const mockEWalletQuery = (
  resolver: ResponseResolver<GraphQLRequest<EWalletQueryVariables>, GraphQLContext<EWalletQuery>, any>
) => graphql.query<EWalletQuery, EWalletQueryVariables>('EWallet', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetCardDetailsQuery((req, res, ctx) => {
 *   const { id } = req.variables;
 *   return res(
 *     ctx.data({ getCardDetails })
 *   )
 * })
 */
export const mockGetCardDetailsQuery = (
  resolver: ResponseResolver<GraphQLRequest<GetCardDetailsQueryVariables>, GraphQLContext<GetCardDetailsQuery>, any>
) => graphql.query<GetCardDetailsQuery, GetCardDetailsQueryVariables>('GetCardDetails', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetCurrentCardDetailsQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ getCurrentCardDetails })
 *   )
 * })
 */
export const mockGetCurrentCardDetailsQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetCurrentCardDetailsQueryVariables>,
    GraphQLContext<GetCurrentCardDetailsQuery>,
    any
  >
) => graphql.query<GetCurrentCardDetailsQuery, GetCurrentCardDetailsQueryVariables>('GetCurrentCardDetails', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetCurrentCardMetaQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ getCurrentCardMeta })
 *   )
 * })
 */
export const mockGetCurrentCardMetaQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetCurrentCardMetaQueryVariables>,
    GraphQLContext<GetCurrentCardMetaQuery>,
    any
  >
) => graphql.query<GetCurrentCardMetaQuery, GetCurrentCardMetaQueryVariables>('GetCurrentCardMeta', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetOemProvisioningDataQuery((req, res, ctx) => {
 *   const { otp } = req.variables;
 *   return res(
 *     ctx.data({ getOemProvisioningData })
 *   )
 * })
 */
export const mockGetOemProvisioningDataQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetOemProvisioningDataQueryVariables>,
    GraphQLContext<GetOemProvisioningDataQuery>,
    any
  >
) =>
  graphql.query<GetOemProvisioningDataQuery, GetOemProvisioningDataQueryVariables>('GetOemProvisioningData', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetOemProvisioningDataWithoutOtpQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ getOemProvisioningDataWithoutOTP })
 *   )
 * })
 */
export const mockGetOemProvisioningDataWithoutOtpQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetOemProvisioningDataWithoutOtpQueryVariables>,
    GraphQLContext<GetOemProvisioningDataWithoutOtpQuery>,
    any
  >
) =>
  graphql.query<GetOemProvisioningDataWithoutOtpQuery, GetOemProvisioningDataWithoutOtpQueryVariables>(
    'GetOemProvisioningDataWithoutOTP',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetTransactionsQuery((req, res, ctx) => {
 *   const { limit, offset } = req.variables;
 *   return res(
 *     ctx.data({ getTransactions })
 *   )
 * })
 */
export const mockGetTransactionsQuery = (
  resolver: ResponseResolver<GraphQLRequest<GetTransactionsQueryVariables>, GraphQLContext<GetTransactionsQuery>, any>
) => graphql.query<GetTransactionsQuery, GetTransactionsQueryVariables>('GetTransactions', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetTransactionsV2Query((req, res, ctx) => {
 *   const { limit, offset } = req.variables;
 *   return res(
 *     ctx.data({ getTransactionsV2 })
 *   )
 * })
 */
export const mockGetTransactionsV2Query = (
  resolver: ResponseResolver<
    GraphQLRequest<GetTransactionsV2QueryVariables>,
    GraphQLContext<GetTransactionsV2Query>,
    any
  >
) => graphql.query<GetTransactionsV2Query, GetTransactionsV2QueryVariables>('GetTransactionsV2', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetPersistentNotificationsQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ getPersistentNotifications })
 *   )
 * })
 */
export const mockGetPersistentNotificationsQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetPersistentNotificationsQueryVariables>,
    GraphQLContext<GetPersistentNotificationsQuery>,
    any
  >
) =>
  graphql.query<GetPersistentNotificationsQuery, GetPersistentNotificationsQueryVariables>(
    'GetPersistentNotifications',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockEhCardBinRangeQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ ehCardBinRange })
 *   )
 * })
 */
export const mockEhCardBinRangeQuery = (
  resolver: ResponseResolver<GraphQLRequest<EhCardBinRangeQueryVariables>, GraphQLContext<EhCardBinRangeQuery>, any>
) => graphql.query<EhCardBinRangeQuery, EhCardBinRangeQueryVariables>('EhCardBinRange', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetIdvProfileQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ getIDVProfile })
 *   )
 * })
 */
export const mockGetIdvProfileQuery = (
  resolver: ResponseResolver<GraphQLRequest<GetIdvProfileQueryVariables>, GraphQLContext<GetIdvProfileQuery>, any>
) => graphql.query<GetIdvProfileQuery, GetIdvProfileQueryVariables>('GetIDVProfile', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetStashesQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ getStashes })
 *   )
 * })
 */
export const mockGetStashesQuery = (
  resolver: ResponseResolver<GraphQLRequest<GetStashesQueryVariables>, GraphQLContext<GetStashesQuery>, any>
) => graphql.query<GetStashesQuery, GetStashesQueryVariables>('GetStashes', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetStashMetaQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ getStashMeta })
 *   )
 * })
 */
export const mockGetStashMetaQuery = (
  resolver: ResponseResolver<GraphQLRequest<GetStashMetaQueryVariables>, GraphQLContext<GetStashMetaQuery>, any>
) => graphql.query<GetStashMetaQuery, GetStashMetaQueryVariables>('GetStashMeta', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetStashTransactionsQuery((req, res, ctx) => {
 *   const { stashId, limit, offset } = req.variables;
 *   return res(
 *     ctx.data({ getStashTransactions })
 *   )
 * })
 */
export const mockGetStashTransactionsQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetStashTransactionsQueryVariables>,
    GraphQLContext<GetStashTransactionsQuery>,
    any
  >
) => graphql.query<GetStashTransactionsQuery, GetStashTransactionsQueryVariables>('GetStashTransactions', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetUkTokenQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ getUKToken })
 *   )
 * })
 */
export const mockGetUkTokenQuery = (
  resolver: ResponseResolver<GraphQLRequest<GetUkTokenQueryVariables>, GraphQLContext<GetUkTokenQuery>, any>
) => graphql.query<GetUkTokenQuery, GetUkTokenQueryVariables>('GetUKToken', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockHeroDollarBalanceQuery((req, res, ctx) => {
 *   const { ehToken } = req.variables;
 *   return res(
 *     ctx.data({ heroDollarBalance })
 *   )
 * })
 */
export const mockHeroDollarBalanceQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<HeroDollarBalanceQueryVariables>,
    GraphQLContext<HeroDollarBalanceQuery>,
    any
  >
) => graphql.query<HeroDollarBalanceQuery, HeroDollarBalanceQueryVariables>('HeroDollarBalance', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockHeroDollarTransactionsQuery((req, res, ctx) => {
 *   const { ehToken, pageIndex, itemPerPage } = req.variables;
 *   return res(
 *     ctx.data({ heroDollarTransactions })
 *   )
 * })
 */
export const mockHeroDollarTransactionsQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<HeroDollarTransactionsQueryVariables>,
    GraphQLContext<HeroDollarTransactionsQuery>,
    any
  >
) =>
  graphql.query<HeroDollarTransactionsQuery, HeroDollarTransactionsQueryVariables>('HeroDollarTransactions', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockHeroDollarTransactionDetailQuery((req, res, ctx) => {
 *   const { ehToken, transactionId, clientType } = req.variables;
 *   return res(
 *     ctx.data({ heroDollarTransactionDetail })
 *   )
 * })
 */
export const mockHeroDollarTransactionDetailQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<HeroDollarTransactionDetailQueryVariables>,
    GraphQLContext<HeroDollarTransactionDetailQuery>,
    any
  >
) =>
  graphql.query<HeroDollarTransactionDetailQuery, HeroDollarTransactionDetailQueryVariables>(
    'HeroDollarTransactionDetail',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockHeroDollarRedemptionFeeQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ heroDollarRedemptionFee })
 *   )
 * })
 */
export const mockHeroDollarRedemptionFeeQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<HeroDollarRedemptionFeeQueryVariables>,
    GraphQLContext<HeroDollarRedemptionFeeQuery>,
    any
  >
) =>
  graphql.query<HeroDollarRedemptionFeeQuery, HeroDollarRedemptionFeeQueryVariables>(
    'HeroDollarRedemptionFee',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockPaymentPreferenceSettingsQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ paymentPreferenceSettings })
 *   )
 * })
 */
export const mockPaymentPreferenceSettingsQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<PaymentPreferenceSettingsQueryVariables>,
    GraphQLContext<PaymentPreferenceSettingsQuery>,
    any
  >
) =>
  graphql.query<PaymentPreferenceSettingsQuery, PaymentPreferenceSettingsQueryVariables>(
    'PaymentPreferenceSettings',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockPayWithHdCarouselSeenStatusQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ payWithHDCarouselSeenStatus })
 *   )
 * })
 */
export const mockPayWithHdCarouselSeenStatusQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<PayWithHdCarouselSeenStatusQueryVariables>,
    GraphQLContext<PayWithHdCarouselSeenStatusQuery>,
    any
  >
) =>
  graphql.query<PayWithHdCarouselSeenStatusQuery, PayWithHdCarouselSeenStatusQueryVariables>(
    'PayWithHDCarouselSeenStatus',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCashbackUserInfoQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ cashbackUserInfo })
 *   )
 * })
 */
export const mockCashbackUserInfoQuery = (
  resolver: ResponseResolver<GraphQLRequest<CashbackUserInfoQueryVariables>, GraphQLContext<CashbackUserInfoQuery>, any>
) => graphql.query<CashbackUserInfoQuery, CashbackUserInfoQueryVariables>('CashbackUserInfo', resolver);
