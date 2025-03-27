import React from 'react';
import { Box, Icon, Typography, useTheme } from '@hero-design/rn';
import { useIncomeVisibility } from '../../../../common/hooks/useIncomeVisibility';
import { useInAppBrowser } from '../../../../common/shared-hooks/useInAppBrowser';
import { useIntl } from '../../../../providers/LocalisationProvider';
import {
  INSTAPAY_INCENTIVE_TERM_AND_CONDITION_LINK,
  INSTAPAY_INCENTIVE_TERM_AND_CONDITION_LINK_V2,
} from '../constants/links';

const CircleNumber = ({ isFree, selected, text }: { text: string; selected: boolean; isFree: boolean }) => {
  const { colors, radii, space } = useTheme();

  const circleSize = (space.xlarge + space.large) / 2;

  return (
    <Box
      style={{
        backgroundColor: selected ? colors.primary : 'transparent',
        padding: isFree ? 0 : space.small,
        marginRight: space.xsmall,
        borderRadius: radii.rounded,
        width: circleSize,
        height: circleSize,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        borderWidth: 1,
        borderStyle: isFree ? 'solid' : 'dashed',
        borderColor: colors.primary,
      }}
    >
      {isFree ? (
        <Icon icon="checkmark" size="xsmall" intent={selected ? 'text-inverted' : 'primary'} />
      ) : (
        <Typography.Body
          variant="small"
          intent={selected ? 'inverted' : 'primary'}
          style={{ position: 'absolute' }}
          typeface="playful"
        >
          {text}
        </Typography.Body>
      )}
    </Box>
  );
};

const InstapayFreeFifthTransactionMenuItem = ({ earningProcess }: { earningProcess: number }) => {
  const { colors, radii, space } = useTheme();
  const { formatMessage } = useIntl();
  const { showInstapayNowUsageIncentiveV2 } = useIncomeVisibility();
  const { openUrl } = useInAppBrowser();

  const onOpenTermAndCond = () => {
    openUrl(
      showInstapayNowUsageIncentiveV2
        ? INSTAPAY_INCENTIVE_TERM_AND_CONDITION_LINK_V2
        : INSTAPAY_INCENTIVE_TERM_AND_CONDITION_LINK
    );
  };

  return (
    <Box
      style={{
        backgroundColor: colors.decorativePrimarySurface,
        borderRadius: radii.large,
        padding: space.smallMedium,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box>
        <Typography.Body variant="regular-bold">
          {formatMessage({ id: 'instapay.now.free-transaction.title' })}
        </Typography.Body>
        <Typography.Caption intent="subdued" style={{ marginTop: space.xsmall }}>
          {formatMessage({
            id: showInstapayNowUsageIncentiveV2
              ? 'instapay.now.free-transaction.sub-title-v2'
              : 'instapay.now.free-transaction.sub-title',
          })}
        </Typography.Caption>
      </Box>
      <Box flexDirection="column" alignItems="flex-end">
        <Box style={{ flexDirection: 'row', marginRight: -5 }}>
          {[1, 2, 3, 4, 5].map(index => (
            <CircleNumber
              key={index}
              text={index.toString()}
              selected={earningProcess >= index}
              isFree={index === 5 || (showInstapayNowUsageIncentiveV2 && index === 1)}
            />
          ))}
        </Box>
        <Typography.Caption
          intent="primary"
          style={{
            marginTop: space.small,
          }}
          onPress={onOpenTermAndCond}
        >
          {formatMessage({
            id: 'instapay.now.free-transaction.tnc-apply',
          })}
        </Typography.Caption>
      </Box>
    </Box>
  );
};

export { InstapayFreeFifthTransactionMenuItem };
