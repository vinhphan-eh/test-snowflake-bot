import type { IconProps } from '@hero-design/rn/types/components/Icon';

export const getIconCategory = (label: string): IconProps['icon'] | undefined => {
  switch (label) {
    case 'Food & Drink':
      return 'fastfood-outlined';
    case 'Fashion & Clothing':
      return 'styler-outlined';
    case 'Sports & Fitness':
      return 'tennis-outlined';
    case 'Health & Beauty':
      return 'dentistry-outlined';
    case 'Retail & Other':
      return 'tag-outlined';
    case 'Travel & Holidays':
      return 'plane-up';
    case 'Pubs & Clubs':
      return 'beer-outlined';
    case 'Tech & Electronics':
      return 'bolt';
    case 'Finance & Insurance':
      return 'dollar-sign';
    case 'Books & Stationery':
      return 'book-outlined';
    case 'Events & Activities':
      return 'ticket-outlined';
    case 'Automotive':
      return 'car-forward-outlined';
    case 'Services':
      return 'volunteer-outlined';
    case 'Experience':
      return 'surfing';
    case 'Indoor Play & Activities':
      return 'extension-outlined';
    default:
      return undefined;
  }
};

export const getIconCategoryV2 = (code: string): IconProps['icon'] | undefined => {
  switch (code) {
    case 'giftcard':
      return 'redeem';
    case 'bill':
      return 'dollar-card-outlined';
    case 'dining':
      return 'fastfood-outlined';
    case 'fashion':
      return 'styler-outlined';
    case 'fitness':
      return 'tennis-outlined';
    case 'wellness':
      return 'dentistry-outlined';
    case 'retail':
      return 'tag-outlined';
    case 'travel':
      return 'plane-up';
    case 'tech':
      return 'bolt';
    case 'finances':
      return 'dollar-sign';
    case 'experiences':
      return 'surfing';
    default:
      return undefined;
  }
};

export const getBadgeIconCategory = (code: string): IconProps['icon'] | undefined => {
  switch (code) {
    case 'giftcard':
      return 'star-circle-outlined';
    default:
      return undefined;
  }
};

export const turnCategoryIntoOption = (category: { id: string; name: string; image: string }) => ({
  key: category.id,
  label: category.name,
});
