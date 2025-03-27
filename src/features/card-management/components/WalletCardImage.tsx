import React, { useEffect, useState } from 'react';
import type { CardData } from '@ehrocks/react-native-meawallet-mcd';
import { Box, Button, Typography, useTheme } from '@hero-design/rn';
import Clipboard from '@react-native-clipboard/clipboard';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import images from '../../../common/assets/images';
import { FlipComponent, FlipSide } from '../../../common/components/flip-component/FlipComponent';
import { CARD_DATA_FORMAT, SHOW_CARD_FORMAT } from '../../../common/constants/date';
import { usePasscodeStore } from '../../../common/screens/passcode';
import { useToast } from '../../../common/shared-hooks/useToast';
import { useTiming } from '../../../common/utils/animations';
import { formatStringToDate } from '../../../common/utils/date';
import { Region, type SupportedRegionCode } from '../../../providers/LocalisationProvider/constants';
import { useMeaWalletMcd } from '../../benefits/cash-back/card-link-offers/hooks/useMeaWalletMcd';

interface WalletCardImageProps {
  isCardActivated: boolean;
  enablePhysicalCard: boolean;
  isFirstTime: boolean;
  currentRegion: SupportedRegionCode;
}

export const WalletCardImage = ({
  currentRegion,
  enablePhysicalCard,
  isCardActivated,
  isFirstTime,
}: WalletCardImageProps) => {
  const [flipSide, setFlipSide] = useState(FlipSide.FRONT);
  const [cardInfo, setCardInfo] = useState<CardData>();
  const { getUserCardData } = useMeaWalletMcd();
  const [isLoading, setIsLoading] = useState(false);
  const { space } = useTheme();
  const setRequirePasscode = usePasscodeStore(state => state.setRequirePasscode);
  const Toast = useToast();

  const progressTimingState = () => {
    switch (currentRegion) {
      case Region.gb:
        return isCardActivated;
      default:
        return isCardActivated && enablePhysicalCard;
    }
  };
  const progressEnable = useTiming(progressTimingState());

  const imgAnimatedStyle = useAnimatedStyle(() => {
    const defineOpacity = () => {
      const opacityVal = interpolate(progressEnable.value, [0, 1], [0.6, 1]);

      switch (currentRegion) {
        case Region.gb:
          return opacityVal;
        default:
          return isCardActivated ? opacityVal : 0.6;
      }
    };

    return {
      opacity: defineOpacity(),
      height: 260,
      width: 173,
    };
  }, [isCardActivated]);

  const cardActiveBackAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: 1,
      height: 260,
      width: 173,
    };
  }, []);

  const getCardData = async () => {
    const userCard = await getUserCardData();
    setCardInfo(userCard);
  };

  const showCardDetails = async () => {
    try {
      setIsLoading(true);
      await getCardData();
      setRequirePasscode(true, () => setFlipSide(FlipSide.BACK));
    } catch (error) {
      Toast.show({
        content: 'Cannot retrieve your card details. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onCopyContent = () => {
    Clipboard.setString(cardInfo?.pan ?? '');
    Toast.show({
      content: 'Card number copied.',
    });
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (flipSide === FlipSide.BACK) {
      timeoutId = setTimeout(() => {
        setFlipSide(FlipSide.FRONT);
      }, 30000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [flipSide]);

  const renderButton = () => {
    if (isFirstTime) {
      return null;
    }

    if (flipSide === FlipSide.FRONT) {
      return (
        <Button
          icon="eye-outlined"
          text="Show card details"
          onPress={showCardDetails}
          variant="text"
          loading={isLoading}
        />
      );
    }
    return <Button icon="file-copy-outlined" text="Copy card number" onPress={onCopyContent} variant="text" />;
  };

  const panArr = (cardInfo?.pan ?? '').match(/(.{1,4})/g);

  const getCardFrontImage = () => {
    switch (currentRegion) {
      case Region.gb:
        return images.ukCardActive;
      default:
        return images.cardActive;
    }
  };

  return (
    <Box alignItems="center" marginTop="large">
      <FlipComponent
        side={flipSide}
        front={
          <Animated.Image
            resizeMode="contain"
            accessibilityLabel={`${isCardActivated ? 'Active' : 'Inactive'} Card Image Front`}
            style={imgAnimatedStyle}
            source={getCardFrontImage()}
          />
        }
        back={
          <Box>
            <Animated.Image
              resizeMode="contain"
              accessibilityLabel="Active Card Image Back"
              style={cardActiveBackAnimatedStyle}
              source={images.cardActiveBack}
            />
            <Box style={{ position: 'absolute', bottom: 35, left: 25 }}>
              {panArr?.map(pan => (
                <Typography.Body variant="regular-bold" key={pan} intent="inverted">
                  {pan}
                </Typography.Body>
              ))}
              <Typography.Caption intent="inverted" style={{ marginTop: space.medium }}>
                {'EXP. '}
                <Typography.Body variant="small-bold" intent="inverted">
                  {formatStringToDate(cardInfo?.expiry ?? '', CARD_DATA_FORMAT, SHOW_CARD_FORMAT)}
                </Typography.Body>
              </Typography.Caption>
              <Typography.Caption intent="inverted" style={{ marginTop: space.medium }}>
                {'CVV '}
                <Typography.Body variant="small-bold" intent="inverted">
                  {cardInfo?.cvv}
                </Typography.Body>
              </Typography.Caption>
            </Box>
          </Box>
        }
        style={{ width: '100%', height: 240 }}
      />
      {renderButton()}
    </Box>
  );
};
