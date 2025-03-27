import React from 'react';
import { Platform, Share } from 'react-native';
import { useTheme } from '@hero-design/rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { DataCardItem } from '../../../common/components/data-card';
import { DataCard } from '../../../common/components/data-card';
import { Page } from '../../../common/components/layout/page';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import { useMixpanel } from '../../../common/hooks/useMixpanel';
import { CLICK_SHARE_SUPER_DETAILS, SUPERFUND_DETAILS_MODULE_NAME } from '../constants/trackingEvents';
import type { SuperScreenNavigationProp, SuperScreenRouteProp } from '../navigation/navigationTypes';

export const SuperfundDetailsScreen = () => {
  const { bottom: bottomInset } = useSafeAreaInsets();
  const navigation = useNavigation<SuperScreenNavigationProp<'SuperfundDetails'>>();
  const route = useRoute<SuperScreenRouteProp<'SuperfundDetails'>>();
  const { eventTracking } = useMixpanel();

  const { colors } = useTheme();
  const screenTitle = route?.params.title;

  const swagSuperfund = route?.params.swagSuperfund;
  const { abn, fundChoice, fundName, memberNumber, usi } = swagSuperfund;

  const detailDataCard: DataCardItem[] = [
    {
      label: 'Fund name',
      content: fundName,
    },
    {
      label: 'Member number',
      content: memberNumber,
    },
    {
      label: 'ABN',
      content: abn,
    },
    {
      label: 'USI',
      content: usi,
    },
    {
      label: 'Fund type',
      content: fundChoice,
    },
  ];

  const onOpenSuperCarousel = () => {
    navigation.navigate('SuperIntro');
  };

  const onPressShareDetail = () => {
    eventTracking({
      categoryName: 'user action',
      event: CLICK_SHARE_SUPER_DETAILS,
      metaData: {
        superfundName: fundName,
        superfundUsi: usi,
        module: SUPERFUND_DETAILS_MODULE_NAME,
        trackingAttributes: {
          fundName,
          usi,
        },
      },
    });
    Share.share({
      message: `Here are my Super details\nName: ${fundName}\nUSI: ${usi}\nABN: ${abn}\nMember number: ${memberNumber}`,
    });
  };

  return (
    <>
      <CustomStatusBar />
      <Page.TopBar
        iconRight="circle-question-outlined"
        onRightPress={onOpenSuperCarousel}
        onBack={navigation.goBack}
        title={screenTitle}
      />
      <Page
        keyboardShouldPersistTaps="handled"
        style={{ paddingBottom: bottomInset, backgroundColor: colors.defaultGlobalSurface }}
      >
        <Page.Body marginTop="large">
          <DataCard
            iconName={Platform.OS === 'ios' ? 'upload-outlined' : 'share-2'}
            onPress={onPressShareDetail}
            data={detailDataCard}
          />
        </Page.Body>
      </Page>
    </>
  );
};
