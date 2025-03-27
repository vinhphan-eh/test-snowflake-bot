import React, { useRef, useState } from 'react';
import { Pressable } from 'react-native';
import { Box, Icon, Swipeable, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import type { BottomSheetRef } from '../../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetView } from '../../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetWithHD } from '../../../../common/components/bottom-sheet/BottomSheetWithHD';
import { useBottomSheetDynamicSnapPoints } from '../../../../common/components/bottom-sheet/useBottomSheetDynamicSnapPoints';
import { queryClient } from '../../../../common/libs/queryClient';
import { formatToBSBValue } from '../../../../common/utils/numbers';
import type { BsbTransferPayeeAddress } from '../../../../new-graphql/generated';
import { useGetAllPayeeAddressesQuery, useRemovePayeeAddressMutation } from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import type { PayAnyoneScreenNavigationProp } from '../navigation/navigationTypes';
import { usePayAnyoneStore } from '../stores/usePayAnyoneStore';

interface PayeeListItemProps {
  payee: BsbTransferPayeeAddress;
  searchQuery?: string;
}

const PayeeListItem = ({ payee, searchQuery }: PayeeListItemProps) => {
  const { space } = useTheme();
  const navigation = useNavigation<PayAnyoneScreenNavigationProp<'PayeeAddressBook'>>();
  const { setPayeeDetails } = usePayAnyoneStore();
  const [hideSwipeableAction, setHideSwipeableAction] = useState(true);
  const bs = useRef<BottomSheetRef>(null);
  const { formatMessage } = useIntl();
  const {
    animatedContentHeight,
    animatedHandleHeight,
    animatedSnapPoints,
    contentContainerHeightStyle,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(true);
  const { mutateAsync: removePayeeAddress } = useRemovePayeeAddressMutation();

  const processHighlightNickname = () => {
    // Assumed only the ones matching search query filtered from parent container is selected for rendering
    // So not further check for search query matching condition at this step
    if (searchQuery) {
      const startMatchedWordPos = payee.friendlyName.toLowerCase().indexOf(searchQuery.toLowerCase());

      return (
        <>
          {payee.friendlyName.substring(0, startMatchedWordPos)}
          <Typography.Body intent="info" testID={`payee-list-item-${payee.bsb}-${payee.accountNumber}-highlighted`}>
            {payee.friendlyName.substring(startMatchedWordPos, startMatchedWordPos + searchQuery.length)}
          </Typography.Body>
          {payee.friendlyName.substring(startMatchedWordPos + searchQuery.length)}
        </>
      );
    }

    return payee.friendlyName;
  };

  const onPress = () => {
    setPayeeDetails({
      accountName: payee.accountName,
      accountNumber: payee.accountNumber,
      bsb: formatToBSBValue(payee.bsb),
    });
    navigation.navigate('PaymentDetails');
  };

  const confirmDetails = async () => {
    bs.current?.close();

    await removePayeeAddress({
      input: {
        address: {
          accountNumber: payee.accountNumber,
          bsb: payee.bsb,
        },
      },
    }).then(() => {
      queryClient.invalidateQueries(useGetAllPayeeAddressesQuery.getKey());
    });
  };

  return (
    <>
      <Swipeable
        state={hideSwipeableAction ? 'closed' : 'rightOpen'}
        variant="full-width"
        rightActions={
          <Swipeable.Action
            testID="payee-list-item-swipeable-delete"
            onPress={() => {
              bs.current?.open();
              setHideSwipeableAction(true);
            }}
            intent="danger"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon icon="trash-bin-outlined" size="xsmall" />
            <Typography.Caption style={{ marginTop: space.xsmall }}>
              {formatMessage({ id: 'common.delete' })}
            </Typography.Caption>
          </Swipeable.Action>
        }
        rightActionsWidth={80}
        onStateChange={state => {
          if (state === 'rightOpen') {
            setHideSwipeableAction(false);
          }
        }}
      >
        <Pressable
          accessibilityRole="menuitem"
          accessibilityLabel="payee-list-item"
          onPress={onPress}
          style={{ flexDirection: 'row', paddingVertical: space.smallMedium, paddingHorizontal: space.medium }}
        >
          <Box flex={1} marginRight="medium">
            <Typography.Body variant="regular" numberOfLines={1} ellipsizeMode="tail">
              {processHighlightNickname()}
            </Typography.Body>
            <Typography.Caption style={{ marginTop: space.xsmall }} intent="subdued">
              {formatToBSBValue(payee.bsb)} {payee.accountNumber}
            </Typography.Caption>
          </Box>
        </Pressable>
      </Swipeable>
      <BottomSheetWithHD
        ref={bs}
        title={formatMessage({ id: 'payeeAddress.removeTitle' })}
        actions={[
          {
            testID: 'confirmDetails',
            title: formatMessage({ id: 'common.confirm' }),
            onPress: confirmDetails,
          },
        ]}
        handleIconName="cancel"
        handleIconSize="xsmall"
        handleIconIntent="text"
        prefixIconIntent="danger"
        prefixIconName="warning"
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
      >
        <BottomSheetView style={contentContainerHeightStyle} onLayout={handleContentLayout}>
          <Typography.Body
            variant="regular"
            testID="confirm-details-text"
            style={{ marginHorizontal: space.large, marginTop: space.small, marginBottom: space.medium }}
          >
            {formatMessage({ id: 'payeeAddress.removeDescription' }, { payeeNickname: payee.friendlyName })}
          </Typography.Body>
        </BottomSheetView>
      </BottomSheetWithHD>
    </>
  );
};

export { PayeeListItem };
