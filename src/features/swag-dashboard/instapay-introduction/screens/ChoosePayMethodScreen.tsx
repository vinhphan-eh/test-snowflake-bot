import React, { useState } from 'react';
import { Box, Radio, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import { useToast } from '../../../../common/shared-hooks/useToast';
import { InstaPayOption } from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { BottomButtons } from '../containers/BottomButtons';
import { useInstapayOnboardTracking } from '../hooks/useInstapayOnboardTracking';
import { useUpdateInstapayOnboarding } from '../hooks/useUpdateInstapayOnboarding';
import type { InstapayIntroductionNavigationProp } from '../navigation/navigationTypes';

const OptionValues = {
  OLD: 'oldWay',
  NEW: 'newWay',
} as const;

type OptionsValues = (typeof OptionValues)[keyof typeof OptionValues];

export const ChoosePayMethodScreen = () => {
  const navigation = useNavigation<InstapayIntroductionNavigationProp<'ChoosePayMethodScreen'>>();
  const { colors, space } = useTheme();
  const Toast = useToast();
  const { trackClickOnContinue, trackClickSkipOnboarding } = useInstapayOnboardTracking();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const Intl = useIntl();
  const [option, setOption] = useState<OptionsValues>(OptionValues.OLD);
  const { updateInstapayOption } = useUpdateInstapayOnboarding();

  const chooseOldWay = () => {
    updateInstapayOption({
      option: InstaPayOption.Normal,
      successCallback: () => {
        navigation.goBack();
        Toast.show({
          content: Intl.formatMessage({ id: 'instapay.introduction.oldWayToast' }),
        });
      },
    });
  };

  const onContinuePress = () => {
    if (option === OptionValues.OLD) {
      trackClickOnContinue('old way');
      chooseOldWay();
    } else {
      trackClickOnContinue('new way');
      navigation.navigate('ChooseInstapayMethodScreen');
    }
  };

  const onSkip = () => {
    trackClickSkipOnboarding('Choose Old/New way');
    navigation.goBack();
  };

  return (
    <Box
      style={{ paddingBottom: bottomInset || space.medium }}
      paddingHorizontal="medium"
      backgroundColor="defaultGlobalSurface"
      flex={1}
    >
      <CustomStatusBar backgroundColor={colors.defaultGlobalSurface} />
      <Typography.Title style={{ marginTop: space.xlarge }} typeface="playful" level="h1">
        {Intl.formatMessage({ id: 'instapay.introduction.wouldLikeToGetPaid' })}
      </Typography.Title>
      <Box marginTop="large" flex={1}>
        <Radio.Group
          inactiveIntent="dark"
          options={[
            { text: Intl.formatMessage({ id: 'instapay.introduction.oldWayOption' }), value: OptionValues.OLD },
            { text: Intl.formatMessage({ id: 'instapay.introduction.newWayOption' }), value: OptionValues.NEW },
          ]}
          value={option}
          onPress={setOption}
        />
      </Box>
      <BottomButtons
        leftAction={Intl.formatMessage({ id: 'common.skip' })}
        rightAction={Intl.formatMessage({ id: 'common.continue' })}
        onLeftPress={onSkip}
        onRightPress={onContinuePress}
      />
    </Box>
  );
};
