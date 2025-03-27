/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const mailingAddress = /* GraphQL */ `
  mutation MailingAddress($address: AddressInput) {
    mailingAddress(address: $address)
  }
`;
export const patchProfile = /* GraphQL */ `
  mutation PatchProfile(
    $patch: EhProfilePatchRequest
    $ehToken: String!
    $orgId: String
  ) {
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
export const eventLog = /* GraphQL */ `
  mutation EventLog($event: EventLogRequest) {
    eventLog(event: $event)
  }
`;
export const updateUserProfile = /* GraphQL */ `
  mutation UpdateUserProfile($userProfile: UpdateUserProfileInput!) {
    updateUserProfile(userProfile: $userProfile)
  }
`;
export const finishSpendAccountCarousel = /* GraphQL */ `
  mutation FinishSpendAccountCarousel {
    finishSpendAccountCarousel
  }
`;
export const drawdownWage = /* GraphQL */ `
  mutation DrawdownWage(
    $ehToken: String!
    $orgId: String!
    $bankAccountId: String!
    $amount: Float!
  ) {
    drawdownWage(
      ehToken: $ehToken
      orgId: $orgId
      bankAccountId: $bankAccountId
      amount: $amount
    )
  }
`;
export const drawdownWageV2 = /* GraphQL */ `
  mutation DrawdownWageV2(
    $ehToken: String!
    $orgId: String!
    $bankAccountId: String!
    $amount: Float!
  ) {
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
      }
    }
  }
`;
export const payAccount = /* GraphQL */ `
  mutation PayAccount(
    $ehToken: String!
    $membership: EhMembershipInput!
    $bankDetails: PayAllocationInput!
  ) {
    payAccount(
      ehToken: $ehToken
      membership: $membership
      bankDetails: $bankDetails
    )
  }
`;
export const accountTransfer = /* GraphQL */ `
  mutation AccountTransfer($transferDetails: AccountTransferInput) {
    accountTransfer(transferDetails: $transferDetails) {
      transactionId
      outcome
    }
  }
`;
export const makePayment = /* GraphQL */ `
  mutation MakePayment(
    $ehToken: String!
    $orgId: String!
    $nonce: String!
    $items: [MakePaymentItem!]!
    $paymentMethod: MakePaymentPaymentMethod!
    $deviceData: String!
  ) {
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
export const makePaymentV2 = /* GraphQL */ `
  mutation MakePaymentV2(
    $ehToken: String!
    $orgId: String!
    $nonce: String!
    $items: [MakePaymentItem!]!
    $paymentMethod: MakePaymentPaymentMethod!
    $deviceData: String!
    $serviceFee: String!
    $ehPlatform: String
  ) {
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
export const activateCard = /* GraphQL */ `
  mutation ActivateCard {
    activateCard
  }
`;
export const card = /* GraphQL */ `
  mutation Card($cardRequest: CardRequestInput!) {
    card(cardRequest: $cardRequest)
  }
`;
export const initiateEWalletSetup = /* GraphQL */ `
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
export const initiateEWalletSetupV2 = /* GraphQL */ `
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
export const requestNewCard = /* GraphQL */ `
  mutation RequestNewCard($address: AddressInput) {
    requestNewCard(address: $address)
  }
`;
export const sendOtpToCurrentUser = /* GraphQL */ `
  mutation SendOtpToCurrentUser {
    sendOtpToCurrentUser {
      countryCode
      number
    }
  }
`;
export const updateCardMeta = /* GraphQL */ `
  mutation UpdateCardMeta($cardMeta: CardMetaInput!) {
    updateCardMeta(cardMeta: $cardMeta)
  }
`;
export const updateCardPIN = /* GraphQL */ `
  mutation UpdateCardPIN($cardPIN: String!) {
    updateCardPIN(cardPIN: $cardPIN)
  }
`;
export const clearPersistentNotification = /* GraphQL */ `
  mutation ClearPersistentNotification($type: WalletNotificationType!) {
    clearPersistentNotification(type: $type)
  }
`;
export const saveWalletSetup = /* GraphQL */ `
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
export const initiateEWalletSetupV3 = /* GraphQL */ `
  mutation InitiateEWalletSetupV3 {
    initiateEWalletSetupV3
  }
`;
export const setStashMeta = /* GraphQL */ `
  mutation SetStashMeta($meta: StashMetaInput!) {
    setStashMeta(meta: $meta)
  }
`;
export const depositStash = /* GraphQL */ `
  mutation DepositStash($stashId: String!, $depositInput: DepositStashInput!) {
    depositStash(stashId: $stashId, depositInput: $depositInput)
  }
`;
export const createStash = /* GraphQL */ `
  mutation CreateStash($stashInput: CreateStashInput!) {
    createStash(stashInput: $stashInput)
  }
`;
export const withdrawStash = /* GraphQL */ `
  mutation WithdrawStash(
    $stashId: String!
    $withdrawInput: WithdrawStashInput!
  ) {
    withdrawStash(stashId: $stashId, withdrawInput: $withdrawInput)
  }
`;
export const closeStash = /* GraphQL */ `
  mutation CloseStash($stashId: String!) {
    closeStash(stashId: $stashId) {
      result
    }
  }
`;
export const cashbackRegisterUser = /* GraphQL */ `
  mutation CashbackRegisterUser {
    cashbackRegisterUser
  }
`;
export const cashbackOnboardUser = /* GraphQL */ `
  mutation CashbackOnboardUser {
    cashbackOnboardUser
  }
`;
export const cashbackEnrolCard = /* GraphQL */ `
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
export const cashbackDeleteCard = /* GraphQL */ `
  mutation CashbackDeleteCard($deleteCard: CashbackDeleteCardInput!) {
    cashbackDeleteCard(deleteCard: $deleteCard)
  }
`;
export const cashbackUpdateBankDetails = /* GraphQL */ `
  mutation CashbackUpdateBankDetails($bankDetails: CashbackBankDetailInput!) {
    cashbackUpdateBankDetails(bankDetails: $bankDetails)
  }
`;
export const cashbackAcceptTermsAndConditions = /* GraphQL */ `
  mutation CashbackAcceptTermsAndConditions {
    cashbackAcceptTermsAndConditions {
      isAccepted
    }
  }
`;
export const updatePaymentPreferenceSettings = /* GraphQL */ `
  mutation UpdatePaymentPreferenceSettings(
    $settings: PaymentPreferencesSettingsInput
  ) {
    updatePaymentPreferenceSettings(settings: $settings) {
      payWithHDOnSwagCard
    }
  }
`;
export const seenPayWithHDCarousel = /* GraphQL */ `
  mutation SeenPayWithHDCarousel {
    seenPayWithHDCarousel
  }
`;
