import type { ReactNode } from 'react';
import React, { isValidElement } from 'react';
import type { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';
import { Image } from 'react-native';
import type { Theme } from '@hero-design/rn';
import { Box, Button, Typography, useTheme } from '@hero-design/rn';
import type { ButtonProps } from '@hero-design/rn/types/components/Button/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import images from '../../assets/images';
import { Page } from '../layout/page';

enum ImageName {
  thumbs_up_no_bg = 'thumbs_up_no_bg',
  flying = 'flying',
  flying2 = 'flying2',
  waiting = 'waiting',
  waiting_white = 'waiting-white',
  flying_card = 'flying-card',
  ice_cream_benefits = 'ice-cream-benefits',
  ice_cream_income = 'ice-cream-income',
  ice_cream_account = 'ice-cream-account',
  jetpack_man_money = 'jetpack-man-money',
  jetpack_man_benefits = 'jetpack-man-benefits',
  ice_cream_profile = 'ice-cream-profile',
  goggles = 'goggles',
  snailBenefits = 'snailBenefits',
  snailMoney = 'snailMoney',
  flyingInstapay = 'flying-instapay',
  wateringMan = 'watering-man',
  sprinkler = 'sprinkler',
  instapayNowMaintenance = 'instapay-now-maintenance',
}

export type ImageMap = Record<ImageName, ImageSourcePropType>;

const mapNameToResource: ImageMap = {
  [ImageName.thumbs_up_no_bg]: images.thumbsUpNoBg,
  [ImageName.flying]: images.flying,
  [ImageName.flying2]: images.flying2,
  [ImageName.waiting]: images.waiting,
  [ImageName.waiting_white]: images.waitingWhite,
  [ImageName.ice_cream_benefits]: images.iceCreamBenefits,
  [ImageName.ice_cream_income]: images.iceCreamIncome,
  [ImageName.ice_cream_profile]: images.iceCreamProfile,
  [ImageName.ice_cream_account]: images.iceCream,
  [ImageName.flying_card]: images.flyingCard,
  [ImageName.jetpack_man_money]: images.jetpackManMoney,
  [ImageName.jetpack_man_benefits]: images.jetpackManBenefits,
  [ImageName.goggles]: images.goggles,
  [ImageName.snailBenefits]: images.snailBenefits,
  [ImageName.snailMoney]: images.snailMoney,
  [ImageName.flyingInstapay]: images.flyingInstapay,
  [ImageName.wateringMan]: images.wateringMan,
  [ImageName.sprinkler]: images.sprinkler,
  [ImageName.instapayNowMaintenance]: images.instapayNowMaintenance,
};

interface OutcomeActionProps {
  isDisabled?: boolean;
  isLoading?: boolean;
  testId?: string;
  buttonTitle: string;
  onNext: () => void;
  intent?: ButtonProps['intent'];
  variant?: ButtonProps['variant'];
  style?: ButtonProps['style'];
}

export interface OutcomeTemplateHDProps {
  imageName?: `${ImageName}`;
  imageWidth?: number;
  imageHeight?: number;
  imageAccessibilityLabel?: string;
  content?: string | ReactNode;
  backgroundColor?: keyof Theme['colors'];
  actions?: OutcomeActionProps[] | ReactNode;
  title: string;
  testID?: string;
  bodyStyle?: StyleProp<ViewStyle>;
}

export const OutcomeTemplate = ({
  actions,
  backgroundColor = 'decorativePrimarySurface',
  bodyStyle,
  content,
  imageAccessibilityLabel,
  imageHeight = 144,
  imageName,
  imageWidth = 144,
  testID,
  title,
}: OutcomeTemplateHDProps) => {
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { colors, space } = useTheme();
  const checkActionReactNode = isValidElement(actions);
  const showFooter = checkActionReactNode || (Array.isArray(actions) && actions.length);

  const renderCTA = () => {
    const actionsArray = actions as OutcomeActionProps[];

    return actionsArray.map(action => (
      <Button
        variant={action.variant}
        intent={action.intent}
        key={action.buttonTitle}
        disabled={action.isDisabled}
        loading={action.isLoading}
        testID={action.testId}
        accessibilityLabel={action.buttonTitle}
        onPress={action.onNext}
        text={action.buttonTitle ?? ''}
        style={action.style}
      />
    ));
  };

  return (
    <Page testID={testID} style={{ paddingBottom: bottomInset, backgroundColor: colors[backgroundColor] }}>
      <Page.Body style={bodyStyle} justifyContent="center" marginBottom="xxlarge">
        {imageName && (
          <Box justifyContent="center" alignItems="center">
            <Image
              accessibilityLabel={imageAccessibilityLabel}
              source={mapNameToResource[imageName]}
              style={{ width: imageWidth, height: imageHeight }}
              resizeMode="contain"
            />
          </Box>
        )}
        <Typography.Title
          testID="outcome-title"
          typeface="playful"
          level="h4"
          style={{ textAlign: 'center', marginTop: space.xlarge }}
        >
          {title}
        </Typography.Title>
        {React.isValidElement(content) ? (
          <Box alignItems="center" justifyContent="center">
            {content}
          </Box>
        ) : (
          <Typography.Body
            typeface="playful"
            variant="regular"
            intent="subdued"
            style={{ textAlign: 'center', marginTop: space.small }}
          >
            {content}
          </Typography.Body>
        )}
      </Page.Body>
      {showFooter ? <Page.Footer>{checkActionReactNode ? actions : renderCTA()}</Page.Footer> : null}
    </Page>
  );
};
