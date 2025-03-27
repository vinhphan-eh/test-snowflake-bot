import React, { useRef } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Dimensions } from 'react-native';
import { Box, Image, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import type { RootStackNavigationProp } from '../../../../navigation/navigationTypes';
import { navigateToTopTabs } from '../../../../navigation/rootNavigation';
import type { Pid } from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import type { BillDisclaimerHandler } from '../../bill-streaming/containers/BillDisclaimer';
import { BillDisclaimer } from '../../bill-streaming/containers/BillDisclaimer';
import { useShowBillDisclaimer } from '../../bill-streaming/hooks/useShowBillDisclaimer';

const screenWidth = Dimensions.get('screen').width;
const coverHeight = (screenWidth * 198) / 390;

type BillPromoTileProps = {
  testID?: string;
  style?: StyleProp<ViewStyle>;
  title: string;
  subTitle: string;
  bannerUrl: string;
  offerId: string;
  providerId: Pid;
};

export const BillPromoTile = ({
  bannerUrl,
  offerId,
  providerId,
  style,
  subTitle,
  testID,
  title,
}: BillPromoTileProps) => {
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
          offerId,
          onBackToBill: () => {
            navigateToTopTabs('bill-management');
          },
        },
      },
    });
  };

  const onItemClick = () => {
    if (isShowDisclaimer(providerId)) {
      disclaimerRef.current?.open(() => goToOfferDetail(), providerId);
    } else {
      goToOfferDetail();
    }
  };

  return (
    <>
      <BillDisclaimer ref={disclaimerRef} />
      <TouchableOpacity
        style={[{ backgroundColor: colors.defaultSurface }, style]}
        onPress={onItemClick}
        testID={testID}
      >
        <Image
          source={{ uri: bannerUrl }}
          resizeMode="cover"
          accessibilityLabel="background-image"
          testID="promote_background_image"
          style={[
            {
              width: screenWidth,
              height: coverHeight,
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
          <Typography.Title
            style={{ marginTop: space.small }}
            level="h4"
            typeface="playful"
            accessibilityLabel={Intl.formatMessage({ id: 'benefits.bill.enjoyUp' })}
          >
            {title}
          </Typography.Title>
          <Typography.Caption
            style={{ marginTop: space.small }}
            intent="subdued"
            accessibilityLabel={Intl.formatMessage({ id: 'benefits.bill.ahmHealthInsurance' })}
          >
            {subTitle}
          </Typography.Caption>
        </Box>
      </TouchableOpacity>
    </>
  );
};
