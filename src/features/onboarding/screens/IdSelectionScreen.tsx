import React, { useCallback } from 'react';
import { Box, Icon, List } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Page } from '../../../common/components/layout/page';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import type { OnboardingScreenNavigationProp } from '../navigation/navigationTypes';

const IdSelectionScreen = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp<'IdSelection'>>();
  const { bottom: bottomInset } = useSafeAreaInsets();

  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onPassportSelected = useCallback(() => {
    navigation.navigate('Passport');
  }, [navigation]);

  const onLicenceSelected = useCallback(() => {
    navigation.navigate('DriversLicence');
  }, [navigation]);

  return (
    <>
      <CustomStatusBar />
      <Page.TopBar title="Identity" hideRight onBack={onBack} />
      <Page style={{ paddingBottom: bottomInset }}>
        <Page.Title>We need to verify your ID. Which ID would you like to use?</Page.Title>
        <Page.Footer justifyContent="flex-end" flex={1}>
          <Box paddingBottom="medium">
            <List.Item
              testID="Australian passport"
              title="Australian passport"
              onPress={onPassportSelected}
              variant="card"
              prefix={<Icon icon="plane-up" />}
            />
          </Box>
          <Box>
            <List.Item
              testID="Australian driver's licence"
              title="Australian driver's licence"
              onPress={onLicenceSelected}
              variant="card"
              prefix={<Icon icon="car-forward-outlined" />}
            />
          </Box>
        </Page.Footer>
      </Page>
    </>
  );
};

export { IdSelectionScreen };
