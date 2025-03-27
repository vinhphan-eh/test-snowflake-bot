import React from 'react';
import type { FooterTileProps } from './InstapayCustomSurveyFooterTile';
import { InstapayFooterComponentWithTheme } from './InstapayCustomSurveyFooterTile';
import { usePermissionStore } from '../../../../common/stores/usePermissionStore';

export const InstapayTimesheetFooterTile = (props: FooterTileProps) => {
  const isExperimentEnabled = usePermissionStore(state => state.permissions?.instapaySubmitTimesheets?.view ?? false);
  return <InstapayFooterComponentWithTheme {...props} flagPermission={isExperimentEnabled} />;
};
