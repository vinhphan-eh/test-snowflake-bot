import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Box, Button, Checkbox, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import images from '../../../../common/assets/images';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import { useInAppBrowser } from '../../../../common/shared-hooks/useInAppBrowser';
import { useBsJoinWaitListMutation } from '../../../../new-graphql/generated';
import { OvalCheckInfoRow } from '../components/OvalCheckInfoRow';
import { EH_GROUP_LINK, WAITLIST_POLICY_LINK } from '../constants';
import type { BillStreamWaitlistNavigationProp } from '../navigation/navigationTypes';
import { useBillStreamingWaitlistStore } from '../stores/useBillStreamingWaitlistStore';

const { width: windowWidth } = Dimensions.get('window');

export const BillStreamWaitlistSignupScreen = () => {
  const { bottom: bottomInset, top: topInset } = useSafeAreaInsets();
  const navigation = useNavigation<BillStreamWaitlistNavigationProp<'BillStreamWaitlistSignup'>>();
  const { openUrl } = useInAppBrowser();
  const { colors, space } = useTheme();
  const finishRegistration = useBillStreamingWaitlistStore(state => state.finishRegistration);
  const { mutateAsync: registerAsync } = useBsJoinWaitListMutation();
  const [policyCheck, setPolicyCheck] = useState(false);
  const [consentMktCheck, setConsentMktCheck] = useState(false);

  const imgWidth = windowWidth - space.medium;
  const imgHeight = (343 / 375) * imgWidth; // height with ratio

  const openPolicy = () => {
    openUrl(WAITLIST_POLICY_LINK);
  };

  const openEhGroup = () => {
    openUrl(EH_GROUP_LINK);
  };

  const onClose = () => {
    navigation.goBack();
  };

  const joinWaitlist = async () => {
    try {
      const res = await registerAsync({
        input: {
          isAcceptConsentMarketing: consentMktCheck,
        },
      });
      if (res.bsJoinWaitList?.success) {
        finishRegistration();
        navigation.replace('BillStreamWaitlistSuccessScreen');
      } else {
        navigation.replace('BillStreamWaitlistFailedScreen');
      }
    } catch {
      navigation.replace('BillStreamWaitlistFailedScreen');
    }
  };

  const renderCheckBoxesInfo = () => {
    return (
      <>
        <OvalCheckInfoRow style={{ marginTop: space.large }} text="Save time with automated payments" />
        <OvalCheckInfoRow style={{ marginTop: space.small }} text="Manage and track your usage" />
        <OvalCheckInfoRow style={{ marginTop: space.small }} text="See important bills on one platform" />
        <OvalCheckInfoRow style={{ marginTop: space.small }} text="Get the best discounts" />
      </>
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
        <Image
          testID="cover_img"
          resizeMode="contain"
          style={{ width: imgWidth, height: imgHeight, marginTop: space.medium }}
          source={images.waitlistCoverImg}
        />
        <Typography.Title level="h3" style={{ marginTop: space.xlarge, textAlign: 'center' }}>
          Be one of the first to set up Bill Management
        </Typography.Title>
        {renderCheckBoxesInfo()}
        <Typography.Title level="h5" style={{ marginTop: space.large, textAlign: 'center' }}>
          Join our waitlist to be one of the first to set up Bill Management.
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
              I read and agree to{' '}
              <TouchableWithoutFeedback testID="privacy_policy_btn" onPress={openPolicy}>
                <Typography.Body variant="small" style={{ textDecorationLine: 'underline' }} intent="primary">
                  Privacy Policy
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
              I consent to receiving marketing communications, promotions/offers and content from the{' '}
              <TouchableWithoutFeedback testID="eh_group_btn" onPress={openEhGroup}>
                <Typography.Body variant="small" style={{ textDecorationLine: 'underline' }} intent="primary">
                  Employment Hero Group
                </Typography.Body>
              </TouchableWithoutFeedback>{' '}
              by email, text, and social media channels about our products, new services or brands.
            </Typography.Body>
          }
        />
        <Button
          testID="joint_waitlist_btn"
          disabled={!policyCheck}
          style={{ marginTop: space.large }}
          onPress={joinWaitlist}
          text="Join the waitlist"
        />
      </ScrollView>
      <Button.Icon
        testID="close_btn"
        onPress={onClose}
        style={{
          marginRight: space.medium,
          marginTop: space.medium,
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
