import React from 'react';
import { Image } from 'react-native';
import { Box, Button, Typography, useTheme } from '@hero-design/rn';
import images from '../../../../common/assets/images';
import type { BottomSheetRef } from '../../../../common/components/bottom-sheet/BottomSheet';
import { CustomBottomSheetView } from '../../../../common/components/bottom-sheet/CustomBottomSheetView';
import { scale } from '../../../../common/utils/layout';
import useAppName from '../../../../common/hooks/useAppName';

type ConsolidationLoadingBottomSheetProps = {
  fundName: string;
  bsRef?: React.RefObject<BottomSheetRef> | undefined;
  onDismiss?: () => void;
};

const imgWidth = scale(180, 'width');

export const ConsolidationLoadingBottomSheet = ({
  bsRef,
  fundName,
  onDismiss = () => {},
}: ConsolidationLoadingBottomSheetProps) => {
  const { space } = useTheme();
  const appName = useAppName();

  return (
    <CustomBottomSheetView
      onDismiss={onDismiss}
      bsRef={bsRef}
      content={() => {
        return (
          <Box alignItems="center" paddingHorizontal="large">
            <Image
              resizeMode="contain"
              style={{
                width: imgWidth,
                height: imgWidth,
              }}
              source={images.snailMoney}
            />
            <Typography.Title
              level="h4"
              style={{ marginVertical: space.medium, textAlign: 'center' }}
              typeface="playful"
              accessibilityLabel="Cashback is active"
            >
              Sending you to {fundName} website
            </Typography.Title>
            <Typography.Body variant="regular" style={{ marginBottom: space.xlarge, textAlign: 'center' }}>
              {`You can come back to ${appName} when your consolidation has been completed.`}
            </Typography.Body>
            <Button accessibilityLabel="Fake dots loading" intent="white" onPress={() => {}} text="" loading />
          </Box>
        );
      }}
      icon="cancel"
      iconSize="xsmall"
      title=" "
    />
  );
};
