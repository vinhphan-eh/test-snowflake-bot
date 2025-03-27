import React, { useState } from 'react';
import { SectionList } from 'react-native';
import type { IconName } from '@hero-design/rn';
import { Alert, Box, Icon, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { InlineTextLink } from '../../../../common/components/inline-text-link/InlineTextLink';
import { useInAppBrowser } from '../../../../common/shared-hooks/useInAppBrowser';
import type { RootStackNavigationProp } from '../../../../navigation/navigationTypes';
import { navigateToTopTabs } from '../../../../navigation/rootNavigation';
import type { BillTransaction, SubscriptionEdge } from '../../../../new-graphql/generated';
import { BillStatus, Pid, SubscriptionType } from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { useBenefitsBillMgmtTracking } from '../../../benefits/bill-streaming/hooks/useBenefitsBillMgmtTracking';
import { BillCard } from '../../components/BillCard';
import { AHM_LOGIN_LINK, MEDIBANK_LOGIN_LINK, PAY_BILL_HELP_CENTER } from '../../constant';
import { useMoneyBillMgmtTracking } from '../../hooks/useMoneyBillMgmtTracking';

type BillCardList = {
  category: 'Electricity' | 'Gas' | 'Health Insurance';
  icon: IconName;
  data: Array<SubscriptionEdge>;
};

export const BillManagementDashboard = ({ filteredData }: { filteredData: SubscriptionEdge[] }) => {
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  const [overdueAlert, setOverdueAlert] = useState(true);
  const { colors, space } = useTheme();
  const { openUrl } = useInAppBrowser();
  const { bottom } = useSafeAreaInsets();
  const { trackClickBillSubscription } = useMoneyBillMgmtTracking();
  const { trackClickGoBackToBill } = useBenefitsBillMgmtTracking();
  const { formatMessage } = useIntl();

  const overDueBill = filteredData.filter(e => {
    const bill = e.node?.latestBill as BillTransaction;
    return bill?.status === BillStatus.Overdue;
  });

  const sectionData: BillCardList[] = [
    {
      category: 'Electricity',
      icon: 'bolt-outlined',
      data: filteredData.filter(e => e.node.subscriptionType === SubscriptionType.Electricity),
    },
    {
      category: 'Gas',
      icon: 'propane-tank-outlined',
      data: filteredData.filter(e => e.node.subscriptionType === SubscriptionType.Gas),
    },
    {
      category: 'Health Insurance',
      icon: 'wellness-outlined',
      data: filteredData.filter(e => e.node.subscriptionType === SubscriptionType.HealthInsurance),
    },
  ];

  const renderHeader = () =>
    overDueBill.length && overdueAlert ? (
      <Alert
        testID="overdue-alert"
        style={{ marginBottom: space.small }}
        intent="error"
        onClose={() => setOverdueAlert(false)}
        title="You have 1 overdue payment"
        content={
          <Typography.Body variant="small">
            {formatMessage({ id: 'benefits.bill.overdueMessage1' })}
            <InlineTextLink variant="small" testID="inline-link-text" onPress={() => openUrl(PAY_BILL_HELP_CENTER)}>
              {formatMessage({ id: 'benefits.bill.overdueMessage2' })}
            </InlineTextLink>
            {formatMessage({ id: 'benefits.bill.overdueMessage3' })}
          </Typography.Body>
        }
      />
    ) : null;

  return (
    <SectionList
      style={{ flex: 1 }}
      contentContainerStyle={{
        padding: space.medium,
        paddingBottom: bottom ?? space.medium,
        backgroundColor: colors.neutralGlobalSurface,
      }}
      sections={sectionData}
      showsVerticalScrollIndicator={false}
      stickySectionHeadersEnabled={false}
      ListHeaderComponent={renderHeader}
      keyExtractor={(item, index) => item.node.provider.name + index}
      renderItem={({ item }) => {
        const { description, id, latestBill, provider, signUpLink, status, subscriptionType, title, totalSaved } =
          item.node;

        let billStatus: BillStatus = BillStatus.Unknown;
        let billDueDate = '';
        if (latestBill?.type === 'BILL') {
          const { dueDate, status: latestBillStatus } = latestBill as BillTransaction;
          billStatus = latestBillStatus;
          billDueDate = dueDate;
        }

        return (
          <BillCard
            signUpLink={signUpLink ?? ''}
            testID={id}
            onRenew={() => {
              if (signUpLink) {
                if (subscriptionType === SubscriptionType.HealthInsurance) {
                  return navigation.navigate('BenefitsStack', {
                    screen: 'BillStreamStack',
                    params: {
                      screen: 'BillSignUpWebView',
                      params: {
                        title: formatMessage({ id: 'benefits.bill.healthInsurace' }),
                        url: provider.id === Pid.Ahm ? AHM_LOGIN_LINK : MEDIBANK_LOGIN_LINK,
                        onBackToBill: () => {
                          trackClickGoBackToBill(provider.name);
                          navigateToTopTabs('bill-management');
                        },
                      },
                    },
                  });
                }
                navigation.navigate('BenefitsStack', {
                  screen: 'BillStreamStack',
                  params: {
                    screen: 'BillSignUpWebView',
                    params: {
                      url: signUpLink,
                      onBackToBill: () => {
                        trackClickGoBackToBill(provider.name ?? '');
                        navigateToTopTabs('bill-management');
                      },
                    },
                  },
                });
              }
            }}
            onPress={() => {
              if (subscriptionType === SubscriptionType.HealthInsurance) {
                if (status === 'ACTIVE') {
                  return navigation.navigate('BenefitsStack', {
                    screen: 'BillStreamStack',
                    params: {
                      screen: 'BillSignUpWebView',
                      params: {
                        title: formatMessage({ id: 'benefits.bill.healthInsurace' }),
                        url: provider.id === Pid.Ahm ? AHM_LOGIN_LINK : MEDIBANK_LOGIN_LINK,
                        onBackToBill: () => {
                          trackClickGoBackToBill(provider.name);
                          navigateToTopTabs('bill-management');
                        },
                      },
                    },
                  });
                }
                return navigation.navigate('BenefitsStack', {
                  screen: 'BillStreamStack',
                  params: {
                    screen: 'BillOfferDetailScreen',
                    params: {
                      offerId: provider.id === Pid.Ahm ? '2' : '3',
                      onBackToBill: () => {
                        navigateToTopTabs('bill-management');
                      },
                    },
                  },
                });
              }
              trackClickBillSubscription({
                provider: provider.name,
                planType: subscriptionType,
              });
              navigation.navigate('BillManagementMoney', {
                screen: 'BillingActivity',
                params: {
                  subscription: item.node,
                },
              });
            }}
            logoUrl={provider.logoUrl ?? ''}
            currency={totalSaved.currency}
            key={`${provider.name}${status ?? ''}`}
            title={title || provider.name}
            savedAmount={totalSaved.amount}
            amount={latestBill?.amount.amount}
            status={billStatus}
            subscriptionStatus={status}
            dueDate={billDueDate}
            subscriptionType={subscriptionType}
            description={description ?? ''}
          />
        );
      }}
      renderSectionHeader={({ section: { category, data, icon } }) =>
        data.length ? (
          <Box flexDirection="row" alignItems="center" paddingVertical="small">
            <Icon icon={icon} style={{ marginRight: space.small }} />
            <Typography.Body>{category}</Typography.Body>
          </Box>
        ) : null
      }
    />
  );
};
