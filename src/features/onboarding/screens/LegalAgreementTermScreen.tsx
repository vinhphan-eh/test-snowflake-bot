import type { FC } from 'react';
import React, { useState } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Box, Button, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGetSuperAppToken } from '../../../common/auth/store/useSuperAppTokenStore';
import { InlineTextLink } from '../../../common/components/inline-text-link';
import { Page } from '../../../common/components/layout/page';
import PolicyCheckbox from '../../../common/components/policy-checkbox';
import { OverlayLoadingScreen } from '../../../common/components/spinner';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import { useCheckUKPermission } from '../../../common/hooks/useCheckUKPermission';
import { useIsWorkzone } from '../../../common/hooks/useIsWorkzone';
import { useInAppBrowser } from '../../../common/shared-hooks/useInAppBrowser';
import { useSessionStore } from '../../../common/stores/useSessionStore';
import { getStructuredAddress } from '../../../common/utils/address';
import {
  useGetEhUserInitializationDetailsQuery,
  useGetKpUserInitializationDetailsQuery,
  type UserInitializationDetails,
} from '../../../new-graphql/generated';
import { useRegionLocalisation } from '../../../providers/LocalisationProvider';
import type { ContentItem } from '../constants/policyContent';
import {
  privacyPolicyContent,
  termsAndConditionsContent,
  rebrandPrivacyPolicyContent,
  rebrandTermsAndConditionsContent,
} from '../constants/policyContent';
import { EUUKPrivacyPolicyContent, UKTermsAndConditionsContent } from '../constants/ukPolicyContent';
import type { OnboardingScreenNavigationProp } from '../navigation/navigationTypes';
import { useOnboardingStore } from '../stores/useOnboardingStore';

const PolicyContent: FC<{ contents: ContentItem[] }> = ({ contents }) => {
  const { openUrl } = useInAppBrowser();
  const { colors, space } = useTheme();

  const getBoxPadding = (item: ContentItem) => {
    if (item.showListItemSymbol) {
      switch (item.listItemIndentationLevel) {
        case 2:
          return 'large';
        case 3:
          return 'xxlarge';
        default:
          return 'medium';
      }
    }

    return 'xxsmall';
  };

  const renderSingleTableCell = ({
    content,
    isHeader,
    key,
    style,
  }: {
    key: string;
    isHeader: boolean;
    content: string;
    style?: StyleProp<ViewStyle>;
  }) => (
    <Box
      flex={1}
      flexGrow={1}
      flexBasis={1}
      style={[{ borderColor: colors.darkGlobalSurface, borderWidth: 1 }, style]}
      paddingHorizontal="small"
      paddingVertical="medium"
      justifyContent="center"
      key={key}
    >
      <Typography.Body variant={isHeader ? 'small-bold' : 'small'}>{content ?? ''}</Typography.Body>
    </Box>
  );

  const renderListItemSymbol = (item: ContentItem) => {
    if (item.showListItemSymbol) {
      switch (item.listItemIndentationLevel) {
        case 2:
          return (
            <Typography.Body style={{ marginLeft: space.medium, marginRight: space.xsmall }}>
              {'\u2022'}
            </Typography.Body>
          );
        case 3:
          return (
            <Typography.Body style={{ marginLeft: space.xlarge, marginRight: space.xsmall }}>
              {'\u2022'}
            </Typography.Body>
          );
        default:
          return <Typography.Body style={{ marginHorizontal: space.xsmall }}>{'\u2022'}</Typography.Body>;
      }
    }

    return undefined;
  };

  const defineLeftIndentation = (item: ContentItem) => {
    switch (item.leftIndentationLevel) {
      case 1:
        return 'small';
      case 2:
        return 'medium';
      case 3:
        return 'large';
      default:
        return undefined;
    }
  };

  return (
    <>
      {contents.map((item, idx) => {
        switch (item.type) {
          case 'table':
            return (
              <Box paddingBottom="smallMedium">
                {item.preHeaderRow?.map((cell, cellIdx) =>
                  renderSingleTableCell({
                    key: `table-pre-header-row-${cellIdx.toString()}`,
                    isHeader: false,
                    content: cell ?? '',
                    style: {
                      borderLeftWidth: cellIdx === 0 ? 1 : 0,
                      borderTopWidth: 1,
                    },
                  })
                )}

                <Box key={`table-${idx.toString()}-header`} flexDirection="row">
                  {item.columns?.map((column, colIdx) =>
                    renderSingleTableCell({
                      key: `table-header-${idx}-${colIdx}`,
                      isHeader: true,
                      content: column ?? '',
                      style: {
                        borderLeftWidth: colIdx === 0 ? 1 : 0,
                        borderTopWidth: item?.preHeaderRow ? 0 : 1,
                        alignItems: 'center',
                      },
                    })
                  )}
                </Box>

                {item.rows?.map((row, rowIdx) => {
                  return (
                    <Box key={`table-${idx.toString()}-row-${rowIdx.toString()}`} flexDirection="row">
                      {row.map((cell, cellIdx) =>
                        renderSingleTableCell({
                          key: `table-${idx}-row-${rowIdx}-cell-${cellIdx}`,
                          isHeader: false,
                          content: cell ?? '',
                          style: {
                            borderLeftWidth: cellIdx === 0 ? 1 : 0,
                            borderTopWidth: 0,
                          },
                        })
                      )}
                    </Box>
                  );
                })}
              </Box>
            );
          case 'link':
            return (
              <InlineTextLink
                key={`${item.text}${idx.toString()}`}
                variant="small"
                onPress={() => openUrl(item.url || item.text)}
                style={{ marginBottom: space.small }}
                intent="primary"
              >
                {item.text}
              </InlineTextLink>
            );
          default:
            return (
              <Box
                marginBottom="small"
                alignItems="flex-start"
                flexDirection="row"
                key={`${item.text}${idx.toString()}`}
                paddingRight={getBoxPadding(item)}
                paddingLeft={defineLeftIndentation(item)}
              >
                {renderListItemSymbol(item)}
                <Typography.Body variant="small" style={item.extraStyles}>
                  <Typography.Body variant={item.fontWeight ? 'small-bold' : 'small'}>
                    {item.boldText ?? ''}
                  </Typography.Body>
                  {item.text}
                  {item.textBlocks?.map(textBlock => {
                    switch (textBlock.type) {
                      case 'link':
                        return (
                          <InlineTextLink
                            key={`${textBlock.text}`}
                            variant="small"
                            onPress={() => openUrl(textBlock.url ?? '')}
                            style={{ marginBottom: space.small }}
                            intent="primary"
                          >
                            {textBlock.text}
                          </InlineTextLink>
                        );
                      default:
                        return (
                          <Typography.Body
                            variant={textBlock.fontWeight ? 'small-bold' : 'small'}
                            key={textBlock.text}
                            style={textBlock.extraStyles}
                          >
                            {textBlock.text}
                          </Typography.Body>
                        );
                    }
                  })}
                  {item.textLink && (
                    <InlineTextLink
                      key={`${item.textLink}`}
                      variant="small"
                      onPress={() => openUrl((item.url || item.textLink) ?? '')}
                      style={{ marginBottom: space.small }}
                      intent="primary"
                    >
                      {item.textLink}
                    </InlineTextLink>
                  )}
                </Typography.Body>
              </Box>
            );
        }
      })}
    </>
  );
};

const LegalAgreementTermScreen = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp<'LegalAgreementTerm'>>();
  const isRebrand = useSessionStore().swagTextAndImageRebrandEnabled;
  const { bottom: bottomInset } = useSafeAreaInsets();

  const isUKcustomer = useCheckUKPermission();

  const { agreePrivacyPolicy, agreeTermsConditions } = useOnboardingStore(state => state);

  const [hasReadPrivacyPolicy, setReadPrivacyPolicy] = useState(false);
  const [hasReadTCs, setHasReadTCs] = useState(false);

  const { getNextProfileInputPage, setPersonalDetails } = useOnboardingStore();

  const [isLoading, setLoading] = useState(true);

  const ehOrgId = useSessionStore(state => state.currentOrgUuid ?? '');

  const isWorkZone = useIsWorkzone();

  const { token } = useGetSuperAppToken('LegalAgreementTermScreen');

  const { formatMessage } = useRegionLocalisation();

  const fillPersonalData = (data?: UserInitializationDetails) => {
    const { address, dateOfBirth, middleName, phoneNumber } = data || {};
    const structuredAddress = getStructuredAddress(address);
    const emptyAddress = {
      unitNumber: '',
      streetNumber: '',
      streetName: '',
      streetType: '',
      postcode: '',
      townOrCity: '',
      region: '',
      country: '',
      longForm: '',
    };
    setPersonalDetails({
      ...data,
      residentialAddress: structuredAddress || emptyAddress,
      middleName: middleName || undefined,
      phoneNumber: phoneNumber || undefined,
      dateOfBirth: dateOfBirth || undefined,
    });
    setLoading(false);
  };

  useGetKpUserInitializationDetailsQuery(
    {},
    {
      onSuccess: data => {
        if (isWorkZone) {
          fillPersonalData(data?.me?.kpUserInitializationDetails?.user || undefined);
        }
      },
      enabled: isWorkZone && !!token,
      onError: () => setLoading(false),
    }
  );

  useGetEhUserInitializationDetailsQuery(
    {
      orgId: ehOrgId || undefined,
    },
    {
      onSuccess: data => {
        if (!isWorkZone) {
          fillPersonalData(data?.me?.eHUserInitializationDetails?.user || undefined);
        }
      },
      enabled: !isWorkZone && !!token,
      onError: () => setLoading(false),
    }
  );

  const onConfirm = () => {
    if (isUKcustomer) {
      navigation.navigate(getNextProfileInputPage('TaxObligations'));
    } else {
      navigation.navigate('TaxObligations');
    }
  };

  const onAcceptPrivacyPolicy = () => {
    agreePrivacyPolicy();
    setReadPrivacyPolicy(true);
  };

  const onAcceptTCs = () => {
    agreeTermsConditions();
    setHasReadTCs(true);
  };

  const onBack = () => {
    navigation.goBack();
  };

  const getPolicyContent = () => {
    if (isRebrand) {
      return rebrandPrivacyPolicyContent;
    }

    return isUKcustomer ? EUUKPrivacyPolicyContent : privacyPolicyContent;
  };

  const getTCs = () => {
    if (isRebrand) {
      return rebrandTermsAndConditionsContent;
    }

    return isUKcustomer ? UKTermsAndConditionsContent : termsAndConditionsContent;
  };

  return (
    <>
      <CustomStatusBar />
      <Page.TopBar title="Legal agreement" hideRight onBack={onBack} />
      <Page style={{ paddingBottom: bottomInset }}>
        <Page.Title level={isUKcustomer ? 'h4' : 'h3'}>
          {formatMessage({ id: 'onboarding.tncScreen.title' })}
        </Page.Title>
        <Page.Footer justifyContent="flex-end" flex={1}>
          <Box testID="legal-box" marginTop="medium">
            <PolicyCheckbox
              testId="privacy-policy-next-btn"
              title="Privacy Policy"
              onAccepted={onAcceptPrivacyPolicy}
              customContent={<PolicyContent contents={getPolicyContent()} />}
              defaultDisableAcceptBtn={!isRebrand}
            />
            <Box marginTop="medium">
              <PolicyCheckbox
                testId="term-condition-next-btn"
                title="Terms and Conditions"
                onAccepted={onAcceptTCs}
                customContent={<PolicyContent contents={getTCs()} />}
                defaultDisableAcceptBtn={!isRebrand}
                customBtsTitle={isRebrand ? 'Spend Account Terms and Conditions' : undefined}
              />
            </Box>
          </Box>
          <Box marginTop="medium">
            <Button
              text="Next"
              testID="legal-agreement-next-btn"
              accessibilityLabel="Next"
              onPress={onConfirm}
              disabled={!hasReadTCs || !hasReadPrivacyPolicy}
            />
          </Box>
        </Page.Footer>
      </Page>
      {isLoading && <OverlayLoadingScreen />}
    </>
  );
};

export { LegalAgreementTermScreen };
