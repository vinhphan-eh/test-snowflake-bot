import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import {
  BottomSheet,
  Box,
  Button,
  Icon,
  Image,
  Progress,
  Typography,
  scale,
  useTheme,
  type IconName,
} from '@hero-design/rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CurrencyText } from '../../../common/components/currency-text/CurrencyText';
import { Page } from '../../../common/components/layout/page';
import { OverlayLoadingScreen } from '../../../common/components/spinner';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import { useGetMinSnapPoint } from '../../../common/hooks/useGetMinSnapPoint';
import { useRefreshOnFocus } from '../../../common/hooks/useRefreshOnFocus';
import { queryClient } from '../../../common/libs/queryClient';
import { useToast } from '../../../common/shared-hooks/useToast';
import { getFloatAmountFromMoneyV2 } from '../../../common/utils/currency';
import { navigateToTopTabs } from '../../../navigation/rootNavigation';
import {
  useCloseStashMutation,
  useGetStashesQuery,
  useInfiniteGetStashTransactionsQuery,
} from '../../../new-graphql/generated';
import { TransactionsDrawer } from '../components/TransactionsDrawer';
import { useGetStashDetails } from '../hooks/useGetStashDetails';
import type { StashNavigationProp, StashRouteProp } from '../navigation/navigationTypes';
import { getStashImage } from '../utils/getStashImage';
import { splitStashTransactionsToSections } from '../utils/splitTransactionsIntoSections';

const STASH_IMAGE_WIDTH = 112;
const PAGE_LIMIT = 10;

type ButtonCardProps = {
  icon: IconName;
  disabled?: boolean;
  pressEvent: () => void;
  side: 'left' | 'right';
  text: string;
  testID?: string;
};

const ButtonCard = ({ disabled = false, icon, pressEvent, side, testID, text }: ButtonCardProps) => {
  const { space } = useTheme();

  return (
    <TouchableOpacity
      style={{
        width: '100%',
        height: '100%',
        flex: 1,
        marginRight: side === 'left' ? space.small : 0,
        marginLeft: side === 'right' ? space.small : 0,
      }}
      disabled={disabled}
      onPress={pressEvent}
      testID={testID}
    >
      <Box
        bgColor="defaultGlobalSurface"
        style={{
          padding: space.medium,
          borderRadius: space.small,
        }}
      >
        <Box alignItems="flex-end">
          <Icon icon={icon} size="xsmall" intent={disabled ? 'disabled-text' : 'text'} />
        </Box>
        <Typography.Body
          variant="regular-bold"
          intent={disabled ? 'subdued' : 'body'}
          style={{ marginTop: space.medium }}
        >
          {text}
        </Typography.Body>
      </Box>
    </TouchableOpacity>
  );
};

export const StashIndividualScreen = () => {
  const navigation = useNavigation<StashNavigationProp<'StashIndividual'>>();
  const route = useRoute<StashRouteProp<'StashIndividual'>>();
  const { maxScrollPercentage, minSnapPoint, onLayoutEndPosition, onLayoutScreenHeight } = useGetMinSnapPoint();
  const stash = useGetStashDetails({ id: route.params.id });
  const { balance, id, imageUrl, name, targetAmount } = stash;
  const parsedTargetAmount = targetAmount ? getFloatAmountFromMoneyV2(targetAmount) : 0;
  const parsedBalance = balance ? getFloatAmountFromMoneyV2(balance) : 0;

  const closeStashMutation = useCloseStashMutation();
  const { colors, space } = useTheme();
  const [closeStashBottomSheetOpening, setCloseStashBottomSheetOpening] = useState<boolean>(false);
  const Toast = useToast();
  const {
    data: transactions,
    fetchNextPage,
    hasNextPage,
    isFetching: isTransactionsFetching,
    isFetchingNextPage,
    refetch,
  } = useInfiniteGetStashTransactionsQuery(
    { stashId: id, limit: PAGE_LIMIT, offset: 0 },
    {
      enabled: true,
      keepPreviousData: true,
      getNextPageParam: (lastPage, allPages) => {
        const totalLocal = (allPages.length ?? 0) * (PAGE_LIMIT ?? 1);
        const lastPageTransactions = lastPage.me?.wallet?.stash?.transactions?.length ?? 0;
        if (lastPageTransactions < PAGE_LIMIT) {
          return undefined;
        }
        return { limit: PAGE_LIMIT, offset: totalLocal };
      },
    }
  );

  useRefreshOnFocus(refetch);

  const handleCloseStash = async () => {
    try {
      setCloseStashBottomSheetOpening(false);
      await closeStashMutation.mutateAsync({ stashId: id });
      Toast.show({
        content: `${name} Stash deleted. Funds have been transferred.`,
      });
      queryClient.invalidateQueries(useGetStashesQuery.getKey());
      navigateToTopTabs('stash-tab');
    } catch (error) {
      setCloseStashBottomSheetOpening(false);
      Toast.show({
        content: `Sorry, we could not delete ${name} Stash. Please try again later.`,
      });
    }
  };

  const loadMoreTransactions = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const handleNavigateToAddFunds = () => {
    navigation.navigate('StashDepositCash', { stash });
  };

  const handleNavigateToWithdraw = () => {
    navigation.navigate('StashWithdrawAmount', {
      id,
      name,
      balance: parsedBalance,
    });
  };

  const handleOpenCloseStashModal = () => {
    setCloseStashBottomSheetOpening(true);
  };

  const allTransactions = transactions?.pages.flatMap(page => page.me?.wallet?.stash?.transactions || []) ?? [];
  const transactionsSections = splitStashTransactionsToSections(allTransactions);

  return (
    <Box flex={1} onLayout={onLayoutScreenHeight} backgroundColor="neutralGlobalSurface">
      <ScrollView style={{ maxHeight: `${maxScrollPercentage}%` }} showsVerticalScrollIndicator={false}>
        <CustomStatusBar backgroundColor={colors.defaultGlobalSurface} />
        <Page.TopBar
          onBack={() => navigateToTopTabs('stash-tab')}
          title={name}
          customRight={() => (
            <TouchableOpacity onPress={handleOpenCloseStashModal} testID="close-stash-btn">
              <Icon
                icon="trash-bin-outlined"
                size="small"
                intent="primary"
                style={{
                  marginRight: space.medium,
                }}
              />
            </TouchableOpacity>
          )}
          style={{
            backgroundColor: colors.defaultGlobalSurface,
          }}
          titleStyle={{
            color: colors.darkGlobalSurface,
          }}
        />

        <Box
          backgroundColor="defaultGlobalSurface"
          paddingHorizontal="xlarge"
          paddingBottom="large"
          borderBottomStartRadius="xxxlarge"
          borderBottomEndRadius="xxxlarge"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            source={getStashImage(imageUrl)}
            resizeMode="contain"
            style={{
              width: scale(STASH_IMAGE_WIDTH),
              height: scale(STASH_IMAGE_WIDTH),
            }}
          />

          <Box marginTop="large">
            <CurrencyText
              amount={parsedBalance}
              renderCurrency={amount => <Typography.Title level="h1">{amount}</Typography.Title>}
              renderDecimal={amount => <Typography.Title level="h3">{amount}</Typography.Title>}
            />
          </Box>

          {!!parsedTargetAmount && (
            <>
              <Box flexDirection="row" marginTop="large">
                <Typography.Body variant="small" intent="muted">
                  Your goal is{' '}
                </Typography.Body>
                <CurrencyText
                  amount={parsedTargetAmount}
                  renderCurrency={amount => (
                    <Typography.Body variant="small" intent="muted">
                      {amount}
                    </Typography.Body>
                  )}
                  renderDecimal={amount => (
                    <Typography.Caption intent="muted" style={{ marginLeft: 2 }}>
                      {amount}
                    </Typography.Caption>
                  )}
                />
              </Box>
              <Progress.Bar
                value={(parsedBalance / parsedTargetAmount) * 100}
                style={{
                  marginTop: space.medium,
                }}
              />
            </>
          )}
        </Box>

        <Box
          style={{
            width: '100%',
          }}
          flexDirection="row"
          paddingHorizontal="medium"
          paddingVertical="medium"
        >
          <ButtonCard text="Add funds" icon="add" pressEvent={handleNavigateToAddFunds} side="left" />
          <ButtonCard
            text="Withdraw"
            icon="log-out"
            disabled={parsedBalance <= 0}
            pressEvent={handleNavigateToWithdraw}
            side="right"
            testID="withdraw-stash-button"
          />
        </Box>

        <Box
          // fake last element
          style={{ width: 10, height: 10 }}
          onLayout={onLayoutEndPosition}
        />
      </ScrollView>
      <TransactionsDrawer
        snapPoints={[minSnapPoint, '100%']}
        sections={transactionsSections}
        isFetching={isTransactionsFetching}
        isFetchingNextPage={isFetchingNextPage}
        onEndReached={loadMoreTransactions}
      />
      <BottomSheet
        open={closeStashBottomSheetOpening}
        onRequestClose={() => setCloseStashBottomSheetOpening(false)}
        header="Delete Stash?"
        showDivider
        footer={
          <Box style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <Button
              variant="text"
              intent="secondary"
              text="Cancel"
              onPress={() => setCloseStashBottomSheetOpening(false)}
            />
            <Button variant="text" text="Delete this Stash" onPress={handleCloseStash} />
          </Box>
        }
      >
        <Box style={{ paddingBottom: space.medium, paddingHorizontal: space.large }}>
          <Typography.Body variant="regular">Are you sure you want to delete the {name} Stash?</Typography.Body>
          <Typography.Body variant="regular" style={{ marginTop: space.small }}>
            The balance in this Stash will automatically transfer to your Swag Spend account.
          </Typography.Body>
        </Box>
      </BottomSheet>
      {closeStashMutation.isLoading && <OverlayLoadingScreen />}
    </Box>
  );
};
