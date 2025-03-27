import React from 'react';
import { ScrollView, type ImageSourcePropType } from 'react-native';
import { BottomSheet, Box, Button, Image, scale, Typography, useTheme } from '@hero-design/rn';
import { useIntl } from '../../../../../providers/LocalisationProvider';
import type { LocaleMessageID, Region } from '../../../../../providers/LocalisationProvider/constants';
import { useInstaPayDrawdownStore } from '../../stores/useInstaPayDrawdownStore';

type BottomSheetImageSource = Partial<Record<`${Region}`, ImageSourcePropType>>;
export type RecurringPushNotificationDetails = {
  image: {
    source: BottomSheetImageSource;
    rawWidth: number;
    rawHeight: number;
  };
  captionKey: LocaleMessageID;
  contentKey: LocaleMessageID;
};

type RecurringPushNotificationBottomSheetProps = RecurringPushNotificationDetails & {
  isOpening: boolean;
  setIsOpening: (isOpening: boolean) => void;
};

export const RecurringPushNotificationBottomSheet = ({
  captionKey,
  contentKey,
  image,
  isOpening,
  setIsOpening,
}: RecurringPushNotificationBottomSheetProps) => {
  const { space } = useTheme();
  const { formatMessage } = useIntl();
  const { workCountry } = useInstaPayDrawdownStore();

  return (
    <BottomSheet
      open={isOpening}
      onRequestClose={() => setIsOpening(false)}
      testID="recurring-push-notification-bts"
      header={formatMessage({ id: captionKey })}
      footer={
        <Box alignItems="flex-end" flexDirection="row">
          <Button
            variant="text"
            text={formatMessage({ id: 'common.gotIt' })}
            onPress={() => {
              setIsOpening(false);
            }}
          />
        </Box>
      }
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box paddingHorizontal="medium" paddingBottom="medium">
          <Image
            style={{
              width: scale(image.rawWidth),
              height: scale(image.rawHeight),
              maxWidth: '100%',
              marginTop: space.medium,
              marginBottom: space.large,
            }}
            source={image.source[workCountry]}
            resizeMode="contain"
          />

          <Box marginHorizontal="small">
            <Typography.Body>{formatMessage({ id: contentKey })}</Typography.Body>
          </Box>
        </Box>
      </ScrollView>
    </BottomSheet>
  );
};
