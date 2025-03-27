import React from 'react';
import { Dimensions } from 'react-native';
import { Box, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { ExperimentEntry } from '../../../../common/components/experiment/ExperimentEntry';
import { BenefitsTabKeys, PillarIds } from '../../../../common/constants/navigation';
import { useIsCandidateV2 } from '../../../../common/hooks/useIsCandidate';
import { queryClient } from '../../../../common/libs/queryClient';
import { switchPillar } from '../../../../common/stores/useMiniAppSwitcherStore';
import type { RootStackNavigationProp } from '../../../../navigation/navigationTypes';
import { useGetUserWaitListQuery } from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { useGroupWaitlistStatus } from '../hooks/useGroupWaitlistStatus';

const screenWidth = Dimensions.get('screen').width;

export const SwagDashboardMegadealTile = () => {
  const { colors, space } = useTheme();
  const Intl = useIntl();
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  const { isJoinedWaitlist, isShowMegadealCTA } = useGroupWaitlistStatus();
  const isCandidate = useIsCandidateV2();

  const onGoToBenefitsPillar = () => {
    switchPillar({
      to: {
        pillarId: PillarIds.BenefitsApp,
        tab: isCandidate ? BenefitsTabKeys.CASHBACK : BenefitsTabKeys.BILLS,
      },
    });
  };

  const onPressTile = () => {
    if (isJoinedWaitlist) {
      onGoToBenefitsPillar();
    } else {
      navigation.navigate('BenefitsStack', {
        screen: 'GroupStack',
        params: {
          screen: 'JoinWaitListIntroScreen',
          params: {
            onJoinWaitListSuccess: () => {
              queryClient.invalidateQueries(useGetUserWaitListQuery.getKey());
              onGoToBenefitsPillar();
            },
          },
        },
      });
    }
  };

  if (!isShowMegadealCTA) {
    return null;
  }

  return (
    <Box style={{ width: screenWidth - space.xxxxlarge }} marginLeft="medium" marginTop="large">
      <ExperimentEntry
        backgroundColor={colors.neutralGlobalSurface}
        testID="swag-dashboard-megadeal-tile-test-id"
        thumbnailName="expEntryMegadeal"
        title={Intl.formatMessage({ id: 'megadeal.group.card.title' })}
        description={Intl.formatMessage({ id: 'megadeal.group.card.description' })}
        onPress={onPressTile}
        showArrow={false}
      />
    </Box>
  );
};
