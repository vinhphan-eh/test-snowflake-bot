// Defining the sumsub theme type, as its not exported in the weavr package.
export interface WeavrKYCTheme {
  both?: KYCTheme;
  android?: KYCTheme;
  iOS?: KYCTheme;
}
interface KYCTheme {
  fonts?: {
    [key: string]: Font;
  };
  colors?: {
    [key: string]: Colors;
  };
  icons?: {
    [key: string]: string;
  };
  verificationStepIcons?: {
    [key: string]: string;
  };
  documentTypeIcons?: {
    [key: string]: string;
  };
  instructionsImages?: {
    [key: string]: string;
  };
  metrics?: {
    activityIndicatorStyle?: string;
    screenHorizontalMargin?: number;
    screenHeaderAlignment?: string;
    sectionHeaderAlignment?: string;
    viewportBorderWidth?: number;
    bottomSheetCornerRadius?: number;
    bottomSheetHandleSize?: {
      width: number;
      height: number;
    };
    buttonBorderWidth?: number;
    buttonCornerRadius?: number;
    buttonHeight?: number;
    cardBorderWidth?: number;
    cardCornerRadius?: number;
    documentTypeCardStyle?: 'filled' | 'bordered' | 'plain';
    selectedCountryCardStyle?: 'filled' | 'bordered' | 'plain';
    supportItemCardStyle?: 'filled' | 'bordered' | 'plain';
    verificationStepCardStyle?: 'filled' | 'bordered' | 'plain';
    fieldBorderWidth?: number;
    fieldCornerRadius?: number;
    fieldHeight?: number;
    commonStatusBarStyle?: string;
    preferredCloseBarItemAlignment?: string;
    preferredCloseBarItemStyle?: string;
    cameraStatusBarStyle?: string;
    listSeparatorHeight?: number;
    listSeparatorMarginLeft?: number;
    listSeparatorMarginRight?: number;
  };
}
interface Colors {
  light: string;
  dark: string;
}
interface Font {
  name: string;
  size: number;
}
