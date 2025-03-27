import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Typography, useTheme } from '@hero-design/rn';
import Clipboard from '@react-native-clipboard/clipboard';
import { SecureCardCVVLabel, SecureCardNumberLabel } from '@weavr-io/secure-components-react-native';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import images from '../../../common/assets/images';
import { FlipComponent, FlipSide } from '../../../common/components/flip-component/FlipComponent';
import { useToast } from '../../../common/shared-hooks/useToast';
import { useTiming } from '../../../common/utils/animations';
import { useGetEWalletUkPaymentCardProvisioningDetailsQuery } from '../../../new-graphql/generated';

const WEAVR_COPY_COMPONENT_TEXT_RESPONSE_ANDROID = 'Copied Text on click';
const WEAVR_COPY_COMPONENT_TEXT_RESPONSE_IOS = 'Copied Secure text on tap!';
const WEAVR_DETOKENIZE_COMPONENT_TEXT_RESPONSE = 'Success!';

interface UkWalletCardHeaderProps {
  isCardActivated: boolean;
  isFirstTime: boolean;
  accessToken: string;
}

export const UkWalletCardHeader = ({ accessToken, isCardActivated, isFirstTime }: UkWalletCardHeaderProps) => {
  const [flipSide, setFlipSide] = useState(FlipSide.FRONT);

  const [isLoading, setIsLoading] = useState(false);
  const { colors, space } = useTheme();
  const Toast = useToast();
  const { data: cardProvisioningDetails } = useGetEWalletUkPaymentCardProvisioningDetailsQuery(
    { accessToken },
    { enabled: !!accessToken }
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const secureCardNumberLabelRef = useRef<any>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const secureCardCVVLabelRef = useRef<any>();

  const progressEnable = useTiming(isCardActivated);

  const imgAnimatedStyle = useAnimatedStyle(() => {
    const defineOpacity = () => {
      const opacityVal = interpolate(progressEnable.value, [0, 1], [0.6, 1]);

      return opacityVal;
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

  const showCardDetails = async () => {
    try {
      setIsLoading(true);
      secureCardNumberLabelRef.current.deTokenize();
      secureCardCVVLabelRef.current.deTokenize();
    } catch (error) {
      Toast.show({
        content: `Cannot retrieve your card details. Please try again later. ${error}`,
      });
    }
  };

  const onCopyContent = (type: 'cardNumber' | 'cvv', response: string) => {
    const respObj = JSON.parse(response);
    if (
      respObj.value === WEAVR_COPY_COMPONENT_TEXT_RESPONSE_ANDROID ||
      respObj.value === WEAVR_COPY_COMPONENT_TEXT_RESPONSE_IOS
    ) {
      if (type === 'cardNumber') {
        Toast.show({
          content: 'Card number copied.',
        });
      } else {
        Toast.show({
          content: 'Card cvv copied.',
        });
      }
    } else {
      Toast.show({
        content: `Cannot copy card details. Please try again later. ${response}`,
      });
    }
  };

  const onDeTokenizeCardNumber = (response: string) => {
    const respObj = JSON.parse(response);
    if (respObj.value === WEAVR_DETOKENIZE_COMPONENT_TEXT_RESPONSE) {
      setIsLoading(false);
      setFlipSide(FlipSide.BACK);
    } else {
      Toast.show({
        content: `Cannot display card details. Please try again later.`,
      });
    }
  };

  const onCopyExpiry = () => {
    Clipboard.setString(cardProvisioningDetails?.me?.wallet?.UKCurrentPaymentCardV2?.expiryDate ?? '');
    Toast.show({
      content: 'Card expiry copied.',
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
    return <Button icon="file-copy-outlined" text="Tap text to copy card details" onPress={() => {}} variant="text" />;
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
            source={images.ukCardActive}
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
              <SecureCardNumberLabel
                style={{
                  width: 50,
                  height: 96,
                }}
                textSize="16"
                textColor={colors.defaultSurface}
                fontStyle={{
                  fontFamily: 'BeVietnamPro-SemiBold',
                }}
                copyOnClick
                onCopyToClipboard={resp => onCopyContent('cardNumber', JSON.stringify(resp))}
                toDetokenize={cardProvisioningDetails?.me?.wallet?.UKCurrentPaymentCardV2?.cardNumberToken || undefined}
                onDeTokenize={resp => onDeTokenizeCardNumber(JSON.stringify(resp))}
                ref={secureCardNumberLabelRef}
              />
              <Typography.Caption intent="inverted" style={{ marginTop: space.medium }}>
                {'EXP. '}
                <Typography.Body variant="small-bold" intent="inverted" onPress={onCopyExpiry}>
                  {cardProvisioningDetails?.me?.wallet?.UKCurrentPaymentCardV2?.expiryDate ?? ''}
                </Typography.Body>
              </Typography.Caption>
              <Typography.Caption intent="inverted" style={{ marginTop: space.medium }}>
                {'CVV '}
                <SecureCardCVVLabel
                  style={{
                    width: 40,
                    height: 19,
                  }}
                  fontStyle={{
                    fontFamily: 'BeVietnamPro-SemiBold',
                  }}
                  textSize="14"
                  textColor={colors.defaultSurface}
                  copyOnClick
                  onCopyToClipboard={resp => onCopyContent('cvv', JSON.stringify(resp))}
                  toDetokenize={cardProvisioningDetails?.me?.wallet?.UKCurrentPaymentCardV2?.cvvToken || undefined}
                  ref={secureCardCVVLabelRef}
                />
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
