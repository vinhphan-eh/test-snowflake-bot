import type { GroupDetail } from '../../generated';
import { aGroupCategory } from '../../mocks/generated-mocks';

export const MockGroupCategories = [
  {
    id: 'Phone plans',
    name: 'Phone plans',
  },
  {
    id: 'Groceries',
    name: 'Groceries',
  },
  {
    id: 'Life insurance',
    name: 'Life insurance',
  },
  {
    id: 'Health insurance',
    name: 'Health insurance',
  },
  {
    id: 'Vehicle insurance',
    name: 'Vehicle insurance',
  },
  {
    id: 'Petrol/Gas',
    name: 'Petrol/Gas',
  },
  {
    id: 'Education',
    name: 'Education',
  },
  {
    id: 'Childcare',
    name: 'Childcare',
  },
  {
    id: 'Home internet',
    name: 'Home internet',
  },
  {
    id: 'Vehicle leases',
    name: 'Vehicle leases',
  },
  {
    id: 'Household items',
    name: 'Household items',
  },
];

export const MockJoinWaitListWithCategoriesMutationResponeData = {
  group: {
    updateUserCategoriesPreference: {
      userCategoriesPreferences: [],
    },
    joinWaitList: {
      waitList: {
        userId: '2',
      },
    },
  },
};

export const MockGroups = [
  {
    id: 'cd1',
    promoTitle: 'Save big on Health Insurance',
    memberCount: 104307,
    description:
      "Say goodbye to hefty health insurance costs. We're using our 1.4M+ user community to make quality insurance affordable for everyone. \nWe negotiate the best health insurance discounts on your behalf —without compromising on the level of care and extras you receive. Together, let's shape a future where staying healthy doesn't break the bank. \nBe part of the movement and make your voice heard. Let's team up and save more on everyday essentials.",
    howItWorks: '',
    savingRange: '10%',
    savingPeriod: 'annual savings',
    subtitle: 'Join a community seeking affordable health insurance',
    categories: [aGroupCategory({ name: 'Health' })],
    shareContent:
      "Save big on health insurance! Join the Swag community to negotiate the best deals on quality insurance. Let's shape the future of affordable healthcare together!",
  },
  {
    id: 'cd2',
    promoTitle: 'Score the best deal on phone plans, together',
    memberCount: 23456,
    description:
      'Tired of shelling out big bucks for mobile plans? No worries! By banding together, we can ditch expensive plans without sacrificing quality or features. \nJump in, join our crew, and be a part of shaping the future of affordable mobile services through voting and getting involved.',
    howItWorks: '',
    savingRange: '10-20%',
    savingPeriod: 'target savings',
    subtitle: 'Join forces with fellow Swag users to secure affordable mobile data.',
    categories: [aGroupCategory({ name: 'Mobile Phones' })],
    shareContent:
      "Stay connected for less! Join the Swag community to wrangle the best deals on mobile plans for talk, text, and data. Don't miss out!",
  },
  {
    id: 'cd3',
    promoTitle: 'Stay connected for less',
    memberCount: 223456,
    description:
      'Tired of paying exorbitant prices for home internet? We’re using our 1.4M+ user community to negotiate the best deals on your behalf. Let’s cut the cost of living together. \nTired of shelling out big bucks for mobile plans? No worries! By banding together, we can ditch expensive plans without sacrificing quality or features.',
    howItWorks: '',
    savingRange: '10-20%',
    savingPeriod: 'annual savings',
    subtitle: 'Join our community to secure affordable home internet.',
    categories: [aGroupCategory({ name: 'Home Internet' })],
    shareContent:
      'Stay connected for less. Join the Swag community and help source unbeatable deals on home internet plans.',
  },
] as GroupDetail[];

export const MockGroupsWithCountry = [
  {
    id: 'cd1',
    promoTitle: 'Save big on Health Insurance - AU',
    countries: ['AU'],
    memberCount: 104307,
    description:
      "Say goodbye to hefty health insurance costs. We're using our 1.4M+ user community to make quality insurance affordable for everyone. \nWe negotiate the best health insurance discounts on your behalf —without compromising on the level of care and extras you receive. Together, let's shape a future where staying healthy doesn't break the bank. \nBe part of the movement and make your voice heard. Let's team up and save more on everyday essentials.",
    howItWorks: '',
    savingRange: '10%',
    savingPeriod: 'annual savings',
    subtitle: 'Join a community seeking affordable health insurance',
    categories: [aGroupCategory({ name: 'Health' })],
    shareContent:
      "Save big on health insurance! Join the Swag community to negotiate the best deals on quality insurance. Let's shape the future of affordable healthcare together!",
  },
  {
    id: 'cd2',
    promoTitle: 'Score the best deal on phone plans, together - UK',
    countries: ['UK'],
    memberCount: 23456,
    description:
      'Tired of shelling out big bucks for mobile plans? No worries! By banding together, we can ditch expensive plans without sacrificing quality or features. \nJump in, join our crew, and be a part of shaping the future of affordable mobile services through voting and getting involved.',
    howItWorks: '',
    savingRange: '10-20%',
    savingPeriod: 'target savings',
    subtitle: 'Join forces with fellow Swag users to secure affordable mobile data.',
    categories: [aGroupCategory({ name: 'Mobile Phones' })],
    shareContent:
      "Stay connected for less! Join the Swag community to wrangle the best deals on mobile plans for talk, text, and data. Don't miss out!",
  },
] as GroupDetail[];
