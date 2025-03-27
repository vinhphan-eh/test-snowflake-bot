import React, { useRef } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Dimensions, ImageBackground } from 'react-native';
import { Box, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { WaitlistPromoSection } from './WaitlistPromoSection';
import type { RootStackNavigationProp } from '../../../../navigation/navigationTypes';
import { navigateToTopTabs } from '../../../../navigation/rootNavigation';
import { Pid, useGetBmOfferDetailQuery } from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import type { BillDisclaimerHandler } from '../../bill-streaming/containers/BillDisclaimer';
import { BillDisclaimer } from '../../bill-streaming/containers/BillDisclaimer';
import { useShowBillDisclaimer } from '../../bill-streaming/hooks/useShowBillDisclaimer';

const screenWidth = Dimensions.get('screen').width;
const imgHeight = (screenWidth * 198) / screenWidth;
type WaitlistSignupCaro2Props = {
  testID?: string;
  style?: StyleProp<ViewStyle>;
};

export const WaitlistSignupCaro2 = ({ style, testID }: WaitlistSignupCaro2Props) => {
  const { radii, space } = useTheme();
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
          offerId: '1',
          onBackToBill: () => {
            navigateToTopTabs('bill-management');
          },
        },
      },
    });
  };

  const onItemClick = () => {
    if (isShowDisclaimer(Pid.SimplyEnergy)) {
      disclaimerRef.current?.open(() => goToOfferDetail(), Pid.SimplyEnergy);
    } else {
      goToOfferDetail();
    }
  };

  const { data } = useGetBmOfferDetailQuery({ input: { id: '1' ?? '' } });

  const { imageUrl } = data?.me?.billManagement?.offerV2 ?? {};

  return (
    <>
      <BillDisclaimer ref={disclaimerRef} />

      <TouchableOpacity style={[{ width: screenWidth }, style]} onPress={onItemClick} testID={testID}>
        <ImageBackground
          source={{ uri: imageUrl }}
          resizeMode="cover"
          accessibilityLabel="background-image"
          testID="waitlist_background_image"
          style={[
            {
              width: screenWidth,
              height: imgHeight,
              justifyContent: 'flex-end',
            },
          ]}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              opacity: 0.6,
            }}
          />
          <Box
            backgroundColor="decorativePrimarySurface"
            style={{
              top: -space.large,
              left: space.large,
              flexDirection: 'row',
              paddingVertical: space.xsmall,
              paddingHorizontal: space.small,
              alignSelf: 'flex-start',
              borderRadius: radii.base,
            }}
          >
            <Typography.Caption
              intent="primary"
              accessibilityLabel={Intl.formatMessage({ id: 'benefits.bill.youVotedWeDelivered' }).toUpperCase()}
            >
              {Intl.formatMessage({ id: 'benefits.bill.youVotedWeDelivered' }).toUpperCase()}
            </Typography.Caption>
          </Box>
        </ImageBackground>
        <WaitlistPromoSection />
      </TouchableOpacity>
    </>
  );
};
