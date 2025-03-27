import {
  useMiniAppSwitcherStore,
  WalletAppRootScreen,
} from '@ehrocks/react-native-swag-personal-app';
import {
  Box,
  Button,
  Drawer,
  Icon,
  ThemeSwitcher,
  Typography,
  useTheme,
} from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
  type ColorValue,
} from 'react-native';
import { useAuthStateListener } from '../../../src/common/app/useAuthStateListener';
import { useEbfPillarPermission } from '../../../src/common/hooks/useEbfPillarPermission';
import { BenefitsAppRootScreen } from '../../../src/navigation/BenefitsAppRootScreen';
import { CORE_SETTINGS_STACK } from '../../../src/navigation/rootNavigation';
import { useLoadLanguage } from '../../../src/providers/LocalisationProvider/hooks/useLoadLanguage';
import { useAppSwitcherStore } from '../common/app-switcher/store/useAppSwitcher';
import {
  dispatchDeeplink,
  useDeeplinkStore,
} from '../common/auth/store/deeplinkStore';
import { SWAGDashboard } from '../features/swag/SWAGDashboard';
import { PillarIds, PILLARS } from './constants';
import Content from './Content';

const WalletApp = () => {
  return (
    <ThemeSwitcher name="swagLight">
      <WalletAppRootScreen />
    </ThemeSwitcher>
  );
};

const BenefitsApp = () => {
  return (
    <ThemeSwitcher name="eBens">
      <BenefitsAppRootScreen />
    </ThemeSwitcher>
  );
};

const SWAGApp = () => {
  return (
    <ThemeSwitcher name="swag">
      <SWAGDashboard />
    </ThemeSwitcher>
  );
};

const AppNameAndComponentMap = {
  [PillarIds.SWAG_APP]: <SWAGApp />,
  [PillarIds.WALLET_APP]: <WalletApp />,
  [PillarIds.BENEFITS_APP]: <BenefitsApp />,
};

const CustomStatusBar = ({ color }: { color?: ColorValue }): JSX.Element => {
  return (
    <SafeAreaView style={{ backgroundColor: color }}>
      <StatusBar backgroundColor={color} barStyle={'dark-content'} />
    </SafeAreaView>
  );
};

const Header = ({
  color,
  header,
  visible,
  setVisible,
}: {
  color?: ColorValue;
  header?: string;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const theme = useTheme();

  const navigation = useNavigation();

  return (
    <ThemeSwitcher>
      <Box
        flexDirection="row"
        alignItems="center"
        paddingVertical="small"
        paddingHorizontal="medium"
        justifyContent="space-between"
        style={{
          backgroundColor: color,
        }}>
        <TouchableOpacity
          testID="swag-switch-arrow-button"
          onPress={() => setVisible(!visible)}>
          <Box flexDirection="row" alignItems="center">
            <Typography.Title typeface="playful" level="h2">
              {header}
            </Typography.Title>
            <Icon
              testID="arrowIcon"
              icon={visible ? 'arrow-up' : 'arrow-down'}
              style={{ marginLeft: theme.space.medium }}
            />
          </Box>
        </TouchableOpacity>
        <Button.Icon
          onPress={() => {
            navigation.navigate(CORE_SETTINGS_STACK as never);
          }}
          testID="profile-button"
          icon="face-open-smiley-outlined"
        />
      </Box>
    </ThemeSwitcher>
  );
};

export const PillarsSwitch = () => {
  const defaultPillarId =
    useMiniAppSwitcherStore(state => state.currentPillar as PillarIds) ||
    PillarIds.WALLET_APP;

  const [currentPillarId, setCurrentPillarId] = useState(defaultPillarId);
  const [visible, setVisible] = useState(false);
  const { benefitsPillarPermission } = useEbfPillarPermission();
  const deeplink = useDeeplinkStore(state => state.deeplink);

  useEffect(() => {
    useAppSwitcherStore.setState({ setPillar: setCurrentPillarId });
  }, [setCurrentPillarId]);

  useEffect(() => {
    useMiniAppSwitcherStore.setState({
      currentPillar: currentPillarId,
    });
  }, [currentPillarId]);

  useEffect(() => {
    if (deeplink) {
      dispatchDeeplink(deeplink, setCurrentPillarId);
    }
  }, [deeplink]);

  const currentPillar = PILLARS(benefitsPillarPermission).find(
    e => e.id === currentPillarId,
  );
  const bgColor = currentPillar?.color;
  const header = currentPillar?.name;
  useLoadLanguage();
  useAuthStateListener();

  return (
    <ThemeSwitcher name="work">
      <View style={{ flex: 1 }}>
        <CustomStatusBar color={bgColor} />
        <Header
          visible={visible}
          setVisible={setVisible}
          color={bgColor}
          header={header}
        />
        <View style={{ flex: 1 }}>
          <Drawer
            visible={visible}
            hasBackdrop={false}
            onDismiss={() => setVisible(false)}>
            <Content
              hideContent={() => setVisible(false)}
              currentPillarId={currentPillarId}
              setCurrentPillarId={setCurrentPillarId}
            />
          </Drawer>
          {currentPillarId && AppNameAndComponentMap[currentPillarId]
            ? AppNameAndComponentMap[currentPillarId]
            : null}
        </View>
      </View>
    </ThemeSwitcher>
  );
};
