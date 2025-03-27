import React, { useEffect, useMemo, useState } from 'react';
import type { ListRenderItem } from 'react-native';
import { FlatList } from 'react-native';
import { Box, Spinner, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Page } from '../../../common/components/layout/page';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import type { InstapayTransaction, InstapayTransactionsFilterInput } from '../../../new-graphql/generated';
import { useInfiniteGetInstapayUserTransactionsQuery } from '../../../new-graphql/generated';
import { useIntl } from '../../../providers/LocalisationProvider';
import { isInstapayError } from '../../income/instapay/utils/graphql-processor';
import { InstaPayDateFilter } from '../components/InstaPayDateFilter';
import { InstaPayTransactionItem } from '../components/InstaPayTransactionItem';
import type { SupportStackNavigationProp } from '../navigation/navigationTypes';

export const InstaPayHistoryScreen = () => {
  const navigation = useNavigation<SupportStackNavigationProp<'InstaPayHistory'>>();
  const { colors, space } = useTheme();
  const { formatMessage } = useIntl();
  const { bottom: bottomInset } = useSafeAreaInsets();

  const [date, setDate] = useState<Dayjs>(dayjs);

  const onBack = () => {
    navigation.goBack();
  };

  const dateString = date.toISOString();
  const filters: InstapayTransactionsFilterInput = useMemo(() => {
    const start = date.startOf('month').toISOString();
    const end = date.endOf('month').toISOString();
    return {
      start,
      end,
    };
  }, [dateString]);

  const {
    data: transactionsData,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteGetInstapayUserTransactionsQuery(
    {
      first: 10,
      filters,
    },
    {
      getNextPageParam: lastPage => {
        if (isInstapayError(lastPage.me?.instapay?.transactions)) {
          return undefined;
        }

        const after = lastPage.me?.instapay?.transactions?.pageInfo?.endCursor;
        if (!after) {
          return undefined;
        }

        return {
          first: 10,
          filters,
          after,
        };
      },
    }
  );

  useEffect(() => {
    if (isError) {
      navigation.navigate('GeneralError');
    }
  }, [isError, navigation]);

  const transactions = useMemo(() => {
    if (!transactionsData) {
      return [];
    }

    return transactionsData.pages.flatMap(page => {
      if (!page.me?.instapay || isInstapayError(page.me?.instapay?.transactions)) {
        return [];
      }
      return page.me.instapay.transactions.transactions;
    });
  }, [transactionsData]);

  const renderItem: ListRenderItem<InstapayTransaction> = ({ index, item }) => {
    return <InstaPayTransactionItem transaction={item} index={index} />;
  };

  const onEndReached = async () => {
    if (hasNextPage) {
      await fetchNextPage();
    }
  };
  const renderFooterComp = () => (isFetchingNextPage ? <Spinner size="small" intent="primary" /> : null);

  const renderEmptyComp = () =>
    isLoading ? (
      <Spinner testID="spinner" />
    ) : (
      <Typography.Title level="h6" style={{ marginLeft: space.medium }}>
        {formatMessage({ id: 'support.instapayHistory.noTransaction' })}
      </Typography.Title>
    );

  return (
    <Box backgroundColor="defaultGlobalSurface" flex={1}>
      <CustomStatusBar barStyle="decorative" backgroundColor={colors.defaultGlobalSurface} />
      <Page.TopBar title={formatMessage({ id: 'support.instapayHistory.title' })} hideRight onBack={onBack} />
      <Box paddingHorizontal="medium" paddingTop="medium">
        <Typography.Title level="h2" typeface="playful" style={{ marginBottom: space.large }}>
          {formatMessage({ id: 'support.instapayHistory.paymentHistory' })}
        </Typography.Title>
        <InstaPayDateFilter date={date} setDate={setDate} />
      </Box>
      <Page.Body backgroundColor="defaultGlobalSurface" marginTop="medium">
        <FlatList
          data={transactions}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: bottomInset, flexGrow: 1 }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooterComp}
          ListEmptyComponent={renderEmptyComp}
          onEndReached={onEndReached}
          ItemSeparatorComponent={() => <Box marginTop="large" />}
        />
      </Page.Body>
    </Box>
  );
};
