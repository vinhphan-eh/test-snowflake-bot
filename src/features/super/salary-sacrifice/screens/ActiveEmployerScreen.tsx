import React from 'react';
import { Box, List, Typography, Icon, useTheme, Alert, Spinner } from '@hero-design/rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Page } from '../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import { useGetSuperContributionsQuery } from '../../../../new-graphql/generated';
import { useActiveEmployers } from '../../hooks/useActiveEmployers';
import { useSubmitSuperContributionStore } from '../../store/useSubmitSuperContributionStore';
import { INITIAL, STARTED, SALARY_SACRIFICE_TITLE } from '../constants';
import type { SacrificeScreenNavigationProp, SalarySacrificeScreenRouteProp } from '../navigation/navigationTypes';

export const ActiveEmployerScreen = () => {
  const { space } = useTheme();
  const { bottom: bottomInset } = useSafeAreaInsets();

  const { setMembershipUuid, setOrgNames } = useSubmitSuperContributionStore();

  const { activeEmployers, isLoading } = useActiveEmployers();

  const { data: superContributionsData, isLoading: isFetchingSuperContributions } = useGetSuperContributionsQuery({
    statusIn: [INITIAL, STARTED],
  });
  const superContributions = superContributionsData?.me?.superContributions;

  const navigation = useNavigation<SacrificeScreenNavigationProp<'ActiveEmployer'>>();
  const route = useRoute<SalarySacrificeScreenRouteProp<'ActiveEmployer'>>();
  const screenTitle = route?.params.title;
  const trackingAttributes = route?.params.trackingAttributes;

  const onPressItem = (orgName: string, memberUuid: string) => {
    setOrgNames(orgName);
    setMembershipUuid(memberUuid);
    navigation.navigate('ContributedOption', { title: SALARY_SACRIFICE_TITLE, trackingAttributes });
  };

  const renderFooterBody = () => {
    if (isLoading || isFetchingSuperContributions) {
      return <Spinner size="small" testID="spinner" />;
    }

    return activeEmployers?.length > 0 ? (
      activeEmployers.map((employer, index) => {
        const { id, memberUuid, name } = employer;

        let userHasRequestedSacrifice = false;

        // Loop to check if user has been requested salary sacrifice or not
        if (superContributions) {
          superContributions.forEach(contribution => {
            if (contribution?.membershipId === memberUuid) {
              userHasRequestedSacrifice = true;
            }
          });
        }

        return (
          <Box key={id} marginTop="medium">
            <List.Item
              // Disable employer item when user has already requested sacrifice once
              disabled={userHasRequestedSacrifice}
              testID={`employer-item-${index}`}
              variant="card"
              title={
                <Typography.Body
                  variant="regular"
                  testID="employer-item-name"
                  intent={userHasRequestedSacrifice ? 'disabled' : 'body'}
                >
                  {name}
                </Typography.Body>
              }
              suffix={<Icon icon="arrow-right" intent={userHasRequestedSacrifice ? 'disabled-text' : 'primary'} />}
              onPress={() => onPressItem(employer.name, employer.memberUuid)}
            />
          </Box>
        );
      })
    ) : (
      <Alert
        intent="error"
        style={{ marginBottom: space.medium }}
        title="You haven't nominated this fund with your employer"
        content="Please update or provide your super details to your employer through the Employment Hero HR portal."
      />
    );
  };

  return (
    <>
      <CustomStatusBar />
      <Page.TopBar hideRight onBack={navigation.goBack} title={screenTitle} />
      <Page style={{ paddingBottom: bottomInset }}>
        <Page.Title>Which income would you like to contribute from?</Page.Title>
        <Page.Body>
          <Typography.Body variant="regular" style={{ marginBottom: space.medium }}>
            The employer you choose will determine who we send your salary sacrifice request to.
          </Typography.Body>
        </Page.Body>
        <Page.Footer>{renderFooterBody()}</Page.Footer>
      </Page>
    </>
  );
};
