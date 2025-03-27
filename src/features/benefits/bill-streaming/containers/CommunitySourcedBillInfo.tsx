import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Typography, useTheme } from '@hero-design/rn';
import type { BottomSheetRef } from '../../../../common/components/bottom-sheet/BottomSheet';
import { CustomBottomSheetView } from '../../../../common/components/bottom-sheet/CustomBottomSheetView';
import useBrandName from '../../../../common/hooks/useBrandName';
import { useIntl } from '../../../../providers/LocalisationProvider';

export type CommunitySourcedBillInfoHandler = {
  open: () => void;
};

export const CommunitySourcedBillInfo = forwardRef<CommunitySourcedBillInfoHandler, unknown>((_, ref) => {
  const btsRef = useRef<BottomSheetRef>(null);
  const { formatMessage } = useIntl();
  const { space } = useTheme();
  const brandName = useBrandName();

  useImperativeHandle(ref, () => ({
    open: () => {
      btsRef.current?.open();
    },
  }));

  return (
    <CustomBottomSheetView
      content={() => (
        <Typography.Body
          style={{
            marginHorizontal: space.large,
            marginVertical: space.medium,
          }}
          accessibilityLabel="community source description"
        >
          {formatMessage({ id: 'benefits.bill.communitySourcedDesc' }, { brandName })}
        </Typography.Body>
      )}
      title={formatMessage({ id: 'benefits.bill.whatIsCommunitySourced' })}
      bsRef={btsRef}
      icon="cancel"
      iconSize="xsmall"
      actions={[
        {
          title: formatMessage({ id: 'benefits.bill.gotIt' }),
          onPress: () => btsRef.current?.close(),
          testID: 'got-it-btn',
        },
      ]}
      theme="eBens"
    />
  );
});
