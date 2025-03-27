import React, { useEffect, useState } from 'react';
import { FlatList, Image } from 'react-native';
import { Box, Empty, RefreshControl, Spinner, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { StashCard } from './StashCard';
import images from '../../../common/assets/images';
import { BalanceCard } from '../../../common/components/balance-card';
import { useRefreshOnFocus } from '../../../common/hooks/useRefreshOnFocus';
import { StashStatus, useGetStashesQuery, type StashItem } from '../../../new-graphql/generated';
import { useGetSpendAmount } from '../../spend-account/hooks/useGetSpendAmount';
import type { StashNavigationProp } from '../navigation/navigationTypes';
import { useStashListStore } from '../stores/useStashListStore';

export const StashList = () => {
  const navigation = useNavigation<StashNavigationProp<'StashDashboard'>>();
  const { setStashLimitReached, setStashNamesList } = useStashListStore();
  const { space } = useTheme();
  const { data, isLoading, refetch } = useGetStashesQuery();
  const { stashedAmount } = useGetSpendAmount({
    shouldLoadStashes: true,
  });
  const stashes = (data?.me?.wallet?.stash?.items ?? []) as StashItem[];
  const [refreshing, setRefreshing] = useState(false);
  useRefreshOnFocus(refetch);

  useEffect(() => {
    if (stashes?.length) {
      setStashLimitReached(stashes.filter(stash => stash.status === StashStatus.Open).length >= 9);
    }

    setStashNamesList(stashes?.map(stash => stash.name || '') || []);
  }, [stashes?.length]);

  const renderListEmptyComponent = () => {
    if (isLoading) {
      return <Spinner />;
    }

    return (
      <Box style={{ marginTop: space.large }}>
        <Empty
          image={<Image source={images.manStaircase} />}
          title="You don't have any Stash accounts"
          description="Create a Stash to start your saving journey today."
        />
      </Box>
    );
  };

  const handlePress = (item: StashItem) => {
    navigation.navigate('StashStack', {
      screen: 'StashIndividual',
      params: { id: item.id ?? '' },
    });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch().finally(() => setRefreshing(false));
  };

  return (
    <FlatList
      data={stashes}
      testID="stash-list"
      renderItem={({ item }) => (
        <StashCard stash={item} onPress={() => handlePress(item)} style={{ marginHorizontal: space.medium }} />
      )}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      ListHeaderComponent={
        <BalanceCard
          balance={stashedAmount}
          title="Total stashed"
          icon="download-box-outlined"
          iconIntent="secondary"
          marginBottom="small"
        />
      }
      ListEmptyComponent={renderListEmptyComponent}
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: space['5xlarge'] * 2 + space.medium }}
    />
  );
};
