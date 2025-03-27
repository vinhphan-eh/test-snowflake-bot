import React, { useEffect, useState } from 'react';
import { FAB, useTheme } from '@hero-design/rn';
import type { ActionItemProps } from '@hero-design/rn/types/components/FAB/ActionGroup/ActionItem';
import { useNavigation } from '@react-navigation/native';
import { useIsAccountUK } from '../../../common/hooks/useIsAccountUK';
import { useShowPaySplit } from '../../../common/hooks/useShowPaySplit';
import { usePermissionStore } from '../../../common/stores/usePermissionStore';
import type { RootStackNavigationProp } from '../../../navigation/navigationTypes';
import { useGetStashesQuery } from '../../../new-graphql/generated';
import { useIntl } from '../../../providers/LocalisationProvider';
import { useSeenPaySplitIntro } from '../../income/pay-split/hooks/useSeenPaySplitIntro';

type PaymentFABProps = {
  shouldLoadStashes: boolean;
  shouldLoadScheduledPayment?: boolean;
};

const SET_ACTIVE_TIMEOUT = 100;

export const PaymentFAB = ({ shouldLoadScheduledPayment = false, shouldLoadStashes }: PaymentFABProps) => {
  const { data: stashes, isFetching: stashLoading } = useGetStashesQuery(undefined, {
    enabled: shouldLoadStashes,
  });

  const { space } = useTheme();
  const [active, setActive] = useState(false);
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  const [actionItems, setActionItems] = useState<ActionItemProps[]>([]);
  const isAccountUK = useIsAccountUK();
  const showPaySplit = useShowPaySplit();
  const { hasUserSeenThis: hasUserSeenPaySplitIntro } = useSeenPaySplitIntro();
  const scheduledPaymentPermission = usePermissionStore(state => state.permissions?.eBenMoneyScheduledPayment?.view);
  const payeeAddressBookPermission = usePermissionStore(state => state.permissions?.eBenPayeeAddressBook?.view);
  const { formatMessage } = useIntl();

  /**
   * Initialize the FAB action items when all data is ready.
   * Because dynamic actionItems are not supported on Android (crashes the app)
   */
  useEffect(() => {
    if (stashLoading) {
      return;
    }

    const actions: ActionItemProps[] = [
      {
        icon: 'user',
        title: formatMessage({ id: 'spend-account.payment-fab.paySomeone' }),
        onPress: () => {
          if (isAccountUK) {
            navigation.navigate('PayAnyoneStack', { screen: 'UkPayeeDetails' });
          } else if (payeeAddressBookPermission) {
            navigation.navigate('PayAnyoneStack', { screen: 'PayeeAddressBook' });
          } else {
            navigation.navigate('PayAnyoneStack', { screen: 'PayeeDetails' });
          }
          setTimeout(() => {
            setActive(false);
          }, SET_ACTIVE_TIMEOUT);
        },
      },
    ];

    if (stashes?.me?.wallet?.stash?.items?.length) {
      actions.unshift({
        icon: 'user',
        title: formatMessage({ id: 'spend-account.payment-fab.stashCash' }),
        onPress: () => {
          navigation.navigate('StashStack', { screen: 'StashSelection' });
          setTimeout(() => {
            setActive(false);
          }, SET_ACTIVE_TIMEOUT);
        },
      });
    }

    if (showPaySplit) {
      actions.unshift({
        icon: 'call-split-outlined',
        title: formatMessage({ id: 'spend-account.payment-fab.paySplit' }),
        onPress: async () => {
          const seenIntro = await hasUserSeenPaySplitIntro();
          if (seenIntro) {
            navigation.navigate('PaySplitStack', { screen: 'PaySplitOrgList' });
          } else {
            navigation.navigate('PaySplitStack', { screen: 'PaySplitIntro', params: {} });
          }

          setTimeout(() => {
            setActive(false);
          }, SET_ACTIVE_TIMEOUT);
        },
      });
    }

    if (shouldLoadScheduledPayment && scheduledPaymentPermission) {
      actions.unshift({
        icon: 'calendar',
        title: formatMessage({ id: 'spend-account.payment-fab.scheduledPayments' }),
        onPress: () => {
          navigation.navigate('PayAnyoneStack', { screen: 'ScheduledPaymentDashboard' });
          setTimeout(() => {
            setActive(false);
          }, SET_ACTIVE_TIMEOUT);
        },
      });
    }

    setActionItems(actions);
  }, [stashLoading]);

  /**
   * TODO: loading indicotor of skeleton is nice to have
   */
  if (!actionItems.length) {
    return null;
  }

  return (
    <FAB.ActionGroup
      style={{ marginBottom: space['5xlarge'] }}
      items={actionItems}
      fabIcon={active ? 'add' : 'dollar-sign'}
      fabTitle={active ? undefined : 'Payments'}
      onPress={() => setActive(!active)}
      active={active}
      testID="payment-fab"
    />
  );
};
