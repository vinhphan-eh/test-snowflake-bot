import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, Select, Typography, useTheme, type ListRenderOptionInfo } from '@hero-design/rn';
import type { OptionType } from '@hero-design/rn/types/components/Select/types';
import { capitalize } from '../../../../../common/utils/string';
import type { Weekday } from '../../../../../new-graphql/generated';
import { useIntl } from '../../../../../providers/LocalisationProvider';

export type DayOption = {
  value: Weekday;
  estimatedBalances: string;
  isRecommended: boolean;
};

export const Chip = ({ style, testID, text }: { text: string; style?: object; testID?: string }) => {
  return (
    <Box
      paddingVertical="xsmall"
      paddingHorizontal="small"
      borderRadius="large"
      backgroundColor="highlightedSurface"
      flexDirection="row"
      marginLeft="small"
      style={style}
      testID={testID}
    >
      <Typography.Caption fontWeight="semi-bold">{text}</Typography.Caption>
    </Box>
  );
};

const DaySelection = ({
  onSelect,
  options,
  selectedValue,
}: {
  onSelect: (v: DayOption) => void;
  selectedValue: DayOption;
  options: { text: string; value: DayOption }[];
}) => {
  const { colors, space } = useTheme();
  const { formatMessage } = useIntl();

  const renderOption = ({ item: { text, value }, onPress }: ListRenderOptionInfo<DayOption, OptionType<DayOption>>) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: colors.defaultGlobalSurface,
      }}
      testID={`${text}-option`}
    >
      <Box
        flexDirection="row"
        paddingVertical="medium"
        paddingHorizontal="small"
        borderRadius="medium"
        justifyContent="space-between"
      >
        <Typography.Body intent="body">{text}</Typography.Body>
        <Box flexDirection="row">
          {Boolean(value.isRecommended) && (
            <Chip testID={`${text}-recommended`} text={formatMessage({ id: 'common.recommended' })} />
          )}
          {Boolean(value.estimatedBalances) && (
            <Chip
              text={formatMessage(
                { id: 'instapay.scheduling.byDaySubscription.dateOption.availableBalanceOption' },
                {
                  amount: value.estimatedBalances,
                }
              )}
            />
          )}
        </Box>
      </Box>
    </TouchableOpacity>
  );

  const recommendedOption = options.find(o => o.value.isRecommended);

  return (
    <>
      <Typography.Title level="h5" typeface="playful" style={{ marginTop: space.medium }}>
        {formatMessage({ id: 'instapay.scheduling.byDaySubscription.dateOption.title' })}
      </Typography.Title>
      <Select
        options={options}
        value={selectedValue || options[0].value}
        onConfirm={v => v && onSelect(v)}
        label=""
        bottomSheetConfig={{
          header: formatMessage({ id: 'instapay.scheduling.byDaySubscription.dateOption.title' }),
        }}
        keyExtractor={opt => opt.value.value}
        renderSelectedValue={v => (
          <Box flex={1} flexDirection="row" justifyContent="space-between">
            <Typography.Body variant="regular-bold">{capitalize(v?.value ?? '')}</Typography.Body>
            {Boolean(v?.estimatedBalances) && (
              <Chip
                text={formatMessage(
                  { id: 'instapay.scheduling.byDaySubscription.dateOption.availableBalanceOption' },
                  {
                    amount: v?.estimatedBalances,
                  }
                )}
              />
            )}
          </Box>
        )}
        renderOption={renderOption}
        testID="day-selection"
      />
      {recommendedOption && (
        <Typography.Caption>
          {formatMessage(
            { id: 'instapay.scheduling.byDaySubscription.dateOption.recommendedDay' },
            {
              day: (
                <Typography.Caption intent="primary" fontWeight="semi-bold">
                  {recommendedOption?.text}
                </Typography.Caption>
              ),
            }
          )}
        </Typography.Caption>
      )}
    </>
  );
};

export default DaySelection;
