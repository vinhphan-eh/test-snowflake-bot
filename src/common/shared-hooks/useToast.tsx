import React from 'react';
import { Icon, Toast, useTheme } from '@hero-design/rn';
import type { ToastProps } from '@hero-design/rn/types/components/Toast/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useToast = () => {
  const toast = Toast.useToast();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { colors } = useTheme();

  const show = (options: ToastProps) => {
    toast.show({
      intent: 'snackbar',
      variant: 'round',
      duration: 4000,
      distance: bottomInset,
      actionLabel: <Icon icon="cancel" size="xsmall" style={{ color: colors.primary }} />,
      ...options,
    });
  };

  return { show };
};
