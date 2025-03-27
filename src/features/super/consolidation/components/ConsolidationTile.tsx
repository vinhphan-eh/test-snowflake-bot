import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { Box, Icon, Typography, useTheme, Alert, Spinner } from '@hero-design/rn';
import images from '../../../../common/assets/images';
import { AdCard } from '../../../../common/components/ad-card/AdCard';
import {
  useGetSuperConsolidationQuery,
  type SwagSuperfund,
  useGetSuperConsolidationSupportRequestQuery,
} from '../../../../new-graphql/generated';
import { useSuperConsolidationNavigation } from '../../hooks/useSuperConsolidationNavigation';
import { useSeenSuperConsolidationIntro } from '../../store/useSeenSuperConsolidationIntro';
import { useSuperConsolidationTracking } from '../../tracks/useSuperConsolidationTracking';

type ConsolidationTileProps = {
  swagSuperfund: SwagSuperfund;
};

export const ConsolidationTile = ({ swagSuperfund }: ConsolidationTileProps) => {
  const { colors, radii, space } = useTheme();
  const { clickConsolidateAdInSuperDashboardScreen, clickConsolidateTileInSuperDashboardScreen } =
    useSuperConsolidationTracking();

  const { navigateToFindYourLostSuper, navigateToSuperConsolidationIntro } = useSuperConsolidationNavigation();
  const { isSeen: consolidateIntroSeen } = useSeenSuperConsolidationIntro();
  const { data: superConsolidationData, isLoading: isLoadingConsolidation } = useGetSuperConsolidationQuery(
    { usi: swagSuperfund?.usi || '' },
    // Only call this query when swagSuperfund usi ready.
    { enabled: !!swagSuperfund?.usi && swagSuperfund?.superfundFeatureFlag?.consolidationSupported }
  );
  const superConsolidation = superConsolidationData?.me?.superConsolidation ?? undefined;

  const { data: consolidationSupportRequestData, isLoading: isLoadingConsolidationRequestSupport } =
    useGetSuperConsolidationSupportRequestQuery(
      { usi: swagSuperfund?.usi || '' },
      // Only call this query when swagSuperfund usi ready and consolidationSupported is false.
      { enabled: !!swagSuperfund?.usi && !swagSuperfund?.superfundFeatureFlag?.consolidationSupported }
    );

  const hasConsolidationSupportRequest = !!(
    consolidationSupportRequestData?.me?.superConsolidationRequestSupport ?? undefined
  );

  const [showAlert, setShowAlert] = useState(true);

  const { superfundFeatureFlag, superfundMetadata } = swagSuperfund || {};
  const consolidationSupported = !!superfundFeatureFlag?.consolidationSupported;
  const externalLink = superfundMetadata?.externalLink || '';

  const onPressConsolidateTile = () => {
    if (!consolidationSupported) {
      return navigateToSuperConsolidationIntro(swagSuperfund);
    }

    clickConsolidateTileInSuperDashboardScreen({
      fundName: swagSuperfund.fundName,
      usi: swagSuperfund.usi,
    });
    if (!superConsolidation) {
      navigateToSuperConsolidationIntro(swagSuperfund);
    } else {
      navigateToFindYourLostSuper(superConsolidation, externalLink);
    }
  };

  const onPressConsolidateAd = () => {
    clickConsolidateAdInSuperDashboardScreen({
      fundName: swagSuperfund.fundName,
      usi: swagSuperfund.usi,
    });
    navigateToSuperConsolidationIntro(swagSuperfund);
  };

  const renderConsolidationTile = (title: string) => {
    return (
      <Pressable
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: space.medium,
          backgroundColor: colors.defaultGlobalSurface,
          borderRadius: radii.large,
          marginTop: space.medium,
          marginHorizontal: space.medium,
        }}
        onPress={onPressConsolidateTile}
        testID="consolidation-tile-pressable"
      >
        <Typography.Body style={{ marginBottom: space.large }} variant="small-bold">
          Find your lost Super
        </Typography.Body>
        <Box
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}
        >
          <Typography.Caption>{title}</Typography.Caption>
          <Icon intent="primary" icon="arrow-right" accessibilityLabel="fund details icon" />
        </Box>
      </Pressable>
    );
  };

  if (isLoadingConsolidation || isLoadingConsolidationRequestSupport) {
    return <Spinner testID="spinner" />;
  }

  if (!consolidationSupported) {
    if (!hasConsolidationSupportRequest) {
      return renderConsolidationTile('Find and combine your funds');
    }
    if (showAlert) {
      return (
        <Box style={{ marginHorizontal: space.medium, marginTop: space.medium }}>
          <Alert
            title="Find your lost Super"
            content="We've received your feature request!"
            style={{ marginBottom: space.small }}
            onClose={() => setShowAlert(false)}
          />
        </Box>
      );
    }
    return null;
  }

  if (superConsolidation) {
    return renderConsolidationTile('Track your progress');
  }

  if (consolidateIntroSeen) {
    return renderConsolidationTile('Find and combine your funds');
  }

  return (
    <Box marginHorizontal="medium" marginTop="medium">
      <AdCard
        title="Do you have lost Super?"
        cta="Find lost super now"
        description="We want to help you find it."
        onPressCta={onPressConsolidateAd}
        image={images.lostSuperAd}
      />
    </Box>
  );
};
