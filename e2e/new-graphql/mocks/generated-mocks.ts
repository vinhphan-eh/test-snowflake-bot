import type {
  AcceptEventInput,
  AcceptEventPayload,
  ActiveSuperfundMembership,
  AddEventPayload,
  AddPreferInstapayOptionPayload,
  Address,
  AddressInput,
  Advertiser,
  AdvertiserEdge,
  AllAdvertisers,
  AllAdvertisersInput,
  AllOfferEdge,
  AllOffers,
  AllOffersInput,
  AuPayeeAddress,
  AuPaymentRecipient,
  BsbTransferPayeeAddress,
  BsbTransferPeerDetails,
  BankAccountDetails,
  BankAccountSsaInput,
  BankAccountSortCodeInput,
  BeneficiaryInformation,
  Benefits,
  BenefitsMinSupportVersion,
  BillManagement,
  BillTransaction,
  BlockUnblockCardInput,
  BmOffer,
  BmOfferEdge,
  BmOfferInput,
  BmOffers,
  BmSubmitSubscriptionPayload,
  BsJoinWaitListInput,
  BsJoinWaitListPayload,
  BsSubmitSubscriptionInput,
  BsUpdateViewIntroductionPayload,
  BuyAgainGiftCardEdge,
  BuyAgainGiftCards,
  CancelInstaPayDailySubscriptionInput,
  CancelInstaPayDailySubscriptionPayload,
  CancelRecurringByDayInput,
  CancelRecurringByDayPayload,
  CancelSchedulingSubscriptionInput,
  Card,
  CardActivateMutationPayload,
  CardCreateMutationPayload,
  CardDetails,
  CardMeta,
  CardMetaInput,
  CardMutation,
  CardRequestNewMutationPayload,
  CardUpdateMetaMutationPayload,
  CardUpdatePinMutationPayload,
  Cashback,
  CashbackAcceptTncPayload,
  CashbackBank,
  CashbackBankEdge,
  CashbackBanks,
  CashbackCard,
  CashbackDeleteCardInput,
  CashbackDeleteCardPayload,
  CashbackMutation,
  CashbackTermsAndConditions,
  CashbackTermsAndConditionsAcceptance,
  CashbackTermsAndConditionsItem,
  CashbackTransaction,
  CashbackTransactionEdge,
  CashbackTransactionsV2,
  CashbackTransactionsV2Input,
  CashbackUserInfo,
  CashbackUserToken,
  Category,
  CommonAddress,
  CommonAddressInput,
  CreateCardInput,
  CreateComplaintTicketInput,
  CreateComplaintTicketPayload,
  CreateConsentGroupAgreementInput,
  CreateDailypaySubscriptionInput,
  CreateDailypaySubscriptionPayload,
  CreateSsaComplaintTicketInput,
  CreateSsaComplaintTicketPayload,
  CreateScheduledPaymentInput,
  CreateScheduledPaymentPayload,
  CreateSchedulingSubscriptionInput,
  CreateStashInput,
  CreateStripeClientTokenInput,
  CreateSuperConsolidationInput,
  CreateSuperConsolidationPayload,
  CreateSuperConsolidationRequestSupportPayload,
  CreateSwagSuperfundInput,
  CreateSwagSuperfundPayload,
  CreateTrackingPayload,
  CreateUkCardInput,
  CreateUkCardPayload,
  CtaCaptions,
  CurrencyAmount,
  Dailypay,
  DailypayMutation,
  DailypaySubscription,
  DailypaySubscriptionFee,
  DailypaySummary,
  DepositToStashInput,
  DigitalWallet,
  DigitalWalletDetails,
  DisableEarnedWageAccessFeaturesInput,
  DisableEarnedWageAccessFeaturesPayload,
  DiscountHistory,
  DiscountOrderHistory,
  DiscountOrderHistoryEdge,
  DiscountOrderHistoryInput,
  DiscountShopProductDetailsInput,
  DrawdownInput,
  DrawdownPayload,
  EwaPushNotification,
  EwaPushNotificationMutation,
  EwaPushNotificationOptInStatusByFeature,
  EwaPushNotificationOptInStatusByType,
  EwaPushNotificationOptInStatusForSingleType,
  EhBinRange,
  EhMembership,
  EhProfile,
  EhProfilePatchInput,
  EhProviderId,
  EligibleForPromotionInput,
  Error,
  EstimatedIncomePayload,
  EventInput,
  EventLogPayloadTuple,
  EventMutation,
  Experiment,
  ExperimentMutation,
  FastPaymentRecipientInput,
  FasterPaymentsTransferPeerDetails,
  FeatureOfferEdge,
  FeatureOffers,
  FeatureVisibility,
  FeaturesOffersInput,
  Fee,
  FinancialTransaction,
  FinancialTransactionState,
  FloatAccountMutation,
  FundNotifyPreference,
  GenericError,
  Geometry,
  GetEventsInput,
  GetFundNotifyPreferenceInput,
  GetLocationByPlaceIdResponse,
  GetLocationsRequest,
  GetLocationsResponse,
  GetSchedulingSubscription,
  GoogleAddress,
  GoogleAddressDetails,
  Group,
  GroupCategory,
  GroupDetail,
  GroupMembership,
  GroupMutation,
  GroupRoot,
  GroupWaitList,
  HeroPoints,
  HeroPointsMutation,
  HeroPointsPaymentPreferences,
  HeroPointsTransaction,
  HeroPointsTransactionHistories,
  HeroPointsTransactionItem,
  HomeTileDetail,
  HomeTiles,
  HrOrg,
  HrUser,
  IdvProfile,
  InStoreOffer,
  InStoreOfferEdge,
  InStoreOffers,
  InStoreOffersInput,
  InStoreRequireLatLong,
  IncomeDeduction,
  InstaPayDailyVisibility,
  InstaPayNowVisibility,
  Instapay,
  InstapayAds,
  InstapayBalance,
  InstapayBalanceErrorContext,
  InstapayBankAccount,
  InstapayError,
  InstapayEstBalance,
  InstapayEstBalanceError,
  InstapayMutation,
  InstapayNowIncentive,
  InstapayNowIncentivePayload,
  InstapayNowIncentiveProcess,
  InstapayOptionInput,
  InstapayTransaction,
  InstapayTransactionBankAccount,
  InstapayTransactions,
  InstapayTransactionsFilterInput,
  InstapayTransactionsPageInfo,
  InstapayUsage,
  InstapayWithdrawalLimit,
  InstoreOfferV2,
  InstoreOffersV2,
  JoinGroupInput,
  JoinGroupPayload,
  JoinWaitListInput,
  Lifecycle,
  LifecycleEvent,
  LifecycleMutation,
  LifecycleTrackingInput,
  LinkedCards,
  Locations,
  MakePaymentItem,
  MakePaymentPaymentMethod,
  MakeStripePaymentInput,
  MakeStripePaymentPayload,
  MemberDetail,
  MinSupportVersion,
  Money,
  MoneyInput,
  MoneyV2,
  MoneyV2Input,
  Mutation,
  MutationSuccessPayload,
  NewBeneficiaryInput,
  NewBeneficiaryPayload,
  NoOrgPermissions,
  OemProvisioning,
  OfferInput,
  OfferLocation,
  OnboardStatus,
  OnboardUserPayload,
  OnlineOffer,
  OnlineOfferEdge,
  OnlineOffers,
  OnlineOffersInput,
  OptInEwaPushNotificationByFeatureInput,
  OptInEwaPushNotificationByTypeInput,
  OptInOutEwaPushNotificationPayload,
  OptOutEwaPushNotificationByFeatureInput,
  OptOutEwaPushNotificationByTypeInput,
  OrderDetails,
  OrderProduct,
  OrderProductVariant,
  OrderPurchaseItem,
  OrderPurchaseItemData,
  OrderPurchaseItemFulfil,
  PageInfo,
  PayAccountAllocation,
  PayAccountInput,
  PayAllocation,
  PayPeriod,
  PaySplit,
  PaySplitInput,
  PaymentCardDetails,
  PaymentClientTokenPayload,
  PaymentMutation,
  PaymentTransaction,
  Permission,
  PersistentNotification,
  PersonalName,
  PersonalNameInput,
  PhoneNumber,
  PhoneNumberInput,
  Product,
  ProfileChangeRequest,
  ProfileChangeRequestPayload,
  Promotion,
  Provider,
  ProviderEdge,
  Providers,
  ProvidersInput,
  PublishableKey,
  Query,
  RecurringByAmountEligibilityResult,
  RecurringByDay,
  RecurringByDayEstimatedBalance,
  RecurringByDayMutation,
  RecurringByDayPayCycleEstBalance,
  RecurringByDayPreview,
  RecurringByDaySubscription,
  RecurringByDayVisibility,
  Reminder,
  RemovePayeeAddressInput,
  RemovePayeeAddressItem,
  RequestNewCardInput,
  SsAllOffersInput,
  SsBuyAgainGiftCardsInput,
  SaveAuWalletSetupInput,
  SaveAuWalletSetupPayload,
  SavePayeeAddressInput,
  ScheduledPayment,
  ScheduledPaymentSaveResponseDetails,
  SchedulingSubscription,
  SchedulingSubscriptionResult,
  SendUkFundInput,
  SendUkFundPayload,
  SetStashMetadataInput,
  SetUkPasscodeInput,
  SetupStatus,
  ShopImage,
  ShopImageDetails,
  ShopProductDetails,
  ShopProductDetailsResponse,
  ShopProductSupplier,
  ShopProductVariant,
  StartUkkycPayload,
  StartUkWalletCreationInput,
  StartUkWalletCreationPayload,
  Stash,
  StashItem,
  StashMetadata,
  StashTransaction,
  StateBasedOffer,
  StateBasedOfferTile,
  StopSuperContributionPayload,
  StoreEventInput,
  StripePublishableKeyInput,
  SubmitInstaPayDrawdownSurveyInput,
  SubmitInstaPayDrawdownSurveyPayload,
  SubmitSuperContributionInput,
  SubmitSuperContributionPayload,
  SubscribePayload,
  SubscribeRecurringByDayInput,
  SubscribeRecurringByDayPayload,
  Subscription,
  SubscriptionEdge,
  SubscriptionInput,
  Subscriptions,
  SubscriptionsInput,
  SuperConsent,
  SuperConsolidation,
  SuperConsolidationRequestSupport,
  SuperContribution,
  SuperfundFeatureFlag,
  SuperfundMetadata,
  SwagStore,
  SwagStoreOffer,
  SwagStoreOfferEdge,
  SwagStoreOffers,
  SwagSuperfund,
  TaxObligationInput,
  TransactionBase,
  TransactionEdge,
  TransactionMerchant,
  TransactionMeta,
  Transactions,
  TransactionsInput,
  TransferAuWalletFundsInput,
  TransferAuWalletFundsPayload,
  UkTokenPayload,
  UkWalletDetails,
  UkAccessTokenState,
  UkAuthFactor,
  UkStepUpResult,
  UniversalAddressInput,
  UpdateAutoEnrolmentInput,
  UpdateAutoEnrolmentPayload,
  UpdateBankDetailsInput,
  UpdateBankDetailsPayload,
  UpdateBankLinkedStatusInput,
  UpdateBankLinkedStatusPayload,
  UpdateMySuperConsentStatusInput,
  UpdateRecurringByDayInput,
  UpdateRecurringByDayPayload,
  UpdateSchedulingSubscriptionInput,
  UpdateSuperConsentPayload,
  UpdateUserCategoriesPreferenceInput,
  UpdateUserCategoriesPreferencePayload,
  UpdateWalletProfileInput,
  User,
  UserAddressInput,
  UserBankDetails,
  UserCategoriesPreference,
  UserCategoryInput,
  UserDetails,
  UserGroupConsent,
  UserInitializationDetailAddress,
  UserInitializationDetails,
  UserInitializationDetailsPayload,
  UserInstapay,
  UserMutation,
  UserPermission,
  UserPermissionInput,
  UserPermissionPayload,
  VerifyPhoneNumberRequest,
  WaitList,
  WaitListPayload,
  Wallet,
  WalletDetails,
  WalletNotification,
  WalletProfileChangeRequest,
  WalletProfileChangeRequestPayload,
  WithdrawFromStashInput,
} from '../generated';
import {
  BillStatus,
  BmOfferRegistrationStatus,
  CardStatus,
  CashbackAutoEnrolStatus,
  CashbackBankLinkedStatus,
  CategoryAction,
  Currency,
  CurrencyType,
  EwaPushNotificationFeature,
  EwaPushNotificationType,
  EventLogKind,
  FeeType,
  HeroPointsClientType,
  HeroPointsReasonType,
  HeroPointsTransactionType,
  IdvProfileStatus,
  IdentityDocumentType,
  InstaPayOption,
  InstapayBalanceType,
  InstapayBankAccountSource,
  InstapayErrorCode,
  InstapayPayType,
  NoTaxIdNumberReason,
  NotificationStatus,
  OfferType,
  OrderProductType,
  OrderStatus,
  PayCycle,
  PaySplitType,
  PaymentCardStatus,
  PaymentMethod,
  PaymentType,
  Pid,
  Platform,
  RecurringByDayPayCycle,
  RecurringSubscriptionStatus,
  ScheduledPaymentFrequency,
  ScheduledPaymentSaveOutcomeType,
  ScheduledPaymentStatus,
  ScheduledPaymentType,
  SchedulingSubscriptionPlan,
  Sign,
  StashStatus,
  SubscriptionStatus,
  SubscriptionType,
  SuperConsentStatus,
  SuperConsolidationStatus,
  SuperContributionStatus,
  SuperContributionType,
  TransactionOutcome,
  TransactionRecordType,
  TransactionState,
  TransactionType,
  TxnType,
  UkAuthFactorChannel,
  UkAuthFactorStatus,
  UkAuthFactorType,
  UkStepupResultState,
  UkTransactionState,
  UserDetailChangeRequestType,
  WaitListStatus,
  WalletNotificationType,
  WalletProfileChangeRequestType,
  WalletSetupStatus,
  WalletStatusReason,
  WalletType,
  Weekday,
} from '../generated';

export const anAcceptEventInput = (overrides?: Partial<AcceptEventInput>): AcceptEventInput => {
  return {
    accepted: overrides && overrides.hasOwnProperty('accepted') ? overrides.accepted! : true,
    accepted_from: overrides && overrides.hasOwnProperty('accepted_from') ? overrides.accepted_from! : 'itaque',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'c4788148-4311-41ad-9962-7cf16135310c',
  };
};

export const anAcceptEventPayload = (overrides?: Partial<AcceptEventPayload>): AcceptEventPayload => {
  return {
    message: overrides && overrides.hasOwnProperty('message') ? overrides.message! : 'ut',
    success: overrides && overrides.hasOwnProperty('success') ? overrides.success! : true,
  };
};

export const anActiveSuperfundMembership = (
  overrides?: Partial<ActiveSuperfundMembership>
): ActiveSuperfundMembership => {
  return {
    abn: overrides && overrides.hasOwnProperty('abn') ? overrides.abn! : 'dolorem',
    fundChoice: overrides && overrides.hasOwnProperty('fundChoice') ? overrides.fundChoice! : 'qui',
    fundName: overrides && overrides.hasOwnProperty('fundName') ? overrides.fundName! : 'dignissimos',
    memberNumber: overrides && overrides.hasOwnProperty('memberNumber') ? overrides.memberNumber! : 'qui',
    updatedAt: overrides && overrides.hasOwnProperty('updatedAt') ? overrides.updatedAt! : '1980-05-15T01:29:52.000Z',
    usi: overrides && overrides.hasOwnProperty('usi') ? overrides.usi! : 'quae',
  };
};

export const anAddEventPayload = (overrides?: Partial<AddEventPayload>): AddEventPayload => {
  return {
    eventID:
      overrides && overrides.hasOwnProperty('eventID') ? overrides.eventID! : 'ebc699a8-8098-4ead-b674-e4d929b26c5b',
  };
};

export const anAddPreferInstapayOptionPayload = (
  overrides?: Partial<AddPreferInstapayOptionPayload>
): AddPreferInstapayOptionPayload => {
  return {
    success: overrides && overrides.hasOwnProperty('success') ? overrides.success! : false,
  };
};

export const anAddress = (overrides?: Partial<Address>): Address => {
  return {
    country: overrides && overrides.hasOwnProperty('country') ? overrides.country! : 'non',
    longForm: overrides && overrides.hasOwnProperty('longForm') ? overrides.longForm! : 'et',
    postcode: overrides && overrides.hasOwnProperty('postcode') ? overrides.postcode! : 'error',
    region: overrides && overrides.hasOwnProperty('region') ? overrides.region! : 'quo',
    streetName: overrides && overrides.hasOwnProperty('streetName') ? overrides.streetName! : 'aut',
    streetNumber: overrides && overrides.hasOwnProperty('streetNumber') ? overrides.streetNumber! : 'et',
    streetType: overrides && overrides.hasOwnProperty('streetType') ? overrides.streetType! : 'et',
    townOrCity: overrides && overrides.hasOwnProperty('townOrCity') ? overrides.townOrCity! : 'vel',
    unitNumber: overrides && overrides.hasOwnProperty('unitNumber') ? overrides.unitNumber! : 'omnis',
  };
};

export const anAddressInput = (overrides?: Partial<AddressInput>): AddressInput => {
  return {
    addressLine1: overrides && overrides.hasOwnProperty('addressLine1') ? overrides.addressLine1! : 'suscipit',
    country: overrides && overrides.hasOwnProperty('country') ? overrides.country! : 'autem',
    postcode: overrides && overrides.hasOwnProperty('postcode') ? overrides.postcode! : 'cupiditate',
    region: overrides && overrides.hasOwnProperty('region') ? overrides.region! : 'sunt',
    streetName: overrides && overrides.hasOwnProperty('streetName') ? overrides.streetName! : 'dicta',
    streetNumber: overrides && overrides.hasOwnProperty('streetNumber') ? overrides.streetNumber! : 'id',
    streetType: overrides && overrides.hasOwnProperty('streetType') ? overrides.streetType! : 'soluta',
    townOrCity: overrides && overrides.hasOwnProperty('townOrCity') ? overrides.townOrCity! : 'nam',
    unitNumber: overrides && overrides.hasOwnProperty('unitNumber') ? overrides.unitNumber! : 'quaerat',
  };
};

export const anAdvertiser = (overrides?: Partial<Advertiser>): Advertiser => {
  return {
    advertiserAbout: overrides && overrides.hasOwnProperty('advertiserAbout') ? overrides.advertiserAbout! : 'illo',
    advertiserId: overrides && overrides.hasOwnProperty('advertiserId') ? overrides.advertiserId! : 'ea',
    advertiserName: overrides && overrides.hasOwnProperty('advertiserName') ? overrides.advertiserName! : 'sint',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'est',
    offers: overrides && overrides.hasOwnProperty('offers') ? overrides.offers! : [anInstoreOfferV2()],
    type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : OfferType.Instore,
  };
};

export const anAdvertiserEdge = (overrides?: Partial<AdvertiserEdge>): AdvertiserEdge => {
  return {
    node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : anAdvertiser(),
  };
};

export const anAllAdvertisers = (overrides?: Partial<AllAdvertisers>): AllAdvertisers => {
  return {
    edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [anAdvertiserEdge()],
    error: overrides && overrides.hasOwnProperty('error') ? overrides.error! : aGenericError(),
    pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : aPageInfo(),
  };
};

export const anAllAdvertisersInput = (overrides?: Partial<AllAdvertisersInput>): AllAdvertisersInput => {
  return {
    after: overrides && overrides.hasOwnProperty('after') ? overrides.after! : 'natus',
    categoryCode: overrides && overrides.hasOwnProperty('categoryCode') ? overrides.categoryCode! : 'et',
    first: overrides && overrides.hasOwnProperty('first') ? overrides.first! : 1102,
    latitude: overrides && overrides.hasOwnProperty('latitude') ? overrides.latitude! : 7.56,
    longitude: overrides && overrides.hasOwnProperty('longitude') ? overrides.longitude! : 5.76,
    query: overrides && overrides.hasOwnProperty('query') ? overrides.query! : 'voluptatem',
    range: overrides && overrides.hasOwnProperty('range') ? overrides.range! : 8.94,
    type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : OfferType.Instore,
  };
};

export const anAllOfferEdge = (overrides?: Partial<AllOfferEdge>): AllOfferEdge => {
  return {
    node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : anInStoreOffer(),
  };
};

export const anAllOffers = (overrides?: Partial<AllOffers>): AllOffers => {
  return {
    edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [anAllOfferEdge()],
    error: overrides && overrides.hasOwnProperty('error') ? overrides.error! : aGenericError(),
    pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : aPageInfo(),
  };
};

export const anAllOffersInput = (overrides?: Partial<AllOffersInput>): AllOffersInput => {
  return {
    after: overrides && overrides.hasOwnProperty('after') ? overrides.after! : 'nesciunt',
    categoryCode: overrides && overrides.hasOwnProperty('categoryCode') ? overrides.categoryCode! : 'esse',
    first: overrides && overrides.hasOwnProperty('first') ? overrides.first! : 204,
    latitude: overrides && overrides.hasOwnProperty('latitude') ? overrides.latitude! : 5.09,
    longitude: overrides && overrides.hasOwnProperty('longitude') ? overrides.longitude! : 4.75,
    query: overrides && overrides.hasOwnProperty('query') ? overrides.query! : 'voluptas',
    type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : OfferType.Instore,
  };
};

export const anAuPayeeAddress = (overrides?: Partial<AuPayeeAddress>): AuPayeeAddress => {
  return {
    accountName: overrides && overrides.hasOwnProperty('accountName') ? overrides.accountName! : 'corporis',
    accountNumber: overrides && overrides.hasOwnProperty('accountNumber') ? overrides.accountNumber! : 'repudiandae',
    bsb: overrides && overrides.hasOwnProperty('bsb') ? overrides.bsb! : 'rem',
    friendlyName: overrides && overrides.hasOwnProperty('friendlyName') ? overrides.friendlyName! : 'aut',
  };
};

export const anAuPaymentRecipient = (overrides?: Partial<AuPaymentRecipient>): AuPaymentRecipient => {
  return {
    accountName: overrides && overrides.hasOwnProperty('accountName') ? overrides.accountName! : 'omnis',
    accountNumber: overrides && overrides.hasOwnProperty('accountNumber') ? overrides.accountNumber! : 'aperiam',
    bsb: overrides && overrides.hasOwnProperty('bsb') ? overrides.bsb! : 'voluptas',
  };
};

export const aBsbTransferPayeeAddress = (overrides?: Partial<BsbTransferPayeeAddress>): BsbTransferPayeeAddress => {
  return {
    accountName: overrides && overrides.hasOwnProperty('accountName') ? overrides.accountName! : 'sint',
    accountNumber: overrides && overrides.hasOwnProperty('accountNumber') ? overrides.accountNumber! : 'distinctio',
    bsb: overrides && overrides.hasOwnProperty('bsb') ? overrides.bsb! : 'ea',
    friendlyName: overrides && overrides.hasOwnProperty('friendlyName') ? overrides.friendlyName! : 'consequatur',
  };
};

export const aBsbTransferPeerDetails = (overrides?: Partial<BsbTransferPeerDetails>): BsbTransferPeerDetails => {
  return {
    accountNumber: overrides && overrides.hasOwnProperty('accountNumber') ? overrides.accountNumber! : 'tenetur',
    bsb: overrides && overrides.hasOwnProperty('bsb') ? overrides.bsb! : 'est',
    name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'reprehenderit',
  };
};

export const aBankAccountDetails = (overrides?: Partial<BankAccountDetails>): BankAccountDetails => {
  return {
    accountName: overrides && overrides.hasOwnProperty('accountName') ? overrides.accountName! : 'optio',
    accountNumber: overrides && overrides.hasOwnProperty('accountNumber') ? overrides.accountNumber! : 'laboriosam',
    amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : 'ad',
    bsb: overrides && overrides.hasOwnProperty('bsb') ? overrides.bsb! : 'facere',
  };
};

export const aBankAccountSsaInput = (overrides?: Partial<BankAccountSsaInput>): BankAccountSsaInput => {
  return {
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'natus',
  };
};

export const aBankAccountSortCodeInput = (overrides?: Partial<BankAccountSortCodeInput>): BankAccountSortCodeInput => {
  return {
    accountNumber: overrides && overrides.hasOwnProperty('accountNumber') ? overrides.accountNumber! : 'eos',
    sortCode: overrides && overrides.hasOwnProperty('sortCode') ? overrides.sortCode! : 'deleniti',
  };
};

export const aBeneficiaryInformation = (overrides?: Partial<BeneficiaryInformation>): BeneficiaryInformation => {
  return {
    fullName: overrides && overrides.hasOwnProperty('fullName') ? overrides.fullName! : 'quam',
  };
};

export const aBenefits = (overrides?: Partial<Benefits>): Benefits => {
  return {
    categories: overrides && overrides.hasOwnProperty('categories') ? overrides.categories! : [aCategory()],
  };
};

export const aBenefitsMinSupportVersion = (
  overrides?: Partial<BenefitsMinSupportVersion>
): BenefitsMinSupportVersion => {
  return {
    minSupportAppVersion:
      overrides && overrides.hasOwnProperty('minSupportAppVersion') ? overrides.minSupportAppVersion! : 'eligendi',
  };
};

export const aBillManagement = (overrides?: Partial<BillManagement>): BillManagement => {
  return {
    ahmAccessToken: overrides && overrides.hasOwnProperty('ahmAccessToken') ? overrides.ahmAccessToken! : 'non',
    homeTiles: overrides && overrides.hasOwnProperty('homeTiles') ? overrides.homeTiles! : aHomeTiles(),
    isEligibleForPromotion:
      overrides && overrides.hasOwnProperty('isEligibleForPromotion') ? overrides.isEligibleForPromotion! : true,
    offer: overrides && overrides.hasOwnProperty('offer') ? overrides.offer! : aBmOffer(),
    offerV2: overrides && overrides.hasOwnProperty('offerV2') ? overrides.offerV2! : aBmOffer(),
    offers: overrides && overrides.hasOwnProperty('offers') ? overrides.offers! : [aBmOffer()],
    offersV2: overrides && overrides.hasOwnProperty('offersV2') ? overrides.offersV2! : aBmOffers(),
    offersV3: overrides && overrides.hasOwnProperty('offersV3') ? overrides.offersV3! : aBmOffers(),
    promotion: overrides && overrides.hasOwnProperty('promotion') ? overrides.promotion! : aPromotion(),
    providers: overrides && overrides.hasOwnProperty('providers') ? overrides.providers! : aProviders(),
    subscription: overrides && overrides.hasOwnProperty('subscription') ? overrides.subscription! : aSubscription(),
    subscriptions: overrides && overrides.hasOwnProperty('subscriptions') ? overrides.subscriptions! : aSubscriptions(),
  };
};

export const aBillTransaction = (overrides?: Partial<BillTransaction>): BillTransaction => {
  return {
    amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : aCurrencyAmount(),
    createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : '1990-06-26T03:06:03.000Z',
    dateFrom: overrides && overrides.hasOwnProperty('dateFrom') ? overrides.dateFrom! : '2007-01-29',
    dateTo: overrides && overrides.hasOwnProperty('dateTo') ? overrides.dateTo! : '1975-11-06',
    dueDate: overrides && overrides.hasOwnProperty('dueDate') ? overrides.dueDate! : '1970-09-06',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'aut',
    issueDate: overrides && overrides.hasOwnProperty('issueDate') ? overrides.issueDate! : '1985-07-19',
    status: overrides && overrides.hasOwnProperty('status') ? overrides.status! : BillStatus.Due,
    transactionDate:
      overrides && overrides.hasOwnProperty('transactionDate') ? overrides.transactionDate! : '1989-09-09',
    type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : TxnType.Bill,
  };
};

export const aBlockUnblockCardInput = (overrides?: Partial<BlockUnblockCardInput>): BlockUnblockCardInput => {
  return {
    cardId:
      overrides && overrides.hasOwnProperty('cardId') ? overrides.cardId! : '5b720b07-659a-48fe-ae40-7ca1ff87eb6a',
  };
};

export const aBmOffer = (overrides?: Partial<BmOffer>): BmOffer => {
  return {
    about: overrides && overrides.hasOwnProperty('about') ? overrides.about! : 'optio',
    canSignUp: overrides && overrides.hasOwnProperty('canSignUp') ? overrides.canSignUp! : true,
    categoryCode: overrides && overrides.hasOwnProperty('categoryCode') ? overrides.categoryCode! : 'provident',
    description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'id',
    estBillAmount:
      overrides && overrides.hasOwnProperty('estBillAmount') ? overrides.estBillAmount! : aCurrencyAmount(),
    howItWorks: overrides && overrides.hasOwnProperty('howItWorks') ? overrides.howItWorks! : 'voluptatum',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'bdf3f912-8208-4cf3-aaa6-d3a06c67dabe',
    imageUrl: overrides && overrides.hasOwnProperty('imageUrl') ? overrides.imageUrl! : 'rerum',
    logoUrl: overrides && overrides.hasOwnProperty('logoUrl') ? overrides.logoUrl! : 'porro',
    paidAmount: overrides && overrides.hasOwnProperty('paidAmount') ? overrides.paidAmount! : aCurrencyAmount(),
    provider: overrides && overrides.hasOwnProperty('provider') ? overrides.provider! : aProvider(),
    registrationStatus:
      overrides && overrides.hasOwnProperty('registrationStatus')
        ? overrides.registrationStatus!
        : BmOfferRegistrationStatus.InProgress,
    reminder: overrides && overrides.hasOwnProperty('reminder') ? overrides.reminder! : aReminder(),
    savingPercentage: overrides && overrides.hasOwnProperty('savingPercentage') ? overrides.savingPercentage! : 5474,
    signUpLink: overrides && overrides.hasOwnProperty('signUpLink') ? overrides.signUpLink! : 'aut',
    stateBasedOffers:
      overrides && overrides.hasOwnProperty('stateBasedOffers') ? overrides.stateBasedOffers! : [aStateBasedOffer()],
    termsAndCondition:
      overrides && overrides.hasOwnProperty('termsAndCondition') ? overrides.termsAndCondition! : 'dolores',
    termsAndConditions:
      overrides && overrides.hasOwnProperty('termsAndConditions') ? overrides.termsAndConditions! : 'eius',
    title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'dolorum',
  };
};

export const aBmOfferEdge = (overrides?: Partial<BmOfferEdge>): BmOfferEdge => {
  return {
    node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : aBmOffer(),
  };
};

export const aBmOfferInput = (overrides?: Partial<BmOfferInput>): BmOfferInput => {
  return {
    after: overrides && overrides.hasOwnProperty('after') ? overrides.after! : 'illum',
    categoryCode: overrides && overrides.hasOwnProperty('categoryCode') ? overrides.categoryCode! : 'autem',
    first: overrides && overrides.hasOwnProperty('first') ? overrides.first! : 4402,
    query: overrides && overrides.hasOwnProperty('query') ? overrides.query! : 'placeat',
  };
};

export const aBmOffers = (overrides?: Partial<BmOffers>): BmOffers => {
  return {
    edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [aBmOfferEdge()],
    error: overrides && overrides.hasOwnProperty('error') ? overrides.error! : aGenericError(),
    pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : aPageInfo(),
  };
};

export const aBmSubmitSubscriptionPayload = (
  overrides?: Partial<BmSubmitSubscriptionPayload>
): BmSubmitSubscriptionPayload => {
  return {
    success: overrides && overrides.hasOwnProperty('success') ? overrides.success! : true,
  };
};

export const aBsJoinWaitListInput = (overrides?: Partial<BsJoinWaitListInput>): BsJoinWaitListInput => {
  return {
    isAcceptConsentMarketing:
      overrides && overrides.hasOwnProperty('isAcceptConsentMarketing') ? overrides.isAcceptConsentMarketing! : false,
  };
};

export const aBsJoinWaitListPayload = (overrides?: Partial<BsJoinWaitListPayload>): BsJoinWaitListPayload => {
  return {
    message: overrides && overrides.hasOwnProperty('message') ? overrides.message! : 'et',
    success: overrides && overrides.hasOwnProperty('success') ? overrides.success! : false,
  };
};

export const aBsSubmitSubscriptionInput = (
  overrides?: Partial<BsSubmitSubscriptionInput>
): BsSubmitSubscriptionInput => {
  return {
    isHPPromoEligible:
      overrides && overrides.hasOwnProperty('isHPPromoEligible') ? overrides.isHPPromoEligible! : false,
    providerId: overrides && overrides.hasOwnProperty('providerId') ? overrides.providerId! : Pid.Ahm,
  };
};

export const aBsUpdateViewIntroductionPayload = (
  overrides?: Partial<BsUpdateViewIntroductionPayload>
): BsUpdateViewIntroductionPayload => {
  return {
    message: overrides && overrides.hasOwnProperty('message') ? overrides.message! : 'voluptatibus',
    success: overrides && overrides.hasOwnProperty('success') ? overrides.success! : true,
  };
};

export const aBuyAgainGiftCardEdge = (overrides?: Partial<BuyAgainGiftCardEdge>): BuyAgainGiftCardEdge => {
  return {
    cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'rerum',
    node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : aProduct(),
  };
};

export const aBuyAgainGiftCards = (overrides?: Partial<BuyAgainGiftCards>): BuyAgainGiftCards => {
  return {
    edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [aBuyAgainGiftCardEdge()],
    error: overrides && overrides.hasOwnProperty('error') ? overrides.error! : aGenericError(),
    pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : aPageInfo(),
  };
};

export const aCancelInstaPayDailySubscriptionInput = (
  overrides?: Partial<CancelInstaPayDailySubscriptionInput>
): CancelInstaPayDailySubscriptionInput => {
  return {
    cancelNote: overrides && overrides.hasOwnProperty('cancelNote') ? overrides.cancelNote! : 'atque',
    orgId: overrides && overrides.hasOwnProperty('orgId') ? overrides.orgId! : '2ae5c6b7-ae90-4130-adfc-6dd5f799af04',
  };
};

export const aCancelInstaPayDailySubscriptionPayload = (
  overrides?: Partial<CancelInstaPayDailySubscriptionPayload>
): CancelInstaPayDailySubscriptionPayload => {
  return {
    subscription:
      overrides && overrides.hasOwnProperty('subscription') ? overrides.subscription! : aDailypaySubscription(),
    success: overrides && overrides.hasOwnProperty('success') ? overrides.success! : false,
  };
};

export const aCancelRecurringByDayInput = (
  overrides?: Partial<CancelRecurringByDayInput>
): CancelRecurringByDayInput => {
  return {
    orgId: overrides && overrides.hasOwnProperty('orgId') ? overrides.orgId! : 'iste',
  };
};

export const aCancelRecurringByDayPayload = (
  overrides?: Partial<CancelRecurringByDayPayload>
): CancelRecurringByDayPayload => {
  return {
    subscription:
      overrides && overrides.hasOwnProperty('subscription') ? overrides.subscription! : aRecurringByDaySubscription(),
    success: overrides && overrides.hasOwnProperty('success') ? overrides.success! : true,
  };
};

export const aCancelSchedulingSubscriptionInput = (
  overrides?: Partial<CancelSchedulingSubscriptionInput>
): CancelSchedulingSubscriptionInput => {
  return {
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'aut',
    orgId: overrides && overrides.hasOwnProperty('orgId') ? overrides.orgId! : 'ea',
  };
};

export const aCard = (overrides?: Partial<Card>): Card => {
  return {
    details: overrides && overrides.hasOwnProperty('details') ? overrides.details! : aCardDetails(),
    meta: overrides && overrides.hasOwnProperty('meta') ? overrides.meta! : aCardMeta(),
    oemProvisioning:
      overrides && overrides.hasOwnProperty('oemProvisioning') ? overrides.oemProvisioning! : anOemProvisioning(),
  };
};

export const aCardActivateMutationPayload = (
  overrides?: Partial<CardActivateMutationPayload>
): CardActivateMutationPayload => {
  return {
    success: overrides && overrides.hasOwnProperty('success') ? overrides.success! : true,
  };
};

export const aCardCreateMutationPayload = (
  overrides?: Partial<CardCreateMutationPayload>
): CardCreateMutationPayload => {
  return {
    success: overrides && overrides.hasOwnProperty('success') ? overrides.success! : false,
  };
};

export const aCardDetails = (overrides?: Partial<CardDetails>): CardDetails => {
  return {
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '5e1c5edf-a8c9-42a2-bc31-c09b59375bd3',
    status: overrides && overrides.hasOwnProperty('status') ? overrides.status! : CardStatus.Active,
  };
};

export const aCardMeta = (overrides?: Partial<CardMeta>): CardMeta => {
  return {
    contactless: overrides && overrides.hasOwnProperty('contactless') ? overrides.contactless! : true,
    digitalWalletDetails:
      overrides && overrides.hasOwnProperty('digitalWalletDetails')
        ? overrides.digitalWalletDetails!
        : aDigitalWalletDetails(),
    frozen: overrides && overrides.hasOwnProperty('frozen') ? overrides.frozen! : true,
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '21cab516-4e9b-4446-a597-1b7c437a29fc',
    magStrip: overrides && overrides.hasOwnProperty('magStrip') ? overrides.magStrip! : true,
    mobileWalletPaymentEnabled:
      overrides && overrides.hasOwnProperty('mobileWalletPaymentEnabled')
        ? overrides.mobileWalletPaymentEnabled!
        : true,
  };
};

export const aCardMetaInput = (overrides?: Partial<CardMetaInput>): CardMetaInput => {
  return {
    contactless: overrides && overrides.hasOwnProperty('contactless') ? overrides.contactless! : true,
    frozen: overrides && overrides.hasOwnProperty('frozen') ? overrides.frozen! : true,
    magStrip: overrides && overrides.hasOwnProperty('magStrip') ? overrides.magStrip! : true,
    mobileWalletPaymentEnabled:
      overrides && overrides.hasOwnProperty('mobileWalletPaymentEnabled')
        ? overrides.mobileWalletPaymentEnabled!
        : true,
  };
};

export const aCardMutation = (overrides?: Partial<CardMutation>): CardMutation => {
  return {
    activate: overrides && overrides.hasOwnProperty('activate') ? overrides.activate! : aCardActivateMutationPayload(),
    create: overrides && overrides.hasOwnProperty('create') ? overrides.create! : aCardCreateMutationPayload(),
    requestNewCard:
      overrides && overrides.hasOwnProperty('requestNewCard')
        ? overrides.requestNewCard!
        : aCardRequestNewMutationPayload(),
    updateMeta:
      overrides && overrides.hasOwnProperty('updateMeta') ? overrides.updateMeta! : aCardUpdateMetaMutationPayload(),
    updatePin:
      overrides && overrides.hasOwnProperty('updatePin') ? overrides.updatePin! : aCardUpdatePinMutationPayload(),
  };
};

export const aCardRequestNewMutationPayload = (
  overrides?: Partial<CardRequestNewMutationPayload>
): CardRequestNewMutationPayload => {
  return {
    success: overrides && overrides.hasOwnProperty('success') ? overrides.success! : false,
  };
};

export const aCardUpdateMetaMutationPayload = (
  overrides?: Partial<CardUpdateMetaMutationPayload>
): CardUpdateMetaMutationPayload => {
  return {
    success: overrides && overrides.hasOwnProperty('success') ? overrides.success! : true,
  };
};

export const aCardUpdatePinMutationPayload = (
  overrides?: Partial<CardUpdatePinMutationPayload>
): CardUpdatePinMutationPayload => {
  return {
    success: overrides && overrides.hasOwnProperty('success') ? overrides.success! : true,
  };
};

export const aCashback = (overrides?: Partial<Cashback>): Cashback => {
  return {
    allAdvertisers:
      overrides && overrides.hasOwnProperty('allAdvertisers') ? overrides.allAdvertisers! : anAllAdvertisers(),
    allOffers: overrides && overrides.hasOwnProperty('allOffers') ? overrides.allOffers! : anAllOffers(),
    banks: overrides && overrides.hasOwnProperty('banks') ? overrides.banks! : aCashbackBanks(),
    cashbackUserInfo:
      overrides && overrides.hasOwnProperty('cashbackUserInfo') ? overrides.cashbackUserInfo! : aCashbackUserInfo(),
    cashbackUserToken:
      overrides && overrides.hasOwnProperty('cashbackUserToken') ? overrides.cashbackUserToken! : aCashbackUserToken(),
    categories: overrides && overrides.hasOwnProperty('categories') ? overrides.categories! : [aCategory()],
    ehProviderId: overrides && overrides.hasOwnProperty('ehProviderId') ? overrides.ehProviderId! : anEhProviderId(),
    featuresOffers:
      overrides && overrides.hasOwnProperty('featuresOffers') ? overrides.featuresOffers! : aFeatureOffers(),
    inStoreOfferById:
      overrides && overrides.hasOwnProperty('inStoreOfferById') ? overrides.inStoreOfferById! : anInStoreOffer(),
    inStoreOffers:
      overrides && overrides.hasOwnProperty('inStoreOffers') ? overrides.inStoreOffers! : anInStoreOffers(),
    instoreOffersByAdvertiserId:
      overrides && overrides.hasOwnProperty('instoreOffersByAdvertiserId')
        ? overrides.instoreOffersByAdvertiserId!
        : anInstoreOffersV2(),
    linkedCards: overrides && overrides.hasOwnProperty('linkedCards') ? overrides.linkedCards! : aLinkedCards(),
    onboardStatus:
      overrides && overrides.hasOwnProperty('onboardStatus') ? overrides.onboardStatus! : anOnboardStatus(),
    onlineOfferById:
      overrides && overrides.hasOwnProperty('onlineOfferById') ? overrides.onlineOfferById! : anOnlineOffer(),
    onlineOffers: overrides && overrides.hasOwnProperty('onlineOffers') ? overrides.onlineOffers! : anOnlineOffers(),
    termsAndConditions:
      overrides && overrides.hasOwnProperty('termsAndConditions')
        ? overrides.termsAndConditions!
        : aCashbackTermsAndConditions(),
    termsAndConditionsAcceptance:
      overrides && overrides.hasOwnProperty('termsAndConditionsAcceptance')
        ? overrides.termsAndConditionsAcceptance!
        : aCashbackTermsAndConditionsAcceptance(),
    transactionsV2:
      overrides && overrides.hasOwnProperty('transactionsV2') ? overrides.transactionsV2! : aCashbackTransactionsV2(),
    userBankDetails:
      overrides && overrides.hasOwnProperty('userBankDetails') ? overrides.userBankDetails! : aUserBankDetails(),
  };
};

export const aCashbackAcceptTncPayload = (overrides?: Partial<CashbackAcceptTncPayload>): CashbackAcceptTncPayload => {
  return {
    success: overrides && overrides.hasOwnProperty('success') ? overrides.success! : true,
  };
};

export const aCashbackBank = (overrides?: Partial<CashbackBank>): CashbackBank => {
  return {
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 1693,
    name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'eaque',
    region: overrides && overrides.hasOwnProperty('region') ? overrides.region! : 'mollitia',
  };
};

export const aCashbackBankEdge = (overrides?: Partial<CashbackBankEdge>): CashbackBankEdge => {
  return {
    node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : aCashbackBank(),
  };
};

export const aCashbackBanks = (overrides?: Partial<CashbackBanks>): CashbackBanks => {
  return {
    edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [aCashbackBankEdge()],
    error: overrides && overrides.hasOwnProperty('error') ? overrides.error! : aGenericError(),
    pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : aPageInfo(),
  };
};

export const aCashbackCard = (overrides?: Partial<CashbackCard>): CashbackCard => {
  return {
    cardMasked: overrides && overrides.hasOwnProperty('cardMasked') ? overrides.cardMasked! : 'dolorum',
    description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'laborum',
    expiry: overrides && overrides.hasOwnProperty('expiry') ? overrides.expiry! : 'omnis',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 7080,
    isExpired: overrides && overrides.hasOwnProperty('isExpired') ? overrides.isExpired! : false,
    issuer: overrides && overrides.hasOwnProperty('issuer') ? overrides.issuer! : 'enim',
    lastFour: overrides && overrides.hasOwnProperty('lastFour') ? overrides.lastFour! : 'et',
    provider: overrides && overrides.hasOwnProperty('provider') ? overrides.provider! : 'porro',
  };
};

export const aCashbackDeleteCardInput = (overrides?: Partial<CashbackDeleteCardInput>): CashbackDeleteCardInput => {
  return {
    cardId: overrides && overrides.hasOwnProperty('cardId') ? overrides.cardId! : 4838,
  };
};

export const aCashbackDeleteCardPayload = (
  overrides?: Partial<CashbackDeleteCardPayload>
): CashbackDeleteCardPayload => {
  return {
    success: overrides && overrides.hasOwnProperty('success') ? overrides.success! : false,
  };
};

export const aCashbackMutation = (overrides?: Partial<CashbackMutation>): CashbackMutation => {
  return {
    acceptTnc: overrides && overrides.hasOwnProperty('acceptTnc') ? overrides.acceptTnc! : aCashbackAcceptTncPayload(),
    deleteCard:
      overrides && overrides.hasOwnProperty('deleteCard') ? overrides.deleteCard! : aCashbackDeleteCardPayload(),
    onboardUser: overrides && overrides.hasOwnProperty('onboardUser') ? overrides.onboardUser! : anOnboardUserPayload(),
    updateAutoEnrolment:
      overrides && overrides.hasOwnProperty('updateAutoEnrolment')
        ? overrides.updateAutoEnrolment!
        : anUpdateAutoEnrolmentPayload(),
    updateBankDetails:
      overrides && overrides.hasOwnProperty('updateBankDetails')
        ? overrides.updateBankDetails!
        : anUpdateBankDetailsPayload(),
    updateBankLinkedStatus:
      overrides && overrides.hasOwnProperty('updateBankLinkedStatus')
        ? overrides.updateBankLinkedStatus!
        : anUpdateBankLinkedStatusPayload(),
  };
};

export const aCashbackTermsAndConditions = (
  overrides?: Partial<CashbackTermsAndConditions>
): CashbackTermsAndConditions => {
  return {
    error: overrides && overrides.hasOwnProperty('error') ? overrides.error! : aGenericError(),
    items: overrides && overrides.hasOwnProperty('items') ? overrides.items! : [aCashbackTermsAndConditionsItem()],
  };
};

export const aCashbackTermsAndConditionsAcceptance = (
  overrides?: Partial<CashbackTermsAndConditionsAcceptance>
): CashbackTermsAndConditionsAcceptance => {
  return {
    error: overrides && overrides.hasOwnProperty('error') ? overrides.error! : aGenericError(),
    isAccepted: overrides && overrides.hasOwnProperty('isAccepted') ? overrides.isAccepted! : true,
  };
};

export const aCashbackTermsAndConditionsItem = (
  overrides?: Partial<CashbackTermsAndConditionsItem>
): CashbackTermsAndConditionsItem => {
  return {
    boldText: overrides && overrides.hasOwnProperty('boldText') ? overrides.boldText! : 'ut',
    boldTextVariant:
      overrides && overrides.hasOwnProperty('boldTextVariant') ? overrides.boldTextVariant! : 'laboriosam',
    showListItemSymbol:
      overrides && overrides.hasOwnProperty('showListItemSymbol') ? overrides.showListItemSymbol! : false,
    text: overrides && overrides.hasOwnProperty('text') ? overrides.text! : 'ipsum',
    textVariant: overrides && overrides.hasOwnProperty('textVariant') ? overrides.textVariant! : 'minima',
    type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : 'iusto',
    url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : 'porro',
  };
};

export const aCashbackTransaction = (overrides?: Partial<CashbackTransaction>): CashbackTransaction => {
  return {
    advertiserName: overrides && overrides.hasOwnProperty('advertiserName') ? overrides.advertiserName! : 'eveniet',
    amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : 2.41,
    created: overrides && overrides.hasOwnProperty('created') ? overrides.created! : 'qui',
    description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'non',
    fee: overrides && overrides.hasOwnProperty('fee') ? overrides.fee! : 3.56,
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 8435,
    imageUrl: overrides && overrides.hasOwnProperty('imageUrl') ? overrides.imageUrl! : 'sunt',
    meta: overrides && overrides.hasOwnProperty('meta') ? overrides.meta! : aTransactionMeta(),
    offerId: overrides && overrides.hasOwnProperty('offerId') ? overrides.offerId! : 4847,
    purchaseAmount: overrides && overrides.hasOwnProperty('purchaseAmount') ? overrides.purchaseAmount! : 1.79,
    recordType: overrides && overrides.hasOwnProperty('recordType') ? overrides.recordType! : TransactionRecordType.In,
    state: overrides && overrides.hasOwnProperty('state') ? overrides.state! : TransactionState.Clear,
    title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'iusto',
    transactionId: overrides && overrides.hasOwnProperty('transactionId') ? overrides.transactionId! : 'laboriosam',
  };
};

export const aCashbackTransactionEdge = (overrides?: Partial<CashbackTransactionEdge>): CashbackTransactionEdge => {
  return {
    node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : aCashbackTransaction(),
  };
};

export const aCashbackTransactionsV2 = (overrides?: Partial<CashbackTransactionsV2>): CashbackTransactionsV2 => {
  return {
    confirmed: overrides && overrides.hasOwnProperty('confirmed') ? overrides.confirmed! : 8.13,
    edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [aCashbackTransactionEdge()],
    error: overrides && overrides.hasOwnProperty('error') ? overrides.error! : aGenericError(),
    pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : aPageInfo(),
    pending: overrides && overrides.hasOwnProperty('pending') ? overrides.pending! : 7,
    total: overrides && overrides.hasOwnProperty('total') ? overrides.total! : 6.81,
  };
};

export const aCashbackTransactionsV2Input = (
  overrides?: Partial<CashbackTransactionsV2Input>
): CashbackTransactionsV2Input => {
  return {
    after: overrides && overrides.hasOwnProperty('after') ? overrides.after! : 'dolor',
    first: overrides && overrides.hasOwnProperty('first') ? overrides.first! : 4684,
  };
};

export const aCashbackUserInfo = (overrides?: Partial<CashbackUserInfo>): CashbackUserInfo => {
  return {
    autoEnrolMessage: overrides && overrides.hasOwnProperty('autoEnrolMessage') ? overrides.autoEnrolMessage! : 'ut',
    autoEnrolStatus:
      overrides && overrides.hasOwnProperty('autoEnrolStatus')
        ? overrides.autoEnrolStatus!
        : CashbackAutoEnrolStatus.Failed,
    bankLinkedMessage:
      overrides && overrides.hasOwnProperty('bankLinkedMessage') ? overrides.bankLinkedMessage! : 'ipsa',
    bankLinkedStatus:
      overrides && overrides.hasOwnProperty('bankLinkedStatus')
        ? overrides.bankLinkedStatus!
        : CashbackBankLinkedStatus.Failed,
    createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : 'doloremque',
    error: overrides && overrides.hasOwnProperty('error') ? overrides.error! : aGenericError(),
    updatedAt: overrides && overrides.hasOwnProperty('updatedAt') ? overrides.updatedAt! : 'debitis',
  };
};

export const aCashbackUserToken = (overrides?: Partial<CashbackUserToken>): CashbackUserToken => {
  return {
    error: overrides && overrides.hasOwnProperty('error') ? overrides.error! : aGenericError(),
    key: overrides && overrides.hasOwnProperty('key') ? overrides.key! : 'cupiditate',
    token: overrides && overrides.hasOwnProperty('token') ? overrides.token! : 'ut',
  };
};

export const aCategory = (overrides?: Partial<Category>): Category => {
  return {
    categoryCode: overrides && overrides.hasOwnProperty('categoryCode') ? overrides.categoryCode! : 'facere',
    imageUrl: overrides && overrides.hasOwnProperty('imageUrl') ? overrides.imageUrl! : 'fuga',
    name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'eos',
  };
};

export const aCommonAddress = (overrides?: Partial<CommonAddress>): CommonAddress => {
  return {
    country: overrides && overrides.hasOwnProperty('country') ? overrides.country! : 'ad',
    longForm: overrides && overrides.hasOwnProperty('longForm') ? overrides.longForm! : 'itaque',
    postcode: overrides && overrides.hasOwnProperty('postcode') ? overrides.postcode! : 'rerum',
    region: overrides && overrides.hasOwnProperty('region') ? overrides.region! : 'cumque',
    streetName: overrides && overrides.hasOwnProperty('streetName') ? overrides.streetName! : 'qui',
    streetNumber: overrides && overrides.hasOwnProperty('streetNumber') ? overrides.streetNumber! : 'officiis',
    streetType: overrides && overrides.hasOwnProperty('streetType') ? overrides.streetType! : 'laborum',
    townOrCity: overrides && overrides.hasOwnProperty('townOrCity') ? overrides.townOrCity! : 'fugiat',
    unitNumber: overrides && overrides.hasOwnProperty('unitNumber') ? overrides.unitNumber! : 'aliquam',
  };
};

export const aCommonAddressInput = (overrides?: Partial<CommonAddressInput>): CommonAddressInput => {
  return {
    country: overrides && overrides.hasOwnProperty('country') ? overrides.country! : 'ullam',
    longForm: overrides && overrides.hasOwnProperty('longForm') ? overrides.longForm! : 'deleniti',
    postcode: overrides && overrides.hasOwnProperty('postcode') ? overrides.postcode! : 'enim',
    region: overrides && overrides.hasOwnProperty('region') ? overrides.region! : 'vitae',
    streetName: overrides && overrides.hasOwnProperty('streetName') ? overrides.streetName! : 'quis',
    streetNumber: overrides && overrides.hasOwnProperty('streetNumber') ? overrides.streetNumber! : 'consequuntur',
    streetType: overrides && overrides.hasOwnProperty('streetType') ? overrides.streetType! : 'voluptas',
    townOrCity: overrides && overrides.hasOwnProperty('townOrCity') ? overrides.townOrCity! : 'molestias',
    unitNumber: overrides && overrides.hasOwnProperty('unitNumber') ? overrides.unitNumber! : 'facere',
  };
};

export const aCreateCardInput = (overrides?: Partial<CreateCardInput>): CreateCardInput => {
  return {
    idempotencyKey: overrides && overrides.hasOwnProperty('idempotencyKey') ? overrides.idempotencyKey! : 'occaecati',
    pin: overrides && overrides.hasOwnProperty('pin') ? overrides.pin! : 'suscipit',
  };
};

export const aCreateComplaintTicketInput = (
  overrides?: Partial<CreateComplaintTicketInput>
): CreateComplaintTicketInput => {
  return {
    OSVersion: overrides && overrides.hasOwnProperty('OSVersion') ? overrides.OSVersion! : 'sit',
    appVersion: overrides && overrides.hasOwnProperty('appVersion') ? overrides.appVersion! : 'provident',
    country: overrides && overrides.hasOwnProperty('country') ? overrides.country! : 'excepturi',
    description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'quia',
    deviceTypeModel: overrides && overrides.hasOwnProperty('deviceTypeModel') ? overrides.deviceTypeModel! : 'qui',
    feature: overrides && overrides.hasOwnProperty('feature') ? overrides.feature! : 'modi',
  };
};

export const aCreateComplaintTicketPayload = (
  overrides?: Partial<CreateComplaintTicketPayload>
): CreateComplaintTicketPayload => {
  return {
    success: overrides && overrides.hasOwnProperty('success') ? overrides.success! : false,
  };
};

export const aCreateConsentGroupAgreementInput = (
  overrides?: Partial<CreateConsentGroupAgreementInput>
): CreateConsentGroupAgreementInput => {
  return {
    consented: overrides && overrides.hasOwnProperty('consented') ? overrides.consented! : true,
  };
};

export const aCreateDailypaySubscriptionInput = (
  overrides?: Partial<CreateDailypaySubscriptionInput>
): CreateDailypaySubscriptionInput => {
  return {
    orgId: overrides && overrides.hasOwnProperty('orgId') ? overrides.orgId! : 'totam',
    previewBalanceId: overrides && overrides.hasOwnProperty('previewBalanceId') ? overrides.previewBalanceId! : 'quasi',
  };
};

export const aCreateDailypaySubscriptionPayload = (
  overrides?: Partial<CreateDailypaySubscriptionPayload>
): CreateDailypaySubscriptionPayload => {
  return {
    subscription:
      overrides && overrides.hasOwnProperty('subscription') ? overrides.subscription! : aDailypaySubscription(),
    success: overrides && overrides.hasOwnProperty('success') ? overrides.success! : false,
  };
};

export const aCreateSsaComplaintTicketInput = (
  overrides?: Partial<CreateSsaComplaintTicketInput>
): CreateSsaComplaintTicketInput => {
  return {
    OSVersion: overrides && overrides.hasOwnProperty('OSVersion') ? overrides.OSVersion! : 'ut',
    appVersion: overrides && overrides.hasOwnProperty('appVersion') ? overrides.appVersion! : 'voluptatem',
    country: overrides && overrides.hasOwnProperty('country') ? overrides.country! : 'qui',
    description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'inventore',
    deviceTypeModel: overrides && overrides.hasOwnProperty('deviceTypeModel') ? overrides.deviceTypeModel! : 'officia',
  };
};

export const aCreateSsaComplaintTicketPayload = (
  overrides?: Partial<CreateSsaComplaintTicketPayload>
): CreateSsaComplaintTicketPayload => {
  return {
    success: overrides && overrides.hasOwnProperty('success') ? overrides.success! : true,
  };
};

export const aCreateScheduledPaymentInput = (
  overrides?: Partial<CreateScheduledPaymentInput>
): CreateScheduledPaymentInput => {
  return {
    accountName: overrides && overrides.hasOwnProperty('accountName') ? overrides.accountName! : 'quia',
    accountNumber: overrides && overrides.hasOwnProperty('accountNumber') ? overrides.accountNumber! : 'libero',
    amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : aMoneyInput(),
    bsb: overrides && overrides.hasOwnProperty('bsb') ? overrides.bsb! : 'laudantium',
    description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'beatae',
    endDate: overrides && overrides.hasOwnProperty('endDate') ? overrides.endDate! : '1970-02-02',
    frequency:
      overrides && overrides.hasOwnProperty('frequency') ? overrides.frequency! : ScheduledPaymentFrequency.Fortnightly,
    numberOfPayments: overrides && overrides.hasOwnProperty('numberOfPayments') ? overrides.numberOfPayments! : 3150,
    reference: overrides && overrides.hasOwnProperty('reference') ? overrides.reference! : 'sapiente',
    senderName: overrides && overrides.hasOwnProperty('senderName') ? overrides.senderName! : 'est',
    startDate: overrides && overrides.hasOwnProperty('startDate') ? overrides.startDate! : '2001-05-17',
    type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : ScheduledPaymentType.OneTime,
  };
};

export const aCreateScheduledPaymentPayload = (
  overrides?: Partial<CreateScheduledPaymentPayload>
): CreateScheduledPaymentPayload => {
  return {
    outcome:
      overrides && overrides.hasOwnProperty('outcome')
        ? overrides.outcome!
        : ScheduledPaymentSaveOutcomeType.BpayInvalidBillerCode,
    payment:
      overrides && overrides.hasOwnProperty('payment') ? overrides.payment! : aScheduledPaymentSaveResponseDetails(),
  };
};

export const aCreateSchedulingSubscriptionInput = (
  overrides?: Partial<CreateSchedulingSubscriptionInput>
): CreateSchedulingSubscriptionInput => {
  return {
    amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : aMoneyV2Input(),
    bankAccountExternalId:
      overrides && overrides.hasOwnProperty('bankAccountExternalId') ? overrides.bankAccountExternalId! : 'doloremque',
    feePromotionApplied:
      overrides && overrides.hasOwnProperty('feePromotionApplied') ? overrides.feePromotionApplied! : false,
    orgId: overrides && overrides.hasOwnProperty('orgId') ? overrides.orgId! : 'nulla',
    plan: overrides && overrides.hasOwnProperty('plan') ? overrides.plan! : SchedulingSubscriptionPlan.Frequently,
  };
};

export const aCreateStashInput = (overrides?: Partial<CreateStashInput>): CreateStashInput => {
  return {
    imageUrl: overrides && overrides.hasOwnProperty('imageUrl') ? overrides.imageUrl! : 'architecto',
    name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'possimus',
    targetAmount: overrides && overrides.hasOwnProperty('targetAmount') ? overrides.targetAmount! : aMoneyV2Input(),
  };
};

export const aCreateStripeClientTokenInput = (
  overrides?: Partial<CreateStripeClientTokenInput>
): CreateStripeClientTokenInput => {
  return {
    amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : 'cupiditate',
    currency: overrides && overrides.hasOwnProperty('currency') ? overrides.currency! : 'aspernatur',
    ehToken: overrides && overrides.hasOwnProperty('ehToken') ? overrides.ehToken! : 'deleniti',
    idempotencyKey: overrides && overrides.hasOwnProperty('idempotencyKey') ? overrides.idempotencyKey! : 'adipisci',
    orgId: overrides && overrides.hasOwnProperty('orgId') ? overrides.orgId! : 'quae',
  };
};

export const aCreateSuperConsolidationInput = (
  overrides?: Partial<CreateSuperConsolidationInput>
): CreateSuperConsolidationInput => {
  return {
    fundName: overrides && overrides.hasOwnProperty('fundName') ? overrides.fundName! : 'eligendi',
    memberNumber: overrides && overrides.hasOwnProperty('memberNumber') ? overrides.memberNumber! : 'occaecati',
    usi: overrides && overrides.hasOwnProperty('usi') ? overrides.usi! : 'est',
  };
};

export const aCreateSuperConsolidationPayload = (
  overrides?: Partial<CreateSuperConsolidationPayload>
): CreateSuperConsolidationPayload => {
  return {
    consolidation:
      overrides && overrides.hasOwnProperty('consolidation') ? overrides.consolidation! : aSuperConsolidation(),
  };
};

export const aCreateSuperConsolidationRequestSupportPayload = (
  overrides?: Partial<CreateSuperConsolidationRequestSupportPayload>
): CreateSuperConsolidationRequestSupportPayload => {
  return {
    consolidationRequestSupport:
      overrides && overrides.hasOwnProperty('consolidationRequestSupport')
        ? overrides.consolidationRequestSupport!
        : aSuperConsolidationRequestSupport(),
  };
};

export const aCreateSwagSuperfundInput = (overrides?: Partial<CreateSwagSuperfundInput>): CreateSwagSuperfundInput => {
  return {
    abn: overrides && overrides.hasOwnProperty('abn') ? overrides.abn! : 'eligendi',
    fundChoice: overrides && overrides.hasOwnProperty('fundChoice') ? overrides.fundChoice! : 'culpa',
    fundName: overrides && overrides.hasOwnProperty('fundName') ? overrides.fundName! : 'dolorem',
    memberNumber: overrides && overrides.hasOwnProperty('memberNumber') ? overrides.memberNumber! : 'iusto',
    usi: overrides && overrides.hasOwnProperty('usi') ? overrides.usi! : 'ipsa',
  };
};

export const aCreateSwagSuperfundPayload = (
  overrides?: Partial<CreateSwagSuperfundPayload>
): CreateSwagSuperfundPayload => {
  return {
    superfund: overrides && overrides.hasOwnProperty('superfund') ? overrides.superfund! : aSwagSuperfund(),
  };
};

export const aCreateTrackingPayload = (overrides?: Partial<CreateTrackingPayload>): CreateTrackingPayload => {
  return {
    success: overrides && overrides.hasOwnProperty('success') ? overrides.success! : false,
  };
};

export const aCreateUkCardInput = (overrides?: Partial<CreateUkCardInput>): CreateUkCardInput => {
  return {
    billingAddress:
      overrides && overrides.hasOwnProperty('billingAddress') ? overrides.billingAddress! : aUniversalAddressInput(),
  };
};

export const aCreateUkCardPayload = (overrides?: Partial<CreateUkCardPayload>): CreateUkCardPayload => {
  return {
    cardId: overrides && overrides.hasOwnProperty('cardId') ? overrides.cardId! : 'totam',
    externalCardId: overrides && overrides.hasOwnProperty('externalCardId') ? overrides.externalCardId! : 'adipisci',
  };
};

export const aCtaCaptions = (overrides?: Partial<CtaCaptions>): CtaCaptions => {
  return {
    agree: overrides && overrides.hasOwnProperty('agree') ? overrides.agree! : 'dolorem',
    disagree: overrides && overrides.hasOwnProperty('disagree') ? overrides.disagree! : 'quas',
  };
};

export const aCurrencyAmount = (overrides?: Partial<CurrencyAmount>): CurrencyAmount => {
  return {
    amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : 3.43,
    currency: overrides && overrides.hasOwnProperty('currency') ? overrides.currency! : Currency.Aud,
  };
};

export const aDailypay = (overrides?: Partial<Dailypay>): Dailypay => {
  return {
    balance: overrides && overrides.hasOwnProperty('balance') ? overrides.balance! : anInstapayBalance(),
    currentSubscription:
      overrides && overrides.hasOwnProperty('currentSubscription')
        ? overrides.currentSubscription!
        : aDailypaySubscription(),
    subscriptionFee:
      overrides && overrides.hasOwnProperty('subscriptionFee')
        ? overrides.subscriptionFee!
        : aDailypaySubscriptionFee(),
    summary: overrides && overrides.hasOwnProperty('summary') ? overrides.summary! : aDailypaySummary(),
  };
};

export const aDailypayMutation = (overrides?: Partial<DailypayMutation>): DailypayMutation => {
  return {
    cancelInstaPayDailySubscription:
      overrides && overrides.hasOwnProperty('cancelInstaPayDailySubscription')
        ? overrides.cancelInstaPayDailySubscription!
        : aCancelInstaPayDailySubscriptionPayload(),
    createInstaPayDailySubscription:
      overrides && overrides.hasOwnProperty('createInstaPayDailySubscription')
        ? overrides.createInstaPayDailySubscription!
        : aCreateDailypaySubscriptionPayload(),
  };
};

export const aDailypaySubscription = (overrides?: Partial<DailypaySubscription>): DailypaySubscription => {
  return {
    currentPayPeriod:
      overrides && overrides.hasOwnProperty('currentPayPeriod') ? overrides.currentPayPeriod! : aPayPeriod(),
    disabled: overrides && overrides.hasOwnProperty('disabled') ? overrides.disabled! : false,
    estimatedCancelAt:
      overrides && overrides.hasOwnProperty('estimatedCancelAt')
        ? overrides.estimatedCancelAt!
        : '2007-01-26T06:56:13.000Z',
    estimatedEffectiveAt:
      overrides && overrides.hasOwnProperty('estimatedEffectiveAt')
        ? overrides.estimatedEffectiveAt!
        : '1984-09-19T07:23:46.000Z',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '8d442697-5916-4a99-b965-12037390b5d6',
  };
};

export const aDailypaySubscriptionFee = (overrides?: Partial<DailypaySubscriptionFee>): DailypaySubscriptionFee => {
  return {
    applicableFee: overrides && overrides.hasOwnProperty('applicableFee') ? overrides.applicableFee! : aMoneyV2(),
    discountCode: overrides && overrides.hasOwnProperty('discountCode') ? overrides.discountCode! : 'itaque',
    originalFee: overrides && overrides.hasOwnProperty('originalFee') ? overrides.originalFee! : aMoneyV2(),
  };
};

export const aDailypaySummary = (overrides?: Partial<DailypaySummary>): DailypaySummary => {
  return {
    currentPayPeriod:
      overrides && overrides.hasOwnProperty('currentPayPeriod') ? overrides.currentPayPeriod! : aPayPeriod(),
    daysUntilNextPayPeriod:
      overrides && overrides.hasOwnProperty('daysUntilNextPayPeriod') ? overrides.daysUntilNextPayPeriod! : 7938,
    success: overrides && overrides.hasOwnProperty('success') ? overrides.success! : true,
    totalWithdrawnAmount:
      overrides && overrides.hasOwnProperty('totalWithdrawnAmount') ? overrides.totalWithdrawnAmount! : aMoney(),
  };
};

export const aDepositToStashInput = (overrides?: Partial<DepositToStashInput>): DepositToStashInput => {
  return {
    amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : aMoneyV2Input(),
  };
};

export const aDigitalWallet = (overrides?: Partial<DigitalWallet>): DigitalWallet => {
  return {
    reference: overrides && overrides.hasOwnProperty('reference') ? overrides.reference! : 'harum',
    type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : WalletType.AppleWallet,
  };
};

export const aDigitalWalletDetails = (overrides?: Partial<DigitalWalletDetails>): DigitalWalletDetails => {
  return {
    primaryAccountIdentifier:
      overrides && overrides.hasOwnProperty('primaryAccountIdentifier') ? overrides.primaryAccountIdentifier! : 'aut',
    wallets: overrides && overrides.hasOwnProperty('wallets') ? overrides.wallets! : [aDigitalWallet()],
  };
};

export const aDisableEarnedWageAccessFeaturesInput = (
  overrides?: Partial<DisableEarnedWageAccessFeaturesInput>
): DisableEarnedWageAccessFeaturesInput => {
  return {
    ehUserId: overrides && overrides.hasOwnProperty('ehUserId') ? overrides.ehUserId! : 'explicabo',
    kpUserId: overrides && overrides.hasOwnProperty('kpUserId') ? overrides.kpUserId! : 1627,
  };
};

export const aDisableEarnedWageAccessFeaturesPayload = (
  overrides?: Partial<DisableEarnedWageAccessFeaturesPayload>
): DisableEarnedWageAccessFeaturesPayload => {
  return {
    success: overrides && overrides.hasOwnProperty('success') ? overrides.success! : false,
  };
};

export const aDiscountHistory = (overrides?: Partial<DiscountHistory>): DiscountHistory => {
  return {
    billableAmount: overrides && overrides.hasOwnProperty('billableAmount') ? overrides.billableAmount! : 0.54,
    createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : '2001-10-26T10:13:03.000Z',
    freightCost: overrides && overrides.hasOwnProperty('freightCost') ? overrides.freightCost! : 8.81,
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'et',
    memberId: overrides && overrides.hasOwnProperty('memberId') ? overrides.memberId! : 'exercitationem',
    name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'ut',
    orderDetails: overrides && overrides.hasOwnProperty('orderDetails') ? overrides.orderDetails! : [anOrderDetails()],
    status: overrides && overrides.hasOwnProperty('status') ? overrides.status! : OrderStatus.CancelAccepted,
    transactionFee: overrides && overrides.hasOwnProperty('transactionFee') ? overrides.transactionFee! : 3.49,
  };
};

export const aDiscountOrderHistory = (overrides?: Partial<DiscountOrderHistory>): DiscountOrderHistory => {
  return {
    edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [aDiscountOrderHistoryEdge()],
    error: overrides && overrides.hasOwnProperty('error') ? overrides.error! : aGenericError(),
    pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : aPageInfo(),
  };
};

export const aDiscountOrderHistoryEdge = (overrides?: Partial<DiscountOrderHistoryEdge>): DiscountOrderHistoryEdge => {
  return {
    node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : aDiscountHistory(),
  };
};

export const aDiscountOrderHistoryInput = (
  overrides?: Partial<DiscountOrderHistoryInput>
): DiscountOrderHistoryInput => {
  return {
    after: overrides && overrides.hasOwnProperty('after') ? overrides.after! : 'ut',
    first: overrides && overrides.hasOwnProperty('first') ? overrides.first! : 6828,
    orgId: overrides && overrides.hasOwnProperty('orgId') ? overrides.orgId! : 'consequuntur',
  };
};

export const aDiscountShopProductDetailsInput = (
  overrides?: Partial<DiscountShopProductDetailsInput>
): DiscountShopProductDetailsInput => {
  return {
    orgId: overrides && overrides.hasOwnProperty('orgId') ? overrides.orgId! : 'aut',
    productCode: overrides && overrides.hasOwnProperty('productCode') ? overrides.productCode! : 'error',
  };
};

export const aDrawdownInput = (overrides?: Partial<DrawdownInput>): DrawdownInput => {
  return {
    amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : aMoneyInput(),
    balanceId: overrides && overrides.hasOwnProperty('balanceId') ? overrides.balanceId! : 'omnis',
    bankAccountId: overrides && overrides.hasOwnProperty('bankAccountId') ? overrides.bankAccountId! : 'mollitia',
    ehMemberId: overrides && overrides.hasOwnProperty('ehMemberId') ? overrides.ehMemberId! : 'aliquam',
    kpBusinessId: overrides && overrides.hasOwnProperty('kpBusinessId') ? overrides.kpBusinessId! : 7121,
    kpEmployeeId: overrides && overrides.hasOwnProperty('kpEmployeeId') ? overrides.kpEmployeeId! : 3648,
  };
};

export const aDrawdownPayload = (overrides?: Partial<DrawdownPayload>): DrawdownPayload => {
  return {
    messageCode: overrides && overrides.hasOwnProperty('messageCode') ? overrides.messageCode! : 'veniam',
    success: overrides && overrides.hasOwnProperty('success') ? overrides.success! : false,
    transactionId: overrides && overrides.hasOwnProperty('transactionId') ? overrides.transactionId! : 'hic',
    version: overrides && overrides.hasOwnProperty('version') ? overrides.version! : 5347,
  };
};

export const anEwaPushNotification = (overrides?: Partial<EwaPushNotification>): EwaPushNotification => {
  return {
    optInStatusByFeature:
      overrides && overrides.hasOwnProperty('optInStatusByFeature')
        ? overrides.optInStatusByFeature!
        : anEwaPushNotificationOptInStatusByFeature(),
    optInStatusByType:
      overrides && overrides.hasOwnProperty('optInStatusByType')
        ? overrides.optInStatusByType!
        : anEwaPushNotificationOptInStatusByType(),
  };
};

export const anEwaPushNotificationMutation = (
  overrides?: Partial<EwaPushNotificationMutation>
): EwaPushNotificationMutation => {
  return {
    optInByFeature:
      overrides && overrides.hasOwnProperty('optInByFeature') ? overrides.optInByFeature! : anInstapayError(),
    optInByType: overrides && overrides.hasOwnProperty('optInByType') ? overrides.optInByType! : anInstapayError(),
    optOutByFeature:
      overrides && overrides.hasOwnProperty('optOutByFeature') ? overrides.optOutByFeature! : anInstapayError(),
    optOutByType: overrides && overrides.hasOwnProperty('optOutByType') ? overrides.optOutByType! : anInstapayError(),
  };
};

export const anEwaPushNotificationOptInStatusByFeature = (
  overrides?: Partial<EwaPushNotificationOptInStatusByFeature>
): EwaPushNotificationOptInStatusByFeature => {
  return {
    featureLevelOptedIn:
      overrides && overrides.hasOwnProperty('featureLevelOptedIn') ? overrides.featureLevelOptedIn! : true,
    statuses:
      overrides && overrides.hasOwnProperty('statuses')
        ? overrides.statuses!
        : [anEwaPushNotificationOptInStatusForSingleType()],
  };
};

export const anEwaPushNotificationOptInStatusByType = (
  overrides?: Partial<EwaPushNotificationOptInStatusByType>
): EwaPushNotificationOptInStatusByType => {
  return {
    statuses:
      overrides && overrides.hasOwnProperty('statuses')
        ? overrides.statuses!
        : [anEwaPushNotificationOptInStatusForSingleType()],
  };
};

export const anEwaPushNotificationOptInStatusForSingleType = (
  overrides?: Partial<EwaPushNotificationOptInStatusForSingleType>
): EwaPushNotificationOptInStatusForSingleType => {
  return {
    optedIn: overrides && overrides.hasOwnProperty('optedIn') ? overrides.optedIn! : true,
    type:
      overrides && overrides.hasOwnProperty('type')
        ? overrides.type!
        : EwaPushNotificationType.RecurringByAmountSuccessfulPayment,
  };
};

export const anEhBinRange = (overrides?: Partial<EhBinRange>): EhBinRange => {
  return {
    from: overrides && overrides.hasOwnProperty('from') ? overrides.from! : 'est',
    to: overrides && overrides.hasOwnProperty('to') ? overrides.to! : 'doloribus',
  };
};

export const anEhMembership = (overrides?: Partial<EhMembership>): EhMembership => {
  return {
    isIndependentContractor:
      overrides && overrides.hasOwnProperty('isIndependentContractor') ? overrides.isIndependentContractor! : true,
    memberId: overrides && overrides.hasOwnProperty('memberId') ? overrides.memberId! : 'nihil',
    orgId: overrides && overrides.hasOwnProperty('orgId') ? overrides.orgId! : 'ad',
    orgName: overrides && overrides.hasOwnProperty('orgName') ? overrides.orgName! : 'nihil',
    orgUUID: overrides && overrides.hasOwnProperty('orgUUID') ? overrides.orgUUID! : 'quia',
    xeroConnected: overrides && overrides.hasOwnProperty('xeroConnected') ? overrides.xeroConnected! : true,
  };
};

export const anEhProfile = (overrides?: Partial<EhProfile>): EhProfile => {
  return {
    avatarUrl: overrides && overrides.hasOwnProperty('avatarUrl') ? overrides.avatarUrl! : 'qui',
    countryCode: overrides && overrides.hasOwnProperty('countryCode') ? overrides.countryCode! : 'eos',
    email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'esse',
    firstName: overrides && overrides.hasOwnProperty('firstName') ? overrides.firstName! : 'cum',
    lastName: overrides && overrides.hasOwnProperty('lastName') ? overrides.lastName! : 'dolorem',
    phoneNumber: overrides && overrides.hasOwnProperty('phoneNumber') ? overrides.phoneNumber! : 'at',
    stateCode: overrides && overrides.hasOwnProperty('stateCode') ? overrides.stateCode! : 'qui',
    userId: overrides && overrides.hasOwnProperty('userId') ? overrides.userId! : 'qui',
    userUuid: overrides && overrides.hasOwnProperty('userUuid') ? overrides.userUuid! : 'omnis',
  };
};

export const anEhProfilePatchInput = (overrides?: Partial<EhProfilePatchInput>): EhProfilePatchInput => {
  return {
    avatarUrl: overrides && overrides.hasOwnProperty('avatarUrl') ? overrides.avatarUrl! : 'aut',
    countryCode: overrides && overrides.hasOwnProperty('countryCode') ? overrides.countryCode! : 'ut',
    email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'est',
    firstName: overrides && overrides.hasOwnProperty('firstName') ? overrides.firstName! : 'molestiae',
    lastName: overrides && overrides.hasOwnProperty('lastName') ? overrides.lastName! : 'ut',
    phoneNumber: overrides && overrides.hasOwnProperty('phoneNumber') ? overrides.phoneNumber! : 'fugiat',
    stateCode: overrides && overrides.hasOwnProperty('stateCode') ? overrides.stateCode! : 'iure',
  };
};

export const anEhProviderId = (overrides?: Partial<EhProviderId>): EhProviderId => {
  return {
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'eum',
  };
};

export const anEligibleForPromotionInput = (
  overrides?: Partial<EligibleForPromotionInput>
): EligibleForPromotionInput => {
  return {
    heroPointsFF: overrides && overrides.hasOwnProperty('heroPointsFF') ? overrides.heroPointsFF! : true,
    isCandidate: overrides && overrides.hasOwnProperty('isCandidate') ? overrides.isCandidate! : false,
  };
};

export const anError = (overrides?: Partial<Error>): Error => {
  return {
    message: overrides && overrides.hasOwnProperty('message') ? overrides.message! : 'et',
  };
};

export const anEstimatedIncomePayload = (overrides?: Partial<EstimatedIncomePayload>): EstimatedIncomePayload => {
  return {
    deductions: overrides && overrides.hasOwnProperty('deductions') ? overrides.deductions! : [anIncomeDeduction()],
    income: overrides && overrides.hasOwnProperty('income') ? overrides.income! : aMoneyV2(),
    payPeriod: overrides && overrides.hasOwnProperty('payPeriod') ? overrides.payPeriod! : aPayPeriod(),
  };
};

export const anEventInput = (overrides?: Partial<EventInput>): EventInput => {
  return {
    event: overrides && overrides.hasOwnProperty('event') ? overrides.event! : 'esse',
    meta: overrides && overrides.hasOwnProperty('meta') ? overrides.meta! : {},
  };
};

export const anEventLogPayloadTuple = (overrides?: Partial<EventLogPayloadTuple>): EventLogPayloadTuple => {
  return {
    key: overrides && overrides.hasOwnProperty('key') ? overrides.key! : 'veniam',
    value: overrides && overrides.hasOwnProperty('value') ? overrides.value! : 'earum',
  };
};

export const anEventMutation = (overrides?: Partial<EventMutation>): EventMutation => {
  return {
    accept: overrides && overrides.hasOwnProperty('accept') ? overrides.accept! : anAcceptEventPayload(),
    createTracking:
      overrides && overrides.hasOwnProperty('createTracking') ? overrides.createTracking! : aCreateTrackingPayload(),
  };
};

export const anExperiment = (overrides?: Partial<Experiment>): Experiment => {
  return {
    instapayAds: overrides && overrides.hasOwnProperty('instapayAds') ? overrides.instapayAds! : anInstapayAds(),
    waitList: overrides && overrides.hasOwnProperty('waitList') ? overrides.waitList! : aWaitList(),
  };
};

export const anExperimentMutation = (overrides?: Partial<ExperimentMutation>): ExperimentMutation => {
  return {
    addEvent: overrides && overrides.hasOwnProperty('addEvent') ? overrides.addEvent! : anAddEventPayload(),
    subscribe: overrides && overrides.hasOwnProperty('subscribe') ? overrides.subscribe! : aSubscribePayload(),
  };
};

export const aFastPaymentRecipientInput = (
  overrides?: Partial<FastPaymentRecipientInput>
): FastPaymentRecipientInput => {
  return {
    accountNumber: overrides && overrides.hasOwnProperty('accountNumber') ? overrides.accountNumber! : 'eaque',
    name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'unde',
    sortCode: overrides && overrides.hasOwnProperty('sortCode') ? overrides.sortCode! : 'laudantium',
  };
};

export const aFasterPaymentsTransferPeerDetails = (
  overrides?: Partial<FasterPaymentsTransferPeerDetails>
): FasterPaymentsTransferPeerDetails => {
  return {
    accountNumber: overrides && overrides.hasOwnProperty('accountNumber') ? overrides.accountNumber! : 'illo',
    name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'iure',
    sortCode: overrides && overrides.hasOwnProperty('sortCode') ? overrides.sortCode! : 'porro',
  };
};

export const aFeatureOfferEdge = (overrides?: Partial<FeatureOfferEdge>): FeatureOfferEdge => {
  return {
    node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : anOnlineOffer(),
  };
};

export const aFeatureOffers = (overrides?: Partial<FeatureOffers>): FeatureOffers => {
  return {
    edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [aFeatureOfferEdge()],
    pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : aPageInfo(),
  };
};

export const aFeatureVisibility = (overrides?: Partial<FeatureVisibility>): FeatureVisibility => {
  return {
    instapayDaily:
      overrides && overrides.hasOwnProperty('instapayDaily') ? overrides.instapayDaily! : anInstaPayDailyVisibility(),
    instapayNow:
      overrides && overrides.hasOwnProperty('instapayNow') ? overrides.instapayNow! : anInstaPayNowVisibility(),
    instapayScheduling:
      overrides && overrides.hasOwnProperty('instapayScheduling') ? overrides.instapayScheduling! : anInstapayError(),
    recurringByDay:
      overrides && overrides.hasOwnProperty('recurringByDay') ? overrides.recurringByDay! : aRecurringByDayVisibility(),
    showInstapay: overrides && overrides.hasOwnProperty('showInstapay') ? overrides.showInstapay! : false,
    showInstapayDaily: overrides && overrides.hasOwnProperty('showInstapayDaily') ? overrides.showInstapayDaily! : true,
  };
};

export const aFeaturesOffersInput = (overrides?: Partial<FeaturesOffersInput>): FeaturesOffersInput => {
  return {
    after: overrides && overrides.hasOwnProperty('after') ? overrides.after! : 'necessitatibus',
    first: overrides && overrides.hasOwnProperty('first') ? overrides.first! : 4645,
  };
};

export const aFee = (overrides?: Partial<Fee>): Fee => {
  return {
    percentage: overrides && overrides.hasOwnProperty('percentage') ? overrides.percentage! : 6.52,
    type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : FeeType.Percentage,
  };
};

export const aFinancialTransaction = (overrides?: Partial<FinancialTransaction>): FinancialTransaction => {
  return {
    cardId:
      overrides && overrides.hasOwnProperty('cardId') ? overrides.cardId! : '7c479dd4-46a7-4f05-b4c4-f1ee5698596b',
    currencyAmount: overrides && overrides.hasOwnProperty('currencyAmount') ? overrides.currencyAmount! : aMoney(),
    dateTimeUTC:
      overrides && overrides.hasOwnProperty('dateTimeUTC') ? overrides.dateTimeUTC! : '2014-09-28T13:34:04.000Z',
    description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'possimus',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '39bea898-d449-4aae-9c21-11c48a7fa5a4',
    merchant: overrides && overrides.hasOwnProperty('merchant') ? overrides.merchant! : aTransactionMerchant(),
    pending: overrides && overrides.hasOwnProperty('pending') ? overrides.pending! : false,
    reference: overrides && overrides.hasOwnProperty('reference') ? overrides.reference! : 'sunt',
    transferPeerDetails:
      overrides && overrides.hasOwnProperty('transferPeerDetails')
        ? overrides.transferPeerDetails!
        : aBsbTransferPeerDetails(),
    type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : TransactionType.Card,
  };
};

export const aFinancialTransactionState = (
  overrides?: Partial<FinancialTransactionState>
): FinancialTransactionState => {
  return {
    state: overrides && overrides.hasOwnProperty('state') ? overrides.state! : UkTransactionState.Approved,
  };
};

export const aFloatAccountMutation = (overrides?: Partial<FloatAccountMutation>): FloatAccountMutation => {
  return {
    addBeneficiary:
      overrides && overrides.hasOwnProperty('addBeneficiary') ? overrides.addBeneficiary! : aNewBeneficiaryPayload(),
  };
};

export const aFundNotifyPreference = (overrides?: Partial<FundNotifyPreference>): FundNotifyPreference => {
  return {
    enabled: overrides && overrides.hasOwnProperty('enabled') ? overrides.enabled! : true,
  };
};

export const aGenericError = (overrides?: Partial<GenericError>): GenericError => {
  return {
    message: overrides && overrides.hasOwnProperty('message') ? overrides.message! : 'numquam',
  };
};

export const aGeometry = (overrides?: Partial<Geometry>): Geometry => {
  return {
    latitude: overrides && overrides.hasOwnProperty('latitude') ? overrides.latitude! : 8.72,
    longitude: overrides && overrides.hasOwnProperty('longitude') ? overrides.longitude! : 3.46,
  };
};

export const aGetEventsInput = (overrides?: Partial<GetEventsInput>): GetEventsInput => {
  return {
    accepted: overrides && overrides.hasOwnProperty('accepted') ? overrides.accepted! : false,
    code: overrides && overrides.hasOwnProperty('code') ? overrides.code! : 'distinctio',
    delivery_status: overrides && overrides.hasOwnProperty('delivery_status') ? overrides.delivery_status! : 'qui',
    fund_usi: overrides && overrides.hasOwnProperty('fund_usi') ? overrides.fund_usi! : 'doloribus',
    items_per_page: overrides && overrides.hasOwnProperty('items_per_page') ? overrides.items_per_page! : 8648,
    order_by: overrides && overrides.hasOwnProperty('order_by') ? overrides.order_by! : 'ea',
    order_direction: overrides && overrides.hasOwnProperty('order_direction') ? overrides.order_direction! : 'qui',
    page_index: overrides && overrides.hasOwnProperty('page_index') ? overrides.page_index! : 569,
  };
};

export const aGetFundNotifyPreferenceInput = (
  overrides?: Partial<GetFundNotifyPreferenceInput>
): GetFundNotifyPreferenceInput => {
  return {
    event_type: overrides && overrides.hasOwnProperty('event_type') ? overrides.event_type! : 'nemo',
    fund_usi: overrides && overrides.hasOwnProperty('fund_usi') ? overrides.fund_usi! : 'dolor',
  };
};

export const aGetLocationByPlaceIdResponse = (
  overrides?: Partial<GetLocationByPlaceIdResponse>
): GetLocationByPlaceIdResponse => {
  return {
    addressDetails:
      overrides && overrides.hasOwnProperty('addressDetails') ? overrides.addressDetails! : aGoogleAddressDetails(),
  };
};

export const aGetLocationsRequest = (overrides?: Partial<GetLocationsRequest>): GetLocationsRequest => {
  return {
    country: overrides && overrides.hasOwnProperty('country') ? overrides.country! : 'voluptates',
    latitude: overrides && overrides.hasOwnProperty('latitude') ? overrides.latitude! : 6.32,
    longitude: overrides && overrides.hasOwnProperty('longitude') ? overrides.longitude! : 8.68,
    placeId: overrides && overrides.hasOwnProperty('placeId') ? overrides.placeId! : 'et',
    postCode: overrides && overrides.hasOwnProperty('postCode') ? overrides.postCode! : 'quia',
    query: overrides && overrides.hasOwnProperty('query') ? overrides.query! : 'temporibus',
  };
};

export const aGetLocationsResponse = (overrides?: Partial<GetLocationsResponse>): GetLocationsResponse => {
  return {
    addresses: overrides && overrides.hasOwnProperty('addresses') ? overrides.addresses! : [aGoogleAddress()],
  };
};

export const aGetSchedulingSubscription = (
  overrides?: Partial<GetSchedulingSubscription>
): GetSchedulingSubscription => {
  return {
    subscriptions:
      overrides && overrides.hasOwnProperty('subscriptions') ? overrides.subscriptions! : [aSchedulingSubscription()],
  };
};

export const aGoogleAddress = (overrides?: Partial<GoogleAddress>): GoogleAddress => {
  return {
    formattedAddress: overrides && overrides.hasOwnProperty('formattedAddress') ? overrides.formattedAddress! : 'hic',
    latitude: overrides && overrides.hasOwnProperty('latitude') ? overrides.latitude! : 5.57,
    longitude: overrides && overrides.hasOwnProperty('longitude') ? overrides.longitude! : 0.67,
    placeId: overrides && overrides.hasOwnProperty('placeId') ? overrides.placeId! : 'velit',
  };
};

export const aGoogleAddressDetails = (overrides?: Partial<GoogleAddressDetails>): GoogleAddressDetails => {
  return {
    addressLine: overrides && overrides.hasOwnProperty('addressLine') ? overrides.addressLine! : 'suscipit',
    country: overrides && overrides.hasOwnProperty('country') ? overrides.country! : 'earum',
    formattedAddress: overrides && overrides.hasOwnProperty('formattedAddress') ? overrides.formattedAddress! : 'quos',
    geometry: overrides && overrides.hasOwnProperty('geometry') ? overrides.geometry! : aGeometry(),
    postCode: overrides && overrides.hasOwnProperty('postCode') ? overrides.postCode! : 'illum',
    region: overrides && overrides.hasOwnProperty('region') ? overrides.region! : 'possimus',
    streetName: overrides && overrides.hasOwnProperty('streetName') ? overrides.streetName! : 'et',
    streetNumber: overrides && overrides.hasOwnProperty('streetNumber') ? overrides.streetNumber! : 'vel',
    streetType: overrides && overrides.hasOwnProperty('streetType') ? overrides.streetType! : 'eligendi',
    townOrCity: overrides && overrides.hasOwnProperty('townOrCity') ? overrides.townOrCity! : 'quia',
    unitNumber: overrides && overrides.hasOwnProperty('unitNumber') ? overrides.unitNumber! : 'voluptatem',
  };
};

export const aGroup = (overrides?: Partial<Group>): Group => {
  return {
    groupMembership:
      overrides && overrides.hasOwnProperty('groupMembership') ? overrides.groupMembership! : aGroupMembership(),
    waitList: overrides && overrides.hasOwnProperty('waitList') ? overrides.waitList! : aGroupWaitList(),
  };
};

export const aGroupCategory = (overrides?: Partial<GroupCategory>): GroupCategory => {
  return {
    createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : '1978-01-13T09:48:13.000Z',
    createdBy: overrides && overrides.hasOwnProperty('createdBy') ? overrides.createdBy! : 'odit',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'accusantium',
    name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'maiores',
  };
};

export const aGroupDetail = (overrides?: Partial<GroupDetail>): GroupDetail => {
  return {
    categories: overrides && overrides.hasOwnProperty('categories') ? overrides.categories! : [aGroupCategory()],
    categoriesIds: overrides && overrides.hasOwnProperty('categoriesIds') ? overrides.categoriesIds! : ['sit'],
    countries: overrides && overrides.hasOwnProperty('countries') ? overrides.countries! : ['hic'],
    description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'perspiciatis',
    howItWorks: overrides && overrides.hasOwnProperty('howItWorks') ? overrides.howItWorks! : 'nesciunt',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'iure',
    imageSrc: overrides && overrides.hasOwnProperty('imageSrc') ? overrides.imageSrc! : 'perferendis',
    memberCount: overrides && overrides.hasOwnProperty('memberCount') ? overrides.memberCount! : 7773,
    promoTitle: overrides && overrides.hasOwnProperty('promoTitle') ? overrides.promoTitle! : 'pariatur',
    savingPeriod: overrides && overrides.hasOwnProperty('savingPeriod') ? overrides.savingPeriod! : 'dignissimos',
    savingRange: overrides && overrides.hasOwnProperty('savingRange') ? overrides.savingRange! : 'quod',
    shareContent: overrides && overrides.hasOwnProperty('shareContent') ? overrides.shareContent! : 'ad',
    subtitle: overrides && overrides.hasOwnProperty('subtitle') ? overrides.subtitle! : 'porro',
    title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'maxime',
  };
};

export const aGroupMembership = (overrides?: Partial<GroupMembership>): GroupMembership => {
  return {
    createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : '1983-02-05T18:12:39.000Z',
    groupId: overrides && overrides.hasOwnProperty('groupId') ? overrides.groupId! : 'sit',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'et',
    position: overrides && overrides.hasOwnProperty('position') ? overrides.position! : 986,
    userId: overrides && overrides.hasOwnProperty('userId') ? overrides.userId! : 'earum',
  };
};

export const aGroupMutation = (overrides?: Partial<GroupMutation>): GroupMutation => {
  return {
    createConsentGroupAgreement:
      overrides && overrides.hasOwnProperty('createConsentGroupAgreement')
        ? overrides.createConsentGroupAgreement!
        : aUserGroupConsent(),
    joinGroup: overrides && overrides.hasOwnProperty('joinGroup') ? overrides.joinGroup! : aJoinGroupPayload(),
    joinWaitList: overrides && overrides.hasOwnProperty('joinWaitList') ? overrides.joinWaitList! : aWaitListPayload(),
    updateUserCategoriesPreference:
      overrides && overrides.hasOwnProperty('updateUserCategoriesPreference')
        ? overrides.updateUserCategoriesPreference!
        : anUpdateUserCategoriesPreferencePayload(),
  };
};

export const aGroupRoot = (overrides?: Partial<GroupRoot>): GroupRoot => {
  return {
    categories: overrides && overrides.hasOwnProperty('categories') ? overrides.categories! : [aGroupCategory()],
    groupDetail: overrides && overrides.hasOwnProperty('groupDetail') ? overrides.groupDetail! : aGroupDetail(),
    groups: overrides && overrides.hasOwnProperty('groups') ? overrides.groups! : [aGroupDetail()],
  };
};

export const aGroupWaitList = (overrides?: Partial<GroupWaitList>): GroupWaitList => {
  return {
    createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : '1976-01-08T11:42:10.000Z',
    userId: overrides && overrides.hasOwnProperty('userId') ? overrides.userId! : 'numquam',
  };
};

export const aHeroPoints = (overrides?: Partial<HeroPoints>): HeroPoints => {
  return {
    balance: overrides && overrides.hasOwnProperty('balance') ? overrides.balance! : 4747,
    payWithHPCarouselSeen:
      overrides && overrides.hasOwnProperty('payWithHPCarouselSeen') ? overrides.payWithHPCarouselSeen! : true,
    paymentPreferences:
      overrides && overrides.hasOwnProperty('paymentPreferences')
        ? overrides.paymentPreferences!
        : aHeroPointsPaymentPreferences(),
    transactionDetails:
      overrides && overrides.hasOwnProperty('transactionDetails')
        ? overrides.transactionDetails!
        : aHeroPointsTransaction(),
    transactionHistories:
      overrides && overrides.hasOwnProperty('transactionHistories')
        ? overrides.transactionHistories!
        : aHeroPointsTransactionHistories(),
  };
};

export const aHeroPointsMutation = (overrides?: Partial<HeroPointsMutation>): HeroPointsMutation => {
  return {
    payWithHPCarouselSeen:
      overrides && overrides.hasOwnProperty('payWithHPCarouselSeen') ? overrides.payWithHPCarouselSeen! : true,
    paymentPreferences:
      overrides && overrides.hasOwnProperty('paymentPreferences')
        ? overrides.paymentPreferences!
        : aHeroPointsPaymentPreferences(),
  };
};

export const aHeroPointsPaymentPreferences = (
  overrides?: Partial<HeroPointsPaymentPreferences>
): HeroPointsPaymentPreferences => {
  return {
    payWithHPOnSwagCard:
      overrides && overrides.hasOwnProperty('payWithHPOnSwagCard') ? overrides.payWithHPOnSwagCard! : false,
  };
};

export const aHeroPointsTransaction = (overrides?: Partial<HeroPointsTransaction>): HeroPointsTransaction => {
  return {
    clientType:
      overrides && overrides.hasOwnProperty('clientType') ? overrides.clientType! : HeroPointsClientType.EbfShaype,
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'dignissimos',
    merchantName: overrides && overrides.hasOwnProperty('merchantName') ? overrides.merchantName! : 'autem',
    organisationName: overrides && overrides.hasOwnProperty('organisationName') ? overrides.organisationName! : 'porro',
    points: overrides && overrides.hasOwnProperty('points') ? overrides.points! : 8867,
    reason: overrides && overrides.hasOwnProperty('reason') ? overrides.reason! : 'facilis',
    reasonType:
      overrides && overrides.hasOwnProperty('reasonType')
        ? overrides.reasonType!
        : HeroPointsReasonType.AssistedImplementation,
    recognisedBy: overrides && overrides.hasOwnProperty('recognisedBy') ? overrides.recognisedBy! : 'optio',
    refId: overrides && overrides.hasOwnProperty('refId') ? overrides.refId! : 'esse',
    transactionTimeUtc:
      overrides && overrides.hasOwnProperty('transactionTimeUtc') ? overrides.transactionTimeUtc! : 'perspiciatis',
    transactionType:
      overrides && overrides.hasOwnProperty('transactionType')
        ? overrides.transactionType!
        : HeroPointsTransactionType.Deduction,
  };
};

export const aHeroPointsTransactionHistories = (
  overrides?: Partial<HeroPointsTransactionHistories>
): HeroPointsTransactionHistories => {
  return {
    itemPerPage: overrides && overrides.hasOwnProperty('itemPerPage') ? overrides.itemPerPage! : 5812,
    items: overrides && overrides.hasOwnProperty('items') ? overrides.items! : [aHeroPointsTransactionItem()],
    pageIndex: overrides && overrides.hasOwnProperty('pageIndex') ? overrides.pageIndex! : 4660,
    totalItems: overrides && overrides.hasOwnProperty('totalItems') ? overrides.totalItems! : 9339,
    totalPages: overrides && overrides.hasOwnProperty('totalPages') ? overrides.totalPages! : 263,
  };
};

export const aHeroPointsTransactionItem = (
  overrides?: Partial<HeroPointsTransactionItem>
): HeroPointsTransactionItem => {
  return {
    clientType:
      overrides && overrides.hasOwnProperty('clientType') ? overrides.clientType! : HeroPointsClientType.EbfShaype,
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'cupiditate',
    points: overrides && overrides.hasOwnProperty('points') ? overrides.points! : 831,
    reason: overrides && overrides.hasOwnProperty('reason') ? overrides.reason! : 'occaecati',
    reasonType:
      overrides && overrides.hasOwnProperty('reasonType')
        ? overrides.reasonType!
        : HeroPointsReasonType.AssistedImplementation,
    refId: overrides && overrides.hasOwnProperty('refId') ? overrides.refId! : 'laudantium',
    transactionTimeUtc:
      overrides && overrides.hasOwnProperty('transactionTimeUtc') ? overrides.transactionTimeUtc! : 'est',
    transactionType:
      overrides && overrides.hasOwnProperty('transactionType')
        ? overrides.transactionType!
        : HeroPointsTransactionType.Deduction,
  };
};

export const aHomeTileDetail = (overrides?: Partial<HomeTileDetail>): HomeTileDetail => {
  return {
    banner: overrides && overrides.hasOwnProperty('banner') ? overrides.banner! : 'magnam',
    provider: overrides && overrides.hasOwnProperty('provider') ? overrides.provider! : aProvider(),
    subTitle: overrides && overrides.hasOwnProperty('subTitle') ? overrides.subTitle! : 'autem',
    title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'autem',
  };
};

export const aHomeTiles = (overrides?: Partial<HomeTiles>): HomeTiles => {
  return {
    tiles: overrides && overrides.hasOwnProperty('tiles') ? overrides.tiles! : [aHomeTileDetail()],
  };
};

export const aHrOrg = (overrides?: Partial<HrOrg>): HrOrg => {
  return {
    activeSuperfundMembership:
      overrides && overrides.hasOwnProperty('activeSuperfundMembership')
        ? overrides.activeSuperfundMembership!
        : anActiveSuperfundMembership(),
    dailypay: overrides && overrides.hasOwnProperty('dailypay') ? overrides.dailypay! : aDailypay(),
    ehMemberId: overrides && overrides.hasOwnProperty('ehMemberId') ? overrides.ehMemberId! : 4769,
    ehMemberUuid:
      overrides && overrides.hasOwnProperty('ehMemberUuid')
        ? overrides.ehMemberUuid!
        : '8057b81d-10ad-4c3d-890f-851d812388f7',
    ewaPushNotification:
      overrides && overrides.hasOwnProperty('ewaPushNotification')
        ? overrides.ewaPushNotification!
        : anEwaPushNotification(),
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 2822,
    instapay: overrides && overrides.hasOwnProperty('instapay') ? overrides.instapay! : anInstapay(),
    isIndependentContractor:
      overrides && overrides.hasOwnProperty('isIndependentContractor') ? overrides.isIndependentContractor! : false,
    kpBusinessId: overrides && overrides.hasOwnProperty('kpBusinessId') ? overrides.kpBusinessId! : 3793,
    kpEmployeeId: overrides && overrides.hasOwnProperty('kpEmployeeId') ? overrides.kpEmployeeId! : 6109,
    kpPartnerId: overrides && overrides.hasOwnProperty('kpPartnerId') ? overrides.kpPartnerId! : 4436,
    member: overrides && overrides.hasOwnProperty('member') ? overrides.member! : aMemberDetail(),
    memberId: overrides && overrides.hasOwnProperty('memberId') ? overrides.memberId! : 8134,
    memberUuid:
      overrides && overrides.hasOwnProperty('memberUuid')
        ? overrides.memberUuid!
        : '748d06d6-208b-42d9-bc0b-c8cd59885fc7',
    name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'ut',
    recurringByDay:
      overrides && overrides.hasOwnProperty('recurringByDay') ? overrides.recurringByDay! : aRecurringByDay(),
    source: overrides && overrides.hasOwnProperty('source') ? overrides.source! : Platform.Eh,
    superContributions:
      overrides && overrides.hasOwnProperty('superContributions')
        ? overrides.superContributions!
        : [aSuperContribution()],
    uuid: overrides && overrides.hasOwnProperty('uuid') ? overrides.uuid! : '3bff43cb-62b9-45d7-817c-f4e68f2dabbc',
    workCountry: overrides && overrides.hasOwnProperty('workCountry') ? overrides.workCountry! : 'quis',
  };
};

export const aHrUser = (overrides?: Partial<HrUser>): HrUser => {
  return {
    countryCode: overrides && overrides.hasOwnProperty('countryCode') ? overrides.countryCode! : 'sit',
  };
};

export const anIdvProfile = (overrides?: Partial<IdvProfile>): IdvProfile => {
  return {
    applicantId: overrides && overrides.hasOwnProperty('applicantId') ? overrides.applicantId! : 'provident',
    status: overrides && overrides.hasOwnProperty('status') ? overrides.status! : IdvProfileStatus.Archived,
    token: overrides && overrides.hasOwnProperty('token') ? overrides.token! : 'magni',
  };
};

export const anInStoreOffer = (overrides?: Partial<InStoreOffer>): InStoreOffer => {
  return {
    address: overrides && overrides.hasOwnProperty('address') ? overrides.address! : 'possimus',
    advertiserAbout: overrides && overrides.hasOwnProperty('advertiserAbout') ? overrides.advertiserAbout! : 'optio',
    advertiserId: overrides && overrides.hasOwnProperty('advertiserId') ? overrides.advertiserId! : 'ut',
    advertiserName: overrides && overrides.hasOwnProperty('advertiserName') ? overrides.advertiserName! : 'voluptatem',
    cashback: overrides && overrides.hasOwnProperty('cashback') ? overrides.cashback! : 'quas',
    categoryCode: overrides && overrides.hasOwnProperty('categoryCode') ? overrides.categoryCode! : 'inventore',
    createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : '1994-06-21T07:07:31.000Z',
    description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'accusantium',
    endDate: overrides && overrides.hasOwnProperty('endDate') ? overrides.endDate! : '2014-06-06T17:49:01.000Z',
    howItWorks: overrides && overrides.hasOwnProperty('howItWorks') ? overrides.howItWorks! : 'fugit',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '3bd80688-39ce-4a29-b1a0-875d28f8c430',
    imageUrl: overrides && overrides.hasOwnProperty('imageUrl') ? overrides.imageUrl! : 'rerum',
    latitude: overrides && overrides.hasOwnProperty('latitude') ? overrides.latitude! : 0.33,
    logoUrl: overrides && overrides.hasOwnProperty('logoUrl') ? overrides.logoUrl! : 'vitae',
    longitude: overrides && overrides.hasOwnProperty('longitude') ? overrides.longitude! : 7.36,
    offerId: overrides && overrides.hasOwnProperty('offerId') ? overrides.offerId! : 'cumque',
    phone: overrides && overrides.hasOwnProperty('phone') ? overrides.phone! : 'officia',
    popularScore: overrides && overrides.hasOwnProperty('popularScore') ? overrides.popularScore! : 8879,
    startDate: overrides && overrides.hasOwnProperty('startDate') ? overrides.startDate! : '1976-03-03T10:44:52.000Z',
    title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'asperiores',
    tnc: overrides && overrides.hasOwnProperty('tnc') ? overrides.tnc! : 'est',
    type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : OfferType.Instore,
    updatedAt: overrides && overrides.hasOwnProperty('updatedAt') ? overrides.updatedAt! : '1988-09-10T23:12:52.000Z',
    website: overrides && overrides.hasOwnProperty('website') ? overrides.website! : 'hic',
  };
};

export const anInStoreOfferEdge = (overrides?: Partial<InStoreOfferEdge>): InStoreOfferEdge => {
  return {
    node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : anInStoreOffer(),
  };
};

export const anInStoreOffers = (overrides?: Partial<InStoreOffers>): InStoreOffers => {
  return {
    edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [anInStoreOfferEdge()],
    error: overrides && overrides.hasOwnProperty('error') ? overrides.error! : aGenericError(),
    pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : aPageInfo(),
  };
};

export const anInStoreOffersInput = (overrides?: Partial<InStoreOffersInput>): InStoreOffersInput => {
  return {
    after: overrides && overrides.hasOwnProperty('after') ? overrides.after! : 'dolores',
    categoryCode: overrides && overrides.hasOwnProperty('categoryCode') ? overrides.categoryCode! : 'hic',
    first: overrides && overrides.hasOwnProperty('first') ? overrides.first! : 6666,
    latitude: overrides && overrides.hasOwnProperty('latitude') ? overrides.latitude! : 9.6,
    longitude: overrides && overrides.hasOwnProperty('longitude') ? overrides.longitude! : 9.72,
    query: overrides && overrides.hasOwnProperty('query') ? overrides.query! : 'voluptatibus',
  };
};

export const anInStoreRequireLatLong = (overrides?: Partial<InStoreRequireLatLong>): InStoreRequireLatLong => {
  return {
    message: overrides && overrides.hasOwnProperty('message') ? overrides.message! : 'nisi',
  };
};

export const anIncomeDeduction = (overrides?: Partial<IncomeDeduction>): IncomeDeduction => {
  return {
    amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : aMoneyV2(),
  };
};

export const anInstaPayDailyVisibility = (overrides?: Partial<InstaPayDailyVisibility>): InstaPayDailyVisibility => {
  return {
    showInstapayDaily:
      overrides && overrides.hasOwnProperty('showInstapayDaily') ? overrides.showInstapayDaily! : false,
    underMaintenance: overrides && overrides.hasOwnProperty('underMaintenance') ? overrides.underMaintenance! : false,
  };
};

export const anInstaPayNowVisibility = (overrides?: Partial<InstaPayNowVisibility>): InstaPayNowVisibility => {
  return {
    showEstIncome: overrides && overrides.hasOwnProperty('showEstIncome') ? overrides.showEstIncome! : true,
    showInstapay: overrides && overrides.hasOwnProperty('showInstapay') ? overrides.showInstapay! : true,
    underMaintenance: overrides && overrides.hasOwnProperty('underMaintenance') ? overrides.underMaintenance! : false,
  };
};

export const anInstapay = (overrides?: Partial<Instapay>): Instapay => {
  return {
    availableIncentives:
      overrides && overrides.hasOwnProperty('availableIncentives') ? overrides.availableIncentives! : anInstapayError(),
    balance: overrides && overrides.hasOwnProperty('balance') ? overrides.balance! : anInstapayBalance(),
    bankAccounts:
      overrides && overrides.hasOwnProperty('bankAccounts') ? overrides.bankAccounts! : [anInstapayBankAccount()],
    estBalance: overrides && overrides.hasOwnProperty('estBalance') ? overrides.estBalance! : anInstapayEstBalance(),
    estimatedIncome:
      overrides && overrides.hasOwnProperty('estimatedIncome')
        ? overrides.estimatedIncome!
        : anEstimatedIncomePayload(),
    feeByPercentageMarketplace:
      overrides && overrides.hasOwnProperty('feeByPercentageMarketplace')
        ? overrides.feeByPercentageMarketplace!
        : 5.54,
    isFirstTime: overrides && overrides.hasOwnProperty('isFirstTime') ? overrides.isFirstTime! : true,
    recurringByAmountEligibility:
      overrides && overrides.hasOwnProperty('recurringByAmountEligibility')
        ? overrides.recurringByAmountEligibility!
        : aRecurringByAmountEligibilityResult(),
    schedulingPromotionEligible:
      overrides && overrides.hasOwnProperty('schedulingPromotionEligible')
        ? overrides.schedulingPromotionEligible!
        : true,
    schedulingSubscriptions:
      overrides && overrides.hasOwnProperty('schedulingSubscriptions')
        ? overrides.schedulingSubscriptions!
        : aGetSchedulingSubscription(),
    showInstapayIntroduction:
      overrides && overrides.hasOwnProperty('showInstapayIntroduction') ? overrides.showInstapayIntroduction! : true,
    showInstapayIntroductionV2:
      overrides && overrides.hasOwnProperty('showInstapayIntroductionV2')
        ? overrides.showInstapayIntroductionV2!
        : false,
    ssaFee: overrides && overrides.hasOwnProperty('ssaFee') ? overrides.ssaFee! : aMoneyV2(),
    ssaFeeV2: overrides && overrides.hasOwnProperty('ssaFeeV2') ? overrides.ssaFeeV2! : aFee(),
    transactions: overrides && overrides.hasOwnProperty('transactions') ? overrides.transactions! : anInstapayError(),
    withdrawalLimit:
      overrides && overrides.hasOwnProperty('withdrawalLimit') ? overrides.withdrawalLimit! : anInstapayError(),
  };
};

export const anInstapayAds = (overrides?: Partial<InstapayAds>): InstapayAds => {
  return {
    adDisplayInterval: overrides && overrides.hasOwnProperty('adDisplayInterval') ? overrides.adDisplayInterval! : 9284,
  };
};

export const anInstapayBalance = (overrides?: Partial<InstapayBalance>): InstapayBalance => {
  return {
    balance: overrides && overrides.hasOwnProperty('balance') ? overrides.balance! : 7.36,
    balanceType:
      overrides && overrides.hasOwnProperty('balanceType') ? overrides.balanceType! : InstapayBalanceType.Dailypay,
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'in',
    payPeriod: overrides && overrides.hasOwnProperty('payPeriod') ? overrides.payPeriod! : aPayPeriod(),
  };
};

export const anInstapayBalanceErrorContext = (
  overrides?: Partial<InstapayBalanceErrorContext>
): InstapayBalanceErrorContext => {
  return {
    payCycle: overrides && overrides.hasOwnProperty('payCycle') ? overrides.payCycle! : PayCycle.Fortnightly,
  };
};

export const anInstapayBankAccount = (overrides?: Partial<InstapayBankAccount>): InstapayBankAccount => {
  return {
    accountName: overrides && overrides.hasOwnProperty('accountName') ? overrides.accountName! : 'aut',
    accountNumber: overrides && overrides.hasOwnProperty('accountNumber') ? overrides.accountNumber! : 'qui',
    bankAccountSource:
      overrides && overrides.hasOwnProperty('bankAccountSource')
        ? overrides.bankAccountSource!
        : InstapayBankAccountSource.Eh,
    beneficiaryId: overrides && overrides.hasOwnProperty('beneficiaryId') ? overrides.beneficiaryId! : 'magnam',
    bsb: overrides && overrides.hasOwnProperty('bsb') ? overrides.bsb! : 'qui',
    externalId: overrides && overrides.hasOwnProperty('externalId') ? overrides.externalId! : 'expedita',
    fee: overrides && overrides.hasOwnProperty('fee') ? overrides.fee! : aMoneyV2(),
    feeV2: overrides && overrides.hasOwnProperty('feeV2') ? overrides.feeV2! : aFee(),
    isSSA: overrides && overrides.hasOwnProperty('isSSA') ? overrides.isSSA! : false,
    schedulingPromotionFee:
      overrides && overrides.hasOwnProperty('schedulingPromotionFee') ? overrides.schedulingPromotionFee! : aFee(),
    sortCode: overrides && overrides.hasOwnProperty('sortCode') ? overrides.sortCode! : 'repellendus',
  };
};

export const anInstapayError = (overrides?: Partial<InstapayError>): InstapayError => {
  return {
    code: overrides && overrides.hasOwnProperty('code') ? overrides.code! : InstapayErrorCode.ActiveSubscriptionExist,
    context: overrides && overrides.hasOwnProperty('context') ? overrides.context! : anInstapayBalanceErrorContext(),
  };
};

export const anInstapayEstBalance = (overrides?: Partial<InstapayEstBalance>): InstapayEstBalance => {
  return {
    balance: overrides && overrides.hasOwnProperty('balance') ? overrides.balance! : aMoneyV2(),
    createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : '2004-02-26T21:08:12.000Z',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'iste',
  };
};

export const anInstapayEstBalanceError = (overrides?: Partial<InstapayEstBalanceError>): InstapayEstBalanceError => {
  return {
    code: overrides && overrides.hasOwnProperty('code') ? overrides.code! : InstapayErrorCode.ActiveSubscriptionExist,
  };
};

export const anInstapayMutation = (overrides?: Partial<InstapayMutation>): InstapayMutation => {
  return {
    addPreferInstapayOption:
      overrides && overrides.hasOwnProperty('addPreferInstapayOption')
        ? overrides.addPreferInstapayOption!
        : anAddPreferInstapayOptionPayload(),
    cancelSchedulingSubscription:
      overrides && overrides.hasOwnProperty('cancelSchedulingSubscription')
        ? overrides.cancelSchedulingSubscription!
        : anInstapayError(),
    createSchedulingSubscription:
      overrides && overrides.hasOwnProperty('createSchedulingSubscription')
        ? overrides.createSchedulingSubscription!
        : anInstapayError(),
    disableEarnedWageAccessFeatures:
      overrides && overrides.hasOwnProperty('disableEarnedWageAccessFeatures')
        ? overrides.disableEarnedWageAccessFeatures!
        : aDisableEarnedWageAccessFeaturesPayload(),
    drawdown: overrides && overrides.hasOwnProperty('drawdown') ? overrides.drawdown! : aDrawdownPayload(),
    submitInstaPayDrawdownSurvey:
      overrides && overrides.hasOwnProperty('submitInstaPayDrawdownSurvey')
        ? overrides.submitInstaPayDrawdownSurvey!
        : anInstapayError(),
    updateSchedulingSubscription:
      overrides && overrides.hasOwnProperty('updateSchedulingSubscription')
        ? overrides.updateSchedulingSubscription!
        : anInstapayError(),
  };
};

export const anInstapayNowIncentive = (overrides?: Partial<InstapayNowIncentive>): InstapayNowIncentive => {
  return {
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'voluptatibus',
    maxTransactionThreshold:
      overrides && overrides.hasOwnProperty('maxTransactionThreshold')
        ? overrides.maxTransactionThreshold!
        : aMoneyV2(),
    process: overrides && overrides.hasOwnProperty('process') ? overrides.process! : anInstapayNowIncentiveProcess(),
  };
};

export const anInstapayNowIncentivePayload = (
  overrides?: Partial<InstapayNowIncentivePayload>
): InstapayNowIncentivePayload => {
  return {
    incentives:
      overrides && overrides.hasOwnProperty('incentives') ? overrides.incentives! : [anInstapayNowIncentive()],
  };
};

export const anInstapayNowIncentiveProcess = (
  overrides?: Partial<InstapayNowIncentiveProcess>
): InstapayNowIncentiveProcess => {
  return {
    earningProcess: overrides && overrides.hasOwnProperty('earningProcess') ? overrides.earningProcess! : 2981,
    isRedeemed: overrides && overrides.hasOwnProperty('isRedeemed') ? overrides.isRedeemed! : false,
  };
};

export const anInstapayOptionInput = (overrides?: Partial<InstapayOptionInput>): InstapayOptionInput => {
  return {
    instaPayOption:
      overrides && overrides.hasOwnProperty('instaPayOption') ? overrides.instaPayOption! : InstaPayOption.Dailypay,
    orgId: overrides && overrides.hasOwnProperty('orgId') ? overrides.orgId! : 'ut',
  };
};

export const anInstapayTransaction = (overrides?: Partial<InstapayTransaction>): InstapayTransaction => {
  return {
    abaLodgementReference:
      overrides && overrides.hasOwnProperty('abaLodgementReference') ? overrides.abaLodgementReference! : 'sapiente',
    adminFee: overrides && overrides.hasOwnProperty('adminFee') ? overrides.adminFee! : aMoneyV2(),
    amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : aMoney(),
    bankAccount:
      overrides && overrides.hasOwnProperty('bankAccount')
        ? overrides.bankAccount!
        : anInstapayTransactionBankAccount(),
    createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : 'ea',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '147bf864-0e50-40c5-a3f5-4db0e9a6d2c1',
    memberId: overrides && overrides.hasOwnProperty('memberId') ? overrides.memberId! : 'quia',
  };
};

export const anInstapayTransactionBankAccount = (
  overrides?: Partial<InstapayTransactionBankAccount>
): InstapayTransactionBankAccount => {
  return {
    accountName: overrides && overrides.hasOwnProperty('accountName') ? overrides.accountName! : 'eum',
    bsb: overrides && overrides.hasOwnProperty('bsb') ? overrides.bsb! : 'vitae',
  };
};

export const anInstapayTransactions = (overrides?: Partial<InstapayTransactions>): InstapayTransactions => {
  return {
    pageInfo:
      overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : anInstapayTransactionsPageInfo(),
    transactions:
      overrides && overrides.hasOwnProperty('transactions') ? overrides.transactions! : [anInstapayTransaction()],
  };
};

export const anInstapayTransactionsFilterInput = (
  overrides?: Partial<InstapayTransactionsFilterInput>
): InstapayTransactionsFilterInput => {
  return {
    end: overrides && overrides.hasOwnProperty('end') ? overrides.end! : '2000-01-11T12:05:18.000Z',
    endDate: overrides && overrides.hasOwnProperty('endDate') ? overrides.endDate! : 'dolorem',
    payType: overrides && overrides.hasOwnProperty('payType') ? overrides.payType! : InstapayPayType.Dailypay,
    start: overrides && overrides.hasOwnProperty('start') ? overrides.start! : '1972-09-30T03:03:12.000Z',
    startDate: overrides && overrides.hasOwnProperty('startDate') ? overrides.startDate! : 'ex',
    statuses: overrides && overrides.hasOwnProperty('statuses') ? overrides.statuses! : 'corrupti',
  };
};

export const anInstapayTransactionsPageInfo = (
  overrides?: Partial<InstapayTransactionsPageInfo>
): InstapayTransactionsPageInfo => {
  return {
    endCursor: overrides && overrides.hasOwnProperty('endCursor') ? overrides.endCursor! : 'rem',
    hasNextPage: overrides && overrides.hasOwnProperty('hasNextPage') ? overrides.hasNextPage! : false,
  };
};

export const anInstapayUsage = (overrides?: Partial<InstapayUsage>): InstapayUsage => {
  return {
    isFirstTime: overrides && overrides.hasOwnProperty('isFirstTime') ? overrides.isFirstTime! : true,
  };
};

export const anInstapayWithdrawalLimit = (overrides?: Partial<InstapayWithdrawalLimit>): InstapayWithdrawalLimit => {
  return {
    schedulingWithdrawalMinLimit:
      overrides && overrides.hasOwnProperty('schedulingWithdrawalMinLimit')
        ? overrides.schedulingWithdrawalMinLimit!
        : 8.21,
    withdrawalMaxLimit:
      overrides && overrides.hasOwnProperty('withdrawalMaxLimit') ? overrides.withdrawalMaxLimit! : 8.17,
    withdrawalMinLimit:
      overrides && overrides.hasOwnProperty('withdrawalMinLimit') ? overrides.withdrawalMinLimit! : 4.06,
  };
};

export const anInstoreOfferV2 = (overrides?: Partial<InstoreOfferV2>): InstoreOfferV2 => {
  return {
    advertiserAbout:
      overrides && overrides.hasOwnProperty('advertiserAbout') ? overrides.advertiserAbout! : 'praesentium',
    advertiserName: overrides && overrides.hasOwnProperty('advertiserName') ? overrides.advertiserName! : 'excepturi',
    cashback: overrides && overrides.hasOwnProperty('cashback') ? overrides.cashback! : 'quia',
    categoryCode: overrides && overrides.hasOwnProperty('categoryCode') ? overrides.categoryCode! : 'qui',
    createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : '1998-12-26T23:31:08.000Z',
    description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'numquam',
    endDate: overrides && overrides.hasOwnProperty('endDate') ? overrides.endDate! : '1980-09-15T14:36:59.000Z',
    howItWorks: overrides && overrides.hasOwnProperty('howItWorks') ? overrides.howItWorks! : 'nulla',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '6c251518-ce4b-478e-b135-fa57bf17f551',
    imageUrl: overrides && overrides.hasOwnProperty('imageUrl') ? overrides.imageUrl! : 'officia',
    locations: overrides && overrides.hasOwnProperty('locations') ? overrides.locations! : [anOfferLocation()],
    logoUrl: overrides && overrides.hasOwnProperty('logoUrl') ? overrides.logoUrl! : 'et',
    offerId: overrides && overrides.hasOwnProperty('offerId') ? overrides.offerId! : 'aut',
    phone: overrides && overrides.hasOwnProperty('phone') ? overrides.phone! : 'aut',
    popularScore: overrides && overrides.hasOwnProperty('popularScore') ? overrides.popularScore! : 9832,
    startDate: overrides && overrides.hasOwnProperty('startDate') ? overrides.startDate! : '1989-07-06T19:45:05.000Z',
    title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'sit',
    tnc: overrides && overrides.hasOwnProperty('tnc') ? overrides.tnc! : 'cumque',
    type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : OfferType.Instore,
    updatedAt: overrides && overrides.hasOwnProperty('updatedAt') ? overrides.updatedAt! : '1992-04-18T06:54:04.000Z',
    website: overrides && overrides.hasOwnProperty('website') ? overrides.website! : 'veritatis',
  };
};

export const anInstoreOffersV2 = (overrides?: Partial<InstoreOffersV2>): InstoreOffersV2 => {
  return {
    error: overrides && overrides.hasOwnProperty('error') ? overrides.error! : aGenericError(),
    offers: overrides && overrides.hasOwnProperty('offers') ? overrides.offers! : [anInstoreOfferV2()],
  };
};

export const aJoinGroupInput = (overrides?: Partial<JoinGroupInput>): JoinGroupInput => {
  return {
    groupId: overrides && overrides.hasOwnProperty('groupId') ? overrides.groupId! : 'et',
  };
};

export const aJoinGroupPayload = (overrides?: Partial<JoinGroupPayload>): JoinGroupPayload => {
  return {
    groupMembership:
      overrides && overrides.hasOwnProperty('groupMembership') ? overrides.groupMembership! : aGroupMembership(),
  };
};

export const aJoinWaitListInput = (overrides?: Partial<JoinWaitListInput>): JoinWaitListInput => {
  return {
    categoryAction:
      overrides && overrides.hasOwnProperty('categoryAction') ? overrides.categoryAction! : CategoryAction.Chosen,
  };
};

export const aLifecycle = (overrides?: Partial<Lifecycle>): Lifecycle => {
  return {
    events: overrides && overrides.hasOwnProperty('events') ? overrides.events! : [aLifecycleEvent()],
    fundNotifyPreference:
      overrides && overrides.hasOwnProperty('fundNotifyPreference')
        ? overrides.fundNotifyPreference!
        : aFundNotifyPreference(),
  };
};

export const aLifecycleEvent = (overrides?: Partial<LifecycleEvent>): LifecycleEvent => {
  return {
    accepted: overrides && overrides.hasOwnProperty('accepted') ? overrides.accepted! : false,
    accepted_from: overrides && overrides.hasOwnProperty('accepted_from') ? overrides.accepted_from! : 'eligendi',
    author_id: overrides && overrides.hasOwnProperty('author_id') ? overrides.author_id! : 'molestias',
    author_type: overrides && overrides.hasOwnProperty('author_type') ? overrides.author_type! : 'facilis',
    code: overrides && overrides.hasOwnProperty('code') ? overrides.code! : 'inventore',
    created_at:
      overrides && overrides.hasOwnProperty('created_at') ? overrides.created_at! : '1983-01-12T00:54:18.000Z',
    data: overrides && overrides.hasOwnProperty('data') ? overrides.data! : 'vero',
    delivered_at:
      overrides && overrides.hasOwnProperty('delivered_at') ? overrides.delivered_at! : '2011-05-04T01:57:15.000Z',
    delivery_status: overrides && overrides.hasOwnProperty('delivery_status') ? overrides.delivery_status! : 'ut',
    fund_usi: overrides && overrides.hasOwnProperty('fund_usi') ? overrides.fund_usi! : 'quia',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '7861e6ea-4b07-4c7f-9fe2-49c5000937e5',
    owner_id: overrides && overrides.hasOwnProperty('owner_id') ? overrides.owner_id! : 'velit',
    source: overrides && overrides.hasOwnProperty('source') ? overrides.source! : 'labore',
    trigger_time:
      overrides && overrides.hasOwnProperty('trigger_time') ? overrides.trigger_time! : '1985-11-14T19:37:30.000Z',
    updated_at:
      overrides && overrides.hasOwnProperty('updated_at') ? overrides.updated_at! : '2016-03-26T10:08:42.000Z',
    user_id: overrides && overrides.hasOwnProperty('user_id') ? overrides.user_id! : 'atque',
  };
};

export const aLifecycleMutation = (overrides?: Partial<LifecycleMutation>): LifecycleMutation => {
  return {
    event: overrides && overrides.hasOwnProperty('event') ? overrides.event! : anEventMutation(),
  };
};

export const aLifecycleTrackingInput = (overrides?: Partial<LifecycleTrackingInput>): LifecycleTrackingInput => {
  return {
    author_id: overrides && overrides.hasOwnProperty('author_id') ? overrides.author_id! : 'repudiandae',
    author_type: overrides && overrides.hasOwnProperty('author_type') ? overrides.author_type! : 'et',
    channel: overrides && overrides.hasOwnProperty('channel') ? overrides.channel! : 'id',
    data: overrides && overrides.hasOwnProperty('data') ? overrides.data! : 'placeat',
    event_id: overrides && overrides.hasOwnProperty('event_id') ? overrides.event_id! : 'voluptatem',
    name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'vel',
  };
};

export const aLinkedCards = (overrides?: Partial<LinkedCards>): LinkedCards => {
  return {
    cards: overrides && overrides.hasOwnProperty('cards') ? overrides.cards! : [aCashbackCard()],
    error: overrides && overrides.hasOwnProperty('error') ? overrides.error! : aGenericError(),
  };
};

export const aLocations = (overrides?: Partial<Locations>): Locations => {
  return {
    getLocations:
      overrides && overrides.hasOwnProperty('getLocations') ? overrides.getLocations! : aGetLocationsResponse(),
  };
};

export const aMakePaymentItem = (overrides?: Partial<MakePaymentItem>): MakePaymentItem => {
  return {
    quantity: overrides && overrides.hasOwnProperty('quantity') ? overrides.quantity! : 0.26,
    variantCode: overrides && overrides.hasOwnProperty('variantCode') ? overrides.variantCode! : 'beatae',
  };
};

export const aMakePaymentPaymentMethod = (overrides?: Partial<MakePaymentPaymentMethod>): MakePaymentPaymentMethod => {
  return {
    creditCard: overrides && overrides.hasOwnProperty('creditCard') ? overrides.creditCard! : 'et',
    heroPoints: overrides && overrides.hasOwnProperty('heroPoints') ? overrides.heroPoints! : 'eveniet',
    instapay: overrides && overrides.hasOwnProperty('instapay') ? overrides.instapay! : 'vero',
  };
};

export const aMakeStripePaymentInput = (overrides?: Partial<MakeStripePaymentInput>): MakeStripePaymentInput => {
  return {
    deviceData: overrides && overrides.hasOwnProperty('deviceData') ? overrides.deviceData! : 'adipisci',
    ehPlatform: overrides && overrides.hasOwnProperty('ehPlatform') ? overrides.ehPlatform! : 'assumenda',
    ehToken: overrides && overrides.hasOwnProperty('ehToken') ? overrides.ehToken! : 'placeat',
    items: overrides && overrides.hasOwnProperty('items') ? overrides.items! : [aMakePaymentItem()],
    nonce: overrides && overrides.hasOwnProperty('nonce') ? overrides.nonce! : 'laboriosam',
    orgId: overrides && overrides.hasOwnProperty('orgId') ? overrides.orgId! : 'consequatur',
    paymentMethod:
      overrides && overrides.hasOwnProperty('paymentMethod') ? overrides.paymentMethod! : aMakePaymentPaymentMethod(),
    serviceFee: overrides && overrides.hasOwnProperty('serviceFee') ? overrides.serviceFee! : 'rerum',
  };
};

export const aMakeStripePaymentPayload = (overrides?: Partial<MakeStripePaymentPayload>): MakeStripePaymentPayload => {
  return {
    billableAmount: overrides && overrides.hasOwnProperty('billableAmount') ? overrides.billableAmount! : 7.63,
    createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : 'maiores',
    error: overrides && overrides.hasOwnProperty('error') ? overrides.error! : aGenericError(),
    freightCost: overrides && overrides.hasOwnProperty('freightCost') ? overrides.freightCost! : 2.86,
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'ea',
    ipAddress: overrides && overrides.hasOwnProperty('ipAddress') ? overrides.ipAddress! : 'ratione',
    memberId: overrides && overrides.hasOwnProperty('memberId') ? overrides.memberId! : 'officia',
    name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'qui',
    status: overrides && overrides.hasOwnProperty('status') ? overrides.status! : 'quaerat',
    transactionFee: overrides && overrides.hasOwnProperty('transactionFee') ? overrides.transactionFee! : 7.63,
    type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : 'architecto',
  };
};

export const aMemberDetail = (overrides?: Partial<MemberDetail>): MemberDetail => {
  return {
    avatar_url: overrides && overrides.hasOwnProperty('avatar_url') ? overrides.avatar_url! : 'provident',
    ehMemberUuid:
      overrides && overrides.hasOwnProperty('ehMemberUuid')
        ? overrides.ehMemberUuid!
        : 'bd60d0dc-65ae-4dff-b109-b23bfd549e6c',
    ehOrgId: overrides && overrides.hasOwnProperty('ehOrgId') ? overrides.ehOrgId! : 'voluptas',
    ehUserId: overrides && overrides.hasOwnProperty('ehUserId') ? overrides.ehUserId! : 'ut',
    email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'est',
    external_id: overrides && overrides.hasOwnProperty('external_id') ? overrides.external_id! : 'omnis',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'b8f5dc9c-b9f8-479c-8590-44220f7dde8d',
    job_title: overrides && overrides.hasOwnProperty('job_title') ? overrides.job_title! : 'asperiores',
    kpBusinessId: overrides && overrides.hasOwnProperty('kpBusinessId') ? overrides.kpBusinessId! : 4770,
    kpEmployeeId: overrides && overrides.hasOwnProperty('kpEmployeeId') ? overrides.kpEmployeeId! : 9244,
    kpUserId: overrides && overrides.hasOwnProperty('kpUserId') ? overrides.kpUserId! : 3402,
    legacy_id: overrides && overrides.hasOwnProperty('legacy_id') ? overrides.legacy_id! : 7991,
    name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'quia',
    organisation_id: overrides && overrides.hasOwnProperty('organisation_id') ? overrides.organisation_id! : 'quia',
    paySplit: overrides && overrides.hasOwnProperty('paySplit') ? overrides.paySplit! : aPaySplit(),
    role: overrides && overrides.hasOwnProperty('role') ? overrides.role! : 'minus',
    source: overrides && overrides.hasOwnProperty('source') ? overrides.source! : Platform.Eh,
    user_id: overrides && overrides.hasOwnProperty('user_id') ? overrides.user_id! : 'et',
    work_country: overrides && overrides.hasOwnProperty('work_country') ? overrides.work_country! : 'sunt',
  };
};

export const aMinSupportVersion = (overrides?: Partial<MinSupportVersion>): MinSupportVersion => {
  return {
    benefits: overrides && overrides.hasOwnProperty('benefits') ? overrides.benefits! : aBenefitsMinSupportVersion(),
  };
};

export const aMoney = (overrides?: Partial<Money>): Money => {
  return {
    subUnits: overrides && overrides.hasOwnProperty('subUnits') ? overrides.subUnits! : 3736,
    type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : CurrencyType.CurrencyTypeAud,
    units: overrides && overrides.hasOwnProperty('units') ? overrides.units! : 1973,
  };
};

export const aMoneyInput = (overrides?: Partial<MoneyInput>): MoneyInput => {
  return {
    subUnits: overrides && overrides.hasOwnProperty('subUnits') ? overrides.subUnits! : 9018,
    type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : CurrencyType.CurrencyTypeAud,
    units: overrides && overrides.hasOwnProperty('units') ? overrides.units! : 2513,
  };
};

export const aMoneyV2 = (overrides?: Partial<MoneyV2>): MoneyV2 => {
  return {
    sign: overrides && overrides.hasOwnProperty('sign') ? overrides.sign! : Sign.Negative,
    subUnits: overrides && overrides.hasOwnProperty('subUnits') ? overrides.subUnits! : 6959,
    type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : CurrencyType.CurrencyTypeAud,
    units: overrides && overrides.hasOwnProperty('units') ? overrides.units! : 2172,
  };
};

export const aMoneyV2Input = (overrides?: Partial<MoneyV2Input>): MoneyV2Input => {
  return {
    sign: overrides && overrides.hasOwnProperty('sign') ? overrides.sign! : Sign.Negative,
    subUnits: overrides && overrides.hasOwnProperty('subUnits') ? overrides.subUnits! : 976,
    type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : CurrencyType.CurrencyTypeAud,
    units: overrides && overrides.hasOwnProperty('units') ? overrides.units! : 6852,
  };
};

export const aMutation = (overrides?: Partial<Mutation>): Mutation => {
  return {
    blockUKCard:
      overrides && overrides.hasOwnProperty('blockUKCard') ? overrides.blockUKCard! : aMutationSuccessPayload(),
    bmSubmitSubscription:
      overrides && overrides.hasOwnProperty('bmSubmitSubscription')
        ? overrides.bmSubmitSubscription!
        : aBmSubmitSubscriptionPayload(),
    bsJoinWaitList:
      overrides && overrides.hasOwnProperty('bsJoinWaitList') ? overrides.bsJoinWaitList! : aBsJoinWaitListPayload(),
    cancelInstaPayDailySubscription:
      overrides && overrides.hasOwnProperty('cancelInstaPayDailySubscription')
        ? overrides.cancelInstaPayDailySubscription!
        : aCancelInstaPayDailySubscriptionPayload(),
    cancelScheduledPayment:
      overrides && overrides.hasOwnProperty('cancelScheduledPayment')
        ? overrides.cancelScheduledPayment!
        : aMutationSuccessPayload(),
    card: overrides && overrides.hasOwnProperty('card') ? overrides.card! : aCardMutation(),
    cashback: overrides && overrides.hasOwnProperty('cashback') ? overrides.cashback! : aCashbackMutation(),
    clearPersistentNotifications:
      overrides && overrides.hasOwnProperty('clearPersistentNotifications')
        ? overrides.clearPersistentNotifications!
        : aMutationSuccessPayload(),
    closeStash: overrides && overrides.hasOwnProperty('closeStash') ? overrides.closeStash! : true,
    createComplaintTicket:
      overrides && overrides.hasOwnProperty('createComplaintTicket')
        ? overrides.createComplaintTicket!
        : aCreateComplaintTicketPayload(),
    createDailypaySubscription:
      overrides && overrides.hasOwnProperty('createDailypaySubscription')
        ? overrides.createDailypaySubscription!
        : aCreateDailypaySubscriptionPayload(),
    createSSAComplaintTicket:
      overrides && overrides.hasOwnProperty('createSSAComplaintTicket')
        ? overrides.createSSAComplaintTicket!
        : aCreateSsaComplaintTicketPayload(),
    createScheduledPayment:
      overrides && overrides.hasOwnProperty('createScheduledPayment')
        ? overrides.createScheduledPayment!
        : aCreateScheduledPaymentPayload(),
    createStash: overrides && overrides.hasOwnProperty('createStash') ? overrides.createStash! : false,
    createSuperConsolidation:
      overrides && overrides.hasOwnProperty('createSuperConsolidation')
        ? overrides.createSuperConsolidation!
        : aCreateSuperConsolidationPayload(),
    createSuperConsolidationRequestSupport:
      overrides && overrides.hasOwnProperty('createSuperConsolidationRequestSupport')
        ? overrides.createSuperConsolidationRequestSupport!
        : aCreateSuperConsolidationRequestSupportPayload(),
    createSwagSuperfund:
      overrides && overrides.hasOwnProperty('createSwagSuperfund')
        ? overrides.createSwagSuperfund!
        : aCreateSwagSuperfundPayload(),
    createUKCard:
      overrides && overrides.hasOwnProperty('createUKCard') ? overrides.createUKCard! : aCreateUkCardPayload(),
    dailypay: overrides && overrides.hasOwnProperty('dailypay') ? overrides.dailypay! : aDailypayMutation(),
    depositToStash: overrides && overrides.hasOwnProperty('depositToStash') ? overrides.depositToStash! : true,
    empty: overrides && overrides.hasOwnProperty('empty') ? overrides.empty! : 'dolores',
    ewaPushNotification:
      overrides && overrides.hasOwnProperty('ewaPushNotification')
        ? overrides.ewaPushNotification!
        : anEwaPushNotificationMutation(),
    experiment: overrides && overrides.hasOwnProperty('experiment') ? overrides.experiment! : anExperimentMutation(),
    floatAccount:
      overrides && overrides.hasOwnProperty('floatAccount') ? overrides.floatAccount! : aFloatAccountMutation(),
    group: overrides && overrides.hasOwnProperty('group') ? overrides.group! : aGroupMutation(),
    heroPoints: overrides && overrides.hasOwnProperty('heroPoints') ? overrides.heroPoints! : aHeroPointsMutation(),
    initiateAUWallet:
      overrides && overrides.hasOwnProperty('initiateAUWallet')
        ? overrides.initiateAUWallet!
        : aMutationSuccessPayload(),
    instapay: overrides && overrides.hasOwnProperty('instapay') ? overrides.instapay! : anInstapayMutation(),
    lifecycle: overrides && overrides.hasOwnProperty('lifecycle') ? overrides.lifecycle! : aLifecycleMutation(),
    payment: overrides && overrides.hasOwnProperty('payment') ? overrides.payment! : aPaymentMutation(),
    recurringByDay:
      overrides && overrides.hasOwnProperty('recurringByDay') ? overrides.recurringByDay! : aRecurringByDayMutation(),
    removePayeeAddress:
      overrides && overrides.hasOwnProperty('removePayeeAddress')
        ? overrides.removePayeeAddress!
        : aMutationSuccessPayload(),
    saveAUWalletSetup:
      overrides && overrides.hasOwnProperty('saveAUWalletSetup')
        ? overrides.saveAUWalletSetup!
        : aSaveAuWalletSetupPayload(),
    savePaySplit:
      overrides && overrides.hasOwnProperty('savePaySplit') ? overrides.savePaySplit! : aMutationSuccessPayload(),
    savePayeeAddress:
      overrides && overrides.hasOwnProperty('savePayeeAddress')
        ? overrides.savePayeeAddress!
        : aMutationSuccessPayload(),
    seenSSACarousel:
      overrides && overrides.hasOwnProperty('seenSSACarousel') ? overrides.seenSSACarousel! : aMutationSuccessPayload(),
    sendUkFund: overrides && overrides.hasOwnProperty('sendUkFund') ? overrides.sendUkFund! : aSendUkFundPayload(),
    setStashMetadata: overrides && overrides.hasOwnProperty('setStashMetadata') ? overrides.setStashMetadata! : true,
    setUKPasscode:
      overrides && overrides.hasOwnProperty('setUKPasscode') ? overrides.setUKPasscode! : anUkTokenPayload(),
    startUKKYC: overrides && overrides.hasOwnProperty('startUKKYC') ? overrides.startUKKYC! : aStartUkkycPayload(),
    startUKWalletCreation:
      overrides && overrides.hasOwnProperty('startUKWalletCreation')
        ? overrides.startUKWalletCreation!
        : aStartUkWalletCreationPayload(),
    startValidateUkPhoneNumber:
      overrides && overrides.hasOwnProperty('startValidateUkPhoneNumber')
        ? overrides.startValidateUkPhoneNumber!
        : aMutationSuccessPayload(),
    stopContributionByContributionId:
      overrides && overrides.hasOwnProperty('stopContributionByContributionId')
        ? overrides.stopContributionByContributionId!
        : aStopSuperContributionPayload(),
    storeEvent: overrides && overrides.hasOwnProperty('storeEvent') ? overrides.storeEvent! : aMutationSuccessPayload(),
    submitSuperContribution:
      overrides && overrides.hasOwnProperty('submitSuperContribution')
        ? overrides.submitSuperContribution!
        : aSubmitSuperContributionPayload(),
    transferAUWalletFunds:
      overrides && overrides.hasOwnProperty('transferAUWalletFunds')
        ? overrides.transferAUWalletFunds!
        : aTransferAuWalletFundsPayload(),
    unblockUKCard:
      overrides && overrides.hasOwnProperty('unblockUKCard') ? overrides.unblockUKCard! : aMutationSuccessPayload(),
    unlinkUkDevice:
      overrides && overrides.hasOwnProperty('unlinkUkDevice') ? overrides.unlinkUkDevice! : aMutationSuccessPayload(),
    updateMySuperConsentStatus:
      overrides && overrides.hasOwnProperty('updateMySuperConsentStatus')
        ? overrides.updateMySuperConsentStatus!
        : anUpdateSuperConsentPayload(),
    updateWalletProfile:
      overrides && overrides.hasOwnProperty('updateWalletProfile')
        ? overrides.updateWalletProfile!
        : aMutationSuccessPayload(),
    user: overrides && overrides.hasOwnProperty('user') ? overrides.user! : aUserMutation(),
    verifyUkPhoneNumber:
      overrides && overrides.hasOwnProperty('verifyUkPhoneNumber')
        ? overrides.verifyUkPhoneNumber!
        : aMutationSuccessPayload(),
    withdrawFromStash:
      overrides && overrides.hasOwnProperty('withdrawFromStash') ? overrides.withdrawFromStash! : false,
  };
};

export const aMutationSuccessPayload = (overrides?: Partial<MutationSuccessPayload>): MutationSuccessPayload => {
  return {
    success: overrides && overrides.hasOwnProperty('success') ? overrides.success! : true,
  };
};

export const aNewBeneficiaryInput = (overrides?: Partial<NewBeneficiaryInput>): NewBeneficiaryInput => {
  return {
    info: overrides && overrides.hasOwnProperty('info') ? overrides.info! : aBeneficiaryInformation(),
    sortCode: overrides && overrides.hasOwnProperty('sortCode') ? overrides.sortCode! : aBankAccountSortCodeInput(),
    swagSpendAccount:
      overrides && overrides.hasOwnProperty('swagSpendAccount') ? overrides.swagSpendAccount! : aBankAccountSsaInput(),
  };
};

export const aNewBeneficiaryPayload = (overrides?: Partial<NewBeneficiaryPayload>): NewBeneficiaryPayload => {
  return {
    beneficiaryId: overrides && overrides.hasOwnProperty('beneficiaryId') ? overrides.beneficiaryId! : 'sit',
  };
};

export const aNoOrgPermissions = (overrides?: Partial<NoOrgPermissions>): NoOrgPermissions => {
  return {
    benefitsBillAhmPromoTile:
      overrides && overrides.hasOwnProperty('benefitsBillAhmPromoTile')
        ? overrides.benefitsBillAhmPromoTile!
        : aPermission(),
    benefitsBillMedibankPromoTile:
      overrides && overrides.hasOwnProperty('benefitsBillMedibankPromoTile')
        ? overrides.benefitsBillMedibankPromoTile!
        : aPermission(),
    benefitsBillStreaming:
      overrides && overrides.hasOwnProperty('benefitsBillStreaming') ? overrides.benefitsBillStreaming! : aPermission(),
    benefitsFitnessFirst:
      overrides && overrides.hasOwnProperty('benefitsFitnessFirst') ? overrides.benefitsFitnessFirst! : aPermission(),
    benefitsForceUpdate:
      overrides && overrides.hasOwnProperty('benefitsForceUpdate') ? overrides.benefitsForceUpdate! : aPermission(),
    benefitsGoodlifeFitness:
      overrides && overrides.hasOwnProperty('benefitsGoodlifeFitness')
        ? overrides.benefitsGoodlifeFitness!
        : aPermission(),
    benefitsIAv2: overrides && overrides.hasOwnProperty('benefitsIAv2') ? overrides.benefitsIAv2! : aPermission(),
    benefitsPillarHomepage:
      overrides && overrides.hasOwnProperty('benefitsPillarHomepage')
        ? overrides.benefitsPillarHomepage!
        : aPermission(),
    benefitsStoreAppUK:
      overrides && overrides.hasOwnProperty('benefitsStoreAppUK') ? overrides.benefitsStoreAppUK! : aPermission(),
    benefitsStripePaymentCheckout:
      overrides && overrides.hasOwnProperty('benefitsStripePaymentCheckout')
        ? overrides.benefitsStripePaymentCheckout!
        : aPermission(),
    benefitsXmas23Cashback:
      overrides && overrides.hasOwnProperty('benefitsXmas23Cashback')
        ? overrides.benefitsXmas23Cashback!
        : aPermission(),
    billStreamingWaitlist:
      overrides && overrides.hasOwnProperty('billStreamingWaitlist') ? overrides.billStreamingWaitlist! : aPermission(),
    cashbackDashboardV2:
      overrides && overrides.hasOwnProperty('cashbackDashboardV2') ? overrides.cashbackDashboardV2! : aPermission(),
    customFundAssetSwag:
      overrides && overrides.hasOwnProperty('customFundAssetSwag') ? overrides.customFundAssetSwag! : aPermission(),
    customSurveyInstapayExperiment:
      overrides && overrides.hasOwnProperty('customSurveyInstapayExperiment')
        ? overrides.customSurveyInstapayExperiment!
        : aPermission(),
    eBenMoneyScheduledPayment:
      overrides && overrides.hasOwnProperty('eBenMoneyScheduledPayment')
        ? overrides.eBenMoneyScheduledPayment!
        : aPermission(),
    eBenPayeeAddressBook:
      overrides && overrides.hasOwnProperty('eBenPayeeAddressBook') ? overrides.eBenPayeeAddressBook! : aPermission(),
    eBenSpendHeroDollarsOnSwagCard:
      overrides && overrides.hasOwnProperty('eBenSpendHeroDollarsOnSwagCard')
        ? overrides.eBenSpendHeroDollarsOnSwagCard!
        : aPermission(),
    eBenStash: overrides && overrides.hasOwnProperty('eBenStash') ? overrides.eBenStash! : aPermission(),
    eBenSwagInterestBearingAccountExperiment:
      overrides && overrides.hasOwnProperty('eBenSwagInterestBearingAccountExperiment')
        ? overrides.eBenSwagInterestBearingAccountExperiment!
        : aPermission(),
    eBenWhitelistedUkBenefits:
      overrides && overrides.hasOwnProperty('eBenWhitelistedUkBenefits')
        ? overrides.eBenWhitelistedUkBenefits!
        : aPermission(),
    eBenWhitelistedUkMoney:
      overrides && overrides.hasOwnProperty('eBenWhitelistedUkMoney')
        ? overrides.eBenWhitelistedUkMoney!
        : aPermission(),
    ebenApplePay: overrides && overrides.hasOwnProperty('ebenApplePay') ? overrides.ebenApplePay! : aPermission(),
    ebenCashbackStoreList:
      overrides && overrides.hasOwnProperty('ebenCashbackStoreList') ? overrides.ebenCashbackStoreList! : aPermission(),
    ebenDevHeroDollarPayment:
      overrides && overrides.hasOwnProperty('ebenDevHeroDollarPayment')
        ? overrides.ebenDevHeroDollarPayment!
        : aPermission(),
    ebenGooglePay: overrides && overrides.hasOwnProperty('ebenGooglePay') ? overrides.ebenGooglePay! : aPermission(),
    ebenInstapayNowSimplifiedExperiment:
      overrides && overrides.hasOwnProperty('ebenInstapayNowSimplifiedExperiment')
        ? overrides.ebenInstapayNowSimplifiedExperiment!
        : aPermission(),
    ebenServiceFee: overrides && overrides.hasOwnProperty('ebenServiceFee') ? overrides.ebenServiceFee! : aPermission(),
    ebenStoreBuyAgainCarousel:
      overrides && overrides.hasOwnProperty('ebenStoreBuyAgainCarousel')
        ? overrides.ebenStoreBuyAgainCarousel!
        : aPermission(),
    ebenStorePopularList:
      overrides && overrides.hasOwnProperty('ebenStorePopularList') ? overrides.ebenStorePopularList! : aPermission(),
    eben_benefits_pillar_black_list:
      overrides && overrides.hasOwnProperty('eben_benefits_pillar_black_list')
        ? overrides.eben_benefits_pillar_black_list!
        : aPermission(),
    eben_money_pillar_black_list:
      overrides && overrides.hasOwnProperty('eben_money_pillar_black_list')
        ? overrides.eben_money_pillar_black_list!
        : aPermission(),
    heroDollars: overrides && overrides.hasOwnProperty('heroDollars') ? overrides.heroDollars! : aPermission(),
    heroPoints: overrides && overrides.hasOwnProperty('heroPoints') ? overrides.heroPoints! : aPermission(),
    instapay: overrides && overrides.hasOwnProperty('instapay') ? overrides.instapay! : aPermission(),
    instapay2Alpha: overrides && overrides.hasOwnProperty('instapay2Alpha') ? overrides.instapay2Alpha! : aPermission(),
    internationalBenefitsRefused:
      overrides && overrides.hasOwnProperty('internationalBenefitsRefused')
        ? overrides.internationalBenefitsRefused!
        : aPermission(),
    payslipsExperimentBudgeting:
      overrides && overrides.hasOwnProperty('payslipsExperimentBudgeting')
        ? overrides.payslipsExperimentBudgeting!
        : aPermission(),
    payslipsExperimentInstapay:
      overrides && overrides.hasOwnProperty('payslipsExperimentInstapay')
        ? overrides.payslipsExperimentInstapay!
        : aPermission(),
    pillar_benefits:
      overrides && overrides.hasOwnProperty('pillar_benefits') ? overrides.pillar_benefits! : aPermission(),
    pillar_money: overrides && overrides.hasOwnProperty('pillar_money') ? overrides.pillar_money! : aPermission(),
    rostersInstapayExperiment:
      overrides && overrides.hasOwnProperty('rostersInstapayExperiment')
        ? overrides.rostersInstapayExperiment!
        : aPermission(),
    seOfferTiles: overrides && overrides.hasOwnProperty('seOfferTiles') ? overrides.seOfferTiles! : aPermission(),
    skipMegaDealsSurvey:
      overrides && overrides.hasOwnProperty('skipMegaDealsSurvey') ? overrides.skipMegaDealsSurvey! : aPermission(),
    superAppBenefits:
      overrides && overrides.hasOwnProperty('superAppBenefits') ? overrides.superAppBenefits! : aPermission(),
    superAppBenefitsFeaturedOffers:
      overrides && overrides.hasOwnProperty('superAppBenefitsFeaturedOffers')
        ? overrides.superAppBenefitsFeaturedOffers!
        : aPermission(),
    superAppCashback:
      overrides && overrides.hasOwnProperty('superAppCashback') ? overrides.superAppCashback! : aPermission(),
    superAppCashbackCategories:
      overrides && overrides.hasOwnProperty('superAppCashbackCategories')
        ? overrides.superAppCashbackCategories!
        : aPermission(),
    superAppHome: overrides && overrides.hasOwnProperty('superAppHome') ? overrides.superAppHome! : aPermission(),
    superAppInstoreOffer:
      overrides && overrides.hasOwnProperty('superAppInstoreOffer') ? overrides.superAppInstoreOffer! : aPermission(),
    superAppSettings:
      overrides && overrides.hasOwnProperty('superAppSettings') ? overrides.superAppSettings! : aPermission(),
    superAppWallet: overrides && overrides.hasOwnProperty('superAppWallet') ? overrides.superAppWallet! : aPermission(),
    superChoiceSwag:
      overrides && overrides.hasOwnProperty('superChoiceSwag') ? overrides.superChoiceSwag! : aPermission(),
    superConsentSwag:
      overrides && overrides.hasOwnProperty('superConsentSwag') ? overrides.superConsentSwag! : aPermission(),
    superConsolidation:
      overrides && overrides.hasOwnProperty('superConsolidation') ? overrides.superConsolidation! : aPermission(),
    superSalarySacrifice:
      overrides && overrides.hasOwnProperty('superSalarySacrifice') ? overrides.superSalarySacrifice! : aPermission(),
    timesheetsInstapayExperiment:
      overrides && overrides.hasOwnProperty('timesheetsInstapayExperiment')
        ? overrides.timesheetsInstapayExperiment!
        : aPermission(),
    toggleMegaDealsCommunitiesCtas:
      overrides && overrides.hasOwnProperty('toggleMegaDealsCommunitiesCtas')
        ? overrides.toggleMegaDealsCommunitiesCtas!
        : aPermission(),
    toggleMegaDealsMVPCta:
      overrides && overrides.hasOwnProperty('toggleMegaDealsMVPCta') ? overrides.toggleMegaDealsMVPCta! : aPermission(),
  };
};

export const anOemProvisioning = (overrides?: Partial<OemProvisioning>): OemProvisioning => {
  return {
    cardHolderName: overrides && overrides.hasOwnProperty('cardHolderName') ? overrides.cardHolderName! : 'quis',
    cardToken: overrides && overrides.hasOwnProperty('cardToken') ? overrides.cardToken! : 'dolorem',
    expiryDate: overrides && overrides.hasOwnProperty('expiryDate') ? overrides.expiryDate! : 'nemo',
    otp: overrides && overrides.hasOwnProperty('otp') ? overrides.otp! : 'hic',
  };
};

export const anOfferInput = (overrides?: Partial<OfferInput>): OfferInput => {
  return {
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'magnam',
  };
};

export const anOfferLocation = (overrides?: Partial<OfferLocation>): OfferLocation => {
  return {
    address: overrides && overrides.hasOwnProperty('address') ? overrides.address! : 'ex',
    latitude: overrides && overrides.hasOwnProperty('latitude') ? overrides.latitude! : 5.39,
    locationId: overrides && overrides.hasOwnProperty('locationId') ? overrides.locationId! : 'placeat',
    longitude: overrides && overrides.hasOwnProperty('longitude') ? overrides.longitude! : 9.78,
  };
};

export const anOnboardStatus = (overrides?: Partial<OnboardStatus>): OnboardStatus => {
  return {
    error: overrides && overrides.hasOwnProperty('error') ? overrides.error! : aGenericError(),
    hasCLOOnboarded: overrides && overrides.hasOwnProperty('hasCLOOnboarded') ? overrides.hasCLOOnboarded! : false,
  };
};

export const anOnboardUserPayload = (overrides?: Partial<OnboardUserPayload>): OnboardUserPayload => {
  return {
    error: overrides && overrides.hasOwnProperty('error') ? overrides.error! : aGenericError(),
    success: overrides && overrides.hasOwnProperty('success') ? overrides.success! : true,
  };
};

export const anOnlineOffer = (overrides?: Partial<OnlineOffer>): OnlineOffer => {
  return {
    about: overrides && overrides.hasOwnProperty('about') ? overrides.about! : 'iusto',
    advertiserAbout: overrides && overrides.hasOwnProperty('advertiserAbout') ? overrides.advertiserAbout! : 'autem',
    advertiserId: overrides && overrides.hasOwnProperty('advertiserId') ? overrides.advertiserId! : 'nemo',
    advertiserName: overrides && overrides.hasOwnProperty('advertiserName') ? overrides.advertiserName! : 'provident',
    cashback: overrides && overrides.hasOwnProperty('cashback') ? overrides.cashback! : 'numquam',
    categoryCode: overrides && overrides.hasOwnProperty('categoryCode') ? overrides.categoryCode! : 'nisi',
    createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : '1998-03-01T00:24:10.000Z',
    description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'labore',
    howItWorks: overrides && overrides.hasOwnProperty('howItWorks') ? overrides.howItWorks! : 'minima',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '2c426cf2-7eb9-44f6-b5bd-1f10ba8a5a83',
    imageUrl: overrides && overrides.hasOwnProperty('imageUrl') ? overrides.imageUrl! : 'eligendi',
    isCardLinkedOffer:
      overrides && overrides.hasOwnProperty('isCardLinkedOffer') ? overrides.isCardLinkedOffer! : false,
    logoUrl: overrides && overrides.hasOwnProperty('logoUrl') ? overrides.logoUrl! : 'odit',
    popularScore: overrides && overrides.hasOwnProperty('popularScore') ? overrides.popularScore! : 6379,
    title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'et',
    tnc: overrides && overrides.hasOwnProperty('tnc') ? overrides.tnc! : 'iste',
    trackingUrl: overrides && overrides.hasOwnProperty('trackingUrl') ? overrides.trackingUrl! : 'eveniet',
    type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : OfferType.Instore,
    updatedAt: overrides && overrides.hasOwnProperty('updatedAt') ? overrides.updatedAt! : '1973-10-02T17:05:26.000Z',
  };
};

export const anOnlineOfferEdge = (overrides?: Partial<OnlineOfferEdge>): OnlineOfferEdge => {
  return {
    node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : anOnlineOffer(),
  };
};

export const anOnlineOffers = (overrides?: Partial<OnlineOffers>): OnlineOffers => {
  return {
    edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [anOnlineOfferEdge()],
    error: overrides && overrides.hasOwnProperty('error') ? overrides.error! : aGenericError(),
    pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : aPageInfo(),
  };
};

export const anOnlineOffersInput = (overrides?: Partial<OnlineOffersInput>): OnlineOffersInput => {
  return {
    after: overrides && overrides.hasOwnProperty('after') ? overrides.after! : 'et',
    categoryCode: overrides && overrides.hasOwnProperty('categoryCode') ? overrides.categoryCode! : 'accusantium',
    first: overrides && overrides.hasOwnProperty('first') ? overrides.first! : 3457,
    query: overrides && overrides.hasOwnProperty('query') ? overrides.query! : 'quasi',
  };
};

export const anOptInEwaPushNotificationByFeatureInput = (
  overrides?: Partial<OptInEwaPushNotificationByFeatureInput>
): OptInEwaPushNotificationByFeatureInput => {
  return {
    feature:
      overrides && overrides.hasOwnProperty('feature')
        ? overrides.feature!
        : EwaPushNotificationFeature.EwaRecurringByAmount,
    orgId: overrides && overrides.hasOwnProperty('orgId') ? overrides.orgId! : 'unde',
  };
};

export const anOptInEwaPushNotificationByTypeInput = (
  overrides?: Partial<OptInEwaPushNotificationByTypeInput>
): OptInEwaPushNotificationByTypeInput => {
  return {
    orgId: overrides && overrides.hasOwnProperty('orgId') ? overrides.orgId! : 'qui',
    type:
      overrides && overrides.hasOwnProperty('type')
        ? overrides.type!
        : EwaPushNotificationType.RecurringByAmountSuccessfulPayment,
  };
};

export const anOptInOutEwaPushNotificationPayload = (
  overrides?: Partial<OptInOutEwaPushNotificationPayload>
): OptInOutEwaPushNotificationPayload => {
  return {
    success: overrides && overrides.hasOwnProperty('success') ? overrides.success! : false,
  };
};

export const anOptOutEwaPushNotificationByFeatureInput = (
  overrides?: Partial<OptOutEwaPushNotificationByFeatureInput>
): OptOutEwaPushNotificationByFeatureInput => {
  return {
    feature:
      overrides && overrides.hasOwnProperty('feature')
        ? overrides.feature!
        : EwaPushNotificationFeature.EwaRecurringByAmount,
    orgId: overrides && overrides.hasOwnProperty('orgId') ? overrides.orgId! : 'molestias',
  };
};

export const anOptOutEwaPushNotificationByTypeInput = (
  overrides?: Partial<OptOutEwaPushNotificationByTypeInput>
): OptOutEwaPushNotificationByTypeInput => {
  return {
    orgId: overrides && overrides.hasOwnProperty('orgId') ? overrides.orgId! : 'at',
    type:
      overrides && overrides.hasOwnProperty('type')
        ? overrides.type!
        : EwaPushNotificationType.RecurringByAmountSuccessfulPayment,
  };
};

export const anOrderDetails = (overrides?: Partial<OrderDetails>): OrderDetails => {
  return {
    billableAmount: overrides && overrides.hasOwnProperty('billableAmount') ? overrides.billableAmount! : 0.87,
    currency: overrides && overrides.hasOwnProperty('currency') ? overrides.currency! : 'atque',
    discount: overrides && overrides.hasOwnProperty('discount') ? overrides.discount! : 3.58,
    freightCost: overrides && overrides.hasOwnProperty('freightCost') ? overrides.freightCost! : 6.22,
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'rem',
    price: overrides && overrides.hasOwnProperty('price') ? overrides.price! : 9.92,
    productVariant:
      overrides && overrides.hasOwnProperty('productVariant') ? overrides.productVariant! : anOrderProductVariant(),
    purchaseItems:
      overrides && overrides.hasOwnProperty('purchaseItems') ? overrides.purchaseItems! : [anOrderPurchaseItem()],
    quantity: overrides && overrides.hasOwnProperty('quantity') ? overrides.quantity! : 3406,
    status: overrides && overrides.hasOwnProperty('status') ? overrides.status! : OrderStatus.CancelAccepted,
    transactionFee: overrides && overrides.hasOwnProperty('transactionFee') ? overrides.transactionFee! : 4.28,
  };
};

export const anOrderProduct = (overrides?: Partial<OrderProduct>): OrderProduct => {
  return {
    code: overrides && overrides.hasOwnProperty('code') ? overrides.code! : 'ab',
    description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'ut',
    email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'non',
    howItWorks: overrides && overrides.hasOwnProperty('howItWorks') ? overrides.howItWorks! : 'et',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'reprehenderit',
    imageUrl: overrides && overrides.hasOwnProperty('imageUrl') ? overrides.imageUrl! : 'quas',
    logoUrl: overrides && overrides.hasOwnProperty('logoUrl') ? overrides.logoUrl! : 'dolorem',
    name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'minus',
    productType:
      overrides && overrides.hasOwnProperty('productType') ? overrides.productType! : OrderProductType.Dropship,
    title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'iste',
  };
};

export const anOrderProductVariant = (overrides?: Partial<OrderProductVariant>): OrderProductVariant => {
  return {
    amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : 0.82,
    discountPrice: overrides && overrides.hasOwnProperty('discountPrice') ? overrides.discountPrice! : 9.38,
    imageUrl: overrides && overrides.hasOwnProperty('imageUrl') ? overrides.imageUrl! : 'delectus',
    price: overrides && overrides.hasOwnProperty('price') ? overrides.price! : 9.69,
    product: overrides && overrides.hasOwnProperty('product') ? overrides.product! : anOrderProduct(),
    variantCode: overrides && overrides.hasOwnProperty('variantCode') ? overrides.variantCode! : 'vitae',
  };
};

export const anOrderPurchaseItem = (overrides?: Partial<OrderPurchaseItem>): OrderPurchaseItem => {
  return {
    data: overrides && overrides.hasOwnProperty('data') ? overrides.data! : anOrderPurchaseItemData(),
    fulfil: overrides && overrides.hasOwnProperty('fulfil') ? overrides.fulfil! : anOrderPurchaseItemFulfil(),
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'voluptatem',
    productVariantId:
      overrides && overrides.hasOwnProperty('productVariantId') ? overrides.productVariantId! : 'veritatis',
    purchaseId: overrides && overrides.hasOwnProperty('purchaseId') ? overrides.purchaseId! : 'nihil',
  };
};

export const anOrderPurchaseItemData = (overrides?: Partial<OrderPurchaseItemData>): OrderPurchaseItemData => {
  return {
    activationUrl: overrides && overrides.hasOwnProperty('activationUrl') ? overrides.activationUrl! : 'ullam',
    barCode: overrides && overrides.hasOwnProperty('barCode') ? overrides.barCode! : 'unde',
    cardNumber: overrides && overrides.hasOwnProperty('cardNumber') ? overrides.cardNumber! : 'impedit',
    expiredAt: overrides && overrides.hasOwnProperty('expiredAt') ? overrides.expiredAt! : '1970-05-13T18:17:00.000Z',
    giftCode: overrides && overrides.hasOwnProperty('giftCode') ? overrides.giftCode! : 'odio',
    issuedAt: overrides && overrides.hasOwnProperty('issuedAt') ? overrides.issuedAt! : '1988-09-04T04:26:33.000Z',
    orderDetailId: overrides && overrides.hasOwnProperty('orderDetailId') ? overrides.orderDetailId! : 'ipsum',
    pinNumber: overrides && overrides.hasOwnProperty('pinNumber') ? overrides.pinNumber! : 'aut',
    promoCode: overrides && overrides.hasOwnProperty('promoCode') ? overrides.promoCode! : 'vitae',
    serialNumber: overrides && overrides.hasOwnProperty('serialNumber') ? overrides.serialNumber! : 'perspiciatis',
    uberGiftCode: overrides && overrides.hasOwnProperty('uberGiftCode') ? overrides.uberGiftCode! : 'cumque',
  };
};

export const anOrderPurchaseItemFulfil = (overrides?: Partial<OrderPurchaseItemFulfil>): OrderPurchaseItemFulfil => {
  return {
    balance: overrides && overrides.hasOwnProperty('balance') ? overrides.balance! : 3.35,
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'fugiat',
    isUsed: overrides && overrides.hasOwnProperty('isUsed') ? overrides.isUsed! : true,
  };
};

export const aPageInfo = (overrides?: Partial<PageInfo>): PageInfo => {
  return {
    endCursor: overrides && overrides.hasOwnProperty('endCursor') ? overrides.endCursor! : 'id',
    hasNextPage: overrides && overrides.hasOwnProperty('hasNextPage') ? overrides.hasNextPage! : true,
    totalCount: overrides && overrides.hasOwnProperty('totalCount') ? overrides.totalCount! : 9041,
    totalPages: overrides && overrides.hasOwnProperty('totalPages') ? overrides.totalPages! : 5391,
  };
};

export const aPayAccountAllocation = (overrides?: Partial<PayAccountAllocation>): PayAccountAllocation => {
  return {
    details: overrides && overrides.hasOwnProperty('details') ? overrides.details! : [aBankAccountDetails()],
    splitType: overrides && overrides.hasOwnProperty('splitType') ? overrides.splitType! : PaySplitType.FixedAmount,
  };
};

export const aPayAccountInput = (overrides?: Partial<PayAccountInput>): PayAccountInput => {
  return {
    accountName: overrides && overrides.hasOwnProperty('accountName') ? overrides.accountName! : 'sed',
    accountNumber: overrides && overrides.hasOwnProperty('accountNumber') ? overrides.accountNumber! : 'quia',
    accountType: overrides && overrides.hasOwnProperty('accountType') ? overrides.accountType! : 'at',
    amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : 'velit',
    bankBranchId: overrides && overrides.hasOwnProperty('bankBranchId') ? overrides.bankBranchId! : 6289,
    bankName: overrides && overrides.hasOwnProperty('bankName') ? overrides.bankName! : 'et',
    branchCode: overrides && overrides.hasOwnProperty('branchCode') ? overrides.branchCode! : 'aut',
    branchName: overrides && overrides.hasOwnProperty('branchName') ? overrides.branchName! : 'et',
    bsb: overrides && overrides.hasOwnProperty('bsb') ? overrides.bsb! : 'voluptatem',
    lockLevel: overrides && overrides.hasOwnProperty('lockLevel') ? overrides.lockLevel! : 'ad',
    rollNumber: overrides && overrides.hasOwnProperty('rollNumber') ? overrides.rollNumber! : 'autem',
  };
};

export const aPayAllocation = (overrides?: Partial<PayAllocation>): PayAllocation => {
  return {
    allocation: overrides && overrides.hasOwnProperty('allocation') ? overrides.allocation! : aPayAccountAllocation(),
    membership: overrides && overrides.hasOwnProperty('membership') ? overrides.membership! : anEhMembership(),
  };
};

export const aPayPeriod = (overrides?: Partial<PayPeriod>): PayPeriod => {
  return {
    ending: overrides && overrides.hasOwnProperty('ending') ? overrides.ending! : '1992-02-09T22:21:25.000Z',
    paymentDate:
      overrides && overrides.hasOwnProperty('paymentDate') ? overrides.paymentDate! : '2001-04-02T05:57:20.000Z',
    starting: overrides && overrides.hasOwnProperty('starting') ? overrides.starting! : '1981-07-08T06:59:33.000Z',
  };
};

export const aPaySplit = (overrides?: Partial<PaySplit>): PaySplit => {
  return {
    allocations: overrides && overrides.hasOwnProperty('allocations') ? overrides.allocations! : [aPayAllocation()],
    bankAccounts:
      overrides && overrides.hasOwnProperty('bankAccounts') ? overrides.bankAccounts! : aPayAccountAllocation(),
  };
};

export const aPaySplitInput = (overrides?: Partial<PaySplitInput>): PaySplitInput => {
  return {
    bankAccounts:
      overrides && overrides.hasOwnProperty('bankAccounts') ? overrides.bankAccounts! : [aPayAccountInput()],
    bankSplitType:
      overrides && overrides.hasOwnProperty('bankSplitType') ? overrides.bankSplitType! : PaySplitType.FixedAmount,
    memberId: overrides && overrides.hasOwnProperty('memberId') ? overrides.memberId! : 'quia',
    orgId: overrides && overrides.hasOwnProperty('orgId') ? overrides.orgId! : 'accusamus',
  };
};

export const aPaymentCardDetails = (overrides?: Partial<PaymentCardDetails>): PaymentCardDetails => {
  return {
    cardNumberToken:
      overrides && overrides.hasOwnProperty('cardNumberToken') ? overrides.cardNumberToken! : 'voluptatem',
    cvvToken: overrides && overrides.hasOwnProperty('cvvToken') ? overrides.cvvToken! : 'quia',
    expiryDate: overrides && overrides.hasOwnProperty('expiryDate') ? overrides.expiryDate! : 'quas',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '98f9e52d-b13c-400e-9c1c-74ee134f765e',
    isVirtual: overrides && overrides.hasOwnProperty('isVirtual') ? overrides.isVirtual! : false,
    issuedTimestamp:
      overrides && overrides.hasOwnProperty('issuedTimestamp')
        ? overrides.issuedTimestamp!
        : '1990-10-19T01:23:25.000Z',
    lastFourDigits: overrides && overrides.hasOwnProperty('lastFourDigits') ? overrides.lastFourDigits! : 'optio',
    nameOnCard: overrides && overrides.hasOwnProperty('nameOnCard') ? overrides.nameOnCard! : 'aut',
    status: overrides && overrides.hasOwnProperty('status') ? overrides.status! : PaymentCardStatus.Active,
  };
};

export const aPaymentClientTokenPayload = (
  overrides?: Partial<PaymentClientTokenPayload>
): PaymentClientTokenPayload => {
  return {
    clientToken: overrides && overrides.hasOwnProperty('clientToken') ? overrides.clientToken! : 'sit',
    error: overrides && overrides.hasOwnProperty('error') ? overrides.error! : aGenericError(),
  };
};

export const aPaymentMutation = (overrides?: Partial<PaymentMutation>): PaymentMutation => {
  return {
    createStripeClientToken:
      overrides && overrides.hasOwnProperty('createStripeClientToken')
        ? overrides.createStripeClientToken!
        : aPaymentClientTokenPayload(),
    makeStripePayment:
      overrides && overrides.hasOwnProperty('makeStripePayment')
        ? overrides.makeStripePayment!
        : aMakeStripePaymentPayload(),
  };
};

export const aPaymentTransaction = (overrides?: Partial<PaymentTransaction>): PaymentTransaction => {
  return {
    amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : aCurrencyAmount(),
    createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : '2001-11-01T13:40:13.000Z',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'sit',
    paymentDate: overrides && overrides.hasOwnProperty('paymentDate') ? overrides.paymentDate! : '1972-03-23',
    paymentMethod:
      overrides && overrides.hasOwnProperty('paymentMethod')
        ? overrides.paymentMethod!
        : PaymentMethod.DirectToProvider,
    paymentType: overrides && overrides.hasOwnProperty('paymentType') ? overrides.paymentType! : PaymentType.Mastercard,
    transactionDate:
      overrides && overrides.hasOwnProperty('transactionDate') ? overrides.transactionDate! : '1991-09-07',
    type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : TxnType.Bill,
  };
};

export const aPermission = (overrides?: Partial<Permission>): Permission => {
  return {
    view: overrides && overrides.hasOwnProperty('view') ? overrides.view! : false,
  };
};

export const aPersistentNotification = (overrides?: Partial<PersistentNotification>): PersistentNotification => {
  return {
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '58302a5d-f125-451a-a40f-7e97008a0809',
    notificationStatus:
      overrides && overrides.hasOwnProperty('notificationStatus')
        ? overrides.notificationStatus!
        : NotificationStatus.Active,
    type:
      overrides && overrides.hasOwnProperty('type') ? overrides.type! : WalletNotificationType.ApplePayReminder_24Hrs,
  };
};

export const aPersonalName = (overrides?: Partial<PersonalName>): PersonalName => {
  return {
    firstName: overrides && overrides.hasOwnProperty('firstName') ? overrides.firstName! : 'ipsum',
    lastName: overrides && overrides.hasOwnProperty('lastName') ? overrides.lastName! : 'ipsum',
    middleName: overrides && overrides.hasOwnProperty('middleName') ? overrides.middleName! : 'fugit',
  };
};

export const aPersonalNameInput = (overrides?: Partial<PersonalNameInput>): PersonalNameInput => {
  return {
    firstName: overrides && overrides.hasOwnProperty('firstName') ? overrides.firstName! : 'consequatur',
    lastName: overrides && overrides.hasOwnProperty('lastName') ? overrides.lastName! : 'animi',
    middleName: overrides && overrides.hasOwnProperty('middleName') ? overrides.middleName! : 'ut',
  };
};

export const aPhoneNumber = (overrides?: Partial<PhoneNumber>): PhoneNumber => {
  return {
    countryCode: overrides && overrides.hasOwnProperty('countryCode') ? overrides.countryCode! : 'quis',
    number: overrides && overrides.hasOwnProperty('number') ? overrides.number! : 'consequatur',
  };
};

export const aPhoneNumberInput = (overrides?: Partial<PhoneNumberInput>): PhoneNumberInput => {
  return {
    countryCode: overrides && overrides.hasOwnProperty('countryCode') ? overrides.countryCode! : 'non',
    number: overrides && overrides.hasOwnProperty('number') ? overrides.number! : 'nemo',
  };
};

export const aProduct = (overrides?: Partial<Product>): Product => {
  return {
    country: overrides && overrides.hasOwnProperty('country') ? overrides.country! : 'eveniet',
    currency: overrides && overrides.hasOwnProperty('currency') ? overrides.currency! : 'quaerat',
    description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'qui',
    discountPrice: overrides && overrides.hasOwnProperty('discountPrice') ? overrides.discountPrice! : 8.81,
    discountPriceInPoints:
      overrides && overrides.hasOwnProperty('discountPriceInPoints') ? overrides.discountPriceInPoints! : 8646,
    giftpayBalance: overrides && overrides.hasOwnProperty('giftpayBalance') ? overrides.giftpayBalance! : 2.31,
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'provident',
    image: overrides && overrides.hasOwnProperty('image') ? overrides.image! : aShopImage(),
    name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'nihil',
    price: overrides && overrides.hasOwnProperty('price') ? overrides.price! : 5.01,
    priceInPoints: overrides && overrides.hasOwnProperty('priceInPoints') ? overrides.priceInPoints! : 6215,
    productCode: overrides && overrides.hasOwnProperty('productCode') ? overrides.productCode! : 'odit',
    productType: overrides && overrides.hasOwnProperty('productType') ? overrides.productType! : 'nesciunt',
    serviceFee: overrides && overrides.hasOwnProperty('serviceFee') ? overrides.serviceFee! : 6.81,
    storefrontImage:
      overrides && overrides.hasOwnProperty('storefrontImage') ? overrides.storefrontImage! : aShopImage(),
    termsAndConditions:
      overrides && overrides.hasOwnProperty('termsAndConditions') ? overrides.termsAndConditions! : 'odit',
    title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'vero',
    type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : 'nulla',
  };
};

export const aProfileChangeRequest = (overrides?: Partial<ProfileChangeRequest>): ProfileChangeRequest => {
  return {
    createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : 'maiores',
    dateOfBirth: overrides && overrides.hasOwnProperty('dateOfBirth') ? overrides.dateOfBirth! : 'deleniti',
    name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : aPersonalName(),
    type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : UserDetailChangeRequestType.DateOfBirth,
  };
};

export const aProfileChangeRequestPayload = (
  overrides?: Partial<ProfileChangeRequestPayload>
): ProfileChangeRequestPayload => {
  return {
    error: overrides && overrides.hasOwnProperty('error') ? overrides.error! : aGenericError(),
    requests: overrides && overrides.hasOwnProperty('requests') ? overrides.requests! : [aProfileChangeRequest()],
  };
};

export const aPromotion = (overrides?: Partial<Promotion>): Promotion => {
  return {
    cardSubTitle: overrides && overrides.hasOwnProperty('cardSubTitle') ? overrides.cardSubTitle! : 'nihil',
    cardTitle: overrides && overrides.hasOwnProperty('cardTitle') ? overrides.cardTitle! : 'aut',
    descriptionBtsContent:
      overrides && overrides.hasOwnProperty('descriptionBtsContent') ? overrides.descriptionBtsContent! : 'cupiditate',
    descriptionBtsTitle:
      overrides && overrides.hasOwnProperty('descriptionBtsTitle') ? overrides.descriptionBtsTitle! : 'et',
    homeSubTitle: overrides && overrides.hasOwnProperty('homeSubTitle') ? overrides.homeSubTitle! : 'quia',
    homeTitle: overrides && overrides.hasOwnProperty('homeTitle') ? overrides.homeTitle! : 'quis',
    offerSubTitle: overrides && overrides.hasOwnProperty('offerSubTitle') ? overrides.offerSubTitle! : 'beatae',
    offerTitle: overrides && overrides.hasOwnProperty('offerTitle') ? overrides.offerTitle! : 'consequatur',
    searchCardTitle: overrides && overrides.hasOwnProperty('searchCardTitle') ? overrides.searchCardTitle! : 'ab',
    signedUpBillStatusContent:
      overrides && overrides.hasOwnProperty('signedUpBillStatusContent')
        ? overrides.signedUpBillStatusContent!
        : 'tempore',
    signedUpCardSubTitle:
      overrides && overrides.hasOwnProperty('signedUpCardSubTitle') ? overrides.signedUpCardSubTitle! : 'ea',
    signedUpCardTitle:
      overrides && overrides.hasOwnProperty('signedUpCardTitle') ? overrides.signedUpCardTitle! : 'autem',
    tagContent: overrides && overrides.hasOwnProperty('tagContent') ? overrides.tagContent! : 'et',
    termsAndConditions:
      overrides && overrides.hasOwnProperty('termsAndConditions') ? overrides.termsAndConditions! : 'dolores',
  };
};

export const aProvider = (overrides?: Partial<Provider>): Provider => {
  return {
    contactInfo: overrides && overrides.hasOwnProperty('contactInfo') ? overrides.contactInfo! : 'autem',
    faq: overrides && overrides.hasOwnProperty('faq') ? overrides.faq! : 'culpa',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : Pid.Ahm,
    logoUrl: overrides && overrides.hasOwnProperty('logoUrl') ? overrides.logoUrl! : 'eos',
    name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'incidunt',
    paymentUrl: overrides && overrides.hasOwnProperty('paymentUrl') ? overrides.paymentUrl! : 'et',
  };
};

export const aProviderEdge = (overrides?: Partial<ProviderEdge>): ProviderEdge => {
  return {
    node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : aProvider(),
  };
};

export const aProviders = (overrides?: Partial<Providers>): Providers => {
  return {
    edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [aProviderEdge()],
    pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : aPageInfo(),
  };
};

export const aProvidersInput = (overrides?: Partial<ProvidersInput>): ProvidersInput => {
  return {
    after: overrides && overrides.hasOwnProperty('after') ? overrides.after! : 'et',
    first: overrides && overrides.hasOwnProperty('first') ? overrides.first! : 1489,
  };
};

export const aPublishableKey = (overrides?: Partial<PublishableKey>): PublishableKey => {
  return {
    error: overrides && overrides.hasOwnProperty('error') ? overrides.error! : aGenericError(),
    publishableKey: overrides && overrides.hasOwnProperty('publishableKey') ? overrides.publishableKey! : 'minus',
  };
};

export const aQuery = (overrides?: Partial<Query>): Query => {
  return {
    getLocationByPlaceId:
      overrides && overrides.hasOwnProperty('getLocationByPlaceId')
        ? overrides.getLocationByPlaceId!
        : aGetLocationByPlaceIdResponse(),
    getLocations:
      overrides && overrides.hasOwnProperty('getLocations') ? overrides.getLocations! : aGetLocationsResponse(),
    group: overrides && overrides.hasOwnProperty('group') ? overrides.group! : aGroupRoot(),
    me: overrides && overrides.hasOwnProperty('me') ? overrides.me! : aUser(),
    superfundFeatureFlag:
      overrides && overrides.hasOwnProperty('superfundFeatureFlag')
        ? overrides.superfundFeatureFlag!
        : aSuperfundFeatureFlag(),
    superfundMetadata:
      overrides && overrides.hasOwnProperty('superfundMetadata') ? overrides.superfundMetadata! : aSuperfundMetadata(),
  };
};

export const aRecurringByAmountEligibilityResult = (
  overrides?: Partial<RecurringByAmountEligibilityResult>
): RecurringByAmountEligibilityResult => {
  return {
    errorCode:
      overrides && overrides.hasOwnProperty('errorCode')
        ? overrides.errorCode!
        : InstapayErrorCode.ActiveSubscriptionExist,
    isEligible: overrides && overrides.hasOwnProperty('isEligible') ? overrides.isEligible! : false,
  };
};

export const aRecurringByDay = (overrides?: Partial<RecurringByDay>): RecurringByDay => {
  return {
    currentSubscription:
      overrides && overrides.hasOwnProperty('currentSubscription') ? overrides.currentSubscription! : anInstapayError(),
    preview: overrides && overrides.hasOwnProperty('preview') ? overrides.preview! : anInstapayError(),
  };
};

export const aRecurringByDayEstimatedBalance = (
  overrides?: Partial<RecurringByDayEstimatedBalance>
): RecurringByDayEstimatedBalance => {
  return {
    amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : aMoneyV2(),
    date: overrides && overrides.hasOwnProperty('date') ? overrides.date! : '2012-02-29T02:14:17.000Z',
  };
};

export const aRecurringByDayMutation = (overrides?: Partial<RecurringByDayMutation>): RecurringByDayMutation => {
  return {
    cancelRecurringByDay:
      overrides && overrides.hasOwnProperty('cancelRecurringByDay')
        ? overrides.cancelRecurringByDay!
        : aCancelRecurringByDayPayload(),
    subscribeRecurringByDay:
      overrides && overrides.hasOwnProperty('subscribeRecurringByDay')
        ? overrides.subscribeRecurringByDay!
        : anInstapayError(),
    updateRecurringByDay:
      overrides && overrides.hasOwnProperty('updateRecurringByDay')
        ? overrides.updateRecurringByDay!
        : anInstapayError(),
  };
};

export const aRecurringByDayPayCycleEstBalance = (
  overrides?: Partial<RecurringByDayPayCycleEstBalance>
): RecurringByDayPayCycleEstBalance => {
  return {
    amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : aMoneyV2(),
    payCycle: overrides && overrides.hasOwnProperty('payCycle') ? overrides.payCycle! : PayCycle.Fortnightly,
  };
};

export const aRecurringByDayPreview = (overrides?: Partial<RecurringByDayPreview>): RecurringByDayPreview => {
  return {
    estimatedBalances:
      overrides && overrides.hasOwnProperty('estimatedBalances')
        ? overrides.estimatedBalances!
        : [aRecurringByDayEstimatedBalance()],
    memberPayCycle:
      overrides && overrides.hasOwnProperty('memberPayCycle')
        ? overrides.memberPayCycle!
        : RecurringByDayPayCycle.RecurringByDayFortnightly,
    memberPayCycleV2:
      overrides && overrides.hasOwnProperty('memberPayCycleV2') ? overrides.memberPayCycleV2! : PayCycle.Fortnightly,
    payCycleEstBalances:
      overrides && overrides.hasOwnProperty('payCycleEstBalances')
        ? overrides.payCycleEstBalances!
        : [aRecurringByDayPayCycleEstBalance()],
    payPeriod: overrides && overrides.hasOwnProperty('payPeriod') ? overrides.payPeriod! : aPayPeriod(),
    supportedPayCycles:
      overrides && overrides.hasOwnProperty('supportedPayCycles')
        ? overrides.supportedPayCycles!
        : [RecurringByDayPayCycle.RecurringByDayFortnightly],
  };
};

export const aRecurringByDaySubscription = (
  overrides?: Partial<RecurringByDaySubscription>
): RecurringByDaySubscription => {
  return {
    bankAccountExternalId:
      overrides && overrides.hasOwnProperty('bankAccountExternalId') ? overrides.bankAccountExternalId! : 'expedita',
    firstPaymentDate:
      overrides && overrides.hasOwnProperty('firstPaymentDate')
        ? overrides.firstPaymentDate!
        : '1972-03-31T22:18:36.000Z',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'enim',
    maxPayAmount: overrides && overrides.hasOwnProperty('maxPayAmount') ? overrides.maxPayAmount! : 2157,
    maximumPayAmount:
      overrides && overrides.hasOwnProperty('maximumPayAmount') ? overrides.maximumPayAmount! : aMoneyV2(),
    minPayAmount: overrides && overrides.hasOwnProperty('minPayAmount') ? overrides.minPayAmount! : 1428,
    minimumPayAmount:
      overrides && overrides.hasOwnProperty('minimumPayAmount') ? overrides.minimumPayAmount! : aMoneyV2(),
    payCycle:
      overrides && overrides.hasOwnProperty('payCycle')
        ? overrides.payCycle!
        : RecurringByDayPayCycle.RecurringByDayFortnightly,
    payDay: overrides && overrides.hasOwnProperty('payDay') ? overrides.payDay! : Weekday.Friday,
    status: overrides && overrides.hasOwnProperty('status') ? overrides.status! : RecurringSubscriptionStatus.Active,
  };
};

export const aRecurringByDayVisibility = (overrides?: Partial<RecurringByDayVisibility>): RecurringByDayVisibility => {
  return {
    showRecurringByDay:
      overrides && overrides.hasOwnProperty('showRecurringByDay') ? overrides.showRecurringByDay! : true,
  };
};

export const aReminder = (overrides?: Partial<Reminder>): Reminder => {
  return {
    reminderDescription:
      overrides && overrides.hasOwnProperty('reminderDescription') ? overrides.reminderDescription! : 'et',
    reminderTextCopy: overrides && overrides.hasOwnProperty('reminderTextCopy') ? overrides.reminderTextCopy! : 'sit',
  };
};

export const aRemovePayeeAddressInput = (overrides?: Partial<RemovePayeeAddressInput>): RemovePayeeAddressInput => {
  return {
    address: overrides && overrides.hasOwnProperty('address') ? overrides.address! : aRemovePayeeAddressItem(),
  };
};

export const aRemovePayeeAddressItem = (overrides?: Partial<RemovePayeeAddressItem>): RemovePayeeAddressItem => {
  return {
    accountNumber: overrides && overrides.hasOwnProperty('accountNumber') ? overrides.accountNumber! : 'illum',
    bsb: overrides && overrides.hasOwnProperty('bsb') ? overrides.bsb! : 'vel',
  };
};

export const aRequestNewCardInput = (overrides?: Partial<RequestNewCardInput>): RequestNewCardInput => {
  return {
    address: overrides && overrides.hasOwnProperty('address') ? overrides.address! : aCommonAddressInput(),
  };
};

export const anSsAllOffersInput = (overrides?: Partial<SsAllOffersInput>): SsAllOffersInput => {
  return {
    after: overrides && overrides.hasOwnProperty('after') ? overrides.after! : 'rerum',
    categoryCode: overrides && overrides.hasOwnProperty('categoryCode') ? overrides.categoryCode! : 'aspernatur',
    first: overrides && overrides.hasOwnProperty('first') ? overrides.first! : 4483,
    orgId: overrides && overrides.hasOwnProperty('orgId') ? overrides.orgId! : 'maiores',
    query: overrides && overrides.hasOwnProperty('query') ? overrides.query! : 'magnam',
  };
};

export const anSsBuyAgainGiftCardsInput = (overrides?: Partial<SsBuyAgainGiftCardsInput>): SsBuyAgainGiftCardsInput => {
  return {
    after: overrides && overrides.hasOwnProperty('after') ? overrides.after! : 'culpa',
    first: overrides && overrides.hasOwnProperty('first') ? overrides.first! : 3344,
    orgId: overrides && overrides.hasOwnProperty('orgId') ? overrides.orgId! : 'non',
  };
};

export const aSaveAuWalletSetupInput = (overrides?: Partial<SaveAuWalletSetupInput>): SaveAuWalletSetupInput => {
  return {
    dateOfBirth: overrides && overrides.hasOwnProperty('dateOfBirth') ? overrides.dateOfBirth! : 'ut',
    firstName: overrides && overrides.hasOwnProperty('firstName') ? overrides.firstName! : 'quo',
    gender: overrides && overrides.hasOwnProperty('gender') ? overrides.gender! : 'nihil',
    hasConsentedIdentityVerificationTerms:
      overrides && overrides.hasOwnProperty('hasConsentedIdentityVerificationTerms')
        ? overrides.hasConsentedIdentityVerificationTerms!
        : true,
    hasConsentedPrivacyPolicy:
      overrides && overrides.hasOwnProperty('hasConsentedPrivacyPolicy') ? overrides.hasConsentedPrivacyPolicy! : true,
    hasConsentedTermsConditions:
      overrides && overrides.hasOwnProperty('hasConsentedTermsConditions')
        ? overrides.hasConsentedTermsConditions!
        : false,
    identityCardNumber:
      overrides && overrides.hasOwnProperty('identityCardNumber') ? overrides.identityCardNumber! : 'facere',
    identityDocumentIssuingState:
      overrides && overrides.hasOwnProperty('identityDocumentIssuingState')
        ? overrides.identityDocumentIssuingState!
        : 'deserunt',
    identityDocumentNumber:
      overrides && overrides.hasOwnProperty('identityDocumentNumber') ? overrides.identityDocumentNumber! : 'sit',
    identityDocumentType:
      overrides && overrides.hasOwnProperty('identityDocumentType')
        ? overrides.identityDocumentType!
        : IdentityDocumentType.DrivingLicense,
    identityVerificationTermsConsentTimestamp:
      overrides && overrides.hasOwnProperty('identityVerificationTermsConsentTimestamp')
        ? overrides.identityVerificationTermsConsentTimestamp!
        : '1998-05-22T13:47:43.000Z',
    lastName: overrides && overrides.hasOwnProperty('lastName') ? overrides.lastName! : 'consequatur',
    mailingAddress:
      overrides && overrides.hasOwnProperty('mailingAddress') ? overrides.mailingAddress! : aCommonAddressInput(),
    middleName: overrides && overrides.hasOwnProperty('middleName') ? overrides.middleName! : 'recusandae',
    phoneNumber: overrides && overrides.hasOwnProperty('phoneNumber') ? overrides.phoneNumber! : aPhoneNumberInput(),
    privacyPolicyConsentTimestamp:
      overrides && overrides.hasOwnProperty('privacyPolicyConsentTimestamp')
        ? overrides.privacyPolicyConsentTimestamp!
        : '1972-11-05T11:22:28.000Z',
    residentialAddress:
      overrides && overrides.hasOwnProperty('residentialAddress')
        ? overrides.residentialAddress!
        : aCommonAddressInput(),
    taxObligations:
      overrides && overrides.hasOwnProperty('taxObligations') ? overrides.taxObligations! : [aTaxObligationInput()],
    termsConditionsConsentTimestamp:
      overrides && overrides.hasOwnProperty('termsConditionsConsentTimestamp')
        ? overrides.termsConditionsConsentTimestamp!
        : '1973-09-25T09:04:30.000Z',
  };
};

export const aSaveAuWalletSetupPayload = (overrides?: Partial<SaveAuWalletSetupPayload>): SaveAuWalletSetupPayload => {
  return {
    idvToken: overrides && overrides.hasOwnProperty('idvToken') ? overrides.idvToken! : 'quisquam',
  };
};

export const aSavePayeeAddressInput = (overrides?: Partial<SavePayeeAddressInput>): SavePayeeAddressInput => {
  return {
    address: overrides && overrides.hasOwnProperty('address') ? overrides.address! : anAuPayeeAddress(),
  };
};

export const aScheduledPayment = (overrides?: Partial<ScheduledPayment>): ScheduledPayment => {
  return {
    amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : aMoney(),
    createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : '1981-11-24T23:39:11.000Z',
    description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'eum',
    endDate: overrides && overrides.hasOwnProperty('endDate') ? overrides.endDate! : '1983-08-26',
    externalId:
      overrides && overrides.hasOwnProperty('externalId')
        ? overrides.externalId!
        : '877645c5-d0f5-4d2d-ae32-75606a032b81',
    frequency:
      overrides && overrides.hasOwnProperty('frequency') ? overrides.frequency! : ScheduledPaymentFrequency.Fortnightly,
    numberOfPayments: overrides && overrides.hasOwnProperty('numberOfPayments') ? overrides.numberOfPayments! : 3993,
    processedPayments: overrides && overrides.hasOwnProperty('processedPayments') ? overrides.processedPayments! : 5123,
    recipient: overrides && overrides.hasOwnProperty('recipient') ? overrides.recipient! : anAuPaymentRecipient(),
    startDate: overrides && overrides.hasOwnProperty('startDate') ? overrides.startDate! : '2006-05-06',
    type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : ScheduledPaymentType.OneTime,
  };
};

export const aScheduledPaymentSaveResponseDetails = (
  overrides?: Partial<ScheduledPaymentSaveResponseDetails>
): ScheduledPaymentSaveResponseDetails => {
  return {
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '04544e1a-47ed-4ed6-96c0-8f48048fc11e',
    status: overrides && overrides.hasOwnProperty('status') ? overrides.status! : ScheduledPaymentStatus.Active,
  };
};

export const aSchedulingSubscription = (overrides?: Partial<SchedulingSubscription>): SchedulingSubscription => {
  return {
    amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : aMoneyV2(),
    bankAccountExternalId:
      overrides && overrides.hasOwnProperty('bankAccountExternalId') ? overrides.bankAccountExternalId! : 'ea',
    endDate: overrides && overrides.hasOwnProperty('endDate') ? overrides.endDate! : '2010-12-15T19:07:44.000Z',
    feePromotionApplied:
      overrides && overrides.hasOwnProperty('feePromotionApplied') ? overrides.feePromotionApplied! : false,
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'est',
    plan: overrides && overrides.hasOwnProperty('plan') ? overrides.plan! : SchedulingSubscriptionPlan.Frequently,
    startDate: overrides && overrides.hasOwnProperty('startDate') ? overrides.startDate! : '2012-08-29T14:37:06.000Z',
  };
};

export const aSchedulingSubscriptionResult = (
  overrides?: Partial<SchedulingSubscriptionResult>
): SchedulingSubscriptionResult => {
  return {
    success: overrides && overrides.hasOwnProperty('success') ? overrides.success! : true,
  };
};

export const aSendUkFundInput = (overrides?: Partial<SendUkFundInput>): SendUkFundInput => {
  return {
    amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : aMoneyInput(),
    description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'sequi',
    idempotencyKey: overrides && overrides.hasOwnProperty('idempotencyKey') ? overrides.idempotencyKey! : 'cum',
    recipient: overrides && overrides.hasOwnProperty('recipient') ? overrides.recipient! : aFastPaymentRecipientInput(),
  };
};

export const aSendUkFundPayload = (overrides?: Partial<SendUkFundPayload>): SendUkFundPayload => {
  return {
    externalTransactionId:
      overrides && overrides.hasOwnProperty('externalTransactionId') ? overrides.externalTransactionId! : 'ex',
    state: overrides && overrides.hasOwnProperty('state') ? overrides.state! : UkTransactionState.Approved,
  };
};

export const aSetStashMetadataInput = (overrides?: Partial<SetStashMetadataInput>): SetStashMetadataInput => {
  return {
    isMarketingCardFinished:
      overrides && overrides.hasOwnProperty('isMarketingCardFinished') ? overrides.isMarketingCardFinished! : false,
    isStashEntryButtonInSpendAccountHidden:
      overrides && overrides.hasOwnProperty('isStashEntryButtonInSpendAccountHidden')
        ? overrides.isStashEntryButtonInSpendAccountHidden!
        : true,
  };
};

export const aSetUkPasscodeInput = (overrides?: Partial<SetUkPasscodeInput>): SetUkPasscodeInput => {
  return {
    passcode: overrides && overrides.hasOwnProperty('passcode') ? overrides.passcode! : 'dolor',
  };
};

export const aSetupStatus = (overrides?: Partial<SetupStatus>): SetupStatus => {
  return {
    message: overrides && overrides.hasOwnProperty('message') ? overrides.message! : WalletStatusReason.Archived,
    status: overrides && overrides.hasOwnProperty('status') ? overrides.status! : WalletSetupStatus.Completed,
  };
};

export const aShopImage = (overrides?: Partial<ShopImage>): ShopImage => {
  return {
    large: overrides && overrides.hasOwnProperty('large') ? overrides.large! : aShopImageDetails(),
    product: overrides && overrides.hasOwnProperty('product') ? overrides.product! : aShopImageDetails(),
    small: overrides && overrides.hasOwnProperty('small') ? overrides.small! : aShopImageDetails(),
    url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : 'non',
  };
};

export const aShopImageDetails = (overrides?: Partial<ShopImageDetails>): ShopImageDetails => {
  return {
    url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : 'voluptatem',
  };
};

export const aShopProductDetails = (overrides?: Partial<ShopProductDetails>): ShopProductDetails => {
  return {
    country: overrides && overrides.hasOwnProperty('country') ? overrides.country! : 'neque',
    currency: overrides && overrides.hasOwnProperty('currency') ? overrides.currency! : 'quisquam',
    description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'vel',
    disabled: overrides && overrides.hasOwnProperty('disabled') ? overrides.disabled! : false,
    discountPrice: overrides && overrides.hasOwnProperty('discountPrice') ? overrides.discountPrice! : 8.72,
    discountPriceInPoints:
      overrides && overrides.hasOwnProperty('discountPriceInPoints') ? overrides.discountPriceInPoints! : 5665,
    email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'officiis',
    giftpayBalance: overrides && overrides.hasOwnProperty('giftpayBalance') ? overrides.giftpayBalance! : 1.9,
    heroDollarsFee: overrides && overrides.hasOwnProperty('heroDollarsFee') ? overrides.heroDollarsFee! : 4.52,
    howItWorks: overrides && overrides.hasOwnProperty('howItWorks') ? overrides.howItWorks! : 'cupiditate',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'deserunt',
    image: overrides && overrides.hasOwnProperty('image') ? overrides.image! : aShopImage(),
    instapayFee: overrides && overrides.hasOwnProperty('instapayFee') ? overrides.instapayFee! : 8.03,
    logo: overrides && overrides.hasOwnProperty('logo') ? overrides.logo! : aShopImage(),
    name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'doloribus',
    participant: overrides && overrides.hasOwnProperty('participant') ? overrides.participant! : 'dolores',
    price: overrides && overrides.hasOwnProperty('price') ? overrides.price! : 5.81,
    priceInPoints: overrides && overrides.hasOwnProperty('priceInPoints') ? overrides.priceInPoints! : 6933,
    productCategoryId:
      overrides && overrides.hasOwnProperty('productCategoryId') ? overrides.productCategoryId! : 'omnis',
    productCode: overrides && overrides.hasOwnProperty('productCode') ? overrides.productCode! : 'non',
    productType: overrides && overrides.hasOwnProperty('productType') ? overrides.productType! : 'dolorum',
    productVariants:
      overrides && overrides.hasOwnProperty('productVariants') ? overrides.productVariants! : [aShopProductVariant()],
    serviceFee: overrides && overrides.hasOwnProperty('serviceFee') ? overrides.serviceFee! : 8.21,
    storefrontImage:
      overrides && overrides.hasOwnProperty('storefrontImage') ? overrides.storefrontImage! : aShopImage(),
    supplier: overrides && overrides.hasOwnProperty('supplier') ? overrides.supplier! : aShopProductSupplier(),
    supplierId: overrides && overrides.hasOwnProperty('supplierId') ? overrides.supplierId! : 'modi',
    termsAndConditions:
      overrides && overrides.hasOwnProperty('termsAndConditions') ? overrides.termsAndConditions! : 'quia',
    title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'quis',
    transactionFee: overrides && overrides.hasOwnProperty('transactionFee') ? overrides.transactionFee! : 4.07,
    type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : 'earum',
    usage: overrides && overrides.hasOwnProperty('usage') ? overrides.usage! : 'impedit',
  };
};

export const aShopProductDetailsResponse = (
  overrides?: Partial<ShopProductDetailsResponse>
): ShopProductDetailsResponse => {
  return {
    error: overrides && overrides.hasOwnProperty('error') ? overrides.error! : aGenericError(),
    product: overrides && overrides.hasOwnProperty('product') ? overrides.product! : aShopProductDetails(),
  };
};

export const aShopProductSupplier = (overrides?: Partial<ShopProductSupplier>): ShopProductSupplier => {
  return {
    description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'dolorem',
    email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'doloremque',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'et',
    name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'quis',
    phoneNumber: overrides && overrides.hasOwnProperty('phoneNumber') ? overrides.phoneNumber! : 'dolor',
    website: overrides && overrides.hasOwnProperty('website') ? overrides.website! : 'dolores',
  };
};

export const aShopProductVariant = (overrides?: Partial<ShopProductVariant>): ShopProductVariant => {
  return {
    amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : 9.35,
    cardId: overrides && overrides.hasOwnProperty('cardId') ? overrides.cardId! : 'modi',
    description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'nihil',
    discountPrice: overrides && overrides.hasOwnProperty('discountPrice') ? overrides.discountPrice! : 5.19,
    discountPriceInPoints:
      overrides && overrides.hasOwnProperty('discountPriceInPoints') ? overrides.discountPriceInPoints! : 2076,
    freightPrice: overrides && overrides.hasOwnProperty('freightPrice') ? overrides.freightPrice! : 3.61,
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'delectus',
    imageUrl: overrides && overrides.hasOwnProperty('imageUrl') ? overrides.imageUrl! : 'fuga',
    label: overrides && overrides.hasOwnProperty('label') ? overrides.label! : 'enim',
    numberInStock: overrides && overrides.hasOwnProperty('numberInStock') ? overrides.numberInStock! : 6154,
    position: overrides && overrides.hasOwnProperty('position') ? overrides.position! : 1163,
    price: overrides && overrides.hasOwnProperty('price') ? overrides.price! : 7.93,
    priceInPoints: overrides && overrides.hasOwnProperty('priceInPoints') ? overrides.priceInPoints! : 1884,
    status: overrides && overrides.hasOwnProperty('status') ? overrides.status! : 'nostrum',
    stockAvailable: overrides && overrides.hasOwnProperty('stockAvailable') ? overrides.stockAvailable! : false,
    variantCode: overrides && overrides.hasOwnProperty('variantCode') ? overrides.variantCode! : 'consequatur',
  };
};

export const aStartUkkycPayload = (overrides?: Partial<StartUkkycPayload>): StartUkkycPayload => {
  return {
    reference: overrides && overrides.hasOwnProperty('reference') ? overrides.reference! : 'soluta',
  };
};

export const aStartUkWalletCreationInput = (
  overrides?: Partial<StartUkWalletCreationInput>
): StartUkWalletCreationInput => {
  return {
    dateOfBirth: overrides && overrides.hasOwnProperty('dateOfBirth') ? overrides.dateOfBirth! : 'laudantium',
    deviceIpAddress: overrides && overrides.hasOwnProperty('deviceIpAddress') ? overrides.deviceIpAddress! : 'quia',
    firstName: overrides && overrides.hasOwnProperty('firstName') ? overrides.firstName! : 'culpa',
    hasConsentedPrivacyPolicy:
      overrides && overrides.hasOwnProperty('hasConsentedPrivacyPolicy') ? overrides.hasConsentedPrivacyPolicy! : false,
    hasConsentedTermsConditions:
      overrides && overrides.hasOwnProperty('hasConsentedTermsConditions')
        ? overrides.hasConsentedTermsConditions!
        : false,
    lastName: overrides && overrides.hasOwnProperty('lastName') ? overrides.lastName! : 'possimus',
    middleName: overrides && overrides.hasOwnProperty('middleName') ? overrides.middleName! : 'inventore',
    phoneNumber: overrides && overrides.hasOwnProperty('phoneNumber') ? overrides.phoneNumber! : aPhoneNumberInput(),
    privacyPolicyConsentTimestamp:
      overrides && overrides.hasOwnProperty('privacyPolicyConsentTimestamp')
        ? overrides.privacyPolicyConsentTimestamp!
        : '1979-08-08T15:57:55.000Z',
    residentialAddress:
      overrides && overrides.hasOwnProperty('residentialAddress') ? overrides.residentialAddress! : anAddressInput(),
    termsConditionsConsentTimestamp:
      overrides && overrides.hasOwnProperty('termsConditionsConsentTimestamp')
        ? overrides.termsConditionsConsentTimestamp!
        : '2002-12-10T16:53:35.000Z',
  };
};

export const aStartUkWalletCreationPayload = (
  overrides?: Partial<StartUkWalletCreationPayload>
): StartUkWalletCreationPayload => {
  return {
    success: overrides && overrides.hasOwnProperty('success') ? overrides.success! : false,
    userToken: overrides && overrides.hasOwnProperty('userToken') ? overrides.userToken! : 'illo',
  };
};

export const aStash = (overrides?: Partial<Stash>): Stash => {
  return {
    items: overrides && overrides.hasOwnProperty('items') ? overrides.items! : [aStashItem()],
    metadata: overrides && overrides.hasOwnProperty('metadata') ? overrides.metadata! : aStashMetadata(),
    transactions:
      overrides && overrides.hasOwnProperty('transactions') ? overrides.transactions! : [aStashTransaction()],
  };
};

export const aStashItem = (overrides?: Partial<StashItem>): StashItem => {
  return {
    balance: overrides && overrides.hasOwnProperty('balance') ? overrides.balance! : aMoneyV2(),
    closedAtUtc:
      overrides && overrides.hasOwnProperty('closedAtUtc') ? overrides.closedAtUtc! : '2003-03-25T03:18:27.000Z',
    createdAtUtc:
      overrides && overrides.hasOwnProperty('createdAtUtc') ? overrides.createdAtUtc! : '1984-04-03T02:22:47.000Z',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '31be97c9-462f-425f-adfc-4366482598e0',
    imageUrl: overrides && overrides.hasOwnProperty('imageUrl') ? overrides.imageUrl! : 'ullam',
    name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'aut',
    status: overrides && overrides.hasOwnProperty('status') ? overrides.status! : StashStatus.Closed,
    targetAmount: overrides && overrides.hasOwnProperty('targetAmount') ? overrides.targetAmount! : aMoneyV2(),
  };
};

export const aStashMetadata = (overrides?: Partial<StashMetadata>): StashMetadata => {
  return {
    isMarketingCardFinished:
      overrides && overrides.hasOwnProperty('isMarketingCardFinished') ? overrides.isMarketingCardFinished! : false,
    isStashEntryButtonInSpendAccountHidden:
      overrides && overrides.hasOwnProperty('isStashEntryButtonInSpendAccountHidden')
        ? overrides.isStashEntryButtonInSpendAccountHidden!
        : true,
  };
};

export const aStashTransaction = (overrides?: Partial<StashTransaction>): StashTransaction => {
  return {
    amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : aMoneyV2(),
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '4f2d44b8-96a0-4598-ab17-7092e1d538aa',
    transactionTimeUtc:
      overrides && overrides.hasOwnProperty('transactionTimeUtc')
        ? overrides.transactionTimeUtc!
        : '2005-11-27T04:00:40.000Z',
  };
};

export const aStateBasedOffer = (overrides?: Partial<StateBasedOffer>): StateBasedOffer => {
  return {
    combinedDiscount: overrides && overrides.hasOwnProperty('combinedDiscount') ? overrides.combinedDiscount! : 6.81,
    offerExplaination:
      overrides && overrides.hasOwnProperty('offerExplaination') ? overrides.offerExplaination! : 'eos',
    offerExplanationCta:
      overrides && overrides.hasOwnProperty('offerExplanationCta') ? overrides.offerExplanationCta! : 'a',
    state: overrides && overrides.hasOwnProperty('state') ? overrides.state! : 'accusamus',
    tiles: overrides && overrides.hasOwnProperty('tiles') ? overrides.tiles! : [aStateBasedOfferTile()],
  };
};

export const aStateBasedOfferTile = (overrides?: Partial<StateBasedOfferTile>): StateBasedOfferTile => {
  return {
    content: overrides && overrides.hasOwnProperty('content') ? overrides.content! : 'consequatur',
    subContent: overrides && overrides.hasOwnProperty('subContent') ? overrides.subContent! : 'et',
  };
};

export const aStopSuperContributionPayload = (
  overrides?: Partial<StopSuperContributionPayload>
): StopSuperContributionPayload => {
  return {
    contribution:
      overrides && overrides.hasOwnProperty('contribution') ? overrides.contribution! : aSuperContribution(),
  };
};

export const aStoreEventInput = (overrides?: Partial<StoreEventInput>): StoreEventInput => {
  return {
    kind: overrides && overrides.hasOwnProperty('kind') ? overrides.kind! : EventLogKind.Instapay,
    payload: overrides && overrides.hasOwnProperty('payload') ? overrides.payload! : [anEventLogPayloadTuple()],
  };
};

export const aStripePublishableKeyInput = (
  overrides?: Partial<StripePublishableKeyInput>
): StripePublishableKeyInput => {
  return {
    currency: overrides && overrides.hasOwnProperty('currency') ? overrides.currency! : 'et',
    orgId: overrides && overrides.hasOwnProperty('orgId') ? overrides.orgId! : 'modi',
  };
};

export const aSubmitInstaPayDrawdownSurveyInput = (
  overrides?: Partial<SubmitInstaPayDrawdownSurveyInput>
): SubmitInstaPayDrawdownSurveyInput => {
  return {
    idealFreqs: overrides && overrides.hasOwnProperty('idealFreqs') ? overrides.idealFreqs! : ['numquam'],
    moreFeedback: overrides && overrides.hasOwnProperty('moreFeedback') ? overrides.moreFeedback! : false,
    usageReasonOtherDescription:
      overrides && overrides.hasOwnProperty('usageReasonOtherDescription')
        ? overrides.usageReasonOtherDescription!
        : 'vel',
    usageReasons: overrides && overrides.hasOwnProperty('usageReasons') ? overrides.usageReasons! : ['hic'],
  };
};

export const aSubmitInstaPayDrawdownSurveyPayload = (
  overrides?: Partial<SubmitInstaPayDrawdownSurveyPayload>
): SubmitInstaPayDrawdownSurveyPayload => {
  return {
    success: overrides && overrides.hasOwnProperty('success') ? overrides.success! : true,
  };
};

export const aSubmitSuperContributionInput = (
  overrides?: Partial<SubmitSuperContributionInput>
): SubmitSuperContributionInput => {
  return {
    acknowledgedNoContributionTracking:
      overrides && overrides.hasOwnProperty('acknowledgedNoContributionTracking')
        ? overrides.acknowledgedNoContributionTracking!
        : false,
    contributionType:
      overrides && overrides.hasOwnProperty('contributionType')
        ? overrides.contributionType!
        : SuperContributionType.Fixed,
    contributionValue: overrides && overrides.hasOwnProperty('contributionValue') ? overrides.contributionValue! : 9183,
    endDate: overrides && overrides.hasOwnProperty('endDate') ? overrides.endDate! : '2011-02-08T22:42:53.000Z',
    membershipId: overrides && overrides.hasOwnProperty('membershipId') ? overrides.membershipId! : 'voluptates',
    preserveAmount: overrides && overrides.hasOwnProperty('preserveAmount') ? overrides.preserveAmount! : 5002,
    startDate: overrides && overrides.hasOwnProperty('startDate') ? overrides.startDate! : '1984-07-02T19:02:13.000Z',
  };
};

export const aSubmitSuperContributionPayload = (
  overrides?: Partial<SubmitSuperContributionPayload>
): SubmitSuperContributionPayload => {
  return {
    contribution:
      overrides && overrides.hasOwnProperty('contribution') ? overrides.contribution! : aSuperContribution(),
  };
};

export const aSubscribePayload = (overrides?: Partial<SubscribePayload>): SubscribePayload => {
  return {
    subscribeID:
      overrides && overrides.hasOwnProperty('subscribeID')
        ? overrides.subscribeID!
        : '5e60acc0-0b10-4ae2-9977-d02764b3c8db',
  };
};

export const aSubscribeRecurringByDayInput = (
  overrides?: Partial<SubscribeRecurringByDayInput>
): SubscribeRecurringByDayInput => {
  return {
    bankAccountExternalId:
      overrides && overrides.hasOwnProperty('bankAccountExternalId') ? overrides.bankAccountExternalId! : 'aut',
    firstPaymentDate:
      overrides && overrides.hasOwnProperty('firstPaymentDate')
        ? overrides.firstPaymentDate!
        : '1987-12-02T22:50:01.000Z',
    maximumPayAmount:
      overrides && overrides.hasOwnProperty('maximumPayAmount') ? overrides.maximumPayAmount! : aMoneyV2Input(),
    minimumPayAmount:
      overrides && overrides.hasOwnProperty('minimumPayAmount') ? overrides.minimumPayAmount! : aMoneyV2Input(),
    orgId: overrides && overrides.hasOwnProperty('orgId') ? overrides.orgId! : 'error',
    payCycle:
      overrides && overrides.hasOwnProperty('payCycle')
        ? overrides.payCycle!
        : RecurringByDayPayCycle.RecurringByDayFortnightly,
    payDay: overrides && overrides.hasOwnProperty('payDay') ? overrides.payDay! : Weekday.Friday,
  };
};

export const aSubscribeRecurringByDayPayload = (
  overrides?: Partial<SubscribeRecurringByDayPayload>
): SubscribeRecurringByDayPayload => {
  return {
    success: overrides && overrides.hasOwnProperty('success') ? overrides.success! : true,
  };
};

export const aSubscription = (overrides?: Partial<Subscription>): Subscription => {
  return {
    createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : '2002-08-24T03:42:47.000Z',
    description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'dolores',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'sed',
    isHPPromo: overrides && overrides.hasOwnProperty('isHPPromo') ? overrides.isHPPromo! : true,
    latestBill: overrides && overrides.hasOwnProperty('latestBill') ? overrides.latestBill! : aBillTransaction(),
    provider: overrides && overrides.hasOwnProperty('provider') ? overrides.provider! : aProvider(),
    signUpLink: overrides && overrides.hasOwnProperty('signUpLink') ? overrides.signUpLink! : 'in',
    status: overrides && overrides.hasOwnProperty('status') ? overrides.status! : SubscriptionStatus.Active,
    subscriptionType:
      overrides && overrides.hasOwnProperty('subscriptionType')
        ? overrides.subscriptionType!
        : SubscriptionType.Electricity,
    title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'doloribus',
    totalSaved: overrides && overrides.hasOwnProperty('totalSaved') ? overrides.totalSaved! : aCurrencyAmount(),
    transactions: overrides && overrides.hasOwnProperty('transactions') ? overrides.transactions! : aTransactions(),
    updatedAt: overrides && overrides.hasOwnProperty('updatedAt') ? overrides.updatedAt! : '1996-05-29T15:02:47.000Z',
  };
};

export const aSubscriptionEdge = (overrides?: Partial<SubscriptionEdge>): SubscriptionEdge => {
  return {
    node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : aSubscription(),
  };
};

export const aSubscriptionInput = (overrides?: Partial<SubscriptionInput>): SubscriptionInput => {
  return {
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'neque',
  };
};

export const aSubscriptions = (overrides?: Partial<Subscriptions>): Subscriptions => {
  return {
    edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [aSubscriptionEdge()],
    pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : aPageInfo(),
  };
};

export const aSubscriptionsInput = (overrides?: Partial<SubscriptionsInput>): SubscriptionsInput => {
  return {
    after: overrides && overrides.hasOwnProperty('after') ? overrides.after! : 'dignissimos',
    first: overrides && overrides.hasOwnProperty('first') ? overrides.first! : 1812,
  };
};

export const aSuperConsent = (overrides?: Partial<SuperConsent>): SuperConsent => {
  return {
    createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : '1985-12-30T06:20:19.000Z',
    fundName: overrides && overrides.hasOwnProperty('fundName') ? overrides.fundName! : 'quae',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'deleniti',
    status: overrides && overrides.hasOwnProperty('status') ? overrides.status! : SuperConsentStatus.Accepted,
    updatedAt: overrides && overrides.hasOwnProperty('updatedAt') ? overrides.updatedAt! : '2009-12-03T06:15:03.000Z',
    userId: overrides && overrides.hasOwnProperty('userId') ? overrides.userId! : 'quibusdam',
    usi: overrides && overrides.hasOwnProperty('usi') ? overrides.usi! : 'ipsa',
  };
};

export const aSuperConsolidation = (overrides?: Partial<SuperConsolidation>): SuperConsolidation => {
  return {
    createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : '1976-04-24T16:08:36.000Z',
    ehUserId: overrides && overrides.hasOwnProperty('ehUserId') ? overrides.ehUserId! : 'dicta',
    fundName: overrides && overrides.hasOwnProperty('fundName') ? overrides.fundName! : 'est',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'placeat',
    memberNumber: overrides && overrides.hasOwnProperty('memberNumber') ? overrides.memberNumber! : 'exercitationem',
    status: overrides && overrides.hasOwnProperty('status') ? overrides.status! : SuperConsolidationStatus.Cancelled,
    updatedAt: overrides && overrides.hasOwnProperty('updatedAt') ? overrides.updatedAt! : '1989-05-26T04:36:06.000Z',
    userId: overrides && overrides.hasOwnProperty('userId') ? overrides.userId! : 'ut',
    usi: overrides && overrides.hasOwnProperty('usi') ? overrides.usi! : 'facere',
  };
};

export const aSuperConsolidationRequestSupport = (
  overrides?: Partial<SuperConsolidationRequestSupport>
): SuperConsolidationRequestSupport => {
  return {
    createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : '1998-10-19T07:39:25.000Z',
    ehUserId: overrides && overrides.hasOwnProperty('ehUserId') ? overrides.ehUserId! : 'est',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'ut',
    swagUserId: overrides && overrides.hasOwnProperty('swagUserId') ? overrides.swagUserId! : 'perspiciatis',
    updatedAt: overrides && overrides.hasOwnProperty('updatedAt') ? overrides.updatedAt! : '2007-08-08T20:52:21.000Z',
    usi: overrides && overrides.hasOwnProperty('usi') ? overrides.usi! : 'eius',
  };
};

export const aSuperContribution = (overrides?: Partial<SuperContribution>): SuperContribution => {
  return {
    acknowledgedNoContributionTracking:
      overrides && overrides.hasOwnProperty('acknowledgedNoContributionTracking')
        ? overrides.acknowledgedNoContributionTracking!
        : false,
    contributionType:
      overrides && overrides.hasOwnProperty('contributionType')
        ? overrides.contributionType!
        : SuperContributionType.Fixed,
    contributionValue: overrides && overrides.hasOwnProperty('contributionValue') ? overrides.contributionValue! : 5437,
    createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : '1972-01-29T22:56:31.000Z',
    endDate: overrides && overrides.hasOwnProperty('endDate') ? overrides.endDate! : '1985-10-12T01:09:51.000Z',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'consequatur',
    membershipId: overrides && overrides.hasOwnProperty('membershipId') ? overrides.membershipId! : 'soluta',
    preserveAmount: overrides && overrides.hasOwnProperty('preserveAmount') ? overrides.preserveAmount! : 52,
    startDate: overrides && overrides.hasOwnProperty('startDate') ? overrides.startDate! : '2001-08-13T08:22:44.000Z',
    status: overrides && overrides.hasOwnProperty('status') ? overrides.status! : SuperContributionStatus.Initial,
    swagSuperfundId: overrides && overrides.hasOwnProperty('swagSuperfundId') ? overrides.swagSuperfundId! : 'qui',
    userId: overrides && overrides.hasOwnProperty('userId') ? overrides.userId! : 'fuga',
  };
};

export const aSuperfundFeatureFlag = (overrides?: Partial<SuperfundFeatureFlag>): SuperfundFeatureFlag => {
  return {
    consolidationSupported:
      overrides && overrides.hasOwnProperty('consolidationSupported') ? overrides.consolidationSupported! : true,
  };
};

export const aSuperfundMetadata = (overrides?: Partial<SuperfundMetadata>): SuperfundMetadata => {
  return {
    externalLink: overrides && overrides.hasOwnProperty('externalLink') ? overrides.externalLink! : 'autem',
  };
};

export const aSwagStore = (overrides?: Partial<SwagStore>): SwagStore => {
  return {
    allOffers: overrides && overrides.hasOwnProperty('allOffers') ? overrides.allOffers! : aSwagStoreOffers(),
    buyAgainGiftCards:
      overrides && overrides.hasOwnProperty('buyAgainGiftCards') ? overrides.buyAgainGiftCards! : aBuyAgainGiftCards(),
    discountOrderHistory:
      overrides && overrides.hasOwnProperty('discountOrderHistory')
        ? overrides.discountOrderHistory!
        : aDiscountOrderHistory(),
    discountShopProductDetails:
      overrides && overrides.hasOwnProperty('discountShopProductDetails')
        ? overrides.discountShopProductDetails!
        : aShopProductDetailsResponse(),
    stripePublishableKey:
      overrides && overrides.hasOwnProperty('stripePublishableKey')
        ? overrides.stripePublishableKey!
        : aPublishableKey(),
  };
};

export const aSwagStoreOffer = (overrides?: Partial<SwagStoreOffer>): SwagStoreOffer => {
  return {
    country: overrides && overrides.hasOwnProperty('country') ? overrides.country! : 'ullam',
    currency: overrides && overrides.hasOwnProperty('currency') ? overrides.currency! : 'consectetur',
    description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'explicabo',
    discountPrice: overrides && overrides.hasOwnProperty('discountPrice') ? overrides.discountPrice! : 7.78,
    discountPriceInPoints:
      overrides && overrides.hasOwnProperty('discountPriceInPoints') ? overrides.discountPriceInPoints! : 5401,
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'consequatur',
    imageUrl: overrides && overrides.hasOwnProperty('imageUrl') ? overrides.imageUrl! : 'commodi',
    name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'possimus',
    price: overrides && overrides.hasOwnProperty('price') ? overrides.price! : 9.81,
    priceInPoints: overrides && overrides.hasOwnProperty('priceInPoints') ? overrides.priceInPoints! : 3435,
    productCode: overrides && overrides.hasOwnProperty('productCode') ? overrides.productCode! : 'est',
    productType: overrides && overrides.hasOwnProperty('productType') ? overrides.productType! : 'qui',
    serviceFee: overrides && overrides.hasOwnProperty('serviceFee') ? overrides.serviceFee! : 2.66,
    termsAndConditions:
      overrides && overrides.hasOwnProperty('termsAndConditions') ? overrides.termsAndConditions! : 'autem',
    title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'a',
  };
};

export const aSwagStoreOfferEdge = (overrides?: Partial<SwagStoreOfferEdge>): SwagStoreOfferEdge => {
  return {
    cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'aliquam',
    node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : aSwagStoreOffer(),
  };
};

export const aSwagStoreOffers = (overrides?: Partial<SwagStoreOffers>): SwagStoreOffers => {
  return {
    edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [aSwagStoreOfferEdge()],
    error: overrides && overrides.hasOwnProperty('error') ? overrides.error! : aGenericError(),
    pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : aPageInfo(),
  };
};

export const aSwagSuperfund = (overrides?: Partial<SwagSuperfund>): SwagSuperfund => {
  return {
    abn: overrides && overrides.hasOwnProperty('abn') ? overrides.abn! : 'quam',
    fundChoice: overrides && overrides.hasOwnProperty('fundChoice') ? overrides.fundChoice! : 'sequi',
    fundName: overrides && overrides.hasOwnProperty('fundName') ? overrides.fundName! : 'consequatur',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '3d7ca805-6218-4140-951f-a3c579735477',
    memberNumber: overrides && overrides.hasOwnProperty('memberNumber') ? overrides.memberNumber! : 'ducimus',
    superfundFeatureFlag:
      overrides && overrides.hasOwnProperty('superfundFeatureFlag')
        ? overrides.superfundFeatureFlag!
        : aSuperfundFeatureFlag(),
    superfundMetadata:
      overrides && overrides.hasOwnProperty('superfundMetadata') ? overrides.superfundMetadata! : aSuperfundMetadata(),
    usi: overrides && overrides.hasOwnProperty('usi') ? overrides.usi! : 'neque',
  };
};

export const aTaxObligationInput = (overrides?: Partial<TaxObligationInput>): TaxObligationInput => {
  return {
    country: overrides && overrides.hasOwnProperty('country') ? overrides.country! : 'qui',
    noTaxIdNumberReason:
      overrides && overrides.hasOwnProperty('noTaxIdNumberReason')
        ? overrides.noTaxIdNumberReason!
        : NoTaxIdNumberReason.DisclosureNotRequired,
    taxIdNumber: overrides && overrides.hasOwnProperty('taxIdNumber') ? overrides.taxIdNumber! : 'et',
  };
};

export const aTransactionBase = (overrides?: Partial<TransactionBase>): TransactionBase => {
  return {
    createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : '1977-07-20T22:31:59.000Z',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'officia',
    transactionDate:
      overrides && overrides.hasOwnProperty('transactionDate') ? overrides.transactionDate! : '1970-12-05',
    type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : TxnType.Bill,
  };
};

export const aTransactionEdge = (overrides?: Partial<TransactionEdge>): TransactionEdge => {
  return {
    node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : aBillTransaction(),
  };
};

export const aTransactionMerchant = (overrides?: Partial<TransactionMerchant>): TransactionMerchant => {
  return {
    name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'tenetur',
    singleLineAddress:
      overrides && overrides.hasOwnProperty('singleLineAddress') ? overrides.singleLineAddress! : 'nihil',
  };
};

export const aTransactionMeta = (overrides?: Partial<TransactionMeta>): TransactionMeta => {
  return {
    accountNumber: overrides && overrides.hasOwnProperty('accountNumber') ? overrides.accountNumber! : 'placeat',
  };
};

export const aTransactions = (overrides?: Partial<Transactions>): Transactions => {
  return {
    edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [aTransactionEdge()],
    pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : aPageInfo(),
  };
};

export const aTransactionsInput = (overrides?: Partial<TransactionsInput>): TransactionsInput => {
  return {
    after: overrides && overrides.hasOwnProperty('after') ? overrides.after! : 'neque',
    first: overrides && overrides.hasOwnProperty('first') ? overrides.first! : 67,
  };
};

export const aTransferAuWalletFundsInput = (
  overrides?: Partial<TransferAuWalletFundsInput>
): TransferAuWalletFundsInput => {
  return {
    accountName: overrides && overrides.hasOwnProperty('accountName') ? overrides.accountName! : 'et',
    accountNumber: overrides && overrides.hasOwnProperty('accountNumber') ? overrides.accountNumber! : 'delectus',
    amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : aMoneyV2Input(),
    bsb: overrides && overrides.hasOwnProperty('bsb') ? overrides.bsb! : 'neque',
    category: overrides && overrides.hasOwnProperty('category') ? overrides.category! : 'nulla',
    description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'et',
    idempotencyKey: overrides && overrides.hasOwnProperty('idempotencyKey') ? overrides.idempotencyKey! : 'similique',
    reference: overrides && overrides.hasOwnProperty('reference') ? overrides.reference! : 'odit',
    senderName: overrides && overrides.hasOwnProperty('senderName') ? overrides.senderName! : 'accusamus',
  };
};

export const aTransferAuWalletFundsPayload = (
  overrides?: Partial<TransferAuWalletFundsPayload>
): TransferAuWalletFundsPayload => {
  return {
    outcome: overrides && overrides.hasOwnProperty('outcome') ? overrides.outcome! : TransactionOutcome.Accepted,
    transactionId:
      overrides && overrides.hasOwnProperty('transactionId')
        ? overrides.transactionId!
        : 'fa0dac31-c36f-4a5a-aafd-bf6aa280da4d',
  };
};

export const anUkTokenPayload = (overrides?: Partial<UkTokenPayload>): UkTokenPayload => {
  return {
    userToken: overrides && overrides.hasOwnProperty('userToken') ? overrides.userToken! : 'qui',
  };
};

export const anUkWalletDetails = (overrides?: Partial<UkWalletDetails>): UkWalletDetails => {
  return {
    accountName: overrides && overrides.hasOwnProperty('accountName') ? overrides.accountName! : 'facere',
    accountNumber: overrides && overrides.hasOwnProperty('accountNumber') ? overrides.accountNumber! : 'et',
    availableBalance: overrides && overrides.hasOwnProperty('availableBalance') ? overrides.availableBalance! : 4.54,
    cardId: overrides && overrides.hasOwnProperty('cardId') ? overrides.cardId! : 'quasi',
    currency: overrides && overrides.hasOwnProperty('currency') ? overrides.currency! : 'omnis',
    sortCode: overrides && overrides.hasOwnProperty('sortCode') ? overrides.sortCode! : 'ducimus',
    totalBalance: overrides && overrides.hasOwnProperty('totalBalance') ? overrides.totalBalance! : 0.81,
  };
};

export const anUkAccessTokenState = (overrides?: Partial<UkAccessTokenState>): UkAccessTokenState => {
  return {
    valid: overrides && overrides.hasOwnProperty('valid') ? overrides.valid! : true,
  };
};

export const anUkAuthFactor = (overrides?: Partial<UkAuthFactor>): UkAuthFactor => {
  return {
    channel: overrides && overrides.hasOwnProperty('channel') ? overrides.channel! : UkAuthFactorChannel.Authy,
    status: overrides && overrides.hasOwnProperty('status') ? overrides.status! : UkAuthFactorStatus.Active,
    type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : UkAuthFactorType.Biometric,
  };
};

export const anUkStepUpResult = (overrides?: Partial<UkStepUpResult>): UkStepUpResult => {
  return {
    accessToken: overrides && overrides.hasOwnProperty('accessToken') ? overrides.accessToken! : 'quasi',
    challengeId: overrides && overrides.hasOwnProperty('challengeId') ? overrides.challengeId! : 'commodi',
    state: overrides && overrides.hasOwnProperty('state') ? overrides.state! : UkStepupResultState.Failed,
  };
};

export const aUniversalAddressInput = (overrides?: Partial<UniversalAddressInput>): UniversalAddressInput => {
  return {
    addressLine1: overrides && overrides.hasOwnProperty('addressLine1') ? overrides.addressLine1! : 'et',
    addressLine2: overrides && overrides.hasOwnProperty('addressLine2') ? overrides.addressLine2! : 'animi',
    country: overrides && overrides.hasOwnProperty('country') ? overrides.country! : 'facere',
    postcode: overrides && overrides.hasOwnProperty('postcode') ? overrides.postcode! : 'excepturi',
    region: overrides && overrides.hasOwnProperty('region') ? overrides.region! : 'impedit',
    state: overrides && overrides.hasOwnProperty('state') ? overrides.state! : 'distinctio',
    townOrCity: overrides && overrides.hasOwnProperty('townOrCity') ? overrides.townOrCity! : 'pariatur',
  };
};

export const anUpdateAutoEnrolmentInput = (overrides?: Partial<UpdateAutoEnrolmentInput>): UpdateAutoEnrolmentInput => {
  return {
    message: overrides && overrides.hasOwnProperty('message') ? overrides.message! : 'iure',
    status: overrides && overrides.hasOwnProperty('status') ? overrides.status! : true,
  };
};

export const anUpdateAutoEnrolmentPayload = (
  overrides?: Partial<UpdateAutoEnrolmentPayload>
): UpdateAutoEnrolmentPayload => {
  return {
    error: overrides && overrides.hasOwnProperty('error') ? overrides.error! : aGenericError(),
    success: overrides && overrides.hasOwnProperty('success') ? overrides.success! : false,
  };
};

export const anUpdateBankDetailsInput = (overrides?: Partial<UpdateBankDetailsInput>): UpdateBankDetailsInput => {
  return {
    accountNumber: overrides && overrides.hasOwnProperty('accountNumber') ? overrides.accountNumber! : 'recusandae',
    bsb: overrides && overrides.hasOwnProperty('bsb') ? overrides.bsb! : 'minus',
  };
};

export const anUpdateBankDetailsPayload = (overrides?: Partial<UpdateBankDetailsPayload>): UpdateBankDetailsPayload => {
  return {
    error: overrides && overrides.hasOwnProperty('error') ? overrides.error! : aGenericError(),
    success: overrides && overrides.hasOwnProperty('success') ? overrides.success! : false,
  };
};

export const anUpdateBankLinkedStatusInput = (
  overrides?: Partial<UpdateBankLinkedStatusInput>
): UpdateBankLinkedStatusInput => {
  return {
    message: overrides && overrides.hasOwnProperty('message') ? overrides.message! : 'aut',
    status: overrides && overrides.hasOwnProperty('status') ? overrides.status! : false,
  };
};

export const anUpdateBankLinkedStatusPayload = (
  overrides?: Partial<UpdateBankLinkedStatusPayload>
): UpdateBankLinkedStatusPayload => {
  return {
    error: overrides && overrides.hasOwnProperty('error') ? overrides.error! : aGenericError(),
    success: overrides && overrides.hasOwnProperty('success') ? overrides.success! : false,
  };
};

export const anUpdateMySuperConsentStatusInput = (
  overrides?: Partial<UpdateMySuperConsentStatusInput>
): UpdateMySuperConsentStatusInput => {
  return {
    status: overrides && overrides.hasOwnProperty('status') ? overrides.status! : SuperConsentStatus.Accepted,
    trimedUsi: overrides && overrides.hasOwnProperty('trimedUsi') ? overrides.trimedUsi! : 'est',
  };
};

export const anUpdateRecurringByDayInput = (
  overrides?: Partial<UpdateRecurringByDayInput>
): UpdateRecurringByDayInput => {
  return {
    bankAccountExternalId:
      overrides && overrides.hasOwnProperty('bankAccountExternalId') ? overrides.bankAccountExternalId! : 'ab',
    firstPaymentDate:
      overrides && overrides.hasOwnProperty('firstPaymentDate')
        ? overrides.firstPaymentDate!
        : '2014-06-04T23:09:36.000Z',
    maximumPayAmount:
      overrides && overrides.hasOwnProperty('maximumPayAmount') ? overrides.maximumPayAmount! : aMoneyV2Input(),
    minimumPayAmount:
      overrides && overrides.hasOwnProperty('minimumPayAmount') ? overrides.minimumPayAmount! : aMoneyV2Input(),
    orgId: overrides && overrides.hasOwnProperty('orgId') ? overrides.orgId! : 'voluptas',
    payCycle:
      overrides && overrides.hasOwnProperty('payCycle')
        ? overrides.payCycle!
        : RecurringByDayPayCycle.RecurringByDayFortnightly,
    payDay: overrides && overrides.hasOwnProperty('payDay') ? overrides.payDay! : Weekday.Friday,
  };
};

export const anUpdateRecurringByDayPayload = (
  overrides?: Partial<UpdateRecurringByDayPayload>
): UpdateRecurringByDayPayload => {
  return {
    subscription:
      overrides && overrides.hasOwnProperty('subscription') ? overrides.subscription! : aRecurringByDaySubscription(),
    success: overrides && overrides.hasOwnProperty('success') ? overrides.success! : true,
  };
};

export const anUpdateSchedulingSubscriptionInput = (
  overrides?: Partial<UpdateSchedulingSubscriptionInput>
): UpdateSchedulingSubscriptionInput => {
  return {
    amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : aMoneyV2Input(),
    bankAccountExternalId:
      overrides && overrides.hasOwnProperty('bankAccountExternalId') ? overrides.bankAccountExternalId! : 'voluptate',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'nesciunt',
    orgId: overrides && overrides.hasOwnProperty('orgId') ? overrides.orgId! : 'officiis',
    plan: overrides && overrides.hasOwnProperty('plan') ? overrides.plan! : SchedulingSubscriptionPlan.Frequently,
  };
};

export const anUpdateSuperConsentPayload = (
  overrides?: Partial<UpdateSuperConsentPayload>
): UpdateSuperConsentPayload => {
  return {
    superConsent: overrides && overrides.hasOwnProperty('superConsent') ? overrides.superConsent! : aSuperConsent(),
  };
};

export const anUpdateUserCategoriesPreferenceInput = (
  overrides?: Partial<UpdateUserCategoriesPreferenceInput>
): UpdateUserCategoriesPreferenceInput => {
  return {
    categories: overrides && overrides.hasOwnProperty('categories') ? overrides.categories! : [aUserCategoryInput()],
  };
};

export const anUpdateUserCategoriesPreferencePayload = (
  overrides?: Partial<UpdateUserCategoriesPreferencePayload>
): UpdateUserCategoriesPreferencePayload => {
  return {
    userCategoriesPreferences:
      overrides && overrides.hasOwnProperty('userCategoriesPreferences')
        ? overrides.userCategoriesPreferences!
        : [aUserCategoriesPreference()],
  };
};

export const anUpdateWalletProfileInput = (overrides?: Partial<UpdateWalletProfileInput>): UpdateWalletProfileInput => {
  return {
    dateOfBirth: overrides && overrides.hasOwnProperty('dateOfBirth') ? overrides.dateOfBirth! : 'sed',
    name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : aPersonalNameInput(),
    phoneNumber: overrides && overrides.hasOwnProperty('phoneNumber') ? overrides.phoneNumber! : aPhoneNumberInput(),
    residentialAddress:
      overrides && overrides.hasOwnProperty('residentialAddress') ? overrides.residentialAddress! : anAddressInput(),
  };
};

export const aUser = (overrides?: Partial<User>): User => {
  return {
    activeSuperContribution:
      overrides && overrides.hasOwnProperty('activeSuperContribution')
        ? overrides.activeSuperContribution!
        : aSuperContribution(),
    benefits: overrides && overrides.hasOwnProperty('benefits') ? overrides.benefits! : aBenefits(),
    billManagement:
      overrides && overrides.hasOwnProperty('billManagement') ? overrides.billManagement! : aBillManagement(),
    cashback: overrides && overrides.hasOwnProperty('cashback') ? overrides.cashback! : aCashback(),
    details: overrides && overrides.hasOwnProperty('details') ? overrides.details! : aUserDetails(),
    eHUserInitializationDetails:
      overrides && overrides.hasOwnProperty('eHUserInitializationDetails')
        ? overrides.eHUserInitializationDetails!
        : aUserInitializationDetailsPayload(),
    experiment: overrides && overrides.hasOwnProperty('experiment') ? overrides.experiment! : anExperiment(),
    featureVisibility:
      overrides && overrides.hasOwnProperty('featureVisibility') ? overrides.featureVisibility! : aFeatureVisibility(),
    group: overrides && overrides.hasOwnProperty('group') ? overrides.group! : aGroup(),
    heroPoints: overrides && overrides.hasOwnProperty('heroPoints') ? overrides.heroPoints! : aHeroPoints(),
    hrDetails: overrides && overrides.hasOwnProperty('hrDetails') ? overrides.hrDetails! : aHrUser(),
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'a5756f00-41a6-422a-8a7d-d13ee6a63750',
    instapay: overrides && overrides.hasOwnProperty('instapay') ? overrides.instapay! : aUserInstapay(),
    kpUserInitializationDetails:
      overrides && overrides.hasOwnProperty('kpUserInitializationDetails')
        ? overrides.kpUserInitializationDetails!
        : aUserInitializationDetailsPayload(),
    lifecycle: overrides && overrides.hasOwnProperty('lifecycle') ? overrides.lifecycle! : aLifecycle(),
    minSupportVersion:
      overrides && overrides.hasOwnProperty('minSupportVersion') ? overrides.minSupportVersion! : aMinSupportVersion(),
    noOrgPermissions:
      overrides && overrides.hasOwnProperty('noOrgPermissions') ? overrides.noOrgPermissions! : aNoOrgPermissions(),
    org: overrides && overrides.hasOwnProperty('org') ? overrides.org! : aHrOrg(),
    orgs: overrides && overrides.hasOwnProperty('orgs') ? overrides.orgs! : [aHrOrg()],
    profileChangeRequests:
      overrides && overrides.hasOwnProperty('profileChangeRequests')
        ? overrides.profileChangeRequests!
        : aProfileChangeRequestPayload(),
    superConsent: overrides && overrides.hasOwnProperty('superConsent') ? overrides.superConsent! : aSuperConsent(),
    superConsolidation:
      overrides && overrides.hasOwnProperty('superConsolidation')
        ? overrides.superConsolidation!
        : aSuperConsolidation(),
    superConsolidationRequestSupport:
      overrides && overrides.hasOwnProperty('superConsolidationRequestSupport')
        ? overrides.superConsolidationRequestSupport!
        : aSuperConsolidationRequestSupport(),
    superContributions:
      overrides && overrides.hasOwnProperty('superContributions')
        ? overrides.superContributions!
        : [aSuperContribution()],
    swagStore: overrides && overrides.hasOwnProperty('swagStore') ? overrides.swagStore! : aSwagStore(),
    swagSuperfund: overrides && overrides.hasOwnProperty('swagSuperfund') ? overrides.swagSuperfund! : aSwagSuperfund(),
    userGroupConsent:
      overrides && overrides.hasOwnProperty('userGroupConsent') ? overrides.userGroupConsent! : aUserGroupConsent(),
    userPermission:
      overrides && overrides.hasOwnProperty('userPermission') ? overrides.userPermission! : aUserPermissionPayload(),
    wallet: overrides && overrides.hasOwnProperty('wallet') ? overrides.wallet! : aWallet(),
  };
};

export const aUserAddressInput = (overrides?: Partial<UserAddressInput>): UserAddressInput => {
  return {
    country: overrides && overrides.hasOwnProperty('country') ? overrides.country! : 'consequuntur',
    longForm: overrides && overrides.hasOwnProperty('longForm') ? overrides.longForm! : 'quibusdam',
    postcode: overrides && overrides.hasOwnProperty('postcode') ? overrides.postcode! : 'omnis',
    region: overrides && overrides.hasOwnProperty('region') ? overrides.region! : 'vel',
    streetName: overrides && overrides.hasOwnProperty('streetName') ? overrides.streetName! : 'voluptas',
    streetNumber: overrides && overrides.hasOwnProperty('streetNumber') ? overrides.streetNumber! : 'optio',
    streetType: overrides && overrides.hasOwnProperty('streetType') ? overrides.streetType! : 'accusamus',
    townOrCity: overrides && overrides.hasOwnProperty('townOrCity') ? overrides.townOrCity! : 'dolor',
    unitNumber: overrides && overrides.hasOwnProperty('unitNumber') ? overrides.unitNumber! : 'tenetur',
  };
};

export const aUserBankDetails = (overrides?: Partial<UserBankDetails>): UserBankDetails => {
  return {
    accountNumber: overrides && overrides.hasOwnProperty('accountNumber') ? overrides.accountNumber! : 'similique',
    bsb: overrides && overrides.hasOwnProperty('bsb') ? overrides.bsb! : 'et',
    error: overrides && overrides.hasOwnProperty('error') ? overrides.error! : aGenericError(),
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 2113,
  };
};

export const aUserCategoriesPreference = (overrides?: Partial<UserCategoriesPreference>): UserCategoriesPreference => {
  return {
    categoryId: overrides && overrides.hasOwnProperty('categoryId') ? overrides.categoryId! : 'veniam',
    createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : '2014-09-30T16:01:02.000Z',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'et',
    userId: overrides && overrides.hasOwnProperty('userId') ? overrides.userId! : 'sunt',
  };
};

export const aUserCategoryInput = (overrides?: Partial<UserCategoryInput>): UserCategoryInput => {
  return {
    categoryId: overrides && overrides.hasOwnProperty('categoryId') ? overrides.categoryId! : 'neque',
    categoryName: overrides && overrides.hasOwnProperty('categoryName') ? overrides.categoryName! : 'laboriosam',
  };
};

export const aUserDetails = (overrides?: Partial<UserDetails>): UserDetails => {
  return {
    dateOfBirth: overrides && overrides.hasOwnProperty('dateOfBirth') ? overrides.dateOfBirth! : 'in',
    email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'veritatis',
    firstName: overrides && overrides.hasOwnProperty('firstName') ? overrides.firstName! : 'perferendis',
    lastName: overrides && overrides.hasOwnProperty('lastName') ? overrides.lastName! : 'rerum',
    mailingAddress: overrides && overrides.hasOwnProperty('mailingAddress') ? overrides.mailingAddress! : anAddress(),
    middleName: overrides && overrides.hasOwnProperty('middleName') ? overrides.middleName! : 'quis',
    phoneNumber: overrides && overrides.hasOwnProperty('phoneNumber') ? overrides.phoneNumber! : aPhoneNumber(),
    residentialAddress:
      overrides && overrides.hasOwnProperty('residentialAddress') ? overrides.residentialAddress! : anAddress(),
  };
};

export const aUserGroupConsent = (overrides?: Partial<UserGroupConsent>): UserGroupConsent => {
  return {
    consented: overrides && overrides.hasOwnProperty('consented') ? overrides.consented! : true,
    createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : '1988-10-16T16:47:48.000Z',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'qui',
    userId: overrides && overrides.hasOwnProperty('userId') ? overrides.userId! : 'quas',
  };
};

export const aUserInitializationDetailAddress = (
  overrides?: Partial<UserInitializationDetailAddress>
): UserInitializationDetailAddress => {
  return {
    addressLine1: overrides && overrides.hasOwnProperty('addressLine1') ? overrides.addressLine1! : 'commodi',
    addressLine2: overrides && overrides.hasOwnProperty('addressLine2') ? overrides.addressLine2! : 'itaque',
    addressLine3: overrides && overrides.hasOwnProperty('addressLine3') ? overrides.addressLine3! : 'sed',
    country: overrides && overrides.hasOwnProperty('country') ? overrides.country! : 'est',
    postcode: overrides && overrides.hasOwnProperty('postcode') ? overrides.postcode! : 'libero',
    region: overrides && overrides.hasOwnProperty('region') ? overrides.region! : 'ipsa',
    townOrCity: overrides && overrides.hasOwnProperty('townOrCity') ? overrides.townOrCity! : 'culpa',
  };
};

export const aUserInitializationDetails = (
  overrides?: Partial<UserInitializationDetails>
): UserInitializationDetails => {
  return {
    address: overrides && overrides.hasOwnProperty('address') ? overrides.address! : aUserInitializationDetailAddress(),
    dateOfBirth: overrides && overrides.hasOwnProperty('dateOfBirth') ? overrides.dateOfBirth! : 'occaecati',
    firstName: overrides && overrides.hasOwnProperty('firstName') ? overrides.firstName! : 'ea',
    lastName: overrides && overrides.hasOwnProperty('lastName') ? overrides.lastName! : 'tenetur',
    middleName: overrides && overrides.hasOwnProperty('middleName') ? overrides.middleName! : 'minima',
    phoneNumber: overrides && overrides.hasOwnProperty('phoneNumber') ? overrides.phoneNumber! : aPhoneNumber(),
  };
};

export const aUserInitializationDetailsPayload = (
  overrides?: Partial<UserInitializationDetailsPayload>
): UserInitializationDetailsPayload => {
  return {
    error: overrides && overrides.hasOwnProperty('error') ? overrides.error! : aGenericError(),
    user: overrides && overrides.hasOwnProperty('user') ? overrides.user! : aUserInitializationDetails(),
  };
};

export const aUserInstapay = (overrides?: Partial<UserInstapay>): UserInstapay => {
  return {
    transactions: overrides && overrides.hasOwnProperty('transactions') ? overrides.transactions! : anInstapayError(),
    usage: overrides && overrides.hasOwnProperty('usage') ? overrides.usage! : anInstapayError(),
  };
};

export const aUserMutation = (overrides?: Partial<UserMutation>): UserMutation => {
  return {
    patchProfile: overrides && overrides.hasOwnProperty('patchProfile') ? overrides.patchProfile! : anEhProfile(),
    updateMailingAddress:
      overrides && overrides.hasOwnProperty('updateMailingAddress') ? overrides.updateMailingAddress! : false,
  };
};

export const aUserPermission = (overrides?: Partial<UserPermission>): UserPermission => {
  return {
    enabled: overrides && overrides.hasOwnProperty('enabled') ? overrides.enabled! : true,
    name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'quam',
  };
};

export const aUserPermissionInput = (overrides?: Partial<UserPermissionInput>): UserPermissionInput => {
  return {
    kpBrandIds: overrides && overrides.hasOwnProperty('kpBrandIds') ? overrides.kpBrandIds! : [1101],
    kpBusinessIds: overrides && overrides.hasOwnProperty('kpBusinessIds') ? overrides.kpBusinessIds! : [5789],
    kpEmployeeIds: overrides && overrides.hasOwnProperty('kpEmployeeIds') ? overrides.kpEmployeeIds! : [3699],
    kpPartnerIds: overrides && overrides.hasOwnProperty('kpPartnerIds') ? overrides.kpPartnerIds! : [1050],
  };
};

export const aUserPermissionPayload = (overrides?: Partial<UserPermissionPayload>): UserPermissionPayload => {
  return {
    error: overrides && overrides.hasOwnProperty('error') ? overrides.error! : aGenericError(),
    permissions: overrides && overrides.hasOwnProperty('permissions') ? overrides.permissions! : [aUserPermission()],
  };
};

export const aVerifyPhoneNumberRequest = (overrides?: Partial<VerifyPhoneNumberRequest>): VerifyPhoneNumberRequest => {
  return {
    code: overrides && overrides.hasOwnProperty('code') ? overrides.code! : 'expedita',
  };
};

export const aWaitList = (overrides?: Partial<WaitList>): WaitList => {
  return {
    projectID:
      overrides && overrides.hasOwnProperty('projectID')
        ? overrides.projectID!
        : 'de09c95a-fa2b-4bef-83c1-eb08693c2d73',
    status: overrides && overrides.hasOwnProperty('status') ? overrides.status! : WaitListStatus.Blocked,
  };
};

export const aWaitListPayload = (overrides?: Partial<WaitListPayload>): WaitListPayload => {
  return {
    waitList: overrides && overrides.hasOwnProperty('waitList') ? overrides.waitList! : aGroupWaitList(),
  };
};

export const aWallet = (overrides?: Partial<Wallet>): Wallet => {
  return {
    IDVProfile: overrides && overrides.hasOwnProperty('IDVProfile') ? overrides.IDVProfile! : anIdvProfile(),
    UKCurrentPaymentCard:
      overrides && overrides.hasOwnProperty('UKCurrentPaymentCard')
        ? overrides.UKCurrentPaymentCard!
        : aPaymentCardDetails(),
    UKCurrentPaymentCardV2:
      overrides && overrides.hasOwnProperty('UKCurrentPaymentCardV2')
        ? overrides.UKCurrentPaymentCardV2!
        : aPaymentCardDetails(),
    UKToken: overrides && overrides.hasOwnProperty('UKToken') ? overrides.UKToken! : anUkTokenPayload(),
    UKWalletDetails:
      overrides && overrides.hasOwnProperty('UKWalletDetails') ? overrides.UKWalletDetails! : anUkWalletDetails(),
    auActiveScheduledPayments:
      overrides && overrides.hasOwnProperty('auActiveScheduledPayments')
        ? overrides.auActiveScheduledPayments!
        : [aScheduledPayment()],
    card: overrides && overrides.hasOwnProperty('card') ? overrides.card! : aCard(),
    details: overrides && overrides.hasOwnProperty('details') ? overrides.details! : aWalletDetails(),
    ehBinRange: overrides && overrides.hasOwnProperty('ehBinRange') ? overrides.ehBinRange! : anEhBinRange(),
    latestUkStepUpResult:
      overrides && overrides.hasOwnProperty('latestUkStepUpResult')
        ? overrides.latestUkStepUpResult!
        : anUkStepUpResult(),
    notification:
      overrides && overrides.hasOwnProperty('notification') ? overrides.notification! : aWalletNotification(),
    payeeAddresses:
      overrides && overrides.hasOwnProperty('payeeAddresses')
        ? overrides.payeeAddresses!
        : [aBsbTransferPayeeAddress()],
    persistentNotifications:
      overrides && overrides.hasOwnProperty('persistentNotifications')
        ? overrides.persistentNotifications!
        : [aPersistentNotification()],
    seenSSACarouselTimestamp:
      overrides && overrides.hasOwnProperty('seenSSACarouselTimestamp')
        ? overrides.seenSSACarouselTimestamp!
        : '1979-08-14T07:36:52.000Z',
    stash: overrides && overrides.hasOwnProperty('stash') ? overrides.stash! : aStash(),
    transactions:
      overrides && overrides.hasOwnProperty('transactions') ? overrides.transactions! : [aFinancialTransaction()],
    ukAccessTokenState:
      overrides && overrides.hasOwnProperty('ukAccessTokenState')
        ? overrides.ukAccessTokenState!
        : anUkAccessTokenState(),
    ukAuthFactors:
      overrides && overrides.hasOwnProperty('ukAuthFactors') ? overrides.ukAuthFactors! : [anUkAuthFactor()],
    ukTransactionState:
      overrides && overrides.hasOwnProperty('ukTransactionState')
        ? overrides.ukTransactionState!
        : aFinancialTransactionState(),
    walletProfileChangeRequests:
      overrides && overrides.hasOwnProperty('walletProfileChangeRequests')
        ? overrides.walletProfileChangeRequests!
        : aWalletProfileChangeRequestPayload(),
  };
};

export const aWalletDetails = (overrides?: Partial<WalletDetails>): WalletDetails => {
  return {
    accountNumber: overrides && overrides.hasOwnProperty('accountNumber') ? overrides.accountNumber! : 'maxime',
    availableBalance:
      overrides && overrides.hasOwnProperty('availableBalance') ? overrides.availableBalance! : aMoneyV2(),
    bsb: overrides && overrides.hasOwnProperty('bsb') ? overrides.bsb! : 'aliquid',
    externalId: overrides && overrides.hasOwnProperty('externalId') ? overrides.externalId! : 'quibusdam',
    name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'excepturi',
    setupStatus: overrides && overrides.hasOwnProperty('setupStatus') ? overrides.setupStatus! : aSetupStatus(),
    status: overrides && overrides.hasOwnProperty('status') ? overrides.status! : 'enim',
  };
};

export const aWalletNotification = (overrides?: Partial<WalletNotification>): WalletNotification => {
  return {
    content: overrides && overrides.hasOwnProperty('content') ? overrides.content! : 'in',
    ctaCaptions: overrides && overrides.hasOwnProperty('ctaCaptions') ? overrides.ctaCaptions! : aCtaCaptions(),
    note: overrides && overrides.hasOwnProperty('note') ? overrides.note! : 'doloremque',
    updatedAt: overrides && overrides.hasOwnProperty('updatedAt') ? overrides.updatedAt! : '1997-05-20T06:52:57.000Z',
  };
};

export const aWalletProfileChangeRequest = (
  overrides?: Partial<WalletProfileChangeRequest>
): WalletProfileChangeRequest => {
  return {
    createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : 'consequatur',
    dateOfBirth: overrides && overrides.hasOwnProperty('dateOfBirth') ? overrides.dateOfBirth! : 'ut',
    name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : aPersonalName(),
    type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : WalletProfileChangeRequestType.DateOfBirth,
  };
};

export const aWalletProfileChangeRequestPayload = (
  overrides?: Partial<WalletProfileChangeRequestPayload>
): WalletProfileChangeRequestPayload => {
  return {
    error: overrides && overrides.hasOwnProperty('error') ? overrides.error! : aGenericError(),
    requests: overrides && overrides.hasOwnProperty('requests') ? overrides.requests! : [aWalletProfileChangeRequest()],
  };
};

export const aWithdrawFromStashInput = (overrides?: Partial<WithdrawFromStashInput>): WithdrawFromStashInput => {
  return {
    amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : aMoneyV2Input(),
  };
};
