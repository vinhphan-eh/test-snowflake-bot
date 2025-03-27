import type { PropsWithChildren } from 'react';
import React from 'react';
import type { ImageSourcePropType } from 'react-native';
import { Image, ScrollView } from 'react-native';
import { Box, Button, Carousel, Typography, scale, useTheme } from '@hero-design/rn';
import type { CarouselImageProps } from '@hero-design/rn/types/components/Carousel/types';
import type { BodyProps } from '@hero-design/rn/types/components/Typography/Body';
import images from '../../../../common/assets/images';
import type { BulletLineProps } from '../../../../common/components/bullet-line';
import BulletLine from '../../../../common/components/bullet-line';
import { InlineTextLink } from '../../../../common/components/inline-text-link';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import { useInAppBrowser } from '../../../../common/shared-hooks/useInAppBrowser';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import { useRegionLocalisation } from '../../../../providers/LocalisationProvider';
import { Region } from '../../../../providers/LocalisationProvider/constants';
import { MIN_AGE_FOR_AU, MIN_AGE_FOR_UK } from '../../constants/common';

const Title = ({ content }: { content: string }) => {
  return (
    <Typography.Title level="h1" typeface="playful">
      {content}
    </Typography.Title>
  );
};

const Text = ({ children, style, variant = 'small' }: PropsWithChildren<BodyProps>) => {
  return (
    <Typography.Body variant={variant} typeface="playful" style={style}>
      {children}
    </Typography.Body>
  );
};

const Bullet = (props: BulletLineProps) => {
  return <BulletLine variant="small" typeface="playful" {...props} />;
};

const getImage = (source: ImageSourcePropType) => {
  return {
    uri: Image.resolveAssetSource(source).uri,
    height: scale(330),
    width: scale(389),
    resizeMode: 'cover',
  } as CarouselImageProps;
};

type SwagIntroCarouselProps = {
  onCancel: () => void;
  onContinue: () => void;
};

export const SwagIntroCarousel = ({ onCancel, onContinue }: SwagIntroCarouselProps) => {
  const { colors, space } = useTheme();
  const { openUrl } = useInAppBrowser();
  const { currentRegion, formatMessage } = useRegionLocalisation();
  const age = currentRegion === Region.gb ? MIN_AGE_FOR_UK : MIN_AGE_FOR_AU;
  const isRebrand = useSessionStore().swagTextAndImageRebrandEnabled;

  const getOnboardingCarouselImage1 = () => {
    switch (currentRegion) {
      case Region.gb:
        return images.ukOnboardingCarousel1;
      default:
        return images.onboardingCarousel1;
    }
  };

  const getOnboardingCarouselImage2 = () => {
    switch (currentRegion) {
      case Region.gb:
        return images.ukOnboardingCarousel2;
      default:
        return images.onboardingCarousel2;
    }
  };

  const getOnboardingPage2Bullets = () => {
    switch (currentRegion) {
      case Region.gb:
        return [
          'Instantly add funds to your Swag Spend account.',
          "Use your virtual card as soon as you've opened your account. ",
        ];
      default:
        return [
          'Instantly add funds to your Swag Spend account.',
          'Receive a Swag Visa Debit card in the mail.',
          "Use your digital card as soon as you've opened your account. Pay with Apple Pay or Google Pay.",
          'Earn money back from Swag Cashback offers.',
        ];
    }
  };

  const carouselItems = [
    {
      image: getImage(getOnboardingCarouselImage1()),
      background: colors.decorativePrimarySurface,
      heading: '',
      content: (
        <>
          <Title content="Unlock the power of a Swag Spend account" />
          <Box marginTop="medium">
            <Text>
              Make your money go further with a Swag Spend account. You&apos;ll{' '}
              {formatMessage({ id: 'onboarding.carousel.page_1.introduction' })}
            </Text>
          </Box>
        </>
      ),
    },
    {
      image: getImage(getOnboardingCarouselImage2()),
      background: colors.decorativePrimarySurface,
      heading: '',
      content: (
        <>
          <Title content="Get all the benefits" />
          <Box marginTop="medium">
            {getOnboardingPage2Bullets().map((bullet: string) => (
              <Bullet key={bullet} content={bullet} />
            ))}
          </Box>
        </>
      ),
    },
    {
      image: getImage(images.onboardingCarousel3),
      background: colors.decorativePrimarySurface,
      heading: '',
      content: (
        <>
          <Title content="How to set it up" />
          <Box marginTop="medium">
            <Text style={{ marginBottom: space.small }}>You must:</Text>
            <Bullet content={formatMessage({ id: 'onboarding.carousel.age' }, { age })} />
            <Bullet
              content={
                <Text>
                  {formatMessage({ id: 'onboarding.carousel.citizen' })}, <Text variant="small-bold">and</Text>
                </Text>
              }
            />
            <Bullet content={formatMessage({ id: 'onboarding.carousel.personalDocument' })} />
            <Bullet
              content={
                <Text>
                  Agree to the{' '}
                  <InlineTextLink
                    variant="small"
                    typeface="playful"
                    onPress={() => openUrl(formatMessage({ id: 'spend-account.termsAndConditions.url' }))}
                  >
                    terms and conditions
                  </InlineTextLink>{' '}
                  and{' '}
                  <InlineTextLink
                    variant="small"
                    typeface="playful"
                    onPress={() =>
                      openUrl(
                        isRebrand
                          ? formatMessage({ id: 'spend-account.privacyPolicy.url.rebrand' })
                          : formatMessage({ id: 'spend-account.privacyPolicy.url' })
                      )
                    }
                  >
                    privacy policy
                  </InlineTextLink>
                </Text>
              }
            />
          </Box>
        </>
      ),
    },
  ];

  const isAtLastSlide = (current: number) => current === carouselItems.length - 1;

  const renderActions = (current: number) =>
    isAtLastSlide(current) ? (
      <>
        <Button variant="text" intent="secondary" onPress={onCancel} text="I'm not ready" />
        <Button style={{ marginHorizontal: space.xsmall }} onPress={onContinue} text="Let's go!" />
      </>
    ) : (
      // HD's renderActions doesn't accept null
      // eslint-disable-next-line react/jsx-no-useless-fragment
      <></>
    );

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: colors.decorativePrimarySurface }}
    >
      <CustomStatusBar backgroundColor={colors.decorativePrimarySurface} />
      <Carousel testID="swag-intro-carousel" items={carouselItems} renderActions={renderActions} style={{ flex: 1 }} />
    </ScrollView>
  );
};
