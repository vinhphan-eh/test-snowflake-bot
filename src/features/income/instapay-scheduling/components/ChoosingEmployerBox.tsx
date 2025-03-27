import React, { useMemo } from 'react';
import { Box, Divider, Icon, List, Select, Typography, useTheme } from '@hero-design/rn';
import type { ListRenderOptionInfo } from '@hero-design/rn/types/components/Select/types';
import { getDefaultCurrency } from '../../../../common/utils/currency';
import { createCurrencyFormatter } from '../../../../common/utils/numbers';
import { useIntl } from '../../../../providers/LocalisationProvider';
import type { InstaPayOrg } from '../../instapay/hooks/useInstaPayAvailableBalances';
import { useInstaPayDrawdownStore } from '../../instapay/stores/useInstaPayDrawdownStore';
import { WithdrawYourEarnedPaySectionKey } from '../stores/useWithdrawYourEarnedPaySectionStore';
import { useCheckRecurringByAmountEligibility } from '../hooks/useCheckRecurringByAmountEligibility';

type CustomOptionType = {
  text: string;
  value: string;
  isError: boolean;
  formattedBalance: string;
  shouldShowBottomSeparator: boolean;
  shouldShowBalance?: boolean;
};

type ChoosingEmployerBoxProps = {
  organisations: InstaPayOrg[];
  onChange: (value: string | null) => void;
  currentMembership: InstaPayOrg | null;
  ewaMode: WithdrawYourEarnedPaySectionKey.NOW | WithdrawYourEarnedPaySectionKey.RECURRING;
};

const SelectEmployerOption = ({ optionInfo }: { optionInfo: ListRenderOptionInfo<string, CustomOptionType> }) => {
  const {
    formattedBalance,
    isError,
    shouldShowBalance = true,
    shouldShowBottomSeparator,
    text: organisationName,
  } = optionInfo.item;

  const renderSuffix = () => {
    if (isError) {
      return <Icon testID="error-icon" icon="circle-info-outlined" size="xsmall" intent="danger" />;
    }

    return shouldShowBalance ? <Typography.Body variant="regular-bold">{formattedBalance}</Typography.Body> : undefined;
  };

  return (
    <>
      <List.BasicItem
        testID={`select-option-org-${organisationName}`}
        selected={optionInfo.selected}
        onPress={optionInfo.onPress}
        suffix={renderSuffix()}
        title={<Typography.Body>{organisationName}</Typography.Body>}
      />
      {shouldShowBottomSeparator && <Divider />}
    </>
  );
};

export const ChoosingEmployerBox = ({
  currentMembership,
  ewaMode,
  onChange,
  organisations,
}: ChoosingEmployerBoxProps) => {
  const { formatMessage } = useIntl();
  const memberWorkCountry = useInstaPayDrawdownStore(state => state.workCountry);
  const currency = getDefaultCurrency(memberWorkCountry);
  const formatCurrency = createCurrencyFormatter();
  const { space } = useTheme();
  const { getOrgRecurringByAmountEligibility } = useCheckRecurringByAmountEligibility();

  const isOrgError = (organisation: InstaPayOrg) => {
    if (ewaMode === WithdrawYourEarnedPaySectionKey.RECURRING) {
      return !getOrgRecurringByAmountEligibility(organisation.getId())?.isEligible;
    }

    return !!organisation.violation || !organisation.balance;
  };

  const options: CustomOptionType[] = useMemo(() => {
    return organisations.map((organisation, index) => ({
      text: organisation.name,
      value: organisation.getId(),
      isError: isOrgError(organisation),
      formattedBalance: formatCurrency(organisation.balance, { currency }),
      shouldShowBottomSeparator: index !== organisations.length - 1,
      shouldShowBalance: organisation.balance > 0,
    }));
  }, [organisations]);

  if (!currentMembership) {
    return null;
  }

  return (
    <Box marginBottom="large">
      <Box style={{ width: '100%' }} marginBottom="medium">
        <Box>
          <Typography.Body
            variant="small-bold"
            style={{
              marginBottom: space.medium,
            }}
          >
            {formatMessage({ id: 'instapay.withdrawEarnedPayBox.now.multipleOrgs.chooseEmployerCaption' })}
          </Typography.Body>

          <Select
            testID="choosing-employer-select"
            value={currentMembership?.getId() ?? ''}
            onConfirm={onChange}
            options={options}
            renderOption={(optionInfo: ListRenderOptionInfo<string, CustomOptionType>) => (
              <SelectEmployerOption key={optionInfo.item.text} optionInfo={optionInfo} />
            )}
            label={formatMessage({ id: 'instapay.withdrawEarnedPayBox.now.multipleOrgs.selectLabel' })}
          />

          <Typography.Caption
            style={{
              marginTop: -space.smallMedium,
              marginLeft: space.medium,
            }}
          >
            {formatMessage(
              { id: 'instapay.withdrawEarnedPayBox.now.multipleOrgs.availableBalance' },
              {
                balance: formatCurrency(currentMembership.balance, { currency }),
              }
            )}
          </Typography.Caption>
        </Box>
      </Box>

      <Divider />
    </Box>
  );
};
