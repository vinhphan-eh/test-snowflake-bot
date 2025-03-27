import React from 'react';
import { ScrollView } from 'react-native';
import { Box, Icon, List, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DashboardWidget } from '../../../../common/components/dashboard-widget';
import { useMixpanel } from '../../../../common/hooks/useMixpanel';
import { appVersion } from '../../../../common/libs/appVersion';
import { useInAppBrowser } from '../../../../common/shared-hooks/useInAppBrowser';
import { useShowAppSwitcherOnFocus } from '../../../../common/shared-hooks/useShowAppSwitcherOnFocus';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import type { RootStackNavigationProp } from '../../../../navigation/navigationTypes';
import { useIntl, useRegionLocalisation } from '../../../../providers/LocalisationProvider';
import { useCashbackTracking } from '../../cash-back/hooks/useCashbackTracking';
import { useCheckCompletelyOnboardCashback } from '../../cash-back/hooks/useCheckCompletelyOnboardCashback';
import { useCashbackPermission } from '../../common/hooks/useCashbackPermission';
import { CLICK_ON_FAQS, SETTINGS_MODULE } from '../constants';

const { CURRENT_PERSONAL_VERSION } = appVersion;

export const BenefitsSettingsDashboardScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  useShowAppSwitcherOnFocus(navigation);
  const { colors, radii, space } = useTheme();
  const { openUrl } = useInAppBrowser();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { trackClickManageEnrolledCard } = useCashbackTracking();
  const { isCompleted: isCompletedOnboardCashback } = useCheckCompletelyOnboardCashback();
  const { eventTracking } = useMixpanel();
  const { swagTextAndImageRebrandEnabled } = useSessionStore();

  const { permission: cashbackPermission } = useCashbackPermission();

  const shouldShowCashbackSection = cashbackPermission && isCompletedOnboardCashback;

  const Intl = useIntl();
  const { currentRegion, formatMessage } = useRegionLocalisation();

  const openHelpCentre = () => {
    const helpCentreUrl = swagTextAndImageRebrandEnabled
      ? formatMessage({ id: 'benefits.faq.newUrl' })
      : formatMessage({ id: 'benefits.faq.url' });

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

  const navigateToManageCardScreen = () => {
    trackClickManageEnrolledCard();
    navigation.navigate('BenefitsStack', {
      screen: 'CardLinkOffersStack',
      params: {
        screen: 'AddCardCashbackDashboard',
      },
    });
  };

  const renderCashbackSection = () => {
    if (shouldShowCashbackSection) {
      return (
        <>
          <Box backgroundColor="decorativePrimarySurface" paddingVertical="small" paddingLeft="medium">
            <Typography.Body variant="small" intent="body">
              Cashback
            </Typography.Body>
          </Box>
          <List.Item
            style={{ marginTop: space.medium, marginHorizontal: space.medium }}
            suffix="arrow-right"
            title={Intl.formatMessage({ id: 'benefits.support.manageEnrolledCards' }, { pillar: 'Benefits' })}
            subtitle={Intl.formatMessage({ id: 'benefits.support.enrolAdditionalCards' }, { pillar: 'Benefits' })}
            variant="card"
            onPress={navigateToManageCardScreen}
          />
          <List.Item
            style={{ marginTop: space.medium, marginHorizontal: space.medium }}
            suffix="external-link"
            title={Intl.formatMessage({ id: 'benefits.support.howCashbackWork' }, { pillar: 'Benefits' })}
            variant="card"
            onPress={openHelpCentre}
          />
        </>
      );
    }

    return null;
  };

  return (
    <Box flex={1} backgroundColor="neutralGlobalSurface">
      <ScrollView style={{ flex: 1, backgroundColor: colors.neutralGlobalSurface }}>
        <Box padding="medium">
          <Typography.Title level="h2" typeface="playful">
            Need a hand?
          </Typography.Title>
          <Typography.Body variant="regular" style={{ marginVertical: space.medium }}>
            {Intl.formatMessage({ id: 'support.caption' }, { pillar: Intl.formatMessage({ id: 'benefits.name' }) })}
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
        </Box>
        {renderCashbackSection()}
        <Box flex={1} />
      </ScrollView>
      {!!CURRENT_PERSONAL_VERSION && (
        <Typography.Body
          variant="small"
          style={{ textAlign: 'center', marginBottom: bottomInset || space.medium, marginTop: space.medium }}
          intent="subdued"
        >
          {`${Intl.formatMessage({ id: 'benefits.support.benefitsMoney' })} ${CURRENT_PERSONAL_VERSION}`}
        </Typography.Body>
      )}
    </Box>
  );
};
