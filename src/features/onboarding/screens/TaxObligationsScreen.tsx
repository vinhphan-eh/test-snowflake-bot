import React from 'react';
import { Box, List } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Page } from '../../../common/components/layout/page';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import type { OnboardingScreenNavigationProp } from '../navigation/navigationTypes';
import { useOnboardingStore } from '../stores/useOnboardingStore';

const TaxObligationsScreen = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp<'TaxObligations'>>();
  const { bottom: bottomInset } = useSafeAreaInsets();

  const agreeTaxObligations = useOnboardingStore(state => state.agreeTaxObligations);
  const { getNextProfileInputPage } = useOnboardingStore();

  const onNoButton = () => {
    agreeTaxObligations();
    navigation.navigate(getNextProfileInputPage('TaxObligations'));
  };

  const onYesButton = () => {
    agreeTaxObligations();
    navigation.navigate('TaxObligationsEntry');
  };

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <CustomStatusBar />
      <Page.TopBar title="Tax obligations" hideRight onBack={onBack} />
      <Page style={{ paddingBottom: bottomInset }}>
        <Page.Title>Do you have tax obligations outside of Australia?</Page.Title>

        <Page.Footer justifyContent="flex-end" flex={1}>
          <Box marginTop="medium">
            <List.Item testID="tax-obligation-yes" title="Yes" variant="card" onPress={onYesButton} />
          </Box>
          <Box marginTop="medium">
            <List.Item testID="tax-obligation-no" title="No" variant="card" onPress={onNoButton} />
          </Box>
        </Page.Footer>
      </Page>
    </>
  );
};

export { TaxObligationsScreen };
