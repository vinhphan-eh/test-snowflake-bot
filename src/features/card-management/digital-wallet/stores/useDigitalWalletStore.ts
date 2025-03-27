import { Platform } from 'react-native';
import type {
  GooglePayTokenInfo,
  MppCardDataParameters,
  MppInitializeOemTokenizationResponseData,
  UserAddress,
} from '@meawallet/react-native-mpp';
import MeaPushProvisioning, { GooglePayTokenState } from '@meawallet/react-native-mpp';
import { create } from 'zustand';
import { getSystemVersion } from '../../../../common/utils/deviceInfo';

interface DigitalWalletState {
  canAddToWallet: boolean;
  isAddedToDigitalWallet: boolean;
  applePayTokenInfo: MppInitializeOemTokenizationResponseData | undefined;
  googlePayTokenInfo: GooglePayTokenInfo | undefined;
  mppCardParamaters: MppCardDataParameters | undefined;
  setAddedToDigitalWallet: (value: boolean) => void;
  getDigitalWalletStatus: (mppCardParamaters: MppCardDataParameters) => Promise<void>;
  addCardToDigitalWallet: (cardDisplayName: string, cardUserAddress: UserAddress) => Promise<void>;
}

const useDigitalWalletStore = create<DigitalWalletState>()((set, get) => ({
  canAddToWallet: false,
  isAddedToDigitalWallet: false,
  mppCardParamaters: undefined,
  applePayTokenInfo: undefined,
  googlePayTokenInfo: undefined,
  setAddedToDigitalWallet: (value: boolean) => {
    set({ isAddedToDigitalWallet: value });
  },
  getDigitalWalletStatus: async (mppCardParamaters: MppCardDataParameters) => {
    set({ mppCardParamaters });
    // Apple Pay
    if (Platform.OS === 'ios') {
      const systemVersion = parseFloat(getSystemVersion());
      const isPassLibraryAvailable = await MeaPushProvisioning.ApplePay.isPassLibraryAvailable();
      const canAddPaymentPass = await MeaPushProvisioning.ApplePay.canAddPaymentPass();

      if (isPassLibraryAvailable && canAddPaymentPass) {
        try {
          const tokenizationData = await MeaPushProvisioning.ApplePay.initializeOemTokenization(mppCardParamaters);
          set({ applePayTokenInfo: tokenizationData });

          if (
            tokenizationData.primaryAccountIdentifier === undefined ||
            (systemVersion > 13.4
              ? // iOS 13.4+
                await MeaPushProvisioning.ApplePay.canAddSecureElementPassWithPrimaryAccountIdentifier(
                  tokenizationData.primaryAccountIdentifier
                )
              : // Before iOS 13.4
                await MeaPushProvisioning.ApplePay.canAddPaymentPassWithPrimaryAccountIdentifier(
                  tokenizationData.primaryAccountIdentifier
                ))
          ) {
            // Card token not found in Apple Wallet, show Add to Apple Pay button.
            // When tapping button, call MeaPushProvisioning.ApplePay.tokenize(googlePayTokenInfo, ...).
            set({ canAddToWallet: true });
          }

          // Check if card is found in Apple Wallet.
          if (
            systemVersion > 13.4
              ? // iOS 13.4+
                await MeaPushProvisioning.ApplePay.secureElementPassExistsWithPrimaryAccountIdentifier(
                  tokenizationData.primaryAccountIdentifier
                )
              : // Before iOS 13.4
                await MeaPushProvisioning.ApplePay.paymentPassExistsWithPrimaryAccountIdentifier(
                  tokenizationData.primaryAccountIdentifier
                )
          ) {
            set({ isAddedToDigitalWallet: true });
          }

          return await Promise.resolve();
        } catch (error) {
          // Handle error
          set({ canAddToWallet: false });
          return Promise.resolve();
        }
      }
      // Apple Pay unavailable
      set({ canAddToWallet: false });
      return Promise.resolve();
    }
    // Google Pay
    try {
      const tokenizationData = await MeaPushProvisioning.GooglePay.checkWalletForCardToken(mppCardParamaters);
      set({ googlePayTokenInfo: tokenizationData });

      if (tokenizationData.tokenState === GooglePayTokenState.TOKEN_STATE_NEEDS_IDENTITY_VERIFICATION) {
        // Card token requires additional user authentication for yellow path, show Add to Google Pay button.
        // When tapping button, call MeaPushProvisioning.GooglePay.tokenize(googlePayTokenInfo, ...).
        set({ canAddToWallet: true });
        return await Promise.resolve();
      }
      // Token already exists in Google Pay wallet and no action required from Issuer app, hide Add to Google Pay button.
      set({ canAddToWallet: false });
      set({ isAddedToDigitalWallet: true });
      return await Promise.resolve();
    } catch (error) {
      // Card token not found in Google Pay wallet, show Add to Google Pay button.
      // When tapping button, call MeaPushProvisioning.GooglePay.pushCard(...).
      set({ canAddToWallet: true });
      return Promise.resolve();
    }
  },
  addCardToDigitalWallet: async (cardDisplayName: string, cardUserAddress: UserAddress) => {
    // Apple Pay
    if (Platform.OS === 'ios') {
      const applePayToken = get().applePayTokenInfo;
      if (applePayToken) {
        try {
          const activationState = await MeaPushProvisioning.ApplePay.showAddPaymentPassView(applePayToken);

          if (activationState) {
            // Push Provisioning success, check `activactionState` for more info.
            set({ isAddedToDigitalWallet: true });
            return await Promise.resolve();
          }
        } catch (error) {
          // Handle error
          return Promise.reject(error);
        }
      }
      return Promise.reject();
    }
    // Google Pay
    const googlePayToken = get().googlePayTokenInfo;
    const cardParamaters = get().mppCardParamaters;
    if (cardParamaters) {
      if (googlePayToken?.tokenState === GooglePayTokenState.TOKEN_STATE_NEEDS_IDENTITY_VERIFICATION) {
        // Card token requires additional user authentication for yellow path, show Add to Google Pay button.
        try {
          MeaPushProvisioning.GooglePay.tokenize(googlePayToken, 'My HeroWallet Card');
          // Push Provisioning success
          set({ isAddedToDigitalWallet: true });
          return await Promise.resolve();
        } catch (error) {
          // Handle error
          return Promise.reject(error);
        }
      } else {
        try {
          const pushCardInfo = await MeaPushProvisioning.GooglePay.pushCard(
            cardParamaters,
            cardDisplayName,
            cardUserAddress
          );

          if (pushCardInfo) {
            // Push Provisioning success
            set({ isAddedToDigitalWallet: true });
            return await Promise.resolve();
          }
        } catch (error) {
          // Handle error
          return Promise.reject(error);
        }
      }
    }
    // Handle error
    return Promise.reject();
  },
}));

export { useDigitalWalletStore };
