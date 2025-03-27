import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Box, Icon, scale, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BudgetingIntroBlogPosts } from './components/BudgetingIntroBlogPosts';
import images from '../../../common/assets/images';
import { Page } from '../../../common/components/layout/page';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import { useInAppBrowser } from '../../../common/shared-hooks/useInAppBrowser';
import { useIntl } from '../../../providers/LocalisationProvider';
import { useIsShowInstapayTile } from '../hooks/useIsShowInstapayTile';
import { useTrackPayslipsExperiment } from '../hooks/useTrackPayslipsExperiment';
import type { SwagPayslipsExperimentNavigationProp } from '../navigation/navigationTypes';

const IMAGE_WIDTH = 156;
const IMAGE_HEIGHT = 156;

const PAYCALCULATOR_LINK = 'https://paycalculator.com.au/';
const MONEYSMART_LINK = 'https://moneysmart.gov.au/';

export const BudgetingIntroScreen = () => {
  const navigation = useNavigation<SwagPayslipsExperimentNavigationProp<'BudgetingIntroScreen'>>();
  const theme = useTheme();
  const Intl = useIntl();
  const { bottom: bottomInset } = useSafeAreaInsets();

  const { openUrl } = useInAppBrowser();
  const { isShowInstapayTile } = useIsShowInstapayTile();
  const { trackVisitBudgetingIntroScreen } = useTrackPayslipsExperiment();

  const onPaycalculatorLinkPress = () => {
    openUrl(PAYCALCULATOR_LINK);
    trackVisitBudgetingIntroScreen({
      website: 'Paycalculator',
      'InstaPay Available': isShowInstapayTile,
    });
  };

  const onMoneysmartLinkPress = () => {
    openUrl(MONEYSMART_LINK);
    trackVisitBudgetingIntroScreen({
      website: 'MoneySmart',
      'InstaPay Available': isShowInstapayTile,
    });
  };

  return (
    <Box flex={1}>
      <CustomStatusBar backgroundColor={theme.colors.decorativePrimarySurface} />
      <Page.TopBar onBack={navigation.goBack} backgroundColor="decorativePrimarySurface" hideRight />
      <Page
        style={{ backgroundColor: theme.colors.decorativePrimarySurface, paddingBottom: bottomInset }}
        contentContainerStyle={{ paddingHorizontal: 0 }}
      >
        <Page.Body>
          <Box alignItems="center" marginHorizontal="large" marginTop="xlarge">
            {/* text section */}
            <Image
              resizeMode="contain"
              source={images.jetpackManWork}
              style={{ width: scale(IMAGE_WIDTH), height: scale(IMAGE_HEIGHT) }}
            />
            <Typography.Title
              level="h4"
              typeface="playful"
              style={{ textAlign: 'center', marginTop: theme.space.large }}
            >
              {Intl.formatMessage({ id: 'budgetingIntro.title' })}
            </Typography.Title>
            <Typography.Body
              variant="regular"
              intent="subdued"
              typeface="playful"
              style={{ textAlign: 'center', marginTop: theme.space.small }}
            >
              {Intl.formatMessage({ id: 'budgetingIntro.description' })}
            </Typography.Body>
            {/* end text section */}

            {/* external link section */}
            <Box flexDirection="row" marginTop="small" flex={1} alignSelf="stretch" justifyContent="space-evenly">
              <TouchableOpacity
                testID="paycalculator-link"
                onPress={onPaycalculatorLinkPress}
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <Typography.Body
                  style={{ textDecorationLine: 'underline', marginRight: theme.space.xsmall }}
                  typeface="playful"
                  intent="subdued"
                >
                  Paycalculator
                </Typography.Body>
                <Icon size="xsmall" icon="external-link" intent="muted" />
              </TouchableOpacity>
              <TouchableOpacity
                testID="moneysmart-link"
                onPress={onMoneysmartLinkPress}
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <Typography.Body
                  style={{ textDecorationLine: 'underline', marginRight: theme.space.xsmall }}
                  typeface="playful"
                  intent="subdued"
                >
                  MoneySmart
                </Typography.Body>
                <Icon size="xsmall" icon="external-link" intent="muted" />
              </TouchableOpacity>
            </Box>
            {/* end external link section */}
          </Box>

          <BudgetingIntroBlogPosts isShowInstapayTile={isShowInstapayTile} />
        </Page.Body>
      </Page>
    </Box>
  );
};
