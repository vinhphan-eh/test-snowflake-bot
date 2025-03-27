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
  CardExpiryDate: any;
  Date: string;
  Map: Record<string, unknown>;
  Timestamp: string;
};

export type AcceptEventInput = {
  accepted: Scalars['Boolean'];
  accepted_from: Scalars['String'];
  id: Scalars['ID'];
};

export type AcceptEventPayload = {
  __typename?: 'AcceptEventPayload';
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type ActiveSuperfundMembership = {
  __typename?: 'ActiveSuperfundMembership';
  abn: Scalars['String'];
  fundChoice: Scalars['String'];
  fundName: Scalars['String'];
  memberNumber: Scalars['String'];
  updatedAt: Scalars['Timestamp'];
  usi: Scalars['String'];
};

export type AddEventPayload = {
  __typename?: 'AddEventPayload';
  eventID: Scalars['ID'];
};

export type AddPreferInstapayOptionPayload = {
  __typename?: 'AddPreferInstapayOptionPayload';
  success: Scalars['Boolean'];
};

export type Address = {
  __typename?: 'Address';
  country: Scalars['String'];
  longForm: Scalars['String'];
  postcode: Scalars['String'];
  region: Scalars['String'];
  streetName?: Maybe<Scalars['String']>;
  streetNumber?: Maybe<Scalars['String']>;
  streetType?: Maybe<Scalars['String']>;
  townOrCity: Scalars['String'];
  unitNumber?: Maybe<Scalars['String']>;
};

export type AddressInput = {
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

export type Advertiser = {
  __typename?: 'Advertiser';
  advertiserAbout: Scalars['String'];
  advertiserId: Scalars['String'];
  advertiserName: Scalars['String'];
  id: Scalars['String'];
  offers: Array<OfferV2>;
  type: OfferType;
};

export type AdvertiserEdge = {
  __typename?: 'AdvertiserEdge';
  node: Advertiser;
};

export type AllAdvertisers = {
  __typename?: 'AllAdvertisers';
  edges: Array<AdvertiserEdge>;
  error?: Maybe<AllAdvertisersError>;
  pageInfo: PageInfo;
};

export type AllAdvertisersError = GenericError | InStoreRequireLatLong;

export type AllAdvertisersInput = {
  after?: InputMaybe<Scalars['String']>;
  categoryCode?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  query?: InputMaybe<Scalars['String']>;
  range?: InputMaybe<Scalars['Float']>;
  type?: InputMaybe<OfferType>;
};

export type AllOffer = InStoreOffer | OnlineOffer;

export type AllOfferEdge = {
  __typename?: 'AllOfferEdge';
  node: AllOffer;
};

export type AllOffers = {
  __typename?: 'AllOffers';
  edges: Array<AllOfferEdge>;
  error?: Maybe<AllOffersError>;
  pageInfo: PageInfo;
};

export type AllOffersError = GenericError | InStoreRequireLatLong;

export type AllOffersInput = {
  after?: InputMaybe<Scalars['String']>;
  categoryCode?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  query?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<OfferType>;
};

export type AuPayeeAddress = {
  accountName: Scalars['String'];
  accountNumber: Scalars['String'];
  bsb: Scalars['String'];
  friendlyName: Scalars['String'];
};

export type AuPaymentRecipient = {
  __typename?: 'AuPaymentRecipient';
  accountName: Scalars['String'];
  accountNumber: Scalars['String'];
  bsb: Scalars['String'];
};

export type BsbTransferPayeeAddress = {
  __typename?: 'BSBTransferPayeeAddress';
  accountName: Scalars['String'];
  accountNumber: Scalars['String'];
  bsb: Scalars['String'];
  friendlyName: Scalars['String'];
};

export type BsbTransferPeerDetails = {
  __typename?: 'BSBTransferPeerDetails';
  accountNumber?: Maybe<Scalars['String']>;
  bsb?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type BankAccountDetails = {
  __typename?: 'BankAccountDetails';
  accountName: Scalars['String'];
  accountNumber: Scalars['String'];
  amount: Scalars['String'];
  bsb: Scalars['String'];
};

export type BankAccountSsaInput = {
  id: Scalars['String'];
};

export type BankAccountSortCodeInput = {
  accountNumber: Scalars['String'];
  sortCode: Scalars['String'];
};

export type BeneficiaryInformation = {
  fullName: Scalars['String'];
};

export type Benefits = {
  __typename?: 'Benefits';
  categories: Array<Category>;
};

export type BenefitsMinSupportVersion = {
  __typename?: 'BenefitsMinSupportVersion';
  minSupportAppVersion: Scalars['String'];
};

export type BillManagement = {
  __typename?: 'BillManagement';
  ahmAccessToken?: Maybe<Scalars['String']>;
  homeTiles: HomeTiles;
  isEligibleForPromotion?: Maybe<Scalars['Boolean']>;
  offer?: Maybe<BmOffer>;
  offerV2?: Maybe<BmOffer>;
  offers: Array<BmOffer>;
  offersV2: BmOffers;
  offersV3: BmOffers;
  promotion?: Maybe<Promotion>;
  providers: Providers;
  subscription?: Maybe<Subscription>;
  subscriptions: Subscriptions;
};

export type BillManagementIsEligibleForPromotionArgs = {
  input?: InputMaybe<EligibleForPromotionInput>;
};

export type BillManagementOfferArgs = {
  input: OfferInput;
};

export type BillManagementOfferV2Args = {
  input: OfferInput;
};

export type BillManagementOffersV2Args = {
  input?: InputMaybe<BmOfferInput>;
};

export type BillManagementOffersV3Args = {
  input?: InputMaybe<BmOfferInput>;
};

export type BillManagementProvidersArgs = {
  input?: InputMaybe<ProvidersInput>;
};

export type BillManagementSubscriptionArgs = {
  input: SubscriptionInput;
};

export type BillManagementSubscriptionsArgs = {
  input?: InputMaybe<SubscriptionsInput>;
};

export enum BillStatus {
  Due = 'Due',
  Overdue = 'Overdue',
  Paid = 'Paid',
  Unknown = 'Unknown',
}

export type BillTransaction = TransactionBase & {
  __typename?: 'BillTransaction';
  amount: CurrencyAmount;
  createdAt: Scalars['Timestamp'];
  dateFrom: Scalars['Date'];
  dateTo: Scalars['Date'];
  dueDate: Scalars['Date'];
  id: Scalars['String'];
  issueDate: Scalars['Date'];
  status: BillStatus;
  transactionDate: Scalars['Date'];
  type: TxnType;
};

export type BlockUnblockCardInput = {
  cardId: Scalars['ID'];
};

export type BmOffer = {
  __typename?: 'BmOffer';
  about: Scalars['String'];
  /** @deprecated No longer supported */
  canSignUp?: Maybe<Scalars['Boolean']>;
  categoryCode: Scalars['String'];
  description: Scalars['String'];
  estBillAmount: CurrencyAmount;
  howItWorks: Scalars['String'];
  id: Scalars['ID'];
  imageUrl: Scalars['String'];
  logoUrl: Scalars['String'];
  paidAmount: CurrencyAmount;
  provider: Provider;
  /** @deprecated No longer supported */
  registrationStatus?: Maybe<BmOfferRegistrationStatus>;
  reminder?: Maybe<Reminder>;
  savingPercentage: Scalars['Int'];
  signUpLink: Scalars['String'];
  stateBasedOffers?: Maybe<Array<StateBasedOffer>>;
  /** @deprecated No longer supported */
  termsAndCondition?: Maybe<Scalars['String']>;
  termsAndConditions: Scalars['String'];
  title: Scalars['String'];
};

export type BmOfferEdge = {
  __typename?: 'BmOfferEdge';
  node: BmOffer;
};

export type BmOfferInput = {
  after?: InputMaybe<Scalars['String']>;
  categoryCode?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
};

export enum BmOfferRegistrationStatus {
  InProgress = 'IN_PROGRESS',
  NotStarted = 'NOT_STARTED',
  Success = 'SUCCESS',
}

export type BmOffers = {
  __typename?: 'BmOffers';
  edges: Array<BmOfferEdge>;
  error?: Maybe<GenericError>;
  pageInfo: PageInfo;
};

export type BmSubmitSubscriptionPayload = {
  __typename?: 'BmSubmitSubscriptionPayload';
  success: Scalars['Boolean'];
};

export type BsJoinWaitListInput = {
  isAcceptConsentMarketing: Scalars['Boolean'];
};

export type BsJoinWaitListPayload = {
  __typename?: 'BsJoinWaitListPayload';
  /** @deprecated No longer supported */
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type BsSubmitSubscriptionInput = {
  isHPPromoEligible?: InputMaybe<Scalars['Boolean']>;
  providerId: Pid;
};

export type BsUpdateViewIntroductionPayload = {
  __typename?: 'BsUpdateViewIntroductionPayload';
  /** @deprecated No longer supported */
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type BuyAgainGiftCardEdge = {
  __typename?: 'BuyAgainGiftCardEdge';
  cursor: Scalars['String'];
  node: Product;
};

export type BuyAgainGiftCards = {
  __typename?: 'BuyAgainGiftCards';
  edges: Array<BuyAgainGiftCardEdge>;
  error?: Maybe<GenericError>;
  pageInfo: PageInfo;
};

export type CancelInstaPayDailySubscriptionInput = {
  cancelNote: Scalars['String'];
  orgId: Scalars['ID'];
};

export type CancelInstaPayDailySubscriptionPayload = {
  __typename?: 'CancelInstaPayDailySubscriptionPayload';
  subscription?: Maybe<DailypaySubscription>;
  success: Scalars['Boolean'];
};

export type CancelRecurringByDayInput = {
  orgId: Scalars['String'];
};

export type CancelRecurringByDayPayload = {
  __typename?: 'CancelRecurringByDayPayload';
  subscription?: Maybe<RecurringByDaySubscription>;
  success: Scalars['Boolean'];
};

export type CancelRecurringByDayResult = CancelRecurringByDayPayload | InstapayError;

export type CancelSchedulingSubscriptionInput = {
  id: Scalars['String'];
  orgId: Scalars['String'];
};

export type Card = {
  __typename?: 'Card';
  details?: Maybe<CardDetails>;
  meta?: Maybe<CardMeta>;
  oemProvisioning?: Maybe<OemProvisioning>;
};

export type CardActivateMutationPayload = {
  __typename?: 'CardActivateMutationPayload';
  success: Scalars['Boolean'];
};

export type CardCreateMutationPayload = {
  __typename?: 'CardCreateMutationPayload';
  success: Scalars['Boolean'];
};

export type CardDetails = {
  __typename?: 'CardDetails';
  id: Scalars['ID'];
  status: CardStatus;
};

export type CardMeta = {
  __typename?: 'CardMeta';
  contactless?: Maybe<Scalars['Boolean']>;
  digitalWalletDetails?: Maybe<DigitalWalletDetails>;
  frozen?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  magStrip?: Maybe<Scalars['Boolean']>;
  mobileWalletPaymentEnabled?: Maybe<Scalars['Boolean']>;
};

export type CardMetaInput = {
  contactless?: InputMaybe<Scalars['Boolean']>;
  frozen?: InputMaybe<Scalars['Boolean']>;
  magStrip?: InputMaybe<Scalars['Boolean']>;
  mobileWalletPaymentEnabled?: InputMaybe<Scalars['Boolean']>;
};

export type CardMutation = {
  __typename?: 'CardMutation';
  activate?: Maybe<CardActivateMutationPayload>;
  create?: Maybe<CardCreateMutationPayload>;
  requestNewCard?: Maybe<CardRequestNewMutationPayload>;
  updateMeta?: Maybe<CardUpdateMetaMutationPayload>;
  updatePin?: Maybe<CardUpdatePinMutationPayload>;
};

export type CardMutationCreateArgs = {
  input: CreateCardInput;
};

export type CardMutationRequestNewCardArgs = {
  input: RequestNewCardInput;
};

export type CardMutationUpdateMetaArgs = {
  input: CardMetaInput;
};

export type CardMutationUpdatePinArgs = {
  input: Scalars['String'];
};

export type CardRequestNewMutationPayload = {
  __typename?: 'CardRequestNewMutationPayload';
  success: Scalars['Boolean'];
};

export enum CardStatus {
  Active = 'ACTIVE',
  AwaitingActivation = 'AWAITING_ACTIVATION',
  Blocked = 'BLOCKED',
  Expired = 'EXPIRED',
  Inactive = 'INACTIVE',
}

export type CardUpdateMetaMutationPayload = {
  __typename?: 'CardUpdateMetaMutationPayload';
  success: Scalars['Boolean'];
};

export type CardUpdatePinMutationPayload = {
  __typename?: 'CardUpdatePinMutationPayload';
  success: Scalars['Boolean'];
};

export type Cashback = {
  __typename?: 'Cashback';
  allAdvertisers: AllAdvertisers;
  allOffers: AllOffers;
  banks?: Maybe<CashbackBanks>;
  cashbackUserInfo: CashbackUserInfo;
  cashbackUserToken: CashbackUserToken;
  categories: Array<Category>;
  ehProviderId: EhProviderId;
  featuresOffers: FeatureOffers;
  inStoreOfferById?: Maybe<InStoreOffer>;
  inStoreOffers: InStoreOffers;
  instoreOffersByAdvertiserId: InstoreOffersV2;
  linkedCards: LinkedCards;
  onboardStatus: OnboardStatus;
  onlineOfferById?: Maybe<OnlineOffer>;
  onlineOffers: OnlineOffers;
  termsAndConditions: CashbackTermsAndConditions;
  termsAndConditionsAcceptance: CashbackTermsAndConditionsAcceptance;
  transactionsV2: CashbackTransactionsV2;
  userBankDetails?: Maybe<UserBankDetails>;
};

export type CashbackAllAdvertisersArgs = {
  input?: InputMaybe<AllAdvertisersInput>;
};

export type CashbackAllOffersArgs = {
  input?: InputMaybe<AllOffersInput>;
};

export type CashbackFeaturesOffersArgs = {
  input?: InputMaybe<FeaturesOffersInput>;
};

export type CashbackInStoreOfferByIdArgs = {
  id: Scalars['ID'];
};

export type CashbackInStoreOffersArgs = {
  input?: InputMaybe<InStoreOffersInput>;
};

export type CashbackInstoreOffersByAdvertiserIdArgs = {
  id: Scalars['ID'];
};

export type CashbackOnlineOfferByIdArgs = {
  id: Scalars['ID'];
};

export type CashbackOnlineOffersArgs = {
  input?: InputMaybe<OnlineOffersInput>;
};

export type CashbackTransactionsV2Args = {
  input?: InputMaybe<CashbackTransactionsV2Input>;
};

export type CashbackAcceptTncPayload = {
  __typename?: 'CashbackAcceptTncPayload';
  success: Scalars['Boolean'];
};

export enum CashbackAutoEnrolStatus {
  Failed = 'Failed',
  Success = 'Success',
  Unknown = 'Unknown',
}

export type CashbackBank = {
  __typename?: 'CashbackBank';
  id: Scalars['Int'];
  name: Scalars['String'];
  region: Scalars['String'];
};

export type CashbackBankEdge = {
  __typename?: 'CashbackBankEdge';
  node: CashbackBank;
};

export enum CashbackBankLinkedStatus {
  Failed = 'Failed',
  Success = 'Success',
  Unknown = 'Unknown',
}

export type CashbackBanks = {
  __typename?: 'CashbackBanks';
  edges: Array<CashbackBankEdge>;
  error?: Maybe<GenericError>;
  pageInfo: PageInfo;
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

export type CashbackDeleteCardInput = {
  cardId: Scalars['Int'];
};

export type CashbackDeleteCardPayload = {
  __typename?: 'CashbackDeleteCardPayload';
  success: Scalars['Boolean'];
};

export type CashbackMutation = {
  __typename?: 'CashbackMutation';
  acceptTnc?: Maybe<CashbackAcceptTncPayload>;
  deleteCard?: Maybe<CashbackDeleteCardPayload>;
  onboardUser?: Maybe<OnboardUserPayload>;
  updateAutoEnrolment?: Maybe<UpdateAutoEnrolmentPayload>;
  updateBankDetails?: Maybe<UpdateBankDetailsPayload>;
  updateBankLinkedStatus?: Maybe<UpdateBankLinkedStatusPayload>;
};

export type CashbackMutationDeleteCardArgs = {
  deleteCard: CashbackDeleteCardInput;
};

export type CashbackMutationUpdateAutoEnrolmentArgs = {
  updateAutoEnrolment: UpdateAutoEnrolmentInput;
};

export type CashbackMutationUpdateBankDetailsArgs = {
  updateBankDetails: UpdateBankDetailsInput;
};

export type CashbackMutationUpdateBankLinkedStatusArgs = {
  updateBankLinkedStatus: UpdateBankLinkedStatusInput;
};

export type CashbackTermsAndConditions = {
  __typename?: 'CashbackTermsAndConditions';
  error?: Maybe<GenericError>;
  items?: Maybe<Array<CashbackTermsAndConditionsItem>>;
};

export type CashbackTermsAndConditionsAcceptance = {
  __typename?: 'CashbackTermsAndConditionsAcceptance';
  error?: Maybe<GenericError>;
  isAccepted?: Maybe<Scalars['Boolean']>;
};

export type CashbackTermsAndConditionsItem = {
  __typename?: 'CashbackTermsAndConditionsItem';
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
  fee: Scalars['Float'];
  id: Scalars['Int'];
  imageUrl: Scalars['String'];
  meta?: Maybe<TransactionMeta>;
  offerId: Scalars['Int'];
  purchaseAmount?: Maybe<Scalars['Float']>;
  recordType: TransactionRecordType;
  state: TransactionState;
  title: Scalars['String'];
  transactionId: Scalars['String'];
};

export type CashbackTransactionEdge = {
  __typename?: 'CashbackTransactionEdge';
  node: CashbackTransaction;
};

export type CashbackTransactionsV2 = {
  __typename?: 'CashbackTransactionsV2';
  confirmed: Scalars['Float'];
  edges: Array<CashbackTransactionEdge>;
  error?: Maybe<GenericError>;
  pageInfo: PageInfo;
  pending: Scalars['Float'];
  total: Scalars['Float'];
};

export type CashbackTransactionsV2Input = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};

export type CashbackUserInfo = {
  __typename?: 'CashbackUserInfo';
  autoEnrolMessage?: Maybe<Scalars['String']>;
  autoEnrolStatus: CashbackAutoEnrolStatus;
  bankLinkedMessage?: Maybe<Scalars['String']>;
  bankLinkedStatus?: Maybe<CashbackBankLinkedStatus>;
  createdAt: Scalars['String'];
  error?: Maybe<GenericError>;
  updatedAt: Scalars['String'];
};

export type CashbackUserToken = {
  __typename?: 'CashbackUserToken';
  error?: Maybe<GenericError>;
  key: Scalars['String'];
  token: Scalars['String'];
};

export type Category = {
  __typename?: 'Category';
  categoryCode: Scalars['String'];
  imageUrl: Scalars['String'];
  name: Scalars['String'];
};

export enum CategoryAction {
  Chosen = 'CHOSEN',
  NotShown = 'NOT_SHOWN',
  Skipped = 'SKIPPED',
  Unspecified = 'UNSPECIFIED',
}

export type CommonAddress = {
  __typename?: 'CommonAddress';
  country: Scalars['String'];
  longForm: Scalars['String'];
  postcode: Scalars['String'];
  region: Scalars['String'];
  streetName?: Maybe<Scalars['String']>;
  streetNumber?: Maybe<Scalars['String']>;
  streetType?: Maybe<Scalars['String']>;
  townOrCity: Scalars['String'];
  unitNumber?: Maybe<Scalars['String']>;
};

export type CommonAddressInput = {
  country: Scalars['String'];
  longForm: Scalars['String'];
  postcode: Scalars['String'];
  region: Scalars['String'];
  streetName?: InputMaybe<Scalars['String']>;
  streetNumber?: InputMaybe<Scalars['String']>;
  streetType?: InputMaybe<Scalars['String']>;
  townOrCity: Scalars['String'];
  unitNumber?: InputMaybe<Scalars['String']>;
};

export type CommonSchedulingSubscriptionResult = InstapayError | SchedulingSubscriptionResult;

export enum CountryOfOrigin {
  Au = 'AU',
  Gb = 'GB',
}

export type CreateCardInput = {
  idempotencyKey: Scalars['String'];
  pin: Scalars['String'];
};

export type CreateComplaintTicketInput = {
  OSVersion: Scalars['String'];
  appVersion: Scalars['String'];
  country: Scalars['String'];
  description: Scalars['String'];
  deviceTypeModel: Scalars['String'];
  feature: Scalars['String'];
};

export type CreateComplaintTicketPayload = {
  __typename?: 'CreateComplaintTicketPayload';
  success: Scalars['Boolean'];
};

export type CreateConsentGroupAgreementInput = {
  consented: Scalars['Boolean'];
};

export type CreateDailypaySubscriptionInput = {
  orgId: Scalars['String'];
  previewBalanceId: Scalars['String'];
};

export type CreateDailypaySubscriptionPayload = {
  __typename?: 'CreateDailypaySubscriptionPayload';
  subscription?: Maybe<DailypaySubscription>;
  success: Scalars['Boolean'];
};

export type CreateSsaComplaintTicketInput = {
  OSVersion: Scalars['String'];
  appVersion: Scalars['String'];
  country: Scalars['String'];
  description: Scalars['String'];
  deviceTypeModel: Scalars['String'];
};

export type CreateSsaComplaintTicketPayload = {
  __typename?: 'CreateSSAComplaintTicketPayload';
  success: Scalars['Boolean'];
};

export type CreateScheduledPaymentInput = {
  accountName: Scalars['String'];
  accountNumber: Scalars['String'];
  amount: MoneyInput;
  bsb: Scalars['String'];
  description: Scalars['String'];
  endDate?: InputMaybe<Scalars['Date']>;
  frequency?: InputMaybe<ScheduledPaymentFrequency>;
  numberOfPayments?: InputMaybe<Scalars['Int']>;
  reference?: InputMaybe<Scalars['String']>;
  senderName?: InputMaybe<Scalars['String']>;
  startDate: Scalars['Date'];
  type: ScheduledPaymentType;
};

export type CreateScheduledPaymentPayload = {
  __typename?: 'CreateScheduledPaymentPayload';
  outcome?: Maybe<ScheduledPaymentSaveOutcomeType>;
  payment?: Maybe<ScheduledPaymentSaveResponseDetails>;
};

export type CreateSchedulingSubscriptionInput = {
  amount: MoneyV2Input;
  bankAccountExternalId: Scalars['String'];
  feePromotionApplied?: InputMaybe<Scalars['Boolean']>;
  orgId: Scalars['String'];
  plan: SchedulingSubscriptionPlan;
};

export type CreateStashInput = {
  imageUrl?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  targetAmount?: InputMaybe<MoneyV2Input>;
};

export type CreateStripeClientTokenInput = {
  amount: Scalars['String'];
  currency: Scalars['String'];
  ehToken: Scalars['String'];
  idempotencyKey?: InputMaybe<Scalars['String']>;
  orgId: Scalars['String'];
};

export type CreateSuperConsolidationInput = {
  fundName?: InputMaybe<Scalars['String']>;
  memberNumber: Scalars['String'];
  usi: Scalars['String'];
};

export type CreateSuperConsolidationPayload = {
  __typename?: 'CreateSuperConsolidationPayload';
  consolidation?: Maybe<SuperConsolidation>;
};

export type CreateSuperConsolidationRequestSupportPayload = {
  __typename?: 'CreateSuperConsolidationRequestSupportPayload';
  consolidationRequestSupport?: Maybe<SuperConsolidationRequestSupport>;
};

export type CreateSwagSuperfundInput = {
  abn: Scalars['String'];
  fundChoice: Scalars['String'];
  fundName: Scalars['String'];
  memberNumber: Scalars['String'];
  usi: Scalars['String'];
};

export type CreateSwagSuperfundPayload = {
  __typename?: 'CreateSwagSuperfundPayload';
  superfund?: Maybe<SwagSuperfund>;
};

export type CreateTrackingPayload = {
  __typename?: 'CreateTrackingPayload';
  success: Scalars['Boolean'];
};

export type CreateUkCardInput = {
  billingAddress: UniversalAddressInput;
};

export type CreateUkCardPayload = {
  __typename?: 'CreateUKCardPayload';
  cardId: Scalars['String'];
  externalCardId: Scalars['String'];
};

export type CtaCaptions = {
  __typename?: 'CtaCaptions';
  agree: Scalars['String'];
  disagree: Scalars['String'];
};

export enum Currency {
  Aud = 'AUD',
  Gbp = 'GBP',
}

export type CurrencyAmount = {
  __typename?: 'CurrencyAmount';
  amount: Scalars['Float'];
  currency: Currency;
};

export enum CurrencyType {
  CurrencyTypeAud = 'CURRENCY_TYPE_AUD',
  CurrencyTypeGbp = 'CURRENCY_TYPE_GBP',
  CurrencyTypeUnspecified = 'CURRENCY_TYPE_UNSPECIFIED',
}

export type Dailypay = {
  __typename?: 'Dailypay';
  balance: InstapayBalanceResult;
  currentSubscription?: Maybe<DailypayCurrentSubscriptionResult>;
  subscriptionFee: DailypaySubscriptionFeeResult;
  summary: DailypaySummaryResult;
};

export type DailypayBalanceArgs = {
  preview?: InputMaybe<Scalars['Boolean']>;
};

export type DailypayCurrentSubscriptionResult = DailypaySubscription | InstapayError;

export type DailypayMutation = {
  __typename?: 'DailypayMutation';
  cancelInstaPayDailySubscription: CancelInstaPayDailySubscriptionPayload;
  createInstaPayDailySubscription: CreateDailypaySubscriptionPayload;
};

export type DailypayMutationCancelInstaPayDailySubscriptionArgs = {
  input: CancelInstaPayDailySubscriptionInput;
};

export type DailypayMutationCreateInstaPayDailySubscriptionArgs = {
  input: CreateDailypaySubscriptionInput;
};

export type DailypaySubscription = {
  __typename?: 'DailypaySubscription';
  currentPayPeriod?: Maybe<PayPeriod>;
  disabled?: Maybe<Scalars['Boolean']>;
  estimatedCancelAt?: Maybe<Scalars['Timestamp']>;
  estimatedEffectiveAt?: Maybe<Scalars['Timestamp']>;
  id: Scalars['ID'];
};

export type DailypaySubscriptionFee = {
  __typename?: 'DailypaySubscriptionFee';
  applicableFee: MoneyV2;
  discountCode?: Maybe<Scalars['String']>;
  originalFee: MoneyV2;
};

export type DailypaySubscriptionFeeResult = DailypaySubscriptionFee | InstapayError;

export type DailypaySummary = {
  __typename?: 'DailypaySummary';
  currentPayPeriod: PayPeriod;
  daysUntilNextPayPeriod: Scalars['Int'];
  success: Scalars['Boolean'];
  totalWithdrawnAmount: Money;
};

export type DailypaySummaryResult = DailypaySummary | InstapayError;

export type DepositToStashInput = {
  amount: MoneyV2Input;
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

export type DisableEarnedWageAccessFeaturesInput = {
  ehUserId?: InputMaybe<Scalars['String']>;
  kpUserId?: InputMaybe<Scalars['Int']>;
};

export type DisableEarnedWageAccessFeaturesPayload = {
  __typename?: 'DisableEarnedWageAccessFeaturesPayload';
  success: Scalars['Boolean'];
};

export type DisableEarnedWageAccessFeaturesResult = DisableEarnedWageAccessFeaturesPayload | InstapayError;

export type DiscountHistory = {
  __typename?: 'DiscountHistory';
  billableAmount: Scalars['Float'];
  createdAt: Scalars['Timestamp'];
  freightCost: Scalars['Float'];
  id: Scalars['String'];
  memberId: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  orderDetails: Array<OrderDetails>;
  status: OrderStatus;
  transactionFee: Scalars['Float'];
};

export type DiscountOrderHistory = {
  __typename?: 'DiscountOrderHistory';
  edges: Array<DiscountOrderHistoryEdge>;
  error?: Maybe<GenericError>;
  pageInfo: PageInfo;
};

export type DiscountOrderHistoryEdge = {
  __typename?: 'DiscountOrderHistoryEdge';
  node: DiscountHistory;
};

export type DiscountOrderHistoryInput = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  orgId: Scalars['String'];
};

export type DiscountShopProductDetailsInput = {
  orgId: Scalars['String'];
  productCode: Scalars['String'];
};

export type DrawdownInput = {
  amount: MoneyInput;
  balanceId: Scalars['String'];
  bankAccountId: Scalars['String'];
  ehMemberId?: InputMaybe<Scalars['String']>;
  kpBusinessId?: InputMaybe<Scalars['Int']>;
  kpEmployeeId?: InputMaybe<Scalars['Int']>;
};

export type DrawdownPayload = {
  __typename?: 'DrawdownPayload';
  messageCode?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  transactionId?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['Int']>;
};

export type EwaPushNotification = {
  __typename?: 'EWAPushNotification';
  optInStatusByFeature: EwaPushNotificationOptInStatusByFeatureResult;
  optInStatusByType: EwaPushNotificationOptInStatusByTypeResult;
};

export type EwaPushNotificationOptInStatusByFeatureArgs = {
  feature: EwaPushNotificationFeature;
};

export type EwaPushNotificationOptInStatusByTypeArgs = {
  types: Array<EwaPushNotificationType>;
};

export enum EwaPushNotificationFeature {
  EwaRecurringByAmount = 'EWA_RECURRING_BY_AMOUNT',
  EwaRecurringByDay = 'EWA_RECURRING_BY_DAY',
}

export type EwaPushNotificationMutation = {
  __typename?: 'EWAPushNotificationMutation';
  optInByFeature?: Maybe<OptInEwaPushNotificationResult>;
  optInByType?: Maybe<OptInEwaPushNotificationResult>;
  optOutByFeature?: Maybe<OptOutEwaPushNotificationResult>;
  optOutByType?: Maybe<OptOutEwaPushNotificationResult>;
};

export type EwaPushNotificationMutationOptInByFeatureArgs = {
  input: OptInEwaPushNotificationByFeatureInput;
};

export type EwaPushNotificationMutationOptInByTypeArgs = {
  input: OptInEwaPushNotificationByTypeInput;
};

export type EwaPushNotificationMutationOptOutByFeatureArgs = {
  input: OptOutEwaPushNotificationByFeatureInput;
};

export type EwaPushNotificationMutationOptOutByTypeArgs = {
  input: OptOutEwaPushNotificationByTypeInput;
};

export type EwaPushNotificationOptInStatusByFeature = {
  __typename?: 'EWAPushNotificationOptInStatusByFeature';
  featureLevelOptedIn: Scalars['Boolean'];
  statuses: Array<EwaPushNotificationOptInStatusForSingleType>;
};

export type EwaPushNotificationOptInStatusByFeatureResult = EwaPushNotificationOptInStatusByFeature | InstapayError;

export type EwaPushNotificationOptInStatusByType = {
  __typename?: 'EWAPushNotificationOptInStatusByType';
  statuses: Array<EwaPushNotificationOptInStatusForSingleType>;
};

export type EwaPushNotificationOptInStatusByTypeResult = EwaPushNotificationOptInStatusByType | InstapayError;

export type EwaPushNotificationOptInStatusForSingleType = {
  __typename?: 'EWAPushNotificationOptInStatusForSingleType';
  optedIn: Scalars['Boolean'];
  type?: Maybe<EwaPushNotificationType>;
};

export enum EwaPushNotificationType {
  RecurringByAmountSuccessfulPayment = 'RECURRING_BY_AMOUNT_SUCCESSFUL_PAYMENT',
  RecurringByDayInsufficientBalance = 'RECURRING_BY_DAY_INSUFFICIENT_BALANCE',
  RecurringByDaySuccessfulPayment = 'RECURRING_BY_DAY_SUCCESSFUL_PAYMENT',
}

export type EhBinRange = {
  __typename?: 'EhBinRange';
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

export type EhProfilePatchInput = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  countryCode?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  stateCode?: InputMaybe<Scalars['String']>;
};

export type EhProviderId = {
  __typename?: 'EhProviderId';
  id: Scalars['String'];
};

export type EligibleForPromotionInput = {
  heroPointsFF?: InputMaybe<Scalars['Boolean']>;
  isCandidate?: InputMaybe<Scalars['Boolean']>;
};

export type Error = {
  message: Scalars['String'];
};

export type ErrorContext = InstapayBalanceErrorContext;

export type EstimatedIncomePayload = {
  __typename?: 'EstimatedIncomePayload';
  deductions?: Maybe<Array<Maybe<IncomeDeduction>>>;
  income: MoneyV2;
  payPeriod: PayPeriod;
};

export type EstimatedIncomeResult = EstimatedIncomePayload | InstapayError;

export type EventInput = {
  event: Scalars['String'];
  meta?: InputMaybe<Scalars['Map']>;
};

export enum EventLogKind {
  Instapay = 'INSTAPAY',
  Paysplit = 'PAYSPLIT',
}

export type EventLogPayloadTuple = {
  key: Scalars['String'];
  value: Scalars['String'];
};

export type EventMutation = {
  __typename?: 'EventMutation';
  accept?: Maybe<AcceptEventPayload>;
  createTracking?: Maybe<CreateTrackingPayload>;
};

export type EventMutationAcceptArgs = {
  input: AcceptEventInput;
};

export type EventMutationCreateTrackingArgs = {
  input: LifecycleTrackingInput;
};

export type Experiment = {
  __typename?: 'Experiment';
  instapayAds: InstapayAds;
  waitList: WaitList;
};

export type ExperimentWaitListArgs = {
  projectID: Scalars['ID'];
};

export type ExperimentMutation = {
  __typename?: 'ExperimentMutation';
  addEvent: AddEventPayload;
  subscribe: SubscribePayload;
};

export type ExperimentMutationAddEventArgs = {
  event: EventInput;
};

export type ExperimentMutationSubscribeArgs = {
  projectID: Scalars['ID'];
};

export type FastPaymentRecipientInput = {
  accountNumber: Scalars['String'];
  name: Scalars['String'];
  sortCode: Scalars['String'];
};

export type FasterPaymentsTransferPeerDetails = {
  __typename?: 'FasterPaymentsTransferPeerDetails';
  accountNumber?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  sortCode?: Maybe<Scalars['String']>;
};

export type FeatureOfferEdge = {
  __typename?: 'FeatureOfferEdge';
  node: OnlineOffer;
};

export type FeatureOffers = {
  __typename?: 'FeatureOffers';
  edges: Array<FeatureOfferEdge>;
  pageInfo: PageInfo;
};

export type FeatureVisibility = {
  __typename?: 'FeatureVisibility';
  instapayDaily?: Maybe<InstaPayDailyVisibility>;
  instapayNow?: Maybe<InstaPayNowVisibility>;
  instapayScheduling: InstapayFeaturePermissionResult;
  recurringByDay?: Maybe<RecurringByDayVisibility>;
  /** @deprecated Please use instapayNow instead */
  showInstapay: Scalars['Boolean'];
  /** @deprecated Please use instapayDaily instead */
  showInstapayDaily: Scalars['Boolean'];
};

export type FeaturesOffersInput = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};

export type Fee = {
  __typename?: 'Fee';
  percentage: Scalars['Float'];
  type: FeeType;
};

export enum FeeType {
  Percentage = 'PERCENTAGE',
}

export type FinancialTransaction = {
  __typename?: 'FinancialTransaction';
  cardId?: Maybe<Scalars['ID']>;
  currencyAmount: Money;
  dateTimeUTC: Scalars['Timestamp'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  merchant?: Maybe<TransactionMerchant>;
  pending?: Maybe<Scalars['Boolean']>;
  reference?: Maybe<Scalars['String']>;
  transferPeerDetails?: Maybe<TransferPeerDetails>;
  type: TransactionType;
};

export type FinancialTransactionState = {
  __typename?: 'FinancialTransactionState';
  state: UkTransactionState;
};

export type FloatAccountMutation = {
  __typename?: 'FloatAccountMutation';
  addBeneficiary: NewBeneficiaryPayload;
};

export type FloatAccountMutationAddBeneficiaryArgs = {
  beneficiary: NewBeneficiaryInput;
};

export type FundNotifyPreference = {
  __typename?: 'FundNotifyPreference';
  enabled: Scalars['Boolean'];
};

export type GenericError = Error & {
  __typename?: 'GenericError';
  message: Scalars['String'];
};

export type Geometry = {
  __typename?: 'Geometry';
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
};

export type GetEventsInput = {
  accepted?: InputMaybe<Scalars['Boolean']>;
  code?: InputMaybe<Scalars['String']>;
  delivery_status?: InputMaybe<Scalars['String']>;
  fund_usi?: InputMaybe<Scalars['String']>;
  items_per_page?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Scalars['String']>;
  order_direction?: InputMaybe<Scalars['String']>;
  page_index?: InputMaybe<Scalars['Int']>;
};

export type GetFundNotifyPreferenceInput = {
  event_type: Scalars['String'];
  fund_usi: Scalars['String'];
};

export type GetLocationByPlaceIdResponse = {
  __typename?: 'GetLocationByPlaceIdResponse';
  addressDetails?: Maybe<GoogleAddressDetails>;
};

export type GetLocationsRequest = {
  country?: InputMaybe<Scalars['String']>;
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  placeId?: InputMaybe<Scalars['String']>;
  postCode?: InputMaybe<Scalars['String']>;
  query?: InputMaybe<Scalars['String']>;
};

export type GetLocationsResponse = {
  __typename?: 'GetLocationsResponse';
  addresses?: Maybe<Array<Maybe<GoogleAddress>>>;
};

export type GetSchedulingSubscription = {
  __typename?: 'GetSchedulingSubscription';
  subscriptions: Array<Maybe<SchedulingSubscription>>;
};

export type GetSchedulingSubscriptionResult = GetSchedulingSubscription | InstapayError;

export type GoogleAddress = {
  __typename?: 'GoogleAddress';
  formattedAddress: Scalars['String'];
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  placeId?: Maybe<Scalars['String']>;
};

export type GoogleAddressDetails = {
  __typename?: 'GoogleAddressDetails';
  addressLine?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  formattedAddress?: Maybe<Scalars['String']>;
  geometry?: Maybe<Geometry>;
  postCode?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  streetName?: Maybe<Scalars['String']>;
  streetNumber?: Maybe<Scalars['String']>;
  streetType?: Maybe<Scalars['String']>;
  townOrCity?: Maybe<Scalars['String']>;
  unitNumber?: Maybe<Scalars['String']>;
};

export type Group = {
  __typename?: 'Group';
  groupMembership?: Maybe<GroupMembership>;
  waitList?: Maybe<GroupWaitList>;
};

export type GroupGroupMembershipArgs = {
  groupId: Scalars['String'];
};

export type GroupCategory = {
  __typename?: 'GroupCategory';
  createdAt: Scalars['Timestamp'];
  createdBy: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export type GroupDetail = {
  __typename?: 'GroupDetail';
  categories?: Maybe<Array<GroupCategory>>;
  categoriesIds?: Maybe<Array<Scalars['String']>>;
  countries?: Maybe<Array<Scalars['String']>>;
  description: Scalars['String'];
  howItWorks: Scalars['String'];
  id: Scalars['String'];
  imageSrc: Scalars['String'];
  memberCount: Scalars['Int'];
  promoTitle: Scalars['String'];
  savingPeriod: Scalars['String'];
  savingRange: Scalars['String'];
  shareContent: Scalars['String'];
  subtitle: Scalars['String'];
  title: Scalars['String'];
};

export type GroupMembership = {
  __typename?: 'GroupMembership';
  createdAt: Scalars['Timestamp'];
  groupId: Scalars['String'];
  id: Scalars['String'];
  position: Scalars['Int'];
  userId: Scalars['String'];
};

export type GroupMutation = {
  __typename?: 'GroupMutation';
  createConsentGroupAgreement?: Maybe<UserGroupConsent>;
  joinGroup?: Maybe<JoinGroupPayload>;
  joinWaitList?: Maybe<WaitListPayload>;
  updateUserCategoriesPreference?: Maybe<UpdateUserCategoriesPreferencePayload>;
};

export type GroupMutationCreateConsentGroupAgreementArgs = {
  input?: InputMaybe<CreateConsentGroupAgreementInput>;
};

export type GroupMutationJoinGroupArgs = {
  input?: InputMaybe<JoinGroupInput>;
};

export type GroupMutationJoinWaitListArgs = {
  input?: InputMaybe<JoinWaitListInput>;
};

export type GroupMutationUpdateUserCategoriesPreferenceArgs = {
  input?: InputMaybe<UpdateUserCategoriesPreferenceInput>;
};

export type GroupRoot = {
  __typename?: 'GroupRoot';
  categories?: Maybe<Array<Maybe<GroupCategory>>>;
  groupDetail?: Maybe<GroupDetail>;
  groups?: Maybe<Array<Maybe<GroupDetail>>>;
};

export type GroupRootGroupDetailArgs = {
  country?: InputMaybe<Scalars['String']>;
  groupId: Scalars['String'];
};

export type GroupRootGroupsArgs = {
  country?: InputMaybe<Scalars['String']>;
};

export type GroupWaitList = {
  __typename?: 'GroupWaitList';
  createdAt: Scalars['Timestamp'];
  userId: Scalars['String'];
};

export type HeroPoints = {
  __typename?: 'HeroPoints';
  balance: Scalars['Int'];
  payWithHPCarouselSeen?: Maybe<Scalars['Boolean']>;
  paymentPreferences?: Maybe<HeroPointsPaymentPreferences>;
  transactionDetails?: Maybe<HeroPointsTransaction>;
  transactionHistories?: Maybe<HeroPointsTransactionHistories>;
};

export type HeroPointsBalanceArgs = {
  orgId?: InputMaybe<Scalars['String']>;
};

export type HeroPointsTransactionDetailsArgs = {
  id: Scalars['String'];
  orgId: Scalars['String'];
};

export type HeroPointsTransactionHistoriesArgs = {
  itemPerPage?: InputMaybe<Scalars['Int']>;
  orgId: Scalars['String'];
  pageIndex?: InputMaybe<Scalars['Int']>;
};

export enum HeroPointsClientType {
  EbfShaype = 'EBF_SHAYPE',
  EmployeeMilestone = 'EMPLOYEE_MILESTONE',
  EmploymentHero = 'EMPLOYMENT_HERO',
  HeroDollarPurchase = 'HERO_DOLLAR_PURCHASE',
  Marketplace = 'MARKETPLACE',
  Nomination = 'NOMINATION',
  OrganisationIssuance = 'ORGANISATION_ISSUANCE',
  Sap = 'SAP',
}

export type HeroPointsMutation = {
  __typename?: 'HeroPointsMutation';
  payWithHPCarouselSeen?: Maybe<Scalars['Boolean']>;
  paymentPreferences?: Maybe<HeroPointsPaymentPreferences>;
};

export type HeroPointsMutationPaymentPreferencesArgs = {
  payWithHPOnSwagCard?: InputMaybe<Scalars['Boolean']>;
};

export type HeroPointsPaymentPreferences = {
  __typename?: 'HeroPointsPaymentPreferences';
  payWithHPOnSwagCard?: Maybe<Scalars['Boolean']>;
};

export enum HeroPointsReasonType {
  AssistedImplementation = 'ASSISTED_IMPLEMENTATION',
  Commission = 'COMMISSION',
  Default = 'DEFAULT',
  InstapayDev = 'INSTAPAY_DEV',
  Marketing = 'MARKETING',
  OrganisationIssuance = 'ORGANISATION_ISSUANCE',
  Other = 'OTHER',
  Refund = 'REFUND',
  StaffRewards = 'STAFF_REWARDS',
  TransactionFee = 'TRANSACTION_FEE',
}

export type HeroPointsTransaction = {
  __typename?: 'HeroPointsTransaction';
  clientType: HeroPointsClientType;
  id: Scalars['String'];
  merchantName?: Maybe<Scalars['String']>;
  organisationName?: Maybe<Scalars['String']>;
  points: Scalars['Int'];
  reason?: Maybe<Scalars['String']>;
  reasonType?: Maybe<HeroPointsReasonType>;
  recognisedBy?: Maybe<Scalars['String']>;
  refId: Scalars['String'];
  transactionTimeUtc: Scalars['String'];
  transactionType: HeroPointsTransactionType;
};

export type HeroPointsTransactionHistories = {
  __typename?: 'HeroPointsTransactionHistories';
  itemPerPage: Scalars['Int'];
  items?: Maybe<Array<Maybe<HeroPointsTransactionItem>>>;
  pageIndex: Scalars['Int'];
  totalItems: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type HeroPointsTransactionItem = {
  __typename?: 'HeroPointsTransactionItem';
  clientType: HeroPointsClientType;
  id: Scalars['String'];
  points: Scalars['Int'];
  reason?: Maybe<Scalars['String']>;
  reasonType?: Maybe<HeroPointsReasonType>;
  refId: Scalars['String'];
  transactionTimeUtc: Scalars['String'];
  transactionType: HeroPointsTransactionType;
};

export enum HeroPointsTransactionType {
  Deduction = 'DEDUCTION',
  DeductionReversion = 'DEDUCTION_REVERSION',
  Topup = 'TOPUP',
  TopupReversion = 'TOPUP_REVERSION',
  Withdrawal = 'WITHDRAWAL',
  WithdrawalReversion = 'WITHDRAWAL_REVERSION',
}

export type HomeTileDetail = {
  __typename?: 'HomeTileDetail';
  banner: Scalars['String'];
  provider: Provider;
  subTitle: Scalars['String'];
  title: Scalars['String'];
};

export type HomeTiles = {
  __typename?: 'HomeTiles';
  tiles: Array<HomeTileDetail>;
};

export type HrOrg = {
  __typename?: 'HrOrg';
  activeSuperfundMembership?: Maybe<ActiveSuperfundMembership>;
  dailypay?: Maybe<Dailypay>;
  ehMemberId: Scalars['Int'];
  ehMemberUuid: Scalars['ID'];
  ewaPushNotification?: Maybe<EwaPushNotification>;
  id: Scalars['Int'];
  instapay?: Maybe<Instapay>;
  isIndependentContractor: Scalars['Boolean'];
  kpBusinessId: Scalars['Int'];
  kpEmployeeId: Scalars['Int'];
  kpPartnerId: Scalars['Int'];
  member?: Maybe<MemberDetail>;
  /** @deprecated Use `ehMemberId` instead */
  memberId: Scalars['Int'];
  /** @deprecated Use `ehMemberUuid` instead */
  memberUuid: Scalars['ID'];
  name: Scalars['String'];
  recurringByDay?: Maybe<RecurringByDay>;
  source: Platform;
  superContributions?: Maybe<Array<Maybe<SuperContribution>>>;
  uuid: Scalars['ID'];
  workCountry?: Maybe<Scalars['String']>;
};

export type HrUser = {
  __typename?: 'HrUser';
  countryCode?: Maybe<Scalars['String']>;
};

export type IdvProfile = {
  __typename?: 'IDVProfile';
  applicantId?: Maybe<Scalars['String']>;
  status: IdvProfileStatus;
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
  address: Scalars['String'];
  advertiserAbout: Scalars['String'];
  advertiserId: Scalars['String'];
  advertiserName: Scalars['String'];
  cashback: Scalars['String'];
  categoryCode: Scalars['String'];
  createdAt: Scalars['Timestamp'];
  description: Scalars['String'];
  endDate: Scalars['Timestamp'];
  howItWorks: Scalars['String'];
  id: Scalars['ID'];
  imageUrl: Scalars['String'];
  latitude: Scalars['Float'];
  logoUrl: Scalars['String'];
  longitude: Scalars['Float'];
  offerId: Scalars['String'];
  phone: Scalars['String'];
  popularScore: Scalars['Int'];
  startDate: Scalars['Timestamp'];
  title: Scalars['String'];
  tnc: Scalars['String'];
  type: OfferType;
  updatedAt: Scalars['Timestamp'];
  website: Scalars['String'];
};

export type InStoreOfferEdge = {
  __typename?: 'InStoreOfferEdge';
  node: InStoreOffer;
};

export type InStoreOffers = {
  __typename?: 'InStoreOffers';
  edges: Array<InStoreOfferEdge>;
  error?: Maybe<InStoreOffersError>;
  pageInfo: PageInfo;
};

export type InStoreOffersError = GenericError | InStoreRequireLatLong;

export type InStoreOffersInput = {
  after?: InputMaybe<Scalars['String']>;
  categoryCode?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  query?: InputMaybe<Scalars['String']>;
};

export type InStoreRequireLatLong = Error & {
  __typename?: 'InStoreRequireLatLong';
  message: Scalars['String'];
};

export type IncentiveResult = InstapayError | InstapayNowIncentivePayload;

export type IncomeDeduction = {
  __typename?: 'IncomeDeduction';
  amount: MoneyV2;
};

export type InstaPayDailyVisibility = {
  __typename?: 'InstaPayDailyVisibility';
  showInstapayDaily: Scalars['Boolean'];
  underMaintenance: Scalars['Boolean'];
};

export type InstaPayNowVisibility = {
  __typename?: 'InstaPayNowVisibility';
  showEstIncome: Scalars['Boolean'];
  showInstapay: Scalars['Boolean'];
  underMaintenance: Scalars['Boolean'];
};

export enum InstaPayOption {
  Dailypay = 'DAILYPAY',
  Instapay = 'INSTAPAY',
  Normal = 'NORMAL',
}

export type Instapay = {
  __typename?: 'Instapay';
  availableIncentives?: Maybe<IncentiveResult>;
  balance: InstapayBalanceResult;
  bankAccounts?: Maybe<Array<Maybe<InstapayBankAccount>>>;
  estBalance: InstapayEstBalanceResult;
  estimatedIncome: EstimatedIncomeResult;
  feeByPercentageMarketplace?: Maybe<Scalars['Float']>;
  isFirstTime: Scalars['Boolean'];
  recurringByAmountEligibility?: Maybe<RecurringByAmountEligibilityResult>;
  schedulingPromotionEligible?: Maybe<Scalars['Boolean']>;
  schedulingSubscriptions?: Maybe<GetSchedulingSubscriptionResult>;
  /** @deprecated mobile leaked query out of FF */
  showInstapayIntroduction?: Maybe<Scalars['Boolean']>;
  showInstapayIntroductionV2?: Maybe<Scalars['Boolean']>;
  ssaFee?: Maybe<MoneyV2>;
  ssaFeeV2: Fee;
  transactions: InstapayTransactionsResult;
  withdrawalLimit: InstapayWithdrawalLimitResult;
};

export type InstapayTransactionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  filters: InstapayTransactionsFilterInput;
  first?: InputMaybe<Scalars['Int']>;
};

export type InstapayAds = {
  __typename?: 'InstapayAds';
  adDisplayInterval: Scalars['Int'];
};

export type InstapayBalance = {
  __typename?: 'InstapayBalance';
  balance: Scalars['Float'];
  balanceType: InstapayBalanceType;
  id: Scalars['String'];
  payPeriod?: Maybe<PayPeriod>;
};

export type InstapayBalanceErrorContext = {
  __typename?: 'InstapayBalanceErrorContext';
  payCycle: PayCycle;
};

export type InstapayBalanceResult = InstapayBalance | InstapayError;

export enum InstapayBalanceType {
  Dailypay = 'DAILYPAY',
  Instapay = 'INSTAPAY',
}

export type InstapayBankAccount = {
  __typename?: 'InstapayBankAccount';
  accountName: Scalars['String'];
  accountNumber: Scalars['String'];
  bankAccountSource: InstapayBankAccountSource;
  beneficiaryId?: Maybe<Scalars['String']>;
  bsb?: Maybe<Scalars['String']>;
  externalId: Scalars['String'];
  fee: MoneyV2;
  feeV2: Fee;
  isSSA?: Maybe<Scalars['Boolean']>;
  schedulingPromotionFee: Fee;
  sortCode?: Maybe<Scalars['String']>;
};

export enum InstapayBankAccountSource {
  Eh = 'EH',
  Kp = 'KP',
  Swag = 'SWAG',
}

export type InstapayError = {
  __typename?: 'InstapayError';
  code: InstapayErrorCode;
  context?: Maybe<ErrorContext>;
};

export enum InstapayErrorCode {
  ActiveSubscriptionExist = 'ACTIVE_SUBSCRIPTION_EXIST',
  AfterPaymentDateRestricted = 'AFTER_PAYMENT_DATE_RESTRICTED',
  AgeIsNotEligible = 'AGE_IS_NOT_ELIGIBLE',
  ApprovedTimesheetNotFound = 'APPROVED_TIMESHEET_NOT_FOUND',
  AuthorizationErrors = 'AUTHORIZATION_ERRORS',
  AuthorizeEmployeeFailed = 'AUTHORIZE_EMPLOYEE_FAILED',
  CachedInstapayBalanceError = 'CACHED_INSTAPAY_BALANCE_ERROR',
  CannotFetchDeductions = 'CANNOT_FETCH_DEDUCTIONS',
  CannotFetchLeaveRequests = 'CANNOT_FETCH_LEAVE_REQUESTS',
  CannotFetchMemberTerminationDate = 'CANNOT_FETCH_MEMBER_TERMINATION_DATE',
  CannotFetchPayRate = 'CANNOT_FETCH_PAY_RATE',
  CannotFindMember = 'CANNOT_FIND_MEMBER',
  CannotGetInstapayPermission = 'CANNOT_GET_INSTAPAY_PERMISSION',
  CannotInitEmployeeData = 'CANNOT_INIT_EMPLOYEE_DATA',
  CanNotFetchDeductions = 'CAN_NOT_FETCH_DEDUCTIONS',
  CanNotFetchLeaveRequests = 'CAN_NOT_FETCH_LEAVE_REQUESTS',
  CanNotFetchMemberTerminationDate = 'CAN_NOT_FETCH_MEMBER_TERMINATION_DATE',
  CanNotFetchPayRate = 'CAN_NOT_FETCH_PAY_RATE',
  CanNotFindBankAccount = 'CAN_NOT_FIND_BANK_ACCOUNT',
  CanNotFindMember = 'CAN_NOT_FIND_MEMBER',
  CanNotGetInstapayPermission = 'CAN_NOT_GET_INSTAPAY_PERMISSION',
  CanNotInitEmployeeData = 'CAN_NOT_INIT_EMPLOYEE_DATA',
  DailypayMustBelongTo_1Org = 'DAILYPAY_MUST_BELONG_TO_1_ORG',
  DailypayMustBeFullTime = 'DAILYPAY_MUST_BE_FULL_TIME',
  DailypayMustNotUseTimesheets = 'DAILYPAY_MUST_NOT_USE_TIMESHEETS',
  DailypayMustPaidInArrears = 'DAILYPAY_MUST_PAID_IN_ARREARS',
  DailypayNotSupportedWithoutActiveSsa = 'DAILYPAY_NOT_SUPPORTED_WITHOUT_ACTIVE_SSA',
  DailypayPayScheduleUnsupported = 'DAILYPAY_PAY_SCHEDULE_UNSUPPORTED',
  DailypaySupportsEhOnly = 'DAILYPAY_SUPPORTS_EH_ONLY',
  EffectiveSubscriptionExist = 'EFFECTIVE_SUBSCRIPTION_EXIST',
  EligibilityErrors = 'ELIGIBILITY_ERRORS',
  EmploymentTypeInvalid = 'EMPLOYMENT_TYPE_INVALID',
  EstIncomeNotFound = 'EST_INCOME_NOT_FOUND',
  EstInstapayBalanceNotFound = 'EST_INSTAPAY_BALANCE_NOT_FOUND',
  ExistActiveDeductionWithDifferentPayTypeInSamePayslip = 'EXIST_ACTIVE_DEDUCTION_WITH_DIFFERENT_PAY_TYPE_IN_SAME_PAYSLIP',
  ExistDeductionWithOtherPayType = 'EXIST_DEDUCTION_WITH_OTHER_PAY_TYPE',
  GeneralErrors = 'GENERAL_ERRORS',
  HistoricalOpenPayrunRestricted = 'HISTORICAL_OPEN_PAYRUN_RESTRICTED',
  HoursPerWeek = 'HOURS_PER_WEEK',
  InstapayDailyOnlyAvailableNextPayPeriod = 'INSTAPAY_DAILY_ONLY_AVAILABLE_NEXT_PAY_PERIOD',
  InstapayOnlyAvailableNextPayPeriod = 'INSTAPAY_ONLY_AVAILABLE_NEXT_PAY_PERIOD',
  InvalidPayCycle = 'INVALID_PAY_CYCLE',
  InvalidPayPeriod = 'INVALID_PAY_PERIOD',
  InvalidPayRateForPermanent = 'INVALID_PAY_RATE_FOR_PERMANENT',
  InvalidPreviewBalance = 'INVALID_PREVIEW_BALANCE',
  InvalidRequest = 'INVALID_REQUEST',
  InvalidSalaryTypeForCasual = 'INVALID_SALARY_TYPE_FOR_CASUAL',
  LastPayslipNotExist = 'LAST_PAYSLIP_NOT_EXIST',
  MemberDataInvalid = 'MEMBER_DATA_INVALID',
  NotAvailableOnLeave = 'NOT_AVAILABLE_ON_LEAVE',
  NotSupportedDeductionType = 'NOT_SUPPORTED_DEDUCTION_TYPE',
  NoActiveSubscription = 'NO_ACTIVE_SUBSCRIPTION',
  NoEffectiveSubscription = 'NO_EFFECTIVE_SUBSCRIPTION',
  NoEnabledSubscription = 'NO_ENABLED_SUBSCRIPTION',
  OnlyAvailableOnWeekdays = 'ONLY_AVAILABLE_ON_WEEKDAYS',
  PaymentDateRestricted = 'PAYMENT_DATE_RESTRICTED',
  PayrollMemberNotNil = 'PAYROLL_MEMBER_NOT_NIL',
  PermissionRequired = 'PERMISSION_REQUIRED',
  PositiveHoursPerWeek = 'POSITIVE_HOURS_PER_WEEK',
  PushNotificationAlreadyOptedIn = 'PUSH_NOTIFICATION_ALREADY_OPTED_IN',
  PushNotificationNotOptedIn = 'PUSH_NOTIFICATION_NOT_OPTED_IN',
  RecurringByAmountCountryNotSupported = 'RECURRING_BY_AMOUNT_COUNTRY_NOT_SUPPORTED',
  RecurringByAmountFeatureNotPermitted = 'RECURRING_BY_AMOUNT_FEATURE_NOT_PERMITTED',
  RecurringByAmountHavingEffectiveDailySub = 'RECURRING_BY_AMOUNT_HAVING_EFFECTIVE_DAILY_SUB',
  Required_2Payslips = 'REQUIRED_2_PAYSLIPS',
  SalaryIsNotSupported = 'SALARY_IS_NOT_SUPPORTED',
  SomethingWentWrong = 'SOMETHING_WENT_WRONG',
  SubscriptionErrors = 'SUBSCRIPTION_ERRORS',
  SystemErrors = 'SYSTEM_ERRORS',
  TerminatedEmployee = 'TERMINATED_EMPLOYEE',
  TransactionBlocked = 'TRANSACTION_BLOCKED',
  UnauthorizedDailypay = 'UNAUTHORIZED_DAILYPAY',
  UnauthorizedInstapay = 'UNAUTHORIZED_INSTAPAY',
  UnauthorizedUserLocked = 'UNAUTHORIZED_USER_LOCKED',
  UnderMaintenance = 'UNDER_MAINTENANCE',
  Unspecified = 'UNSPECIFIED',
}

export type InstapayEstBalance = {
  __typename?: 'InstapayEstBalance';
  balance: MoneyV2;
  createdAt?: Maybe<Scalars['Timestamp']>;
  id: Scalars['String'];
};

export type InstapayEstBalanceError = {
  __typename?: 'InstapayEstBalanceError';
  code: InstapayErrorCode;
};

export type InstapayEstBalanceResult = InstapayEstBalance | InstapayEstBalanceError;

export type InstapayFeaturePermissionResult = InstapayError | Permission;

export type InstapayMutation = {
  __typename?: 'InstapayMutation';
  addPreferInstapayOption?: Maybe<AddPreferInstapayOptionPayload>;
  cancelSchedulingSubscription?: Maybe<CommonSchedulingSubscriptionResult>;
  createSchedulingSubscription?: Maybe<CommonSchedulingSubscriptionResult>;
  disableEarnedWageAccessFeatures?: Maybe<DisableEarnedWageAccessFeaturesResult>;
  drawdown: DrawdownPayload;
  submitInstaPayDrawdownSurvey?: Maybe<SubmitInstaPayDrawdownSurveyResult>;
  updateSchedulingSubscription?: Maybe<CommonSchedulingSubscriptionResult>;
};

export type InstapayMutationAddPreferInstapayOptionArgs = {
  instaPayOption?: InputMaybe<InstapayOptionInput>;
};

export type InstapayMutationCancelSchedulingSubscriptionArgs = {
  input: CancelSchedulingSubscriptionInput;
};

export type InstapayMutationCreateSchedulingSubscriptionArgs = {
  input: CreateSchedulingSubscriptionInput;
};

export type InstapayMutationDrawdownArgs = {
  input: DrawdownInput;
};

export type InstapayMutationSubmitInstaPayDrawdownSurveyArgs = {
  input: SubmitInstaPayDrawdownSurveyInput;
};

export type InstapayMutationUpdateSchedulingSubscriptionArgs = {
  input: UpdateSchedulingSubscriptionInput;
};

export type InstapayNowIncentive = {
  __typename?: 'InstapayNowIncentive';
  id: Scalars['String'];
  maxTransactionThreshold: MoneyV2;
  process: InstapayNowIncentiveProcess;
};

export type InstapayNowIncentivePayload = {
  __typename?: 'InstapayNowIncentivePayload';
  incentives?: Maybe<Array<Maybe<InstapayNowIncentive>>>;
};

export type InstapayNowIncentiveProcess = {
  __typename?: 'InstapayNowIncentiveProcess';
  earningProcess: Scalars['Int'];
  isRedeemed: Scalars['Boolean'];
};

export type InstapayOptionInput = {
  instaPayOption: InstaPayOption;
  orgId: Scalars['String'];
};

export enum InstapayPayType {
  Dailypay = 'DAILYPAY',
  Instapay = 'INSTAPAY',
}

export type InstapayTransaction = {
  __typename?: 'InstapayTransaction';
  abaLodgementReference: Scalars['String'];
  adminFee: MoneyV2;
  amount: Money;
  bankAccount?: Maybe<InstapayTransactionBankAccount>;
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  memberId: Scalars['String'];
};

export type InstapayTransactionBankAccount = {
  __typename?: 'InstapayTransactionBankAccount';
  accountName?: Maybe<Scalars['String']>;
  bsb?: Maybe<Scalars['String']>;
};

export type InstapayTransactions = {
  __typename?: 'InstapayTransactions';
  pageInfo?: Maybe<InstapayTransactionsPageInfo>;
  transactions: Array<InstapayTransaction>;
};

export type InstapayTransactionsFilterInput = {
  end?: InputMaybe<Scalars['Timestamp']>;
  endDate?: InputMaybe<Scalars['String']>;
  payType?: InputMaybe<InstapayPayType>;
  start?: InputMaybe<Scalars['Timestamp']>;
  startDate?: InputMaybe<Scalars['String']>;
  statuses?: InputMaybe<Scalars['String']>;
};

export type InstapayTransactionsPageInfo = {
  __typename?: 'InstapayTransactionsPageInfo';
  endCursor: Scalars['String'];
  hasNextPage: Scalars['Boolean'];
};

export type InstapayTransactionsResult = InstapayError | InstapayTransactions;

export type InstapayUsage = {
  __typename?: 'InstapayUsage';
  isFirstTime: Scalars['Boolean'];
};

export type InstapayUsageResult = InstapayError | InstapayUsage;

export type InstapayWithdrawalLimit = {
  __typename?: 'InstapayWithdrawalLimit';
  schedulingWithdrawalMinLimit: Scalars['Float'];
  withdrawalMaxLimit: Scalars['Float'];
  withdrawalMinLimit: Scalars['Float'];
};

export type InstapayWithdrawalLimitResult = InstapayError | InstapayWithdrawalLimit;

export type InstoreOfferV2 = {
  __typename?: 'InstoreOfferV2';
  advertiserAbout: Scalars['String'];
  advertiserName: Scalars['String'];
  cashback: Scalars['String'];
  categoryCode: Scalars['String'];
  createdAt: Scalars['Timestamp'];
  description: Scalars['String'];
  endDate: Scalars['Timestamp'];
  howItWorks: Scalars['String'];
  id: Scalars['ID'];
  imageUrl: Scalars['String'];
  locations: Array<OfferLocation>;
  logoUrl: Scalars['String'];
  offerId: Scalars['String'];
  phone: Scalars['String'];
  popularScore: Scalars['Int'];
  startDate: Scalars['Timestamp'];
  title: Scalars['String'];
  tnc: Scalars['String'];
  type: OfferType;
  updatedAt: Scalars['Timestamp'];
  website: Scalars['String'];
};

export type InstoreOffersV2 = {
  __typename?: 'InstoreOffersV2';
  error?: Maybe<GenericError>;
  offers: Array<InstoreOfferV2>;
};

export type JoinGroupInput = {
  groupId: Scalars['String'];
};

export type JoinGroupPayload = {
  __typename?: 'JoinGroupPayload';
  groupMembership?: Maybe<GroupMembership>;
};

export type JoinWaitListInput = {
  categoryAction: CategoryAction;
};

export type Lifecycle = {
  __typename?: 'Lifecycle';
  events?: Maybe<Array<Maybe<LifecycleEvent>>>;
  fundNotifyPreference?: Maybe<FundNotifyPreference>;
};

export type LifecycleEventsArgs = {
  input?: InputMaybe<GetEventsInput>;
};

export type LifecycleFundNotifyPreferenceArgs = {
  input: GetFundNotifyPreferenceInput;
};

export type LifecycleEvent = {
  __typename?: 'LifecycleEvent';
  accepted: Scalars['Boolean'];
  accepted_from?: Maybe<Scalars['String']>;
  author_id: Scalars['String'];
  author_type: Scalars['String'];
  code: Scalars['String'];
  created_at: Scalars['Timestamp'];
  data: Scalars['String'];
  delivered_at?: Maybe<Scalars['Timestamp']>;
  delivery_status: Scalars['String'];
  fund_usi: Scalars['String'];
  id: Scalars['ID'];
  owner_id: Scalars['String'];
  source: Scalars['String'];
  trigger_time: Scalars['Timestamp'];
  updated_at: Scalars['Timestamp'];
  user_id: Scalars['String'];
};

export type LifecycleMutation = {
  __typename?: 'LifecycleMutation';
  event?: Maybe<EventMutation>;
};

export type LifecycleTrackingInput = {
  author_id: Scalars['String'];
  author_type: Scalars['String'];
  channel: Scalars['String'];
  data: Scalars['String'];
  event_id: Scalars['String'];
  name: Scalars['String'];
};

export type LinkedCards = {
  __typename?: 'LinkedCards';
  cards: Array<CashbackCard>;
  error?: Maybe<GenericError>;
};

export type Locations = {
  __typename?: 'Locations';
  getLocations?: Maybe<GetLocationsResponse>;
};

export type LocationsGetLocationsArgs = {
  input?: InputMaybe<GetLocationsRequest>;
};

export type MakePaymentItem = {
  quantity: Scalars['Float'];
  variantCode: Scalars['String'];
};

export type MakePaymentPaymentMethod = {
  creditCard: Scalars['String'];
  heroPoints?: InputMaybe<Scalars['String']>;
  instapay: Scalars['String'];
};

export type MakeStripePaymentInput = {
  deviceData: Scalars['String'];
  ehPlatform?: InputMaybe<Scalars['String']>;
  ehToken: Scalars['String'];
  items: Array<MakePaymentItem>;
  nonce: Scalars['String'];
  orgId: Scalars['String'];
  paymentMethod: MakePaymentPaymentMethod;
  serviceFee: Scalars['String'];
};

export type MakeStripePaymentPayload = {
  __typename?: 'MakeStripePaymentPayload';
  billableAmount: Scalars['Float'];
  createdAt: Scalars['String'];
  error?: Maybe<GenericError>;
  freightCost: Scalars['Float'];
  id: Scalars['String'];
  ipAddress: Scalars['String'];
  memberId: Scalars['String'];
  name: Scalars['String'];
  status: Scalars['String'];
  transactionFee: Scalars['Float'];
  type: Scalars['String'];
};

export type MemberDetail = {
  __typename?: 'MemberDetail';
  avatar_url?: Maybe<Scalars['String']>;
  ehMemberUuid: Scalars['ID'];
  ehOrgId: Scalars['String'];
  ehUserId: Scalars['String'];
  email: Scalars['String'];
  external_id?: Maybe<Scalars['String']>;
  /** @deprecated Use `ehMemberUuid` instead */
  id: Scalars['ID'];
  job_title?: Maybe<Scalars['String']>;
  kpBusinessId: Scalars['Int'];
  kpEmployeeId: Scalars['Int'];
  kpUserId: Scalars['Int'];
  legacy_id?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  /** @deprecated Use `ehOrgId` instead */
  organisation_id: Scalars['String'];
  paySplit?: Maybe<PaySplit>;
  role?: Maybe<Scalars['String']>;
  source: Platform;
  /** @deprecated Use `ehUserId` instead */
  user_id: Scalars['String'];
  work_country?: Maybe<Scalars['String']>;
};

export type MinSupportVersion = {
  __typename?: 'MinSupportVersion';
  benefits: BenefitsMinSupportVersion;
};

export type Money = {
  __typename?: 'Money';
  subUnits?: Maybe<Scalars['Int']>;
  type?: Maybe<CurrencyType>;
  units?: Maybe<Scalars['Int']>;
};

export type MoneyInput = {
  subUnits: Scalars['Int'];
  type: CurrencyType;
  units: Scalars['Int'];
};

export type MoneyV2 = {
  __typename?: 'MoneyV2';
  sign: Sign;
  subUnits: Scalars['Int'];
  type: CurrencyType;
  units: Scalars['Int'];
};

export type MoneyV2Input = {
  sign: Sign;
  subUnits: Scalars['Int'];
  type: CurrencyType;
  units: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  blockUKCard: MutationSuccessPayload;
  bmSubmitSubscription?: Maybe<BmSubmitSubscriptionPayload>;
  bsJoinWaitList?: Maybe<BsJoinWaitListPayload>;
  /** @deprecated Use dailypay.cancelInstaPayDailySubscription */
  cancelInstaPayDailySubscription: CancelInstaPayDailySubscriptionPayload;
  cancelScheduledPayment: MutationSuccessPayload;
  card?: Maybe<CardMutation>;
  cashback?: Maybe<CashbackMutation>;
  clearPersistentNotifications: MutationSuccessPayload;
  closeStash?: Maybe<Scalars['Boolean']>;
  createComplaintTicket: CreateComplaintTicketPayload;
  /** @deprecated Use dailypay.createDailypaySubscription */
  createDailypaySubscription: CreateDailypaySubscriptionPayload;
  createSSAComplaintTicket: CreateSsaComplaintTicketPayload;
  createScheduledPayment: CreateScheduledPaymentPayload;
  createStash?: Maybe<Scalars['Boolean']>;
  createSuperConsolidation?: Maybe<CreateSuperConsolidationPayload>;
  createSuperConsolidationRequestSupport?: Maybe<CreateSuperConsolidationRequestSupportPayload>;
  createSwagSuperfund?: Maybe<CreateSwagSuperfundPayload>;
  createUKCard?: Maybe<CreateUkCardPayload>;
  dailypay?: Maybe<DailypayMutation>;
  depositToStash?: Maybe<Scalars['Boolean']>;
  /** @deprecated No longer supported */
  empty?: Maybe<Scalars['String']>;
  ewaPushNotification?: Maybe<EwaPushNotificationMutation>;
  experiment?: Maybe<ExperimentMutation>;
  floatAccount?: Maybe<FloatAccountMutation>;
  group?: Maybe<GroupMutation>;
  heroPoints?: Maybe<HeroPointsMutation>;
  initiateAUWallet: MutationSuccessPayload;
  instapay?: Maybe<InstapayMutation>;
  lifecycle?: Maybe<LifecycleMutation>;
  payment?: Maybe<PaymentMutation>;
  recurringByDay?: Maybe<RecurringByDayMutation>;
  removePayeeAddress: MutationSuccessPayload;
  saveAUWalletSetup: SaveAuWalletSetupPayload;
  savePaySplit: MutationSuccessPayload;
  savePayeeAddress: MutationSuccessPayload;
  seenSSACarousel: MutationSuccessPayload;
  sendUkFund: SendUkFundPayload;
  setStashMetadata?: Maybe<Scalars['Boolean']>;
  setUKPasscode: UkTokenPayload;
  startUKKYC?: Maybe<StartUkkycPayload>;
  startUKWalletCreation: StartUkWalletCreationPayload;
  startValidateUkPhoneNumber: MutationSuccessPayload;
  stopContributionByContributionId?: Maybe<StopSuperContributionPayload>;
  storeEvent: MutationSuccessPayload;
  submitSuperContribution?: Maybe<SubmitSuperContributionPayload>;
  transferAUWalletFunds: TransferAuWalletFundsPayload;
  unblockUKCard: MutationSuccessPayload;
  unlinkUkDevice: MutationSuccessPayload;
  /** @deprecated Super consent service will be removed */
  updateMySuperConsentStatus?: Maybe<UpdateSuperConsentPayload>;
  updateWalletProfile: MutationSuccessPayload;
  user?: Maybe<UserMutation>;
  verifyUkPhoneNumber: MutationSuccessPayload;
  withdrawFromStash?: Maybe<Scalars['Boolean']>;
};

export type MutationBlockUkCardArgs = {
  input: BlockUnblockCardInput;
};

export type MutationBmSubmitSubscriptionArgs = {
  inputL?: InputMaybe<BsSubmitSubscriptionInput>;
};

export type MutationBsJoinWaitListArgs = {
  input?: InputMaybe<BsJoinWaitListInput>;
};

export type MutationCancelInstaPayDailySubscriptionArgs = {
  input: CancelInstaPayDailySubscriptionInput;
};

export type MutationCancelScheduledPaymentArgs = {
  externalId: Scalars['ID'];
};

export type MutationClearPersistentNotificationsArgs = {
  type: WalletNotificationType;
};

export type MutationCloseStashArgs = {
  stashId: Scalars['ID'];
};

export type MutationCreateComplaintTicketArgs = {
  input?: InputMaybe<CreateComplaintTicketInput>;
};

export type MutationCreateDailypaySubscriptionArgs = {
  input: CreateDailypaySubscriptionInput;
};

export type MutationCreateSsaComplaintTicketArgs = {
  input?: InputMaybe<CreateSsaComplaintTicketInput>;
};

export type MutationCreateScheduledPaymentArgs = {
  input: CreateScheduledPaymentInput;
};

export type MutationCreateStashArgs = {
  input: CreateStashInput;
};

export type MutationCreateSuperConsolidationArgs = {
  input?: InputMaybe<CreateSuperConsolidationInput>;
};

export type MutationCreateSuperConsolidationRequestSupportArgs = {
  usi: Scalars['String'];
};

export type MutationCreateSwagSuperfundArgs = {
  input?: InputMaybe<CreateSwagSuperfundInput>;
};

export type MutationCreateUkCardArgs = {
  accessToken: Scalars['String'];
  input: CreateUkCardInput;
};

export type MutationDepositToStashArgs = {
  input: DepositToStashInput;
  stashId: Scalars['ID'];
};

export type MutationRemovePayeeAddressArgs = {
  input: RemovePayeeAddressInput;
};

export type MutationSaveAuWalletSetupArgs = {
  setupDetails: SaveAuWalletSetupInput;
};

export type MutationSavePaySplitArgs = {
  input: PaySplitInput;
};

export type MutationSavePayeeAddressArgs = {
  input: SavePayeeAddressInput;
};

export type MutationSendUkFundArgs = {
  input: SendUkFundInput;
};

export type MutationSetStashMetadataArgs = {
  input: SetStashMetadataInput;
};

export type MutationSetUkPasscodeArgs = {
  input: SetUkPasscodeInput;
};

export type MutationStartUkWalletCreationArgs = {
  input: StartUkWalletCreationInput;
};

export type MutationStopContributionByContributionIdArgs = {
  id: Scalars['String'];
};

export type MutationStoreEventArgs = {
  input: StoreEventInput;
};

export type MutationSubmitSuperContributionArgs = {
  input?: InputMaybe<SubmitSuperContributionInput>;
};

export type MutationTransferAuWalletFundsArgs = {
  transferDetails: TransferAuWalletFundsInput;
};

export type MutationUnblockUkCardArgs = {
  input: BlockUnblockCardInput;
};

export type MutationUpdateMySuperConsentStatusArgs = {
  input?: InputMaybe<UpdateMySuperConsentStatusInput>;
};

export type MutationUpdateWalletProfileArgs = {
  input: UpdateWalletProfileInput;
};

export type MutationVerifyUkPhoneNumberArgs = {
  input: VerifyPhoneNumberRequest;
};

export type MutationWithdrawFromStashArgs = {
  input: WithdrawFromStashInput;
  stashId: Scalars['ID'];
};

export type MutationSuccessPayload = {
  __typename?: 'MutationSuccessPayload';
  success: Scalars['Boolean'];
};

export type NewBeneficiaryInput = {
  info: BeneficiaryInformation;
  sortCode?: InputMaybe<BankAccountSortCodeInput>;
  swagSpendAccount?: InputMaybe<BankAccountSsaInput>;
};

export type NewBeneficiaryPayload = {
  __typename?: 'NewBeneficiaryPayload';
  beneficiaryId: Scalars['String'];
};

export type NoOrgPermissions = {
  __typename?: 'NoOrgPermissions';
  benefitsBillAhmPromoTile: Permission;
  benefitsBillMedibankPromoTile: Permission;
  benefitsBillStreaming: Permission;
  benefitsFitnessFirst: Permission;
  benefitsForceUpdate: Permission;
  benefitsGoodlifeFitness: Permission;
  benefitsIAv2: Permission;
  benefitsPillarHomepage: Permission;
  benefitsStoreAppUK: Permission;
  benefitsStripePaymentCheckout: Permission;
  benefitsXmas23Cashback: Permission;
  billStreamingWaitlist: Permission;
  cashbackDashboardV2: Permission;
  customFundAssetSwag: Permission;
  customSurveyInstapayExperiment: Permission;
  eBenMoneyScheduledPayment: Permission;
  eBenPayeeAddressBook: Permission;
  eBenSpendHeroDollarsOnSwagCard: Permission;
  eBenStash: Permission;
  eBenSwagInterestBearingAccountExperiment: Permission;
  eBenWhitelistedUkBenefits: Permission;
  eBenWhitelistedUkMoney: Permission;
  ebenApplePay: Permission;
  ebenCashbackStoreList: Permission;
  ebenDevHeroDollarPayment: Permission;
  ebenGooglePay: Permission;
  ebenInstapayNowSimplifiedExperiment: Permission;
  ebenServiceFee: Permission;
  ebenStoreBuyAgainCarousel: Permission;
  ebenStorePopularList: Permission;
  eben_benefits_pillar_black_list: Permission;
  eben_money_pillar_black_list: Permission;
  /** @deprecated Moved to heroPoints */
  heroDollars: Permission;
  heroPoints: Permission;
  instapay: Permission;
  instapay2Alpha: Permission;
  internationalBenefitsRefused: Permission;
  payslipsExperimentBudgeting: Permission;
  payslipsExperimentInstapay: Permission;
  pillar_benefits: Permission;
  pillar_money: Permission;
  rostersInstapayExperiment: Permission;
  seOfferTiles: Permission;
  skipMegaDealsSurvey: Permission;
  superAppBenefits: Permission;
  superAppBenefitsFeaturedOffers: Permission;
  superAppCashback: Permission;
  superAppCashbackCategories: Permission;
  superAppHome: Permission;
  superAppInstoreOffer: Permission;
  superAppSettings: Permission;
  superAppWallet: Permission;
  superChoiceSwag: Permission;
  superConsentSwag: Permission;
  superConsolidation: Permission;
  superSalarySacrifice: Permission;
  timesheetsInstapayExperiment: Permission;
  toggleMegaDealsCommunitiesCtas: Permission;
  toggleMegaDealsMVPCta: Permission;
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

export type OemProvisioning = {
  __typename?: 'OemProvisioning';
  cardHolderName: Scalars['String'];
  cardToken: Scalars['String'];
  expiryDate: Scalars['String'];
  otp: Scalars['String'];
};

export type OfferInput = {
  id: Scalars['String'];
};

export type OfferLocation = {
  __typename?: 'OfferLocation';
  address: Scalars['String'];
  latitude: Scalars['Float'];
  locationId: Scalars['String'];
  longitude: Scalars['Float'];
};

export enum OfferType {
  Instore = 'INSTORE',
  Online = 'ONLINE',
}

export type OfferV2 = InstoreOfferV2 | OnlineOffer;

export type OnboardStatus = {
  __typename?: 'OnboardStatus';
  error?: Maybe<GenericError>;
  hasCLOOnboarded: Scalars['Boolean'];
};

export type OnboardUserPayload = {
  __typename?: 'OnboardUserPayload';
  error?: Maybe<GenericError>;
  success: Scalars['Boolean'];
};

export type OnlineOffer = {
  __typename?: 'OnlineOffer';
  about: Scalars['String'];
  advertiserAbout: Scalars['String'];
  advertiserId: Scalars['String'];
  advertiserName: Scalars['String'];
  cashback: Scalars['String'];
  categoryCode: Scalars['String'];
  createdAt: Scalars['Timestamp'];
  description: Scalars['String'];
  howItWorks: Scalars['String'];
  id: Scalars['ID'];
  imageUrl: Scalars['String'];
  isCardLinkedOffer: Scalars['Boolean'];
  logoUrl: Scalars['String'];
  popularScore: Scalars['Int'];
  title: Scalars['String'];
  tnc: Scalars['String'];
  trackingUrl: Scalars['String'];
  type: OfferType;
  updatedAt: Scalars['Timestamp'];
};

export type OnlineOfferEdge = {
  __typename?: 'OnlineOfferEdge';
  node: OnlineOffer;
};

export type OnlineOffers = {
  __typename?: 'OnlineOffers';
  edges: Array<OnlineOfferEdge>;
  error?: Maybe<GenericError>;
  pageInfo: PageInfo;
};

export type OnlineOffersInput = {
  after?: InputMaybe<Scalars['String']>;
  categoryCode?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
};

export type OptInEwaPushNotificationByFeatureInput = {
  feature: EwaPushNotificationFeature;
  orgId: Scalars['String'];
};

export type OptInEwaPushNotificationByTypeInput = {
  orgId: Scalars['String'];
  type: EwaPushNotificationType;
};

export type OptInEwaPushNotificationResult = InstapayError | OptInOutEwaPushNotificationPayload;

export type OptInOutEwaPushNotificationPayload = {
  __typename?: 'OptInOutEWAPushNotificationPayload';
  success: Scalars['Boolean'];
};

export type OptOutEwaPushNotificationByFeatureInput = {
  feature: EwaPushNotificationFeature;
  orgId: Scalars['String'];
};

export type OptOutEwaPushNotificationByTypeInput = {
  orgId: Scalars['String'];
  type: EwaPushNotificationType;
};

export type OptOutEwaPushNotificationResult = InstapayError | OptInOutEwaPushNotificationPayload;

export type OrderDetails = {
  __typename?: 'OrderDetails';
  billableAmount: Scalars['Float'];
  currency: Scalars['String'];
  discount: Scalars['Float'];
  freightCost: Scalars['Float'];
  id: Scalars['String'];
  price: Scalars['Float'];
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
  imageUrl: Scalars['String'];
  logoUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  productType: OrderProductType;
  title: Scalars['String'];
};

export enum OrderProductType {
  Dropship = 'Dropship',
  Giftcard = 'Giftcard',
  Grocery = 'Grocery',
  Ticket = 'Ticket',
  Unknown = 'Unknown',
}

export type OrderProductVariant = {
  __typename?: 'OrderProductVariant';
  amount: Scalars['Float'];
  discountPrice: Scalars['Float'];
  imageUrl: Scalars['String'];
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
  barCode?: Maybe<Scalars['String']>;
  cardNumber: Scalars['String'];
  expiredAt?: Maybe<Scalars['Timestamp']>;
  giftCode?: Maybe<Scalars['String']>;
  issuedAt: Scalars['Timestamp'];
  orderDetailId: Scalars['String'];
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
  CancelAccepted = 'CancelAccepted',
  CancellationPending = 'CancellationPending',
  Cancelled = 'Cancelled',
  Dispatched = 'Dispatched',
  Fulfilled = 'Fulfilled',
  PaymentFailed = 'PaymentFailed',
  PaymentPending = 'PaymentPending',
  Processing = 'Processing',
  ProcessingFailed = 'ProcessingFailed',
  RefundRejected = 'RefundRejected',
  RefundRequested = 'RefundRequested',
  Refunded = 'Refunded',
  Unknown = 'Unknown',
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  totalCount?: Maybe<Scalars['Int']>;
  totalPages?: Maybe<Scalars['Int']>;
};

export type PayAccountAllocation = {
  __typename?: 'PayAccountAllocation';
  details: Array<BankAccountDetails>;
  splitType: PaySplitType;
};

export type PayAccountInput = {
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

export type PayAllocation = {
  __typename?: 'PayAllocation';
  allocation: PayAccountAllocation;
  membership: EhMembership;
};

export enum PayCycle {
  Fortnightly = 'FORTNIGHTLY',
  Monthly = 'MONTHLY',
  Unknown = 'UNKNOWN',
  Weekly = 'WEEKLY',
}

export type PayPeriod = {
  __typename?: 'PayPeriod';
  ending: Scalars['Timestamp'];
  paymentDate: Scalars['Timestamp'];
  starting: Scalars['Timestamp'];
};

export type PaySplit = {
  __typename?: 'PaySplit';
  allocations: Array<PayAllocation>;
  bankAccounts?: Maybe<PayAccountAllocation>;
};

export type PaySplitBankAccountsArgs = {
  memberId: Scalars['String'];
};

export type PaySplitInput = {
  bankAccounts: Array<PayAccountInput>;
  bankSplitType: PaySplitType;
  memberId: Scalars['String'];
  orgId: Scalars['String'];
};

export enum PaySplitType {
  FixedAmount = 'FIXED_AMOUNT',
  Percentage = 'PERCENTAGE',
}

export type PaymentCardDetails = {
  __typename?: 'PaymentCardDetails';
  cardNumberToken?: Maybe<Scalars['String']>;
  cvvToken?: Maybe<Scalars['String']>;
  expiryDate?: Maybe<Scalars['CardExpiryDate']>;
  id: Scalars['ID'];
  isVirtual: Scalars['Boolean'];
  issuedTimestamp?: Maybe<Scalars['Timestamp']>;
  lastFourDigits?: Maybe<Scalars['String']>;
  nameOnCard: Scalars['String'];
  status: PaymentCardStatus;
};

export enum PaymentCardStatus {
  Active = 'ACTIVE',
  Block = 'BLOCK',
  Blocked = 'BLOCKED',
  Destroyed = 'DESTROYED',
}

export type PaymentClientTokenPayload = {
  __typename?: 'PaymentClientTokenPayload';
  clientToken: Scalars['String'];
  error?: Maybe<GenericError>;
};

export enum PaymentMethod {
  DirectToProvider = 'DIRECT_TO_PROVIDER',
  Unknown = 'UNKNOWN',
}

export type PaymentMutation = {
  __typename?: 'PaymentMutation';
  createStripeClientToken?: Maybe<PaymentClientTokenPayload>;
  makeStripePayment?: Maybe<MakeStripePaymentPayload>;
};

export type PaymentMutationCreateStripeClientTokenArgs = {
  createStripeClientTokenInput?: InputMaybe<CreateStripeClientTokenInput>;
};

export type PaymentMutationMakeStripePaymentArgs = {
  makeStripePaymentInput: MakeStripePaymentInput;
};

export type PaymentTransaction = TransactionBase & {
  __typename?: 'PaymentTransaction';
  amount: CurrencyAmount;
  createdAt: Scalars['Timestamp'];
  id: Scalars['String'];
  paymentDate: Scalars['Date'];
  paymentMethod?: Maybe<PaymentMethod>;
  paymentType?: Maybe<PaymentType>;
  transactionDate: Scalars['Date'];
  type: TxnType;
};

export enum PaymentType {
  Mastercard = 'MASTERCARD',
  Unknown = 'UNKNOWN',
  Visa = 'VISA',
}

export type Permission = {
  __typename?: 'Permission';
  view: Scalars['Boolean'];
};

export type PersistentNotification = {
  __typename?: 'PersistentNotification';
  id: Scalars['ID'];
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

export enum Pid {
  Ahm = 'AHM',
  FitnessFirst = 'FITNESS_FIRST',
  GoodlifeHealthClubs = 'GOODLIFE_HEALTH_CLUBS',
  Medibank = 'MEDIBANK',
  SimplyEnergy = 'SIMPLY_ENERGY',
  Unspecified = 'UNSPECIFIED',
}

export enum Platform {
  Eh = 'EH',
  Kp = 'KP',
}

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

export type ProfileChangeRequest = {
  __typename?: 'ProfileChangeRequest';
  createdAt: Scalars['String'];
  dateOfBirth?: Maybe<Scalars['String']>;
  name?: Maybe<PersonalName>;
  type: UserDetailChangeRequestType;
};

export type ProfileChangeRequestPayload = {
  __typename?: 'ProfileChangeRequestPayload';
  error?: Maybe<GenericError>;
  requests?: Maybe<Array<Maybe<ProfileChangeRequest>>>;
};

export type Promotion = {
  __typename?: 'Promotion';
  cardSubTitle: Scalars['String'];
  cardTitle: Scalars['String'];
  descriptionBtsContent: Scalars['String'];
  descriptionBtsTitle: Scalars['String'];
  homeSubTitle: Scalars['String'];
  homeTitle: Scalars['String'];
  offerSubTitle: Scalars['String'];
  offerTitle: Scalars['String'];
  searchCardTitle: Scalars['String'];
  signedUpBillStatusContent: Scalars['String'];
  signedUpCardSubTitle: Scalars['String'];
  signedUpCardTitle: Scalars['String'];
  tagContent: Scalars['String'];
  termsAndConditions: Scalars['String'];
};

export type Provider = {
  __typename?: 'Provider';
  contactInfo?: Maybe<Scalars['String']>;
  faq?: Maybe<Scalars['String']>;
  id: Pid;
  logoUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  paymentUrl?: Maybe<Scalars['String']>;
};

export type ProviderEdge = {
  __typename?: 'ProviderEdge';
  node: Provider;
};

export type Providers = {
  __typename?: 'Providers';
  edges: Array<ProviderEdge>;
  pageInfo: PageInfo;
};

export type ProvidersInput = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};

export type PublishableKey = {
  __typename?: 'PublishableKey';
  error?: Maybe<GenericError>;
  publishableKey?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  getLocationByPlaceId?: Maybe<GetLocationByPlaceIdResponse>;
  getLocations?: Maybe<GetLocationsResponse>;
  group?: Maybe<GroupRoot>;
  me?: Maybe<User>;
  superfundFeatureFlag?: Maybe<SuperfundFeatureFlag>;
  superfundMetadata?: Maybe<SuperfundMetadata>;
};

export type QueryGetLocationByPlaceIdArgs = {
  placeId: Scalars['String'];
};

export type QueryGetLocationsArgs = {
  input?: InputMaybe<GetLocationsRequest>;
};

export type QuerySuperfundFeatureFlagArgs = {
  usi: Scalars['String'];
};

export type QuerySuperfundMetadataArgs = {
  usi: Scalars['String'];
};

export type RecurringByAmountEligibilityResult = {
  __typename?: 'RecurringByAmountEligibilityResult';
  errorCode?: Maybe<InstapayErrorCode>;
  isEligible: Scalars['Boolean'];
};

export type RecurringByDay = {
  __typename?: 'RecurringByDay';
  currentSubscription?: Maybe<RecurringByDaySubscriptionResult>;
  preview: RecurringByDayPreviewResult;
};

export type RecurringByDayEstimatedBalance = {
  __typename?: 'RecurringByDayEstimatedBalance';
  amount: MoneyV2;
  date: Scalars['Timestamp'];
};

export type RecurringByDayMutation = {
  __typename?: 'RecurringByDayMutation';
  cancelRecurringByDay: CancelRecurringByDayResult;
  subscribeRecurringByDay: SubscribeRecurringByDayResult;
  updateRecurringByDay: UpdateRecurringByDayResult;
};

export type RecurringByDayMutationCancelRecurringByDayArgs = {
  input: CancelRecurringByDayInput;
};

export type RecurringByDayMutationSubscribeRecurringByDayArgs = {
  input: SubscribeRecurringByDayInput;
};

export type RecurringByDayMutationUpdateRecurringByDayArgs = {
  input: UpdateRecurringByDayInput;
};

export enum RecurringByDayPayCycle {
  RecurringByDayFortnightly = 'RECURRING_BY_DAY_FORTNIGHTLY',
  RecurringByDayWeekly = 'RECURRING_BY_DAY_WEEKLY',
}

export type RecurringByDayPayCycleEstBalance = {
  __typename?: 'RecurringByDayPayCycleEstBalance';
  amount: MoneyV2;
  payCycle: PayCycle;
};

export type RecurringByDayPreview = {
  __typename?: 'RecurringByDayPreview';
  /** @deprecated No longer supported */
  estimatedBalances?: Maybe<Array<Maybe<RecurringByDayEstimatedBalance>>>;
  /** @deprecated No longer supported */
  memberPayCycle?: Maybe<RecurringByDayPayCycle>;
  memberPayCycleV2?: Maybe<PayCycle>;
  payCycleEstBalances?: Maybe<Array<Maybe<RecurringByDayPayCycleEstBalance>>>;
  payPeriod: PayPeriod;
  supportedPayCycles?: Maybe<Array<Maybe<RecurringByDayPayCycle>>>;
};

export type RecurringByDayPreviewResult = InstapayError | RecurringByDayPreview;

export type RecurringByDaySubscription = {
  __typename?: 'RecurringByDaySubscription';
  bankAccountExternalId: Scalars['String'];
  firstPaymentDate?: Maybe<Scalars['Timestamp']>;
  id: Scalars['String'];
  /** @deprecated No longer supported */
  maxPayAmount: Scalars['Int'];
  maximumPayAmount: MoneyV2;
  /** @deprecated No longer supported */
  minPayAmount: Scalars['Int'];
  minimumPayAmount: MoneyV2;
  payCycle?: Maybe<RecurringByDayPayCycle>;
  payDay: Weekday;
  status: RecurringSubscriptionStatus;
};

export type RecurringByDaySubscriptionResult = InstapayError | RecurringByDaySubscription;

export type RecurringByDayVisibility = {
  __typename?: 'RecurringByDayVisibility';
  showRecurringByDay: Scalars['Boolean'];
};

export enum RecurringSubscriptionStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Unknown = 'UNKNOWN',
}

export type Reminder = {
  __typename?: 'Reminder';
  reminderDescription: Scalars['String'];
  reminderTextCopy: Scalars['String'];
};

export type RemovePayeeAddressInput = {
  address: RemovePayeeAddressItem;
};

export type RemovePayeeAddressItem = {
  accountNumber: Scalars['String'];
  bsb: Scalars['String'];
};

export type RequestNewCardInput = {
  address: CommonAddressInput;
};

export type SsAllOffersInput = {
  after?: InputMaybe<Scalars['String']>;
  categoryCode?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  orgId: Scalars['String'];
  query?: InputMaybe<Scalars['String']>;
};

export type SsBuyAgainGiftCardsInput = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  orgId: Scalars['String'];
};

export type SaveAuWalletSetupInput = {
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
  identityVerificationTermsConsentTimestamp?: InputMaybe<Scalars['Timestamp']>;
  lastName: Scalars['String'];
  mailingAddress: CommonAddressInput;
  middleName?: InputMaybe<Scalars['String']>;
  phoneNumber: PhoneNumberInput;
  privacyPolicyConsentTimestamp?: InputMaybe<Scalars['Timestamp']>;
  residentialAddress: CommonAddressInput;
  taxObligations?: InputMaybe<Array<InputMaybe<TaxObligationInput>>>;
  termsConditionsConsentTimestamp?: InputMaybe<Scalars['Timestamp']>;
};

export type SaveAuWalletSetupPayload = {
  __typename?: 'SaveAUWalletSetupPayload';
  idvToken: Scalars['String'];
};

export type SavePayeeAddressInput = {
  address: AuPayeeAddress;
};

export type ScheduledPayment = {
  __typename?: 'ScheduledPayment';
  amount: Money;
  createdAt: Scalars['Timestamp'];
  description: Scalars['String'];
  endDate?: Maybe<Scalars['Date']>;
  externalId: Scalars['ID'];
  frequency?: Maybe<ScheduledPaymentFrequency>;
  numberOfPayments?: Maybe<Scalars['Int']>;
  processedPayments?: Maybe<Scalars['Int']>;
  recipient: AuPaymentRecipient;
  startDate: Scalars['Date'];
  type: ScheduledPaymentType;
};

export enum ScheduledPaymentFrequency {
  Fortnightly = 'FORTNIGHTLY',
  Monthly = 'MONTHLY',
  Quarterly = 'QUARTERLY',
  Weekly = 'WEEKLY',
}

export enum ScheduledPaymentSaveOutcomeType {
  BpayInvalidBillerCode = 'BPAY_INVALID_BILLER_CODE',
  BpayInvalidPayment = 'BPAY_INVALID_PAYMENT',
  BpayInvalidReference = 'BPAY_INVALID_REFERENCE',
  Created = 'CREATED',
  LimitError = 'LIMIT_ERROR',
  PaymentFormatInvalid = 'PAYMENT_FORMAT_INVALID',
  Updated = 'UPDATED',
}

export type ScheduledPaymentSaveResponseDetails = {
  __typename?: 'ScheduledPaymentSaveResponseDetails';
  id?: Maybe<Scalars['ID']>;
  status?: Maybe<ScheduledPaymentStatus>;
};

export enum ScheduledPaymentStatus {
  Active = 'ACTIVE',
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Deleted = 'DELETED',
  Failed = 'FAILED',
  Rejected = 'REJECTED',
  Replaced = 'REPLACED',
}

export enum ScheduledPaymentType {
  OneTime = 'ONE_TIME',
  Recurring = 'RECURRING',
}

export type SchedulingSubscription = {
  __typename?: 'SchedulingSubscription';
  amount: MoneyV2;
  bankAccountExternalId: Scalars['String'];
  endDate?: Maybe<Scalars['Timestamp']>;
  feePromotionApplied?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  plan: SchedulingSubscriptionPlan;
  startDate: Scalars['Timestamp'];
};

export enum SchedulingSubscriptionPlan {
  Frequently = 'FREQUENTLY',
  Weekly = 'WEEKLY',
}

export type SchedulingSubscriptionResult = {
  __typename?: 'SchedulingSubscriptionResult';
  success: Scalars['Boolean'];
};

export type SendUkFundInput = {
  amount: MoneyInput;
  description: Scalars['String'];
  idempotencyKey: Scalars['String'];
  recipient: FastPaymentRecipientInput;
};

export type SendUkFundPayload = {
  __typename?: 'SendUkFundPayload';
  externalTransactionId: Scalars['String'];
  state: UkTransactionState;
};

export type SetStashMetadataInput = {
  isMarketingCardFinished?: InputMaybe<Scalars['Boolean']>;
  isStashEntryButtonInSpendAccountHidden?: InputMaybe<Scalars['Boolean']>;
};

export type SetUkPasscodeInput = {
  passcode: Scalars['String'];
};

export type SetupStatus = {
  __typename?: 'SetupStatus';
  message?: Maybe<WalletStatusReason>;
  status?: Maybe<WalletSetupStatus>;
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

export type ShopProductDetails = {
  __typename?: 'ShopProductDetails';
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
  productVariants: Array<ShopProductVariant>;
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

export type ShopProductDetailsResponse = {
  __typename?: 'ShopProductDetailsResponse';
  error?: Maybe<GenericError>;
  product?: Maybe<ShopProductDetails>;
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

export type ShopProductVariant = {
  __typename?: 'ShopProductVariant';
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

export enum Sign {
  Negative = 'NEGATIVE',
  Positive = 'POSITIVE',
}

export type StartUkkycPayload = {
  __typename?: 'StartUKKYCPayload';
  reference: Scalars['String'];
};

export type StartUkWalletCreationInput = {
  dateOfBirth: Scalars['String'];
  deviceIpAddress: Scalars['String'];
  firstName: Scalars['String'];
  hasConsentedPrivacyPolicy: Scalars['Boolean'];
  hasConsentedTermsConditions: Scalars['Boolean'];
  lastName: Scalars['String'];
  middleName?: InputMaybe<Scalars['String']>;
  phoneNumber: PhoneNumberInput;
  privacyPolicyConsentTimestamp?: InputMaybe<Scalars['Timestamp']>;
  residentialAddress: AddressInput;
  termsConditionsConsentTimestamp?: InputMaybe<Scalars['Timestamp']>;
};

export type StartUkWalletCreationPayload = {
  __typename?: 'StartUKWalletCreationPayload';
  success: Scalars['Boolean'];
  /** @deprecated No longer supported */
  userToken?: Maybe<Scalars['String']>;
};

export type Stash = {
  __typename?: 'Stash';
  items?: Maybe<Array<Maybe<StashItem>>>;
  metadata?: Maybe<StashMetadata>;
  transactions?: Maybe<Array<Maybe<StashTransaction>>>;
};

export type StashTransactionsArgs = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  stashId: Scalars['ID'];
};

export type StashItem = {
  __typename?: 'StashItem';
  balance?: Maybe<MoneyV2>;
  closedAtUtc?: Maybe<Scalars['Timestamp']>;
  createdAtUtc?: Maybe<Scalars['Timestamp']>;
  id: Scalars['ID'];
  imageUrl?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<StashStatus>;
  targetAmount?: Maybe<MoneyV2>;
};

export type StashMetadata = {
  __typename?: 'StashMetadata';
  isMarketingCardFinished?: Maybe<Scalars['Boolean']>;
  isStashEntryButtonInSpendAccountHidden?: Maybe<Scalars['Boolean']>;
};

export enum StashStatus {
  Closed = 'CLOSED',
  Open = 'OPEN',
}

export type StashTransaction = {
  __typename?: 'StashTransaction';
  amount: MoneyV2;
  id: Scalars['ID'];
  transactionTimeUtc?: Maybe<Scalars['Timestamp']>;
};

export type StateBasedOffer = {
  __typename?: 'StateBasedOffer';
  combinedDiscount: Scalars['Float'];
  offerExplaination: Scalars['String'];
  offerExplanationCta?: Maybe<Scalars['String']>;
  state: Scalars['String'];
  tiles: Array<StateBasedOfferTile>;
};

export type StateBasedOfferTile = {
  __typename?: 'StateBasedOfferTile';
  content: Scalars['String'];
  subContent: Scalars['String'];
};

export type StopSuperContributionPayload = {
  __typename?: 'StopSuperContributionPayload';
  contribution?: Maybe<SuperContribution>;
};

export type StoreEventInput = {
  kind: EventLogKind;
  payload: Array<EventLogPayloadTuple>;
};

export type StripePublishableKeyInput = {
  currency: Scalars['String'];
  orgId: Scalars['String'];
};

export type SubmitInstaPayDrawdownSurveyInput = {
  idealFreqs: Array<InputMaybe<Scalars['String']>>;
  moreFeedback: Scalars['Boolean'];
  usageReasonOtherDescription?: InputMaybe<Scalars['String']>;
  usageReasons: Array<InputMaybe<Scalars['String']>>;
};

export type SubmitInstaPayDrawdownSurveyPayload = {
  __typename?: 'SubmitInstaPayDrawdownSurveyPayload';
  success: Scalars['Boolean'];
};

export type SubmitInstaPayDrawdownSurveyResult = InstapayError | SubmitInstaPayDrawdownSurveyPayload;

export type SubmitSuperContributionInput = {
  acknowledgedNoContributionTracking?: InputMaybe<Scalars['Boolean']>;
  contributionType: SuperContributionType;
  contributionValue: Scalars['Int'];
  endDate?: InputMaybe<Scalars['Timestamp']>;
  membershipId: Scalars['String'];
  preserveAmount: Scalars['Int'];
  startDate: Scalars['Timestamp'];
};

export type SubmitSuperContributionPayload = {
  __typename?: 'SubmitSuperContributionPayload';
  contribution?: Maybe<SuperContribution>;
};

export type SubscribePayload = {
  __typename?: 'SubscribePayload';
  subscribeID: Scalars['ID'];
};

export type SubscribeRecurringByDayInput = {
  bankAccountExternalId: Scalars['String'];
  firstPaymentDate?: InputMaybe<Scalars['Timestamp']>;
  maximumPayAmount: MoneyV2Input;
  minimumPayAmount: MoneyV2Input;
  orgId: Scalars['String'];
  payCycle?: InputMaybe<RecurringByDayPayCycle>;
  payDay: Weekday;
};

export type SubscribeRecurringByDayPayload = {
  __typename?: 'SubscribeRecurringByDayPayload';
  success: Scalars['Boolean'];
};

export type SubscribeRecurringByDayResult = InstapayError | SubscribeRecurringByDayPayload;

export type Subscription = {
  __typename?: 'Subscription';
  createdAt: Scalars['Timestamp'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isHPPromo?: Maybe<Scalars['Boolean']>;
  latestBill?: Maybe<Transaction>;
  provider: Provider;
  signUpLink?: Maybe<Scalars['String']>;
  status: SubscriptionStatus;
  subscriptionType: SubscriptionType;
  title?: Maybe<Scalars['String']>;
  totalSaved: CurrencyAmount;
  transactions?: Maybe<Transactions>;
  updatedAt: Scalars['Timestamp'];
};

export type SubscriptionTransactionsArgs = {
  input?: InputMaybe<TransactionsInput>;
};

export type SubscriptionEdge = {
  __typename?: 'SubscriptionEdge';
  node: Subscription;
};

export type SubscriptionInput = {
  id: Scalars['String'];
};

export enum SubscriptionStatus {
  Active = 'ACTIVE',
  Cancelled = 'CANCELLED',
  Pending = 'PENDING',
  Reject = 'REJECT',
  Submitted = 'SUBMITTED',
  Unspecified = 'UNSPECIFIED',
}

export enum SubscriptionType {
  Electricity = 'ELECTRICITY',
  Gas = 'GAS',
  HealthInsurance = 'HEALTH_INSURANCE',
  Unknown = 'UNKNOWN',
}

export type Subscriptions = {
  __typename?: 'Subscriptions';
  edges: Array<SubscriptionEdge>;
  pageInfo: PageInfo;
};

export type SubscriptionsInput = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};

export type SuperConsent = {
  __typename?: 'SuperConsent';
  createdAt: Scalars['Timestamp'];
  fundName: Scalars['String'];
  id: Scalars['String'];
  status: SuperConsentStatus;
  updatedAt: Scalars['Timestamp'];
  userId: Scalars['String'];
  usi: Scalars['String'];
};

export enum SuperConsentStatus {
  Accepted = 'accepted',
  Initial = 'initial',
  Rejected = 'rejected',
}

export type SuperConsolidation = {
  __typename?: 'SuperConsolidation';
  createdAt: Scalars['Timestamp'];
  ehUserId: Scalars['String'];
  fundName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  memberNumber: Scalars['String'];
  status: SuperConsolidationStatus;
  updatedAt: Scalars['Timestamp'];
  userId?: Maybe<Scalars['String']>;
  usi: Scalars['String'];
};

export type SuperConsolidationRequestSupport = {
  __typename?: 'SuperConsolidationRequestSupport';
  createdAt: Scalars['Timestamp'];
  ehUserId: Scalars['String'];
  id: Scalars['String'];
  swagUserId?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Timestamp'];
  usi: Scalars['String'];
};

export enum SuperConsolidationStatus {
  Cancelled = 'CANCELLED',
  CompletedOnline = 'COMPLETED_ONLINE',
  CompletedViaAto = 'COMPLETED_VIA_ATO',
  InProgress = 'IN_PROGRESS',
}

export type SuperContribution = {
  __typename?: 'SuperContribution';
  acknowledgedNoContributionTracking?: Maybe<Scalars['Boolean']>;
  contributionType: SuperContributionType;
  contributionValue: Scalars['Int'];
  createdAt: Scalars['Timestamp'];
  endDate?: Maybe<Scalars['Timestamp']>;
  id: Scalars['String'];
  membershipId: Scalars['String'];
  preserveAmount: Scalars['Int'];
  startDate: Scalars['Timestamp'];
  status: SuperContributionStatus;
  swagSuperfundId: Scalars['String'];
  userId: Scalars['String'];
};

export enum SuperContributionStatus {
  Initial = 'INITIAL',
  Started = 'STARTED',
  Stopped = 'STOPPED',
  Stopping = 'STOPPING',
}

export enum SuperContributionType {
  Fixed = 'FIXED',
  Percentage = 'PERCENTAGE',
}

export type SuperfundFeatureFlag = {
  __typename?: 'SuperfundFeatureFlag';
  consolidationSupported: Scalars['Boolean'];
};

export type SuperfundMetadata = {
  __typename?: 'SuperfundMetadata';
  externalLink?: Maybe<Scalars['String']>;
};

export type SwagStore = {
  __typename?: 'SwagStore';
  allOffers?: Maybe<SwagStoreOffers>;
  buyAgainGiftCards?: Maybe<BuyAgainGiftCards>;
  discountOrderHistory?: Maybe<DiscountOrderHistory>;
  discountShopProductDetails?: Maybe<ShopProductDetailsResponse>;
  stripePublishableKey?: Maybe<PublishableKey>;
};

export type SwagStoreAllOffersArgs = {
  input?: InputMaybe<SsAllOffersInput>;
};

export type SwagStoreBuyAgainGiftCardsArgs = {
  input?: InputMaybe<SsBuyAgainGiftCardsInput>;
};

export type SwagStoreDiscountOrderHistoryArgs = {
  input: DiscountOrderHistoryInput;
};

export type SwagStoreDiscountShopProductDetailsArgs = {
  input: DiscountShopProductDetailsInput;
};

export type SwagStoreStripePublishableKeyArgs = {
  input: StripePublishableKeyInput;
};

export type SwagStoreOffer = {
  __typename?: 'SwagStoreOffer';
  country?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  discountPrice: Scalars['Float'];
  discountPriceInPoints?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  imageUrl: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  priceInPoints?: Maybe<Scalars['Int']>;
  productCode: Scalars['String'];
  productType: Scalars['String'];
  serviceFee: Scalars['Float'];
  termsAndConditions?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type SwagStoreOfferEdge = {
  __typename?: 'SwagStoreOfferEdge';
  cursor: Scalars['String'];
  node: SwagStoreOffer;
};

export type SwagStoreOffers = {
  __typename?: 'SwagStoreOffers';
  edges: Array<SwagStoreOfferEdge>;
  error?: Maybe<GenericError>;
  pageInfo: PageInfo;
};

export type SwagSuperfund = {
  __typename?: 'SwagSuperfund';
  abn: Scalars['String'];
  fundChoice: Scalars['String'];
  fundName: Scalars['String'];
  id: Scalars['ID'];
  memberNumber: Scalars['String'];
  superfundFeatureFlag?: Maybe<SuperfundFeatureFlag>;
  superfundMetadata?: Maybe<SuperfundMetadata>;
  usi: Scalars['String'];
};

export type TaxObligationInput = {
  country?: InputMaybe<Scalars['String']>;
  noTaxIdNumberReason?: InputMaybe<NoTaxIdNumberReason>;
  taxIdNumber?: InputMaybe<Scalars['String']>;
};

export type Transaction = BillTransaction | PaymentTransaction;

export type TransactionBase = {
  createdAt: Scalars['Timestamp'];
  id: Scalars['String'];
  transactionDate: Scalars['Date'];
  type: TxnType;
};

export type TransactionEdge = {
  __typename?: 'TransactionEdge';
  node: Transaction;
};

export type TransactionMerchant = {
  __typename?: 'TransactionMerchant';
  name?: Maybe<Scalars['String']>;
  singleLineAddress?: Maybe<Scalars['String']>;
};

export type TransactionMeta = {
  __typename?: 'TransactionMeta';
  accountNumber?: Maybe<Scalars['String']>;
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
  Unknown = 'Unknown',
}

export enum TransactionState {
  Clear = 'Clear',
  Pending = 'Pending',
  Reversed = 'Reversed',
  Settled = 'Settled',
  Unknown = 'Unknown',
}

export enum TransactionType {
  Card = 'CARD',
  Refund = 'REFUND',
  Stash = 'STASH',
  TopUp = 'TOP_UP',
  TransferOut = 'TRANSFER_OUT',
}

export type Transactions = {
  __typename?: 'Transactions';
  edges: Array<TransactionEdge>;
  pageInfo: PageInfo;
};

export type TransactionsInput = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};

export type TransferAuWalletFundsInput = {
  accountName: Scalars['String'];
  accountNumber: Scalars['String'];
  amount: MoneyV2Input;
  bsb: Scalars['String'];
  category?: InputMaybe<Scalars['String']>;
  description: Scalars['String'];
  idempotencyKey?: InputMaybe<Scalars['String']>;
  reference?: InputMaybe<Scalars['String']>;
  senderName?: InputMaybe<Scalars['String']>;
};

export type TransferAuWalletFundsPayload = {
  __typename?: 'TransferAUWalletFundsPayload';
  outcome?: Maybe<TransactionOutcome>;
  transactionId?: Maybe<Scalars['ID']>;
};

export type TransferPeerDetails = BsbTransferPeerDetails | FasterPaymentsTransferPeerDetails;

export enum TxnType {
  Bill = 'BILL',
  Payment = 'PAYMENT',
  Unknown = 'UNKNOWN',
}

export type UkTokenPayload = {
  __typename?: 'UKTokenPayload';
  userToken: Scalars['String'];
};

export type UkWalletDetails = {
  __typename?: 'UKWalletDetails';
  accountName?: Maybe<Scalars['String']>;
  accountNumber?: Maybe<Scalars['String']>;
  availableBalance?: Maybe<Scalars['Float']>;
  cardId?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  sortCode?: Maybe<Scalars['String']>;
  totalBalance?: Maybe<Scalars['Float']>;
};

export type UkAccessTokenState = {
  __typename?: 'UkAccessTokenState';
  valid: Scalars['Boolean'];
};

export type UkAuthFactor = {
  __typename?: 'UkAuthFactor';
  channel?: Maybe<UkAuthFactorChannel>;
  status?: Maybe<UkAuthFactorStatus>;
  type?: Maybe<UkAuthFactorType>;
};

export enum UkAuthFactorChannel {
  Authy = 'AUTHY',
  Biometric = 'BIOMETRIC',
  Sms = 'SMS',
}

export enum UkAuthFactorStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  PendingVerification = 'PENDING_VERIFICATION',
}

export enum UkAuthFactorType {
  Biometric = 'BIOMETRIC',
  Otp = 'OTP',
  Push = 'PUSH',
}

export type UkStepUpResult = {
  __typename?: 'UkStepUpResult';
  accessToken?: Maybe<Scalars['String']>;
  challengeId: Scalars['String'];
  state: UkStepupResultState;
};

export enum UkStepupResultState {
  Failed = 'FAILED',
  Passed = 'PASSED',
}

export enum UkTransactionState {
  Approved = 'APPROVED',
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  Pending = 'PENDING',
}

export type UniversalAddressInput = {
  addressLine1: Scalars['String'];
  addressLine2?: InputMaybe<Scalars['String']>;
  country: Scalars['String'];
  postcode: Scalars['String'];
  region?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  townOrCity: Scalars['String'];
};

export type UpdateAutoEnrolmentInput = {
  message?: InputMaybe<Scalars['String']>;
  status: Scalars['Boolean'];
};

export type UpdateAutoEnrolmentPayload = {
  __typename?: 'UpdateAutoEnrolmentPayload';
  error?: Maybe<GenericError>;
  success: Scalars['Boolean'];
};

export type UpdateBankDetailsInput = {
  accountNumber: Scalars['String'];
  bsb: Scalars['String'];
};

export type UpdateBankDetailsPayload = {
  __typename?: 'UpdateBankDetailsPayload';
  error?: Maybe<GenericError>;
  success: Scalars['Boolean'];
};

export type UpdateBankLinkedStatusInput = {
  message?: InputMaybe<Scalars['String']>;
  status: Scalars['Boolean'];
};

export type UpdateBankLinkedStatusPayload = {
  __typename?: 'UpdateBankLinkedStatusPayload';
  error?: Maybe<GenericError>;
  success: Scalars['Boolean'];
};

export type UpdateMySuperConsentStatusInput = {
  status: SuperConsentStatus;
  trimedUsi: Scalars['String'];
};

export type UpdateRecurringByDayInput = {
  bankAccountExternalId?: InputMaybe<Scalars['String']>;
  firstPaymentDate?: InputMaybe<Scalars['Timestamp']>;
  maximumPayAmount?: InputMaybe<MoneyV2Input>;
  minimumPayAmount?: InputMaybe<MoneyV2Input>;
  orgId: Scalars['String'];
  payCycle?: InputMaybe<RecurringByDayPayCycle>;
  payDay?: InputMaybe<Weekday>;
};

export type UpdateRecurringByDayPayload = {
  __typename?: 'UpdateRecurringByDayPayload';
  subscription?: Maybe<RecurringByDaySubscription>;
  success: Scalars['Boolean'];
};

export type UpdateRecurringByDayResult = InstapayError | UpdateRecurringByDayPayload;

export type UpdateSchedulingSubscriptionInput = {
  amount?: InputMaybe<MoneyV2Input>;
  bankAccountExternalId?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  orgId: Scalars['String'];
  plan?: InputMaybe<SchedulingSubscriptionPlan>;
};

export type UpdateSuperConsentPayload = {
  __typename?: 'UpdateSuperConsentPayload';
  superConsent?: Maybe<SuperConsent>;
};

export type UpdateUserCategoriesPreferenceInput = {
  categories?: InputMaybe<Array<InputMaybe<UserCategoryInput>>>;
};

export type UpdateUserCategoriesPreferencePayload = {
  __typename?: 'UpdateUserCategoriesPreferencePayload';
  userCategoriesPreferences?: Maybe<Array<Maybe<UserCategoriesPreference>>>;
};

export type UpdateWalletProfileInput = {
  dateOfBirth?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<PersonalNameInput>;
  phoneNumber?: InputMaybe<PhoneNumberInput>;
  residentialAddress?: InputMaybe<AddressInput>;
};

export type User = {
  __typename?: 'User';
  activeSuperContribution?: Maybe<SuperContribution>;
  benefits?: Maybe<Benefits>;
  billManagement?: Maybe<BillManagement>;
  cashback?: Maybe<Cashback>;
  details?: Maybe<UserDetails>;
  eHUserInitializationDetails?: Maybe<UserInitializationDetailsPayload>;
  experiment?: Maybe<Experiment>;
  featureVisibility: FeatureVisibility;
  group?: Maybe<Group>;
  heroPoints?: Maybe<HeroPoints>;
  hrDetails: HrUser;
  id: Scalars['ID'];
  instapay?: Maybe<UserInstapay>;
  kpUserInitializationDetails?: Maybe<UserInitializationDetailsPayload>;
  lifecycle?: Maybe<Lifecycle>;
  minSupportVersion?: Maybe<MinSupportVersion>;
  noOrgPermissions?: Maybe<NoOrgPermissions>;
  org?: Maybe<HrOrg>;
  orgs: Array<HrOrg>;
  /** @deprecated Please use wallet profile change requests instead */
  profileChangeRequests?: Maybe<ProfileChangeRequestPayload>;
  /** @deprecated Super consent service will be removed */
  superConsent?: Maybe<SuperConsent>;
  superConsolidation?: Maybe<SuperConsolidation>;
  superConsolidationRequestSupport?: Maybe<SuperConsolidationRequestSupport>;
  superContributions?: Maybe<Array<Maybe<SuperContribution>>>;
  swagStore?: Maybe<SwagStore>;
  swagSuperfund?: Maybe<SwagSuperfund>;
  userGroupConsent?: Maybe<UserGroupConsent>;
  userPermission?: Maybe<UserPermissionPayload>;
  wallet?: Maybe<Wallet>;
};

export type UserEhUserInitializationDetailsArgs = {
  orgId?: InputMaybe<Scalars['String']>;
};

export type UserNoOrgPermissionsArgs = {
  isCandidate: Scalars['Boolean'];
};

export type UserOrgArgs = {
  id: Scalars['ID'];
};

export type UserSuperConsentArgs = {
  fundName: Scalars['String'];
  usi: Scalars['String'];
};

export type UserSuperConsolidationArgs = {
  usi: Scalars['String'];
};

export type UserSuperConsolidationRequestSupportArgs = {
  usi: Scalars['String'];
};

export type UserSuperContributionsArgs = {
  statusIn?: InputMaybe<Array<InputMaybe<SuperContributionStatus>>>;
};

export type UserUserPermissionArgs = {
  permissionRequest: UserPermissionInput;
};

export type UserAddressInput = {
  country: Scalars['String'];
  longForm: Scalars['String'];
  postcode: Scalars['String'];
  region: Scalars['String'];
  streetName?: InputMaybe<Scalars['String']>;
  streetNumber?: InputMaybe<Scalars['String']>;
  streetType?: InputMaybe<Scalars['String']>;
  townOrCity: Scalars['String'];
  unitNumber?: InputMaybe<Scalars['String']>;
};

export type UserBankDetails = {
  __typename?: 'UserBankDetails';
  accountNumber?: Maybe<Scalars['String']>;
  bsb?: Maybe<Scalars['String']>;
  error?: Maybe<GenericError>;
  id: Scalars['Int'];
};

export type UserCategoriesPreference = {
  __typename?: 'UserCategoriesPreference';
  categoryId: Scalars['String'];
  createdAt: Scalars['Timestamp'];
  id: Scalars['String'];
  userId: Scalars['String'];
};

export type UserCategoryInput = {
  categoryId?: InputMaybe<Scalars['String']>;
  categoryName?: InputMaybe<Scalars['String']>;
};

export enum UserDetailChangeRequestType {
  DateOfBirth = 'DATE_OF_BIRTH',
  Name = 'NAME',
}

export type UserDetails = {
  __typename?: 'UserDetails';
  dateOfBirth?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  mailingAddress?: Maybe<Address>;
  middleName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<PhoneNumber>;
  residentialAddress?: Maybe<Address>;
};

export type UserGroupConsent = {
  __typename?: 'UserGroupConsent';
  consented: Scalars['Boolean'];
  createdAt: Scalars['Timestamp'];
  id: Scalars['String'];
  userId: Scalars['String'];
};

export type UserInitializationDetailAddress = {
  __typename?: 'UserInitializationDetailAddress';
  addressLine1: Scalars['String'];
  addressLine2?: Maybe<Scalars['String']>;
  addressLine3?: Maybe<Scalars['String']>;
  country: Scalars['String'];
  postcode: Scalars['String'];
  region: Scalars['String'];
  townOrCity: Scalars['String'];
};

export type UserInitializationDetails = {
  __typename?: 'UserInitializationDetails';
  address?: Maybe<UserInitializationDetailAddress>;
  dateOfBirth?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  middleName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<PhoneNumber>;
};

export type UserInitializationDetailsPayload = {
  __typename?: 'UserInitializationDetailsPayload';
  error?: Maybe<GenericError>;
  user?: Maybe<UserInitializationDetails>;
};

export type UserInstapay = {
  __typename?: 'UserInstapay';
  transactions: InstapayTransactionsResult;
  usage: InstapayUsageResult;
};

export type UserInstapayTransactionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  filters: InstapayTransactionsFilterInput;
  first?: InputMaybe<Scalars['Int']>;
};

export type UserMutation = {
  __typename?: 'UserMutation';
  patchProfile?: Maybe<EhProfile>;
  updateMailingAddress: Scalars['Boolean'];
};

export type UserMutationPatchProfileArgs = {
  input: EhProfilePatchInput;
};

export type UserMutationUpdateMailingAddressArgs = {
  input: UserAddressInput;
};

export type UserPermission = {
  __typename?: 'UserPermission';
  enabled: Scalars['Boolean'];
  name: Scalars['String'];
};

export type UserPermissionInput = {
  kpBrandIds?: InputMaybe<Array<Scalars['Int']>>;
  kpBusinessIds?: InputMaybe<Array<Scalars['Int']>>;
  kpEmployeeIds?: InputMaybe<Array<Scalars['Int']>>;
  kpPartnerIds?: InputMaybe<Array<Scalars['Int']>>;
};

export type UserPermissionPayload = {
  __typename?: 'UserPermissionPayload';
  error?: Maybe<GenericError>;
  permissions: Array<UserPermission>;
};

export type VerifyPhoneNumberRequest = {
  code: Scalars['String'];
};

export type WaitList = {
  __typename?: 'WaitList';
  projectID: Scalars['ID'];
  status: WaitListStatus;
};

export type WaitListPayload = {
  __typename?: 'WaitListPayload';
  waitList?: Maybe<GroupWaitList>;
};

export enum WaitListStatus {
  Blocked = 'BLOCKED',
  Stopped = 'STOPPED',
  Subscribed = 'SUBSCRIBED',
  Unsubscribed = 'UNSUBSCRIBED',
}

export type Wallet = {
  __typename?: 'Wallet';
  IDVProfile?: Maybe<IdvProfile>;
  /** @deprecated No longer supported */
  UKCurrentPaymentCard?: Maybe<PaymentCardDetails>;
  UKCurrentPaymentCardV2?: Maybe<PaymentCardDetails>;
  UKToken?: Maybe<UkTokenPayload>;
  UKWalletDetails?: Maybe<UkWalletDetails>;
  auActiveScheduledPayments?: Maybe<Array<Maybe<ScheduledPayment>>>;
  card?: Maybe<Card>;
  details: WalletDetails;
  ehBinRange?: Maybe<EhBinRange>;
  latestUkStepUpResult?: Maybe<UkStepUpResult>;
  notification?: Maybe<WalletNotification>;
  payeeAddresses?: Maybe<Array<Maybe<BsbTransferPayeeAddress>>>;
  persistentNotifications?: Maybe<Array<Maybe<PersistentNotification>>>;
  seenSSACarouselTimestamp?: Maybe<Scalars['Timestamp']>;
  stash?: Maybe<Stash>;
  transactions?: Maybe<Array<Maybe<FinancialTransaction>>>;
  ukAccessTokenState?: Maybe<UkAccessTokenState>;
  ukAuthFactors?: Maybe<Array<Maybe<UkAuthFactor>>>;
  ukTransactionState?: Maybe<FinancialTransactionState>;
  walletProfileChangeRequests?: Maybe<WalletProfileChangeRequestPayload>;
};

export type WalletIdvProfileArgs = {
  country: CountryOfOrigin;
};

export type WalletUkCurrentPaymentCardV2Args = {
  accessToken: Scalars['String'];
};

export type WalletNotificationArgs = {
  country: CountryOfOrigin;
};

export type WalletTransactionsArgs = {
  country: CountryOfOrigin;
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};

export type WalletUkAccessTokenStateArgs = {
  accessToken: Scalars['String'];
};

export type WalletUkTransactionStateArgs = {
  externalTransactionId: Scalars['String'];
};

export type WalletDetails = {
  __typename?: 'WalletDetails';
  accountNumber: Scalars['String'];
  availableBalance?: Maybe<MoneyV2>;
  bsb: Scalars['String'];
  externalId: Scalars['String'];
  name: Scalars['String'];
  setupStatus?: Maybe<SetupStatus>;
  status: Scalars['String'];
};

export type WalletNotification = {
  __typename?: 'WalletNotification';
  content?: Maybe<Scalars['String']>;
  ctaCaptions: CtaCaptions;
  note?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Timestamp'];
};

export enum WalletNotificationType {
  ApplePayReminder_24Hrs = 'APPLE_PAY_REMINDER_24_HRS',
  GooglePay_24HrsPartialProvisioning = 'GOOGLE_PAY_24_HRS_PARTIAL_PROVISIONING',
}

export type WalletProfileChangeRequest = {
  __typename?: 'WalletProfileChangeRequest';
  createdAt: Scalars['String'];
  dateOfBirth?: Maybe<Scalars['String']>;
  name?: Maybe<PersonalName>;
  type: WalletProfileChangeRequestType;
};

export type WalletProfileChangeRequestPayload = {
  __typename?: 'WalletProfileChangeRequestPayload';
  error?: Maybe<GenericError>;
  requests?: Maybe<Array<Maybe<WalletProfileChangeRequest>>>;
};

export enum WalletProfileChangeRequestType {
  DateOfBirth = 'DATE_OF_BIRTH',
  Name = 'NAME',
}

export enum WalletSetupStatus {
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  InProgress = 'IN_PROGRESS',
  None = 'NONE',
}

export enum WalletStatusReason {
  Archived = 'ARCHIVED',
  ManualRejected = 'MANUAL_REJECTED',
  None = 'NONE',
}

export enum WalletType {
  AppleWallet = 'APPLE_WALLET',
  GooglePay = 'GOOGLE_PAY',
  SamsungPay = 'SAMSUNG_PAY',
}

export enum Weekday {
  Friday = 'FRIDAY',
  Monday = 'MONDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
  Thursday = 'THURSDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY',
}

export type WithdrawFromStashInput = {
  amount: MoneyV2Input;
};

export type GetBenefitsCategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type GetBenefitsCategoriesQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    benefits?: {
      __typename?: 'Benefits';
      categories: Array<{ __typename?: 'Category'; categoryCode: string; name: string; imageUrl: string }>;
    } | null;
  } | null;
};

export type SearchAllProductsQueryVariables = Exact<{
  onlineInput?: InputMaybe<OnlineOffersInput>;
  instoreInput?: InputMaybe<AllAdvertisersInput>;
  billInput?: InputMaybe<BmOfferInput>;
  ssInput?: InputMaybe<SsAllOffersInput>;
}>;

export type SearchAllProductsQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    cashback?: {
      __typename?: 'Cashback';
      onlineOffers: {
        __typename?: 'OnlineOffers';
        edges: Array<{
          __typename?: 'OnlineOfferEdge';
          node: {
            __typename?: 'OnlineOffer';
            id: string;
            type: OfferType;
            categoryCode: string;
            title: string;
            description: string;
            cashback: string;
            imageUrl: string;
            logoUrl: string;
            trackingUrl: string;
            howItWorks: string;
            tnc: string;
            about: string;
            advertiserId: string;
            advertiserName: string;
            advertiserAbout: string;
            isCardLinkedOffer: boolean;
            popularScore: number;
            createdAt: string;
            updatedAt: string;
          };
        }>;
        pageInfo: {
          __typename?: 'PageInfo';
          hasNextPage: boolean;
          endCursor?: string | null;
          totalCount?: number | null;
          totalPages?: number | null;
        };
      };
      instoreAdvertisers: {
        __typename?: 'AllAdvertisers';
        edges: Array<{
          __typename?: 'AdvertiserEdge';
          node: {
            __typename?: 'Advertiser';
            id: string;
            advertiserId: string;
            advertiserName: string;
            advertiserAbout: string;
            type: OfferType;
            offers: Array<
              | {
                  __typename?: 'InstoreOfferV2';
                  id: string;
                  type: OfferType;
                  offerId: string;
                  title: string;
                  description: string;
                  cashback: string;
                  categoryCode: string;
                  howItWorks: string;
                  imageUrl: string;
                  logoUrl: string;
                  advertiserName: string;
                  advertiserAbout: string;
                  tnc: string;
                  website: string;
                  phone: string;
                  popularScore: number;
                  startDate: string;
                  endDate: string;
                  createdAt: string;
                  updatedAt: string;
                  locations: Array<{
                    __typename?: 'OfferLocation';
                    locationId: string;
                    address: string;
                    latitude: number;
                    longitude: number;
                  }>;
                }
              | { __typename?: 'OnlineOffer' }
            >;
          };
        }>;
        pageInfo: {
          __typename?: 'PageInfo';
          hasNextPage: boolean;
          endCursor?: string | null;
          totalCount?: number | null;
          totalPages?: number | null;
        };
      };
    } | null;
    billManagement?: {
      __typename?: 'BillManagement';
      offersV3: {
        __typename?: 'BmOffers';
        edges: Array<{
          __typename?: 'BmOfferEdge';
          node: {
            __typename?: 'BmOffer';
            id: string;
            description: string;
            title: string;
            howItWorks: string;
            about: string;
            termsAndConditions: string;
            categoryCode: string;
            savingPercentage: number;
            signUpLink: string;
            logoUrl: string;
            imageUrl: string;
            provider: {
              __typename?: 'Provider';
              id: Pid;
              name: string;
              faq?: string | null;
              contactInfo?: string | null;
              paymentUrl?: string | null;
            };
            estBillAmount: { __typename?: 'CurrencyAmount'; amount: number; currency: Currency };
            paidAmount: { __typename?: 'CurrencyAmount'; amount: number; currency: Currency };
            reminder?: { __typename?: 'Reminder'; reminderDescription: string; reminderTextCopy: string } | null;
          };
        }>;
        pageInfo: {
          __typename?: 'PageInfo';
          hasNextPage: boolean;
          endCursor?: string | null;
          totalCount?: number | null;
          totalPages?: number | null;
        };
      };
    } | null;
    swagStore?: {
      __typename?: 'SwagStore';
      allOffers?: {
        __typename?: 'SwagStoreOffers';
        edges: Array<{
          __typename?: 'SwagStoreOfferEdge';
          cursor: string;
          node: {
            __typename?: 'SwagStoreOffer';
            id: string;
            name: string;
            title: string;
            price: number;
            discountPrice: number;
            serviceFee: number;
            productCode: string;
            imageUrl: string;
            productType: string;
            description: string;
            termsAndConditions?: string | null;
            country?: string | null;
            currency?: string | null;
            priceInPoints?: number | null;
            discountPriceInPoints?: number | null;
          };
        }>;
        pageInfo: {
          __typename?: 'PageInfo';
          hasNextPage: boolean;
          endCursor?: string | null;
          totalCount?: number | null;
          totalPages?: number | null;
        };
      } | null;
    } | null;
  } | null;
};

export type GetBmOfferQueryVariables = Exact<{
  input?: InputMaybe<BmOfferInput>;
}>;

export type GetBmOfferQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    billManagement?: {
      __typename?: 'BillManagement';
      offersV3: {
        __typename?: 'BmOffers';
        edges: Array<{
          __typename?: 'BmOfferEdge';
          node: {
            __typename?: 'BmOffer';
            id: string;
            title: string;
            description: string;
            howItWorks: string;
            about: string;
            termsAndConditions: string;
            savingPercentage: number;
            signUpLink: string;
            logoUrl: string;
            imageUrl: string;
            categoryCode: string;
            provider: { __typename?: 'Provider'; id: Pid; name: string };
            estBillAmount: { __typename?: 'CurrencyAmount'; amount: number; currency: Currency };
            paidAmount: { __typename?: 'CurrencyAmount'; amount: number; currency: Currency };
            reminder?: { __typename?: 'Reminder'; reminderDescription: string; reminderTextCopy: string } | null;
            stateBasedOffers?: Array<{
              __typename?: 'StateBasedOffer';
              state: string;
              combinedDiscount: number;
              offerExplaination: string;
              offerExplanationCta?: string | null;
              tiles: Array<{ __typename?: 'StateBasedOfferTile'; content: string; subContent: string }>;
            }> | null;
          };
        }>;
      };
    } | null;
  } | null;
};

export type GetBmOfferDetailQueryVariables = Exact<{
  input: OfferInput;
}>;

export type GetBmOfferDetailQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    billManagement?: {
      __typename?: 'BillManagement';
      offerV2?: {
        __typename?: 'BmOffer';
        id: string;
        title: string;
        description: string;
        howItWorks: string;
        about: string;
        termsAndConditions: string;
        savingPercentage: number;
        signUpLink: string;
        logoUrl: string;
        imageUrl: string;
        categoryCode: string;
        provider: { __typename?: 'Provider'; id: Pid; name: string };
        estBillAmount: { __typename?: 'CurrencyAmount'; amount: number; currency: Currency };
        paidAmount: { __typename?: 'CurrencyAmount'; amount: number; currency: Currency };
        reminder?: { __typename?: 'Reminder'; reminderDescription: string; reminderTextCopy: string } | null;
        stateBasedOffers?: Array<{
          __typename?: 'StateBasedOffer';
          state: string;
          combinedDiscount: number;
          offerExplaination: string;
          offerExplanationCta?: string | null;
          tiles: Array<{ __typename?: 'StateBasedOfferTile'; content: string; subContent: string }>;
        }> | null;
      } | null;
    } | null;
  } | null;
};

export type GetSubscriptionsQueryVariables = Exact<{
  input?: InputMaybe<SubscriptionsInput>;
}>;

export type GetSubscriptionsQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    billManagement?: {
      __typename?: 'BillManagement';
      subscriptions: {
        __typename?: 'Subscriptions';
        edges: Array<{
          __typename?: 'SubscriptionEdge';
          node: {
            __typename?: 'Subscription';
            id: string;
            status: SubscriptionStatus;
            createdAt: string;
            updatedAt: string;
            isHPPromo?: boolean | null;
            subscriptionType: SubscriptionType;
            signUpLink?: string | null;
            title?: string | null;
            description?: string | null;
            provider: { __typename?: 'Provider'; id: Pid; name: string; logoUrl?: string | null };
            totalSaved: { __typename?: 'CurrencyAmount'; amount: number; currency: Currency };
            latestBill?:
              | {
                  __typename?: 'BillTransaction';
                  id: string;
                  createdAt: string;
                  type: TxnType;
                  issueDate: string;
                  dateFrom: string;
                  dateTo: string;
                  dueDate: string;
                  status: BillStatus;
                  transactionDate: string;
                  amount: { __typename?: 'CurrencyAmount'; amount: number; currency: Currency };
                }
              | {
                  __typename?: 'PaymentTransaction';
                  id: string;
                  createdAt: string;
                  type: TxnType;
                  paymentDate: string;
                  paymentMethod?: PaymentMethod | null;
                  paymentType?: PaymentType | null;
                  transactionDate: string;
                  amount: { __typename?: 'CurrencyAmount'; amount: number; currency: Currency };
                }
              | null;
          };
        }>;
        pageInfo: { __typename?: 'PageInfo'; hasNextPage: boolean; endCursor?: string | null };
      };
    } | null;
  } | null;
};

export type GetSubscriptionDetailQueryVariables = Exact<{
  input: SubscriptionInput;
}>;

export type GetSubscriptionDetailQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    billManagement?: {
      __typename?: 'BillManagement';
      subscription?: {
        __typename?: 'Subscription';
        id: string;
        status: SubscriptionStatus;
        createdAt: string;
        updatedAt: string;
        isHPPromo?: boolean | null;
        subscriptionType: SubscriptionType;
        signUpLink?: string | null;
        title?: string | null;
        description?: string | null;
        latestBill?:
          | {
              __typename?: 'BillTransaction';
              id: string;
              createdAt: string;
              type: TxnType;
              issueDate: string;
              dateFrom: string;
              dateTo: string;
              dueDate: string;
              status: BillStatus;
              transactionDate: string;
              amount: { __typename?: 'CurrencyAmount'; amount: number; currency: Currency };
            }
          | { __typename?: 'PaymentTransaction' }
          | null;
        provider: {
          __typename?: 'Provider';
          id: Pid;
          name: string;
          faq?: string | null;
          contactInfo?: string | null;
          paymentUrl?: string | null;
        };
        transactions?: {
          __typename?: 'Transactions';
          edges: Array<{
            __typename?: 'TransactionEdge';
            node:
              | {
                  __typename?: 'BillTransaction';
                  id: string;
                  createdAt: string;
                  type: TxnType;
                  issueDate: string;
                  dateFrom: string;
                  dateTo: string;
                  dueDate: string;
                  status: BillStatus;
                  transactionDate: string;
                  amount: { __typename?: 'CurrencyAmount'; amount: number; currency: Currency };
                }
              | {
                  __typename?: 'PaymentTransaction';
                  id: string;
                  createdAt: string;
                  type: TxnType;
                  paymentDate: string;
                  paymentMethod?: PaymentMethod | null;
                  paymentType?: PaymentType | null;
                  transactionDate: string;
                  amount: { __typename?: 'CurrencyAmount'; amount: number; currency: Currency };
                };
          }>;
          pageInfo: { __typename?: 'PageInfo'; hasNextPage: boolean; endCursor?: string | null };
        } | null;
        totalSaved: { __typename?: 'CurrencyAmount'; amount: number; currency: Currency };
      } | null;
    } | null;
  } | null;
};

export type GetSubscriptionTransactionsQueryVariables = Exact<{
  subcriptionInput: SubscriptionInput;
  transactionsInput?: InputMaybe<TransactionsInput>;
}>;

export type GetSubscriptionTransactionsQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    billManagement?: {
      __typename?: 'BillManagement';
      subscription?: {
        __typename?: 'Subscription';
        transactions?: {
          __typename?: 'Transactions';
          pageInfo: { __typename?: 'PageInfo'; hasNextPage: boolean; endCursor?: string | null };
          edges: Array<{
            __typename?: 'TransactionEdge';
            node:
              | {
                  __typename?: 'BillTransaction';
                  id: string;
                  createdAt: string;
                  type: TxnType;
                  issueDate: string;
                  dateFrom: string;
                  dateTo: string;
                  dueDate: string;
                  status: BillStatus;
                  transactionDate: string;
                  amount: { __typename?: 'CurrencyAmount'; amount: number; currency: Currency };
                }
              | {
                  __typename?: 'PaymentTransaction';
                  id: string;
                  createdAt: string;
                  type: TxnType;
                  paymentDate: string;
                  paymentMethod?: PaymentMethod | null;
                  paymentType?: PaymentType | null;
                  transactionDate: string;
                  amount: { __typename?: 'CurrencyAmount'; amount: number; currency: Currency };
                };
          }>;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type BsJoinWaitListMutationVariables = Exact<{
  input?: InputMaybe<BsJoinWaitListInput>;
}>;

export type BsJoinWaitListMutation = {
  __typename?: 'Mutation';
  bsJoinWaitList?: { __typename?: 'BsJoinWaitListPayload'; success: boolean; message?: string | null } | null;
};

export type BmSubmitSubscriptionMutationVariables = Exact<{
  input?: InputMaybe<BsSubmitSubscriptionInput>;
}>;

export type BmSubmitSubscriptionMutation = {
  __typename?: 'Mutation';
  bmSubmitSubscription?: { __typename?: 'BmSubmitSubscriptionPayload'; success: boolean } | null;
};

export type SearchBillOffersQueryVariables = Exact<{
  input?: InputMaybe<BmOfferInput>;
}>;

export type SearchBillOffersQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    billManagement?: {
      __typename?: 'BillManagement';
      offersV3: {
        __typename?: 'BmOffers';
        edges: Array<{
          __typename?: 'BmOfferEdge';
          node: {
            __typename?: 'BmOffer';
            id: string;
            description: string;
            title: string;
            howItWorks: string;
            about: string;
            termsAndConditions: string;
            savingPercentage: number;
            signUpLink: string;
            categoryCode: string;
            provider: {
              __typename?: 'Provider';
              id: Pid;
              name: string;
              faq?: string | null;
              contactInfo?: string | null;
              paymentUrl?: string | null;
            };
            estBillAmount: { __typename?: 'CurrencyAmount'; amount: number; currency: Currency };
            paidAmount: { __typename?: 'CurrencyAmount'; amount: number; currency: Currency };
            reminder?: { __typename?: 'Reminder'; reminderDescription: string; reminderTextCopy: string } | null;
            stateBasedOffers?: Array<{
              __typename?: 'StateBasedOffer';
              state: string;
              combinedDiscount: number;
              offerExplaination: string;
              offerExplanationCta?: string | null;
              tiles: Array<{ __typename?: 'StateBasedOfferTile'; content: string; subContent: string }>;
            }> | null;
          };
        }>;
        pageInfo: {
          __typename?: 'PageInfo';
          hasNextPage: boolean;
          endCursor?: string | null;
          totalCount?: number | null;
          totalPages?: number | null;
        };
      };
    } | null;
  } | null;
};

export type IsEligibleForPromotionQueryVariables = Exact<{
  input?: InputMaybe<EligibleForPromotionInput>;
}>;

export type IsEligibleForPromotionQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    billManagement?: { __typename?: 'BillManagement'; isEligibleForPromotion?: boolean | null } | null;
  } | null;
};

export type GetHomeTilesQueryVariables = Exact<{ [key: string]: never }>;

export type GetHomeTilesQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    billManagement?: {
      __typename?: 'BillManagement';
      homeTiles: {
        __typename?: 'HomeTiles';
        tiles: Array<{
          __typename?: 'HomeTileDetail';
          banner: string;
          title: string;
          subTitle: string;
          provider: { __typename?: 'Provider'; id: Pid };
        }>;
      };
    } | null;
  } | null;
};

export type GetPromotionQueryVariables = Exact<{ [key: string]: never }>;

export type GetPromotionQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    billManagement?: {
      __typename?: 'BillManagement';
      promotion?: {
        __typename?: 'Promotion';
        homeTitle: string;
        homeSubTitle: string;
        cardTitle: string;
        cardSubTitle: string;
        tagContent: string;
        descriptionBtsTitle: string;
        descriptionBtsContent: string;
        offerTitle: string;
        offerSubTitle: string;
        termsAndConditions: string;
        signedUpBillStatusContent: string;
        signedUpCardTitle: string;
        signedUpCardSubTitle: string;
        searchCardTitle: string;
      } | null;
    } | null;
  } | null;
};

export type GetAhmAccessTokenQueryVariables = Exact<{ [key: string]: never }>;

export type GetAhmAccessTokenQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    billManagement?: { __typename?: 'BillManagement'; ahmAccessToken?: string | null } | null;
  } | null;
};

export type GetCurrentCardDetailsQueryVariables = Exact<{ [key: string]: never }>;

export type GetCurrentCardDetailsQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    wallet?: {
      __typename?: 'Wallet';
      card?: {
        __typename?: 'Card';
        details?: { __typename?: 'CardDetails'; id: string; status: CardStatus } | null;
      } | null;
    } | null;
  } | null;
};

export type GetCurrentCardMetaQueryVariables = Exact<{ [key: string]: never }>;

export type GetCurrentCardMetaQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    wallet?: {
      __typename?: 'Wallet';
      card?: {
        __typename?: 'Card';
        meta?: {
          __typename?: 'CardMeta';
          id: string;
          contactless?: boolean | null;
          frozen?: boolean | null;
          magStrip?: boolean | null;
          mobileWalletPaymentEnabled?: boolean | null;
          digitalWalletDetails?: {
            __typename?: 'DigitalWalletDetails';
            primaryAccountIdentifier?: string | null;
            wallets?: Array<{ __typename?: 'DigitalWallet'; reference: string; type: WalletType } | null> | null;
          } | null;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type GetOemProvisioningQueryVariables = Exact<{ [key: string]: never }>;

export type GetOemProvisioningQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    wallet?: {
      __typename?: 'Wallet';
      card?: {
        __typename?: 'Card';
        oemProvisioning?: {
          __typename?: 'OemProvisioning';
          cardHolderName: string;
          cardToken: string;
          expiryDate: string;
          otp: string;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type CreateCardMutationVariables = Exact<{
  input: CreateCardInput;
}>;

export type CreateCardMutation = {
  __typename?: 'Mutation';
  card?: {
    __typename?: 'CardMutation';
    create?: { __typename?: 'CardCreateMutationPayload'; success: boolean } | null;
  } | null;
};

export type ActivateCardMutationVariables = Exact<{ [key: string]: never }>;

export type ActivateCardMutation = {
  __typename?: 'Mutation';
  card?: {
    __typename?: 'CardMutation';
    activate?: { __typename?: 'CardActivateMutationPayload'; success: boolean } | null;
  } | null;
};

export type RequestNewCardMutationVariables = Exact<{
  address: RequestNewCardInput;
}>;

export type RequestNewCardMutation = {
  __typename?: 'Mutation';
  card?: {
    __typename?: 'CardMutation';
    requestNewCard?: { __typename?: 'CardRequestNewMutationPayload'; success: boolean } | null;
  } | null;
};

export type UpdateCardMetaMutationVariables = Exact<{
  cardMeta: CardMetaInput;
}>;

export type UpdateCardMetaMutation = {
  __typename?: 'Mutation';
  card?: {
    __typename?: 'CardMutation';
    updateMeta?: { __typename?: 'CardUpdateMetaMutationPayload'; success: boolean } | null;
  } | null;
};

export type UpdateCardPinMutationVariables = Exact<{
  cardPIN: Scalars['String'];
}>;

export type UpdateCardPinMutation = {
  __typename?: 'Mutation';
  card?: {
    __typename?: 'CardMutation';
    updatePin?: { __typename?: 'CardUpdatePinMutationPayload'; success: boolean } | null;
  } | null;
};

export type GetCashbackOffersQueryVariables = Exact<{
  input?: InputMaybe<AllOffersInput>;
}>;

export type GetCashbackOffersQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    cashback?: {
      __typename?: 'Cashback';
      allOffers: {
        __typename?: 'AllOffers';
        edges: Array<{
          __typename?: 'AllOfferEdge';
          node:
            | {
                __typename?: 'InStoreOffer';
                id: string;
                type: OfferType;
                offerId: string;
                title: string;
                description: string;
                cashback: string;
                categoryCode: string;
                howItWorks: string;
                imageUrl: string;
                logoUrl: string;
                advertiserName: string;
                advertiserAbout: string;
                tnc: string;
                website: string;
                phone: string;
                address: string;
                latitude: number;
                longitude: number;
                popularScore: number;
                startDate: string;
                endDate: string;
                createdAt: string;
                updatedAt: string;
              }
            | {
                __typename?: 'OnlineOffer';
                id: string;
                type: OfferType;
                categoryCode: string;
                title: string;
                description: string;
                cashback: string;
                imageUrl: string;
                logoUrl: string;
                trackingUrl: string;
                howItWorks: string;
                tnc: string;
                about: string;
                advertiserName: string;
                advertiserAbout: string;
                isCardLinkedOffer: boolean;
                popularScore: number;
                createdAt: string;
                updatedAt: string;
              };
        }>;
        pageInfo: {
          __typename?: 'PageInfo';
          hasNextPage: boolean;
          endCursor?: string | null;
          totalCount?: number | null;
          totalPages?: number | null;
        };
      };
    } | null;
  } | null;
};

export type GetOnlineOfferByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type GetOnlineOfferByIdQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    cashback?: {
      __typename?: 'Cashback';
      onlineOfferById?: {
        __typename?: 'OnlineOffer';
        id: string;
        type: OfferType;
        categoryCode: string;
        title: string;
        description: string;
        cashback: string;
        imageUrl: string;
        logoUrl: string;
        trackingUrl: string;
        howItWorks: string;
        tnc: string;
        about: string;
        advertiserName: string;
        advertiserAbout: string;
        isCardLinkedOffer: boolean;
        popularScore: number;
        createdAt: string;
        updatedAt: string;
      } | null;
    } | null;
  } | null;
};

export type GetInstoreOfferByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type GetInstoreOfferByIdQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    cashback?: {
      __typename?: 'Cashback';
      inStoreOfferById?: {
        __typename?: 'InStoreOffer';
        id: string;
        type: OfferType;
        offerId: string;
        title: string;
        description: string;
        cashback: string;
        categoryCode: string;
        howItWorks: string;
        imageUrl: string;
        logoUrl: string;
        advertiserId: string;
        advertiserName: string;
        advertiserAbout: string;
        tnc: string;
        website: string;
        phone: string;
        address: string;
        latitude: number;
        longitude: number;
        popularScore: number;
        startDate: string;
        endDate: string;
        createdAt: string;
        updatedAt: string;
      } | null;
    } | null;
  } | null;
};

export type CashbackCategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type CashbackCategoriesQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    cashback?: {
      __typename?: 'Cashback';
      categories: Array<{ __typename?: 'Category'; categoryCode: string; name: string; imageUrl: string }>;
    } | null;
  } | null;
};

export type AcceptTncMutationVariables = Exact<{ [key: string]: never }>;

export type AcceptTncMutation = {
  __typename?: 'Mutation';
  cashback?: {
    __typename?: 'CashbackMutation';
    acceptTnc?: { __typename?: 'CashbackAcceptTncPayload'; success: boolean } | null;
  } | null;
};

export type GetFeaturedOffersQueryVariables = Exact<{
  input?: InputMaybe<FeaturesOffersInput>;
}>;

export type GetFeaturedOffersQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    cashback?: {
      __typename?: 'Cashback';
      featuresOffers: {
        __typename?: 'FeatureOffers';
        edges: Array<{
          __typename?: 'FeatureOfferEdge';
          node: {
            __typename?: 'OnlineOffer';
            id: string;
            type: OfferType;
            categoryCode: string;
            title: string;
            description: string;
            cashback: string;
            imageUrl: string;
            logoUrl: string;
            trackingUrl: string;
            howItWorks: string;
            tnc: string;
            about: string;
            advertiserId: string;
            advertiserName: string;
            advertiserAbout: string;
            isCardLinkedOffer: boolean;
            popularScore: number;
            createdAt: string;
            updatedAt: string;
          };
        }>;
        pageInfo: {
          __typename?: 'PageInfo';
          hasNextPage: boolean;
          endCursor?: string | null;
          totalCount?: number | null;
          totalPages?: number | null;
        };
      };
    } | null;
  } | null;
};

export type GetCashbackOffersGroupByAdvertiserQueryVariables = Exact<{
  input?: InputMaybe<AllAdvertisersInput>;
}>;

export type GetCashbackOffersGroupByAdvertiserQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    cashback?: {
      __typename?: 'Cashback';
      allAdvertisers: {
        __typename?: 'AllAdvertisers';
        edges: Array<{
          __typename?: 'AdvertiserEdge';
          node: {
            __typename?: 'Advertiser';
            id: string;
            advertiserId: string;
            advertiserName: string;
            advertiserAbout: string;
            type: OfferType;
            offers: Array<
              | {
                  __typename?: 'InstoreOfferV2';
                  id: string;
                  type: OfferType;
                  offerId: string;
                  title: string;
                  description: string;
                  cashback: string;
                  categoryCode: string;
                  howItWorks: string;
                  imageUrl: string;
                  logoUrl: string;
                  advertiserName: string;
                  advertiserAbout: string;
                  tnc: string;
                  website: string;
                  phone: string;
                  popularScore: number;
                  startDate: string;
                  endDate: string;
                  createdAt: string;
                  updatedAt: string;
                  locations: Array<{
                    __typename?: 'OfferLocation';
                    locationId: string;
                    address: string;
                    latitude: number;
                    longitude: number;
                  }>;
                }
              | {
                  __typename?: 'OnlineOffer';
                  id: string;
                  type: OfferType;
                  categoryCode: string;
                  title: string;
                  description: string;
                  cashback: string;
                  imageUrl: string;
                  logoUrl: string;
                  trackingUrl: string;
                  howItWorks: string;
                  tnc: string;
                  about: string;
                  advertiserId: string;
                  advertiserName: string;
                  advertiserAbout: string;
                  isCardLinkedOffer: boolean;
                  popularScore: number;
                  createdAt: string;
                  updatedAt: string;
                }
            >;
          };
        }>;
        pageInfo: {
          __typename?: 'PageInfo';
          hasNextPage: boolean;
          endCursor?: string | null;
          totalCount?: number | null;
          totalPages?: number | null;
        };
      };
    } | null;
  } | null;
};

export type GetInstoreOffersByAdvertiserIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type GetInstoreOffersByAdvertiserIdQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    cashback?: {
      __typename?: 'Cashback';
      instoreOffersByAdvertiserId: {
        __typename?: 'InstoreOffersV2';
        offers: Array<{
          __typename?: 'InstoreOfferV2';
          id: string;
          type: OfferType;
          offerId: string;
          title: string;
          description: string;
          cashback: string;
          categoryCode: string;
          howItWorks: string;
          imageUrl: string;
          logoUrl: string;
          advertiserName: string;
          advertiserAbout: string;
          tnc: string;
          website: string;
          phone: string;
          popularScore: number;
          startDate: string;
          endDate: string;
          createdAt: string;
          updatedAt: string;
          locations: Array<{
            __typename?: 'OfferLocation';
            locationId: string;
            address: string;
            latitude: number;
            longitude: number;
          }>;
        }>;
      };
    } | null;
  } | null;
};

export type GetCashbackTermsAndConditionsQueryVariables = Exact<{ [key: string]: never }>;

export type GetCashbackTermsAndConditionsQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    cashback?: {
      __typename?: 'Cashback';
      termsAndConditions: {
        __typename?: 'CashbackTermsAndConditions';
        items?: Array<{
          __typename?: 'CashbackTermsAndConditionsItem';
          text: string;
          textVariant: string;
          type: string;
          boldText?: string | null;
          boldTextVariant?: string | null;
          showListItemSymbol?: boolean | null;
          url?: string | null;
        }> | null;
      };
    } | null;
  } | null;
};

export type GetCashbackTermsAndConditionsAcceptanceQueryVariables = Exact<{ [key: string]: never }>;

export type GetCashbackTermsAndConditionsAcceptanceQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    cashback?: {
      __typename?: 'Cashback';
      termsAndConditionsAcceptance: {
        __typename?: 'CashbackTermsAndConditionsAcceptance';
        isAccepted?: boolean | null;
      };
    } | null;
  } | null;
};

export type GetEnrolCardDetailScreenQueryVariables = Exact<{ [key: string]: never }>;

export type GetEnrolCardDetailScreenQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    cashback?: {
      __typename?: 'Cashback';
      banks?: {
        __typename?: 'CashbackBanks';
        edges: Array<{
          __typename?: 'CashbackBankEdge';
          node: { __typename?: 'CashbackBank'; id: number; name: string; region: string };
        }>;
      } | null;
      ehProviderId: { __typename?: 'EhProviderId'; id: string };
    } | null;
    wallet?: {
      __typename?: 'Wallet';
      ehBinRange?: { __typename?: 'EhBinRange'; from: string; to: string } | null;
    } | null;
  } | null;
};

export type GetEhProviderIdQueryVariables = Exact<{ [key: string]: never }>;

export type GetEhProviderIdQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    cashback?: { __typename?: 'Cashback'; ehProviderId: { __typename?: 'EhProviderId'; id: string } } | null;
  } | null;
};

export type CashbackDeleteCardMutationVariables = Exact<{
  deleteCard: CashbackDeleteCardInput;
}>;

export type CashbackDeleteCardMutation = {
  __typename?: 'Mutation';
  cashback?: {
    __typename?: 'CashbackMutation';
    deleteCard?: { __typename?: 'CashbackDeleteCardPayload'; success: boolean } | null;
  } | null;
};

export type CashbackTransactionsV2QueryVariables = Exact<{
  input?: InputMaybe<CashbackTransactionsV2Input>;
}>;

export type CashbackTransactionsV2Query = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    cashback?: {
      __typename?: 'Cashback';
      transactionsV2: {
        __typename?: 'CashbackTransactionsV2';
        total: number;
        pending: number;
        confirmed: number;
        edges: Array<{
          __typename?: 'CashbackTransactionEdge';
          node: {
            __typename?: 'CashbackTransaction';
            id: number;
            transactionId: string;
            offerId: number;
            imageUrl: string;
            amount: number;
            created: string;
            advertiserName: string;
            state: TransactionState;
            title: string;
            description: string;
            recordType: TransactionRecordType;
            purchaseAmount?: number | null;
            fee: number;
          };
        }>;
        error?: { __typename: 'GenericError'; message: string } | null;
      };
    } | null;
  } | null;
};

export type CashbackOnboardUserMutationVariables = Exact<{ [key: string]: never }>;

export type CashbackOnboardUserMutation = {
  __typename?: 'Mutation';
  cashback?: {
    __typename?: 'CashbackMutation';
    onboardUser?: {
      __typename?: 'OnboardUserPayload';
      success: boolean;
      error?: { __typename?: 'GenericError'; message: string } | null;
    } | null;
  } | null;
};

export type CashbackOnboardStatusQueryVariables = Exact<{ [key: string]: never }>;

export type CashbackOnboardStatusQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    cashback?: {
      __typename?: 'Cashback';
      onboardStatus: {
        __typename?: 'OnboardStatus';
        hasCLOOnboarded: boolean;
        error?: { __typename?: 'GenericError'; message: string } | null;
      };
    } | null;
  } | null;
};

export type CashbackUpdateBankDetailsMutationVariables = Exact<{
  updateBankDetails: UpdateBankDetailsInput;
}>;

export type CashbackUpdateBankDetailsMutation = {
  __typename?: 'Mutation';
  cashback?: {
    __typename?: 'CashbackMutation';
    updateBankDetails?: {
      __typename?: 'UpdateBankDetailsPayload';
      success: boolean;
      error?: { __typename?: 'GenericError'; message: string } | null;
    } | null;
  } | null;
};

export type CashbackLinkedCardsQueryVariables = Exact<{ [key: string]: never }>;

export type CashbackLinkedCardsQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    cashback?: {
      __typename?: 'Cashback';
      linkedCards: {
        __typename?: 'LinkedCards';
        cards: Array<{
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
        error?: { __typename?: 'GenericError'; message: string } | null;
      };
    } | null;
  } | null;
};

export type CashbackUpdateBankLinkedStatusMutationVariables = Exact<{
  updateBankLinkedStatus: UpdateBankLinkedStatusInput;
}>;

export type CashbackUpdateBankLinkedStatusMutation = {
  __typename?: 'Mutation';
  cashback?: {
    __typename?: 'CashbackMutation';
    updateBankLinkedStatus?: {
      __typename?: 'UpdateBankLinkedStatusPayload';
      success: boolean;
      error?: { __typename?: 'GenericError'; message: string } | null;
    } | null;
  } | null;
};

export type CashbackUpdateAutoEnrolMutationVariables = Exact<{
  updateAutoEnrolment: UpdateAutoEnrolmentInput;
}>;

export type CashbackUpdateAutoEnrolMutation = {
  __typename?: 'Mutation';
  cashback?: {
    __typename?: 'CashbackMutation';
    updateAutoEnrolment?: {
      __typename?: 'UpdateAutoEnrolmentPayload';
      success: boolean;
      error?: { __typename?: 'GenericError'; message: string } | null;
    } | null;
  } | null;
};

export type CashbackUserBankDetailsQueryVariables = Exact<{ [key: string]: never }>;

export type CashbackUserBankDetailsQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    cashback?: {
      __typename?: 'Cashback';
      userBankDetails?: {
        __typename?: 'UserBankDetails';
        id: number;
        bsb?: string | null;
        accountNumber?: string | null;
        error?: { __typename?: 'GenericError'; message: string } | null;
      } | null;
    } | null;
  } | null;
};

export type CashbackUserInfoQueryVariables = Exact<{ [key: string]: never }>;

export type CashbackUserInfoQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    cashback?: {
      __typename?: 'Cashback';
      cashbackUserInfo: {
        __typename?: 'CashbackUserInfo';
        autoEnrolMessage?: string | null;
        autoEnrolStatus: CashbackAutoEnrolStatus;
        bankLinkedMessage?: string | null;
        bankLinkedStatus?: CashbackBankLinkedStatus | null;
        createdAt: string;
        updatedAt: string;
        error?: { __typename?: 'GenericError'; message: string } | null;
      };
    } | null;
  } | null;
};

export type CashbackUserTokenQueryVariables = Exact<{ [key: string]: never }>;

export type CashbackUserTokenQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    cashback?: {
      __typename?: 'Cashback';
      cashbackUserToken: { __typename?: 'CashbackUserToken'; token: string; key: string };
    } | null;
  } | null;
};

export type ExperimentGetUserWaitListQueryVariables = Exact<{
  projectId: Scalars['ID'];
}>;

export type ExperimentGetUserWaitListQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    experiment?: {
      __typename?: 'Experiment';
      waitList: { __typename?: 'WaitList'; projectID: string; status: WaitListStatus };
    } | null;
  } | null;
};

export type GetInstapayAdsQueryVariables = Exact<{ [key: string]: never }>;

export type GetInstapayAdsQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    experiment?: {
      __typename?: 'Experiment';
      instapayAds: { __typename?: 'InstapayAds'; adDisplayInterval: number };
    } | null;
  } | null;
};

export type ExperimentAddEventMutationVariables = Exact<{
  event: EventInput;
}>;

export type ExperimentAddEventMutation = {
  __typename?: 'Mutation';
  experiment?: {
    __typename?: 'ExperimentMutation';
    addEvent: { __typename?: 'AddEventPayload'; eventID: string };
  } | null;
};

export type ExperimentSubscribeMutationVariables = Exact<{
  projectID: Scalars['ID'];
}>;

export type ExperimentSubscribeMutation = {
  __typename?: 'Mutation';
  experiment?: {
    __typename?: 'ExperimentMutation';
    subscribe: { __typename?: 'SubscribePayload'; subscribeID: string };
  } | null;
};

export type AddBeneficiaryMutationVariables = Exact<{
  input: NewBeneficiaryInput;
}>;

export type AddBeneficiaryMutation = {
  __typename?: 'Mutation';
  floatAccount?: {
    __typename?: 'FloatAccountMutation';
    addBeneficiary: { __typename?: 'NewBeneficiaryPayload'; beneficiaryId: string };
  } | null;
};

export type JoinWaitListWithCategoriesMutationVariables = Exact<{
  categories?: InputMaybe<Array<InputMaybe<UserCategoryInput>> | InputMaybe<UserCategoryInput>>;
  categoryAction: CategoryAction;
}>;

export type JoinWaitListWithCategoriesMutation = {
  __typename?: 'Mutation';
  group?: {
    __typename?: 'GroupMutation';
    updateUserCategoriesPreference?: {
      __typename?: 'UpdateUserCategoriesPreferencePayload';
      userCategoriesPreferences?: Array<{ __typename?: 'UserCategoriesPreference'; id: string } | null> | null;
    } | null;
    joinWaitList?: {
      __typename?: 'WaitListPayload';
      waitList?: { __typename?: 'GroupWaitList'; userId: string } | null;
    } | null;
  } | null;
};

export type GetUserWaitListQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserWaitListQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    group?: {
      __typename?: 'Group';
      waitList?: { __typename?: 'GroupWaitList'; userId: string; createdAt: string } | null;
    } | null;
  } | null;
};

export type GetGroupDetailQueryVariables = Exact<{
  groupId: Scalars['String'];
}>;

export type GetGroupDetailQuery = {
  __typename?: 'Query';
  group?: {
    __typename?: 'GroupRoot';
    groupDetail?: {
      __typename?: 'GroupDetail';
      id: string;
      imageSrc: string;
      title: string;
      promoTitle: string;
      subtitle: string;
      memberCount: number;
      savingRange: string;
      savingPeriod: string;
      description: string;
      howItWorks: string;
      shareContent: string;
      countries?: Array<string> | null;
      categories?: Array<{ __typename?: 'GroupCategory'; id: string; name: string }> | null;
    } | null;
  } | null;
};

export type GetGroupsQueryVariables = Exact<{
  country?: InputMaybe<Scalars['String']>;
}>;

export type GetGroupsQuery = {
  __typename?: 'Query';
  group?: {
    __typename?: 'GroupRoot';
    groups?: Array<{
      __typename?: 'GroupDetail';
      id: string;
      imageSrc: string;
      title: string;
      promoTitle: string;
      subtitle: string;
      memberCount: number;
      savingRange: string;
      savingPeriod: string;
      description: string;
      howItWorks: string;
      shareContent: string;
      countries?: Array<string> | null;
      categories?: Array<{ __typename?: 'GroupCategory'; id: string; name: string }> | null;
    } | null> | null;
  } | null;
};

export type GetGroupCategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type GetGroupCategoriesQuery = {
  __typename?: 'Query';
  group?: {
    __typename?: 'GroupRoot';
    categories?: Array<{ __typename?: 'GroupCategory'; id: string; name: string } | null> | null;
  } | null;
};

export type GetUserGroupMembershipAndConsentQueryVariables = Exact<{
  groupId: Scalars['String'];
}>;

export type GetUserGroupMembershipAndConsentQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    group?: {
      __typename?: 'Group';
      groupMembership?: { __typename?: 'GroupMembership'; position: number } | null;
    } | null;
    userGroupConsent?: { __typename?: 'UserGroupConsent'; consented: boolean } | null;
  } | null;
};

export type JoinGroupWithConsentAgreementMutationVariables = Exact<{
  input?: InputMaybe<JoinGroupInput>;
  consented: Scalars['Boolean'];
}>;

export type JoinGroupWithConsentAgreementMutation = {
  __typename?: 'Mutation';
  group?: {
    __typename?: 'GroupMutation';
    joinGroup?: {
      __typename?: 'JoinGroupPayload';
      groupMembership?: { __typename?: 'GroupMembership'; id: string; position: number } | null;
    } | null;
    createConsentGroupAgreement?: { __typename?: 'UserGroupConsent'; consented: boolean } | null;
  } | null;
};

export type GetHeroPointsBalanceQueryVariables = Exact<{
  orgId?: InputMaybe<Scalars['String']>;
}>;

export type GetHeroPointsBalanceQuery = {
  __typename?: 'Query';
  me?: { __typename?: 'User'; heroPoints?: { __typename?: 'HeroPoints'; balance: number } | null } | null;
};

export type GetHeroPointsTransactionDetailQueryVariables = Exact<{
  orgId: Scalars['String'];
  id: Scalars['String'];
}>;

export type GetHeroPointsTransactionDetailQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    heroPoints?: {
      __typename?: 'HeroPoints';
      transactionDetails?: {
        __typename?: 'HeroPointsTransaction';
        id: string;
        refId: string;
        points: number;
        transactionTimeUtc: string;
        transactionType: HeroPointsTransactionType;
        clientType: HeroPointsClientType;
        reason?: string | null;
        reasonType?: HeroPointsReasonType | null;
        recognisedBy?: string | null;
        organisationName?: string | null;
        merchantName?: string | null;
      } | null;
    } | null;
  } | null;
};

export type GetHeroPointsTransactionHistoriesQueryVariables = Exact<{
  orgId: Scalars['String'];
  pageIndex?: InputMaybe<Scalars['Int']>;
  itemPerPage?: InputMaybe<Scalars['Int']>;
}>;

export type GetHeroPointsTransactionHistoriesQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    heroPoints?: {
      __typename?: 'HeroPoints';
      transactionHistories?: {
        __typename?: 'HeroPointsTransactionHistories';
        pageIndex: number;
        totalPages: number;
        items?: Array<{
          __typename?: 'HeroPointsTransactionItem';
          id: string;
          refId: string;
          points: number;
          transactionTimeUtc: string;
          transactionType: HeroPointsTransactionType;
          clientType: HeroPointsClientType;
          reason?: string | null;
          reasonType?: HeroPointsReasonType | null;
        } | null> | null;
      } | null;
    } | null;
  } | null;
};

export type GetHeroPointsPaymentPreferencesQueryVariables = Exact<{ [key: string]: never }>;

export type GetHeroPointsPaymentPreferencesQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    heroPoints?: {
      __typename?: 'HeroPoints';
      paymentPreferences?: { __typename?: 'HeroPointsPaymentPreferences'; payWithHPOnSwagCard?: boolean | null } | null;
    } | null;
  } | null;
};

export type GetPayWithHpCarouselSeenQueryVariables = Exact<{ [key: string]: never }>;

export type GetPayWithHpCarouselSeenQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    heroPoints?: { __typename?: 'HeroPoints'; payWithHPCarouselSeen?: boolean | null } | null;
  } | null;
};

export type UpdateHeroPointsPaymentPreferencesMutationVariables = Exact<{
  payWithHPOnSwagCard?: InputMaybe<Scalars['Boolean']>;
}>;

export type UpdateHeroPointsPaymentPreferencesMutation = {
  __typename?: 'Mutation';
  heroPoints?: {
    __typename?: 'HeroPointsMutation';
    paymentPreferences?: { __typename?: 'HeroPointsPaymentPreferences'; payWithHPOnSwagCard?: boolean | null } | null;
  } | null;
};

export type UpdatePayWithHpCarouselSeenMutationVariables = Exact<{ [key: string]: never }>;

export type UpdatePayWithHpCarouselSeenMutation = {
  __typename?: 'Mutation';
  heroPoints?: { __typename?: 'HeroPointsMutation'; payWithHPCarouselSeen?: boolean | null } | null;
};

export type GetEhProfileQueryVariables = Exact<{ [key: string]: never }>;

export type GetEhProfileQuery = {
  __typename?: 'Query';
  me?: { __typename?: 'User'; hrDetails: { __typename?: 'HrUser'; countryCode?: string | null } } | null;
};

export type InstapayUsageVerificationQueryVariables = Exact<{ [key: string]: never }>;

export type InstapayUsageVerificationQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    orgs: Array<{ __typename?: 'HrOrg'; instapay?: { __typename?: 'Instapay'; isFirstTime: boolean } | null }>;
  } | null;
};

export type GetAllInstapayAvailableBalancesQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllInstapayAvailableBalancesQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    orgs: Array<{
      __typename?: 'HrOrg';
      id: number;
      uuid: string;
      kpBusinessId: number;
      name: string;
      member?: {
        __typename?: 'MemberDetail';
        ehMemberUuid: string;
        kpEmployeeId: number;
        work_country?: string | null;
      } | null;
      instapay?: {
        __typename?: 'Instapay';
        balance:
          | { __typename: 'InstapayBalance'; balance: number; id: string }
          | {
              __typename: 'InstapayError';
              code: InstapayErrorCode;
              context?: { __typename?: 'InstapayBalanceErrorContext'; payCycle: PayCycle } | null;
            };
        withdrawalLimit:
          | { __typename: 'InstapayError'; code: InstapayErrorCode }
          | {
              __typename: 'InstapayWithdrawalLimit';
              withdrawalMinLimit: number;
              withdrawalMaxLimit: number;
              schedulingWithdrawalMinLimit: number;
            };
      } | null;
    }>;
  } | null;
};

export type GetBankAccountsForOrgQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type GetBankAccountsForOrgQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    org?: {
      __typename?: 'HrOrg';
      instapay?: {
        __typename?: 'Instapay';
        bankAccounts?: Array<{
          __typename?: 'InstapayBankAccount';
          accountName: string;
          accountNumber: string;
          bankAccountSource: InstapayBankAccountSource;
          bsb?: string | null;
          sortCode?: string | null;
          beneficiaryId?: string | null;
          externalId: string;
          isSSA?: boolean | null;
          feeV2: { __typename?: 'Fee'; type: FeeType; percentage: number };
        } | null> | null;
      } | null;
    } | null;
  } | null;
};

export type GetInstapayTransactionsQueryVariables = Exact<{
  filters: InstapayTransactionsFilterInput;
}>;

export type GetInstapayTransactionsQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    orgs: Array<{
      __typename?: 'HrOrg';
      instapay?: {
        __typename?: 'Instapay';
        transactions:
          | { __typename?: 'InstapayError'; code: InstapayErrorCode }
          | {
              __typename?: 'InstapayTransactions';
              transactions: Array<{
                __typename?: 'InstapayTransaction';
                id: string;
                createdAt: string;
                amount: {
                  __typename?: 'Money';
                  units?: number | null;
                  subUnits?: number | null;
                  type?: CurrencyType | null;
                };
                bankAccount?: { __typename?: 'InstapayTransactionBankAccount'; accountName?: string | null } | null;
              }>;
              pageInfo?: {
                __typename?: 'InstapayTransactionsPageInfo';
                endCursor: string;
                hasNextPage: boolean;
              } | null;
            };
      } | null;
    }>;
  } | null;
};

export type GetInstapayUserTransactionsQueryVariables = Exact<{
  filters: InstapayTransactionsFilterInput;
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;

export type GetInstapayUserTransactionsQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    orgs: Array<{ __typename?: 'HrOrg'; ehMemberUuid: string; kpEmployeeId: number; name: string }>;
    instapay?: {
      __typename?: 'UserInstapay';
      transactions:
        | { __typename: 'InstapayError'; code: InstapayErrorCode }
        | {
            __typename?: 'InstapayTransactions';
            transactions: Array<{
              __typename?: 'InstapayTransaction';
              id: string;
              memberId: string;
              abaLodgementReference: string;
              createdAt: string;
              amount: {
                __typename?: 'Money';
                units?: number | null;
                subUnits?: number | null;
                type?: CurrencyType | null;
              };
              adminFee: { __typename?: 'MoneyV2'; units: number; subUnits: number; type: CurrencyType; sign: Sign };
              bankAccount?: {
                __typename?: 'InstapayTransactionBankAccount';
                accountName?: string | null;
                bsb?: string | null;
              } | null;
            }>;
            pageInfo?: { __typename?: 'InstapayTransactionsPageInfo'; endCursor: string; hasNextPage: boolean } | null;
          };
    } | null;
  } | null;
};

export type GetInstapayVisibilityQueryVariables = Exact<{ [key: string]: never }>;

export type GetInstapayVisibilityQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    featureVisibility: {
      __typename?: 'FeatureVisibility';
      instapayNow?: {
        __typename?: 'InstaPayNowVisibility';
        showInstapay: boolean;
        showEstIncome: boolean;
        underMaintenance: boolean;
      } | null;
    };
  } | null;
};

export type GetOrgsQueryVariables = Exact<{ [key: string]: never }>;

export type GetOrgsQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    orgs: Array<{
      __typename?: 'HrOrg';
      id: number;
      uuid: string;
      kpBusinessId: number;
      isIndependentContractor: boolean;
      source: Platform;
      ehMemberId: number;
    }>;
  } | null;
};

export type ShowInstapayIntroductionQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type ShowInstapayIntroductionQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    org?: {
      __typename?: 'HrOrg';
      instapay?: { __typename?: 'Instapay'; showInstapayIntroductionV2?: boolean | null } | null;
    } | null;
  } | null;
};

export type DrawdownInstapayMutationVariables = Exact<{
  input: DrawdownInput;
}>;

export type DrawdownInstapayMutation = {
  __typename?: 'Mutation';
  instapay?: {
    __typename?: 'InstapayMutation';
    drawdown: {
      __typename?: 'DrawdownPayload';
      success: boolean;
      messageCode?: string | null;
      transactionId?: string | null;
      version?: number | null;
    };
  } | null;
};

export type AddPreferInstapayOptionMutationVariables = Exact<{
  input?: InputMaybe<InstapayOptionInput>;
}>;

export type AddPreferInstapayOptionMutation = {
  __typename?: 'Mutation';
  instapay?: {
    __typename?: 'InstapayMutation';
    addPreferInstapayOption?: { __typename?: 'AddPreferInstapayOptionPayload'; success: boolean } | null;
  } | null;
};

export type GetInstapayUsageQueryVariables = Exact<{ [key: string]: never }>;

export type GetInstapayUsageQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    instapay?: {
      __typename?: 'UserInstapay';
      usage:
        | { __typename: 'InstapayError'; code: InstapayErrorCode }
        | { __typename: 'InstapayUsage'; isFirstTime: boolean };
    } | null;
  } | null;
};

export type GetAvailableIncentivesQueryVariables = Exact<{ [key: string]: never }>;

export type GetAvailableIncentivesQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    orgs: Array<{
      __typename?: 'HrOrg';
      id: number;
      instapay?: {
        __typename?: 'Instapay';
        availableIncentives?:
          | { __typename: 'InstapayError'; code: InstapayErrorCode }
          | {
              __typename?: 'InstapayNowIncentivePayload';
              incentives?: Array<{
                __typename?: 'InstapayNowIncentive';
                id: string;
                process: { __typename?: 'InstapayNowIncentiveProcess'; earningProcess: number; isRedeemed: boolean };
                maxTransactionThreshold: {
                  __typename?: 'MoneyV2';
                  type: CurrencyType;
                  sign: Sign;
                  units: number;
                  subUnits: number;
                };
              } | null> | null;
            }
          | null;
      } | null;
    }>;
  } | null;
};

export type GetEstInstapayBalancesQueryVariables = Exact<{ [key: string]: never }>;

export type GetEstInstapayBalancesQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    orgs: Array<{
      __typename?: 'HrOrg';
      instapay?: {
        __typename?: 'Instapay';
        estBalance:
          | {
              __typename: 'InstapayEstBalance';
              id: string;
              createdAt?: string | null;
              balance: { __typename?: 'MoneyV2'; units: number; subUnits: number; type: CurrencyType; sign: Sign };
            }
          | { __typename: 'InstapayEstBalanceError'; code: InstapayErrorCode };
      } | null;
    }>;
  } | null;
};

export type GetEstimatedIncomeQueryVariables = Exact<{
  orgID: Scalars['ID'];
}>;

export type GetEstimatedIncomeQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    org?: {
      __typename?: 'HrOrg';
      id: number;
      instapay?: {
        __typename?: 'Instapay';
        estimatedIncome:
          | {
              __typename?: 'EstimatedIncomePayload';
              income: { __typename?: 'MoneyV2'; type: CurrencyType; sign: Sign; units: number; subUnits: number };
              payPeriod: { __typename?: 'PayPeriod'; paymentDate: string };
              deductions?: Array<{
                __typename?: 'IncomeDeduction';
                amount: { __typename?: 'MoneyV2'; type: CurrencyType; sign: Sign; units: number; subUnits: number };
              } | null> | null;
            }
          | { __typename: 'InstapayError'; code: InstapayErrorCode };
      } | null;
    } | null;
  } | null;
};

export type GetInstapaySchedulingVisibilityQueryVariables = Exact<{ [key: string]: never }>;

export type GetInstapaySchedulingVisibilityQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    featureVisibility: {
      __typename?: 'FeatureVisibility';
      instapayScheduling:
        | { __typename: 'InstapayError'; code: InstapayErrorCode }
        | { __typename: 'Permission'; view: boolean };
    };
  } | null;
};

export type GetRecurringByDayVisibilityQueryVariables = Exact<{ [key: string]: never }>;

export type GetRecurringByDayVisibilityQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    featureVisibility: {
      __typename?: 'FeatureVisibility';
      recurringByDay?: { __typename?: 'RecurringByDayVisibility'; showRecurringByDay: boolean } | null;
    };
  } | null;
};

export type GetInstaPayRecurringByDayPreviewQueryVariables = Exact<{
  orgID: Scalars['ID'];
}>;

export type GetInstaPayRecurringByDayPreviewQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    org?: {
      __typename?: 'HrOrg';
      recurringByDay?: {
        __typename?: 'RecurringByDay';
        preview:
          | { __typename: 'InstapayError'; code: InstapayErrorCode }
          | {
              __typename: 'RecurringByDayPreview';
              supportedPayCycles?: Array<RecurringByDayPayCycle | null> | null;
              memberPayCycleV2?: PayCycle | null;
              estimatedBalances?: Array<{
                __typename?: 'RecurringByDayEstimatedBalance';
                date: string;
                amount: { __typename?: 'MoneyV2'; units: number; subUnits: number; type: CurrencyType; sign: Sign };
              } | null> | null;
              payPeriod: { __typename?: 'PayPeriod'; starting: string; ending: string; paymentDate: string };
            };
      } | null;
    } | null;
  } | null;
};

export type GetAllInstapayRecurringByDaySubscriptionQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllInstapayRecurringByDaySubscriptionQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    orgs: Array<{
      __typename?: 'HrOrg';
      uuid: string;
      kpBusinessId: number;
      recurringByDay?: {
        __typename?: 'RecurringByDay';
        currentSubscription?:
          | { __typename: 'InstapayError'; code: InstapayErrorCode }
          | {
              __typename: 'RecurringByDaySubscription';
              id: string;
              minPayAmount: number;
              maxPayAmount: number;
              bankAccountExternalId: string;
              status: RecurringSubscriptionStatus;
              payDay: Weekday;
              payCycle?: RecurringByDayPayCycle | null;
              firstPaymentDate?: string | null;
              minimumPayAmount: {
                __typename?: 'MoneyV2';
                units: number;
                subUnits: number;
                type: CurrencyType;
                sign: Sign;
              };
              maximumPayAmount: {
                __typename?: 'MoneyV2';
                units: number;
                subUnits: number;
                type: CurrencyType;
                sign: Sign;
              };
            }
          | null;
      } | null;
    }>;
  } | null;
};

export type CreateSchedulingSubscriptionMutationVariables = Exact<{
  input: CreateSchedulingSubscriptionInput;
}>;

export type CreateSchedulingSubscriptionMutation = {
  __typename?: 'Mutation';
  instapay?: {
    __typename?: 'InstapayMutation';
    createSchedulingSubscription?:
      | { __typename?: 'InstapayError' }
      | { __typename?: 'SchedulingSubscriptionResult'; success: boolean }
      | null;
  } | null;
};

export type CancelSchedulingSubscriptionMutationVariables = Exact<{
  input: CancelSchedulingSubscriptionInput;
}>;

export type CancelSchedulingSubscriptionMutation = {
  __typename?: 'Mutation';
  instapay?: {
    __typename?: 'InstapayMutation';
    cancelSchedulingSubscription?:
      | { __typename?: 'InstapayError' }
      | { __typename?: 'SchedulingSubscriptionResult'; success: boolean }
      | null;
  } | null;
};

export type UpdateSchedulingSubscriptionMutationVariables = Exact<{
  input: UpdateSchedulingSubscriptionInput;
}>;

export type UpdateSchedulingSubscriptionMutation = {
  __typename?: 'Mutation';
  instapay?: {
    __typename?: 'InstapayMutation';
    updateSchedulingSubscription?:
      | { __typename?: 'InstapayError' }
      | { __typename?: 'SchedulingSubscriptionResult'; success: boolean }
      | null;
  } | null;
};

export type GetSchedulingSubscriptionsQueryVariables = Exact<{ [key: string]: never }>;

export type GetSchedulingSubscriptionsQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    orgs: Array<{
      __typename?: 'HrOrg';
      id: number;
      uuid: string;
      kpBusinessId: number;
      instapay?: {
        __typename?: 'Instapay';
        schedulingSubscriptions?:
          | {
              __typename?: 'GetSchedulingSubscription';
              subscriptions: Array<{
                __typename?: 'SchedulingSubscription';
                id: string;
                plan: SchedulingSubscriptionPlan;
                bankAccountExternalId: string;
                amount: { __typename?: 'MoneyV2'; units: number; subUnits: number };
              } | null>;
            }
          | { __typename?: 'InstapayError' }
          | null;
      } | null;
    }>;
  } | null;
};

export type DisableEarnedWageAccessFeaturesMutationVariables = Exact<{ [key: string]: never }>;

export type DisableEarnedWageAccessFeaturesMutation = {
  __typename?: 'Mutation';
  instapay?: {
    __typename?: 'InstapayMutation';
    disableEarnedWageAccessFeatures?:
      | { __typename?: 'DisableEarnedWageAccessFeaturesPayload'; success: boolean }
      | { __typename?: 'InstapayError'; code: InstapayErrorCode }
      | null;
  } | null;
};

export type SubmitInstaPayDrawdownSurveyMutationVariables = Exact<{
  input: SubmitInstaPayDrawdownSurveyInput;
}>;

export type SubmitInstaPayDrawdownSurveyMutation = {
  __typename?: 'Mutation';
  instapay?: {
    __typename?: 'InstapayMutation';
    submitInstaPayDrawdownSurvey?:
      | { __typename?: 'InstapayError'; code: InstapayErrorCode }
      | { __typename?: 'SubmitInstaPayDrawdownSurveyPayload'; success: boolean }
      | null;
  } | null;
};

export type SubscribeRecurringByDayMutationVariables = Exact<{
  input: SubscribeRecurringByDayInput;
}>;

export type SubscribeRecurringByDayMutation = {
  __typename?: 'Mutation';
  recurringByDay?: {
    __typename?: 'RecurringByDayMutation';
    subscribeRecurringByDay:
      | { __typename?: 'InstapayError'; code: InstapayErrorCode }
      | { __typename?: 'SubscribeRecurringByDayPayload'; success: boolean };
  } | null;
};

export type CancelRecurringByDayMutationVariables = Exact<{
  input: CancelRecurringByDayInput;
}>;

export type CancelRecurringByDayMutation = {
  __typename?: 'Mutation';
  recurringByDay?: {
    __typename?: 'RecurringByDayMutation';
    cancelRecurringByDay:
      | { __typename?: 'CancelRecurringByDayPayload'; success: boolean }
      | { __typename?: 'InstapayError'; code: InstapayErrorCode };
  } | null;
};

export type UpdateRecurringByDayMutationVariables = Exact<{
  input: UpdateRecurringByDayInput;
}>;

export type UpdateRecurringByDayMutation = {
  __typename?: 'Mutation';
  recurringByDay?: {
    __typename?: 'RecurringByDayMutation';
    updateRecurringByDay:
      | { __typename?: 'InstapayError'; code: InstapayErrorCode }
      | { __typename?: 'UpdateRecurringByDayPayload'; success: boolean };
  } | null;
};

export type GetRecurringByAmountEligibilityQueryVariables = Exact<{ [key: string]: never }>;

export type GetRecurringByAmountEligibilityQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    orgs: Array<{
      __typename?: 'HrOrg';
      id: number;
      uuid: string;
      kpBusinessId: number;
      name: string;
      instapay?: {
        __typename?: 'Instapay';
        recurringByAmountEligibility?: {
          __typename?: 'RecurringByAmountEligibilityResult';
          isEligible: boolean;
          errorCode?: InstapayErrorCode | null;
        } | null;
      } | null;
    }>;
  } | null;
};

export type GetEwaPushNotificationOptInStatusByFeatureQueryVariables = Exact<{
  feature: EwaPushNotificationFeature;
  orgId: Scalars['ID'];
}>;

export type GetEwaPushNotificationOptInStatusByFeatureQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    org?: {
      __typename?: 'HrOrg';
      ewaPushNotification?: {
        __typename?: 'EWAPushNotification';
        optInStatusByFeature:
          | {
              __typename?: 'EWAPushNotificationOptInStatusByFeature';
              featureLevelOptedIn: boolean;
              statuses: Array<{
                __typename?: 'EWAPushNotificationOptInStatusForSingleType';
                optedIn: boolean;
                type?: EwaPushNotificationType | null;
              }>;
            }
          | { __typename?: 'InstapayError'; code: InstapayErrorCode };
      } | null;
    } | null;
  } | null;
};

export type OptInEwaPushNotificationByTypeMutationVariables = Exact<{
  input: OptInEwaPushNotificationByTypeInput;
}>;

export type OptInEwaPushNotificationByTypeMutation = {
  __typename?: 'Mutation';
  ewaPushNotification?: {
    __typename?: 'EWAPushNotificationMutation';
    optInByType?:
      | { __typename?: 'InstapayError'; code: InstapayErrorCode }
      | { __typename?: 'OptInOutEWAPushNotificationPayload'; success: boolean }
      | null;
  } | null;
};

export type OptOutEwaPushNotificationByTypeMutationVariables = Exact<{
  input: OptOutEwaPushNotificationByTypeInput;
}>;

export type OptOutEwaPushNotificationByTypeMutation = {
  __typename?: 'Mutation';
  ewaPushNotification?: {
    __typename?: 'EWAPushNotificationMutation';
    optOutByType?:
      | { __typename?: 'InstapayError'; code: InstapayErrorCode }
      | { __typename?: 'OptInOutEWAPushNotificationPayload'; success: boolean }
      | null;
  } | null;
};

export type OptInEwaPushNotificationByFeatureMutationVariables = Exact<{
  input: OptInEwaPushNotificationByFeatureInput;
}>;

export type OptInEwaPushNotificationByFeatureMutation = {
  __typename?: 'Mutation';
  ewaPushNotification?: {
    __typename?: 'EWAPushNotificationMutation';
    optInByFeature?:
      | { __typename?: 'InstapayError'; code: InstapayErrorCode }
      | { __typename?: 'OptInOutEWAPushNotificationPayload'; success: boolean }
      | null;
  } | null;
};

export type OptOutEwaPushNotificationByFeatureMutationVariables = Exact<{
  input: OptOutEwaPushNotificationByFeatureInput;
}>;

export type OptOutEwaPushNotificationByFeatureMutation = {
  __typename?: 'Mutation';
  ewaPushNotification?: {
    __typename?: 'EWAPushNotificationMutation';
    optOutByFeature?:
      | { __typename?: 'InstapayError'; code: InstapayErrorCode }
      | { __typename?: 'OptInOutEWAPushNotificationPayload'; success: boolean }
      | null;
  } | null;
};

export type GetEventsPaginatedQueryVariables = Exact<{
  input: GetEventsInput;
}>;

export type GetEventsPaginatedQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    lifecycle?: {
      __typename?: 'Lifecycle';
      events?: Array<{
        __typename?: 'LifecycleEvent';
        id: string;
        code: string;
        source: string;
        user_id: string;
        owner_id: string;
        fund_usi: string;
        author_type: string;
        author_id: string;
        trigger_time: string;
        data: string;
        delivery_status: string;
        delivered_at?: string | null;
        accepted: boolean;
        accepted_from?: string | null;
        created_at: string;
        updated_at: string;
      } | null> | null;
    } | null;
  } | null;
};

export type GetFundNotifyPreferenceQueryVariables = Exact<{
  input: GetFundNotifyPreferenceInput;
}>;

export type GetFundNotifyPreferenceQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    lifecycle?: {
      __typename?: 'Lifecycle';
      fundNotifyPreference?: { __typename?: 'FundNotifyPreference'; enabled: boolean } | null;
    } | null;
  } | null;
};

export type AcceptEventMutationVariables = Exact<{
  input: AcceptEventInput;
}>;

export type AcceptEventMutation = {
  __typename?: 'Mutation';
  lifecycle?: {
    __typename?: 'LifecycleMutation';
    event?: {
      __typename?: 'EventMutation';
      accept?: { __typename?: 'AcceptEventPayload'; success: boolean; message?: string | null } | null;
    } | null;
  } | null;
};

export type CreateTrackingMutationVariables = Exact<{
  input: LifecycleTrackingInput;
}>;

export type CreateTrackingMutation = {
  __typename?: 'Mutation';
  lifecycle?: {
    __typename?: 'LifecycleMutation';
    event?: {
      __typename?: 'EventMutation';
      createTracking?: { __typename?: 'CreateTrackingPayload'; success: boolean } | null;
    } | null;
  } | null;
};

export type GetLocationsQueryVariables = Exact<{
  input?: InputMaybe<GetLocationsRequest>;
}>;

export type GetLocationsQuery = {
  __typename?: 'Query';
  getLocations?: {
    __typename?: 'GetLocationsResponse';
    addresses?: Array<{
      __typename?: 'GoogleAddress';
      formattedAddress: string;
      latitude?: number | null;
      longitude?: number | null;
      placeId?: string | null;
    } | null> | null;
  } | null;
};

export type GetLocationByPlaceIdQueryVariables = Exact<{
  placeId: Scalars['String'];
}>;

export type GetLocationByPlaceIdQuery = {
  __typename?: 'Query';
  getLocationByPlaceId?: {
    __typename?: 'GetLocationByPlaceIdResponse';
    addressDetails?: {
      __typename?: 'GoogleAddressDetails';
      addressLine?: string | null;
      townOrCity?: string | null;
      postCode?: string | null;
      region?: string | null;
      country?: string | null;
      formattedAddress?: string | null;
      unitNumber?: string | null;
      streetNumber?: string | null;
      streetName?: string | null;
      streetType?: string | null;
      geometry?: { __typename?: 'Geometry'; latitude?: number | null; longitude?: number | null } | null;
    } | null;
  } | null;
};

export type GetPayAccountQueryVariables = Exact<{
  orgId: Scalars['ID'];
  memberId: Scalars['String'];
}>;

export type GetPayAccountQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    org?: {
      __typename?: 'HrOrg';
      member?: {
        __typename?: 'MemberDetail';
        paySplit?: {
          __typename?: 'PaySplit';
          bankAccounts?: {
            __typename?: 'PayAccountAllocation';
            splitType: PaySplitType;
            details: Array<{
              __typename?: 'BankAccountDetails';
              accountName: string;
              accountNumber: string;
              bsb: string;
              amount: string;
            }>;
          } | null;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type SavePayAccountMutationVariables = Exact<{
  input: PaySplitInput;
}>;

export type SavePayAccountMutation = {
  __typename?: 'Mutation';
  savePaySplit: { __typename?: 'MutationSuccessPayload'; success: boolean };
};

export type GetAllocationsQueryVariables = Exact<{
  orgId: Scalars['ID'];
}>;

export type GetAllocationsQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    org?: {
      __typename?: 'HrOrg';
      member?: {
        __typename?: 'MemberDetail';
        paySplit?: {
          __typename?: 'PaySplit';
          allocations: Array<{
            __typename?: 'PayAllocation';
            allocation: {
              __typename?: 'PayAccountAllocation';
              splitType: PaySplitType;
              details: Array<{
                __typename?: 'BankAccountDetails';
                accountName: string;
                accountNumber: string;
                bsb: string;
                amount: string;
              }>;
            };
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
        } | null;
      } | null;
    } | null;
  } | null;
};

export type CreateStripeClientTokenMutationVariables = Exact<{
  createStripeClientTokenInput?: InputMaybe<CreateStripeClientTokenInput>;
}>;

export type CreateStripeClientTokenMutation = {
  __typename?: 'Mutation';
  payment?: {
    __typename?: 'PaymentMutation';
    createStripeClientToken?: {
      __typename?: 'PaymentClientTokenPayload';
      clientToken: string;
      error?: { __typename?: 'GenericError'; message: string } | null;
    } | null;
  } | null;
};

export type MakeStripePaymentMutationVariables = Exact<{
  makeStripePaymentInput: MakeStripePaymentInput;
}>;

export type MakeStripePaymentMutation = {
  __typename?: 'Mutation';
  payment?: {
    __typename?: 'PaymentMutation';
    makeStripePayment?: {
      __typename?: 'MakeStripePaymentPayload';
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
      error?: { __typename?: 'GenericError'; message: string } | null;
    } | null;
  } | null;
};

export type CreateStashMutationVariables = Exact<{
  stashInput: CreateStashInput;
}>;

export type CreateStashMutation = { __typename?: 'Mutation'; createStash?: boolean | null };

export type CloseStashMutationVariables = Exact<{
  stashId: Scalars['ID'];
}>;

export type CloseStashMutation = { __typename?: 'Mutation'; closeStash?: boolean | null };

export type DepositToStashMutationVariables = Exact<{
  stashId: Scalars['ID'];
  input: DepositToStashInput;
}>;

export type DepositToStashMutation = { __typename?: 'Mutation'; depositToStash?: boolean | null };

export type WithdrawFromStashMutationVariables = Exact<{
  stashId: Scalars['ID'];
  input: WithdrawFromStashInput;
}>;

export type WithdrawFromStashMutation = { __typename?: 'Mutation'; withdrawFromStash?: boolean | null };

export type SetStashMetadataMutationVariables = Exact<{
  input: SetStashMetadataInput;
}>;

export type SetStashMetadataMutation = { __typename?: 'Mutation'; setStashMetadata?: boolean | null };

export type GetStashesQueryVariables = Exact<{ [key: string]: never }>;

export type GetStashesQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    wallet?: {
      __typename?: 'Wallet';
      stash?: {
        __typename?: 'Stash';
        items?: Array<{
          __typename?: 'StashItem';
          id: string;
          name?: string | null;
          imageUrl?: string | null;
          closedAtUtc?: string | null;
          createdAtUtc?: string | null;
          status?: StashStatus | null;
          targetAmount?: {
            __typename?: 'MoneyV2';
            type: CurrencyType;
            sign: Sign;
            units: number;
            subUnits: number;
          } | null;
          balance?: { __typename?: 'MoneyV2'; type: CurrencyType; sign: Sign; units: number; subUnits: number } | null;
        } | null> | null;
      } | null;
    } | null;
  } | null;
};

export type GetStashMetadataQueryVariables = Exact<{ [key: string]: never }>;

export type GetStashMetadataQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    wallet?: {
      __typename?: 'Wallet';
      stash?: {
        __typename?: 'Stash';
        metadata?: {
          __typename?: 'StashMetadata';
          isMarketingCardFinished?: boolean | null;
          isStashEntryButtonInSpendAccountHidden?: boolean | null;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type GetStashTransactionsQueryVariables = Exact<{
  stashId: Scalars['ID'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
}>;

export type GetStashTransactionsQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    wallet?: {
      __typename?: 'Wallet';
      stash?: {
        __typename?: 'Stash';
        transactions?: Array<{
          __typename?: 'StashTransaction';
          id: string;
          transactionTimeUtc?: string | null;
          amount: { __typename?: 'MoneyV2'; type: CurrencyType; sign: Sign; units: number; subUnits: number };
        } | null> | null;
      } | null;
    } | null;
  } | null;
};

export type GetActiveSuperfundMembershipsQueryVariables = Exact<{ [key: string]: never }>;

export type GetActiveSuperfundMembershipsQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    swagSuperfund?: { __typename?: 'SwagSuperfund'; usi: string } | null;
    orgs: Array<{
      __typename?: 'HrOrg';
      id: number;
      uuid: string;
      name: string;
      memberId: number;
      memberUuid: string;
      activeSuperfundMembership?: {
        __typename?: 'ActiveSuperfundMembership';
        usi: string;
        abn: string;
        fundChoice: string;
        fundName: string;
        memberNumber: string;
        updatedAt: string;
      } | null;
    }>;
  } | null;
};

export type GetSwagSuperfundAndSuperContributionQueryVariables = Exact<{ [key: string]: never }>;

export type GetSwagSuperfundAndSuperContributionQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    id: string;
    swagSuperfund?: {
      __typename?: 'SwagSuperfund';
      id: string;
      fundName: string;
      memberNumber: string;
      abn: string;
      usi: string;
      fundChoice: string;
      superfundFeatureFlag?: { __typename?: 'SuperfundFeatureFlag'; consolidationSupported: boolean } | null;
      superfundMetadata?: { __typename?: 'SuperfundMetadata'; externalLink?: string | null } | null;
    } | null;
    activeSuperContribution?: {
      __typename?: 'SuperContribution';
      id: string;
      membershipId: string;
      contributionType: SuperContributionType;
      contributionValue: number;
      preserveAmount: number;
      status: SuperContributionStatus;
      startDate: string;
      endDate?: string | null;
    } | null;
  } | null;
};

export type GetSuperContributionsQueryVariables = Exact<{
  statusIn?: InputMaybe<Array<InputMaybe<SuperContributionStatus>> | InputMaybe<SuperContributionStatus>>;
}>;

export type GetSuperContributionsQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    orgs: Array<{ __typename?: 'HrOrg'; memberUuid: string; name: string }>;
    superContributions?: Array<{
      __typename?: 'SuperContribution';
      id: string;
      membershipId: string;
      contributionType: SuperContributionType;
      contributionValue: number;
      preserveAmount: number;
      status: SuperContributionStatus;
      startDate: string;
      endDate?: string | null;
      acknowledgedNoContributionTracking?: boolean | null;
    } | null> | null;
  } | null;
};

export type GetSuperConsolidationQueryVariables = Exact<{
  usi: Scalars['String'];
}>;

export type GetSuperConsolidationQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    superConsolidation?: {
      __typename?: 'SuperConsolidation';
      fundName?: string | null;
      memberNumber: string;
      usi: string;
      status: SuperConsolidationStatus;
      updatedAt: string;
      createdAt: string;
    } | null;
  } | null;
};

export type GetSuperConsolidationSupportRequestQueryVariables = Exact<{
  usi: Scalars['String'];
}>;

export type GetSuperConsolidationSupportRequestQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    superConsolidationRequestSupport?: {
      __typename?: 'SuperConsolidationRequestSupport';
      usi: string;
      updatedAt: string;
      createdAt: string;
      swagUserId?: string | null;
      ehUserId: string;
    } | null;
  } | null;
};

export type CreateSwagSuperfundMutationVariables = Exact<{
  input?: InputMaybe<CreateSwagSuperfundInput>;
}>;

export type CreateSwagSuperfundMutation = {
  __typename?: 'Mutation';
  createSwagSuperfund?: {
    __typename?: 'CreateSwagSuperfundPayload';
    superfund?: {
      __typename?: 'SwagSuperfund';
      memberNumber: string;
      abn: string;
      usi: string;
      fundName: string;
      fundChoice: string;
    } | null;
  } | null;
};

export type SubmitSuperContributionMutationVariables = Exact<{
  input?: InputMaybe<SubmitSuperContributionInput>;
}>;

export type SubmitSuperContributionMutation = {
  __typename?: 'Mutation';
  submitSuperContribution?: {
    __typename?: 'SubmitSuperContributionPayload';
    contribution?: {
      __typename?: 'SuperContribution';
      contributionType: SuperContributionType;
      contributionValue: number;
      preserveAmount: number;
      startDate: string;
      endDate?: string | null;
    } | null;
  } | null;
};

export type StopContributionByContributionIdMutationVariables = Exact<{
  id: Scalars['String'];
}>;

export type StopContributionByContributionIdMutation = {
  __typename?: 'Mutation';
  stopContributionByContributionId?: {
    __typename?: 'StopSuperContributionPayload';
    contribution?: {
      __typename?: 'SuperContribution';
      id: string;
      status: SuperContributionStatus;
      contributionType: SuperContributionType;
      contributionValue: number;
      preserveAmount: number;
      startDate: string;
      endDate?: string | null;
    } | null;
  } | null;
};

export type CreateSuperConsolidationMutationVariables = Exact<{
  input?: InputMaybe<CreateSuperConsolidationInput>;
}>;

export type CreateSuperConsolidationMutation = {
  __typename?: 'Mutation';
  createSuperConsolidation?: {
    __typename?: 'CreateSuperConsolidationPayload';
    consolidation?: {
      __typename?: 'SuperConsolidation';
      fundName?: string | null;
      usi: string;
      memberNumber: string;
    } | null;
  } | null;
};

export type CreateSuperConsolidationSupportRequestMutationVariables = Exact<{
  usi: Scalars['String'];
}>;

export type CreateSuperConsolidationSupportRequestMutation = {
  __typename?: 'Mutation';
  createSuperConsolidationRequestSupport?: {
    __typename?: 'CreateSuperConsolidationRequestSupportPayload';
    consolidationRequestSupport?: { __typename?: 'SuperConsolidationRequestSupport'; usi: string } | null;
  } | null;
};

export type CreateSsaComplaintTicketMutationVariables = Exact<{
  input?: InputMaybe<CreateSsaComplaintTicketInput>;
}>;

export type CreateSsaComplaintTicketMutation = {
  __typename?: 'Mutation';
  createSSAComplaintTicket: { __typename?: 'CreateSSAComplaintTicketPayload'; success: boolean };
};

export type CreateComplaintTicketMutationVariables = Exact<{
  input?: InputMaybe<CreateComplaintTicketInput>;
}>;

export type CreateComplaintTicketMutation = {
  __typename?: 'Mutation';
  createComplaintTicket: { __typename?: 'CreateComplaintTicketPayload'; success: boolean };
};

export type GetBuyAgainGiftCardsQueryVariables = Exact<{
  input: SsBuyAgainGiftCardsInput;
}>;

export type GetBuyAgainGiftCardsQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    swagStore?: {
      __typename?: 'SwagStore';
      buyAgainGiftCards?: {
        __typename?: 'BuyAgainGiftCards';
        edges: Array<{
          __typename?: 'BuyAgainGiftCardEdge';
          node: {
            __typename: 'Product';
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
              __typename: 'ShopImage';
              url?: string | null;
              small: { __typename: 'ShopImageDetails'; url?: string | null };
              product: { __typename: 'ShopImageDetails'; url?: string | null };
              large: { __typename: 'ShopImageDetails'; url?: string | null };
            };
            storefrontImage?: {
              __typename: 'ShopImage';
              url?: string | null;
              small: { __typename: 'ShopImageDetails'; url?: string | null };
              product: { __typename: 'ShopImageDetails'; url?: string | null };
              large: { __typename: 'ShopImageDetails'; url?: string | null };
            } | null;
          };
        }>;
        pageInfo: {
          __typename?: 'PageInfo';
          hasNextPage: boolean;
          endCursor?: string | null;
          totalCount?: number | null;
          totalPages?: number | null;
        };
      } | null;
    } | null;
  } | null;
};

export type GetDiscountOrderHistoryQueryVariables = Exact<{
  input: DiscountOrderHistoryInput;
}>;

export type GetDiscountOrderHistoryQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    swagStore?: {
      __typename?: 'SwagStore';
      discountOrderHistory?: {
        __typename: 'DiscountOrderHistory';
        pageInfo: {
          __typename?: 'PageInfo';
          hasNextPage: boolean;
          endCursor?: string | null;
          totalCount?: number | null;
          totalPages?: number | null;
        };
        edges: Array<{
          __typename?: 'DiscountOrderHistoryEdge';
          node: {
            __typename: 'DiscountHistory';
            id: string;
            name?: string | null;
            memberId: string;
            status: OrderStatus;
            createdAt: string;
            billableAmount: number;
            transactionFee: number;
            freightCost: number;
            orderDetails: Array<{
              __typename: 'OrderDetails';
              id: string;
              discount: number;
              quantity: number;
              price: number;
              billableAmount: number;
              transactionFee: number;
              status: OrderStatus;
              freightCost: number;
              currency: string;
              purchaseItems: Array<{
                __typename: 'OrderPurchaseItem';
                id: string;
                purchaseId: string;
                productVariantId: string;
                data: {
                  __typename: 'OrderPurchaseItemData';
                  issuedAt: string;
                  pinNumber: string;
                  cardNumber: string;
                  serialNumber: string;
                  activationUrl: string;
                  orderDetailId: string;
                  expiredAt?: string | null;
                  giftCode?: string | null;
                  uberGiftCode?: string | null;
                  barCode?: string | null;
                  promoCode?: string | null;
                };
                fulfil?: {
                  __typename: 'OrderPurchaseItemFulfil';
                  id: string;
                  isUsed?: boolean | null;
                  balance: number;
                } | null;
              }>;
              productVariant?: {
                __typename: 'OrderProductVariant';
                variantCode: string;
                price: number;
                imageUrl: string;
                discountPrice: number;
                amount: number;
                product: {
                  __typename: 'OrderProduct';
                  id: string;
                  code: string;
                  name: string;
                  title: string;
                  imageUrl: string;
                  logoUrl?: string | null;
                  email?: string | null;
                  description?: string | null;
                  howItWorks?: string | null;
                  productType: OrderProductType;
                };
              } | null;
            }>;
          };
        }>;
      } | null;
    } | null;
  } | null;
};

export type GetSsAllOffersQueryVariables = Exact<{
  allOffersInput?: InputMaybe<SsAllOffersInput>;
}>;

export type GetSsAllOffersQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    swagStore?: {
      __typename?: 'SwagStore';
      allOffers?: {
        __typename?: 'SwagStoreOffers';
        edges: Array<{
          __typename?: 'SwagStoreOfferEdge';
          node: {
            __typename?: 'SwagStoreOffer';
            id: string;
            name: string;
            title: string;
            price: number;
            discountPrice: number;
            serviceFee: number;
            productCode: string;
            imageUrl: string;
            productType: string;
            description: string;
            termsAndConditions?: string | null;
            country?: string | null;
            currency?: string | null;
            priceInPoints?: number | null;
            discountPriceInPoints?: number | null;
          };
        }>;
        pageInfo: {
          __typename?: 'PageInfo';
          hasNextPage: boolean;
          endCursor?: string | null;
          totalCount?: number | null;
          totalPages?: number | null;
        };
        error?: { __typename?: 'GenericError'; message: string } | null;
      } | null;
    } | null;
  } | null;
};

export type GetStripePublishableKeyQueryVariables = Exact<{
  input: StripePublishableKeyInput;
}>;

export type GetStripePublishableKeyQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    swagStore?: {
      __typename?: 'SwagStore';
      stripePublishableKey?: { __typename: 'PublishableKey'; publishableKey?: string | null } | null;
    } | null;
  } | null;
};

export type GetDiscountShopProductDetailQueryVariables = Exact<{
  input: DiscountShopProductDetailsInput;
}>;

export type GetDiscountShopProductDetailQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    swagStore?: {
      __typename?: 'SwagStore';
      discountShopProductDetails?: {
        __typename?: 'ShopProductDetailsResponse';
        product?: {
          __typename: 'ShopProductDetails';
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
            __typename: 'ShopImage';
            url?: string | null;
            small: { __typename: 'ShopImageDetails'; url?: string | null };
            product: { __typename: 'ShopImageDetails'; url?: string | null };
            large: { __typename: 'ShopImageDetails'; url?: string | null };
          };
          storefrontImage?: {
            __typename: 'ShopImage';
            url?: string | null;
            small: { __typename: 'ShopImageDetails'; url?: string | null };
            product: { __typename: 'ShopImageDetails'; url?: string | null };
            large: { __typename: 'ShopImageDetails'; url?: string | null };
          } | null;
          logo?: {
            __typename: 'ShopImage';
            url?: string | null;
            small: { __typename: 'ShopImageDetails'; url?: string | null };
            product: { __typename: 'ShopImageDetails'; url?: string | null };
            large: { __typename: 'ShopImageDetails'; url?: string | null };
          } | null;
          supplier: {
            __typename: 'ShopProductSupplier';
            id: string;
            name: string;
            description?: string | null;
            email?: string | null;
            phoneNumber?: string | null;
            website?: string | null;
          };
          productVariants: Array<{
            __typename: 'ShopProductVariant';
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
        } | null;
      } | null;
    } | null;
  } | null;
};

export type GetNoOrgPermissionsQueryVariables = Exact<{
  candidate: Scalars['Boolean'];
}>;

export type GetNoOrgPermissionsQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    noOrgPermissions?: {
      __typename?: 'NoOrgPermissions';
      instapay: { __typename?: 'Permission'; view: boolean };
      heroPoints: { __typename?: 'Permission'; view: boolean };
      superAppBenefits: { __typename?: 'Permission'; view: boolean };
      superAppHome: { __typename?: 'Permission'; view: boolean };
      superAppWallet: { __typename?: 'Permission'; view: boolean };
      superAppSettings: { __typename?: 'Permission'; view: boolean };
      superAppCashback: { __typename?: 'Permission'; view: boolean };
      superAppBenefitsFeaturedOffers: { __typename?: 'Permission'; view: boolean };
      superAppCashbackCategories: { __typename?: 'Permission'; view: boolean };
      superAppInstoreOffer: { __typename?: 'Permission'; view: boolean };
      ebenApplePay: { __typename?: 'Permission'; view: boolean };
      ebenGooglePay: { __typename?: 'Permission'; view: boolean };
      ebenDevHeroDollarPayment: { __typename?: 'Permission'; view: boolean };
      ebenCashbackStoreList: { __typename?: 'Permission'; view: boolean };
      pillar_money: { __typename?: 'Permission'; view: boolean };
      pillar_benefits: { __typename?: 'Permission'; view: boolean };
      eben_money_pillar_black_list: { __typename?: 'Permission'; view: boolean };
      eben_benefits_pillar_black_list: { __typename?: 'Permission'; view: boolean };
      ebenStorePopularList: { __typename?: 'Permission'; view: boolean };
      ebenStoreBuyAgainCarousel: { __typename?: 'Permission'; view: boolean };
      superChoiceSwag: { __typename?: 'Permission'; view: boolean };
      customFundAssetSwag: { __typename?: 'Permission'; view: boolean };
      superConsolidation: { __typename?: 'Permission'; view: boolean };
      ebenServiceFee: { __typename?: 'Permission'; view: boolean };
      eBenSpendHeroDollarsOnSwagCard: { __typename?: 'Permission'; view: boolean };
      eBenStash: { __typename?: 'Permission'; view: boolean };
      eBenWhitelistedUkMoney: { __typename?: 'Permission'; view: boolean };
      eBenWhitelistedUkBenefits: { __typename?: 'Permission'; view: boolean };
      superSalarySacrifice: { __typename?: 'Permission'; view: boolean };
      skipMegaDealsSurvey: { __typename?: 'Permission'; view: boolean };
      toggleMegaDealsMVPCta: { __typename?: 'Permission'; view: boolean };
      toggleMegaDealsCommunitiesCtas: { __typename?: 'Permission'; view: boolean };
      benefitsStripePaymentCheckout: { __typename?: 'Permission'; view: boolean };
      instapay2Alpha: { __typename?: 'Permission'; view: boolean };
      benefitsBillStreaming: { __typename?: 'Permission'; view: boolean };
      benefitsForceUpdate: { __typename?: 'Permission'; view: boolean };
      benefitsStoreAppUK: { __typename?: 'Permission'; view: boolean };
      billStreamingWaitlist: { __typename?: 'Permission'; view: boolean };
      benefitsPillarHomepage: { __typename?: 'Permission'; view: boolean };
      internationalBenefitsRefused: { __typename?: 'Permission'; view: boolean };
      benefitsXmas23Cashback: { __typename?: 'Permission'; view: boolean };
      cashbackDashboardV2: { __typename?: 'Permission'; view: boolean };
      seOfferTiles: { __typename?: 'Permission'; view: boolean };
      eBenMoneyScheduledPayment: { __typename?: 'Permission'; view: boolean };
      eBenSwagInterestBearingAccountExperiment: { __typename?: 'Permission'; view: boolean };
      eBenPayeeAddressBook: { __typename?: 'Permission'; view: boolean };
      benefitsIAv2: { __typename?: 'Permission'; view: boolean };
      ebenInstapayNowSimplifiedExperiment: { __typename?: 'Permission'; view: boolean };
      rostersInstapayExperiment: { __typename?: 'Permission'; view: boolean };
      timesheetsInstapayExperiment: { __typename?: 'Permission'; view: boolean };
      customSurveyInstapayExperiment: { __typename?: 'Permission'; view: boolean };
      payslipsExperimentInstapay: { __typename?: 'Permission'; view: boolean };
      payslipsExperimentBudgeting: { __typename?: 'Permission'; view: boolean };
      benefitsBillAhmPromoTile: { __typename?: 'Permission'; view: boolean };
      benefitsBillMedibankPromoTile: { __typename?: 'Permission'; view: boolean };
      benefitsFitnessFirst: { __typename?: 'Permission'; view: boolean };
      benefitsGoodlifeFitness: { __typename?: 'Permission'; view: boolean };
    } | null;
  } | null;
};

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetCurrentUserQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    details?: {
      __typename?: 'UserDetails';
      firstName: string;
      lastName: string;
      middleName?: string | null;
      dateOfBirth?: string | null;
      email?: string | null;
      mailingAddress?: {
        __typename?: 'Address';
        region: string;
        country: string;
        longForm: string;
        streetNumber?: string | null;
        streetName?: string | null;
        streetType?: string | null;
        unitNumber?: string | null;
        postcode: string;
        townOrCity: string;
      } | null;
      residentialAddress?: {
        __typename?: 'Address';
        region: string;
        country: string;
        longForm: string;
        streetNumber?: string | null;
        streetName?: string | null;
        streetType?: string | null;
        unitNumber?: string | null;
        postcode: string;
        townOrCity: string;
      } | null;
      phoneNumber?: { __typename?: 'PhoneNumber'; countryCode: string; number: string } | null;
    } | null;
  } | null;
};

export type GetEhUserInitializationDetailsQueryVariables = Exact<{
  orgId?: InputMaybe<Scalars['String']>;
}>;

export type GetEhUserInitializationDetailsQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    eHUserInitializationDetails?: {
      __typename?: 'UserInitializationDetailsPayload';
      user?: {
        __typename?: 'UserInitializationDetails';
        firstName: string;
        lastName: string;
        middleName?: string | null;
        dateOfBirth?: string | null;
        address?: {
          __typename?: 'UserInitializationDetailAddress';
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
      error?: { __typename?: 'GenericError'; message: string } | null;
    } | null;
  } | null;
};

export type GetKpUserInitializationDetailsQueryVariables = Exact<{ [key: string]: never }>;

export type GetKpUserInitializationDetailsQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    kpUserInitializationDetails?: {
      __typename?: 'UserInitializationDetailsPayload';
      user?: {
        __typename?: 'UserInitializationDetails';
        firstName: string;
        lastName: string;
        middleName?: string | null;
        dateOfBirth?: string | null;
        address?: {
          __typename?: 'UserInitializationDetailAddress';
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
      error?: { __typename?: 'GenericError'; message: string } | null;
    } | null;
  } | null;
};

export type GetMoneyProfileQueryVariables = Exact<{ [key: string]: never }>;

export type GetMoneyProfileQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    profileChangeRequests?: {
      __typename?: 'ProfileChangeRequestPayload';
      requests?: Array<{
        __typename?: 'ProfileChangeRequest';
        dateOfBirth?: string | null;
        createdAt: string;
        type: UserDetailChangeRequestType;
        name?: { __typename?: 'PersonalName'; firstName: string; lastName: string; middleName?: string | null } | null;
      } | null> | null;
      error?: { __typename?: 'GenericError'; message: string } | null;
    } | null;
    details?: {
      __typename?: 'UserDetails';
      firstName: string;
      lastName: string;
      middleName?: string | null;
      dateOfBirth?: string | null;
      email?: string | null;
      mailingAddress?: {
        __typename?: 'Address';
        region: string;
        country: string;
        longForm: string;
        streetNumber?: string | null;
        streetName?: string | null;
        streetType?: string | null;
        unitNumber?: string | null;
        postcode: string;
        townOrCity: string;
      } | null;
      residentialAddress?: {
        __typename?: 'Address';
        region: string;
        country: string;
        longForm: string;
        streetNumber?: string | null;
        streetName?: string | null;
        streetType?: string | null;
        unitNumber?: string | null;
        postcode: string;
        townOrCity: string;
      } | null;
      phoneNumber?: { __typename?: 'PhoneNumber'; countryCode: string; number: string } | null;
    } | null;
  } | null;
};

export type MinSupportVersionQueryVariables = Exact<{ [key: string]: never }>;

export type MinSupportVersionQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    minSupportVersion?: {
      __typename?: 'MinSupportVersion';
      benefits: { __typename?: 'BenefitsMinSupportVersion'; minSupportAppVersion: string };
    } | null;
  } | null;
};

export type UserPermissionQueryVariables = Exact<{
  permissionRequest: UserPermissionInput;
}>;

export type UserPermissionQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    userPermission?: {
      __typename?: 'UserPermissionPayload';
      permissions: Array<{ __typename?: 'UserPermission'; name: string; enabled: boolean }>;
      error?: { __typename?: 'GenericError'; message: string } | null;
    } | null;
  } | null;
};

export type UpdateMailingAddressMutationVariables = Exact<{
  input: UserAddressInput;
}>;

export type UpdateMailingAddressMutation = {
  __typename?: 'Mutation';
  user?: { __typename?: 'UserMutation'; updateMailingAddress: boolean } | null;
};

export type PatchProfileMutationVariables = Exact<{
  patch: EhProfilePatchInput;
}>;

export type PatchProfileMutation = {
  __typename?: 'Mutation';
  user?: {
    __typename?: 'UserMutation';
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
  } | null;
};

export type StartUkWalletCreationMutationVariables = Exact<{
  input: StartUkWalletCreationInput;
}>;

export type StartUkWalletCreationMutation = {
  __typename?: 'Mutation';
  startUKWalletCreation: { __typename?: 'StartUKWalletCreationPayload'; success: boolean };
};

export type StartUkKycMutationVariables = Exact<{ [key: string]: never }>;

export type StartUkKycMutation = {
  __typename?: 'Mutation';
  startUKKYC?: { __typename?: 'StartUKKYCPayload'; reference: string } | null;
};

export type GetUkTokenQueryVariables = Exact<{ [key: string]: never }>;

export type GetUkTokenQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    wallet?: { __typename?: 'Wallet'; UKToken?: { __typename?: 'UKTokenPayload'; userToken: string } | null } | null;
  } | null;
};

export type CreateUkCardMutationVariables = Exact<{
  input: CreateUkCardInput;
  accessToken: Scalars['String'];
}>;

export type CreateUkCardMutation = {
  __typename?: 'Mutation';
  createUKCard?: { __typename?: 'CreateUKCardPayload'; cardId: string } | null;
};

export type GetEWalletUkAccountDetailsQueryVariables = Exact<{ [key: string]: never }>;

export type GetEWalletUkAccountDetailsQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    wallet?: {
      __typename?: 'Wallet';
      UKWalletDetails?: {
        __typename?: 'UKWalletDetails';
        accountName?: string | null;
        currency?: string | null;
        totalBalance?: number | null;
        availableBalance?: number | null;
        accountNumber?: string | null;
        sortCode?: string | null;
        cardId?: string | null;
      } | null;
    } | null;
  } | null;
};

export type GetEWalletAuAccountDetailsQueryVariables = Exact<{ [key: string]: never }>;

export type GetEWalletAuAccountDetailsQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    wallet?: {
      __typename?: 'Wallet';
      details: {
        __typename?: 'WalletDetails';
        accountNumber: string;
        bsb: string;
        name: string;
        availableBalance?: {
          __typename?: 'MoneyV2';
          type: CurrencyType;
          sign: Sign;
          units: number;
          subUnits: number;
        } | null;
      };
    } | null;
  } | null;
};

export type GetEWalletUkCurrentPaymentCardDetailsQueryVariables = Exact<{
  accessToken: Scalars['String'];
}>;

export type GetEWalletUkCurrentPaymentCardDetailsQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    wallet?: {
      __typename?: 'Wallet';
      UKCurrentPaymentCardV2?: {
        __typename?: 'PaymentCardDetails';
        id: string;
        status: PaymentCardStatus;
        nameOnCard: string;
        isVirtual: boolean;
        issuedTimestamp?: string | null;
        lastFourDigits?: string | null;
      } | null;
    } | null;
  } | null;
};

export type GetEWalletUkPaymentCardProvisioningDetailsQueryVariables = Exact<{
  accessToken: Scalars['String'];
}>;

export type GetEWalletUkPaymentCardProvisioningDetailsQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    wallet?: {
      __typename?: 'Wallet';
      UKCurrentPaymentCardV2?: {
        __typename?: 'PaymentCardDetails';
        id: string;
        nameOnCard: string;
        cardNumberToken?: string | null;
        cvvToken?: string | null;
        expiryDate?: any | null;
      } | null;
    } | null;
  } | null;
};

export type BlockUkCardMutationVariables = Exact<{
  input: BlockUnblockCardInput;
}>;

export type BlockUkCardMutation = {
  __typename?: 'Mutation';
  blockUKCard: { __typename?: 'MutationSuccessPayload'; success: boolean };
};

export type UnblockUkCardMutationVariables = Exact<{
  input: BlockUnblockCardInput;
}>;

export type UnblockUkCardMutation = {
  __typename?: 'Mutation';
  unblockUKCard: { __typename?: 'MutationSuccessPayload'; success: boolean };
};

export type CreateUkPasscodeMutationVariables = Exact<{
  input: SetUkPasscodeInput;
}>;

export type CreateUkPasscodeMutation = {
  __typename?: 'Mutation';
  setUKPasscode: { __typename?: 'UKTokenPayload'; userToken: string };
};

export type GetIdvProfileV2QueryVariables = Exact<{
  country: CountryOfOrigin;
}>;

export type GetIdvProfileV2Query = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    wallet?: {
      __typename?: 'Wallet';
      IDVProfile?: {
        __typename?: 'IDVProfile';
        status: IdvProfileStatus;
        token?: string | null;
        applicantId?: string | null;
      } | null;
    } | null;
  } | null;
};

export type SendUkFundMutationVariables = Exact<{
  input: SendUkFundInput;
}>;

export type SendUkFundMutation = {
  __typename?: 'Mutation';
  sendUkFund: { __typename?: 'SendUkFundPayload'; state: UkTransactionState; externalTransactionId: string };
};

export type GetWalletTransactionsV2QueryVariables = Exact<{
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  country: CountryOfOrigin;
}>;

export type GetWalletTransactionsV2Query = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    wallet?: {
      __typename?: 'Wallet';
      transactions?: Array<{
        __typename?: 'FinancialTransaction';
        id: string;
        dateTimeUTC: string;
        cardId?: string | null;
        pending?: boolean | null;
        description?: string | null;
        reference?: string | null;
        type: TransactionType;
        merchant?: {
          __typename?: 'TransactionMerchant';
          name?: string | null;
          singleLineAddress?: string | null;
        } | null;
        currencyAmount: {
          __typename?: 'Money';
          units?: number | null;
          subUnits?: number | null;
          type?: CurrencyType | null;
        };
        transferPeerDetails?:
          | {
              __typename?: 'BSBTransferPeerDetails';
              bsb?: string | null;
              name?: string | null;
              accountNumber?: string | null;
            }
          | {
              __typename?: 'FasterPaymentsTransferPeerDetails';
              sortCode?: string | null;
              name?: string | null;
              accountNumber?: string | null;
            }
          | null;
      } | null> | null;
    } | null;
  } | null;
};

export type GetUkTransactionStateQueryVariables = Exact<{
  externalTransactionId: Scalars['String'];
}>;

export type GetUkTransactionStateQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    wallet?: {
      __typename?: 'Wallet';
      ukTransactionState?: { __typename?: 'FinancialTransactionState'; state: UkTransactionState } | null;
    } | null;
  } | null;
};

export type CreateScheduledPaymentMutationVariables = Exact<{
  input: CreateScheduledPaymentInput;
}>;

export type CreateScheduledPaymentMutation = {
  __typename?: 'Mutation';
  createScheduledPayment: {
    __typename?: 'CreateScheduledPaymentPayload';
    outcome?: ScheduledPaymentSaveOutcomeType | null;
    payment?: {
      __typename?: 'ScheduledPaymentSaveResponseDetails';
      id?: string | null;
      status?: ScheduledPaymentStatus | null;
    } | null;
  };
};

export type GetActiveScheduledPaymentsQueryVariables = Exact<{ [key: string]: never }>;

export type GetActiveScheduledPaymentsQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    wallet?: {
      __typename?: 'Wallet';
      auActiveScheduledPayments?: Array<{
        __typename?: 'ScheduledPayment';
        startDate: string;
        endDate?: string | null;
        type: ScheduledPaymentType;
        frequency?: ScheduledPaymentFrequency | null;
        externalId: string;
        description: string;
        numberOfPayments?: number | null;
        amount: { __typename?: 'Money'; units?: number | null; subUnits?: number | null; type?: CurrencyType | null };
        recipient: { __typename?: 'AuPaymentRecipient'; accountName: string; accountNumber: string; bsb: string };
      } | null> | null;
    } | null;
  } | null;
};

export type CancelScheduledPaymentMutationVariables = Exact<{
  externalScheduledPaymentId: Scalars['ID'];
}>;

export type CancelScheduledPaymentMutation = {
  __typename?: 'Mutation';
  cancelScheduledPayment: { __typename?: 'MutationSuccessPayload'; success: boolean };
};

export type SavePayeeAddressMutationVariables = Exact<{
  input: SavePayeeAddressInput;
}>;

export type SavePayeeAddressMutation = {
  __typename?: 'Mutation';
  savePayeeAddress: { __typename?: 'MutationSuccessPayload'; success: boolean };
};

export type GetAllPayeeAddressesQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllPayeeAddressesQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    wallet?: {
      __typename?: 'Wallet';
      payeeAddresses?: Array<{
        __typename?: 'BSBTransferPayeeAddress';
        bsb: string;
        accountName: string;
        accountNumber: string;
        friendlyName: string;
      } | null> | null;
    } | null;
  } | null;
};

export type RemovePayeeAddressMutationVariables = Exact<{
  input: RemovePayeeAddressInput;
}>;

export type RemovePayeeAddressMutation = {
  __typename?: 'Mutation';
  removePayeeAddress: { __typename?: 'MutationSuccessPayload'; success: boolean };
};

export type StartValidateUkPhoneNumberMutationVariables = Exact<{ [key: string]: never }>;

export type StartValidateUkPhoneNumberMutation = {
  __typename?: 'Mutation';
  startValidateUkPhoneNumber: { __typename?: 'MutationSuccessPayload'; success: boolean };
};

export type VerifyUkMobileEnrollmentMutationVariables = Exact<{
  input: VerifyPhoneNumberRequest;
}>;

export type VerifyUkMobileEnrollmentMutation = {
  __typename?: 'Mutation';
  verifyUkPhoneNumber: { __typename?: 'MutationSuccessPayload'; success: boolean };
};

export type GetUkAuthFactorsQueryVariables = Exact<{ [key: string]: never }>;

export type GetUkAuthFactorsQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    wallet?: {
      __typename?: 'Wallet';
      ukAuthFactors?: Array<{
        __typename?: 'UkAuthFactor';
        type?: UkAuthFactorType | null;
        status?: UkAuthFactorStatus | null;
        channel?: UkAuthFactorChannel | null;
      } | null> | null;
    } | null;
  } | null;
};

export type UnlinkUkDeviceMutationVariables = Exact<{ [key: string]: never }>;

export type UnlinkUkDeviceMutation = {
  __typename?: 'Mutation';
  unlinkUkDevice: { __typename?: 'MutationSuccessPayload'; success: boolean };
};

export type GetUkLatestStepUpResultQueryVariables = Exact<{ [key: string]: never }>;

export type GetUkLatestStepUpResultQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    wallet?: {
      __typename?: 'Wallet';
      latestUkStepUpResult?: {
        __typename?: 'UkStepUpResult';
        state: UkStepupResultState;
        challengeId: string;
        accessToken?: string | null;
      } | null;
    } | null;
  } | null;
};

export type GetWalletStatusQueryVariables = Exact<{ [key: string]: never }>;

export type GetWalletStatusQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    wallet?: {
      __typename?: 'Wallet';
      details: {
        __typename?: 'WalletDetails';
        status: string;
        setupStatus?: {
          __typename?: 'SetupStatus';
          status?: WalletSetupStatus | null;
          message?: WalletStatusReason | null;
        } | null;
      };
    } | null;
  } | null;
};

export type GetWalletNotificationQueryVariables = Exact<{
  country: CountryOfOrigin;
}>;

export type GetWalletNotificationQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    wallet?: {
      __typename?: 'Wallet';
      notification?: {
        __typename?: 'WalletNotification';
        content?: string | null;
        note?: string | null;
        updatedAt: string;
        ctaCaptions: { __typename?: 'CtaCaptions'; agree: string; disagree: string };
      } | null;
    } | null;
  } | null;
};

export type GetPersistentNotificationsQueryVariables = Exact<{ [key: string]: never }>;

export type GetPersistentNotificationsQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    wallet?: {
      __typename?: 'Wallet';
      persistentNotifications?: Array<{
        __typename?: 'PersistentNotification';
        id: string;
        notificationStatus: NotificationStatus;
        type: WalletNotificationType;
      } | null> | null;
    } | null;
  } | null;
};

export type InitiateEWalletSetupMutationVariables = Exact<{ [key: string]: never }>;

export type InitiateEWalletSetupMutation = {
  __typename?: 'Mutation';
  initiateAUWallet: { __typename?: 'MutationSuccessPayload'; success: boolean };
};

export type SaveWalletSetupMutationVariables = Exact<{
  setupDetails: SaveAuWalletSetupInput;
}>;

export type SaveWalletSetupMutation = {
  __typename?: 'Mutation';
  saveAUWalletSetup: { __typename?: 'SaveAUWalletSetupPayload'; idvToken: string };
};

export type TransferAuWalletFundsMutationVariables = Exact<{
  transferDetails: TransferAuWalletFundsInput;
}>;

export type TransferAuWalletFundsMutation = {
  __typename?: 'Mutation';
  transferAUWalletFunds: {
    __typename?: 'TransferAUWalletFundsPayload';
    transactionId?: string | null;
    outcome?: TransactionOutcome | null;
  };
};

export type ClearPersistentNotificationMutationVariables = Exact<{
  type: WalletNotificationType;
}>;

export type ClearPersistentNotificationMutation = {
  __typename?: 'Mutation';
  clearPersistentNotifications: { __typename?: 'MutationSuccessPayload'; success: boolean };
};

export type StoreEventMutationVariables = Exact<{
  input: StoreEventInput;
}>;

export type StoreEventMutation = {
  __typename?: 'Mutation';
  storeEvent: { __typename?: 'MutationSuccessPayload'; success: boolean };
};

export type GetSsaCarouselTimestampQueryVariables = Exact<{ [key: string]: never }>;

export type GetSsaCarouselTimestampQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    wallet?: { __typename?: 'Wallet'; seenSSACarouselTimestamp?: string | null } | null;
  } | null;
};

export type SeenSsaCarouselMutationVariables = Exact<{ [key: string]: never }>;

export type SeenSsaCarouselMutation = {
  __typename?: 'Mutation';
  seenSSACarousel: { __typename?: 'MutationSuccessPayload'; success: boolean };
};

export type UpdateWalletProfileMutationVariables = Exact<{
  input: UpdateWalletProfileInput;
}>;

export type UpdateWalletProfileMutation = {
  __typename?: 'Mutation';
  updateWalletProfile: { __typename?: 'MutationSuccessPayload'; success: boolean };
};
