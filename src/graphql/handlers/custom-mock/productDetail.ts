export const mockProductDetailStock = (stock = 5, isStockAvailable = true) => {
  return {
    id: '207fb444-f281-4241-8c5e-f42a0e8755af',
    name: 'JB Hi-Fi Gift Card',
    title: 'JB Hi-Fi Gift Card',
    price: 100,
    type: 'Product',
    discountPrice: 95,
    priceInPoints: 220,
    discountPriceInPoints: 209,
    productCode: 'jb-hi-fi-gift-card',
    image: {
      url: 'https://marketplace-service.cdn.staging.ehrocks.com/products/9641/CardDesignCorp.jpg',
      small: {
        url: 'https://marketplace-service.cdn.staging.ehrocks.com/products/9641/small_CardDesignCorp.jpg',
      },
      product: {
        url: 'https://marketplace-service.cdn.staging.ehrocks.com/products/9641/product_CardDesignCorp.jpg',
      },
      large: {
        url: 'https://marketplace-service.cdn.staging.ehrocks.com/products/9641/large_CardDesignCorp.jpg',
      },
    },
    storefrontImage: {
      url: null,
      small: {
        url: null,
      },
      product: {
        url: null,
      },
      large: {
        url: null,
      },
    },
    giftpayBalance: 1000,
    productType: 'giftcard',
    description:
      "JB Hi-Fi Gift Cards are the perfect gift no matter what the reason. You can send a Gift Card in the post or by email, however you like. Send it to the lucky recipient or to yourself.  And there's no rush because they never expire.\nPlease be assured that JB Hi-Fi will accept the use of Gift Cards for all of its products, subject to our terms and conditions.",
    termsAndConditions:
      "Thank you for selecting a JB Hi-Fi eGift Card. This card can be used online or at JB Hi-Fi Stores in Australia. This eCard does not expire. JB Hi-Fi is not liable for any lost/stolen Gift Cards. For full Terms & Conditions go to <a href='www.jbhifi.com.au'>www.jbhifi.com.au</a> or call 1300 554 268",
    email: null,
    howItWorks:
      'To redeem this gift card:</br>1. Go to the Payment section in the Vii app</br>2. Tap Add Payment Method and select Gift Card </br>3. Enter Gift Code',
    logo: {
      url: 'https://marketplace-service.cdn.staging.ehrocks.com/products/9641/CardDesignCorp.jpg',
      small: {
        url: 'https://marketplace-service.cdn.staging.ehrocks.com/products/9641/small_CardDesignCorp.jpg',
      },
      product: {
        url: 'https://marketplace-service.cdn.staging.ehrocks.com/products/9641/product_CardDesignCorp.jpg',
      },
      large: {
        url: 'https://marketplace-service.cdn.staging.ehrocks.com/products/9641/large_CardDesignCorp.jpg',
      },
    },
    usage:
      'To redeem this gift card:</br>\n1. Go to the Payment section in the Vii app</br>\n2. Tap Add Payment Method and select Gift Card </br>\n3. Enter Gift Code',
    disabled: false,
    supplierId: '5748bd43-ec33-4fd4-9e88-0c3fd9655eec',
    productCategoryId: '339cc888-55ef-44d0-aeb8-15a11c6a6a64',
    transactionFee: 1.5,
    instapayFee: 0,
    heroDollarsFee: 0,
    serviceFee: 0.5,
    participant: null,
    supplier: {
      id: '5748bd43-ec33-4fd4-9e88-0c3fd9655eec',
      name: 'Vii Corporate',
      description: null,
      imageUrl: null,
      email: 'vii@supplier.com',
      phoneNumber: null,
      website: null,
    },
    productVariants: [
      {
        id: 'cfee754a-7bdb-4602-b5be-ffc5e456d44d',
        variantCode: 'jb-hi-fi-gift-card-100',
        price: 100,
        amount: 100,
        stockAvailable: isStockAvailable,
        numberInStock: stock,
        imageUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/product_variants/9663/CardDesignCorp.jpg',
        discountPrice: 95,
        freightPrice: 0,
        status: 'active',
        label: 'Amount: $100',
        cardId: null,
        position: 0,
      },
    ],
  };
};
