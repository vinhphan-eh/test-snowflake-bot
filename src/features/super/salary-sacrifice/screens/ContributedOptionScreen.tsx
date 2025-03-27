import React from 'react';
import { Box, List, Typography, Icon, useTheme } from '@hero-design/rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Page } from '../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import { useMixpanel } from '../../../../common/hooks/useMixpanel';
import { CLICK_CONTRIBUTION_OPTION, SALARY_SACRIFICE_MOBULE_NAME } from '../../constants/trackingEvents';
import { useSubmitSuperContributionStore } from '../../store/useSubmitSuperContributionStore';
import { FIXED, PERCENTAGE, SALARY_SACRIFICE_TITLE } from '../constants';
import type { SacrificeScreenNavigationProp, SalarySacrificeScreenRouteProp } from '../navigation/navigationTypes';

export const ContributedOptionScreen = () => {
  const { space } = useTheme();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { eventTracking } = useMixpanel();

  const navigation = useNavigation<SacrificeScreenNavigationProp<'ContributedOption'>>();
  const route = useRoute<SalarySacrificeScreenRouteProp<'ContributedOption'>>();
  const screenTitle = route?.params.title;
  const trackingAttributes = route?.params.trackingAttributes;

  const { setContributionType } = useSubmitSuperContributionStore();

  const onPressContributeAmount = () => {
    setContributionType(FIXED);
    navigation.navigate('InputDollarAmount', { title: SALARY_SACRIFICE_TITLE, trackingAttributes });

    eventTracking({
      event: CLICK_CONTRIBUTION_OPTION,
      categoryName: 'user action',
      metaData: {
        module: SALARY_SACRIFICE_MOBULE_NAME,
        contributionType: FIXED,
        trackingAttributes,
      },
    });
  };

  const onPressContributePercentage = () => {
    setContributionType(PERCENTAGE);
    navigation.navigate('InputPercentageAmount', { title: SALARY_SACRIFICE_TITLE, trackingAttributes });

    eventTracking({
      event: CLICK_CONTRIBUTION_OPTION,
      categoryName: 'user action',
      metaData: {
        module: SALARY_SACRIFICE_MOBULE_NAME,
        contributionType: PERCENTAGE,
        trackingAttributes,
      },
    });
  };

  return (
    <>
      <CustomStatusBar />
      <Page.TopBar hideRight onBack={navigation.goBack} title={screenTitle} />
      <Page style={{ paddingBottom: bottomInset }}>
        <Page.Title>How would you like to contribute your salary towards your super?</Page.Title>

        <Page.Body>
          <Typography.Body variant="regular" style={{ marginBottom: space.medium }}>
            Your selection will determine the calculation made on your pay slip each month.
          </Typography.Body>
        </Page.Body>

        <Page.Footer>
          <Box marginTop="medium">
            <List.Item
              variant="card"
              title={<Typography.Body variant="regular">Contribute a percentage</Typography.Body>}
              suffix={<Icon icon="arrow-right" intent="primary" />}
              onPress={onPressContributePercentage}
            />
          </Box>
          <Box marginTop="medium">
            <List.Item
              variant="card"
              title={<Typography.Body variant="regular">Contribute an amount</Typography.Body>}
              suffix={<Icon icon="arrow-right" intent="primary" />}
              onPress={onPressContributeAmount}
            />
          </Box>
        </Page.Footer>
      </Page>
    </>
  );
};
