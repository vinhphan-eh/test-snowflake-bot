import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { OutcomeTemplate } from '../../../../common/components/outcome-template/OutcomeTemplate';
import { useIntl } from '../../../../providers/LocalisationProvider';
import type { InstaPayScreenNavigationProp } from '../navigation/navigationTypes';

export const InstaPayNowMaintenanceScreen = () => {
  const navigation = useNavigation<InstaPayScreenNavigationProp<'InstaPayNowMaintenance'>>();
  const intl = useIntl();

  return (
    <OutcomeTemplate
      imageWidth={156}
      imageHeight={156}
      title={intl.formatMessage({ id: 'instapay.now.under-maintenance.title' })}
      content={intl.formatMessage({ id: 'instapay.now.under-maintenance.description' })}
      imageName="instapay-now-maintenance"
      testID="instapay-now-maintenance-screen"
      actions={[
        {
          testId: 'instapay-now-maintenance-close-button',
          buttonTitle: intl.formatMessage({ id: 'common.close' }),
          onNext: navigation.goBack,
        },
      ]}
    />
  );
};
