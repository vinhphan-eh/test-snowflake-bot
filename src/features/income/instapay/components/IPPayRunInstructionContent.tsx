import React from 'react';
import { Image } from 'react-native';
import { Accordion, Box, Typography, useTheme } from '@hero-design/rn';
import images from '../../../../common/assets/images';
import { PayCycle } from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';

const MonthlyContent = () => {
  const { space } = useTheme();
  const { formatMessage } = useIntl();

  return (
    <Box testID="ip-pay-run-instruction">
      <Typography.Body variant="small-bold" style={{ marginVertical: space.medium }}>
        {formatMessage({ id: 'instapay.payrunInstruction.payCycle.monthly.body_1' })}
      </Typography.Body>
      <Typography.Body variant="small">
        <Typography.Body variant="small-bold">
          {formatMessage({ id: 'instapay.payrunInstruction.payCycle.monthly.body_2' })}
        </Typography.Body>
        {formatMessage({ id: 'instapay.payrunInstruction.payCycle.monthly.body_3' })}
      </Typography.Body>
      <Typography.Caption style={{ marginVertical: space.medium }}>
        <Typography.Caption fontWeight="semi-bold">
          {formatMessage({ id: 'instapay.payrunInstruction.payCycle.monthly.caption_1' })}
        </Typography.Caption>
        {formatMessage({ id: 'instapay.payrunInstruction.payCycle.monthly.caption_2' })}
      </Typography.Caption>
      <Image source={images.instapayPayrunMonthly} resizeMode="contain" style={{ width: '100%' }} />
    </Box>
  );
};

const FortnightlyContent = () => {
  const { space } = useTheme();
  const { formatMessage } = useIntl();

  return (
    <>
      <Typography.Body variant="small-bold">
        {formatMessage({ id: 'instapay.payrunInstruction.payCycle.fortnightly.body_1' })}
      </Typography.Body>
      <Typography.Body variant="small">
        {formatMessage({ id: 'instapay.payrunInstruction.payCycle.fortnightly.body_2' })}
      </Typography.Body>
      <Typography.Caption style={{ marginVertical: space.smallMedium }}>
        {formatMessage({ id: 'instapay.payrunInstruction.payCycle.fortnightly.caption' })}
      </Typography.Caption>
      <Image source={images.instapayPayrunFortnightly} resizeMode="contain" style={{ width: '100%' }} />
    </>
  );
};

const WeeklyContent = () => {
  const { space } = useTheme();
  const { formatMessage } = useIntl();

  return (
    <>
      <Typography.Body variant="small" style={{ marginBottom: space.medium }}>
        <Typography.Body variant="small-bold">
          {formatMessage({ id: 'instapay.payrunInstruction.payCycle.weekly.body_1' })}
        </Typography.Body>
        {formatMessage({ id: 'instapay.payrunInstruction.payCycle.weekly.body_2' })}
      </Typography.Body>
      <Image source={images.instapayPayrunWeekly} resizeMode="contain" style={{ width: '100%' }} />
    </>
  );
};

type IPPayRunInstructionContentProps = {
  payCycle: PayCycle;
};

type PayCycleContentProps = {
  payCycle: PayCycle;
};

const PayCycleContent = ({ payCycle }: PayCycleContentProps) => {
  const { formatMessage } = useIntl();
  switch (payCycle) {
    case PayCycle.Monthly:
      return (
        <>
          <Typography.Body variant="regular-bold">
            {formatMessage({ id: 'instapay.payrunInstruction.payCycle.monthly.heading' })}
          </Typography.Body>
          <MonthlyContent />
        </>
      );
    case PayCycle.Fortnightly:
      return (
        <>
          <Typography.Body variant="regular-bold">
            {formatMessage({ id: 'instapay.payrunInstruction.payCycle.fortnightly.heading' })}
          </Typography.Body>
          <FortnightlyContent />
        </>
      );
    case PayCycle.Weekly:
      return (
        <>
          <Typography.Body variant="regular-bold">
            {formatMessage({ id: 'instapay.payrunInstruction.payCycle.weekly.heading' })}
          </Typography.Body>
          <WeeklyContent />
        </>
      );
    // to bypass the exhaustive check, we already check for payCycle !== PayCycle.Unknown
    default:
      return null;
  }
};

export const IPPayRunInstructionContent = ({ payCycle }: IPPayRunInstructionContentProps) => {
  const { borderWidths, colors, space } = useTheme();
  const { formatMessage } = useIntl();

  const [activeItem, setActiveItem] = React.useState<PayCycle | undefined>(payCycle);

  const accordionItems = [
    {
      header: formatMessage({ id: 'instapay.payrunInstruction.payCycle.monthly.if' }),
      content: <MonthlyContent />,
      key: PayCycle.Monthly,
    },
    {
      header: formatMessage({ id: 'instapay.payrunInstruction.payCycle.fortnightly.if' }),
      content: <FortnightlyContent />,
      key: PayCycle.Fortnightly,
    },
    {
      header: formatMessage({ id: 'instapay.payrunInstruction.payCycle.weekly.if' }),
      content: <WeeklyContent />,
      key: PayCycle.Weekly,
    },
  ];

  return (
    <Box testID="bs-ip-pay-run-instruction">
      <Typography.Body variant="small">{formatMessage({ id: 'instapay.payrunInstruction.body_1' })}</Typography.Body>
      <Box
        style={{
          borderStyle: 'dotted',
          borderWidth: borderWidths.base,
          borderColor: colors.primary,
          padding: space.medium,
          marginVertical: space.medium,
        }}
      >
        <Typography.Body variant="small-bold">
          {formatMessage({ id: 'instapay.payrunInstruction.body_2' })}
        </Typography.Body>
      </Box>
      <Typography.Caption>
        <Typography.Caption fontWeight="semi-bold">
          {formatMessage({ id: 'instapay.payrunInstruction.pleaseNote' })}
        </Typography.Caption>
        {formatMessage({ id: 'instapay.payrunInstruction.note' })}
      </Typography.Caption>
      {payCycle !== PayCycle.Unknown ? (
        <Box style={{ marginVertical: space.medium }}>
          <PayCycleContent payCycle={payCycle} />
        </Box>
      ) : (
        <Accordion
          activeItemKey={activeItem}
          onItemPress={key => setActiveItem(key)}
          items={accordionItems}
          style={{ marginHorizontal: -space.medium, marginVertical: space.medium }}
        />
      )}
      <Typography.Body variant="small">
        <Typography.Body variant="regular">
          {formatMessage({ id: 'instapay.payrunInstruction.definitions.heading' })} {'\n\n'}
        </Typography.Body>
        <Typography.Body variant="small-bold">
          {formatMessage({ id: 'instapay.payrunInstruction.definitions.arrear' })}
        </Typography.Body>
        {formatMessage({ id: 'instapay.payrunInstruction.definitions.arrear_explained' })} {'\n\n'}
        <Typography.Body variant="small-bold">
          {formatMessage({ id: 'instapay.payrunInstruction.definitions.advance' })}
        </Typography.Body>
        {formatMessage({ id: 'instapay.payrunInstruction.definitions.advance_explained' })} {'\n\n'}
        <Typography.Body variant="small-bold">
          {formatMessage({ id: 'instapay.payrunInstruction.definitions.salary' })}
        </Typography.Body>
        {formatMessage({ id: 'instapay.payrunInstruction.definitions.salary_explained' })} {'\n\n'}
        <Typography.Body variant="small-bold">
          {formatMessage({ id: 'instapay.payrunInstruction.definitions.payrun' })}
        </Typography.Body>
        {formatMessage({ id: 'instapay.payrunInstruction.definitions.payrun_explained' })} {'\n\n'}
        <Typography.Body variant="small-bold">
          {formatMessage({ id: 'instapay.payrunInstruction.definitions.payCycle' })}
        </Typography.Body>
        {formatMessage({ id: 'instapay.payrunInstruction.definitions.payCycle_explained' })} {'\n\n'}
      </Typography.Body>
    </Box>
  );
};
