import React, { useEffect } from 'react';
import { Dimensions, Image } from 'react-native';
import { Box, Button, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import images from '../../../../common/assets/images';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import type { BillStreamWaitlistNavigationProp } from '../navigation/navigationTypes';
import { useBillStreamingWaitlistStore } from '../stores/useBillStreamingWaitlistStore';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');
const isSmallScreen = windowHeight < 750;

export const BillStreamWaitlistIntroScreen = () => {
  const { colors, space } = useTheme();
  const navigation = useNavigation<BillStreamWaitlistNavigationProp<'BillStreamWaitlistIntro'>>();
  const { bottom: bottomInset, top: topInset } = useSafeAreaInsets();
  const visitWaitlistPopup = useBillStreamingWaitlistStore(state => state.visitWaitlistPopup);
  const imgWidth = windowWidth - space.medium;
  const imgHeight = (343 / 375) * imgWidth; // height with ratio

  useEffect(() => {
    visitWaitlistPopup();
  }, []);

  const goToSignUp = () => {
    navigation.replace('BillStreamWaitlistSignup');
  };

  const onClose = () => {
    navigation.goBack();
  };

  return (
    <Box backgroundColor="decorativePrimarySurface" flex={1}>
      <CustomStatusBar backgroundColor={colors.decorativePrimarySurface} />
      <Image
        testID="cover_img"
        resizeMode="contain"
        style={{ width: imgWidth, height: imgHeight, marginLeft: space.medium, marginTop: space.medium }}
        source={images.waitlistCoverImg}
      />
      <Box
        marginTop="small"
        style={{ paddingBottom: bottomInset > 0 ? bottomInset : space.medium }}
        flex={1}
        marginHorizontal="medium"
      >
        <Typography.Title level="h2" style={{ textAlign: 'center', marginVertical: space.medium }} typeface="playful">
          {'Save more everyday\nwith Bill Management'}
        </Typography.Title>
        <Typography.Body style={{ textAlign: 'center' }} variant={isSmallScreen ? 'small' : 'regular'}>
          Join the waitlist to be one of the first to streamline and save on essential bills with ease!
        </Typography.Body>
        <Box flexGrow={1} />
        <Button testID="learn_more_btn" onPress={goToSignUp} text="Learn more" />
      </Box>
      <Button.Icon
        testID="close_btn"
        onPress={onClose}
        style={{ margin: space.medium, position: 'absolute', top: topInset, right: space.small }}
        size="xsmall"
        icon="cancel"
      />
    </Box>
  );
};
