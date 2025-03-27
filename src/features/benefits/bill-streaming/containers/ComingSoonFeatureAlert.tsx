import React from 'react';
import { Typography, Box, useTheme, Alert } from '@hero-design/rn';
import type { BottomSheetRef } from '../../../../common/components/bottom-sheet/BottomSheet';
import { CustomBottomSheetView } from '../../../../common/components/bottom-sheet/CustomBottomSheetView';
import { BulletLineV2 } from '../../../../common/components/bullet-line/BulletLineV2';
import { InlineTextLink } from '../../../../common/components/inline-text-link';
import { useBenefitsBillMgmtTracking } from '../hooks/useBenefitsBillMgmtTracking';
import { useBillManagementStore } from '../stores/useBillManagementStore';

export const ComingSoonFeatureAlert = () => {
  const { space } = useTheme();
  const { hasHydrate, setComingSoonAlertVisibility, showFeatureComingSoonAlert } = useBillManagementStore();
  const alertVisibility = showFeatureComingSoonAlert && hasHydrate;
  const { trackClickOnComingSoon } = useBenefitsBillMgmtTracking();

  const bsRef = React.useRef<BottomSheetRef>(null);

  const onPressComingSoonAlert = () => {
    trackClickOnComingSoon();
    bsRef.current?.open();
  };

  return (
    <>
      {alertVisibility && (
        <Alert
          testID="coming-soon-alert"
          onClose={() => setComingSoonAlertVisibility(false)}
          style={{ marginBottom: space.medium }}
          content={
            <Typography.Body variant="small">
              Exciting{' '}
              <InlineTextLink variant="small" testID="inline-link-text" onPress={onPressComingSoonAlert}>
                features
              </InlineTextLink>{' '}
              coming soon!
            </Typography.Body>
          }
        />
      )}

      <CustomBottomSheetView
        icon="cancel"
        theme="eBens"
        iconSize="xsmall"
        content={() => (
          <Box marginVertical="small" marginHorizontal="xlarge">
            <BulletLineV2 size={8} betweenGap="medium">
              <Typography.Body style={{ width: '90%' }}>
                Recurring payments can be set up such that you can pay off your bills automatically
              </Typography.Body>
            </BulletLineV2>
            <BulletLineV2 style={{ marginTop: space.small }} size={8} betweenGap="medium">
              <Typography.Body style={{ width: '90%' }}>
                Break down your bills into even and predictable payments that are aligned to your pay cycle
              </Typography.Body>
            </BulletLineV2>
          </Box>
        )}
        title="Coming soon features"
        bsRef={bsRef}
      />
    </>
  );
};
