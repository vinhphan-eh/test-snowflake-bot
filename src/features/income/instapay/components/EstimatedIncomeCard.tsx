import React from 'react';
import { Pressable } from 'react-native';
import { Typography, Box, Spinner, Button } from '@hero-design/rn';
import type { BoxProps } from '@hero-design/rn/types/components/Box';
import { CurrencyText } from '../../../../common/components/currency-text/CurrencyText';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import { getDefaultCurrency, getFloatAmountFromMoneyV2 } from '../../../../common/utils/currency';
import { differenceInDays } from '../../../../common/utils/date';
import {
  type EstimatedIncomePayload,
  type IncomeDeduction,
  type Maybe,
  useGetEstimatedIncomeQuery,
} from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import type { Region } from '../../../../providers/LocalisationProvider/constants';

type EstimatedIncomeCardProps = {
  country: Region;
  openDescription?: () => void;
} & BoxProps;

const sumDeductions = (deductions: Maybe<IncomeDeduction>[]): number => {
  return deductions.reduce((sum, deduction) => {
    if (deduction) {
      return sum + getFloatAmountFromMoneyV2(deduction.amount);
    }
    return sum;
  }, 0);
};

export const EstimatedIncomeCard = ({ country, openDescription }: EstimatedIncomeCardProps) => {
  const Intl = useIntl();

  const currentOrgId = useSessionStore(state => state.currentOrgUuid ?? state.currentWorkzoneOrgId ?? '');
  const {
    data,
    isError: estimatedIncomeError,
    isLoading: isEstimatedIncomeLoading,
  } = useGetEstimatedIncomeQuery(
    {
      orgID: currentOrgId.toString(),
    },
    {
      enabled: !!currentOrgId,
    }
  );

  const filteredDataByOrg = data?.me?.org;
  const incomeDetails = filteredDataByOrg?.instapay?.estimatedIncome as EstimatedIncomePayload;
  const currency = getDefaultCurrency(country);

  const totalDeductions = incomeDetails?.deductions ? sumDeductions(incomeDetails.deductions) : 0;
  const floatIncome = incomeDetails?.income ? getFloatAmountFromMoneyV2(incomeDetails.income) : 0;
  const finalIncome = floatIncome - totalDeductions;

  const daysToPaymentDate = incomeDetails?.payPeriod?.paymentDate
    ? differenceInDays(incomeDetails?.payPeriod.paymentDate)
    : 0;
  const clickOnQuestionMark = () => {
    openDescription?.();
  };

  if (!isEstimatedIncomeLoading && (estimatedIncomeError || !incomeDetails?.income)) {
    return null;
  }

  const content = () => {
    return (
      <Pressable testID="estimated-income-card-content-body" onPress={() => openDescription?.()}>
        <Box flexDirection="row" justifyContent="space-between" alignItems="center">
          <Typography.Body>{Intl.formatMessage({ id: 'instapay.estimatedIncome.tile.income' })}</Typography.Body>
          <CurrencyText
            testID="instapay-estimated-income-total"
            amount={floatIncome}
            renderCurrency={amount => <Typography.Body variant="regular-bold">{amount}</Typography.Body>}
            renderDecimal={amount => <Typography.Body variant="regular-bold">{amount}</Typography.Body>}
            currency={currency}
          />
        </Box>
        <Box flexDirection="row" justifyContent="space-between" alignItems="center" marginTop="small">
          <Typography.Body>{Intl.formatMessage({ id: 'instapay.estimatedIncome.tile.deduction' })}</Typography.Body>
          <CurrencyText
            testID="instapay-estimated-income-deduction"
            amount={totalDeductions}
            renderCurrency={amount => <Typography.Body variant="regular-bold">-{amount}</Typography.Body>}
            renderDecimal={amount => <Typography.Body variant="regular-bold">{amount}</Typography.Body>}
            currency={currency}
          />
        </Box>
        <Box flexDirection="row" justifyContent="space-between" alignItems="center">
          <Box flexDirection="row" alignItems="center">
            <Typography.Body intent="primary" variant="regular-bold">
              {Intl.formatMessage({ id: 'instapay.estimatedIncome.tile.final' })}
            </Typography.Body>
            <Box padding="small" borderRadius="xxlarge" backgroundColor="decorativePrimarySurface" marginLeft="small">
              <Typography.Body variant="small-bold">
                {Intl.formatMessage(
                  { id: 'instapay.estimatedIncome.tile.countDaysFromNow' },
                  { countDaysFromNow: daysToPaymentDate }
                )}
              </Typography.Body>
            </Box>
          </Box>
          <CurrencyText
            testID="instapay-estimated-income-final"
            amount={finalIncome}
            renderCurrency={amount => (
              <Typography.Body intent="primary" variant="regular-bold">
                {amount}
              </Typography.Body>
            )}
            renderDecimal={amount => (
              <Typography.Body intent="primary" variant="regular-bold">
                {amount}
              </Typography.Body>
            )}
            currency={currency}
          />
        </Box>
      </Pressable>
    );
  };

  return (
    <Box>
      <Box
        testID="instapay-estimated-income-tile"
        backgroundColor="defaultSurface"
        padding="medium"
        justifyContent="space-between"
        display="flex"
        style={[
          {
            minHeight: 98,
            maxHeight: 136,
          },
        ]}
      >
        {isEstimatedIncomeLoading ? <Spinner accessibilityLabel="spinner" /> : content()}
      </Box>
      {!isEstimatedIncomeLoading && (
        <Box paddingLeft="medium" flexDirection="row" marginTop="small">
          <Typography.Caption>
            {Intl.formatMessage({ id: 'instapay.estimatedIncome.tile.clarification' })}
          </Typography.Caption>
          <Box paddingLeft="xsmall">
            <Button.Icon
              icon="circle-question-outlined"
              size="xsmall"
              intent="primary"
              onPress={() => clickOnQuestionMark()}
              testID="estimated-income-question-btn"
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};
