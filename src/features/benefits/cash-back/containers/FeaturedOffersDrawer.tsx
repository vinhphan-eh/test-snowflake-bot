import React, { useCallback } from 'react';
import type { ListRenderItem } from 'react-native';
import { Box, Spinner, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DataCard } from '../../../../common/components/data-card';
import Drawer, { DrawerFlatList } from '../../../../common/components/drawer';
import type { RootStackNavigationProp } from '../../../../navigation/navigationTypes';
import type { OnlineOffer } from '../../../../new-graphql/generated';
import { useGetFeaturedOffersQuery } from '../../../../new-graphql/generated';

export interface FeaturedOffersDrawerProps {
  snapPoints?: Array<string | number>;
}

const FeaturedOffersDrawer = ({ snapPoints = ['50%', '100%'] }: FeaturedOffersDrawerProps) => {
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { colors } = useTheme();
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();

  const { data: featuredOnlineOffersData, isLoading } = useGetFeaturedOffersQuery();
  const featuredOnlineOffers =
    featuredOnlineOffersData?.me?.cashback?.featuresOffers.edges.map(edge => edge.node) ?? [];

  const openOnlineOfferDetail = (offerId: string, offer: OnlineOffer) => {
    navigation.navigate('BenefitsStack', {
      screen: 'CashbackStack',
      params: { screen: 'OnlineOfferDetail', params: { offerId, offer } },
    });
  };

  const renderItem: ListRenderItem<OnlineOffer> = useCallback(({ index, item }) => {
    return (
      <Box
        flex={1}
        marginBottom="medium"
        marginTop={index === 0 ? 'small' : undefined}
        marginHorizontal="medium"
        borderRadius="medium"
        style={{
          shadowColor: '#001F23',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowRadius: 4,
          shadowOpacity: 0.12,
        }}
      >
        <DataCard
          accessibilityLabel="Cashback item"
          data={[
            {
              label: item.advertiserName,
              content: item.title.replace('>', 'over').toLowerCase(),
              bottomLabel: item.type.charAt(0).toUpperCase() + item.type.slice(1),
            },
          ]}
          thumbnailSource={item.imageUrl ? { uri: item.imageUrl } : undefined}
          onPress={() => openOnlineOfferDetail(item.id, item)}
          hideIcon
        />
      </Box>
    );
  }, []);

  return (
    <Drawer
      style={{
        backgroundColor: colors.defaultGlobalSurface,
        shadowColor: '#001F23',
        shadowOffset: {
          width: 0,
          height: -2,
        },
        shadowOpacity: 0.12,
        shadowRadius: 4,
        elevation: 10,
      }}
      snapPoints={snapPoints}
    >
      <DrawerFlatList
        contentContainerStyle={{ paddingBottom: bottomInset }}
        data={featuredOnlineOffers}
        renderItem={renderItem}
        ListHeaderComponent={
          <Box padding="smallMedium">
            <Typography.Title level="h5">Featured offers</Typography.Title>
          </Box>
        }
        ListEmptyComponent={
          isLoading ? (
            <Spinner size="medium" />
          ) : (
            <Typography.Body variant="regular" style={{ alignSelf: 'center' }}>
              No offers to display
            </Typography.Body>
          )
        }
        testID="featured-offers-drawer-test-id"
      />
    </Drawer>
  );
};

export { FeaturedOffersDrawer };
