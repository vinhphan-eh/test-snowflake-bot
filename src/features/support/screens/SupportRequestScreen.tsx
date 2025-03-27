import React, { useRef, useState } from 'react';
import type { ScrollView } from 'react-native';
import { Box, Button, Spinner, TextInput, Typography, useTheme as useHDTheme } from '@hero-design/rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { version } from '../../../../package.json';
import { KeyboardAvoidingViewContainer } from '../../../common/components/layout';
import { Page } from '../../../common/components/layout/page';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import TouchOutsideDismissKeyboard from '../../../common/components/touch-dismiss-keyboard';
import { useEbfCountry } from '../../../common/hooks/useEbfCountry';
import { useIsWorkzone } from '../../../common/hooks/useIsWorkzone';
import { useMixpanel } from '../../../common/hooks/useMixpanel';
import { EventTrackingCategory } from '../../../common/stores/useSessionStore';
import { getBrand, getModel, getSystemVersion } from '../../../common/utils/deviceInfo';
import { useCreateComplaintTicketMutation } from '../../../new-graphql/generated';
import { CLICK_ON_SUBMIT, SETTINGS_MODULE } from '../constants/mixpanel';
import { useAccessToken } from '../hooks/useAccessToken';
import type {
  FormScreenRouteProp,
  RequestFormProps,
  RequestOutcomeProps,
  SupportStackNavigationProp,
} from '../navigation/navigationTypes';

export type SupportedComplaintFeature = 'Money_SwagSpendAccount' | 'Money_BillManagement';

export const mappedComplaintFeature: Record<
  SupportedComplaintFeature,
  { topBarTitle: string; formTitle: string; formInstructions: string }
> = {
  Money_SwagSpendAccount: {
    topBarTitle: 'Spend account complaints',
    formTitle: "We're sorry you're not satisfied with your Swag Spend account.",
    formInstructions:
      'If you would like to make a formal complaint, please provide details including the product or service in question, what went wrong and how we can make things right.',
  },
  Money_BillManagement: {
    topBarTitle: 'Bills Management complaints',
    formTitle: "We're sorry you're not satisfied with your Bill Management.",
    formInstructions:
      'If you would like to make a formal complaint, please provide details including the product or service in question, what went wrong and how we can make things right.',
  },
};

export const SupportRequestScreen = () => {
  const navigation = useNavigation<SupportStackNavigationProp<'Request'>>();
  const route = useRoute<FormScreenRouteProp<'Request'>>();
  const { feature, type } = route.params;
  const deviceInfo = `${getBrand()} ${getModel()}`;
  const ebenToken = useAccessToken();
  const { colors: hdColors } = useHDTheme();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);
  const [description, setDescription] = useState('');
  const { eventTracking } = useMixpanel();
  const { isLoading, mutateAsync: createTicket } = useCreateComplaintTicketMutation();

  const isWorkzone = useIsWorkzone();
  const { ehCountryCode, isLoadingEhCountry, workzoneCountryCode } = useEbfCountry();
  const { formInstructions, formTitle, topBarTitle } = mappedComplaintFeature[feature];

  const requestTopBarTitles: Record<RequestFormProps['type'], string> = {
    Complaint: topBarTitle,
  };

  const requestFormTitles: Record<RequestFormProps['type'], string> = {
    Complaint: formTitle,
  };

  const requestFormInstructions: Record<RequestFormProps['type'], string> = {
    Complaint: formInstructions,
  };

  const successOutcomeScreenMap: Record<RequestFormProps['type'], RequestOutcomeProps> = {
    Complaint: {
      message: 'Your complaint has been submitted.',
      description: 'Our team will look into it and get back to you soon via email.',
      image: 'snailMoney',
    },
  };

  const goBack = () => {
    navigation.goBack();
  };

  const submitComplaintForm = async () => {
    try {
      eventTracking({
        event: CLICK_ON_SUBMIT,
        categoryName: EventTrackingCategory.USER_ACTION,
        metaData: {
          module: SETTINGS_MODULE,
        },
      });

      const complaintFormParameter = {
        description,
        country: (isWorkzone ? workzoneCountryCode : ehCountryCode) ?? 'AU',
        deviceTypeModel: deviceInfo,
        appVersion: version,
        OSVersion: getSystemVersion(),
        feature,
      };

      const createTicketResult = await createTicket({
        input: complaintFormParameter,
      });

      if (createTicketResult?.createComplaintTicket.success) {
        navigation.replace('RequestOutcome', successOutcomeScreenMap[type]);
      } else {
        navigation.replace('GeneralError');
      }
    } catch {
      navigation.replace('GeneralError');
    }
  };

  const loadingScreen = () => {
    return (
      <Box justifyContent="center" alignItems="center" backgroundColor="disabledOnDefaultGlobalSurface" flex={1}>
        <Spinner size="small" testID="webview-spinner" />
      </Box>
    );
  };

  if (!ebenToken || isLoadingEhCountry) {
    return loadingScreen();
  }

  const onFocus = () => {
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 250);
  };

  return (
    <KeyboardAvoidingViewContainer>
      <CustomStatusBar />
      <Page.TopBar title={requestTopBarTitles[type]} onBack={goBack} hideRight />
      <TouchOutsideDismissKeyboard testID="textfield-dissmiss-wrapper">
        <Page ref={scrollViewRef} style={{ paddingBottom: bottomInset }}>
          <Page.Title>{requestFormTitles[type]}</Page.Title>
          <Page.Body>
            {requestFormInstructions[type] && (
              <Box marginBottom="large">
                <Typography.Body variant="regular">{requestFormInstructions[type]}</Typography.Body>
              </Box>
            )}
            <TextInput
              multiline
              numberOfLines={4}
              autoComplete="off"
              textAlignVertical="top"
              placeholder="Description"
              testID="support-request-textarea"
              variant="textarea"
              style={{ backgroundColor: hdColors.defaultGlobalSurface }}
              onFocus={onFocus}
              onChangeText={text => {
                setDescription(text);
              }}
            />
          </Page.Body>
          <Page.Footer>
            <Button
              style={{ width: '100%', zIndex: 100, bottom: 0 }}
              text="Submit"
              onPress={submitComplaintForm}
              loading={isLoading}
              disabled={!description}
              testID="button-submit-complaint-form"
            />
          </Page.Footer>
        </Page>
      </TouchOutsideDismissKeyboard>
    </KeyboardAvoidingViewContainer>
  );
};
