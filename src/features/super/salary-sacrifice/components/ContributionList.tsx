import React, { useRef } from 'react';
import { Box, Image, Spinner, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StopContributionConfirmBottomSheet } from './StopContributionConfirmBottomSheet';
import images from '../../../../common/assets/images';
import type { BottomSheetRef } from '../../../../common/components/bottom-sheet/BottomSheet';
import type { DataCardItem } from '../../../../common/components/data-card';
import { DataCard } from '../../../../common/components/data-card';
import { queryClient } from '../../../../common/libs/queryClient';
import { createCurrencyFormatter } from '../../../../common/utils/numbers';
import type { RootStackNavigationProp } from '../../../../navigation/navigationTypes';
import type { SuperContributionStatus } from '../../../../new-graphql/generated';
import {
  useGetActiveSuperfundMembershipsQuery,
  useGetSuperContributionsQuery,
  useStopContributionByContributionIdMutation,
} from '../../../../new-graphql/generated';
import { useContributionTabs } from '../../hooks/useContributionTabs';
import { useStopContributionStore } from '../../store/useStopContributionStore';
import { useSubmitSuperContributionStore } from '../../store/useSubmitSuperContributionStore';
import { ContributionTab, FIXED, INITIAL, STARTED, STOPPED, STOPPING } from '../constants';
import { formatDate } from '../screens/ReviewScreen';

type ContributionListProps = {
  tabKey: string;
  status: SuperContributionStatus;
};

type Employer = {
  name: string;
  memberUuid: string;
};

export const getFilteredStatuses = (tab: string) => {
  if (tab === ContributionTab.pending) {
    return [INITIAL, STOPPING];
  }

  if (tab === ContributionTab.archived) {
    return [STOPPED];
  }

  return [STARTED];
};

export const getEmployerName = (employers: Employer[] | undefined, memberUuid: string | undefined) => {
  if (!employers || !memberUuid) {
    return '';
  }

  return employers.map(e => (e?.memberUuid === memberUuid ? e.name : '')).join('');
};

const ContributionList = ({ status, tabKey }: ContributionListProps) => {
  const { space } = useTheme();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const stopContributionBsRef = useRef<BottomSheetRef>(null);
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();

  const { resetData, selectedContributionId, setSelectedContributionId } = useStopContributionStore();
  const { setCreatedOrUpdatedContribution } = useSubmitSuperContributionStore();
  const { markToggleSeenPendingTab } = useContributionTabs();

  const { isLoading: isSubmitting, mutateAsync: stopContribution } = useStopContributionByContributionIdMutation();
  const { data, isLoading: isFetchingContributions } = useGetSuperContributionsQuery({
    statusIn: getFilteredStatuses(tabKey),
  });

  const formatCurrency = createCurrencyFormatter();

  const contributions = data?.me?.superContributions;
  const orgs = data?.me?.orgs;

  const onPressEdit = (id: string) => {
    setSelectedContributionId(id);
    stopContributionBsRef?.current?.open();
  };

  const renderBody = () => {
    if (!contributions || contributions.length === 0) {
      return (
        <Box marginTop="xxxlarge" justifyContent="center" alignItems="center">
          <Image
            resizeMode="contain"
            style={{ width: 100, height: 156 }}
            source={images.salarySacrificeNoContributionFound}
          />

          <Typography.Title level="h4" style={{ marginVertical: space.medium, textAlign: 'center' }}>
            {`You don't have any ${tabKey} contributions`}
          </Typography.Title>

          {status === STARTED && <Typography.Body intent="subdued">Add a contribution to get started</Typography.Body>}
        </Box>
      );
    }

    return contributions.map((contribution, index) => {
      const { contributionType, contributionValue, endDate, id, membershipId, preserveAmount, startDate } =
        contribution || {};

      const contributionDataCard: DataCardItem[] = [
        {
          label: 'Employer',
          content: getEmployerName(orgs, membershipId),
        },
        {
          label: 'Contribution amount',
          content:
            contributionType === FIXED
              ? formatCurrency(Number(contributionValue) / 100)
              : `${Number(contributionValue) / 100}%`,
        },
        {
          label: 'Preserved pay amount',
          content: formatCurrency(Number(preserveAmount) / 100),
        },
        {
          label: 'Start my contributions on this date',
          content: startDate ? formatDate(startDate) : '',
        },
        {
          label: 'Stop my contributions on this date',
          content: endDate ? formatDate(endDate) : 'Never',
          bottomLabel:
            status === STARTED ? (
              <Typography.Body
                variant="small-bold"
                testID={`stop-my-contribution-${index}`}
                intent="primary"
                style={{
                  textDecorationLine: 'none',
                  textAlign: 'center',
                  marginTop: space.medium,
                  marginBottom: space.small,
                }}
                onPress={() => {
                  if (id) {
                    onPressEdit(id);
                  }
                }}
              >
                Stop my contribution
              </Typography.Body>
            ) : undefined,
        },
      ];

      return (
        <DataCard
          key={id}
          style={{ marginBottom: space.medium }}
          testID="contribution-item-data-card"
          data={contributionDataCard}
          hideIcon
        />
      );
    });
  };

  const handleStopContribution = async () => {
    try {
      await stopContribution({ id: selectedContributionId });

      stopContributionBsRef?.current?.close();
      queryClient.invalidateQueries(useGetSuperContributionsQuery.getKey());
      queryClient.invalidateQueries(useGetActiveSuperfundMembershipsQuery.getKey());
      markToggleSeenPendingTab(false);
      setCreatedOrUpdatedContribution(true);
      resetData();
    } catch (error: unknown) {
      if (error instanceof Error) {
        stopContributionBsRef?.current?.close();
        navigation.navigate('SuperStack', {
          screen: 'SalarySacrificeStack',
          params: {
            screen: 'SubmitContributionFailed',
            params: { errorMessage: error.message || 'failed to stop contribution' },
          },
        });
      }
    }
  };

  if (isFetchingContributions) {
    return <Spinner testID="spinner" />;
  }

  return (
    <ScrollView style={{ flex: 1, paddingBottom: bottomInset }}>
      <Box paddingHorizontal="medium" paddingBottom="medium" marginVertical="medium">
        {renderBody()}
      </Box>
      <StopContributionConfirmBottomSheet
        onStopContribution={handleStopContribution}
        isStoppingContribution={isSubmitting}
        bsRef={stopContributionBsRef}
      />
    </ScrollView>
  );
};

export default ContributionList;
