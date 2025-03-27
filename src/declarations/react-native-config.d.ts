declare module 'react-native-config' {
  export interface NativeConfig {
    SWAG_PERSONAL_AUTH_API_URL: string;
    SWAG_PERSONAL_API_URL: string;
    SWAG_PERSONAL_NEW_API_URL: string;
    SWAG_PERSONAL_SUPPORT_EMAIL: string;
    SWAG_PERSONAL_CONTACT_US_FORM_LINK: string;
    MAIN_APP_ENDPOINT: string;
    EH_AUTH_API_URL: string;
    SWAG_PERSONAL_POKITPAL_URL: string;
    RUN_MOCK_SERVER: string;
    IS_E2E: string;
    ENV: string;
    CLIENT_ID: string;
    WORKZONE_HOST: string;
    E2E_MOCK_SERVER_PORT: number;
    SWAG_PERSONAL_WEAVR_UI_KEY: string;
    GOOGLE_MAPS_API_KEY_ANDROID: string;
    GOOGLE_MAPS_API_KEY_IOS: string;
    CONSENT_API_ENDPOINT: string;
    E2E_ETHEREAL_EMAIL_USER: string;
    E2E_ETHEREAL_EMAIL_PASS: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
