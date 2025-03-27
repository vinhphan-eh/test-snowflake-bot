import React from 'react';
import { Typography, useTheme } from '@hero-design/rn';
import { type BottomSheetRef, type ButtonAction } from '../../../../common/components/bottom-sheet/BottomSheet';
import { CustomBottomSheetView } from '../../../../common/components/bottom-sheet/CustomBottomSheetView';
import { InlineTextLink } from '../../../../common/components/inline-text-link';
import { EMPLOYMENT_HERO_PRIVACY_POLICY_LINK } from '../../../../common/constants/links';
import { useInAppBrowser } from '../../../../common/shared-hooks/useInAppBrowser';
import { useIntl } from '../../../../providers/LocalisationProvider';

type AcceptNotifyProps = {
  bsRef?: React.RefObject<BottomSheetRef>;
  onAcceptNotify: () => void;
};

export const AcceptNotify = ({ bsRef, onAcceptNotify }: AcceptNotifyProps) => {
  const { formatMessage } = useIntl();
  const { openUrl } = useInAppBrowser();
  const { space } = useTheme();

  const openPolicy = () => {
    openUrl(EMPLOYMENT_HERO_PRIVACY_POLICY_LINK);
  };

  const renderBodyContent = () => (
    <Typography.Body variant="regular" style={{ marginBottom: space.medium, marginHorizontal: space.large }}>
      Any personal information collected for this purpose is managed in accordance with our{' '}
      <InlineTextLink variant="regular" testID="inline-link-text" onPress={openPolicy}>
        {formatMessage({ id: 'common.privacyPolicy' })}
      </InlineTextLink>{' '}
      Information sent to individual super funds is done so securely and managed in accordance with their privacy
      practices.
    </Typography.Body>
  );

  const actionsButton: Array<ButtonAction> = [
    {
      title: 'Cancel',
      onPress: () => bsRef?.current?.close(),
      testID: 'cancel_btn',
      intent: 'secondary',
    },
    {
      title: 'Accept',
      onPress: onAcceptNotify,
      testID: 'accept_notify_btn',
      intent: 'primary',
    },
  ];

  return (
    <CustomBottomSheetView
      actions={actionsButton}
      icon="cancel"
      iconSize="xsmall"
      theme="eBens"
      content={renderBodyContent}
      title="Privacy agreement"
      bsRef={bsRef}
    />
  );
};
