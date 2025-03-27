import type { CashbackIntroductionContent } from '../../../graphql/generated';

export const mockCashbackIntroductionContent: CashbackIntroductionContent = {
  step1: {
    heading: 'Shop, spend, save, repeat with Cashback.',
    verbiage:
      'With online and in-store offers curated just for you, earn cash back as you spend on your favourite brands.',
  },
  step2: {
    heading: 'Let us do the hard work for you.',
    verbiage:
      'If you’ve got a Hero Wallet debit card, you’re all set to go. For any other cards you want to enrol, have them on hand and you can add them too.',
  },
  step3: {
    heading: 'Get ready to spend and save!',
    verbiage:
      'Each time you shop our exclusive offers, we’ll slip some cash back into your Hero Wallet account.\n\nSwipe your card in-store or use the unique link in our offers catalogue to shop online.',
  },
};

export const mockCashbackIntroductionContentV2: CashbackIntroductionContent = {
  step1: {
    heading: 'Shop, spend, save\nrepeat with\nCashback',
    verbiage:
      'Put money back in your pocket when you shop with your favourite brands. See our online and in-store offers, curated just for you.',
  },
  step2: {
    heading: 'We’ve got it sorted',
    verbiage:
      'If you’ve got a Swag Visa Debit card, you’re all set to go. For any other cards you want to enrol, have them on hand and you can add them too.\n\nAlternatively, you can also shop via our affiliate links provided in the product catalogue.',
  },
  step3: {
    heading: 'Get ready to spend and save!',
    verbiage:
      'Each time you shop our exclusive offers in-store or online, we’ll slip some cash back into your Swag Spend account.',
  },
};
