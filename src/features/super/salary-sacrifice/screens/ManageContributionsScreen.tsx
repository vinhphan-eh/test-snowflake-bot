import React from 'react';
import type { TabType } from '@hero-design/rn';
import { useTheme, FAB, Tabs, Typography, Box } from '@hero-design/rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Page } from '../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import { useContributionTabs } from '../../hooks/useContributionTabs';
import { useSalarySacrificeNavigation } from '../../hooks/useSalarySacrificeNavigation';
import ContributionList from '../components/ContributionList';
import { ContributionTab, INITIAL, STARTED, STOPPED } from '../constants';
import type { SacrificeScreenNavigationProp, SalarySacrificeScreenRouteProp } from '../navigation/navigationTypes';

export const ManageContributionsScreen = () => {
  const { space } = useTheme();

  const navigation = useNavigation<SacrificeScreenNavigationProp<'ManageContributions'>>();
  const route = useRoute<SalarySacrificeScreenRouteProp<'ManageContributions'>>();
  const screenTitle = route?.params.title;
  const trackingAttributes = route?.params.trackingAttributes;

  const { navigateToSalarySacrifice } = useSalarySacrificeNavigation(trackingAttributes);
  const { isShowPendingBadge, onPressTab, selectedTabKey } = useContributionTabs();

  const contributionTabs: TabType[] = [
    {
      testID: 'active-tab',
      key: 'active',
      activeItem: 'Active',
      component: <ContributionList tabKey={ContributionTab.active} status={STARTED} />,
    },
    {
      testID: 'pending-tab',
      key: 'pending',
      activeItem: 'Pending',
      badge: isShowPendingBadge
        ? {
            type: 'status',
          }
        : undefined,
      component: <ContributionList tabKey={ContributionTab.pending} status={INITIAL} />,
    },
    {
      testID: 'archived-tab',
      key: 'archived',
      activeItem: 'Archived',
      component: <ContributionList tabKey={ContributionTab.archived} status={STOPPED} />,
    },
  ];

  return (
    <>
      <CustomStatusBar />
      <Page.TopBar hideRight onBack={navigation.goBack} title={screenTitle} />
      <Box flex={1} backgroundColor="defaultGlobalSurface">
        <Typography.Title level="h3" style={{ marginLeft: space.medium, marginVertical: space.medium }}>
          Manage contributions
        </Typography.Title>

        <Tabs onTabPress={onPressTab} selectedTabKey={selectedTabKey} tabs={contributionTabs} />
      </Box>

      <FAB
        testID="request-contribution-fab"
        icon="add"
        onPress={navigateToSalarySacrifice}
        style={{
          position: 'absolute',
          bottom: space.large,
          right: space.large,
        }}
      />
    </>
  );
};
