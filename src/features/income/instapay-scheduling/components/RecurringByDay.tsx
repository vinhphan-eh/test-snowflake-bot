import React, { useEffect } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Box, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import images from '../../../../common/assets/images';
import type { RootStackNavigationProp } from '../../../../navigation/navigationTypes';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { useInstapayTracking } from '../../instapay/hooks/useInstapayTracking';

export const RecurringByDay = () => {
  const { space } = useTheme();
  const { formatMessage } = useIntl();
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  const { trackPressRecurringByDayTile, trackViewRecurringByDayTile } = useInstapayTracking();

  const onPress = () => {
    trackPressRecurringByDayTile();
    navigation.navigate('InstaPaySchedulingStack', {
      screen: 'InstaPayRecurringByDay',
      params: {
        action: 'creation',
      },
    });
  };

  useEffect(() => {
    trackViewRecurringByDayTile();
  }, []);

  return (
    <TouchableOpacity testID="schedule-by-day" onPress={onPress} activeOpacity={0.5}>
      <Box
        flexDirection="row"
        padding="smallMedium"
        bgColor="decorativePrimarySurface"
        borderRadius="xlarge"
        justifyContent="center"
        alignItems="center"
      >
        <Image testID="image" source={images.recurringByDay} style={{ marginRight: space.smallMedium }} />
        <Box style={{ flexBasis: 0, flexGrow: 1 }}>
          <Typography.Body variant="regular-bold">
            {formatMessage({ id: 'instapay.scheduling.byDaySubscription.title' })}
          </Typography.Body>
          <Typography.Caption>
            {formatMessage({ id: 'instapay.scheduling.byDaySubscription.description' })}
          </Typography.Caption>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};
