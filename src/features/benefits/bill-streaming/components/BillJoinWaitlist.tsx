import React, { useState } from 'react';
import type { ImageSourcePropType } from 'react-native';
import { Image, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Box, Button, Checkbox, Typography, useTheme } from '@hero-design/rn';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { OvalCheckInfoRow } from './OvalCheckInfoRow';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import { useInAppBrowser } from '../../../../common/shared-hooks/useInAppBrowser';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { EH_GROUP_LINK, WAITLIST_POLICY_LINK } from '../constants';

export type BillJoinWaitListProps = {
  imgSrc: ImageSourcePropType;
  title: string;
  subTitle: string;
  checkBoxes: Array<{ content: string }>;
  joinWaitlist: (consentMktCheck: boolean) => void;
  onClose: () => void;
};

export const BillJoinWaitList = ({
  checkBoxes,
  imgSrc,
  joinWaitlist,
  onClose,
  subTitle,
  title,
}: BillJoinWaitListProps) => {
  const { bottom: bottomInset, top: topInset } = useSafeAreaInsets();
  const { openUrl } = useInAppBrowser();
  const { colors, space } = useTheme();
  const [policyCheck, setPolicyCheck] = useState(false);
  const [consentMktCheck, setConsentMktCheck] = useState(false);
  const { formatMessage } = useIntl();

  const openPolicy = () => {
    openUrl(WAITLIST_POLICY_LINK);
  };

  const openEhGroup = () => {
    openUrl(EH_GROUP_LINK);
  };

  const renderCheckBoxesInfo = () => {
    return (
      <Box marginTop="medium">
        {checkBoxes.map(({ content }) => (
          <OvalCheckInfoRow key={content} style={{ marginTop: space.smallMedium }} text={content} />
        ))}
      </Box>
    );
  };

  return (
    <Box backgroundColor="decorativePrimarySurface" flex={1}>
      <CustomStatusBar backgroundColor={colors.decorativePrimarySurface} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: bottomInset > 0 ? bottomInset : space.medium,
          paddingHorizontal: space.medium,
        }}
        style={{ flex: 1 }}
      >
        <Image testID="cover_img" resizeMode="contain" style={{ marginTop: space.medium }} source={imgSrc} />
        <Typography.Title level="h3" style={{ marginTop: space.xlarge, textAlign: 'center' }}>
          {title}
        </Typography.Title>
        {renderCheckBoxesInfo()}
        <Typography.Title level="h5" style={{ marginTop: space.large, textAlign: 'center' }}>
          {subTitle}
        </Typography.Title>
        <Checkbox
          testID="policy_check_box"
          style={{ marginTop: space.large }}
          checked={policyCheck}
          onPress={() => setPolicyCheck(!policyCheck)}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          description={
            <Typography.Body variant="small">
              {formatMessage({ id: 'benefits.bill.readAndAgree' })}{' '}
              <TouchableWithoutFeedback testID="privacy_policy_btn" onPress={openPolicy}>
                <Typography.Body variant="small" style={{ textDecorationLine: 'underline' }} intent="primary">
                  {formatMessage({ id: 'common.privacyPolicy' })}
                </Typography.Body>
              </TouchableWithoutFeedback>
            </Typography.Body>
          }
        />

        <Checkbox
          testID="consent_mkt_check_box"
          style={{ marginTop: space.medium }}
          checked={consentMktCheck}
          onPress={() => setConsentMktCheck(!consentMktCheck)}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          description={
            <Typography.Body variant="small">
              {formatMessage({ id: 'benefits.bill.consentToReceivingMarketingCommunications' })}{' '}
              <TouchableWithoutFeedback testID="eh_group_btn" onPress={openEhGroup}>
                <Typography.Body variant="small" style={{ textDecorationLine: 'underline' }} intent="primary">
                  {formatMessage({ id: 'common.employmentHeroGroup' })}
                </Typography.Body>
              </TouchableWithoutFeedback>{' '}
              {formatMessage({ id: 'benefits.bill.byEmailTextAndSocialMedia' })}
            </Typography.Body>
          }
        />
        <Button
          testID="joint_waitlist_btn"
          disabled={!policyCheck}
          style={{ marginTop: space.large }}
          onPress={() => joinWaitlist(consentMktCheck)}
          text={formatMessage({ id: 'benefits.bill.joinTheWaitlist' })}
        />
      </ScrollView>
      <Button.Icon
        testID="close_btn"
        onPress={onClose}
        style={{
          marginTop: space.medium,
          marginRight: space.medium,
          position: 'absolute',
          top: topInset,
          right: space.small,
        }}
        size="xsmall"
        icon="cancel"
      />
    </Box>
  );
};
