import React from 'react';
import { Box, Button, Progress, Typography, useTheme } from '@hero-design/rn';
import type { BoxProps } from '@hero-design/rn/types/components/Box';
import { useNavigation } from '@react-navigation/native';
import ThemeSwitcher from '../../../../common/utils/ThemeSwitcher';
import type { RootStackNavigationProp } from '../../../../navigation/navigationTypes';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { useInstapayOnboardTracking } from '../hooks/useInstapayOnboardTracking';

type InstapayOnboardingWidgetProps = BoxProps;

const PureWidget = (props: InstapayOnboardingWidgetProps) => {
  const { trackClickFinishOnboarding } = useInstapayOnboardTracking();
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  const Intl = useIntl();
  const { space } = useTheme();

  const onPress = () => {
    trackClickFinishOnboarding();
    navigation.navigate('InstapayIntroductionStack', {
      screen: 'ChoosePayMethodScreen',
    });
  };

  return (
    <Box
      borderRadius="xlarge"
      backgroundColor="neutralGlobalSurface"
      paddingVertical="large"
      paddingHorizontal="medium"
      {...props}
    >
      <Typography.Body typeface="playful" variant="regular-bold">
        {Intl.formatMessage({ id: 'instapay.introduction.onboardingWidget.title' })}
      </Typography.Body>
      <Typography.Caption style={{ marginTop: space.smallMedium }} intent="subdued">
        {Intl.formatMessage({ id: 'instapay.introduction.onboardingWidget.subTitle' })}
      </Typography.Caption>
      <Progress.Bar value={80} style={{ marginTop: space.small }} />
      <Typography.Body intent="subdued" variant="small" style={{ marginTop: space.smallMedium }}>
        {Intl.formatMessage({ id: 'instapay.introduction.onboardingWidget.description' })}
      </Typography.Body>
      <Button
        style={{ marginTop: space.smallMedium }}
        onPress={onPress}
        intent="primary"
        text={Intl.formatMessage({ id: 'instapay.introduction.onboardingWidget.cta' })}
      />
    </Box>
  );
};

export const InstapayOnboardingWidget = (props: InstapayOnboardingWidgetProps) => {
  return (
    <ThemeSwitcher name="swag">
      <PureWidget {...props} />
    </ThemeSwitcher>
  );
};
