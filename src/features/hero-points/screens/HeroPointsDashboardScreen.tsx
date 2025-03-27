import React, { useState, useEffect, useMemo } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { RefreshControl, useTheme, Box, Spinner } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useGetSuperAppToken } from '../../../common/auth/store/useSuperAppTokenStore';
import { BalanceCard } from '../../../common/components/balance-card';
import { GeneralError } from '../../../common/components/error';
import { OverlayLoadingScreen } from '../../../common/components/spinner';
import { useGetMinSnapPoint } from '../../../common/hooks/useGetMinSnapPoint';
import { useSpendHPOnSwagCardVisiblity } from '../../../common/hooks/useHeroPointsVisibility';
import { useIsAccountAU } from '../../../common/hooks/useIsAccountAU';
import { useIsCandidateV2 } from '../../../common/hooks/useIsCandidate';
import { useIsWalletSetupComplete } from '../../../common/hooks/useIsWalletSetupComplete';
import { queryClient } from '../../../common/libs/queryClient';
import { useSessionStore } from '../../../common/stores/useSessionStore';
import { useTopTabStore } from '../../../common/stores/useTopTabStore';
import { isEnabledForEh } from '../../../common/types/react-query';
import ThemeSwitcher from '../../../common/utils/ThemeSwitcher';
import type { RootStackNavigationProp } from '../../../navigation/navigationTypes';
import type { HeroPointsTransactionItem } from '../../../new-graphql/generated';
import {
  useGetHeroPointsBalanceQuery,
  useInfiniteGetHeroPointsTransactionHistoriesQuery,
} from '../../../new-graphql/generated';
import { useIntl } from '../../../providers/LocalisationProvider';
import { PayWithHeroPointsTile } from '../components/PayWithHeroPointsTile';
import { ReimburseWithHeroPointsToggle } from '../components/ReimburseWithHeroPointsToggle';
import { TransactionsDrawer } from '../components/TransactionsDrawer';
import { TurnPointsToGiftCardsTile } from '../components/TurnPointsToGiftCardsTile';
import { useSeenHeroPointsIntro } from '../hooks/useSeenHeroPointsIntro';
import { splitTransactionsIntoSections } from '../utils/splitTransactionsIntoSections';

const ITEM_PER_PAGE = 10;

export const HeroPointsDashboardScreen = () => {
  const { maxScrollPercentage, minSnapPoint, onLayoutEndPosition, onLayoutScreenHeight } = useGetMinSnapPoint();
  const { hasUserSeenIntro, markSeen } = useSeenHeroPointsIntro();
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  const selectedTab = useTopTabStore(state => state.selectedTab);
  const isTerminated = useSessionStore(state => state.currentUser?.attributes?.terminated);
  const isCandidate = useIsCandidateV2();
  const isAustralian = useIsAccountAU();
  const { loginProvider, token } = useGetSuperAppToken('HeroPointsDashboardScreen');
  const { formatMessage } = useIntl();
  const orgId = useSessionStore(state => state.currentOrgId) ?? '';
  const {
    data,
    isError: isFetchingBalanceError,
    isLoading,
  } = useGetHeroPointsBalanceQuery(
    {
      orgId,
    },
    { enabled: !!orgId && isEnabledForEh(token, loginProvider), cacheTime: 0 }
  );
  const { colors, radii, space } = useTheme();
  const balance = data?.me?.heroPoints?.balance || 0;
  const [refreshing, setRefreshing] = useState(false);

  const spendHDOnSwagCardPermission = useSpendHPOnSwagCardVisiblity();
  const { isFetched: isWalletSetupCompleteFetched, isWalletSetupComplete } = useIsWalletSetupComplete();

  const shouldShowTurnPointsToGiftCardsTile = !(isCandidate || isTerminated);

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([
      queryClient.invalidateQueries(useGetHeroPointsBalanceQuery.getKey({ orgId })),
      queryClient.invalidateQueries(
        useInfiniteGetHeroPointsTransactionHistoriesQuery.getKey({ orgId, itemPerPage: ITEM_PER_PAGE, pageIndex: 1 })
      ),
    ]).finally(() => setRefreshing(false));
  };

  const {
    data: transactions,
    fetchNextPage,
    hasNextPage,
    isFetching: isTransactionsFetching,
    isFetchingNextPage,
  } = useInfiniteGetHeroPointsTransactionHistoriesQuery(
    {
      orgId,
      itemPerPage: ITEM_PER_PAGE,
      pageIndex: 1,
    },
    {
      enabled: isEnabledForEh(token, loginProvider) && !!orgId,
      keepPreviousData: true,
      getNextPageParam: previousPage => {
        const { pageIndex, totalPages } = previousPage.me?.heroPoints?.transactionHistories || {
          pageIndex: 1,
          totalPages: 0,
        };
        if (pageIndex < totalPages) {
          return {
            orgId,
            pageIndex: pageIndex + 1,
            itemPerPage: ITEM_PER_PAGE,
          };
        }
        return undefined;
      },
    }
  );

  const allTransactions =
    (transactions?.pages.flatMap(
      page => page.me?.heroPoints?.transactionHistories?.items
    ) as HeroPointsTransactionItem[]) ?? [];

  const { sections } = splitTransactionsIntoSections({
    transactions: allTransactions,
  });

  const loadMoreTransactions = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const adTiles = useMemo(() => {
    // eslint-disable-next-line prefer-const
    let tiles = [];

    if (spendHDOnSwagCardPermission && !isWalletSetupComplete) {
      tiles.push({
        id: 'pay-with-hero-points',
        component: () => <PayWithHeroPointsTile />,
      });
    }

    if (shouldShowTurnPointsToGiftCardsTile) {
      tiles.push({
        id: 'turn-points-to-gift-cards',
        component: () => (
          <Box marginHorizontal={tiles.length === 1 ? undefined : 'medium'}>
            <TurnPointsToGiftCardsTile fillFullWidth={tiles.length === 1} />
          </Box>
        ),
      });
    }

    return tiles;
  }, []);

  const closeCarousel = () => {
    navigation.goBack();
  };

  const navigateToCarousel = async () => {
    const seenIntro = await hasUserSeenIntro();
    if (selectedTab === 'hero-points-tab' && !seenIntro && isAustralian) {
      markSeen();
      navigation.navigate('HeroPointsStack', {
        screen: 'heroPoints/redeemHPWithSwagIntroduction',
        params: {
          isHeroPointsDashboard: true,
          onBack: closeCarousel,
        },
      });
    }
  };

  useEffect(() => {
    navigateToCarousel();
  }, [hasUserSeenIntro, navigation, selectedTab, isAustralian]);

  if (isFetchingBalanceError) {
    return <GeneralError themeName="eBens" />;
  }

  return (
    <>
      <Box onLayout={onLayoutScreenHeight} flex={1}>
        <ScrollView
          style={{ maxHeight: `${maxScrollPercentage}%` }}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          accessibilityLabel="Pull to refresh"
          testID="refreshControl"
        >
          <ThemeSwitcher name="eBens">
            <BalanceCard
              title="Points balance"
              currency="POINTS"
              balance={balance}
              icon="star-circle-outlined"
              marginBottom={undefined}
            />
          </ThemeSwitcher>
          <ReimburseWithHeroPointsToggle
            withLearnMore
            content={`${formatMessage({ id: 'points.reimburseSwagCardWithHeroPoints' })}`}
            style={{
              backgroundColor: colors.defaultGlobalSurface,
              borderRadius: radii.xlarge,
              marginTop: space.medium,
              marginHorizontal: space.medium,
            }}
          />
          <Box marginTop="medium" marginLeft="medium">
            {isWalletSetupCompleteFetched ? (
              <FlatList
                horizontal
                data={adTiles}
                keyExtractor={item => item.id}
                renderItem={({ item: { component: RenderComponent } }) => <RenderComponent />}
                showsHorizontalScrollIndicator={false}
              />
            ) : (
              <Box flex={1} marginVertical="large">
                <Spinner size="small" />
              </Box>
            )}
          </Box>

          <ThemeSwitcher name="eBens">
            <Box
              // fake last element
              style={{ width: 10, height: 10 }}
              onLayout={onLayoutEndPosition}
            />
          </ThemeSwitcher>
        </ScrollView>
        <ThemeSwitcher name="eBens">
          <TransactionsDrawer
            snapPoints={[minSnapPoint, '100%']}
            sections={sections}
            isFetching={isTransactionsFetching}
            isFetchingNextPage={isFetchingNextPage}
            onEndReached={loadMoreTransactions}
          />
        </ThemeSwitcher>
      </Box>

      {isLoading && <OverlayLoadingScreen />}
    </>
  );
};
