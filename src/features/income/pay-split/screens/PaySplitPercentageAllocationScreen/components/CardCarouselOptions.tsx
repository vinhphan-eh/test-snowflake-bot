import React, { useEffect, useRef, useState } from 'react';
import { Image, PixelRatio, Pressable } from 'react-native';
import type { CardCarouselHandles } from '@hero-design/rn';
import { Box, Typography, useTheme, Button, Carousel } from '@hero-design/rn';
import { scale } from '../../../../../../common/utils/layout';
import ThemeSwitcher from '../../../../../../common/utils/ThemeSwitcher';
import type { OptionAmount, CardCarouselOption } from '../types';

interface OptionSlideProps {
  option: CardCarouselOption;
  isSelected: boolean;
  onPress: () => void;
}

interface CardCarouselProps {
  options: CardCarouselOption[];
  onNext: (amount: OptionAmount) => void;
}

const imageHeight = scale(96, 'height');

const OptionSlide = ({ isSelected, onPress, option }: OptionSlideProps) => {
  const { space } = useTheme();
  const { bodyContent, bodyHeading, highlightText, image, isHighlight, subtitle, title } = option;
  const [highLightBoxTopPosition, setHighLightBoxTopPosition] = useState(0);

  return (
    <Box borderWidth={isSelected ? 'medium' : undefined} borderColor="primary" borderRadius="medium">
      {/* Rare case in design that colors come from different themes */}
      <ThemeSwitcher key={option.title} name="eBens">
        <Pressable onPress={onPress}>
          <Box
            alignItems="center"
            justifyContent="center"
            paddingHorizontal="large"
            paddingTop="large"
            paddingBottom="medium"
            borderTopLeftRadius="medium"
            borderTopRightRadius="medium"
            backgroundColor={isHighlight ? 'decorativePrimarySurface' : 'neutralGlobalSurface'}
          >
            <Image
              source={image}
              style={{ marginBottom: space.medium, height: imageHeight, flex: 1 }}
              resizeMode="contain"
            />
            <Typography.Title level="h6"> {title}</Typography.Title>
            <Typography.Caption
              intent="subdued"
              style={{
                marginTop: space.small,
                textAlign: 'center',
              }}
            >
              {subtitle}
            </Typography.Caption>
          </Box>

          <Box
            backgroundColor="defaultGlobalSurface"
            paddingHorizontal="medium"
            paddingVertical="large"
            justifyContent="center"
            alignItems="center"
            borderBottomLeftRadius="medium"
            borderBottomRightRadius="medium"
          >
            {isHighlight && (
              <Box
                onLayout={({
                  nativeEvent: {
                    layout: { height },
                  },
                }) => {
                  setHighLightBoxTopPosition(-PixelRatio.roundToNearestPixel(height / 2));
                }}
                backgroundColor="decorativePrimary"
                style={{
                  position: 'absolute',
                  top: highLightBoxTopPosition,
                  right: space.smallMedium,
                  left: space.smallMedium,
                }}
                paddingVertical="xsmall"
                borderRadius="rounded"
                alignItems="center"
              >
                <Typography.Label style={{ textAlign: 'center' }}>{highlightText}</Typography.Label>
              </Box>
            )}
            <Typography.Title level="h4" typeface="playful">
              {bodyHeading}
            </Typography.Title>
            <Typography.Caption style={{ marginTop: space.xsmall, textAlign: 'center' }}>
              {bodyContent}
            </Typography.Caption>
          </Box>
        </Pressable>
      </ThemeSwitcher>
    </Box>
  );
};

export const CardCarouselOptions = ({ onNext, options }: CardCarouselProps) => {
  const defaultIndex = options.findIndex(o => o.isDefault);
  const [layoutLoaded, setLayoutLoaded] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(defaultIndex);

  const ref = useRef<CardCarouselHandles>(null);

  useEffect(() => {
    if (layoutLoaded) {
      ref.current?.snapToIndex(defaultIndex);
    }
  }, [layoutLoaded]);

  return (
    <Box flex={1} justifyContent="space-between">
      <ThemeSwitcher name="wallet">
        <Carousel.Card
          onLayout={() => {
            setLayoutLoaded(true);
          }}
          ref={ref}
          onItemIndexChange={setSelectedOptionIndex}
          items={options.map((option, index) => (
            <OptionSlide
              key={option.title}
              option={option}
              isSelected={selectedOptionIndex === index}
              onPress={() => {
                ref.current?.snapToIndex(index);
              }}
            />
          ))}
        />
      </ThemeSwitcher>
      <Box paddingHorizontal="medium">
        <Button text="Next" onPress={() => onNext(options[selectedOptionIndex].amount)} testID="next-button" />
      </Box>
    </Box>
  );
};
