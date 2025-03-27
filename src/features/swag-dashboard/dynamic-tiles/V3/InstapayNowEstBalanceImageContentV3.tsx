import React, { useMemo } from 'react';
import { Box, Typography, useTheme } from '@hero-design/rn';
import dayjs from 'dayjs';
import { CurrencyText } from '../../../../common/components/currency-text/CurrencyText';
import { useIsAccountUK } from '../../../../common/hooks/useIsAccountUK';
import type { TypographyIntent } from '../../../../common/types/hero-design';
import { useIntl } from '../../../../providers/LocalisationProvider';

type NowEstBalanceImageContentV3Props = {
  availableBalance: number;
  typographyIntent?: TypographyIntent;
  prefixText?: string;
  postfixText?: string;
  testID?: string;
  updatedAt?: Date;
  shouldShowAvailableBalance?: boolean;
};

export const EstBalanceImageContentV3 = ({
  availableBalance,
  postfixText,
  prefixText,
  shouldShowAvailableBalance,
  testID,
  typographyIntent,
  updatedAt,
}: NowEstBalanceImageContentV3Props) => {
  const { space } = useTheme();
  const isUK = useIsAccountUK();
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
      {prefixText ? <Typography.Caption intent={typographyIntent}>{prefixText}</Typography.Caption> : null}
      {shouldShowAvailableBalance && (
        <CurrencyText
          amount={availableBalance}
          renderCurrency={currency => (
            <Typography.Title intent={typographyIntent} typeface="playful" level="h3">
              {currency}
            </Typography.Title>
          )}
          isShowDecimal={false}
          currency={isUK ? 'GBP' : 'AUD'}
        />
      )}
      {postfixText ? <Typography.Caption intent={typographyIntent}>{postfixText}</Typography.Caption> : null}
      {shouldShowAvailableBalance && (
        <Typography.Label
          style={{ position: 'absolute', bottom: space.small }}
          intent={typographyIntent}
          testID="updated-at-text-block"
        >
          {lastUpdatedText}
        </Typography.Label>
      )}
    </Box>
  );
};
