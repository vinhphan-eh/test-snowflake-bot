import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { ConsolidationStackParamList } from './navigationTypes';
import { noHeader } from '../../../../common/navigation/navigationPresets';
import { CreateSuperConsolidationFailedScreen } from '../screens/CreateSuperConsolidationFailed';
import { CreateSuperConsolidationSupportRequestSuccessScreen } from '../screens/CreateSuperConsolidationSupportRequestSuccess';
import { FindYourLostSuperScreen } from '../screens/FindYourLostSuperScreen';
import { LegalAgreementScreen } from '../screens/LegalAgreementScreen';
import { SuperConsolidationIntroScreen } from '../screens/SuperConsolidationIntroScreen';

const Stack = createStackNavigator<ConsolidationStackParamList>();

export const ConsolidationNavigator = () => {
  return (
    <Stack.Navigator screenOptions={noHeader}>
      <Stack.Screen name="SuperConsolidationIntro" component={SuperConsolidationIntroScreen} />
      <Stack.Screen name="FindYourLostSuper" component={FindYourLostSuperScreen} />
      <Stack.Screen name="LegalAgreement" component={LegalAgreementScreen} />
      <Stack.Screen name="CreateSuperConsolidationFailed" component={CreateSuperConsolidationFailedScreen} />
      <Stack.Screen
        name="CreateSuperConsolidationSupportRequestSuccessScreen"
        component={CreateSuperConsolidationSupportRequestSuccessScreen}
      />
    </Stack.Navigator>
  );
};
