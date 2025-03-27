import React from 'react';
import { Image } from 'react-native';
import { Box, Button, Typography, useTheme } from '@hero-design/rn';
import images from '../../../../common/assets/images';
import type { BottomSheetRef } from '../../../../common/components/bottom-sheet/BottomSheet';
import { CustomBottomSheetView } from '../../../../common/components/bottom-sheet/CustomBottomSheetView';
import { scale } from '../../../../common/utils/layout';

type OfferLinkRedirectProps = {
  supplierName: string;
  bsRef?: React.RefObject<BottomSheetRef> | undefined;
  onDismiss?: () => void;
};

const imgWidth = scale(180, 'width');

export const OfferLinkRedirect = ({ bsRef, onDismiss = () => {}, supplierName }: OfferLinkRedirectProps) => {
  const { space } = useTheme();
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
              source={images.snailBenefits}
            />
            <Typography.Title
              level="h4"
              style={{ marginVertical: space.medium }}
              typeface="playful"
              accessibilityLabel="Cashback is active"
            >
              Cashback is active
            </Typography.Title>
            <Typography.Body variant="regular" style={{ marginBottom: space.xlarge, textAlign: 'center' }}>
              {`You will be directed to ${supplierName}. Make sure you don’t leave the link!`}
            </Typography.Body>
            <Button accessibilityLabel="Fake dots loading" intent="white" onPress={() => {}} text="" loading />
          </Box>
        );
      }}
      icon="cancel"
      iconSize="xsmall"
      theme="eBens"
      title="Link redirect"
    />
  );
};
