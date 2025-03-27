import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { OutcomeTemplate } from '../../../common/components/outcome-template/OutcomeTemplate';
import { useMixpanel } from '../../../common/hooks/useMixpanel';
import { EventTrackingCategory } from '../../../common/stores/useSessionStore';
import { CLICK_ON_DONE, SETTINGS_MODULE } from '../constants/mixpanel';
import type { RequestOutcomeScreenRouteProp, SupportStackNavigationProp } from '../navigation/navigationTypes';

export const SupportRequestOutcomeScreen = () => {
  const navigation = useNavigation<SupportStackNavigationProp<'RequestOutcome'>>();
  const route = useRoute<RequestOutcomeScreenRouteProp<'RequestOutcome'>>();
  const outcomeResponse = route.params;
  const { eventTracking } = useMixpanel();

  const onNext = () => {
    eventTracking({
      event: CLICK_ON_DONE,
      categoryName: EventTrackingCategory.USER_ACTION,
      metaData: {
        module: SETTINGS_MODULE,
      },
    });
    navigation.navigate('dashboard');
  };

  return (
    <OutcomeTemplate
      title={outcomeResponse.message}
      content={outcomeResponse.description}
      // The current state of HD does not support the ability to retrieve theme name. Request raised with Andromeda.
      imageName={outcomeResponse.image}
      actions={[{ buttonTitle: 'Done', testId: 'support-outcome-done-btn', onNext }]}
    />
  );
};
