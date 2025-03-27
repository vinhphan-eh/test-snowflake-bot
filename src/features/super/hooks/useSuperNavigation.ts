import { useNavigation } from '@react-navigation/native';
import type { RootStackNavigationProp } from '../../../navigation/navigationTypes';
import type { LifecycleEvent, SwagSuperfund } from '../../../new-graphql/generated';

export const useSuperNavigation = () => {
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();

  const navigateToActiveMembership = () => {
    navigation.navigate('SuperStack', {
      screen: 'ActiveMembership',
      params: {
        title: 'Superannuation',
      },
    });
  };

  const navigateToSuperIntro = () => {
    navigation.navigate('SuperStack', {
      screen: 'SuperIntro',
    });
  };

  const navigateToSuperfundDetails = (swagSuperfund: SwagSuperfund) => {
    navigation.navigate('SuperStack', {
      screen: 'SuperfundDetails',
      params: {
        title: 'Superannuation Details',
        swagSuperfund,
        trackingAttributes: {
          fundName: swagSuperfund.fundName,
          usi: swagSuperfund.usi,
        },
      },
    });
  };

  const navigateToEventDetails = (data: LifecycleEvent) => {
    navigation.navigate('SuperStack', {
      screen: 'EventDetails',
      params: {
        title: 'Details',
        eventDetails: data,
      },
    });
  };

  const navigateToResyncYourSuper = () => {
    navigation.navigate('SuperStack', {
      screen: 'ActiveMembership',
      params: {
        title: 'Superannuation',
        resync: true,
      },
    });
  };

  return {
    navigateToActiveMembership,
    navigateToSuperIntro,
    navigateToSuperfundDetails,
    navigateToEventDetails,
    navigateToResyncYourSuper,
  };
};
