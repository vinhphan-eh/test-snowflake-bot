import React from 'react';
import { Box, useTheme } from '@hero-design/rn';
import { BudgetingPayslipsTile } from './BudgetingPayslipsTile';
import { useIsShowInstapayTile } from './hooks/useIsShowInstapayTile';
import { InstapayPayslipsTile } from './InstapayPayslipsTile';
import { usePermissionStore } from '../../common/stores/usePermissionStore';

export const PayslipsTile = () => {
  const theme = useTheme();
  const { instapayNowUnderMaintenance, isShowInstapayTile } = useIsShowInstapayTile();
  const budgetingTilePermission = usePermissionStore(state => state.permissions?.payslipsExperimentBudgeting?.view);

  if (!isShowInstapayTile && !budgetingTilePermission) {
    return null;
  }

  return (
    <Box
      testID="payslips-tile"
      display="flex"
      flexDirection="row"
      paddingVertical="large"
      paddingHorizontal="medium"
      style={{ gap: theme.space.medium }}
    >
      {isShowInstapayTile && <InstapayPayslipsTile instapayNowUnderMaintenance={instapayNowUnderMaintenance} />}
      {/* if instapay tile is not visible, show budgeting tile full width with an intro image */}
      {!!budgetingTilePermission && <BudgetingPayslipsTile isShowInstapayTile={isShowInstapayTile} />}
    </Box>
  );
};
