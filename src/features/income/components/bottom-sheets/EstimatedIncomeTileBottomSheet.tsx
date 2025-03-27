import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { BottomSheet, Box, Button, Image, scale, Typography, useTheme } from '@hero-design/rn';
import images from '../../../../common/assets/images';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { useSeenEstimatedIncomeHowItWorksBts } from '../../instapay/hooks/useSeenEstimatedIncomeHowItWorksBts';

interface EstimatedIncomeTileBottomSheetProps {
  isOpening: boolean;
  setIsOpening: (isOpening: boolean) => void;
  isUK: boolean;
}

export const EstimatedIncomeTileBottomSheetContent = () => {
  const { formatMessage } = useIntl();
  const { space } = useTheme();

  return (
    <Box marginHorizontal="small">
      <Typography.Body
        variant="regular-bold"
        style={{
          marginBottom: space.xsmall,
        }}
      >
        {formatMessage({ id: 'instapay.estimatedIncome.bottomSheet.incomeAndTotal.title' })}
      </Typography.Body>
      <Typography.Body>
        {formatMessage({ id: 'instapay.estimatedIncome.bottomSheet.incomeAndTotal.description' })}
      </Typography.Body>

      <Typography.Body
        variant="regular-bold"
        style={{
          marginTop: space.medium,
          marginBottom: space.xsmall,
        }}
      >
        {formatMessage({ id: 'instapay.estimatedIncome.bottomSheet.paydayEstimate.title' })}
      </Typography.Body>
      <Typography.Body>
        {formatMessage({ id: 'instapay.estimatedIncome.bottomSheet.paydayEstimate.description' })}
      </Typography.Body>

      <Typography.Body
        variant="regular-bold"
        style={{
          marginTop: space.medium,
          marginBottom: space.xsmall,
        }}
      >
        {formatMessage({ id: 'instapay.estimatedIncome.bottomSheet.budgetingTip' })}
      </Typography.Body>
    </Box>
  );
};

export const EstimatedIncomeTileBottomSheet = ({
  isOpening,
  isUK,
  setIsOpening,
}: EstimatedIncomeTileBottomSheetProps) => {
  const image = isUK ? images.ewaRecurringHowItWorksUK4 : images.ewaRecurringHowItWorksAU4;
  const { space } = useTheme();
  const { formatMessage } = useIntl();
  const { setSeen } = useSeenEstimatedIncomeHowItWorksBts();

  useEffect(() => {
    if (isOpening) {
      setSeen(true);
    }
  }, [isOpening]);

  return (
    <BottomSheet
      open={isOpening}
      onRequestClose={() => setIsOpening(false)}
      testID="estimated-income-tile-bts"
      header={formatMessage({ id: 'common.gettingStarted' })}
      footer={
        <Box alignItems="flex-end" flexDirection="row">
          <Button
            variant="text"
            testID="recurring-how-it-works-bts-got-it-button"
            text={formatMessage({ id: 'common.gotIt' })}
            onPress={() => {
              setIsOpening(false);
            }}
          />
        </Box>
      }
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box paddingHorizontal="medium" paddingBottom="medium">
          <Image
            style={{
              width: scale(358),
              height: scale(230),
              maxWidth: '100%',
              marginBottom: space.medium,
            }}
            source={image}
            resizeMode="contain"
          />

          <EstimatedIncomeTileBottomSheetContent />
        </Box>
      </ScrollView>
    </BottomSheet>
  );
};
