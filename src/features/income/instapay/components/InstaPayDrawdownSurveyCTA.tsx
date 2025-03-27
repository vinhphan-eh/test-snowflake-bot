import React from 'react';
import { InstaPaySuccessScreenAdTile } from './InstapaySuccessScreenAdTile';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { useInstapayTracking } from '../hooks/useInstapayTracking';

interface InstapayDrawdownSurveyCTAProps {
  onContinue: () => void;
}

export const InstaPayDrawdownSurveyCTA = ({ onContinue }: InstapayDrawdownSurveyCTAProps) => {
  const { formatMessage } = useIntl();
  const { trackClickDrawdownSurveyCTA } = useInstapayTracking();

  const onNavigation = () => {
    trackClickDrawdownSurveyCTA();
    onContinue();
  };

  return (
    <InstaPaySuccessScreenAdTile
      caption={formatMessage({ id: 'instapay.drawdownSurveyCta.title' })}
      content={formatMessage({ id: 'instapay.drawdownSurveyCta.subtitle' })}
      navigationButtonText={formatMessage({ id: 'instapay.drawdownSurveyCta.button' })}
      onPressed={onNavigation}
    />
  );
};
