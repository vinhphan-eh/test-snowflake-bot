import React from 'react';
import { Platform, Share } from 'react-native';
import { Box } from '@hero-design/rn';
import type { DataCardItem } from '../../../../common/components/data-card';
import { DataCard } from '../../../../common/components/data-card';
import type { SwagSuperfund } from '../../../../new-graphql/generated';

type SuperDetailCardProps = {
  data: SwagSuperfund;
};

export const SuperDetailCard = ({ data }: SuperDetailCardProps) => {
  const { abn, fundChoice: fundType, fundName, memberNumber, usi } = data || {};

  const superDetailsDataCard: DataCardItem[] = [
    {
      label: 'Fund name',
      content: fundName || '',
    },
    {
      label: 'Member number',
      content: memberNumber || '',
    },
    {
      label: 'ABN',
      content: abn || '',
    },
    {
      label: 'USI',
      content: usi || '',
    },
    {
      label: 'Fund type',
      content: fundType || '',
    },
  ];

  const onPressSuperDetailCard = () => {
    Share.share({
      message: `Here are my Super details\nName: ${fundName}\nUSI: ${usi}\nABN: ${abn}\nMember number: ${memberNumber}`,
    });
  };

  return (
    <Box paddingHorizontal="medium">
      <DataCard
        testID="super-data-card"
        data={superDetailsDataCard}
        iconName={Platform.OS === 'ios' ? 'upload-outlined' : 'share-2'}
        onPress={onPressSuperDetailCard}
      />
    </Box>
  );
};
