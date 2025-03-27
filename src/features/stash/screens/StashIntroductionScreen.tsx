import type { PropsWithChildren } from 'react';
import React, { useEffect } from 'react';
import type { ImageSourcePropType } from 'react-native';
import { Dimensions, Image, ScrollView } from 'react-native';
import { Box, Button, Carousel, Typography, scale, useTheme } from '@hero-design/rn';
import type { CarouselData, CarouselImageProps } from '@hero-design/rn/types/components/Carousel/types';
import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from 'react-query';
import images from '../../../common/assets/images';
import type { BulletLineProps } from '../../../common/components/bullet-line';
import BulletLine from '../../../common/components/bullet-line';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import { useGetStashMetadataQuery, useSetStashMetadataMutation } from '../../../new-graphql/generated';
import type { StashNavigationProp } from '../navigation/navigationTypes';

const IMAGE_ORIGINAL_HEIGHT = 328; // Figma

const Title = ({ children }: PropsWithChildren<unknown>) => {
  const { space } = useTheme();

  return (
    <Typography.Title level="h2" typeface="playful" style={{ marginBottom: space.medium }}>
      {children}
    </Typography.Title>
  );
};

const Paragraph = ({ children, withMarginBottom }: PropsWithChildren<{ withMarginBottom?: boolean }>) => {
  const { space } = useTheme();

  return (
    <Typography.Body variant="regular" typeface="playful" style={{ marginBottom: withMarginBottom ? space.large : 0 }}>
      {children}
    </Typography.Body>
  );
};

const BulletItem = (props: BulletLineProps) => <BulletLine variant="regular" typeface="playful" {...props} />;

export const StashIntroductionScreen = () => {
  const { colors, space } = useTheme();
  const { width: screenWidth } = Dimensions.get('window');
  const navigation = useNavigation<StashNavigationProp<'StashIntroduction'>>();
  const { mutateAsync: setStashMeta } = useSetStashMetadataMutation();
  const queryClient = useQueryClient();

  // We need to set the isMarketingCardFinished to true so that the marketing card doesn't show up again.
  // This happens the first (and the only time) time the user visits this screen.
  useEffect(() => {
    (async () => {
      await setStashMeta({ input: { isStashEntryButtonInSpendAccountHidden: true } });
      queryClient.invalidateQueries(useGetStashMetadataQuery.getKey());
    })();
  }, []);

  const getImage = (source: ImageSourcePropType) => {
    return {
      uri: Image.resolveAssetSource(source).uri,
      height: scale(IMAGE_ORIGINAL_HEIGHT),
      width: screenWidth,
      resizeMode: 'contain',
    } as CarouselImageProps;
  };

  const carouselData: CarouselData[] = [
    {
      image: getImage(images.stashCarousel1),
      background: colors.decorativePrimarySurface,
      heading: '',
      content: (
        <>
          <Title>Stash your cash</Title>
          <Paragraph withMarginBottom>Set aside money for rent, holidays, a date night or a rainy day.</Paragraph>
          <Paragraph>Keep your Stash separate from your everyday spending and make budgeting easy.</Paragraph>
        </>
      ),
    },
    {
      image: getImage(images.stashCarousel2),
      background: colors.decorativePrimarySurface,
      heading: '',
      content: (
        <>
          <Title>Beat your budget</Title>
          <Paragraph withMarginBottom>Budget better with a Swag Stash.</Paragraph>
          <Paragraph>
            Set target amounts to meet your financial goals faster. Create and customise your Stash targets and track
            your progress on the go.
          </Paragraph>
        </>
      ),
    },
    {
      image: getImage(images.stashCarousel3),
      background: colors.decorativePrimarySurface,
      heading: '',
      content: (
        <>
          <Title>How it works</Title>
          <Paragraph>You can have up to 9 Stashes at one time. To create a Stash:</Paragraph>
          <Box marginTop="small">
            <BulletItem content="Name and personalise your Stash" />
            <BulletItem content="Set a Stash target" />
            <BulletItem content="Add funds to your Stash from your Swag Spend account" />
            <BulletItem content="Celebrate when you reach your budget goal!" />
          </Box>
        </>
      ),
    },
  ];

  const renderActions = (currentIndex: number) => {
    const isLast = currentIndex === carouselData.length - 1;
    if (!isLast) {
      return <></>;
    }

    return (
      <>
        <Button variant="text" onPress={navigation.goBack} text="I'm not ready" />
        <Button
          style={{ marginHorizontal: space.xsmall }}
          onPress={async () => {
            await setStashMeta({ input: { isMarketingCardFinished: true } });
            queryClient.invalidateQueries(useGetStashMetadataQuery.getKey());
            navigation.replace('StashStack', {
              screen: 'StashName',
            });
          }}
          text="Let's go"
        />
      </>
    );
  };

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: colors.decorativePrimarySurface }}
    >
      <CustomStatusBar barStyle="decorative" />
      <Carousel testID="carousel-stash" items={carouselData} renderActions={renderActions} style={{ flex: 1 }} />
    </ScrollView>
  );
};
