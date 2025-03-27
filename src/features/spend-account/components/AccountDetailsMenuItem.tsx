import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Box, Icon, List, Spinner, Typography } from '@hero-design/rn';
import { formatToBSBValue, formatToSortCodeValue } from '../../../common/utils/numbers';
import { Share } from '../../../common/utils/react-native-wrapper';
import type { GetCurrentUserQuery } from '../../../new-graphql/generated';
import { Region } from '../../../providers/LocalisationProvider/constants';
import { useGetSSADetails } from '../hooks/useGetSSADetails';

type AccountDetailsMenuItemProps = {
  userDetails: GetCurrentUserQuery | undefined;
};

export const AccountDetailsMenuItem = ({ userDetails }: AccountDetailsMenuItemProps) => {
  const { currentRegion, data: walletDetails, isLoading } = useGetSSADetails();
  const disabled = !userDetails || !walletDetails?.accountNumber;
  const { firstName, lastName } = userDetails?.me?.details ?? {};

  const defineWalletDetails = () => {
    if (walletDetails?.accountNumber) {
      const { accountNumber } = walletDetails;

      switch (currentRegion) {
        case Region.gb:
          return `${formatToSortCodeValue(walletDetails.sortCode ?? '')} | ${accountNumber}`;
        default:
          return `${formatToBSBValue(walletDetails.bsb ?? '')} | ${accountNumber}`;
      }
    }

    return '';
  };

  const shareAccountDetails = () => {
    if (disabled) {
      return;
    }

    let message = '';
    switch (currentRegion) {
      case Region.gb:
        message = `Here are my Swag Spend account details:\nName: ${firstName} ${lastName}\nSort code: ${formatToSortCodeValue(
          walletDetails.sortCode ?? ''
        )}\nAccount number: ${walletDetails.accountNumber}`;
        break;
      default:
        message = `Here are my Swag Spend account details:\nName: ${firstName} ${lastName}\nBSB: ${
          walletDetails.bsb ?? ''
        }\nAccount number: ${walletDetails.accountNumber}`;
        break;
    }

    Share.share({
      message,
    });
  };

  return (
    <Box>
      <List.Item
        variant="card"
        title={<Typography.Body variant="regular">{defineWalletDetails()}</Typography.Body>}
        subtitle="Account details"
        suffix={<Icon icon={Platform.OS === 'ios' ? 'upload-outlined' : 'share-2'} intent="primary" size="xsmall" />}
        onPress={shareAccountDetails}
        disabled={disabled}
        testID="account-details-menu-item"
      />
      {isLoading && (
        <Box borderRadius="medium" backgroundColor="defaultGlobalSurface" style={StyleSheet.absoluteFill}>
          <Spinner accessibilityLabel="spinner" size="small" />
        </Box>
      )}
    </Box>
  );
};
