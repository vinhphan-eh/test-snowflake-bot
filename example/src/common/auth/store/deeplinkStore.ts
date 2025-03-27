import { NotificationEvent } from '@ehrocks/react-native-superapp-communication';
import { DevSettings } from 'react-native';
import { create } from 'zustand';
import { PillarIds } from '../../../super-app-navigation/constants';

// source: eh-mobile-pro app/components/swag/hooks/useBrazeContentCardListener.ts
const DEEPLINK_SCHEMES = {
  heroWalletLink: /^.+platform_redirect\/hero-wallet\/.*$/,
  benefitsLink: /^.+platform_redirect\/benefits\/.*$/,
};

export interface DeepLinkStoreData {
  deeplink: string;
}

/**
 * Mimic store for swag user
 */
export const useDeeplinkStore = create<DeepLinkStoreData>()(() => ({
  deeplink: '',
}));

/**
 * 
 * example url: 	
    https://mobile.staging.ehrocks.com/platform_redirect?web_url=https://mobile.staging.ehrocks.com/products/benefit/&app_deep_path=platform_redirect/benefits/cashback-offers/ 
 * For deeplink, when it lands to preview page, and backend opens the app, the received url will be: https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/benefits/cashback-offers/ (web_url & app_deep_path are cut off)
 * For notification, the logic to cut off web_url & app_deep_path is handled on mobile side
 * We will use dispatch notification event to mimic the behavior of opening the app from deeplink
 * cut off logic is already handled in mobile side, dont wanna waste time to mimic it here
 * source: app/components/swag/hooks/useBrazeContentCardListener.ts
 */

export const dispatchDeeplink = (
  url: string,
  setPillar: (id: PillarIds) => void,
) => {
  if (url) {
    if (url.match(DEEPLINK_SCHEMES.benefitsLink)) {
      setPillar(PillarIds.BENEFITS_APP);
      NotificationEvent.dispatchOpenNotificationEvent({
        type: 'ebenefit_deep_link',
        meta: {
          //@ts-ignore
          web_url: url,
        },
      });
    } else if (url.match(DEEPLINK_SCHEMES.heroWalletLink)) {
      setPillar(PillarIds.WALLET_APP);
      NotificationEvent.dispatchOpenNotificationEvent({
        type: 'ebenefit_deep_link',
        meta: {
          //@ts-ignore
          web_url: url,
        },
      });
    }

    if (__DEV__) {
      DevSettings.addMenuItem('Trigger deeplink', () => {
        dispatchDeeplink(url, setPillar);
      });
    }
  }
};
