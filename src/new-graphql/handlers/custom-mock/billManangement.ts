import {
  BillStatus,
  type BmOffer,
  type BmOffers,
  Currency,
  type GetPromotionQuery,
  type GetSubscriptionDetailQuery,
  type GetSubscriptionsQuery,
  type GetSubscriptionTransactionsQuery,
  PaymentMethod,
  PaymentType,
  Pid,
  SubscriptionStatus,
  SubscriptionType,
  TxnType,
} from '../../generated';
import { aTransactionEdge } from '../../mocks/generated-mocks';

export const mockBillOffer: BmOffer = {
  __typename: 'BmOffer',
  about: 'asdasdasdasd',
  description: 'adsdasdads',
  estBillAmount: {
    amount: 100,
    currency: Currency.Aud,
  },
  howItWorks: 'dasdsdsa',
  id: '12',
  paidAmount: {
    amount: 95,
    currency: Currency.Aud,
  },
  provider: {
    id: Pid.SimplyEnergy,
    name: 'Simply Energy',
  },
  savingPercentage: 5,
  termsAndConditions: '3123123',
  title: 'Swag discounts on your energy',
  imageUrl: 'https://i.ibb.co/fYCYLLs/se-cover.png',
  logoUrl: 'https://i.ibb.co/bb0JRx5/se-logo.png',
  categoryCode: 'bill',
  signUpLink:
    'https://www.simplyenergy.com.au/residential/product/employment-hero?utm_source=employment+hero&utm_medium=swag+referral&utm_campaign=employment+hero+2023',
};

const mockSEOffer: BmOffer = {
  __typename: 'BmOffer',
  id: '1',
  title: 'Shrink your energy bill with Swag',
  description:
    'When you sign up to ENGIE you’ll get simplicity and value:\n\t<ul>\n\t\t<li>An exclusive pay on time discount to help save on bills.</li>\n\t\t<li>Discounts off energy usage and supply charges</li>\n\t\t<li>Carbon neutral energy, it’s not an option or add-on you’ll need to activate.</li>\n\t\t<li>No lock-in contracts and zero exit fees.</li>\n\t\t<li>Access to the MyENGIE app to manage your energy.</li>\n\t</ul>',
  howItWorks:
    'All you need to do is:\n\t<ul>\n\t\t<li>Click on sign up and complete the onboarding process with ENGIE.</li>\n\t\t<li>Sit tight while your application is being processed.</li>\n\t\t<li>Once approved, view and manage your bills in the Money pillar bill management tab.</li>\n\t</ul>',
  about:
    'ENGIE offers great value electricity, gas, and solar power plans, with carbon neutral energy plans that can help offset the environmental impact from the energy used. We are now powering over 650,000 customer accounts around the country. ENGIE operates in over 30 countries. We’re using this global experience, technology and buying power to innovate locally and grow the services we offer Australians.',
  termsAndConditions:
    'ENGIE offer <a href="https://engie.com.au/help-centre/policies-and-commitments/market-contract-terms">terms and conditions</a> apply.<br/>\n\t\t<br/><br/>\n\t\tPlease note that the Swag savings discount is only given if you pay on time (within 14 days of receiving the bill).',
  savingPercentage: 5,
  signUpLink: 'https://stage.engie.com.au/residential/product/employment-hero',
  logoUrl: 'https://i.ibb.co/mDZLQTF/ENGIE-Logo.png',
  imageUrl: 'https://i.ibb.co/fYCYLLs/se-cover.png',
  registrationStatus: null,
  canSignUp: null,
  termsAndCondition: null,
  provider: {
    id: Pid.SimplyEnergy,
    name: 'ENGIE',
    faq: null,
    contactInfo: null,
    paymentUrl: null,
    logoUrl: 'https://i.ibb.co/mDZLQTF/ENGIE-Logo.png',
  },
  categoryCode: 'bill',
  paidAmount: {
    amount: 95,
    currency: Currency.Aud,
  },
  estBillAmount: {
    amount: 100,
    currency: Currency.Aud,
  },
  stateBasedOffers: [
    {
      state: 'NSW',
      combinedDiscount: 18.3,
      offerExplaination:
        'In the AusGrid network and on a single rate tariff the annual electricity reference price for an average residential customer is $1827. The electricity reference price for this offer only applies to single rate tariffs. If you have a time of use, controlled load or demand tariff, please call us on 1800 090 836.\\nIn the Ausgrid network and on your electricity tariff type the annual electricity reference price for an average residential customer is $1827. We estimate that an average residential customer in Ausgrid with a usage of 3911kWh in the first 12 months on this energy plan would pay $1391 on this SWAG Offer if you pay your bills on time, or $1464 if you don’t, based on the rates for DomSingle - Peak Only. This estimate includes GST and any conditional discounts or credits. Your actual bills may differ depending on your actual usage and any future price changes. This offer only applies to NSW residential customers on this tariff.',
      tiles: [
        {
          content: 'Unlock a 14% discount off',
          subContent: 'the electricity reference price',
        },
        {
          content: 'Additional 5% discount',
          subContent: 'when you pay your bills on time',
        },
        {
          content: 'You’ll also get a',
          subContent: '$200 credit for joining',
        },
      ],
    },
    {
      state: 'VIC',
      combinedDiscount: 32.55,
      offerExplaination:
        'In the CitiPower network and on a single rate tariff the annual electricity reference price for an average residential customer is $1570. The electricity reference price for this offer only applies to single rate tariffs. If you have a time of use, controlled load or demand tariff, please call us on 1800 090 836.\\nThis offer equates to 27% off the VDO as at 1 July 2023. We estimate that an average residential customer in CitiPower with a usage of 4000kWh in the first 12 months on this energy plan would pay $1145 on this SWAG Offer if you pay your bills on time, or $1206 if you don’t, based on the rates for GDGR- Peak Only|CL - Controlled Only. This estimate includes GST and includes the discount off our usage and supply charges (not the VDO). Your actual bills may differ depending on your actual usage and any future price changes. This offer only applies to Victorian residential customers on this tariff. The Victorian Default Market Offer for your network and tariff is $1570 as at 1 July 2023.',
      tiles: [
        {
          content: 'Unlock a 29% discount off',
          subContent: 'the Victorian electricity default offer',
        },
        {
          content: 'Additional 5% discount',
          subContent: 'when you pay your bills on time',
        },
        {
          content: 'You’ll also get a',
          subContent: '$200 credit for joining',
        },
      ],
    },
    {
      state: 'QLD',
      combinedDiscount: 23.05,
      offerExplaination:
        'In your network and on a single rate tariff the annual electricity reference price for an average residential customer is $1969. The electricity reference price for this offer only applies to single rate tariffs. If you have a time of use, controlled load or demand tariff, please call us on 1800 090 836.\\nIn your network and on your tariff type the annual electricity reference price for an average residential customer is $1969. We estimate that an average residential customer in Energex with a usage of 4613kWh in the first 12 months on this energy plan would pay $1796 on this SWAG Offer if you pay your bills on time, or $1890 if you don’t, based on the rates for T11 - Peak. This estimate includes GST and any conditional discounts or credits. Your actual bills may differ depending on your actual usage and any future price changes. This offer only applies to QLD residential customers on this tariff.',
      tiles: [
        {
          content: 'Unlock a 19% discount off',
          subContent: 'the electricity reference price',
        },
        {
          content: 'Additional 5% discount',
          subContent: 'when you pay your bills on time',
        },
      ],
    },
    {
      state: 'SA',
      combinedDiscount: 13.55,
      offerExplaination:
        'In your network and on a single rate tariff the annual electricity reference price for an average residential customer is $2279. The electricity reference price for this offer only applies to single rate tariffs. If you have a time of use, controlled load or demand tariff, please call us on 1800 090 836.\\nIn your network and on your electricity tariff type the annual electricity reference price for an average residential customer is $2279. We estimate that an average residential customer in SA Power Networks with a usage of 4011kWh in the first 12 months on this energy plan would pay $1967 on this SWAG Offer if you pay your bills on time, or $2070 if you don’t, based on the rates for 110 - Peak Only|Off Peak Controlled Load 116. This estimate includes GST and any conditional discounts or credits. Your actual bills may differ depending on your actual usage and any future price changes. This offer only applies to SA residential customers on this tariff.',
      tiles: [
        {
          content: 'Unlock a 9% discount off',
          subContent: 'the electricity reference price',
        },
        {
          content: 'Additional 5% discount',
          subContent: 'when you pay your bills on time',
        },
        {
          content: 'You’ll also get a',
          subContent: '$100 credit for joining',
        },
      ],
    },
  ],
};
const mockAHMOffer: BmOffer = {
  __typename: 'BmOffer',
  id: '2',
  title: 'Enjoy up to 12 weeks free!',
  description:
    'Sign up to ahm to enjoy up to 12 weeks free for hospital and extras or 6 weeks free for extras only as an Swag user!',
  howItWorks:
    'How it works is simple!\n\t<ol>\n\t\t<li>Follow the link in the swag app</li>\n\t\t<li>Copy the offer code</li>\n\t\t<li>Find a cover that best suits your needs</li>\n\t\t<li>Apply the offer code during checkout</li>\n\t</ol>',
  about:
    '\n\t\tStraightforward private health insurance.\n\t\t<br/><br/>\n\t\tEverything we do is about making things simpler, so you can make the most of what matters to you. \n\t',
  termsAndConditions:
    '<b>Hospital and extras offer</b> \n\t\t<br></br>\n\t\tNew joins on hospital & extras can get 6 weeks free after their first 60 days, and a further 6 weeks free after their first 395 days. Plus, any 2 & 6 month waiting periods on extras waived. \n\t\t<br></br>\n\t\t<b>Extras offer</b>\n\t\t<br></br>\n\t\tNew joins on extras can get 6 weeks free after their first 60 days. Waiting periods and annual limits apply.\n\t\t<br></br>\n\t\t<a href="https://engie.com.au/help-centre/policies-and-commitments/market-contract-terms">See terms to find out more!</a>',
  savingPercentage: 5,
  signUpLink: 'https://sales-dev13.ahm.ninja/swag',
  logoUrl: 'https://i.ibb.co/1R7Cw0g/Group-1321314653ahm-logo.png',
  imageUrl: 'https://i.ibb.co/9hc8XJ1/Imageahm-banner.png',
  registrationStatus: null,
  canSignUp: null,
  termsAndCondition: null,
  provider: {
    id: Pid.Ahm, // TODO: fix it later
    name: 'AHM',
    faq: null,
    contactInfo: null,
    paymentUrl: null,
    logoUrl: 'https://i.ibb.co/1R7Cw0g/Group-1321314653ahm-logo.png',
  },
  paidAmount: {
    amount: 0,
    currency: Currency.Aud,
  },
  estBillAmount: {
    amount: 0,
    currency: Currency.Aud,
  },
  stateBasedOffers: [],
  categoryCode: 'bill',
};
const mockMedibankOffer: BmOffer = {
  __typename: 'BmOffer',
  id: '3',
  title: '10% off Corporate Health Cover',
  description:
    'Join eligible Medibank Corporate hospital & extras:\n\t\t<ul>\n\t\t<li>Enjoy ongoing 10% discount on your corporate hospital and extras</li>\n\t\t<li>Choose how to spend your extras with flexi extras</li>\n\t\t<li>Exclusive to employees of Employment Hero clients</li>\n\t\t</ul> ',
  howItWorks:
    "Joining or switching is simple:\n\t\t<ul> \n\t\t<li>Follow the link in the Swag app</li>\n\t\t<li>Find the best cover for you</li>\n\t\t<li>All prices reflect the 10% ongoing discount</li>\n\t\t<li>Apply any other current offer codes at sign-up</li>\n\t\t<li>Switching? We'll cancel your old membership and organise your transfer certificate</li>\n\t\t</ul>",
  about:
    '\n\tMedibank believes in better health for better lives. We are a health company providing private health insurance and health services to millions of people across Australia. \n\t',
  termsAndConditions:
    '10% off eligible Medibank Corporate hospital and extras. Only available to active employees of any organisation that currently uses the Employment Hero HR platform.\n\t\t<br></br>\n\t\tWaiting periods and annual limits apply. Check your cover summary for full details. \n\t\t<br></br>\n\t\t<a href="https://engie.com.au/help-centre/policies-and-commitments/market-contract-terms">See terms to find out more!</a>',
  savingPercentage: 5,
  signUpLink: 'https://corporate.medibank.com.au/swag',
  logoUrl: 'https://i.ibb.co/mhgLHCD/Group-1321314653medibank-logo.png',
  imageUrl: 'https://i.ibb.co/L6sBCHs/Imagemedibank-banner.png',
  registrationStatus: null,
  canSignUp: null,
  termsAndCondition: null,
  provider: {
    id: Pid.Medibank,
    name: 'MEDIBANK',
    faq: null,
    contactInfo: null,
    paymentUrl: null,
    logoUrl: 'https://i.ibb.co/mhgLHCD/Group-1321314653medibank-logo.png',
  },
  paidAmount: {
    amount: 0,
    currency: Currency.Aud,
  },
  estBillAmount: {
    amount: 0,
    currency: Currency.Aud,
  },
  stateBasedOffers: [],
  categoryCode: 'bill',
};
export const mockBillOffers: BmOffers = {
  __typename: 'BmOffers',
  edges: [
    {
      __typename: 'BmOfferEdge',
      node: mockSEOffer,
    },
    {
      __typename: 'BmOfferEdge',
      node: mockAHMOffer,
    },
    {
      __typename: 'BmOfferEdge',
      node: mockMedibankOffer,
    },
  ],
  pageInfo: {
    hasNextPage: false,
  },
  error: null,
};
export const mockBillOfferList: BmOffer[] = [mockSEOffer, mockAHMOffer, mockMedibankOffer];

export const mockSubscriptionsQuery: GetSubscriptionsQuery = {
  me: {
    billManagement: {
      subscriptions: {
        edges: [
          {
            node: {
              createdAt: '2023-05-24T00:00:00.000Z',
              updatedAt: '2023-05-24T00:00:00.000Z',
              id: '123',
              status: SubscriptionStatus.Pending,
              subscriptionType: SubscriptionType.Electricity,
              provider: {
                id: Pid.SimplyEnergy,
                name: 'Simply Energy',
              },
              totalSaved: {
                amount: 95,
                currency: Currency.Aud,
              },
            },
          },
          {
            node: {
              id: '1234',
              createdAt: '2023-05-24T00:00:00.000Z',
              updatedAt: '2023-05-24T00:00:00.000Z',
              status: SubscriptionStatus.Pending,
              subscriptionType: SubscriptionType.Gas,
              provider: {
                id: Pid.SimplyEnergy,
                name: 'Simply Energy',
              },
              totalSaved: {
                amount: 95,
                currency: Currency.Aud,
              },
            },
          },
          {
            node: {
              id: '12345',
              createdAt: '2023-05-24T00:00:00.000Z',
              updatedAt: '2023-05-24T00:00:00.000Z',
              status: SubscriptionStatus.Submitted,
              subscriptionType: SubscriptionType.Electricity,
              provider: {
                id: Pid.SimplyEnergy,
                name: 'Simply Energy',
              },
              totalSaved: {
                amount: 95,
                currency: Currency.Aud,
              },
            },
          },
          {
            node: {
              id: '123455',
              createdAt: '2023-05-24T00:00:00.000Z',
              updatedAt: '2023-05-24T00:00:00.000Z',
              status: SubscriptionStatus.Active,
              subscriptionType: SubscriptionType.Electricity,
              provider: {
                id: Pid.SimplyEnergy,
                name: 'Simply Energy',
              },
              totalSaved: {
                amount: 96,
                currency: Currency.Aud,
              },
            },
          },
          {
            node: {
              id: '123455',
              createdAt: '2023-05-24T00:00:00.000Z',
              updatedAt: '2023-05-24T00:00:00.000Z',
              status: SubscriptionStatus.Active,
              subscriptionType: SubscriptionType.Gas,
              provider: {
                id: Pid.SimplyEnergy,
                name: 'Simply Energy',
              },
              latestBill: {
                id: '123',
                createdAt: '123',
                amount: {
                  amount: 123,
                  currency: Currency.Aud,
                },
                issueDate: '',
                dateFrom: '',
                dateTo: '',
                dueDate: '',
                status: BillStatus.Overdue,
                type: TxnType.Bill,
                transactionDate: '2023-05-24T00:00:00.000Z',
              },
              totalSaved: {
                amount: 96,
                currency: Currency.Aud,
              },
            },
          },
          {
            node: {
              id: '1234553123',
              createdAt: '2023-05-24T00:00:00.000Z',
              updatedAt: '2023-05-24T00:00:00.000Z',
              status: SubscriptionStatus.Pending,
              subscriptionType: SubscriptionType.Unknown,
              provider: {
                id: Pid.SimplyEnergy,
                name: 'Simply Energy',
              },
              totalSaved: {
                amount: 95,
                currency: Currency.Aud,
              },
            },
          },
        ],
        pageInfo: {
          hasNextPage: false,
          endCursor: undefined,
        },
      },
    },
  },
};

export const mockSubscriptionDetailQuery: GetSubscriptionDetailQuery = {
  me: {
    billManagement: {
      subscription: {
        id: '123',
        createdAt: '2023-05-24T00:00:00.000Z',
        updatedAt: '2023-05-24T00:00:00.000Z',
        status: SubscriptionStatus.Active,
        subscriptionType: SubscriptionType.Electricity,
        provider: {
          id: Pid.SimplyEnergy,
          name: 'Simply Energy',
        },
        totalSaved: {
          amount: 95.25,
          currency: Currency.Aud,
        },
        latestBill: {
          id: '123',
          createdAt: '2023-05-24T00:00:00.000Z',
          amount: {
            amount: 123.24,
            currency: Currency.Aud,
          },
          issueDate: '2023-05-24T00:00:00.000Z',
          dateFrom: '2023-05-24T00:00:00.000Z',
          dateTo: '2023-05-24T00:00:00.000Z',
          dueDate: '2023-05-24T00:00:00.000Z',
          status: BillStatus.Overdue,
          transactionDate: '2023-05-24T00:00:00.000Z',
          type: TxnType.Bill,
        },
        transactions: {
          edges: [
            {
              node: {
                id: '123',
                createdAt: '2023-05-24T00:00:00.000Z',
                type: TxnType.Bill,
                issueDate: '123',
                dateFrom: '2023-05-24T00:00:00.000Z',
                dateTo: '2023-05-24T00:00:00.000Z',
                dueDate: '2023-05-24T00:00:00.000Z',
                transactionDate: '2023-05-24T00:00:00.000Z',
                status: BillStatus.Overdue,
                amount: {
                  amount: 123,
                  currency: Currency.Aud,
                },
              },
            },
            {
              node: {
                id: '123',
                createdAt: '2023-05-24T00:00:00.000Z',
                type: TxnType.Bill,
                issueDate: '123',
                dateFrom: '2023-05-24T00:00:00.000Z',
                dateTo: '2023-05-24T00:00:00.000Z',
                dueDate: '2023-05-24T00:00:00.000Z',
                transactionDate: '2023-05-24T00:00:00.000Z',
                status: BillStatus.Paid,
                amount: {
                  amount: 234.54,
                  currency: Currency.Aud,
                },
              },
            },
            {
              node: {
                id: '123',
                createdAt: '2023-05-24T00:00:00.000Z',
                type: TxnType.Payment,
                issueDate: '123',
                paymentDate: '2023-05-24T00:00:00.000Z',
                paymentMethod: PaymentMethod.DirectToProvider,
                paymentType: PaymentType.Mastercard,
                transactionDate: '2023-05-24T00:00:00.000Z',
                amount: {
                  amount: 67.32,
                  currency: Currency.Aud,
                },
              },
            },
            {
              node: {
                id: '123',
                createdAt: '2023-05-24T00:00:00.000Z',
                type: TxnType.Payment,
                issueDate: '123',
                paymentDate: '2023-05-24T00:00:00.000Z',
                paymentMethod: PaymentMethod.DirectToProvider,
                paymentType: PaymentType.Visa,
                transactionDate: '2023-05-24T00:00:00.000Z',
                amount: {
                  amount: 55.43,
                  currency: Currency.Aud,
                },
              },
            },
          ],
          pageInfo: {
            hasNextPage: false,
            endCursor: undefined,
          },
        },
      },
    },
  },
};

export const aSubscriptionTransactionsQuery: GetSubscriptionTransactionsQuery = {
  me: {
    billManagement: {
      subscription: {
        transactions: {
          pageInfo: {
            hasNextPage: false,
            endCursor: null,
          },
          edges: [aTransactionEdge()],
        },
      },
    },
  },
};

export const mockPromotionQuery: GetPromotionQuery = {
  me: {
    billManagement: {
      promotion: {
        homeTitle: 'Swag energy discounts +2,000 Hero Points on sign up!',
        homeSubTitle: 'Eligibility criteria & T&Cs apply. Limited offer, ends 31st May.',
        cardTitle: '2,000 Hero Points',
        cardSubTitle: 'on sign-up for exclusive energy discounts!',
        tagContent: 'EARN 2,000 PTS',
        descriptionBtsTitle: 'What’s 2,000 PTS?',
        descriptionBtsContent:
          'Sign up with ENGIE energy provider to receive 2,000 Hero Points. Limited time offer, ends 31st of May.',
        offerTitle: '2,000 Hero Points on sign up!',
        offerSubTitle: 'Limited offer, ends 31st May.',
        termsAndConditions:
          'Fusce volutpat lectus et nisl consectetur finibus. In vitae scelerisque augue, in varius eros. Nunc sapien diam, euismod et pretium id, volutpat et tortor. In vulputate lorem quis dui vestibulum, vitae imperdiet diam bibendum. Maecenas scelerisque orci a dolor vestibulum sagittis. Etiam quis finibus arcu, vel efficitur diam. Curabitur felis eros, vestibulum sed nisi eu, sodales aliquet lacus. Mauris lacinia quam quis feugiat laoreet. Etiam lobortis aliquet euismod. Nunc dictum, sapien at egestas rutrum, dui dui fringilla erat, a commodo augue augue vel magna. Sed tincidunt ante turpis, rhoncus commodo risus fringilla vel. Maecenas lacinia nisl a sem ornare pharetra. Donec imperdiet justo et elementum iaculis.',
        signedUpBillStatusContent: '2,000 Hero Points',
        signedUpCardTitle: 'coming your way soon!',
        signedUpCardSubTitle: '2,000 Hero Points coming soon!',
        searchCardTitle: 'Swag energy discounts + 2,000 PTS on sign up!',
      },
    },
  },
};
