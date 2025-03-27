import React, { useMemo } from 'react';
import { Box, Typography, useTheme } from '@hero-design/rn';
import dayjs from 'dayjs';
import { CurrencyText } from '../../../../common/components/currency-text/CurrencyText';
import { useIntl } from '../../../../providers/LocalisationProvider';

type NowEstBalanceImageContentProps = {
  availableBalance: number;
  testID?: string;
  updatedAt?: Date;
};

export const EstBalanceImageContent = ({ availableBalance, testID, updatedAt }: NowEstBalanceImageContentProps) => {
  const { space } = useTheme();
  const { formatMessage } = useIntl();
  const lastUpdatedText = useMemo(() => {
    if (!updatedAt) {
      return formatMessage({ id: 'dynamicTiles.instaPayNowSwagTile.updatingYourLiveBalance' });
    }
    if (dayjs(new Date()).diff(updatedAt, 'minutes') < 60) {
      return formatMessage(
        { id: 'dynamicTiles.instaPayNowSwagTile.updatedMinutesAgo' },
        { minutes: dayjs(new Date()).diff(updatedAt, 'minutes') }
      );
    }
    return formatMessage(
      { id: 'dynamicTiles.instaPayNowSwagTile.updatedHoursAgo' },
      { hours: dayjs(new Date()).diff(updatedAt, 'hours') }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedAt]);

  return (
    <Box
      testID={testID}
      style={{ width: '100%', height: '100%' }}
      padding="small"
      justifyContent="center"
      alignItems="center"
    >
      <Typography.Caption intent="inverted">
        {formatMessage({
          id: 'dynamicTiles.instaPayNowSwagTile.yourLastBalanceIs',
        })}
      </Typography.Caption>
      <CurrencyText
        amount={availableBalance}
        renderCurrency={currency => (
          <Typography.Title intent="inverted" typeface="playful" level="h3">
            {currency}
          </Typography.Title>
        )}
        renderDecimal={decimal => (
          <Typography.Body intent="inverted" variant="regular-bold">
            {decimal}
          </Typography.Body>
        )}
      />
      <Typography.Label style={{ position: 'absolute', bottom: space.small }} intent="inverted">
        {lastUpdatedText}
      </Typography.Label>
    </Box>
  );
};
