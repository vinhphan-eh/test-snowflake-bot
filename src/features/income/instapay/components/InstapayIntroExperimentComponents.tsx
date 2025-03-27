import React from 'react';
import { Image } from 'react-native';
import { Accordion, Box, Typography, useTheme } from '@hero-design/rn';
import images from '../../../../common/assets/images';
import { useIntl } from '../../../../providers/LocalisationProvider';

export enum CarouselContent {
  INSTAPAY_EDUCATION_ONLY = 'INSTAPAY_EDUCATION_ONLY',
  PAY_CYCLE_EDUCATION_ONLY = 'PAY_CYCLE_EDUCATION_ONLY',
  BOTH = 'BOTH',
}

export const PayCircleDefinition = () => {
  const intl = useIntl();
  return (
    <Accordion
      items={[
        {
          // there is a bug that freezes the app when the key is predefined, so I have to make it random
          key: Math.random().toString(),
          header: intl.formatMessage({ id: 'instapay.payIntroExperiment.payCircleDefinition.header' }),
          content: (
            <Typography.Body variant="small">
              <Typography.Body variant="small-bold">
                {intl.formatMessage({ id: 'instapay.payIntroExperiment.payCircleDefinition.arrears' })}
                {': '}
              </Typography.Body>
              {intl.formatMessage({ id: 'instapay.payIntroExperiment.payCircleDefinition.arrearsDefinition' })}
              {'\n\n'}
              <Typography.Body variant="small-bold">
                {intl.formatMessage({ id: 'instapay.payIntroExperiment.payCircleDefinition.advance' })}
                {': '}
              </Typography.Body>
              {intl.formatMessage({ id: 'instapay.payIntroExperiment.payCircleDefinition.advanceDefinition' })}
              {'\n\n'}
              <Typography.Body variant="small-bold">
                {intl.formatMessage({ id: 'instapay.payIntroExperiment.payCircleDefinition.salary' })}
                {': '}
              </Typography.Body>
              {intl.formatMessage({ id: 'instapay.payIntroExperiment.payCircleDefinition.salaryDefinition' })}
              {'\n\n'}
              <Typography.Body variant="small-bold">
                {' '}
                {intl.formatMessage({ id: 'instapay.payIntroExperiment.payCircleDefinition.payRun' })}
                {': '}
              </Typography.Body>
              {intl.formatMessage({ id: 'instapay.payIntroExperiment.payCircleDefinition.payRunDefinition' })}
              {'\n\n'}
              <Typography.Body variant="small-bold">
                {' '}
                {intl.formatMessage({ id: 'instapay.payIntroExperiment.payCircleDefinition.payCycle' })}
                {': '}
              </Typography.Body>
              {intl.formatMessage({ id: 'instapay.payIntroExperiment.payCircleDefinition.payCycleDefinition' })}
            </Typography.Body>
          ),
        },
      ]}
    />
  );
};

export const PayCircleMonthlyContent = () => {
  const { space } = useTheme();
  const intl = useIntl();
  return (
    <Box testID="ipe-pay-circle-monthly-content">
      <Typography.Body variant="small-bold" style={{ marginVertical: space.medium }}>
        {intl.formatMessage({ id: 'instapay.payIntroExperiment.payCircleMonthlyContent.info' })}
      </Typography.Body>
      <Typography.Body variant="small">
        <Typography.Body variant="small-bold">
          {intl.formatMessage({ id: 'instapay.payIntroExperiment.payCircleMonthlyContent.info2' })}
        </Typography.Body>
        {intl.formatMessage({ id: 'instapay.payIntroExperiment.payCircleMonthlyContent.info3' })}
      </Typography.Body>
      <Typography.Caption style={{ marginVertical: space.medium }}>
        <Typography.Caption fontWeight="semi-bold">
          {intl.formatMessage({ id: 'instapay.payIntroExperiment.payCircleMonthlyContent.info4' })}
        </Typography.Caption>
        {intl.formatMessage({ id: 'instapay.payIntroExperiment.payCircleMonthlyContent.info5' })}
      </Typography.Caption>
      <Image
        source={images.instapayPayrunMonthly}
        testID="ip-payrun-monthly"
        resizeMode="contain"
        style={{ width: '100%', marginVertical: space.medium }}
      />
      <PayCircleDefinition />
    </Box>
  );
};

export const PayCircleFortnightlyContent = () => {
  const { space } = useTheme();
  const intl = useIntl();
  return (
    <Box>
      <Typography.Body variant="small-bold">
        {intl.formatMessage({ id: 'instapay.payIntroExperiment.payCircleFortnightlyContent.info' })}
      </Typography.Body>
      <Typography.Body variant="small">
        {intl.formatMessage({ id: 'instapay.payIntroExperiment.payCircleFortnightlyContent.info2' })}
      </Typography.Body>
      <Typography.Caption style={{ marginVertical: space.smallMedium }}>
        <Typography.Caption fontWeight="semi-bold">
          {intl.formatMessage({ id: 'instapay.payIntroExperiment.payCircleFortnightlyContent.info3' })}
        </Typography.Caption>
        {intl.formatMessage({ id: 'instapay.payIntroExperiment.payCircleFortnightlyContent.info4' })}
      </Typography.Caption>
      <Image
        source={images.instapayPayrunFortnightly}
        resizeMode="contain"
        testID="ip-payrun-fortnightly"
        style={{ width: '100%', marginVertical: space.medium }}
      />
      <PayCircleDefinition />
    </Box>
  );
};

export const PayCircleWeeklyContent = () => {
  const { space } = useTheme();
  const intl = useIntl();
  return (
    <Box>
      <Typography.Body variant="small" style={{ marginBottom: space.medium }}>
        <Typography.Body variant="small-bold">
          {intl.formatMessage({ id: 'instapay.payIntroExperiment.payCircleWeeklyContent.info' })}
        </Typography.Body>
        {intl.formatMessage({ id: 'instapay.payIntroExperiment.payCircleWeeklyContent.info2' })}
      </Typography.Body>
      <Image
        source={images.instapayPayrunWeekly}
        testID="ip-payrun-weekly"
        resizeMode="contain"
        style={{ width: '100%' }}
      />
      <PayCircleDefinition />
    </Box>
  );
};
