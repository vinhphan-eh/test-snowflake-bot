import React, { useState, type ReactElement } from 'react';
import { Pressable } from 'react-native';
import { Box, Button, TextInput, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Page } from '../../../../common/components/layout/page';
import { MultipleChoiceButtonGroup } from '../../../../common/components/multiple-choice-button-group/MultipleChoiceButtonGroup';
import { RadioCardGroup } from '../../../../common/components/radio-card-group';
import { CheckedRadio, UnCheckedRadio } from '../../../../common/components/radio-card-group/StyledRadio';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import { navigateToTopTabs } from '../../../../navigation/rootNavigation';
import { useSubmitInstaPayDrawdownSurveyMutation } from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { useInstapayTracking } from '../hooks/useInstapayTracking';
import type { InstaPayScreenNavigationProp } from '../navigation/navigationTypes';

// #region ReasonSelection
interface Reason {
  label: string;
  code?: 'OTHER';
  selected?: boolean;
}

interface SelectionsProps {
  title?: string;
  selections: Reason[];
  onSelectionsChanged: (reasons: Reason[]) => void;
}

const ReasonSelection = ({ onSelectionsChanged, selections, title }: SelectionsProps) => {
  const { space } = useTheme();

  return (
    <>
      {title && (
        <Typography.Body variant="regular-bold" typeface="neutral" style={{ marginTop: space.large }}>
          {title}
        </Typography.Body>
      )}
      <MultipleChoiceButtonGroup
        choices={selections}
        onChoicePressed={label => {
          const newReasons = selections.map(reason => {
            if (reason.label === label) {
              return { ...reason, selected: !reason.selected };
            }
            return reason;
          });
          onSelectionsChanged(newReasons);
        }}
      />
    </>
  );
};
// #endregion

// #region RadioOptionItem
interface RadioOptionItemProps {
  onPress: () => void;
  content: string | ReactElement;
  checked: boolean;
}

const RadioOptionItem = ({ checked, content, onPress }: RadioOptionItemProps) => {
  return (
    <Pressable onPress={onPress}>
      <Box
        padding="medium"
        paddingVertical="smallMedium"
        borderRadius="base"
        backgroundColor={checked ? 'highlightedSurface' : 'defaultGlobalSurface'}
        flexDirection="row"
        alignItems="center"
      >
        <Box flex={1} paddingEnd="medium">
          <Typography.Body>{content}</Typography.Body>
        </Box>
        <Box padding="small">{checked ? <CheckedRadio /> : <UnCheckedRadio />}</Box>
      </Box>
    </Pressable>
  );
};
// #endregion

export const InstaPayDrawdownSurveyScreen = () => {
  const { trackClickNotNowOnDrawdownSurveyScreen, trackSubmitDrawdownSurvey } = useInstapayTracking();
  const navigation = useNavigation<InstaPayScreenNavigationProp<'InstaPayDrawdownSurvey'>>();
  const { formatMessage } = useIntl();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { isLoading: submittingSurvey, mutateAsync: submitDrawdownSurvey } = useSubmitInstaPayDrawdownSurveyMutation();

  const { space } = useTheme();

  const [usageReasonSelections, setUsageReasonSelections] = useState<Reason[]>([
    { label: formatMessage({ id: 'instapay.drawdownSurveyScreen.usageReason.option1' }) },
    { label: formatMessage({ id: 'instapay.drawdownSurveyScreen.usageReason.option2' }) },
    { label: formatMessage({ id: 'instapay.drawdownSurveyScreen.usageReason.option3' }) },
    { label: formatMessage({ id: 'instapay.drawdownSurveyScreen.usageReason.option4' }) },
    { code: 'OTHER', label: formatMessage({ id: 'instapay.drawdownSurveyScreen.usageReason.option5' }) },
  ]);
  const [otherReasonText, setOtherReasonText] = useState('');
  const usageReasonOtherSelected = () => usageReasonSelections.find(s => s.selected && s.code === 'OTHER');

  const [idealFreqSelections, setIdealFreqSelections] = useState<Reason[]>([
    { label: formatMessage({ id: 'instapay.drawdownSurveyScreen.idealFreq.option1' }) },
    { label: formatMessage({ id: 'instapay.drawdownSurveyScreen.idealFreq.option2' }) },
    { label: formatMessage({ id: 'instapay.drawdownSurveyScreen.idealFreq.option3' }) },
    { label: formatMessage({ id: 'instapay.drawdownSurveyScreen.idealFreq.option4' }) },
  ]);

  const [moreFeedback, setMoreFeedback] = useState(true);

  const readyForSubmiting = () => {
    const hasUsageReason = usageReasonSelections.filter(s => s.selected).length > 0;
    const hasIdealFreq = idealFreqSelections.filter(s => s.selected).length > 0;
    const hasDescriptionForOtherReason = usageReasonOtherSelected() ? !!otherReasonText : true;

    return hasUsageReason && hasIdealFreq && hasDescriptionForOtherReason && !submittingSurvey;
  };
  const onSubmitPressed = () => {
    const usageReasons = usageReasonSelections.filter(s => s.selected).map(s => s.label);
    const usageReasonOtherDescription = usageReasonOtherSelected() ? otherReasonText : '';
    const idealFreqs = idealFreqSelections.filter(s => s.selected).map(s => s.label);
    trackSubmitDrawdownSurvey({
      usageReasons,
      usageReasonOtherDescription,
      idealFreqs,
      moreFeedback: moreFeedback ? 'more feedback' : 'no',
    });
    submitDrawdownSurvey({
      input: {
        usageReasons,
        idealFreqs,
        moreFeedback,
        usageReasonOtherDescription,
      },
    });
    navigateToTopTabs('income-tab');
  };

  const onNotNowPressed = () => {
    trackClickNotNowOnDrawdownSurveyScreen();
    navigateToTopTabs('income-tab');
  };

  return (
    <>
      <CustomStatusBar />
      <Page.TopBar
        title={formatMessage({ id: 'instapay.drawdownSurveyScreen.topBarTitle' })}
        hideRight
        onBack={navigation.goBack}
      />
      <Page style={{ paddingBottom: bottomInset }}>
        <Page.Title>{formatMessage({ id: 'instapay.drawdownSurveyScreen.title' })}</Page.Title>
        <Page.Body>
          <Typography.Body>
            {formatMessage({ id: 'instapay.drawdownSurveyScreen.usageReason.question' })}
          </Typography.Body>
          <ReasonSelection selections={usageReasonSelections} onSelectionsChanged={setUsageReasonSelections} />
          {usageReasonOtherSelected() && (
            <TextInput
              label={formatMessage({ id: 'instapay.drawdownSurveyScreen.usageReason.otherInputLabel' })}
              testID="reason"
              required
              style={{ marginTop: space.medium }}
              onChangeText={setOtherReasonText}
              value={otherReasonText}
            />
          )}

          <Typography.Body style={{ marginTop: space.large }}>
            {formatMessage({ id: 'instapay.drawdownSurveyScreen.idealFreq.question' })}
          </Typography.Body>
          <ReasonSelection selections={idealFreqSelections} onSelectionsChanged={setIdealFreqSelections} />

          <Typography.Body style={{ marginTop: space.large, marginBottom: space.small }}>
            {formatMessage({ id: 'instapay.drawdownSurveyScreen.moreFeedback.question' })}
          </Typography.Body>
          <RadioCardGroup
            style={{ marginBottom: space.xxxlarge }}
            options={[
              { value: true, content: formatMessage({ id: 'common.yes' }) },
              { value: false, content: formatMessage({ id: 'common.no' }) },
            ]}
            value={moreFeedback}
            onChange={setMoreFeedback}
            RadioCardComponent={RadioOptionItem}
          />
        </Page.Body>
        <Page.Footer>
          <Button
            onPress={onSubmitPressed}
            disabled={!readyForSubmiting()}
            accessibilityLabel="Submit"
            text={formatMessage({ id: 'instapay.drawdownSurveyScreen.submitButton' })}
            style={{ marginBottom: space.small }}
          />
          <Button
            variant="text"
            onPress={onNotNowPressed}
            accessibilityLabel="Not now"
            text={formatMessage({ id: 'instapay.drawdownSurveyScreen.notNowButton' })}
          />
        </Page.Footer>
      </Page>
    </>
  );
};
