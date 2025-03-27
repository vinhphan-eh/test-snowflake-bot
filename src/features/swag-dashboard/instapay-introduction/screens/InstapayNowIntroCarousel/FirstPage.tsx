import React from 'react';
import { Box, Typography, useTheme } from '@hero-design/rn';
import BulletLine from '../../../../../common/components/bullet-line';
import { useIntl } from '../../../../../providers/LocalisationProvider';

export const FirstPage = () => {
  const { space } = useTheme();
  const Intl = useIntl();
  return (
    <Box testID="first-page">
      <Typography.Title
        style={{ marginTop: space.medium, marginBottom: space.smallMedium }}
        level="h1"
        typeface="playful"
      >
        {Intl.formatMessage({ id: 'instapay.payIntroExperiment.instaPayEducationCarousel.subtitle' })}
      </Typography.Title>

      <Typography.Body style={{ marginBottom: space.small }} variant="regular">
        {Intl.formatMessage({ id: 'instapay.payIntroExperiment.instaPayEducationCarousel.description' })}
      </Typography.Body>
      <BulletLine
        variant="regular"
        content={Intl.formatMessage({ id: 'instapay.payIntroExperiment.instaPayEducationCarousel.bulletPoint1' })}
      />
      <BulletLine
        variant="regular"
        content={Intl.formatMessage({ id: 'instapay.payIntroExperiment.instaPayEducationCarousel.bulletPoint2' })}
      />
      <BulletLine
        variant="regular"
        content={Intl.formatMessage({ id: 'instapay.payIntroExperiment.instaPayEducationCarousel.bulletPoint3' })}
      />
    </Box>
  );
};
