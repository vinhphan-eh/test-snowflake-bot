import React, { useEffect, useRef } from 'react';
import { Box, Spinner } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { SwagIntroCarousel } from './components/SwagIntroCarousel';
import { queryClient } from '../../../common/libs/queryClient';
import { useGetSsaCarouselTimestampQuery, useSeenSsaCarouselMutation } from '../../../new-graphql/generated';
import type { OnboardingScreenNavigationProp } from '../navigation/navigationTypes';

const DashboardScreen = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp<'Dashboard'>>();
  const { data, isLoading } = useGetSsaCarouselTimestampQuery();
  const { mutateAsync: finishSpendAccountCarousel } = useSeenSsaCarouselMutation();

  const spendAccountCarouselFinished = data?.me?.wallet?.seenSSACarouselTimestamp;
  const spendAccountCarouselFinishedRef = useRef(spendAccountCarouselFinished);
  spendAccountCarouselFinishedRef.current = spendAccountCarouselFinished;

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (spendAccountCarouselFinishedRef.current) {
      navigation.replace('LegalAgreementTerm');
    } else {
      finishSpendAccountCarousel(
        {},
        {
          onSuccess: () => {
            queryClient.invalidateQueries(useGetSsaCarouselTimestampQuery.getKey());
          },
        }
      );
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <Box flex={1} backgroundColor="decorativePrimarySurface">
        <Spinner testID="spinner" />
      </Box>
    );
  }

  return (
    <SwagIntroCarousel
      onCancel={navigation.goBack}
      onContinue={() => {
        navigation.navigate('LegalAgreementTerm');
      }}
    />
  );
};

export { DashboardScreen };
