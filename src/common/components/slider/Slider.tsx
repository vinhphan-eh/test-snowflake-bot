import React from 'react';
import { useTheme } from '@hero-design/rn';
import type { StyleProp, ViewStyle } from 'react-native/types';
import { ScrollView } from 'react-native-gesture-handler';
import type { SliderCardProps } from './SliderCard';
import { SliderCard } from './SliderCard';

export type SliderProps = React.PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  cards: SliderCardProps[];
}>;

const Slider = ({ cards, children, style }: SliderProps) => {
  const { space } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={style}
      contentContainerStyle={{ paddingHorizontal: space.medium }}
    >
      {cards.map(cardProps => (
        <SliderCard key={cardProps.title} {...cardProps} />
      ))}
      {children}
    </ScrollView>
  );
};

export { Slider };
