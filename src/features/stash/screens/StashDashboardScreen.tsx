import React, { useState } from 'react';
import { BottomSheet, Box, Button, FAB, Spinner, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import type { RootStackNavigationProp } from '../../../navigation/navigationTypes';
import { useGetStashMetadataQuery } from '../../../new-graphql/generated';
import { StashList } from '../components/StashList';
import { StashMarketingCard } from '../components/StashMarketingCard';
import { useStashListStore } from '../stores/useStashListStore';

export const StashDashboardScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  const { data, isError, isLoading } = useGetStashMetadataQuery();
  const shouldShowStashMarketingCard =
    !isLoading && !isError && !data?.me?.wallet?.stash?.metadata?.isMarketingCardFinished;
  const [stashLimitBottomSheetOpening, setStashLimitBottomSheetOpening] = useState<boolean>(false);
  const { stashLimitReached } = useStashListStore();
  const { space } = useTheme();

  const visitStashCarousel = () => {
    navigation.navigate('StashStack', { screen: 'StashIntroduction' });
  };

  const handleOpenCreateStashFlow = () => {
    if (stashLimitReached) {
      setStashLimitBottomSheetOpening(true);
    } else {
      navigation.navigate('StashStack', { screen: 'StashName' });
    }
  };

  if (isLoading) {
    return <Spinner size="medium" />;
  }

  if (shouldShowStashMarketingCard) {
    return (
      <Box flex={1}>
        <StashMarketingCard onContinue={visitStashCarousel} />
      </Box>
    );
  }

  return (
    <Box flex={1}>
      <StashList />
      <BottomSheet
        open={stashLimitBottomSheetOpening}
        onRequestClose={() => setStashLimitBottomSheetOpening(false)}
        header="You can only have up to 9 Stashes"
        footer={
          <Box style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <Button variant="text" text="Got It!" onPress={() => setStashLimitBottomSheetOpening(false)} />
          </Box>
        }
      >
        <Box style={{ padding: space.medium }}>
          <Typography.Body variant="regular">
            If you would like to create a new Stash, you must delete an existing one.
          </Typography.Body>
        </Box>
      </BottomSheet>
      <Box
        flexDirection="row"
        justifyContent="flex-end"
        style={{
          backgroundColor: 'transparent',
          position: 'absolute',
          bottom: space['5xlarge'],
          right: space.medium,
        }}
      >
        <FAB icon="add" title="Create Stash" onPress={handleOpenCreateStashFlow} />
      </Box>
    </Box>
  );
};
