import React, { useRef, useState } from 'react';
import { FlatList, Image } from 'react-native';
import { Empty, RefreshControl, Spinner, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import images from '../../../../common/assets/images';
import type { BottomSheetRef } from '../../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetView } from '../../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetWithHD as BottomSheet } from '../../../../common/components/bottom-sheet/BottomSheetWithHD';
import { useBottomSheetDynamicSnapPoints } from '../../../../common/components/bottom-sheet/useBottomSheetDynamicSnapPoints';
import { Page } from '../../../../common/components/layout/page';
import { OverlayLoadingScreen } from '../../../../common/components/spinner';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import { navigateToTopTabs } from '../../../../navigation/rootNavigation';
import type { ScheduledPayment } from '../../../../new-graphql/generated';
import {
  useCancelScheduledPaymentMutation,
  useGetActiveScheduledPaymentsQuery,
} from '../../../../new-graphql/generated';
import { useRegionLocalisation } from '../../../../providers/LocalisationProvider';
import { ScheduledPaymentCard } from '../../components/ScheduledPaymentCard';
import type { PayAnyoneScreenNavigationProp } from '../navigation/navigationTypes';

export const ScheduledPaymentDashboardScreen = () => {
  const navigation = useNavigation<PayAnyoneScreenNavigationProp<'ScheduledPaymentDashboard'>>();
  const { data, isLoading, refetch } = useGetActiveScheduledPaymentsQuery();
  const { colors, space } = useTheme();
  const bs = useRef<BottomSheetRef>(null);
  const { bottom: bottomInset } = useSafeAreaInsets();
  const [selectedItem, setSelectedItem] = useState<ScheduledPayment | null>(null);
  const { formatMessage } = useRegionLocalisation();
  const cancelScheduledPaymentMutation = useCancelScheduledPaymentMutation({
    onSuccess: () => {
      refetch();
      setSelectedItem(null);
    },
    onError: () => {
      navigation.navigate('Error');
    },
  });

  const onBack = () => {
    navigateToTopTabs('spend-tab');
  };

  const scheduledPayments = (data?.me?.wallet?.auActiveScheduledPayments ?? []) as ScheduledPayment[];
  const [refreshing, setRefreshing] = useState(false);

  const renderListEmptyComponent = () => {
    if (isLoading) {
      return <Spinner />;
    }

    return (
      <Empty
        image={<Image source={images.manStaircase} />}
        title={formatMessage({ id: 'pay-anyone.noScheduledPayments.message' })}
        testID="no-scheduled-payments-message"
      />
    );
  };

  const cancelScheduledPayment = () => {
    if (!selectedItem) {
      return;
    }
    bs.current?.close();
    cancelScheduledPaymentMutation.mutate({ externalScheduledPaymentId: selectedItem.externalId });
  };

  const selectPaymentToCancel = (scheduledPayment: ScheduledPayment) => {
    setSelectedItem(scheduledPayment);
    bs.current?.open();
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch().finally(() => setRefreshing(false));
  };

  const {
    animatedContentHeight,
    animatedHandleHeight,
    animatedSnapPoints,
    contentContainerHeightStyle,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(true);

  return (
    <>
      <CustomStatusBar />
      <Page.TopBar title="Scheduled payments" hideRight onBack={onBack} />
      <FlatList
        data={scheduledPayments}
        testID="scheduled-payment-list"
        renderItem={({ item }) => (
          <ScheduledPaymentCard scheduledPayment={item} onCancel={() => selectPaymentToCancel(item)} />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListHeaderComponent={
          <Typography.Title
            style={{ marginHorizontal: space.medium, marginTop: space.medium, marginBottom: space.large }}
            level="h4"
            typeface="playful"
          >
            {formatMessage({ id: 'pay-anyone.scheduledPayments.title' })}
          </Typography.Title>
        }
        ListEmptyComponent={renderListEmptyComponent}
        style={{ flex: 1, backgroundColor: colors.defaultGlobalSurface, paddingBottom: bottomInset }}
        contentContainerStyle={{
          padding: space.medium,
          backgroundColor: colors.defaultGlobalSurface,
        }}
      />
      <BottomSheet
        ref={bs}
        title="Confirm"
        actions={[
          {
            testID: 'cancelConfirm',
            title: 'Cancel payment',
            intent: 'danger',
            onPress: () => cancelScheduledPayment(),
          },
        ]}
        handleIconName="cancel"
        handleIconSize="xsmall"
        handleIconIntent="text"
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
      >
        <BottomSheetView style={contentContainerHeightStyle} onLayout={handleContentLayout}>
          <Typography.Body
            variant="regular"
            testID="confirm-cancelling-text"
            style={{ marginHorizontal: space.large, marginTop: space.small, marginBottom: space.medium }}
          >
            {formatMessage(
              { id: 'pay-anyone.cancelScheduledPaymentConfirmation.bottomSheet' },
              { recipient: selectedItem?.recipient?.accountName ?? '' }
            )}
          </Typography.Body>
        </BottomSheetView>
      </BottomSheet>
      {cancelScheduledPaymentMutation.isLoading && <OverlayLoadingScreen />}
    </>
  );
};
