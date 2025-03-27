import type { ImageSourcePropType } from 'react-native';

export type OptionAmount = number | 'custom';

export type CardCarouselOption = {
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
  bodyHeading: string;
  bodyContent: string;
  isHighlight?: boolean;
  highlightText?: string;
  amount: OptionAmount;
  isDefault?: boolean;
};
