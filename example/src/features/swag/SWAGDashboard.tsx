import React, { useEffect } from 'react';
import { Box } from '@hero-design/rn';
import {
  useBenefitsSWAGDashboardTiles,
  useMoneySWAGDashboardTiles,
  useShowInstapayOnboarding,
  InstapayTimesheetsExperimentTile,
  InstapayRostersExperimentTile,
  InstapayCustomSurveyFooterTile,
  useIncomeVisibility,
  InstapaySwagCarousel,
} from '@ehrocks/react-native-swag-personal-app';
import { FlatList, ScrollView } from 'react-native';
import { SwagDashboardMegadealTile } from '../../../../src/features/benefits/group/components/SwagDashboardMegadealTile';
import { InstapayOnboardingWidget } from '../../../../src/features/swag-dashboard/instapay-introduction/components/InstapayOnboardingWidget';
import { InstapayPayslipsTile } from '../../../../src/features/swag-payslips/InstapayPayslipsTile';
import { useInstapayExpPopup } from '../../../../src/features/income/instapay/components/instapay-exp-popup/hooks/useInstapayExpPopup';

export const SWAGDashboard = () => {
  const moneyTiles = useMoneySWAGDashboardTiles();
  const benefitsTiles = useBenefitsSWAGDashboardTiles();
  const { showInstapayIntroduction } = useShowInstapayOnboarding();
  const { showPopupForRosters } = useInstapayExpPopup();
  const { instapayNowUnderMaintenance } = useIncomeVisibility();
  const allTiles = [...moneyTiles, ...benefitsTiles].sort(
    ({ priority: p1 }, { priority: p2 }) => p1 - p2,
  );

  useEffect(() => {
    showPopupForRosters();
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      <Box backgroundColor="defaultGlobalSurface" flex={1}>
        <InstapaySwagCarousel />
        {showInstapayIntroduction && (
          <InstapayOnboardingWidget margin="medium" />
        )}
        <Box margin="medium">
          <InstapayTimesheetsExperimentTile />
        </Box>
        <Box margin="medium">
          <InstapayRostersExperimentTile />
        </Box>
        <Box margin="medium">
          <InstapayCustomSurveyFooterTile closeSuccessSurveyModal={() => {}} />
        </Box>
        <Box margin="medium">
          <InstapayPayslipsTile
            instapayNowUnderMaintenance={instapayNowUnderMaintenance}
          />
        </Box>
        <Box margin="medium">
          <SwagDashboardMegadealTile />
        </Box>
        <FlatList
          style={{ marginTop: 30 }}
          contentContainerStyle={{ paddingRight: 16 }}
          data={allTiles}
          horizontal
          keyExtractor={item => item.id}
          renderItem={({ item: { component: RenderComponent } }) => (
            <Box marginLeft="medium">
              <RenderComponent />
            </Box>
          )}
        />
      </Box>
    </ScrollView>
  );
};
