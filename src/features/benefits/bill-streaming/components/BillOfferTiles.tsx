import React from 'react';
import { FlatList } from 'react-native';
import { Box, Typography, useTheme } from '@hero-design/rn';
import type { StateBasedOfferTile } from '../../../../new-graphql/generated';

type BillOfferTilesProps = {
  offerTiles: StateBasedOfferTile[];
};

export const BillOfferTiles = ({ offerTiles }: BillOfferTilesProps) => {
  const { radii, space } = useTheme();

  return (
    <FlatList
      data={offerTiles}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.content}
      contentContainerStyle={{ paddingLeft: space.medium }}
      renderItem={({ item }) => {
        return (
          <Box
            padding="medium"
            backgroundColor="defaultGlobalSurface"
            style={{ borderRadius: radii.large, marginRight: space.small, width: 194 }}
          >
            <Typography.Title intent="primary" level="h5">
              {item.content}
            </Typography.Title>
            <Typography.Caption style={{ marginTop: space.small }}>{item.subContent}</Typography.Caption>
          </Box>
        );
      }}
    />
  );
};
