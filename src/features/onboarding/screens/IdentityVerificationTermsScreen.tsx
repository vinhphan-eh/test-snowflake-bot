import React, { useRef, useState } from 'react';
import { Box, Button, Checkbox, Icon, List, Typography } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomSheetRef } from '../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetScrollView } from '../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetWithHD } from '../../../common/components/bottom-sheet/BottomSheetWithHD';
import { useBottomSheetDynamicSnapPoints } from '../../../common/components/bottom-sheet/useBottomSheetDynamicSnapPoints';
import { InlineTextLink } from '../../../common/components/inline-text-link';
import { Page } from '../../../common/components/layout/page';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import { EMPLOYMENT_HERO_PRIVACY_POLICY_LINK } from '../../../common/constants/links';
import { useInAppBrowser } from '../../../common/shared-hooks/useInAppBrowser';
import type { OnboardingScreenNavigationProp } from '../navigation/navigationTypes';
import { useOnboardingStore } from '../stores/useOnboardingStore';

const identityVerificationConsentContent =
  'I consent to the collection, use and disclosure of my personal information in accordance to the Online Verification Terms and my information being checked with the document issuer or official record holder via third party systems for the purpose of confirming my identity.';

const IdentityVerificationTermsScreen = () => {
  const agreeIdentityVerificationTerms = useOnboardingStore(state => state.agreeIdentityVerificationTerms);
  const bs = useRef<BottomSheetRef>(null);
  const navigation = useNavigation<OnboardingScreenNavigationProp<'IdentityVerificationTerm'>>();
  const [hasAgreedPP, setHasAgreedPP] = useState(false);
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { openUrl } = useInAppBrowser();

  const {
    animatedContentHeight,
    animatedHandleHeight,
    animatedSnapPoints,
    contentContainerHeightStyle,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(true);

  const onConfirm = () => {
    agreeIdentityVerificationTerms();
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'VerifyIdentityDocumentInfo',
        },
      ],
    });
  };

  const openEHPrivacyPolicy = () => {
    openUrl(EMPLOYMENT_HERO_PRIVACY_POLICY_LINK);
  };

  const onOpenOrCloseTerm = (isOpen?: boolean) => {
    if (isOpen) {
      bs.current?.open();
    } else {
      bs.current?.close();
    }
  };

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <CustomStatusBar />
      <Page.TopBar title="Identity verification terms" hideRight onBack={onBack} />
      <Page style={{ paddingBottom: bottomInset }}>
        <Page.Title>Almost there! Please read and consent to our identity verification terms.</Page.Title>
        <Page.Footer justifyContent="flex-end" flex={1}>
          <Box marginTop="medium">
            <List.Item
              variant="card"
              testID="onlineTerm"
              title="Online verification terms"
              prefix={<Icon icon="file" size="medium" intent="primary" />}
              suffix={<Icon icon="arrow-up" size="medium" intent="primary" />}
              onPress={() => onOpenOrCloseTerm(true)}
            />
            <Box marginTop="medium">
              <Checkbox
                testID="identity-verification-ck-box"
                onPress={() => setHasAgreedPP(!hasAgreedPP)}
                checked={hasAgreedPP}
                description={identityVerificationConsentContent}
              />
            </Box>
          </Box>
          <Box marginTop="medium">
            <Button
              text="Submit"
              testID="identity-verification-submit-btn"
              accessibilityLabel="Submit"
              onPress={onConfirm}
              disabled={!hasAgreedPP}
            />
          </Box>
        </Page.Footer>
      </Page>
      <BottomSheetWithHD
        ref={bs}
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        title="Online Identity Verification Terms"
        actions={[{ title: 'Done', onPress: () => onOpenOrCloseTerm() }]}
      >
        {({ space }) => (
          <BottomSheetScrollView style={contentContainerHeightStyle} onLayout={handleContentLayout}>
            <Typography.Body variant="regular" style={{ marginHorizontal: space.large, marginTop: space.small }}>
              a. By proceeding with online identity verification, for the purpose of you verifying my identity, I:
            </Typography.Body>
            <Typography.Body
              variant="regular"
              style={{ marginLeft: space.xxxlarge, marginRight: space.large, marginTop: space.small }}
            >
              {`i. Consent to the collection, use and disclosure of my name, residential address, and date of birth
            (personal information) in accordance with Employment Hero's Privacy Policy`}
            </Typography.Body>
            <Typography.Body
              variant="regular"
              style={{ marginLeft: space.xxxlarge, marginRight: space.large, marginTop: space.small }}
            >
              ii. Consent to my personal information being disclosed to a credit reporting agency
            </Typography.Body>
            <Typography.Body
              variant="regular"
              style={{ marginLeft: space.xxxlarge, marginRight: space.large, marginTop: space.small }}
            >
              iii. Consent to my personal information being checked with the document issuer or official record holder
              via third party systems in connection with a request to verify my identity in accordance with the
              Anti-Money Laundering and Counter Terrorism Financing Act 2006 (AML/CTF Act).
            </Typography.Body>
            <Typography.Body
              variant="regular"
              style={{ marginLeft: space.xxxlarge, marginRight: space.large, marginTop: space.small }}
            >
              iv. Consent to my personal information being disclosed to your verification agent(s), which will act as my
              intermediary, for the purpose of exercising my right, under the Australian Privacy Act 1988, to access
              personal information lawfully held about me by third parties. I consent to those third parties using my
              personal information for the purpose of monitoring and improving their verification services.
            </Typography.Body>
            <Typography.Body variant="regular" style={{ marginHorizontal: space.large, marginTop: space.small }}>
              b. In accordance to these terms, you confirm that you:
            </Typography.Body>
            <Typography.Body
              variant="regular"
              style={{ marginLeft: space.xxxlarge, marginRight: space.large, marginTop: space.small }}
            >
              i. Are authorised to provide the personal information presented, including details of your identity
              documents; and
            </Typography.Body>
            <Typography.Body
              variant="regular"
              style={{ marginLeft: space.xxxlarge, marginRight: space.large, marginTop: space.small }}
            >
              ii. Declare, to the best of your knowledge that the information you have provided is true and correct at
              the date of this declaration
            </Typography.Body>
            <Typography.Body
              variant="regular"
              style={{ marginLeft: space.xxxlarge, marginRight: space.large, marginTop: space.small }}
            >
              iii. Understand that providing false or misleading information is an offense under the AML/CTF Act.
            </Typography.Body>
            <Typography.Body
              variant="regular"
              style={{ marginHorizontal: space.large, marginTop: space.small, marginBottom: space.large }}
            >
              For further information, please view the{' '}
              <InlineTextLink onPress={openEHPrivacyPolicy} variant="regular">
                Employment Hero Privacy Policy
              </InlineTextLink>
              .
            </Typography.Body>
          </BottomSheetScrollView>
        )}
      </BottomSheetWithHD>
    </>
  );
};

export { IdentityVerificationTermsScreen };
