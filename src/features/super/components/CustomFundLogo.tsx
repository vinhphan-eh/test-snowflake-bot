import React from 'react';
import { Icon, Image } from '@hero-design/rn';
import images from '../../../common/assets/images';
import { usePermissionStore } from '../../../common/stores/usePermissionStore';
import { isSpaceship } from '../utils/isSpaceship';

type CustomFundLogoProps = {
  usi: string;
};

export const CustomFundLogo = ({ usi }: CustomFundLogoProps) => {
  const permission = usePermissionStore(state => state.permissions?.customFundAssetSwag?.view);

  if (!permission) {
    return <Icon icon="coin-super-outlined" accessibilityLabel="money super icon" />;
  }

  if (isSpaceship(usi)) {
    return (
      <Image
        testID="custom-spaceship-logo-test-id"
        accessibilityLabel="Space ship fund logo"
        style={{ width: 25, height: 25 }}
        source={images.spaceshipFundLogo}
      />
    );
  }

  return <Icon icon="coin-super-outlined" accessibilityLabel="money super icon" />;
};
