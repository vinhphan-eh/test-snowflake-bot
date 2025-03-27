import React, { useState } from 'react';
import { Box, Button, Select, TextInput, Typography, useTheme } from '@hero-design/rn';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAvoidingViewContainer } from '../../../../common/components/layout';
import { Page } from '../../../../common/components/layout/page';
import { MultipleChoiceButtonGroup } from '../../../../common/components/multiple-choice-button-group/MultipleChoiceButtonGroup';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import { PillarIds, WalletTabKeys } from '../../../../common/constants/navigation';
import { switchPillar } from '../../../../common/stores/useMiniAppSwitcherStore';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { useInstaPaySchedulingEventTracking } from '../hooks/useInstaPaySchedulingEventTracking';
import {
  WithdrawYourEarnedPaySectionKey,
  useWithdrawYourEarnedPaySectionStore,
} from '../stores/useWithdrawYourEarnedPaySectionStore';

interface Reason {
  categoryName: string;
  description: string;
  selected?: boolean;
  reasons: { label: string; selected?: boolean }[];
}

interface SelectionsProps {
  selections: Reason[];
  onSelectionsChanged: (reason: Reason[]) => void;
}

const resetReasonByNewCategory = (selections: Reason[], newSelection: string | null) => {
  return selections.map(item => {
    if (item.categoryName === newSelection) {
      return {
        ...item,
        selected: true,
      };
    }

    return {
      ...item,
      selected: false,
      reasons: item.reasons.map(reason => ({ ...reason, selected: false })),
    };
  });
};

const ReasonSelection = ({ onSelectionsChanged, selections }: SelectionsProps) => {
  const { formatMessage } = useIntl();
  const { space } = useTheme();
  const [singleValue, setSingleValue] = useState<string | null>(null);
  const options = selections.map(({ categoryName }) => ({
    text: categoryName,
    value: categoryName,
  }));

  let transformWithSelected = resetReasonByNewCategory(selections, singleValue);

  const filterdOptions = transformWithSelected.find(({ categoryName }) => categoryName === singleValue);
  const filteredReasons = filterdOptions?.reasons || [];
  const description = filterdOptions?.description || '';

  return (
    <Box marginTop="small">
      <Select
        options={options}
        value={singleValue}
        onConfirm={(newValue: string | null) => {
          setSingleValue(newValue);
          onSelectionsChanged(resetReasonByNewCategory(selections, newValue));
        }}
        keyExtractor={opt => opt.value}
        required
        label={formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.selectLabel' })}
      />
      <Typography.Caption style={{ marginVertical: space.smallMedium }}>{description}</Typography.Caption>
      <MultipleChoiceButtonGroup
        choices={filteredReasons}
        onChoicePressed={label => {
          const newReasons = filteredReasons.map(reason => {
            if (reason.label === label) {
              return { ...reason, selected: !reason.selected };
            }
            return reason;
          });
          transformWithSelected = transformWithSelected.map(item => {
            if (item.selected) {
              return {
                ...item,
                reasons: newReasons,
              };
            }
            return item;
          });
          onSelectionsChanged(transformWithSelected);
        }}
      />
    </Box>
  );
};

export const InstaPaySchedulingOptOutSurveyScreen = () => {
  const { colors, space } = useTheme();
  const { formatMessage } = useIntl();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const otherReasonLabel = formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.otherReason' });
  const reasonData: Reason[] = [
    {
      categoryName: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason1.categoryName' }),
      description: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason1.description' }),
      reasons: [
        { label: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason1.option1' }), selected: false },
        { label: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason1.option2' }) },
        { label: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason1.option3' }) },
        { label: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason1.option4' }) },
        { label: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason1.option5' }) },
        { label: otherReasonLabel },
      ],
    },
    {
      categoryName: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason2.categoryName' }),
      description: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason2.description' }),
      reasons: [
        { label: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason2.option1' }) },
        { label: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason2.option2' }) },
        { label: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason2.option3' }) },
        { label: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason2.option4' }) },
        { label: otherReasonLabel },
      ],
    },
    {
      categoryName: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason3.categoryName' }),
      description: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason3.description' }),
      reasons: [
        { label: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason3.option1' }) },
        { label: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason3.option2' }) },
        { label: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason3.option3' }) },
        { label: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason3.option4' }) },
        { label: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason3.option5' }) },
        { label: otherReasonLabel },
      ],
    },
    {
      categoryName: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason4.categoryName' }),
      description: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason4.description' }),
      reasons: [
        { label: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason4.option1' }) },
        { label: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason4.option2' }) },
        { label: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason4.option3' }) },
        { label: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason4.option4' }) },
        { label: otherReasonLabel },
      ],
    },
    {
      categoryName: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason5.categoryName' }),
      description: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason5.description' }),
      reasons: [
        { label: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason5.option1' }) },
        { label: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason5.option2' }) },
        { label: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason5.option3' }) },
        { label: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason5.option4' }) },
        { label: otherReasonLabel },
      ],
    },
    {
      categoryName: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason6.categoryName' }),
      description: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason6.description' }),
      reasons: [
        { label: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason6.option1' }) },
        { label: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason6.option2' }) },
        { label: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason6.option3' }) },
        { label: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason6.option4' }) },
        { label: otherReasonLabel },
      ],
    },
    {
      categoryName: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason7.categoryName' }),
      description: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason7.description' }),
      reasons: [
        { label: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason7.option1' }) },
        { label: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason7.option2' }) },
        { label: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason7.option3' }) },
        { label: formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.reason7.option4' }) },
        { label: otherReasonLabel },
      ],
    },
  ];
  const [selections, setSelections] = useState<Reason[]>(reasonData);
  const [otherReasonText, setOtherReasonText] = useState('');
  const { trackUserSubmittedRecurringOptOutSurvey } = useInstaPaySchedulingEventTracking();
  const selectedCategoryReason = selections.find(({ selected }) => selected);
  const selectedReasons = selectedCategoryReason?.reasons.filter(({ selected }) => selected) || [];

  const cancelNote = selectedReasons
    .map(({ label }) => {
      if (label === otherReasonLabel) {
        return `${label}: ${otherReasonText}`;
      }
      return label;
    })
    .join(',');

  const shouldShowOtherReason = selectedReasons.some(({ label }) => label === otherReasonLabel);
  const shouldDisableSubmit = !selectedReasons.length || (shouldShowOtherReason && !otherReasonText);

  const navigateIncomeTab = () => {
    switchPillar({
      to: {
        pillarId: PillarIds.WalletApp,
        tab: WalletTabKeys.INCOME,
      },
    });
    useWithdrawYourEarnedPaySectionStore.setState({ selectedTabKey: WithdrawYourEarnedPaySectionKey.NOW });
  };

  const onNextPressed = () => {
    trackUserSubmittedRecurringOptOutSurvey(selectedCategoryReason?.categoryName ?? 'unknown', cancelNote);
    navigateIncomeTab();
  };

  return (
    <KeyboardAvoidingViewContainer>
      <Page
        contentContainerStyle={{
          paddingBottom: bottomInset || space.medium,
          paddingHorizontal: 0,
          backgroundColor: colors.defaultGlobalSurface,
        }}
        showsVerticalScrollIndicator={false}
      >
        <CustomStatusBar barStyle="decorative" backgroundColor={colors.defaultGlobalSurface} />
        <Page.TopBar title={formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.title' })} hideRight hideLeft />
        <Page.Body>
          <Box paddingHorizontal="medium" paddingTop="medium">
            <Typography.Title level="h2" typeface="playful">
              {formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.heading' })}
            </Typography.Title>
            <Typography.Body style={{ marginTop: space.large }}>
              {formatMessage({ id: 'instapay.scheduling.optOutSurveyScreen.body' })}
            </Typography.Body>
            <ReasonSelection selections={selections} onSelectionsChanged={setSelections} />
            {shouldShowOtherReason && (
              <TextInput
                label={formatMessage({ id: 'community.experiment.not.now.survey.reason.other.title' })}
                required
                style={{ marginTop: space.medium }}
                onChangeText={setOtherReasonText}
                value={otherReasonText}
              />
            )}
          </Box>
        </Page.Body>
        <Page.Footer marginHorizontal="medium" marginTop="large">
          <Button
            testID="instapay-scheduling-subscription-confirm"
            onPress={onNextPressed}
            disabled={shouldDisableSubmit}
            text={formatMessage({ id: 'common.submit' })}
          />
          <Button onPress={navigateIncomeTab} text={formatMessage({ id: 'common.not.now' })} variant="text" />
        </Page.Footer>
      </Page>
    </KeyboardAvoidingViewContainer>
  );
};
