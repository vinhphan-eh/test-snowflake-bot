import React from 'react';
import { useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { GeneralError } from '../../../../common/components/error';
import { OverlayLoadingScreen } from '../../../../common/components/spinner';
import ThemeSwitcher from '../../../../common/utils/ThemeSwitcher';
import type { RootStackNavigationProp } from '../../../../navigation/navigationTypes';
import { navigateToTopTabs } from '../../../../navigation/rootNavigation';
import type { Subscription } from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { BillStatusesTile } from '../../../benefits/bill-streaming/components/bill-statuses-tile';
import { useBenefitsBillMgmtTracking } from '../../../benefits/bill-streaming/hooks/useBenefitsBillMgmtTracking';
import { useGetAllBillOffers } from '../../../benefits/bill-streaming/hooks/useGetAllBillOffers';
import { GroupList } from '../../../benefits/group/components/group-list';

export const BillManagementEmptyState = ({ subscriptions }: { subscriptions: Subscription[] }) => {
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  const { space } = useTheme();
  const { formatMessage } = useIntl();
  const { trackClickGoBackToBill } = useBenefitsBillMgmtTracking();

  const { billOffers: offers, isError, isLoading } = useGetAllBillOffers({});
  const [offer] = offers;

  const onRenew = (signUpLink: string) => {
    navigation.navigate('BenefitsStack', {
      screen: 'BillStreamStack',
      params: {
        screen: 'BillSignUpWebView',
        params: {
          url: signUpLink,
          onBackToBill: () => {
            trackClickGoBackToBill(offer?.provider.name ?? '');
            navigateToTopTabs('bill-management');
          },
        },
      },
    });
  };

  if (isError) {
    return <GeneralError testID="bill_streaming_dashboard_error" themeName="eBens" />;
  }

  return (
    <ThemeSwitcher name="eBens">
      <BillStatusesTile
        subscriptions={subscriptions}
        onClickRenew={onRenew}
        style={{
          marginTop: space.large,
          marginLeft: space.medium,
          marginRight: space.medium,
        }}
        isShowSubTitle
      />
      <GroupList
        style={{ marginTop: space.large }}
        title={formatMessage({ id: 'megadeal.group.card.titleOnBillManagement' })}
      />
      {isLoading && <OverlayLoadingScreen />}
    </ThemeSwitcher>
  );
};
