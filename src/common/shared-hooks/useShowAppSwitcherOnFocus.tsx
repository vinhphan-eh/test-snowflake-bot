import { useEffect } from 'react';
import type { NavigationProp } from '@react-navigation/native';
import type { ParamListBase } from '@react-navigation/routers';
import { useAppSwitcherStore } from '../stores/useAppSwitcherStore';

/**
 * Automatically show app switcher when screen is on focus. Hide app switcher when screen is blur
 */
export const useShowAppSwitcherOnFocus = (navigation: NavigationProp<ParamListBase>) => {
  const toggleAppSwitcherVisibility = useAppSwitcherStore(state => state.toggleVisibility);

  /**
   * Show app switcher when screen is on focus
   */
  useEffect(() => {
    // Cannot use useFocusEffect because this hook is outside of screen context
    return navigation.addListener('focus', () => {
      toggleAppSwitcherVisibility?.(true);
    });
  }, [navigation, toggleAppSwitcherVisibility]);

  /**
   * Hide app switcher when screen is blur
   */
  useEffect(() => {
    return navigation.addListener('blur', () => {
      toggleAppSwitcherVisibility?.(false);
    });
  }, [navigation, toggleAppSwitcherVisibility]);
};
