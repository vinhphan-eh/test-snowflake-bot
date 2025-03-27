import React from 'react';
import { Dimensions, Image, ScrollView } from 'react-native';
import { useTheme, Carousel, Button, Typography, Box } from '@hero-design/rn';
import type { CarouselData } from '@hero-design/rn/types/components/Carousel/types';
import { useRoute } from '@react-navigation/native';
import images from '../../../../common/assets/images';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import useAppName from '../../../../common/hooks/useAppName';
import useBrandName from '../../../../common/hooks/useBrandName';
import { queryClient } from '../../../../common/libs/queryClient';
import {
  useCreateSuperConsolidationSupportRequestMutation,
  useGetSuperConsolidationSupportRequestQuery,
} from '../../../../new-graphql/generated';
import { useSuperConsolidationNavigation } from '../../hooks/useSuperConsolidationNavigation';
import { useSeenSuperConsolidationIntro } from '../../store/useSeenSuperConsolidationIntro';
import { useSuperConsolidationTracking } from '../../tracks/useSuperConsolidationTracking';
import type { ConsolidationScreenRouteProp } from '../navigation/navigationTypes';

const SuperConsolidationIntroScreen = ({ selectedItemIndex = 0 }: { selectedItemIndex: number }) => {
  const { clickLetGoInSuperConsolidationIntro, clickNotNowInSuperConsolidationIntro } = useSuperConsolidationTracking();
  const {
    navigateBack,
    navigateToCreateConsolidationFailed,
    navigateToCreateConsolidationRequestSuccess,
    navigateToLegalAgreement,
  } = useSuperConsolidationNavigation();
  const route = useRoute<ConsolidationScreenRouteProp<'SuperConsolidationIntro'>>();

  const { markSeen } = useSeenSuperConsolidationIntro();
  const { swagSuperfund } = route?.params || {};
  const consolidationSupported = !!swagSuperfund.superfundFeatureFlag?.consolidationSupported;
  const { fundName: superfundName } = swagSuperfund;
  const { mutateAsync: createSuperConsolidationSupportRequest } = useCreateSuperConsolidationSupportRequestMutation();
  const introContentType = consolidationSupported ? 'supported' : 'unsupported';
  const appName = useAppName();
  const brandName = useBrandName();

  const { colors, space } = useTheme();
  const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
  const imageHeight = (350 * screenHeight) / 844;

  const onIntroIgnore = () => {
    clickNotNowInSuperConsolidationIntro({
      usi: swagSuperfund.usi,
      fundName: swagSuperfund.fundName,
      introContentType,
    });
    markSeen();
    navigateBack();
  };

  const carouselDataConsolidationSupported: CarouselData[] = [
    {
      image: {
        uri: Image.resolveAssetSource(images.superConsolidation1).uri,
        width: screenWidth,
        height: imageHeight,
        resizeMode: 'contain',
      },
      heading: '',
      background: colors.decorativePrimarySurface,
      content: (
        <>
          <Typography.Title level="h2" typeface="playful" style={{ marginBottom: space.medium }}>
            How might I have lost super?
          </Typography.Title>
          <Typography.Body variant="regular" style={{ marginBottom: space.small }}>
            {`If you've ever changed your name, address or job, you may have lost track of some of your super.`}
          </Typography.Body>
          <Typography.Body variant="regular">
            Finding your lost super and bringing it all together saves on fees and makes your super easier to manage.
          </Typography.Body>
        </>
      ),
    },
    {
      image: {
        uri: Image.resolveAssetSource(images.superConsolidation2).uri,
        width: screenWidth,
        height: imageHeight,
        resizeMode: 'contain',
      },
      heading: '',
      background: colors.decorativePrimarySurface,
      content: (
        <>
          <Typography.Title level="h2" typeface="playful" style={{ marginBottom: space.medium }}>
            How does it work?
          </Typography.Title>
          <Typography.Body variant="regular" style={{ marginBottom: space.small }}>
            {`We’ll take you to the ${superfundName} website. You can then:`}
          </Typography.Body>
          <Box style={{ marginBottom: space.small, marginLeft: space.small }}>
            <Typography.Body variant="regular">1. Log in to your account</Typography.Body>
            <Typography.Body variant="regular">2. Verify yourself with a few forms of ID</Typography.Body>
            <Typography.Body variant="regular">3. Confirm you want to consolidate</Typography.Body>
          </Box>
          <Typography.Body variant="regular">
            They will then search for and consolidate your lost super!
          </Typography.Body>
        </>
      ),
    },
  ];

  const renderActionsConsolidationSupported = (currentIndex: number) => {
    const onLetGo = () => {
      clickLetGoInSuperConsolidationIntro({
        usi: swagSuperfund.usi,
        fundName: swagSuperfund.fundName,
        introContentType,
      });
      markSeen();
      navigateToLegalAgreement(swagSuperfund);
    };

    const isLast = currentIndex === carouselDataConsolidationSupported.length - 1;
    if (!isLast) {
      return <></>;
    }
    return (
      <Box
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          marginTop: -space.large,
          justifyContent: 'space-between',
        }}
      >
        <Button variant="text" onPress={onIntroIgnore} text="Not now" />
        <Button style={{ marginHorizontal: space.xsmall }} onPress={onLetGo} text="Let's go!" />
      </Box>
    );
  };

  const carouselDataConsolidationUnsupported: CarouselData[] = [
    {
      image: {
        uri: Image.resolveAssetSource(images.superConsolidation1).uri,
        width: screenWidth,
        height: imageHeight,
        resizeMode: 'contain',
      },
      heading: '',
      background: colors.decorativePrimarySurface,
      content: (
        <>
          <Typography.Title level="h2" typeface="playful" style={{ marginBottom: space.medium }}>
            How might I have lost super?
          </Typography.Title>
          <Typography.Body variant="regular" style={{ marginBottom: space.small }}>
            {`If you've ever changed your name, address or job, you may have lost track of some of your super.`}
          </Typography.Body>
          <Typography.Body variant="regular">
            {`Don't worry, either your fund or the ATO can help you find your lost super. Bringing all your super together may save on fees and makes it easier to manage.`}
          </Typography.Body>
        </>
      ),
    },
    {
      image: {
        uri: Image.resolveAssetSource(images.superConsolidation2).uri,
        width: screenWidth,
        height: imageHeight,
        resizeMode: 'contain',
      },
      heading: '',
      content: (
        <>
          <Typography.Title level="h2" typeface="playful" style={{ marginBottom: space.medium }}>
            {`Your fund isn't supported just yet`}
          </Typography.Title>
          <Typography.Body variant="regular" style={{ marginBottom: space.small }}>
            {`${brandName} partners with super funds to unlock powerful features for you.`}
          </Typography.Body>
          <Typography.Body variant="regular">
            {`When your fund partners with us, we make it easy for you to find your lost super right from the ${appName} app.`}
          </Typography.Body>
        </>
      ),
      background: colors.decorativePrimarySurface,
    },
  ];

  const renderActionsConsolidationUnsupported = (currentIndex: number) => {
    const onRequestFeature = async () => {
      try {
        await createSuperConsolidationSupportRequest({ usi: swagSuperfund.usi });
        queryClient.invalidateQueries(
          useGetSuperConsolidationSupportRequestQuery.getKey({ usi: swagSuperfund?.usi || '' })
        );

        navigateToCreateConsolidationRequestSuccess({
          fundName: swagSuperfund.fundName,
          usi: swagSuperfund.usi,
        });
      } catch (error: unknown) {
        if (error instanceof Error) {
          navigateToCreateConsolidationFailed({
            errorMessage: error.message || 'failed to create super consolidation support request',
            fundName: swagSuperfund.fundName,
            usi: swagSuperfund.usi,
          });
        }
      }
    };

    const isLast = currentIndex === carouselDataConsolidationUnsupported.length - 1;
    if (!isLast) {
      return <></>;
    }
    return (
      <Box
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          marginTop: -space.large,
          justifyContent: 'space-between',
        }}
      >
        <Button variant="text" onPress={onIntroIgnore} text="Cancel" />
        <Button style={{ marginHorizontal: space.xsmall }} onPress={onRequestFeature} text="I want this feature" />
      </Box>
    );
  };

  return (
    <ScrollView style={{ backgroundColor: colors.decorativePrimarySurface }}>
      <CustomStatusBar barStyle="decorative" />
      <Carousel
        testID="super-consolidation-intro"
        accessibilityLabel="Super Consolidation Intro"
        style={{ flex: 1 }}
        items={consolidationSupported ? carouselDataConsolidationSupported : carouselDataConsolidationUnsupported}
        selectedItemIndex={selectedItemIndex}
        renderActions={
          consolidationSupported ? renderActionsConsolidationSupported : renderActionsConsolidationUnsupported
        }
      />
    </ScrollView>
  );
};

// This component is a screen component, from RN perspective, it should be a prop-less component
// However selectedItemIdex needs to be passed in for testing purposes
// TODO: Refactor this component to remove the need for selectedItemIndex, find another way to test this
const SuperConsolidationIntroScreenWrapper = () => {
  return <SuperConsolidationIntroScreen selectedItemIndex={0} />;
};

export {
  SuperConsolidationIntroScreenWrapper as SuperConsolidationIntroScreen,
  SuperConsolidationIntroScreen as SuperConsolidationIntroScreenInner,
};
