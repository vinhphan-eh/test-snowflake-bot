import React, { useEffect } from 'react';
import { Box, Button, Typography, useTheme } from '@hero-design/rn';
import { useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useConfetti } from '../../../common/components/confetti/useConfetti';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import useBrandName from '../../../common/hooks/useBrandName';
import { useSessionStore } from '../../../common/stores/useSessionStore';
import { navigateToTopTabs } from '../../../navigation/rootNavigation';
import type { SuperScreenRouteProp } from '../navigation/navigationTypes';

const CONNECT_SUPER = 'connectSuper';
export const SuperCompleteScreen = () => {
  const { space } = useTheme();
  const { bottom } = useSafeAreaInsets();
  const { setShowConfetti } = useConfetti();
  const handleInternalRatingPrompt = useSessionStore(state => state.handleInternalRatingPrompt);
  const route = useRoute<SuperScreenRouteProp<'SuperComplete'>>();
  const brandName = useBrandName();

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  const onNext = () => {
    navigateToTopTabs('super-tab');
    handleInternalRatingPrompt?.(CONNECT_SUPER);
  };

  return (
    <Box flex={1} backgroundColor="darkGlobalSurface">
      <CustomStatusBar backgroundColor="darkGlobalSurface" nativeBarStyle="light-content" />
      <Box flex={1} padding="medium" style={{ paddingBottom: bottom + space.medium }}>
        <Box flex={1} justifyContent="center">
          <Box marginTop="xxxxlarge" marginBottom="medium">
            <Typography.Title level="h1" intent="inverted" style={{ textAlign: 'center' }} typeface="playful">
              Hooray!
            </Typography.Title>
          </Box>
          <Typography.Title level="h4" intent="inverted" style={{ textAlign: 'center' }} typeface="playful">
            {route.params.resync ? `Your Super is updated in ${brandName}` : `Your Super is connected to ${brandName}`}
          </Typography.Title>
        </Box>
        <Button text="Go to Super" testID="super-go-to-super-btn" onPress={onNext} />
      </Box>
    </Box>
  );
};
