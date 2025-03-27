import type {
  UseQueryOptions,
  UseInfiniteQueryOptions,
  UseMutationOptions
} from 'react-query';
import {
  useQuery,
  useInfiniteQuery,
  useMutation,
} from 'react-query';
import { useFetchNewData } from '../common/shared-hooks/useFetchNewData';
import { graphql, GraphQLRequest } from 'msw';
import type { ResponseResolver, GraphQLContext } from 'msw';
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

export const GetBenefitsCategoriesDocument = `
    query GetBenefitsCategories {
  me {
    benefits {
      categories {
        categoryCode
        name
        imageUrl
      }
    }
  }
}
    `;
export const useGetBenefitsCategoriesQuery = <TData = GetBenefitsCategoriesQuery, TError = unknown>(
  variables?: GetBenefitsCategoriesQueryVariables,
  options?: UseQueryOptions<GetBenefitsCategoriesQuery, TError, TData>
) =>
  useQuery<GetBenefitsCategoriesQuery, TError, TData>(
    variables === undefined ? ['GetBenefitsCategories'] : ['GetBenefitsCategories', variables],
    useFetchNewData<GetBenefitsCategoriesQuery, GetBenefitsCategoriesQueryVariables>(
      GetBenefitsCategoriesDocument
    ).bind(null, variables),
    options
  );

useGetBenefitsCategoriesQuery.getKey = (variables?: GetBenefitsCategoriesQueryVariables) =>
  variables === undefined ? ['GetBenefitsCategories'] : ['GetBenefitsCategories', variables];
export const useInfiniteGetBenefitsCategoriesQuery = <TData = GetBenefitsCategoriesQuery, TError = unknown>(
  variables?: GetBenefitsCategoriesQueryVariables,
  options?: UseInfiniteQueryOptions<GetBenefitsCategoriesQuery, TError, TData>
) => {
  const query = useFetchNewData<GetBenefitsCategoriesQuery, GetBenefitsCategoriesQueryVariables>(
    GetBenefitsCategoriesDocument
  );
  return useInfiniteQuery<GetBenefitsCategoriesQuery, TError, TData>(
    variables === undefined ? ['GetBenefitsCategories.infinite'] : ['GetBenefitsCategories.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetBenefitsCategoriesQuery.getKey = (variables?: GetBenefitsCategoriesQueryVariables) =>
  variables === undefined ? ['GetBenefitsCategories.infinite'] : ['GetBenefitsCategories.infinite', variables];
export const SearchAllProductsDocument = `
    query SearchAllProducts($onlineInput: OnlineOffersInput, $instoreInput: AllAdvertisersInput, $billInput: BmOfferInput, $ssInput: SSAllOffersInput) {
  me {
    cashback {
      onlineOffers(input: $onlineInput) {
        edges {
          node {
            id
            type
            categoryCode
            title
            description
            cashback
            imageUrl
            logoUrl
            trackingUrl
            howItWorks
            tnc
            about
            advertiserId
            advertiserName
            advertiserAbout
            isCardLinkedOffer
            popularScore
            createdAt
            updatedAt
          }
        }
        pageInfo {
          hasNextPage
          endCursor
          totalCount
          totalPages
        }
      }
      instoreAdvertisers: allAdvertisers(input: $instoreInput) {
        edges {
          node {
            id
            advertiserId
            advertiserName
            advertiserAbout
            type
            offers {
              ... on InstoreOfferV2 {
                id
                type
                offerId
                title
                description
                cashback
                categoryCode
                howItWorks
                imageUrl
                logoUrl
                advertiserName
                advertiserAbout
                tnc
                website
                phone
                locations {
                  locationId
                  address
                  latitude
                  longitude
                }
                popularScore
                startDate
                endDate
                createdAt
                updatedAt
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
          totalCount
          totalPages
        }
      }
    }
    billManagement {
      offersV3(input: $billInput) {
        edges {
          node {
            id
            provider {
              id
              name
              faq
              contactInfo
              paymentUrl
            }
            description
            title
            description
            howItWorks
            about
            termsAndConditions
            estBillAmount {
              amount
              currency
            }
            paidAmount {
              amount
              currency
            }
            categoryCode
            reminder {
              reminderDescription
              reminderTextCopy
            }
            savingPercentage
            signUpLink
            logoUrl
            imageUrl
          }
        }
        pageInfo {
          hasNextPage
          endCursor
          totalCount
          totalPages
        }
      }
    }
    swagStore {
      allOffers(input: $ssInput) {
        edges {
          cursor
          node {
            id
            name
            title
            price
            discountPrice
            serviceFee
            productCode
            imageUrl
            productType
            description
            termsAndConditions
            country
            currency
            priceInPoints
            discountPriceInPoints
          }
        }
        pageInfo {
          hasNextPage
          endCursor
          totalCount
          totalPages
        }
      }
    }
  }
}
    `;
export const useSearchAllProductsQuery = <TData = SearchAllProductsQuery, TError = unknown>(
  variables?: SearchAllProductsQueryVariables,
  options?: UseQueryOptions<SearchAllProductsQuery, TError, TData>
) =>
  useQuery<SearchAllProductsQuery, TError, TData>(
    variables === undefined ? ['SearchAllProducts'] : ['SearchAllProducts', variables],
    useFetchNewData<SearchAllProductsQuery, SearchAllProductsQueryVariables>(SearchAllProductsDocument).bind(
      null,
      variables
    ),
    options
  );

useSearchAllProductsQuery.getKey = (variables?: SearchAllProductsQueryVariables) =>
  variables === undefined ? ['SearchAllProducts'] : ['SearchAllProducts', variables];
export const useInfiniteSearchAllProductsQuery = <TData = SearchAllProductsQuery, TError = unknown>(
  variables?: SearchAllProductsQueryVariables,
  options?: UseInfiniteQueryOptions<SearchAllProductsQuery, TError, TData>
) => {
  const query = useFetchNewData<SearchAllProductsQuery, SearchAllProductsQueryVariables>(SearchAllProductsDocument);
  return useInfiniteQuery<SearchAllProductsQuery, TError, TData>(
    variables === undefined ? ['SearchAllProducts.infinite'] : ['SearchAllProducts.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteSearchAllProductsQuery.getKey = (variables?: SearchAllProductsQueryVariables) =>
  variables === undefined ? ['SearchAllProducts.infinite'] : ['SearchAllProducts.infinite', variables];
export const GetBmOfferDocument = `
    query GetBmOffer($input: BmOfferInput) {
  me {
    billManagement {
      offersV3(input: $input) {
        edges {
          node {
            id
            provider {
              id
              name
            }
            title
            description
            howItWorks
            about
            termsAndConditions
            estBillAmount {
              amount
              currency
            }
            paidAmount {
              amount
              currency
            }
            savingPercentage
            signUpLink
            logoUrl
            imageUrl
            categoryCode
            reminder {
              reminderDescription
              reminderTextCopy
            }
            stateBasedOffers {
              state
              combinedDiscount
              offerExplaination
              offerExplanationCta
              tiles {
                content
                subContent
              }
            }
          }
        }
      }
    }
  }
}
    `;
export const useGetBmOfferQuery = <TData = GetBmOfferQuery, TError = unknown>(
  variables?: GetBmOfferQueryVariables,
  options?: UseQueryOptions<GetBmOfferQuery, TError, TData>
) =>
  useQuery<GetBmOfferQuery, TError, TData>(
    variables === undefined ? ['GetBmOffer'] : ['GetBmOffer', variables],
    useFetchNewData<GetBmOfferQuery, GetBmOfferQueryVariables>(GetBmOfferDocument).bind(null, variables),
    options
  );

useGetBmOfferQuery.getKey = (variables?: GetBmOfferQueryVariables) =>
  variables === undefined ? ['GetBmOffer'] : ['GetBmOffer', variables];
export const useInfiniteGetBmOfferQuery = <TData = GetBmOfferQuery, TError = unknown>(
  variables?: GetBmOfferQueryVariables,
  options?: UseInfiniteQueryOptions<GetBmOfferQuery, TError, TData>
) => {
  const query = useFetchNewData<GetBmOfferQuery, GetBmOfferQueryVariables>(GetBmOfferDocument);
  return useInfiniteQuery<GetBmOfferQuery, TError, TData>(
    variables === undefined ? ['GetBmOffer.infinite'] : ['GetBmOffer.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetBmOfferQuery.getKey = (variables?: GetBmOfferQueryVariables) =>
  variables === undefined ? ['GetBmOffer.infinite'] : ['GetBmOffer.infinite', variables];
export const GetBmOfferDetailDocument = `
    query GetBmOfferDetail($input: OfferInput!) {
  me {
    billManagement {
      offerV2(input: $input) {
        id
        provider {
          id
          name
        }
        title
        description
        howItWorks
        about
        termsAndConditions
        estBillAmount {
          amount
          currency
        }
        paidAmount {
          amount
          currency
        }
        savingPercentage
        signUpLink
        logoUrl
        imageUrl
        categoryCode
        reminder {
          reminderDescription
          reminderTextCopy
        }
        stateBasedOffers {
          state
          combinedDiscount
          offerExplaination
          offerExplanationCta
          tiles {
            content
            subContent
          }
        }
      }
    }
  }
}
    `;
export const useGetBmOfferDetailQuery = <TData = GetBmOfferDetailQuery, TError = unknown>(
  variables: GetBmOfferDetailQueryVariables,
  options?: UseQueryOptions<GetBmOfferDetailQuery, TError, TData>
) =>
  useQuery<GetBmOfferDetailQuery, TError, TData>(
    ['GetBmOfferDetail', variables],
    useFetchNewData<GetBmOfferDetailQuery, GetBmOfferDetailQueryVariables>(GetBmOfferDetailDocument).bind(
      null,
      variables
    ),
    options
  );

useGetBmOfferDetailQuery.getKey = (variables: GetBmOfferDetailQueryVariables) => ['GetBmOfferDetail', variables];
export const useInfiniteGetBmOfferDetailQuery = <TData = GetBmOfferDetailQuery, TError = unknown>(
  variables: GetBmOfferDetailQueryVariables,
  options?: UseInfiniteQueryOptions<GetBmOfferDetailQuery, TError, TData>
) => {
  const query = useFetchNewData<GetBmOfferDetailQuery, GetBmOfferDetailQueryVariables>(GetBmOfferDetailDocument);
  return useInfiniteQuery<GetBmOfferDetailQuery, TError, TData>(
    ['GetBmOfferDetail.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetBmOfferDetailQuery.getKey = (variables: GetBmOfferDetailQueryVariables) => [
  'GetBmOfferDetail.infinite',
  variables,
];
export const GetSubscriptionsDocument = `
    query GetSubscriptions($input: SubscriptionsInput) {
  me {
    billManagement {
      subscriptions(input: $input) {
        edges {
          node {
            id
            status
            createdAt
            updatedAt
            isHPPromo
            provider {
              id
              name
              logoUrl
            }
            totalSaved {
              amount
              currency
            }
            latestBill {
              ... on BillTransaction {
                id
                createdAt
                type
                amount {
                  amount
                  currency
                }
                issueDate
                dateFrom
                dateTo
                dueDate
                status
                transactionDate
              }
              ... on PaymentTransaction {
                id
                createdAt
                type
                amount {
                  amount
                  currency
                }
                paymentDate
                paymentMethod
                paymentType
                transactionDate
              }
            }
            subscriptionType
            signUpLink
            title
            description
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
}
    `;
export const useGetSubscriptionsQuery = <TData = GetSubscriptionsQuery, TError = unknown>(
  variables?: GetSubscriptionsQueryVariables,
  options?: UseQueryOptions<GetSubscriptionsQuery, TError, TData>
) =>
  useQuery<GetSubscriptionsQuery, TError, TData>(
    variables === undefined ? ['GetSubscriptions'] : ['GetSubscriptions', variables],
    useFetchNewData<GetSubscriptionsQuery, GetSubscriptionsQueryVariables>(GetSubscriptionsDocument).bind(
      null,
      variables
    ),
    options
  );

useGetSubscriptionsQuery.getKey = (variables?: GetSubscriptionsQueryVariables) =>
  variables === undefined ? ['GetSubscriptions'] : ['GetSubscriptions', variables];
export const useInfiniteGetSubscriptionsQuery = <TData = GetSubscriptionsQuery, TError = unknown>(
  variables?: GetSubscriptionsQueryVariables,
  options?: UseInfiniteQueryOptions<GetSubscriptionsQuery, TError, TData>
) => {
  const query = useFetchNewData<GetSubscriptionsQuery, GetSubscriptionsQueryVariables>(GetSubscriptionsDocument);
  return useInfiniteQuery<GetSubscriptionsQuery, TError, TData>(
    variables === undefined ? ['GetSubscriptions.infinite'] : ['GetSubscriptions.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetSubscriptionsQuery.getKey = (variables?: GetSubscriptionsQueryVariables) =>
  variables === undefined ? ['GetSubscriptions.infinite'] : ['GetSubscriptions.infinite', variables];
export const GetSubscriptionDetailDocument = `
    query GetSubscriptionDetail($input: SubscriptionInput!) {
  me {
    billManagement {
      subscription(input: $input) {
        id
        status
        createdAt
        updatedAt
        isHPPromo
        latestBill {
          ... on BillTransaction {
            id
            createdAt
            type
            issueDate
            dateFrom
            dateTo
            dueDate
            status
            transactionDate
            amount {
              amount
              currency
            }
          }
        }
        subscriptionType
        signUpLink
        title
        description
        provider {
          id
          name
          faq
          contactInfo
          paymentUrl
        }
        transactions {
          edges {
            node {
              ... on PaymentTransaction {
                id
                createdAt
                type
                paymentDate
                paymentMethod
                paymentType
                transactionDate
                amount {
                  amount
                  currency
                }
              }
              ... on BillTransaction {
                id
                createdAt
                type
                issueDate
                dateFrom
                dateTo
                dueDate
                status
                transactionDate
                amount {
                  amount
                  currency
                }
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
        totalSaved {
          amount
          currency
        }
      }
    }
  }
}
    `;
export const useGetSubscriptionDetailQuery = <TData = GetSubscriptionDetailQuery, TError = unknown>(
  variables: GetSubscriptionDetailQueryVariables,
  options?: UseQueryOptions<GetSubscriptionDetailQuery, TError, TData>
) =>
  useQuery<GetSubscriptionDetailQuery, TError, TData>(
    ['GetSubscriptionDetail', variables],
    useFetchNewData<GetSubscriptionDetailQuery, GetSubscriptionDetailQueryVariables>(
      GetSubscriptionDetailDocument
    ).bind(null, variables),
    options
  );

useGetSubscriptionDetailQuery.getKey = (variables: GetSubscriptionDetailQueryVariables) => [
  'GetSubscriptionDetail',
  variables,
];
export const useInfiniteGetSubscriptionDetailQuery = <TData = GetSubscriptionDetailQuery, TError = unknown>(
  variables: GetSubscriptionDetailQueryVariables,
  options?: UseInfiniteQueryOptions<GetSubscriptionDetailQuery, TError, TData>
) => {
  const query = useFetchNewData<GetSubscriptionDetailQuery, GetSubscriptionDetailQueryVariables>(
    GetSubscriptionDetailDocument
  );
  return useInfiniteQuery<GetSubscriptionDetailQuery, TError, TData>(
    ['GetSubscriptionDetail.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetSubscriptionDetailQuery.getKey = (variables: GetSubscriptionDetailQueryVariables) => [
  'GetSubscriptionDetail.infinite',
  variables,
];
export const GetSubscriptionTransactionsDocument = `
    query GetSubscriptionTransactions($subcriptionInput: SubscriptionInput!, $transactionsInput: TransactionsInput) {
  me {
    billManagement {
      subscription(input: $subcriptionInput) {
        transactions(input: $transactionsInput) {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              ... on BillTransaction {
                id
                createdAt
                type
                issueDate
                dateFrom
                dateTo
                dueDate
                status
                transactionDate
                amount {
                  amount
                  currency
                }
              }
              ... on PaymentTransaction {
                id
                createdAt
                type
                paymentDate
                paymentMethod
                paymentType
                transactionDate
                amount {
                  amount
                  currency
                }
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    }
  }
}
    `;
export const useGetSubscriptionTransactionsQuery = <TData = GetSubscriptionTransactionsQuery, TError = unknown>(
  variables: GetSubscriptionTransactionsQueryVariables,
  options?: UseQueryOptions<GetSubscriptionTransactionsQuery, TError, TData>
) =>
  useQuery<GetSubscriptionTransactionsQuery, TError, TData>(
    ['GetSubscriptionTransactions', variables],
    useFetchNewData<GetSubscriptionTransactionsQuery, GetSubscriptionTransactionsQueryVariables>(
      GetSubscriptionTransactionsDocument
    ).bind(null, variables),
    options
  );

useGetSubscriptionTransactionsQuery.getKey = (variables: GetSubscriptionTransactionsQueryVariables) => [
  'GetSubscriptionTransactions',
  variables,
];
export const useInfiniteGetSubscriptionTransactionsQuery = <TData = GetSubscriptionTransactionsQuery, TError = unknown>(
  variables: GetSubscriptionTransactionsQueryVariables,
  options?: UseInfiniteQueryOptions<GetSubscriptionTransactionsQuery, TError, TData>
) => {
  const query = useFetchNewData<GetSubscriptionTransactionsQuery, GetSubscriptionTransactionsQueryVariables>(
    GetSubscriptionTransactionsDocument
  );
  return useInfiniteQuery<GetSubscriptionTransactionsQuery, TError, TData>(
    ['GetSubscriptionTransactions.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetSubscriptionTransactionsQuery.getKey = (variables: GetSubscriptionTransactionsQueryVariables) => [
  'GetSubscriptionTransactions.infinite',
  variables,
];
export const BsJoinWaitListDocument = `
    mutation BsJoinWaitList($input: BsJoinWaitListInput) {
  bsJoinWaitList(input: $input) {
    success
    message
  }
}
    `;
export const useBsJoinWaitListMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<BsJoinWaitListMutation, TError, BsJoinWaitListMutationVariables, TContext>
) =>
  useMutation<BsJoinWaitListMutation, TError, BsJoinWaitListMutationVariables, TContext>(
    ['BsJoinWaitList'],
    useFetchNewData<BsJoinWaitListMutation, BsJoinWaitListMutationVariables>(BsJoinWaitListDocument),
    options
  );
export const BmSubmitSubscriptionDocument = `
    mutation BmSubmitSubscription($input: BsSubmitSubscriptionInput) {
  bmSubmitSubscription(inputL: $input) {
    success
  }
}
    `;
export const useBmSubmitSubscriptionMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<BmSubmitSubscriptionMutation, TError, BmSubmitSubscriptionMutationVariables, TContext>
) =>
  useMutation<BmSubmitSubscriptionMutation, TError, BmSubmitSubscriptionMutationVariables, TContext>(
    ['BmSubmitSubscription'],
    useFetchNewData<BmSubmitSubscriptionMutation, BmSubmitSubscriptionMutationVariables>(BmSubmitSubscriptionDocument),
    options
  );
export const SearchBillOffersDocument = `
    query SearchBillOffers($input: BmOfferInput) {
  me {
    billManagement {
      offersV3(input: $input) {
        edges {
          node {
            id
            provider {
              id
              name
              faq
              contactInfo
              paymentUrl
            }
            description
            title
            description
            howItWorks
            about
            termsAndConditions
            estBillAmount {
              amount
              currency
            }
            paidAmount {
              amount
              currency
            }
            savingPercentage
            signUpLink
            categoryCode
            reminder {
              reminderDescription
              reminderTextCopy
            }
            stateBasedOffers {
              state
              combinedDiscount
              offerExplaination
              offerExplanationCta
              tiles {
                content
                subContent
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
          totalCount
          totalPages
        }
      }
    }
  }
}
    `;
export const useSearchBillOffersQuery = <TData = SearchBillOffersQuery, TError = unknown>(
  variables?: SearchBillOffersQueryVariables,
  options?: UseQueryOptions<SearchBillOffersQuery, TError, TData>
) =>
  useQuery<SearchBillOffersQuery, TError, TData>(
    variables === undefined ? ['SearchBillOffers'] : ['SearchBillOffers', variables],
    useFetchNewData<SearchBillOffersQuery, SearchBillOffersQueryVariables>(SearchBillOffersDocument).bind(
      null,
      variables
    ),
    options
  );

useSearchBillOffersQuery.getKey = (variables?: SearchBillOffersQueryVariables) =>
  variables === undefined ? ['SearchBillOffers'] : ['SearchBillOffers', variables];
export const useInfiniteSearchBillOffersQuery = <TData = SearchBillOffersQuery, TError = unknown>(
  variables?: SearchBillOffersQueryVariables,
  options?: UseInfiniteQueryOptions<SearchBillOffersQuery, TError, TData>
) => {
  const query = useFetchNewData<SearchBillOffersQuery, SearchBillOffersQueryVariables>(SearchBillOffersDocument);
  return useInfiniteQuery<SearchBillOffersQuery, TError, TData>(
    variables === undefined ? ['SearchBillOffers.infinite'] : ['SearchBillOffers.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteSearchBillOffersQuery.getKey = (variables?: SearchBillOffersQueryVariables) =>
  variables === undefined ? ['SearchBillOffers.infinite'] : ['SearchBillOffers.infinite', variables];
export const IsEligibleForPromotionDocument = `
    query IsEligibleForPromotion($input: EligibleForPromotionInput) {
  me {
    billManagement {
      isEligibleForPromotion(input: $input)
    }
  }
}
    `;
export const useIsEligibleForPromotionQuery = <TData = IsEligibleForPromotionQuery, TError = unknown>(
  variables?: IsEligibleForPromotionQueryVariables,
  options?: UseQueryOptions<IsEligibleForPromotionQuery, TError, TData>
) =>
  useQuery<IsEligibleForPromotionQuery, TError, TData>(
    variables === undefined ? ['IsEligibleForPromotion'] : ['IsEligibleForPromotion', variables],
    useFetchNewData<IsEligibleForPromotionQuery, IsEligibleForPromotionQueryVariables>(
      IsEligibleForPromotionDocument
    ).bind(null, variables),
    options
  );

useIsEligibleForPromotionQuery.getKey = (variables?: IsEligibleForPromotionQueryVariables) =>
  variables === undefined ? ['IsEligibleForPromotion'] : ['IsEligibleForPromotion', variables];
export const useInfiniteIsEligibleForPromotionQuery = <TData = IsEligibleForPromotionQuery, TError = unknown>(
  variables?: IsEligibleForPromotionQueryVariables,
  options?: UseInfiniteQueryOptions<IsEligibleForPromotionQuery, TError, TData>
) => {
  const query = useFetchNewData<IsEligibleForPromotionQuery, IsEligibleForPromotionQueryVariables>(
    IsEligibleForPromotionDocument
  );
  return useInfiniteQuery<IsEligibleForPromotionQuery, TError, TData>(
    variables === undefined ? ['IsEligibleForPromotion.infinite'] : ['IsEligibleForPromotion.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteIsEligibleForPromotionQuery.getKey = (variables?: IsEligibleForPromotionQueryVariables) =>
  variables === undefined ? ['IsEligibleForPromotion.infinite'] : ['IsEligibleForPromotion.infinite', variables];
export const GetHomeTilesDocument = `
    query GetHomeTiles {
  me {
    billManagement {
      homeTiles {
        tiles {
          banner
          title
          subTitle
          provider {
            id
          }
        }
      }
    }
  }
}
    `;
export const useGetHomeTilesQuery = <TData = GetHomeTilesQuery, TError = unknown>(
  variables?: GetHomeTilesQueryVariables,
  options?: UseQueryOptions<GetHomeTilesQuery, TError, TData>
) =>
  useQuery<GetHomeTilesQuery, TError, TData>(
    variables === undefined ? ['GetHomeTiles'] : ['GetHomeTiles', variables],
    useFetchNewData<GetHomeTilesQuery, GetHomeTilesQueryVariables>(GetHomeTilesDocument).bind(null, variables),
    options
  );

useGetHomeTilesQuery.getKey = (variables?: GetHomeTilesQueryVariables) =>
  variables === undefined ? ['GetHomeTiles'] : ['GetHomeTiles', variables];
export const useInfiniteGetHomeTilesQuery = <TData = GetHomeTilesQuery, TError = unknown>(
  variables?: GetHomeTilesQueryVariables,
  options?: UseInfiniteQueryOptions<GetHomeTilesQuery, TError, TData>
) => {
  const query = useFetchNewData<GetHomeTilesQuery, GetHomeTilesQueryVariables>(GetHomeTilesDocument);
  return useInfiniteQuery<GetHomeTilesQuery, TError, TData>(
    variables === undefined ? ['GetHomeTiles.infinite'] : ['GetHomeTiles.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetHomeTilesQuery.getKey = (variables?: GetHomeTilesQueryVariables) =>
  variables === undefined ? ['GetHomeTiles.infinite'] : ['GetHomeTiles.infinite', variables];
export const GetPromotionDocument = `
    query GetPromotion {
  me {
    billManagement {
      promotion {
        homeTitle
        homeSubTitle
        cardTitle
        cardSubTitle
        tagContent
        descriptionBtsTitle
        descriptionBtsContent
        offerTitle
        offerSubTitle
        termsAndConditions
        signedUpBillStatusContent
        signedUpCardTitle
        signedUpCardSubTitle
        searchCardTitle
      }
    }
  }
}
    `;
export const useGetPromotionQuery = <TData = GetPromotionQuery, TError = unknown>(
  variables?: GetPromotionQueryVariables,
  options?: UseQueryOptions<GetPromotionQuery, TError, TData>
) =>
  useQuery<GetPromotionQuery, TError, TData>(
    variables === undefined ? ['GetPromotion'] : ['GetPromotion', variables],
    useFetchNewData<GetPromotionQuery, GetPromotionQueryVariables>(GetPromotionDocument).bind(null, variables),
    options
  );

useGetPromotionQuery.getKey = (variables?: GetPromotionQueryVariables) =>
  variables === undefined ? ['GetPromotion'] : ['GetPromotion', variables];
export const useInfiniteGetPromotionQuery = <TData = GetPromotionQuery, TError = unknown>(
  variables?: GetPromotionQueryVariables,
  options?: UseInfiniteQueryOptions<GetPromotionQuery, TError, TData>
) => {
  const query = useFetchNewData<GetPromotionQuery, GetPromotionQueryVariables>(GetPromotionDocument);
  return useInfiniteQuery<GetPromotionQuery, TError, TData>(
    variables === undefined ? ['GetPromotion.infinite'] : ['GetPromotion.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetPromotionQuery.getKey = (variables?: GetPromotionQueryVariables) =>
  variables === undefined ? ['GetPromotion.infinite'] : ['GetPromotion.infinite', variables];
export const GetAhmAccessTokenDocument = `
    query getAhmAccessToken {
  me {
    billManagement {
      ahmAccessToken
    }
  }
}
    `;
export const useGetAhmAccessTokenQuery = <TData = GetAhmAccessTokenQuery, TError = unknown>(
  variables?: GetAhmAccessTokenQueryVariables,
  options?: UseQueryOptions<GetAhmAccessTokenQuery, TError, TData>
) =>
  useQuery<GetAhmAccessTokenQuery, TError, TData>(
    variables === undefined ? ['getAhmAccessToken'] : ['getAhmAccessToken', variables],
    useFetchNewData<GetAhmAccessTokenQuery, GetAhmAccessTokenQueryVariables>(GetAhmAccessTokenDocument).bind(
      null,
      variables
    ),
    options
  );

useGetAhmAccessTokenQuery.getKey = (variables?: GetAhmAccessTokenQueryVariables) =>
  variables === undefined ? ['getAhmAccessToken'] : ['getAhmAccessToken', variables];
export const useInfiniteGetAhmAccessTokenQuery = <TData = GetAhmAccessTokenQuery, TError = unknown>(
  variables?: GetAhmAccessTokenQueryVariables,
  options?: UseInfiniteQueryOptions<GetAhmAccessTokenQuery, TError, TData>
) => {
  const query = useFetchNewData<GetAhmAccessTokenQuery, GetAhmAccessTokenQueryVariables>(GetAhmAccessTokenDocument);
  return useInfiniteQuery<GetAhmAccessTokenQuery, TError, TData>(
    variables === undefined ? ['getAhmAccessToken.infinite'] : ['getAhmAccessToken.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetAhmAccessTokenQuery.getKey = (variables?: GetAhmAccessTokenQueryVariables) =>
  variables === undefined ? ['getAhmAccessToken.infinite'] : ['getAhmAccessToken.infinite', variables];
export const GetCurrentCardDetailsDocument = `
    query getCurrentCardDetails {
  me {
    wallet {
      card {
        details {
          id
          status
        }
      }
    }
  }
}
    `;
export const useGetCurrentCardDetailsQuery = <TData = GetCurrentCardDetailsQuery, TError = unknown>(
  variables?: GetCurrentCardDetailsQueryVariables,
  options?: UseQueryOptions<GetCurrentCardDetailsQuery, TError, TData>
) =>
  useQuery<GetCurrentCardDetailsQuery, TError, TData>(
    variables === undefined ? ['getCurrentCardDetails'] : ['getCurrentCardDetails', variables],
    useFetchNewData<GetCurrentCardDetailsQuery, GetCurrentCardDetailsQueryVariables>(
      GetCurrentCardDetailsDocument
    ).bind(null, variables),
    options
  );

useGetCurrentCardDetailsQuery.getKey = (variables?: GetCurrentCardDetailsQueryVariables) =>
  variables === undefined ? ['getCurrentCardDetails'] : ['getCurrentCardDetails', variables];
export const useInfiniteGetCurrentCardDetailsQuery = <TData = GetCurrentCardDetailsQuery, TError = unknown>(
  variables?: GetCurrentCardDetailsQueryVariables,
  options?: UseInfiniteQueryOptions<GetCurrentCardDetailsQuery, TError, TData>
) => {
  const query = useFetchNewData<GetCurrentCardDetailsQuery, GetCurrentCardDetailsQueryVariables>(
    GetCurrentCardDetailsDocument
  );
  return useInfiniteQuery<GetCurrentCardDetailsQuery, TError, TData>(
    variables === undefined ? ['getCurrentCardDetails.infinite'] : ['getCurrentCardDetails.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetCurrentCardDetailsQuery.getKey = (variables?: GetCurrentCardDetailsQueryVariables) =>
  variables === undefined ? ['getCurrentCardDetails.infinite'] : ['getCurrentCardDetails.infinite', variables];
export const GetCurrentCardMetaDocument = `
    query getCurrentCardMeta {
  me {
    wallet {
      card {
        meta {
          id
          contactless
          frozen
          magStrip
          mobileWalletPaymentEnabled
          digitalWalletDetails {
            primaryAccountIdentifier
            wallets {
              reference
              type
            }
          }
        }
      }
    }
  }
}
    `;
export const useGetCurrentCardMetaQuery = <TData = GetCurrentCardMetaQuery, TError = unknown>(
  variables?: GetCurrentCardMetaQueryVariables,
  options?: UseQueryOptions<GetCurrentCardMetaQuery, TError, TData>
) =>
  useQuery<GetCurrentCardMetaQuery, TError, TData>(
    variables === undefined ? ['getCurrentCardMeta'] : ['getCurrentCardMeta', variables],
    useFetchNewData<GetCurrentCardMetaQuery, GetCurrentCardMetaQueryVariables>(GetCurrentCardMetaDocument).bind(
      null,
      variables
    ),
    options
  );

useGetCurrentCardMetaQuery.getKey = (variables?: GetCurrentCardMetaQueryVariables) =>
  variables === undefined ? ['getCurrentCardMeta'] : ['getCurrentCardMeta', variables];
export const useInfiniteGetCurrentCardMetaQuery = <TData = GetCurrentCardMetaQuery, TError = unknown>(
  variables?: GetCurrentCardMetaQueryVariables,
  options?: UseInfiniteQueryOptions<GetCurrentCardMetaQuery, TError, TData>
) => {
  const query = useFetchNewData<GetCurrentCardMetaQuery, GetCurrentCardMetaQueryVariables>(GetCurrentCardMetaDocument);
  return useInfiniteQuery<GetCurrentCardMetaQuery, TError, TData>(
    variables === undefined ? ['getCurrentCardMeta.infinite'] : ['getCurrentCardMeta.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetCurrentCardMetaQuery.getKey = (variables?: GetCurrentCardMetaQueryVariables) =>
  variables === undefined ? ['getCurrentCardMeta.infinite'] : ['getCurrentCardMeta.infinite', variables];
export const GetOemProvisioningDocument = `
    query getOemProvisioning {
  me {
    wallet {
      card {
        oemProvisioning {
          cardHolderName
          cardToken
          expiryDate
          otp
        }
      }
    }
  }
}
    `;
export const useGetOemProvisioningQuery = <TData = GetOemProvisioningQuery, TError = unknown>(
  variables?: GetOemProvisioningQueryVariables,
  options?: UseQueryOptions<GetOemProvisioningQuery, TError, TData>
) =>
  useQuery<GetOemProvisioningQuery, TError, TData>(
    variables === undefined ? ['getOemProvisioning'] : ['getOemProvisioning', variables],
    useFetchNewData<GetOemProvisioningQuery, GetOemProvisioningQueryVariables>(GetOemProvisioningDocument).bind(
      null,
      variables
    ),
    options
  );

useGetOemProvisioningQuery.getKey = (variables?: GetOemProvisioningQueryVariables) =>
  variables === undefined ? ['getOemProvisioning'] : ['getOemProvisioning', variables];
export const useInfiniteGetOemProvisioningQuery = <TData = GetOemProvisioningQuery, TError = unknown>(
  variables?: GetOemProvisioningQueryVariables,
  options?: UseInfiniteQueryOptions<GetOemProvisioningQuery, TError, TData>
) => {
  const query = useFetchNewData<GetOemProvisioningQuery, GetOemProvisioningQueryVariables>(GetOemProvisioningDocument);
  return useInfiniteQuery<GetOemProvisioningQuery, TError, TData>(
    variables === undefined ? ['getOemProvisioning.infinite'] : ['getOemProvisioning.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetOemProvisioningQuery.getKey = (variables?: GetOemProvisioningQueryVariables) =>
  variables === undefined ? ['getOemProvisioning.infinite'] : ['getOemProvisioning.infinite', variables];
export const CreateCardDocument = `
    mutation createCard($input: CreateCardInput!) {
  card {
    create(input: $input) {
      success
    }
  }
}
    `;
export const useCreateCardMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<CreateCardMutation, TError, CreateCardMutationVariables, TContext>
) =>
  useMutation<CreateCardMutation, TError, CreateCardMutationVariables, TContext>(
    ['createCard'],
    useFetchNewData<CreateCardMutation, CreateCardMutationVariables>(CreateCardDocument),
    options
  );
export const ActivateCardDocument = `
    mutation activateCard {
  card {
    activate {
      success
    }
  }
}
    `;
export const useActivateCardMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<ActivateCardMutation, TError, ActivateCardMutationVariables, TContext>
) =>
  useMutation<ActivateCardMutation, TError, ActivateCardMutationVariables, TContext>(
    ['activateCard'],
    useFetchNewData<ActivateCardMutation, ActivateCardMutationVariables>(ActivateCardDocument),
    options
  );
export const RequestNewCardDocument = `
    mutation requestNewCard($address: RequestNewCardInput!) {
  card {
    requestNewCard(input: $address) {
      success
    }
  }
}
    `;
export const useRequestNewCardMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<RequestNewCardMutation, TError, RequestNewCardMutationVariables, TContext>
) =>
  useMutation<RequestNewCardMutation, TError, RequestNewCardMutationVariables, TContext>(
    ['requestNewCard'],
    useFetchNewData<RequestNewCardMutation, RequestNewCardMutationVariables>(RequestNewCardDocument),
    options
  );
export const UpdateCardMetaDocument = `
    mutation updateCardMeta($cardMeta: CardMetaInput!) {
  card {
    updateMeta(input: $cardMeta) {
      success
    }
  }
}
    `;
export const useUpdateCardMetaMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<UpdateCardMetaMutation, TError, UpdateCardMetaMutationVariables, TContext>
) =>
  useMutation<UpdateCardMetaMutation, TError, UpdateCardMetaMutationVariables, TContext>(
    ['updateCardMeta'],
    useFetchNewData<UpdateCardMetaMutation, UpdateCardMetaMutationVariables>(UpdateCardMetaDocument),
    options
  );
export const UpdateCardPinDocument = `
    mutation updateCardPin($cardPIN: String!) {
  card {
    updatePin(input: $cardPIN) {
      success
    }
  }
}
    `;
export const useUpdateCardPinMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<UpdateCardPinMutation, TError, UpdateCardPinMutationVariables, TContext>
) =>
  useMutation<UpdateCardPinMutation, TError, UpdateCardPinMutationVariables, TContext>(
    ['updateCardPin'],
    useFetchNewData<UpdateCardPinMutation, UpdateCardPinMutationVariables>(UpdateCardPinDocument),
    options
  );
export const GetCashbackOffersDocument = `
    query GetCashbackOffers($input: AllOffersInput) {
  me {
    cashback {
      allOffers(input: $input) {
        edges {
          node {
            ... on OnlineOffer {
              id
              type
              categoryCode
              title
              description
              cashback
              imageUrl
              logoUrl
              trackingUrl
              howItWorks
              tnc
              about
              advertiserName
              advertiserAbout
              isCardLinkedOffer
              popularScore
              createdAt
              updatedAt
            }
            ... on InStoreOffer {
              id
              type
              offerId
              title
              description
              cashback
              categoryCode
              howItWorks
              imageUrl
              logoUrl
              advertiserName
              advertiserAbout
              tnc
              website
              phone
              address
              latitude
              longitude
              popularScore
              startDate
              endDate
              createdAt
              updatedAt
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
          totalCount
          totalPages
        }
      }
    }
  }
}
    `;
export const useGetCashbackOffersQuery = <TData = GetCashbackOffersQuery, TError = unknown>(
  variables?: GetCashbackOffersQueryVariables,
  options?: UseQueryOptions<GetCashbackOffersQuery, TError, TData>
) =>
  useQuery<GetCashbackOffersQuery, TError, TData>(
    variables === undefined ? ['GetCashbackOffers'] : ['GetCashbackOffers', variables],
    useFetchNewData<GetCashbackOffersQuery, GetCashbackOffersQueryVariables>(GetCashbackOffersDocument).bind(
      null,
      variables
    ),
    options
  );

useGetCashbackOffersQuery.getKey = (variables?: GetCashbackOffersQueryVariables) =>
  variables === undefined ? ['GetCashbackOffers'] : ['GetCashbackOffers', variables];
export const useInfiniteGetCashbackOffersQuery = <TData = GetCashbackOffersQuery, TError = unknown>(
  variables?: GetCashbackOffersQueryVariables,
  options?: UseInfiniteQueryOptions<GetCashbackOffersQuery, TError, TData>
) => {
  const query = useFetchNewData<GetCashbackOffersQuery, GetCashbackOffersQueryVariables>(GetCashbackOffersDocument);
  return useInfiniteQuery<GetCashbackOffersQuery, TError, TData>(
    variables === undefined ? ['GetCashbackOffers.infinite'] : ['GetCashbackOffers.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetCashbackOffersQuery.getKey = (variables?: GetCashbackOffersQueryVariables) =>
  variables === undefined ? ['GetCashbackOffers.infinite'] : ['GetCashbackOffers.infinite', variables];
export const GetOnlineOfferByIdDocument = `
    query GetOnlineOfferById($id: ID!) {
  me {
    cashback {
      onlineOfferById(id: $id) {
        id
        type
        categoryCode
        title
        description
        cashback
        imageUrl
        logoUrl
        trackingUrl
        howItWorks
        tnc
        about
        advertiserName
        advertiserAbout
        isCardLinkedOffer
        popularScore
        createdAt
        updatedAt
      }
    }
  }
}
    `;
export const useGetOnlineOfferByIdQuery = <TData = GetOnlineOfferByIdQuery, TError = unknown>(
  variables: GetOnlineOfferByIdQueryVariables,
  options?: UseQueryOptions<GetOnlineOfferByIdQuery, TError, TData>
) =>
  useQuery<GetOnlineOfferByIdQuery, TError, TData>(
    ['GetOnlineOfferById', variables],
    useFetchNewData<GetOnlineOfferByIdQuery, GetOnlineOfferByIdQueryVariables>(GetOnlineOfferByIdDocument).bind(
      null,
      variables
    ),
    options
  );

useGetOnlineOfferByIdQuery.getKey = (variables: GetOnlineOfferByIdQueryVariables) => ['GetOnlineOfferById', variables];
export const useInfiniteGetOnlineOfferByIdQuery = <TData = GetOnlineOfferByIdQuery, TError = unknown>(
  variables: GetOnlineOfferByIdQueryVariables,
  options?: UseInfiniteQueryOptions<GetOnlineOfferByIdQuery, TError, TData>
) => {
  const query = useFetchNewData<GetOnlineOfferByIdQuery, GetOnlineOfferByIdQueryVariables>(GetOnlineOfferByIdDocument);
  return useInfiniteQuery<GetOnlineOfferByIdQuery, TError, TData>(
    ['GetOnlineOfferById.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetOnlineOfferByIdQuery.getKey = (variables: GetOnlineOfferByIdQueryVariables) => [
  'GetOnlineOfferById.infinite',
  variables,
];
export const GetInstoreOfferByIdDocument = `
    query GetInstoreOfferById($id: ID!) {
  me {
    cashback {
      inStoreOfferById(id: $id) {
        id
        type
        offerId
        title
        description
        cashback
        categoryCode
        howItWorks
        imageUrl
        logoUrl
        advertiserId
        advertiserName
        advertiserAbout
        tnc
        website
        phone
        address
        latitude
        longitude
        popularScore
        startDate
        endDate
        createdAt
        updatedAt
      }
    }
  }
}
    `;
export const useGetInstoreOfferByIdQuery = <TData = GetInstoreOfferByIdQuery, TError = unknown>(
  variables: GetInstoreOfferByIdQueryVariables,
  options?: UseQueryOptions<GetInstoreOfferByIdQuery, TError, TData>
) =>
  useQuery<GetInstoreOfferByIdQuery, TError, TData>(
    ['GetInstoreOfferById', variables],
    useFetchNewData<GetInstoreOfferByIdQuery, GetInstoreOfferByIdQueryVariables>(GetInstoreOfferByIdDocument).bind(
      null,
      variables
    ),
    options
  );

useGetInstoreOfferByIdQuery.getKey = (variables: GetInstoreOfferByIdQueryVariables) => [
  'GetInstoreOfferById',
  variables,
];
export const useInfiniteGetInstoreOfferByIdQuery = <TData = GetInstoreOfferByIdQuery, TError = unknown>(
  variables: GetInstoreOfferByIdQueryVariables,
  options?: UseInfiniteQueryOptions<GetInstoreOfferByIdQuery, TError, TData>
) => {
  const query = useFetchNewData<GetInstoreOfferByIdQuery, GetInstoreOfferByIdQueryVariables>(
    GetInstoreOfferByIdDocument
  );
  return useInfiniteQuery<GetInstoreOfferByIdQuery, TError, TData>(
    ['GetInstoreOfferById.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetInstoreOfferByIdQuery.getKey = (variables: GetInstoreOfferByIdQueryVariables) => [
  'GetInstoreOfferById.infinite',
  variables,
];
export const CashbackCategoriesDocument = `
    query CashbackCategories {
  me {
    cashback {
      categories {
        categoryCode
        name
        imageUrl
      }
    }
  }
}
    `;
export const useCashbackCategoriesQuery = <TData = CashbackCategoriesQuery, TError = unknown>(
  variables?: CashbackCategoriesQueryVariables,
  options?: UseQueryOptions<CashbackCategoriesQuery, TError, TData>
) =>
  useQuery<CashbackCategoriesQuery, TError, TData>(
    variables === undefined ? ['CashbackCategories'] : ['CashbackCategories', variables],
    useFetchNewData<CashbackCategoriesQuery, CashbackCategoriesQueryVariables>(CashbackCategoriesDocument).bind(
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
  const query = useFetchNewData<CashbackCategoriesQuery, CashbackCategoriesQueryVariables>(CashbackCategoriesDocument);
  return useInfiniteQuery<CashbackCategoriesQuery, TError, TData>(
    variables === undefined ? ['CashbackCategories.infinite'] : ['CashbackCategories.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteCashbackCategoriesQuery.getKey = (variables?: CashbackCategoriesQueryVariables) =>
  variables === undefined ? ['CashbackCategories.infinite'] : ['CashbackCategories.infinite', variables];
export const AcceptTncDocument = `
    mutation AcceptTnc {
  cashback {
    acceptTnc {
      success
    }
  }
}
    `;
export const useAcceptTncMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<AcceptTncMutation, TError, AcceptTncMutationVariables, TContext>
) =>
  useMutation<AcceptTncMutation, TError, AcceptTncMutationVariables, TContext>(
    ['AcceptTnc'],
    useFetchNewData<AcceptTncMutation, AcceptTncMutationVariables>(AcceptTncDocument),
    options
  );
export const GetFeaturedOffersDocument = `
    query GetFeaturedOffers($input: FeaturesOffersInput) {
  me {
    cashback {
      featuresOffers(input: $input) {
        edges {
          node {
            id
            type
            categoryCode
            title
            description
            cashback
            imageUrl
            logoUrl
            trackingUrl
            howItWorks
            tnc
            about
            advertiserId
            advertiserName
            advertiserAbout
            isCardLinkedOffer
            popularScore
            createdAt
            updatedAt
          }
        }
        pageInfo {
          hasNextPage
          endCursor
          totalCount
          totalPages
        }
      }
    }
  }
}
    `;
export const useGetFeaturedOffersQuery = <TData = GetFeaturedOffersQuery, TError = unknown>(
  variables?: GetFeaturedOffersQueryVariables,
  options?: UseQueryOptions<GetFeaturedOffersQuery, TError, TData>
) =>
  useQuery<GetFeaturedOffersQuery, TError, TData>(
    variables === undefined ? ['GetFeaturedOffers'] : ['GetFeaturedOffers', variables],
    useFetchNewData<GetFeaturedOffersQuery, GetFeaturedOffersQueryVariables>(GetFeaturedOffersDocument).bind(
      null,
      variables
    ),
    options
  );

useGetFeaturedOffersQuery.getKey = (variables?: GetFeaturedOffersQueryVariables) =>
  variables === undefined ? ['GetFeaturedOffers'] : ['GetFeaturedOffers', variables];
export const useInfiniteGetFeaturedOffersQuery = <TData = GetFeaturedOffersQuery, TError = unknown>(
  variables?: GetFeaturedOffersQueryVariables,
  options?: UseInfiniteQueryOptions<GetFeaturedOffersQuery, TError, TData>
) => {
  const query = useFetchNewData<GetFeaturedOffersQuery, GetFeaturedOffersQueryVariables>(GetFeaturedOffersDocument);
  return useInfiniteQuery<GetFeaturedOffersQuery, TError, TData>(
    variables === undefined ? ['GetFeaturedOffers.infinite'] : ['GetFeaturedOffers.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetFeaturedOffersQuery.getKey = (variables?: GetFeaturedOffersQueryVariables) =>
  variables === undefined ? ['GetFeaturedOffers.infinite'] : ['GetFeaturedOffers.infinite', variables];
export const GetCashbackOffersGroupByAdvertiserDocument = `
    query GetCashbackOffersGroupByAdvertiser($input: AllAdvertisersInput) {
  me {
    cashback {
      allAdvertisers(input: $input) {
        edges {
          node {
            id
            advertiserId
            advertiserName
            advertiserAbout
            type
            offers {
              ... on OnlineOffer {
                id
                type
                categoryCode
                title
                description
                cashback
                imageUrl
                logoUrl
                trackingUrl
                howItWorks
                tnc
                about
                advertiserId
                advertiserName
                advertiserAbout
                isCardLinkedOffer
                popularScore
                createdAt
                updatedAt
              }
              ... on InstoreOfferV2 {
                id
                type
                offerId
                title
                description
                cashback
                categoryCode
                howItWorks
                imageUrl
                logoUrl
                advertiserName
                advertiserAbout
                tnc
                website
                phone
                locations {
                  locationId
                  address
                  latitude
                  longitude
                }
                popularScore
                startDate
                endDate
                createdAt
                updatedAt
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
          totalCount
          totalPages
        }
      }
    }
  }
}
    `;
export const useGetCashbackOffersGroupByAdvertiserQuery = <
  TData = GetCashbackOffersGroupByAdvertiserQuery,
  TError = unknown
>(
  variables?: GetCashbackOffersGroupByAdvertiserQueryVariables,
  options?: UseQueryOptions<GetCashbackOffersGroupByAdvertiserQuery, TError, TData>
) =>
  useQuery<GetCashbackOffersGroupByAdvertiserQuery, TError, TData>(
    variables === undefined
      ? ['GetCashbackOffersGroupByAdvertiser']
      : ['GetCashbackOffersGroupByAdvertiser', variables],
    useFetchNewData<GetCashbackOffersGroupByAdvertiserQuery, GetCashbackOffersGroupByAdvertiserQueryVariables>(
      GetCashbackOffersGroupByAdvertiserDocument
    ).bind(null, variables),
    options
  );

useGetCashbackOffersGroupByAdvertiserQuery.getKey = (variables?: GetCashbackOffersGroupByAdvertiserQueryVariables) =>
  variables === undefined ? ['GetCashbackOffersGroupByAdvertiser'] : ['GetCashbackOffersGroupByAdvertiser', variables];
export const useInfiniteGetCashbackOffersGroupByAdvertiserQuery = <
  TData = GetCashbackOffersGroupByAdvertiserQuery,
  TError = unknown
>(
  variables?: GetCashbackOffersGroupByAdvertiserQueryVariables,
  options?: UseInfiniteQueryOptions<GetCashbackOffersGroupByAdvertiserQuery, TError, TData>
) => {
  const query = useFetchNewData<
    GetCashbackOffersGroupByAdvertiserQuery,
    GetCashbackOffersGroupByAdvertiserQueryVariables
  >(GetCashbackOffersGroupByAdvertiserDocument);
  return useInfiniteQuery<GetCashbackOffersGroupByAdvertiserQuery, TError, TData>(
    variables === undefined
      ? ['GetCashbackOffersGroupByAdvertiser.infinite']
      : ['GetCashbackOffersGroupByAdvertiser.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetCashbackOffersGroupByAdvertiserQuery.getKey = (
  variables?: GetCashbackOffersGroupByAdvertiserQueryVariables
) =>
  variables === undefined
    ? ['GetCashbackOffersGroupByAdvertiser.infinite']
    : ['GetCashbackOffersGroupByAdvertiser.infinite', variables];
export const GetInstoreOffersByAdvertiserIdDocument = `
    query GetInstoreOffersByAdvertiserId($id: ID!) {
  me {
    cashback {
      instoreOffersByAdvertiserId(id: $id) {
        offers {
          id
          type
          offerId
          title
          description
          cashback
          categoryCode
          howItWorks
          imageUrl
          logoUrl
          advertiserName
          advertiserAbout
          tnc
          website
          phone
          locations {
            locationId
            address
            latitude
            longitude
          }
          popularScore
          startDate
          endDate
          createdAt
          updatedAt
        }
      }
    }
  }
}
    `;
export const useGetInstoreOffersByAdvertiserIdQuery = <TData = GetInstoreOffersByAdvertiserIdQuery, TError = unknown>(
  variables: GetInstoreOffersByAdvertiserIdQueryVariables,
  options?: UseQueryOptions<GetInstoreOffersByAdvertiserIdQuery, TError, TData>
) =>
  useQuery<GetInstoreOffersByAdvertiserIdQuery, TError, TData>(
    ['GetInstoreOffersByAdvertiserId', variables],
    useFetchNewData<GetInstoreOffersByAdvertiserIdQuery, GetInstoreOffersByAdvertiserIdQueryVariables>(
      GetInstoreOffersByAdvertiserIdDocument
    ).bind(null, variables),
    options
  );

useGetInstoreOffersByAdvertiserIdQuery.getKey = (variables: GetInstoreOffersByAdvertiserIdQueryVariables) => [
  'GetInstoreOffersByAdvertiserId',
  variables,
];
export const useInfiniteGetInstoreOffersByAdvertiserIdQuery = <
  TData = GetInstoreOffersByAdvertiserIdQuery,
  TError = unknown
>(
  variables: GetInstoreOffersByAdvertiserIdQueryVariables,
  options?: UseInfiniteQueryOptions<GetInstoreOffersByAdvertiserIdQuery, TError, TData>
) => {
  const query = useFetchNewData<GetInstoreOffersByAdvertiserIdQuery, GetInstoreOffersByAdvertiserIdQueryVariables>(
    GetInstoreOffersByAdvertiserIdDocument
  );
  return useInfiniteQuery<GetInstoreOffersByAdvertiserIdQuery, TError, TData>(
    ['GetInstoreOffersByAdvertiserId.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetInstoreOffersByAdvertiserIdQuery.getKey = (variables: GetInstoreOffersByAdvertiserIdQueryVariables) => [
  'GetInstoreOffersByAdvertiserId.infinite',
  variables,
];
export const GetCashbackTermsAndConditionsDocument = `
    query GetCashbackTermsAndConditions {
  me {
    cashback {
      termsAndConditions {
        items {
          text
          textVariant
          type
          boldText
          boldTextVariant
          showListItemSymbol
          url
        }
      }
    }
  }
}
    `;
export const useGetCashbackTermsAndConditionsQuery = <TData = GetCashbackTermsAndConditionsQuery, TError = unknown>(
  variables?: GetCashbackTermsAndConditionsQueryVariables,
  options?: UseQueryOptions<GetCashbackTermsAndConditionsQuery, TError, TData>
) =>
  useQuery<GetCashbackTermsAndConditionsQuery, TError, TData>(
    variables === undefined ? ['GetCashbackTermsAndConditions'] : ['GetCashbackTermsAndConditions', variables],
    useFetchNewData<GetCashbackTermsAndConditionsQuery, GetCashbackTermsAndConditionsQueryVariables>(
      GetCashbackTermsAndConditionsDocument
    ).bind(null, variables),
    options
  );

useGetCashbackTermsAndConditionsQuery.getKey = (variables?: GetCashbackTermsAndConditionsQueryVariables) =>
  variables === undefined ? ['GetCashbackTermsAndConditions'] : ['GetCashbackTermsAndConditions', variables];
export const useInfiniteGetCashbackTermsAndConditionsQuery = <
  TData = GetCashbackTermsAndConditionsQuery,
  TError = unknown
>(
  variables?: GetCashbackTermsAndConditionsQueryVariables,
  options?: UseInfiniteQueryOptions<GetCashbackTermsAndConditionsQuery, TError, TData>
) => {
  const query = useFetchNewData<GetCashbackTermsAndConditionsQuery, GetCashbackTermsAndConditionsQueryVariables>(
    GetCashbackTermsAndConditionsDocument
  );
  return useInfiniteQuery<GetCashbackTermsAndConditionsQuery, TError, TData>(
    variables === undefined
      ? ['GetCashbackTermsAndConditions.infinite']
      : ['GetCashbackTermsAndConditions.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetCashbackTermsAndConditionsQuery.getKey = (variables?: GetCashbackTermsAndConditionsQueryVariables) =>
  variables === undefined
    ? ['GetCashbackTermsAndConditions.infinite']
    : ['GetCashbackTermsAndConditions.infinite', variables];
export const GetCashbackTermsAndConditionsAcceptanceDocument = `
    query GetCashbackTermsAndConditionsAcceptance {
  me {
    cashback {
      termsAndConditionsAcceptance {
        isAccepted
      }
    }
  }
}
    `;
export const useGetCashbackTermsAndConditionsAcceptanceQuery = <
  TData = GetCashbackTermsAndConditionsAcceptanceQuery,
  TError = unknown
>(
  variables?: GetCashbackTermsAndConditionsAcceptanceQueryVariables,
  options?: UseQueryOptions<GetCashbackTermsAndConditionsAcceptanceQuery, TError, TData>
) =>
  useQuery<GetCashbackTermsAndConditionsAcceptanceQuery, TError, TData>(
    variables === undefined
      ? ['GetCashbackTermsAndConditionsAcceptance']
      : ['GetCashbackTermsAndConditionsAcceptance', variables],
    useFetchNewData<
      GetCashbackTermsAndConditionsAcceptanceQuery,
      GetCashbackTermsAndConditionsAcceptanceQueryVariables
    >(GetCashbackTermsAndConditionsAcceptanceDocument).bind(null, variables),
    options
  );

useGetCashbackTermsAndConditionsAcceptanceQuery.getKey = (
  variables?: GetCashbackTermsAndConditionsAcceptanceQueryVariables
) =>
  variables === undefined
    ? ['GetCashbackTermsAndConditionsAcceptance']
    : ['GetCashbackTermsAndConditionsAcceptance', variables];
export const useInfiniteGetCashbackTermsAndConditionsAcceptanceQuery = <
  TData = GetCashbackTermsAndConditionsAcceptanceQuery,
  TError = unknown
>(
  variables?: GetCashbackTermsAndConditionsAcceptanceQueryVariables,
  options?: UseInfiniteQueryOptions<GetCashbackTermsAndConditionsAcceptanceQuery, TError, TData>
) => {
  const query = useFetchNewData<
    GetCashbackTermsAndConditionsAcceptanceQuery,
    GetCashbackTermsAndConditionsAcceptanceQueryVariables
  >(GetCashbackTermsAndConditionsAcceptanceDocument);
  return useInfiniteQuery<GetCashbackTermsAndConditionsAcceptanceQuery, TError, TData>(
    variables === undefined
      ? ['GetCashbackTermsAndConditionsAcceptance.infinite']
      : ['GetCashbackTermsAndConditionsAcceptance.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetCashbackTermsAndConditionsAcceptanceQuery.getKey = (
  variables?: GetCashbackTermsAndConditionsAcceptanceQueryVariables
) =>
  variables === undefined
    ? ['GetCashbackTermsAndConditionsAcceptance.infinite']
    : ['GetCashbackTermsAndConditionsAcceptance.infinite', variables];
export const GetEnrolCardDetailScreenDocument = `
    query GetEnrolCardDetailScreen {
  me {
    cashback {
      banks {
        edges {
          node {
            id
            name
            region
          }
        }
      }
      ehProviderId {
        id
      }
    }
    wallet {
      ehBinRange {
        from
        to
      }
    }
  }
}
    `;
export const useGetEnrolCardDetailScreenQuery = <TData = GetEnrolCardDetailScreenQuery, TError = unknown>(
  variables?: GetEnrolCardDetailScreenQueryVariables,
  options?: UseQueryOptions<GetEnrolCardDetailScreenQuery, TError, TData>
) =>
  useQuery<GetEnrolCardDetailScreenQuery, TError, TData>(
    variables === undefined ? ['GetEnrolCardDetailScreen'] : ['GetEnrolCardDetailScreen', variables],
    useFetchNewData<GetEnrolCardDetailScreenQuery, GetEnrolCardDetailScreenQueryVariables>(
      GetEnrolCardDetailScreenDocument
    ).bind(null, variables),
    options
  );

useGetEnrolCardDetailScreenQuery.getKey = (variables?: GetEnrolCardDetailScreenQueryVariables) =>
  variables === undefined ? ['GetEnrolCardDetailScreen'] : ['GetEnrolCardDetailScreen', variables];
export const useInfiniteGetEnrolCardDetailScreenQuery = <TData = GetEnrolCardDetailScreenQuery, TError = unknown>(
  variables?: GetEnrolCardDetailScreenQueryVariables,
  options?: UseInfiniteQueryOptions<GetEnrolCardDetailScreenQuery, TError, TData>
) => {
  const query = useFetchNewData<GetEnrolCardDetailScreenQuery, GetEnrolCardDetailScreenQueryVariables>(
    GetEnrolCardDetailScreenDocument
  );
  return useInfiniteQuery<GetEnrolCardDetailScreenQuery, TError, TData>(
    variables === undefined ? ['GetEnrolCardDetailScreen.infinite'] : ['GetEnrolCardDetailScreen.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetEnrolCardDetailScreenQuery.getKey = (variables?: GetEnrolCardDetailScreenQueryVariables) =>
  variables === undefined ? ['GetEnrolCardDetailScreen.infinite'] : ['GetEnrolCardDetailScreen.infinite', variables];
export const GetEhProviderIdDocument = `
    query GetEhProviderId {
  me {
    cashback {
      ehProviderId {
        id
      }
    }
  }
}
    `;
export const useGetEhProviderIdQuery = <TData = GetEhProviderIdQuery, TError = unknown>(
  variables?: GetEhProviderIdQueryVariables,
  options?: UseQueryOptions<GetEhProviderIdQuery, TError, TData>
) =>
  useQuery<GetEhProviderIdQuery, TError, TData>(
    variables === undefined ? ['GetEhProviderId'] : ['GetEhProviderId', variables],
    useFetchNewData<GetEhProviderIdQuery, GetEhProviderIdQueryVariables>(GetEhProviderIdDocument).bind(null, variables),
    options
  );

useGetEhProviderIdQuery.getKey = (variables?: GetEhProviderIdQueryVariables) =>
  variables === undefined ? ['GetEhProviderId'] : ['GetEhProviderId', variables];
export const useInfiniteGetEhProviderIdQuery = <TData = GetEhProviderIdQuery, TError = unknown>(
  variables?: GetEhProviderIdQueryVariables,
  options?: UseInfiniteQueryOptions<GetEhProviderIdQuery, TError, TData>
) => {
  const query = useFetchNewData<GetEhProviderIdQuery, GetEhProviderIdQueryVariables>(GetEhProviderIdDocument);
  return useInfiniteQuery<GetEhProviderIdQuery, TError, TData>(
    variables === undefined ? ['GetEhProviderId.infinite'] : ['GetEhProviderId.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetEhProviderIdQuery.getKey = (variables?: GetEhProviderIdQueryVariables) =>
  variables === undefined ? ['GetEhProviderId.infinite'] : ['GetEhProviderId.infinite', variables];
export const CashbackDeleteCardDocument = `
    mutation CashbackDeleteCard($deleteCard: CashbackDeleteCardInput!) {
  cashback {
    deleteCard(deleteCard: $deleteCard) {
      success
    }
  }
}
    `;
export const useCashbackDeleteCardMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<CashbackDeleteCardMutation, TError, CashbackDeleteCardMutationVariables, TContext>
) =>
  useMutation<CashbackDeleteCardMutation, TError, CashbackDeleteCardMutationVariables, TContext>(
    ['CashbackDeleteCard'],
    useFetchNewData<CashbackDeleteCardMutation, CashbackDeleteCardMutationVariables>(CashbackDeleteCardDocument),
    options
  );
export const CashbackTransactionsV2Document = `
    query CashbackTransactionsV2($input: CashbackTransactionsV2Input) {
  me {
    cashback {
      transactionsV2(input: $input) {
        total
        pending
        confirmed
        edges {
          node {
            id
            transactionId
            offerId
            imageUrl
            amount
            created
            advertiserName
            state
            title
            description
            recordType
            purchaseAmount
            fee
          }
        }
        error {
          message
          __typename
        }
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
    useFetchNewData<CashbackTransactionsV2Query, CashbackTransactionsV2QueryVariables>(
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
  const query = useFetchNewData<CashbackTransactionsV2Query, CashbackTransactionsV2QueryVariables>(
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
export const CashbackOnboardUserDocument = `
    mutation CashbackOnboardUser {
  cashback {
    onboardUser {
      success
      error {
        message
      }
    }
  }
}
    `;
export const useCashbackOnboardUserMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<CashbackOnboardUserMutation, TError, CashbackOnboardUserMutationVariables, TContext>
) =>
  useMutation<CashbackOnboardUserMutation, TError, CashbackOnboardUserMutationVariables, TContext>(
    ['CashbackOnboardUser'],
    useFetchNewData<CashbackOnboardUserMutation, CashbackOnboardUserMutationVariables>(CashbackOnboardUserDocument),
    options
  );
export const CashbackOnboardStatusDocument = `
    query CashbackOnboardStatus {
  me {
    cashback {
      onboardStatus {
        hasCLOOnboarded
        error {
          message
        }
      }
    }
  }
}
    `;
export const useCashbackOnboardStatusQuery = <TData = CashbackOnboardStatusQuery, TError = unknown>(
  variables?: CashbackOnboardStatusQueryVariables,
  options?: UseQueryOptions<CashbackOnboardStatusQuery, TError, TData>
) =>
  useQuery<CashbackOnboardStatusQuery, TError, TData>(
    variables === undefined ? ['CashbackOnboardStatus'] : ['CashbackOnboardStatus', variables],
    useFetchNewData<CashbackOnboardStatusQuery, CashbackOnboardStatusQueryVariables>(
      CashbackOnboardStatusDocument
    ).bind(null, variables),
    options
  );

useCashbackOnboardStatusQuery.getKey = (variables?: CashbackOnboardStatusQueryVariables) =>
  variables === undefined ? ['CashbackOnboardStatus'] : ['CashbackOnboardStatus', variables];
export const useInfiniteCashbackOnboardStatusQuery = <TData = CashbackOnboardStatusQuery, TError = unknown>(
  variables?: CashbackOnboardStatusQueryVariables,
  options?: UseInfiniteQueryOptions<CashbackOnboardStatusQuery, TError, TData>
) => {
  const query = useFetchNewData<CashbackOnboardStatusQuery, CashbackOnboardStatusQueryVariables>(
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
export const CashbackUpdateBankDetailsDocument = `
    mutation CashbackUpdateBankDetails($updateBankDetails: UpdateBankDetailsInput!) {
  cashback {
    updateBankDetails(updateBankDetails: $updateBankDetails) {
      success
      error {
        message
      }
    }
  }
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
    useFetchNewData<CashbackUpdateBankDetailsMutation, CashbackUpdateBankDetailsMutationVariables>(
      CashbackUpdateBankDetailsDocument
    ),
    options
  );
export const CashbackLinkedCardsDocument = `
    query CashbackLinkedCards {
  me {
    cashback {
      linkedCards {
        cards {
          id
          description
          cardMasked
          issuer
          expiry
          provider
          isExpired
          lastFour
        }
        error {
          message
        }
      }
    }
  }
}
    `;
export const useCashbackLinkedCardsQuery = <TData = CashbackLinkedCardsQuery, TError = unknown>(
  variables?: CashbackLinkedCardsQueryVariables,
  options?: UseQueryOptions<CashbackLinkedCardsQuery, TError, TData>
) =>
  useQuery<CashbackLinkedCardsQuery, TError, TData>(
    variables === undefined ? ['CashbackLinkedCards'] : ['CashbackLinkedCards', variables],
    useFetchNewData<CashbackLinkedCardsQuery, CashbackLinkedCardsQueryVariables>(CashbackLinkedCardsDocument).bind(
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
  const query = useFetchNewData<CashbackLinkedCardsQuery, CashbackLinkedCardsQueryVariables>(
    CashbackLinkedCardsDocument
  );
  return useInfiniteQuery<CashbackLinkedCardsQuery, TError, TData>(
    variables === undefined ? ['CashbackLinkedCards.infinite'] : ['CashbackLinkedCards.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteCashbackLinkedCardsQuery.getKey = (variables?: CashbackLinkedCardsQueryVariables) =>
  variables === undefined ? ['CashbackLinkedCards.infinite'] : ['CashbackLinkedCards.infinite', variables];
export const CashbackUpdateBankLinkedStatusDocument = `
    mutation CashbackUpdateBankLinkedStatus($updateBankLinkedStatus: UpdateBankLinkedStatusInput!) {
  cashback {
    updateBankLinkedStatus(updateBankLinkedStatus: $updateBankLinkedStatus) {
      success
      error {
        message
      }
    }
  }
}
    `;
export const useCashbackUpdateBankLinkedStatusMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CashbackUpdateBankLinkedStatusMutation,
    TError,
    CashbackUpdateBankLinkedStatusMutationVariables,
    TContext
  >
) =>
  useMutation<
    CashbackUpdateBankLinkedStatusMutation,
    TError,
    CashbackUpdateBankLinkedStatusMutationVariables,
    TContext
  >(
    ['CashbackUpdateBankLinkedStatus'],
    useFetchNewData<CashbackUpdateBankLinkedStatusMutation, CashbackUpdateBankLinkedStatusMutationVariables>(
      CashbackUpdateBankLinkedStatusDocument
    ),
    options
  );
export const CashbackUpdateAutoEnrolDocument = `
    mutation CashbackUpdateAutoEnrol($updateAutoEnrolment: UpdateAutoEnrolmentInput!) {
  cashback {
    updateAutoEnrolment(updateAutoEnrolment: $updateAutoEnrolment) {
      success
      error {
        message
      }
    }
  }
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
    useFetchNewData<CashbackUpdateAutoEnrolMutation, CashbackUpdateAutoEnrolMutationVariables>(
      CashbackUpdateAutoEnrolDocument
    ),
    options
  );
export const CashbackUserBankDetailsDocument = `
    query CashbackUserBankDetails {
  me {
    cashback {
      userBankDetails {
        id
        bsb
        accountNumber
        error {
          message
        }
      }
    }
  }
}
    `;
export const useCashbackUserBankDetailsQuery = <TData = CashbackUserBankDetailsQuery, TError = unknown>(
  variables?: CashbackUserBankDetailsQueryVariables,
  options?: UseQueryOptions<CashbackUserBankDetailsQuery, TError, TData>
) =>
  useQuery<CashbackUserBankDetailsQuery, TError, TData>(
    variables === undefined ? ['CashbackUserBankDetails'] : ['CashbackUserBankDetails', variables],
    useFetchNewData<CashbackUserBankDetailsQuery, CashbackUserBankDetailsQueryVariables>(
      CashbackUserBankDetailsDocument
    ).bind(null, variables),
    options
  );

useCashbackUserBankDetailsQuery.getKey = (variables?: CashbackUserBankDetailsQueryVariables) =>
  variables === undefined ? ['CashbackUserBankDetails'] : ['CashbackUserBankDetails', variables];
export const useInfiniteCashbackUserBankDetailsQuery = <TData = CashbackUserBankDetailsQuery, TError = unknown>(
  variables?: CashbackUserBankDetailsQueryVariables,
  options?: UseInfiniteQueryOptions<CashbackUserBankDetailsQuery, TError, TData>
) => {
  const query = useFetchNewData<CashbackUserBankDetailsQuery, CashbackUserBankDetailsQueryVariables>(
    CashbackUserBankDetailsDocument
  );
  return useInfiniteQuery<CashbackUserBankDetailsQuery, TError, TData>(
    variables === undefined ? ['CashbackUserBankDetails.infinite'] : ['CashbackUserBankDetails.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteCashbackUserBankDetailsQuery.getKey = (variables?: CashbackUserBankDetailsQueryVariables) =>
  variables === undefined ? ['CashbackUserBankDetails.infinite'] : ['CashbackUserBankDetails.infinite', variables];
export const CashbackUserInfoDocument = `
    query CashbackUserInfo {
  me {
    cashback {
      cashbackUserInfo {
        error {
          message
        }
        autoEnrolMessage
        autoEnrolStatus
        bankLinkedMessage
        bankLinkedStatus
        createdAt
        updatedAt
      }
    }
  }
}
    `;
export const useCashbackUserInfoQuery = <TData = CashbackUserInfoQuery, TError = unknown>(
  variables?: CashbackUserInfoQueryVariables,
  options?: UseQueryOptions<CashbackUserInfoQuery, TError, TData>
) =>
  useQuery<CashbackUserInfoQuery, TError, TData>(
    variables === undefined ? ['CashbackUserInfo'] : ['CashbackUserInfo', variables],
    useFetchNewData<CashbackUserInfoQuery, CashbackUserInfoQueryVariables>(CashbackUserInfoDocument).bind(
      null,
      variables
    ),
    options
  );

useCashbackUserInfoQuery.getKey = (variables?: CashbackUserInfoQueryVariables) =>
  variables === undefined ? ['CashbackUserInfo'] : ['CashbackUserInfo', variables];
export const useInfiniteCashbackUserInfoQuery = <TData = CashbackUserInfoQuery, TError = unknown>(
  variables?: CashbackUserInfoQueryVariables,
  options?: UseInfiniteQueryOptions<CashbackUserInfoQuery, TError, TData>
) => {
  const query = useFetchNewData<CashbackUserInfoQuery, CashbackUserInfoQueryVariables>(CashbackUserInfoDocument);
  return useInfiniteQuery<CashbackUserInfoQuery, TError, TData>(
    variables === undefined ? ['CashbackUserInfo.infinite'] : ['CashbackUserInfo.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteCashbackUserInfoQuery.getKey = (variables?: CashbackUserInfoQueryVariables) =>
  variables === undefined ? ['CashbackUserInfo.infinite'] : ['CashbackUserInfo.infinite', variables];
export const CashbackUserTokenDocument = `
    query CashbackUserToken {
  me {
    cashback {
      cashbackUserToken {
        token
        key
      }
    }
  }
}
    `;
export const useCashbackUserTokenQuery = <TData = CashbackUserTokenQuery, TError = unknown>(
  variables?: CashbackUserTokenQueryVariables,
  options?: UseQueryOptions<CashbackUserTokenQuery, TError, TData>
) =>
  useQuery<CashbackUserTokenQuery, TError, TData>(
    variables === undefined ? ['CashbackUserToken'] : ['CashbackUserToken', variables],
    useFetchNewData<CashbackUserTokenQuery, CashbackUserTokenQueryVariables>(CashbackUserTokenDocument).bind(
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
  const query = useFetchNewData<CashbackUserTokenQuery, CashbackUserTokenQueryVariables>(CashbackUserTokenDocument);
  return useInfiniteQuery<CashbackUserTokenQuery, TError, TData>(
    variables === undefined ? ['CashbackUserToken.infinite'] : ['CashbackUserToken.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteCashbackUserTokenQuery.getKey = (variables?: CashbackUserTokenQueryVariables) =>
  variables === undefined ? ['CashbackUserToken.infinite'] : ['CashbackUserToken.infinite', variables];
export const ExperimentGetUserWaitListDocument = `
    query ExperimentGetUserWaitList($projectId: ID!) {
  me {
    experiment {
      waitList(projectID: $projectId) {
        projectID
        status
      }
    }
  }
}
    `;
export const useExperimentGetUserWaitListQuery = <TData = ExperimentGetUserWaitListQuery, TError = unknown>(
  variables: ExperimentGetUserWaitListQueryVariables,
  options?: UseQueryOptions<ExperimentGetUserWaitListQuery, TError, TData>
) =>
  useQuery<ExperimentGetUserWaitListQuery, TError, TData>(
    ['ExperimentGetUserWaitList', variables],
    useFetchNewData<ExperimentGetUserWaitListQuery, ExperimentGetUserWaitListQueryVariables>(
      ExperimentGetUserWaitListDocument
    ).bind(null, variables),
    options
  );

useExperimentGetUserWaitListQuery.getKey = (variables: ExperimentGetUserWaitListQueryVariables) => [
  'ExperimentGetUserWaitList',
  variables,
];
export const useInfiniteExperimentGetUserWaitListQuery = <TData = ExperimentGetUserWaitListQuery, TError = unknown>(
  variables: ExperimentGetUserWaitListQueryVariables,
  options?: UseInfiniteQueryOptions<ExperimentGetUserWaitListQuery, TError, TData>
) => {
  const query = useFetchNewData<ExperimentGetUserWaitListQuery, ExperimentGetUserWaitListQueryVariables>(
    ExperimentGetUserWaitListDocument
  );
  return useInfiniteQuery<ExperimentGetUserWaitListQuery, TError, TData>(
    ['ExperimentGetUserWaitList.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteExperimentGetUserWaitListQuery.getKey = (variables: ExperimentGetUserWaitListQueryVariables) => [
  'ExperimentGetUserWaitList.infinite',
  variables,
];
export const GetInstapayAdsDocument = `
    query GetInstapayAds {
  me {
    experiment {
      instapayAds {
        adDisplayInterval
      }
    }
  }
}
    `;
export const useGetInstapayAdsQuery = <TData = GetInstapayAdsQuery, TError = unknown>(
  variables?: GetInstapayAdsQueryVariables,
  options?: UseQueryOptions<GetInstapayAdsQuery, TError, TData>
) =>
  useQuery<GetInstapayAdsQuery, TError, TData>(
    variables === undefined ? ['GetInstapayAds'] : ['GetInstapayAds', variables],
    useFetchNewData<GetInstapayAdsQuery, GetInstapayAdsQueryVariables>(GetInstapayAdsDocument).bind(null, variables),
    options
  );

useGetInstapayAdsQuery.getKey = (variables?: GetInstapayAdsQueryVariables) =>
  variables === undefined ? ['GetInstapayAds'] : ['GetInstapayAds', variables];
export const useInfiniteGetInstapayAdsQuery = <TData = GetInstapayAdsQuery, TError = unknown>(
  variables?: GetInstapayAdsQueryVariables,
  options?: UseInfiniteQueryOptions<GetInstapayAdsQuery, TError, TData>
) => {
  const query = useFetchNewData<GetInstapayAdsQuery, GetInstapayAdsQueryVariables>(GetInstapayAdsDocument);
  return useInfiniteQuery<GetInstapayAdsQuery, TError, TData>(
    variables === undefined ? ['GetInstapayAds.infinite'] : ['GetInstapayAds.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetInstapayAdsQuery.getKey = (variables?: GetInstapayAdsQueryVariables) =>
  variables === undefined ? ['GetInstapayAds.infinite'] : ['GetInstapayAds.infinite', variables];
export const ExperimentAddEventDocument = `
    mutation ExperimentAddEvent($event: EventInput!) {
  experiment {
    addEvent(event: $event) {
      eventID
    }
  }
}
    `;
export const useExperimentAddEventMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<ExperimentAddEventMutation, TError, ExperimentAddEventMutationVariables, TContext>
) =>
  useMutation<ExperimentAddEventMutation, TError, ExperimentAddEventMutationVariables, TContext>(
    ['ExperimentAddEvent'],
    useFetchNewData<ExperimentAddEventMutation, ExperimentAddEventMutationVariables>(ExperimentAddEventDocument),
    options
  );
export const ExperimentSubscribeDocument = `
    mutation ExperimentSubscribe($projectID: ID!) {
  experiment {
    subscribe(projectID: $projectID) {
      subscribeID
    }
  }
}
    `;
export const useExperimentSubscribeMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<ExperimentSubscribeMutation, TError, ExperimentSubscribeMutationVariables, TContext>
) =>
  useMutation<ExperimentSubscribeMutation, TError, ExperimentSubscribeMutationVariables, TContext>(
    ['ExperimentSubscribe'],
    useFetchNewData<ExperimentSubscribeMutation, ExperimentSubscribeMutationVariables>(ExperimentSubscribeDocument),
    options
  );
export const AddBeneficiaryDocument = `
    mutation AddBeneficiary($input: NewBeneficiaryInput!) {
  floatAccount {
    addBeneficiary(beneficiary: $input) {
      beneficiaryId
    }
  }
}
    `;
export const useAddBeneficiaryMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<AddBeneficiaryMutation, TError, AddBeneficiaryMutationVariables, TContext>
) =>
  useMutation<AddBeneficiaryMutation, TError, AddBeneficiaryMutationVariables, TContext>(
    ['AddBeneficiary'],
    useFetchNewData<AddBeneficiaryMutation, AddBeneficiaryMutationVariables>(AddBeneficiaryDocument),
    options
  );
export const JoinWaitListWithCategoriesDocument = `
    mutation JoinWaitListWithCategories($categories: [UserCategoryInput], $categoryAction: CategoryAction!) {
  group {
    updateUserCategoriesPreference(input: {categories: $categories}) {
      userCategoriesPreferences {
        id
      }
    }
    joinWaitList(input: {categoryAction: $categoryAction}) {
      waitList {
        userId
      }
    }
  }
}
    `;
export const useJoinWaitListWithCategoriesMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    JoinWaitListWithCategoriesMutation,
    TError,
    JoinWaitListWithCategoriesMutationVariables,
    TContext
  >
) =>
  useMutation<JoinWaitListWithCategoriesMutation, TError, JoinWaitListWithCategoriesMutationVariables, TContext>(
    ['JoinWaitListWithCategories'],
    useFetchNewData<JoinWaitListWithCategoriesMutation, JoinWaitListWithCategoriesMutationVariables>(
      JoinWaitListWithCategoriesDocument
    ),
    options
  );
export const GetUserWaitListDocument = `
    query GetUserWaitList {
  me {
    group {
      waitList {
        userId
        createdAt
      }
    }
  }
}
    `;
export const useGetUserWaitListQuery = <TData = GetUserWaitListQuery, TError = unknown>(
  variables?: GetUserWaitListQueryVariables,
  options?: UseQueryOptions<GetUserWaitListQuery, TError, TData>
) =>
  useQuery<GetUserWaitListQuery, TError, TData>(
    variables === undefined ? ['GetUserWaitList'] : ['GetUserWaitList', variables],
    useFetchNewData<GetUserWaitListQuery, GetUserWaitListQueryVariables>(GetUserWaitListDocument).bind(null, variables),
    options
  );

useGetUserWaitListQuery.getKey = (variables?: GetUserWaitListQueryVariables) =>
  variables === undefined ? ['GetUserWaitList'] : ['GetUserWaitList', variables];
export const useInfiniteGetUserWaitListQuery = <TData = GetUserWaitListQuery, TError = unknown>(
  variables?: GetUserWaitListQueryVariables,
  options?: UseInfiniteQueryOptions<GetUserWaitListQuery, TError, TData>
) => {
  const query = useFetchNewData<GetUserWaitListQuery, GetUserWaitListQueryVariables>(GetUserWaitListDocument);
  return useInfiniteQuery<GetUserWaitListQuery, TError, TData>(
    variables === undefined ? ['GetUserWaitList.infinite'] : ['GetUserWaitList.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetUserWaitListQuery.getKey = (variables?: GetUserWaitListQueryVariables) =>
  variables === undefined ? ['GetUserWaitList.infinite'] : ['GetUserWaitList.infinite', variables];
export const GetGroupDetailDocument = `
    query GetGroupDetail($groupId: String!) {
  group {
    groupDetail(groupId: $groupId) {
      id
      imageSrc
      title
      promoTitle
      subtitle
      memberCount
      savingRange
      savingPeriod
      description
      howItWorks
      shareContent
      countries
      categories {
        id
        name
      }
    }
  }
}
    `;
export const useGetGroupDetailQuery = <TData = GetGroupDetailQuery, TError = unknown>(
  variables: GetGroupDetailQueryVariables,
  options?: UseQueryOptions<GetGroupDetailQuery, TError, TData>
) =>
  useQuery<GetGroupDetailQuery, TError, TData>(
    ['GetGroupDetail', variables],
    useFetchNewData<GetGroupDetailQuery, GetGroupDetailQueryVariables>(GetGroupDetailDocument).bind(null, variables),
    options
  );

useGetGroupDetailQuery.getKey = (variables: GetGroupDetailQueryVariables) => ['GetGroupDetail', variables];
export const useInfiniteGetGroupDetailQuery = <TData = GetGroupDetailQuery, TError = unknown>(
  variables: GetGroupDetailQueryVariables,
  options?: UseInfiniteQueryOptions<GetGroupDetailQuery, TError, TData>
) => {
  const query = useFetchNewData<GetGroupDetailQuery, GetGroupDetailQueryVariables>(GetGroupDetailDocument);
  return useInfiniteQuery<GetGroupDetailQuery, TError, TData>(
    ['GetGroupDetail.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetGroupDetailQuery.getKey = (variables: GetGroupDetailQueryVariables) => [
  'GetGroupDetail.infinite',
  variables,
];
export const GetGroupsDocument = `
    query GetGroups($country: String) {
  group {
    groups(country: $country) {
      id
      imageSrc
      title
      promoTitle
      subtitle
      memberCount
      savingRange
      savingPeriod
      description
      howItWorks
      shareContent
      countries
      categories {
        id
        name
      }
    }
  }
}
    `;
export const useGetGroupsQuery = <TData = GetGroupsQuery, TError = unknown>(
  variables?: GetGroupsQueryVariables,
  options?: UseQueryOptions<GetGroupsQuery, TError, TData>
) =>
  useQuery<GetGroupsQuery, TError, TData>(
    variables === undefined ? ['GetGroups'] : ['GetGroups', variables],
    useFetchNewData<GetGroupsQuery, GetGroupsQueryVariables>(GetGroupsDocument).bind(null, variables),
    options
  );

useGetGroupsQuery.getKey = (variables?: GetGroupsQueryVariables) =>
  variables === undefined ? ['GetGroups'] : ['GetGroups', variables];
export const useInfiniteGetGroupsQuery = <TData = GetGroupsQuery, TError = unknown>(
  variables?: GetGroupsQueryVariables,
  options?: UseInfiniteQueryOptions<GetGroupsQuery, TError, TData>
) => {
  const query = useFetchNewData<GetGroupsQuery, GetGroupsQueryVariables>(GetGroupsDocument);
  return useInfiniteQuery<GetGroupsQuery, TError, TData>(
    variables === undefined ? ['GetGroups.infinite'] : ['GetGroups.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetGroupsQuery.getKey = (variables?: GetGroupsQueryVariables) =>
  variables === undefined ? ['GetGroups.infinite'] : ['GetGroups.infinite', variables];
export const GetGroupCategoriesDocument = `
    query GetGroupCategories {
  group {
    categories {
      id
      name
    }
  }
}
    `;
export const useGetGroupCategoriesQuery = <TData = GetGroupCategoriesQuery, TError = unknown>(
  variables?: GetGroupCategoriesQueryVariables,
  options?: UseQueryOptions<GetGroupCategoriesQuery, TError, TData>
) =>
  useQuery<GetGroupCategoriesQuery, TError, TData>(
    variables === undefined ? ['GetGroupCategories'] : ['GetGroupCategories', variables],
    useFetchNewData<GetGroupCategoriesQuery, GetGroupCategoriesQueryVariables>(GetGroupCategoriesDocument).bind(
      null,
      variables
    ),
    options
  );

useGetGroupCategoriesQuery.getKey = (variables?: GetGroupCategoriesQueryVariables) =>
  variables === undefined ? ['GetGroupCategories'] : ['GetGroupCategories', variables];
export const useInfiniteGetGroupCategoriesQuery = <TData = GetGroupCategoriesQuery, TError = unknown>(
  variables?: GetGroupCategoriesQueryVariables,
  options?: UseInfiniteQueryOptions<GetGroupCategoriesQuery, TError, TData>
) => {
  const query = useFetchNewData<GetGroupCategoriesQuery, GetGroupCategoriesQueryVariables>(GetGroupCategoriesDocument);
  return useInfiniteQuery<GetGroupCategoriesQuery, TError, TData>(
    variables === undefined ? ['GetGroupCategories.infinite'] : ['GetGroupCategories.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetGroupCategoriesQuery.getKey = (variables?: GetGroupCategoriesQueryVariables) =>
  variables === undefined ? ['GetGroupCategories.infinite'] : ['GetGroupCategories.infinite', variables];
export const GetUserGroupMembershipAndConsentDocument = `
    query GetUserGroupMembershipAndConsent($groupId: String!) {
  me {
    group {
      groupMembership(groupId: $groupId) {
        position
      }
    }
    userGroupConsent {
      consented
    }
  }
}
    `;
export const useGetUserGroupMembershipAndConsentQuery = <
  TData = GetUserGroupMembershipAndConsentQuery,
  TError = unknown
>(
  variables: GetUserGroupMembershipAndConsentQueryVariables,
  options?: UseQueryOptions<GetUserGroupMembershipAndConsentQuery, TError, TData>
) =>
  useQuery<GetUserGroupMembershipAndConsentQuery, TError, TData>(
    ['GetUserGroupMembershipAndConsent', variables],
    useFetchNewData<GetUserGroupMembershipAndConsentQuery, GetUserGroupMembershipAndConsentQueryVariables>(
      GetUserGroupMembershipAndConsentDocument
    ).bind(null, variables),
    options
  );

useGetUserGroupMembershipAndConsentQuery.getKey = (variables: GetUserGroupMembershipAndConsentQueryVariables) => [
  'GetUserGroupMembershipAndConsent',
  variables,
];
export const useInfiniteGetUserGroupMembershipAndConsentQuery = <
  TData = GetUserGroupMembershipAndConsentQuery,
  TError = unknown
>(
  variables: GetUserGroupMembershipAndConsentQueryVariables,
  options?: UseInfiniteQueryOptions<GetUserGroupMembershipAndConsentQuery, TError, TData>
) => {
  const query = useFetchNewData<GetUserGroupMembershipAndConsentQuery, GetUserGroupMembershipAndConsentQueryVariables>(
    GetUserGroupMembershipAndConsentDocument
  );
  return useInfiniteQuery<GetUserGroupMembershipAndConsentQuery, TError, TData>(
    ['GetUserGroupMembershipAndConsent.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetUserGroupMembershipAndConsentQuery.getKey = (
  variables: GetUserGroupMembershipAndConsentQueryVariables
) => ['GetUserGroupMembershipAndConsent.infinite', variables];
export const JoinGroupWithConsentAgreementDocument = `
    mutation JoinGroupWithConsentAgreement($input: JoinGroupInput, $consented: Boolean!) {
  group {
    joinGroup(input: $input) {
      groupMembership {
        id
        position
      }
    }
    createConsentGroupAgreement(input: {consented: $consented}) {
      consented
    }
  }
}
    `;
export const useJoinGroupWithConsentAgreementMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    JoinGroupWithConsentAgreementMutation,
    TError,
    JoinGroupWithConsentAgreementMutationVariables,
    TContext
  >
) =>
  useMutation<JoinGroupWithConsentAgreementMutation, TError, JoinGroupWithConsentAgreementMutationVariables, TContext>(
    ['JoinGroupWithConsentAgreement'],
    useFetchNewData<JoinGroupWithConsentAgreementMutation, JoinGroupWithConsentAgreementMutationVariables>(
      JoinGroupWithConsentAgreementDocument
    ),
    options
  );
export const GetHeroPointsBalanceDocument = `
    query GetHeroPointsBalance($orgId: String) {
  me {
    heroPoints {
      balance(orgId: $orgId)
    }
  }
}
    `;
export const useGetHeroPointsBalanceQuery = <TData = GetHeroPointsBalanceQuery, TError = unknown>(
  variables?: GetHeroPointsBalanceQueryVariables,
  options?: UseQueryOptions<GetHeroPointsBalanceQuery, TError, TData>
) =>
  useQuery<GetHeroPointsBalanceQuery, TError, TData>(
    variables === undefined ? ['GetHeroPointsBalance'] : ['GetHeroPointsBalance', variables],
    useFetchNewData<GetHeroPointsBalanceQuery, GetHeroPointsBalanceQueryVariables>(GetHeroPointsBalanceDocument).bind(
      null,
      variables
    ),
    options
  );

useGetHeroPointsBalanceQuery.getKey = (variables?: GetHeroPointsBalanceQueryVariables) =>
  variables === undefined ? ['GetHeroPointsBalance'] : ['GetHeroPointsBalance', variables];
export const useInfiniteGetHeroPointsBalanceQuery = <TData = GetHeroPointsBalanceQuery, TError = unknown>(
  variables?: GetHeroPointsBalanceQueryVariables,
  options?: UseInfiniteQueryOptions<GetHeroPointsBalanceQuery, TError, TData>
) => {
  const query = useFetchNewData<GetHeroPointsBalanceQuery, GetHeroPointsBalanceQueryVariables>(
    GetHeroPointsBalanceDocument
  );
  return useInfiniteQuery<GetHeroPointsBalanceQuery, TError, TData>(
    variables === undefined ? ['GetHeroPointsBalance.infinite'] : ['GetHeroPointsBalance.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetHeroPointsBalanceQuery.getKey = (variables?: GetHeroPointsBalanceQueryVariables) =>
  variables === undefined ? ['GetHeroPointsBalance.infinite'] : ['GetHeroPointsBalance.infinite', variables];
export const GetHeroPointsTransactionDetailDocument = `
    query GetHeroPointsTransactionDetail($orgId: String!, $id: String!) {
  me {
    heroPoints {
      transactionDetails(orgId: $orgId, id: $id) {
        id
        refId
        points
        transactionTimeUtc
        transactionType
        clientType
        reason
        reasonType
        recognisedBy
        organisationName
        merchantName
      }
    }
  }
}
    `;
export const useGetHeroPointsTransactionDetailQuery = <TData = GetHeroPointsTransactionDetailQuery, TError = unknown>(
  variables: GetHeroPointsTransactionDetailQueryVariables,
  options?: UseQueryOptions<GetHeroPointsTransactionDetailQuery, TError, TData>
) =>
  useQuery<GetHeroPointsTransactionDetailQuery, TError, TData>(
    ['GetHeroPointsTransactionDetail', variables],
    useFetchNewData<GetHeroPointsTransactionDetailQuery, GetHeroPointsTransactionDetailQueryVariables>(
      GetHeroPointsTransactionDetailDocument
    ).bind(null, variables),
    options
  );

useGetHeroPointsTransactionDetailQuery.getKey = (variables: GetHeroPointsTransactionDetailQueryVariables) => [
  'GetHeroPointsTransactionDetail',
  variables,
];
export const useInfiniteGetHeroPointsTransactionDetailQuery = <
  TData = GetHeroPointsTransactionDetailQuery,
  TError = unknown
>(
  variables: GetHeroPointsTransactionDetailQueryVariables,
  options?: UseInfiniteQueryOptions<GetHeroPointsTransactionDetailQuery, TError, TData>
) => {
  const query = useFetchNewData<GetHeroPointsTransactionDetailQuery, GetHeroPointsTransactionDetailQueryVariables>(
    GetHeroPointsTransactionDetailDocument
  );
  return useInfiniteQuery<GetHeroPointsTransactionDetailQuery, TError, TData>(
    ['GetHeroPointsTransactionDetail.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetHeroPointsTransactionDetailQuery.getKey = (variables: GetHeroPointsTransactionDetailQueryVariables) => [
  'GetHeroPointsTransactionDetail.infinite',
  variables,
];
export const GetHeroPointsTransactionHistoriesDocument = `
    query GetHeroPointsTransactionHistories($orgId: String!, $pageIndex: Int, $itemPerPage: Int) {
  me {
    heroPoints {
      transactionHistories(
        orgId: $orgId
        pageIndex: $pageIndex
        itemPerPage: $itemPerPage
      ) {
        pageIndex
        totalPages
        items {
          id
          refId
          points
          transactionTimeUtc
          transactionType
          clientType
          reason
          reasonType
        }
      }
    }
  }
}
    `;
export const useGetHeroPointsTransactionHistoriesQuery = <
  TData = GetHeroPointsTransactionHistoriesQuery,
  TError = unknown
>(
  variables: GetHeroPointsTransactionHistoriesQueryVariables,
  options?: UseQueryOptions<GetHeroPointsTransactionHistoriesQuery, TError, TData>
) =>
  useQuery<GetHeroPointsTransactionHistoriesQuery, TError, TData>(
    ['GetHeroPointsTransactionHistories', variables],
    useFetchNewData<GetHeroPointsTransactionHistoriesQuery, GetHeroPointsTransactionHistoriesQueryVariables>(
      GetHeroPointsTransactionHistoriesDocument
    ).bind(null, variables),
    options
  );

useGetHeroPointsTransactionHistoriesQuery.getKey = (variables: GetHeroPointsTransactionHistoriesQueryVariables) => [
  'GetHeroPointsTransactionHistories',
  variables,
];
export const useInfiniteGetHeroPointsTransactionHistoriesQuery = <
  TData = GetHeroPointsTransactionHistoriesQuery,
  TError = unknown
>(
  variables: GetHeroPointsTransactionHistoriesQueryVariables,
  options?: UseInfiniteQueryOptions<GetHeroPointsTransactionHistoriesQuery, TError, TData>
) => {
  const query = useFetchNewData<
    GetHeroPointsTransactionHistoriesQuery,
    GetHeroPointsTransactionHistoriesQueryVariables
  >(GetHeroPointsTransactionHistoriesDocument);
  return useInfiniteQuery<GetHeroPointsTransactionHistoriesQuery, TError, TData>(
    ['GetHeroPointsTransactionHistories.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetHeroPointsTransactionHistoriesQuery.getKey = (
  variables: GetHeroPointsTransactionHistoriesQueryVariables
) => ['GetHeroPointsTransactionHistories.infinite', variables];
export const GetHeroPointsPaymentPreferencesDocument = `
    query GetHeroPointsPaymentPreferences {
  me {
    heroPoints {
      paymentPreferences {
        payWithHPOnSwagCard
      }
    }
  }
}
    `;
export const useGetHeroPointsPaymentPreferencesQuery = <TData = GetHeroPointsPaymentPreferencesQuery, TError = unknown>(
  variables?: GetHeroPointsPaymentPreferencesQueryVariables,
  options?: UseQueryOptions<GetHeroPointsPaymentPreferencesQuery, TError, TData>
) =>
  useQuery<GetHeroPointsPaymentPreferencesQuery, TError, TData>(
    variables === undefined ? ['GetHeroPointsPaymentPreferences'] : ['GetHeroPointsPaymentPreferences', variables],
    useFetchNewData<GetHeroPointsPaymentPreferencesQuery, GetHeroPointsPaymentPreferencesQueryVariables>(
      GetHeroPointsPaymentPreferencesDocument
    ).bind(null, variables),
    options
  );

useGetHeroPointsPaymentPreferencesQuery.getKey = (variables?: GetHeroPointsPaymentPreferencesQueryVariables) =>
  variables === undefined ? ['GetHeroPointsPaymentPreferences'] : ['GetHeroPointsPaymentPreferences', variables];
export const useInfiniteGetHeroPointsPaymentPreferencesQuery = <
  TData = GetHeroPointsPaymentPreferencesQuery,
  TError = unknown
>(
  variables?: GetHeroPointsPaymentPreferencesQueryVariables,
  options?: UseInfiniteQueryOptions<GetHeroPointsPaymentPreferencesQuery, TError, TData>
) => {
  const query = useFetchNewData<GetHeroPointsPaymentPreferencesQuery, GetHeroPointsPaymentPreferencesQueryVariables>(
    GetHeroPointsPaymentPreferencesDocument
  );
  return useInfiniteQuery<GetHeroPointsPaymentPreferencesQuery, TError, TData>(
    variables === undefined
      ? ['GetHeroPointsPaymentPreferences.infinite']
      : ['GetHeroPointsPaymentPreferences.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetHeroPointsPaymentPreferencesQuery.getKey = (variables?: GetHeroPointsPaymentPreferencesQueryVariables) =>
  variables === undefined
    ? ['GetHeroPointsPaymentPreferences.infinite']
    : ['GetHeroPointsPaymentPreferences.infinite', variables];
export const GetPayWithHpCarouselSeenDocument = `
    query GetPayWithHpCarouselSeen {
  me {
    heroPoints {
      payWithHPCarouselSeen
    }
  }
}
    `;
export const useGetPayWithHpCarouselSeenQuery = <TData = GetPayWithHpCarouselSeenQuery, TError = unknown>(
  variables?: GetPayWithHpCarouselSeenQueryVariables,
  options?: UseQueryOptions<GetPayWithHpCarouselSeenQuery, TError, TData>
) =>
  useQuery<GetPayWithHpCarouselSeenQuery, TError, TData>(
    variables === undefined ? ['GetPayWithHpCarouselSeen'] : ['GetPayWithHpCarouselSeen', variables],
    useFetchNewData<GetPayWithHpCarouselSeenQuery, GetPayWithHpCarouselSeenQueryVariables>(
      GetPayWithHpCarouselSeenDocument
    ).bind(null, variables),
    options
  );

useGetPayWithHpCarouselSeenQuery.getKey = (variables?: GetPayWithHpCarouselSeenQueryVariables) =>
  variables === undefined ? ['GetPayWithHpCarouselSeen'] : ['GetPayWithHpCarouselSeen', variables];
export const useInfiniteGetPayWithHpCarouselSeenQuery = <TData = GetPayWithHpCarouselSeenQuery, TError = unknown>(
  variables?: GetPayWithHpCarouselSeenQueryVariables,
  options?: UseInfiniteQueryOptions<GetPayWithHpCarouselSeenQuery, TError, TData>
) => {
  const query = useFetchNewData<GetPayWithHpCarouselSeenQuery, GetPayWithHpCarouselSeenQueryVariables>(
    GetPayWithHpCarouselSeenDocument
  );
  return useInfiniteQuery<GetPayWithHpCarouselSeenQuery, TError, TData>(
    variables === undefined ? ['GetPayWithHpCarouselSeen.infinite'] : ['GetPayWithHpCarouselSeen.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetPayWithHpCarouselSeenQuery.getKey = (variables?: GetPayWithHpCarouselSeenQueryVariables) =>
  variables === undefined ? ['GetPayWithHpCarouselSeen.infinite'] : ['GetPayWithHpCarouselSeen.infinite', variables];
export const UpdateHeroPointsPaymentPreferencesDocument = `
    mutation UpdateHeroPointsPaymentPreferences($payWithHPOnSwagCard: Boolean) {
  heroPoints {
    paymentPreferences(payWithHPOnSwagCard: $payWithHPOnSwagCard) {
      payWithHPOnSwagCard
    }
  }
}
    `;
export const useUpdateHeroPointsPaymentPreferencesMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    UpdateHeroPointsPaymentPreferencesMutation,
    TError,
    UpdateHeroPointsPaymentPreferencesMutationVariables,
    TContext
  >
) =>
  useMutation<
    UpdateHeroPointsPaymentPreferencesMutation,
    TError,
    UpdateHeroPointsPaymentPreferencesMutationVariables,
    TContext
  >(
    ['UpdateHeroPointsPaymentPreferences'],
    useFetchNewData<UpdateHeroPointsPaymentPreferencesMutation, UpdateHeroPointsPaymentPreferencesMutationVariables>(
      UpdateHeroPointsPaymentPreferencesDocument
    ),
    options
  );
export const UpdatePayWithHpCarouselSeenDocument = `
    mutation UpdatePayWithHpCarouselSeen {
  heroPoints {
    payWithHPCarouselSeen
  }
}
    `;
export const useUpdatePayWithHpCarouselSeenMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    UpdatePayWithHpCarouselSeenMutation,
    TError,
    UpdatePayWithHpCarouselSeenMutationVariables,
    TContext
  >
) =>
  useMutation<UpdatePayWithHpCarouselSeenMutation, TError, UpdatePayWithHpCarouselSeenMutationVariables, TContext>(
    ['UpdatePayWithHpCarouselSeen'],
    useFetchNewData<UpdatePayWithHpCarouselSeenMutation, UpdatePayWithHpCarouselSeenMutationVariables>(
      UpdatePayWithHpCarouselSeenDocument
    ),
    options
  );
export const GetEhProfileDocument = `
    query getEHProfile {
  me {
    hrDetails {
      countryCode
    }
  }
}
    `;
export const useGetEhProfileQuery = <TData = GetEhProfileQuery, TError = unknown>(
  variables?: GetEhProfileQueryVariables,
  options?: UseQueryOptions<GetEhProfileQuery, TError, TData>
) =>
  useQuery<GetEhProfileQuery, TError, TData>(
    variables === undefined ? ['getEHProfile'] : ['getEHProfile', variables],
    useFetchNewData<GetEhProfileQuery, GetEhProfileQueryVariables>(GetEhProfileDocument).bind(null, variables),
    options
  );

useGetEhProfileQuery.getKey = (variables?: GetEhProfileQueryVariables) =>
  variables === undefined ? ['getEHProfile'] : ['getEHProfile', variables];
export const useInfiniteGetEhProfileQuery = <TData = GetEhProfileQuery, TError = unknown>(
  variables?: GetEhProfileQueryVariables,
  options?: UseInfiniteQueryOptions<GetEhProfileQuery, TError, TData>
) => {
  const query = useFetchNewData<GetEhProfileQuery, GetEhProfileQueryVariables>(GetEhProfileDocument);
  return useInfiniteQuery<GetEhProfileQuery, TError, TData>(
    variables === undefined ? ['getEHProfile.infinite'] : ['getEHProfile.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetEhProfileQuery.getKey = (variables?: GetEhProfileQueryVariables) =>
  variables === undefined ? ['getEHProfile.infinite'] : ['getEHProfile.infinite', variables];
export const InstapayUsageVerificationDocument = `
    query InstapayUsageVerification {
  me {
    orgs {
      instapay {
        isFirstTime
      }
    }
  }
}
    `;
export const useInstapayUsageVerificationQuery = <TData = InstapayUsageVerificationQuery, TError = unknown>(
  variables?: InstapayUsageVerificationQueryVariables,
  options?: UseQueryOptions<InstapayUsageVerificationQuery, TError, TData>
) =>
  useQuery<InstapayUsageVerificationQuery, TError, TData>(
    variables === undefined ? ['InstapayUsageVerification'] : ['InstapayUsageVerification', variables],
    useFetchNewData<InstapayUsageVerificationQuery, InstapayUsageVerificationQueryVariables>(
      InstapayUsageVerificationDocument
    ).bind(null, variables),
    options
  );

useInstapayUsageVerificationQuery.getKey = (variables?: InstapayUsageVerificationQueryVariables) =>
  variables === undefined ? ['InstapayUsageVerification'] : ['InstapayUsageVerification', variables];
export const useInfiniteInstapayUsageVerificationQuery = <TData = InstapayUsageVerificationQuery, TError = unknown>(
  variables?: InstapayUsageVerificationQueryVariables,
  options?: UseInfiniteQueryOptions<InstapayUsageVerificationQuery, TError, TData>
) => {
  const query = useFetchNewData<InstapayUsageVerificationQuery, InstapayUsageVerificationQueryVariables>(
    InstapayUsageVerificationDocument
  );
  return useInfiniteQuery<InstapayUsageVerificationQuery, TError, TData>(
    variables === undefined
      ? ['InstapayUsageVerification.infinite']
      : ['InstapayUsageVerification.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteInstapayUsageVerificationQuery.getKey = (variables?: InstapayUsageVerificationQueryVariables) =>
  variables === undefined ? ['InstapayUsageVerification.infinite'] : ['InstapayUsageVerification.infinite', variables];
export const GetAllInstapayAvailableBalancesDocument = `
    query GetAllInstapayAvailableBalances {
  me {
    orgs {
      id
      uuid
      kpBusinessId
      name
      member {
        ehMemberUuid
        kpEmployeeId
        work_country
      }
      instapay {
        balance {
          ... on InstapayBalance {
            __typename
            balance
            id
          }
          ... on InstapayError {
            __typename
            code
            context {
              ... on InstapayBalanceErrorContext {
                payCycle
              }
            }
          }
        }
        withdrawalLimit {
          ... on InstapayWithdrawalLimit {
            __typename
            withdrawalMinLimit
            withdrawalMaxLimit
            schedulingWithdrawalMinLimit
          }
          ... on InstapayError {
            __typename
            code
          }
        }
      }
    }
  }
}
    `;
export const useGetAllInstapayAvailableBalancesQuery = <TData = GetAllInstapayAvailableBalancesQuery, TError = unknown>(
  variables?: GetAllInstapayAvailableBalancesQueryVariables,
  options?: UseQueryOptions<GetAllInstapayAvailableBalancesQuery, TError, TData>
) =>
  useQuery<GetAllInstapayAvailableBalancesQuery, TError, TData>(
    variables === undefined ? ['GetAllInstapayAvailableBalances'] : ['GetAllInstapayAvailableBalances', variables],
    useFetchNewData<GetAllInstapayAvailableBalancesQuery, GetAllInstapayAvailableBalancesQueryVariables>(
      GetAllInstapayAvailableBalancesDocument
    ).bind(null, variables),
    options
  );

useGetAllInstapayAvailableBalancesQuery.getKey = (variables?: GetAllInstapayAvailableBalancesQueryVariables) =>
  variables === undefined ? ['GetAllInstapayAvailableBalances'] : ['GetAllInstapayAvailableBalances', variables];
export const useInfiniteGetAllInstapayAvailableBalancesQuery = <
  TData = GetAllInstapayAvailableBalancesQuery,
  TError = unknown
>(
  variables?: GetAllInstapayAvailableBalancesQueryVariables,
  options?: UseInfiniteQueryOptions<GetAllInstapayAvailableBalancesQuery, TError, TData>
) => {
  const query = useFetchNewData<GetAllInstapayAvailableBalancesQuery, GetAllInstapayAvailableBalancesQueryVariables>(
    GetAllInstapayAvailableBalancesDocument
  );
  return useInfiniteQuery<GetAllInstapayAvailableBalancesQuery, TError, TData>(
    variables === undefined
      ? ['GetAllInstapayAvailableBalances.infinite']
      : ['GetAllInstapayAvailableBalances.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetAllInstapayAvailableBalancesQuery.getKey = (variables?: GetAllInstapayAvailableBalancesQueryVariables) =>
  variables === undefined
    ? ['GetAllInstapayAvailableBalances.infinite']
    : ['GetAllInstapayAvailableBalances.infinite', variables];
export const GetBankAccountsForOrgDocument = `
    query GetBankAccountsForOrg($id: ID!) {
  me {
    org(id: $id) {
      instapay {
        bankAccounts {
          accountName
          accountNumber
          bankAccountSource
          bsb
          sortCode
          beneficiaryId
          externalId
          feeV2 {
            type
            percentage
          }
          isSSA
        }
      }
    }
  }
}
    `;
export const useGetBankAccountsForOrgQuery = <TData = GetBankAccountsForOrgQuery, TError = unknown>(
  variables: GetBankAccountsForOrgQueryVariables,
  options?: UseQueryOptions<GetBankAccountsForOrgQuery, TError, TData>
) =>
  useQuery<GetBankAccountsForOrgQuery, TError, TData>(
    ['GetBankAccountsForOrg', variables],
    useFetchNewData<GetBankAccountsForOrgQuery, GetBankAccountsForOrgQueryVariables>(
      GetBankAccountsForOrgDocument
    ).bind(null, variables),
    options
  );

useGetBankAccountsForOrgQuery.getKey = (variables: GetBankAccountsForOrgQueryVariables) => [
  'GetBankAccountsForOrg',
  variables,
];
export const useInfiniteGetBankAccountsForOrgQuery = <TData = GetBankAccountsForOrgQuery, TError = unknown>(
  variables: GetBankAccountsForOrgQueryVariables,
  options?: UseInfiniteQueryOptions<GetBankAccountsForOrgQuery, TError, TData>
) => {
  const query = useFetchNewData<GetBankAccountsForOrgQuery, GetBankAccountsForOrgQueryVariables>(
    GetBankAccountsForOrgDocument
  );
  return useInfiniteQuery<GetBankAccountsForOrgQuery, TError, TData>(
    ['GetBankAccountsForOrg.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetBankAccountsForOrgQuery.getKey = (variables: GetBankAccountsForOrgQueryVariables) => [
  'GetBankAccountsForOrg.infinite',
  variables,
];
export const GetInstapayTransactionsDocument = `
    query GetInstapayTransactions($filters: InstapayTransactionsFilterInput!) {
  me {
    orgs {
      instapay {
        transactions(filters: $filters) {
          ... on InstapayTransactions {
            transactions {
              id
              amount {
                units
                subUnits
                type
              }
              bankAccount {
                accountName
              }
              createdAt
            }
            pageInfo {
              endCursor
              hasNextPage
            }
          }
          ... on InstapayError {
            code
          }
        }
      }
    }
  }
}
    `;
export const useGetInstapayTransactionsQuery = <TData = GetInstapayTransactionsQuery, TError = unknown>(
  variables: GetInstapayTransactionsQueryVariables,
  options?: UseQueryOptions<GetInstapayTransactionsQuery, TError, TData>
) =>
  useQuery<GetInstapayTransactionsQuery, TError, TData>(
    ['GetInstapayTransactions', variables],
    useFetchNewData<GetInstapayTransactionsQuery, GetInstapayTransactionsQueryVariables>(
      GetInstapayTransactionsDocument
    ).bind(null, variables),
    options
  );

useGetInstapayTransactionsQuery.getKey = (variables: GetInstapayTransactionsQueryVariables) => [
  'GetInstapayTransactions',
  variables,
];
export const useInfiniteGetInstapayTransactionsQuery = <TData = GetInstapayTransactionsQuery, TError = unknown>(
  variables: GetInstapayTransactionsQueryVariables,
  options?: UseInfiniteQueryOptions<GetInstapayTransactionsQuery, TError, TData>
) => {
  const query = useFetchNewData<GetInstapayTransactionsQuery, GetInstapayTransactionsQueryVariables>(
    GetInstapayTransactionsDocument
  );
  return useInfiniteQuery<GetInstapayTransactionsQuery, TError, TData>(
    ['GetInstapayTransactions.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetInstapayTransactionsQuery.getKey = (variables: GetInstapayTransactionsQueryVariables) => [
  'GetInstapayTransactions.infinite',
  variables,
];
export const GetInstapayUserTransactionsDocument = `
    query GetInstapayUserTransactions($filters: InstapayTransactionsFilterInput!, $first: Int!, $after: String) {
  me {
    orgs {
      ehMemberUuid
      kpEmployeeId
      name
    }
    instapay {
      transactions(first: $first, filters: $filters, after: $after) {
        ... on InstapayTransactions {
          transactions {
            id
            memberId
            amount {
              units
              subUnits
              type
            }
            adminFee {
              units
              subUnits
              type
              sign
            }
            abaLodgementReference
            createdAt
            memberId
            bankAccount {
              accountName
              bsb
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
        ... on InstapayError {
          __typename
          code
        }
      }
    }
  }
}
    `;
export const useGetInstapayUserTransactionsQuery = <TData = GetInstapayUserTransactionsQuery, TError = unknown>(
  variables: GetInstapayUserTransactionsQueryVariables,
  options?: UseQueryOptions<GetInstapayUserTransactionsQuery, TError, TData>
) =>
  useQuery<GetInstapayUserTransactionsQuery, TError, TData>(
    ['GetInstapayUserTransactions', variables],
    useFetchNewData<GetInstapayUserTransactionsQuery, GetInstapayUserTransactionsQueryVariables>(
      GetInstapayUserTransactionsDocument
    ).bind(null, variables),
    options
  );

useGetInstapayUserTransactionsQuery.getKey = (variables: GetInstapayUserTransactionsQueryVariables) => [
  'GetInstapayUserTransactions',
  variables,
];
export const useInfiniteGetInstapayUserTransactionsQuery = <TData = GetInstapayUserTransactionsQuery, TError = unknown>(
  variables: GetInstapayUserTransactionsQueryVariables,
  options?: UseInfiniteQueryOptions<GetInstapayUserTransactionsQuery, TError, TData>
) => {
  const query = useFetchNewData<GetInstapayUserTransactionsQuery, GetInstapayUserTransactionsQueryVariables>(
    GetInstapayUserTransactionsDocument
  );
  return useInfiniteQuery<GetInstapayUserTransactionsQuery, TError, TData>(
    ['GetInstapayUserTransactions.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetInstapayUserTransactionsQuery.getKey = (variables: GetInstapayUserTransactionsQueryVariables) => [
  'GetInstapayUserTransactions.infinite',
  variables,
];
export const GetInstapayVisibilityDocument = `
    query GetInstapayVisibility {
  me {
    featureVisibility {
      instapayNow {
        showInstapay
        showEstIncome
        underMaintenance
      }
    }
  }
}
    `;
export const useGetInstapayVisibilityQuery = <TData = GetInstapayVisibilityQuery, TError = unknown>(
  variables?: GetInstapayVisibilityQueryVariables,
  options?: UseQueryOptions<GetInstapayVisibilityQuery, TError, TData>
) =>
  useQuery<GetInstapayVisibilityQuery, TError, TData>(
    variables === undefined ? ['GetInstapayVisibility'] : ['GetInstapayVisibility', variables],
    useFetchNewData<GetInstapayVisibilityQuery, GetInstapayVisibilityQueryVariables>(
      GetInstapayVisibilityDocument
    ).bind(null, variables),
    options
  );

useGetInstapayVisibilityQuery.getKey = (variables?: GetInstapayVisibilityQueryVariables) =>
  variables === undefined ? ['GetInstapayVisibility'] : ['GetInstapayVisibility', variables];
export const useInfiniteGetInstapayVisibilityQuery = <TData = GetInstapayVisibilityQuery, TError = unknown>(
  variables?: GetInstapayVisibilityQueryVariables,
  options?: UseInfiniteQueryOptions<GetInstapayVisibilityQuery, TError, TData>
) => {
  const query = useFetchNewData<GetInstapayVisibilityQuery, GetInstapayVisibilityQueryVariables>(
    GetInstapayVisibilityDocument
  );
  return useInfiniteQuery<GetInstapayVisibilityQuery, TError, TData>(
    variables === undefined ? ['GetInstapayVisibility.infinite'] : ['GetInstapayVisibility.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetInstapayVisibilityQuery.getKey = (variables?: GetInstapayVisibilityQueryVariables) =>
  variables === undefined ? ['GetInstapayVisibility.infinite'] : ['GetInstapayVisibility.infinite', variables];
export const GetOrgsDocument = `
    query GetOrgs {
  me {
    orgs {
      id
      uuid
      kpBusinessId
      isIndependentContractor
      source
      ehMemberId
    }
  }
}
    `;
export const useGetOrgsQuery = <TData = GetOrgsQuery, TError = unknown>(
  variables?: GetOrgsQueryVariables,
  options?: UseQueryOptions<GetOrgsQuery, TError, TData>
) =>
  useQuery<GetOrgsQuery, TError, TData>(
    variables === undefined ? ['GetOrgs'] : ['GetOrgs', variables],
    useFetchNewData<GetOrgsQuery, GetOrgsQueryVariables>(GetOrgsDocument).bind(null, variables),
    options
  );

useGetOrgsQuery.getKey = (variables?: GetOrgsQueryVariables) =>
  variables === undefined ? ['GetOrgs'] : ['GetOrgs', variables];
export const useInfiniteGetOrgsQuery = <TData = GetOrgsQuery, TError = unknown>(
  variables?: GetOrgsQueryVariables,
  options?: UseInfiniteQueryOptions<GetOrgsQuery, TError, TData>
) => {
  const query = useFetchNewData<GetOrgsQuery, GetOrgsQueryVariables>(GetOrgsDocument);
  return useInfiniteQuery<GetOrgsQuery, TError, TData>(
    variables === undefined ? ['GetOrgs.infinite'] : ['GetOrgs.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetOrgsQuery.getKey = (variables?: GetOrgsQueryVariables) =>
  variables === undefined ? ['GetOrgs.infinite'] : ['GetOrgs.infinite', variables];
export const ShowInstapayIntroductionDocument = `
    query showInstapayIntroduction($id: ID!) {
  me {
    org(id: $id) {
      instapay {
        showInstapayIntroductionV2
      }
    }
  }
}
    `;
export const useShowInstapayIntroductionQuery = <TData = ShowInstapayIntroductionQuery, TError = unknown>(
  variables: ShowInstapayIntroductionQueryVariables,
  options?: UseQueryOptions<ShowInstapayIntroductionQuery, TError, TData>
) =>
  useQuery<ShowInstapayIntroductionQuery, TError, TData>(
    ['showInstapayIntroduction', variables],
    useFetchNewData<ShowInstapayIntroductionQuery, ShowInstapayIntroductionQueryVariables>(
      ShowInstapayIntroductionDocument
    ).bind(null, variables),
    options
  );

useShowInstapayIntroductionQuery.getKey = (variables: ShowInstapayIntroductionQueryVariables) => [
  'showInstapayIntroduction',
  variables,
];
export const useInfiniteShowInstapayIntroductionQuery = <TData = ShowInstapayIntroductionQuery, TError = unknown>(
  variables: ShowInstapayIntroductionQueryVariables,
  options?: UseInfiniteQueryOptions<ShowInstapayIntroductionQuery, TError, TData>
) => {
  const query = useFetchNewData<ShowInstapayIntroductionQuery, ShowInstapayIntroductionQueryVariables>(
    ShowInstapayIntroductionDocument
  );
  return useInfiniteQuery<ShowInstapayIntroductionQuery, TError, TData>(
    ['showInstapayIntroduction.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteShowInstapayIntroductionQuery.getKey = (variables: ShowInstapayIntroductionQueryVariables) => [
  'showInstapayIntroduction.infinite',
  variables,
];
export const DrawdownInstapayDocument = `
    mutation DrawdownInstapay($input: DrawdownInput!) {
  instapay {
    drawdown(input: $input) {
      success
      messageCode
      transactionId
      version
    }
  }
}
    `;
export const useDrawdownInstapayMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<DrawdownInstapayMutation, TError, DrawdownInstapayMutationVariables, TContext>
) =>
  useMutation<DrawdownInstapayMutation, TError, DrawdownInstapayMutationVariables, TContext>(
    ['DrawdownInstapay'],
    useFetchNewData<DrawdownInstapayMutation, DrawdownInstapayMutationVariables>(DrawdownInstapayDocument),
    options
  );
export const AddPreferInstapayOptionDocument = `
    mutation addPreferInstapayOption($input: InstapayOptionInput) {
  instapay {
    addPreferInstapayOption(instaPayOption: $input) {
      success
    }
  }
}
    `;
export const useAddPreferInstapayOptionMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    AddPreferInstapayOptionMutation,
    TError,
    AddPreferInstapayOptionMutationVariables,
    TContext
  >
) =>
  useMutation<AddPreferInstapayOptionMutation, TError, AddPreferInstapayOptionMutationVariables, TContext>(
    ['addPreferInstapayOption'],
    useFetchNewData<AddPreferInstapayOptionMutation, AddPreferInstapayOptionMutationVariables>(
      AddPreferInstapayOptionDocument
    ),
    options
  );
export const GetInstapayUsageDocument = `
    query GetInstapayUsage {
  me {
    instapay {
      usage {
        ... on InstapayUsage {
          __typename
          isFirstTime
        }
        ... on InstapayError {
          __typename
          code
        }
      }
    }
  }
}
    `;
export const useGetInstapayUsageQuery = <TData = GetInstapayUsageQuery, TError = unknown>(
  variables?: GetInstapayUsageQueryVariables,
  options?: UseQueryOptions<GetInstapayUsageQuery, TError, TData>
) =>
  useQuery<GetInstapayUsageQuery, TError, TData>(
    variables === undefined ? ['GetInstapayUsage'] : ['GetInstapayUsage', variables],
    useFetchNewData<GetInstapayUsageQuery, GetInstapayUsageQueryVariables>(GetInstapayUsageDocument).bind(
      null,
      variables
    ),
    options
  );

useGetInstapayUsageQuery.getKey = (variables?: GetInstapayUsageQueryVariables) =>
  variables === undefined ? ['GetInstapayUsage'] : ['GetInstapayUsage', variables];
export const useInfiniteGetInstapayUsageQuery = <TData = GetInstapayUsageQuery, TError = unknown>(
  variables?: GetInstapayUsageQueryVariables,
  options?: UseInfiniteQueryOptions<GetInstapayUsageQuery, TError, TData>
) => {
  const query = useFetchNewData<GetInstapayUsageQuery, GetInstapayUsageQueryVariables>(GetInstapayUsageDocument);
  return useInfiniteQuery<GetInstapayUsageQuery, TError, TData>(
    variables === undefined ? ['GetInstapayUsage.infinite'] : ['GetInstapayUsage.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetInstapayUsageQuery.getKey = (variables?: GetInstapayUsageQueryVariables) =>
  variables === undefined ? ['GetInstapayUsage.infinite'] : ['GetInstapayUsage.infinite', variables];
export const GetAvailableIncentivesDocument = `
    query getAvailableIncentives {
  me {
    orgs {
      id
      instapay {
        availableIncentives {
          ... on InstapayNowIncentivePayload {
            incentives {
              id
              process {
                earningProcess
                isRedeemed
              }
              maxTransactionThreshold {
                type
                sign
                units
                subUnits
              }
            }
          }
          ... on InstapayError {
            __typename
            code
          }
        }
      }
    }
  }
}
    `;
export const useGetAvailableIncentivesQuery = <TData = GetAvailableIncentivesQuery, TError = unknown>(
  variables?: GetAvailableIncentivesQueryVariables,
  options?: UseQueryOptions<GetAvailableIncentivesQuery, TError, TData>
) =>
  useQuery<GetAvailableIncentivesQuery, TError, TData>(
    variables === undefined ? ['getAvailableIncentives'] : ['getAvailableIncentives', variables],
    useFetchNewData<GetAvailableIncentivesQuery, GetAvailableIncentivesQueryVariables>(
      GetAvailableIncentivesDocument
    ).bind(null, variables),
    options
  );

useGetAvailableIncentivesQuery.getKey = (variables?: GetAvailableIncentivesQueryVariables) =>
  variables === undefined ? ['getAvailableIncentives'] : ['getAvailableIncentives', variables];
export const useInfiniteGetAvailableIncentivesQuery = <TData = GetAvailableIncentivesQuery, TError = unknown>(
  variables?: GetAvailableIncentivesQueryVariables,
  options?: UseInfiniteQueryOptions<GetAvailableIncentivesQuery, TError, TData>
) => {
  const query = useFetchNewData<GetAvailableIncentivesQuery, GetAvailableIncentivesQueryVariables>(
    GetAvailableIncentivesDocument
  );
  return useInfiniteQuery<GetAvailableIncentivesQuery, TError, TData>(
    variables === undefined ? ['getAvailableIncentives.infinite'] : ['getAvailableIncentives.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetAvailableIncentivesQuery.getKey = (variables?: GetAvailableIncentivesQueryVariables) =>
  variables === undefined ? ['getAvailableIncentives.infinite'] : ['getAvailableIncentives.infinite', variables];
export const GetEstInstapayBalancesDocument = `
    query GetEstInstapayBalances {
  me {
    orgs {
      instapay {
        estBalance {
          ... on InstapayEstBalance {
            __typename
            id
            balance {
              units
              subUnits
              type
              sign
            }
            createdAt
          }
          ... on InstapayEstBalanceError {
            __typename
            code
          }
        }
      }
    }
  }
}
    `;
export const useGetEstInstapayBalancesQuery = <TData = GetEstInstapayBalancesQuery, TError = unknown>(
  variables?: GetEstInstapayBalancesQueryVariables,
  options?: UseQueryOptions<GetEstInstapayBalancesQuery, TError, TData>
) =>
  useQuery<GetEstInstapayBalancesQuery, TError, TData>(
    variables === undefined ? ['GetEstInstapayBalances'] : ['GetEstInstapayBalances', variables],
    useFetchNewData<GetEstInstapayBalancesQuery, GetEstInstapayBalancesQueryVariables>(
      GetEstInstapayBalancesDocument
    ).bind(null, variables),
    options
  );

useGetEstInstapayBalancesQuery.getKey = (variables?: GetEstInstapayBalancesQueryVariables) =>
  variables === undefined ? ['GetEstInstapayBalances'] : ['GetEstInstapayBalances', variables];
export const useInfiniteGetEstInstapayBalancesQuery = <TData = GetEstInstapayBalancesQuery, TError = unknown>(
  variables?: GetEstInstapayBalancesQueryVariables,
  options?: UseInfiniteQueryOptions<GetEstInstapayBalancesQuery, TError, TData>
) => {
  const query = useFetchNewData<GetEstInstapayBalancesQuery, GetEstInstapayBalancesQueryVariables>(
    GetEstInstapayBalancesDocument
  );
  return useInfiniteQuery<GetEstInstapayBalancesQuery, TError, TData>(
    variables === undefined ? ['GetEstInstapayBalances.infinite'] : ['GetEstInstapayBalances.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetEstInstapayBalancesQuery.getKey = (variables?: GetEstInstapayBalancesQueryVariables) =>
  variables === undefined ? ['GetEstInstapayBalances.infinite'] : ['GetEstInstapayBalances.infinite', variables];
export const GetEstimatedIncomeDocument = `
    query GetEstimatedIncome($orgID: ID!) {
  me {
    org(id: $orgID) {
      id
      instapay {
        estimatedIncome {
          ... on EstimatedIncomePayload {
            income {
              type
              sign
              units
              subUnits
            }
            payPeriod {
              paymentDate
            }
            deductions {
              amount {
                type
                sign
                units
                subUnits
              }
            }
          }
          ... on InstapayError {
            __typename
            code
          }
        }
      }
    }
  }
}
    `;
export const useGetEstimatedIncomeQuery = <TData = GetEstimatedIncomeQuery, TError = unknown>(
  variables: GetEstimatedIncomeQueryVariables,
  options?: UseQueryOptions<GetEstimatedIncomeQuery, TError, TData>
) =>
  useQuery<GetEstimatedIncomeQuery, TError, TData>(
    ['GetEstimatedIncome', variables],
    useFetchNewData<GetEstimatedIncomeQuery, GetEstimatedIncomeQueryVariables>(GetEstimatedIncomeDocument).bind(
      null,
      variables
    ),
    options
  );

useGetEstimatedIncomeQuery.getKey = (variables: GetEstimatedIncomeQueryVariables) => ['GetEstimatedIncome', variables];
export const useInfiniteGetEstimatedIncomeQuery = <TData = GetEstimatedIncomeQuery, TError = unknown>(
  variables: GetEstimatedIncomeQueryVariables,
  options?: UseInfiniteQueryOptions<GetEstimatedIncomeQuery, TError, TData>
) => {
  const query = useFetchNewData<GetEstimatedIncomeQuery, GetEstimatedIncomeQueryVariables>(GetEstimatedIncomeDocument);
  return useInfiniteQuery<GetEstimatedIncomeQuery, TError, TData>(
    ['GetEstimatedIncome.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetEstimatedIncomeQuery.getKey = (variables: GetEstimatedIncomeQueryVariables) => [
  'GetEstimatedIncome.infinite',
  variables,
];
export const GetInstapaySchedulingVisibilityDocument = `
    query GetInstapaySchedulingVisibility {
  me {
    featureVisibility {
      instapayScheduling {
        ... on Permission {
          __typename
          view
        }
        ... on InstapayError {
          __typename
          code
        }
      }
    }
  }
}
    `;
export const useGetInstapaySchedulingVisibilityQuery = <TData = GetInstapaySchedulingVisibilityQuery, TError = unknown>(
  variables?: GetInstapaySchedulingVisibilityQueryVariables,
  options?: UseQueryOptions<GetInstapaySchedulingVisibilityQuery, TError, TData>
) =>
  useQuery<GetInstapaySchedulingVisibilityQuery, TError, TData>(
    variables === undefined ? ['GetInstapaySchedulingVisibility'] : ['GetInstapaySchedulingVisibility', variables],
    useFetchNewData<GetInstapaySchedulingVisibilityQuery, GetInstapaySchedulingVisibilityQueryVariables>(
      GetInstapaySchedulingVisibilityDocument
    ).bind(null, variables),
    options
  );

useGetInstapaySchedulingVisibilityQuery.getKey = (variables?: GetInstapaySchedulingVisibilityQueryVariables) =>
  variables === undefined ? ['GetInstapaySchedulingVisibility'] : ['GetInstapaySchedulingVisibility', variables];
export const useInfiniteGetInstapaySchedulingVisibilityQuery = <
  TData = GetInstapaySchedulingVisibilityQuery,
  TError = unknown
>(
  variables?: GetInstapaySchedulingVisibilityQueryVariables,
  options?: UseInfiniteQueryOptions<GetInstapaySchedulingVisibilityQuery, TError, TData>
) => {
  const query = useFetchNewData<GetInstapaySchedulingVisibilityQuery, GetInstapaySchedulingVisibilityQueryVariables>(
    GetInstapaySchedulingVisibilityDocument
  );
  return useInfiniteQuery<GetInstapaySchedulingVisibilityQuery, TError, TData>(
    variables === undefined
      ? ['GetInstapaySchedulingVisibility.infinite']
      : ['GetInstapaySchedulingVisibility.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetInstapaySchedulingVisibilityQuery.getKey = (variables?: GetInstapaySchedulingVisibilityQueryVariables) =>
  variables === undefined
    ? ['GetInstapaySchedulingVisibility.infinite']
    : ['GetInstapaySchedulingVisibility.infinite', variables];
export const GetRecurringByDayVisibilityDocument = `
    query GetRecurringByDayVisibility {
  me {
    featureVisibility {
      recurringByDay {
        showRecurringByDay
      }
    }
  }
}
    `;
export const useGetRecurringByDayVisibilityQuery = <TData = GetRecurringByDayVisibilityQuery, TError = unknown>(
  variables?: GetRecurringByDayVisibilityQueryVariables,
  options?: UseQueryOptions<GetRecurringByDayVisibilityQuery, TError, TData>
) =>
  useQuery<GetRecurringByDayVisibilityQuery, TError, TData>(
    variables === undefined ? ['GetRecurringByDayVisibility'] : ['GetRecurringByDayVisibility', variables],
    useFetchNewData<GetRecurringByDayVisibilityQuery, GetRecurringByDayVisibilityQueryVariables>(
      GetRecurringByDayVisibilityDocument
    ).bind(null, variables),
    options
  );

useGetRecurringByDayVisibilityQuery.getKey = (variables?: GetRecurringByDayVisibilityQueryVariables) =>
  variables === undefined ? ['GetRecurringByDayVisibility'] : ['GetRecurringByDayVisibility', variables];
export const useInfiniteGetRecurringByDayVisibilityQuery = <TData = GetRecurringByDayVisibilityQuery, TError = unknown>(
  variables?: GetRecurringByDayVisibilityQueryVariables,
  options?: UseInfiniteQueryOptions<GetRecurringByDayVisibilityQuery, TError, TData>
) => {
  const query = useFetchNewData<GetRecurringByDayVisibilityQuery, GetRecurringByDayVisibilityQueryVariables>(
    GetRecurringByDayVisibilityDocument
  );
  return useInfiniteQuery<GetRecurringByDayVisibilityQuery, TError, TData>(
    variables === undefined
      ? ['GetRecurringByDayVisibility.infinite']
      : ['GetRecurringByDayVisibility.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetRecurringByDayVisibilityQuery.getKey = (variables?: GetRecurringByDayVisibilityQueryVariables) =>
  variables === undefined
    ? ['GetRecurringByDayVisibility.infinite']
    : ['GetRecurringByDayVisibility.infinite', variables];
export const GetInstaPayRecurringByDayPreviewDocument = `
    query GetInstaPayRecurringByDayPreview($orgID: ID!) {
  me {
    org(id: $orgID) {
      recurringByDay {
        preview {
          ... on RecurringByDayPreview {
            __typename
            supportedPayCycles
            memberPayCycleV2
            estimatedBalances {
              date
              amount {
                units
                subUnits
                type
                sign
              }
            }
            payPeriod {
              starting
              ending
              paymentDate
            }
          }
          ... on InstapayError {
            __typename
            code
          }
        }
      }
    }
  }
}
    `;
export const useGetInstaPayRecurringByDayPreviewQuery = <
  TData = GetInstaPayRecurringByDayPreviewQuery,
  TError = unknown
>(
  variables: GetInstaPayRecurringByDayPreviewQueryVariables,
  options?: UseQueryOptions<GetInstaPayRecurringByDayPreviewQuery, TError, TData>
) =>
  useQuery<GetInstaPayRecurringByDayPreviewQuery, TError, TData>(
    ['GetInstaPayRecurringByDayPreview', variables],
    useFetchNewData<GetInstaPayRecurringByDayPreviewQuery, GetInstaPayRecurringByDayPreviewQueryVariables>(
      GetInstaPayRecurringByDayPreviewDocument
    ).bind(null, variables),
    options
  );

useGetInstaPayRecurringByDayPreviewQuery.getKey = (variables: GetInstaPayRecurringByDayPreviewQueryVariables) => [
  'GetInstaPayRecurringByDayPreview',
  variables,
];
export const useInfiniteGetInstaPayRecurringByDayPreviewQuery = <
  TData = GetInstaPayRecurringByDayPreviewQuery,
  TError = unknown
>(
  variables: GetInstaPayRecurringByDayPreviewQueryVariables,
  options?: UseInfiniteQueryOptions<GetInstaPayRecurringByDayPreviewQuery, TError, TData>
) => {
  const query = useFetchNewData<GetInstaPayRecurringByDayPreviewQuery, GetInstaPayRecurringByDayPreviewQueryVariables>(
    GetInstaPayRecurringByDayPreviewDocument
  );
  return useInfiniteQuery<GetInstaPayRecurringByDayPreviewQuery, TError, TData>(
    ['GetInstaPayRecurringByDayPreview.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetInstaPayRecurringByDayPreviewQuery.getKey = (
  variables: GetInstaPayRecurringByDayPreviewQueryVariables
) => ['GetInstaPayRecurringByDayPreview.infinite', variables];
export const GetAllInstapayRecurringByDaySubscriptionDocument = `
    query GetAllInstapayRecurringByDaySubscription {
  me {
    orgs {
      uuid
      kpBusinessId
      recurringByDay {
        currentSubscription {
          ... on RecurringByDaySubscription {
            __typename
            id
            minPayAmount
            maxPayAmount
            minimumPayAmount {
              units
              subUnits
              type
              sign
            }
            maximumPayAmount {
              units
              subUnits
              type
              sign
            }
            bankAccountExternalId
            status
            payDay
            payCycle
            firstPaymentDate
          }
          ... on InstapayError {
            __typename
            code
          }
        }
      }
    }
  }
}
    `;
export const useGetAllInstapayRecurringByDaySubscriptionQuery = <
  TData = GetAllInstapayRecurringByDaySubscriptionQuery,
  TError = unknown
>(
  variables?: GetAllInstapayRecurringByDaySubscriptionQueryVariables,
  options?: UseQueryOptions<GetAllInstapayRecurringByDaySubscriptionQuery, TError, TData>
) =>
  useQuery<GetAllInstapayRecurringByDaySubscriptionQuery, TError, TData>(
    variables === undefined
      ? ['GetAllInstapayRecurringByDaySubscription']
      : ['GetAllInstapayRecurringByDaySubscription', variables],
    useFetchNewData<
      GetAllInstapayRecurringByDaySubscriptionQuery,
      GetAllInstapayRecurringByDaySubscriptionQueryVariables
    >(GetAllInstapayRecurringByDaySubscriptionDocument).bind(null, variables),
    options
  );

useGetAllInstapayRecurringByDaySubscriptionQuery.getKey = (
  variables?: GetAllInstapayRecurringByDaySubscriptionQueryVariables
) =>
  variables === undefined
    ? ['GetAllInstapayRecurringByDaySubscription']
    : ['GetAllInstapayRecurringByDaySubscription', variables];
export const useInfiniteGetAllInstapayRecurringByDaySubscriptionQuery = <
  TData = GetAllInstapayRecurringByDaySubscriptionQuery,
  TError = unknown
>(
  variables?: GetAllInstapayRecurringByDaySubscriptionQueryVariables,
  options?: UseInfiniteQueryOptions<GetAllInstapayRecurringByDaySubscriptionQuery, TError, TData>
) => {
  const query = useFetchNewData<
    GetAllInstapayRecurringByDaySubscriptionQuery,
    GetAllInstapayRecurringByDaySubscriptionQueryVariables
  >(GetAllInstapayRecurringByDaySubscriptionDocument);
  return useInfiniteQuery<GetAllInstapayRecurringByDaySubscriptionQuery, TError, TData>(
    variables === undefined
      ? ['GetAllInstapayRecurringByDaySubscription.infinite']
      : ['GetAllInstapayRecurringByDaySubscription.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetAllInstapayRecurringByDaySubscriptionQuery.getKey = (
  variables?: GetAllInstapayRecurringByDaySubscriptionQueryVariables
) =>
  variables === undefined
    ? ['GetAllInstapayRecurringByDaySubscription.infinite']
    : ['GetAllInstapayRecurringByDaySubscription.infinite', variables];
export const CreateSchedulingSubscriptionDocument = `
    mutation CreateSchedulingSubscription($input: CreateSchedulingSubscriptionInput!) {
  instapay {
    createSchedulingSubscription(input: $input) {
      ... on SchedulingSubscriptionResult {
        success
      }
    }
  }
}
    `;
export const useCreateSchedulingSubscriptionMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CreateSchedulingSubscriptionMutation,
    TError,
    CreateSchedulingSubscriptionMutationVariables,
    TContext
  >
) =>
  useMutation<CreateSchedulingSubscriptionMutation, TError, CreateSchedulingSubscriptionMutationVariables, TContext>(
    ['CreateSchedulingSubscription'],
    useFetchNewData<CreateSchedulingSubscriptionMutation, CreateSchedulingSubscriptionMutationVariables>(
      CreateSchedulingSubscriptionDocument
    ),
    options
  );
export const CancelSchedulingSubscriptionDocument = `
    mutation CancelSchedulingSubscription($input: CancelSchedulingSubscriptionInput!) {
  instapay {
    cancelSchedulingSubscription(input: $input) {
      ... on SchedulingSubscriptionResult {
        success
      }
    }
  }
}
    `;
export const useCancelSchedulingSubscriptionMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CancelSchedulingSubscriptionMutation,
    TError,
    CancelSchedulingSubscriptionMutationVariables,
    TContext
  >
) =>
  useMutation<CancelSchedulingSubscriptionMutation, TError, CancelSchedulingSubscriptionMutationVariables, TContext>(
    ['CancelSchedulingSubscription'],
    useFetchNewData<CancelSchedulingSubscriptionMutation, CancelSchedulingSubscriptionMutationVariables>(
      CancelSchedulingSubscriptionDocument
    ),
    options
  );
export const UpdateSchedulingSubscriptionDocument = `
    mutation UpdateSchedulingSubscription($input: UpdateSchedulingSubscriptionInput!) {
  instapay {
    updateSchedulingSubscription(input: $input) {
      ... on SchedulingSubscriptionResult {
        success
      }
    }
  }
}
    `;
export const useUpdateSchedulingSubscriptionMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    UpdateSchedulingSubscriptionMutation,
    TError,
    UpdateSchedulingSubscriptionMutationVariables,
    TContext
  >
) =>
  useMutation<UpdateSchedulingSubscriptionMutation, TError, UpdateSchedulingSubscriptionMutationVariables, TContext>(
    ['UpdateSchedulingSubscription'],
    useFetchNewData<UpdateSchedulingSubscriptionMutation, UpdateSchedulingSubscriptionMutationVariables>(
      UpdateSchedulingSubscriptionDocument
    ),
    options
  );
export const GetSchedulingSubscriptionsDocument = `
    query GetSchedulingSubscriptions {
  me {
    orgs {
      id
      uuid
      kpBusinessId
      instapay {
        schedulingSubscriptions {
          ... on GetSchedulingSubscription {
            subscriptions {
              id
              plan
              amount {
                units
                subUnits
              }
              bankAccountExternalId
            }
          }
        }
      }
    }
  }
}
    `;
export const useGetSchedulingSubscriptionsQuery = <TData = GetSchedulingSubscriptionsQuery, TError = unknown>(
  variables?: GetSchedulingSubscriptionsQueryVariables,
  options?: UseQueryOptions<GetSchedulingSubscriptionsQuery, TError, TData>
) =>
  useQuery<GetSchedulingSubscriptionsQuery, TError, TData>(
    variables === undefined ? ['GetSchedulingSubscriptions'] : ['GetSchedulingSubscriptions', variables],
    useFetchNewData<GetSchedulingSubscriptionsQuery, GetSchedulingSubscriptionsQueryVariables>(
      GetSchedulingSubscriptionsDocument
    ).bind(null, variables),
    options
  );

useGetSchedulingSubscriptionsQuery.getKey = (variables?: GetSchedulingSubscriptionsQueryVariables) =>
  variables === undefined ? ['GetSchedulingSubscriptions'] : ['GetSchedulingSubscriptions', variables];
export const useInfiniteGetSchedulingSubscriptionsQuery = <TData = GetSchedulingSubscriptionsQuery, TError = unknown>(
  variables?: GetSchedulingSubscriptionsQueryVariables,
  options?: UseInfiniteQueryOptions<GetSchedulingSubscriptionsQuery, TError, TData>
) => {
  const query = useFetchNewData<GetSchedulingSubscriptionsQuery, GetSchedulingSubscriptionsQueryVariables>(
    GetSchedulingSubscriptionsDocument
  );
  return useInfiniteQuery<GetSchedulingSubscriptionsQuery, TError, TData>(
    variables === undefined
      ? ['GetSchedulingSubscriptions.infinite']
      : ['GetSchedulingSubscriptions.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetSchedulingSubscriptionsQuery.getKey = (variables?: GetSchedulingSubscriptionsQueryVariables) =>
  variables === undefined
    ? ['GetSchedulingSubscriptions.infinite']
    : ['GetSchedulingSubscriptions.infinite', variables];
export const DisableEarnedWageAccessFeaturesDocument = `
    mutation DisableEarnedWageAccessFeatures {
  instapay {
    disableEarnedWageAccessFeatures {
      ... on DisableEarnedWageAccessFeaturesPayload {
        success
      }
      ... on InstapayError {
        code
      }
    }
  }
}
    `;
export const useDisableEarnedWageAccessFeaturesMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    DisableEarnedWageAccessFeaturesMutation,
    TError,
    DisableEarnedWageAccessFeaturesMutationVariables,
    TContext
  >
) =>
  useMutation<
    DisableEarnedWageAccessFeaturesMutation,
    TError,
    DisableEarnedWageAccessFeaturesMutationVariables,
    TContext
  >(
    ['DisableEarnedWageAccessFeatures'],
    useFetchNewData<DisableEarnedWageAccessFeaturesMutation, DisableEarnedWageAccessFeaturesMutationVariables>(
      DisableEarnedWageAccessFeaturesDocument
    ),
    options
  );
export const SubmitInstaPayDrawdownSurveyDocument = `
    mutation SubmitInstaPayDrawdownSurvey($input: SubmitInstaPayDrawdownSurveyInput!) {
  instapay {
    submitInstaPayDrawdownSurvey(input: $input) {
      ... on SubmitInstaPayDrawdownSurveyPayload {
        success
      }
      ... on InstapayError {
        code
      }
    }
  }
}
    `;
export const useSubmitInstaPayDrawdownSurveyMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    SubmitInstaPayDrawdownSurveyMutation,
    TError,
    SubmitInstaPayDrawdownSurveyMutationVariables,
    TContext
  >
) =>
  useMutation<SubmitInstaPayDrawdownSurveyMutation, TError, SubmitInstaPayDrawdownSurveyMutationVariables, TContext>(
    ['SubmitInstaPayDrawdownSurvey'],
    useFetchNewData<SubmitInstaPayDrawdownSurveyMutation, SubmitInstaPayDrawdownSurveyMutationVariables>(
      SubmitInstaPayDrawdownSurveyDocument
    ),
    options
  );
export const SubscribeRecurringByDayDocument = `
    mutation SubscribeRecurringByDay($input: SubscribeRecurringByDayInput!) {
  recurringByDay {
    subscribeRecurringByDay(input: $input) {
      ... on SubscribeRecurringByDayPayload {
        success
      }
      ... on InstapayError {
        code
      }
    }
  }
}
    `;
export const useSubscribeRecurringByDayMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    SubscribeRecurringByDayMutation,
    TError,
    SubscribeRecurringByDayMutationVariables,
    TContext
  >
) =>
  useMutation<SubscribeRecurringByDayMutation, TError, SubscribeRecurringByDayMutationVariables, TContext>(
    ['SubscribeRecurringByDay'],
    useFetchNewData<SubscribeRecurringByDayMutation, SubscribeRecurringByDayMutationVariables>(
      SubscribeRecurringByDayDocument
    ),
    options
  );
export const CancelRecurringByDayDocument = `
    mutation CancelRecurringByDay($input: CancelRecurringByDayInput!) {
  recurringByDay {
    cancelRecurringByDay(input: $input) {
      ... on CancelRecurringByDayPayload {
        success
      }
      ... on InstapayError {
        code
      }
    }
  }
}
    `;
export const useCancelRecurringByDayMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<CancelRecurringByDayMutation, TError, CancelRecurringByDayMutationVariables, TContext>
) =>
  useMutation<CancelRecurringByDayMutation, TError, CancelRecurringByDayMutationVariables, TContext>(
    ['CancelRecurringByDay'],
    useFetchNewData<CancelRecurringByDayMutation, CancelRecurringByDayMutationVariables>(CancelRecurringByDayDocument),
    options
  );
export const UpdateRecurringByDayDocument = `
    mutation UpdateRecurringByDay($input: UpdateRecurringByDayInput!) {
  recurringByDay {
    updateRecurringByDay(input: $input) {
      ... on UpdateRecurringByDayPayload {
        success
      }
      ... on InstapayError {
        code
      }
    }
  }
}
    `;
export const useUpdateRecurringByDayMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<UpdateRecurringByDayMutation, TError, UpdateRecurringByDayMutationVariables, TContext>
) =>
  useMutation<UpdateRecurringByDayMutation, TError, UpdateRecurringByDayMutationVariables, TContext>(
    ['UpdateRecurringByDay'],
    useFetchNewData<UpdateRecurringByDayMutation, UpdateRecurringByDayMutationVariables>(UpdateRecurringByDayDocument),
    options
  );
export const GetRecurringByAmountEligibilityDocument = `
    query GetRecurringByAmountEligibility {
  me {
    orgs {
      id
      uuid
      kpBusinessId
      name
      instapay {
        recurringByAmountEligibility {
          isEligible
          errorCode
        }
      }
    }
  }
}
    `;
export const useGetRecurringByAmountEligibilityQuery = <TData = GetRecurringByAmountEligibilityQuery, TError = unknown>(
  variables?: GetRecurringByAmountEligibilityQueryVariables,
  options?: UseQueryOptions<GetRecurringByAmountEligibilityQuery, TError, TData>
) =>
  useQuery<GetRecurringByAmountEligibilityQuery, TError, TData>(
    variables === undefined ? ['GetRecurringByAmountEligibility'] : ['GetRecurringByAmountEligibility', variables],
    useFetchNewData<GetRecurringByAmountEligibilityQuery, GetRecurringByAmountEligibilityQueryVariables>(
      GetRecurringByAmountEligibilityDocument
    ).bind(null, variables),
    options
  );

useGetRecurringByAmountEligibilityQuery.getKey = (variables?: GetRecurringByAmountEligibilityQueryVariables) =>
  variables === undefined ? ['GetRecurringByAmountEligibility'] : ['GetRecurringByAmountEligibility', variables];
export const useInfiniteGetRecurringByAmountEligibilityQuery = <
  TData = GetRecurringByAmountEligibilityQuery,
  TError = unknown
>(
  variables?: GetRecurringByAmountEligibilityQueryVariables,
  options?: UseInfiniteQueryOptions<GetRecurringByAmountEligibilityQuery, TError, TData>
) => {
  const query = useFetchNewData<GetRecurringByAmountEligibilityQuery, GetRecurringByAmountEligibilityQueryVariables>(
    GetRecurringByAmountEligibilityDocument
  );
  return useInfiniteQuery<GetRecurringByAmountEligibilityQuery, TError, TData>(
    variables === undefined
      ? ['GetRecurringByAmountEligibility.infinite']
      : ['GetRecurringByAmountEligibility.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetRecurringByAmountEligibilityQuery.getKey = (variables?: GetRecurringByAmountEligibilityQueryVariables) =>
  variables === undefined
    ? ['GetRecurringByAmountEligibility.infinite']
    : ['GetRecurringByAmountEligibility.infinite', variables];
export const GetEwaPushNotificationOptInStatusByFeatureDocument = `
    query GetEWAPushNotificationOptInStatusByFeature($feature: EWAPushNotificationFeature!, $orgId: ID!) {
  me {
    org(id: $orgId) {
      ewaPushNotification {
        optInStatusByFeature(feature: $feature) {
          ... on EWAPushNotificationOptInStatusByFeature {
            featureLevelOptedIn
            statuses {
              optedIn
              type
            }
          }
          ... on InstapayError {
            code
          }
        }
      }
    }
  }
}
    `;
export const useGetEwaPushNotificationOptInStatusByFeatureQuery = <
  TData = GetEwaPushNotificationOptInStatusByFeatureQuery,
  TError = unknown
>(
  variables: GetEwaPushNotificationOptInStatusByFeatureQueryVariables,
  options?: UseQueryOptions<GetEwaPushNotificationOptInStatusByFeatureQuery, TError, TData>
) =>
  useQuery<GetEwaPushNotificationOptInStatusByFeatureQuery, TError, TData>(
    ['GetEWAPushNotificationOptInStatusByFeature', variables],
    useFetchNewData<
      GetEwaPushNotificationOptInStatusByFeatureQuery,
      GetEwaPushNotificationOptInStatusByFeatureQueryVariables
    >(GetEwaPushNotificationOptInStatusByFeatureDocument).bind(null, variables),
    options
  );

useGetEwaPushNotificationOptInStatusByFeatureQuery.getKey = (
  variables: GetEwaPushNotificationOptInStatusByFeatureQueryVariables
) => ['GetEWAPushNotificationOptInStatusByFeature', variables];
export const useInfiniteGetEwaPushNotificationOptInStatusByFeatureQuery = <
  TData = GetEwaPushNotificationOptInStatusByFeatureQuery,
  TError = unknown
>(
  variables: GetEwaPushNotificationOptInStatusByFeatureQueryVariables,
  options?: UseInfiniteQueryOptions<GetEwaPushNotificationOptInStatusByFeatureQuery, TError, TData>
) => {
  const query = useFetchNewData<
    GetEwaPushNotificationOptInStatusByFeatureQuery,
    GetEwaPushNotificationOptInStatusByFeatureQueryVariables
  >(GetEwaPushNotificationOptInStatusByFeatureDocument);
  return useInfiniteQuery<GetEwaPushNotificationOptInStatusByFeatureQuery, TError, TData>(
    ['GetEWAPushNotificationOptInStatusByFeature.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetEwaPushNotificationOptInStatusByFeatureQuery.getKey = (
  variables: GetEwaPushNotificationOptInStatusByFeatureQueryVariables
) => ['GetEWAPushNotificationOptInStatusByFeature.infinite', variables];
export const OptInEwaPushNotificationByTypeDocument = `
    mutation OptInEWAPushNotificationByType($input: OptInEWAPushNotificationByTypeInput!) {
  ewaPushNotification {
    optInByType(input: $input) {
      ... on OptInOutEWAPushNotificationPayload {
        success
      }
      ... on InstapayError {
        code
      }
    }
  }
}
    `;
export const useOptInEwaPushNotificationByTypeMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    OptInEwaPushNotificationByTypeMutation,
    TError,
    OptInEwaPushNotificationByTypeMutationVariables,
    TContext
  >
) =>
  useMutation<
    OptInEwaPushNotificationByTypeMutation,
    TError,
    OptInEwaPushNotificationByTypeMutationVariables,
    TContext
  >(
    ['OptInEWAPushNotificationByType'],
    useFetchNewData<OptInEwaPushNotificationByTypeMutation, OptInEwaPushNotificationByTypeMutationVariables>(
      OptInEwaPushNotificationByTypeDocument
    ),
    options
  );
export const OptOutEwaPushNotificationByTypeDocument = `
    mutation OptOutEWAPushNotificationByType($input: OptOutEWAPushNotificationByTypeInput!) {
  ewaPushNotification {
    optOutByType(input: $input) {
      ... on OptInOutEWAPushNotificationPayload {
        success
      }
      ... on InstapayError {
        code
      }
    }
  }
}
    `;
export const useOptOutEwaPushNotificationByTypeMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    OptOutEwaPushNotificationByTypeMutation,
    TError,
    OptOutEwaPushNotificationByTypeMutationVariables,
    TContext
  >
) =>
  useMutation<
    OptOutEwaPushNotificationByTypeMutation,
    TError,
    OptOutEwaPushNotificationByTypeMutationVariables,
    TContext
  >(
    ['OptOutEWAPushNotificationByType'],
    useFetchNewData<OptOutEwaPushNotificationByTypeMutation, OptOutEwaPushNotificationByTypeMutationVariables>(
      OptOutEwaPushNotificationByTypeDocument
    ),
    options
  );
export const OptInEwaPushNotificationByFeatureDocument = `
    mutation OptInEWAPushNotificationByFeature($input: OptInEWAPushNotificationByFeatureInput!) {
  ewaPushNotification {
    optInByFeature(input: $input) {
      ... on OptInOutEWAPushNotificationPayload {
        success
      }
      ... on InstapayError {
        code
      }
    }
  }
}
    `;
export const useOptInEwaPushNotificationByFeatureMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    OptInEwaPushNotificationByFeatureMutation,
    TError,
    OptInEwaPushNotificationByFeatureMutationVariables,
    TContext
  >
) =>
  useMutation<
    OptInEwaPushNotificationByFeatureMutation,
    TError,
    OptInEwaPushNotificationByFeatureMutationVariables,
    TContext
  >(
    ['OptInEWAPushNotificationByFeature'],
    useFetchNewData<OptInEwaPushNotificationByFeatureMutation, OptInEwaPushNotificationByFeatureMutationVariables>(
      OptInEwaPushNotificationByFeatureDocument
    ),
    options
  );
export const OptOutEwaPushNotificationByFeatureDocument = `
    mutation OptOutEWAPushNotificationByFeature($input: OptOutEWAPushNotificationByFeatureInput!) {
  ewaPushNotification {
    optOutByFeature(input: $input) {
      ... on OptInOutEWAPushNotificationPayload {
        success
      }
      ... on InstapayError {
        code
      }
    }
  }
}
    `;
export const useOptOutEwaPushNotificationByFeatureMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    OptOutEwaPushNotificationByFeatureMutation,
    TError,
    OptOutEwaPushNotificationByFeatureMutationVariables,
    TContext
  >
) =>
  useMutation<
    OptOutEwaPushNotificationByFeatureMutation,
    TError,
    OptOutEwaPushNotificationByFeatureMutationVariables,
    TContext
  >(
    ['OptOutEWAPushNotificationByFeature'],
    useFetchNewData<OptOutEwaPushNotificationByFeatureMutation, OptOutEwaPushNotificationByFeatureMutationVariables>(
      OptOutEwaPushNotificationByFeatureDocument
    ),
    options
  );
export const GetEventsPaginatedDocument = `
    query GetEventsPaginated($input: GetEventsInput!) {
  me {
    lifecycle {
      events(input: $input) {
        id
        code
        source
        user_id
        owner_id
        fund_usi
        author_type
        author_id
        trigger_time
        data
        delivery_status
        delivered_at
        accepted
        accepted_from
        created_at
        updated_at
      }
    }
  }
}
    `;
export const useGetEventsPaginatedQuery = <TData = GetEventsPaginatedQuery, TError = unknown>(
  variables: GetEventsPaginatedQueryVariables,
  options?: UseQueryOptions<GetEventsPaginatedQuery, TError, TData>
) =>
  useQuery<GetEventsPaginatedQuery, TError, TData>(
    ['GetEventsPaginated', variables],
    useFetchNewData<GetEventsPaginatedQuery, GetEventsPaginatedQueryVariables>(GetEventsPaginatedDocument).bind(
      null,
      variables
    ),
    options
  );

useGetEventsPaginatedQuery.getKey = (variables: GetEventsPaginatedQueryVariables) => ['GetEventsPaginated', variables];
export const useInfiniteGetEventsPaginatedQuery = <TData = GetEventsPaginatedQuery, TError = unknown>(
  variables: GetEventsPaginatedQueryVariables,
  options?: UseInfiniteQueryOptions<GetEventsPaginatedQuery, TError, TData>
) => {
  const query = useFetchNewData<GetEventsPaginatedQuery, GetEventsPaginatedQueryVariables>(GetEventsPaginatedDocument);
  return useInfiniteQuery<GetEventsPaginatedQuery, TError, TData>(
    ['GetEventsPaginated.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetEventsPaginatedQuery.getKey = (variables: GetEventsPaginatedQueryVariables) => [
  'GetEventsPaginated.infinite',
  variables,
];
export const GetFundNotifyPreferenceDocument = `
    query GetFundNotifyPreference($input: GetFundNotifyPreferenceInput!) {
  me {
    lifecycle {
      fundNotifyPreference(input: $input) {
        enabled
      }
    }
  }
}
    `;
export const useGetFundNotifyPreferenceQuery = <TData = GetFundNotifyPreferenceQuery, TError = unknown>(
  variables: GetFundNotifyPreferenceQueryVariables,
  options?: UseQueryOptions<GetFundNotifyPreferenceQuery, TError, TData>
) =>
  useQuery<GetFundNotifyPreferenceQuery, TError, TData>(
    ['GetFundNotifyPreference', variables],
    useFetchNewData<GetFundNotifyPreferenceQuery, GetFundNotifyPreferenceQueryVariables>(
      GetFundNotifyPreferenceDocument
    ).bind(null, variables),
    options
  );

useGetFundNotifyPreferenceQuery.getKey = (variables: GetFundNotifyPreferenceQueryVariables) => [
  'GetFundNotifyPreference',
  variables,
];
export const useInfiniteGetFundNotifyPreferenceQuery = <TData = GetFundNotifyPreferenceQuery, TError = unknown>(
  variables: GetFundNotifyPreferenceQueryVariables,
  options?: UseInfiniteQueryOptions<GetFundNotifyPreferenceQuery, TError, TData>
) => {
  const query = useFetchNewData<GetFundNotifyPreferenceQuery, GetFundNotifyPreferenceQueryVariables>(
    GetFundNotifyPreferenceDocument
  );
  return useInfiniteQuery<GetFundNotifyPreferenceQuery, TError, TData>(
    ['GetFundNotifyPreference.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetFundNotifyPreferenceQuery.getKey = (variables: GetFundNotifyPreferenceQueryVariables) => [
  'GetFundNotifyPreference.infinite',
  variables,
];
export const AcceptEventDocument = `
    mutation AcceptEvent($input: AcceptEventInput!) {
  lifecycle {
    event {
      accept(input: $input) {
        success
        message
      }
    }
  }
}
    `;
export const useAcceptEventMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<AcceptEventMutation, TError, AcceptEventMutationVariables, TContext>
) =>
  useMutation<AcceptEventMutation, TError, AcceptEventMutationVariables, TContext>(
    ['AcceptEvent'],
    useFetchNewData<AcceptEventMutation, AcceptEventMutationVariables>(AcceptEventDocument),
    options
  );
export const CreateTrackingDocument = `
    mutation CreateTracking($input: LifecycleTrackingInput!) {
  lifecycle {
    event {
      createTracking(input: $input) {
        success
      }
    }
  }
}
    `;
export const useCreateTrackingMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<CreateTrackingMutation, TError, CreateTrackingMutationVariables, TContext>
) =>
  useMutation<CreateTrackingMutation, TError, CreateTrackingMutationVariables, TContext>(
    ['CreateTracking'],
    useFetchNewData<CreateTrackingMutation, CreateTrackingMutationVariables>(CreateTrackingDocument),
    options
  );
export const GetLocationsDocument = `
    query GetLocations($input: GetLocationsRequest) {
  getLocations(input: $input) {
    addresses {
      formattedAddress
      latitude
      longitude
      placeId
    }
  }
}
    `;
export const useGetLocationsQuery = <TData = GetLocationsQuery, TError = unknown>(
  variables?: GetLocationsQueryVariables,
  options?: UseQueryOptions<GetLocationsQuery, TError, TData>
) =>
  useQuery<GetLocationsQuery, TError, TData>(
    variables === undefined ? ['GetLocations'] : ['GetLocations', variables],
    useFetchNewData<GetLocationsQuery, GetLocationsQueryVariables>(GetLocationsDocument).bind(null, variables),
    options
  );

useGetLocationsQuery.getKey = (variables?: GetLocationsQueryVariables) =>
  variables === undefined ? ['GetLocations'] : ['GetLocations', variables];
export const useInfiniteGetLocationsQuery = <TData = GetLocationsQuery, TError = unknown>(
  variables?: GetLocationsQueryVariables,
  options?: UseInfiniteQueryOptions<GetLocationsQuery, TError, TData>
) => {
  const query = useFetchNewData<GetLocationsQuery, GetLocationsQueryVariables>(GetLocationsDocument);
  return useInfiniteQuery<GetLocationsQuery, TError, TData>(
    variables === undefined ? ['GetLocations.infinite'] : ['GetLocations.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetLocationsQuery.getKey = (variables?: GetLocationsQueryVariables) =>
  variables === undefined ? ['GetLocations.infinite'] : ['GetLocations.infinite', variables];
export const GetLocationByPlaceIdDocument = `
    query GetLocationByPlaceId($placeId: String!) {
  getLocationByPlaceId(placeId: $placeId) {
    addressDetails {
      addressLine
      townOrCity
      postCode
      region
      country
      formattedAddress
      unitNumber
      streetNumber
      streetName
      streetType
      geometry {
        latitude
        longitude
      }
    }
  }
}
    `;
export const useGetLocationByPlaceIdQuery = <TData = GetLocationByPlaceIdQuery, TError = unknown>(
  variables: GetLocationByPlaceIdQueryVariables,
  options?: UseQueryOptions<GetLocationByPlaceIdQuery, TError, TData>
) =>
  useQuery<GetLocationByPlaceIdQuery, TError, TData>(
    ['GetLocationByPlaceId', variables],
    useFetchNewData<GetLocationByPlaceIdQuery, GetLocationByPlaceIdQueryVariables>(GetLocationByPlaceIdDocument).bind(
      null,
      variables
    ),
    options
  );

useGetLocationByPlaceIdQuery.getKey = (variables: GetLocationByPlaceIdQueryVariables) => [
  'GetLocationByPlaceId',
  variables,
];
export const useInfiniteGetLocationByPlaceIdQuery = <TData = GetLocationByPlaceIdQuery, TError = unknown>(
  variables: GetLocationByPlaceIdQueryVariables,
  options?: UseInfiniteQueryOptions<GetLocationByPlaceIdQuery, TError, TData>
) => {
  const query = useFetchNewData<GetLocationByPlaceIdQuery, GetLocationByPlaceIdQueryVariables>(
    GetLocationByPlaceIdDocument
  );
  return useInfiniteQuery<GetLocationByPlaceIdQuery, TError, TData>(
    ['GetLocationByPlaceId.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetLocationByPlaceIdQuery.getKey = (variables: GetLocationByPlaceIdQueryVariables) => [
  'GetLocationByPlaceId.infinite',
  variables,
];
export const GetPayAccountDocument = `
    query GetPayAccount($orgId: ID!, $memberId: String!) {
  me {
    org(id: $orgId) {
      member {
        paySplit {
          bankAccounts(memberId: $memberId) {
            splitType
            details {
              accountName
              accountNumber
              bsb
              amount
            }
          }
        }
      }
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
    useFetchNewData<GetPayAccountQuery, GetPayAccountQueryVariables>(GetPayAccountDocument).bind(null, variables),
    options
  );

useGetPayAccountQuery.getKey = (variables: GetPayAccountQueryVariables) => ['GetPayAccount', variables];
export const useInfiniteGetPayAccountQuery = <TData = GetPayAccountQuery, TError = unknown>(
  variables: GetPayAccountQueryVariables,
  options?: UseInfiniteQueryOptions<GetPayAccountQuery, TError, TData>
) => {
  const query = useFetchNewData<GetPayAccountQuery, GetPayAccountQueryVariables>(GetPayAccountDocument);
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
export const SavePayAccountDocument = `
    mutation SavePayAccount($input: PaySplitInput!) {
  savePaySplit(input: $input) {
    success
  }
}
    `;
export const useSavePayAccountMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<SavePayAccountMutation, TError, SavePayAccountMutationVariables, TContext>
) =>
  useMutation<SavePayAccountMutation, TError, SavePayAccountMutationVariables, TContext>(
    ['SavePayAccount'],
    useFetchNewData<SavePayAccountMutation, SavePayAccountMutationVariables>(SavePayAccountDocument),
    options
  );
export const GetAllocationsDocument = `
    query GetAllocations($orgId: ID!) {
  me {
    org(id: $orgId) {
      member {
        paySplit {
          allocations {
            allocation {
              splitType
              details {
                accountName
                accountNumber
                bsb
                amount
              }
            }
            membership {
              orgId
              memberId
              orgUUID
              orgName
              xeroConnected
              isIndependentContractor
            }
          }
        }
      }
    }
  }
}
    `;
export const useGetAllocationsQuery = <TData = GetAllocationsQuery, TError = unknown>(
  variables: GetAllocationsQueryVariables,
  options?: UseQueryOptions<GetAllocationsQuery, TError, TData>
) =>
  useQuery<GetAllocationsQuery, TError, TData>(
    ['GetAllocations', variables],
    useFetchNewData<GetAllocationsQuery, GetAllocationsQueryVariables>(GetAllocationsDocument).bind(null, variables),
    options
  );

useGetAllocationsQuery.getKey = (variables: GetAllocationsQueryVariables) => ['GetAllocations', variables];
export const useInfiniteGetAllocationsQuery = <TData = GetAllocationsQuery, TError = unknown>(
  variables: GetAllocationsQueryVariables,
  options?: UseInfiniteQueryOptions<GetAllocationsQuery, TError, TData>
) => {
  const query = useFetchNewData<GetAllocationsQuery, GetAllocationsQueryVariables>(GetAllocationsDocument);
  return useInfiniteQuery<GetAllocationsQuery, TError, TData>(
    ['GetAllocations.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetAllocationsQuery.getKey = (variables: GetAllocationsQueryVariables) => [
  'GetAllocations.infinite',
  variables,
];
export const CreateStripeClientTokenDocument = `
    mutation CreateStripeClientToken($createStripeClientTokenInput: CreateStripeClientTokenInput) {
  payment {
    createStripeClientToken(
      createStripeClientTokenInput: $createStripeClientTokenInput
    ) {
      clientToken
      error {
        message
      }
    }
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
    useFetchNewData<CreateStripeClientTokenMutation, CreateStripeClientTokenMutationVariables>(
      CreateStripeClientTokenDocument
    ),
    options
  );
export const MakeStripePaymentDocument = `
    mutation MakeStripePayment($makeStripePaymentInput: MakeStripePaymentInput!) {
  payment {
    makeStripePayment(makeStripePaymentInput: $makeStripePaymentInput) {
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
      error {
        message
      }
    }
  }
}
    `;
export const useMakeStripePaymentMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<MakeStripePaymentMutation, TError, MakeStripePaymentMutationVariables, TContext>
) =>
  useMutation<MakeStripePaymentMutation, TError, MakeStripePaymentMutationVariables, TContext>(
    ['MakeStripePayment'],
    useFetchNewData<MakeStripePaymentMutation, MakeStripePaymentMutationVariables>(MakeStripePaymentDocument),
    options
  );
export const CreateStashDocument = `
    mutation createStash($stashInput: CreateStashInput!) {
  createStash(input: $stashInput)
}
    `;
export const useCreateStashMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<CreateStashMutation, TError, CreateStashMutationVariables, TContext>
) =>
  useMutation<CreateStashMutation, TError, CreateStashMutationVariables, TContext>(
    ['createStash'],
    useFetchNewData<CreateStashMutation, CreateStashMutationVariables>(CreateStashDocument),
    options
  );
export const CloseStashDocument = `
    mutation closeStash($stashId: ID!) {
  closeStash(stashId: $stashId)
}
    `;
export const useCloseStashMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<CloseStashMutation, TError, CloseStashMutationVariables, TContext>
) =>
  useMutation<CloseStashMutation, TError, CloseStashMutationVariables, TContext>(
    ['closeStash'],
    useFetchNewData<CloseStashMutation, CloseStashMutationVariables>(CloseStashDocument),
    options
  );
export const DepositToStashDocument = `
    mutation depositToStash($stashId: ID!, $input: DepositToStashInput!) {
  depositToStash(stashId: $stashId, input: $input)
}
    `;
export const useDepositToStashMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<DepositToStashMutation, TError, DepositToStashMutationVariables, TContext>
) =>
  useMutation<DepositToStashMutation, TError, DepositToStashMutationVariables, TContext>(
    ['depositToStash'],
    useFetchNewData<DepositToStashMutation, DepositToStashMutationVariables>(DepositToStashDocument),
    options
  );
export const WithdrawFromStashDocument = `
    mutation withdrawFromStash($stashId: ID!, $input: WithdrawFromStashInput!) {
  withdrawFromStash(stashId: $stashId, input: $input)
}
    `;
export const useWithdrawFromStashMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<WithdrawFromStashMutation, TError, WithdrawFromStashMutationVariables, TContext>
) =>
  useMutation<WithdrawFromStashMutation, TError, WithdrawFromStashMutationVariables, TContext>(
    ['withdrawFromStash'],
    useFetchNewData<WithdrawFromStashMutation, WithdrawFromStashMutationVariables>(WithdrawFromStashDocument),
    options
  );
export const SetStashMetadataDocument = `
    mutation setStashMetadata($input: SetStashMetadataInput!) {
  setStashMetadata(input: $input)
}
    `;
export const useSetStashMetadataMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<SetStashMetadataMutation, TError, SetStashMetadataMutationVariables, TContext>
) =>
  useMutation<SetStashMetadataMutation, TError, SetStashMetadataMutationVariables, TContext>(
    ['setStashMetadata'],
    useFetchNewData<SetStashMetadataMutation, SetStashMetadataMutationVariables>(SetStashMetadataDocument),
    options
  );
export const GetStashesDocument = `
    query getStashes {
  me {
    wallet {
      stash {
        items {
          id
          name
          targetAmount {
            type
            sign
            units
            subUnits
          }
          balance {
            type
            sign
            units
            subUnits
          }
          imageUrl
          closedAtUtc
          createdAtUtc
          status
        }
      }
    }
  }
}
    `;
export const useGetStashesQuery = <TData = GetStashesQuery, TError = unknown>(
  variables?: GetStashesQueryVariables,
  options?: UseQueryOptions<GetStashesQuery, TError, TData>
) =>
  useQuery<GetStashesQuery, TError, TData>(
    variables === undefined ? ['getStashes'] : ['getStashes', variables],
    useFetchNewData<GetStashesQuery, GetStashesQueryVariables>(GetStashesDocument).bind(null, variables),
    options
  );

useGetStashesQuery.getKey = (variables?: GetStashesQueryVariables) =>
  variables === undefined ? ['getStashes'] : ['getStashes', variables];
export const useInfiniteGetStashesQuery = <TData = GetStashesQuery, TError = unknown>(
  variables?: GetStashesQueryVariables,
  options?: UseInfiniteQueryOptions<GetStashesQuery, TError, TData>
) => {
  const query = useFetchNewData<GetStashesQuery, GetStashesQueryVariables>(GetStashesDocument);
  return useInfiniteQuery<GetStashesQuery, TError, TData>(
    variables === undefined ? ['getStashes.infinite'] : ['getStashes.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetStashesQuery.getKey = (variables?: GetStashesQueryVariables) =>
  variables === undefined ? ['getStashes.infinite'] : ['getStashes.infinite', variables];
export const GetStashMetadataDocument = `
    query getStashMetadata {
  me {
    wallet {
      stash {
        metadata {
          isMarketingCardFinished
          isStashEntryButtonInSpendAccountHidden
        }
      }
    }
  }
}
    `;
export const useGetStashMetadataQuery = <TData = GetStashMetadataQuery, TError = unknown>(
  variables?: GetStashMetadataQueryVariables,
  options?: UseQueryOptions<GetStashMetadataQuery, TError, TData>
) =>
  useQuery<GetStashMetadataQuery, TError, TData>(
    variables === undefined ? ['getStashMetadata'] : ['getStashMetadata', variables],
    useFetchNewData<GetStashMetadataQuery, GetStashMetadataQueryVariables>(GetStashMetadataDocument).bind(
      null,
      variables
    ),
    options
  );

useGetStashMetadataQuery.getKey = (variables?: GetStashMetadataQueryVariables) =>
  variables === undefined ? ['getStashMetadata'] : ['getStashMetadata', variables];
export const useInfiniteGetStashMetadataQuery = <TData = GetStashMetadataQuery, TError = unknown>(
  variables?: GetStashMetadataQueryVariables,
  options?: UseInfiniteQueryOptions<GetStashMetadataQuery, TError, TData>
) => {
  const query = useFetchNewData<GetStashMetadataQuery, GetStashMetadataQueryVariables>(GetStashMetadataDocument);
  return useInfiniteQuery<GetStashMetadataQuery, TError, TData>(
    variables === undefined ? ['getStashMetadata.infinite'] : ['getStashMetadata.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetStashMetadataQuery.getKey = (variables?: GetStashMetadataQueryVariables) =>
  variables === undefined ? ['getStashMetadata.infinite'] : ['getStashMetadata.infinite', variables];
export const GetStashTransactionsDocument = `
    query getStashTransactions($stashId: ID!, $limit: Int!, $offset: Int!) {
  me {
    wallet {
      stash {
        transactions(stashId: $stashId, limit: $limit, offset: $offset) {
          id
          amount {
            type
            sign
            units
            subUnits
          }
          transactionTimeUtc
        }
      }
    }
  }
}
    `;
export const useGetStashTransactionsQuery = <TData = GetStashTransactionsQuery, TError = unknown>(
  variables: GetStashTransactionsQueryVariables,
  options?: UseQueryOptions<GetStashTransactionsQuery, TError, TData>
) =>
  useQuery<GetStashTransactionsQuery, TError, TData>(
    ['getStashTransactions', variables],
    useFetchNewData<GetStashTransactionsQuery, GetStashTransactionsQueryVariables>(GetStashTransactionsDocument).bind(
      null,
      variables
    ),
    options
  );

useGetStashTransactionsQuery.getKey = (variables: GetStashTransactionsQueryVariables) => [
  'getStashTransactions',
  variables,
];
export const useInfiniteGetStashTransactionsQuery = <TData = GetStashTransactionsQuery, TError = unknown>(
  variables: GetStashTransactionsQueryVariables,
  options?: UseInfiniteQueryOptions<GetStashTransactionsQuery, TError, TData>
) => {
  const query = useFetchNewData<GetStashTransactionsQuery, GetStashTransactionsQueryVariables>(
    GetStashTransactionsDocument
  );
  return useInfiniteQuery<GetStashTransactionsQuery, TError, TData>(
    ['getStashTransactions.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetStashTransactionsQuery.getKey = (variables: GetStashTransactionsQueryVariables) => [
  'getStashTransactions.infinite',
  variables,
];
export const GetActiveSuperfundMembershipsDocument = `
    query GetActiveSuperfundMemberships {
  me {
    swagSuperfund {
      usi
    }
    orgs {
      id
      uuid
      name
      memberId
      memberUuid
      activeSuperfundMembership {
        usi
        abn
        fundChoice
        fundName
        memberNumber
        updatedAt
      }
    }
  }
}
    `;
export const useGetActiveSuperfundMembershipsQuery = <TData = GetActiveSuperfundMembershipsQuery, TError = unknown>(
  variables?: GetActiveSuperfundMembershipsQueryVariables,
  options?: UseQueryOptions<GetActiveSuperfundMembershipsQuery, TError, TData>
) =>
  useQuery<GetActiveSuperfundMembershipsQuery, TError, TData>(
    variables === undefined ? ['GetActiveSuperfundMemberships'] : ['GetActiveSuperfundMemberships', variables],
    useFetchNewData<GetActiveSuperfundMembershipsQuery, GetActiveSuperfundMembershipsQueryVariables>(
      GetActiveSuperfundMembershipsDocument
    ).bind(null, variables),
    options
  );

useGetActiveSuperfundMembershipsQuery.getKey = (variables?: GetActiveSuperfundMembershipsQueryVariables) =>
  variables === undefined ? ['GetActiveSuperfundMemberships'] : ['GetActiveSuperfundMemberships', variables];
export const useInfiniteGetActiveSuperfundMembershipsQuery = <
  TData = GetActiveSuperfundMembershipsQuery,
  TError = unknown
>(
  variables?: GetActiveSuperfundMembershipsQueryVariables,
  options?: UseInfiniteQueryOptions<GetActiveSuperfundMembershipsQuery, TError, TData>
) => {
  const query = useFetchNewData<GetActiveSuperfundMembershipsQuery, GetActiveSuperfundMembershipsQueryVariables>(
    GetActiveSuperfundMembershipsDocument
  );
  return useInfiniteQuery<GetActiveSuperfundMembershipsQuery, TError, TData>(
    variables === undefined
      ? ['GetActiveSuperfundMemberships.infinite']
      : ['GetActiveSuperfundMemberships.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetActiveSuperfundMembershipsQuery.getKey = (variables?: GetActiveSuperfundMembershipsQueryVariables) =>
  variables === undefined
    ? ['GetActiveSuperfundMemberships.infinite']
    : ['GetActiveSuperfundMemberships.infinite', variables];
export const GetSwagSuperfundAndSuperContributionDocument = `
    query GetSwagSuperfundAndSuperContribution {
  me {
    id
    swagSuperfund {
      id
      fundName
      memberNumber
      abn
      usi
      fundChoice
      superfundFeatureFlag {
        consolidationSupported
      }
      superfundMetadata {
        externalLink
      }
    }
    activeSuperContribution {
      id
      membershipId
      contributionType
      contributionValue
      preserveAmount
      status
      startDate
      endDate
    }
  }
}
    `;
export const useGetSwagSuperfundAndSuperContributionQuery = <
  TData = GetSwagSuperfundAndSuperContributionQuery,
  TError = unknown
>(
  variables?: GetSwagSuperfundAndSuperContributionQueryVariables,
  options?: UseQueryOptions<GetSwagSuperfundAndSuperContributionQuery, TError, TData>
) =>
  useQuery<GetSwagSuperfundAndSuperContributionQuery, TError, TData>(
    variables === undefined
      ? ['GetSwagSuperfundAndSuperContribution']
      : ['GetSwagSuperfundAndSuperContribution', variables],
    useFetchNewData<GetSwagSuperfundAndSuperContributionQuery, GetSwagSuperfundAndSuperContributionQueryVariables>(
      GetSwagSuperfundAndSuperContributionDocument
    ).bind(null, variables),
    options
  );

useGetSwagSuperfundAndSuperContributionQuery.getKey = (
  variables?: GetSwagSuperfundAndSuperContributionQueryVariables
) =>
  variables === undefined
    ? ['GetSwagSuperfundAndSuperContribution']
    : ['GetSwagSuperfundAndSuperContribution', variables];
export const useInfiniteGetSwagSuperfundAndSuperContributionQuery = <
  TData = GetSwagSuperfundAndSuperContributionQuery,
  TError = unknown
>(
  variables?: GetSwagSuperfundAndSuperContributionQueryVariables,
  options?: UseInfiniteQueryOptions<GetSwagSuperfundAndSuperContributionQuery, TError, TData>
) => {
  const query = useFetchNewData<
    GetSwagSuperfundAndSuperContributionQuery,
    GetSwagSuperfundAndSuperContributionQueryVariables
  >(GetSwagSuperfundAndSuperContributionDocument);
  return useInfiniteQuery<GetSwagSuperfundAndSuperContributionQuery, TError, TData>(
    variables === undefined
      ? ['GetSwagSuperfundAndSuperContribution.infinite']
      : ['GetSwagSuperfundAndSuperContribution.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetSwagSuperfundAndSuperContributionQuery.getKey = (
  variables?: GetSwagSuperfundAndSuperContributionQueryVariables
) =>
  variables === undefined
    ? ['GetSwagSuperfundAndSuperContribution.infinite']
    : ['GetSwagSuperfundAndSuperContribution.infinite', variables];
export const GetSuperContributionsDocument = `
    query GetSuperContributions($statusIn: [SuperContributionStatus]) {
  me {
    orgs {
      memberUuid
      name
    }
    superContributions(statusIn: $statusIn) {
      id
      membershipId
      contributionType
      contributionValue
      preserveAmount
      status
      startDate
      endDate
      acknowledgedNoContributionTracking
    }
  }
}
    `;
export const useGetSuperContributionsQuery = <TData = GetSuperContributionsQuery, TError = unknown>(
  variables?: GetSuperContributionsQueryVariables,
  options?: UseQueryOptions<GetSuperContributionsQuery, TError, TData>
) =>
  useQuery<GetSuperContributionsQuery, TError, TData>(
    variables === undefined ? ['GetSuperContributions'] : ['GetSuperContributions', variables],
    useFetchNewData<GetSuperContributionsQuery, GetSuperContributionsQueryVariables>(
      GetSuperContributionsDocument
    ).bind(null, variables),
    options
  );

useGetSuperContributionsQuery.getKey = (variables?: GetSuperContributionsQueryVariables) =>
  variables === undefined ? ['GetSuperContributions'] : ['GetSuperContributions', variables];
export const useInfiniteGetSuperContributionsQuery = <TData = GetSuperContributionsQuery, TError = unknown>(
  variables?: GetSuperContributionsQueryVariables,
  options?: UseInfiniteQueryOptions<GetSuperContributionsQuery, TError, TData>
) => {
  const query = useFetchNewData<GetSuperContributionsQuery, GetSuperContributionsQueryVariables>(
    GetSuperContributionsDocument
  );
  return useInfiniteQuery<GetSuperContributionsQuery, TError, TData>(
    variables === undefined ? ['GetSuperContributions.infinite'] : ['GetSuperContributions.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetSuperContributionsQuery.getKey = (variables?: GetSuperContributionsQueryVariables) =>
  variables === undefined ? ['GetSuperContributions.infinite'] : ['GetSuperContributions.infinite', variables];
export const GetSuperConsolidationDocument = `
    query GetSuperConsolidation($usi: String!) {
  me {
    superConsolidation(usi: $usi) {
      fundName
      memberNumber
      usi
      status
      updatedAt
      createdAt
    }
  }
}
    `;
export const useGetSuperConsolidationQuery = <TData = GetSuperConsolidationQuery, TError = unknown>(
  variables: GetSuperConsolidationQueryVariables,
  options?: UseQueryOptions<GetSuperConsolidationQuery, TError, TData>
) =>
  useQuery<GetSuperConsolidationQuery, TError, TData>(
    ['GetSuperConsolidation', variables],
    useFetchNewData<GetSuperConsolidationQuery, GetSuperConsolidationQueryVariables>(
      GetSuperConsolidationDocument
    ).bind(null, variables),
    options
  );

useGetSuperConsolidationQuery.getKey = (variables: GetSuperConsolidationQueryVariables) => [
  'GetSuperConsolidation',
  variables,
];
export const useInfiniteGetSuperConsolidationQuery = <TData = GetSuperConsolidationQuery, TError = unknown>(
  variables: GetSuperConsolidationQueryVariables,
  options?: UseInfiniteQueryOptions<GetSuperConsolidationQuery, TError, TData>
) => {
  const query = useFetchNewData<GetSuperConsolidationQuery, GetSuperConsolidationQueryVariables>(
    GetSuperConsolidationDocument
  );
  return useInfiniteQuery<GetSuperConsolidationQuery, TError, TData>(
    ['GetSuperConsolidation.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetSuperConsolidationQuery.getKey = (variables: GetSuperConsolidationQueryVariables) => [
  'GetSuperConsolidation.infinite',
  variables,
];
export const GetSuperConsolidationSupportRequestDocument = `
    query GetSuperConsolidationSupportRequest($usi: String!) {
  me {
    superConsolidationRequestSupport(usi: $usi) {
      usi
      updatedAt
      createdAt
      swagUserId
      ehUserId
    }
  }
}
    `;
export const useGetSuperConsolidationSupportRequestQuery = <
  TData = GetSuperConsolidationSupportRequestQuery,
  TError = unknown
>(
  variables: GetSuperConsolidationSupportRequestQueryVariables,
  options?: UseQueryOptions<GetSuperConsolidationSupportRequestQuery, TError, TData>
) =>
  useQuery<GetSuperConsolidationSupportRequestQuery, TError, TData>(
    ['GetSuperConsolidationSupportRequest', variables],
    useFetchNewData<GetSuperConsolidationSupportRequestQuery, GetSuperConsolidationSupportRequestQueryVariables>(
      GetSuperConsolidationSupportRequestDocument
    ).bind(null, variables),
    options
  );

useGetSuperConsolidationSupportRequestQuery.getKey = (variables: GetSuperConsolidationSupportRequestQueryVariables) => [
  'GetSuperConsolidationSupportRequest',
  variables,
];
export const useInfiniteGetSuperConsolidationSupportRequestQuery = <
  TData = GetSuperConsolidationSupportRequestQuery,
  TError = unknown
>(
  variables: GetSuperConsolidationSupportRequestQueryVariables,
  options?: UseInfiniteQueryOptions<GetSuperConsolidationSupportRequestQuery, TError, TData>
) => {
  const query = useFetchNewData<
    GetSuperConsolidationSupportRequestQuery,
    GetSuperConsolidationSupportRequestQueryVariables
  >(GetSuperConsolidationSupportRequestDocument);
  return useInfiniteQuery<GetSuperConsolidationSupportRequestQuery, TError, TData>(
    ['GetSuperConsolidationSupportRequest.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetSuperConsolidationSupportRequestQuery.getKey = (
  variables: GetSuperConsolidationSupportRequestQueryVariables
) => ['GetSuperConsolidationSupportRequest.infinite', variables];
export const CreateSwagSuperfundDocument = `
    mutation CreateSwagSuperfund($input: CreateSwagSuperfundInput) {
  createSwagSuperfund(input: $input) {
    superfund {
      memberNumber
      abn
      usi
      fundName
      fundChoice
    }
  }
}
    `;
export const useCreateSwagSuperfundMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<CreateSwagSuperfundMutation, TError, CreateSwagSuperfundMutationVariables, TContext>
) =>
  useMutation<CreateSwagSuperfundMutation, TError, CreateSwagSuperfundMutationVariables, TContext>(
    ['CreateSwagSuperfund'],
    useFetchNewData<CreateSwagSuperfundMutation, CreateSwagSuperfundMutationVariables>(CreateSwagSuperfundDocument),
    options
  );
export const SubmitSuperContributionDocument = `
    mutation SubmitSuperContribution($input: SubmitSuperContributionInput) {
  submitSuperContribution(input: $input) {
    contribution {
      contributionType
      contributionValue
      preserveAmount
      startDate
      endDate
    }
  }
}
    `;
export const useSubmitSuperContributionMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    SubmitSuperContributionMutation,
    TError,
    SubmitSuperContributionMutationVariables,
    TContext
  >
) =>
  useMutation<SubmitSuperContributionMutation, TError, SubmitSuperContributionMutationVariables, TContext>(
    ['SubmitSuperContribution'],
    useFetchNewData<SubmitSuperContributionMutation, SubmitSuperContributionMutationVariables>(
      SubmitSuperContributionDocument
    ),
    options
  );
export const StopContributionByContributionIdDocument = `
    mutation StopContributionByContributionId($id: String!) {
  stopContributionByContributionId(id: $id) {
    contribution {
      id
      status
      contributionType
      contributionValue
      preserveAmount
      startDate
      endDate
    }
  }
}
    `;
export const useStopContributionByContributionIdMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    StopContributionByContributionIdMutation,
    TError,
    StopContributionByContributionIdMutationVariables,
    TContext
  >
) =>
  useMutation<
    StopContributionByContributionIdMutation,
    TError,
    StopContributionByContributionIdMutationVariables,
    TContext
  >(
    ['StopContributionByContributionId'],
    useFetchNewData<StopContributionByContributionIdMutation, StopContributionByContributionIdMutationVariables>(
      StopContributionByContributionIdDocument
    ),
    options
  );
export const CreateSuperConsolidationDocument = `
    mutation CreateSuperConsolidation($input: CreateSuperConsolidationInput) {
  createSuperConsolidation(input: $input) {
    consolidation {
      fundName
      usi
      memberNumber
    }
  }
}
    `;
export const useCreateSuperConsolidationMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CreateSuperConsolidationMutation,
    TError,
    CreateSuperConsolidationMutationVariables,
    TContext
  >
) =>
  useMutation<CreateSuperConsolidationMutation, TError, CreateSuperConsolidationMutationVariables, TContext>(
    ['CreateSuperConsolidation'],
    useFetchNewData<CreateSuperConsolidationMutation, CreateSuperConsolidationMutationVariables>(
      CreateSuperConsolidationDocument
    ),
    options
  );
export const CreateSuperConsolidationSupportRequestDocument = `
    mutation CreateSuperConsolidationSupportRequest($usi: String!) {
  createSuperConsolidationRequestSupport(usi: $usi) {
    consolidationRequestSupport {
      usi
    }
  }
}
    `;
export const useCreateSuperConsolidationSupportRequestMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CreateSuperConsolidationSupportRequestMutation,
    TError,
    CreateSuperConsolidationSupportRequestMutationVariables,
    TContext
  >
) =>
  useMutation<
    CreateSuperConsolidationSupportRequestMutation,
    TError,
    CreateSuperConsolidationSupportRequestMutationVariables,
    TContext
  >(
    ['CreateSuperConsolidationSupportRequest'],
    useFetchNewData<
      CreateSuperConsolidationSupportRequestMutation,
      CreateSuperConsolidationSupportRequestMutationVariables
    >(CreateSuperConsolidationSupportRequestDocument),
    options
  );
export const CreateSsaComplaintTicketDocument = `
    mutation CreateSSAComplaintTicket($input: CreateSSAComplaintTicketInput) {
  createSSAComplaintTicket(input: $input) {
    success
  }
}
    `;
export const useCreateSsaComplaintTicketMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CreateSsaComplaintTicketMutation,
    TError,
    CreateSsaComplaintTicketMutationVariables,
    TContext
  >
) =>
  useMutation<CreateSsaComplaintTicketMutation, TError, CreateSsaComplaintTicketMutationVariables, TContext>(
    ['CreateSSAComplaintTicket'],
    useFetchNewData<CreateSsaComplaintTicketMutation, CreateSsaComplaintTicketMutationVariables>(
      CreateSsaComplaintTicketDocument
    ),
    options
  );
export const CreateComplaintTicketDocument = `
    mutation CreateComplaintTicket($input: CreateComplaintTicketInput) {
  createComplaintTicket(input: $input) {
    success
  }
}
    `;
export const useCreateComplaintTicketMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<CreateComplaintTicketMutation, TError, CreateComplaintTicketMutationVariables, TContext>
) =>
  useMutation<CreateComplaintTicketMutation, TError, CreateComplaintTicketMutationVariables, TContext>(
    ['CreateComplaintTicket'],
    useFetchNewData<CreateComplaintTicketMutation, CreateComplaintTicketMutationVariables>(
      CreateComplaintTicketDocument
    ),
    options
  );
export const GetBuyAgainGiftCardsDocument = `
    query GetBuyAgainGiftCards($input: SSBuyAgainGiftCardsInput!) {
  me {
    swagStore {
      buyAgainGiftCards(input: $input) {
        edges {
          node {
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
                __typename
              }
              product {
                url
                __typename
              }
              large {
                url
                __typename
              }
              __typename
            }
            storefrontImage {
              url
              small {
                url
                __typename
              }
              product {
                url
                __typename
              }
              large {
                url
                __typename
              }
              __typename
            }
            giftpayBalance
            productType
            description
            termsAndConditions
            country
            currency
            priceInPoints
            discountPriceInPoints
            __typename
          }
        }
        pageInfo {
          hasNextPage
          endCursor
          totalCount
          totalPages
        }
      }
    }
  }
}
    `;
export const useGetBuyAgainGiftCardsQuery = <TData = GetBuyAgainGiftCardsQuery, TError = unknown>(
  variables: GetBuyAgainGiftCardsQueryVariables,
  options?: UseQueryOptions<GetBuyAgainGiftCardsQuery, TError, TData>
) =>
  useQuery<GetBuyAgainGiftCardsQuery, TError, TData>(
    ['GetBuyAgainGiftCards', variables],
    useFetchNewData<GetBuyAgainGiftCardsQuery, GetBuyAgainGiftCardsQueryVariables>(GetBuyAgainGiftCardsDocument).bind(
      null,
      variables
    ),
    options
  );

useGetBuyAgainGiftCardsQuery.getKey = (variables: GetBuyAgainGiftCardsQueryVariables) => [
  'GetBuyAgainGiftCards',
  variables,
];
export const useInfiniteGetBuyAgainGiftCardsQuery = <TData = GetBuyAgainGiftCardsQuery, TError = unknown>(
  variables: GetBuyAgainGiftCardsQueryVariables,
  options?: UseInfiniteQueryOptions<GetBuyAgainGiftCardsQuery, TError, TData>
) => {
  const query = useFetchNewData<GetBuyAgainGiftCardsQuery, GetBuyAgainGiftCardsQueryVariables>(
    GetBuyAgainGiftCardsDocument
  );
  return useInfiniteQuery<GetBuyAgainGiftCardsQuery, TError, TData>(
    ['GetBuyAgainGiftCards.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetBuyAgainGiftCardsQuery.getKey = (variables: GetBuyAgainGiftCardsQueryVariables) => [
  'GetBuyAgainGiftCards.infinite',
  variables,
];
export const GetDiscountOrderHistoryDocument = `
    query GetDiscountOrderHistory($input: DiscountOrderHistoryInput!) {
  me {
    swagStore {
      discountOrderHistory(input: $input) {
        pageInfo {
          hasNextPage
          endCursor
          totalCount
          totalPages
        }
        edges {
          node {
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
                  __typename
                }
                purchaseId
                productVariantId
                fulfil {
                  id
                  isUsed
                  balance
                  __typename
                }
                __typename
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
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
        }
        __typename
      }
    }
  }
}
    `;
export const useGetDiscountOrderHistoryQuery = <TData = GetDiscountOrderHistoryQuery, TError = unknown>(
  variables: GetDiscountOrderHistoryQueryVariables,
  options?: UseQueryOptions<GetDiscountOrderHistoryQuery, TError, TData>
) =>
  useQuery<GetDiscountOrderHistoryQuery, TError, TData>(
    ['GetDiscountOrderHistory', variables],
    useFetchNewData<GetDiscountOrderHistoryQuery, GetDiscountOrderHistoryQueryVariables>(
      GetDiscountOrderHistoryDocument
    ).bind(null, variables),
    options
  );

useGetDiscountOrderHistoryQuery.getKey = (variables: GetDiscountOrderHistoryQueryVariables) => [
  'GetDiscountOrderHistory',
  variables,
];
export const useInfiniteGetDiscountOrderHistoryQuery = <TData = GetDiscountOrderHistoryQuery, TError = unknown>(
  variables: GetDiscountOrderHistoryQueryVariables,
  options?: UseInfiniteQueryOptions<GetDiscountOrderHistoryQuery, TError, TData>
) => {
  const query = useFetchNewData<GetDiscountOrderHistoryQuery, GetDiscountOrderHistoryQueryVariables>(
    GetDiscountOrderHistoryDocument
  );
  return useInfiniteQuery<GetDiscountOrderHistoryQuery, TError, TData>(
    ['GetDiscountOrderHistory.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetDiscountOrderHistoryQuery.getKey = (variables: GetDiscountOrderHistoryQueryVariables) => [
  'GetDiscountOrderHistory.infinite',
  variables,
];
export const GetSsAllOffersDocument = `
    query GetSSAllOffers($allOffersInput: SSAllOffersInput) {
  me {
    swagStore {
      allOffers(input: $allOffersInput) {
        edges {
          node {
            id
            name
            title
            price
            discountPrice
            serviceFee
            productCode
            imageUrl
            productType
            description
            termsAndConditions
            country
            currency
            priceInPoints
            discountPriceInPoints
          }
        }
        pageInfo {
          hasNextPage
          endCursor
          totalCount
          totalPages
        }
        error {
          message
        }
      }
    }
  }
}
    `;
export const useGetSsAllOffersQuery = <TData = GetSsAllOffersQuery, TError = unknown>(
  variables?: GetSsAllOffersQueryVariables,
  options?: UseQueryOptions<GetSsAllOffersQuery, TError, TData>
) =>
  useQuery<GetSsAllOffersQuery, TError, TData>(
    variables === undefined ? ['GetSSAllOffers'] : ['GetSSAllOffers', variables],
    useFetchNewData<GetSsAllOffersQuery, GetSsAllOffersQueryVariables>(GetSsAllOffersDocument).bind(null, variables),
    options
  );

useGetSsAllOffersQuery.getKey = (variables?: GetSsAllOffersQueryVariables) =>
  variables === undefined ? ['GetSSAllOffers'] : ['GetSSAllOffers', variables];
export const useInfiniteGetSsAllOffersQuery = <TData = GetSsAllOffersQuery, TError = unknown>(
  variables?: GetSsAllOffersQueryVariables,
  options?: UseInfiniteQueryOptions<GetSsAllOffersQuery, TError, TData>
) => {
  const query = useFetchNewData<GetSsAllOffersQuery, GetSsAllOffersQueryVariables>(GetSsAllOffersDocument);
  return useInfiniteQuery<GetSsAllOffersQuery, TError, TData>(
    variables === undefined ? ['GetSSAllOffers.infinite'] : ['GetSSAllOffers.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetSsAllOffersQuery.getKey = (variables?: GetSsAllOffersQueryVariables) =>
  variables === undefined ? ['GetSSAllOffers.infinite'] : ['GetSSAllOffers.infinite', variables];
export const GetStripePublishableKeyDocument = `
    query GetStripePublishableKey($input: StripePublishableKeyInput!) {
  me {
    swagStore {
      stripePublishableKey(input: $input) {
        publishableKey
        __typename
      }
    }
  }
}
    `;
export const useGetStripePublishableKeyQuery = <TData = GetStripePublishableKeyQuery, TError = unknown>(
  variables: GetStripePublishableKeyQueryVariables,
  options?: UseQueryOptions<GetStripePublishableKeyQuery, TError, TData>
) =>
  useQuery<GetStripePublishableKeyQuery, TError, TData>(
    ['GetStripePublishableKey', variables],
    useFetchNewData<GetStripePublishableKeyQuery, GetStripePublishableKeyQueryVariables>(
      GetStripePublishableKeyDocument
    ).bind(null, variables),
    options
  );

useGetStripePublishableKeyQuery.getKey = (variables: GetStripePublishableKeyQueryVariables) => [
  'GetStripePublishableKey',
  variables,
];
export const useInfiniteGetStripePublishableKeyQuery = <TData = GetStripePublishableKeyQuery, TError = unknown>(
  variables: GetStripePublishableKeyQueryVariables,
  options?: UseInfiniteQueryOptions<GetStripePublishableKeyQuery, TError, TData>
) => {
  const query = useFetchNewData<GetStripePublishableKeyQuery, GetStripePublishableKeyQueryVariables>(
    GetStripePublishableKeyDocument
  );
  return useInfiniteQuery<GetStripePublishableKeyQuery, TError, TData>(
    ['GetStripePublishableKey.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetStripePublishableKeyQuery.getKey = (variables: GetStripePublishableKeyQueryVariables) => [
  'GetStripePublishableKey.infinite',
  variables,
];
export const GetDiscountShopProductDetailDocument = `
    query GetDiscountShopProductDetail($input: DiscountShopProductDetailsInput!) {
  me {
    swagStore {
      discountShopProductDetails(input: $input) {
        product {
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
              __typename
            }
            product {
              url
              __typename
            }
            large {
              url
              __typename
            }
            __typename
          }
          storefrontImage {
            url
            small {
              url
              __typename
            }
            product {
              url
              __typename
            }
            large {
              url
              __typename
            }
            __typename
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
              __typename
            }
            product {
              url
              __typename
            }
            large {
              url
              __typename
            }
            __typename
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
            __typename
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
            __typename
          }
          country
          currency
          priceInPoints
          discountPriceInPoints
          __typename
        }
      }
    }
  }
}
    `;
export const useGetDiscountShopProductDetailQuery = <TData = GetDiscountShopProductDetailQuery, TError = unknown>(
  variables: GetDiscountShopProductDetailQueryVariables,
  options?: UseQueryOptions<GetDiscountShopProductDetailQuery, TError, TData>
) =>
  useQuery<GetDiscountShopProductDetailQuery, TError, TData>(
    ['GetDiscountShopProductDetail', variables],
    useFetchNewData<GetDiscountShopProductDetailQuery, GetDiscountShopProductDetailQueryVariables>(
      GetDiscountShopProductDetailDocument
    ).bind(null, variables),
    options
  );

useGetDiscountShopProductDetailQuery.getKey = (variables: GetDiscountShopProductDetailQueryVariables) => [
  'GetDiscountShopProductDetail',
  variables,
];
export const useInfiniteGetDiscountShopProductDetailQuery = <
  TData = GetDiscountShopProductDetailQuery,
  TError = unknown
>(
  variables: GetDiscountShopProductDetailQueryVariables,
  options?: UseInfiniteQueryOptions<GetDiscountShopProductDetailQuery, TError, TData>
) => {
  const query = useFetchNewData<GetDiscountShopProductDetailQuery, GetDiscountShopProductDetailQueryVariables>(
    GetDiscountShopProductDetailDocument
  );
  return useInfiniteQuery<GetDiscountShopProductDetailQuery, TError, TData>(
    ['GetDiscountShopProductDetail.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetDiscountShopProductDetailQuery.getKey = (variables: GetDiscountShopProductDetailQueryVariables) => [
  'GetDiscountShopProductDetail.infinite',
  variables,
];
export const GetNoOrgPermissionsDocument = `
    query GetNoOrgPermissions($candidate: Boolean!) {
  me {
    noOrgPermissions(isCandidate: $candidate) {
      instapay {
        view
      }
      heroPoints {
        view
      }
      superAppBenefits {
        view
      }
      superAppHome {
        view
      }
      superAppWallet {
        view
      }
      superAppSettings {
        view
      }
      superAppCashback {
        view
      }
      superAppBenefitsFeaturedOffers {
        view
      }
      superAppCashbackCategories {
        view
      }
      superAppInstoreOffer {
        view
      }
      ebenApplePay {
        view
      }
      ebenGooglePay {
        view
      }
      ebenDevHeroDollarPayment {
        view
      }
      ebenCashbackStoreList {
        view
      }
      pillar_money {
        view
      }
      pillar_benefits {
        view
      }
      eben_money_pillar_black_list {
        view
      }
      eben_benefits_pillar_black_list {
        view
      }
      ebenStorePopularList {
        view
      }
      ebenStoreBuyAgainCarousel {
        view
      }
      superChoiceSwag {
        view
      }
      customFundAssetSwag {
        view
      }
      superConsolidation {
        view
      }
      ebenServiceFee {
        view
      }
      eBenSpendHeroDollarsOnSwagCard {
        view
      }
      eBenStash {
        view
      }
      eBenWhitelistedUkMoney {
        view
      }
      eBenWhitelistedUkBenefits {
        view
      }
      superSalarySacrifice {
        view
      }
      skipMegaDealsSurvey {
        view
      }
      toggleMegaDealsMVPCta {
        view
      }
      toggleMegaDealsCommunitiesCtas {
        view
      }
      benefitsStripePaymentCheckout {
        view
      }
      instapay2Alpha {
        view
      }
      benefitsBillStreaming {
        view
      }
      benefitsForceUpdate {
        view
      }
      benefitsStoreAppUK {
        view
      }
      billStreamingWaitlist {
        view
      }
      benefitsPillarHomepage {
        view
      }
      internationalBenefitsRefused {
        view
      }
      benefitsXmas23Cashback {
        view
      }
      cashbackDashboardV2 {
        view
      }
      seOfferTiles {
        view
      }
      eBenMoneyScheduledPayment {
        view
      }
      eBenSwagInterestBearingAccountExperiment {
        view
      }
      eBenPayeeAddressBook {
        view
      }
      benefitsIAv2 {
        view
      }
      ebenInstapayNowSimplifiedExperiment {
        view
      }
      rostersInstapayExperiment {
        view
      }
      timesheetsInstapayExperiment {
        view
      }
      customSurveyInstapayExperiment {
        view
      }
      payslipsExperimentInstapay {
        view
      }
      payslipsExperimentBudgeting {
        view
      }
      benefitsBillAhmPromoTile {
        view
      }
      benefitsBillMedibankPromoTile {
        view
      }
      benefitsFitnessFirst {
        view
      }
      benefitsGoodlifeFitness {
        view
      }
    }
  }
}
    `;
export const useGetNoOrgPermissionsQuery = <TData = GetNoOrgPermissionsQuery, TError = unknown>(
  variables: GetNoOrgPermissionsQueryVariables,
  options?: UseQueryOptions<GetNoOrgPermissionsQuery, TError, TData>
) =>
  useQuery<GetNoOrgPermissionsQuery, TError, TData>(
    ['GetNoOrgPermissions', variables],
    useFetchNewData<GetNoOrgPermissionsQuery, GetNoOrgPermissionsQueryVariables>(GetNoOrgPermissionsDocument).bind(
      null,
      variables
    ),
    options
  );

useGetNoOrgPermissionsQuery.getKey = (variables: GetNoOrgPermissionsQueryVariables) => [
  'GetNoOrgPermissions',
  variables,
];
export const useInfiniteGetNoOrgPermissionsQuery = <TData = GetNoOrgPermissionsQuery, TError = unknown>(
  variables: GetNoOrgPermissionsQueryVariables,
  options?: UseInfiniteQueryOptions<GetNoOrgPermissionsQuery, TError, TData>
) => {
  const query = useFetchNewData<GetNoOrgPermissionsQuery, GetNoOrgPermissionsQueryVariables>(
    GetNoOrgPermissionsDocument
  );
  return useInfiniteQuery<GetNoOrgPermissionsQuery, TError, TData>(
    ['GetNoOrgPermissions.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetNoOrgPermissionsQuery.getKey = (variables: GetNoOrgPermissionsQueryVariables) => [
  'GetNoOrgPermissions.infinite',
  variables,
];
export const GetCurrentUserDocument = `
    query GetCurrentUser {
  me {
    details {
      firstName
      lastName
      middleName
      dateOfBirth
      email
      mailingAddress {
        region
        country
        longForm
        streetNumber
        streetName
        streetType
        unitNumber
        postcode
        townOrCity
      }
      residentialAddress {
        region
        country
        longForm
        streetNumber
        streetName
        streetType
        unitNumber
        postcode
        townOrCity
      }
      phoneNumber {
        countryCode
        number
      }
    }
  }
}
    `;
export const useGetCurrentUserQuery = <TData = GetCurrentUserQuery, TError = unknown>(
  variables?: GetCurrentUserQueryVariables,
  options?: UseQueryOptions<GetCurrentUserQuery, TError, TData>
) =>
  useQuery<GetCurrentUserQuery, TError, TData>(
    variables === undefined ? ['GetCurrentUser'] : ['GetCurrentUser', variables],
    useFetchNewData<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument).bind(null, variables),
    options
  );

useGetCurrentUserQuery.getKey = (variables?: GetCurrentUserQueryVariables) =>
  variables === undefined ? ['GetCurrentUser'] : ['GetCurrentUser', variables];
export const useInfiniteGetCurrentUserQuery = <TData = GetCurrentUserQuery, TError = unknown>(
  variables?: GetCurrentUserQueryVariables,
  options?: UseInfiniteQueryOptions<GetCurrentUserQuery, TError, TData>
) => {
  const query = useFetchNewData<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument);
  return useInfiniteQuery<GetCurrentUserQuery, TError, TData>(
    variables === undefined ? ['GetCurrentUser.infinite'] : ['GetCurrentUser.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetCurrentUserQuery.getKey = (variables?: GetCurrentUserQueryVariables) =>
  variables === undefined ? ['GetCurrentUser.infinite'] : ['GetCurrentUser.infinite', variables];
export const GetEhUserInitializationDetailsDocument = `
    query GetEHUserInitializationDetails($orgId: String) {
  me {
    eHUserInitializationDetails(orgId: $orgId) {
      user {
        firstName
        lastName
        middleName
        dateOfBirth
        address {
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
      }
      error {
        message
      }
    }
  }
}
    `;
export const useGetEhUserInitializationDetailsQuery = <TData = GetEhUserInitializationDetailsQuery, TError = unknown>(
  variables?: GetEhUserInitializationDetailsQueryVariables,
  options?: UseQueryOptions<GetEhUserInitializationDetailsQuery, TError, TData>
) =>
  useQuery<GetEhUserInitializationDetailsQuery, TError, TData>(
    variables === undefined ? ['GetEHUserInitializationDetails'] : ['GetEHUserInitializationDetails', variables],
    useFetchNewData<GetEhUserInitializationDetailsQuery, GetEhUserInitializationDetailsQueryVariables>(
      GetEhUserInitializationDetailsDocument
    ).bind(null, variables),
    options
  );

useGetEhUserInitializationDetailsQuery.getKey = (variables?: GetEhUserInitializationDetailsQueryVariables) =>
  variables === undefined ? ['GetEHUserInitializationDetails'] : ['GetEHUserInitializationDetails', variables];
export const useInfiniteGetEhUserInitializationDetailsQuery = <
  TData = GetEhUserInitializationDetailsQuery,
  TError = unknown
>(
  variables?: GetEhUserInitializationDetailsQueryVariables,
  options?: UseInfiniteQueryOptions<GetEhUserInitializationDetailsQuery, TError, TData>
) => {
  const query = useFetchNewData<GetEhUserInitializationDetailsQuery, GetEhUserInitializationDetailsQueryVariables>(
    GetEhUserInitializationDetailsDocument
  );
  return useInfiniteQuery<GetEhUserInitializationDetailsQuery, TError, TData>(
    variables === undefined
      ? ['GetEHUserInitializationDetails.infinite']
      : ['GetEHUserInitializationDetails.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetEhUserInitializationDetailsQuery.getKey = (variables?: GetEhUserInitializationDetailsQueryVariables) =>
  variables === undefined
    ? ['GetEHUserInitializationDetails.infinite']
    : ['GetEHUserInitializationDetails.infinite', variables];
export const GetKpUserInitializationDetailsDocument = `
    query GetKPUserInitializationDetails {
  me {
    kpUserInitializationDetails {
      user {
        firstName
        lastName
        middleName
        dateOfBirth
        address {
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
      }
      error {
        message
      }
    }
  }
}
    `;
export const useGetKpUserInitializationDetailsQuery = <TData = GetKpUserInitializationDetailsQuery, TError = unknown>(
  variables?: GetKpUserInitializationDetailsQueryVariables,
  options?: UseQueryOptions<GetKpUserInitializationDetailsQuery, TError, TData>
) =>
  useQuery<GetKpUserInitializationDetailsQuery, TError, TData>(
    variables === undefined ? ['GetKPUserInitializationDetails'] : ['GetKPUserInitializationDetails', variables],
    useFetchNewData<GetKpUserInitializationDetailsQuery, GetKpUserInitializationDetailsQueryVariables>(
      GetKpUserInitializationDetailsDocument
    ).bind(null, variables),
    options
  );

useGetKpUserInitializationDetailsQuery.getKey = (variables?: GetKpUserInitializationDetailsQueryVariables) =>
  variables === undefined ? ['GetKPUserInitializationDetails'] : ['GetKPUserInitializationDetails', variables];
export const useInfiniteGetKpUserInitializationDetailsQuery = <
  TData = GetKpUserInitializationDetailsQuery,
  TError = unknown
>(
  variables?: GetKpUserInitializationDetailsQueryVariables,
  options?: UseInfiniteQueryOptions<GetKpUserInitializationDetailsQuery, TError, TData>
) => {
  const query = useFetchNewData<GetKpUserInitializationDetailsQuery, GetKpUserInitializationDetailsQueryVariables>(
    GetKpUserInitializationDetailsDocument
  );
  return useInfiniteQuery<GetKpUserInitializationDetailsQuery, TError, TData>(
    variables === undefined
      ? ['GetKPUserInitializationDetails.infinite']
      : ['GetKPUserInitializationDetails.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetKpUserInitializationDetailsQuery.getKey = (variables?: GetKpUserInitializationDetailsQueryVariables) =>
  variables === undefined
    ? ['GetKPUserInitializationDetails.infinite']
    : ['GetKPUserInitializationDetails.infinite', variables];
export const GetMoneyProfileDocument = `
    query GetMoneyProfile {
  me {
    profileChangeRequests {
      requests {
        dateOfBirth
        createdAt
        name {
          firstName
          lastName
          middleName
        }
        type
      }
      error {
        message
      }
    }
    details {
      firstName
      lastName
      middleName
      dateOfBirth
      email
      mailingAddress {
        region
        country
        longForm
        streetNumber
        streetName
        streetType
        unitNumber
        postcode
        townOrCity
      }
      residentialAddress {
        region
        country
        longForm
        streetNumber
        streetName
        streetType
        unitNumber
        postcode
        townOrCity
      }
      phoneNumber {
        countryCode
        number
      }
    }
  }
}
    `;
export const useGetMoneyProfileQuery = <TData = GetMoneyProfileQuery, TError = unknown>(
  variables?: GetMoneyProfileQueryVariables,
  options?: UseQueryOptions<GetMoneyProfileQuery, TError, TData>
) =>
  useQuery<GetMoneyProfileQuery, TError, TData>(
    variables === undefined ? ['GetMoneyProfile'] : ['GetMoneyProfile', variables],
    useFetchNewData<GetMoneyProfileQuery, GetMoneyProfileQueryVariables>(GetMoneyProfileDocument).bind(null, variables),
    options
  );

useGetMoneyProfileQuery.getKey = (variables?: GetMoneyProfileQueryVariables) =>
  variables === undefined ? ['GetMoneyProfile'] : ['GetMoneyProfile', variables];
export const useInfiniteGetMoneyProfileQuery = <TData = GetMoneyProfileQuery, TError = unknown>(
  variables?: GetMoneyProfileQueryVariables,
  options?: UseInfiniteQueryOptions<GetMoneyProfileQuery, TError, TData>
) => {
  const query = useFetchNewData<GetMoneyProfileQuery, GetMoneyProfileQueryVariables>(GetMoneyProfileDocument);
  return useInfiniteQuery<GetMoneyProfileQuery, TError, TData>(
    variables === undefined ? ['GetMoneyProfile.infinite'] : ['GetMoneyProfile.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetMoneyProfileQuery.getKey = (variables?: GetMoneyProfileQueryVariables) =>
  variables === undefined ? ['GetMoneyProfile.infinite'] : ['GetMoneyProfile.infinite', variables];
export const MinSupportVersionDocument = `
    query MinSupportVersion {
  me {
    minSupportVersion {
      benefits {
        minSupportAppVersion
      }
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
    useFetchNewData<MinSupportVersionQuery, MinSupportVersionQueryVariables>(MinSupportVersionDocument).bind(
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
  const query = useFetchNewData<MinSupportVersionQuery, MinSupportVersionQueryVariables>(MinSupportVersionDocument);
  return useInfiniteQuery<MinSupportVersionQuery, TError, TData>(
    variables === undefined ? ['MinSupportVersion.infinite'] : ['MinSupportVersion.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteMinSupportVersionQuery.getKey = (variables?: MinSupportVersionQueryVariables) =>
  variables === undefined ? ['MinSupportVersion.infinite'] : ['MinSupportVersion.infinite', variables];
export const UserPermissionDocument = `
    query UserPermission($permissionRequest: UserPermissionInput!) {
  me {
    userPermission(permissionRequest: $permissionRequest) {
      permissions {
        name
        enabled
      }
      error {
        message
      }
    }
  }
}
    `;
export const useUserPermissionQuery = <TData = UserPermissionQuery, TError = unknown>(
  variables: UserPermissionQueryVariables,
  options?: UseQueryOptions<UserPermissionQuery, TError, TData>
) =>
  useQuery<UserPermissionQuery, TError, TData>(
    ['UserPermission', variables],
    useFetchNewData<UserPermissionQuery, UserPermissionQueryVariables>(UserPermissionDocument).bind(null, variables),
    options
  );

useUserPermissionQuery.getKey = (variables: UserPermissionQueryVariables) => ['UserPermission', variables];
export const useInfiniteUserPermissionQuery = <TData = UserPermissionQuery, TError = unknown>(
  variables: UserPermissionQueryVariables,
  options?: UseInfiniteQueryOptions<UserPermissionQuery, TError, TData>
) => {
  const query = useFetchNewData<UserPermissionQuery, UserPermissionQueryVariables>(UserPermissionDocument);
  return useInfiniteQuery<UserPermissionQuery, TError, TData>(
    ['UserPermission.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteUserPermissionQuery.getKey = (variables: UserPermissionQueryVariables) => [
  'UserPermission.infinite',
  variables,
];
export const UpdateMailingAddressDocument = `
    mutation UpdateMailingAddress($input: UserAddressInput!) {
  user {
    updateMailingAddress(input: $input)
  }
}
    `;
export const useUpdateMailingAddressMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<UpdateMailingAddressMutation, TError, UpdateMailingAddressMutationVariables, TContext>
) =>
  useMutation<UpdateMailingAddressMutation, TError, UpdateMailingAddressMutationVariables, TContext>(
    ['UpdateMailingAddress'],
    useFetchNewData<UpdateMailingAddressMutation, UpdateMailingAddressMutationVariables>(UpdateMailingAddressDocument),
    options
  );
export const PatchProfileDocument = `
    mutation PatchProfile($patch: EhProfilePatchInput!) {
  user {
    patchProfile(input: $patch) {
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
}
    `;
export const usePatchProfileMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<PatchProfileMutation, TError, PatchProfileMutationVariables, TContext>
) =>
  useMutation<PatchProfileMutation, TError, PatchProfileMutationVariables, TContext>(
    ['PatchProfile'],
    useFetchNewData<PatchProfileMutation, PatchProfileMutationVariables>(PatchProfileDocument),
    options
  );
export const StartUkWalletCreationDocument = `
    mutation StartUkWalletCreation($input: StartUKWalletCreationInput!) {
  startUKWalletCreation(input: $input) {
    success
  }
}
    `;
export const useStartUkWalletCreationMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<StartUkWalletCreationMutation, TError, StartUkWalletCreationMutationVariables, TContext>
) =>
  useMutation<StartUkWalletCreationMutation, TError, StartUkWalletCreationMutationVariables, TContext>(
    ['StartUkWalletCreation'],
    useFetchNewData<StartUkWalletCreationMutation, StartUkWalletCreationMutationVariables>(
      StartUkWalletCreationDocument
    ),
    options
  );
export const StartUkKycDocument = `
    mutation StartUkKYC {
  startUKKYC {
    reference
  }
}
    `;
export const useStartUkKycMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<StartUkKycMutation, TError, StartUkKycMutationVariables, TContext>
) =>
  useMutation<StartUkKycMutation, TError, StartUkKycMutationVariables, TContext>(
    ['StartUkKYC'],
    useFetchNewData<StartUkKycMutation, StartUkKycMutationVariables>(StartUkKycDocument),
    options
  );
export const GetUkTokenDocument = `
    query GetUKToken {
  me {
    wallet {
      UKToken {
        userToken
      }
    }
  }
}
    `;
export const useGetUkTokenQuery = <TData = GetUkTokenQuery, TError = unknown>(
  variables?: GetUkTokenQueryVariables,
  options?: UseQueryOptions<GetUkTokenQuery, TError, TData>
) =>
  useQuery<GetUkTokenQuery, TError, TData>(
    variables === undefined ? ['GetUKToken'] : ['GetUKToken', variables],
    useFetchNewData<GetUkTokenQuery, GetUkTokenQueryVariables>(GetUkTokenDocument).bind(null, variables),
    options
  );

useGetUkTokenQuery.getKey = (variables?: GetUkTokenQueryVariables) =>
  variables === undefined ? ['GetUKToken'] : ['GetUKToken', variables];
export const useInfiniteGetUkTokenQuery = <TData = GetUkTokenQuery, TError = unknown>(
  variables?: GetUkTokenQueryVariables,
  options?: UseInfiniteQueryOptions<GetUkTokenQuery, TError, TData>
) => {
  const query = useFetchNewData<GetUkTokenQuery, GetUkTokenQueryVariables>(GetUkTokenDocument);
  return useInfiniteQuery<GetUkTokenQuery, TError, TData>(
    variables === undefined ? ['GetUKToken.infinite'] : ['GetUKToken.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetUkTokenQuery.getKey = (variables?: GetUkTokenQueryVariables) =>
  variables === undefined ? ['GetUKToken.infinite'] : ['GetUKToken.infinite', variables];
export const CreateUkCardDocument = `
    mutation CreateUKCard($input: CreateUKCardInput!, $accessToken: String!) {
  createUKCard(input: $input, accessToken: $accessToken) {
    cardId
  }
}
    `;
export const useCreateUkCardMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<CreateUkCardMutation, TError, CreateUkCardMutationVariables, TContext>
) =>
  useMutation<CreateUkCardMutation, TError, CreateUkCardMutationVariables, TContext>(
    ['CreateUKCard'],
    useFetchNewData<CreateUkCardMutation, CreateUkCardMutationVariables>(CreateUkCardDocument),
    options
  );
export const GetEWalletUkAccountDetailsDocument = `
    query GetEWalletUKAccountDetails {
  me {
    wallet {
      UKWalletDetails {
        accountName
        currency
        totalBalance
        availableBalance
        accountNumber
        sortCode
        cardId
      }
    }
  }
}
    `;
export const useGetEWalletUkAccountDetailsQuery = <TData = GetEWalletUkAccountDetailsQuery, TError = unknown>(
  variables?: GetEWalletUkAccountDetailsQueryVariables,
  options?: UseQueryOptions<GetEWalletUkAccountDetailsQuery, TError, TData>
) =>
  useQuery<GetEWalletUkAccountDetailsQuery, TError, TData>(
    variables === undefined ? ['GetEWalletUKAccountDetails'] : ['GetEWalletUKAccountDetails', variables],
    useFetchNewData<GetEWalletUkAccountDetailsQuery, GetEWalletUkAccountDetailsQueryVariables>(
      GetEWalletUkAccountDetailsDocument
    ).bind(null, variables),
    options
  );

useGetEWalletUkAccountDetailsQuery.getKey = (variables?: GetEWalletUkAccountDetailsQueryVariables) =>
  variables === undefined ? ['GetEWalletUKAccountDetails'] : ['GetEWalletUKAccountDetails', variables];
export const useInfiniteGetEWalletUkAccountDetailsQuery = <TData = GetEWalletUkAccountDetailsQuery, TError = unknown>(
  variables?: GetEWalletUkAccountDetailsQueryVariables,
  options?: UseInfiniteQueryOptions<GetEWalletUkAccountDetailsQuery, TError, TData>
) => {
  const query = useFetchNewData<GetEWalletUkAccountDetailsQuery, GetEWalletUkAccountDetailsQueryVariables>(
    GetEWalletUkAccountDetailsDocument
  );
  return useInfiniteQuery<GetEWalletUkAccountDetailsQuery, TError, TData>(
    variables === undefined
      ? ['GetEWalletUKAccountDetails.infinite']
      : ['GetEWalletUKAccountDetails.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetEWalletUkAccountDetailsQuery.getKey = (variables?: GetEWalletUkAccountDetailsQueryVariables) =>
  variables === undefined
    ? ['GetEWalletUKAccountDetails.infinite']
    : ['GetEWalletUKAccountDetails.infinite', variables];
export const GetEWalletAuAccountDetailsDocument = `
    query GetEWalletAUAccountDetails {
  me {
    wallet {
      details {
        accountNumber
        bsb
        name
        availableBalance {
          type
          sign
          units
          subUnits
        }
      }
    }
  }
}
    `;
export const useGetEWalletAuAccountDetailsQuery = <TData = GetEWalletAuAccountDetailsQuery, TError = unknown>(
  variables?: GetEWalletAuAccountDetailsQueryVariables,
  options?: UseQueryOptions<GetEWalletAuAccountDetailsQuery, TError, TData>
) =>
  useQuery<GetEWalletAuAccountDetailsQuery, TError, TData>(
    variables === undefined ? ['GetEWalletAUAccountDetails'] : ['GetEWalletAUAccountDetails', variables],
    useFetchNewData<GetEWalletAuAccountDetailsQuery, GetEWalletAuAccountDetailsQueryVariables>(
      GetEWalletAuAccountDetailsDocument
    ).bind(null, variables),
    options
  );

useGetEWalletAuAccountDetailsQuery.getKey = (variables?: GetEWalletAuAccountDetailsQueryVariables) =>
  variables === undefined ? ['GetEWalletAUAccountDetails'] : ['GetEWalletAUAccountDetails', variables];
export const useInfiniteGetEWalletAuAccountDetailsQuery = <TData = GetEWalletAuAccountDetailsQuery, TError = unknown>(
  variables?: GetEWalletAuAccountDetailsQueryVariables,
  options?: UseInfiniteQueryOptions<GetEWalletAuAccountDetailsQuery, TError, TData>
) => {
  const query = useFetchNewData<GetEWalletAuAccountDetailsQuery, GetEWalletAuAccountDetailsQueryVariables>(
    GetEWalletAuAccountDetailsDocument
  );
  return useInfiniteQuery<GetEWalletAuAccountDetailsQuery, TError, TData>(
    variables === undefined
      ? ['GetEWalletAUAccountDetails.infinite']
      : ['GetEWalletAUAccountDetails.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetEWalletAuAccountDetailsQuery.getKey = (variables?: GetEWalletAuAccountDetailsQueryVariables) =>
  variables === undefined
    ? ['GetEWalletAUAccountDetails.infinite']
    : ['GetEWalletAUAccountDetails.infinite', variables];
export const GetEWalletUkCurrentPaymentCardDetailsDocument = `
    query GetEWalletUKCurrentPaymentCardDetails($accessToken: String!) {
  me {
    wallet {
      UKCurrentPaymentCardV2(accessToken: $accessToken) {
        id
        status
        nameOnCard
        isVirtual
        issuedTimestamp
        lastFourDigits
      }
    }
  }
}
    `;
export const useGetEWalletUkCurrentPaymentCardDetailsQuery = <
  TData = GetEWalletUkCurrentPaymentCardDetailsQuery,
  TError = unknown
>(
  variables: GetEWalletUkCurrentPaymentCardDetailsQueryVariables,
  options?: UseQueryOptions<GetEWalletUkCurrentPaymentCardDetailsQuery, TError, TData>
) =>
  useQuery<GetEWalletUkCurrentPaymentCardDetailsQuery, TError, TData>(
    ['GetEWalletUKCurrentPaymentCardDetails', variables],
    useFetchNewData<GetEWalletUkCurrentPaymentCardDetailsQuery, GetEWalletUkCurrentPaymentCardDetailsQueryVariables>(
      GetEWalletUkCurrentPaymentCardDetailsDocument
    ).bind(null, variables),
    options
  );

useGetEWalletUkCurrentPaymentCardDetailsQuery.getKey = (
  variables: GetEWalletUkCurrentPaymentCardDetailsQueryVariables
) => ['GetEWalletUKCurrentPaymentCardDetails', variables];
export const useInfiniteGetEWalletUkCurrentPaymentCardDetailsQuery = <
  TData = GetEWalletUkCurrentPaymentCardDetailsQuery,
  TError = unknown
>(
  variables: GetEWalletUkCurrentPaymentCardDetailsQueryVariables,
  options?: UseInfiniteQueryOptions<GetEWalletUkCurrentPaymentCardDetailsQuery, TError, TData>
) => {
  const query = useFetchNewData<
    GetEWalletUkCurrentPaymentCardDetailsQuery,
    GetEWalletUkCurrentPaymentCardDetailsQueryVariables
  >(GetEWalletUkCurrentPaymentCardDetailsDocument);
  return useInfiniteQuery<GetEWalletUkCurrentPaymentCardDetailsQuery, TError, TData>(
    ['GetEWalletUKCurrentPaymentCardDetails.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetEWalletUkCurrentPaymentCardDetailsQuery.getKey = (
  variables: GetEWalletUkCurrentPaymentCardDetailsQueryVariables
) => ['GetEWalletUKCurrentPaymentCardDetails.infinite', variables];
export const GetEWalletUkPaymentCardProvisioningDetailsDocument = `
    query GetEWalletUKPaymentCardProvisioningDetails($accessToken: String!) {
  me {
    wallet {
      UKCurrentPaymentCardV2(accessToken: $accessToken) {
        id
        nameOnCard
        cardNumberToken
        cvvToken
        expiryDate
      }
    }
  }
}
    `;
export const useGetEWalletUkPaymentCardProvisioningDetailsQuery = <
  TData = GetEWalletUkPaymentCardProvisioningDetailsQuery,
  TError = unknown
>(
  variables: GetEWalletUkPaymentCardProvisioningDetailsQueryVariables,
  options?: UseQueryOptions<GetEWalletUkPaymentCardProvisioningDetailsQuery, TError, TData>
) =>
  useQuery<GetEWalletUkPaymentCardProvisioningDetailsQuery, TError, TData>(
    ['GetEWalletUKPaymentCardProvisioningDetails', variables],
    useFetchNewData<
      GetEWalletUkPaymentCardProvisioningDetailsQuery,
      GetEWalletUkPaymentCardProvisioningDetailsQueryVariables
    >(GetEWalletUkPaymentCardProvisioningDetailsDocument).bind(null, variables),
    options
  );

useGetEWalletUkPaymentCardProvisioningDetailsQuery.getKey = (
  variables: GetEWalletUkPaymentCardProvisioningDetailsQueryVariables
) => ['GetEWalletUKPaymentCardProvisioningDetails', variables];
export const useInfiniteGetEWalletUkPaymentCardProvisioningDetailsQuery = <
  TData = GetEWalletUkPaymentCardProvisioningDetailsQuery,
  TError = unknown
>(
  variables: GetEWalletUkPaymentCardProvisioningDetailsQueryVariables,
  options?: UseInfiniteQueryOptions<GetEWalletUkPaymentCardProvisioningDetailsQuery, TError, TData>
) => {
  const query = useFetchNewData<
    GetEWalletUkPaymentCardProvisioningDetailsQuery,
    GetEWalletUkPaymentCardProvisioningDetailsQueryVariables
  >(GetEWalletUkPaymentCardProvisioningDetailsDocument);
  return useInfiniteQuery<GetEWalletUkPaymentCardProvisioningDetailsQuery, TError, TData>(
    ['GetEWalletUKPaymentCardProvisioningDetails.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetEWalletUkPaymentCardProvisioningDetailsQuery.getKey = (
  variables: GetEWalletUkPaymentCardProvisioningDetailsQueryVariables
) => ['GetEWalletUKPaymentCardProvisioningDetails.infinite', variables];
export const BlockUkCardDocument = `
    mutation BlockUKCard($input: BlockUnblockCardInput!) {
  blockUKCard(input: $input) {
    success
  }
}
    `;
export const useBlockUkCardMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<BlockUkCardMutation, TError, BlockUkCardMutationVariables, TContext>
) =>
  useMutation<BlockUkCardMutation, TError, BlockUkCardMutationVariables, TContext>(
    ['BlockUKCard'],
    useFetchNewData<BlockUkCardMutation, BlockUkCardMutationVariables>(BlockUkCardDocument),
    options
  );
export const UnblockUkCardDocument = `
    mutation UnblockUKCard($input: BlockUnblockCardInput!) {
  unblockUKCard(input: $input) {
    success
  }
}
    `;
export const useUnblockUkCardMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<UnblockUkCardMutation, TError, UnblockUkCardMutationVariables, TContext>
) =>
  useMutation<UnblockUkCardMutation, TError, UnblockUkCardMutationVariables, TContext>(
    ['UnblockUKCard'],
    useFetchNewData<UnblockUkCardMutation, UnblockUkCardMutationVariables>(UnblockUkCardDocument),
    options
  );
export const CreateUkPasscodeDocument = `
    mutation createUKPasscode($input: SetUKPasscodeInput!) {
  setUKPasscode(input: $input) {
    userToken
  }
}
    `;
export const useCreateUkPasscodeMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<CreateUkPasscodeMutation, TError, CreateUkPasscodeMutationVariables, TContext>
) =>
  useMutation<CreateUkPasscodeMutation, TError, CreateUkPasscodeMutationVariables, TContext>(
    ['createUKPasscode'],
    useFetchNewData<CreateUkPasscodeMutation, CreateUkPasscodeMutationVariables>(CreateUkPasscodeDocument),
    options
  );
export const GetIdvProfileV2Document = `
    query GetIDVProfileV2($country: CountryOfOrigin!) {
  me {
    wallet {
      IDVProfile(country: $country) {
        status
        token
        applicantId
      }
    }
  }
}
    `;
export const useGetIdvProfileV2Query = <TData = GetIdvProfileV2Query, TError = unknown>(
  variables: GetIdvProfileV2QueryVariables,
  options?: UseQueryOptions<GetIdvProfileV2Query, TError, TData>
) =>
  useQuery<GetIdvProfileV2Query, TError, TData>(
    ['GetIDVProfileV2', variables],
    useFetchNewData<GetIdvProfileV2Query, GetIdvProfileV2QueryVariables>(GetIdvProfileV2Document).bind(null, variables),
    options
  );

useGetIdvProfileV2Query.getKey = (variables: GetIdvProfileV2QueryVariables) => ['GetIDVProfileV2', variables];
export const useInfiniteGetIdvProfileV2Query = <TData = GetIdvProfileV2Query, TError = unknown>(
  variables: GetIdvProfileV2QueryVariables,
  options?: UseInfiniteQueryOptions<GetIdvProfileV2Query, TError, TData>
) => {
  const query = useFetchNewData<GetIdvProfileV2Query, GetIdvProfileV2QueryVariables>(GetIdvProfileV2Document);
  return useInfiniteQuery<GetIdvProfileV2Query, TError, TData>(
    ['GetIDVProfileV2.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetIdvProfileV2Query.getKey = (variables: GetIdvProfileV2QueryVariables) => [
  'GetIDVProfileV2.infinite',
  variables,
];
export const SendUkFundDocument = `
    mutation sendUkFund($input: SendUkFundInput!) {
  sendUkFund(input: $input) {
    state
    externalTransactionId
  }
}
    `;
export const useSendUkFundMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<SendUkFundMutation, TError, SendUkFundMutationVariables, TContext>
) =>
  useMutation<SendUkFundMutation, TError, SendUkFundMutationVariables, TContext>(
    ['sendUkFund'],
    useFetchNewData<SendUkFundMutation, SendUkFundMutationVariables>(SendUkFundDocument),
    options
  );
export const GetWalletTransactionsV2Document = `
    query GetWalletTransactionsV2($limit: Int!, $offset: Int!, $country: CountryOfOrigin!) {
  me {
    wallet {
      transactions(limit: $limit, offset: $offset, country: $country) {
        id
        dateTimeUTC
        merchant {
          name
          singleLineAddress
        }
        cardId
        currencyAmount {
          units
          subUnits
          type
        }
        pending
        description
        reference
        type
        transferPeerDetails {
          ... on BSBTransferPeerDetails {
            bsb
            name
            accountNumber
          }
          ... on FasterPaymentsTransferPeerDetails {
            sortCode
            name
            accountNumber
          }
        }
      }
    }
  }
}
    `;
export const useGetWalletTransactionsV2Query = <TData = GetWalletTransactionsV2Query, TError = unknown>(
  variables: GetWalletTransactionsV2QueryVariables,
  options?: UseQueryOptions<GetWalletTransactionsV2Query, TError, TData>
) =>
  useQuery<GetWalletTransactionsV2Query, TError, TData>(
    ['GetWalletTransactionsV2', variables],
    useFetchNewData<GetWalletTransactionsV2Query, GetWalletTransactionsV2QueryVariables>(
      GetWalletTransactionsV2Document
    ).bind(null, variables),
    options
  );

useGetWalletTransactionsV2Query.getKey = (variables: GetWalletTransactionsV2QueryVariables) => [
  'GetWalletTransactionsV2',
  variables,
];
export const useInfiniteGetWalletTransactionsV2Query = <TData = GetWalletTransactionsV2Query, TError = unknown>(
  variables: GetWalletTransactionsV2QueryVariables,
  options?: UseInfiniteQueryOptions<GetWalletTransactionsV2Query, TError, TData>
) => {
  const query = useFetchNewData<GetWalletTransactionsV2Query, GetWalletTransactionsV2QueryVariables>(
    GetWalletTransactionsV2Document
  );
  return useInfiniteQuery<GetWalletTransactionsV2Query, TError, TData>(
    ['GetWalletTransactionsV2.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetWalletTransactionsV2Query.getKey = (variables: GetWalletTransactionsV2QueryVariables) => [
  'GetWalletTransactionsV2.infinite',
  variables,
];
export const GetUkTransactionStateDocument = `
    query GetUkTransactionState($externalTransactionId: String!) {
  me {
    wallet {
      ukTransactionState(externalTransactionId: $externalTransactionId) {
        state
      }
    }
  }
}
    `;
export const useGetUkTransactionStateQuery = <TData = GetUkTransactionStateQuery, TError = unknown>(
  variables: GetUkTransactionStateQueryVariables,
  options?: UseQueryOptions<GetUkTransactionStateQuery, TError, TData>
) =>
  useQuery<GetUkTransactionStateQuery, TError, TData>(
    ['GetUkTransactionState', variables],
    useFetchNewData<GetUkTransactionStateQuery, GetUkTransactionStateQueryVariables>(
      GetUkTransactionStateDocument
    ).bind(null, variables),
    options
  );

useGetUkTransactionStateQuery.getKey = (variables: GetUkTransactionStateQueryVariables) => [
  'GetUkTransactionState',
  variables,
];
export const useInfiniteGetUkTransactionStateQuery = <TData = GetUkTransactionStateQuery, TError = unknown>(
  variables: GetUkTransactionStateQueryVariables,
  options?: UseInfiniteQueryOptions<GetUkTransactionStateQuery, TError, TData>
) => {
  const query = useFetchNewData<GetUkTransactionStateQuery, GetUkTransactionStateQueryVariables>(
    GetUkTransactionStateDocument
  );
  return useInfiniteQuery<GetUkTransactionStateQuery, TError, TData>(
    ['GetUkTransactionState.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetUkTransactionStateQuery.getKey = (variables: GetUkTransactionStateQueryVariables) => [
  'GetUkTransactionState.infinite',
  variables,
];
export const CreateScheduledPaymentDocument = `
    mutation CreateScheduledPayment($input: CreateScheduledPaymentInput!) {
  createScheduledPayment(input: $input) {
    payment {
      id
      status
    }
    outcome
  }
}
    `;
export const useCreateScheduledPaymentMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CreateScheduledPaymentMutation,
    TError,
    CreateScheduledPaymentMutationVariables,
    TContext
  >
) =>
  useMutation<CreateScheduledPaymentMutation, TError, CreateScheduledPaymentMutationVariables, TContext>(
    ['CreateScheduledPayment'],
    useFetchNewData<CreateScheduledPaymentMutation, CreateScheduledPaymentMutationVariables>(
      CreateScheduledPaymentDocument
    ),
    options
  );
export const GetActiveScheduledPaymentsDocument = `
    query GetActiveScheduledPayments {
  me {
    wallet {
      auActiveScheduledPayments {
        startDate
        endDate
        type
        frequency
        externalId
        description
        numberOfPayments
        amount {
          units
          subUnits
          type
        }
        recipient {
          accountName
          accountNumber
          bsb
        }
      }
    }
  }
}
    `;
export const useGetActiveScheduledPaymentsQuery = <TData = GetActiveScheduledPaymentsQuery, TError = unknown>(
  variables?: GetActiveScheduledPaymentsQueryVariables,
  options?: UseQueryOptions<GetActiveScheduledPaymentsQuery, TError, TData>
) =>
  useQuery<GetActiveScheduledPaymentsQuery, TError, TData>(
    variables === undefined ? ['GetActiveScheduledPayments'] : ['GetActiveScheduledPayments', variables],
    useFetchNewData<GetActiveScheduledPaymentsQuery, GetActiveScheduledPaymentsQueryVariables>(
      GetActiveScheduledPaymentsDocument
    ).bind(null, variables),
    options
  );

useGetActiveScheduledPaymentsQuery.getKey = (variables?: GetActiveScheduledPaymentsQueryVariables) =>
  variables === undefined ? ['GetActiveScheduledPayments'] : ['GetActiveScheduledPayments', variables];
export const useInfiniteGetActiveScheduledPaymentsQuery = <TData = GetActiveScheduledPaymentsQuery, TError = unknown>(
  variables?: GetActiveScheduledPaymentsQueryVariables,
  options?: UseInfiniteQueryOptions<GetActiveScheduledPaymentsQuery, TError, TData>
) => {
  const query = useFetchNewData<GetActiveScheduledPaymentsQuery, GetActiveScheduledPaymentsQueryVariables>(
    GetActiveScheduledPaymentsDocument
  );
  return useInfiniteQuery<GetActiveScheduledPaymentsQuery, TError, TData>(
    variables === undefined
      ? ['GetActiveScheduledPayments.infinite']
      : ['GetActiveScheduledPayments.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetActiveScheduledPaymentsQuery.getKey = (variables?: GetActiveScheduledPaymentsQueryVariables) =>
  variables === undefined
    ? ['GetActiveScheduledPayments.infinite']
    : ['GetActiveScheduledPayments.infinite', variables];
export const CancelScheduledPaymentDocument = `
    mutation CancelScheduledPayment($externalScheduledPaymentId: ID!) {
  cancelScheduledPayment(externalId: $externalScheduledPaymentId) {
    success
  }
}
    `;
export const useCancelScheduledPaymentMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CancelScheduledPaymentMutation,
    TError,
    CancelScheduledPaymentMutationVariables,
    TContext
  >
) =>
  useMutation<CancelScheduledPaymentMutation, TError, CancelScheduledPaymentMutationVariables, TContext>(
    ['CancelScheduledPayment'],
    useFetchNewData<CancelScheduledPaymentMutation, CancelScheduledPaymentMutationVariables>(
      CancelScheduledPaymentDocument
    ),
    options
  );
export const SavePayeeAddressDocument = `
    mutation SavePayeeAddress($input: SavePayeeAddressInput!) {
  savePayeeAddress(input: $input) {
    success
  }
}
    `;
export const useSavePayeeAddressMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<SavePayeeAddressMutation, TError, SavePayeeAddressMutationVariables, TContext>
) =>
  useMutation<SavePayeeAddressMutation, TError, SavePayeeAddressMutationVariables, TContext>(
    ['SavePayeeAddress'],
    useFetchNewData<SavePayeeAddressMutation, SavePayeeAddressMutationVariables>(SavePayeeAddressDocument),
    options
  );
export const GetAllPayeeAddressesDocument = `
    query GetAllPayeeAddresses {
  me {
    wallet {
      payeeAddresses {
        bsb
        accountName
        accountNumber
        friendlyName
      }
    }
  }
}
    `;
export const useGetAllPayeeAddressesQuery = <TData = GetAllPayeeAddressesQuery, TError = unknown>(
  variables?: GetAllPayeeAddressesQueryVariables,
  options?: UseQueryOptions<GetAllPayeeAddressesQuery, TError, TData>
) =>
  useQuery<GetAllPayeeAddressesQuery, TError, TData>(
    variables === undefined ? ['GetAllPayeeAddresses'] : ['GetAllPayeeAddresses', variables],
    useFetchNewData<GetAllPayeeAddressesQuery, GetAllPayeeAddressesQueryVariables>(GetAllPayeeAddressesDocument).bind(
      null,
      variables
    ),
    options
  );

useGetAllPayeeAddressesQuery.getKey = (variables?: GetAllPayeeAddressesQueryVariables) =>
  variables === undefined ? ['GetAllPayeeAddresses'] : ['GetAllPayeeAddresses', variables];
export const useInfiniteGetAllPayeeAddressesQuery = <TData = GetAllPayeeAddressesQuery, TError = unknown>(
  variables?: GetAllPayeeAddressesQueryVariables,
  options?: UseInfiniteQueryOptions<GetAllPayeeAddressesQuery, TError, TData>
) => {
  const query = useFetchNewData<GetAllPayeeAddressesQuery, GetAllPayeeAddressesQueryVariables>(
    GetAllPayeeAddressesDocument
  );
  return useInfiniteQuery<GetAllPayeeAddressesQuery, TError, TData>(
    variables === undefined ? ['GetAllPayeeAddresses.infinite'] : ['GetAllPayeeAddresses.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetAllPayeeAddressesQuery.getKey = (variables?: GetAllPayeeAddressesQueryVariables) =>
  variables === undefined ? ['GetAllPayeeAddresses.infinite'] : ['GetAllPayeeAddresses.infinite', variables];
export const RemovePayeeAddressDocument = `
    mutation RemovePayeeAddress($input: RemovePayeeAddressInput!) {
  removePayeeAddress(input: $input) {
    success
  }
}
    `;
export const useRemovePayeeAddressMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<RemovePayeeAddressMutation, TError, RemovePayeeAddressMutationVariables, TContext>
) =>
  useMutation<RemovePayeeAddressMutation, TError, RemovePayeeAddressMutationVariables, TContext>(
    ['RemovePayeeAddress'],
    useFetchNewData<RemovePayeeAddressMutation, RemovePayeeAddressMutationVariables>(RemovePayeeAddressDocument),
    options
  );
export const StartValidateUkPhoneNumberDocument = `
    mutation StartValidateUkPhoneNumber {
  startValidateUkPhoneNumber {
    success
  }
}
    `;
export const useStartValidateUkPhoneNumberMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    StartValidateUkPhoneNumberMutation,
    TError,
    StartValidateUkPhoneNumberMutationVariables,
    TContext
  >
) =>
  useMutation<StartValidateUkPhoneNumberMutation, TError, StartValidateUkPhoneNumberMutationVariables, TContext>(
    ['StartValidateUkPhoneNumber'],
    useFetchNewData<StartValidateUkPhoneNumberMutation, StartValidateUkPhoneNumberMutationVariables>(
      StartValidateUkPhoneNumberDocument
    ),
    options
  );
export const VerifyUkMobileEnrollmentDocument = `
    mutation VerifyUkMobileEnrollment($input: VerifyPhoneNumberRequest!) {
  verifyUkPhoneNumber(input: $input) {
    success
  }
}
    `;
export const useVerifyUkMobileEnrollmentMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    VerifyUkMobileEnrollmentMutation,
    TError,
    VerifyUkMobileEnrollmentMutationVariables,
    TContext
  >
) =>
  useMutation<VerifyUkMobileEnrollmentMutation, TError, VerifyUkMobileEnrollmentMutationVariables, TContext>(
    ['VerifyUkMobileEnrollment'],
    useFetchNewData<VerifyUkMobileEnrollmentMutation, VerifyUkMobileEnrollmentMutationVariables>(
      VerifyUkMobileEnrollmentDocument
    ),
    options
  );
export const GetUkAuthFactorsDocument = `
    query GetUkAuthFactors {
  me {
    wallet {
      ukAuthFactors {
        type
        status
        channel
      }
    }
  }
}
    `;
export const useGetUkAuthFactorsQuery = <TData = GetUkAuthFactorsQuery, TError = unknown>(
  variables?: GetUkAuthFactorsQueryVariables,
  options?: UseQueryOptions<GetUkAuthFactorsQuery, TError, TData>
) =>
  useQuery<GetUkAuthFactorsQuery, TError, TData>(
    variables === undefined ? ['GetUkAuthFactors'] : ['GetUkAuthFactors', variables],
    useFetchNewData<GetUkAuthFactorsQuery, GetUkAuthFactorsQueryVariables>(GetUkAuthFactorsDocument).bind(
      null,
      variables
    ),
    options
  );

useGetUkAuthFactorsQuery.getKey = (variables?: GetUkAuthFactorsQueryVariables) =>
  variables === undefined ? ['GetUkAuthFactors'] : ['GetUkAuthFactors', variables];
export const useInfiniteGetUkAuthFactorsQuery = <TData = GetUkAuthFactorsQuery, TError = unknown>(
  variables?: GetUkAuthFactorsQueryVariables,
  options?: UseInfiniteQueryOptions<GetUkAuthFactorsQuery, TError, TData>
) => {
  const query = useFetchNewData<GetUkAuthFactorsQuery, GetUkAuthFactorsQueryVariables>(GetUkAuthFactorsDocument);
  return useInfiniteQuery<GetUkAuthFactorsQuery, TError, TData>(
    variables === undefined ? ['GetUkAuthFactors.infinite'] : ['GetUkAuthFactors.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetUkAuthFactorsQuery.getKey = (variables?: GetUkAuthFactorsQueryVariables) =>
  variables === undefined ? ['GetUkAuthFactors.infinite'] : ['GetUkAuthFactors.infinite', variables];
export const UnlinkUkDeviceDocument = `
    mutation UnlinkUkDevice {
  unlinkUkDevice {
    success
  }
}
    `;
export const useUnlinkUkDeviceMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<UnlinkUkDeviceMutation, TError, UnlinkUkDeviceMutationVariables, TContext>
) =>
  useMutation<UnlinkUkDeviceMutation, TError, UnlinkUkDeviceMutationVariables, TContext>(
    ['UnlinkUkDevice'],
    useFetchNewData<UnlinkUkDeviceMutation, UnlinkUkDeviceMutationVariables>(UnlinkUkDeviceDocument),
    options
  );
export const GetUkLatestStepUpResultDocument = `
    query GetUkLatestStepUpResult {
  me {
    wallet {
      latestUkStepUpResult {
        state
        challengeId
        accessToken
      }
    }
  }
}
    `;
export const useGetUkLatestStepUpResultQuery = <TData = GetUkLatestStepUpResultQuery, TError = unknown>(
  variables?: GetUkLatestStepUpResultQueryVariables,
  options?: UseQueryOptions<GetUkLatestStepUpResultQuery, TError, TData>
) =>
  useQuery<GetUkLatestStepUpResultQuery, TError, TData>(
    variables === undefined ? ['GetUkLatestStepUpResult'] : ['GetUkLatestStepUpResult', variables],
    useFetchNewData<GetUkLatestStepUpResultQuery, GetUkLatestStepUpResultQueryVariables>(
      GetUkLatestStepUpResultDocument
    ).bind(null, variables),
    options
  );

useGetUkLatestStepUpResultQuery.getKey = (variables?: GetUkLatestStepUpResultQueryVariables) =>
  variables === undefined ? ['GetUkLatestStepUpResult'] : ['GetUkLatestStepUpResult', variables];
export const useInfiniteGetUkLatestStepUpResultQuery = <TData = GetUkLatestStepUpResultQuery, TError = unknown>(
  variables?: GetUkLatestStepUpResultQueryVariables,
  options?: UseInfiniteQueryOptions<GetUkLatestStepUpResultQuery, TError, TData>
) => {
  const query = useFetchNewData<GetUkLatestStepUpResultQuery, GetUkLatestStepUpResultQueryVariables>(
    GetUkLatestStepUpResultDocument
  );
  return useInfiniteQuery<GetUkLatestStepUpResultQuery, TError, TData>(
    variables === undefined ? ['GetUkLatestStepUpResult.infinite'] : ['GetUkLatestStepUpResult.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetUkLatestStepUpResultQuery.getKey = (variables?: GetUkLatestStepUpResultQueryVariables) =>
  variables === undefined ? ['GetUkLatestStepUpResult.infinite'] : ['GetUkLatestStepUpResult.infinite', variables];
export const GetWalletStatusDocument = `
    query GetWalletStatus {
  me {
    wallet {
      details {
        setupStatus {
          status
          message
        }
        status
      }
    }
  }
}
    `;
export const useGetWalletStatusQuery = <TData = GetWalletStatusQuery, TError = unknown>(
  variables?: GetWalletStatusQueryVariables,
  options?: UseQueryOptions<GetWalletStatusQuery, TError, TData>
) =>
  useQuery<GetWalletStatusQuery, TError, TData>(
    variables === undefined ? ['GetWalletStatus'] : ['GetWalletStatus', variables],
    useFetchNewData<GetWalletStatusQuery, GetWalletStatusQueryVariables>(GetWalletStatusDocument).bind(null, variables),
    options
  );

useGetWalletStatusQuery.getKey = (variables?: GetWalletStatusQueryVariables) =>
  variables === undefined ? ['GetWalletStatus'] : ['GetWalletStatus', variables];
export const useInfiniteGetWalletStatusQuery = <TData = GetWalletStatusQuery, TError = unknown>(
  variables?: GetWalletStatusQueryVariables,
  options?: UseInfiniteQueryOptions<GetWalletStatusQuery, TError, TData>
) => {
  const query = useFetchNewData<GetWalletStatusQuery, GetWalletStatusQueryVariables>(GetWalletStatusDocument);
  return useInfiniteQuery<GetWalletStatusQuery, TError, TData>(
    variables === undefined ? ['GetWalletStatus.infinite'] : ['GetWalletStatus.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetWalletStatusQuery.getKey = (variables?: GetWalletStatusQueryVariables) =>
  variables === undefined ? ['GetWalletStatus.infinite'] : ['GetWalletStatus.infinite', variables];
export const GetWalletNotificationDocument = `
    query getWalletNotification($country: CountryOfOrigin!) {
  me {
    wallet {
      notification(country: $country) {
        content
        note
        ctaCaptions {
          agree
          disagree
        }
        updatedAt
      }
    }
  }
}
    `;
export const useGetWalletNotificationQuery = <TData = GetWalletNotificationQuery, TError = unknown>(
  variables: GetWalletNotificationQueryVariables,
  options?: UseQueryOptions<GetWalletNotificationQuery, TError, TData>
) =>
  useQuery<GetWalletNotificationQuery, TError, TData>(
    ['getWalletNotification', variables],
    useFetchNewData<GetWalletNotificationQuery, GetWalletNotificationQueryVariables>(
      GetWalletNotificationDocument
    ).bind(null, variables),
    options
  );

useGetWalletNotificationQuery.getKey = (variables: GetWalletNotificationQueryVariables) => [
  'getWalletNotification',
  variables,
];
export const useInfiniteGetWalletNotificationQuery = <TData = GetWalletNotificationQuery, TError = unknown>(
  variables: GetWalletNotificationQueryVariables,
  options?: UseInfiniteQueryOptions<GetWalletNotificationQuery, TError, TData>
) => {
  const query = useFetchNewData<GetWalletNotificationQuery, GetWalletNotificationQueryVariables>(
    GetWalletNotificationDocument
  );
  return useInfiniteQuery<GetWalletNotificationQuery, TError, TData>(
    ['getWalletNotification.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetWalletNotificationQuery.getKey = (variables: GetWalletNotificationQueryVariables) => [
  'getWalletNotification.infinite',
  variables,
];
export const GetPersistentNotificationsDocument = `
    query getPersistentNotifications {
  me {
    wallet {
      persistentNotifications {
        id
        notificationStatus
        type
      }
    }
  }
}
    `;
export const useGetPersistentNotificationsQuery = <TData = GetPersistentNotificationsQuery, TError = unknown>(
  variables?: GetPersistentNotificationsQueryVariables,
  options?: UseQueryOptions<GetPersistentNotificationsQuery, TError, TData>
) =>
  useQuery<GetPersistentNotificationsQuery, TError, TData>(
    variables === undefined ? ['getPersistentNotifications'] : ['getPersistentNotifications', variables],
    useFetchNewData<GetPersistentNotificationsQuery, GetPersistentNotificationsQueryVariables>(
      GetPersistentNotificationsDocument
    ).bind(null, variables),
    options
  );

useGetPersistentNotificationsQuery.getKey = (variables?: GetPersistentNotificationsQueryVariables) =>
  variables === undefined ? ['getPersistentNotifications'] : ['getPersistentNotifications', variables];
export const useInfiniteGetPersistentNotificationsQuery = <TData = GetPersistentNotificationsQuery, TError = unknown>(
  variables?: GetPersistentNotificationsQueryVariables,
  options?: UseInfiniteQueryOptions<GetPersistentNotificationsQuery, TError, TData>
) => {
  const query = useFetchNewData<GetPersistentNotificationsQuery, GetPersistentNotificationsQueryVariables>(
    GetPersistentNotificationsDocument
  );
  return useInfiniteQuery<GetPersistentNotificationsQuery, TError, TData>(
    variables === undefined
      ? ['getPersistentNotifications.infinite']
      : ['getPersistentNotifications.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetPersistentNotificationsQuery.getKey = (variables?: GetPersistentNotificationsQueryVariables) =>
  variables === undefined
    ? ['getPersistentNotifications.infinite']
    : ['getPersistentNotifications.infinite', variables];
export const InitiateEWalletSetupDocument = `
    mutation initiateEWalletSetup {
  initiateAUWallet {
    success
  }
}
    `;
export const useInitiateEWalletSetupMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<InitiateEWalletSetupMutation, TError, InitiateEWalletSetupMutationVariables, TContext>
) =>
  useMutation<InitiateEWalletSetupMutation, TError, InitiateEWalletSetupMutationVariables, TContext>(
    ['initiateEWalletSetup'],
    useFetchNewData<InitiateEWalletSetupMutation, InitiateEWalletSetupMutationVariables>(InitiateEWalletSetupDocument),
    options
  );
export const SaveWalletSetupDocument = `
    mutation saveWalletSetup($setupDetails: SaveAUWalletSetupInput!) {
  saveAUWalletSetup(setupDetails: $setupDetails) {
    idvToken
  }
}
    `;
export const useSaveWalletSetupMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<SaveWalletSetupMutation, TError, SaveWalletSetupMutationVariables, TContext>
) =>
  useMutation<SaveWalletSetupMutation, TError, SaveWalletSetupMutationVariables, TContext>(
    ['saveWalletSetup'],
    useFetchNewData<SaveWalletSetupMutation, SaveWalletSetupMutationVariables>(SaveWalletSetupDocument),
    options
  );
export const TransferAuWalletFundsDocument = `
    mutation transferAUWalletFunds($transferDetails: TransferAUWalletFundsInput!) {
  transferAUWalletFunds(transferDetails: $transferDetails) {
    transactionId
    outcome
  }
}
    `;
export const useTransferAuWalletFundsMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<TransferAuWalletFundsMutation, TError, TransferAuWalletFundsMutationVariables, TContext>
) =>
  useMutation<TransferAuWalletFundsMutation, TError, TransferAuWalletFundsMutationVariables, TContext>(
    ['transferAUWalletFunds'],
    useFetchNewData<TransferAuWalletFundsMutation, TransferAuWalletFundsMutationVariables>(
      TransferAuWalletFundsDocument
    ),
    options
  );
export const ClearPersistentNotificationDocument = `
    mutation clearPersistentNotification($type: WalletNotificationType!) {
  clearPersistentNotifications(type: $type) {
    success
  }
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
    ['clearPersistentNotification'],
    useFetchNewData<ClearPersistentNotificationMutation, ClearPersistentNotificationMutationVariables>(
      ClearPersistentNotificationDocument
    ),
    options
  );
export const StoreEventDocument = `
    mutation storeEvent($input: StoreEventInput!) {
  storeEvent(input: $input) {
    success
  }
}
    `;
export const useStoreEventMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<StoreEventMutation, TError, StoreEventMutationVariables, TContext>
) =>
  useMutation<StoreEventMutation, TError, StoreEventMutationVariables, TContext>(
    ['storeEvent'],
    useFetchNewData<StoreEventMutation, StoreEventMutationVariables>(StoreEventDocument),
    options
  );
export const GetSsaCarouselTimestampDocument = `
    query GetSSACarouselTimestamp {
  me {
    wallet {
      seenSSACarouselTimestamp
    }
  }
}
    `;
export const useGetSsaCarouselTimestampQuery = <TData = GetSsaCarouselTimestampQuery, TError = unknown>(
  variables?: GetSsaCarouselTimestampQueryVariables,
  options?: UseQueryOptions<GetSsaCarouselTimestampQuery, TError, TData>
) =>
  useQuery<GetSsaCarouselTimestampQuery, TError, TData>(
    variables === undefined ? ['GetSSACarouselTimestamp'] : ['GetSSACarouselTimestamp', variables],
    useFetchNewData<GetSsaCarouselTimestampQuery, GetSsaCarouselTimestampQueryVariables>(
      GetSsaCarouselTimestampDocument
    ).bind(null, variables),
    options
  );

useGetSsaCarouselTimestampQuery.getKey = (variables?: GetSsaCarouselTimestampQueryVariables) =>
  variables === undefined ? ['GetSSACarouselTimestamp'] : ['GetSSACarouselTimestamp', variables];
export const useInfiniteGetSsaCarouselTimestampQuery = <TData = GetSsaCarouselTimestampQuery, TError = unknown>(
  variables?: GetSsaCarouselTimestampQueryVariables,
  options?: UseInfiniteQueryOptions<GetSsaCarouselTimestampQuery, TError, TData>
) => {
  const query = useFetchNewData<GetSsaCarouselTimestampQuery, GetSsaCarouselTimestampQueryVariables>(
    GetSsaCarouselTimestampDocument
  );
  return useInfiniteQuery<GetSsaCarouselTimestampQuery, TError, TData>(
    variables === undefined ? ['GetSSACarouselTimestamp.infinite'] : ['GetSSACarouselTimestamp.infinite', variables],
    metaData => query({ ...variables, ...(metaData.pageParam ?? {}) }),
    options
  );
};

useInfiniteGetSsaCarouselTimestampQuery.getKey = (variables?: GetSsaCarouselTimestampQueryVariables) =>
  variables === undefined ? ['GetSSACarouselTimestamp.infinite'] : ['GetSSACarouselTimestamp.infinite', variables];
export const SeenSsaCarouselDocument = `
    mutation SeenSSACarousel {
  seenSSACarousel {
    success
  }
}
    `;
export const useSeenSsaCarouselMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<SeenSsaCarouselMutation, TError, SeenSsaCarouselMutationVariables, TContext>
) =>
  useMutation<SeenSsaCarouselMutation, TError, SeenSsaCarouselMutationVariables, TContext>(
    ['SeenSSACarousel'],
    useFetchNewData<SeenSsaCarouselMutation, SeenSsaCarouselMutationVariables>(SeenSsaCarouselDocument),
    options
  );
export const UpdateWalletProfileDocument = `
    mutation UpdateWalletProfile($input: UpdateWalletProfileInput!) {
  updateWalletProfile(input: $input) {
    success
  }
}
    `;
export const useUpdateWalletProfileMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<UpdateWalletProfileMutation, TError, UpdateWalletProfileMutationVariables, TContext>
) =>
  useMutation<UpdateWalletProfileMutation, TError, UpdateWalletProfileMutationVariables, TContext>(
    ['UpdateWalletProfile'],
    useFetchNewData<UpdateWalletProfileMutation, UpdateWalletProfileMutationVariables>(UpdateWalletProfileDocument),
    options
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetBenefitsCategoriesQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetBenefitsCategoriesQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetBenefitsCategoriesQueryVariables>,
    GraphQLContext<GetBenefitsCategoriesQuery>,
    any
  >
) => graphql.query<GetBenefitsCategoriesQuery, GetBenefitsCategoriesQueryVariables>('GetBenefitsCategories', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockSearchAllProductsQuery((req, res, ctx) => {
 *   const { onlineInput, instoreInput, billInput, ssInput } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockSearchAllProductsQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<SearchAllProductsQueryVariables>,
    GraphQLContext<SearchAllProductsQuery>,
    any
  >
) => graphql.query<SearchAllProductsQuery, SearchAllProductsQueryVariables>('SearchAllProducts', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetBmOfferQuery((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetBmOfferQuery = (
  resolver: ResponseResolver<GraphQLRequest<GetBmOfferQueryVariables>, GraphQLContext<GetBmOfferQuery>, any>
) => graphql.query<GetBmOfferQuery, GetBmOfferQueryVariables>('GetBmOffer', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetBmOfferDetailQuery((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetBmOfferDetailQuery = (
  resolver: ResponseResolver<GraphQLRequest<GetBmOfferDetailQueryVariables>, GraphQLContext<GetBmOfferDetailQuery>, any>
) => graphql.query<GetBmOfferDetailQuery, GetBmOfferDetailQueryVariables>('GetBmOfferDetail', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetSubscriptionsQuery((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetSubscriptionsQuery = (
  resolver: ResponseResolver<GraphQLRequest<GetSubscriptionsQueryVariables>, GraphQLContext<GetSubscriptionsQuery>, any>
) => graphql.query<GetSubscriptionsQuery, GetSubscriptionsQueryVariables>('GetSubscriptions', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetSubscriptionDetailQuery((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetSubscriptionDetailQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetSubscriptionDetailQueryVariables>,
    GraphQLContext<GetSubscriptionDetailQuery>,
    any
  >
) => graphql.query<GetSubscriptionDetailQuery, GetSubscriptionDetailQueryVariables>('GetSubscriptionDetail', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetSubscriptionTransactionsQuery((req, res, ctx) => {
 *   const { subcriptionInput, transactionsInput } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetSubscriptionTransactionsQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetSubscriptionTransactionsQueryVariables>,
    GraphQLContext<GetSubscriptionTransactionsQuery>,
    any
  >
) =>
  graphql.query<GetSubscriptionTransactionsQuery, GetSubscriptionTransactionsQueryVariables>(
    'GetSubscriptionTransactions',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockBsJoinWaitListMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ bsJoinWaitList })
 *   )
 * })
 */
export const mockBsJoinWaitListMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<BsJoinWaitListMutationVariables>,
    GraphQLContext<BsJoinWaitListMutation>,
    any
  >
) => graphql.mutation<BsJoinWaitListMutation, BsJoinWaitListMutationVariables>('BsJoinWaitList', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockBmSubmitSubscriptionMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ bmSubmitSubscription })
 *   )
 * })
 */
export const mockBmSubmitSubscriptionMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<BmSubmitSubscriptionMutationVariables>,
    GraphQLContext<BmSubmitSubscriptionMutation>,
    any
  >
) =>
  graphql.mutation<BmSubmitSubscriptionMutation, BmSubmitSubscriptionMutationVariables>(
    'BmSubmitSubscription',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockSearchBillOffersQuery((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockSearchBillOffersQuery = (
  resolver: ResponseResolver<GraphQLRequest<SearchBillOffersQueryVariables>, GraphQLContext<SearchBillOffersQuery>, any>
) => graphql.query<SearchBillOffersQuery, SearchBillOffersQueryVariables>('SearchBillOffers', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockIsEligibleForPromotionQuery((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockIsEligibleForPromotionQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<IsEligibleForPromotionQueryVariables>,
    GraphQLContext<IsEligibleForPromotionQuery>,
    any
  >
) =>
  graphql.query<IsEligibleForPromotionQuery, IsEligibleForPromotionQueryVariables>('IsEligibleForPromotion', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetHomeTilesQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetHomeTilesQuery = (
  resolver: ResponseResolver<GraphQLRequest<GetHomeTilesQueryVariables>, GraphQLContext<GetHomeTilesQuery>, any>
) => graphql.query<GetHomeTilesQuery, GetHomeTilesQueryVariables>('GetHomeTiles', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetPromotionQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetPromotionQuery = (
  resolver: ResponseResolver<GraphQLRequest<GetPromotionQueryVariables>, GraphQLContext<GetPromotionQuery>, any>
) => graphql.query<GetPromotionQuery, GetPromotionQueryVariables>('GetPromotion', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetAhmAccessTokenQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetAhmAccessTokenQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetAhmAccessTokenQueryVariables>,
    GraphQLContext<GetAhmAccessTokenQuery>,
    any
  >
) => graphql.query<GetAhmAccessTokenQuery, GetAhmAccessTokenQueryVariables>('getAhmAccessToken', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetCurrentCardDetailsQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetCurrentCardDetailsQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetCurrentCardDetailsQueryVariables>,
    GraphQLContext<GetCurrentCardDetailsQuery>,
    any
  >
) => graphql.query<GetCurrentCardDetailsQuery, GetCurrentCardDetailsQueryVariables>('getCurrentCardDetails', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetCurrentCardMetaQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetCurrentCardMetaQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetCurrentCardMetaQueryVariables>,
    GraphQLContext<GetCurrentCardMetaQuery>,
    any
  >
) => graphql.query<GetCurrentCardMetaQuery, GetCurrentCardMetaQueryVariables>('getCurrentCardMeta', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetOemProvisioningQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetOemProvisioningQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetOemProvisioningQueryVariables>,
    GraphQLContext<GetOemProvisioningQuery>,
    any
  >
) => graphql.query<GetOemProvisioningQuery, GetOemProvisioningQueryVariables>('getOemProvisioning', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateCardMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ card })
 *   )
 * })
 */
export const mockCreateCardMutation = (
  resolver: ResponseResolver<GraphQLRequest<CreateCardMutationVariables>, GraphQLContext<CreateCardMutation>, any>
) => graphql.mutation<CreateCardMutation, CreateCardMutationVariables>('createCard', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockActivateCardMutation((req, res, ctx) => {
 *   return res(
 *     ctx.data({ card })
 *   )
 * })
 */
export const mockActivateCardMutation = (
  resolver: ResponseResolver<GraphQLRequest<ActivateCardMutationVariables>, GraphQLContext<ActivateCardMutation>, any>
) => graphql.mutation<ActivateCardMutation, ActivateCardMutationVariables>('activateCard', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockRequestNewCardMutation((req, res, ctx) => {
 *   const { address } = req.variables;
 *   return res(
 *     ctx.data({ card })
 *   )
 * })
 */
export const mockRequestNewCardMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<RequestNewCardMutationVariables>,
    GraphQLContext<RequestNewCardMutation>,
    any
  >
) => graphql.mutation<RequestNewCardMutation, RequestNewCardMutationVariables>('requestNewCard', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateCardMetaMutation((req, res, ctx) => {
 *   const { cardMeta } = req.variables;
 *   return res(
 *     ctx.data({ card })
 *   )
 * })
 */
export const mockUpdateCardMetaMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<UpdateCardMetaMutationVariables>,
    GraphQLContext<UpdateCardMetaMutation>,
    any
  >
) => graphql.mutation<UpdateCardMetaMutation, UpdateCardMetaMutationVariables>('updateCardMeta', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateCardPinMutation((req, res, ctx) => {
 *   const { cardPIN } = req.variables;
 *   return res(
 *     ctx.data({ card })
 *   )
 * })
 */
export const mockUpdateCardPinMutation = (
  resolver: ResponseResolver<GraphQLRequest<UpdateCardPinMutationVariables>, GraphQLContext<UpdateCardPinMutation>, any>
) => graphql.mutation<UpdateCardPinMutation, UpdateCardPinMutationVariables>('updateCardPin', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetCashbackOffersQuery((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetCashbackOffersQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetCashbackOffersQueryVariables>,
    GraphQLContext<GetCashbackOffersQuery>,
    any
  >
) => graphql.query<GetCashbackOffersQuery, GetCashbackOffersQueryVariables>('GetCashbackOffers', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetOnlineOfferByIdQuery((req, res, ctx) => {
 *   const { id } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetOnlineOfferByIdQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetOnlineOfferByIdQueryVariables>,
    GraphQLContext<GetOnlineOfferByIdQuery>,
    any
  >
) => graphql.query<GetOnlineOfferByIdQuery, GetOnlineOfferByIdQueryVariables>('GetOnlineOfferById', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetInstoreOfferByIdQuery((req, res, ctx) => {
 *   const { id } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetInstoreOfferByIdQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetInstoreOfferByIdQueryVariables>,
    GraphQLContext<GetInstoreOfferByIdQuery>,
    any
  >
) => graphql.query<GetInstoreOfferByIdQuery, GetInstoreOfferByIdQueryVariables>('GetInstoreOfferById', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCashbackCategoriesQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
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
 * mockAcceptTncMutation((req, res, ctx) => {
 *   return res(
 *     ctx.data({ cashback })
 *   )
 * })
 */
export const mockAcceptTncMutation = (
  resolver: ResponseResolver<GraphQLRequest<AcceptTncMutationVariables>, GraphQLContext<AcceptTncMutation>, any>
) => graphql.mutation<AcceptTncMutation, AcceptTncMutationVariables>('AcceptTnc', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetFeaturedOffersQuery((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetFeaturedOffersQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetFeaturedOffersQueryVariables>,
    GraphQLContext<GetFeaturedOffersQuery>,
    any
  >
) => graphql.query<GetFeaturedOffersQuery, GetFeaturedOffersQueryVariables>('GetFeaturedOffers', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetCashbackOffersGroupByAdvertiserQuery((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetCashbackOffersGroupByAdvertiserQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetCashbackOffersGroupByAdvertiserQueryVariables>,
    GraphQLContext<GetCashbackOffersGroupByAdvertiserQuery>,
    any
  >
) =>
  graphql.query<GetCashbackOffersGroupByAdvertiserQuery, GetCashbackOffersGroupByAdvertiserQueryVariables>(
    'GetCashbackOffersGroupByAdvertiser',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetInstoreOffersByAdvertiserIdQuery((req, res, ctx) => {
 *   const { id } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetInstoreOffersByAdvertiserIdQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetInstoreOffersByAdvertiserIdQueryVariables>,
    GraphQLContext<GetInstoreOffersByAdvertiserIdQuery>,
    any
  >
) =>
  graphql.query<GetInstoreOffersByAdvertiserIdQuery, GetInstoreOffersByAdvertiserIdQueryVariables>(
    'GetInstoreOffersByAdvertiserId',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetCashbackTermsAndConditionsQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetCashbackTermsAndConditionsQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetCashbackTermsAndConditionsQueryVariables>,
    GraphQLContext<GetCashbackTermsAndConditionsQuery>,
    any
  >
) =>
  graphql.query<GetCashbackTermsAndConditionsQuery, GetCashbackTermsAndConditionsQueryVariables>(
    'GetCashbackTermsAndConditions',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetCashbackTermsAndConditionsAcceptanceQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetCashbackTermsAndConditionsAcceptanceQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetCashbackTermsAndConditionsAcceptanceQueryVariables>,
    GraphQLContext<GetCashbackTermsAndConditionsAcceptanceQuery>,
    any
  >
) =>
  graphql.query<GetCashbackTermsAndConditionsAcceptanceQuery, GetCashbackTermsAndConditionsAcceptanceQueryVariables>(
    'GetCashbackTermsAndConditionsAcceptance',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetEnrolCardDetailScreenQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetEnrolCardDetailScreenQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetEnrolCardDetailScreenQueryVariables>,
    GraphQLContext<GetEnrolCardDetailScreenQuery>,
    any
  >
) =>
  graphql.query<GetEnrolCardDetailScreenQuery, GetEnrolCardDetailScreenQueryVariables>(
    'GetEnrolCardDetailScreen',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetEhProviderIdQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetEhProviderIdQuery = (
  resolver: ResponseResolver<GraphQLRequest<GetEhProviderIdQueryVariables>, GraphQLContext<GetEhProviderIdQuery>, any>
) => graphql.query<GetEhProviderIdQuery, GetEhProviderIdQueryVariables>('GetEhProviderId', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCashbackDeleteCardMutation((req, res, ctx) => {
 *   const { deleteCard } = req.variables;
 *   return res(
 *     ctx.data({ cashback })
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
 * mockCashbackTransactionsV2Query((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ me })
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
 * mockCashbackOnboardUserMutation((req, res, ctx) => {
 *   return res(
 *     ctx.data({ cashback })
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
 * mockCashbackOnboardStatusQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
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
 * mockCashbackUpdateBankDetailsMutation((req, res, ctx) => {
 *   const { updateBankDetails } = req.variables;
 *   return res(
 *     ctx.data({ cashback })
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
 * mockCashbackLinkedCardsQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
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
 * mockCashbackUpdateBankLinkedStatusMutation((req, res, ctx) => {
 *   const { updateBankLinkedStatus } = req.variables;
 *   return res(
 *     ctx.data({ cashback })
 *   )
 * })
 */
export const mockCashbackUpdateBankLinkedStatusMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<CashbackUpdateBankLinkedStatusMutationVariables>,
    GraphQLContext<CashbackUpdateBankLinkedStatusMutation>,
    any
  >
) =>
  graphql.mutation<CashbackUpdateBankLinkedStatusMutation, CashbackUpdateBankLinkedStatusMutationVariables>(
    'CashbackUpdateBankLinkedStatus',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCashbackUpdateAutoEnrolMutation((req, res, ctx) => {
 *   const { updateAutoEnrolment } = req.variables;
 *   return res(
 *     ctx.data({ cashback })
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
 * mockCashbackUserBankDetailsQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockCashbackUserBankDetailsQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<CashbackUserBankDetailsQueryVariables>,
    GraphQLContext<CashbackUserBankDetailsQuery>,
    any
  >
) =>
  graphql.query<CashbackUserBankDetailsQuery, CashbackUserBankDetailsQueryVariables>(
    'CashbackUserBankDetails',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCashbackUserInfoQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockCashbackUserInfoQuery = (
  resolver: ResponseResolver<GraphQLRequest<CashbackUserInfoQueryVariables>, GraphQLContext<CashbackUserInfoQuery>, any>
) => graphql.query<CashbackUserInfoQuery, CashbackUserInfoQueryVariables>('CashbackUserInfo', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCashbackUserTokenQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
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
 * mockExperimentGetUserWaitListQuery((req, res, ctx) => {
 *   const { projectId } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockExperimentGetUserWaitListQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<ExperimentGetUserWaitListQueryVariables>,
    GraphQLContext<ExperimentGetUserWaitListQuery>,
    any
  >
) =>
  graphql.query<ExperimentGetUserWaitListQuery, ExperimentGetUserWaitListQueryVariables>(
    'ExperimentGetUserWaitList',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetInstapayAdsQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetInstapayAdsQuery = (
  resolver: ResponseResolver<GraphQLRequest<GetInstapayAdsQueryVariables>, GraphQLContext<GetInstapayAdsQuery>, any>
) => graphql.query<GetInstapayAdsQuery, GetInstapayAdsQueryVariables>('GetInstapayAds', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockExperimentAddEventMutation((req, res, ctx) => {
 *   const { event } = req.variables;
 *   return res(
 *     ctx.data({ experiment })
 *   )
 * })
 */
export const mockExperimentAddEventMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<ExperimentAddEventMutationVariables>,
    GraphQLContext<ExperimentAddEventMutation>,
    any
  >
) => graphql.mutation<ExperimentAddEventMutation, ExperimentAddEventMutationVariables>('ExperimentAddEvent', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockExperimentSubscribeMutation((req, res, ctx) => {
 *   const { projectID } = req.variables;
 *   return res(
 *     ctx.data({ experiment })
 *   )
 * })
 */
export const mockExperimentSubscribeMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<ExperimentSubscribeMutationVariables>,
    GraphQLContext<ExperimentSubscribeMutation>,
    any
  >
) =>
  graphql.mutation<ExperimentSubscribeMutation, ExperimentSubscribeMutationVariables>('ExperimentSubscribe', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockAddBeneficiaryMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ floatAccount })
 *   )
 * })
 */
export const mockAddBeneficiaryMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<AddBeneficiaryMutationVariables>,
    GraphQLContext<AddBeneficiaryMutation>,
    any
  >
) => graphql.mutation<AddBeneficiaryMutation, AddBeneficiaryMutationVariables>('AddBeneficiary', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockJoinWaitListWithCategoriesMutation((req, res, ctx) => {
 *   const { categories, categoryAction } = req.variables;
 *   return res(
 *     ctx.data({ group })
 *   )
 * })
 */
export const mockJoinWaitListWithCategoriesMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<JoinWaitListWithCategoriesMutationVariables>,
    GraphQLContext<JoinWaitListWithCategoriesMutation>,
    any
  >
) =>
  graphql.mutation<JoinWaitListWithCategoriesMutation, JoinWaitListWithCategoriesMutationVariables>(
    'JoinWaitListWithCategories',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetUserWaitListQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetUserWaitListQuery = (
  resolver: ResponseResolver<GraphQLRequest<GetUserWaitListQueryVariables>, GraphQLContext<GetUserWaitListQuery>, any>
) => graphql.query<GetUserWaitListQuery, GetUserWaitListQueryVariables>('GetUserWaitList', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetGroupDetailQuery((req, res, ctx) => {
 *   const { groupId } = req.variables;
 *   return res(
 *     ctx.data({ group })
 *   )
 * })
 */
export const mockGetGroupDetailQuery = (
  resolver: ResponseResolver<GraphQLRequest<GetGroupDetailQueryVariables>, GraphQLContext<GetGroupDetailQuery>, any>
) => graphql.query<GetGroupDetailQuery, GetGroupDetailQueryVariables>('GetGroupDetail', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetGroupsQuery((req, res, ctx) => {
 *   const { country } = req.variables;
 *   return res(
 *     ctx.data({ group })
 *   )
 * })
 */
export const mockGetGroupsQuery = (
  resolver: ResponseResolver<GraphQLRequest<GetGroupsQueryVariables>, GraphQLContext<GetGroupsQuery>, any>
) => graphql.query<GetGroupsQuery, GetGroupsQueryVariables>('GetGroups', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetGroupCategoriesQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ group })
 *   )
 * })
 */
export const mockGetGroupCategoriesQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetGroupCategoriesQueryVariables>,
    GraphQLContext<GetGroupCategoriesQuery>,
    any
  >
) => graphql.query<GetGroupCategoriesQuery, GetGroupCategoriesQueryVariables>('GetGroupCategories', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetUserGroupMembershipAndConsentQuery((req, res, ctx) => {
 *   const { groupId } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetUserGroupMembershipAndConsentQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetUserGroupMembershipAndConsentQueryVariables>,
    GraphQLContext<GetUserGroupMembershipAndConsentQuery>,
    any
  >
) =>
  graphql.query<GetUserGroupMembershipAndConsentQuery, GetUserGroupMembershipAndConsentQueryVariables>(
    'GetUserGroupMembershipAndConsent',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockJoinGroupWithConsentAgreementMutation((req, res, ctx) => {
 *   const { input, consented } = req.variables;
 *   return res(
 *     ctx.data({ group })
 *   )
 * })
 */
export const mockJoinGroupWithConsentAgreementMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<JoinGroupWithConsentAgreementMutationVariables>,
    GraphQLContext<JoinGroupWithConsentAgreementMutation>,
    any
  >
) =>
  graphql.mutation<JoinGroupWithConsentAgreementMutation, JoinGroupWithConsentAgreementMutationVariables>(
    'JoinGroupWithConsentAgreement',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetHeroPointsBalanceQuery((req, res, ctx) => {
 *   const { orgId } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetHeroPointsBalanceQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetHeroPointsBalanceQueryVariables>,
    GraphQLContext<GetHeroPointsBalanceQuery>,
    any
  >
) => graphql.query<GetHeroPointsBalanceQuery, GetHeroPointsBalanceQueryVariables>('GetHeroPointsBalance', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetHeroPointsTransactionDetailQuery((req, res, ctx) => {
 *   const { orgId, id } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetHeroPointsTransactionDetailQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetHeroPointsTransactionDetailQueryVariables>,
    GraphQLContext<GetHeroPointsTransactionDetailQuery>,
    any
  >
) =>
  graphql.query<GetHeroPointsTransactionDetailQuery, GetHeroPointsTransactionDetailQueryVariables>(
    'GetHeroPointsTransactionDetail',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetHeroPointsTransactionHistoriesQuery((req, res, ctx) => {
 *   const { orgId, pageIndex, itemPerPage } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetHeroPointsTransactionHistoriesQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetHeroPointsTransactionHistoriesQueryVariables>,
    GraphQLContext<GetHeroPointsTransactionHistoriesQuery>,
    any
  >
) =>
  graphql.query<GetHeroPointsTransactionHistoriesQuery, GetHeroPointsTransactionHistoriesQueryVariables>(
    'GetHeroPointsTransactionHistories',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetHeroPointsPaymentPreferencesQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetHeroPointsPaymentPreferencesQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetHeroPointsPaymentPreferencesQueryVariables>,
    GraphQLContext<GetHeroPointsPaymentPreferencesQuery>,
    any
  >
) =>
  graphql.query<GetHeroPointsPaymentPreferencesQuery, GetHeroPointsPaymentPreferencesQueryVariables>(
    'GetHeroPointsPaymentPreferences',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetPayWithHpCarouselSeenQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetPayWithHpCarouselSeenQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetPayWithHpCarouselSeenQueryVariables>,
    GraphQLContext<GetPayWithHpCarouselSeenQuery>,
    any
  >
) =>
  graphql.query<GetPayWithHpCarouselSeenQuery, GetPayWithHpCarouselSeenQueryVariables>(
    'GetPayWithHpCarouselSeen',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateHeroPointsPaymentPreferencesMutation((req, res, ctx) => {
 *   const { payWithHPOnSwagCard } = req.variables;
 *   return res(
 *     ctx.data({ heroPoints })
 *   )
 * })
 */
export const mockUpdateHeroPointsPaymentPreferencesMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<UpdateHeroPointsPaymentPreferencesMutationVariables>,
    GraphQLContext<UpdateHeroPointsPaymentPreferencesMutation>,
    any
  >
) =>
  graphql.mutation<UpdateHeroPointsPaymentPreferencesMutation, UpdateHeroPointsPaymentPreferencesMutationVariables>(
    'UpdateHeroPointsPaymentPreferences',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdatePayWithHpCarouselSeenMutation((req, res, ctx) => {
 *   return res(
 *     ctx.data({ heroPoints })
 *   )
 * })
 */
export const mockUpdatePayWithHpCarouselSeenMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<UpdatePayWithHpCarouselSeenMutationVariables>,
    GraphQLContext<UpdatePayWithHpCarouselSeenMutation>,
    any
  >
) =>
  graphql.mutation<UpdatePayWithHpCarouselSeenMutation, UpdatePayWithHpCarouselSeenMutationVariables>(
    'UpdatePayWithHpCarouselSeen',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetEhProfileQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetEhProfileQuery = (
  resolver: ResponseResolver<GraphQLRequest<GetEhProfileQueryVariables>, GraphQLContext<GetEhProfileQuery>, any>
) => graphql.query<GetEhProfileQuery, GetEhProfileQueryVariables>('getEHProfile', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockInstapayUsageVerificationQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
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
 * mockGetAllInstapayAvailableBalancesQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetAllInstapayAvailableBalancesQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetAllInstapayAvailableBalancesQueryVariables>,
    GraphQLContext<GetAllInstapayAvailableBalancesQuery>,
    any
  >
) =>
  graphql.query<GetAllInstapayAvailableBalancesQuery, GetAllInstapayAvailableBalancesQueryVariables>(
    'GetAllInstapayAvailableBalances',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetBankAccountsForOrgQuery((req, res, ctx) => {
 *   const { id } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetBankAccountsForOrgQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetBankAccountsForOrgQueryVariables>,
    GraphQLContext<GetBankAccountsForOrgQuery>,
    any
  >
) => graphql.query<GetBankAccountsForOrgQuery, GetBankAccountsForOrgQueryVariables>('GetBankAccountsForOrg', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetInstapayTransactionsQuery((req, res, ctx) => {
 *   const { filters } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetInstapayTransactionsQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetInstapayTransactionsQueryVariables>,
    GraphQLContext<GetInstapayTransactionsQuery>,
    any
  >
) =>
  graphql.query<GetInstapayTransactionsQuery, GetInstapayTransactionsQueryVariables>(
    'GetInstapayTransactions',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetInstapayUserTransactionsQuery((req, res, ctx) => {
 *   const { filters, first, after } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetInstapayUserTransactionsQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetInstapayUserTransactionsQueryVariables>,
    GraphQLContext<GetInstapayUserTransactionsQuery>,
    any
  >
) =>
  graphql.query<GetInstapayUserTransactionsQuery, GetInstapayUserTransactionsQueryVariables>(
    'GetInstapayUserTransactions',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetInstapayVisibilityQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetInstapayVisibilityQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetInstapayVisibilityQueryVariables>,
    GraphQLContext<GetInstapayVisibilityQuery>,
    any
  >
) => graphql.query<GetInstapayVisibilityQuery, GetInstapayVisibilityQueryVariables>('GetInstapayVisibility', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetOrgsQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetOrgsQuery = (
  resolver: ResponseResolver<GraphQLRequest<GetOrgsQueryVariables>, GraphQLContext<GetOrgsQuery>, any>
) => graphql.query<GetOrgsQuery, GetOrgsQueryVariables>('GetOrgs', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockShowInstapayIntroductionQuery((req, res, ctx) => {
 *   const { id } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockShowInstapayIntroductionQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<ShowInstapayIntroductionQueryVariables>,
    GraphQLContext<ShowInstapayIntroductionQuery>,
    any
  >
) =>
  graphql.query<ShowInstapayIntroductionQuery, ShowInstapayIntroductionQueryVariables>(
    'showInstapayIntroduction',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDrawdownInstapayMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ instapay })
 *   )
 * })
 */
export const mockDrawdownInstapayMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<DrawdownInstapayMutationVariables>,
    GraphQLContext<DrawdownInstapayMutation>,
    any
  >
) => graphql.mutation<DrawdownInstapayMutation, DrawdownInstapayMutationVariables>('DrawdownInstapay', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockAddPreferInstapayOptionMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ instapay })
 *   )
 * })
 */
export const mockAddPreferInstapayOptionMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<AddPreferInstapayOptionMutationVariables>,
    GraphQLContext<AddPreferInstapayOptionMutation>,
    any
  >
) =>
  graphql.mutation<AddPreferInstapayOptionMutation, AddPreferInstapayOptionMutationVariables>(
    'addPreferInstapayOption',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetInstapayUsageQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetInstapayUsageQuery = (
  resolver: ResponseResolver<GraphQLRequest<GetInstapayUsageQueryVariables>, GraphQLContext<GetInstapayUsageQuery>, any>
) => graphql.query<GetInstapayUsageQuery, GetInstapayUsageQueryVariables>('GetInstapayUsage', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetAvailableIncentivesQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetAvailableIncentivesQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetAvailableIncentivesQueryVariables>,
    GraphQLContext<GetAvailableIncentivesQuery>,
    any
  >
) =>
  graphql.query<GetAvailableIncentivesQuery, GetAvailableIncentivesQueryVariables>('getAvailableIncentives', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetEstInstapayBalancesQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetEstInstapayBalancesQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetEstInstapayBalancesQueryVariables>,
    GraphQLContext<GetEstInstapayBalancesQuery>,
    any
  >
) =>
  graphql.query<GetEstInstapayBalancesQuery, GetEstInstapayBalancesQueryVariables>('GetEstInstapayBalances', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetEstimatedIncomeQuery((req, res, ctx) => {
 *   const { orgID } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetEstimatedIncomeQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetEstimatedIncomeQueryVariables>,
    GraphQLContext<GetEstimatedIncomeQuery>,
    any
  >
) => graphql.query<GetEstimatedIncomeQuery, GetEstimatedIncomeQueryVariables>('GetEstimatedIncome', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetInstapaySchedulingVisibilityQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetInstapaySchedulingVisibilityQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetInstapaySchedulingVisibilityQueryVariables>,
    GraphQLContext<GetInstapaySchedulingVisibilityQuery>,
    any
  >
) =>
  graphql.query<GetInstapaySchedulingVisibilityQuery, GetInstapaySchedulingVisibilityQueryVariables>(
    'GetInstapaySchedulingVisibility',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetRecurringByDayVisibilityQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetRecurringByDayVisibilityQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetRecurringByDayVisibilityQueryVariables>,
    GraphQLContext<GetRecurringByDayVisibilityQuery>,
    any
  >
) =>
  graphql.query<GetRecurringByDayVisibilityQuery, GetRecurringByDayVisibilityQueryVariables>(
    'GetRecurringByDayVisibility',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetInstaPayRecurringByDayPreviewQuery((req, res, ctx) => {
 *   const { orgID } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetInstaPayRecurringByDayPreviewQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetInstaPayRecurringByDayPreviewQueryVariables>,
    GraphQLContext<GetInstaPayRecurringByDayPreviewQuery>,
    any
  >
) =>
  graphql.query<GetInstaPayRecurringByDayPreviewQuery, GetInstaPayRecurringByDayPreviewQueryVariables>(
    'GetInstaPayRecurringByDayPreview',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetAllInstapayRecurringByDaySubscriptionQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetAllInstapayRecurringByDaySubscriptionQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetAllInstapayRecurringByDaySubscriptionQueryVariables>,
    GraphQLContext<GetAllInstapayRecurringByDaySubscriptionQuery>,
    any
  >
) =>
  graphql.query<GetAllInstapayRecurringByDaySubscriptionQuery, GetAllInstapayRecurringByDaySubscriptionQueryVariables>(
    'GetAllInstapayRecurringByDaySubscription',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateSchedulingSubscriptionMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ instapay })
 *   )
 * })
 */
export const mockCreateSchedulingSubscriptionMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<CreateSchedulingSubscriptionMutationVariables>,
    GraphQLContext<CreateSchedulingSubscriptionMutation>,
    any
  >
) =>
  graphql.mutation<CreateSchedulingSubscriptionMutation, CreateSchedulingSubscriptionMutationVariables>(
    'CreateSchedulingSubscription',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCancelSchedulingSubscriptionMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ instapay })
 *   )
 * })
 */
export const mockCancelSchedulingSubscriptionMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<CancelSchedulingSubscriptionMutationVariables>,
    GraphQLContext<CancelSchedulingSubscriptionMutation>,
    any
  >
) =>
  graphql.mutation<CancelSchedulingSubscriptionMutation, CancelSchedulingSubscriptionMutationVariables>(
    'CancelSchedulingSubscription',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateSchedulingSubscriptionMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ instapay })
 *   )
 * })
 */
export const mockUpdateSchedulingSubscriptionMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<UpdateSchedulingSubscriptionMutationVariables>,
    GraphQLContext<UpdateSchedulingSubscriptionMutation>,
    any
  >
) =>
  graphql.mutation<UpdateSchedulingSubscriptionMutation, UpdateSchedulingSubscriptionMutationVariables>(
    'UpdateSchedulingSubscription',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetSchedulingSubscriptionsQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetSchedulingSubscriptionsQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetSchedulingSubscriptionsQueryVariables>,
    GraphQLContext<GetSchedulingSubscriptionsQuery>,
    any
  >
) =>
  graphql.query<GetSchedulingSubscriptionsQuery, GetSchedulingSubscriptionsQueryVariables>(
    'GetSchedulingSubscriptions',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDisableEarnedWageAccessFeaturesMutation((req, res, ctx) => {
 *   return res(
 *     ctx.data({ instapay })
 *   )
 * })
 */
export const mockDisableEarnedWageAccessFeaturesMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<DisableEarnedWageAccessFeaturesMutationVariables>,
    GraphQLContext<DisableEarnedWageAccessFeaturesMutation>,
    any
  >
) =>
  graphql.mutation<DisableEarnedWageAccessFeaturesMutation, DisableEarnedWageAccessFeaturesMutationVariables>(
    'DisableEarnedWageAccessFeatures',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockSubmitInstaPayDrawdownSurveyMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ instapay })
 *   )
 * })
 */
export const mockSubmitInstaPayDrawdownSurveyMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<SubmitInstaPayDrawdownSurveyMutationVariables>,
    GraphQLContext<SubmitInstaPayDrawdownSurveyMutation>,
    any
  >
) =>
  graphql.mutation<SubmitInstaPayDrawdownSurveyMutation, SubmitInstaPayDrawdownSurveyMutationVariables>(
    'SubmitInstaPayDrawdownSurvey',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockSubscribeRecurringByDayMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ recurringByDay })
 *   )
 * })
 */
export const mockSubscribeRecurringByDayMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<SubscribeRecurringByDayMutationVariables>,
    GraphQLContext<SubscribeRecurringByDayMutation>,
    any
  >
) =>
  graphql.mutation<SubscribeRecurringByDayMutation, SubscribeRecurringByDayMutationVariables>(
    'SubscribeRecurringByDay',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCancelRecurringByDayMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ recurringByDay })
 *   )
 * })
 */
export const mockCancelRecurringByDayMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<CancelRecurringByDayMutationVariables>,
    GraphQLContext<CancelRecurringByDayMutation>,
    any
  >
) =>
  graphql.mutation<CancelRecurringByDayMutation, CancelRecurringByDayMutationVariables>(
    'CancelRecurringByDay',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateRecurringByDayMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ recurringByDay })
 *   )
 * })
 */
export const mockUpdateRecurringByDayMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<UpdateRecurringByDayMutationVariables>,
    GraphQLContext<UpdateRecurringByDayMutation>,
    any
  >
) =>
  graphql.mutation<UpdateRecurringByDayMutation, UpdateRecurringByDayMutationVariables>(
    'UpdateRecurringByDay',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetRecurringByAmountEligibilityQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetRecurringByAmountEligibilityQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetRecurringByAmountEligibilityQueryVariables>,
    GraphQLContext<GetRecurringByAmountEligibilityQuery>,
    any
  >
) =>
  graphql.query<GetRecurringByAmountEligibilityQuery, GetRecurringByAmountEligibilityQueryVariables>(
    'GetRecurringByAmountEligibility',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetEwaPushNotificationOptInStatusByFeatureQuery((req, res, ctx) => {
 *   const { feature, orgId } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetEwaPushNotificationOptInStatusByFeatureQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetEwaPushNotificationOptInStatusByFeatureQueryVariables>,
    GraphQLContext<GetEwaPushNotificationOptInStatusByFeatureQuery>,
    any
  >
) =>
  graphql.query<
    GetEwaPushNotificationOptInStatusByFeatureQuery,
    GetEwaPushNotificationOptInStatusByFeatureQueryVariables
  >('GetEWAPushNotificationOptInStatusByFeature', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockOptInEwaPushNotificationByTypeMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ ewaPushNotification })
 *   )
 * })
 */
export const mockOptInEwaPushNotificationByTypeMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<OptInEwaPushNotificationByTypeMutationVariables>,
    GraphQLContext<OptInEwaPushNotificationByTypeMutation>,
    any
  >
) =>
  graphql.mutation<OptInEwaPushNotificationByTypeMutation, OptInEwaPushNotificationByTypeMutationVariables>(
    'OptInEWAPushNotificationByType',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockOptOutEwaPushNotificationByTypeMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ ewaPushNotification })
 *   )
 * })
 */
export const mockOptOutEwaPushNotificationByTypeMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<OptOutEwaPushNotificationByTypeMutationVariables>,
    GraphQLContext<OptOutEwaPushNotificationByTypeMutation>,
    any
  >
) =>
  graphql.mutation<OptOutEwaPushNotificationByTypeMutation, OptOutEwaPushNotificationByTypeMutationVariables>(
    'OptOutEWAPushNotificationByType',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockOptInEwaPushNotificationByFeatureMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ ewaPushNotification })
 *   )
 * })
 */
export const mockOptInEwaPushNotificationByFeatureMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<OptInEwaPushNotificationByFeatureMutationVariables>,
    GraphQLContext<OptInEwaPushNotificationByFeatureMutation>,
    any
  >
) =>
  graphql.mutation<OptInEwaPushNotificationByFeatureMutation, OptInEwaPushNotificationByFeatureMutationVariables>(
    'OptInEWAPushNotificationByFeature',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockOptOutEwaPushNotificationByFeatureMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ ewaPushNotification })
 *   )
 * })
 */
export const mockOptOutEwaPushNotificationByFeatureMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<OptOutEwaPushNotificationByFeatureMutationVariables>,
    GraphQLContext<OptOutEwaPushNotificationByFeatureMutation>,
    any
  >
) =>
  graphql.mutation<OptOutEwaPushNotificationByFeatureMutation, OptOutEwaPushNotificationByFeatureMutationVariables>(
    'OptOutEWAPushNotificationByFeature',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetEventsPaginatedQuery((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetEventsPaginatedQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetEventsPaginatedQueryVariables>,
    GraphQLContext<GetEventsPaginatedQuery>,
    any
  >
) => graphql.query<GetEventsPaginatedQuery, GetEventsPaginatedQueryVariables>('GetEventsPaginated', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetFundNotifyPreferenceQuery((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetFundNotifyPreferenceQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetFundNotifyPreferenceQueryVariables>,
    GraphQLContext<GetFundNotifyPreferenceQuery>,
    any
  >
) =>
  graphql.query<GetFundNotifyPreferenceQuery, GetFundNotifyPreferenceQueryVariables>(
    'GetFundNotifyPreference',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockAcceptEventMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ lifecycle })
 *   )
 * })
 */
export const mockAcceptEventMutation = (
  resolver: ResponseResolver<GraphQLRequest<AcceptEventMutationVariables>, GraphQLContext<AcceptEventMutation>, any>
) => graphql.mutation<AcceptEventMutation, AcceptEventMutationVariables>('AcceptEvent', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateTrackingMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ lifecycle })
 *   )
 * })
 */
export const mockCreateTrackingMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<CreateTrackingMutationVariables>,
    GraphQLContext<CreateTrackingMutation>,
    any
  >
) => graphql.mutation<CreateTrackingMutation, CreateTrackingMutationVariables>('CreateTracking', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetLocationsQuery((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ getLocations })
 *   )
 * })
 */
export const mockGetLocationsQuery = (
  resolver: ResponseResolver<GraphQLRequest<GetLocationsQueryVariables>, GraphQLContext<GetLocationsQuery>, any>
) => graphql.query<GetLocationsQuery, GetLocationsQueryVariables>('GetLocations', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetLocationByPlaceIdQuery((req, res, ctx) => {
 *   const { placeId } = req.variables;
 *   return res(
 *     ctx.data({ getLocationByPlaceId })
 *   )
 * })
 */
export const mockGetLocationByPlaceIdQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetLocationByPlaceIdQueryVariables>,
    GraphQLContext<GetLocationByPlaceIdQuery>,
    any
  >
) => graphql.query<GetLocationByPlaceIdQuery, GetLocationByPlaceIdQueryVariables>('GetLocationByPlaceId', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetPayAccountQuery((req, res, ctx) => {
 *   const { orgId, memberId } = req.variables;
 *   return res(
 *     ctx.data({ me })
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
 * mockSavePayAccountMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ savePaySplit })
 *   )
 * })
 */
export const mockSavePayAccountMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<SavePayAccountMutationVariables>,
    GraphQLContext<SavePayAccountMutation>,
    any
  >
) => graphql.mutation<SavePayAccountMutation, SavePayAccountMutationVariables>('SavePayAccount', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetAllocationsQuery((req, res, ctx) => {
 *   const { orgId } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetAllocationsQuery = (
  resolver: ResponseResolver<GraphQLRequest<GetAllocationsQueryVariables>, GraphQLContext<GetAllocationsQuery>, any>
) => graphql.query<GetAllocationsQuery, GetAllocationsQueryVariables>('GetAllocations', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateStripeClientTokenMutation((req, res, ctx) => {
 *   const { createStripeClientTokenInput } = req.variables;
 *   return res(
 *     ctx.data({ payment })
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
 *   const { makeStripePaymentInput } = req.variables;
 *   return res(
 *     ctx.data({ payment })
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
 * mockCreateStashMutation((req, res, ctx) => {
 *   const { stashInput } = req.variables;
 *   return res(
 *     ctx.data({ createStash })
 *   )
 * })
 */
export const mockCreateStashMutation = (
  resolver: ResponseResolver<GraphQLRequest<CreateStashMutationVariables>, GraphQLContext<CreateStashMutation>, any>
) => graphql.mutation<CreateStashMutation, CreateStashMutationVariables>('createStash', resolver);

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
) => graphql.mutation<CloseStashMutation, CloseStashMutationVariables>('closeStash', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDepositToStashMutation((req, res, ctx) => {
 *   const { stashId, input } = req.variables;
 *   return res(
 *     ctx.data({ depositToStash })
 *   )
 * })
 */
export const mockDepositToStashMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<DepositToStashMutationVariables>,
    GraphQLContext<DepositToStashMutation>,
    any
  >
) => graphql.mutation<DepositToStashMutation, DepositToStashMutationVariables>('depositToStash', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockWithdrawFromStashMutation((req, res, ctx) => {
 *   const { stashId, input } = req.variables;
 *   return res(
 *     ctx.data({ withdrawFromStash })
 *   )
 * })
 */
export const mockWithdrawFromStashMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<WithdrawFromStashMutationVariables>,
    GraphQLContext<WithdrawFromStashMutation>,
    any
  >
) => graphql.mutation<WithdrawFromStashMutation, WithdrawFromStashMutationVariables>('withdrawFromStash', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockSetStashMetadataMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ setStashMetadata })
 *   )
 * })
 */
export const mockSetStashMetadataMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<SetStashMetadataMutationVariables>,
    GraphQLContext<SetStashMetadataMutation>,
    any
  >
) => graphql.mutation<SetStashMetadataMutation, SetStashMetadataMutationVariables>('setStashMetadata', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetStashesQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetStashesQuery = (
  resolver: ResponseResolver<GraphQLRequest<GetStashesQueryVariables>, GraphQLContext<GetStashesQuery>, any>
) => graphql.query<GetStashesQuery, GetStashesQueryVariables>('getStashes', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetStashMetadataQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetStashMetadataQuery = (
  resolver: ResponseResolver<GraphQLRequest<GetStashMetadataQueryVariables>, GraphQLContext<GetStashMetadataQuery>, any>
) => graphql.query<GetStashMetadataQuery, GetStashMetadataQueryVariables>('getStashMetadata', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetStashTransactionsQuery((req, res, ctx) => {
 *   const { stashId, limit, offset } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetStashTransactionsQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetStashTransactionsQueryVariables>,
    GraphQLContext<GetStashTransactionsQuery>,
    any
  >
) => graphql.query<GetStashTransactionsQuery, GetStashTransactionsQueryVariables>('getStashTransactions', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetActiveSuperfundMembershipsQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetActiveSuperfundMembershipsQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetActiveSuperfundMembershipsQueryVariables>,
    GraphQLContext<GetActiveSuperfundMembershipsQuery>,
    any
  >
) =>
  graphql.query<GetActiveSuperfundMembershipsQuery, GetActiveSuperfundMembershipsQueryVariables>(
    'GetActiveSuperfundMemberships',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetSwagSuperfundAndSuperContributionQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetSwagSuperfundAndSuperContributionQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetSwagSuperfundAndSuperContributionQueryVariables>,
    GraphQLContext<GetSwagSuperfundAndSuperContributionQuery>,
    any
  >
) =>
  graphql.query<GetSwagSuperfundAndSuperContributionQuery, GetSwagSuperfundAndSuperContributionQueryVariables>(
    'GetSwagSuperfundAndSuperContribution',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetSuperContributionsQuery((req, res, ctx) => {
 *   const { statusIn } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetSuperContributionsQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetSuperContributionsQueryVariables>,
    GraphQLContext<GetSuperContributionsQuery>,
    any
  >
) => graphql.query<GetSuperContributionsQuery, GetSuperContributionsQueryVariables>('GetSuperContributions', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetSuperConsolidationQuery((req, res, ctx) => {
 *   const { usi } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetSuperConsolidationQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetSuperConsolidationQueryVariables>,
    GraphQLContext<GetSuperConsolidationQuery>,
    any
  >
) => graphql.query<GetSuperConsolidationQuery, GetSuperConsolidationQueryVariables>('GetSuperConsolidation', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetSuperConsolidationSupportRequestQuery((req, res, ctx) => {
 *   const { usi } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetSuperConsolidationSupportRequestQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetSuperConsolidationSupportRequestQueryVariables>,
    GraphQLContext<GetSuperConsolidationSupportRequestQuery>,
    any
  >
) =>
  graphql.query<GetSuperConsolidationSupportRequestQuery, GetSuperConsolidationSupportRequestQueryVariables>(
    'GetSuperConsolidationSupportRequest',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateSwagSuperfundMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ createSwagSuperfund })
 *   )
 * })
 */
export const mockCreateSwagSuperfundMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<CreateSwagSuperfundMutationVariables>,
    GraphQLContext<CreateSwagSuperfundMutation>,
    any
  >
) =>
  graphql.mutation<CreateSwagSuperfundMutation, CreateSwagSuperfundMutationVariables>('CreateSwagSuperfund', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockSubmitSuperContributionMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ submitSuperContribution })
 *   )
 * })
 */
export const mockSubmitSuperContributionMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<SubmitSuperContributionMutationVariables>,
    GraphQLContext<SubmitSuperContributionMutation>,
    any
  >
) =>
  graphql.mutation<SubmitSuperContributionMutation, SubmitSuperContributionMutationVariables>(
    'SubmitSuperContribution',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockStopContributionByContributionIdMutation((req, res, ctx) => {
 *   const { id } = req.variables;
 *   return res(
 *     ctx.data({ stopContributionByContributionId })
 *   )
 * })
 */
export const mockStopContributionByContributionIdMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<StopContributionByContributionIdMutationVariables>,
    GraphQLContext<StopContributionByContributionIdMutation>,
    any
  >
) =>
  graphql.mutation<StopContributionByContributionIdMutation, StopContributionByContributionIdMutationVariables>(
    'StopContributionByContributionId',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateSuperConsolidationMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ createSuperConsolidation })
 *   )
 * })
 */
export const mockCreateSuperConsolidationMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<CreateSuperConsolidationMutationVariables>,
    GraphQLContext<CreateSuperConsolidationMutation>,
    any
  >
) =>
  graphql.mutation<CreateSuperConsolidationMutation, CreateSuperConsolidationMutationVariables>(
    'CreateSuperConsolidation',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateSuperConsolidationSupportRequestMutation((req, res, ctx) => {
 *   const { usi } = req.variables;
 *   return res(
 *     ctx.data({ createSuperConsolidationRequestSupport })
 *   )
 * })
 */
export const mockCreateSuperConsolidationSupportRequestMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<CreateSuperConsolidationSupportRequestMutationVariables>,
    GraphQLContext<CreateSuperConsolidationSupportRequestMutation>,
    any
  >
) =>
  graphql.mutation<
    CreateSuperConsolidationSupportRequestMutation,
    CreateSuperConsolidationSupportRequestMutationVariables
  >('CreateSuperConsolidationSupportRequest', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateSsaComplaintTicketMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ createSSAComplaintTicket })
 *   )
 * })
 */
export const mockCreateSsaComplaintTicketMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<CreateSsaComplaintTicketMutationVariables>,
    GraphQLContext<CreateSsaComplaintTicketMutation>,
    any
  >
) =>
  graphql.mutation<CreateSsaComplaintTicketMutation, CreateSsaComplaintTicketMutationVariables>(
    'CreateSSAComplaintTicket',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateComplaintTicketMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ createComplaintTicket })
 *   )
 * })
 */
export const mockCreateComplaintTicketMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<CreateComplaintTicketMutationVariables>,
    GraphQLContext<CreateComplaintTicketMutation>,
    any
  >
) =>
  graphql.mutation<CreateComplaintTicketMutation, CreateComplaintTicketMutationVariables>(
    'CreateComplaintTicket',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetBuyAgainGiftCardsQuery((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetBuyAgainGiftCardsQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetBuyAgainGiftCardsQueryVariables>,
    GraphQLContext<GetBuyAgainGiftCardsQuery>,
    any
  >
) => graphql.query<GetBuyAgainGiftCardsQuery, GetBuyAgainGiftCardsQueryVariables>('GetBuyAgainGiftCards', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetDiscountOrderHistoryQuery((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetDiscountOrderHistoryQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetDiscountOrderHistoryQueryVariables>,
    GraphQLContext<GetDiscountOrderHistoryQuery>,
    any
  >
) =>
  graphql.query<GetDiscountOrderHistoryQuery, GetDiscountOrderHistoryQueryVariables>(
    'GetDiscountOrderHistory',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetSsAllOffersQuery((req, res, ctx) => {
 *   const { allOffersInput } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetSsAllOffersQuery = (
  resolver: ResponseResolver<GraphQLRequest<GetSsAllOffersQueryVariables>, GraphQLContext<GetSsAllOffersQuery>, any>
) => graphql.query<GetSsAllOffersQuery, GetSsAllOffersQueryVariables>('GetSSAllOffers', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetStripePublishableKeyQuery((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetStripePublishableKeyQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetStripePublishableKeyQueryVariables>,
    GraphQLContext<GetStripePublishableKeyQuery>,
    any
  >
) =>
  graphql.query<GetStripePublishableKeyQuery, GetStripePublishableKeyQueryVariables>(
    'GetStripePublishableKey',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetDiscountShopProductDetailQuery((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetDiscountShopProductDetailQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetDiscountShopProductDetailQueryVariables>,
    GraphQLContext<GetDiscountShopProductDetailQuery>,
    any
  >
) =>
  graphql.query<GetDiscountShopProductDetailQuery, GetDiscountShopProductDetailQueryVariables>(
    'GetDiscountShopProductDetail',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetNoOrgPermissionsQuery((req, res, ctx) => {
 *   const { candidate } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetNoOrgPermissionsQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetNoOrgPermissionsQueryVariables>,
    GraphQLContext<GetNoOrgPermissionsQuery>,
    any
  >
) => graphql.query<GetNoOrgPermissionsQuery, GetNoOrgPermissionsQueryVariables>('GetNoOrgPermissions', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetCurrentUserQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetCurrentUserQuery = (
  resolver: ResponseResolver<GraphQLRequest<GetCurrentUserQueryVariables>, GraphQLContext<GetCurrentUserQuery>, any>
) => graphql.query<GetCurrentUserQuery, GetCurrentUserQueryVariables>('GetCurrentUser', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetEhUserInitializationDetailsQuery((req, res, ctx) => {
 *   const { orgId } = req.variables;
 *   return res(
 *     ctx.data({ me })
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
 *   return res(
 *     ctx.data({ me })
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
 * mockGetMoneyProfileQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetMoneyProfileQuery = (
  resolver: ResponseResolver<GraphQLRequest<GetMoneyProfileQueryVariables>, GraphQLContext<GetMoneyProfileQuery>, any>
) => graphql.query<GetMoneyProfileQuery, GetMoneyProfileQueryVariables>('GetMoneyProfile', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockMinSupportVersionQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
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
 * mockUserPermissionQuery((req, res, ctx) => {
 *   const { permissionRequest } = req.variables;
 *   return res(
 *     ctx.data({ me })
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
 * mockUpdateMailingAddressMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ user })
 *   )
 * })
 */
export const mockUpdateMailingAddressMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<UpdateMailingAddressMutationVariables>,
    GraphQLContext<UpdateMailingAddressMutation>,
    any
  >
) =>
  graphql.mutation<UpdateMailingAddressMutation, UpdateMailingAddressMutationVariables>(
    'UpdateMailingAddress',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockPatchProfileMutation((req, res, ctx) => {
 *   const { patch } = req.variables;
 *   return res(
 *     ctx.data({ user })
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
 * mockStartUkWalletCreationMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ startUKWalletCreation })
 *   )
 * })
 */
export const mockStartUkWalletCreationMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<StartUkWalletCreationMutationVariables>,
    GraphQLContext<StartUkWalletCreationMutation>,
    any
  >
) =>
  graphql.mutation<StartUkWalletCreationMutation, StartUkWalletCreationMutationVariables>(
    'StartUkWalletCreation',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockStartUkKycMutation((req, res, ctx) => {
 *   return res(
 *     ctx.data({ startUKKYC })
 *   )
 * })
 */
export const mockStartUkKycMutation = (
  resolver: ResponseResolver<GraphQLRequest<StartUkKycMutationVariables>, GraphQLContext<StartUkKycMutation>, any>
) => graphql.mutation<StartUkKycMutation, StartUkKycMutationVariables>('StartUkKYC', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetUkTokenQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
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
 * mockCreateUkCardMutation((req, res, ctx) => {
 *   const { input, accessToken } = req.variables;
 *   return res(
 *     ctx.data({ createUKCard })
 *   )
 * })
 */
export const mockCreateUkCardMutation = (
  resolver: ResponseResolver<GraphQLRequest<CreateUkCardMutationVariables>, GraphQLContext<CreateUkCardMutation>, any>
) => graphql.mutation<CreateUkCardMutation, CreateUkCardMutationVariables>('CreateUKCard', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetEWalletUkAccountDetailsQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetEWalletUkAccountDetailsQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetEWalletUkAccountDetailsQueryVariables>,
    GraphQLContext<GetEWalletUkAccountDetailsQuery>,
    any
  >
) =>
  graphql.query<GetEWalletUkAccountDetailsQuery, GetEWalletUkAccountDetailsQueryVariables>(
    'GetEWalletUKAccountDetails',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetEWalletAuAccountDetailsQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetEWalletAuAccountDetailsQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetEWalletAuAccountDetailsQueryVariables>,
    GraphQLContext<GetEWalletAuAccountDetailsQuery>,
    any
  >
) =>
  graphql.query<GetEWalletAuAccountDetailsQuery, GetEWalletAuAccountDetailsQueryVariables>(
    'GetEWalletAUAccountDetails',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetEWalletUkCurrentPaymentCardDetailsQuery((req, res, ctx) => {
 *   const { accessToken } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetEWalletUkCurrentPaymentCardDetailsQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetEWalletUkCurrentPaymentCardDetailsQueryVariables>,
    GraphQLContext<GetEWalletUkCurrentPaymentCardDetailsQuery>,
    any
  >
) =>
  graphql.query<GetEWalletUkCurrentPaymentCardDetailsQuery, GetEWalletUkCurrentPaymentCardDetailsQueryVariables>(
    'GetEWalletUKCurrentPaymentCardDetails',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetEWalletUkPaymentCardProvisioningDetailsQuery((req, res, ctx) => {
 *   const { accessToken } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetEWalletUkPaymentCardProvisioningDetailsQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetEWalletUkPaymentCardProvisioningDetailsQueryVariables>,
    GraphQLContext<GetEWalletUkPaymentCardProvisioningDetailsQuery>,
    any
  >
) =>
  graphql.query<
    GetEWalletUkPaymentCardProvisioningDetailsQuery,
    GetEWalletUkPaymentCardProvisioningDetailsQueryVariables
  >('GetEWalletUKPaymentCardProvisioningDetails', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockBlockUkCardMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ blockUKCard })
 *   )
 * })
 */
export const mockBlockUkCardMutation = (
  resolver: ResponseResolver<GraphQLRequest<BlockUkCardMutationVariables>, GraphQLContext<BlockUkCardMutation>, any>
) => graphql.mutation<BlockUkCardMutation, BlockUkCardMutationVariables>('BlockUKCard', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUnblockUkCardMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ unblockUKCard })
 *   )
 * })
 */
export const mockUnblockUkCardMutation = (
  resolver: ResponseResolver<GraphQLRequest<UnblockUkCardMutationVariables>, GraphQLContext<UnblockUkCardMutation>, any>
) => graphql.mutation<UnblockUkCardMutation, UnblockUkCardMutationVariables>('UnblockUKCard', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateUkPasscodeMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ setUKPasscode })
 *   )
 * })
 */
export const mockCreateUkPasscodeMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<CreateUkPasscodeMutationVariables>,
    GraphQLContext<CreateUkPasscodeMutation>,
    any
  >
) => graphql.mutation<CreateUkPasscodeMutation, CreateUkPasscodeMutationVariables>('createUKPasscode', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetIdvProfileV2Query((req, res, ctx) => {
 *   const { country } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetIdvProfileV2Query = (
  resolver: ResponseResolver<GraphQLRequest<GetIdvProfileV2QueryVariables>, GraphQLContext<GetIdvProfileV2Query>, any>
) => graphql.query<GetIdvProfileV2Query, GetIdvProfileV2QueryVariables>('GetIDVProfileV2', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockSendUkFundMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ sendUkFund })
 *   )
 * })
 */
export const mockSendUkFundMutation = (
  resolver: ResponseResolver<GraphQLRequest<SendUkFundMutationVariables>, GraphQLContext<SendUkFundMutation>, any>
) => graphql.mutation<SendUkFundMutation, SendUkFundMutationVariables>('sendUkFund', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetWalletTransactionsV2Query((req, res, ctx) => {
 *   const { limit, offset, country } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetWalletTransactionsV2Query = (
  resolver: ResponseResolver<
    GraphQLRequest<GetWalletTransactionsV2QueryVariables>,
    GraphQLContext<GetWalletTransactionsV2Query>,
    any
  >
) =>
  graphql.query<GetWalletTransactionsV2Query, GetWalletTransactionsV2QueryVariables>(
    'GetWalletTransactionsV2',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetUkTransactionStateQuery((req, res, ctx) => {
 *   const { externalTransactionId } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetUkTransactionStateQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetUkTransactionStateQueryVariables>,
    GraphQLContext<GetUkTransactionStateQuery>,
    any
  >
) => graphql.query<GetUkTransactionStateQuery, GetUkTransactionStateQueryVariables>('GetUkTransactionState', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateScheduledPaymentMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ createScheduledPayment })
 *   )
 * })
 */
export const mockCreateScheduledPaymentMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<CreateScheduledPaymentMutationVariables>,
    GraphQLContext<CreateScheduledPaymentMutation>,
    any
  >
) =>
  graphql.mutation<CreateScheduledPaymentMutation, CreateScheduledPaymentMutationVariables>(
    'CreateScheduledPayment',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetActiveScheduledPaymentsQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetActiveScheduledPaymentsQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetActiveScheduledPaymentsQueryVariables>,
    GraphQLContext<GetActiveScheduledPaymentsQuery>,
    any
  >
) =>
  graphql.query<GetActiveScheduledPaymentsQuery, GetActiveScheduledPaymentsQueryVariables>(
    'GetActiveScheduledPayments',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCancelScheduledPaymentMutation((req, res, ctx) => {
 *   const { externalScheduledPaymentId } = req.variables;
 *   return res(
 *     ctx.data({ cancelScheduledPayment })
 *   )
 * })
 */
export const mockCancelScheduledPaymentMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<CancelScheduledPaymentMutationVariables>,
    GraphQLContext<CancelScheduledPaymentMutation>,
    any
  >
) =>
  graphql.mutation<CancelScheduledPaymentMutation, CancelScheduledPaymentMutationVariables>(
    'CancelScheduledPayment',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockSavePayeeAddressMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ savePayeeAddress })
 *   )
 * })
 */
export const mockSavePayeeAddressMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<SavePayeeAddressMutationVariables>,
    GraphQLContext<SavePayeeAddressMutation>,
    any
  >
) => graphql.mutation<SavePayeeAddressMutation, SavePayeeAddressMutationVariables>('SavePayeeAddress', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetAllPayeeAddressesQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetAllPayeeAddressesQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetAllPayeeAddressesQueryVariables>,
    GraphQLContext<GetAllPayeeAddressesQuery>,
    any
  >
) => graphql.query<GetAllPayeeAddressesQuery, GetAllPayeeAddressesQueryVariables>('GetAllPayeeAddresses', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockRemovePayeeAddressMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ removePayeeAddress })
 *   )
 * })
 */
export const mockRemovePayeeAddressMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<RemovePayeeAddressMutationVariables>,
    GraphQLContext<RemovePayeeAddressMutation>,
    any
  >
) => graphql.mutation<RemovePayeeAddressMutation, RemovePayeeAddressMutationVariables>('RemovePayeeAddress', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockStartValidateUkPhoneNumberMutation((req, res, ctx) => {
 *   return res(
 *     ctx.data({ startValidateUkPhoneNumber })
 *   )
 * })
 */
export const mockStartValidateUkPhoneNumberMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<StartValidateUkPhoneNumberMutationVariables>,
    GraphQLContext<StartValidateUkPhoneNumberMutation>,
    any
  >
) =>
  graphql.mutation<StartValidateUkPhoneNumberMutation, StartValidateUkPhoneNumberMutationVariables>(
    'StartValidateUkPhoneNumber',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockVerifyUkMobileEnrollmentMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ verifyUkPhoneNumber })
 *   )
 * })
 */
export const mockVerifyUkMobileEnrollmentMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<VerifyUkMobileEnrollmentMutationVariables>,
    GraphQLContext<VerifyUkMobileEnrollmentMutation>,
    any
  >
) =>
  graphql.mutation<VerifyUkMobileEnrollmentMutation, VerifyUkMobileEnrollmentMutationVariables>(
    'VerifyUkMobileEnrollment',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetUkAuthFactorsQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetUkAuthFactorsQuery = (
  resolver: ResponseResolver<GraphQLRequest<GetUkAuthFactorsQueryVariables>, GraphQLContext<GetUkAuthFactorsQuery>, any>
) => graphql.query<GetUkAuthFactorsQuery, GetUkAuthFactorsQueryVariables>('GetUkAuthFactors', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUnlinkUkDeviceMutation((req, res, ctx) => {
 *   return res(
 *     ctx.data({ unlinkUkDevice })
 *   )
 * })
 */
export const mockUnlinkUkDeviceMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<UnlinkUkDeviceMutationVariables>,
    GraphQLContext<UnlinkUkDeviceMutation>,
    any
  >
) => graphql.mutation<UnlinkUkDeviceMutation, UnlinkUkDeviceMutationVariables>('UnlinkUkDevice', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetUkLatestStepUpResultQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetUkLatestStepUpResultQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetUkLatestStepUpResultQueryVariables>,
    GraphQLContext<GetUkLatestStepUpResultQuery>,
    any
  >
) =>
  graphql.query<GetUkLatestStepUpResultQuery, GetUkLatestStepUpResultQueryVariables>(
    'GetUkLatestStepUpResult',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetWalletStatusQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetWalletStatusQuery = (
  resolver: ResponseResolver<GraphQLRequest<GetWalletStatusQueryVariables>, GraphQLContext<GetWalletStatusQuery>, any>
) => graphql.query<GetWalletStatusQuery, GetWalletStatusQueryVariables>('GetWalletStatus', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetWalletNotificationQuery((req, res, ctx) => {
 *   const { country } = req.variables;
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetWalletNotificationQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetWalletNotificationQueryVariables>,
    GraphQLContext<GetWalletNotificationQuery>,
    any
  >
) => graphql.query<GetWalletNotificationQuery, GetWalletNotificationQueryVariables>('getWalletNotification', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetPersistentNotificationsQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
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
    'getPersistentNotifications',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockInitiateEWalletSetupMutation((req, res, ctx) => {
 *   return res(
 *     ctx.data({ initiateAUWallet })
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
    'initiateEWalletSetup',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockSaveWalletSetupMutation((req, res, ctx) => {
 *   const { setupDetails } = req.variables;
 *   return res(
 *     ctx.data({ saveAUWalletSetup })
 *   )
 * })
 */
export const mockSaveWalletSetupMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<SaveWalletSetupMutationVariables>,
    GraphQLContext<SaveWalletSetupMutation>,
    any
  >
) => graphql.mutation<SaveWalletSetupMutation, SaveWalletSetupMutationVariables>('saveWalletSetup', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockTransferAuWalletFundsMutation((req, res, ctx) => {
 *   const { transferDetails } = req.variables;
 *   return res(
 *     ctx.data({ transferAUWalletFunds })
 *   )
 * })
 */
export const mockTransferAuWalletFundsMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<TransferAuWalletFundsMutationVariables>,
    GraphQLContext<TransferAuWalletFundsMutation>,
    any
  >
) =>
  graphql.mutation<TransferAuWalletFundsMutation, TransferAuWalletFundsMutationVariables>(
    'transferAUWalletFunds',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockClearPersistentNotificationMutation((req, res, ctx) => {
 *   const { type } = req.variables;
 *   return res(
 *     ctx.data({ clearPersistentNotifications })
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
    'clearPersistentNotification',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockStoreEventMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ storeEvent })
 *   )
 * })
 */
export const mockStoreEventMutation = (
  resolver: ResponseResolver<GraphQLRequest<StoreEventMutationVariables>, GraphQLContext<StoreEventMutation>, any>
) => graphql.mutation<StoreEventMutation, StoreEventMutationVariables>('storeEvent', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetSsaCarouselTimestampQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockGetSsaCarouselTimestampQuery = (
  resolver: ResponseResolver<
    GraphQLRequest<GetSsaCarouselTimestampQueryVariables>,
    GraphQLContext<GetSsaCarouselTimestampQuery>,
    any
  >
) =>
  graphql.query<GetSsaCarouselTimestampQuery, GetSsaCarouselTimestampQueryVariables>(
    'GetSSACarouselTimestamp',
    resolver
  );

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockSeenSsaCarouselMutation((req, res, ctx) => {
 *   return res(
 *     ctx.data({ seenSSACarousel })
 *   )
 * })
 */
export const mockSeenSsaCarouselMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<SeenSsaCarouselMutationVariables>,
    GraphQLContext<SeenSsaCarouselMutation>,
    any
  >
) => graphql.mutation<SeenSsaCarouselMutation, SeenSsaCarouselMutationVariables>('SeenSSACarousel', resolver);

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateWalletProfileMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ updateWalletProfile })
 *   )
 * })
 */
export const mockUpdateWalletProfileMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<UpdateWalletProfileMutationVariables>,
    GraphQLContext<UpdateWalletProfileMutation>,
    any
  >
) =>
  graphql.mutation<UpdateWalletProfileMutation, UpdateWalletProfileMutationVariables>('UpdateWalletProfile', resolver);
