import { useNavigation } from '@react-navigation/native';
import { AppDataStorageKey } from '../../../common/libs/storage/appDataStorage';
import { useAppStorageToggle } from '../../../common/shared-hooks/useAppStorageToggle';
import type { RootStackNavigationProp } from '../../../navigation/navigationTypes';
import type { TrackingAttributes } from '../navigation/navigationTypes';
import { SALARY_SACRIFICE_TITLE } from '../salary-sacrifice/constants';

export const useSalarySacrificeNavigation = (trackingAttributes?: TrackingAttributes) => {
  const { isToggle } = useAppStorageToggle(AppDataStorageKey.SalarySacrificeIntroSeen);
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();

  const navigateToSalarySacrifice = () => {
    if (isToggle) {
      navigation.navigate('SuperStack', {
        screen: 'SalarySacrificeStack',
        params: {
          screen: 'ActiveEmployer',
          params: {
            title: SALARY_SACRIFICE_TITLE,
            trackingAttributes,
          },
        },
      });
    } else {
      navigation.navigate('SuperStack', {
        screen: 'SalarySacrificeStack',
        params: {
          screen: 'SalarySacrificeIntro',
          params: {
            trackingAttributes,
          },
        },
      });
    }
  };

  const navigateToManageContributions = () => {
    navigation.navigate('SuperStack', {
      screen: 'SalarySacrificeStack',
      params: {
        screen: 'ManageContributions',
        params: { title: SALARY_SACRIFICE_TITLE, trackingAttributes },
      },
    });
  };

  const navigateToActiveEmployer = () => {
    navigation.navigate('SuperStack', {
      screen: 'SalarySacrificeStack',
      params: {
        screen: 'ActiveEmployer',
        params: {
          title: SALARY_SACRIFICE_TITLE,
          trackingAttributes,
        },
      },
    });
  };

  return { navigateToSalarySacrifice, navigateToActiveEmployer, navigateToManageContributions };
};
