import type { Dispatch, SetStateAction } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { Linking, Platform, ScrollView } from 'react-native';
import { Alert, Box, Button, Icon, List, RefreshControl, Spinner, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomSheetRef } from '../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetView } from '../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetWithHD } from '../../../common/components/bottom-sheet/BottomSheetWithHD';
import { CustomBottomSheetView } from '../../../common/components/bottom-sheet/CustomBottomSheetView';
import { useBottomSheetDynamicSnapPoints } from '../../../common/components/bottom-sheet/useBottomSheetDynamicSnapPoints';
import { useSpendHPOnSwagCardVisiblity } from '../../../common/hooks/useHeroPointsVisibility';
import { useIsWalletSetupComplete } from '../../../common/hooks/useIsWalletSetupComplete';
import { queryClient } from '../../../common/libs/queryClient';
import { usePasscodeStore } from '../../../common/screens/passcode';
import { useToast } from '../../../common/shared-hooks/useToast';
import { useSessionStore } from '../../../common/stores/useSessionStore';
import { useTiming } from '../../../common/utils/animations';
import { topTabUtils } from '../../../navigation/utils';
import {
  useActivateCardMutation,
  useGetCurrentCardDetailsQuery,
  useGetCurrentCardMetaQuery,
  useGetEWalletUkCurrentPaymentCardDetailsQuery,
  useUpdateCardMetaMutation,
  type GetCurrentCardMetaQuery,
} from '../../../new-graphql/generated';
import { Region } from '../../../providers/LocalisationProvider/constants';
import { useIntl } from '../../../providers/LocalisationProvider/hooks/useIntl';
import { ReimburseHPBottomSheet } from '../../hero-points/components/ReimburseHPBottomSheet';
import { ReimburseWithHeroPointsToggle } from '../../hero-points/components/ReimburseWithHeroPointsToggle';
import { useGetWeavrAccessToken } from '../../onboarding/hooks/useGetWeavrAccessToken';
import { useShowCardInformationalAlertStore } from '../../spend-account/stores/useShowCardInformationalAlertStore';
import { CardSettingsUk } from '../components/CardSettingsUk';
import { SectionHeader } from '../components/SectionHeader';
import { SettingToggle } from '../components/SettingToggle';
import { UkWalletCardHeader } from '../components/UkWalletCardHeader';
import { WalletCardImage } from '../components/WalletCardImage';
import { useDigitalWalletStore } from '../digital-wallet/stores/useDigitalWalletStore';
import { AllPaymentCardStatus, useGetCurrentCardDetails } from '../hooks/useGetCurrentCardDetails';
import type { CardManagementScreenNavigationProp } from '../navigation/navigationType';
import { useRequestNewCardStore } from '../request-new-card/stores/useRequestNewCardStore';

export interface TooltipBsData {
  title: string;
  description: string;
}

const tooltipBsData: Record<'physicalCard' | 'cardManagement' | 'digitalCard' | 'paymentPreferences', TooltipBsData> = {
  physicalCard: {
    title: 'Physical card settings',
    description:
      'Disabling these toggles will only disable the functionality of your physical card. You can still use your digital card and make bank transfers or online payments.',
  },
  cardManagement: {
    title: 'Card management',
    description: `Cancel your current card and order a new one in 'Damaged, lost or stolen card'. Change the PIN associated with your current card in 'Reset card PIN'.`,
  },
  digitalCard: {
    title: 'Digital card settings',
    description:
      'These settings are related to Apple or Google Pay. They will not affect your physical card or your ability to make bank transfers.',
  },
  paymentPreferences: {
    title: 'Payment preferences',
    description:
      'Nominate your Hero Points to be automatically redeemed after making a purchase using your Swag Visa Debit card. Once a card transaction is settled (typically within 48 hours), your points will be redeemed and you’ll be reimbursed for the transaction.',
  },
};

export const CardManagementDashboardScreen = () => {
  const Intl = useIntl();
  const navigation = useNavigation<CardManagementScreenNavigationProp<'CardManagementDashboard'>>();
  const { colors, shadows, space } = useTheme();
  const bs = useRef<BottomSheetRef>(null);
  const tooltipBsRef = useRef<BottomSheetRef>(null);
  const reimburseHPbtsRef = useRef<BottomSheetRef>(null);
  const { accessToken } = useGetWeavrAccessToken();
  const {
    currentRegion,
    data: cardDetails,
    isError: isCardError,
    isFetching: isCardFetching,
    isLoading: isCardLoading,
  } = useGetCurrentCardDetails(accessToken);
  const [isCardActivated, setIsCardActivated] = useState(cardDetails?.status === AllPaymentCardStatus.Active);
  const { mutateAsync: mutateActivateCard } = useActivateCardMutation();
  const { mutateAsync: mutatePhysicalSetting } = useUpdateCardMetaMutation();
  const { canAddToWallet, isAddedToDigitalWallet } = useDigitalWalletStore(state => state);
  const { data: cardMetaData } = useGetCurrentCardMetaQuery();
  const [isActivatingCard, setIsActivatingCard] = useState(false);
  const Toast = useToast();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const haveOptimiseUpdate = useRef(false);
  const showActivationCardAlert = useRequestNewCardStore(state => state.showActivationCardAlert);
  const showResetPinAlert = useRequestNewCardStore(state => state.showResetPinAlert === true);
  const setShowCardActivationAlert = useRequestNewCardStore(state => state.setShowCardActivationAlert);
  const setShowResetPinAlert = useRequestNewCardStore(state => state.setShowResetPinAlert);
  // when showActivationCardAlert is undefined, default to show alert
  const shouldShowAlert = (showActivationCardAlert ?? true) && !isCardError && !isCardActivated;
  const shouldShowResetPinAlert = showResetPinAlert && !isCardError && !isCardActivated;
  const userID = useSessionStore(state => state.currentUser?.userID) ?? '';
  const { setShowCardInformationalAlert, showCardInformationalAlert } = useShowCardInformationalAlertStore();
  const { selectedTab } = topTabUtils;
  const currentCardDetailsQueryKey =
    currentRegion === Region.au
      ? useGetCurrentCardDetailsQuery.getKey()
      : useGetEWalletUkCurrentPaymentCardDetailsQuery.getKey({ accessToken });

  // toggle state
  const {
    contactless: contactlessCache,
    frozen: frozenCache,
    magStrip: magStripCache,
    mobileWalletPaymentEnabled: mobileWalletPaymentCache,
  } = cardMetaData?.me?.wallet?.card?.meta ?? {
    contactless: false,
    frozen: true,
    magStrip: false,
    mobileWalletPaymentEnabled: false,
  };

  const [enablePhysicalCard, setEnablePhysicalCard] = useState(!frozenCache ?? false);
  const [enableMobileWallet, setEnableMobileWallet] = useState(mobileWalletPaymentCache ?? false);
  const [contactless, setContactless] = useState(contactlessCache ?? false);
  const [magStrip, setMagStrip] = useState(magStripCache ?? false);
  const progressEnable = useTiming(isCardActivated && enablePhysicalCard);
  const aHeight = useSharedValue(0);
  const setRequirePasscode = usePasscodeStore(state => state.setRequirePasscode);
  const [tooltipBs, setTooltipBs] = useState(tooltipBsData.physicalCard);

  const {
    animatedContentHeight,
    animatedHandleHeight,
    animatedSnapPoints,
    contentContainerHeightStyle,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(true);

  const spendHDOnSwagCardPermission = useSpendHPOnSwagCardVisiblity();
  const { isWalletSetupComplete } = useIsWalletSetupComplete();

  useEffect(() => {
    if (showCardInformationalAlert[userID] && selectedTab === 'card-tab') {
      setShowCardInformationalAlert(userID, false);
    }
  }, [showCardInformationalAlert, selectedTab, userID]);

  useEffect(() => {
    const metaData = cardMetaData?.me?.wallet?.card?.meta;
    if (metaData && !haveOptimiseUpdate.current) {
      // prevent this update when having haveOptimiseUpdate
      haveOptimiseUpdate.current = false;
      const {
        contactless: cardContactless,
        frozen,
        magStrip: cardMagStrip,
        mobileWalletPaymentEnabled: mobileWallet,
      } = metaData;
      setEnablePhysicalCard(!frozen);
      setContactless(cardContactless ?? false);
      setMagStrip(cardMagStrip ?? false);
      setEnableMobileWallet(mobileWallet ?? false);
    }
  }, [cardMetaData]);

  const animatedPhysicalSettingStyle = useAnimatedStyle(() => {
    return {
      height: isCardActivated ? progressEnable.value * aHeight.value : 0,
    };
  }, [isCardActivated]);

  useEffect(() => {
    // reset animation to close state, handle fail case
    // active -> inactive -> active
    if (!isCardActivated && enablePhysicalCard) {
      aHeight.value = 0;
      setEnablePhysicalCard(false);
    }
  }, [enablePhysicalCard, isCardActivated]);

  const labelPhysicalCardEnable = enablePhysicalCard ? 'Card is enabled' : 'Card is disabled';
  const labelDigitalCardEnable = `${Platform.OS === 'ios' ? 'Apple' : 'Google'} Pay is ${
    enableMobileWallet ? 'enabled' : 'disabled'
  }`;
  const labelContactless = contactless ? 'You can make contactless payments.' : 'Contactless payments are disabled.';
  const labelMagstrip = magStrip ? 'You can swipe your card at terminal.' : 'Swipe is disabled.';

  const onCloseWarning = () => {
    setShowCardActivationAlert(false);
  };

  const onCloseResetPinAlert = () => {
    setShowResetPinAlert(false);
  };

  const activeCard = async () => {
    setIsActivatingCard(true);
    let isActivationFailed = false;
    try {
      const { card } = await mutateActivateCard({});
      if (card?.activate?.success) {
        queryClient.invalidateQueries(useGetCurrentCardDetailsQuery.getKey());
        queryClient.invalidateQueries(useGetCurrentCardMetaQuery.getKey());
        haveOptimiseUpdate.current = false;
      }
      isActivationFailed = !card?.activate?.success;
    } catch {
      isActivationFailed = true;
    }

    if (isActivationFailed) {
      Toast.show({
        content: 'Sorry, we could not activate your card. Please try again later.',
      });
    } else {
      setIsActivatingCard(false);
      setIsCardActivated(true);
      setShowCardActivationAlert(false);
    }
  };

  const closeOrShowActivateCardConfirmation = (isShow: boolean) => {
    if (isShow) {
      bs.current?.open();
      return;
    }

    bs.current?.close();
    setRequirePasscode(true, () => {
      activeCard();
    });
  };

  const goToResetCardFlow = () => {
    navigation.navigate('CardSetupStack', {
      screen: 'PinSetupStack',
      params: {
        screen: 'ChoosePin',
        params: {
          header: 'Reset card PIN',
          title: 'Choose a new PIN.',
          repeatedPinScreen: {
            header: 'Reset card PIN',
            title: 'Repeat your PIN.',
            onPinVerifiedSuccess: pin => {
              navigation.navigate('CardSetupStack', { screen: 'Loading', params: { pin } });
            },
          },
        },
      },
    });
  };

  const resetCardPin = () => {
    setRequirePasscode(true, goToResetCardFlow);
  };

  const goToRecoverCard = () => {
    setRequirePasscode(true, () => {
      navigation.navigate('RequestNewCardStack', { screen: 'ReportCard' });
    });
  };

  useEffect(() => {
    const gotCardActivated = cardDetails?.status === AllPaymentCardStatus.Active;
    setIsCardActivated(gotCardActivated);
  }, [cardDetails?.status]);

  const optimiseUpdate = async (
    key: 'contactless' | 'magStrip' | 'frozen' | 'mobileWalletPaymentEnabled',
    value: boolean
  ) => {
    haveOptimiseUpdate.current = true;
    const queryKey = useGetCurrentCardMetaQuery.getKey();
    await queryClient.cancelQueries(queryKey);
    queryClient.setQueryData(
      queryKey,
      (old: GetCurrentCardMetaQuery | undefined): GetCurrentCardMetaQuery => ({
        ...old,
        me: {
          ...old?.me,
          wallet: {
            ...old?.me?.wallet,
            card: {
              ...old?.me?.wallet?.card,
              meta: {
                ...old?.me?.wallet?.card?.meta,
                [key]: value,
                id: old?.me?.wallet?.card?.meta?.id ?? '',
              },
            },
          },
        },
      })
    );
  };

  const updateCardMeta = async (
    oldVal: boolean,
    newVal: boolean,
    setStateAction: Dispatch<SetStateAction<boolean>>,
    key: 'contactless' | 'magStrip' | 'frozen' | 'mobileWalletPaymentEnabled'
  ) => {
    // frozen is opposite
    let result = newVal;
    if (key === 'frozen') {
      result = !newVal;
    }
    setStateAction(newVal);
    try {
      const { card } = await mutatePhysicalSetting({ cardMeta: { [key]: result } });
      if (card?.updateMeta?.success) {
        // optimise update cache of react-query
        optimiseUpdate(key, result);
      }
    } catch {
      // failed, return to original value
      Toast.show({
        content: 'Sorry, we could not process your request. Try again later.',
      });
      setStateAction(oldVal);
    }
  };

  const onEnable = (isOn: boolean) => {
    updateCardMeta(enablePhysicalCard, isOn, setEnablePhysicalCard, 'frozen');
  };

  const onContactless = (isOn: boolean) => {
    updateCardMeta(contactless, isOn, setContactless, 'contactless');
  };

  const onMagstrip = (isOn: boolean) => {
    updateCardMeta(magStrip, isOn, setMagStrip, 'magStrip');
  };

  const onMobileWallet = (isOn: boolean) => {
    updateCardMeta(enableMobileWallet, isOn, setEnableMobileWallet, 'mobileWalletPaymentEnabled');
  };

  const onNavigateToCardSettings = () => {
    navigation.navigate('DigitalWalletStack', { screen: 'DigitalWalletSetup', params: { isOnboarding: false } });
  };

  const openWallet = () => {
    try {
      if (Platform.OS === 'ios') {
        Linking.openURL('shoebox://');
      }
      Linking.openURL('https://www.android.com/payapp/');
    } catch (error) {
      Toast.show({
        content: 'Sorry, we could not open wallet. Try again later.',
      });
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([
      queryClient.invalidateQueries(currentCardDetailsQueryKey),
      queryClient.invalidateQueries(useGetCurrentCardMetaQuery.getKey()),
    ]).finally(() => setRefreshing(false));
  };

  const renderPhysicalSetting = () => {
    return (
      <Box testID="physical_setting_con">
        <SectionHeader
          title="Physical card"
          onIconPress={() => {
            setTooltipBs(tooltipBsData.physicalCard);
            tooltipBsRef.current?.open();
          }}
        />
        <Box flexDirection="column" paddingHorizontal="medium" paddingTop="large">
          <SettingToggle
            marginBottom="large"
            variant="regular-bold"
            onChange={onEnable}
            label={labelPhysicalCardEnable}
            value={enablePhysicalCard}
            testID="toggle card enable"
          />
          <Animated.View style={[{ overflow: 'hidden' }, animatedPhysicalSettingStyle]}>
            <Box style={{ height: 1500 }}>
              <Box
                onLayout={({
                  nativeEvent: {
                    layout: { height: h },
                  },
                }) => {
                  aHeight.value = h;
                }}
              >
                <SettingToggle
                  borderTopWidth="base"
                  borderColor="defaultSurface"
                  paddingTop="medium"
                  onChange={onContactless}
                  label={labelContactless}
                  value={contactless}
                />
                <SettingToggle marginVertical="large" onChange={onMagstrip} label={labelMagstrip} value={magStrip} />
              </Box>
            </Box>
          </Animated.View>
        </Box>
      </Box>
    );
  };

  const renderCardManagement = () => {
    return (
      <>
        <SectionHeader
          title="Card management"
          onIconPress={() => {
            setTooltipBs(tooltipBsData.cardManagement);
            tooltipBsRef.current?.open();
          }}
        />
        <Box paddingHorizontal="medium">
          <Box marginTop="large">
            <List.Item
              variant="card"
              title={
                <Typography.Body variant="regular" style={{ marginLeft: space.smallMedium }}>
                  Damaged, lost or stolen card
                </Typography.Body>
              }
              suffix={<Icon icon="arrow-right" intent="primary" />}
              onPress={goToRecoverCard}
              testID="Damaged, lost or stolen card"
            />
          </Box>
          <Box marginTop="large">
            <List.Item
              variant="card"
              title={
                <Typography.Body variant="regular" style={{ marginLeft: space.smallMedium }}>
                  Reset card PIN
                </Typography.Body>
              }
              suffix={<Icon icon="arrow-right" intent="primary" />}
              onPress={resetCardPin}
              testID="Reset card PIN"
            />
          </Box>
        </Box>
      </>
    );
  };

  const renderDigitalCard = () => {
    return (
      <>
        <SectionHeader
          title="Digital card"
          onIconPress={() => {
            setTooltipBs(tooltipBsData.digitalCard);
            tooltipBsRef.current?.open();
          }}
        />
        <Box paddingHorizontal="medium">
          <Box marginVertical="large">
            {isAddedToDigitalWallet ? (
              <>
                <SettingToggle
                  marginBottom="large"
                  variant="regular-bold"
                  onChange={onMobileWallet}
                  label={labelDigitalCardEnable}
                  value={enableMobileWallet}
                />
                <List.Item
                  variant="card"
                  title={
                    <Typography.Body variant="regular" style={{ marginLeft: space.smallMedium }}>
                      {Platform.OS === 'ios' ? 'Available in Apple Wallet' : 'Edit card in Google Wallet'}
                    </Typography.Body>
                  }
                  suffix={<Icon icon="arrow-right" intent="primary" />}
                  onPress={openWallet}
                  testID={Platform.OS === 'ios' ? 'Available in Apple Wallet' : 'Edit card in Google Wallet'}
                />
              </>
            ) : (
              <List.Item
                variant="card"
                title={
                  <Typography.Body variant="regular" style={{ marginLeft: space.smallMedium }}>
                    {`Add card to ${Platform.OS === 'ios' ? 'Apple' : 'Google'} Wallet`}
                  </Typography.Body>
                }
                suffix={<Icon icon="arrow-right" intent="primary" />}
                onPress={onNavigateToCardSettings}
                testID={`Add card to ${Platform.OS === 'ios' ? 'Apple' : 'Google'} Wallet`}
              />
            )}
          </Box>
        </Box>
      </>
    );
  };

  const renderPaymentPreferences = () => {
    return (
      <>
        <SectionHeader
          title={Intl.formatMessage({ id: 'points.reimburseWithHeroPoints' })}
          onIconPress={() => {
            reimburseHPbtsRef.current?.open();
          }}
        />
        <Box paddingHorizontal="medium">
          <Box marginVertical="large">
            <ReimburseWithHeroPointsToggle
              style={{ backgroundColor: colors.defaultGlobalSurface, ...shadows.default }}
              content={Intl.formatMessage({ id: 'points.reimburseSwagCardWithHeroPoints' })}
            />
          </Box>
        </Box>
      </>
    );
  };

  const displayToastContent = (content: string) => {
    Toast.show({
      content,
    });
  };

  const displayInfoTooltip = (data: TooltipBsData) => {
    setTooltipBs(data);
    tooltipBsRef.current?.open();
  };

  const renderSettings = () => {
    // Should display spinner either if
    // 1. Card is being loaded / refetched
    // 2. User's country is being loaded
    // 3. UK user only: Weavr access token is being obtained
    const isLoading =
      isCardLoading || isCardFetching || !currentRegion || (currentRegion === Region.gb && !accessToken);

    if (isLoading) {
      return <Spinner accessibilityLabel="spinner" size="small" />;
    }

    switch (currentRegion) {
      case Region.gb:
        if (!cardDetails) {
          return null;
        }

        return (
          <CardSettingsUk
            isCardBlocked={cardDetails?.status === AllPaymentCardStatus.Blocked}
            isCardLoading={isCardLoading || isCardFetching}
            displayToastContent={displayToastContent}
            displayInfoTooltip={displayInfoTooltip}
            cardId={cardDetails?.id ?? ''}
            accessToken={accessToken}
          />
        );
      default:
        return (
          <Box flex={1}>
            {shouldShowResetPinAlert && (
              <Box
                paddingHorizontal="medium"
                flex={1}
                accessibilityLabel="Received your card warning"
                marginTop="large"
              >
                <Alert
                  content="Please reset your PIN before you activate your new card."
                  intent="error"
                  onClose={onCloseResetPinAlert}
                />
              </Box>
            )}
            {shouldShowAlert && (
              <Box
                paddingHorizontal="medium"
                flex={1}
                accessibilityLabel="Received your card warning"
                marginTop="large"
              >
                <Alert
                  content="Please ensure you have received your card in the mail before you activate it."
                  intent="warning"
                  onClose={onCloseWarning}
                />
              </Box>
            )}
            {!isCardActivated && !isCardError ? (
              <Button
                style={{ marginHorizontal: space.medium, marginVertical: space.large }}
                onPress={() => closeOrShowActivateCardConfirmation(true)}
                accessibilityLabel="Activate physical card"
                text="Activate physical card"
                loading={isActivatingCard}
              />
            ) : (
              renderPhysicalSetting()
            )}
            {(canAddToWallet || isAddedToDigitalWallet) && renderDigitalCard()}
            {isWalletSetupComplete && spendHDOnSwagCardPermission && renderPaymentPreferences()}
            {renderCardManagement()}
          </Box>
        );
    }
  };

  return (
    <Box flex={1}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: bottomInset + space.medium,
        }}
        style={{ flex: 1, backgroundColor: colors.neutralGlobalSurface }}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        testID="card-management-screen"
      >
        {currentRegion === Region.gb ? (
          <>
            {!accessToken ? (
              <Box justifyContent="center" alignItems="center" marginTop="xxxlarge" flex={1}>
                <Spinner accessibilityLabel="Spinner" intent="primary" />
              </Box>
            ) : (
              <>
                <UkWalletCardHeader
                  isCardActivated={isCardActivated}
                  isFirstTime={cardDetails?.status === AllPaymentCardStatus.AwaitingActivation}
                  accessToken={accessToken}
                />
                {renderSettings()}
              </>
            )}
          </>
        ) : (
          <>
            <WalletCardImage
              enablePhysicalCard={enablePhysicalCard}
              isCardActivated={isCardActivated}
              isFirstTime={cardDetails?.status === AllPaymentCardStatus.AwaitingActivation}
              currentRegion={currentRegion ?? Region.au}
            />
            {renderSettings()}
          </>
        )}
      </ScrollView>
      <BottomSheetWithHD
        ref={bs}
        title="Do you have your card?"
        actions={[{ title: 'Confirm', onPress: () => closeOrShowActivateCardConfirmation(false) }]}
        handleIconName="cancel"
        handleIconIntent="text"
        handleIconSize="xsmall"
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
      >
        <BottomSheetView style={contentContainerHeightStyle} onLayout={handleContentLayout}>
          <Typography.Body
            variant="regular"
            testID="ref_confirmation_text"
            style={{ marginHorizontal: space.large, marginTop: space.small, marginBottom: space.medium }}
          >
            We want to make sure your card is in safe hands before you activate it. Please confirm you have received it.
          </Typography.Body>
        </BottomSheetView>
      </BottomSheetWithHD>
      <CustomBottomSheetView
        actions={[
          {
            title: 'Done',
            onPress: () => tooltipBsRef.current?.close(),
            testID: 'done_btn',
          },
        ]}
        icon="cancel"
        iconSize="xsmall"
        content={() => (
          <Box paddingHorizontal="large" paddingVertical="small">
            <Typography.Body variant="regular">{tooltipBs.description}</Typography.Body>
          </Box>
        )}
        title={tooltipBs.title}
        bsRef={tooltipBsRef}
      />
      <ReimburseHPBottomSheet ref={reimburseHPbtsRef} />
    </Box>
  );
};
