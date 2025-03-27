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
