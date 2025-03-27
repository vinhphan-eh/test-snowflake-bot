import React from 'react';
import { ScrollView } from 'react-native';
import { Box, Icon, List, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { SupportedComplaintFeature } from './SupportRequestScreen';
import { DashboardWidget } from '../../../common/components/dashboard-widget';
import { useMixpanel } from '../../../common/hooks/useMixpanel';
import { appVersion } from '../../../common/libs/appVersion';
import { useInAppBrowser } from '../../../common/shared-hooks/useInAppBrowser';
import { useShowAppSwitcherOnFocus } from '../../../common/shared-hooks/useShowAppSwitcherOnFocus';
import type { RootStackNavigationProp } from '../../../navigation/navigationTypes';
import { useIntl, useRegionLocalisation } from '../../../providers/LocalisationProvider';
import { CLICK_ON_FAQS, SETTINGS_MODULE } from '../constants/mixpanel';
import { useSessionStore } from '../../../common/stores/useSessionStore';

const { CURRENT_PERSONAL_VERSION } = appVersion;

export const SupportDashboardScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  useShowAppSwitcherOnFocus(navigation);
  const { colors, radii, space } = useTheme();
  const { openUrl } = useInAppBrowser();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const Intl = useIntl();
  const { currentRegion, formatMessage } = useRegionLocalisation();
  const { eventTracking } = useMixpanel();
  const { swagTextAndImageRebrandEnabled } = useSessionStore();

  const openHelpCentre = async () => {
    const helpCentreUrl = swagTextAndImageRebrandEnabled
      ? formatMessage({ id: 'money.faq.newUrl' })
      : formatMessage({ id: 'money.faq.url' });

    openUrl(helpCentreUrl);
    eventTracking({
      event: CLICK_ON_FAQS,
      categoryName: 'user action',
      metaData: {
        module: SETTINGS_MODULE,
        residentialCountryCode: currentRegion,
      },
    });
  };

  const openComplaintsScreen = (feature: SupportedComplaintFeature) => {
    navigation.navigate('SupportStack', {
      screen: 'Request',
      params: { pillar: 'Money', subject: 'Complaints', type: 'Complaint', feature },
    });
  };

  const openFinancialWellnessScreen = () => {
    navigation.navigate('SupportStack', {
      screen: 'FinancialWellness',
    });
  };

  return (
    <ScrollView style={{ flex: 1, paddingVertical: space.medium, backgroundColor: colors.neutralGlobalSurface }}>
      <Box paddingHorizontal="medium">
        <Typography.Title level="h2" typeface="playful">
          Need a hand?
        </Typography.Title>
        <Typography.Body variant="regular" style={{ marginVertical: space.medium }}>
          {Intl.formatMessage({ id: 'support.caption' }, { pillar: 'Money' })}
        </Typography.Body>
        <Box flexDirection="row" marginTop="small">
          <DashboardWidget
            accessibilityLabel="Visit our Help Centre"
            style={{
              height: 'auto',
              flex: 1,
              borderRadius: radii.medium,
              shadowColor: colors.secondaryOutline,
              shadowRadius: radii.base,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 1,
            }}
            title="Visit our Help Centre"
            variant="regular"
            titleTypeFace="neutral"
            description={
              <Box alignItems="center" flexDirection="row" marginTop="small">
                <Typography.Caption style={{ marginRight: space.smallMedium }} intent="subdued">
                  FAQs and more
                </Typography.Caption>
                <Icon size="xsmall" icon="external-link" />
              </Box>
            }
            onPress={openHelpCentre}
          />
        </Box>
        <Box>
          <List.Item
            style={{ marginTop: space.medium }}
            variant="card"
            title={Intl.formatMessage({ id: 'support.financialWellness.title' })}
            suffix={<Icon icon="arrow-right" intent="primary" />}
            onPress={() => openFinancialWellnessScreen()}
            testID="financial-wellness-and-support-cta"
          />
          <List.Item
            style={{ marginTop: space.medium }}
            variant="card"
            title="Spend account complaints"
            subtitle="Not satisfied? Let us know."
            suffix={<Icon icon="arrow-right" intent="primary" />}
            onPress={() => openComplaintsScreen('Money_SwagSpendAccount')}
            testID="spend-account-complaints-cta"
          />
          <List.Item
            style={{ marginTop: space.medium }}
            variant="card"
            title="Bill Management complaints"
            subtitle="Not satisfied? Let us know."
            suffix={<Icon icon="arrow-right" intent="primary" />}
            onPress={() => openComplaintsScreen('Money_BillManagement')}
            testID="bill-management-complaints-cta"
          />
        </Box>
      </Box>

      {!!CURRENT_PERSONAL_VERSION && (
        <Typography.Body
          variant="small"
          style={{ textAlign: 'center', marginBottom: bottomInset || space.medium, marginTop: space.medium }}
          intent="subdued"
        >
          {`${Intl.formatMessage({ id: 'benefits.support.benefitsMoney' })} ${CURRENT_PERSONAL_VERSION}`}
        </Typography.Body>
      )}
      <Box flex={1} />
    </ScrollView>
  );
};
