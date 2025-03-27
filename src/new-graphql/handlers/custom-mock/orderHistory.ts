export const MockGetOrderHistory = {
  1: {
    me: {
      swagStore: {
        discountOrderHistory: {
          pageInfo: {
            totalCount: 15,
            totalPages: 2,
            hasNextPage: true,
            endCursor: '22299',
          },
          edges: [
            {
              node: {
                type: 'Order',
                id: '2202',
                name: 'Movie Voucher',
                memberId: '425a4dd3-3709-4929-ae45-574e7d653649',
                status: 'fulfilled',
                createdAt: '2021-09-22T02:22:27+00:00',
                billableAmount: 32.24,
                transactionFee: 0.0,
                freightCost: 0.0,
                orderDetails: [
                  {
                    id: '2248',
                    discount: 11.76,
                    quantity: 2,
                    price: 22.0,
                    billableAmount: 32.24,
                    transactionFee: 0.0,
                    status: 'fulfilled',
                    freightCost: 0.0,
                    currency: 'AUD',
                    purchaseItems: [
                      {
                        id: 'f955a8e0-0bb6-4767-bf10-cb830384703d',
                        data: {
                          pin: '9795',
                          promo: '1329700\r',
                          expiry: '2022-10-15',
                          barCode: 'G1E703629535',
                        },
                        purchaseId: '45356b23-735c-459a-b4cc-6901b9cc27e7',
                        productVariantId: '96ecc75a-1664-4628-8786-f6d5a33a07f8',
                        fulfill: {
                          id: '775fdddb-a321-4283-971f-56c9e53740a1',
                          isUsed: true,
                          balance: null,
                        },
                      },
                      {
                        id: '74e7b8b9-e8b1-4023-94af-f974019f0e27',
                        data: {
                          pin: '1064',
                          promo: '1329700\r',
                          expiry: '2022-10-15',
                          barCode: 'G1E703629544',
                        },
                        purchaseId: '45356b23-735c-459a-b4cc-6901b9cc27e7',
                        productVariantId: '96ecc75a-1664-4628-8786-f6d5a33a07f8',
                        fulfill: {
                          id: 'd8925da1-7a7a-4bdf-9be2-29f563e8bf24',
                          isUsed: false,
                          balance: null,
                        },
                      },
                    ],
                    productVariant: {
                      variantCode: 'EGOLD_CLASS_SINGLE',
                      price: 22.0,
                      imageUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/product_variants/5879/emovieadult.png',
                      discountPrice: 16.12,
                      amount: 22.0,
                      product: {
                        id: 'ec40f3d8-1e02-4d30-b946-7d913bc4e48e',
                        code: 'MV',
                        name: 'Movie Voucher',
                        title: 'Buy now or never 111',
                        imageUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/products/2596/1_1616149347.png',
                        logoUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/products/2596/Fronalpstock_big_1616387077.jpg',
                        email: null,
                        description: 'Movie voucher everywhere and everytime',
                        howItWorks:
                          "    <ul>      <li>      1 x Standard Adult admission to a movie session at Event, Greater Union, GU Film House, BCC or select Village Cinemaáds across Australia.        </li>      <li>      1 x Standard Child (3-15 yrs) admission to a movie session at Event, Greater Union, GU Film House, BCC or select Village Cinemas across Australia.        </li>      <li style='color: red;'>      Restricted vouchers are NOT valid for use from 5pm Saturdays.        </li>      <li>      Valid for 6 Months      </li>      <li>      T&C's apply      </li>    </ul>",
                        productType: 'ticket',
                      },
                    },
                  },
                ],
              }
            },
            {
              node: {
                id: '2334',
                name: 'Uber Gift Card 100 eGift Card',
                memberId: '425a4dd3-3709-4929-ae45-574e7d653649',
                status: 'processing',
                createdAt: '2022-09-26T08:52:16+00:00',
                billableAmount: 95.94,
                transactionFee: 0.94,
                freightCost: 0.0,
                orderDetails: [
                  {
                    id: '2380',
                    discount: 5.0,
                    quantity: 1,
                    price: 100.0,
                    billableAmount: 95.94,
                    transactionFee: 0.94,
                    status: 'processing',
                    freightCost: 0.0,
                    currency: 'AUD',
                    purchaseItems: [],
                    productVariant: {
                      variantCode: 'uber-gift-card-100',
                      price: 100.0,
                      imageUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/product_variants/9324/uber-gift-card.png',
                      discountPrice: 95.0,
                      amount: 100.0,
                      product: {
                        id: '6088fd0e-a37d-45d5-b1c7-305de9c113cf',
                        code: 'uber-gift-card',
                        name: 'Uber Gift Card',
                        title: 'Uber Gift Card',
                        imageUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/products/9300/uber-gift-card.png',
                        logoUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/products/9300/uber-gift-card.png',
                        email: null,
                        description: 'Get a reliable ride in minutes with the Uber app. ',
                        howItWorks:
                          'To redeem this gift card: <br/>1. Go to the Payment section in the Uber app <br/>2. Tap Add Payment Method and select Gift Card <br/>3. Enter Gift Code',
                        productType: 'Giftcard',
                      },
                    },
                  },
                ],
              }
            },
            {
              node: {
                id: '2306',
                name: 'JB Hi-Fi Gift Card 100 eGift Card',
                memberId: '425a4dd3-3709-4929-ae45-574e7d653649',
                status: 'fulfilled',
                createdAt: '2022-09-23T05:27:59+00:00',
                billableAmount: 95.94,
                transactionFee: 0.94,
                freightCost: 0.0,
                orderDetails: [
                  {
                    id: '2352',
                    discount: 5.0,
                    quantity: 1,
                    price: 100.0,
                    billableAmount: 95.94,
                    transactionFee: 0.94,
                    status: 'fulfilled',
                    freightCost: 0.0,
                    currency: 'AUD',
                    purchaseItems: [
                      {
                        id: 'e1c9a31e-dd2c-4928-b6db-908e73a7b528',
                        data: {
                          issuedAt: '2022/09/23',
                          pinNumber: '3634',
                          cardNumber: '502904030365203495',
                          serialNumber: '3652034',
                          activationUrl:
                            'https://stage.viicloud.com.au/digital/dd.aspx?c=502904030365203495&h=0x17c16840805a70de11df825997de8152192a4c461be9d170ddc0fb9e51ee3506',
                          orderDetailId: 'fa37a896-93fc-4c9b-8846-cdd2a5de72af',
                        },
                        purchaseId: '143a6814-6fcb-4d14-b9f3-101583592af7',
                        productVariantId: 'cfee754a-7bdb-4602-b5be-ffc5e456d44d',
                      },
                    ],
                    productVariant: {
                      variantCode: 'jb-hi-fi-gift-card-100',
                      price: 100.0,
                      imageUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/product_variants/9663/CardDesignCorp.jpg',
                      discountPrice: 95.0,
                      amount: 100.0,
                      product: {
                        id: '207fb444-f281-4241-8c5e-f42a0e8755af',
                        code: 'jb-hi-fi-gift-card',
                        name: 'JB Hi-Fi Gift Card',
                        title: 'JB Hi-Fi Gift Card',
                        imageUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/products/9641/CardDesignCorp.jpg',
                        logoUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/products/9641/CardDesignCorp.jpg',
                        email: null,
                        description:
                          "JB Hi-Fi Gift Cards are the perfect gift no matter what the reason. You can send a Gift Card in the post or by email, however you like. Send it to the lucky recipient or to yourself.  And there's no rush because they never expire.\nPlease be assured that JB Hi-Fi will accept the use of Gift Cards for all of its products, subject to our terms and conditions.",
                        howItWorks:
                          'To redeem this gift card:</br>1. Go to the Payment section in the Vii app</br>2. Tap Add Payment Method and select Gift Card </br>3. Enter Gift Code',
                        productType: 'Giftcard',
                      },
                    },
                  },
                ],
              }
            },
            {
              node: {
                id: '2299',
                name: 'Bose - 240V Surround Speakers for Bose Soundbar 500/700 - Black',
                memberId: '425a4dd3-3709-4929-ae45-574e7d653649',
                status: 'processing',
                createdAt: '2022-09-18T16:54:32+00:00',
                billableAmount: 484.23,
                transactionFee: 4.74,
                freightCost: 16.5,
                orderDetails: [
                  {
                    id: '2345',
                    discount: 66.96,
                    quantity: 1,
                    price: 529.95,
                    billableAmount: 484.23,
                    transactionFee: 4.74,
                    status: 'processing',
                    freightCost: 16.5,
                    currency: 'AUD',
                    purchase_items: [],
                    productVariant: {
                      variantCode: 'HN_8092815110_8092815110',
                      price: 529.95,
                      imageUrl: null,
                      discountPrice: 462.99,
                      amount: 529.95,
                      product: {
                        id: '9f720098-3562-43e6-80ff-02e2e8179a33',
                        code: 'HN_8092815110',
                        name: 'Bose - 240V Surround Speakers for Bose Soundbar 500/700 - Black',
                        title: 'Bose - 240V Surround Speakers for Bose Soundbar 500/700 - Black',
                        imageUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/products/4168/8092815110_2_web.jpg',
                        logoUrl: null,
                        email: null,
                        description:
                          "You want to hear the car chases and explosions. You want to savour the guitar solos and sweeping verses. You want to be in the middle of all the action&mdash;and the Bose Surround Speakers put you there. Designed exclusively to pair with the Bose Soundbar 500 or the Bose Soundbar 700, these unobtrusive rear surround speakers provide sweeping sound that adds to your movies, sports and TV shows. When it comes to rear surround speakers, the only thing you want to stand out is the sound. Standing less than 11 cm high, the Bose Surround Speakers fit right in with sound that stands out.    Connect wirelessly for easier placement  Compelling, cinema-like, immersive sound  Blend nicely into your room, standing less than 11 cm tall    What's in the Box:     1x 240V Surround Speakers for Bose Soundbar 500/700 - Black  ",
                        howItWorks: null,
                        productType: 'dropship',
                      },
                    },
                  },
                ],
              }
            },
            {
              node: {
                type: 'Order',
                id: '22022',
                name: 'Movie Voucher',
                memberId: '425a4dd3-3709-4929-ae45-574e7d653649',
                status: 'fulfilled',
                createdAt: '2021-09-22T02:22:27+00:00',
                billableAmount: 32.24,
                transactionFee: 0.0,
                freightCost: 0.0,
                orderDetails: [
                  {
                    id: '2248',
                    discount: 11.76,
                    quantity: 2,
                    price: 22.0,
                    billableAmount: 32.24,
                    transactionFee: 0.0,
                    status: 'fulfilled',
                    freightCost: 0.0,
                    currency: 'AUD',
                    purchaseItems: [
                      {
                        id: 'f955a8e0-0bb6-4767-bf10-cb830384703d',
                        data: {
                          pin: '9795',
                          promo: '1329700\r',
                          expiry: '2022-10-15',
                          barCode: 'G1E703629535',
                        },
                        purchaseId: '45356b23-735c-459a-b4cc-6901b9cc27e7',
                        productVariantId: '96ecc75a-1664-4628-8786-f6d5a33a07f8',
                        fulfill: {
                          id: '775fdddb-a321-4283-971f-56c9e53740a1',
                          isUsed: true,
                          balance: null,
                        },
                      },
                      {
                        id: '74e7b8b9-e8b1-4023-94af-f974019f0e27',
                        data: {
                          pin: '1064',
                          promo: '1329700\r',
                          expiry: '2022-10-15',
                          barCode: 'G1E703629544',
                        },
                        purchaseId: '45356b23-735c-459a-b4cc-6901b9cc27e7',
                        productVariantId: '96ecc75a-1664-4628-8786-f6d5a33a07f8',
                        fulfill: {
                          id: 'd8925da1-7a7a-4bdf-9be2-29f563e8bf24',
                          isUsed: false,
                          balance: null,
                        },
                      },
                    ],
                    productVariant: {
                      variantCode: 'EGOLD_CLASS_SINGLE',
                      price: 22.0,
                      imageUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/product_variants/5879/emovieadult.png',
                      discountPrice: 16.12,
                      amount: 22.0,
                      product: {
                        id: 'ec40f3d8-1e02-4d30-b946-7d913bc4e48e',
                        code: 'MV',
                        name: 'Movie Voucher',
                        title: 'Buy now or never 111',
                        imageUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/products/2596/1_1616149347.png',
                        logoUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/products/2596/Fronalpstock_big_1616387077.jpg',
                        email: null,
                        description: 'Movie voucher everywhere and everytime',
                        howItWorks:
                          "    <ul>      <li>      1 x Standard Adult admission to a movie session at Event, Greater Union, GU Film House, BCC or select Village Cinemaáds across Australia.        </li>      <li>      1 x Standard Child (3-15 yrs) admission to a movie session at Event, Greater Union, GU Film House, BCC or select Village Cinemas across Australia.        </li>      <li style='color: red;'>      Restricted vouchers are NOT valid for use from 5pm Saturdays.        </li>      <li>      Valid for 6 Months      </li>      <li>      T&C's apply      </li>    </ul>",
                        productType: 'ticket',
                      },
                    },
                  },
                ],
              }
            },
            {
              node: {
                id: '23342',
                name: 'Uber Gift Card 100 eGift Card',
                memberId: '425a4dd3-3709-4929-ae45-574e7d653649',
                status: 'processing',
                createdAt: '2022-09-26T08:52:16+00:00',
                billableAmount: 95.94,
                transactionFee: 0.94,
                freightCost: 0.0,
                orderDetails: [
                  {
                    id: '2380',
                    discount: 5.0,
                    quantity: 1,
                    price: 100.0,
                    billableAmount: 95.94,
                    transactionFee: 0.94,
                    status: 'processing',
                    freightCost: 0.0,
                    currency: 'AUD',
                    purchaseItems: [],
                    productVariant: {
                      variantCode: 'uber-gift-card-100',
                      price: 100.0,
                      imageUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/product_variants/9324/uber-gift-card.png',
                      discountPrice: 95.0,
                      amount: 100.0,
                      product: {
                        id: '6088fd0e-a37d-45d5-b1c7-305de9c113cf',
                        code: 'uber-gift-card',
                        name: 'Uber Gift Card',
                        title: 'Uber Gift Card',
                        imageUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/products/9300/uber-gift-card.png',
                        logoUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/products/9300/uber-gift-card.png',
                        email: null,
                        description: 'Get a reliable ride in minutes with the Uber app. ',
                        howItWorks:
                          'To redeem this gift card: <br/>1. Go to the Payment section in the Uber app <br/>2. Tap Add Payment Method and select Gift Card <br/>3. Enter Gift Code',
                        productType: 'Giftcard',
                      },
                    },
                  },
                ],
              }
            },
            {
              node: {
                id: '23026',
                name: 'JB Hi-Fi Gift Card 100 eGift Card',
                memberId: '425a4dd3-3709-4929-ae45-574e7d653649',
                status: 'fulfilled',
                createdAt: '2022-09-23T05:27:59+00:00',
                billableAmount: 95.94,
                transactionFee: 0.94,
                freightCost: 0.0,
                orderDetails: [
                  {
                    id: '2352',
                    discount: 5.0,
                    quantity: 1,
                    price: 100.0,
                    billableAmount: 95.94,
                    transactionFee: 0.94,
                    status: 'fulfilled',
                    freightCost: 0.0,
                    currency: 'AUD',
                    purchaseItems: [
                      {
                        id: 'e1c9a31e-dd2c-4928-b6db-908e73a7b528',
                        data: {
                          issuedAt: '2022/09/23',
                          pinNumber: '3634',
                          cardNumber: '502904030365203495',
                          serialNumber: '3652034',
                          activationUrl:
                            'https://stage.viicloud.com.au/digital/dd.aspx?c=502904030365203495&h=0x17c16840805a70de11df825997de8152192a4c461be9d170ddc0fb9e51ee3506',
                          orderDetailId: 'fa37a896-93fc-4c9b-8846-cdd2a5de72af',
                        },
                        purchaseId: '143a6814-6fcb-4d14-b9f3-101583592af7',
                        productVariantId: 'cfee754a-7bdb-4602-b5be-ffc5e456d44d',
                      },
                    ],
                    productVariant: {
                      variantCode: 'jb-hi-fi-gift-card-100',
                      price: 100.0,
                      imageUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/product_variants/9663/CardDesignCorp.jpg',
                      discountPrice: 95.0,
                      amount: 100.0,
                      product: {
                        id: '207fb444-f281-4241-8c5e-f42a0e8755af',
                        code: 'jb-hi-fi-gift-card',
                        name: 'JB Hi-Fi Gift Card',
                        title: 'JB Hi-Fi Gift Card',
                        imageUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/products/9641/CardDesignCorp.jpg',
                        logoUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/products/9641/CardDesignCorp.jpg',
                        email: null,
                        description:
                          "JB Hi-Fi Gift Cards are the perfect gift no matter what the reason. You can send a Gift Card in the post or by email, however you like. Send it to the lucky recipient or to yourself.  And there's no rush because they never expire.\nPlease be assured that JB Hi-Fi will accept the use of Gift Cards for all of its products, subject to our terms and conditions.",
                        howItWorks:
                          'To redeem this gift card:</br>1. Go to the Payment section in the Vii app</br>2. Tap Add Payment Method and select Gift Card </br>3. Enter Gift Code',
                        productType: 'Giftcard',
                      },
                    },
                  },
                ],
              }
            },
            {
              node: {
                id: '22299',
                name: 'Bose - 240V Surround Speakers for Bose Soundbar 500/700 - Black',
                memberId: '425a4dd3-3709-4929-ae45-574e7d653649',
                status: 'processing',
                createdAt: '2022-09-18T16:54:32+00:00',
                billableAmount: 484.23,
                transactionFee: 4.74,
                freightCost: 16.5,
                orderDetails: [
                  {
                    id: '2345',
                    discount: 66.96,
                    quantity: 1,
                    price: 529.95,
                    billableAmount: 484.23,
                    transactionFee: 4.74,
                    status: 'processing',
                    freightCost: 16.5,
                    currency: 'AUD',
                    purchase_items: [],
                    productVariant: {
                      variantCode: 'HN_8092815110_8092815110',
                      price: 529.95,
                      imageUrl: null,
                      discountPrice: 462.99,
                      amount: 529.95,
                      product: {
                        id: '9f720098-3562-43e6-80ff-02e2e8179a33',
                        code: 'HN_8092815110',
                        name: 'Bose - 240V Surround Speakers for Bose Soundbar 500/700 - Black',
                        title: 'Bose - 240V Surround Speakers for Bose Soundbar 500/700 - Black',
                        imageUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/products/4168/8092815110_2_web.jpg',
                        logoUrl: null,
                        email: null,
                        description:
                          "You want to hear the car chases and explosions. You want to savour the guitar solos and sweeping verses. You want to be in the middle of all the action&mdash;and the Bose Surround Speakers put you there. Designed exclusively to pair with the Bose Soundbar 500 or the Bose Soundbar 700, these unobtrusive rear surround speakers provide sweeping sound that adds to your movies, sports and TV shows. When it comes to rear surround speakers, the only thing you want to stand out is the sound. Standing less than 11 cm high, the Bose Surround Speakers fit right in with sound that stands out.    Connect wirelessly for easier placement  Compelling, cinema-like, immersive sound  Blend nicely into your room, standing less than 11 cm tall    What's in the Box:     1x 240V Surround Speakers for Bose Soundbar 500/700 - Black  ",
                        howItWorks: null,
                        productType: 'dropship',
                      },
                    },
                  },
                ],
              }
            },
          ],
        }
      }
    }

  },
  2: {
    me: {
      swagStore: {
        discountOrderHistory: {
          pageInfo: {
            totalCount: 15,
            totalPages: 2,
            hasNextPage: false,
            endCursor: '2333026',
          },
          edges: [
            {
              node: {
                type: 'Order',
                id: '220233',
                name: 'Movie Voucher',
                memberId: '425a4dd3-3709-4929-ae45-574e7d653649',
                status: 'fulfilled',
                createdAt: '2021-09-22T02:22:27+00:00',
                billableAmount: 32.24,
                transactionFee: 0.0,
                freightCost: 0.0,
                orderDetails: [
                  {
                    id: '2248',
                    discount: 11.76,
                    quantity: 2,
                    price: 22.0,
                    billableAmount: 32.24,
                    transactionFee: 0.0,
                    status: 'fulfilled',
                    freightCost: 0.0,
                    currency: 'AUD',
                    purchaseItems: [
                      {
                        id: 'f955a8e0-0bb6-4767-bf10-cb830384703d',
                        data: {
                          pin: '9795',
                          promo: '1329700\r',
                          expiry: '2022-10-15',
                          barCode: 'G1E703629535',
                        },
                        purchaseId: '45356b23-735c-459a-b4cc-6901b9cc27e7',
                        productVariantId: '96ecc75a-1664-4628-8786-f6d5a33a07f8',
                        fulfill: {
                          id: '775fdddb-a321-4283-971f-56c9e53740a1',
                          isUsed: true,
                          balance: null,
                        },
                      },
                      {
                        id: '74e7b8b9-e8b1-4023-94af-f974019f0e27',
                        data: {
                          pin: '1064',
                          promo: '1329700\r',
                          expiry: '2022-10-15',
                          barCode: 'G1E703629544',
                        },
                        purchaseId: '45356b23-735c-459a-b4cc-6901b9cc27e7',
                        productVariantId: '96ecc75a-1664-4628-8786-f6d5a33a07f8',
                        fulfill: {
                          id: 'd8925da1-7a7a-4bdf-9be2-29f563e8bf24',
                          isUsed: false,
                          balance: null,
                        },
                      },
                    ],
                    productVariant: {
                      variantCode: 'EGOLD_CLASS_SINGLE',
                      price: 22.0,
                      imageUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/product_variants/5879/emovieadult.png',
                      discountPrice: 16.12,
                      amount: 22.0,
                      product: {
                        id: 'ec40f3d8-1e02-4d30-b946-7d913bc4e48e',
                        code: 'MV',
                        name: 'Movie Voucher',
                        title: 'Buy now or never 111',
                        imageUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/products/2596/1_1616149347.png',
                        logoUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/products/2596/Fronalpstock_big_1616387077.jpg',
                        email: null,
                        description: 'Movie voucher everywhere and everytime',
                        howItWorks:
                          "    <ul>      <li>      1 x Standard Adult admission to a movie session at Event, Greater Union, GU Film House, BCC or select Village Cinemaáds across Australia.        </li>      <li>      1 x Standard Child (3-15 yrs) admission to a movie session at Event, Greater Union, GU Film House, BCC or select Village Cinemas across Australia.        </li>      <li style='color: red;'>      Restricted vouchers are NOT valid for use from 5pm Saturdays.        </li>      <li>      Valid for 6 Months      </li>      <li>      T&C's apply      </li>    </ul>",
                        productType: 'ticket',
                      },
                    },
                  },
                ],
              }
            },
            {
              node: {
                id: '233334',
                name: 'Uber Gift Card 100 eGift Card',
                memberId: '425a4dd3-3709-4929-ae45-574e7d653649',
                status: 'processing',
                createdAt: '2022-09-26T08:52:16+00:00',
                billableAmount: 95.94,
                transactionFee: 0.94,
                freightCost: 0.0,
                orderDetails: [
                  {
                    id: '2380',
                    discount: 5.0,
                    quantity: 1,
                    price: 100.0,
                    billableAmount: 95.94,
                    transactionFee: 0.94,
                    status: 'processing',
                    freightCost: 0.0,
                    currency: 'AUD',
                    purchaseItems: [],
                    productVariant: {
                      variantCode: 'uber-gift-card-100',
                      price: 100.0,
                      imageUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/product_variants/9324/uber-gift-card.png',
                      discountPrice: 95.0,
                      amount: 100.0,
                      product: {
                        id: '6088fd0e-a37d-45d5-b1c7-305de9c113cf',
                        code: 'uber-gift-card',
                        name: 'Uber Gift Card',
                        title: 'Uber Gift Card',
                        imageUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/products/9300/uber-gift-card.png',
                        logoUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/products/9300/uber-gift-card.png',
                        email: null,
                        description: 'Get a reliable ride in minutes with the Uber app. ',
                        howItWorks:
                          'To redeem this gift card: <br/>1. Go to the Payment section in the Uber app <br/>2. Tap Add Payment Method and select Gift Card <br/>3. Enter Gift Code',
                        productType: 'Giftcard',
                      },
                    },
                  },
                ],
              }
            },
            {
              node: {
                id: '233306',
                name: 'JB Hi-Fi Gift Card 100 eGift Card',
                memberId: '425a4dd3-3709-4929-ae45-574e7d653649',
                status: 'fulfilled',
                createdAt: '2022-09-23T05:27:59+00:00',
                billableAmount: 95.94,
                transactionFee: 0.94,
                freightCost: 0.0,
                orderDetails: [
                  {
                    id: '2352',
                    discount: 5.0,
                    quantity: 1,
                    price: 100.0,
                    billableAmount: 95.94,
                    transactionFee: 0.94,
                    status: 'fulfilled',
                    freightCost: 0.0,
                    currency: 'AUD',
                    purchaseItems: [
                      {
                        id: 'e1c9a31e-dd2c-4928-b6db-908e73a7b528',
                        data: {
                          issuedAt: '2022/09/23',
                          pinNumber: '3634',
                          cardNumber: '502904030365203495',
                          serialNumber: '3652034',
                          activationUrl:
                            'https://stage.viicloud.com.au/digital/dd.aspx?c=502904030365203495&h=0x17c16840805a70de11df825997de8152192a4c461be9d170ddc0fb9e51ee3506',
                          orderDetailId: 'fa37a896-93fc-4c9b-8846-cdd2a5de72af',
                        },
                        purchaseId: '143a6814-6fcb-4d14-b9f3-101583592af7',
                        productVariantId: 'cfee754a-7bdb-4602-b5be-ffc5e456d44d',
                      },
                    ],
                    productVariant: {
                      variantCode: 'jb-hi-fi-gift-card-100',
                      price: 100.0,
                      imageUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/product_variants/9663/CardDesignCorp.jpg',
                      discountPrice: 95.0,
                      amount: 100.0,
                      product: {
                        id: '207fb444-f281-4241-8c5e-f42a0e8755af',
                        code: 'jb-hi-fi-gift-card',
                        name: 'JB Hi-Fi Gift Card',
                        title: 'JB Hi-Fi Gift Card',
                        imageUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/products/9641/CardDesignCorp.jpg',
                        logoUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/products/9641/CardDesignCorp.jpg',
                        email: null,
                        description:
                          "JB Hi-Fi Gift Cards are the perfect gift no matter what the reason. You can send a Gift Card in the post or by email, however you like. Send it to the lucky recipient or to yourself.  And there's no rush because they never expire.\nPlease be assured that JB Hi-Fi will accept the use of Gift Cards for all of its products, subject to our terms and conditions.",
                        howItWorks:
                          'To redeem this gift card:</br>1. Go to the Payment section in the Vii app</br>2. Tap Add Payment Method and select Gift Card </br>3. Enter Gift Code',
                        productType: 'Giftcard',
                      },
                    },
                  },
                ],
              }
            },
            {
              node: {
                id: '244299',
                name: 'Bose - 240V Surround Speakers for Bose Soundbar 500/700 - Black',
                memberId: '425a4dd3-3709-4929-ae45-574e7d653649',
                status: 'processing',
                createdAt: '2022-09-18T16:54:32+00:00',
                billableAmount: 484.23,
                transactionFee: 4.74,
                freightCost: 16.5,
                orderDetails: [
                  {
                    id: '2345',
                    discount: 66.96,
                    quantity: 1,
                    price: 529.95,
                    billableAmount: 484.23,
                    transactionFee: 4.74,
                    status: 'processing',
                    freightCost: 16.5,
                    currency: 'AUD',
                    purchase_items: [],
                    productVariant: {
                      variantCode: 'HN_8092815110_8092815110',
                      price: 529.95,
                      imageUrl: null,
                      discountPrice: 462.99,
                      amount: 529.95,
                      product: {
                        id: '9f720098-3562-43e6-80ff-02e2e8179a33',
                        code: 'HN_8092815110',
                        name: 'Bose - 240V Surround Speakers for Bose Soundbar 500/700 - Black',
                        title: 'Bose - 240V Surround Speakers for Bose Soundbar 500/700 - Black',
                        imageUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/products/4168/8092815110_2_web.jpg',
                        logoUrl: null,
                        email: null,
                        description:
                          "You want to hear the car chases and explosions. You want to savour the guitar solos and sweeping verses. You want to be in the middle of all the action&mdash;and the Bose Surround Speakers put you there. Designed exclusively to pair with the Bose Soundbar 500 or the Bose Soundbar 700, these unobtrusive rear surround speakers provide sweeping sound that adds to your movies, sports and TV shows. When it comes to rear surround speakers, the only thing you want to stand out is the sound. Standing less than 11 cm high, the Bose Surround Speakers fit right in with sound that stands out.    Connect wirelessly for easier placement  Compelling, cinema-like, immersive sound  Blend nicely into your room, standing less than 11 cm tall    What's in the Box:     1x 240V Surround Speakers for Bose Soundbar 500/700 - Black  ",
                        howItWorks: null,
                        productType: 'dropship',
                      },
                    },
                  },
                ],
              }
            },
            {
              node: {
                type: 'Order',
                id: '2204422',
                name: 'Movie Voucher',
                memberId: '425a4dd3-3709-4929-ae45-574e7d653649',
                status: 'fulfilled',
                createdAt: '2021-09-22T02:22:27+00:00',
                billableAmount: 32.24,
                transactionFee: 0.0,
                freightCost: 0.0,
                orderDetails: [
                  {
                    id: '2248',
                    discount: 11.76,
                    quantity: 2,
                    price: 22.0,
                    billableAmount: 32.24,
                    transactionFee: 0.0,
                    status: 'fulfilled',
                    freightCost: 0.0,
                    currency: 'AUD',
                    purchaseItems: [
                      {
                        id: 'f955a8e0-0bb6-4767-bf10-cb830384703d',
                        data: {
                          pin: '9795',
                          promo: '1329700\r',
                          expiry: '2022-10-15',
                          barCode: 'G1E703629535',
                        },
                        purchaseId: '45356b23-735c-459a-b4cc-6901b9cc27e7',
                        productVariantId: '96ecc75a-1664-4628-8786-f6d5a33a07f8',
                        fulfill: {
                          id: '775fdddb-a321-4283-971f-56c9e53740a1',
                          isUsed: true,
                          balance: null,
                        },
                      },
                      {
                        id: '74e7b8b9-e8b1-4023-94af-f974019f0e27',
                        data: {
                          pin: '1064',
                          promo: '1329700\r',
                          expiry: '2022-10-15',
                          barCode: 'G1E703629544',
                        },
                        purchaseId: '45356b23-735c-459a-b4cc-6901b9cc27e7',
                        productVariantId: '96ecc75a-1664-4628-8786-f6d5a33a07f8',
                        fulfill: {
                          id: 'd8925da1-7a7a-4bdf-9be2-29f563e8bf24',
                          isUsed: false,
                          balance: null,
                        },
                      },
                    ],
                    productVariant: {
                      variantCode: 'EGOLD_CLASS_SINGLE',
                      price: 22.0,
                      imageUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/product_variants/5879/emovieadult.png',
                      discountPrice: 16.12,
                      amount: 22.0,
                      product: {
                        id: 'ec40f3d8-1e02-4d30-b946-7d913bc4e48e',
                        code: 'MV',
                        name: 'Movie Voucher',
                        title: 'Buy now or never 111',
                        imageUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/products/2596/1_1616149347.png',
                        logoUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/products/2596/Fronalpstock_big_1616387077.jpg',
                        email: null,
                        description: 'Movie voucher everywhere and everytime',
                        howItWorks:
                          "    <ul>      <li>      1 x Standard Adult admission to a movie session at Event, Greater Union, GU Film House, BCC or select Village Cinemaáds across Australia.        </li>      <li>      1 x Standard Child (3-15 yrs) admission to a movie session at Event, Greater Union, GU Film House, BCC or select Village Cinemas across Australia.        </li>      <li style='color: red;'>      Restricted vouchers are NOT valid for use from 5pm Saturdays.        </li>      <li>      Valid for 6 Months      </li>      <li>      T&C's apply      </li>    </ul>",
                        productType: 'ticket',
                      },
                    },
                  },
                ],
              }
            },
            {
              node: {
                id: '2333342',
                name: 'Uber Gift Card 100 eGift Card',
                memberId: '425a4dd3-3709-4929-ae45-574e7d653649',
                status: 'processing',
                createdAt: '2022-09-26T08:52:16+00:00',
                billableAmount: 95.94,
                transactionFee: 0.94,
                freightCost: 0.0,
                orderDetails: [
                  {
                    id: '2380',
                    discount: 5.0,
                    quantity: 1,
                    price: 100.0,
                    billableAmount: 95.94,
                    transactionFee: 0.94,
                    status: 'processing',
                    freightCost: 0.0,
                    currency: 'AUD',
                    purchaseItems: [],
                    productVariant: {
                      variantCode: 'uber-gift-card-100',
                      price: 100.0,
                      imageUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/product_variants/9324/uber-gift-card.png',
                      discountPrice: 95.0,
                      amount: 100.0,
                      product: {
                        id: '6088fd0e-a37d-45d5-b1c7-305de9c113cf',
                        code: 'uber-gift-card',
                        name: 'Uber Gift Card',
                        title: 'Uber Gift Card',
                        imageUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/products/9300/uber-gift-card.png',
                        logoUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/products/9300/uber-gift-card.png',
                        email: null,
                        description: 'Get a reliable ride in minutes with the Uber app. ',
                        howItWorks:
                          'To redeem this gift card: <br/>1. Go to the Payment section in the Uber app <br/>2. Tap Add Payment Method and select Gift Card <br/>3. Enter Gift Code',
                        productType: 'Giftcard',
                      },
                    },
                  },
                ],
              }
            },
            {
              node: {
                id: '2333026',
                name: 'JB Hi-Fi Gift Card 100 eGift Card',
                memberId: '425a4dd3-3709-4929-ae45-574e7d653649',
                status: 'fulfilled',
                createdAt: '2022-09-23T05:27:59+00:00',
                billableAmount: 95.94,
                transactionFee: 0.94,
                freightCost: 0.0,
                orderDetails: [
                  {
                    id: '2352',
                    discount: 5.0,
                    quantity: 1,
                    price: 100.0,
                    billableAmount: 95.94,
                    transactionFee: 0.94,
                    status: 'fulfilled',
                    freightCost: 0.0,
                    currency: 'AUD',
                    purchaseItems: [
                      {
                        id: 'e1c9a31e-dd2c-4928-b6db-908e73a7b528',
                        data: {
                          issuedAt: '2022/09/23',
                          pinNumber: '3634',
                          cardNumber: '502904030365203495',
                          serialNumber: '3652034',
                          activationUrl:
                            'https://stage.viicloud.com.au/digital/dd.aspx?c=502904030365203495&h=0x17c16840805a70de11df825997de8152192a4c461be9d170ddc0fb9e51ee3506',
                          orderDetailId: 'fa37a896-93fc-4c9b-8846-cdd2a5de72af',
                        },
                        purchaseId: '143a6814-6fcb-4d14-b9f3-101583592af7',
                        productVariantId: 'cfee754a-7bdb-4602-b5be-ffc5e456d44d',
                      },
                    ],
                    productVariant: {
                      variantCode: 'jb-hi-fi-gift-card-100',
                      price: 100.0,
                      imageUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/product_variants/9663/CardDesignCorp.jpg',
                      discountPrice: 95.0,
                      amount: 100.0,
                      product: {
                        id: '207fb444-f281-4241-8c5e-f42a0e8755af',
                        code: 'jb-hi-fi-gift-card',
                        name: 'JB Hi-Fi Gift Card',
                        title: 'JB Hi-Fi Gift Card',
                        imageUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/products/9641/CardDesignCorp.jpg',
                        logoUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/products/9641/CardDesignCorp.jpg',
                        email: null,
                        description:
                          "JB Hi-Fi Gift Cards are the perfect gift no matter what the reason. You can send a Gift Card in the post or by email, however you like. Send it to the lucky recipient or to yourself.  And there's no rush because they never expire.\nPlease be assured that JB Hi-Fi will accept the use of Gift Cards for all of its products, subject to our terms and conditions.",
                        howItWorks:
                          'To redeem this gift card:</br>1. Go to the Payment section in the Vii app</br>2. Tap Add Payment Method and select Gift Card </br>3. Enter Gift Code',
                        productType: 'Giftcard',
                      },
                    },
                  },
                ],
              }
            },
          ],
        }
      }
    }

  },
};
