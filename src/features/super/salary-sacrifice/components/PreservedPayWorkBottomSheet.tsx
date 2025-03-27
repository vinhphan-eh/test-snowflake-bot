import React from 'react';
import { ScrollView } from 'react-native';
import { Box, Image, Typography, useTheme } from '@hero-design/rn';
import images from '../../../../common/assets/images';
import type { BottomSheetRef } from '../../../../common/components/bottom-sheet/BottomSheet';
import { CustomBottomSheetView } from '../../../../common/components/bottom-sheet/CustomBottomSheetView';
import { scale } from '../../../../common/utils/layout';

type PreservedPayWorkBottomSheetProps = {
  bsRef?: React.RefObject<BottomSheetRef>;
};
const imgWidth = scale(350, 'width');
const imgHeight = scale(130, 'height');

export const PreservedPayWorkBottomSheet = ({ bsRef }: PreservedPayWorkBottomSheetProps) => {
  const { space } = useTheme();
  return (
    <CustomBottomSheetView
      actions={[
        {
          title: 'Close',
          onPress: () => bsRef?.current?.close(),
          testID: 'close_btn',
        },
      ]}
      icon="cancel"
      iconSize="xsmall"
      content={() => (
        <Box paddingHorizontal="large" paddingVertical="small">
          <ScrollView>
            <Typography.Body variant="regular" style={{ marginBottom: space.large }}>
              {`Let's say you get usually paid $500 weekly and want to make a weekly salary sacrifice of $100 to your super. You want to ensure you get paid at least $400 each week, so you set a preserved pay amount of $400.`}
            </Typography.Body>

            <Typography.Body variant="regular">
              If you are paid $500, your salary sacrifice of $100 will be made to your super, as after deducting your
              salary sacrifice, you will still be paid your preserved pay amount of $400.
            </Typography.Body>
            <Image
              resizeMode="contain"
              testID="salary-sacrifice-preserve-pay-1"
              style={{
                width: imgWidth,
                height: imgHeight,
                marginTop: space.medium,
                marginBottom: space.medium,
              }}
              source={images.salarySacrificePreservePay1}
            />
            <Typography.Body variant="regular">
              However, if your pay decreases to $400, your salary sacrifice of $100 will not be made, as after deducting
              your salary sacrifice, you will only be paid $300, which is less than your preserved pay amount of $400.
            </Typography.Body>
            <Image
              resizeMode="contain"
              testID="salary-sacrifice-preserve-pay-2"
              style={{
                width: imgWidth,
                height: imgHeight,
                marginTop: space.medium,
                marginBottom: space.medium,
              }}
              source={images.salarySacrificePreservePay2}
            />
          </ScrollView>
        </Box>
      )}
      title="How does preserved pay work?"
      bsRef={bsRef}
    />
  );
};
