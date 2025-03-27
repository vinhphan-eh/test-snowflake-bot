# react-native-swag-personal-app

[![Lint and Test](https://github.com/Thinkei/ebf-swag-personal/actions/workflows/lint_and_test.yml/badge.svg)](https://github.com/Thinkei/ebf-swag-personal/actions/workflows/lint_and_test.yml)
[![Release](https://github.com/Thinkei/ebf-swag-personal/actions/workflows/release.yml/badge.svg)](https://github.com/Thinkei/ebf-swag-personal/actions/workflows/release.yml)

SWAG Personal app as a library in a **React Native** app

This repository contains a mock super-app in the `example` directory. For information about
developing the Swag library, see the [development guide](docs/DEVELOPMENT.md).

The rest of this file gives information for consumers of this library (i.e. the super-app team).

---

## Table of Contents

- [react-native-swag-personal-app](#react-native-swag-personal-app)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
    - [Get Env variables](#get-env-variables)
    - [For Mac users](#for-mac-users)
  - [Installation](#installation)
    - [1. Config registry](#1-config-registry)
      - [1.1 if you use npm or yarn classic(v1)](#11-if-you-use-npm-or-yarn-classicv1)
      - [1.2 if you use yarn v2 (berry)](#12-if-you-use-yarn-v2-berry)
    - [2. Set up env for Meawallet](#2-set-up-env-for-meawallet)
    - [3. Install this library](#3-install-this-library)
    - [4. Install other required libraries](#4-install-other-required-libraries)
    - [5. Extra step for react-native-svg-transformer https://github.com/kristerkari/react-native-svg-transformer](#5-extra-step-for-react-native-svg-transformer-httpsgithubcomkristerkarireact-native-svg-transformer)
    - [6. Setup .env file](#6-setup-env-file)
  - [Usage](#usage)
  - [Run with Jest](#run-with-jest)
  - [Contributing](#contributing)
  - [License](#license)

---

## Prerequisites

### Get Env variables

| Env Variable                               | How to obtain                         | Managed By   |
| ------------------------------------------ | ------------------------------------- | ------------ |
| `EH_NPM_TOKEN`                             | Ask teammate or check in #eh-frontend | #eh-frontend |
| `MEAWALLET_USERNAME`, `MEAWALLET_PASSWORD` | Ask teammate                          | #ebf-eng     |

### For Mac users

For Mac users with M1 chips / Apple Silicon, install Xcode with Rosetta and make sure to configure Xcode to open with Rosetta. This allows Apple Silicon Macs to run on Intel codes, otherwise you may run issue when trying to build locally for IOS

## Installation

### 1. Config registry

#### 1.1 if you use npm or yarn classic(v1)

Add to `.npmrc`

```dotenv
@meawallet:registry=https://nexus.ext.meawallet.com/repository/react-native-mpp/
//nexus.ext.meawallet.com/repository/react-native-mpp/:username=${MEAWALLET_USERNAME}
//nexus.ext.meawallet.com/repository/react-native-mpp/:_password=${MEAWALLET_PASSWORD}
```

#### 1.2 if you use yarn v2 (berry)

Add to `.yarnrc.yml`

```yaml
npmRegistries:
  'https://nexus.ext.meawallet.com/repository/react-native-mpp':
    npmAlwaysAuth: true
    npmAuthIdent: '${MEAWALLET_USERNAME}:${MEAWALLET_PASSWORD}'
npmScopes:
  'meawallet':
    npmRegistryServer: 'https://nexus.ext.meawallet.com/repository/react-native-mpp'
```

### 2. Set up env for Meawallet

Add these keys to bash/zsh config (`~/.bashrc` or `~/.zshrc`) and run `source` command

```dotenv
export MEAWALLET_USERNAME=ask-team-member
export MEAWALLET_PASSWORD=ask-team-member
```

### 3. Install this library

```sh
npm install @ehrocks/react-native-swag-personal-app

# Or using yarn
yarn add @ehrocks/react-native-swag-personal-app
```

Note: if you face authentication issue

- Make sure your token is valid
- Open new terminal window after editing your bash/zsh config

### 4. Install other required libraries

```shell

# Navigation library.
# More detail here https://reactnavigation.org/docs/getting-started#installing-dependencies-into-a-bare-react-native-project
yarn add react-native-reanimated
yarn add react-native-gesture-handler
yarn add react-native-screens
yarn add react-native-safe-area-context

# Svg library
yarn add react-native-svg
yarn add --dev react-native-svg-transformer

# React native config
yarn add react-native-config

# To access to safe area inset raw values
yarn add react-native-static-safe-area-insets

yarn add react-native-meawallet
```

### 5. Extra step for react-native-svg-transformer <https://github.com/kristerkari/react-native-svg-transformer>

### 6. Setup .env file

This library is using `react-native-config` to inject environment variable from holder app.

1. Create a file named `.env` (if not exist yet). File name must follow `react-native-config` instruction. Please read `react-native-config` doc for more info
2. Update `.env` content

```dotenv
# eWallet env start
SWAG_PERSONAL_AUTH_API_URL="Swag Personal auth url"
SWAG_PERSONAL_API_URL="Swag Personal BFF url"
SWAG_PERSONAL_NEW_API_URL="Swag Personal new BFF url"
SWAG_PERSONAL_SUPPORT_EMAIL="Swag Personal support email"
SWAG_PERSONAL_CONTACT_US_FORM_LINK="Swag Personal contact us form web url"
SWAG_PERSONAL_POKITPAL_URL="Pokitpal api url"
# eWallet env end
<!-- make sure we have these env -->
EH_BASE_API_URL=
EH_AUTH_API_URL=
ENV=
CLIENT_ID=
WORKZONE_HOST=
E2E_MOCK_SERVER_PORT=
SWAG_PERSONAL_WEAVR_UI_KEY=
GOOGLE_MAPS_API_KEY_ANDROID=
GOOGLE_MAPS_API_KEY_IOS=
MAIN_APP_ENDPOINT=
CONSENT_API_ENDPOINT=
```

## Usage

1. Add `SwagPersonalRootProvider` to the root app component & `swagPersonalSetTopLevelNavigator` to `NavigationContainer`

```tsx
// App.tsx
import {
  swagPersonalSetTopLevelNavigator,
  SwagPersonalRootProvider,
} from '@ehrocks/react-native-swag-personal-app';

function App() {
  return (
    <NavigationContainer
      ref={swagPersonalSetTopLevelNavigator} {/* Add this */}
    >
      <SwagPersonalRootProvider> {/* Add this */}
        {...otherChildren}
      </SwagPersonalRootProvider> {/* Add this */}
    </NavigationContainer>
  );
}
```

2. Add `SwagPersonalStackNavigator` to whatever stack you want Personal app to be displayed

```tsx
import { SwagPersonalStackNavigator } from '@ehrocks/react-native-swag-personal-app';

const AppSwitcher = () => {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Work" component={BottomNavigator} />
      {/* Add `SwagPersonalStackNavigator` to wherever you want */}
      <TopTab.Screen name="Personal" component={SwagPersonalStackNavigator} />
    </TopTab.Navigator>
  );
};
```

3. `SwagPersonalRootProvider` Props

```tsx
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
}
```

More details

- [PermissionData](src/PermissionProvider.tsx)

## Run with Jest

Create this file `__mocks__/@ehrocks/react-native-swag-personal-app.(js|ts)`

```ts
const SwagPersonalRootProvider = jest.fn();
const SwagPersonalStackNavigator = jest.fn();
const swagPersonalSetTopLevelNavigator = jest.fn();

export { SwagPersonalRootProvider, SwagPersonalStackNavigator, swagPersonalSetTopLevelNavigator };
```

## Contributing

See the [contributing guide](docs/CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

This project belongs to Employment Hero - eBenefits
