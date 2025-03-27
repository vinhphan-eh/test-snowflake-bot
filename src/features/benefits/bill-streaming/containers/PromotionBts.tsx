import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import { Box, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import type { MixedStyleDeclaration } from 'react-native-render-html';
import RenderHtml from 'react-native-render-html';
import type { BottomSheetRef } from '../../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetScrollView } from '../../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetWithHD } from '../../../../common/components/bottom-sheet/BottomSheetWithHD';
import { useBottomSheetDynamicSnapPoints } from '../../../../common/components/bottom-sheet/useBottomSheetDynamicSnapPoints';
import { useInAppBrowser } from '../../../../common/shared-hooks/useInAppBrowser';
import type { RootStackNavigationProp } from '../../../../navigation/navigationTypes';
import { navigateToBenefitsTopTabs } from '../../../../navigation/rootNavigation';
import { useGetPromotionQuery } from '../../../../new-graphql/generated';
import { useBillManagementStore } from '../stores/useBillManagementStore';

export type PromotionBtsHandler = {
  open: (nextAction: () => void) => void;
};

const { width: screenWidth } = Dimensions.get('screen');

export const PromotionBts = forwardRef<PromotionBtsHandler, unknown>((_, ref) => {
  const btsRef = useRef<BottomSheetRef>(null);
  const { data: promotionContent } = useGetPromotionQuery();
  const { descriptionBtsContent, descriptionBtsTitle } = promotionContent?.me?.billManagement?.promotion ?? {};
  const [callback, setCallback] = useState<() => void>(() => {});
  const { setDisclaimerVisibility } = useBillManagementStore();
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  useImperativeHandle(ref, () => ({
    open: nextAction => {
      btsRef.current?.open();
      setCallback(() => nextAction);
    },
  }));

  const onAccept = () => {
    btsRef.current?.close();
    setDisclaimerVisibility(false);
    callback?.();
    navigation.navigate('BenefitsStack', {
      screen: 'BillStreamStack',
      params: {
        screen: 'BillOfferDetailScreen',
        params: {
          offerId: '1',
          onBackToBill: () => {
            navigateToBenefitsTopTabs('benefits-bills');
          },
        },
      },
    });
  };

  const onGotIt = () => {
    btsRef.current?.close();
    setDisclaimerVisibility(false);
  };
  const { openUrl } = useInAppBrowser();
  const { fontSizes } = useTheme();

  const textStyle: MixedStyleDeclaration = { fontSize: fontSizes.large, fontWeight: '400' };

  const renderersProps = {
    a: {
      onPress(_event: unknown, url: string) {
        openUrl(url);
      },
    },
  };

  const {
    animatedContentHeight,
    animatedHandleHeight,
    animatedSnapPoints,
    contentContainerHeightStyle,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(true);

  return (
    <BottomSheetWithHD
      ref={btsRef}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      title={descriptionBtsTitle}
      handleIconName="cancel"
      handleIconSize="xsmall"
      handleIconIntent="text"
      themeName="eBens"
      actions={[
        {
          testID: 'accept-btn',
          title: 'Got it',
          onPress: onGotIt,
          intent: 'secondary',
        },
        {
          testID: 'accept-btn',
          title: 'Continue sign up',
          onPress: onAccept,
        },
      ]}
    >
      {({ space }) => (
        <BottomSheetScrollView
          style={contentContainerHeightStyle}
          onLayout={handleContentLayout}
          testID="bottom-sheet-scroll-view"
        >
          <Box style={{ marginHorizontal: space.medium }}>
            <RenderHtml
              renderersProps={renderersProps}
              baseStyle={textStyle}
              contentWidth={screenWidth}
              source={{ html: descriptionBtsContent ?? '' }}
            />
          </Box>
        </BottomSheetScrollView>
      )}
    </BottomSheetWithHD>
  );
});
