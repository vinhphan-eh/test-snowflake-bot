import React, { useRef, useState } from 'react';
import { Box, Button, Typography, useTheme } from '@hero-design/rn';
import type { ContentType } from './constants';
import { PayCycleInfoBts } from './PayCycleInfoBts';
import type { BottomSheetRef } from '../../../../../common/components/bottom-sheet/BottomSheet';
import { useIntl } from '../../../../../providers/LocalisationProvider';

export const SecondPage = () => {
  const { space } = useTheme();
  const Intl = useIntl();
  const [content, setContent] = useState<ContentType>(undefined);
  const btsRef = useRef<BottomSheetRef>(null);
  const showPayCircleContent = (value: ContentType) => {
    btsRef.current?.open();
    setContent(value);
  };

  return (
    <Box testID="second-page">
      <Typography.Title level="h1" typeface="playful">
        {Intl.formatMessage({ id: 'instapay.introduction.instapayNowCarousel.secondPage.title' })}
      </Typography.Title>
      <Typography.Body style={{ marginTop: space.medium }} variant="regular">
        {Intl.formatMessage({ id: 'instapay.introduction.instapayNowCarousel.secondPage.content1' })}
      </Typography.Body>
      <Typography.Body style={{ marginTop: space.small }} variant="regular">
        {Intl.formatMessage({ id: 'instapay.introduction.instapayNowCarousel.secondPage.content2' })}
      </Typography.Body>
      <Typography.Body variant="regular-bold" style={{ marginTop: space.large }}>
        {Intl.formatMessage({ id: 'instapay.payIntroExperiment.payCircleEducationCarousel.info3' })}
      </Typography.Body>
      <Box flexDirection="row" justifyContent="space-around" marginTop="small">
        <Button
          onPress={() => showPayCircleContent('monthly')}
          text={Intl.formatMessage({
            id: 'instapay.payIntroExperiment.payCircleEducationCarousel.buttonTextMonthly',
          })}
          variant="outlined"
        />
        <Button
          onPress={() => showPayCircleContent('fortnightly')}
          text={Intl.formatMessage({
            id: 'instapay.payIntroExperiment.payCircleEducationCarousel.buttonTextFortnightly',
          })}
          variant="outlined"
        />
        <Button
          onPress={() => showPayCircleContent('weekly')}
          text={Intl.formatMessage({ id: 'instapay.payIntroExperiment.payCircleEducationCarousel.buttonTextWeekly' })}
          variant="outlined"
        />
      </Box>
      <PayCycleInfoBts btsRef={btsRef} contentType={content} />
    </Box>
  );
};
