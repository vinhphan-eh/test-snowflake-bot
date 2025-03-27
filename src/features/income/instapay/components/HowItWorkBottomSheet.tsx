import React, { forwardRef } from 'react';
import { Box, Typography } from '@hero-design/rn';
import type { BodyProps } from '@hero-design/rn/types/components/Typography/Body';
import type { BottomSheetRef } from '../../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetScrollView } from '../../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetWithHD } from '../../../../common/components/bottom-sheet/BottomSheetWithHD';
import { useBottomSheetDynamicSnapPoints } from '../../../../common/components/bottom-sheet/useBottomSheetDynamicSnapPoints';
import { getDefaultCurrency } from '../../../../common/utils/currency';
import { createCurrencyFormatter } from '../../../../common/utils/numbers';
import ThemeSwitcher from '../../../../common/utils/ThemeSwitcher';
import { useIntl } from '../../../../providers/LocalisationProvider';
import type { FormatMessageFuncType } from '../../../../providers/LocalisationProvider/hooks/useIntl';
import { useInstaPayDrawdownStore } from '../stores/useInstaPayDrawdownStore';

type Content = {
  variant: BodyProps['variant'];
  value: string;
}[];

const getTextContent = (
  options: {
    withdrawalMinLimit: number;
    withdrawalMaxLimit: number;
  },
  formatNumberWithCurrency: (amount: number) => string,
  formatMessage: FormatMessageFuncType
): Content => {
  const { withdrawalMaxLimit, withdrawalMinLimit } = options;

  const rawContents = [
    {
      variant: 'regular-bold',
      value: formatMessage({ id: 'instapay.howItWorksDetails.whatPayIsEligible.title' }),
    },
    {
      variant: 'regular',
      value: formatMessage(
        { id: 'instapay.howItWorksDetails.whatPayIsEligible.content' },
        {
          withdrawalMaxLimit: formatNumberWithCurrency(withdrawalMaxLimit),
          withdrawalMinLimit: formatNumberWithCurrency(withdrawalMinLimit),
        }
      ),
    },
    {
      variant: 'regular-bold',
      value: formatMessage({ id: 'instapay.howItWorksDetails.howAreFundsDeducted.title' }),
    },
    {
      variant: 'regular',
      value: formatMessage({ id: 'instapay.howItWorksDetails.howAreFundsDeducted.content1' }),
    },
    {
      variant: 'regular',
      value: formatMessage({ id: 'instapay.howItWorksDetails.howAreFundsDeducted.content2' }),
    },
    {
      variant: 'regular-bold',
      value: formatMessage({ id: 'instapay.howItWorksDetails.howAreFundsCalculated.title' }),
    },
    {
      variant: 'regular',
      value: formatMessage({ id: 'instapay.howItWorksDetails.howAreFundsCalculated.content1' }),
    },
    {
      variant: 'regular',
      value: formatMessage({ id: 'instapay.howItWorksDetails.howAreFundsCalculated.content2' }),
    },
    {
      variant: 'regular-bold',
      value: formatMessage({ id: 'instapay.howItWorksDetails.whatAreTheFees.title' }),
    },
    {
      variant: 'regular',
      value: formatMessage({ id: 'instapay.howItWorksDetails.whatAreTheFees.content' }),
    },
    {
      variant: 'regular-bold',
      value: formatMessage({ id: 'instapay.howItWorksDetails.whenWillIReceiveMyFunds.title' }),
    },
    {
      variant: 'regular',
      value: formatMessage({ id: 'instapay.howItWorksDetails.whenWillIReceiveMyFunds.content' }),
    },
  ] as Content;

  return rawContents.map(content => ({
    ...content,
    value: `${content.value}\n`,
  }));
};

export const HowItWorkContent = ({ content }: { content: Content }) => {
  return (
    <>
      {content.map(item => (
        <Typography.Body key={item.value} variant={item.variant}>
          {item.value}
        </Typography.Body>
      ))}
    </>
  );
};

type HowItWorkBottomSheetProps = {
  withdrawalMinLimit: number;
  withdrawalMaxLimit: number;
};

export const HowItWorkBottomSheet = forwardRef<BottomSheetRef, HowItWorkBottomSheetProps>(
  ({ withdrawalMaxLimit, withdrawalMinLimit }, ref) => {
    const {
      animatedContentHeight,
      animatedHandleHeight,
      animatedSnapPoints,
      contentContainerHeightStyle,
      handleContentLayout,
    } = useBottomSheetDynamicSnapPoints();

    const memberWorkCountry = useInstaPayDrawdownStore(state => state.workCountry);

    const formatCurrency = createCurrencyFormatter();
    const currency = getDefaultCurrency(memberWorkCountry);

    const formatNumberWithCurrency = (amount: number) => formatCurrency(amount, { currency });
    const { formatMessage } = useIntl();

    const content = getTextContent({ withdrawalMinLimit, withdrawalMaxLimit }, formatNumberWithCurrency, formatMessage);

    return (
      <BottomSheetWithHD
        ref={ref}
        title="How it works"
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
      >
        <BottomSheetScrollView
          accessibilityLabel="How it works content scroll view"
          style={contentContainerHeightStyle}
          onLayout={handleContentLayout}
        >
          <ThemeSwitcher name="wallet">
            <Box marginTop="small" marginBottom="medium" paddingHorizontal="large">
              <HowItWorkContent content={content} />
            </Box>
          </ThemeSwitcher>
        </BottomSheetScrollView>
      </BottomSheetWithHD>
    );
  }
);
