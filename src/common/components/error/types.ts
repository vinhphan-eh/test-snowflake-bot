import type { ReactElement } from 'react';
import type { ImageSourcePropType, ImageProps as RNImageProps } from 'react-native';
import type { Theme } from '@hero-design/rn';
import type { ErrorVariant } from '@hero-design/rn/types/components/Error/StyledError';
import type { ImageProps } from '@hero-design/rn/types/components/Image';
import type { ThemeName } from '../../types/hero-design';

interface BaseErrorProps {
  themeName: ThemeName;
  variant?: ErrorVariant;
  title?: string;
  description?: string;
  image?: ReactElement<ImageProps | RNImageProps> | ImageSourcePropType | string;
  ctaText?: string;
  onCtaPress?: () => void;
  testID?: string;
  backgroundColor?: keyof Theme['colors'];
  secondaryCtaText?: string;
  onSecondaryCtaPress?: () => void;
}

interface FullScreenErrorProps extends BaseErrorProps {
  variant?: 'full-screen';
  onCtaPress: () => void;
}

interface InPageErrorProps extends BaseErrorProps {
  variant?: 'in-page';
}

type ErrorProps = FullScreenErrorProps | InPageErrorProps;

export type { ErrorProps };
