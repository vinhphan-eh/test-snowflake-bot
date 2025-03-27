import React, { useEffect } from 'react';
import type { ContentCard } from '@braze/react-native-sdk';
import { DeepLinkEvent, NotificationEvent } from '@ehrocks/react-native-superapp-communication';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import type Config from 'react-native-config';
import { QueryClientProvider } from 'react-query';
import { clearEbenToken } from './common/auth/services/ebenToken';
import { setEbenTokenStatus } from './common/auth/store/ebenTokenStore';
import { useSSOStore, type SSOStoreData } from './common/auth/store/useSSOStore';
import type { SuperAppTokenUtilsType } from './common/auth/store/useSuperAppTokenStore';
import { useSuperAppTokenStore } from './common/auth/store/useSuperAppTokenStore';
import { useBrazeStore } from './common/braze/stores/useBrazeStore';
import { ConfettiProvider } from './common/components/confetti/ConfettiProvider';
import { storePendingDeepLink } from './common/deep-link/usePendingDeepLinkStore';
import { queryClient } from './common/libs/queryClient';
import { AppDataStorage } from './common/libs/storage/appDataStorage';
import { storePendingOpenedNotification } from './common/notification/useNotificationStore';
import type { PasscodeValidateParams } from './common/screens/passcode';
import PasscodeModal, { usePasscodeStore } from './common/screens/passcode';
import { useAppSwitcherStore } from './common/stores/useAppSwitcherStore';
import { useListenerToSwitchPillar, useMiniAppSwitcherStore } from './common/stores/useMiniAppSwitcherStore';
import type { PermissionData } from './common/stores/usePermissionStore';
import { usePermissionStore } from './common/stores/usePermissionStore';
import type {
  CurrentSessionUser,
  KpRelation,
  LogOutParams,
  MixpanelTracking,
  PillarIds,
  SwagUserType,
} from './common/stores/useSessionStore';
import { useSessionStore } from './common/stores/useSessionStore';
import { InstapayExpPopupProvider } from './features/income/instapay/components/instapay-exp-popup/InstapayExpPopupProvider';
import PermissionProvider from './PermissionProvider';
import CountryPickerProvider from './providers/CountryPickerProvider';
import LocalisationProvider from './providers/LocalisationProvider';

interface Props {
  children: React.ReactNode;
  // Is root nav bar shown or not
  appSwitcherVisibility?: boolean;
  // Show or hide root app nav bar
  setAppSwitcherVisibility?: (visible: boolean) => void;
  // Superapp log out
  superAppLogout?: (params: LogOutParams) => void;
  // current session user
  currentUser?: CurrentSessionUser;
  /**
   * validate passcode
   */
  passcodeValidate?: (params: PasscodeValidateParams) => void;
  mixpanelTracking: MixpanelTracking;
  /**
   * swag user type: current_employee, non_current_employee, random_user, pending_employee
   */
  swagUserType?: SwagUserType;
  /**
   * current org id
   */
  currentOrgId?: string;
  /**
   * current workzone org id
   */
  currentWorkzoneOrgId?: number;
  /**
   * current member id
   */
  memberId?: string;
  /**
   * country code from workzone app
   */
  workzoneCountryCode?: string;
  /**
   * set current pillar
   */
  setPillar?: (id: PillarIds) => void;
  /**
   * current pillar
   */
  currentPillar?: PillarIds;
  /**
   * show feedback prompt
   */
  handleFeedbackPrompt?: (event: string) => void;
  handleInternalRatingPrompt?: (event: string) => void;
  /**
   * kp relations from metadata lite
   */
  kpMetadatalite?: Array<KpRelation>;
  /**
   * fetch valid token, auto refresh when expire
   */
  superAppTokenUtils?: SuperAppTokenUtilsType;
  /**
   * is loading kp metadata lite
   */
  isLoadingKpMetadataLite?: boolean;
  /**
   * @deprecated
   * must not use this, for testing only
   */
  overridePermissionForTESTING_ONLY?: PermissionData;
  /**
   * current org uuid
   */
  currentOrgUuid?: string;
  /**
   * EH session status
   */
  sessionStatus?: string;
  ssoUtils?: SSOStoreData;
  brazeManager?: {
    contentCards: Array<ContentCard> | undefined;
    requestContentCardsRefresh: () => Promise<Array<ContentCard>>;
  };
  swagRebrandEnabled?: boolean;
  swagTextAndImageRebrandEnabled?: boolean;
  getEnvironmentConfig?: () => typeof Config;
  darkModeEnabled?: boolean;
}

export const RootProvider = ({
  appSwitcherVisibility,
  brazeManager,
  children,
  currentOrgId,
  currentOrgUuid,
  currentPillar,
  currentUser,
  currentWorkzoneOrgId,
  darkModeEnabled,
  getEnvironmentConfig,
  handleFeedbackPrompt,
  handleInternalRatingPrompt,
  isLoadingKpMetadataLite,
  kpMetadatalite,
  memberId,
  mixpanelTracking,
  overridePermissionForTESTING_ONLY,
  passcodeValidate,
  sessionStatus,
  setAppSwitcherVisibility,
  setPillar,
  ssoUtils,
  superAppLogout,
  superAppTokenUtils,
  swagRebrandEnabled,
  swagTextAndImageRebrandEnabled,
  swagUserType,
  workzoneCountryCode,
}: Props) => {
  useListenerToSwitchPillar();
  useEffect(() => {
    useAppSwitcherStore.setState({
      isVisible: appSwitcherVisibility,
    });
  }, [appSwitcherVisibility]);

  useEffect(() => {
    useAppSwitcherStore.setState({
      toggleVisibility: setAppSwitcherVisibility,
    });
  }, [setAppSwitcherVisibility]);

  useEffect(() => {
    useSessionStore.setState({
      superAppLogout,
    });
  }, [superAppLogout]);

  useEffect(() => {
    useSessionStore.setState({
      currentUser,
    });
  }, [currentUser]);

  useEffect(() => {
    useSessionStore.setState({
      setPillar,
    });
  }, [setPillar]);

  useEffect(() => {
    if (currentUser?.userID) {
      AppDataStorage.userId = currentUser?.userID;
    }
  }, [currentUser?.userID]);

  useEffect(() => {
    usePasscodeStore.setState({
      passcodeValidate,
    });
  }, [passcodeValidate]);

  useEffect(() => {
    useSessionStore.setState({
      mixpanelTracking,
    });
  }, [mixpanelTracking]);

  useEffect(() => {
    useSessionStore.setState({
      swagUserType,
    });
  }, [swagUserType]);

  useEffect(() => {
    useSessionStore.setState({
      currentOrgId,
    });
  }, [currentOrgId]);

  useEffect(() => {
    useSessionStore.setState({ currentWorkzoneOrgId });
  }, [currentWorkzoneOrgId]);

  useEffect(() => {
    useSessionStore.setState({
      currentOrgUuid,
    });
  }, [currentOrgUuid]);

  useEffect(() => {
    useSessionStore.setState({
      workzoneCountryCode,
    });
  }, [workzoneCountryCode]);

  useEffect(() => {
    useSessionStore.setState({
      handleFeedbackPrompt,
    });
  }, [handleFeedbackPrompt]);

  useEffect(() => {
    useSessionStore.setState({
      handleInternalRatingPrompt,
    });
  }, [handleInternalRatingPrompt]);

  useEffect(() => {
    useSessionStore.setState({
      kpMetadatalite,
    });
  }, [kpMetadatalite]);

  useEffect(() => {
    useSessionStore.setState({
      isLoadingKpMetadataLite,
    });
  }, [isLoadingKpMetadataLite]);

  useEffect(() => {
    useSessionStore.setState({
      sessionStatus,
    });
    // whenever session status changes, clear the eben token
    // this is to ensure that the token is always up to date
    // first exchange success -> store {access_token, refresh_token}
    // if session status changes, it means the stored response will become invalid
    // so we need to clear it, the stored response checks validity based on decodedToken.exp, so it can't check itself in this case
    clearEbenToken();
  }, [sessionStatus]);

  useEffect(() => {
    DeepLinkEvent.addOpenDeepLinkListener(storePendingDeepLink);
    NotificationEvent.addOpenNotificationListener(storePendingOpenedNotification);
  }, []);

  useEffect(() => {
    if (superAppTokenUtils) {
      setEbenTokenStatus('can_exchange');
      useSuperAppTokenStore.setState(superAppTokenUtils);
    }
  }, [superAppTokenUtils]);

  useEffect(() => {
    if (overridePermissionForTESTING_ONLY) {
      usePermissionStore.setState({ overridePermissionForTESTING_ONLY });
    }
  }, [overridePermissionForTESTING_ONLY]);

  useEffect(() => {
    if (currentPillar) {
      useMiniAppSwitcherStore.setState({
        currentPillar,
      });
    }
  }, [currentPillar]);

  useEffect(() => {
    if (memberId) {
      useSessionStore.setState({ memberId });
    }
  }, [memberId]);

  useEffect(() => {
    if (ssoUtils) {
      useSSOStore.setState({ ...ssoUtils });
    }
  }, [ssoUtils]);

  useEffect(() => {
    if (brazeManager) {
      useBrazeStore.setState({
        cards: brazeManager.contentCards,
        requestContentCardsRefresh: brazeManager.requestContentCardsRefresh,
      });
    }
  }, [brazeManager]);

  useEffect(() => {
    if (swagRebrandEnabled) {
      useSessionStore.setState({
        swagRebrandEnabled,
      });
    }
  }, [swagRebrandEnabled]);

  useEffect(() => {
    if (swagTextAndImageRebrandEnabled) {
      useSessionStore.setState({
        swagTextAndImageRebrandEnabled,
      });
    }
  }, [swagTextAndImageRebrandEnabled]);

  useEffect(() => {
    if (getEnvironmentConfig) {
      useSessionStore.setState({
        getEnvConfig: getEnvironmentConfig,
      });
    }
  }, [getEnvironmentConfig]);

  useEffect(() => {
    useSessionStore.setState({
      darkModeEnabled,
    });
  }, [darkModeEnabled]);

  return (
    <QueryClientProvider client={queryClient}>
      <PermissionProvider memberId={memberId} currentOrgId={currentOrgId}>
        <LocalisationProvider>
          <BottomSheetModalProvider>
            <CountryPickerProvider>
              <InstapayExpPopupProvider>
                <ConfettiProvider>{children}</ConfettiProvider>
              </InstapayExpPopupProvider>
            </CountryPickerProvider>
            <PasscodeModal />
          </BottomSheetModalProvider>
        </LocalisationProvider>
      </PermissionProvider>
    </QueryClientProvider>
  );
};
