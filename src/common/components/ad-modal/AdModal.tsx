import React, { useImperativeHandle, useState } from 'react';
import type { ImageSourcePropType } from 'react-native';
import { Modal, Pressable } from 'react-native';
import { Box, Button, Icon, Image, Typography, useTheme } from '@hero-design/rn';
import type { ButtonProps } from '@hero-design/rn/types/components/Button/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface CTAProps extends ButtonProps {
  key: string;
  closeModalOnClick?: boolean;
}

export interface AdModalProps {
  image: ImageSourcePropType;
  title: string;
  description: string;
  buttons: CTAProps[];
  /**
   * a11y label to locate this whole component
   */
  accessibilityLabel?: string;
}

export interface AdModalMethods {
  show: () => void;
}

export const AdModal = React.forwardRef<AdModalMethods, AdModalProps>(
  ({ accessibilityLabel, buttons, description, image, title }, ref) => {
    const [visible, setVisible] = useState(false);
    const { space } = useTheme();
    const { bottom: bottomInset, top: topInset } = useSafeAreaInsets();

    const dismiss = () => {
      setVisible(false);
    };

    useImperativeHandle(ref, () => ({
      show: () => {
        setVisible(true);
      },
    }));

    return (
      <Modal visible={visible} animationType="slide" accessibilityLabel={accessibilityLabel}>
        <Box
          flex={1}
          justifyContent="space-between"
          backgroundColor="defaultSurface"
          style={{ paddingBottom: bottomInset + space.medium }}
        >
          <Box flex={1} style={{ marginBottom: -space.medium }}>
            <Image source={image} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
          </Box>
          <Box style={{ position: 'absolute', top: topInset, right: 0 }} marginRight="large" marginTop="large">
            <Pressable hitSlop={25} onPress={dismiss}>
              <Icon icon="cancel" size="xsmall" />
            </Pressable>
          </Box>
          <Box
            backgroundColor="defaultSurface"
            paddingHorizontal="medium"
            borderTopRightRadius="xxxlarge"
            borderTopLeftRadius="xxxlarge"
          >
            <Box paddingHorizontal="medium" marginTop="xlarge">
              <Typography.Title style={{ textAlign: 'center' }} typeface="playful" level="h2">
                {title}
              </Typography.Title>
            </Box>
            {!!description && (
              <Box marginTop="medium" paddingHorizontal="medium">
                <Typography.Body variant="small">{description}</Typography.Body>
              </Box>
            )}
            {buttons.map(({ closeModalOnClick, key, onPress, ...buttonProps }, index) => {
              const isFirst = index === 0;
              return (
                <Button
                  key={key}
                  style={{ marginTop: isFirst ? space.xlarge : space.medium }}
                  {...buttonProps}
                  onPress={() => {
                    if (closeModalOnClick) {
                      dismiss();
                    }
                    onPress();
                  }}
                />
              );
            })}
          </Box>
        </Box>
      </Modal>
    );
  }
);
