import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Page } from '../../../common/components/layout/page';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import type { StashItem } from '../../../new-graphql/generated';
import { useGetStashesQuery } from '../../../new-graphql/generated';
import { StashCard } from '../components/StashCard';
import { convertStashToStashDetails } from '../hooks/useGetStashDetails';
import type { StashNavigationProp } from '../navigation/navigationTypes';

export const StashSelectionScreen = () => {
  const navigation = useNavigation<StashNavigationProp<'StashSelection'>>();
  const { data } = useGetStashesQuery();
  const stashes = (data?.me?.wallet?.stash?.items ?? []) as StashItem[];

  return (
    <>
      <CustomStatusBar />
      <Page.TopBar onBack={navigation.goBack} hideRight title="Stash cash" />
      <Page showsVerticalScrollIndicator={false}>
        <Page.Title>Where are we stashing your cash?</Page.Title>
        <Page.Body marginBottom="xlarge">
          {stashes.map(stash => (
            <StashCard
              key={stash.id}
              stash={stash}
              onPress={() => navigation.navigate('StashDepositCash', { stash: convertStashToStashDetails(stash) })}
            />
          ))}
        </Page.Body>
      </Page>
    </>
  );
};
