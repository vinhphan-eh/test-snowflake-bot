import React from 'react';
import { Box, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { Page } from '../../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../../common/components/status-bar/CustomStatusBar';
import ThemeSwitcher from '../../../../../common/utils/ThemeSwitcher';
import { useIntl } from '../../../../../providers/LocalisationProvider';
import type { InstaPayScreenNavigationProp } from '../../navigation/navigationTypes';
import { EWARecurringPushNotificationManagement } from '../recurring/components/EWARecurringPushNotificationManagement';

export const EWAPushNotificationManagementScreen = () => {
  const navigation = useNavigation<InstaPayScreenNavigationProp<'EWAPushNotificationManagement'>>();
  const { colors, space } = useTheme();
  const { formatMessage } = useIntl();

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <ThemeSwitcher>
      <Box backgroundColor="defaultGlobalSurface" flex={1}>
        <CustomStatusBar barStyle="decorative" backgroundColor={colors.defaultGlobalSurface} />
        <Page.TopBar
          title={formatMessage({ id: 'instapay.pushNotification.management.title' })}
          hideRight
          onBack={onBack}
        />
        <Box paddingHorizontal="medium" paddingTop="medium">
          <Typography.Title level="h2" typeface="playful" style={{ marginBottom: space.small }}>
            {formatMessage({ id: 'instapay.pushNotification.management.title' })}
          </Typography.Title>
        </Box>
        <Page.Body backgroundColor="defaultGlobalSurface" marginTop="medium">
          <EWARecurringPushNotificationManagement />
        </Page.Body>
      </Box>
    </ThemeSwitcher>
  );
};
