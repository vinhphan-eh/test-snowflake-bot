import React from 'react';
import { Box, Button, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import type { RootStackNavigationProp } from '../../../../navigation/navigationTypes';
import { useIntl } from '../../../../providers/LocalisationProvider';

type WaitlistSignupSectionProps = {
  testID?: string;
};

export const WaitlistSignupSection = ({ testID }: WaitlistSignupSectionProps) => {
  const { colors, space } = useTheme();
  const Intl = useIntl();

  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  const goToSignUp = () => {
    navigation.navigate('BillStreamWaitlist', { screen: 'HealthInsuranceJoinWaitlistScreen' });
  };

  return (
    <Box
      style={{
        backgroundColor: colors.decorativePrimarySurface,
        paddingHorizontal: space.large,
        marginTop: space.small,
      }}
      testID={testID}
    >
      <Typography.Title
        style={[{ textAlign: 'left' }]}
        accessibilityLabel={Intl.formatMessage({ id: 'benefits.bill.getMarketLeading' })}
        level="h4"
        typeface="playful"
      >
        {Intl.formatMessage({ id: 'benefits.bill.getMarketLeading' })}
      </Typography.Title>
      <Button
        onPress={goToSignUp}
        style={{ marginTop: space.medium, paddingHorizontal: space.xxxxlarge }}
        text={
          <Typography.Title
            intent="inverted"
            level="h5"
            typeface="playful"
            accessibilityLabel={Intl.formatMessage({ id: 'benefits.bill.signUp' })}
          >
            {Intl.formatMessage({ id: 'benefits.bill.signUp' })}
          </Typography.Title>
        }
        variant="filled"
      />
    </Box>
  );
};
