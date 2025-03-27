/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGooglePlaceApiKey = /* GraphQL */ `
  query GetGooglePlaceApiKey($platform: String!) {
    getGooglePlaceApiKey(platform: $platform) {
      name
      value
    }
  }
`;
export const minSupportVersion = /* GraphQL */ `
  query MinSupportVersion {
    minSupportVersion {
      benefits {
        minSupportAppVersion
      }
    }
  }
`;
export const currentUser = /* GraphQL */ `
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
export const profile = /* GraphQL */ `
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
export const userPermission = /* GraphQL */ `
  query UserPermission($permissionRequest: UserPermissionRequestInput) {
    userPermission(permissionRequest: $permissionRequest) {
      name
      enabled
    }
  }
`;
export const profileChangeRequest = /* GraphQL */ `
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
export const getSpendAccountCarouselFinished = /* GraphQL */ `
  query GetSpendAccountCarouselFinished {
    getSpendAccountCarouselFinished {
      value
    }
  }
`;
export const getEHUserInitializationDetails = /* GraphQL */ `
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
export const getKPUserInitializationDetails = /* GraphQL */ `
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
export const allocations = /* GraphQL */ `
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
export const bankAccount = /* GraphQL */ `
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
export const getPayAccount = /* GraphQL */ `
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
export const instapayBankAccounts = /* GraphQL */ `
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
export const instapayFee = /* GraphQL */ `
  query InstapayFee($bsb: String) {
    instapayFee(bsb: $bsb) {
      fee
    }
  }
`;
export const instapayHistory = /* GraphQL */ `
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
export const instapayHistoryV2 = /* GraphQL */ `
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
export const instapayInfo = /* GraphQL */ `
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
export const instapayUsageVerification = /* GraphQL */ `
  query InstapayUsageVerification($ehToken: String!) {
    instapayUsageVerification(ehToken: $ehToken) {
      memberNotUsedInstapay
    }
  }
`;
export const memberships = /* GraphQL */ `
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
export const discountShopProductDetail = /* GraphQL */ `
  query DiscountShopProductDetail($ehToken: String!, $orgId: String!, $productCode: String!) {
    discountShopProductDetail(ehToken: $ehToken, orgId: $orgId, productCode: $productCode) {
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
export const discountShopProducts = /* GraphQL */ `
  query DiscountShopProducts($ehToken: String!, $orgId: String!, $pageIndex: Int, $itemPerPage: Int) {
    discountShopProducts(ehToken: $ehToken, orgId: $orgId, pageIndex: $pageIndex, itemPerPage: $itemPerPage) {
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
export const discountOrderHistory = /* GraphQL */ `
  query DiscountOrderHistory($ehToken: String!, $orgId: String!, $pageIndex: Int, $itemPerPage: Int) {
    discountOrderHistory(ehToken: $ehToken, orgId: $orgId, pageIndex: $pageIndex, itemPerPage: $itemPerPage) {
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
export const discountOrderDetail = /* GraphQL */ `
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
export const paymentClientToken = /* GraphQL */ `
  query PaymentClientToken($ehToken: String!, $orgId: String!) {
    paymentClientToken(ehToken: $ehToken, orgId: $orgId) {
      clientToken
    }
  }
`;
export const paymentVerifyCreditCard = /* GraphQL */ `
  query PaymentVerifyCreditCard($ehToken: String!, $orgId: String!, $nonce: String!) {
    paymentVerifyCreditCard(ehToken: $ehToken, orgId: $orgId, nonce: $nonce) {
      message
    }
  }
`;
export const pickForYou = /* GraphQL */ `
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
export const popularGiftCards = /* GraphQL */ `
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
export const buyAgainGiftCards = /* GraphQL */ `
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
export const stripePublishableKey = /* GraphQL */ `
  query StripePublishableKey($ehToken: String!, $currency: String!) {
    stripePublishableKey(ehToken: $ehToken, currency: $currency) {
      publishableKey
    }
  }
`;
export const onlineOffers = /* GraphQL */ `
  query OnlineOffers($pageIndex: Int, $itemPerPage: Int, $categoryId: String, $searchTerm: String) {
    onlineOffers(pageIndex: $pageIndex, itemPerPage: $itemPerPage, categoryId: $categoryId, searchTerm: $searchTerm) {
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
export const onlineOfferDetail = /* GraphQL */ `
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
export const cashbackFeaturedOnlineOffers = /* GraphQL */ `
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
export const cashbackCategories = /* GraphQL */ `
  query CashbackCategories {
    cashbackCategories {
      id
      name
      image
    }
  }
`;
export const cashbackIntroductionContent = /* GraphQL */ `
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
export const cashbackTermsAndConditions = /* GraphQL */ `
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
export const cashbackTermsAndConditionsAcceptance = /* GraphQL */ `
  query CashbackTermsAndConditionsAcceptance {
    cashbackTermsAndConditionsAcceptance {
      isAccepted
    }
  }
`;
export const cashbackBanks = /* GraphQL */ `
  query CashbackBanks {
    cashbackBanks {
      id
      name
      region
    }
  }
`;
export const cashbackLinkedCards = /* GraphQL */ `
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
export const cashbackUserToken = /* GraphQL */ `
  query CashbackUserToken {
    cashbackUserToken {
      key
      token
    }
  }
`;
export const cashbackTransactions = /* GraphQL */ `
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
export const cashbackTransactionsV2 = /* GraphQL */ `
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
export const cashbackOnboardStatus = /* GraphQL */ `
  query CashbackOnboardStatus {
    cashbackOnboardStatus {
      hasCLOOnboarded
    }
  }
`;
export const cashbackEmploymentHeroProviderId = /* GraphQL */ `
  query CashbackEmploymentHeroProviderId {
    cashbackEmploymentHeroProviderId
  }
`;
export const cashbackUserBank = /* GraphQL */ `
  query CashbackUserBank {
    cashbackUserBank {
      id
      bsb
      accountNumber
    }
  }
`;
export const cashbackInStoreOffers = /* GraphQL */ `
  query CashbackInStoreOffers(
    $pageIndex: Int
    $itemPerPage: Int
    $latitude: Float
    $longitude: Float
    $distance: Float
    $searchTerm: String
  ) {
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
export const cashbackInStoreOfferDetail = /* GraphQL */ `
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
export const eWallet = /* GraphQL */ `
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
export const getCardDetails = /* GraphQL */ `
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
export const getCurrentCardDetails = /* GraphQL */ `
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
export const getCurrentCardMeta = /* GraphQL */ `
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
export const getOemProvisioningData = /* GraphQL */ `
  query GetOemProvisioningData($otp: String!) {
    getOemProvisioningData(otp: $otp) {
      cardHolderName
      cardToken
      expiryDate
      otp
    }
  }
`;
export const getOemProvisioningDataWithoutOTP = /* GraphQL */ `
  query GetOemProvisioningDataWithoutOTP {
    getOemProvisioningDataWithoutOTP {
      cardHolderName
      cardToken
      expiryDate
      otp
    }
  }
`;
export const getTransactions = /* GraphQL */ `
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
export const getTransactionsV2 = /* GraphQL */ `
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
export const getPersistentNotifications = /* GraphQL */ `
  query GetPersistentNotifications {
    getPersistentNotifications {
      id
      notificationStatus
      type
    }
  }
`;
export const ehCardBinRange = /* GraphQL */ `
  query EhCardBinRange {
    ehCardBinRange {
      from
      to
    }
  }
`;
export const getIDVProfile = /* GraphQL */ `
  query GetIDVProfile {
    getIDVProfile {
      status
      token
      applicantId
    }
  }
`;
export const getStashes = /* GraphQL */ `
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
export const getStashMeta = /* GraphQL */ `
  query GetStashMeta {
    getStashMeta {
      isMarketingCardFinished
      isStashEntryButtonInSpendAccountHidden
    }
  }
`;
export const getStashTransactions = /* GraphQL */ `
  query GetStashTransactions($stashId: String!, $limit: Int!, $offset: Int!) {
    getStashTransactions(stashId: $stashId, limit: $limit, offset: $offset) {
      id
      amount
      transactionTimeUtc
    }
  }
`;
export const getUKToken = /* GraphQL */ `
  query GetUKToken {
    getUKToken {
      userToken
    }
  }
`;
export const heroDollarBalance = /* GraphQL */ `
  query HeroDollarBalance($ehToken: String!) {
    heroDollarBalance(ehToken: $ehToken) {
      balance
    }
  }
`;
export const heroDollarTransactions = /* GraphQL */ `
  query HeroDollarTransactions($ehToken: String!, $pageIndex: Int, $itemPerPage: Int) {
    heroDollarTransactions(ehToken: $ehToken, pageIndex: $pageIndex, itemPerPage: $itemPerPage) {
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
export const heroDollarTransactionDetail = /* GraphQL */ `
  query HeroDollarTransactionDetail($ehToken: String!, $transactionId: String!, $clientType: HeroDollarClientType) {
    heroDollarTransactionDetail(ehToken: $ehToken, transactionId: $transactionId, clientType: $clientType) {
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
export const heroDollarRedemptionFee = /* GraphQL */ `
  query HeroDollarRedemptionFee {
    heroDollarRedemptionFee {
      data {
        fee
      }
    }
  }
`;
export const paymentPreferenceSettings = /* GraphQL */ `
  query PaymentPreferenceSettings {
    paymentPreferenceSettings {
      payWithHDOnSwagCard
    }
  }
`;
export const payWithHDCarouselSeenStatus = /* GraphQL */ `
  query PayWithHDCarouselSeenStatus {
    payWithHDCarouselSeenStatus {
      seen
    }
  }
`;

export const cashbackUserInfo = /* GraphQL */ `
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
