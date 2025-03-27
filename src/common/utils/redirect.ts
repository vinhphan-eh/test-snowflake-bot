import { Linking } from 'react-native';

export const openAppStore = () => {
  Linking.openURL('itms-apps://apps.apple.com/id/app/employment-hero-mobile/id1171253572');
};
export const openGooglePlay = () => {
  Linking.openURL('market://details?id=com.ehlife');
};
