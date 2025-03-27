import React from 'react';
import { Icon, List, Typography } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Page } from '../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import type { RequestNewCardScreenNavigationProp } from '../navigation/navigationTypes';

export const ReportCardScreen = () => {
  const { bottom: bottomInset } = useSafeAreaInsets();
  const navigation = useNavigation<RequestNewCardScreenNavigationProp<'ReportCard'>>();

  const onNavigateToMailScreen = () => {
    navigation.navigate('ConfirmMailingAddress');
  };

  const onGoBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <CustomStatusBar />
      <Page.TopBar onBack={onGoBack} title="Damaged, lost or stolen card" hideRight />
      <Page style={{ paddingBottom: bottomInset }}>
        <Page.Title>{`Something happened to your card? Let's fix that.`}</Page.Title>
        <Page.Body>
          <Typography.Body variant="regular" intent="body">
            {`If your card is damaged, lost or stolen, you can cancel your current card and we'll send you a new one.`}
          </Typography.Body>
        </Page.Body>
        <Page.Footer>
          <List.Item
            variant="card"
            testID="Cancel and order a card"
            title="Cancel and order a card"
            subtitle="Cancel your current card and get a new one."
            onPress={onNavigateToMailScreen}
            suffix={<Icon icon="arrow-right" intent="primary" />}
          />
        </Page.Footer>
      </Page>
    </>
  );
};
