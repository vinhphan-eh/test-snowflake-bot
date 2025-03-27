import { useNavigation } from '@react-navigation/native';
import type { RootStackNavigationProp } from '../../../navigation/navigationTypes';
import type { SuperConsolidation, SwagSuperfund } from '../../../new-graphql/generated';
import { FIND_YOUR_LOST_SUPER_TILE, LEGAL_AGREEMENT_TILE } from '../consolidation/constants';

export const useSuperConsolidationNavigation = () => {
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();

  const navigateToSuperConsolidationIntro = (swagSuperfund: SwagSuperfund) => {
    navigation.navigate('SuperStack', {
      screen: 'ConsolidationStack',
      params: {
        screen: 'SuperConsolidationIntro',
        params: {
          swagSuperfund,
          trackingAttributes: {
            fundName: swagSuperfund.fundName,
            usi: swagSuperfund.usi,
          },
        },
      },
    });
  };

  const navigateToLegalAgreement = (swagSuperfund: SwagSuperfund) => {
    navigation.navigate('SuperStack', {
      screen: 'ConsolidationStack',
      params: {
        screen: 'LegalAgreement',
        params: {
          title: LEGAL_AGREEMENT_TILE,
          swagSuperfund,
          trackingAttributes: {
            fundName: swagSuperfund.fundName,
            usi: swagSuperfund.usi,
          },
        },
      },
    });
  };

  const navigateToFindYourLostSuper = (superConsolidation: Partial<SuperConsolidation>, fundUrl?: string) => {
    navigation.navigate('SuperStack', {
      screen: 'ConsolidationStack',
      params: {
        screen: 'FindYourLostSuper',
        params: {
          title: FIND_YOUR_LOST_SUPER_TILE,
          fundUrl,
          superConsolidation,
          trackingAttributes: {
            fundUrl: fundUrl ?? '',
            fundName: superConsolidation.fundName ?? '',
            usi: superConsolidation.usi ?? '',
          },
        },
      },
    });
  };

  const navigateToCreateConsolidationFailed = ({
    errorMessage,
    fundName,
    usi,
  }: {
    errorMessage: string;
    fundName: string;
    usi: string;
  }) => {
    navigation.navigate('SuperStack', {
      screen: 'ConsolidationStack',
      params: {
        screen: 'CreateSuperConsolidationFailed',
        params: {
          errorMessage,
          trackingAttributes: {
            usi,
            fundName,
            errorMessage,
          },
        },
      },
    });
  };

  const navigateToCreateConsolidationRequestSuccess = ({ fundName, usi }: { fundName: string; usi: string }) =>
    navigation.navigate('SuperStack', {
      screen: 'ConsolidationStack',
      params: {
        screen: 'CreateSuperConsolidationSupportRequestSuccessScreen',
        params: {
          fundName,
          trackingAttributes: {
            fundName,
            usi,
          },
        },
      },
    });

  const navigateBack = () => navigation.goBack();

  return {
    navigateToSuperConsolidationIntro,
    navigateToLegalAgreement,
    navigateToFindYourLostSuper,
    navigateToCreateConsolidationFailed,
    navigateBack,
    navigateToCreateConsolidationRequestSuccess,
  };
};
