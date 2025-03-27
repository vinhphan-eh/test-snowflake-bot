import React from 'react';
import { List, Icon, Box, useTheme, Typography, Spinner } from '@hero-design/rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Page } from '../../../common/components/layout/page';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import { useGetActiveSuperfundMembershipsQuery } from '../../../new-graphql/generated';
import type { ActiveMembership } from '../hooks/useActiveSuperfundMemberships';
import { useActiveSuperfundMemberships } from '../hooks/useActiveSuperfundMemberships';
import type { SuperScreenNavigationProp, SuperScreenRouteProp } from '../navigation/navigationTypes';

export const ActiveMembershipScreen = () => {
  const { space } = useTheme();
  const navigation = useNavigation<SuperScreenNavigationProp<'ActiveMembership'>>();
  const route = useRoute<SuperScreenRouteProp<'ActiveMembership'>>();

  const screenTitle = route?.params.title;

  const { data, isLoading } = useGetActiveSuperfundMembershipsQuery();

  const { membershipsData } = useActiveSuperfundMemberships({
    memberships: data?.me?.orgs,
  });

  const onPressMemberTile = (membership: ActiveMembership) => {
    navigation.navigate('SuperDetailConfirm', {
      title: 'Superannuation Details',
      membership,
      resync: route.params.resync,
      trackingAttributes: {
        fundName: membership.fundName,
        usi: membership.usi,
        resync: !!route.params.resync,
      },
    });
  };

  const renderBody = () => {
    if (isLoading) {
      return <Spinner testID="spinner" />;
    }

    return (
      <Page.Body>
        {membershipsData?.length > 0 ? (
          <>
            {route.params.resync ? (
              <>
                <Typography.Body variant="regular" style={{ marginBottom: space.medium }}>
                  We found these updated Super details in your Work profile. Select to resync.
                </Typography.Body>
                <Typography.Body variant="regular" style={{ marginBottom: space.medium }}>
                  If you have any existing salary sacrifice arrangements, these will not be impacted. You&apos;ll also
                  still be able to view any existing active, pending and archived salary sacrifice requests.
                </Typography.Body>
              </>
            ) : (
              <Typography.Body variant="regular" style={{ marginBottom: space.medium }}>
                We found these in your Work profile. Select one to connect it.
              </Typography.Body>
            )}

            {membershipsData.map(membership => {
              const { fundName, id, orgNames, updatedAt } = membership;
              return (
                <List.Item
                  testID="active-membership-item"
                  key={id}
                  variant="card"
                  title={
                    <Box>
                      <Typography.Caption intent="subdued">{orgNames.join(', ')}</Typography.Caption>
                      <Typography.Title level="h6" style={{ paddingVertical: space.xsmall }}>
                        {fundName}
                      </Typography.Title>
                      {updatedAt && (
                        <Typography.Caption intent="subdued">
                          {`Last updated on ${String(updatedAt.getDate()).padStart(2, '0')}/${String(
                            updatedAt.getMonth() + 1
                          ).padStart(2, '0')}/${updatedAt.getFullYear() % 100}`}
                        </Typography.Caption>
                      )}
                    </Box>
                  }
                  suffix={<Icon icon="arrow-right" intent="primary" />}
                  onPress={() => onPressMemberTile(membership)}
                  style={{ marginBottom: space.medium }}
                />
              );
            })}
          </>
        ) : (
          <>
            <Typography.Body variant="regular" style={{ marginBottom: space.small }}>
              We can only collect your Super info if you’re connected to Work.
            </Typography.Body>
            <Typography.Body variant="regular">
              {`We're working hard to bring you access to our partner and other APRA regulated superfunds.`}
            </Typography.Body>
          </>
        )}
      </Page.Body>
    );
  };

  return (
    <>
      <CustomStatusBar />
      <Page.TopBar hideRight onBack={navigation.goBack} title={screenTitle} />
      <Page>
        <Page.Title>{`Let's connect your Super`}</Page.Title>
        {renderBody()}
      </Page>
    </>
  );
};
