import React, { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Box, Button, Icon, Typography, useTheme } from '@hero-design/rn';
import Clipboard from '@react-native-clipboard/clipboard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import images from '../../../../common/assets/images';
import type { BottomSheetRef } from '../../../../common/components/bottom-sheet/BottomSheet';
import { CustomBottomSheetView } from '../../../../common/components/bottom-sheet/CustomBottomSheetView';
import { scale } from '../../../../common/utils/layout';
import { useIntl } from '../../../../providers/LocalisationProvider';

type OfferLinkRedirectProps = {
  description: string;
  copyText: string;
  bsRef: React.RefObject<BottomSheetRef> | undefined;
  onDismiss?: () => void;
  onNext: () => void;
};

const imgWidth = scale(180, 'width');

export const SignupRedirectBts = ({
  bsRef,
  copyText,
  description,
  onDismiss = () => {},
  onNext,
}: OfferLinkRedirectProps) => {
  const { colors, space } = useTheme();
  const { bottom } = useSafeAreaInsets();
  const { formatMessage } = useIntl();
  const [isClickedCopy, setIsClickedCopy] = useState(false);

  const onClickCopy = () => {
    Clipboard.setString(copyText ?? '');
    setIsClickedCopy(true);
  };

  return (
    <CustomBottomSheetView
      onDismiss={() => {
        setIsClickedCopy(false);
        onDismiss();
      }}
      bsRef={bsRef}
      content={() => {
        return (
          <>
            <Box
              alignItems="center"
              paddingHorizontal="large"
              borderBottomWidth="base"
              borderBottomColor="secondaryOutline"
            >
              <Image
                resizeMode="contain"
                style={{
                  width: imgWidth,
                  height: imgWidth,
                  marginTop: space.medium,
                }}
                source={images.benefitsAlert}
              />
              <Typography.Title style={{ marginVertical: space.small }} level="h4" typeface="playful">
                Reminder
              </Typography.Title>
              <Typography.Body style={{ marginVertical: space.small, textAlign: 'center' }}>
                {description}
              </Typography.Body>
              <TouchableOpacity
                onPress={onClickCopy}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: colors.decorativePrimarySurface,
                  borderRadius: space.small,
                  marginBottom: space.xlarge,
                  marginTop: space.small,
                  paddingHorizontal: space.xlarge,
                  paddingVertical: space.medium,
                }}
              >
                <Typography.Body variant="regular-bold" style={{ marginRight: space.small }}>
                  {copyText}
                </Typography.Body>
                <Icon icon="file-copy-outlined" intent="primary" />
              </TouchableOpacity>
            </Box>
            <Button
              style={{
                alignSelf: 'flex-end',
                paddingHorizontal: space.large,
                marginBottom: bottom ? 0 : space.medium,
              }}
              variant="text"
              disabled={!isClickedCopy}
              accessibilityLabel="got it button"
              intent="primary"
              testID="reminder-got-it-btn"
              onPress={() => {
                setIsClickedCopy(false);
                bsRef?.current?.close();
                onNext();
              }}
              text={formatMessage({ id: 'common.letGo' })}
            />
          </>
        );
      }}
      icon="cancel"
      iconSize="xsmall"
      theme="eBens"
      title=" "
    />
  );
};
