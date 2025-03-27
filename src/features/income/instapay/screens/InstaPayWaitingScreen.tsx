import React, { useEffect } from 'react';
import { useTheme } from '@hero-design/rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import { OutcomeTemplate } from '../../../../common/components/outcome-template/OutcomeTemplate';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import { queryClient } from '../../../../common/libs/queryClient';
import { useAddBeneficiaryMutation, useGetBankAccountsForOrgQuery } from '../../../../new-graphql/generated';
import { useRegionLocalisation } from '../../../../providers/LocalisationProvider';
import { useInstaPaySchedulingStore } from '../../instapay-scheduling/stores/useInstaPaySchedulingStore';
import type { InstaPayRouteProp, InstaPayScreenNavigationProp } from '../navigation/navigationTypes';
import { useInstaPayDrawdownStore } from '../stores/useInstaPayDrawdownStore';

export const InstaPayWaitingScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<InstaPayScreenNavigationProp<'InstaPayWaiting'>>();
  const {
    params: { feature, flow },
  } = useRoute<InstaPayRouteProp<'InstaPayWaiting'>>();
  const { formatMessage } = useRegionLocalisation();
  const setHasVerifiedBankAccount = useInstaPaySchedulingStore(state => state.setHasVerifiedBankAccount);

  const bankAccountNow = useInstaPayDrawdownStore(state => state.bankAccount);
  const bankAccountScheduling = useInstaPaySchedulingStore(state => state.bankAccount);
  const isRecurring = feature === 'Recurring';
  const bankAccount = isRecurring ? bankAccountScheduling : bankAccountNow;

  const recurringMembership = useInstaPaySchedulingStore(state => state.membership);
  const nowMembership = useInstaPayDrawdownStore(state => state.membership);
  const currentMembership = isRecurring ? recurringMembership : nowMembership;

  const { mutateAsync: addBeneficiary } = useAddBeneficiaryMutation();

  const triggerAddBeneficiary = () => {
    const bankDetail = bankAccount?.isSSA
      ? {
          swagSpendAccount: {
            id: bankAccount?.externalId || '',
          },
        }
      : {
          sortCode: {
            sortCode: bankAccount?.bsb || '',
            accountNumber: bankAccount?.accountNumber || '',
          },
        };

    return addBeneficiary({
      input: {
        info: {
          fullName: bankAccount?.accountName || '',
        },
        ...bankDetail,
      },
    });
  };

  useEffect(() => {
    if (flow === 'AddBeneficiary') {
      triggerAddBeneficiary()
        .then(() => {
          if (isRecurring) {
            setHasVerifiedBankAccount(true);
            navigation.replace('InstaPaySchedulingStack', {
              screen: 'InstaPaySchedulingConfirmation',
            });
          } else {
            navigation.replace('InstaPayConfirm');
          }

          queryClient.invalidateQueries(
            useGetBankAccountsForOrgQuery.getKey({
              id: `${currentMembership?.getId() ?? -1}`,
            })
          );
        })
        .catch(() => {
          navigation.replace('InstaPayTrustedBeneficiaryError');
        });
    }
  }, []);

  return (
    <>
      <CustomStatusBar backgroundColor={colors.decorativePrimarySurface} />
      <OutcomeTemplate
        title={formatMessage({ id: 'instapay.waiting.title' })}
        content={formatMessage({ id: 'instapay.waiting.content' })}
        imageName="waiting-white"
      />
    </>
  );
};
