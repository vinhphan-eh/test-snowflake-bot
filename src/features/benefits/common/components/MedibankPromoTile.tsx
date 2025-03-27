import React, { useRef } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Dimensions } from 'react-native';
import { Box, Image, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import images from '../../../../common/assets/images';
import { scale } from '../../../../common/utils/layout';
import type { RootStackNavigationProp } from '../../../../navigation/navigationTypes';
import { navigateToTopTabs } from '../../../../navigation/rootNavigation';
import { Pid } from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import type { BillDisclaimerHandler } from '../../bill-streaming/containers/BillDisclaimer';
import { BillDisclaimer } from '../../bill-streaming/containers/BillDisclaimer';
import { useShowBillDisclaimer } from '../../bill-streaming/hooks/useShowBillDisclaimer';

const screenWidth = Dimensions.get('screen').width;
const coverHeight = (screenWidth * 220) / screenWidth;
const logoSize = scale(32, 'height');
type MedibankPromoTileProps = {
  testID?: string;
  style?: StyleProp<ViewStyle>;
};

export const MedibankPromoTile = ({ style, testID }: MedibankPromoTileProps) => {
  const { colors, space } = useTheme();
  const Intl = useIntl();
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  const { isShowDisclaimer } = useShowBillDisclaimer();
  const disclaimerRef = useRef<BillDisclaimerHandler>(null);

  const goToOfferDetail = () => {
    navigation.navigate('BenefitsStack', {
      screen: 'BillStreamStack',
      params: {
        screen: 'BillOfferDetailScreen',
        params: {
          offerId: '3',
          onBackToBill: () => {
            navigateToTopTabs('bill-management');
          },
        },
      },
    });
  };

  const onItemClick = () => {
    if (isShowDisclaimer(Pid.Medibank)) {
      disclaimerRef.current?.open(() => goToOfferDetail(), Pid.Medibank);
    } else {
      goToOfferDetail();
    }
  };

  return (
    <>
      <BillDisclaimer ref={disclaimerRef} />
      <TouchableOpacity style={[{ width: screenWidth }, style]} onPress={onItemClick} testID={testID}>
        <Image
          source={images.medibankPromoTile}
          resizeMode="cover"
          accessibilityLabel="background-image"
          testID="medibank_background_image"
          style={[
            {
              width: screenWidth,
              height: coverHeight,
              justifyContent: 'flex-end',
            },
          ]}
        />
        <Box
          style={{
            backgroundColor: colors.defaultSurface,
            paddingHorizontal: space.medium,
            paddingBottom: space.large,
            paddingTop: space.medium,
          }}
        >
          <Image
            testID="medibank-promote-logo"
            source={images.medibankLogo}
            style={{ height: logoSize, width: logoSize }}
            resizeMode="contain"
          />
          <Typography.Title
            style={{ marginTop: space.small }}
            level="h4"
            typeface="playful"
            accessibilityLabel={Intl.formatMessage({ id: 'benefits.bill.tenPercentOff' })}
          >
            {Intl.formatMessage({ id: 'benefits.bill.tenPercentOff' })}
          </Typography.Title>
          <Typography.Caption
            style={{ marginTop: space.small }}
            intent="subdued"
            accessibilityLabel={Intl.formatMessage({ id: 'benefits.bill.medibank' })}
          >
            {Intl.formatMessage({ id: 'benefits.bill.medibank' })}
          </Typography.Caption>
        </Box>
      </TouchableOpacity>
    </>
  );
};
