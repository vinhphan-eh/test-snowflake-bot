import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Braze from '@braze/react-native-sdk';
import { Box, Card, Skeleton, Typography, useTheme } from '@hero-design/rn';
import { CLICK_ON_INSTAPAY_TILE_IN_PAYSLIPS_TAB, PAYSLIPS_EXPERIMENT_MODULE } from './constants';
import { useIncomeVisibility } from '../../common/hooks/useIncomeVisibility';
import { useMixpanel } from '../../common/hooks/useMixpanel';
import { useOneTimeEffect } from '../../common/shared-hooks/useOneTimeEffect';
import ThemeSwitcher from '../../common/utils/ThemeSwitcher';
import { useIntl } from '../../providers/LocalisationProvider';
import { useInstapayExpBrazeCard } from '../income/instapay/hooks/useInstapayExpBrazeCard';
import { useInstapayTracking } from '../income/instapay/hooks/useInstapayTracking';
import { useOpenInstaPayFlowFromDashboard } from '../income/instapay/hooks/useOpenInstaPayFlowFromDashboard';

const payslipsCardId = 'instapay_exp_tile_payslips';

type Props = {
  instapayNowUnderMaintenance: boolean;
};

export const InstapayPayslipsTile = ({ instapayNowUnderMaintenance }: Props) => {
  const { isLoading } = useIncomeVisibility();
  const { openInstaPayFlow } = useOpenInstaPayFlowFromDashboard({
    underMaintenance: instapayNowUnderMaintenance,
  });
  const Intl = useIntl();
  const theme = useTheme();
  const { eventTracking } = useMixpanel();
  const { trackUserSeeInstapayEducationTile } = useInstapayTracking();
  const { contentCard } = useInstapayExpBrazeCard(payslipsCardId);
  const { extras: { actionText = '', description = '', title = '' } = {} } = contentCard ?? {};

  const onInstapayTilePress = () => {
    if (contentCard) {
      Braze.logContentCardClicked(contentCard.id);
    }
    openInstaPayFlow();
    eventTracking({
      event: CLICK_ON_INSTAPAY_TILE_IN_PAYSLIPS_TAB,
      categoryName: 'user action',
      metaData: {
        module: PAYSLIPS_EXPERIMENT_MODULE,
      },
    });
  };

  useEffect(() => {
    trackUserSeeInstapayEducationTile('payslips');
  }, []);

  useOneTimeEffect(() => {
    if (contentCard) {
      Braze.logContentCardImpression(contentCard.id);
      return true;
    }
    return false;
  }, [contentCard]);

  if (isLoading) {
    return (
      <Card style={{ flex: 1 }}>
        {/* height and width of the content */}
        <Skeleton testID="skeleton-loading" variant="rectangular" style={{ height: 190, width: 190 }} />
      </Card>
    );
  }

  return (
    <ThemeSwitcher name="wallet">
      <Card style={{ flex: 1 }}>
        <TouchableOpacity onPress={onInstapayTilePress} testID="instapay-tile">
          <Box padding="medium" backgroundColor="highlightedSurface">
            <Typography.Body variant="regular-bold">
              {title || Intl.formatMessage({ id: 'payslipsExperimentTile.instapayTile.title' })}
            </Typography.Body>
            <Typography.Body variant="small" style={{ marginTop: theme.space.xsmall }}>
              {description || Intl.formatMessage({ id: 'payslipsExperimentTile.instapayTile.description' })}
            </Typography.Body>
            <Typography.Body variant="regular-bold" intent="primary" style={{ marginTop: theme.space.small }}>
              {actionText || Intl.formatMessage({ id: 'payslipsExperimentTile.instapayTile.learnMore' })}
            </Typography.Body>
          </Box>
        </TouchableOpacity>
      </Card>
    </ThemeSwitcher>
  );
};
