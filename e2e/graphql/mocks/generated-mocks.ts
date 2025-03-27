import type {
  AccountTransferInput,
  Address,
  AddressInput,
  AddressInputV2,
  AddressInputV3,
  AutoEnrolInput,
  BankAccount,
  BankLinkedInput,
  BenefitsMinSupportVersion,
  Card,
  CardMeta,
  CardMetaInput,
  CardRequestInput,
  CashbackBank,
  CashbackBankDetail,
  CashbackBankDetailInput,
  CashbackCard,
  CashbackCategory,
  CashbackDeleteCardInput,
  CashbackEnrolCardInput,
  CashbackIntroductionContent,
  CashbackOnboardStatus,
  CashbackTermsAndCondition,
  CashbackTransaction,
  CashbackTransactionMeta,
  CashbackTransactions,
  CashbackTransactionsV2,
  CashbackUserInfo,
  CashbackUserToken,
  CloseStashPayload,
  Counterpart,
  CreateStashInput,
  CreateStripeClientTokenInput,
  CurrencyAmount,
  CurrentUser,
  DepositStashInput,
  DigitalWallet,
  DigitalWalletDetails,
  DiscountHistory,
  DiscountOrderHistoryResponse,
  Drawdown,
  DrawdownTransaction,
  DrawdownWagePayload,
  EWalletDetails,
  EWalletSetupDetailsInput,
  EWalletSetupDetailsInputV2,
  EhCardBinRange,
  EhMembership,
  EhMembershipInput,
  EhProfile,
  EhProfilePatchRequest,
  EventLogPayloadTuple,
  EventLogRequest,
  FinancialTransaction,
  HeroDollarBalance,
  HeroDollarRedemptionFee,
  HeroDollarRedemptionFeeResponse,
  HeroDollarTransactionDetail,
  HeroDollarTransactionItem,
  HeroDollarTransactions,
  IdvInitiatedResponse,
  IdvProfile,
  InStoreOffer,
  InStoreOfferLocation,
  InStoreOffersResponse,
  InstapayBankAccount,
  InstapayFee,
  InstapayHistory,
  InstapayInfo,
  InstapayInfoField,
  InstapayUsageVerification,
  IntroductionContent,
  MakePaymentItem,
  MakePaymentPaymentMethod,
  MakePaymentResponse,
  MinSupportVersion,
  Mutation,
  OemProvisioningData,
  OnlineOffer,
  OnlineOffersResponse,
  OrderDetail,
  OrderProduct,
  OrderProductVariant,
  OrderPurchaseItem,
  OrderPurchaseItemData,
  OrderPurchaseItemFulfil,
  PayAccount,
  PayAccountAllocation,
  PayAccountDetails,
  PayAllocation,
  PayAllocationInput,
  PayWithHdCarouselSeen,
  PaymentClientToken,
  PaymentPreferencesSettings,
  PaymentPreferencesSettingsInput,
  PersistentNotification,
  PersonalName,
  PersonalNameInput,
  PhoneNumber,
  PhoneNumberInput,
  PickForYouResponse,
  Product,
  ProductsQueryResult,
  PublishableKeys,
  Query,
  ResidentialAddress,
  SecretKey,
  ShopImage,
  ShopImageDetails,
  ShopProductDetail,
  ShopProductSupplier,
  ShopProductVariants,
  SpendAccountCarouselFinished,
  StartWalletCreationInput,
  StartWalletCreationResponse,
  Stash,
  StashMeta,
  StashMetaInput,
  StashTransaction,
  TaxObligationInput,
  TermsAndConditionsAcceptance,
  Transaction,
  TransactionMerchant,
  TransactionResponse,
  TransferPeerDetails,
  UpdateUserProfileInput,
  User,
  UserDetailChangeRequest,
  UserInitializationDetails,
  UserPermission,
  UserPermissionRequestInput,
  VerifyCreditCard,
  WithdrawStashInput,
} from '../generated';
import {
  AutoEnrolStatus,
  BankLinkedStatus,
  CardStatus,
  CashBackType,
  DrawdownWageMessageCode,
  EWalletSetupStatus,
  EWalletStatusReason,
  EventLogKind,
  HeroDollarClientType,
  HeroDollarReasonType,
  HeroDollarTransactionType,
  IdvProfileStatus,
  IdentityDocumentType,
  LoginType,
  NoTaxIdNumberReason,
  NotificationStatus,
  OrderProductType,
  OrderStatus,
  PaySplitType,
  StashStatus,
  TransactionOutcome,
  TransactionRecordType,
  TransactionState,
  UserDetailChangeRequestType,
  WalletNotificationType,
  WalletType,
} from '../generated';

export const anAccountTransferInput = (overrides?: Partial<AccountTransferInput>): AccountTransferInput => {
  return {
    accountName: overrides && overrides.hasOwnProperty('accountName') ? overrides.accountName! : 'explicabo',
    accountNumber: overrides && overrides.hasOwnProperty('accountNumber') ? overrides.accountNumber! : 'qui',
    amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : 5.28,
    bsb: overrides && overrides.hasOwnProperty('bsb') ? overrides.bsb! : 'sit',
    category: overrides && overrides.hasOwnProperty('category') ? overrides.category! : 'repudiandae',
    description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'consequatur',
    idempotencyKey: overrides && overrides.hasOwnProperty('idempotencyKey') ? overrides.idempotencyKey! : 'quo',
    reference: overrides && overrides.hasOwnProperty('reference') ? overrides.reference! : 'natus',
    senderName: overrides && overrides.hasOwnProperty('senderName') ? overrides.senderName! : 'sequi',
  };
};

export const anAddress = (overrides?: Partial<Address>): Address => {
  return {
    addressLine1: overrides && overrides.hasOwnProperty('addressLine1') ? overrides.addressLine1! : 'et',
    addressLine2: overrides && overrides.hasOwnProperty('addressLine2') ? overrides.addressLine2! : 'sed',
    addressLine3: overrides && overrides.hasOwnProperty('addressLine3') ? overrides.addressLine3! : 'quia',
    country: overrides && overrides.hasOwnProperty('country') ? overrides.country! : 'non',
    postcode: overrides && overrides.hasOwnProperty('postcode') ? overrides.postcode! : 'error',
    region: overrides && overrides.hasOwnProperty('region') ? overrides.region! : 'quo',
    townOrCity: overrides && overrides.hasOwnProperty('townOrCity') ? overrides.townOrCity! : 'vel',
  };
};

export const anAddressInput = (overrides?: Partial<AddressInput>): AddressInput => {
  return {
    addressLine1: overrides && overrides.hasOwnProperty('addressLine1') ? overrides.addressLine1! : 'suscipit',
    addressLine2: overrides && overrides.hasOwnProperty('addressLine2') ? overrides.addressLine2! : 'dolore',
    addressLine3: overrides && overrides.hasOwnProperty('addressLine3') ? overrides.addressLine3! : 'modi',
    country: overrides && overrides.hasOwnProperty('country') ? overrides.country! : 'autem',
    postcode: overrides && overrides.hasOwnProperty('postcode') ? overrides.postcode! : 'cupiditate',
    region: overrides && overrides.hasOwnProperty('region') ? overrides.region! : 'sunt',
    townOrCity: overrides && overrides.hasOwnProperty('townOrCity') ? overrides.townOrCity! : 'nam',
  };
};

export const anAddressInputV2 = (overrides?: Partial<AddressInputV2>): AddressInputV2 => {
  return {
    country: overrides && overrides.hasOwnProperty('country') ? overrides.country! : 'esse',
    postcode: overrides && overrides.hasOwnProperty('postcode') ? overrides.postcode! : 'rerum',
    region: overrides && overrides.hasOwnProperty('region') ? overrides.region! : 'qui',
    streetName: overrides && overrides.hasOwnProperty('streetName') ? overrides.streetName! : 'unde',
    streetNumber: overrides && overrides.hasOwnProperty('streetNumber') ? overrides.streetNumber! : 'perspiciatis',
    streetType: overrides && overrides.hasOwnProperty('streetType') ? overrides.streetType! : 'sit',
    townOrCity: overrides && overrides.hasOwnProperty('townOrCity') ? overrides.townOrCity! : 'atque',
    unitNumber: overrides && overrides.hasOwnProperty('unitNumber') ? overrides.unitNumber! : 'eum',
  };
};

export const anAddressInputV3 = (overrides?: Partial<AddressInputV3>): AddressInputV3 => {
  return {
    addressLine1: overrides && overrides.hasOwnProperty('addressLine1') ? overrides.addressLine1! : 'deleniti',
    country: overrides && overrides.hasOwnProperty('country') ? overrides.country! : 'aut',
    postcode: overrides && overrides.hasOwnProperty('postcode') ? overrides.postcode! : 'eligendi',
    region: overrides && overrides.hasOwnProperty('region') ? overrides.region! : 'dolores',
    streetName: overrides && overrides.hasOwnProperty('streetName') ? overrides.streetName! : 'eum',
    streetNumber: overrides && overrides.hasOwnProperty('streetNumber') ? overrides.streetNumber! : 'harum',
    streetType: overrides && overrides.hasOwnProperty('streetType') ? overrides.streetType! : 'pariatur',
    townOrCity: overrides && overrides.hasOwnProperty('townOrCity') ? overrides.townOrCity! : 'non',
    unitNumber: overrides && overrides.hasOwnProperty('unitNumber') ? overrides.unitNumber! : 'ea',
  };
};

export const anAutoEnrolInput = (overrides?: Partial<AutoEnrolInput>): AutoEnrolInput => {
  return {
    message: overrides && overrides.hasOwnProperty('message') ? overrides.message! : 'numquam',
    status: overrides && overrides.hasOwnProperty('status') ? overrides.status! : false,
  };
};

export const aBankAccount = (overrides?: Partial<BankAccount>): BankAccount => {
  return {
    accountName: overrides && overrides.hasOwnProperty('accountName') ? overrides.accountName! : 'et',
    accountNumber: overrides && overrides.hasOwnProperty('accountNumber') ? overrides.accountNumber! : 'voluptate',
    bsb: overrides && overrides.hasOwnProperty('bsb') ? overrides.bsb! : 'voluptatem',
    external_id: overrides && overrides.hasOwnProperty('external_id') ? overrides.external_id! : 'consequatur',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 6889,
  };
};

export const aBankLinkedInput = (overrides?: Partial<BankLinkedInput>): BankLinkedInput => {
  return {
    message: overrides && overrides.hasOwnProperty('message') ? overrides.message! : 'qui',
    status: overrides && overrides.hasOwnProperty('status') ? overrides.status! : false,
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

export const aCard = (overrides?: Partial<Card>): Card => {
  return {
    accountId: overrides && overrides.hasOwnProperty('accountId') ? overrides.accountId! : 'sapiente',
    cardToken: overrides && overrides.hasOwnProperty('cardToken') ? overrides.cardToken! : 'ratione',
    customerId: overrides && overrides.hasOwnProperty('customerId') ? overrides.customerId! : 'non',
    expiryDate: overrides && overrides.hasOwnProperty('expiryDate') ? overrides.expiryDate! : 'occaecati',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'praesentium',
    issuedDateTimeUtc:
      overrides && overrides.hasOwnProperty('issuedDateTimeUtc') ? overrides.issuedDateTimeUtc! : 'pariatur',
    lastFourDigits: overrides && overrides.hasOwnProperty('lastFourDigits') ? overrides.lastFourDigits! : 'et',
    nameOnCard: overrides && overrides.hasOwnProperty('nameOnCard') ? overrides.nameOnCard! : 'ut',
    status: overrides && overrides.hasOwnProperty('status') ? overrides.status! : CardStatus.Active,
  };
};

export const aCardMeta = (overrides?: Partial<CardMeta>): CardMeta => {
  return {
    contactless: overrides && overrides.hasOwnProperty('contactless') ? overrides.contactless! : true,
    designReference: overrides && overrides.hasOwnProperty('designReference') ? overrides.designReference! : 'dolorem',
    digitalWalletDetails:
      overrides && overrides.hasOwnProperty('digitalWalletDetails')
        ? overrides.digitalWalletDetails!
        : aDigitalWalletDetails(),
    frozen: overrides && overrides.hasOwnProperty('frozen') ? overrides.frozen! : true,
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'incidunt',
    lastFourDigits: overrides && overrides.hasOwnProperty('lastFourDigits') ? overrides.lastFourDigits! : 'nam',
    magStrip: overrides && overrides.hasOwnProperty('magStrip') ? overrides.magStrip! : true,
    mobileWalletPaymentEnabled:
      overrides && overrides.hasOwnProperty('mobileWalletPaymentEnabled')
        ? overrides.mobileWalletPaymentEnabled!
        : true,
    nameOnCard: overrides && overrides.hasOwnProperty('nameOnCard') ? overrides.nameOnCard! : 'et',
    pinEnabled: overrides && overrides.hasOwnProperty('pinEnabled') ? overrides.pinEnabled! : 'reiciendis',
    status: overrides && overrides.hasOwnProperty('status') ? overrides.status! : CardStatus.Active,
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

export const aCardRequestInput = (overrides?: Partial<CardRequestInput>): CardRequestInput => {
  return {
    idempotencyKey: overrides && overrides.hasOwnProperty('idempotencyKey') ? overrides.idempotencyKey! : 'laudantium',
    pin: overrides && overrides.hasOwnProperty('pin') ? overrides.pin! : 'rerum',
  };
};

export const aCashbackBank = (overrides?: Partial<CashbackBank>): CashbackBank => {
  return {
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 1693,
    name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'eaque',
    region: overrides && overrides.hasOwnProperty('region') ? overrides.region! : 'mollitia',
  };
};

export const aCashbackBankDetail = (overrides?: Partial<CashbackBankDetail>): CashbackBankDetail => {
  return {
    accountNumber: overrides && overrides.hasOwnProperty('accountNumber') ? overrides.accountNumber! : 'non',
    bsb: overrides && overrides.hasOwnProperty('bsb') ? overrides.bsb! : 'nisi',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 6856,
  };
};

export const aCashbackBankDetailInput = (overrides?: Partial<CashbackBankDetailInput>): CashbackBankDetailInput => {
  return {
    accountNumber: overrides && overrides.hasOwnProperty('accountNumber') ? overrides.accountNumber! : 'rerum',
    bsb: overrides && overrides.hasOwnProperty('bsb') ? overrides.bsb! : 'sint',
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

export const aCashbackCategory = (overrides?: Partial<CashbackCategory>): CashbackCategory => {
  return {
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'rerum',
    image: overrides && overrides.hasOwnProperty('image') ? overrides.image! : 'ipsa',
    name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'voluptatem',
  };
};

export const aCashbackDeleteCardInput = (overrides?: Partial<CashbackDeleteCardInput>): CashbackDeleteCardInput => {
  return {
    cardId: overrides && overrides.hasOwnProperty('cardId') ? overrides.cardId! : 4838,
  };
};

export const aCashbackEnrolCardInput = (overrides?: Partial<CashbackEnrolCardInput>): CashbackEnrolCardInput => {
  return {
    bankCode: overrides && overrides.hasOwnProperty('bankCode') ? overrides.bankCode! : 1194,
    cardData: overrides && overrides.hasOwnProperty('cardData') ? overrides.cardData! : 'voluptas',
    isDefault: overrides && overrides.hasOwnProperty('isDefault') ? overrides.isDefault! : true,
  };
};

export const aCashbackIntroductionContent = (
  overrides?: Partial<CashbackIntroductionContent>
): CashbackIntroductionContent => {
  return {
    step1: overrides && overrides.hasOwnProperty('step1') ? overrides.step1! : anIntroductionContent(),
    step2: overrides && overrides.hasOwnProperty('step2') ? overrides.step2! : anIntroductionContent(),
    step3: overrides && overrides.hasOwnProperty('step3') ? overrides.step3! : anIntroductionContent(),
  };
};

export const aCashbackOnboardStatus = (overrides?: Partial<CashbackOnboardStatus>): CashbackOnboardStatus => {
  return {
    hasCLOOnboarded: overrides && overrides.hasOwnProperty('hasCLOOnboarded') ? overrides.hasCLOOnboarded! : false,
  };
};

export const aCashbackTermsAndCondition = (
  overrides?: Partial<CashbackTermsAndCondition>
): CashbackTermsAndCondition => {
  return {
    boldText: overrides && overrides.hasOwnProperty('boldText') ? overrides.boldText! : 'dolor',
    boldTextVariant:
      overrides && overrides.hasOwnProperty('boldTextVariant') ? overrides.boldTextVariant! : 'consequatur',
    showListItemSymbol:
      overrides && overrides.hasOwnProperty('showListItemSymbol') ? overrides.showListItemSymbol! : true,
    text: overrides && overrides.hasOwnProperty('text') ? overrides.text! : 'dolores',
    textVariant: overrides && overrides.hasOwnProperty('textVariant') ? overrides.textVariant! : 'ratione',
    type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : 'non',
    url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : 'laboriosam',
  };
};

export const aCashbackTransaction = (overrides?: Partial<CashbackTransaction>): CashbackTransaction => {
  return {
    advertiserName: overrides && overrides.hasOwnProperty('advertiserName') ? overrides.advertiserName! : 'eveniet',
    amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : 2.41,
    created: overrides && overrides.hasOwnProperty('created') ? overrides.created! : 'qui',
    description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'non',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 8435,
    imageUrl: overrides && overrides.hasOwnProperty('imageUrl') ? overrides.imageUrl! : 'sunt',
    meta: overrides && overrides.hasOwnProperty('meta') ? overrides.meta! : aCashbackTransactionMeta(),
    offerId: overrides && overrides.hasOwnProperty('offerId') ? overrides.offerId! : 4847,
    purchaseAmount: overrides && overrides.hasOwnProperty('purchaseAmount') ? overrides.purchaseAmount! : 1.79,
    recordType: overrides && overrides.hasOwnProperty('recordType') ? overrides.recordType! : TransactionRecordType.In,
    state: overrides && overrides.hasOwnProperty('state') ? overrides.state! : TransactionState.Clear,
  };
};

export const aCashbackTransactionMeta = (overrides?: Partial<CashbackTransactionMeta>): CashbackTransactionMeta => {
  return {
    accountNumber: overrides && overrides.hasOwnProperty('accountNumber') ? overrides.accountNumber! : 'ad',
  };
};

export const aCashbackTransactions = (overrides?: Partial<CashbackTransactions>): CashbackTransactions => {
  return {
    pending: overrides && overrides.hasOwnProperty('pending') ? overrides.pending! : 5.77,
    total: overrides && overrides.hasOwnProperty('total') ? overrides.total! : 6.48,
    transactions:
      overrides && overrides.hasOwnProperty('transactions') ? overrides.transactions! : [aCashbackTransaction()],
  };
};

export const aCashbackTransactionsV2 = (overrides?: Partial<CashbackTransactionsV2>): CashbackTransactionsV2 => {
  return {
    confirmed: overrides && overrides.hasOwnProperty('confirmed') ? overrides.confirmed! : 8.13,
    pending: overrides && overrides.hasOwnProperty('pending') ? overrides.pending! : 7,
    total: overrides && overrides.hasOwnProperty('total') ? overrides.total! : 6.81,
    transactions:
      overrides && overrides.hasOwnProperty('transactions') ? overrides.transactions! : [aCashbackTransaction()],
  };
};

export const aCashbackUserInfo = (overrides?: Partial<CashbackUserInfo>): CashbackUserInfo => {
  return {
    autoEnrolMessage: overrides && overrides.hasOwnProperty('autoEnrolMessage') ? overrides.autoEnrolMessage! : 'ut',
    autoEnrolStatus:
      overrides && overrides.hasOwnProperty('autoEnrolStatus') ? overrides.autoEnrolStatus! : AutoEnrolStatus.Failed,
    bankLinkedMessage:
      overrides && overrides.hasOwnProperty('bankLinkedMessage') ? overrides.bankLinkedMessage! : 'ipsa',
    bankLinkedStatus:
      overrides && overrides.hasOwnProperty('bankLinkedStatus') ? overrides.bankLinkedStatus! : BankLinkedStatus.Failed,
    createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : 'doloremque',
    updatedAt: overrides && overrides.hasOwnProperty('updatedAt') ? overrides.updatedAt! : 'debitis',
  };
};

export const aCashbackUserToken = (overrides?: Partial<CashbackUserToken>): CashbackUserToken => {
  return {
    key: overrides && overrides.hasOwnProperty('key') ? overrides.key! : 'cupiditate',
    token: overrides && overrides.hasOwnProperty('token') ? overrides.token! : 'ut',
  };
};

export const aCloseStashPayload = (overrides?: Partial<CloseStashPayload>): CloseStashPayload => {
  return {
    result: overrides && overrides.hasOwnProperty('result') ? overrides.result! : true,
  };
};

export const aCounterpart = (overrides?: Partial<Counterpart>): Counterpart => {
  return {
    accountNumber: overrides && overrides.hasOwnProperty('accountNumber') ? overrides.accountNumber! : 'provident',
    bsb: overrides && overrides.hasOwnProperty('bsb') ? overrides.bsb! : 'beatae',
    name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'perspiciatis',
  };
};

export const aCreateStashInput = (overrides?: Partial<CreateStashInput>): CreateStashInput => {
  return {
    imageUrl: overrides && overrides.hasOwnProperty('imageUrl') ? overrides.imageUrl! : 'architecto',
    name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'possimus',
    targetAmount: overrides && overrides.hasOwnProperty('targetAmount') ? overrides.targetAmount! : 0.72,
  };
};

export const aCreateStripeClientTokenInput = (
  overrides?: Partial<CreateStripeClientTokenInput>
): CreateStripeClientTokenInput => {
  return {
    amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : 'cupiditate',
    currency: overrides && overrides.hasOwnProperty('currency') ? overrides.currency! : 'aspernatur',
  };
};

export const aCurrencyAmount = (overrides?: Partial<CurrencyAmount>): CurrencyAmount => {
  return {
    amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : 3.43,
    currency: overrides && overrides.hasOwnProperty('currency') ? overrides.currency! : 'voluptate',
  };
};

export const aCurrentUser = (overrides?: Partial<CurrentUser>): CurrentUser => {
  return {
    dateOfBirth: overrides && overrides.hasOwnProperty('dateOfBirth') ? overrides.dateOfBirth! : 'accusamus',
    eWalletSetupStatus:
      overrides && overrides.hasOwnProperty('eWalletSetupStatus')
        ? overrides.eWalletSetupStatus!
        : EWalletSetupStatus.Completed,
    eWalletStatusReason:
      overrides && overrides.hasOwnProperty('eWalletStatusReason')
        ? overrides.eWalletStatusReason!
        : EWalletStatusReason.Archived,
    email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'ea',
    firstName: overrides && overrides.hasOwnProperty('firstName') ? overrides.firstName! : 'illo',
    gender: overrides && overrides.hasOwnProperty('gender') ? overrides.gender! : 'rerum',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'inventore',
    lastName: overrides && overrides.hasOwnProperty('lastName') ? overrides.lastName! : 'qui',
    mailingAddress: overrides && overrides.hasOwnProperty('mailingAddress') ? overrides.mailingAddress! : anAddress(),
    middleName: overrides && overrides.hasOwnProperty('middleName') ? overrides.middleName! : 'sit',
    phoneNumber: overrides && overrides.hasOwnProperty('phoneNumber') ? overrides.phoneNumber! : aPhoneNumber(),
    preferredName: overrides && overrides.hasOwnProperty('preferredName') ? overrides.preferredName! : 'iusto',
    residentialAddress:
      overrides && overrides.hasOwnProperty('residentialAddress')
        ? overrides.residentialAddress!
        : aResidentialAddress(),
  };
};

export const aDepositStashInput = (overrides?: Partial<DepositStashInput>): DepositStashInput => {
  return {
    amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : 6.45,
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

export const aDiscountHistory = (overrides?: Partial<DiscountHistory>): DiscountHistory => {
  return {
    billableAmount: overrides && overrides.hasOwnProperty('billableAmount') ? overrides.billableAmount! : 0.54,
    createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : 'nobis',
    freightCost: overrides && overrides.hasOwnProperty('freightCost') ? overrides.freightCost! : 8.81,
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'et',
    memberId: overrides && overrides.hasOwnProperty('memberId') ? overrides.memberId! : 'exercitationem',
    name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'ut',
    orderDetails: overrides && overrides.hasOwnProperty('orderDetails') ? overrides.orderDetails! : [anOrderDetail()],
    status: overrides && overrides.hasOwnProperty('status') ? overrides.status! : OrderStatus.CancelAccepted,
    transactionFee: overrides && overrides.hasOwnProperty('transactionFee') ? overrides.transactionFee! : 3.49,
  };
};

export const aDiscountOrderHistoryResponse = (
  overrides?: Partial<DiscountOrderHistoryResponse>
): DiscountOrderHistoryResponse => {
  return {
    itemPerPage: overrides && overrides.hasOwnProperty('itemPerPage') ? overrides.itemPerPage! : 3583,
    items: overrides && overrides.hasOwnProperty('items') ? overrides.items! : [aDiscountHistory()],
    pageIndex: overrides && overrides.hasOwnProperty('pageIndex') ? overrides.pageIndex! : 4838,
    totalItems: overrides && overrides.hasOwnProperty('totalItems') ? overrides.totalItems! : 2949,
    totalPages: overrides && overrides.hasOwnProperty('totalPages') ? overrides.totalPages! : 7452,
  };
};

export const aDrawdown = (overrides?: Partial<Drawdown>): Drawdown => {
  return {
    data: overrides && overrides.hasOwnProperty('data') ? overrides.data! : aDrawdownTransaction(),
    message: overrides && overrides.hasOwnProperty('message') ? overrides.message! : 'enim',
    messageCode:
      overrides && overrides.hasOwnProperty('messageCode') ? overrides.messageCode! : DrawdownWageMessageCode.Accepted,
    status: overrides && overrides.hasOwnProperty('status') ? overrides.status! : 'voluptatem',
  };
};

export const aDrawdownTransaction = (overrides?: Partial<DrawdownTransaction>): DrawdownTransaction => {
  return {
    accountEmail: overrides && overrides.hasOwnProperty('accountEmail') ? overrides.accountEmail! : 'numquam',
    accountName: overrides && overrides.hasOwnProperty('accountName') ? overrides.accountName! : 'ut',
    accountNumber: overrides && overrides.hasOwnProperty('accountNumber') ? overrides.accountNumber! : 'asperiores',
    amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : 'quas',
    bsb: overrides && overrides.hasOwnProperty('bsb') ? overrides.bsb! : 'voluptates',
    createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : 'ex',
    expectedPayDate: overrides && overrides.hasOwnProperty('expectedPayDate') ? overrides.expectedPayDate! : 'quis',
    transactionId: overrides && overrides.hasOwnProperty('transactionId') ? overrides.transactionId! : 'dolor',
  };
};

export const aDrawdownWagePayload = (overrides?: Partial<DrawdownWagePayload>): DrawdownWagePayload => {
  return {
    drawdown: overrides && overrides.hasOwnProperty('drawdown') ? overrides.drawdown! : aDrawdown(),
  };
};

export const anEWalletDetails = (overrides?: Partial<EWalletDetails>): EWalletDetails => {
  return {
    accountName: overrides && overrides.hasOwnProperty('accountName') ? overrides.accountName! : 'molestiae',
    accountNumber: overrides && overrides.hasOwnProperty('accountNumber') ? overrides.accountNumber! : 'tempore',
    availableBalance: overrides && overrides.hasOwnProperty('availableBalance') ? overrides.availableBalance! : 8.37,
    bsb: overrides && overrides.hasOwnProperty('bsb') ? overrides.bsb! : 'tempora',
    totalBalance: overrides && overrides.hasOwnProperty('totalBalance') ? overrides.totalBalance! : 2.59,
  };
};

export const anEWalletSetupDetailsInput = (overrides?: Partial<EWalletSetupDetailsInput>): EWalletSetupDetailsInput => {
  return {
    dateOfBirth: overrides && overrides.hasOwnProperty('dateOfBirth') ? overrides.dateOfBirth! : 'libero',
    firstName: overrides && overrides.hasOwnProperty('firstName') ? overrides.firstName! : 'qui',
    gender: overrides && overrides.hasOwnProperty('gender') ? overrides.gender! : 'voluptatibus',
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
      overrides && overrides.hasOwnProperty('identityCardNumber') ? overrides.identityCardNumber! : 'nostrum',
    identityDocumentIssuingState:
      overrides && overrides.hasOwnProperty('identityDocumentIssuingState')
        ? overrides.identityDocumentIssuingState!
        : 'dicta',
    identityDocumentNumber:
      overrides && overrides.hasOwnProperty('identityDocumentNumber') ? overrides.identityDocumentNumber! : 'aut',
    identityDocumentType:
      overrides && overrides.hasOwnProperty('identityDocumentType')
        ? overrides.identityDocumentType!
        : IdentityDocumentType.DrivingLicense,
    identityVerificationTermsConsentTimestamp:
      overrides && overrides.hasOwnProperty('identityVerificationTermsConsentTimestamp')
        ? overrides.identityVerificationTermsConsentTimestamp!
        : 'nihil',
    lastName: overrides && overrides.hasOwnProperty('lastName') ? overrides.lastName! : 'quas',
    mailingAddress:
      overrides && overrides.hasOwnProperty('mailingAddress') ? overrides.mailingAddress! : anAddressInput(),
    middleName: overrides && overrides.hasOwnProperty('middleName') ? overrides.middleName! : 'dolorem',
    phoneNumber: overrides && overrides.hasOwnProperty('phoneNumber') ? overrides.phoneNumber! : aPhoneNumberInput(),
    privacyPolicyConsentTimestamp:
      overrides && overrides.hasOwnProperty('privacyPolicyConsentTimestamp')
        ? overrides.privacyPolicyConsentTimestamp!
        : 'tempora',
    residentialAddress:
      overrides && overrides.hasOwnProperty('residentialAddress') ? overrides.residentialAddress! : anAddressInput(),
    taxObligations:
      overrides && overrides.hasOwnProperty('taxObligations') ? overrides.taxObligations! : [aTaxObligationInput()],
    termsConditionsConsentTimestamp:
      overrides && overrides.hasOwnProperty('termsConditionsConsentTimestamp')
        ? overrides.termsConditionsConsentTimestamp!
        : 'cum',
  };
};

export const anEWalletSetupDetailsInputV2 = (
  overrides?: Partial<EWalletSetupDetailsInputV2>
): EWalletSetupDetailsInputV2 => {
  return {
    dateOfBirth: overrides && overrides.hasOwnProperty('dateOfBirth') ? overrides.dateOfBirth! : 'voluptatem',
    firstName: overrides && overrides.hasOwnProperty('firstName') ? overrides.firstName! : 'qui',
    gender: overrides && overrides.hasOwnProperty('gender') ? overrides.gender! : 'similique',
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
      overrides && overrides.hasOwnProperty('identityCardNumber') ? overrides.identityCardNumber! : 'quo',
    identityDocumentIssuingState:
      overrides && overrides.hasOwnProperty('identityDocumentIssuingState')
        ? overrides.identityDocumentIssuingState!
        : 'non',
    identityDocumentNumber:
      overrides && overrides.hasOwnProperty('identityDocumentNumber') ? overrides.identityDocumentNumber! : 'cum',
    identityDocumentType:
      overrides && overrides.hasOwnProperty('identityDocumentType')
        ? overrides.identityDocumentType!
        : IdentityDocumentType.DrivingLicense,
    identityVerificationTermsConsentTimestamp:
      overrides && overrides.hasOwnProperty('identityVerificationTermsConsentTimestamp')
        ? overrides.identityVerificationTermsConsentTimestamp!
        : 'et',
    lastName: overrides && overrides.hasOwnProperty('lastName') ? overrides.lastName! : 'minus',
    mailingAddress:
      overrides && overrides.hasOwnProperty('mailingAddress') ? overrides.mailingAddress! : anAddressInput(),
    middleName: overrides && overrides.hasOwnProperty('middleName') ? overrides.middleName! : 'recusandae',
    phoneNumber: overrides && overrides.hasOwnProperty('phoneNumber') ? overrides.phoneNumber! : aPhoneNumberInput(),
    privacyPolicyConsentTimestamp:
      overrides && overrides.hasOwnProperty('privacyPolicyConsentTimestamp')
        ? overrides.privacyPolicyConsentTimestamp!
        : 'qui',
    residentialAddress:
      overrides && overrides.hasOwnProperty('residentialAddress') ? overrides.residentialAddress! : anAddressInputV2(),
    taxObligations:
      overrides && overrides.hasOwnProperty('taxObligations') ? overrides.taxObligations! : [aTaxObligationInput()],
    termsConditionsConsentTimestamp:
      overrides && overrides.hasOwnProperty('termsConditionsConsentTimestamp')
        ? overrides.termsConditionsConsentTimestamp!
        : 'eum',
  };
};

export const anEhCardBinRange = (overrides?: Partial<EhCardBinRange>): EhCardBinRange => {
  return {
    from: overrides && overrides.hasOwnProperty('from') ? overrides.from! : 'labore',
    to: overrides && overrides.hasOwnProperty('to') ? overrides.to! : 'quidem',
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

export const anEhMembershipInput = (overrides?: Partial<EhMembershipInput>): EhMembershipInput => {
  return {
    memberId: overrides && overrides.hasOwnProperty('memberId') ? overrides.memberId! : 'voluptate',
    orgId: overrides && overrides.hasOwnProperty('orgId') ? overrides.orgId! : 'accusantium',
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

export const anEhProfilePatchRequest = (overrides?: Partial<EhProfilePatchRequest>): EhProfilePatchRequest => {
  return {
    avatarUrl: overrides && overrides.hasOwnProperty('avatarUrl') ? overrides.avatarUrl! : 'et',
    countryCode: overrides && overrides.hasOwnProperty('countryCode') ? overrides.countryCode! : 'illum',
    email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'molestias',
    firstName: overrides && overrides.hasOwnProperty('firstName') ? overrides.firstName! : 'est',
    lastName: overrides && overrides.hasOwnProperty('lastName') ? overrides.lastName! : 'nemo',
    phoneNumber: overrides && overrides.hasOwnProperty('phoneNumber') ? overrides.phoneNumber! : 'odio',
    stateCode: overrides && overrides.hasOwnProperty('stateCode') ? overrides.stateCode! : 'adipisci',
  };
};

export const anEventLogPayloadTuple = (overrides?: Partial<EventLogPayloadTuple>): EventLogPayloadTuple => {
  return {
    key: overrides && overrides.hasOwnProperty('key') ? overrides.key! : 'veniam',
    value: overrides && overrides.hasOwnProperty('value') ? overrides.value! : 'earum',
  };
};

export const anEventLogRequest = (overrides?: Partial<EventLogRequest>): EventLogRequest => {
  return {
    kind: overrides && overrides.hasOwnProperty('kind') ? overrides.kind! : EventLogKind.Instapay,
    payload: overrides && overrides.hasOwnProperty('payload') ? overrides.payload! : [anEventLogPayloadTuple()],
  };
};

export const aFinancialTransaction = (overrides?: Partial<FinancialTransaction>): FinancialTransaction => {
  return {
    cardId: overrides && overrides.hasOwnProperty('cardId') ? overrides.cardId! : 'qui',
    currencyAmount:
      overrides && overrides.hasOwnProperty('currencyAmount') ? overrides.currencyAmount! : aCurrencyAmount(),
    dateTimeUTC: overrides && overrides.hasOwnProperty('dateTimeUTC') ? overrides.dateTimeUTC! : 'sapiente',
    description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'possimus',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'magni',
    merchant: overrides && overrides.hasOwnProperty('merchant') ? overrides.merchant! : aTransactionMerchant(),
    pending: overrides && overrides.hasOwnProperty('pending') ? overrides.pending! : false,
    reference: overrides && overrides.hasOwnProperty('reference') ? overrides.reference! : 'sunt',
    transferPeerDetails:
      overrides && overrides.hasOwnProperty('transferPeerDetails')
        ? overrides.transferPeerDetails!
        : aTransferPeerDetails(),
    type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : 'quia',
  };
};

export const aHeroDollarBalance = (overrides?: Partial<HeroDollarBalance>): HeroDollarBalance => {
  return {
    balance: overrides && overrides.hasOwnProperty('balance') ? overrides.balance! : 4.71,
  };
};

export const aHeroDollarRedemptionFee = (overrides?: Partial<HeroDollarRedemptionFee>): HeroDollarRedemptionFee => {
  return {
    fee: overrides && overrides.hasOwnProperty('fee') ? overrides.fee! : 2.13,
  };
};

export const aHeroDollarRedemptionFeeResponse = (
  overrides?: Partial<HeroDollarRedemptionFeeResponse>
): HeroDollarRedemptionFeeResponse => {
  return {
    data: overrides && overrides.hasOwnProperty('data') ? overrides.data! : aHeroDollarRedemptionFee(),
  };
};

export const aHeroDollarTransactionDetail = (
  overrides?: Partial<HeroDollarTransactionDetail>
): HeroDollarTransactionDetail => {
  return {
    amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : 8.93,
    clientType:
      overrides && overrides.hasOwnProperty('clientType') ? overrides.clientType! : HeroDollarClientType.EbfShaype,
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'minus',
    merchant_name: overrides && overrides.hasOwnProperty('merchant_name') ? overrides.merchant_name! : 'dignissimos',
    organization_name:
      overrides && overrides.hasOwnProperty('organization_name') ? overrides.organization_name! : 'rerum',
    reason: overrides && overrides.hasOwnProperty('reason') ? overrides.reason! : 'quisquam',
    reasonType:
      overrides && overrides.hasOwnProperty('reasonType')
        ? overrides.reasonType!
        : HeroDollarReasonType.AssistedImplementation,
    recognised_by: overrides && overrides.hasOwnProperty('recognised_by') ? overrides.recognised_by! : 'nisi',
    refId: overrides && overrides.hasOwnProperty('refId') ? overrides.refId! : 'repellendus',
    transactionTimeUtc:
      overrides && overrides.hasOwnProperty('transactionTimeUtc') ? overrides.transactionTimeUtc! : 'corporis',
    transactionType:
      overrides && overrides.hasOwnProperty('transactionType')
        ? overrides.transactionType!
        : HeroDollarTransactionType.Deduction,
  };
};

export const aHeroDollarTransactionItem = (
  overrides?: Partial<HeroDollarTransactionItem>
): HeroDollarTransactionItem => {
  return {
    amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : 2.08,
    clientType:
      overrides && overrides.hasOwnProperty('clientType') ? overrides.clientType! : HeroDollarClientType.EbfShaype,
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'est',
    reason: overrides && overrides.hasOwnProperty('reason') ? overrides.reason! : 'soluta',
    reasonType:
      overrides && overrides.hasOwnProperty('reasonType')
        ? overrides.reasonType!
        : HeroDollarReasonType.AssistedImplementation,
    refId: overrides && overrides.hasOwnProperty('refId') ? overrides.refId! : 'quis',
    transactionTimeUtc:
      overrides && overrides.hasOwnProperty('transactionTimeUtc') ? overrides.transactionTimeUtc! : 'illum',
    transactionType:
      overrides && overrides.hasOwnProperty('transactionType')
        ? overrides.transactionType!
        : HeroDollarTransactionType.Deduction,
  };
};

export const aHeroDollarTransactions = (overrides?: Partial<HeroDollarTransactions>): HeroDollarTransactions => {
  return {
    itemPerPage: overrides && overrides.hasOwnProperty('itemPerPage') ? overrides.itemPerPage! : 8109,
    items: overrides && overrides.hasOwnProperty('items') ? overrides.items! : [aHeroDollarTransactionItem()],
    pageIndex: overrides && overrides.hasOwnProperty('pageIndex') ? overrides.pageIndex! : 6350,
    totalItems: overrides && overrides.hasOwnProperty('totalItems') ? overrides.totalItems! : 7446,
    totalPages: overrides && overrides.hasOwnProperty('totalPages') ? overrides.totalPages! : 872,
  };
};

export const anIdvInitiatedResponse = (overrides?: Partial<IdvInitiatedResponse>): IdvInitiatedResponse => {
  return {
    applicantId: overrides && overrides.hasOwnProperty('applicantId') ? overrides.applicantId! : 'sunt',
    idvToken: overrides && overrides.hasOwnProperty('idvToken') ? overrides.idvToken! : 'similique',
    user: overrides && overrides.hasOwnProperty('user') ? overrides.user! : aUser(),
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
    advertiserAboutUs:
      overrides && overrides.hasOwnProperty('advertiserAboutUs') ? overrides.advertiserAboutUs! : 'est',
    advertiserId: overrides && overrides.hasOwnProperty('advertiserId') ? overrides.advertiserId! : 'ut',
    advertiserName: overrides && overrides.hasOwnProperty('advertiserName') ? overrides.advertiserName! : 'voluptatem',
    cashback: overrides && overrides.hasOwnProperty('cashback') ? overrides.cashback! : 'quas',
    category: overrides && overrides.hasOwnProperty('category') ? overrides.category! : 'inventore',
    categoryId: overrides && overrides.hasOwnProperty('categoryId') ? overrides.categoryId! : 'non',
    coverShotUrl: overrides && overrides.hasOwnProperty('coverShotUrl') ? overrides.coverShotUrl! : 'aut',
    description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'accusantium',
    howItWorks: overrides && overrides.hasOwnProperty('howItWorks') ? overrides.howItWorks! : 'fugit',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'qui',
    locations: overrides && overrides.hasOwnProperty('locations') ? overrides.locations! : [anInStoreOfferLocation()],
    logo: overrides && overrides.hasOwnProperty('logo') ? overrides.logo! : 'qui',
    phoneNumber: overrides && overrides.hasOwnProperty('phoneNumber') ? overrides.phoneNumber! : 'est',
    ratingScore: overrides && overrides.hasOwnProperty('ratingScore') ? overrides.ratingScore! : 4.24,
    searchTag: overrides && overrides.hasOwnProperty('searchTag') ? overrides.searchTag! : 'soluta',
    termsAndConditions:
      overrides && overrides.hasOwnProperty('termsAndConditions') ? overrides.termsAndConditions! : 'ullam',
    title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'asperiores',
    website: overrides && overrides.hasOwnProperty('website') ? overrides.website! : 'hic',
  };
};

export const anInStoreOfferLocation = (overrides?: Partial<InStoreOfferLocation>): InStoreOfferLocation => {
  return {
    address: overrides && overrides.hasOwnProperty('address') ? overrides.address! : 'temporibus',
    bearing: overrides && overrides.hasOwnProperty('bearing') ? overrides.bearing! : 6.68,
    distance: overrides && overrides.hasOwnProperty('distance') ? overrides.distance! : 5.01,
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'fuga',
    latitude: overrides && overrides.hasOwnProperty('latitude') ? overrides.latitude! : 'cupiditate',
    longitude: overrides && overrides.hasOwnProperty('longitude') ? overrides.longitude! : 'vitae',
  };
};

export const anInStoreOffersResponse = (overrides?: Partial<InStoreOffersResponse>): InStoreOffersResponse => {
  return {
    itemPerPage: overrides && overrides.hasOwnProperty('itemPerPage') ? overrides.itemPerPage! : 9930,
    items: overrides && overrides.hasOwnProperty('items') ? overrides.items! : [anInStoreOffer()],
    pageIndex: overrides && overrides.hasOwnProperty('pageIndex') ? overrides.pageIndex! : 5671,
    totalItems: overrides && overrides.hasOwnProperty('totalItems') ? overrides.totalItems! : 1458,
    totalPages: overrides && overrides.hasOwnProperty('totalPages') ? overrides.totalPages! : 9121,
  };
};

export const anInstapayBankAccount = (overrides?: Partial<InstapayBankAccount>): InstapayBankAccount => {
  return {
    accountName: overrides && overrides.hasOwnProperty('accountName') ? overrides.accountName! : 'aut',
    accountNumber: overrides && overrides.hasOwnProperty('accountNumber') ? overrides.accountNumber! : 'qui',
    bsb: overrides && overrides.hasOwnProperty('bsb') ? overrides.bsb! : 'qui',
    external_id: overrides && overrides.hasOwnProperty('external_id') ? overrides.external_id! : 'commodi',
    fee: overrides && overrides.hasOwnProperty('fee') ? overrides.fee! : 8.18,
  };
};

export const anInstapayFee = (overrides?: Partial<InstapayFee>): InstapayFee => {
  return {
    fee: overrides && overrides.hasOwnProperty('fee') ? overrides.fee! : 9970,
  };
};

export const anInstapayHistory = (overrides?: Partial<InstapayHistory>): InstapayHistory => {
  return {
    abaRef: overrides && overrides.hasOwnProperty('abaRef') ? overrides.abaRef! : 'quo',
    adminFee: overrides && overrides.hasOwnProperty('adminFee') ? overrides.adminFee! : 9.93,
    amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : 2.45,
    createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : 'nihil',
    feeType: overrides && overrides.hasOwnProperty('feeType') ? overrides.feeType! : 'eos',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'impedit',
    membership: overrides && overrides.hasOwnProperty('membership') ? overrides.membership! : anEhMembership(),
    status: overrides && overrides.hasOwnProperty('status') ? overrides.status! : 'nemo',
  };
};

export const anInstapayInfo = (overrides?: Partial<InstapayInfo>): InstapayInfo => {
  return {
    available: overrides && overrides.hasOwnProperty('available') ? overrides.available! : 2277,
    deduction: overrides && overrides.hasOwnProperty('deduction') ? overrides.deduction! : anInstapayInfoField(),
    leaveDays: overrides && overrides.hasOwnProperty('leaveDays') ? overrides.leaveDays! : 3411,
    membership: overrides && overrides.hasOwnProperty('membership') ? overrides.membership! : anEhMembership(),
    payPeriodCompletedDays:
      overrides && overrides.hasOwnProperty('payPeriodCompletedDays') ? overrides.payPeriodCompletedDays! : 3500,
    payPeriodDays: overrides && overrides.hasOwnProperty('payPeriodDays') ? overrides.payPeriodDays! : 5337,
    payRate: overrides && overrides.hasOwnProperty('payRate') ? overrides.payRate! : anInstapayInfoField(),
  };
};

export const anInstapayInfoField = (overrides?: Partial<InstapayInfoField>): InstapayInfoField => {
  return {
    displayName: overrides && overrides.hasOwnProperty('displayName') ? overrides.displayName! : 'voluptatum',
    unit: overrides && overrides.hasOwnProperty('unit') ? overrides.unit! : 'consequatur',
    value: overrides && overrides.hasOwnProperty('value') ? overrides.value! : 3348,
  };
};

export const anInstapayUsageVerification = (
  overrides?: Partial<InstapayUsageVerification>
): InstapayUsageVerification => {
  return {
    memberNotUsedInstapay:
      overrides && overrides.hasOwnProperty('memberNotUsedInstapay') ? overrides.memberNotUsedInstapay! : false,
  };
};

export const anIntroductionContent = (overrides?: Partial<IntroductionContent>): IntroductionContent => {
  return {
    heading: overrides && overrides.hasOwnProperty('heading') ? overrides.heading! : 'dolor',
    verbiage: overrides && overrides.hasOwnProperty('verbiage') ? overrides.verbiage! : 'porro',
  };
};

export const aMakePaymentItem = (overrides?: Partial<MakePaymentItem>): MakePaymentItem => {
  return {
    quantity: overrides && overrides.hasOwnProperty('quantity') ? overrides.quantity! : 256,
    variantCode: overrides && overrides.hasOwnProperty('variantCode') ? overrides.variantCode! : 'beatae',
  };
};

export const aMakePaymentPaymentMethod = (overrides?: Partial<MakePaymentPaymentMethod>): MakePaymentPaymentMethod => {
  return {
    creditCard: overrides && overrides.hasOwnProperty('creditCard') ? overrides.creditCard! : 'et',
    heroDollars: overrides && overrides.hasOwnProperty('heroDollars') ? overrides.heroDollars! : 'adipisci',
    heroPoints: overrides && overrides.hasOwnProperty('heroPoints') ? overrides.heroPoints! : 'eveniet',
    instapay: overrides && overrides.hasOwnProperty('instapay') ? overrides.instapay! : 'vero',
  };
};

export const aMakePaymentResponse = (overrides?: Partial<MakePaymentResponse>): MakePaymentResponse => {
  return {
    billableAmount: overrides && overrides.hasOwnProperty('billableAmount') ? overrides.billableAmount! : 1.42,
    createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : 'et',
    freightCost: overrides && overrides.hasOwnProperty('freightCost') ? overrides.freightCost! : 5.7,
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'quibusdam',
    ipAddress: overrides && overrides.hasOwnProperty('ipAddress') ? overrides.ipAddress! : 'et',
    memberId: overrides && overrides.hasOwnProperty('memberId') ? overrides.memberId! : 'porro',
    name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'ut',
    status: overrides && overrides.hasOwnProperty('status') ? overrides.status! : 'et',
    transactionFee: overrides && overrides.hasOwnProperty('transactionFee') ? overrides.transactionFee! : 3.69,
    type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : 'est',
  };
};

export const aMinSupportVersion = (overrides?: Partial<MinSupportVersion>): MinSupportVersion => {
  return {
    benefits: overrides && overrides.hasOwnProperty('benefits') ? overrides.benefits! : aBenefitsMinSupportVersion(),
  };
};

export const aMutation = (overrides?: Partial<Mutation>): Mutation => {
  return {
    accountTransfer:
      overrides && overrides.hasOwnProperty('accountTransfer') ? overrides.accountTransfer! : aTransactionResponse(),
    activateCard: overrides && overrides.hasOwnProperty('activateCard') ? overrides.activateCard! : true,
    cancelStripePayment:
      overrides && overrides.hasOwnProperty('cancelStripePayment') ? overrides.cancelStripePayment! : false,
    card: overrides && overrides.hasOwnProperty('card') ? overrides.card! : true,
    cashbackAcceptTermsAndConditions:
      overrides && overrides.hasOwnProperty('cashbackAcceptTermsAndConditions')
        ? overrides.cashbackAcceptTermsAndConditions!
        : aTermsAndConditionsAcceptance(),
    cashbackDeleteCard:
      overrides && overrides.hasOwnProperty('cashbackDeleteCard') ? overrides.cashbackDeleteCard! : true,
    cashbackEnrolCard:
      overrides && overrides.hasOwnProperty('cashbackEnrolCard') ? overrides.cashbackEnrolCard! : aCashbackCard(),
    cashbackOnboardUser:
      overrides && overrides.hasOwnProperty('cashbackOnboardUser') ? overrides.cashbackOnboardUser! : true,
    cashbackRegisterUser:
      overrides && overrides.hasOwnProperty('cashbackRegisterUser') ? overrides.cashbackRegisterUser! : false,
    cashbackUpdateAutoEnrol:
      overrides && overrides.hasOwnProperty('cashbackUpdateAutoEnrol') ? overrides.cashbackUpdateAutoEnrol! : true,
    cashbackUpdateBankDetails:
      overrides && overrides.hasOwnProperty('cashbackUpdateBankDetails') ? overrides.cashbackUpdateBankDetails! : true,
    cashbackUpdateBankLinked:
      overrides && overrides.hasOwnProperty('cashbackUpdateBankLinked') ? overrides.cashbackUpdateBankLinked! : true,
    clearPersistentNotification:
      overrides && overrides.hasOwnProperty('clearPersistentNotification')
        ? overrides.clearPersistentNotification!
        : true,
    closeStash: overrides && overrides.hasOwnProperty('closeStash') ? overrides.closeStash! : aCloseStashPayload(),
    createStash: overrides && overrides.hasOwnProperty('createStash') ? overrides.createStash! : false,
    createStripeClientToken:
      overrides && overrides.hasOwnProperty('createStripeClientToken')
        ? overrides.createStripeClientToken!
        : aPaymentClientToken(),
    depositStash: overrides && overrides.hasOwnProperty('depositStash') ? overrides.depositStash! : false,
    drawdownWage: overrides && overrides.hasOwnProperty('drawdownWage') ? overrides.drawdownWage! : false,
    drawdownWageV2:
      overrides && overrides.hasOwnProperty('drawdownWageV2') ? overrides.drawdownWageV2! : aDrawdownWagePayload(),
    eventLog: overrides && overrides.hasOwnProperty('eventLog') ? overrides.eventLog! : 'dolores',
    finishSpendAccountCarousel:
      overrides && overrides.hasOwnProperty('finishSpendAccountCarousel')
        ? overrides.finishSpendAccountCarousel!
        : false,
    initiateEWalletSetup:
      overrides && overrides.hasOwnProperty('initiateEWalletSetup') ? overrides.initiateEWalletSetup! : aUser(),
    initiateEWalletSetupV2:
      overrides && overrides.hasOwnProperty('initiateEWalletSetupV2') ? overrides.initiateEWalletSetupV2! : aUser(),
    initiateEWalletSetupV3:
      overrides && overrides.hasOwnProperty('initiateEWalletSetupV3') ? overrides.initiateEWalletSetupV3! : false,
    mailingAddress: overrides && overrides.hasOwnProperty('mailingAddress') ? overrides.mailingAddress! : true,
    makePayment: overrides && overrides.hasOwnProperty('makePayment') ? overrides.makePayment! : aMakePaymentResponse(),
    makePaymentV2:
      overrides && overrides.hasOwnProperty('makePaymentV2') ? overrides.makePaymentV2! : aMakePaymentResponse(),
    makeStripePayment:
      overrides && overrides.hasOwnProperty('makeStripePayment')
        ? overrides.makeStripePayment!
        : aMakePaymentResponse(),
    patchProfile: overrides && overrides.hasOwnProperty('patchProfile') ? overrides.patchProfile! : anEhProfile(),
    payAccount: overrides && overrides.hasOwnProperty('payAccount') ? overrides.payAccount! : false,
    requestNewCard: overrides && overrides.hasOwnProperty('requestNewCard') ? overrides.requestNewCard! : false,
    saveWalletSetup:
      overrides && overrides.hasOwnProperty('saveWalletSetup') ? overrides.saveWalletSetup! : anIdvInitiatedResponse(),
    seenPayWithHDCarousel:
      overrides && overrides.hasOwnProperty('seenPayWithHDCarousel') ? overrides.seenPayWithHDCarousel! : true,
    sendOtpToCurrentUser:
      overrides && overrides.hasOwnProperty('sendOtpToCurrentUser') ? overrides.sendOtpToCurrentUser! : aPhoneNumber(),
    setStashMeta: overrides && overrides.hasOwnProperty('setStashMeta') ? overrides.setStashMeta! : true,
    startWalletCreation:
      overrides && overrides.hasOwnProperty('startWalletCreation')
        ? overrides.startWalletCreation!
        : aStartWalletCreationResponse(),
    updateCardMeta: overrides && overrides.hasOwnProperty('updateCardMeta') ? overrides.updateCardMeta! : false,
    updateCardPIN: overrides && overrides.hasOwnProperty('updateCardPIN') ? overrides.updateCardPIN! : true,
    updatePaymentPreferenceSettings:
      overrides && overrides.hasOwnProperty('updatePaymentPreferenceSettings')
        ? overrides.updatePaymentPreferenceSettings!
        : aPaymentPreferencesSettings(),
    updateUserProfile:
      overrides && overrides.hasOwnProperty('updateUserProfile') ? overrides.updateUserProfile! : false,
    withdrawStash: overrides && overrides.hasOwnProperty('withdrawStash') ? overrides.withdrawStash! : false,
  };
};

export const anOemProvisioningData = (overrides?: Partial<OemProvisioningData>): OemProvisioningData => {
  return {
    cardHolderName: overrides && overrides.hasOwnProperty('cardHolderName') ? overrides.cardHolderName! : 'quis',
    cardToken: overrides && overrides.hasOwnProperty('cardToken') ? overrides.cardToken! : 'odit',
    expiryDate: overrides && overrides.hasOwnProperty('expiryDate') ? overrides.expiryDate! : 'blanditiis',
    otp: overrides && overrides.hasOwnProperty('otp') ? overrides.otp! : 'aperiam',
  };
};

export const anOnlineOffer = (overrides?: Partial<OnlineOffer>): OnlineOffer => {
  return {
    cashback: overrides && overrides.hasOwnProperty('cashback') ? overrides.cashback! : 'numquam',
    category: overrides && overrides.hasOwnProperty('category') ? overrides.category! : 'nulla',
    categoryId: overrides && overrides.hasOwnProperty('categoryId') ? overrides.categoryId! : 1280,
    description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'labore',
    howItWorks: overrides && overrides.hasOwnProperty('howItWorks') ? overrides.howItWorks! : 'minima',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'consectetur',
    imageUrl: overrides && overrides.hasOwnProperty('imageUrl') ? overrides.imageUrl! : 'eligendi',
    isCardLinkedOffer:
      overrides && overrides.hasOwnProperty('isCardLinkedOffer') ? overrides.isCardLinkedOffer! : false,
    isFavourite: overrides && overrides.hasOwnProperty('isFavourite') ? overrides.isFavourite! : false,
    logo: overrides && overrides.hasOwnProperty('logo') ? overrides.logo! : 'aliquam',
    searchTag: overrides && overrides.hasOwnProperty('searchTag') ? overrides.searchTag! : 'et',
    supplierAboutUs: overrides && overrides.hasOwnProperty('supplierAboutUs') ? overrides.supplierAboutUs! : 'cum',
    supplierName: overrides && overrides.hasOwnProperty('supplierName') ? overrides.supplierName! : 'non',
    termsAndConditions:
      overrides && overrides.hasOwnProperty('termsAndConditions') ? overrides.termsAndConditions! : 'sed',
    title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'et',
    trackingUrl: overrides && overrides.hasOwnProperty('trackingUrl') ? overrides.trackingUrl! : 'eveniet',
    type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : CashBackType.Instore,
  };
};

export const anOnlineOffersResponse = (overrides?: Partial<OnlineOffersResponse>): OnlineOffersResponse => {
  return {
    itemPerPage: overrides && overrides.hasOwnProperty('itemPerPage') ? overrides.itemPerPage! : 440,
    items: overrides && overrides.hasOwnProperty('items') ? overrides.items! : [anOnlineOffer()],
    pageIndex: overrides && overrides.hasOwnProperty('pageIndex') ? overrides.pageIndex! : 2396,
    totalItems: overrides && overrides.hasOwnProperty('totalItems') ? overrides.totalItems! : 9511,
    totalPages: overrides && overrides.hasOwnProperty('totalPages') ? overrides.totalPages! : 565,
  };
};

export const anOrderDetail = (overrides?: Partial<OrderDetail>): OrderDetail => {
  return {
    billableAmount: overrides && overrides.hasOwnProperty('billableAmount') ? overrides.billableAmount! : 5.13,
    currency: overrides && overrides.hasOwnProperty('currency') ? overrides.currency! : 'ratione',
    discount: overrides && overrides.hasOwnProperty('discount') ? overrides.discount! : 3.98,
    discountPriceInPoints:
      overrides && overrides.hasOwnProperty('discountPriceInPoints') ? overrides.discountPriceInPoints! : 2124,
    freightCost: overrides && overrides.hasOwnProperty('freightCost') ? overrides.freightCost! : 6.96,
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'architecto',
    price: overrides && overrides.hasOwnProperty('price') ? overrides.price! : 9.66,
    priceInPoints: overrides && overrides.hasOwnProperty('priceInPoints') ? overrides.priceInPoints! : 8743,
    productVariant:
      overrides && overrides.hasOwnProperty('productVariant') ? overrides.productVariant! : anOrderProductVariant(),
    purchaseItems:
      overrides && overrides.hasOwnProperty('purchaseItems') ? overrides.purchaseItems! : [anOrderPurchaseItem()],
    quantity: overrides && overrides.hasOwnProperty('quantity') ? overrides.quantity! : 2559,
    status: overrides && overrides.hasOwnProperty('status') ? overrides.status! : OrderStatus.CancelAccepted,
    transactionFee: overrides && overrides.hasOwnProperty('transactionFee') ? overrides.transactionFee! : 3.26,
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
    expiredAt: overrides && overrides.hasOwnProperty('expiredAt') ? overrides.expiredAt! : 'aut',
    giftCode: overrides && overrides.hasOwnProperty('giftCode') ? overrides.giftCode! : 'odio',
    issuedAt: overrides && overrides.hasOwnProperty('issuedAt') ? overrides.issuedAt! : 'ea',
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

export const aPayAccount = (overrides?: Partial<PayAccount>): PayAccount => {
  return {
    accountName: overrides && overrides.hasOwnProperty('accountName') ? overrides.accountName! : 'sint',
    accountNumber: overrides && overrides.hasOwnProperty('accountNumber') ? overrides.accountNumber! : 'odio',
    accountType: overrides && overrides.hasOwnProperty('accountType') ? overrides.accountType! : 'rerum',
    amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : 'omnis',
    bankBranchId: overrides && overrides.hasOwnProperty('bankBranchId') ? overrides.bankBranchId! : 7357,
    bankName: overrides && overrides.hasOwnProperty('bankName') ? overrides.bankName! : 'soluta',
    branchCode: overrides && overrides.hasOwnProperty('branchCode') ? overrides.branchCode! : 'consequuntur',
    branchName: overrides && overrides.hasOwnProperty('branchName') ? overrides.branchName! : 'consequatur',
    bsb: overrides && overrides.hasOwnProperty('bsb') ? overrides.bsb! : 'dolor',
    lockLevel: overrides && overrides.hasOwnProperty('lockLevel') ? overrides.lockLevel! : 'facere',
    rollNumber: overrides && overrides.hasOwnProperty('rollNumber') ? overrides.rollNumber! : 'voluptate',
  };
};

export const aPayAccountAllocation = (overrides?: Partial<PayAccountAllocation>): PayAccountAllocation => {
  return {
    bankAccounts:
      overrides && overrides.hasOwnProperty('bankAccounts') ? overrides.bankAccounts! : [aPayAccountDetails()],
    bankSplitType:
      overrides && overrides.hasOwnProperty('bankSplitType') ? overrides.bankSplitType! : PaySplitType.FixedAmount,
  };
};

export const aPayAccountDetails = (overrides?: Partial<PayAccountDetails>): PayAccountDetails => {
  return {
    accountName: overrides && overrides.hasOwnProperty('accountName') ? overrides.accountName! : 'neque',
    accountNumber: overrides && overrides.hasOwnProperty('accountNumber') ? overrides.accountNumber! : 'ea',
    amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : 'quis',
    bsb: overrides && overrides.hasOwnProperty('bsb') ? overrides.bsb! : 'possimus',
  };
};

export const aPayAllocation = (overrides?: Partial<PayAllocation>): PayAllocation => {
  return {
    allocation: overrides && overrides.hasOwnProperty('allocation') ? overrides.allocation! : aPayAccountAllocation(),
    membership: overrides && overrides.hasOwnProperty('membership') ? overrides.membership! : anEhMembership(),
  };
};

export const aPayAllocationInput = (overrides?: Partial<PayAllocationInput>): PayAllocationInput => {
  return {
    bankAccounts: overrides && overrides.hasOwnProperty('bankAccounts') ? overrides.bankAccounts! : [aPayAccount()],
    bankSplitType:
      overrides && overrides.hasOwnProperty('bankSplitType') ? overrides.bankSplitType! : PaySplitType.FixedAmount,
  };
};

export const aPayWithHdCarouselSeen = (overrides?: Partial<PayWithHdCarouselSeen>): PayWithHdCarouselSeen => {
  return {
    seen: overrides && overrides.hasOwnProperty('seen') ? overrides.seen! : false,
  };
};

export const aPaymentClientToken = (overrides?: Partial<PaymentClientToken>): PaymentClientToken => {
  return {
    clientToken: overrides && overrides.hasOwnProperty('clientToken') ? overrides.clientToken! : 'eum',
  };
};

export const aPaymentPreferencesSettings = (
  overrides?: Partial<PaymentPreferencesSettings>
): PaymentPreferencesSettings => {
  return {
    payWithHDOnSwagCard:
      overrides && overrides.hasOwnProperty('payWithHDOnSwagCard') ? overrides.payWithHDOnSwagCard! : false,
  };
};

export const aPaymentPreferencesSettingsInput = (
  overrides?: Partial<PaymentPreferencesSettingsInput>
): PaymentPreferencesSettingsInput => {
  return {
    payWithHDOnSwagCard:
      overrides && overrides.hasOwnProperty('payWithHDOnSwagCard') ? overrides.payWithHDOnSwagCard! : false,
  };
};

export const aPersistentNotification = (overrides?: Partial<PersistentNotification>): PersistentNotification => {
  return {
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'nemo',
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

export const aPickForYouResponse = (overrides?: Partial<PickForYouResponse>): PickForYouResponse => {
  return {
    items: overrides && overrides.hasOwnProperty('items') ? overrides.items! : [aProduct()],
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

export const aProductsQueryResult = (overrides?: Partial<ProductsQueryResult>): ProductsQueryResult => {
  return {
    itemPerPage: overrides && overrides.hasOwnProperty('itemPerPage') ? overrides.itemPerPage! : 8833,
    items: overrides && overrides.hasOwnProperty('items') ? overrides.items! : [aProduct()],
    pageIndex: overrides && overrides.hasOwnProperty('pageIndex') ? overrides.pageIndex! : 1420,
    sort: overrides && overrides.hasOwnProperty('sort') ? overrides.sort! : 'et',
    sortDir: overrides && overrides.hasOwnProperty('sortDir') ? overrides.sortDir! : 'officia',
    totalItems: overrides && overrides.hasOwnProperty('totalItems') ? overrides.totalItems! : 8277,
    totalPages: overrides && overrides.hasOwnProperty('totalPages') ? overrides.totalPages! : 2616,
  };
};

export const aPublishableKeys = (overrides?: Partial<PublishableKeys>): PublishableKeys => {
  return {
    publishableKey: overrides && overrides.hasOwnProperty('publishableKey') ? overrides.publishableKey! : 'recusandae',
  };
};

export const aQuery = (overrides?: Partial<Query>): Query => {
  return {
    allocations: overrides && overrides.hasOwnProperty('allocations') ? overrides.allocations! : [aPayAllocation()],
    bankAccount: overrides && overrides.hasOwnProperty('bankAccount') ? overrides.bankAccount! : [aBankAccount()],
    buyAgainGiftCards:
      overrides && overrides.hasOwnProperty('buyAgainGiftCards') ? overrides.buyAgainGiftCards! : [aProduct()],
    cashbackBanks:
      overrides && overrides.hasOwnProperty('cashbackBanks') ? overrides.cashbackBanks! : [aCashbackBank()],
    cashbackCategories:
      overrides && overrides.hasOwnProperty('cashbackCategories')
        ? overrides.cashbackCategories!
        : [aCashbackCategory()],
    cashbackEmploymentHeroProviderId:
      overrides && overrides.hasOwnProperty('cashbackEmploymentHeroProviderId')
        ? overrides.cashbackEmploymentHeroProviderId!
        : 'sit',
    cashbackFeaturedOnlineOffers:
      overrides && overrides.hasOwnProperty('cashbackFeaturedOnlineOffers')
        ? overrides.cashbackFeaturedOnlineOffers!
        : [anOnlineOffer()],
    cashbackInStoreOfferDetail:
      overrides && overrides.hasOwnProperty('cashbackInStoreOfferDetail')
        ? overrides.cashbackInStoreOfferDetail!
        : anInStoreOffer(),
    cashbackInStoreOffers:
      overrides && overrides.hasOwnProperty('cashbackInStoreOffers')
        ? overrides.cashbackInStoreOffers!
        : anInStoreOffersResponse(),
    cashbackIntroductionContent:
      overrides && overrides.hasOwnProperty('cashbackIntroductionContent')
        ? overrides.cashbackIntroductionContent!
        : aCashbackIntroductionContent(),
    cashbackLinkedCards:
      overrides && overrides.hasOwnProperty('cashbackLinkedCards') ? overrides.cashbackLinkedCards! : [aCashbackCard()],
    cashbackOnboardStatus:
      overrides && overrides.hasOwnProperty('cashbackOnboardStatus')
        ? overrides.cashbackOnboardStatus!
        : aCashbackOnboardStatus(),
    cashbackTermsAndConditions:
      overrides && overrides.hasOwnProperty('cashbackTermsAndConditions')
        ? overrides.cashbackTermsAndConditions!
        : [aCashbackTermsAndCondition()],
    cashbackTermsAndConditionsAcceptance:
      overrides && overrides.hasOwnProperty('cashbackTermsAndConditionsAcceptance')
        ? overrides.cashbackTermsAndConditionsAcceptance!
        : aTermsAndConditionsAcceptance(),
    cashbackTransactions:
      overrides && overrides.hasOwnProperty('cashbackTransactions')
        ? overrides.cashbackTransactions!
        : aCashbackTransactions(),
    cashbackTransactionsV2:
      overrides && overrides.hasOwnProperty('cashbackTransactionsV2')
        ? overrides.cashbackTransactionsV2!
        : aCashbackTransactionsV2(),
    cashbackUserBank:
      overrides && overrides.hasOwnProperty('cashbackUserBank') ? overrides.cashbackUserBank! : aCashbackBankDetail(),
    cashbackUserInfo:
      overrides && overrides.hasOwnProperty('cashbackUserInfo') ? overrides.cashbackUserInfo! : aCashbackUserInfo(),
    cashbackUserToken:
      overrides && overrides.hasOwnProperty('cashbackUserToken') ? overrides.cashbackUserToken! : aCashbackUserToken(),
    currentUser: overrides && overrides.hasOwnProperty('currentUser') ? overrides.currentUser! : aCurrentUser(),
    discountOrderDetail:
      overrides && overrides.hasOwnProperty('discountOrderDetail') ? overrides.discountOrderDetail! : anOrderDetail(),
    discountOrderHistory:
      overrides && overrides.hasOwnProperty('discountOrderHistory')
        ? overrides.discountOrderHistory!
        : aDiscountOrderHistoryResponse(),
    discountShopProductDetail:
      overrides && overrides.hasOwnProperty('discountShopProductDetail')
        ? overrides.discountShopProductDetail!
        : aShopProductDetail(),
    discountShopProducts:
      overrides && overrides.hasOwnProperty('discountShopProducts')
        ? overrides.discountShopProducts!
        : aProductsQueryResult(),
    eWallet: overrides && overrides.hasOwnProperty('eWallet') ? overrides.eWallet! : anEWalletDetails(),
    ehCardBinRange:
      overrides && overrides.hasOwnProperty('ehCardBinRange') ? overrides.ehCardBinRange! : anEhCardBinRange(),
    getCardDetails: overrides && overrides.hasOwnProperty('getCardDetails') ? overrides.getCardDetails! : aCard(),
    getCurrentCardDetails:
      overrides && overrides.hasOwnProperty('getCurrentCardDetails') ? overrides.getCurrentCardDetails! : aCard(),
    getCurrentCardMeta:
      overrides && overrides.hasOwnProperty('getCurrentCardMeta') ? overrides.getCurrentCardMeta! : aCardMeta(),
    getEHUserInitializationDetails:
      overrides && overrides.hasOwnProperty('getEHUserInitializationDetails')
        ? overrides.getEHUserInitializationDetails!
        : aUserInitializationDetails(),
    getGooglePlaceApiKey:
      overrides && overrides.hasOwnProperty('getGooglePlaceApiKey') ? overrides.getGooglePlaceApiKey! : aSecretKey(),
    getIDVProfile: overrides && overrides.hasOwnProperty('getIDVProfile') ? overrides.getIDVProfile! : anIdvProfile(),
    getKPUserInitializationDetails:
      overrides && overrides.hasOwnProperty('getKPUserInitializationDetails')
        ? overrides.getKPUserInitializationDetails!
        : aUserInitializationDetails(),
    getOemProvisioningData:
      overrides && overrides.hasOwnProperty('getOemProvisioningData')
        ? overrides.getOemProvisioningData!
        : anOemProvisioningData(),
    getOemProvisioningDataWithoutOTP:
      overrides && overrides.hasOwnProperty('getOemProvisioningDataWithoutOTP')
        ? overrides.getOemProvisioningDataWithoutOTP!
        : anOemProvisioningData(),
    getPayAccount:
      overrides && overrides.hasOwnProperty('getPayAccount') ? overrides.getPayAccount! : aPayAccountAllocation(),
    getPersistentNotifications:
      overrides && overrides.hasOwnProperty('getPersistentNotifications')
        ? overrides.getPersistentNotifications!
        : [aPersistentNotification()],
    getSpendAccountCarouselFinished:
      overrides && overrides.hasOwnProperty('getSpendAccountCarouselFinished')
        ? overrides.getSpendAccountCarouselFinished!
        : aSpendAccountCarouselFinished(),
    getStashMeta: overrides && overrides.hasOwnProperty('getStashMeta') ? overrides.getStashMeta! : aStashMeta(),
    getStashTransactions:
      overrides && overrides.hasOwnProperty('getStashTransactions')
        ? overrides.getStashTransactions!
        : [aStashTransaction()],
    getStashes: overrides && overrides.hasOwnProperty('getStashes') ? overrides.getStashes! : [aStash()],
    getTransactions:
      overrides && overrides.hasOwnProperty('getTransactions') ? overrides.getTransactions! : [aTransaction()],
    getTransactionsV2:
      overrides && overrides.hasOwnProperty('getTransactionsV2')
        ? overrides.getTransactionsV2!
        : [aFinancialTransaction()],
    getUKToken:
      overrides && overrides.hasOwnProperty('getUKToken') ? overrides.getUKToken! : aStartWalletCreationResponse(),
    heroDollarBalance:
      overrides && overrides.hasOwnProperty('heroDollarBalance') ? overrides.heroDollarBalance! : aHeroDollarBalance(),
    heroDollarRedemptionFee:
      overrides && overrides.hasOwnProperty('heroDollarRedemptionFee')
        ? overrides.heroDollarRedemptionFee!
        : aHeroDollarRedemptionFeeResponse(),
    heroDollarTransactionDetail:
      overrides && overrides.hasOwnProperty('heroDollarTransactionDetail')
        ? overrides.heroDollarTransactionDetail!
        : aHeroDollarTransactionDetail(),
    heroDollarTransactions:
      overrides && overrides.hasOwnProperty('heroDollarTransactions')
        ? overrides.heroDollarTransactions!
        : aHeroDollarTransactions(),
    instapayBankAccounts:
      overrides && overrides.hasOwnProperty('instapayBankAccounts')
        ? overrides.instapayBankAccounts!
        : [anInstapayBankAccount()],
    instapayFee: overrides && overrides.hasOwnProperty('instapayFee') ? overrides.instapayFee! : anInstapayFee(),
    instapayHistory:
      overrides && overrides.hasOwnProperty('instapayHistory') ? overrides.instapayHistory! : [anInstapayHistory()],
    instapayHistoryV2:
      overrides && overrides.hasOwnProperty('instapayHistoryV2') ? overrides.instapayHistoryV2! : [anInstapayHistory()],
    instapayInfo: overrides && overrides.hasOwnProperty('instapayInfo') ? overrides.instapayInfo! : [anInstapayInfo()],
    instapayUsageVerification:
      overrides && overrides.hasOwnProperty('instapayUsageVerification')
        ? overrides.instapayUsageVerification!
        : anInstapayUsageVerification(),
    memberships: overrides && overrides.hasOwnProperty('memberships') ? overrides.memberships! : [anEhMembership()],
    minSupportVersion:
      overrides && overrides.hasOwnProperty('minSupportVersion') ? overrides.minSupportVersion! : aMinSupportVersion(),
    onlineOfferDetail:
      overrides && overrides.hasOwnProperty('onlineOfferDetail') ? overrides.onlineOfferDetail! : anOnlineOffer(),
    onlineOffers:
      overrides && overrides.hasOwnProperty('onlineOffers') ? overrides.onlineOffers! : anOnlineOffersResponse(),
    payWithHDCarouselSeenStatus:
      overrides && overrides.hasOwnProperty('payWithHDCarouselSeenStatus')
        ? overrides.payWithHDCarouselSeenStatus!
        : aPayWithHdCarouselSeen(),
    paymentClientToken:
      overrides && overrides.hasOwnProperty('paymentClientToken')
        ? overrides.paymentClientToken!
        : aPaymentClientToken(),
    paymentPreferenceSettings:
      overrides && overrides.hasOwnProperty('paymentPreferenceSettings')
        ? overrides.paymentPreferenceSettings!
        : aPaymentPreferencesSettings(),
    paymentVerifyCreditCard:
      overrides && overrides.hasOwnProperty('paymentVerifyCreditCard')
        ? overrides.paymentVerifyCreditCard!
        : aVerifyCreditCard(),
    pickForYou: overrides && overrides.hasOwnProperty('pickForYou') ? overrides.pickForYou! : aPickForYouResponse(),
    popularGiftCards:
      overrides && overrides.hasOwnProperty('popularGiftCards') ? overrides.popularGiftCards! : [aProduct()],
    profile: overrides && overrides.hasOwnProperty('profile') ? overrides.profile! : anEhProfile(),
    profileChangeRequest:
      overrides && overrides.hasOwnProperty('profileChangeRequest')
        ? overrides.profileChangeRequest!
        : [aUserDetailChangeRequest()],
    stripePublishableKey:
      overrides && overrides.hasOwnProperty('stripePublishableKey')
        ? overrides.stripePublishableKey!
        : aPublishableKeys(),
    userPermission:
      overrides && overrides.hasOwnProperty('userPermission') ? overrides.userPermission! : [aUserPermission()],
  };
};

export const aResidentialAddress = (overrides?: Partial<ResidentialAddress>): ResidentialAddress => {
  return {
    addressLine1: overrides && overrides.hasOwnProperty('addressLine1') ? overrides.addressLine1! : 'aperiam',
    addressLine2: overrides && overrides.hasOwnProperty('addressLine2') ? overrides.addressLine2! : 'consequuntur',
    addressLine3: overrides && overrides.hasOwnProperty('addressLine3') ? overrides.addressLine3! : 'et',
    country: overrides && overrides.hasOwnProperty('country') ? overrides.country! : 'quidem',
    postcode: overrides && overrides.hasOwnProperty('postcode') ? overrides.postcode! : 'dolores',
    region: overrides && overrides.hasOwnProperty('region') ? overrides.region! : 'soluta',
    streetName: overrides && overrides.hasOwnProperty('streetName') ? overrides.streetName! : 'accusantium',
    streetNumber: overrides && overrides.hasOwnProperty('streetNumber') ? overrides.streetNumber! : 'deserunt',
    streetType: overrides && overrides.hasOwnProperty('streetType') ? overrides.streetType! : 'blanditiis',
    townOrCity: overrides && overrides.hasOwnProperty('townOrCity') ? overrides.townOrCity! : 'nulla',
    unitNumber: overrides && overrides.hasOwnProperty('unitNumber') ? overrides.unitNumber! : 'quasi',
  };
};

export const aSecretKey = (overrides?: Partial<SecretKey>): SecretKey => {
  return {
    name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'molestias',
    value: overrides && overrides.hasOwnProperty('value') ? overrides.value! : 'distinctio',
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

export const aShopProductDetail = (overrides?: Partial<ShopProductDetail>): ShopProductDetail => {
  return {
    country: overrides && overrides.hasOwnProperty('country') ? overrides.country! : 'molestiae',
    currency: overrides && overrides.hasOwnProperty('currency') ? overrides.currency! : 'eveniet',
    description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'ut',
    disabled: overrides && overrides.hasOwnProperty('disabled') ? overrides.disabled! : true,
    discountPrice: overrides && overrides.hasOwnProperty('discountPrice') ? overrides.discountPrice! : 3.69,
    discountPriceInPoints:
      overrides && overrides.hasOwnProperty('discountPriceInPoints') ? overrides.discountPriceInPoints! : 8415,
    email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'qui',
    giftpayBalance: overrides && overrides.hasOwnProperty('giftpayBalance') ? overrides.giftpayBalance! : 4.54,
    heroDollarsFee: overrides && overrides.hasOwnProperty('heroDollarsFee') ? overrides.heroDollarsFee! : 9.79,
    howItWorks: overrides && overrides.hasOwnProperty('howItWorks') ? overrides.howItWorks! : 'iste',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'quidem',
    image: overrides && overrides.hasOwnProperty('image') ? overrides.image! : aShopImage(),
    instapayFee: overrides && overrides.hasOwnProperty('instapayFee') ? overrides.instapayFee! : 1.65,
    logo: overrides && overrides.hasOwnProperty('logo') ? overrides.logo! : aShopImage(),
    name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'cumque',
    participant: overrides && overrides.hasOwnProperty('participant') ? overrides.participant! : 'est',
    price: overrides && overrides.hasOwnProperty('price') ? overrides.price! : 9.11,
    priceInPoints: overrides && overrides.hasOwnProperty('priceInPoints') ? overrides.priceInPoints! : 790,
    productCategoryId:
      overrides && overrides.hasOwnProperty('productCategoryId') ? overrides.productCategoryId! : 'amet',
    productCode: overrides && overrides.hasOwnProperty('productCode') ? overrides.productCode! : 'hic',
    productType: overrides && overrides.hasOwnProperty('productType') ? overrides.productType! : 'aliquam',
    productVariants:
      overrides && overrides.hasOwnProperty('productVariants') ? overrides.productVariants! : [aShopProductVariants()],
    serviceFee: overrides && overrides.hasOwnProperty('serviceFee') ? overrides.serviceFee! : 9.39,
    storefrontImage:
      overrides && overrides.hasOwnProperty('storefrontImage') ? overrides.storefrontImage! : aShopImage(),
    supplier: overrides && overrides.hasOwnProperty('supplier') ? overrides.supplier! : aShopProductSupplier(),
    supplierId: overrides && overrides.hasOwnProperty('supplierId') ? overrides.supplierId! : 'possimus',
    termsAndConditions:
      overrides && overrides.hasOwnProperty('termsAndConditions') ? overrides.termsAndConditions! : 'non',
    title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'deserunt',
    transactionFee: overrides && overrides.hasOwnProperty('transactionFee') ? overrides.transactionFee! : 5.69,
    type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : 'vel',
    usage: overrides && overrides.hasOwnProperty('usage') ? overrides.usage! : 'in',
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

export const aShopProductVariants = (overrides?: Partial<ShopProductVariants>): ShopProductVariants => {
  return {
    amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : 9.9,
    cardId: overrides && overrides.hasOwnProperty('cardId') ? overrides.cardId! : 'voluptates',
    description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'ipsa',
    discountPrice: overrides && overrides.hasOwnProperty('discountPrice') ? overrides.discountPrice! : 9.43,
    discountPriceInPoints:
      overrides && overrides.hasOwnProperty('discountPriceInPoints') ? overrides.discountPriceInPoints! : 3795,
    freightPrice: overrides && overrides.hasOwnProperty('freightPrice') ? overrides.freightPrice! : 8.89,
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'voluptatem',
    imageUrl: overrides && overrides.hasOwnProperty('imageUrl') ? overrides.imageUrl! : 'libero',
    label: overrides && overrides.hasOwnProperty('label') ? overrides.label! : 'provident',
    numberInStock: overrides && overrides.hasOwnProperty('numberInStock') ? overrides.numberInStock! : 2656,
    position: overrides && overrides.hasOwnProperty('position') ? overrides.position! : 5783,
    price: overrides && overrides.hasOwnProperty('price') ? overrides.price! : 0.69,
    priceInPoints: overrides && overrides.hasOwnProperty('priceInPoints') ? overrides.priceInPoints! : 6711,
    status: overrides && overrides.hasOwnProperty('status') ? overrides.status! : 'temporibus',
    stockAvailable: overrides && overrides.hasOwnProperty('stockAvailable') ? overrides.stockAvailable! : true,
    variantCode: overrides && overrides.hasOwnProperty('variantCode') ? overrides.variantCode! : 'dolorum',
  };
};

export const aSpendAccountCarouselFinished = (
  overrides?: Partial<SpendAccountCarouselFinished>
): SpendAccountCarouselFinished => {
  return {
    value: overrides && overrides.hasOwnProperty('value') ? overrides.value! : 'laborum',
  };
};

export const aStartWalletCreationInput = (overrides?: Partial<StartWalletCreationInput>): StartWalletCreationInput => {
  return {
    dateOfBirth: overrides && overrides.hasOwnProperty('dateOfBirth') ? overrides.dateOfBirth! : 'molestias',
    firstName: overrides && overrides.hasOwnProperty('firstName') ? overrides.firstName! : 'voluptas',
    hasConsentedPrivacyPolicy:
      overrides && overrides.hasOwnProperty('hasConsentedPrivacyPolicy') ? overrides.hasConsentedPrivacyPolicy! : true,
    hasConsentedTermsConditions:
      overrides && overrides.hasOwnProperty('hasConsentedTermsConditions')
        ? overrides.hasConsentedTermsConditions!
        : true,
    lastName: overrides && overrides.hasOwnProperty('lastName') ? overrides.lastName! : 'inventore',
    phoneNumber: overrides && overrides.hasOwnProperty('phoneNumber') ? overrides.phoneNumber! : aPhoneNumberInput(),
    privacyPolicyConsentTimestamp:
      overrides && overrides.hasOwnProperty('privacyPolicyConsentTimestamp')
        ? overrides.privacyPolicyConsentTimestamp!
        : 'voluptatem',
    residentialAddress:
      overrides && overrides.hasOwnProperty('residentialAddress') ? overrides.residentialAddress! : anAddressInputV3(),
    termsConditionsConsentTimestamp:
      overrides && overrides.hasOwnProperty('termsConditionsConsentTimestamp')
        ? overrides.termsConditionsConsentTimestamp!
        : 'et',
  };
};

export const aStartWalletCreationResponse = (
  overrides?: Partial<StartWalletCreationResponse>
): StartWalletCreationResponse => {
  return {
    userToken: overrides && overrides.hasOwnProperty('userToken') ? overrides.userToken! : 'fugiat',
  };
};

export const aStash = (overrides?: Partial<Stash>): Stash => {
  return {
    balance: overrides && overrides.hasOwnProperty('balance') ? overrides.balance! : 0.92,
    closedAtUtc: overrides && overrides.hasOwnProperty('closedAtUtc') ? overrides.closedAtUtc! : 'quo',
    createdAtUtc: overrides && overrides.hasOwnProperty('createdAtUtc') ? overrides.createdAtUtc! : 'quo',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'magni',
    imageUrl: overrides && overrides.hasOwnProperty('imageUrl') ? overrides.imageUrl! : 'itaque',
    name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'ea',
    status: overrides && overrides.hasOwnProperty('status') ? overrides.status! : StashStatus.Closed,
    targetAmount: overrides && overrides.hasOwnProperty('targetAmount') ? overrides.targetAmount! : 3.92,
  };
};

export const aStashMeta = (overrides?: Partial<StashMeta>): StashMeta => {
  return {
    isMarketingCardFinished:
      overrides && overrides.hasOwnProperty('isMarketingCardFinished') ? overrides.isMarketingCardFinished! : false,
    isStashEntryButtonInSpendAccountHidden:
      overrides && overrides.hasOwnProperty('isStashEntryButtonInSpendAccountHidden')
        ? overrides.isStashEntryButtonInSpendAccountHidden!
        : true,
  };
};

export const aStashMetaInput = (overrides?: Partial<StashMetaInput>): StashMetaInput => {
  return {
    isMarketingCardFinished:
      overrides && overrides.hasOwnProperty('isMarketingCardFinished') ? overrides.isMarketingCardFinished! : true,
    isStashEntryButtonInSpendAccountHidden:
      overrides && overrides.hasOwnProperty('isStashEntryButtonInSpendAccountHidden')
        ? overrides.isStashEntryButtonInSpendAccountHidden!
        : true,
  };
};

export const aStashTransaction = (overrides?: Partial<StashTransaction>): StashTransaction => {
  return {
    amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : 6.81,
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'consequatur',
    transactionTimeUtc:
      overrides && overrides.hasOwnProperty('transactionTimeUtc') ? overrides.transactionTimeUtc! : 'est',
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

export const aTermsAndConditionsAcceptance = (
  overrides?: Partial<TermsAndConditionsAcceptance>
): TermsAndConditionsAcceptance => {
  return {
    isAccepted: overrides && overrides.hasOwnProperty('isAccepted') ? overrides.isAccepted! : true,
  };
};

export const aTransaction = (overrides?: Partial<Transaction>): Transaction => {
  return {
    accountId: overrides && overrides.hasOwnProperty('accountId') ? overrides.accountId! : 'dolor',
    clearingTimeUtc: overrides && overrides.hasOwnProperty('clearingTimeUtc') ? overrides.clearingTimeUtc! : 'ratione',
    counterpart: overrides && overrides.hasOwnProperty('counterpart') ? overrides.counterpart! : aCounterpart(),
    currencyAmount:
      overrides && overrides.hasOwnProperty('currencyAmount') ? overrides.currencyAmount! : aCurrencyAmount(),
    description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'eius',
    reference: overrides && overrides.hasOwnProperty('reference') ? overrides.reference! : 'velit',
    transactionId: overrides && overrides.hasOwnProperty('transactionId') ? overrides.transactionId! : 'ut',
  };
};

export const aTransactionMerchant = (overrides?: Partial<TransactionMerchant>): TransactionMerchant => {
  return {
    name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'tenetur',
    singleLineAddress:
      overrides && overrides.hasOwnProperty('singleLineAddress') ? overrides.singleLineAddress! : 'nihil',
  };
};

export const aTransactionResponse = (overrides?: Partial<TransactionResponse>): TransactionResponse => {
  return {
    outcome: overrides && overrides.hasOwnProperty('outcome') ? overrides.outcome! : TransactionOutcome.Accepted,
    transactionId: overrides && overrides.hasOwnProperty('transactionId') ? overrides.transactionId! : 'sunt',
  };
};

export const aTransferPeerDetails = (overrides?: Partial<TransferPeerDetails>): TransferPeerDetails => {
  return {
    accountHayId: overrides && overrides.hasOwnProperty('accountHayId') ? overrides.accountHayId! : 'rerum',
    accountNumber: overrides && overrides.hasOwnProperty('accountNumber') ? overrides.accountNumber! : 'dolorem',
    bsb: overrides && overrides.hasOwnProperty('bsb') ? overrides.bsb! : 'officia',
    name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'sit',
  };
};

export const anUpdateUserProfileInput = (overrides?: Partial<UpdateUserProfileInput>): UpdateUserProfileInput => {
  return {
    dateOfBirth: overrides && overrides.hasOwnProperty('dateOfBirth') ? overrides.dateOfBirth! : 'beatae',
    name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : aPersonalNameInput(),
    phoneNumber: overrides && overrides.hasOwnProperty('phoneNumber') ? overrides.phoneNumber! : aPhoneNumberInput(),
    residentialAddress:
      overrides && overrides.hasOwnProperty('residentialAddress') ? overrides.residentialAddress! : anAddressInputV2(),
  };
};

export const aUser = (overrides?: Partial<User>): User => {
  return {
    createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : 'asperiores',
    dateOfBirth: overrides && overrides.hasOwnProperty('dateOfBirth') ? overrides.dateOfBirth! : 'natus',
    deletedAt: overrides && overrides.hasOwnProperty('deletedAt') ? overrides.deletedAt! : 'corrupti',
    eWalletSetupStatus:
      overrides && overrides.hasOwnProperty('eWalletSetupStatus')
        ? overrides.eWalletSetupStatus!
        : EWalletSetupStatus.Completed,
    eWalletStatusReason:
      overrides && overrides.hasOwnProperty('eWalletStatusReason')
        ? overrides.eWalletStatusReason!
        : EWalletStatusReason.Archived,
    ehTimezone: overrides && overrides.hasOwnProperty('ehTimezone') ? overrides.ehTimezone! : 'non',
    ehUUID: overrides && overrides.hasOwnProperty('ehUUID') ? overrides.ehUUID! : 'qui',
    email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'sunt',
    firstName: overrides && overrides.hasOwnProperty('firstName') ? overrides.firstName! : 'qui',
    gender: overrides && overrides.hasOwnProperty('gender') ? overrides.gender! : 'exercitationem',
    haasID: overrides && overrides.hasOwnProperty('haasID') ? overrides.haasID! : 'harum',
    hasConsentedIdentityVerificationTerms:
      overrides && overrides.hasOwnProperty('hasConsentedIdentityVerificationTerms')
        ? overrides.hasConsentedIdentityVerificationTerms!
        : true,
    hasConsentedTermsConditions:
      overrides && overrides.hasOwnProperty('hasConsentedTermsConditions')
        ? overrides.hasConsentedTermsConditions!
        : true,
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'est',
    identityVerificationTermsConsentTimestamp:
      overrides && overrides.hasOwnProperty('identityVerificationTermsConsentTimestamp')
        ? overrides.identityVerificationTermsConsentTimestamp!
        : 'qui',
    kpId: overrides && overrides.hasOwnProperty('kpId') ? overrides.kpId! : 'autem',
    lastName: overrides && overrides.hasOwnProperty('lastName') ? overrides.lastName! : 'velit',
    loginType: overrides && overrides.hasOwnProperty('loginType') ? overrides.loginType! : LoginType.Eh,
    mailingAddress: overrides && overrides.hasOwnProperty('mailingAddress') ? overrides.mailingAddress! : anAddress(),
    phoneNumber: overrides && overrides.hasOwnProperty('phoneNumber') ? overrides.phoneNumber! : aPhoneNumber(),
    preferredName: overrides && overrides.hasOwnProperty('preferredName') ? overrides.preferredName! : 'dolorem',
    residentialAddress:
      overrides && overrides.hasOwnProperty('residentialAddress')
        ? overrides.residentialAddress!
        : aResidentialAddress(),
    termsConditionsConsentTimestamp:
      overrides && overrides.hasOwnProperty('termsConditionsConsentTimestamp')
        ? overrides.termsConditionsConsentTimestamp!
        : 'in',
    updatedAt: overrides && overrides.hasOwnProperty('updatedAt') ? overrides.updatedAt! : 'facilis',
  };
};

export const aUserDetailChangeRequest = (overrides?: Partial<UserDetailChangeRequest>): UserDetailChangeRequest => {
  return {
    createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : 'aut',
    dateOfBirth: overrides && overrides.hasOwnProperty('dateOfBirth') ? overrides.dateOfBirth! : 'ut',
    name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : aPersonalName(),
    type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : UserDetailChangeRequestType.DateOfBirth,
  };
};

export const aUserInitializationDetails = (
  overrides?: Partial<UserInitializationDetails>
): UserInitializationDetails => {
  return {
    address: overrides && overrides.hasOwnProperty('address') ? overrides.address! : anAddress(),
    dateOfBirth: overrides && overrides.hasOwnProperty('dateOfBirth') ? overrides.dateOfBirth! : 'occaecati',
    firstName: overrides && overrides.hasOwnProperty('firstName') ? overrides.firstName! : 'ea',
    lastName: overrides && overrides.hasOwnProperty('lastName') ? overrides.lastName! : 'tenetur',
    middleName: overrides && overrides.hasOwnProperty('middleName') ? overrides.middleName! : 'minima',
    phoneNumber: overrides && overrides.hasOwnProperty('phoneNumber') ? overrides.phoneNumber! : aPhoneNumber(),
  };
};

export const aUserPermission = (overrides?: Partial<UserPermission>): UserPermission => {
  return {
    enabled: overrides && overrides.hasOwnProperty('enabled') ? overrides.enabled! : true,
    name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'quam',
  };
};

export const aUserPermissionRequestInput = (
  overrides?: Partial<UserPermissionRequestInput>
): UserPermissionRequestInput => {
  return {
    kpBrandIds: overrides && overrides.hasOwnProperty('kpBrandIds') ? overrides.kpBrandIds! : [8420],
    kpBusinessIds: overrides && overrides.hasOwnProperty('kpBusinessIds') ? overrides.kpBusinessIds! : [4786],
    kpEmployeeIds: overrides && overrides.hasOwnProperty('kpEmployeeIds') ? overrides.kpEmployeeIds! : [2724],
    kpPartnerIds: overrides && overrides.hasOwnProperty('kpPartnerIds') ? overrides.kpPartnerIds! : [8484],
  };
};

export const aVerifyCreditCard = (overrides?: Partial<VerifyCreditCard>): VerifyCreditCard => {
  return {
    message: overrides && overrides.hasOwnProperty('message') ? overrides.message! : 'fuga',
  };
};

export const aWithdrawStashInput = (overrides?: Partial<WithdrawStashInput>): WithdrawStashInput => {
  return {
    amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : 6.97,
  };
};
