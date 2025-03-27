import React from 'react';
import { Error } from '@hero-design/rn';
import type { ErrorProps } from './types';
import images from '../../assets/images';

export const GeneralError = ({
  ctaText = 'Retry',
  description = 'Please try again later',
  image,
  onCtaPress,
  onSecondaryCtaPress,
  secondaryCtaText,
  testID,
  themeName,
  title = "We're sorry, something went wrong",
  variant = 'in-page',
}: ErrorProps) => {
  return (
    <Error
      variant={variant}
      title={title}
      description={description}
      image={image || (themeName === 'eBens' ? images.iceCreamBenefits : images.iceCreamIncome)}
      ctaText={ctaText}
      onCtaPress={onCtaPress}
      testID={testID}
      secondaryCtaText={secondaryCtaText}
      onSecondaryCtaPress={onSecondaryCtaPress}
    />
  );
};
